export interface SupabaseEnv {
  url: string;
  anonKey: string;
}

/**
 * Membaca kredensial publik Supabase. Mengembalikan null jika belum diisi,
 * sehingga website tetap berjalan memakai data statis bawaan.
 */
export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )?.trim();

  if (!url || !anonKey) return null;

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}

export const MEDIA_BUCKET = 'media';
