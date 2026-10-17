import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import { getLawyers } from '@/lib/content/lawyers';
import { generatePageMetadata, siteConfig } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getServices } from '@/lib/i18n/localized-data';
import { getCurrentLocale } from '@/lib/i18n/server';
import { SCHEMA_IDS, buildWebPageSchema } from '@/lib/seo/schema';

const PAGE_PATH = '/tentang';
const OFFICE_ADDRESS = `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`;

const valueIcons: ReactNode[] = [
  <svg key="integrity" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v2m0 14v2M7 5h10l2 7-2 7H7l-2-7 2-7z" />
  </svg>,
  <svg key="professional" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h16v10H4z" />
    <path d="M9 7V5h6v2" />
  </svg>,
  <svg key="empathy" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>,
  <svg key="innovation" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a7 7 0 00-4 12.74V18a2 2 0 002 2h4a2 2 0 002-2v-3.26A7 7 0 0012 2z" />
    <path d="M9 22h6" />
  </svg>,
];

const CheckIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const badgeClass =
  'inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700';
const h2Class = 'text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).aboutPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PAGE_PATH,
    locale,
  });
}

export default async function TentangPage() {
  const locale = getCurrentLocale();
  const dictionary = getDictionary(locale);
  const t = dictionary.aboutPage;
  const services = getServices(locale);
  const lawyers = await getLawyers(locale);
  const stats = [...dictionary.home.hero.stats, t.bilingualStat];

  return (
    <main id="main" className="flex flex-col">
      <JsonLd
        data={buildWebPageSchema({
          path: PAGE_PATH,
          name: t.metaTitle,
          description: t.metaDescription,
          locale,
          type: 'AboutPage',
          image: '/images/advocate-group-6.jpg',
          about: { '@id': SCHEMA_IDS.organization },
          mainEntity: { '@id': SCHEMA_IDS.organization },
        })}
      />

      <section className="relative overflow-hidden bg-navy pb-20 pt-24 sm:pb-24 lg:pb-28 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[{ label: dictionary.common.home, href: '/' }, { label: t.breadcrumb }]}
              currentPath={PAGE_PATH}
            />
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent sm:text-sm">{t.heroEyebrow}</p>
            <h1 className="mt-3 text-balance break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty font-body text-base leading-relaxed text-white/75 sm:text-lg">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t.factsLabel} className="relative z-10 -mt-12 px-4 sm:-mt-14 sm:px-6 lg:px-16">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-primary/10 bg-primary/10 shadow-xl shadow-primary/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-white px-4 py-5 text-center sm:px-6 sm:py-6">
              <dt className="mt-1 text-xs leading-snug text-dark/60 sm:text-sm">{stat.label}</dt>
              <dd className="font-sans text-2xl font-bold text-primary sm:text-3xl">{stat.num}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="tentang-profil" className="bg-offwhite py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div data-aos="fade-right" className="relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[26rem]">
            <div aria-hidden="true" className="absolute -inset-3 rounded-3xl border border-primary/30 sm:-inset-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-primary/20 bg-accent/20 shadow-2xl shadow-primary/10">
              <Image
                src="/images/advocate-group-6.jpg"
                alt={t.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 18rem, (max-width: 1024px) 22rem, 26rem"
              />
            </div>
          </div>

          <div data-aos="fade-left" className="min-w-0 space-y-6">
            <span className={badgeClass}>{t.profileBadge}</span>
            <h2 id="tentang-profil" className={h2Class}>
              {t.profileTitle}
            </h2>
            <div className="space-y-3">
              <h3 className="font-sans text-lg font-semibold text-dark sm:text-xl">{t.backgroundTitle}</h3>
              <p className="text-pretty font-body text-base leading-relaxed text-dark/80 lg:text-lg">{t.background}</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-sans text-lg font-semibold text-dark sm:text-xl">{t.commitmentsTitle}</h3>
              <ul className="grid gap-3">
                {dictionary.home.profile.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-body text-base leading-relaxed text-dark/75">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="tentang-bidang" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <span className={badgeClass}>{t.practiceBadge}</span>
            <h2 id="tentang-bidang" className={`mt-4 ${h2Class}`}>
              {t.practiceTitle}
            </h2>
            <p className="mt-4 text-pretty font-body text-base leading-relaxed text-dark/70 lg:text-lg">
              {t.practiceDescription}
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.slug} className="min-w-0" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <Link
                  href={`/layanan/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-offwhite p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:shadow-primary/10 sm:p-6"
                >
                  <h3 className="break-words font-sans text-lg font-semibold text-dark transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-[15px] leading-relaxed text-dark/65">{service.shortDesc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary" aria-hidden="true">
                    {dictionary.common.learnMore}
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tentang-cara-kerja" className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-16">
          <div data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent">
              {t.approachBadge}
            </span>
            <h2
              id="tentang-cara-kerja"
              className="mt-4 text-balance font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-5xl"
            >
              {t.approachTitle}
            </h2>
            <p className="mt-4 text-pretty font-body text-base leading-relaxed text-white/75 lg:text-lg">
              {t.approachDescription}
            </p>
          </div>

          <ol className="space-y-4" data-aos="fade-up" data-aos-delay="100">
            {dictionary.consultationPage.steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary font-sans text-lg font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans text-base font-semibold text-white sm:text-lg">{step.title}</h3>
                  <p className="mt-1 font-body text-base leading-relaxed text-white/70">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {lawyers.length > 0 ? (
        <section aria-labelledby="tentang-tim" className="bg-offwhite py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
              <div className="max-w-2xl">
                <span className={badgeClass}>{t.teamBadge}</span>
                <h2 id="tentang-tim" className={`mt-4 ${h2Class}`}>
                  {t.teamTitle}
                </h2>
                <p className="mt-4 text-pretty font-body text-base leading-relaxed text-dark/70 lg:text-lg">
                  {t.teamDescription}
                </p>
              </div>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {lawyers.map((lawyer, index) => (
                <li key={lawyer.slug} className="min-w-0" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                  <Link
                    href={`/tim/${lawyer.slug}`}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-accent/30">
                      <Image
                        src={lawyer.image}
                        alt={`${lawyer.name}, ${lawyer.position}`}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-sans text-base font-semibold leading-snug text-dark transition-colors group-hover:text-primary">
                        {lawyer.name}
                      </span>
                      <span className="mt-0.5 block break-words font-body text-sm font-medium text-primary">
                        {lawyer.position}
                      </span>
                      {lawyer.specialization ? (
                        <span className="mt-0.5 block break-words font-body text-sm text-dark/60">
                          {lawyer.specialization}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center" data-aos="fade-up">
              <Link
                href="/tim"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 text-sm font-semibold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 xs:w-auto"
              >
                {t.teamCta}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="tentang-visi" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16">
          <div className="text-center" data-aos="fade-up">
            <span className={badgeClass}>{t.visionBadge}</span>
            <h2 id="tentang-visi" className={`mt-4 ${h2Class}`}>
              {t.visionTitle}
            </h2>
          </div>

          <div className="mt-10 space-y-6" data-aos="fade-up" data-aos-delay="100">
            <div className="rounded-2xl border border-primary/10 bg-offwhite p-5 sm:p-8">
              <h3 className="font-sans text-lg font-semibold text-dark sm:text-xl">{dictionary.home.visionMission.visionTitle}</h3>
              <p className="mt-3 text-pretty font-body text-base leading-relaxed text-dark/80 lg:text-lg">{t.visionText}</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-offwhite p-5 sm:p-8">
              <h3 className="font-sans text-lg font-semibold text-dark sm:text-xl">{t.missionTitle}</h3>
              <ol className="mt-4 space-y-4">
                {t.missions.map((mission, index) => (
                  <li key={mission} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-sm font-bold text-primary-700">
                      {index + 1}
                    </span>
                    <p className="font-body text-base leading-relaxed text-dark/80">{mission}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="tentang-nilai" className="bg-offwhite py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <span className={badgeClass}>{t.valuesBadge}</span>
            <h2 id="tentang-nilai" className={`mt-4 ${h2Class}`}>
              {t.valuesTitle}
            </h2>
            <p className="mt-4 text-pretty font-body text-base leading-relaxed text-dark/70 lg:text-lg">
              {t.valuesDescription}
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {t.values.map((value, index) => (
              <li
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
                className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {valueIcons[index]}
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-dark sm:text-xl">{value.title}</h3>
                <p className="mt-2 font-body text-base leading-relaxed text-dark/70">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tentang-kantor" className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-16">
          <div data-aos="fade-up">
            <span className={badgeClass}>{t.officeBadge}</span>
            <h2 id="tentang-kantor" className={`mt-4 ${h2Class}`}>
              {t.officeTitle}
            </h2>
            <p className="mt-4 text-pretty font-body text-base leading-relaxed text-dark/75 lg:text-lg">
              {t.officeDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-offwhite p-5 sm:p-8" data-aos="fade-up" data-aos-delay="100">
            <address className="not-italic">
              <p className="font-sans text-base font-semibold text-dark">{siteConfig.name}</p>
              <p className="mt-1 break-words font-body text-base leading-relaxed text-dark/75">{OFFICE_ADDRESS}</p>
            </address>
            <dl className="mt-5 space-y-4 border-t border-primary/10 pt-5 text-base">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">
                  {dictionary.common.operationalHours}
                </dt>
                <dd className="mt-1 font-body text-dark/80">{dictionary.consultationPage.weekdayHours}</dd>
                <dd className="font-body text-dark/65">{dictionary.consultationPage.saturdayHours}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">{t.areasLabel}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {t.areas.map((area) => (
                    <span key={area} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary-700">
                      {area}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">{t.languagesLabel}</dt>
                <dd className="mt-1 font-body text-dark/80">{t.languages}</dd>
              </div>
            </dl>
            <Link
              href="/kontak"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10"
            >
              {dictionary.contactPage.title}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-offwhite px-4 py-16 sm:px-6 sm:py-20 lg:px-16">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-primary/15 bg-white px-5 py-10 text-center shadow-lg shadow-primary/10 sm:px-10 sm:py-12"
          data-aos="fade-up"
        >
          <h2 className="text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl">
            {t.finalTitle}
          </h2>
          <p className="max-w-2xl text-pretty font-body text-base leading-relaxed text-dark/70">{t.finalDescription}</p>
          <Link
            href="/konsultasi"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 xs:w-auto"
          >
            {t.finalCta}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
