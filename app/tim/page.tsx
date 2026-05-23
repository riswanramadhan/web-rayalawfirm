import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { getLawyers } from '@/lib/i18n/localized-data';

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

export default function TimPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const lawyers = getLawyers(locale);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.teamPage.breadcrumb },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {t.teamPage.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.teamPage.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              {t.teamPage.expertiseTitle}
            </h2>
            <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
              {t.teamPage.expertiseDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            {lawyers.map((lawyer, index) => (
              <div
                key={lawyer.slug}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="mb-1 font-sans text-lg font-semibold text-dark">
                    {lawyer.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-primary">
                    {lawyer.position}
                  </p>
                  <span className="mb-4 inline-block w-fit rounded-full bg-primary/8 py-1 text-xs font-semibold text-primary">
                    {lawyer.specialization}
                  </span>
                  {/* <p className="mb-4 text-xs text-dexark/50">{lawyer.experience} pengalaman</p> */}
                  <div className="flex-grow" />
                  <div className="border-t border-gray-100 pt-4">
                    <Link
                      href={`/tim/${lawyer.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                    >
                      {t.common.viewProfile}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-primary/15 bg-offwhite px-6 py-10 text-center shadow-lg shadow-primary/10"
          data-aos="fade-up"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tight text-dark">
            {t.teamPage.finalTitle}
          </h2>
          <p className="font-body text-sm text-dark/70">
            {t.teamPage.finalDescription}
          </p>
          <Link
            href="/konsultasi"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t.common.consultationNow}
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
