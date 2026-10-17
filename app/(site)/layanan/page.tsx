import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Service } from '@/lib/data/services';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { getServices } from '@/lib/i18n/localized-data';
import { buildServiceListSchema, buildWebPageSchema } from '@/lib/seo/schema';

const labels = {
  id: {
    areas: ['Jakarta', 'Makassar', 'Seluruh Indonesia'],
    areasLabel: 'Wilayah layanan',
    gridTitle: 'Pilih bidang layanan hukum',
    readMore: 'Pelajari layanan',
    howTitle: 'Cara Memulai Konsultasi Hukum Online',
    howDescription:
      'Konsultasi dapat dimulai dari mana saja melalui formulir online atau WhatsApp. Tim kami meninjau kasus Anda sebelum menjadwalkan konsultasi lanjutan.',
    howCta: 'Isi Formulir Konsultasi',
    keywords: [
      'layanan hukum jakarta',
      'konsultan hukum jakarta',
      'jasa pengacara jakarta',
      'pengacara pidana',
      'pengacara perdata',
      'pengacara sengketa tanah',
      'konsultasi hukum online',
    ],
  },
  en: {
    areas: ['Jakarta', 'Makassar', 'Across Indonesia'],
    areasLabel: 'Service areas',
    gridTitle: 'Choose a legal practice area',
    readMore: 'Explore service',
    howTitle: 'How to Start an Online Legal Consultation',
    howDescription:
      'You can start a consultation from anywhere through the online form or WhatsApp. Our team reviews your case before scheduling a follow-up consultation.',
    howCta: 'Fill in the Consultation Form',
    keywords: [
      'legal services jakarta',
      'legal consultant jakarta',
      'lawyer jakarta',
      'law firm indonesia',
      'online legal consultation',
    ],
  },
} as const;

const SERVICE_ICON_PATHS: Record<Service['icon'], string> = {
  pidana:
    'M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1m20 0h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 6a6 6 0 100 12 6 6 0 000-12z',
  perdata:
    'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
  bisnis:
    'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0',
  keluarga:
    'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  properti:
    'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
  ketenagakerjaan:
    'M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z',
  ptun:
    'M12 3.75L3.75 8.25h16.5L12 3.75zM5.25 8.25v8.25M9.75 8.25v8.25m4.5-8.25v8.25m4.5-8.25v8.25M4.5 16.5h15M3.75 20.25h16.5M8.25 12h7.5m-7.5 2.25h7.5',
};

function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  return (
    <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={SERVICE_ICON_PATHS[icon]} />
    </svg>
  );
}

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).servicesPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/layanan',
    locale,
    keywords: [...labels[locale].keywords],
  });
}

export default function LayananPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const l = labels[locale];
  const services = getServices(locale);
  const listSchema = buildServiceListSchema(services, locale);

  return (
    <main id="main" className="flex flex-col">
      <JsonLd
        data={buildWebPageSchema({
          path: '/layanan',
          type: 'CollectionPage',
          name: t.servicesPage.title,
          description: t.servicesPage.metaDescription,
          locale,
          mainEntity: { '@id': listSchema['@id'] },
        })}
      />
      <JsonLd data={listSchema} />

      <section className="relative overflow-hidden bg-navy pb-14 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.servicesPage.breadcrumb },
              ]}
              currentPath="/layanan"
            />
            <h1 className="mt-4 break-words font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {t.servicesPage.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.servicesPage.description}
            </p>
            <ul aria-label={l.areasLabel} className="mt-6 flex flex-wrap gap-2">
              {l.areas.map((area) => (
                <li
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="layanan-komitmen" className="bg-offwhite py-14 sm:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <h2
              id="layanan-komitmen"
              className="break-words font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-5xl"
            >
              {t.servicesPage.commitmentTitle}
            </h2>
            <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
              {t.servicesPage.commitmentDescription}
            </p>
          </div>

          <ul aria-label={l.gridTitle} className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li
                key={service.slug}
                data-aos="fade-up"
                data-aos-delay={Math.min(index, 5) * 80}
                className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="mb-3 break-words font-sans text-lg font-semibold text-dark sm:text-xl">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none group-hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mb-5 flex-grow font-body text-sm leading-relaxed text-dark/60 sm:text-base">
                  {service.shortDesc}
                </p>
                <ul className="mb-6 space-y-2">
                  {service.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-dark/70">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-gray-100 pt-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 group-hover:gap-3"
                  >
                    {l.readMore}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="layanan-cara-konsultasi" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <h2
              id="layanan-cara-konsultasi"
              className="break-words font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl"
            >
              {l.howTitle}
            </h2>
            <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">{l.howDescription}</p>
          </div>
          <ol className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {t.consultationPage.steps.map((step, index) => (
              <li
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="flex gap-4 rounded-2xl border border-primary/10 bg-offwhite p-5 sm:p-6"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-sans text-sm font-semibold text-primary-700">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans text-base font-semibold text-dark sm:text-lg">{step.title}</h3>
                  <p className="mt-1 font-body text-sm text-dark/70 sm:text-base">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16 lg:px-16 lg:pb-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-primary/15 bg-offwhite px-5 py-10 text-center shadow-lg shadow-primary/10 sm:px-8"
          data-aos="fade-up"
        >
          <h2 className="break-words font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl">
            {t.servicesPage.notFoundTitle}
          </h2>
          <p className="max-w-2xl font-body text-base text-dark/70">
            {t.servicesPage.notFoundDescription}
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/konsultasi"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 py-3 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {l.howCta}
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/tim"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors duration-300 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t.teamPage.breadcrumb}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
