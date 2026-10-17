import type { ArticleEntry } from '@/lib/content/types';

/** Bentuk ringkas artikel untuk daftar/kartu (tanpa konten penuh agar payload RSC kecil). */
export type ArticleSummary = Pick<
  ArticleEntry,
  | 'id'
  | 'slug'
  | 'title'
  | 'excerpt'
  | 'category'
  | 'tags'
  | 'image'
  | 'imageAlt'
  | 'author'
  | 'featured'
  | 'publishedAt'
  | 'updatedAt'
  | 'readingMinutes'
>;

export function toArticleSummary(article: ArticleEntry): ArticleSummary {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    tags: article.tags,
    image: article.image,
    imageAlt: article.imageAlt,
    author: article.author,
    featured: article.featured,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingMinutes: article.readingMinutes,
  };
}

/** Huruf kecil tanpa diakritik — untuk pencarian & slug kategori. */
export function foldText(text: string): string {
  return text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
}

/** "Hukum Perdata" -> "hukum-perdata" (dipakai di ?kategori=). */
export function categorySlug(category: string): string {
  return foldText(category)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoryHref(category: string): string {
  return `/artikel?kategori=${encodeURIComponent(categorySlug(category))}`;
}

/** Semua kata kunci harus cocok dengan judul, ringkasan, kategori, tag, atau penulis. */
export function matchesQuery(article: ArticleSummary, query: string): boolean {
  const terms = foldText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const haystack = foldText(
    [article.title, article.excerpt, article.category, article.tags.join(' '), article.author.name].join(' ')
  );
  return terms.every((term) => haystack.includes(term));
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** True bila artikel diperbarui lebih dari 1 hari setelah terbit. */
export function isMeaningfullyUpdated(publishedAt: string, updatedAt: string): boolean {
  const published = new Date(publishedAt).getTime();
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(published) || Number.isNaN(updated)) return false;
  return updated - published > DAY_MS;
}
