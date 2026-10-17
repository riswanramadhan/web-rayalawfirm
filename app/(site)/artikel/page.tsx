import type { Metadata } from 'next';
import { getArticleLabels } from '@/components/articles/labels';
import { toArticleSummary } from '@/components/articles/summary';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getArticles } from '@/lib/content/articles';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getCurrentLocale } from '@/lib/i18n/server';
import { generatePageMetadata } from '@/lib/metadata';
import { SCHEMA_IDS, absoluteUrl, buildArticleAuthorSchema } from '@/lib/seo/schema';
import ArtikelClient from './ArtikelClient';

interface PageProps {
  searchParams?: { q?: string | string[]; kategori?: string | string[] };
}

const MAX_SCHEMA_POSTS = 20;

const firstParam = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.trim() ?? '';

export function generateMetadata(): Metadata {
  const locale = getCurrentLocale();
  const t = getDictionary(locale).articlePage;
  const base = generatePageMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/artikel',
    locale,
  });

  // generatePageMetadata sudah menyertakan RSS (alternates.types); tambahkan hanya bila belum ada.
  return {
    ...base,
    alternates: {
      ...base.alternates,
      types: base.alternates?.types ?? {
        'application/rss+xml': [{ url: '/feed.xml', title: 'Artikel Raya Law Firm' }],
      },
    },
  };
}

export default async function ArtikelPage({ searchParams }: PageProps) {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const labels = getArticleLabels(locale);
  const articles = await getArticles(locale);
  const categoryCount = new Set(articles.map((article) => article.category).filter(Boolean)).size;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${absoluteUrl('/artikel')}#blog`,
    url: absoluteUrl('/artikel'),
    name: t.articlePage.title,
    description: t.articlePage.metaDescription,
    inLanguage: locale === 'en' ? 'en-US' : 'id-ID',
    publisher: { '@id': SCHEMA_IDS.organization },
    isPartOf: { '@id': SCHEMA_IDS.website },
    blogPost: articles.slice(0, MAX_SCHEMA_POSTS).map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title.slice(0, 110),
      url: absoluteUrl(`/artikel/${article.slug}`),
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      image: absoluteUrl(article.image),
      author: buildArticleAuthorSchema(article.author),
    })),
  };

  return (
    <main id="main" className="flex flex-col">
      <JsonLd data={blogSchema} />

      <section className="relative overflow-hidden bg-navy pb-24 pt-24 sm:pb-28 lg:pb-32 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/40" />
        <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.articlePage.breadcrumb },
              ]}
              currentPath="/artikel"
            />
            <h1 className="mt-4 break-words font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
              {t.articlePage.title}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/75 sm:text-lg">
              {t.articlePage.description}
            </p>
            {articles.length > 0 && (
              <p className="mt-5 inline-flex flex-wrap items-center gap-x-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-body text-sm text-white/85">
                <span>{labels.articleCount(articles.length)}</span>
                <span aria-hidden="true" className="text-white/40">
                  ·
                </span>
                <span>{labels.categoryCount(categoryCount)}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <ArtikelClient
        locale={locale}
        articles={articles.map(toArticleSummary)}
        initialQuery={firstParam(searchParams?.q).slice(0, 100)}
        initialCategory={firstParam(searchParams?.kategori).slice(0, 80)}
      />
    </main>
  );
}
