import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildFaqSchema } from '@/lib/seo/schema';

interface HomeFaqSectionProps {
  locale: Locale;
}

/**
 * FAQ beranda: pertanyaan yang biasa dicari sebelum memakai jasa pengacara.
 * Memakai <details>/<summary> bawaan agar jawaban tetap ada di HTML server
 * (terbaca crawler) dan dapat dibuka tanpa JavaScript.
 */
export default function HomeFaqSection({ locale }: HomeFaqSectionProps) {
  const t = getDictionary(locale);
  const faq = t.home.faq;
  const faqs = faq.items.map((item) => ({ question: item.question, answer: item.answer }));

  return (
    <section aria-labelledby="home-faq-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16 lg:px-16">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
            {faq.badge}
          </span>
          <h2
            id="home-faq-title"
            className="mt-4 text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl"
          >
            {faq.title}
          </h2>
          <p className="mt-4 text-pretty font-body text-base leading-relaxed text-dark/70 lg:text-lg">
            {faq.description}
          </p>

          <div className="mt-8 hidden rounded-2xl border border-primary/10 bg-offwhite p-6 lg:block">
            <p className="font-sans text-base font-semibold text-dark">{faq.moreQuestions}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/konsultasi"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-5 text-sm font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t.common.consultationNow}
              </Link>
              <Link
                href="/kontak"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary/30 px-5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10"
              >
                {t.common.contactUs}
              </Link>
            </div>
          </div>
        </div>

        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
          <div className="divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-offwhite/60 px-4 sm:px-6">
            {faq.items.map((item, index) => (
              <details key={item.question} id={`faq-${index + 1}`} className="group scroll-mt-28" open={index === 0}>
                <summary className="flex min-h-[56px] cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-5 text-left focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 [&::-webkit-details-marker]:hidden">
                  <h3 className="min-w-0 break-words font-sans text-base font-semibold leading-snug text-dark transition-colors group-open:text-primary sm:text-lg">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-dark/50 shadow-sm transition-transform duration-200 group-open:rotate-45 group-open:text-primary"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-5 pr-2 font-body text-base leading-relaxed text-dark/75 sm:pr-11">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/10 bg-offwhite p-5 lg:hidden">
            <p className="font-sans text-base font-semibold text-dark">{faq.moreQuestions}</p>
            <div className="mt-4 flex flex-col gap-3 xs:flex-row">
              <Link
                href="/konsultasi"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-5 text-sm font-semibold text-navy shadow-lg shadow-primary/20"
              >
                {t.common.consultationNow}
              </Link>
              <Link
                href="/kontak"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl border border-primary/30 px-5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10"
              >
                {t.common.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <JsonLd data={buildFaqSchema(faqs)} />
    </section>
  );
}
