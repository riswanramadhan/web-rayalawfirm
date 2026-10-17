'use server';

import { getAdminContext, getAdminWritesEnabled } from '@/lib/admin/auth';
import type { WriteAccessResult, WriteAction } from '@/lib/admin/types';

const ALLOWED_ACTIONS: readonly WriteAction[] = ['lawyer.create', 'lawyer.update', 'article.create'];
// Batas DB: octet_length(payload::text) <= 300000 (byte UTF-8, jsonb menambah spasi).
const MAX_PAYLOAD_BYTES = 270_000;

interface WriteAccessRequest {
  action: WriteAction;
  /** Ringkasan singkat, mis. nama pengacara / judul artikel. */
  summary: string;
  /** Data form (tanpa file) — dicatat untuk developer saat mode HOLD. */
  payload?: unknown;
}

/**
 * Dipanggil client SEBELUM upload gambar & menyimpan. Jika mode HOLD aktif,
 * percobaan dicatat ke tabel admin_write_requests dan mengembalikan
 * { status: 'hold' } sehingga UI menampilkan dialog "hubungi developer".
 */
export async function requestWriteAccess(request: WriteAccessRequest): Promise<WriteAccessResult> {
  if (!ALLOWED_ACTIONS.includes(request.action)) {
    return { status: 'error', message: 'Aksi tidak dikenali.' };
  }

  const context = await getAdminContext();

  if (!context.configured) {
    return { status: 'error', message: 'Database belum dikonfigurasi. Hubungi developer.' };
  }

  if (!context.user || !context.isAdmin) {
    return { status: 'unauthorized', message: 'Sesi Anda berakhir. Silakan login ulang.' };
  }

  if (await getAdminWritesEnabled(context.supabase)) {
    return { status: 'enabled' };
  }

  let payload: unknown = request.payload ?? {};
  try {
    if (new TextEncoder().encode(JSON.stringify(payload)).length > MAX_PAYLOAD_BYTES) {
      payload = { note: 'Payload terlalu besar, tidak disimpan.' };
    }
  } catch {
    payload = {};
  }

  const { error } = await context.supabase.from('admin_write_requests').insert({
    action: request.action,
    summary: String(request.summary ?? '').slice(0, 300),
    payload,
    user_email: context.user.email ?? null,
  });

  if (error) {
    console.error('[admin] gagal mencatat permintaan hold', error);
    // Tetap catat percobaannya walau isi form tidak muat.
    await context.supabase.from('admin_write_requests').insert({
      action: request.action,
      summary: String(request.summary ?? '').slice(0, 300),
      payload: { note: 'Isi form tidak dapat disimpan di log.' },
      user_email: context.user.email ?? null,
    });
  }

  return { status: 'hold' };
}
