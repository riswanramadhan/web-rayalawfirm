import type { Metadata } from 'next';
import {
  defaultLocale,
  localeOpenGraph,
  type Locale,
} from './i18n/config';

export const siteConfig = {
  name: 'Raya Law Firm',
  legalName: 'Raya Law Firm',
  url: 'https://rayalawfirm.com',
  description:
    'Raya Law Firm, kantor hukum di Jakarta Selatan: konsultasi hukum & pendampingan perkara pidana, perdata, bisnis, keluarga, sengketa tanah, dan ketenagakerjaan.',
  tagline: 'Kantor Hukum & Konsultan Hukum di Jakarta',
  /** Daftar topik/kata kunci situs (referensi; jangan ditempel utuh ke setiap halaman). */
  keywords: [
    'raya law firm',
    'kantor hukum jakarta',
    'konsultan hukum jakarta',
    'pengacara jakarta',
    'advokat jakarta',
    'law firm jakarta selatan',
    'konsultasi hukum online',
    'pengacara pidana',
    'pengacara perdata',
    'pengacara sengketa tanah',
    'pengacara perceraian',
    'pengacara ketenagakerjaan',
    'konsultan hukum bisnis',
    'pengacara ptun',
    'konsultan hukum makassar',
    'pengacara makassar',
  ],
  /** Kata kunci inti untuk halaman tanpa kata kunci spesifik. */
  coreKeywords: [
    'raya law firm',
    'kantor hukum jakarta',
    'konsultan hukum jakarta',
    'pengacara jakarta',
    'advokat jakarta',
    'konsultasi hukum online',
  ],
  ogImage: '/images/og-rayalawfirm.jpg',
  /** Dimensi file og-rayalawfirm.jpg (JPEG < 300 KB agar pratinjau WhatsApp muncul). */
  ogImageSize: { width: 1200, height: 630 },
  ogImageAlt: 'Raya Law Firm — Kantor Hukum dan Konsultan Hukum di Jakarta',
  logo: '/images/logo-rayalawfirm.png',
  /** Dimensi file logo-rayalawfirm.png (sudah diperkecil untuk web). */
  logoSize: { width: 600, height: 600 },
  email: 'info@rayalawfirm.com',
  address: {
    street: 'Jl. Tebet Barat Dalam IV No. 10',
    district: 'Tebet Barat',
    city: 'Jakarta Selatan',
    region: 'DKI Jakarta',
    postalCode: '12810',
    country: 'Indonesia',
    countryCode: 'ID',
  },
  geo: { latitude: -6.2375391, longitude: 106.843319 },
  phone: '+6281335663379',
  alternatePhone: '+6285345108869',
  openHours: {
    days: 'Senin - Jumat',
    opens: '08:00',
    closes: '17:00',
    timezone: 'WIB',
    /** Jam Sabtu sesuai halaman Kontak & Konsultasi. */
    saturday: { opens: '09:00', closes: '13:00' },
  },
  serviceAreas: ['Jakarta', 'Makassar', 'Seluruh Indonesia'],
  social: {
    instagram: 'https://www.instagram.com/rayalawfirm.official',
  },
  feedPath: '/feed.xml',
  feedTitle: 'Artikel Hukum Raya Law Firm',
} as const;

const BRAND_PATTERN = /raya\s+law\s+firm/i;

/** True bila judul sudah memuat nama brand (agar template tidak menambahkannya lagi). */
export const titleHasBrand = (title: string) => BRAND_PATTERN.test(title);

/** Judul lengkap dengan brand, mis. untuk og:title. */
export const brandedTitle = (title: string) =>
  titleHasBrand(title) ? title.trim() : `${title.trim()} | ${siteConfig.name}`;

/** "+6281335663379" → "+62 813-3566-3379" */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  const local = digits.startsWith('62') ? digits.slice(2) : digits.replace(/^0/, '');
  if (local.length < 8) return `+62 ${local}`;
  return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
}

const toAbsoluteUrl = (pathOrUrl: string) => new URL(pathOrUrl, siteConfig.url).toString();

