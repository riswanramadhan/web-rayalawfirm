'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/articles/ArticleCard';
import { ArrowRightIcon, SearchIcon, XMarkIcon } from '@/components/articles/icons';
import { getArticleLabels } from '@/components/articles/labels';
import { categorySlug, matchesQuery, type ArticleSummary } from '@/components/articles/summary';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ArtikelClientProps {
  locale: Locale;
  articles: ArticleSummary[];
  initialQuery: string;
  /** Nilai ?kategori= dari URL (slug atau nama kategori). */
  initialCategory: string;
}

interface CategoryOption {
  name: string;
  slug: string;
  count: number;
}

const SEARCH_DEBOUNCE_MS = 400;
const POPULAR_COUNT = 4;

const buildListUrl = (query: string, category: string) => {
  const params = new URLSearchParams();
  if (query.trim()) params.set('q', query.trim());
  if (category) params.set('kategori', category);
  const search = params.toString();
  return search ? `/artikel?${search}` : '/artikel';
};

/** Klik biasa saja yang ditangani di klien; ctrl/cmd/middle-click tetap membuka tautan. */
const isPlainClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const hiddenScrollbar = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export default function ArtikelClient({ locale, articles, initialQuery, initialCategory }: ArtikelClientProps) {
  const router = useRouter();
  const t = getDictionary(locale).articlePage;
  const labels = getArticleLabels(locale);

  const categories = useMemo<CategoryOption[]>(() => {
    const map = new Map<string, CategoryOption>();
    articles.forEach((article) => {
      if (!article.category) return;
      const slug = categorySlug(article.category);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { name: article.category, slug, count: 1 });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [articles]);

  const resolveCategory = useCallback(
    (value: string) => {
      const slug = categorySlug(value);
      return categories.some((category) => category.slug === slug) ? slug : '';
    },
    [categories]
  );

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(() => resolveCategory(initialCategory));

  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);
  const lastUrlRef = useRef(buildListUrl(initialQuery, resolveCategory(initialCategory)));

  const syncUrl = useCallback(
    (nextQuery: string, nextCategory: string, immediate = false) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      const run = () => {
        const url = buildListUrl(nextQuery, nextCategory);
        if (url === lastUrlRef.current) return;
        lastUrlRef.current = url;
        router.replace(url, { scroll: false });
      };
      if (immediate) run();
      else debounceRef.current = window.setTimeout(run, SEARCH_DEBOUNCE_MS);
    },
    [router]
  );

  useEffect(
    () => () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    },
    []
  );

  // Navigasi dari luar (mis. tautan /artikel?kategori=... di halaman lain) mengubah props.
  useEffect(() => {
    const incomingCategory = resolveCategory(initialCategory);
    const incomingUrl = buildListUrl(initialQuery, incomingCategory);
    if (incomingUrl === lastUrlRef.current) return;
    lastUrlRef.current = incomingUrl;
    setQuery(initialQuery);
    setCategory(incomingCategory);
  }, [initialQuery, initialCategory, resolveCategory]);

  const trimmedQuery = query.trim();
  const isFiltering = Boolean(category) || trimmedQuery.length > 0;
  const activeCategory = categories.find((item) => item.slug === category) ?? null;

  const filteredArticles = useMemo(
    () =>
      articles.filter(
        (article) =>
          (!category || categorySlug(article.category) === category) && matchesQuery(article, trimmedQuery)
      ),
    [articles, category, trimmedQuery]
  );

  const featuredArticle = isFiltering ? null : articles.find((article) => article.featured) ?? articles[0] ?? null;
  const gridArticles = featuredArticle
    ? filteredArticles.filter((article) => article.slug !== featuredArticle.slug)
    : filteredArticles;

  const showListHeader = isFiltering || gridArticles.length > 0;
  const showEmptyState = isFiltering ? filteredArticles.length === 0 : articles.length === 0;

  const popularArticles = useMemo(
    () =>
      [...articles.filter((article) => article.featured), ...articles.filter((article) => !article.featured)].slice(
        0,
        POPULAR_COUNT
      ),
    [articles]
  );

  const scrollToResults = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultsRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const selectCategory = (slug: string, event?: MouseEvent<HTMLAnchorElement>, scroll = false) => {
    if (event) {
      if (!isPlainClick(event)) return;
      event.preventDefault();
    }
    setCategory(slug);
    syncUrl(query, slug, true);
    if (scroll) scrollToResults();
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    syncUrl(value, category);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    syncUrl(query, category, true);
    searchInputRef.current?.blur();
  };

  const clearQuery = () => {
    setQuery('');
    syncUrl('', category, true);
    searchInputRef.current?.focus();
  };

  const resetFilters = () => {
    setQuery('');
    setCategory('');
    syncUrl('', '', true);
    scrollToResults();
  };

  const statusText = isFiltering
    ? [labels.resultsFor(filteredArticles.length, trimmedQuery), activeCategory ? labels.inCategory(activeCategory.name) : '']
        .filter(Boolean)
        .join(' ')
    : labels.articleCount(articles.length);

  const chipClass = (active: boolean) =>
    `inline-flex min-h-[44px] shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 font-sans text-sm font-semibold transition-colors ${
      active
        ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
        : 'border-primary/15 bg-white text-dark/75 hover:border-primary/40 hover:text-primary'
    }`;

  return (
    <section className="bg-offwhite pb-16 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* Toolbar: pencarian + kategori (menumpuk di tepi bawah hero). */}
        <div className="relative z-10 -mt-14 sm:-mt-16">
          <form
            role="search"
            action="/artikel"
            method="get"
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border border-primary/10 bg-white p-2 shadow-xl shadow-navy/10 sm:p-3"
          >
            <label htmlFor="artikel-search" className="sr-only">
              {labels.searchLabel}
            </label>
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark/40 sm:left-4" />
              <input
                ref={searchInputRef}
                id="artikel-search"
                type="search"
                name="q"
                enterKeyHint="search"
                inputMode="search"
                autoComplete="off"
                maxLength={100}
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                className="h-12 w-full rounded-xl border border-transparent bg-offwhite pl-10 pr-11 font-body text-base text-dark outline-none transition placeholder:text-dark/40 focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/20 sm:pl-12 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  aria-label={labels.clearSearch}
                  className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-dark/50 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            {category && <input type="hidden" name="kategori" value={category} />}
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 font-sans text-sm font-semibold text-white transition-colors hover:bg-navy sm:px-6"
            >
              <SearchIcon className="h-5 w-5 sm:hidden" />
              <span className="sr-only sm:not-sr-only">{labels.searchSubmit}</span>
            </button>
          </form>

          <nav aria-label={labels.filterLabel} className="mt-4">
            <ul
              className={`-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 py-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 ${hiddenScrollbar}`}
            >
              <li className="shrink-0">
                <Link
                  href="/artikel"
                  prefetch={false}
                  scroll={false}
                  aria-current={!category ? 'true' : undefined}
                  onClick={(event) => selectCategory('', event)}
                  className={chipClass(!category)}
                >
                  {t.allFilter}
                  <span className={`text-xs ${!category ? 'text-white/80' : 'text-dark/45'}`}>{articles.length}</span>
                </Link>
              </li>
              {categories.map((item) => {
                const active = item.slug === category;
                return (
                  <li key={item.slug} className="shrink-0">
                    <Link
                      href={buildListUrl('', item.slug)}
                      prefetch={false}
                      scroll={false}
                      aria-current={active ? 'true' : undefined}
                      onClick={(event) => selectCategory(item.slug, event)}
                      className={chipClass(active)}
                    >
                      {item.name}
                      <span className={`text-xs ${active ? 'text-white/80' : 'text-dark/45'}`}>{item.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div ref={resultsRef} className="min-w-0 scroll-mt-28">
            <p role="status" aria-live="polite" className="sr-only">
              {statusText}
            </p>

            {featuredArticle && (
              <div className="mb-10">
                <ArticleCard
                  article={featuredArticle}
                  locale={locale}
                  variant="featured"
                  headingLevel="h2"
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            )}

            {showListHeader && (
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <h2 className="font-sans text-xl font-bold tracking-tight text-dark sm:text-2xl">
                  {isFiltering ? labels.resultsTitle : labels.latest}
                </h2>
                {isFiltering && (
                  <p className="min-w-0 break-words font-body text-sm text-dark/60" aria-hidden="true">
                    {statusText}
                  </p>
                )}
              </div>
            )}

            {gridArticles.length > 0 && (
              <ul className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
                {gridArticles.map((article) => (
                  <li key={article.slug} className="min-w-0">
                    <ArticleCard
                      article={article}
                      locale={locale}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 420px"
                    />
                  </li>
                ))}
              </ul>
            )}

            {showEmptyState && (
              <div className="mt-6 rounded-2xl border border-dashed border-primary/25 bg-white px-5 py-10 text-center sm:px-10 sm:py-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <SearchIcon className="h-7 w-7" />
                </span>
                <p className="mt-4 font-sans text-lg font-semibold text-dark">{labels.emptyTitle}</p>
                <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-dark/65 sm:text-base">
                  {isFiltering ? labels.emptyDescription : getDictionary(locale).articleDetail.notFoundDescription}
                </p>
                {isFiltering && (
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-primary px-6 font-sans text-sm font-semibold text-white transition-colors hover:bg-navy sm:w-auto"
                    >
                      {labels.resetFilters}
                    </button>
                    <Link
                      href="/konsultasi"
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 rounded-xl border border-primary/25 px-6 font-sans text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 sm:w-auto"
                    >
                      {labels.disclaimerCta}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="min-w-0 space-y-6">
            {popularArticles.length > 0 && (
              <section aria-labelledby="artikel-populer" className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                <h2 id="artikel-populer" className="font-sans text-base font-semibold text-dark">
                  {t.popularArticles}
                </h2>
                <ul className="mt-4 space-y-3">
                  {popularArticles.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} locale={locale} variant="compact" headingLevel="h3" />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {categories.length > 0 && (
              <section aria-labelledby="artikel-kategori" className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                <h2 id="artikel-kategori" className="font-sans text-base font-semibold text-dark">
                  {t.categories}
                </h2>
                <ul className="mt-3 divide-y divide-primary/10">
                  {categories.map((item) => {
                    const active = item.slug === category;
                    return (
                      <li key={item.slug}>
                        <Link
                          href={buildListUrl('', item.slug)}
                          prefetch={false}
                          scroll={false}
                          aria-current={active ? 'true' : undefined}
                          onClick={(event) => selectCategory(item.slug, event, true)}
                          className={`flex min-h-[44px] items-center justify-between gap-3 py-2 font-body text-sm transition-colors ${
                            active ? 'font-semibold text-primary' : 'text-dark/75 hover:text-primary'
                          }`}
                        >
                          <span className="min-w-0 break-words">{item.name}</span>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              active ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {item.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
