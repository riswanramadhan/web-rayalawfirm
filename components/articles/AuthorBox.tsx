import Image from 'next/image';
import Link from 'next/link';
import type { ArticleAuthor } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { siteConfig } from '@/lib/metadata';
import { ArrowRightIcon } from './icons';
import { getArticleLabels } from './labels';

interface AuthorBoxProps {
  author: ArticleAuthor;
  locale: Locale;
  className?: string;
}

/** Kotak penulis (E-E-A-T): profil advokat bila penulis anggota tim, selain itu tim redaksi. */
export default function AuthorBox({ author, locale, className = '' }: AuthorBoxProps) {
  const t = getArticleLabels(locale);
  const dict = getDictionary(locale);
  const headingId = 'article_author';
  const profileHref = author.lawyerSlug ? `/tim/${author.lawyerSlug}` : null;

  return (
    <section
      aria-labelledby={headingId}
      className={`rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <h2 id={headingId} className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
        {t.aboutAuthor}
      </h2>

      <div className="mt-4 flex flex-col gap-4 xs:flex-row xs:items-start">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-b from-accent/40 to-primary/10">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          ) : (
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              fill
              className="object-contain p-2"
              sizes="80px"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="break-words font-sans text-lg font-bold leading-snug text-dark">
            {profileHref ? (
              <Link
                href={profileHref}
                rel="author"
                className="transition-colors hover:text-primary hover:underline hover:decoration-primary/30 hover:underline-offset-4"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </p>
          <p className="mt-0.5 break-words font-body text-sm font-medium text-dark/60">
            {author.position || (profileHref ? siteConfig.name : dict.articleDetail.authorRole)}
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-dark/75 sm:text-[0.9375rem]">
            {profileHref
              ? t.lawyerAuthorLine(author.position || (locale === 'en' ? 'Advocate' : 'Advokat'))
              : dict.articleDetail.authorBio}
          </p>
          {profileHref && (
            <Link
              href={profileHref}
              className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-primary/20 px-4 py-2 font-sans text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10"
            >
              {t.viewProfile}
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">: {author.name}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
