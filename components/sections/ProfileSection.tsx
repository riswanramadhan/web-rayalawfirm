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
    <section className="relative bg-offwhite pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:gap-16 lg:grid-cols-2 lg:px-16">
        <div data-aos="fade-right" data-aos-delay="100" className="relative max-w-md mx-auto w-full">
            <div className="absolute max-w-lg mx-auto -inset-4 rounded-3xl border border-primary/30" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 shadow-2xl shadow-primary/20">
                <Image
                  src="/images/advocate-group-5.jpg"
                alt={t.imageAlt}
                width={600}
                height={800} // Disarankan menyesuaikan rasio height dengan aspect ratio 3/4
                className="aspect-[3/4] w-full h-full object-cover" // Ditambahkan h-full dan object-cover
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 520px" // Diperbaiki agar lebih adaptif di tablet/desktop
              />
            </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl border border-primary/20 bg-white/90 p-5 shadow-xl shadow-primary/10 backdrop-blur-sm">
            {/* <p className="text-xs uppercase tracking-[0.3em] text-dark/50">
              Sejak 2009
            </p> */}
            <p className="mt-2 font-sans text-xl font-bold text-primary">
              {t.corporatePartners}
            </p>
            <p className="text-sm text-dark/60">{t.longTermTrust}</p>
          </div>
        </div>

        <div data-aos="fade-left" data-aos-delay="200" className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            {t.badge}
          </span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
            {t.title}
          </h2>
          <p className="font-body text-base leading-relaxed text-dark/80 lg:text-lg">
            {t.description}
          </p>

          <div className="grid gap-3">
            {t.strengths.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <p className="text-sm text-dark/70">{item}</p>
              </div>
            ))}
          </div>

          <Link
            href="/tentang"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10"
          >
            {t.more}
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
      </div>
    </section>
  );
}
