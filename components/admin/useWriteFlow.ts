'use client';

import { useCallback, useState } from 'react';
import { requestWriteAccess } from '@/lib/admin/actions/access';
import type { SaveResult, WriteAction } from '@/lib/admin/types';

export type WritePhase = 'idle' | 'checking' | 'uploading' | 'saving';

interface ExecuteOptions<P, T> {
  action: WriteAction;
  /** Ringkasan singkat untuk log developer (nama pengacara / judul artikel). */
  summary: string;
  /** Data form tanpa File — dicatat bila mode HOLD aktif. */
  payload: unknown;
  /** Langkah sebelum simpan, mis. upload gambar. Hanya jalan bila izin tulis aktif. */
  prepare?: () => Promise<P>;
  /** Panggil server action penyimpanan. */
  save: (prepared: P | undefined) => Promise<SaveResult<T>>;
}

/**
 * Alur simpan standar admin:
 *   1. requestWriteAccess() → bila HOLD: tampilkan dialog, berhenti (form tetap terisi).
 *   2. prepare() (upload gambar).
 *   3. save() (server action; dicek ulang di server + RLS database).
 */
export function useWriteFlow() {
  const [phase, setPhase] = useState<WritePhase>('idle');
  const [holdOpen, setHoldOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <P, T>(options: ExecuteOptions<P, T>): Promise<SaveResult<T> | null> => {
    setError(null);
    setPhase('checking');

    try {
      const access = await requestWriteAccess({
        action: options.action,
        summary: options.summary,
        payload: options.payload,
      });

      if (!access) {
        setError('Sesi Anda berakhir. Silakan login ulang.');
        return { status: 'unauthorized', message: 'Sesi Anda berakhir. Silakan login ulang.' };
      }

      if (access.status === 'hold') {
        setHoldOpen(true);
        return { status: 'hold' };
      }

      if (access.status !== 'enabled') {
        setError(access.message);
        // Teruskan 'unauthorized' agar form bisa menampilkan tautan login ulang.
        return access.status === 'unauthorized' ? access : null;
      }

      let prepared: P | undefined;
      if (options.prepare) {
        setPhase('uploading');
        prepared = await options.prepare();
      }

      setPhase('saving');
      const result = await options.save(prepared);

      if (!result) {
        setError('Sesi Anda berakhir. Silakan login ulang.');
        return { status: 'unauthorized', message: 'Sesi Anda berakhir. Silakan login ulang.' };
      }

      if (result.status === 'hold') {
        setHoldOpen(true);
      } else if (result.status !== 'ok') {
        setError(result.message);
      }

      return result;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Terjadi kesalahan. Coba lagi.');
      return null;
    } finally {
      setPhase('idle');
    }
  }, []);

  const closeHold = useCallback(() => setHoldOpen(false), []);

  return {
    phase,
    busy: phase !== 'idle',
    holdOpen,
    closeHold,
    error,
    setError,
    execute,
  };
}

export const phaseLabel: Record<WritePhase, string> = {
  idle: 'Simpan',
  checking: 'Memeriksa akses…',
  uploading: 'Mengunggah gambar…',
  saving: 'Menyimpan…',
};
