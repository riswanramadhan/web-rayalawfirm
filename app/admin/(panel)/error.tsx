'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { RefreshIcon, WarningIcon } from '@/components/admin/shell/icons';
import { primaryButtonClassName, secondaryButtonClassName } from '@/components/admin/form';

export default function AdminPanelError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[admin] page error', error);
  }, [error]);

  return (
    <div className="flex min-h-[60dvh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-dark/[0.06] bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600" aria-hidden="true">
          <WarningIcon className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-sans text-xl font-bold text-dark sm:text-2xl">Terjadi kendala</h1>
        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-dark/60">
          Halaman ini tidak dapat ditampilkan untuk sementara. Silakan coba lagi. Jika masalah berlanjut, periksa koneksi
          internet Anda atau hubungi pengelola website.
        </p>
        {error.digest && <p className="mt-3 text-xs text-dark/35">Kode: {error.digest}</p>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={reset} className={primaryButtonClassName}>
            <RefreshIcon className="h-4 w-4" />
            Coba lagi
          </button>
          <Link href="/admin" className={secondaryButtonClassName}>
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
