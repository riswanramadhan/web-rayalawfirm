import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import LawyerCard from '@/components/team/LawyerCard';
import { ArrowRightIcon } from '@/components/team/icons';
import { getTeamLabels } from '@/components/team/labels';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getLawyers } from '@/lib/content/lawyers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { generatePageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo/schema';

/** Jumlah kartu pertama yang fotonya dimuat dengan prioritas (di atas lipatan ponsel). */
const PRIORITY_CARDS = 2;

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).teamPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/tim',
    locale,
  });
}

export default async function TimPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const labels = getTeamLabels(locale);
  const lawyers = await getLawyers(locale);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/tim')}#itemlist`,
    name: labels.teamListName,
    description: t.teamPage.metaDescription,
    numberOfItems: lawyers.length,
    itemListElement: lawyers.map((lawyer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/tim/${lawyer.slug}`),
      name: lawyer.name,
    })),
  };

  return (
    <main id="main" className="flex flex-col">
      <JsonLd data={itemListSchema} />

      <section className="relative overflow-hidden bg-navy pb-12 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.teamPage.breadcrumb },
              ]}
            />
            <h1 className="mt-4 break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              {t.teamPage.title}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/75 lg:text-lg">
              {t.teamPage.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-10 sm:py-16 lg:py-20" aria-labelledby="tim-keahlian-heading">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:gap-12 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <h2
              id="tim-keahlian-heading"
              className="font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl"
            >
              {t.teamPage.expertiseTitle}
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-dark/70 sm:mt-4 lg:text-lg">
              {t.teamPage.expertiseDescription}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {lawyers.map((lawyer, index) => (
              <li key={lawyer.slug} className="min-w-0">
                <LawyerCard lawyer={lawyer} locale={locale} index={index} priority={index < PRIORITY_CARDS} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 rounded-3xl border border-primary/15 bg-offwhite px-5 py-10 text-center shadow-lg shadow-primary/10 sm:gap-5 sm:px-10"
          data-aos="fade-up"
        >
          <h2 className="font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl">
            {t.teamPage.finalTitle}
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-dark/70 sm:text-base">
            {t.teamPage.finalDescription}
          </p>
          <Link
            href="/konsultasi"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 py-3 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 xs:w-auto"
          >
            {t.common.consultationNow}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
