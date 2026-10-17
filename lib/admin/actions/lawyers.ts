'use server';

import { getAdminWritesEnabled } from '@/lib/admin/auth';
import { authorizeWrite, mapDatabaseError, revalidateContent } from '@/lib/admin/guard';
import { isUuid } from '@/lib/admin/queries/lawyers';
import { lawyerInputSchema, toFieldErrors, type LawyerInput } from '@/lib/admin/schemas';
import type { SaveResult } from '@/lib/admin/types';
import { pingIndexNow } from '@/lib/seo/indexnow';

type LawyerSaveResult = SaveResult<{ id: string; slug: string }>;

const INVALID_MESSAGE = 'Periksa kembali isian yang ditandai.';
const UNEXPECTED_MESSAGE = 'Gagal menyimpan ke database. Coba lagi beberapa saat.';

// Slug tidak ikut diperbarui: URL profil yang sudah terindeks Google harus tetap sama.
const lawyerUpdateSchema = lawyerInputSchema.omit({ slug: true });

// Data sudah tersimpan: kegagalan refresh cache / ping tidak boleh membuat simpan dianggap gagal.
async function afterLawyerSaved(slug: string) {
  try {
    revalidateContent('lawyers');
  } catch (error) {
    console.error('[admin] revalidasi cache pengacara gagal', error);
  }
  await pingIndexNow(['/tim', `/tim/${slug}`, '/']);
}

/** Tambah pengacara baru. Hanya kolom hasil validasi zod yang ditulis. */
export async function createLawyer(input: LawyerInput): Promise<LawyerSaveResult> {
  const auth = await authorizeWrite();
  if (!auth.ok) return auth.result;

  const parsed = lawyerInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 'invalid', message: INVALID_MESSAGE, fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    const { data, error } = await auth.admin.supabase
      .from('lawyers')
      .insert(parsed.data)
      .select('id, slug')
      .single();

    if (error) return mapDatabaseError(error);

    const saved = data as { id: string; slug: string };
    await afterLawyerSaved(saved.slug);

    return {
      status: 'ok',
      data: { id: saved.id, slug: saved.slug },
      message: 'Pengacara baru berhasil ditambahkan.',
    };
  } catch (error) {
    console.error('[admin] createLawyer gagal', error);
    return { status: 'error', message: UNEXPECTED_MESSAGE };
  }
}

/** Perbarui profil pengacara (termasuk tampil/sembunyi & urutan). Slug tidak dapat diubah. */
export async function updateLawyer(id: string, input: LawyerInput): Promise<LawyerSaveResult> {
  const auth = await authorizeWrite();
  if (!auth.ok) return auth.result;

  if (!isUuid(id)) {
    return { status: 'error', message: 'Data pengacara tidak ditemukan.' };
  }

  const parsed = lawyerUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 'invalid', message: INVALID_MESSAGE, fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    const { data, error } = await auth.admin.supabase
      .from('lawyers')
      .update(parsed.data)
      .eq('id', id)
      .select('id, slug')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Tidak ada baris yang berubah: data tidak ada, atau RLS menolak karena HOLD baru saja aktif.
        const writesEnabled = await getAdminWritesEnabled(auth.admin.supabase);
        if (!writesEnabled) return { status: 'hold' };
        return { status: 'error', message: 'Data pengacara tidak ditemukan.' };
      }
      return mapDatabaseError(error);
    }

    const saved = data as { id: string; slug: string };
    await afterLawyerSaved(saved.slug);

    return {
      status: 'ok',
      data: { id: saved.id, slug: saved.slug },
      message: 'Profil pengacara berhasil diperbarui.',
    };
  } catch (error) {
    console.error('[admin] updateLawyer gagal', error);
    return { status: 'error', message: UNEXPECTED_MESSAGE };
  }
}
