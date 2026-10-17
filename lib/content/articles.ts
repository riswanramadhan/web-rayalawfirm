import { unstable_cache } from 'next/cache';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { countWords, markdownToPlainText } from '@/lib/markdown';
import { createSupabasePublicClient } from '@/lib/supabase/public';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import {
  ARTICLE_PLACEHOLDER_IMAGE,
  CONTENT_REVALIDATE_SECONDS,
  CONTENT_TAGS,
  isNextInternalError,
} from './cache';
import { getStaticArticleRows } from './fallback';
import { safeImageSrc } from './image';
import { loadActiveLawyerRows, toLawyerProfile } from './lawyers';
import type { ArticleEntry, ArticleRow, FaqItem, LawyerRow } from './types';

export function sanitizeFaqs(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is FaqItem =>
        Boolean(item) &&
        typeof (item as FaqItem).question === 'string' &&
        typeof (item as FaqItem).answer === 'string'
    )
    .map((item) => ({ question: item.question.trim(), answer: item.answer.trim() }))
    .filter((item) => item.question && item.answer);
}

export function normalizeArticleRow(row: ArticleRow): ArticleRow {
  return {
    ...row,
    tags: row.tags ?? [],
    tags_en: row.tags_en ?? [],
    key_points: row.key_points ?? [],
    key_points_en: row.key_points_en ?? [],
    faqs: sanitizeFaqs(row.faqs),
    faqs_en: sanitizeFaqs(row.faqs_en),
  };
}

const sortNewestFirst = (rows: ArticleRow[]) =>
  [...rows].sort((a, b) => b.published_at.localeCompare(a.published_at));

const fetchPublishedArticleRows = unstable_cache(
  async (): Promise<ArticleRow[]> => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(500);

    if (error) throw new Error(`[content] gagal memuat artikel: ${error.message}`);
    return ((data ?? []) as ArticleRow[]).map(normalizeArticleRow);
  },
  ['content:articles:published:v1'],
  { tags: [CONTENT_TAGS.articles], revalidate: CONTENT_REVALIDATE_SECONDS }
);

/** Baris artikel terbit, terbaru dulu (DB bila tersedia, jika tidak data statis). */
export async function loadPublishedArticleRows(): Promise<ArticleRow[]> {
  if (!isSupabaseConfigured()) return sortNewestFirst(getStaticArticleRows());

  try {
    return await fetchPublishedArticleRows();
  } catch (error) {
    if (isNextInternalError(error)) throw error;
    console.error(error);
    return sortNewestFirst(getStaticArticleRows());
  }
}

const pickText = (locale: Locale, base: string, en: string | null | undefined) =>
  locale !== defaultLocale && en && en.trim() ? en : base;

function pickList<T>(locale: Locale, base: T[], en: T[] | null | undefined): T[] {
  return locale !== defaultLocale && en && en.length > 0 ? en : base;
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : cut.length)}…`;
}

export function toArticleEntry(
  row: ArticleRow,
  locale: Locale = defaultLocale,
  lawyers: LawyerRow[] = []
): ArticleEntry {
  const content = pickText(locale, row.content, row.content_en);
  const title = pickText(locale, row.title, row.title_en);
  const excerptRaw = pickText(locale, row.excerpt ?? '', row.excerpt_en);
  const excerpt = excerptRaw.trim() ? excerptRaw : truncate(markdownToPlainText(content), 200);
  const metaDescriptionRaw =
    locale !== defaultLocale ? row.meta_description_en || row.meta_description : row.meta_description;
  const metaTitleRaw = locale !== defaultLocale ? row.meta_title_en || row.meta_title : row.meta_title;
  const wordCount = countWords(content);

  const lawyerRow = row.author_lawyer_id
    ? lawyers.find((lawyer) => lawyer.id === row.author_lawyer_id)
    : undefined;
  const lawyer = lawyerRow ? toLawyerProfile(lawyerRow, locale) : undefined;

  return {
    id: row.id,
    slug: row.slug,
    title,
    excerpt,
    content,
    category: pickText(locale, row.category, row.category_en),
    tags: pickList(locale, row.tags, row.tags_en),
    keyPoints: pickList(locale, row.key_points, row.key_points_en),
    faqs: pickList(locale, row.faqs, row.faqs_en),
    image: safeImageSrc(row.cover_image_url, ARTICLE_PLACEHOLDER_IMAGE),
    // Alt teks hanya diisi dalam Bahasa Indonesia; versi lain memakai judul terjemahan.
    imageAlt: (locale === defaultLocale ? row.cover_image_alt?.trim() : '') || title,
    author: lawyer
      ? {
          name: lawyer.name,
          lawyerSlug: lawyer.slug,
          position: lawyer.position,
          image: lawyer.image,
        }
      : {
          name: pickText(locale, row.author_name, row.author_name_en),
          lawyerSlug: null,
          position: null,
          image: null,
        },
    metaTitle: metaTitleRaw?.trim() ? metaTitleRaw : title,
    metaDescription: metaDescriptionRaw?.trim() ? metaDescriptionRaw : truncate(excerpt, 160),
    featured: row.featured,
    publishedAt: row.published_at,
    updatedAt:
      row.updated_at && row.updated_at > row.published_at ? row.updated_at : row.published_at,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
  };
}

/** Semua artikel terbit (terbaru dulu), sudah dilokalkan. */
export async function getArticles(locale: Locale = defaultLocale): Promise<ArticleEntry[]> {
  const [rows, lawyers] = await Promise.all([loadPublishedArticleRows(), loadActiveLawyerRows()]);
  return rows.map((row) => toArticleEntry(row, locale, lawyers));
}

export async function getArticleBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Promise<ArticleEntry | undefined> {
  const articles = await getArticles(locale);
  return articles.find((article) => article.slug === slug);
}

/** Artikel yang ditulis oleh pengacara tertentu (untuk halaman profil). */
export async function getArticlesByLawyerSlug(
  lawyerSlug: string,
  locale: Locale = defaultLocale
): Promise<ArticleEntry[]> {
  const articles = await getArticles(locale);
  return articles.filter((article) => article.author.lawyerSlug === lawyerSlug);
}
