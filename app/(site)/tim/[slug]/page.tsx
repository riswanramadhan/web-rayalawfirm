import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import LawyerArticleCard from '@/components/team/LawyerArticleCard';
import LawyerCard from '@/components/team/LawyerCard';
import LawyerContact from '@/components/team/LawyerContact';
import ProfileSection, { ChipList, ProfileList } from '@/components/team/ProfileSection';
import { ArrowLeftIcon, ArrowRightIcon, WhatsAppIcon } from '@/components/team/icons';
import { getTeamLabels } from '@/components/team/labels';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getArticlesByLawyerSlug } from '@/lib/content/articles';
import { getLawyerBySlug, getLawyers } from '@/lib/content/lawyers';
import type { LawyerProfile } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { generatePageMetadata } from '@/lib/metadata';
import { SCHEMA_IDS, absoluteUrl, buildPersonSchema } from '@/lib/seo/schema';
import { WA_NUMBER, buildWhatsAppURL } from '@/lib/whatsapp';

interface PageProps {
  params: { slug: string };
}

const META_DESCRIPTION_MAX = 160;
const MAX_ARTICLES = 4;
const MAX_OTHER_LAWYERS = 3;

const pageTitle = (lawyer: LawyerProfile) => `${lawyer.name} — ${lawyer.position}`;

/** Deskripsi ~150-160 karakter: kalimat inti + ajakan terpanjang yang masih muat. */
function buildMetaDescription(lawyer: LawyerProfile, locale: Locale): string {
  const labels = getTeamLabels(locale);
  const base = labels.metaDescriptionBase(lawyer.name, lawyer.position, lawyer.specialization || lawyer.position);

  if (base.length > META_DESCRIPTION_MAX) {
    const cut = base.slice(0, META_DESCRIPTION_MAX - 1);
    const lastSpace = cut.lastIndexOf(' ');
    return `${cut.slice(0, lastSpace > 100 ? lastSpace : cut.length).replace(/[\s,.;:]+$/, '')}…`;
  }

  const suffix = labels.metaDescriptionSuffixes.find((text) => base.length + text.length <= META_DESCRIPTION_MAX);
  return suffix ? base + suffix : base;
}

function omitContext<T extends { '@context'?: unknown }>(schema: T): Omit<T, '@context'> {
  const copy: Partial<T> = { ...schema };
  delete copy['@context'];
  return copy as Omit<T, '@context'>;
}

const splitParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = getCurrentLocale();
  const lawyer = await getLawyerBySlug(params.slug, locale);

  if (!lawyer) {
    const t = getDictionary(locale).lawyerDetail;
    return {
      ...generatePageMetadata({
        title: t.notFoundTitle,
        description: t.notFoundDescription,
        path: `/tim/${params.slug}`,
        locale,
      }),
      robots: { index: false, follow: true },
    };
  }

  const base = generatePageMetadata({
    title: pageTitle(lawyer),
    description: buildMetaDescription(lawyer, locale),
    path: `/tim/${lawyer.slug}`,
    ogImage: lawyer.image,
    locale,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'profile',
      images: [
        {
          url: absoluteUrl(lawyer.image),
          alt: getTeamLabels(locale).photoAlt(lawyer.name, lawyer.position),
        },
      ],
    },
  };
}

