export const locales = ['id', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'id';
export const localeCookieName = 'raya_locale';
export const localeCookieMaxAge = 60 * 60 * 24 * 365;

export const localeNames: Record<Locale, string> = {
  id: 'Indonesia',
  en: 'English',
};

export const localeShortLabels: Record<Locale, string> = {
  id: 'ID',
  en: 'EN',
};

export const localeOpenGraph: Record<Locale, string> = {
  id: 'id_ID',
  en: 'en_US',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

