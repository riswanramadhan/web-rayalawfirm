import Link from 'next/link';
import LawyerCard from '@/components/team/LawyerCard';
import { ArrowRightIcon } from '@/components/team/icons';
import { getLawyers } from '@/lib/content/lawyers';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface TeamSectionProps {
  locale: Locale;
}

export default async function TeamSection({ locale }: TeamSectionProps) {
  const t = getDictionary(locale);
  const lawyers = await getLawyers(locale);

  if (lawyers.length === 0) return null;

  return (
    <section className="bg-offwhite py-12 sm:py-20 lg:py-24" aria-labelledby="home-team-heading">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:gap-12 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-700 sm:px-5 sm:py-2.5 sm:text-base lg:text-lg">
            {t.home.team.badge}
          </span>
          <h2
            id="home-team-heading"
            className="mt-4 font-sans text-2xl font-bold leading-tight tracking-tight text-dark sm:text-3xl lg:text-5xl"
          >
            {t.home.team.title}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-dark/70 sm:mt-4 lg:text-lg">
            {t.home.team.description}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {lawyers.map((lawyer, index) => (
            <li key={lawyer.slug} className="min-w-0">
              <LawyerCard lawyer={lawyer} locale={locale} index={index} />
            </li>
          ))}
        </ul>

        <div className="flex justify-center" data-aos="fade-up">
          <Link
            href="/tim"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 xs:w-auto"
          >
            {t.home.team.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
