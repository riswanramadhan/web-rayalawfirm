import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ArrowRightIcon, ScaleIcon } from './icons';
import { getArticleLabels } from './labels';

interface LegalDisclaimerProps {
  locale: Locale;
  className?: string;
}

/** Penafian informasi hukum umum (sinyal kepercayaan untuk konten YMYL). */
export default function LegalDisclaimer({ locale, className = '' }: LegalDisclaimerProps) {
  const t = getArticleLabels(locale);

  return (
    <aside
      aria-label={t.disclaimerTitle}
      className={`flex gap-3 rounded-2xl border border-navy/10 bg-navy/[0.04] p-4 sm:gap-4 sm:p-5 ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
        <ScaleIcon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-sans text-sm font-semibold text-navy">{t.disclaimerTitle}</p>
        <p className="mt-1 font-body text-sm leading-relaxed text-dark/75 sm:text-[0.9375rem]">{t.disclaimer}</p>
        <Link
          href="/konsultasi"
          className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 font-sans text-sm font-semibold text-primary transition-colors hover:text-navy"
        >
          {t.disclaimerCta}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
