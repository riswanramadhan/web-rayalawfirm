/**
 * Kelas Tailwind bersama untuk form admin. Sengaja di modul TANPA 'use client'
 * agar bisa dipakai server component (ekspor dari modul client berubah
 * menjadi client reference, bukan string).
 */
export const inputClassName =
  'block w-full rounded-xl border border-dark/15 bg-white px-4 py-3 text-base text-dark placeholder:text-dark/35 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-dark/5 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15';

export const primaryButtonClassName =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60';

export const secondaryButtonClassName =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-dark/15 bg-white px-5 text-sm font-semibold text-dark transition-colors hover:bg-dark/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60';
