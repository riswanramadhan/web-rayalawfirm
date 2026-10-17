import type { ArticleEntry, FaqItem, LawyerProfile } from '@/lib/content/types';
import { getServiceSeo, services as staticServices, type Service } from '@/lib/data/services';
import type { Locale } from '@/lib/i18n/config';
import { canonicalUrl, siteConfig } from '@/lib/metadata';

/**
 * Builder JSON-LD (schema.org). Semua entitas utama memakai @id yang stabil
 * sehingga Google & mesin AI bisa menghubungkan Organisasi ↔ Website ↔
 * Halaman ↔ Layanan ↔ Pengacara ↔ Artikel menjadi satu knowledge graph.
 */

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export const SCHEMA_IDS = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  logo: `${siteConfig.url}/#logo`,
} as const;

const inLanguage = (locale: Locale) => (locale === 'en' ? 'en-US' : 'id-ID');
const toE164 = (phone: string) => `+${phone.replace(/[^\d]/g, '')}`;

export const lawyerSchemaId = (slug: string) => `${absoluteUrl(`/tim/${slug}`)}#person`;
export const articleSchemaId = (slug: string) => `${absoluteUrl(`/artikel/${slug}`)}#article`;
export const serviceSchemaId = (slug: string) => `${absoluteUrl(`/layanan/${slug}`)}#service`;
export const webPageSchemaId = (path: string) => `${canonicalUrl(path)}#webpage`;

const AREA_SERVED = [
  { '@type': 'City', name: 'Jakarta' },
  { '@type': 'City', name: 'Makassar' },
  { '@type': 'Country', name: 'Indonesia' },
];

const AVAILABLE_LANGUAGES = ['Indonesian', 'English'];

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: `${siteConfig.address.street}, ${siteConfig.address.district}`,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.countryCode,
};

export function buildOrganizationSchema() {
  return {
    '@type': 'LegalService',
    '@id': SCHEMA_IDS.organization,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ['Raya Law', 'RAYA Law Firm', 'Kantor Hukum Raya'],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      '@id': SCHEMA_IDS.logo,
      url: absoluteUrl(siteConfig.logo),
      contentUrl: absoluteUrl(siteConfig.logo),
      width: siteConfig.logoSize.width,
      height: siteConfig.logoSize.height,
      caption: siteConfig.name,
    },
    image: absoluteUrl(siteConfig.ogImage),
    telephone: toE164(siteConfig.phone),
    email: siteConfig.email,
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Cash, Bank Transfer',
    address: POSTAL_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Jl.+Tebet+Barat+Dalam+IV+No.10+Jakarta+Selatan',
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
    areaServed: AREA_SERVED,
    knowsLanguage: ['id', 'en'],
    knowsAbout: [
      'Hukum Pidana',
      'Hukum Perdata',
      'Hukum Bisnis dan Korporasi',
      'Hukum Ketenagakerjaan',
      'Hukum Keluarga',
      'Hukum Pertanahan dan Properti',
      'Hukum Tata Usaha Negara',
      'Litigasi',
      'Mediasi',
      'Legal Drafting',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Hukum Raya Law Firm',
      url: absoluteUrl('/layanan'),
      itemListElement: staticServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': serviceSchemaId(service.slug),
          name: service.title,
          url: absoluteUrl(`/layanan/${service.slug}`),
        },
      })),
    },
    sameAs: [siteConfig.social.instagram],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: toE164(siteConfig.phone),
        contactType: 'customer service',
        email: siteConfig.email,
        areaServed: 'ID',
        availableLanguage: AVAILABLE_LANGUAGES,
      },
      {
        '@type': 'ContactPoint',
        telephone: toE164(siteConfig.alternatePhone),
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: AVAILABLE_LANGUAGES,
      },
    ],
  };
}

export function buildWebsiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: 'Raya Law',
    description: siteConfig.description,
    inLanguage: inLanguage(locale),
    publisher: { '@id': SCHEMA_IDS.organization },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/artikel?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Graph global yang dipasang di layout publik (Organisasi + Website). */
export function buildSiteGraph(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationSchema(), buildWebsiteSchema(locale)],
  };
}

export interface BreadcrumbSchemaItem {
  name: string;
  /** Path relatif, mis. "/tim". Item terakhir boleh tanpa path. */
  path?: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[], currentPath?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const path = item.path ?? (index === items.length - 1 ? currentPath : undefined);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(path ? { item: absoluteUrl(path) } : {}),
      };
    }),
  };
}

/** URL profil sosial yang valid untuk sameAs (bukan halaman hasil pencarian). */
export const isProfileUrl = (url: string) => /^https?:\/\//.test(url) && !/\/search\//.test(url);

const EDITORIAL_AUTHOR_NAMES = ['tim redaksi raya law firm', 'raya law firm editorial team', 'admin raya law firm'];

/**
 * Penulis artikel untuk JSON-LD — selalu sama dengan byline yang terlihat:
 * advokat (Person + profil), tim redaksi (Organization bagian dari firma), atau
 * penulis tamu (Person dengan nama saja).
 */
export function buildArticleAuthorSchema(author: ArticleEntry['author']) {
  if (author.lawyerSlug) {
    return {
      '@type': 'Person',
      '@id': lawyerSchemaId(author.lawyerSlug),
      name: author.name,
      url: absoluteUrl(`/tim/${author.lawyerSlug}`),
      ...(author.position ? { jobTitle: author.position } : {}),
    };
  }

  if (EDITORIAL_AUTHOR_NAMES.includes(author.name.trim().toLowerCase())) {
    return {
      '@type': 'Organization',
      name: author.name,
      url: absoluteUrl('/tentang'),
      parentOrganization: { '@id': SCHEMA_IDS.organization },
    };
  }

  return { '@type': 'Person', name: author.name };
}

