import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getArticles } from '@/lib/content/articles';
import { formatDate, formatReadingTime } from '@/lib/content/format';
import { getLawyers } from '@/lib/content/lawyers';
import type { ArticleEntry, LawyerProfile } from '@/lib/content/types';
import { getServiceSeo, type Service } from '@/lib/data/services';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { getServiceBySlug, getServices } from '@/lib/i18n/localized-data';
import { formatPhoneDisplay, generatePageMetadata } from '@/lib/metadata';
import {
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
  serviceSchemaId,
} from '@/lib/seo/schema';
import { buildWhatsAppURL, WA_NUMBER } from '@/lib/whatsapp';
import FaqAccordion from './FaqAccordion';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

const MAX_RELATED = 3;

const labels = {
  id: {
    area: 'Jakarta & seluruh Indonesia',
    scope: 'Lingkup Layanan',
    lawyersTitle: 'Advokat untuk Bidang Ini',
    lawyersFallbackTitle: 'Konsultasikan dengan Tim Advokat Kami',
    lawyersDescription: (title: string) =>
      `Advokat Raya Law Firm dengan fokus atau pengalaman yang berkaitan dengan ${title}.`,
    lawyersFallbackDescription:
      'Tim advokat kami siap meninjau kasus Anda dan mengarahkan Anda ke pendampingan yang tepat.',
    articlesTitle: 'Artikel Terkait',
    articlesFallbackTitle: 'Artikel Hukum Terbaru',
    articlesDescription: (title: string) => `Panduan dan wawasan hukum seputar ${title} dari tim Raya Law Firm.`,
    articlesFallbackDescription: 'Wawasan hukum praktis terbaru dari tim Raya Law Firm.',
    viewAllLawyers: 'Lihat semua advokat',
    viewAllArticles: 'Lihat semua artikel',
    photoAlt: (name: string, position: string) => `Foto ${name}, ${position} di Raya Law Firm`,
    otherServicesNav: 'Layanan hukum lainnya',
  },
  en: {
    area: 'Jakarta & across Indonesia',
    scope: 'Scope of Service',
    lawyersTitle: 'Advocates for This Practice Area',
    lawyersFallbackTitle: 'Consult Our Advocate Team',
    lawyersDescription: (title: string) =>
      `Raya Law Firm advocates whose focus or experience relates to ${title}.`,
    lawyersFallbackDescription:
      'Our advocates are ready to review your case and guide you to the right assistance.',
    articlesTitle: 'Related Articles',
    articlesFallbackTitle: 'Latest Legal Articles',
    articlesDescription: (title: string) => `Legal guides and insights on ${title} from the Raya Law Firm team.`,
    articlesFallbackDescription: 'The latest practical legal insights from the Raya Law Firm team.',
    viewAllLawyers: 'View all advocates',
    viewAllArticles: 'View all articles',
    photoAlt: (name: string, position: string) => `Photo of ${name}, ${position} at Raya Law Firm`,
    otherServicesNav: 'Other legal services',
  },
} as const;

/* ---------- Pencocokan konten terkait (internal linking) ---------- */

