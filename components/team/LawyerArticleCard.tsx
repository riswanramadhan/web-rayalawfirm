import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatReadingTime } from '@/lib/content/format';
import type { ArticleEntry } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';

interface LawyerArticleCardProps {
  article: ArticleEntry;
  locale: Locale;
}

/** Kartu artikel ringkas untuk halaman profil pengacara. */
export default function LawyerArticleCard({ article, locale }: LawyerArticleCardProps) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex h-full min-w-0 gap-3 rounded-2xl border border-gray-100 bg-offwhite p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-md hover:shadow-primary/10 sm:gap-4"
    >
      <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-28">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 96px, 112px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {article.category && (
          <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-primary">
            {article.category}
          </p>
        )}
        <h3 className="mt-1 line-clamp-3 break-words font-sans text-sm font-semibold leading-snug text-dark transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-auto pt-2 text-xs text-dark/50">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
          <span aria-hidden="true"> · </span>
          {formatReadingTime(article.readingMinutes, locale)}
        </p>
      </div>
    </Link>
  );
}
