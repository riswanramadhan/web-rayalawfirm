import type { Locale } from '@/lib/i18n/config';

const intlLocale: Record<Locale, string> = { id: 'id-ID', en: 'en-US' };

/** "10 Mei 2026" / "May 10, 2026" — zona waktu Jakarta agar konsisten server/klien. */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(date);
}

/** "7 menit baca" / "7 min read" */
export function formatReadingTime(minutes: number, locale: Locale): string {
  return locale === 'en' ? `${minutes} min read` : `${minutes} menit baca`;
}
