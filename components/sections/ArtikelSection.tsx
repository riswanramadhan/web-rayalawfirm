import Link from 'next/link';
import ArticleCard from '@/components/articles/ArticleCard';
import { ArrowRightIcon } from '@/components/articles/icons';
import { getArticles } from '@/lib/content/articles';
import type { ArticleEntry } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

const HOME_ARTICLE_COUNT = 3;

/** Artikel unggulan dulu, lalu yang terbaru (daftar sudah terurut terbaru). */
const pickHomeArticles = (articles: ArticleEntry[]) =>
  [...articles.filter((article) => article.featured), ...articles.filter((article) => !article.featured)].slice(
    0,
    HOME_ARTICLE_COUNT
  );

interface ArtikelSectionProps {
  locale: Locale;
}

export default async function ArtikelSection({ locale }: ArtikelSectionProps) {
  const t = getDictionary(locale).home.articles;
  const articles = await getArticles(locale);
  const [mainArticle, ...secondaryArticles] = pickHomeArticles(articles);

  if (!mainArticle) {
    return null;
  }

  return (
    <section aria-labelledby="home-articles-title" className="bg-offwhite py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-primary-700">
              {t.badge}
            </span>
            <h2
              id="home-articles-title"
              className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl"
            >
              {t.title}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-dark/70 lg:text-lg">{t.description}</p>
          </div>
          <Link
            href="/artikel"
            className="hidden min-h-[48px] shrink-0 items-center gap-2 rounded-xl border border-primary/30 px-6 py-3 font-sans text-sm font-semibold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 sm:inline-flex"
          >
            {t.readAll}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          <li className="min-w-0 lg:col-span-2 lg:row-span-2" data-aos="fade-up">
            <ArticleCard
              article={mainArticle}
              locale={locale}
              variant="overlay"
              headingLevel="h3"
              className="h-full"
              sizes="(max-width: 1024px) 100vw, 840px"
            />
          </li>
          {secondaryArticles.map((article, index) => (
            <li key={article.slug} className="min-w-0" data-aos="fade-up" data-aos-delay={100 + index * 100}>
              <ArticleCard
                article={article}
                locale={locale}
                variant="compact"
                headingLevel="h3"
                stackOnDesktop
                className="h-full"
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex sm:hidden">
          <Link
            href="/artikel"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-6 py-3 font-sans text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10"
          >
            {t.readAll}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
