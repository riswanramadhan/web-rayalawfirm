import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatReadingTime } from '@/lib/content/format';
import type { Locale } from '@/lib/i18n/config';
import { ArrowRightIcon, ClockIcon, UserIcon } from './icons';
import { getArticleLabels } from './labels';
import type { ArticleSummary } from './summary';

type HeadingLevel = 'h2' | 'h3' | 'h4';

export type ArticleCardVariant = 'default' | 'compact' | 'featured' | 'overlay';

interface ArticleCardProps {
  article: ArticleSummary;
  locale: Locale;
  /** default: kartu vertikal · compact: thumbnail kiri · featured: kartu besar daftar · overlay: teks di atas gambar. */
  variant?: ArticleCardVariant;
  headingLevel?: HeadingLevel;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Hanya untuk variant compact: berubah menjadi kartu vertikal mulai breakpoint lg. */
  stackOnDesktop?: boolean;
}

const cardShell =
  'group relative isolate min-w-0 overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2';

/** Link judul membentang ke seluruh kartu (pola "stretched link") agar nama aksesibelnya ringkas. */
const stretchedLink =
  'after:absolute after:inset-0 after:z-10 focus-visible:outline-none focus-visible:[box-shadow:none]';

function PublishedDate({ iso, locale }: { iso: string; locale: Locale }) {
  return <time dateTime={iso}>{formatDate(iso, locale)}</time>;
}

function Dot() {
  return (
    <span aria-hidden="true" className="text-current opacity-50">
      ·
    </span>
  );
}

export default function ArticleCard({
  article,
  locale,
  variant = 'default',
  headingLevel = 'h3',
  priority = false,
  sizes,
  className = '',
  stackOnDesktop = false,
}: ArticleCardProps) {
  const Heading = headingLevel;
  const href = `/artikel/${article.slug}`;
  const labels = getArticleLabels(locale);
  const readingTime = formatReadingTime(article.readingMinutes, locale);

  if (variant === 'compact') {
    return (
      <article
        className={`${cardShell} flex gap-3 p-3 sm:gap-4 ${
          stackOnDesktop ? 'lg:flex-col lg:gap-0 lg:p-0' : ''
        } ${className}`}
      >
        <div
          className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-accent/30 sm:w-28 ${
            stackOnDesktop ? 'lg:aspect-[16/9] lg:w-full lg:rounded-none' : ''
          }`}
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={sizes ?? (stackOnDesktop ? '(max-width: 640px) 96px, (max-width: 1024px) 112px, 400px' : '112px')}
          />
        </div>
        <div className={`flex min-w-0 flex-1 flex-col ${stackOnDesktop ? 'lg:p-5' : ''}`}>
          {article.category && (
            <p className="truncate font-sans text-[11px] font-semibold uppercase tracking-wider text-primary">
              {article.category}
            </p>
          )}
          <Heading className="mt-1 line-clamp-3 break-words font-sans text-sm font-semibold leading-snug text-dark transition-colors group-hover:text-primary sm:text-[0.9375rem]">
            <Link href={href} className={stretchedLink}>
              {article.title}
            </Link>
          </Heading>
          {stackOnDesktop && (
            <p className="mt-2 hidden font-body text-sm leading-relaxed text-dark/70 lg:line-clamp-2">
              {article.excerpt}
            </p>
          )}
          <p className="mt-auto flex flex-wrap items-center gap-x-1.5 pt-2 font-body text-xs text-dark/55">
            <PublishedDate iso={article.publishedAt} locale={locale} />
            <Dot />
            <span>{readingTime}</span>
          </p>
        </div>
      </article>
    );
  }

  if (variant === 'overlay') {
    return (
      <article
        className={`${cardShell} flex min-h-[24rem] flex-col justify-end border-0 bg-navy sm:min-h-[28rem] lg:min-h-[34rem] ${className}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={sizes ?? '(max-width: 1024px) 100vw, 840px'}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/5"
        />
        <div className="p-5 text-white sm:p-8">
          {article.category && (
            <p className="inline-flex max-w-full items-center truncate rounded-full bg-white/15 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {article.category}
            </p>
          )}
          <Heading className="mt-3 break-words font-sans text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-3xl">
            <Link href={href} className={stretchedLink}>
              {article.title}
            </Link>
          </Heading>
          <p className="mt-3 line-clamp-2 max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:line-clamp-3 sm:text-base">
            {article.excerpt}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs text-white/75 sm:text-sm">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <UserIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">{article.author.name}</span>
            </span>
            <Dot />
            <PublishedDate iso={article.publishedAt} locale={locale} />
            <Dot />
            <span>{readingTime}</span>
          </p>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className={`${cardShell} grid rounded-3xl shadow-md lg:grid-cols-[1.15fr_1fr] ${className}`}>
        <div className="relative aspect-[16/9] bg-accent/30 lg:aspect-auto lg:min-h-[22rem]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={sizes ?? '(max-width: 1024px) 100vw, 520px'}
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-navy shadow-sm">
            {labels.featured}
          </span>
        </div>
        <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-8">
          {article.category && (
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
              {article.category}
            </p>
          )}
          <Heading className="mt-3 break-words font-sans text-xl font-bold leading-snug tracking-tight text-dark transition-colors group-hover:text-primary sm:text-2xl lg:text-[1.75rem]">
            <Link href={href} className={stretchedLink}>
              {article.title}
            </Link>
          </Heading>
          <p className="mt-3 line-clamp-3 font-body text-base leading-relaxed text-dark/70 lg:line-clamp-4">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-primary/10 pt-5 font-body text-sm text-dark/60 lg:mt-auto">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <UserIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate font-medium text-dark/75">{article.author.name}</span>
            </span>
            <Dot />
            <PublishedDate iso={article.publishedAt} locale={locale} />
            <Dot />
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 shrink-0" />
              {readingTime}
            </span>
            <span className="ml-auto hidden items-center gap-1.5 font-sans text-sm font-semibold text-primary sm:inline-flex">
              {labels.readMore}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`${cardShell} flex h-full flex-col ${className}`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-accent/30">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px'}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        {article.category && (
          <p className="truncate font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
            {article.category}
          </p>
        )}
        <Heading className="mt-2 line-clamp-3 break-words font-sans text-lg font-semibold leading-snug text-dark transition-colors group-hover:text-primary">
          <Link href={href} className={stretchedLink}>
            {article.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-dark/70">{article.excerpt}</p>
        <div className="mt-auto flex min-w-0 items-center gap-3 pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
            {article.author.image ? (
              <Image
                src={article.author.image}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-cover object-top"
              />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate font-sans text-sm font-semibold text-dark">{article.author.name}</p>
            <p className="flex flex-wrap items-center gap-x-1.5 font-body text-xs text-dark/55">
              <PublishedDate iso={article.publishedAt} locale={locale} />
              <Dot />
              <span>{readingTime}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