export default async function LawyerDetailPage({ params }: PageProps) {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const labels = getTeamLabels(locale);

  const [lawyers, articles] = await Promise.all([
    getLawyers(locale),
    getArticlesByLawyerSlug(params.slug, locale),
  ]);
  const lawyer = lawyers.find((item) => item.slug === params.slug);

  if (!lawyer) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/tim/${lawyer.slug}`);
  const bioParagraphs = splitParagraphs(lawyer.bio);
  const expertise = (lawyer.expertise.length > 0 ? lawyer.expertise : [lawyer.specialization]).filter(Boolean);
  const otherLawyers = lawyers.filter((item) => item.slug !== lawyer.slug).slice(0, MAX_OTHER_LAWYERS);
  const recentArticles = articles.slice(0, MAX_ARTICLES);
  const whatsappUrl = buildWhatsAppURL(
    `${t.lawyerDetail.waMessagePrefix} ${lawyer.name}.`,
    lawyer.phone || WA_NUMBER
  );

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: pageTitle(lawyer),
    description: buildMetaDescription(lawyer, locale),
    inLanguage: locale === 'en' ? 'en-US' : 'id-ID',
    dateModified: lawyer.updatedAt,
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(lawyer.image) },
    mainEntity: omitContext(buildPersonSchema(lawyer, locale)),
    isPartOf: { '@id': SCHEMA_IDS.website },
  };

  return (
    <main id="main" className="flex flex-col">
      <JsonLd data={profilePageSchema} />

      <section className="relative overflow-hidden bg-navy pb-12 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/40" />
        <div aria-hidden="true" className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <Breadcrumb
            items={[
              { label: t.common.home, href: '/' },
              { label: t.common.team, href: '/tim' },
              { label: lawyer.name },
            ]}
          />

          <div className="mt-6 grid gap-8 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-center sm:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_26rem]">
            <div className="relative w-40 sm:w-full lg:order-2" data-aos="fade-up">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[2rem] border border-primary/30 sm:-inset-3 lg:-inset-4 lg:rounded-[2.5rem]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-primary/30 to-navy shadow-2xl shadow-black/30 lg:rounded-[2rem]">
                <Image
                  src={lawyer.image}
                  alt={labels.photoAlt(lawyer.name, lawyer.position)}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, (max-width: 1280px) 352px, 416px"
                />
              </div>
            </div>

            <div className="min-w-0 lg:order-1" data-aos="fade-up" data-aos-delay="100">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                {labels.profileEyebrow}
              </p>
              <h1 className="mt-3 break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {lawyer.name}
              </h1>
              <p className="mt-3 break-words font-body text-base font-medium text-white/85 sm:text-lg">
                {lawyer.position}
              </p>
              {lawyer.specialization && (
                <p className="mt-4 inline-flex max-w-full break-words rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-body text-xs font-semibold leading-relaxed text-accent sm:text-sm">
                  {lawyer.specialization}
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-dark shadow-lg shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  {t.common.whatsappConsultation}
                  <span className="sr-only"> {labels.opensInNewTab}</span>
                </a>
                <Link
                  href="/konsultasi"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  {t.common.consultationForm}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-10 sm:py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10 lg:px-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="min-w-0 space-y-6">
            <ProfileSection id="profil" title={labels.profile}>
              <div className="space-y-4 font-body text-[15px] leading-relaxed text-dark/75 sm:text-base">
                {bioParagraphs.length > 0 ? (
                  bioParagraphs.map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line break-words">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p>{labels.generatedBio(lawyer.name, lawyer.position, lawyer.specialization)}</p>
                    <p>{labels.generatedBioCta}</p>
                  </>
                )}
              </div>
            </ProfileSection>

            {expertise.length > 0 && (
              <ProfileSection id="keahlian" title={labels.expertise}>
                <ChipList items={expertise} />
              </ProfileSection>
            )}

            {lawyer.handledCases.length > 0 && (
              <ProfileSection id="perkara" title={labels.handledCases}>
                <ProfileList items={lawyer.handledCases} />
              </ProfileSection>
            )}

            {lawyer.achievements.length > 0 && (
              <ProfileSection id="pencapaian" title={labels.achievements}>
                <ProfileList items={lawyer.achievements} />
              </ProfileSection>
            )}

            {lawyer.education.length > 0 && (
              <ProfileSection id="pendidikan" title={labels.education}>
                <ProfileList items={lawyer.education} />
              </ProfileSection>
            )}

            {recentArticles.length > 0 && (
              <ProfileSection
                id="artikel"
                title={labels.articlesBy(lawyer.name)}
                action={
                  articles.length > MAX_ARTICLES ? (
                    <Link
                      href="/artikel"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {labels.viewAllArticles}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  ) : undefined
                }
              >
                <p className="-mt-1 mb-4 font-body text-sm text-dark/60">{labels.articlesIntro}</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {recentArticles.map((article) => (
                    <li key={article.slug} className="min-w-0">
                      <LawyerArticleCard article={article} locale={locale} />
                    </li>
                  ))}
                </ul>
              </ProfileSection>
            )}
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28">
            <LawyerContact lawyer={lawyer} locale={locale} whatsappUrl={whatsappUrl} />
            <Link
              href="/tim"
              className="group inline-flex min-h-[44px] items-center gap-2 px-1 text-sm font-medium text-dark/60 transition-colors duration-200 hover:text-primary"
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              {t.lawyerDetail.backToTeam}
            </Link>
          </aside>
        </div>
      </section>

      {otherLawyers.length > 0 && (
        <section className="bg-white py-12 sm:py-16 lg:py-20" aria-labelledby="tim-lainnya-heading">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h2
                id="tim-lainnya-heading"
                className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl"
              >
                {t.lawyerDetail.otherTeam}
              </h2>
              <Link
                href="/tim"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {labels.viewAllTeam}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 md:grid-cols-3">
              {otherLawyers.map((item, index) => (
                <li key={item.slug} className="min-w-0">
                  <LawyerCard lawyer={item} locale={locale} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-navy px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/5 px-5 py-10 text-center text-white sm:px-10 sm:py-12"
          data-aos="fade-up"
        >
          <h2 className="break-words font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            {t.lawyerDetail.directConsultationPrefix} {lawyer.name}
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-white/70 sm:text-base">
            {t.lawyerDetail.directConsultationDescription}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-dark shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {t.common.whatsappConsultation}
              <span className="sr-only"> {labels.opensInNewTab}</span>
            </a>
            <Link
              href="/konsultasi"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              {t.common.consultationForm}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
