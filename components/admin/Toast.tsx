'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircleIcon, XIcon } from './shell/icons';

interface SuccessToastProps {
  /** Pesan sukses, mis. "Pengacara berhasil disimpan." */
  message: string;
  /** Nama query param pemicu (default "saved", mis. /admin/pengacara?saved=1). */
  param?: string;
}

const AUTO_HIDE_MS = 4000;
const EXIT_MS = 200;

function ToastInner({ message, param = 'saved' }: SuccessToastProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const exitTimer = useRef<number | undefined>(undefined);
  const frame = useRef<number | undefined>(undefined);

  const hide = useCallback(() => {
    setVisible(false);
    window.clearTimeout(exitTimer.current);
    exitTimer.current = window.setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  // Tampilkan saat param ada, lalu hapus param dari URL (param lain dipertahankan)
  // agar toast tidak muncul lagi ketika halaman dimuat ulang.
  useEffect(() => {
    if (!searchParams?.has(param)) return;

    window.clearTimeout(exitTimer.current);
    window.cancelAnimationFrame(frame.current ?? 0);
    setMounted(true);
    // Dua frame: pastikan elemen ter-render dulu agar transisi masuk terlihat.
    frame.current = window.requestAnimationFrame(() => {
      frame.current = window.requestAnimationFrame(() => setVisible(true));
    });

    const next = new URLSearchParams(searchParams.toString());
    next.delete(param);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, param, pathname, router]);

  useEffect(() => {
    if (!visible || paused) return;
    const timer = window.setTimeout(hide, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, paused, hide]);

  useEffect(
    () => () => {
      window.clearTimeout(exitTimer.current);
      window.cancelAnimationFrame(frame.current ?? 0);
    },
    []
  );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(6rem_+_env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 lg:bottom-6 lg:left-64 lg:justify-end lg:px-6"
    >
      {mounted && (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-emerald-200 bg-white p-3 pl-4 shadow-xl shadow-navy/10 transition-all duration-200 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <span className="mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircleIcon className="h-5 w-5" strokeWidth={2} />
          </span>
          <p className="min-w-0 flex-1 break-words py-2.5 text-sm font-medium leading-snug text-dark">{message}</p>
          <button
            type="button"
            onClick={hide}
            aria-label="Tutup notifikasi"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-dark/40 transition-colors hover:bg-dark/5 hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Toast sukses untuk halaman admin. Muncul bila URL memiliki query `param`
 * (default "saved"), hilang otomatis setelah ±4 detik.
 *
 * Contoh: router.push('/admin/pengacara?saved=1') lalu di halaman daftar
 * render <SuccessToast message="Data pengacara berhasil disimpan." />.
 */
export default function SuccessToast(props: SuccessToastProps) {
  return (
    <Suspense fallback={null}>
      <ToastInner {...props} />
    </Suspense>
  );
}
