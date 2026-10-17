import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatReadingTime } from '@/lib/content/format';
import type { ArticleEntry } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { CalendarIcon, ClockIcon, RefreshIcon, UserIcon } from './icons';
import { getArticleLabels } from './labels';
import { categoryHref, isMeaningfullyUpdated } from './summary';

type MetaArticle = Pick<ArticleEntry, 'author' | 'publishedAt' | 'updatedAt' | 'readingMinutes' | 'category'>;

interface ArticleMetaProps {
  article: MetaArticle;
  locale: Locale;
  /** dark: di atas latar navy (hero) · light: di atas latar terang. */
  tone?: 'dark' | 'light';
  showCategory?: boolean;
  className?: string;
}

const tones = {
  dark: {
    muted: 'text-white/70',
    strong: 'text-white',
    icon: 'text-accent',
    avatar: 'border-white/20 bg-white/10 text-white',
    link: 'hover:text-accent decoration-white/30',
    chip: 'border-white/15 bg-white/10 text-white hover:bg-white/20',
  },
  light: {
    muted: 'text-dark/60',
    strong: 'text-dark',
    icon: 'text-primary',
    avatar: 'border-primary/15 bg-primary/10 text-primary',
    link: 'hover:text-primary decoration-primary/30',
    chip: 'border-primary/15 bg-primary/5 text-primary hover:bg-primary/10',
  },
} as const;

/** Chip kategori yang menautkan ke daftar artikel terfilter. */
export function CategoryLink({
  category,
  tone = 'light',
  className = '',
}: {
  category: string;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <Link
      href={categoryHref(category)}
      className={`inline-flex min-h-[32px] max-w-full items-center rounded-full border px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors sm:text-xs ${tones[tone].chip} ${className}`}
    >
      <span className="truncate">{category}</span>
    </Link>
  );
}

/** Penulis, tanggal terbit/diperbarui, waktu baca, dan kategori artikel. */
export default function ArticleMeta({
  article,
  locale,
  tone = 'light',
  showCategory = true,
  className = '',
}: ArticleMetaProps) {
  const t = getArticleLabels(locale);
  const style = tones[tone];
  const { author } = article;
  const updated = isMeaningfullyUpdated(article.publishedAt, article.updatedAt);

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 ${className}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border ${style.avatar}`}
        >
          {author.image ? (
            <Image src={author.image} alt="" fill className="object-cover object-top" sizes="44px" />
          ) : (
            <UserIcon className="h-5 w-5" />
          )}
        </span>
        <div className="min-w-0">
          <p className={`font-body text-xs ${style.muted}`}>{t.by}</p>
          <p className={`break-words font-sans text-sm font-semibold leading-snug ${style.strong}`}>
            {author.lawyerSlug ? (
              <Link
                href={`/tim/${author.lawyerSlug}`}
                rel="author"
                className={`underline-offset-4 transition-colors hover:underline ${style.link}`}
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          {author.position && (
            <p className={`break-words font-body text-xs ${style.muted}`}>{author.position}</p>
          )}
        </div>
      </div>

      <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm ${style.muted}`}>
        <li className="inline-flex items-center gap-1.5">
          <CalendarIcon className={`h-4 w-4 shrink-0 ${style.icon}`} />
          <span className="sr-only">{t.published}: </span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
        </li>
        {updated && (
          <li className="inline-flex items-center gap-1.5">
            <RefreshIcon className={`h-4 w-4 shrink-0 ${style.icon}`} />
            <span>
              {t.updated}{' '}
              <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, locale)}</time>
            </span>
          </li>
        )}
        <li className="inline-flex items-center gap-1.5">
          <ClockIcon className={`h-4 w-4 shrink-0 ${style.icon}`} />
          {formatReadingTime(article.readingMinutes, locale)}
        </li>
        {showCategory && article.category && (
          <li className="min-w-0">
            <span className="sr-only">{t.category}: </span>
            <CategoryLink category={article.category} tone={tone} />
          </li>
        )}
      </ul>
    </div>
  );
}