/** URL kanonis absolut tanpa query/hash dan tanpa garis miring di akhir. */
export function canonicalUrl(path: string): string {
  const url = new URL(path.startsWith('/') || /^https?:\/\//.test(path) ? path : `/${path}`, siteConfig.url);
  url.search = '';
  url.hash = '';
  if (url.pathname === '/' || url.pathname === '') return siteConfig.url;
  return url.toString().replace(/\/+$/, '');
}

/** <link rel="alternate" type="application/rss+xml"> — ikut di setiap halaman. */
export const feedAlternateTypes = {
  'application/rss+xml': [{ url: toAbsoluteUrl(siteConfig.feedPath), title: siteConfig.feedTitle }],
};

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  locale?: Locale;
  type?: 'website' | 'article' | 'profile';
  /** ISO 8601 (khusus type 'article'). */
  publishedTime?: string;
  /** ISO 8601 (khusus type 'article'). */
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  /** Kata kunci spesifik halaman; default: siteConfig.coreKeywords. */
  keywords?: string[];
  noIndex?: boolean;
  imageAlt?: string;
  /** Dimensi ogImage kustom bila diketahui. */
  imageWidth?: number;
  imageHeight?: number;
}

const unique = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  locale = defaultLocale,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  keywords,
  noIndex,
  imageAlt,
  imageWidth,
  imageHeight,
}: PageMetadataInput): Metadata {
  const pageUrl = canonicalUrl(path);
  const fullTitle = brandedTitle(title);
  const usesDefaultImage = !ogImage || ogImage === siteConfig.ogImage;
  const imageUrl = toAbsoluteUrl(ogImage || siteConfig.ogImage);
  const alt = imageAlt?.trim() || (usesDefaultImage ? siteConfig.ogImageAlt : fullTitle);
  const dimensions = usesDefaultImage
    ? siteConfig.ogImageSize
    : imageWidth && imageHeight
      ? { width: imageWidth, height: imageHeight }
      : {};
  const image = { url: imageUrl, alt, ...dimensions };
  const cleanAuthors = authors ? unique(authors) : [];

  const baseOpenGraph = {
    locale: localeOpenGraph[locale],
    url: pageUrl,
    title: fullTitle,
    description,
    siteName: siteConfig.name,
    images: [image],
  };

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          ...baseOpenGraph,
          type: 'article',
          ...(publishedTime ? { publishedTime } : {}),
          ...(modifiedTime ? { modifiedTime } : {}),
          ...(cleanAuthors.length ? { authors: cleanAuthors } : {}),
          ...(section ? { section } : {}),
          ...(tags?.length ? { tags: unique(tags) } : {}),
        }
      : type === 'profile'
        ? { ...baseOpenGraph, type: 'profile' }
        : { ...baseOpenGraph, type: 'website' };

  return {
    // Judul yang sudah memuat brand dipakai apa adanya agar tidak menjadi "X | Raya Law Firm | Raya Law Firm".
    title: titleHasBrand(title) ? { absolute: title.trim() } : title.trim(),
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
      types: feedAlternateTypes,
    },
    keywords: unique(keywords?.length ? keywords : [...siteConfig.coreKeywords]),
    ...(cleanAuthors.length ? { authors: cleanAuthors.map((name) => ({ name })) } : {}),
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: imageUrl, alt }],
    },
  };
}

/**
 * @deprecated Gunakan buildSiteGraph() / buildOrganizationSchema() dari lib/seo/schema.ts
 * (sudah dipasang global di app/(site)/layout.tsx).
 */
export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
  logo: new URL(siteConfig.logo, siteConfig.url).toString(),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.street}, ${siteConfig.address.district}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: siteConfig.openHours.opens,
      closes: siteConfig.openHours.closes,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: siteConfig.openHours.saturday.opens,
      closes: siteConfig.openHours.saturday.closes,
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Jakarta' },
    { '@type': 'City', name: 'Makassar' },
    { '@type': 'Country', name: 'Indonesia' },
  ],
  sameAs: [siteConfig.social.instagram],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.alternatePhone,
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
  ],
} as const;

/** @deprecated Gunakan buildOrganizationSchema() dari lib/seo/schema.ts. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL(siteConfig.logo, siteConfig.url).toString(),
  image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.alternatePhone,
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.street}, ${siteConfig.address.district}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
} as const;
