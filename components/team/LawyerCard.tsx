import Image from 'next/image';
import Link from 'next/link';
import type { LawyerProfile } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { ArrowRightIcon } from './icons';
import { getTeamLabels } from './labels';

interface LawyerCardProps {
  lawyer: LawyerProfile;
  locale: Locale;
  /** Muat foto lebih awal (kartu pertama di atas lipatan). */
  priority?: boolean;
  /** Urutan kartu untuk jeda animasi AOS. */
  index?: number;
  headingLevel?: 'h2' | 'h3';
}

/**
 * Kartu pengacara: ringkas (2 kolom) di ponsel, lengkap mulai sm.
 * Seluruh kartu adalah satu tautan agar tidak ada elemen interaktif bersarang.
 */
export default function LawyerCard({
  lawyer,
  locale,
  priority = false,
  index = 0,
  headingLevel = 'h3',
}: LawyerCardProps) {
  const labels = getTeamLabels(locale);
  const Heading = headingLevel;

  return (
    <Link
      href={`/tim/${lawyer.slug}`}
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 100}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 focus-visible:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-accent/40 to-gray-100">
        <Image
          src={lawyer.image}
          alt={labels.photoAlt(lawyer.name, lawyer.position)}
          fill
          priority={priority}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <Heading className="break-words font-sans text-sm font-semibold leading-snug text-dark transition-colors duration-200 group-hover:text-primary sm:text-base lg:text-lg">
          {lawyer.name}
        </Heading>
        <p className="mt-1 break-words font-body text-xs font-medium text-primary-700 sm:text-sm">
          {lawyer.position}
        </p>

        {lawyer.specialization && (
          <p className="mt-3 hidden w-fit max-w-full rounded-xl bg-primary/10 px-3 py-1 font-body text-xs font-semibold leading-relaxed text-primary-700 sm:line-clamp-2">
            {lawyer.specialization}
          </p>
        )}

        <div className="flex-1" />

        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary/80 sm:hidden">
          {labels.viewProfile}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>

        <span className="mt-5 hidden border-t border-gray-100 pt-4 sm:block">
          <span className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white">
            {labels.viewProfile}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}
