import type { ArticleInput } from '@/lib/admin/schemas';
import type { FaqItem } from '@/lib/content/types';

/* Bentuk state form "Tulis Artikel" + konversi ke input server action. */

export interface ArticleFormState {
  title: string;
  slug: string;
  cover_image_alt: string;
  excerpt: string;
  content: string;
  key_points: string[];
  faqs: FaqItem[];
  category: string;
  tags: string[];
  /** '' = Tim Redaksi Raya Law Firm */
  author_lawyer_id: string;
  meta_title: string;
  meta_description: string;
  featured: boolean;
  /** Nilai input datetime-local (waktu lokal). '' = saat tombol Terbitkan ditekan. */
  published_at: string;
  title_en: string;
  excerpt_en: string;
  content_en: string;
  category_en: string;
  tags_en: string[];
  key_points_en: string[];
  faqs_en: FaqItem[];
  meta_title_en: string;
  meta_description_en: string;
}

export type ArticleFieldKey = keyof ArticleFormState | 'cover_image_url';

export interface ArticleDraftData {
  state: ArticleFormState;
  slugTouched: boolean;
  /** Draf dibuat saat gambar sampul sudah dipilih (file tidak ikut tersimpan). */
  hadCover: boolean;
}

export interface AuthorOption {
  id: string;
  name: string;
  position: string;
  is_active: boolean;
}

export const DEFAULT_AUTHOR_NAME = 'Tim Redaksi Raya Law Firm';

export const EMPTY_ARTICLE_STATE: ArticleFormState = {
  title: '',
  slug: '',
  cover_image_alt: '',
  excerpt: '',
  content: '',
  key_points: [],
  faqs: [],
  category: '',
  tags: [],
  author_lawyer_id: '',
  meta_title: '',
  meta_description: '',
  featured: false,
  published_at: '',
  title_en: '',
  excerpt_en: '',
  content_en: '',
  category_en: '',
  tags_en: [],
  key_points_en: [],
  faqs_en: [],
  meta_title_en: '',
  meta_description_en: '',
};

/** Urutan sesuai tampilan form — untuk fokus ke isian salah pertama. */
export const ARTICLE_FIELD_ORDER: ArticleFieldKey[] = [
  'title',
  'slug',
  'cover_image_url',
  'cover_image_alt',
  'excerpt',
  'content',
  'key_points',
  'faqs',
  'category',
  'tags',
  'author_lawyer_id',
  'meta_title',
  'meta_description',
  'featured',
  'published_at',
  'title_en',
  'excerpt_en',
  'content_en',
  'category_en',
  'tags_en',
  'key_points_en',
  'faqs_en',
  'meta_title_en',
  'meta_description_en',
];

export const articleFieldId = (key: ArticleFieldKey) => `article-${key.replace(/_/g, '-')}`;

const STRING_KEYS = [
  'title',
  'slug',
  'cover_image_alt',
  'excerpt',
  'content',
  'category',
  'author_lawyer_id',
  'meta_title',
  'meta_description',
  'published_at',
  'title_en',
  'excerpt_en',
  'content_en',
  'category_en',
  'meta_title_en',
  'meta_description_en',
] as const satisfies readonly (keyof ArticleFormState)[];

const LIST_KEYS = ['key_points', 'tags', 'tags_en', 'key_points_en'] as const satisfies readonly (keyof ArticleFormState)[];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function sanitizeFaqs(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(isRecord)
    .map((item) => ({
      question: typeof item.question === 'string' ? item.question : '',
      answer: typeof item.answer === 'string' ? item.answer : '',
    }))
    .slice(0, 20);
}

/** Validasi longgar draf dari localStorage; field yang rusak kembali ke default. */
export function sanitizeArticleDraft(raw: unknown): ArticleDraftData | null {
  if (!isRecord(raw) || !isRecord(raw.state)) return null;
  const source = raw.state;
  const state: ArticleFormState = { ...EMPTY_ARTICLE_STATE };

  for (const key of STRING_KEYS) {
    const value = source[key];
    if (typeof value === 'string') state[key] = value;
  }
  for (const key of LIST_KEYS) {
    const value = source[key];
    if (Array.isArray(value)) state[key] = value.filter((item): item is string => typeof item === 'string');
  }
  state.faqs = sanitizeFaqs(source.faqs);
  state.faqs_en = sanitizeFaqs(source.faqs_en);
  state.featured = source.featured === true;

  return { state, slugTouched: raw.slugTouched === true, hadCover: raw.hadCover === true };
}

