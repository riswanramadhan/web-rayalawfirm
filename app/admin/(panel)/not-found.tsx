import Link from 'next/link';
import { ArrowLeftIcon, DocumentIcon } from '@/components/admin/shell/icons';

// Sengaja tidak mengimpor konstanta dari components/admin/form ('use client'):
// nilai non-komponen dari modul client tidak bisa dibaca di server component.
const buttonClassName =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30';

export default function AdminPanelNotFound() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-dark/[0.06] bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary" aria-hidden="true">
          <DocumentIcon className="h-7 w-7" />
        </span>
        <p className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-gold">404</p>
        <h1 className="mt-1 font-sans text-xl font-bold text-dark sm:text-2xl">Halaman tidak ditemukan</h1>
        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-dark/60">
          Data yang Anda cari mungkin sudah tidak tersedia atau alamatnya salah.
        </p>
        <Link href="/admin" className={`${buttonClassName} mt-6`}>
          <ArrowLeftIcon className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
