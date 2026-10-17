import Markdown from '@/components/content/Markdown';
import type { FaqItem } from '@/lib/content/types';

interface ArticlePreviewProps {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  dateLabel: string;
  readingMinutes: number;
  /** URL gambar (object URL file lokal atau URL publik). */
  coverSrc: string | null;
  coverAlt: string;
  keyPoints: string[];
  faqs: FaqItem[];
  tags: string[];
}

/**
 * Pratinjau perkiraan tampilan artikel di website (tanpa h1 — halaman admin
 * sudah punya h1 sendiri).
 */
export default function ArticlePreview({
  title,
  excerpt,
  content,
  category,
  authorName,
  dateLabel,
  readingMinutes,
  coverSrc,
  coverAlt,
  keyPoints,
  faqs,
  tags,
}: ArticlePreviewProps) {
  const visibleFaqs = faqs.filter((item) => item.question.trim() && item.answer.trim());
  const visiblePoints = keyPoints.filter((point) => point.trim());

  return (
    <article className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <p className="flex items-center gap-2 border-b border-dark/5 bg-offwhite px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/45 sm:px-8">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
        Pratinjau — perkiraan tampilan di website
      </p>

      {coverSrc ? (
        <div className="relative aspect-video w-full bg-navy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverSrc} alt={coverAlt || title} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[3/1] w-full items-center justify-center bg-gradient-to-br from-navy to-primary px-4 text-center text-xs font-medium text-white/70">
          Tanpa gambar sampul — website memakai gambar bawaan Raya Law Firm
        </div>
      )}

      <div className="px-4 pb-8 pt-6 sm:px-8">
        {category.trim() && (
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
            {category}
          </span>
        )}
        <p className="mt-3 break-words font-sans text-2xl font-extrabold leading-tight tracking-tight text-dark sm:text-3xl">
          {title.trim() || 'Judul artikel'}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-dark/55">
          <span className="font-medium text-dark/75">{authorName}</span>
          {dateLabel && (
            <>
              <span aria-hidden="true">·</span>
              <span>{dateLabel}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{readingMinutes} menit baca</span>
        </p>
        {excerpt.trim() && (
          <p className="mt-4 break-words font-body text-lg leading-relaxed text-dark/70">{excerpt}</p>
        )}

        {visiblePoints.length > 0 && (
          <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:p-5">
            <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-navy">Poin Penting</p>
            <ul className="mt-3 space-y-2">
              {visiblePoints.map((point, index) => (
                <li key={`${point}-${index}`} className="flex gap-2 font-body text-base leading-relaxed text-dark/80">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="min-w-0 break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 break-words">
          {content.trim() ? (
            <Markdown content={content} />
          ) : (
            <p className="text-sm text-dark/50">Isi artikel akan tampil di sini.</p>
          )}
        </div>

        {visibleFaqs.length > 0 && (
          <div className="mt-10 border-t border-dark/10 pt-8">
            <p className="font-sans text-xl font-bold text-dark sm:text-2xl">Pertanyaan yang Sering Diajukan</p>
            <dl className="mt-4 space-y-3">
              {visibleFaqs.map((item, index) => (
                <div key={index} className="rounded-xl border border-primary/10 bg-offwhite p-4">
                  <dt className="break-words font-sans text-base font-semibold text-dark">{item.question}</dt>
                  <dd className="mt-1.5 whitespace-pre-line break-words font-body text-base leading-relaxed text-dark/75">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tag">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-dark/5 px-3 py-1 text-xs font-medium text-dark/65">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
