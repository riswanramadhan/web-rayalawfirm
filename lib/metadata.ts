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
    'Raya Law Firm adalah kantor hukum profesional di Indonesia yang melayani perkara pidana, perdata, bisnis, keluarga, properti, dan ketenagakerjaan.',
  keywords: [
    'kantor hukum indonesia',
    'pengacara profesional',
    'advokat terpercaya',
    'konsultasi hukum',
    'pengacara pidana',
    'pengacara perdata',
    'hukum bisnis indonesia',
    'raya law firm',
  ],
  ogImage: '/images/logo-rayalawfirm.png',
  email: 'rayaraya.lfadm@gmail.com',
  address: {
    street: 'Jl. Tebet Barat Dalam IV No. 10',
    city: 'Jakarta',
    region: 'DKI Jakarta',
    postalCode: '',
    country: 'Indonesia',
  },
  phone: '+6281335663379',
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
  telephone: siteConfig.phone,
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
  areaServed: 'Indonesia',
} as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL('/logo.png', siteConfig.url).toString(),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    contactType: 'customer service',
    email: siteConfig.email,
    areaServed: 'ID',
    availableLanguage: ['id', 'en'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: 'ID',
  },
} as const;