export function buildPersonSchema(lawyer: LawyerProfile, locale: Locale) {
  const sameAs = [lawyer.linkedin, lawyer.instagram, lawyer.facebook].filter(isProfileUrl);
  const knowsAbout = Array.from(new Set([...lawyer.expertise, ...lawyer.handledCases])).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': lawyerSchemaId(lawyer.slug),
    name: lawyer.name,
    url: absoluteUrl(`/tim/${lawyer.slug}`),
    image: absoluteUrl(lawyer.image),
    jobTitle: lawyer.position,
    description:
      lawyer.bio?.trim() ||
      (locale === 'en'
        ? `${lawyer.name} is ${lawyer.position} at ${siteConfig.name}, focusing on ${lawyer.specialization}.`
        : `${lawyer.name} adalah ${lawyer.position} di ${siteConfig.name} dengan fokus ${lawyer.specialization}.`),
    worksFor: { '@id': SCHEMA_IDS.organization },
    knowsAbout: knowsAbout.length ? knowsAbout : [lawyer.specialization],
    ...(lawyer.achievements.length ? { award: lawyer.achievements } : {}),
    ...(lawyer.education.length
      ? { alumniOf: lawyer.education.map((name) => ({ '@type': 'EducationalOrganization', name })) }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(lawyer.email ? { email: lawyer.email } : {}),
    knowsLanguage: ['id', 'en'],
    nationality: { '@type': 'Country', name: 'Indonesia' },
  };
}

export function buildArticleSchema(article: ArticleEntry, locale: Locale) {
  const url = absoluteUrl(`/artikel/${article.slug}`);
  const author = buildArticleAuthorSchema(article.author);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleSchemaId(article.slug),
    headline: article.title.slice(0, 110),
    description: article.metaDescription || article.excerpt,
    image: [absoluteUrl(article.image)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [author],
    publisher: {
      '@type': 'Organization',
      '@id': SCHEMA_IDS.organization,
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    wordCount: article.wordCount,
    timeRequired: `PT${article.readingMinutes}M`,
    inLanguage: inLanguage(locale),
    isAccessibleForFree: true,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: { '@type': 'Thing', name: article.category },
    ...(article.keyPoints.length ? { abstract: article.keyPoints.join(' ') } : {}),
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Halaman detail layanan: Service yang disediakan oleh organisasi (LegalService). */
export function buildServiceSchema(service: Service, locale: Locale) {
  const url = absoluteUrl(`/layanan/${service.slug}`);
  const seo = getServiceSeo(service.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceSchemaId(service.slug),
    name: service.title,
    serviceType: locale === 'en' || !seo ? service.title : seo.serviceType,
    category: locale === 'en' ? 'Legal services' : 'Layanan hukum',
    description: service.shortDesc,
    url,
    mainEntityOfPage: { '@id': webPageSchemaId(`/layanan/${service.slug}`) },
    provider: { '@id': SCHEMA_IDS.organization },
    areaServed: AREA_SERVED,
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        name: locale === 'en' ? 'WhatsApp consultation' : 'Konsultasi via WhatsApp',
        serviceUrl: `https://wa.me/${siteConfig.phone.replace(/[^\d]/g, '')}`,
        servicePhone: {
          '@type': 'ContactPoint',
          telephone: toE164(siteConfig.phone),
          contactType: 'customer service',
          availableLanguage: AVAILABLE_LANGUAGES,
        },
      },
      {
        '@type': 'ServiceChannel',
        name: locale === 'en' ? 'Online consultation form' : 'Formulir konsultasi online',
        serviceUrl: absoluteUrl('/konsultasi'),
      },
      {
        '@type': 'ServiceChannel',
        name: locale === 'en' ? 'Office visit' : 'Kunjungan kantor',
        serviceLocation: {
          '@type': 'Place',
          name: siteConfig.name,
          address: POSTAL_ADDRESS,
        },
      },
    ],
    ...(service.highlights.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: locale === 'en' ? `${service.title} scope` : `Lingkup layanan ${service.title}`,
            itemListElement: service.highlights.map((highlight) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: highlight },
            })),
          },
        }
      : {}),
  };
}

/** Halaman /layanan: daftar layanan (ItemList) untuk carousel/ringkasan. */
export function buildServiceListSchema(services: Service[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${canonicalUrl('/layanan')}#services`,
    name: locale === 'en' ? `${siteConfig.name} legal services` : `Layanan hukum ${siteConfig.name}`,
    numberOfItems: services.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/layanan/${service.slug}`),
      name: service.title,
    })),
  };
}

export interface WebPageSchemaInput {
  path: string;
  name: string;
  description?: string;
  locale: Locale;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'ItemPage';
  /** Path/URL gambar utama halaman. */
  image?: string;
  datePublished?: string;
  dateModified?: string;
  /** Referensi entitas utama, mis. { '@id': serviceSchemaId(slug) }. */
  mainEntity?: Record<string, unknown>;
  about?: Record<string, unknown>;
}

/** WebPage generik yang terhubung ke WebSite & Organisasi lewat @id. */
export function buildWebPageSchema({
  path,
  name,
  description,
  locale,
  type = 'WebPage',
  image,
  datePublished,
  dateModified,
  mainEntity,
  about,
}: WebPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': webPageSchemaId(path),
    url: canonicalUrl(path),
    name,
    ...(description ? { description } : {}),
    inLanguage: inLanguage(locale),
    isPartOf: { '@id': SCHEMA_IDS.website },
    publisher: { '@id': SCHEMA_IDS.organization },
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(image) } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(mainEntity ? { mainEntity } : {}),
    ...(about ? { about } : {}),
  };
}
