import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { buildWhatsAppURL, WA_NUMBER } from '@/lib/whatsapp';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import {
  getServiceBySlug,
  getServices,
} from '@/lib/i18n/localized-data';
import FaqAccordion from './FaqAccordion';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

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
    });
  }

  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDesc,
    path: `/layanan/${service.slug}`,
    locale,
  });
}

export default function LayananDetailPage({ params }: PageProps) {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const service = getServiceBySlug(params.slug, locale);

  if (!service) {
    notFound();
  }

  const waMessage =
    locale === 'en'
      ? `${t.serviceDetail.waMessagePrefix} ${service.title} service.`
      : `${t.serviceDetail.waMessagePrefix} ${service.title}.`;
  const waLink = buildWhatsAppURL(waMessage);
  const otherServices = getServices(locale)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 5);
  const paragraphs = service.fullDesc.split('\n\n');

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.common.services, href: '/layanan' },
                { label: service.title },
              ]}
            />
            <h1 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[2fr_1fr] lg:px-16">
          <div className="space-y-12">
            <div data-aos="fade-up">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
                {t.serviceDetail.fullExplanation}
              </h2>
              <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-dark/80">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${service.slug}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div data-aos="fade-up">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
                {t.serviceDetail.process}
              </h2>
              <div className="mt-6 grid gap-4">
                {service.process.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-dark/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-up">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
                {t.serviceDetail.faq}
              </h2>
              <div className="mt-6 rounded-2xl border border-primary/10 bg-white p-6">
                <FaqAccordion items={service.faq} />
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div
              data-aos="fade-left"
              className="rounded-2xl bg-primary p-6 text-white shadow-lg shadow-primary/20"
            >
              <h3 className="text-lg font-semibold">
                {t.serviceDetail.consultNow}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                {t.serviceDetail.contactFor} {service.title}.
              </p>
              <p className="mt-4 text-sm text-white/80">
                {t.serviceDetail.phone}: +{WA_NUMBER.slice(0, 2)} {WA_NUMBER.slice(2, 5)}-{WA_NUMBER.slice(5, 9)}-{WA_NUMBER.slice(9)}
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary shadow-md"
              >
                {t.common.whatsappConsultation}
              </a>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-dark">
                {t.serviceDetail.otherServices}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-dark/70">
                {otherServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/layanan/${item.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-dark">
                {t.serviceDetail.whyChoose}
              </h3>
              <ul className="mt-4 space-y-3 pl-5 list-disc text-sm text-dark/70">
                {t.serviceDetail.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center text-white"
          data-aos="fade-up"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tight">
            {t.serviceDetail.needHelpPrefix} {service.title}
            {t.serviceDetail.needHelpSuffix}
          </h2>
          <p className="font-body text-sm text-white/70">
            {t.serviceDetail.needHelpDescription}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.common.whatsappConsultation}
            </a>
            <Link
              href="/konsultasi"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              {t.common.consultationForm}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
