import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

/*
 * Query artikel khusus dashboard admin. Memakai client Supabase yang membawa
 * sesi admin, sehingga RLS juga mengembalikan artikel terjadwal.
 */

export interface AdminArticleRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  published_at: string;
  featured: boolean;
  is_published: boolean;
  author_name: string;
  author_lawyer_id: string | null;
  cover_image_url: string;
  created_at: string;
}

export interface ArticleAuthorOption {
  id: string;
  name: string;
  position: string;
  is_active: boolean;
}

export const DEFAULT_ARTICLE_CATEGORIES: readonly string[] = [
  'Hukum Pidana',
  'Hukum Perdata',
  'Hukum Bisnis',
  'Ketenagakerjaan',
  'Hukum Keluarga',
  'Properti & Pertanahan',
  'Hukum Tata Usaha Negara',
];

/** Kode error saat tabel belum dibuat (migration belum dijalankan). */
export function isArticlesTableMissing(error: PostgrestError | null): boolean {
  return Boolean(error && (error.code === '42P01' || error.code === 'PGRST205'));
}

const ADMIN_ARTICLE_COLUMNS =
  'id, slug, title, category, published_at, featured, is_published, author_name, author_lawyer_id, cover_image_url, created_at';

const text = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

function normalizeAdminArticleRow(row: Record<string, unknown>): AdminArticleRow {
  return {
    id: text(row.id),
    slug: text(row.slug),
    title: text(row.title),
    category: text(row.category),
    published_at: text(row.published_at),
    featured: row.featured === true,
    is_published: row.is_published !== false,
    author_name: text(row.author_name, 'Tim Redaksi Raya Law Firm'),
    author_lawyer_id: typeof row.author_lawyer_id === 'string' ? row.author_lawyer_id : null,
    cover_image_url: text(row.cover_image_url),
    created_at: text(row.created_at),
  };
}

export async function listArticlesForAdmin(
  supabase: SupabaseClient,
  limit = 200
): Promise<{ rows: AdminArticleRow[]; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('articles')
    .select(ADMIN_ARTICLE_COLUMNS)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[admin] gagal memuat daftar artikel', error);
    return { rows: [], error };
  }

  return { rows: ((data ?? []) as Record<string, unknown>[]).map(normalizeAdminArticleRow), error: null };
}

/** Kategori yang sudah dipakai + kategori bawaan, unik & terurut (locale Indonesia). */
export async function listArticleCategories(supabase: SupabaseClient): Promise<string[]> {
  const seen = new Map<string, string>();
  const add = (value: string) => {
    const label = value.trim();
    if (!label) return;
    const key = label.toLocaleLowerCase('id-ID');
    if (!seen.has(key)) seen.set(key, label);
  };

  DEFAULT_ARTICLE_CATEGORIES.forEach(add);

  const { data, error } = await supabase.from('articles').select('category').limit(1000);
  if (error) {
    console.error('[admin] gagal memuat kategori artikel', error);
  } else {
    ((data ?? []) as { category: unknown }[]).forEach((row) => add(text(row.category)));
  }

  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b, 'id-ID'));
}

/** Semua pengacara (aktif & tidak aktif) sebagai pilihan penulis artikel. */
export async function listAuthorOptions(supabase: SupabaseClient): Promise<ArticleAuthorOption[]> {
  const { data, error } = await supabase
    .from('lawyers')
    .select('id, name, position, is_active')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('[admin] gagal memuat daftar penulis', error);
    return [];
  }

  return ((data ?? []) as Record<string, unknown>[])
    .map((row) => ({
      id: text(row.id),
      name: text(row.name),
      position: text(row.position),
      is_active: row.is_active !== false,
    }))
    .filter((row) => row.id && row.name);
}

/** Slug artikel yang sudah dipakai — untuk peringatan slug ganda sebelum menerbitkan. */
export async function listArticleSlugs(supabase: SupabaseClient): Promise<string[]> {
  const { data, error } = await supabase.from('articles').select('slug').limit(5000);

  if (error) {
    console.error('[admin] gagal memuat slug artikel', error);
    return [];
  }

  return ((data ?? []) as { slug: unknown }[]).map((row) => text(row.slug)).filter(Boolean);
}