const normalizeText = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Cocok di awal kata: "tanah" cocok dengan "tanah"/"tanahnya", bukan "pertanahan". */
const toPatterns = (terms: string[]) =>
  terms
    .map((term) => normalizeText(term).trim())
    .filter(Boolean)
    .map((term) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(term)}`));

const countMatches = (text: string, patterns: RegExp[]) => {
  const haystack = normalizeText(text);
  return patterns.reduce((total, pattern) => total + (pattern.test(haystack) ? 1 : 0), 0);
};

function servicePatterns(service: Service): RegExp[] {
  const seo = getServiceSeo(service.slug);
  const fallbackTerms = service.title
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word.length > 3 && !/^(hukum|law)$/i.test(word));
  return toPatterns(seo?.matchTerms.length ? seo.matchTerms : fallbackTerms);
}

interface Related<T> {
  matched: boolean;
  items: T[];
}

function pickRelated<T>(items: T[], score: (item: T) => number, limit: number): Related<T> {
  const ranked = items
    .map((item, index) => ({ item, index, score: score(item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.item);

  return ranked.length
    ? { matched: true, items: ranked.slice(0, limit) }
    : { matched: false, items: items.slice(0, limit) };
}

const lawyerScore = (patterns: RegExp[]) => (lawyer: LawyerProfile) =>
  3 * countMatches(lawyer.specialization, patterns) +
  2 * countMatches(lawyer.expertise.join(' | '), patterns) +
  countMatches(lawyer.handledCases.join(' | '), patterns);

const articleScore = (patterns: RegExp[]) => (article: ArticleEntry) =>
  3 * countMatches(article.category, patterns) +
  2 * countMatches(article.tags.join(' | '), patterns) +
  countMatches(article.title, patterns);

function metaKeywords(service: Service, locale: Locale): string[] {
  const seo = getServiceSeo(service.slug);
  if (locale === 'id' && seo) return seo.keywords;

  const practitioner = seo?.practitioner.en ?? `${service.title} lawyer`;
  return [
    `${practitioner.toLowerCase()} jakarta`,
    `${service.title.toLowerCase()} lawyer indonesia`,
    `${service.title.toLowerCase()} legal consultant`,
    'law firm jakarta',
  ];
}

/* ---------- Metadata ---------- */

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).serviceDetail;
  const service = getServiceBySlug(params.slug, locale);

  if (!service) {
    return generatePageMetadata({
      title: t.notFoundTitle,
      description: t.notFoundDescription,
      path: `/layanan/${params.slug}`,
      locale,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDesc,
    path: `/layanan/${service.slug}`,
    locale,
    keywords: metaKeywords(service, locale),
  });
}

/* ---------- Halaman ---------- */

export default async function LayananDetailPage({ params }: PageProps) {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const l = labels[locale];
  const service = getServiceBySlug(params.slug, locale);

  if (!service) {
    notFound();
  }

  const [lawyers, articles] = await Promise.all([
    getLawyers(locale).catch((): LawyerProfile[] => []),
    getArticles(locale).catch((): ArticleEntry[] => []),
  ]);

  const path = `/layanan/${service.slug}`;
  const seo = getServiceSeo(service.slug);
  const patterns = servicePatterns(service);
  const relatedLawyers = pickRelated(lawyers, lawyerScore(patterns), MAX_RELATED);
  const relatedArticles = pickRelated(articles, articleScore(patterns), MAX_RELATED);

  const waMessage =
    locale === 'en'
      ? `${t.serviceDetail.waMessagePrefix} ${service.title} service.`
      : `${t.serviceDetail.waMessagePrefix} ${service.title}.`;
  const waLink = buildWhatsAppURL(waMessage);
  const otherServices = getServices(locale).filter((item) => item.slug !== service.slug);
  const paragraphs = service.fullDesc
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const kicker = seo ? `${seo.practitioner[locale]} · ${l.area}` : l.area;

  return (
    <main id="main" className="flex flex-col">
      <JsonLd
        data={buildWebPageSchema({
          path,
          name: service.metaTitle,
          description: service.metaDesc,
          locale,
          mainEntity: { '@id': serviceSchemaId(service.slug) },
        })}
      />
      <JsonLd data={buildServiceSchema(service, locale)} />
      {service.faq.length > 0 && <JsonLd data={buildFaqSchema(service.faq)} />}

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pb-14 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.common.services, href: '/layanan' },
                { label: service.title },
              ]}
              currentPath={path}
            />
            <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
              {kicker}
            </p>
            <h1 className="mt-3 break-words font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">{service.shortDesc}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-dark shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <WhatsAppGlyph />
                {t.common.whatsappConsultation}
              </a>
              <Link
                href="/konsultasi"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.common.consultationForm}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Konten utama + sidebar */}
      <section className="bg-offwhite py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12 lg:px-16">
          <div className="min-w-0 space-y-12 lg:space-y-14">
            <section aria-labelledby="penjelasan" data-aos="fade-up">
              <h2 id="penjelasan" className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl">
                {t.serviceDetail.fullExplanation}
              </h2>
              <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-dark/80 lg:text-lg">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${service.slug}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>

            {service.highlights.length > 0 && (
              <section aria-labelledby="lingkup" data-aos="fade-up">
                <h2 id="lingkup" className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl">
                  {l.scope}
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-4 text-sm text-dark/80 shadow-sm sm:text-base"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="proses" data-aos="fade-up">
              <h2 id="proses" className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl">
                {t.serviceDetail.process}
              </h2>
              <ol className="mt-6 grid gap-4">
                {service.process.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary-700 sm:h-12 sm:w-12">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words font-sans text-base font-semibold text-dark sm:text-lg">{step.title}</h3>
                      <p className="mt-1.5 font-body text-sm text-dark/70 sm:text-base">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {service.faq.length > 0 && (
              <section aria-labelledby="faq" data-aos="fade-up">
                <h2 id="faq" className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl">
                  {t.serviceDetail.faq}
                </h2>
                <div className="mt-6 rounded-2xl border border-primary/10 bg-white px-4 py-2 sm:px-6">
                  <FaqAccordion items={service.faq} idPrefix={`faq-${service.slug}`} />
                </div>
              </section>
            )}
          </div>

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div data-aos="fade-up" className="rounded-2xl bg-primary-700 p-6 text-white shadow-lg shadow-primary/20">
              <h2 className="font-sans text-lg font-semibold">{t.serviceDetail.consultNow}</h2>
              <p className="mt-2 text-sm text-white">
                {t.serviceDetail.contactFor} {service.title}.
              </p>
              <p className="mt-4 text-sm text-white">
                {t.serviceDetail.phone}:{' '}
                <a href={`tel:+${WA_NUMBER}`} className="font-semibold text-white underline-offset-2 hover:underline">
                  {formatPhoneDisplay(WA_NUMBER)}
                </a>
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {t.common.whatsappConsultation}
              </a>
            </div>

            <nav
              aria-label={l.otherServicesNav}
              data-aos="fade-up"
              data-aos-delay="100"
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-lg font-semibold text-dark">{t.serviceDetail.otherServices}</h2>
              <ul className="mt-3 divide-y divide-primary/5 text-sm text-dark/70">
                {otherServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/layanan/${item.slug}`}
                      className="flex min-h-[44px] items-center justify-between gap-3 py-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <span className="min-w-0 break-words">{item.title}</span>
                      <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-lg font-semibold text-dark">{t.serviceDetail.whyChoose}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-dark/70">
                {t.serviceDetail.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Advokat terkait */}
      {relatedLawyers.items.length > 0 && (
        <section aria-labelledby="advokat-terkait" className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <SectionHeader
              id="advokat-terkait"
              title={relatedLawyers.matched ? l.lawyersTitle : l.lawyersFallbackTitle}
              description={
                relatedLawyers.matched ? l.lawyersDescription(service.title) : l.lawyersFallbackDescription
              }
              href="/tim"
              linkLabel={l.viewAllLawyers}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedLawyers.items.map((lawyer) => (
                <li
                  key={lawyer.slug}
                  data-aos="fade-up"
                  className="group relative flex items-center gap-4 rounded-2xl border border-primary/10 bg-offwhite p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-5"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-white sm:h-20 sm:w-20">
                    <Image
                      src={lawyer.image}
                      alt={l.photoAlt(lawyer.name, lawyer.position)}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words font-sans text-base font-semibold text-dark">
                      <Link
                        href={`/tim/${lawyer.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none group-hover:text-primary"
                      >
                        {lawyer.name}
                      </Link>
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">{lawyer.position}</p>
                    {lawyer.specialization && (
                      <p className="mt-1 line-clamp-2 text-sm text-dark/60">{lawyer.specialization}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Artikel terkait */}
      {relatedArticles.items.length > 0 && (
        <section aria-labelledby="artikel-terkait" className="bg-offwhite py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <SectionHeader
              id="artikel-terkait"
              title={relatedArticles.matched ? l.articlesTitle : l.articlesFallbackTitle}
              description={
                relatedArticles.matched ? l.articlesDescription(service.title) : l.articlesFallbackDescription
              }
              href="/artikel"
              linkLabel={l.viewAllArticles}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedArticles.items.map((article) => (
                <li
                  key={article.slug}
                  data-aos="fade-up"
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary/5">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{article.category}</p>
                    <h3 className="mt-2 break-words font-sans text-base font-semibold leading-snug text-dark sm:text-lg">
                      <Link
                        href={`/artikel/${article.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none group-hover:text-primary"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 font-body text-sm text-dark/60">{article.excerpt}</p>
                    <p className="mt-4 text-xs text-dark/50">
                      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
                      {' · '}
                      {formatReadingTime(article.readingMinutes, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA akhir */}
      <section className="bg-navy px-4 py-14 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-10 text-center text-white sm:px-8 sm:py-12"
          data-aos="fade-up"
        >
          <h2 className="break-words font-sans text-2xl font-bold tracking-tight sm:text-3xl">
            {t.serviceDetail.needHelpPrefix} {service.title}
            {t.serviceDetail.needHelpSuffix}
          </h2>
          <p className="max-w-2xl font-body text-base text-white/70">{t.serviceDetail.needHelpDescription}</p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-dark shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <WhatsAppGlyph />
              {t.common.whatsappConsultation}
            </a>
            <Link
              href="/konsultasi"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.common.consultationForm}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  id,
  title,
  description,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
      <div className="max-w-2xl">
        <h2 id={id} className="break-words font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mt-3 font-body text-base text-dark/70">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-primary transition-all duration-200 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:self-auto"
      >
        {linkLabel}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
