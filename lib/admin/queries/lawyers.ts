import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { normalizeLawyerRow } from '@/lib/content/lawyers';
import type { LawyerRow } from '@/lib/content/types';

/*
 * Query khusus dashboard admin. Memakai client Supabase yang membawa sesi
 * admin, sehingga RLS mengizinkan membaca profil yang disembunyikan juga.
 */

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}

/** Kode error saat tabel belum dibuat (migration belum dijalankan). */
export function isMissingTableError(error: PostgrestError | null): boolean {
  return Boolean(error && (error.code === '42P01' || error.code === 'PGRST205'));
}

export async function listLawyersForAdmin(
  supabase: SupabaseClient
): Promise<{ rows: LawyerRow[]; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('lawyers')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[admin] gagal memuat daftar pengacara', error);
    return { rows: [], error };
  }

  return { rows: ((data ?? []) as LawyerRow[]).map(normalizeLawyerRow), error: null };
}

export async function getLawyerForAdmin(supabase: SupabaseClient, id: string): Promise<LawyerRow | null> {
  if (!isUuid(id)) return null;

  const { data, error } = await supabase.from('lawyers').select('*').eq('id', id).maybeSingle();

  if (error) {
    console.error('[admin] gagal memuat pengacara', error);
    return null;
  }

  return data ? normalizeLawyerRow(data as LawyerRow) : null;
}
