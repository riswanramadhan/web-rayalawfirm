import type { PostgrestError } from '@supabase/supabase-js';
import { revalidatePath, revalidateTag } from 'next/cache';
import { CONTENT_TAGS } from '@/lib/content/cache';
import { getAdminContext, getAdminWritesEnabled, type AuthorizedAdmin } from './auth';
import type { SaveResult } from './types';

/**
 * Wajib dipanggil di awal setiap server action yang menulis data.
 * Memastikan: Supabase terkonfigurasi, user login, user admin, dan
 * mode HOLD sudah dinonaktifkan developer.
 */
export async function authorizeWrite(): Promise<
  { ok: true; admin: AuthorizedAdmin } | { ok: false; result: SaveResult<never> }
> {
  const context = await getAdminContext();

  if (!context.configured) {
    return {
      ok: false,
      result: { status: 'error', message: 'Database belum dikonfigurasi. Hubungi developer.' },
    };
  }

  if (!context.user || !context.isAdmin) {
    return {
      ok: false,
      result: { status: 'unauthorized', message: 'Sesi Anda berakhir. Silakan login ulang.' },
    };
  }

  const writesEnabled = await getAdminWritesEnabled(context.supabase);
  if (!writesEnabled) {
    return { ok: false, result: { status: 'hold' } };
  }

  return { ok: true, admin: context as AuthorizedAdmin };
}

/** Terjemahkan error Postgres/PostgREST menjadi SaveResult yang ramah pengguna. */
export function mapDatabaseError(error: PostgrestError): SaveResult<never> {
  if (error.code === '23505') {
    return {
      status: 'invalid',
      message: 'Slug (alamat URL) sudah dipakai. Gunakan slug lain.',
      fieldErrors: { slug: 'Slug sudah dipakai' },
    };
  }

  if (error.code === '42501' || /row-level security/i.test(error.message)) {
    // RLS menolak: paling mungkin karena mode HOLD aktif.
    return { status: 'hold' };
  }

  if (error.code === '23514') {
    return {
      status: 'invalid',
      message: 'Ada data yang tidak memenuhi aturan. Periksa kembali isian Anda.',
      fieldErrors: {},
    };
  }

  console.error('[admin] database error', error);
  return { status: 'error', message: 'Gagal menyimpan ke database. Coba lagi beberapa saat.' };
}

/** Segarkan cache halaman publik setelah data berubah. */
export function revalidateContent(kind: 'lawyers' | 'articles') {
  revalidateTag(CONTENT_TAGS[kind]);
  // Artikel menampilkan data penulis (pengacara), jadi ikut disegarkan.
  if (kind === 'lawyers') revalidateTag(CONTENT_TAGS.articles);
  revalidatePath('/', 'layout');
}
