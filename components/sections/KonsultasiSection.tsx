import KonsultasiForm from '@/app/(site)/konsultasi/KonsultasiForm';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface KonsultasiSectionProps {
  locale: Locale;
}

/** Konsultasi cepat di beranda; memakai form yang sama dengan halaman /konsultasi. */
export default function KonsultasiSection({ locale }: KonsultasiSectionProps) {
  const t = getDictionary(locale).home.consultation;

  return (
    <section aria-labelledby="home-consultation-title" className="bg-navy py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:px-16">
        <div data-aos="fade-right" className="min-w-0 space-y-6 lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent">
            {t.badge}
          </span>
          <h2
            id="home-consultation-title"
            className="text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-5xl"
          >
            {t.title}
          </h2>
          <p className="text-pretty font-body text-base leading-relaxed text-white/75 lg:text-lg">{t.description}</p>

          <ul className="grid gap-3">
            {t.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-accent"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="font-body text-base text-white/75">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-aos="fade-left" className="min-w-0">
          <div className="rounded-2xl bg-white p-5 shadow-xl shadow-primary/10 sm:p-8">
            <KonsultasiForm locale={locale} idPrefix="home-konsultasi" variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
