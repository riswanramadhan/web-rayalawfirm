import type { Locale } from '@/lib/i18n/config';
import { CheckCircleIcon } from './icons';
import { getArticleLabels } from './labels';

interface KeyPointsProps {
  points: string[];
  locale: Locale;
  className?: string;
}

/** Ringkasan poin penting di awal artikel (mudah dikutip AI Overview & pembaca cepat). */
export default function KeyPoints({ points, locale, className = '' }: KeyPointsProps) {
  const items = points.map((point) => point.trim()).filter(Boolean);
  if (items.length === 0) return null;

  const t = getArticleLabels(locale);
  // Underscore tidak pernah dihasilkan slug heading Markdown, jadi id ini tidak bentrok.
  const headingId = 'article_key_points';

  return (
    <section
      aria-labelledby={headingId}
      className={`relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-white via-white to-gold/10 p-5 shadow-sm sm:p-7 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />
      <h2
        id={headingId}
        className="flex items-center gap-2 font-sans text-base font-bold uppercase tracking-[0.14em] text-navy sm:text-lg"
      >
        {t.keyPoints}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((point, index) => (
          <li key={`${index}-${point.slice(0, 24)}`} className="flex gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span className="min-w-0 break-words font-body text-base leading-relaxed text-dark/85">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