export function isArticleDraftEmpty(draft: ArticleDraftData): boolean {
  const { state } = draft;
  return (
    STRING_KEYS.every((key) => key === 'published_at' || key === 'author_lawyer_id' || !state[key].trim()) &&
    LIST_KEYS.every((key) => state[key].length === 0) &&
    state.faqs.every((item) => !item.question.trim() && !item.answer.trim()) &&
    state.faqs_en.every((item) => !item.question.trim() && !item.answer.trim())
  );
}

const isBlankFaq = (item: FaqItem) => !item.question.trim() && !item.answer.trim();

/** Hapus kartu FAQ yang benar-benar kosong (agar indeks error zod sesuai tampilan). */
export function pruneEmptyFaqs(state: ArticleFormState): ArticleFormState {
  const faqs = state.faqs.filter((item) => !isBlankFaq(item));
  const faqsEn = state.faqs_en.filter((item) => !isBlankFaq(item));
  if (faqs.length === state.faqs.length && faqsEn.length === state.faqs_en.length) return state;
  return { ...state, faqs, faqs_en: faqsEn };
}

/** "2026-10-17T09:30" (waktu lokal) → ISO UTC. Nilai tidak valid dikembalikan apa adanya agar ditolak zod. */
export function localDateTimeToIso(local: string): string {
  const date = new Date(local);
  return Number.isNaN(date.getTime()) ? local : date.toISOString();
}

/** Date → "YYYY-MM-DDTHH:mm" untuk input datetime-local (waktu lokal). */
export function toLocalDateTimeInput(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
}

export function isScheduled(state: Pick<ArticleFormState, 'published_at'>, now = Date.now()): boolean {
  if (!state.published_at) return false;
  const time = new Date(state.published_at).getTime();
  return !Number.isNaN(time) && time > now + 60_000;
}

export function authorNameFor(authorId: string, authors: AuthorOption[]): string {
  if (!authorId) return DEFAULT_AUTHOR_NAME;
  return authors.find((author) => author.id === authorId)?.name ?? DEFAULT_AUTHOR_NAME;
}

/** State form → input createArticle (cover_image_url diisi setelah upload). */
export function toArticleInput(state: ArticleFormState, authors: AuthorOption[]): ArticleInput {
  const author = state.author_lawyer_id ? authors.find((item) => item.id === state.author_lawyer_id) : undefined;

  return {
    slug: state.slug,
    title: state.title,
    excerpt: state.excerpt,
    content: state.content,
    category: state.category,
    tags: state.tags,
    key_points: state.key_points,
    faqs: state.faqs.filter((item) => !isBlankFaq(item)),
    cover_image_url: '',
    cover_image_alt: state.cover_image_alt,
    author_lawyer_id: state.author_lawyer_id || null,
    author_name: author?.name ?? '',
    meta_title: state.meta_title,
    meta_description: state.meta_description,
    featured: state.featured,
    // Kosong = terbit sekarang menurut jam SERVER (jam HP admin bisa tidak akurat).
    published_at: state.published_at ? localDateTimeToIso(state.published_at) : null,
    title_en: state.title_en,
    excerpt_en: state.excerpt_en,
    content_en: state.content_en,
    category_en: state.category_en,
    tags_en: state.tags_en,
    key_points_en: state.key_points_en,
    faqs_en: state.faqs_en.filter((item) => !isBlankFaq(item)),
    meta_title_en: state.meta_title_en,
    meta_description_en: state.meta_description_en,
  };
}

export function hasEnglishContent(state: ArticleFormState): boolean {
  return Boolean(
    state.title_en.trim() ||
      state.excerpt_en.trim() ||
      state.content_en.trim() ||
      state.category_en.trim() ||
      state.meta_title_en.trim() ||
      state.meta_description_en.trim() ||
      state.tags_en.length ||
      state.key_points_en.length ||
      state.faqs_en.some((item) => !isBlankFaq(item))
  );
}

export function errorIn(errors: Record<string, string>, key: ArticleFieldKey): string | undefined {
  if (errors[key]) return errors[key];
  const nested = Object.keys(errors).find((path) => path.startsWith(`${key}.`));
  return nested ? errors[nested] : undefined;
}
