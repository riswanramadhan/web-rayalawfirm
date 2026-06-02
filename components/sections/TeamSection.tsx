import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getLawyers } from '@/lib/i18n/localized-data';

interface TeamSectionProps {
  locale: Locale;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  const t = getDictionary(locale);
  const lawyers = getLawyers(locale);

  return (
    <section className="bg-offwhite py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 px-6 sm:px-8 lg:px-16">
        <div className="text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-base font-bold uppercase tracking-wide text-primary lg:text-lg">
            {t.home.team.badge}
          </span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
            {t.home.team.title}
          </h2>
          <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
            {t.home.team.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 xl:grid-cols-4">
          {lawyers.map((lawyer, index) => (
            <div
              key={lawyer.slug}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-1 font-sans text-lg font-semibold text-dark">
                  {lawyer.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-primary">
                  {lawyer.position}
                </p>
                <span className="mb-4 inline-block w-fit rounded-full bg-primary/8 py-1 text-xs font-semibold text-primary">
                  {lawyer.specialization}
                </span>
                {/* <p className="mb-4 text-xs text-dark/50">{lawyer.experience} pengalaman</p> */}
                <div className="flex-grow" />
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href={`/tim/${lawyer.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    {t.common.viewProfile}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center" data-aos="fade-up">
          <Link
            href="/tim"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10"
          >
            {t.home.team.cta}
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
