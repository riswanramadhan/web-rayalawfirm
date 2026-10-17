import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata, siteConfig } from '@/lib/metadata';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import KonsultasiForm from './KonsultasiForm';

const PAGE_PATH = '/konsultasi';

/** "+6281335663379" → "0813 3566 3379" */
const toLocalPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const local = digits.startsWith('62') ? `0${digits.slice(2)}` : digits;
  return `${local.slice(0, 4)} ${local.slice(4, 8)} ${local.slice(8)}`.trim();
};

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).consultationPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PAGE_PATH,
    locale,
  });
}

export default function KonsultasiPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const copy = t.consultationPage;
  const phones = [siteConfig.phone, siteConfig.alternatePhone];
  const contactLinkClass =
    'inline-flex min-h-[40px] items-center break-words text-base text-white underline-offset-4 transition-colors hover:text-accent hover:underline';

  return (
    <main id="main" className="bg-navy">
      <div className="grid lg:min-h-screen lg:grid-cols-[1fr_1.25fr]">
        <section
          aria-labelledby="konsultasi-title"
          className="relative overflow-hidden bg-navy px-4 pb-12 pt-24 sm:px-6 sm:pb-16 lg:px-16 lg:pb-20 lg:pt-32"
        >
          <div aria-hidden="true" className="absolute -right-20 top-10 h-48 w-48 rounded-full border border-primary/10" />
          <div aria-hidden="true" className="absolute -left-24 bottom-10 h-64 w-64 rounded-full border border-primary/10" />

          <div className="relative z-10 mx-auto max-w-2xl space-y-10 lg:mx-0">
            <div className="space-y-4" data-aos="fade-up">
              <Breadcrumb
                items={[{ label: t.common.home, href: '/' }, { label: copy.breadcrumb }]}
                currentPath={PAGE_PATH}
              />
              <h1
                id="konsultasi-title"
                className="text-balance break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {copy.title}
              </h1>
              <p className="text-pretty font-body text-base leading-relaxed text-white/75 sm:text-lg">
                {copy.description}
              </p>
              <a
                href="#form-konsultasi"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 text-sm font-semibold text-navy shadow-lg shadow-primary/30 xs:w-auto lg:hidden"
              >
                {copy.formTitle}
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <ol className="space-y-5" data-aos="fade-up" data-aos-delay="100">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary font-sans text-lg font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-base font-semibold text-white">{step.title}</p>
                    <p className="mt-1 font-body text-base leading-relaxed text-white/70">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p
              className="rounded-2xl border border-primary/20 bg-primary/10 p-4 font-body text-base leading-relaxed text-white/80"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {copy.privacyNote}
            </p>

            <div className="grid gap-6 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="300">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{copy.operationalHours}</h2>
                <p className="mt-2 font-body text-base text-white">{copy.weekdayHours}</p>
                <p className="font-body text-base text-white/70">{copy.saturdayHours}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{copy.alternativeContact}</h2>
                <ul className="mt-1">
                  {phones.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone}`} className={contactLinkClass}>
                        <span className="sr-only">{t.common.phone}: </span>
                        {toLocalPhone(phone)}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${siteConfig.email}`} className={contactLinkClass}>
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={buildWhatsAppURL(t.whatsapp.defaultMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClass}
                    >
                      {t.common.whatsappConsultation}
                      <span className="sr-only"> {t.common.opensInNewTab}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="form-konsultasi"
          aria-labelledby="konsultasi-form-title"
          className="scroll-mt-20 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:rounded-tl-[2.5rem] lg:px-16 lg:pb-20 lg:pt-32"
        >
          <div className="mx-auto w-full max-w-2xl space-y-6">
            <div className="space-y-3" data-aos="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{copy.formLabel}</p>
              <h2
                id="konsultasi-form-title"
                className="text-balance font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-5xl"
              >
                {copy.formTitle}
              </h2>
              <p className="text-pretty font-body text-base leading-relaxed text-dark/70">{copy.formDescription}</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="100">
              <KonsultasiForm locale={locale} idPrefix="konsultasi" variant="page" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
