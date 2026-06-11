import type { Metadata } from 'next';
import {
  defaultLocale,
  localeOpenGraph,
  type Locale,
} from './i18n/config';

export const siteConfig = {
  name: 'Raya Law Firm',
  url: 'https://rayalawfirm.com',
  description:
    'Raya Law Firm hadir memberikan solusi hukum komprehensif dengan tim advokat berpengalaman. Kami mendampingi Anda di setiap langkah, dari konsultasi hingga penyelesaian perkara.',
  keywords: [
    'konsultan hukum makassar',
    'konsultasi hukum jakarta',
    'konsultan hukum di makassar',
    'konsultan hukum',
    'advokat di jakarta',
    'advokat di makassar',
    'kantor hukum profesional indonesia',
    'raya law firm',
    'kantor hukum makassar',
    'advokasi makassar',
    'pengacara makassar',
    'pengacara jakarta',
    'kantor hukum indonesia',
    'kantor hukum jakarta',
    'pengacara profesional',
    'advokat terpercaya',
    'konsultasi hukum',
    'konsultasi hukum online',
    'pengacara pidana',
    'pengacara perdata',
    'hukum bisnis indonesia',
    'pengacara sengketa tanah',
    'pengacara hutang piutang',
    'pengacara ketenagakerjaan',
    'corporate lawyer indonesia',
  ],
  ogImage: '/images/og-rayalawfirm.png',
  logo: '/images/logo-rayalawfirm.png',
  email: 'info@rayalawfirm.com',
  address: {
    street: 'Jl. Tebet Barat Dalam IV No. 10',
    city: 'Jakarta',
    region: 'DKI Jakarta',
    postalCode: '',
    country: 'Indonesia',
  },
  phone: '+6281335663379',
  alternatePhone: '+6285345108869',
  openHours: {
    days: 'Senin - Jumat',
    opens: '08:00',
    closes: '17:00',
    timezone: 'WIB',
  },
} as const;

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  locale?: Locale;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  locale = defaultLocale,
}: PageMetadataInput): Metadata {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  const pageUrl = new URL(safePath, siteConfig.url).toString();
  const imageUrl = new URL(ogImage ?? siteConfig.ogImage, siteConfig.url).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: pageUrl },
    keywords: [...siteConfig.keywords],
    openGraph: {
      type: 'website',
      locale: localeOpenGraph[locale],
      url: pageUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

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
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: 'ID',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: siteConfig.openHours.opens,
    closes: siteConfig.openHours.closes,
  },
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'Makassar' },
    { '@type': 'City', name: 'Jakarta' },
    { '@type': 'Country', name: 'Indonesia' },
  ],
  knowsAbout: siteConfig.keywords,
  sameAs: ['https://www.instagram.com/rayalawfirm.official'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'legal consultation',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.alternatePhone,
      contactType: 'legal consultation',
      email: siteConfig.email,
      areaServed: 'ID',
      availableLanguage: ['id', 'en'],
    },
  ],
} as const;

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
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: 'ID',
  },
} as const;
