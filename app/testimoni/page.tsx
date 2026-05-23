import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { generatePageMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import TestimoniClient from './TestimoniClient';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).testimonialsPage;

  return generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/testimoni',
    locale,
  });
}

export default function TestimoniPage() {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.testimonialsPage.breadcrumb },
              ]}
            />
            <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {t.testimonialsPage.title}
            </h1>
            <p className="mt-4 font-body text-base text-white/70 lg:text-lg">
              {t.testimonialsPage.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <p className="text-sm uppercase tracking-[0.3em] text-dark/50">
              {t.testimonialsPage.averageRating}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }, (_, idx) => (
                  <svg
                    key={`rating-star-${idx}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.955 2.9c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.055 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg font-semibold text-dark">
                {t.testimonialsPage.ratingText}
              </p>
            </div>
          </div>

          <TestimoniClient locale={locale} />

          <div className="mt-10 flex justify-center" data-aos="fade-up">
            <Link
              href="/konsultasi"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.testimonialsPage.cta}
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
    </main>
  );
}
