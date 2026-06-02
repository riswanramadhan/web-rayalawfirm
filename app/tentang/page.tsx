import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';

const values = [
  {
    title: 'Integritas',
    description:
      'Kami menjaga kejujuran dan kepatuhan pada etika profesi sebagai dasar setiap keputusan hukum, memastikan kepercayaan klien tetap terjaga.',
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v2m0 14v2M7 5h10l2 7-2 7H7l-2-7 2-7z" />
      </svg>
    ),
  },
  {
    title: 'Profesional',
    description:
      'Setiap layanan ditangani dengan standar kerja tinggi, analisis mendalam, dan komunikasi yang jelas agar solusi hukum tepat sasaran.',
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h16v10H4z" />
        <path d="M9 7V5h6v2" />
      </svg>
    ),
  },
  {
    title: 'Empati',
    description:
      'Kami memahami setiap kasus memiliki konteks personal. Pendekatan empatik membantu kami menyusun strategi yang lebih manusiawi.',
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Inovatif',
    description:
      'Kami terus berinovasi dalam layanan, dari digitalisasi hingga penyusunan strategi litigasi modern agar klien selalu selangkah lebih siap.',
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a7 7 0 00-4 12.74V18a2 2 0 002 2h4a2 2 0 002-2v-3.26A7 7 0 0012 2z" />
        <path d="M9 22h6" />
      </svg>
    ),
  },
];

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).aboutPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/tentang',
    locale,
  });
}

export default function TentangPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).aboutPage;
  const localizedValues = t.values.map((value, index) => ({
    ...value,
    icon: values[index].icon,
  }));

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: getDictionary(locale).common.home, href: '/' },
                { label: t.breadcrumb },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-16">
          <div data-aos="fade-right" className="relative w-full mx-auto max-w-[240px] sm:max-w-[320px] lg:max-w-[400px]">
            <div className="absolute -inset-4 rounded-3xl border border-primary/30" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-2xl shadow-primary/10">
                <Image
                src="/images/advocate-group-6.jpg"
                alt={t.imageAlt}
                width={600}
                height={600}
                className="w-full aspect-[4/5] object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>

          <div data-aos="fade-left" className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {t.profileBadge}
            </span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              {t.profileTitle}
            </h2>
            <div className="space-y-4 font-body text-base text-dark/80 lg:text-lg">
              <h3 className="font-sans text-xl font-semibold text-dark">
                {t.backgroundTitle}
              </h3>
              <p>
                {t.background}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {t.visionBadge}
            </span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              {t.visionTitle}
            </h2>
            <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
              {t.visionText}
            </p>
            <div className="mt-6 text-left max-w-3xl mx-auto">
              <h3 className="font-sans text-lg font-semibold text-dark">
                {t.missionTitle}
              </h3>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-dark/80">
                {t.missions.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {t.valuesBadge}
            </span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              {t.valuesTitle}
            </h2>
            <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
              {t.valuesDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {localizedValues.map((value, index) => (
              <div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  {value.icon}
                </div>
                <h3 className="mt-4 font-sans text-xl font-semibold text-dark">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm text-dark/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl border border-primary/15 bg-white px-6 py-12 text-center shadow-lg shadow-primary/10"
          data-aos="fade-up"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tight text-dark">
            {t.finalTitle}
          </h2>
          <p className="font-body text-sm text-dark/70">
            {t.finalDescription}
          </p>
          <Link
            href="/konsultasi"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t.finalCta}
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
