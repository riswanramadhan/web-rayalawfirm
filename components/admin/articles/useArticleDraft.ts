'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const ARTICLE_DRAFT_KEY = 'raya-admin-article-draft-v1';
/** Cadangan draf lama bila pengguna mulai menulis artikel baru tanpa memilih Pulihkan/Buang. */
export const ARTICLE_DRAFT_BACKUP_KEY = 'raya-admin-article-draft-v1:previous';

export interface StoredDraft<T> {
  version: 1;
  savedAt: string;
  data: T;
}

interface UseArticleDraftOptions<T> {
  value: T;
  /** false → berhenti menyimpan (mis. setelah artikel berhasil terbit). */
  enabled: boolean;
  isEmpty: (value: T) => boolean;
  /** Validasi data dari localStorage (bisa rusak / versi lama). null = abaikan. */
  sanitize: (raw: unknown) => T | null;
  delay?: number;
}

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(ARTICLE_DRAFT_KEY);
  } catch {
    return null;
  }
}

function writeStorage(text: string, key: string = ARTICLE_DRAFT_KEY): boolean {
  try {
    window.localStorage.setItem(key, text);
    return true;
  } catch {
    return false;
  }
}

function removeStorage() {
  try {
    window.localStorage.removeItem(ARTICLE_DRAFT_KEY);
  } catch {
    // abaikan (mode privat / penyimpanan diblokir)
  }
}

/**
 * Simpan draf artikel otomatis ke localStorage (debounce ±800 ms). Penting
 * karena pada mode HOLD tidak ada yang tersimpan ke database.
 *
 * Bila draf lama ditemukan saat halaman dibuka, draf lama tidak disentuh selama
 * form masih kosong. Begitu pengguna mulai menulis (tanpa memilih Pulihkan/Buang),
 * draf lama dicadangkan ke ARTICLE_DRAFT_BACKUP_KEY dan tulisan baru tetap
 * tersimpan otomatis — sehingga tidak ada tulisan yang hilang pada mode HOLD.
 */
export function useArticleDraft<T>({ value, enabled, isEmpty, sanitize, delay = 800 }: UseArticleDraftOptions<T>) {
  const [pendingDraft, setPendingDraft] = useState<StoredDraft<T> | null>(null);
  const [ready, setReady] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  const valueRef = useRef(value);
  const stoppedRef = useRef(false);
  const blockedRef = useRef(true);
  const isEmptyRef = useRef(isEmpty);
  const sanitizeRef = useRef(sanitize);
  const timerRef = useRef<number | undefined>(undefined);
  const scheduledRef = useRef(false);
  const pendingRef = useRef<StoredDraft<T> | null>(null);
  const backedUpRef = useRef(false);

  valueRef.current = value;
  isEmptyRef.current = isEmpty;
  sanitizeRef.current = sanitize;

  // Baca draf lama sekali saat mount (hanya di browser).
  useEffect(() => {
    const raw = readStorage();
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<StoredDraft<unknown>>;
        const data = parsed && parsed.version === 1 ? sanitizeRef.current(parsed.data) : null;
        if (data && !isEmptyRef.current(data)) {
          setPendingDraft({
            version: 1,
            savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : new Date().toISOString(),
            data,
          });
        } else {
          removeStorage();
        }
      } catch {
        removeStorage();
      }
    }
    setReady(true);
  }, []);

  blockedRef.current = !ready || !enabled;
  pendingRef.current = pendingDraft;

  const persist = useCallback(() => {
    scheduledRef.current = false;
    if (stoppedRef.current || blockedRef.current) return;
    const current = valueRef.current;
    const empty = isEmptyRef.current(current);
    if (pendingRef.current) {
      // Jangan timpa draf lama sebelum pengguna benar-benar mulai menulis.
      if (empty) return;
      if (!backedUpRef.current) {
        writeStorage(JSON.stringify(pendingRef.current), ARTICLE_DRAFT_BACKUP_KEY);
        backedUpRef.current = true;
      }
    }
    if (empty) {
      removeStorage();
      setLastSavedAt(null);
      return;
    }
    const savedAt = new Date().toISOString();
    const ok = writeStorage(JSON.stringify({ version: 1, savedAt, data: current } satisfies StoredDraft<T>));
    setSaveFailed(!ok);
    if (ok) setLastSavedAt(savedAt);
  }, []);

  useEffect(() => {
    if (!ready || !enabled) return;
    window.clearTimeout(timerRef.current);
    scheduledRef.current = true;
    timerRef.current = window.setTimeout(persist, delay);
    return () => window.clearTimeout(timerRef.current);
  }, [value, ready, enabled, delay, persist]);

  // Pindah halaman lewat navigasi aplikasi (tanpa beforeunload): simpan perubahan terakhir.
  useEffect(
    () => () => {
      if (scheduledRef.current) persist();
    },
    [persist]
  );

  // Simpan segera saat tab ditutup / disembunyikan (debounce belum sempat jalan).
  useEffect(() => {
    const flush = () => {
      window.clearTimeout(timerRef.current);
      persist();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [persist]);

  /** Ambil data draf lama untuk dipulihkan ke form. */
  const restore = useCallback((): T | null => {
    const data = pendingDraft?.data ?? null;
    setPendingDraft(null);
    if (pendingDraft) setLastSavedAt(pendingDraft.savedAt);
    return data;
  }, [pendingDraft]);

  /** Buang draf lama; penyimpanan otomatis berlanjut dengan isian saat ini. */
  const discard = useCallback(() => {
    try {
      window.localStorage.removeItem(ARTICLE_DRAFT_BACKUP_KEY);
    } catch {
      // abaikan
    }
    // Bila tulisan baru sudah tersimpan di kunci utama, jangan ikut dihapus.
    if (!backedUpRef.current) {
      removeStorage();
      setLastSavedAt(null);
    }
    backedUpRef.current = false;
    setPendingDraft(null);
  }, []);

  /** Hapus draf permanen (setelah artikel terbit) dan hentikan penyimpanan otomatis. */
  const clear = useCallback(() => {
    stoppedRef.current = true;
    window.clearTimeout(timerRef.current);
    removeStorage();
    setLastSavedAt(null);
  }, []);

  return { ready, pendingDraft, restore, discard, clear, lastSavedAt, saveFailed };
}
