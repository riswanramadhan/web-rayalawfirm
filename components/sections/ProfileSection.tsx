import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ProfileSectionProps {
  locale: Locale;
}

export default function ProfileSection({ locale }: ProfileSectionProps) {
  const t = getDictionary(locale).home.profile;

  return (
    <section
      aria-labelledby="home-profile-title"
      className="relative overflow-hidden bg-offwhite py-16 sm:py-20 lg:py-28"
    >
      <div aria-hidden="true" className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:px-16">
        <div data-aos="fade-right" data-aos-delay="100" className="relative mx-auto w-full max-w-[22rem] sm:max-w-md">
          <div aria-hidden="true" className="absolute -inset-3 rounded-3xl border border-primary/30 sm:-inset-4" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-primary/20 bg-accent/20 shadow-2xl shadow-primary/20">
            <Image
              src="/images/advocate-group-5.jpg"
              alt={t.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) calc(100vw - 3rem), 448px"
            />
          </div>
        </div>

        <div data-aos="fade-left" data-aos-delay="200" className="min-w-0 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
            {t.badge}
          </span>
          <h2
            id="home-profile-title"
            className="text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl"
          >
            {t.title}
          </h2>
          <p className="text-pretty font-body text-base leading-relaxed text-dark/80 lg:text-lg">{t.description}</p>

          <ul className="grid gap-3">
            {t.strengths.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span className="font-body text-base leading-relaxed text-dark/75">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/tentang"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 xs:w-auto"
          >
            {t.more}
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
