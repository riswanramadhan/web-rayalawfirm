import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { ArrowRightIcon, WhatsAppIcon } from './icons';
import { getArticleLabels } from './labels';

interface ConsultCtaProps {
  locale: Locale;
  articleTitle: string;
  articleUrl: string;
  className?: string;
}

/** Ajakan konsultasi WhatsApp dengan konteks judul & tautan artikel. */
export default function ConsultCta({ locale, articleTitle, articleUrl, className = '' }: ConsultCtaProps) {
  const dict = getDictionary(locale);
  const t = getArticleLabels(locale);
  const message = `${dict.articleDetail.waMessage}\n\n${articleTitle}\n${articleUrl}`;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-primary p-5 text-white shadow-lg shadow-navy/20 sm:p-6 ${className}`}
    >
      <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/30 blur-2xl" />
      <p className="relative font-sans text-lg font-bold leading-snug">{dict.articleDetail.consultNow}</p>
      <p className="relative mt-2 font-body text-sm leading-relaxed text-white/80">
        {dict.articleDetail.consultDescription}
      </p>
      <a
        href={buildWhatsAppURL(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-sans text-sm font-semibold text-dark shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {dict.common.whatsappConsultation}
        <span className="sr-only"> {t.opensInNewTab}</span>
      </a>
      <Link
        href="/konsultasi"
        className="relative mt-2 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 font-sans text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        {t.consultForm}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
