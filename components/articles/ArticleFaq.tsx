import JsonLd from '@/components/seo/JsonLd';
import type { FaqItem } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { buildFaqSchema } from '@/lib/seo/schema';
import { ChevronDownIcon, QuestionIcon } from './icons';
import { getArticleLabels } from './labels';

interface ArticleFaqProps {
  faqs: FaqItem[];
  locale: Locale;
  className?: string;
}

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

/** FAQ artikel: jawaban selalu ada di HTML (native <details>) + FAQPage JSON-LD. */
export default function ArticleFaq({ faqs, locale, className = '' }: ArticleFaqProps) {
  const items = faqs.filter((faq) => faq.question.trim() && faq.answer.trim());
  if (items.length === 0) return null;

  const t = getArticleLabels(locale);
  const headingId = 'article_faq';

  return (
    <section aria-labelledby={headingId} className={className}>
      <h2
        id={headingId}
        className="flex items-center gap-2 font-sans text-xl font-bold leading-snug tracking-tight text-dark sm:text-2xl"
      >
        <QuestionIcon className="h-6 w-6 shrink-0 text-primary" />
        {t.faqTitle}
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((faq, index) => (
          <details
            key={`${index}-${faq.question.slice(0, 24)}`}
            open={index === 0}
            className="group rounded-2xl border border-primary/10 bg-white shadow-sm transition-colors open:border-primary/25"
          >
            <summary className="flex min-h-[56px] cursor-pointer list-none items-start gap-3 rounded-2xl px-4 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="min-w-0 flex-1 break-words font-sans text-base font-semibold leading-snug text-dark">
                {faq.question}
              </h3>
              <ChevronDownIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="space-y-3 px-4 pb-5 sm:px-6">
              {paragraphs(faq.answer).map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="whitespace-pre-line break-words font-body text-base leading-relaxed text-dark/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
      <JsonLd data={buildFaqSchema(items)} />
    </section>
  );
}
