import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import KonsultasiForm from './KonsultasiForm';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).consultationPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/konsultasi',
    locale,
  });
}

const steps = [
  {
    title: 'Isi Form',
    description: 'Lengkapi data diri dan ringkasan kasus secara singkat.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm8 1.5V7h3.5L14 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2zm0-8h4v2H8V7z" />
      </svg>
    ),
  },
  {
    title: 'Hubungi via WhatsApp',
    description: 'Kami akan mengarahkan Anda ke WhatsApp dengan pesan otomatis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2zm3 5h10v2H7V9zm0 4h7v2H7v-2z" />
      </svg>
    ),
  },
  {
    title: 'Konsultasi dengan Lawyer',
    description: 'Tim kami meninjau kasus dan menjadwalkan konsultasi lanjutan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2a7 7 0 017 7v1h2v3a2 2 0 01-2 2h-1v2a6 6 0 01-6 6H7v-2h5a4 4 0 004-4v-2H8a2 2 0 01-2-2V10h2V9a7 7 0 017-7zm-5 8h10V9a5 5 0 00-10 0v1z" />
      </svg>
    ),
  },
];

export default function KonsultasiPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);

  return (
    <main className="bg-navy">
      <section className="py-8 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_1.25fr]">
          <div className="relative overflow-hidden bg-navy px-6 py-16 lg:px-16">
            <div className="absolute -right-20 top-10 h-48 w-48 rounded-full border border-primary/10" />
            <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full border border-primary/10" />

            <div className="relative z-10 space-y-10">
              <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                <Breadcrumb
                  items={[
                    { label: t.common.home, href: '/' },
                    { label: t.consultationPage.breadcrumb },
                  ]}
                />
                <h1 className="font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
                  {t.consultationPage.title}
                </h1>
                <p className="font-body text-base text-white/70 lg:text-lg">
                  {t.consultationPage.description}
                </p>
              </div>

              <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
                {t.consultationPage.steps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-white/80"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {t.consultationPage.privacyNote}
              </div>

              <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    {t.consultationPage.operationalHours}
                  </p>
                  <p className="mt-2 text-base text-white">
                    {t.consultationPage.weekdayHours}
                  </p>
                  <p className="text-base text-white/70">
                    {t.consultationPage.saturdayHours}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    {t.consultationPage.alternativeContact}
                  </p>
                  <div className="mt-2 space-y-1 text-base text-white">
                    <p>{t.common.phone}: 0813 3566 3379</p>
                    <p>{t.common.email}: info@rayalawfirm.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-16 lg:px-16">
            <div className="mx-auto w-full max-w-2xl space-y-6">
              <div className="space-y-3" data-aos="fade-up">
                <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
                  {t.consultationPage.formLabel}
                </p>
                <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
                  {t.consultationPage.formTitle}
                </h2>
                <p className="font-body text-base text-dark/70">
                  {t.consultationPage.formDescription}
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="100">
                <KonsultasiForm locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
