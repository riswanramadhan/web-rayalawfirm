import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import TestimoniClient from './TestimoniClient';

const PAGE_PATH = '/testimoni';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).testimonialsPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: PAGE_PATH,
    locale,
  });
}

export default function TestimoniPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const copy = t.testimonialsPage;

  return (
    <main id="main" className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pb-12 pt-24 sm:pb-16 lg:pb-20 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb items={[{ label: t.common.home, href: '/' }, { label: copy.breadcrumb }]} currentPath={PAGE_PATH} />
            <h1 className="mt-4 text-balance break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty font-body text-base leading-relaxed text-white/75 sm:text-lg">
              {copy.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div
            className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
            data-aos="fade-up"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{copy.averageRating}</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }, (_, idx) => (
                  <svg key={`rating-star-${idx}`} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.955 2.9c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.055 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                ))}
              </div>
              <p className="font-sans text-lg font-semibold text-dark">{copy.ratingText}</p>
            </div>
          </div>

          <TestimoniClient locale={locale} />

          <div
            className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-navy px-5 py-10 text-center text-white sm:px-10"
            data-aos="fade-up"
          >
            <h2 className="text-balance font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {copy.ctaTitle}
            </h2>
            <p className="max-w-2xl text-pretty font-body text-base leading-relaxed text-white/75">{copy.ctaDescription}</p>
            <Link
              href="/konsultasi"
              className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 xs:w-auto"
            >
              {copy.cta}
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
    </main>
  );
}
