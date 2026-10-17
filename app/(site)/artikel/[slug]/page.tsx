import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleFaq from '@/components/articles/ArticleFaq';
import ArticleMeta, { CategoryLink } from '@/components/articles/ArticleMeta';
import ArticleToc from '@/components/articles/ArticleToc';
import AuthorBox from '@/components/articles/AuthorBox';
import ConsultCta from '@/components/articles/ConsultCta';
import KeyPoints from '@/components/articles/KeyPoints';
import LegalDisclaimer from '@/components/articles/LegalDisclaimer';
import { ArrowLeftIcon, ArrowRightIcon, ScaleIcon } from '@/components/articles/icons';
import { getArticleLabels } from '@/components/articles/labels';
import Markdown from '@/components/content/Markdown';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getArticleBySlug, getArticles } from '@/lib/content/articles';
import type { ArticleEntry } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getServices } from '@/lib/i18n/localized-data';
import { getCurrentLocale } from '@/lib/i18n/server';
import { extractHeadings } from '@/lib/markdown';
import { generatePageMetadata, siteConfig } from '@/lib/metadata';
import { absoluteUrl, buildArticleSchema } from '@/lib/seo/schema';
import SocialShareButtons from './SocialShareButtons';

interface PageProps {
  params: { slug: string };
}

const TOC_MIN_HEADINGS = 3;
const MAX_RELATED_ARTICLES = 3;
const MAX_RELATED_SERVICES = 3;

const authorProfileUrl = (article: ArticleEntry) =>
  article.author.lawyerSlug ? absoluteUrl(`/tim/${article.author.lawyerSlug}`) : siteConfig.url;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = getCurrentLocale();
  const article = await getArticleBySlug(params.slug, locale);

  if (!article) {
    const t = getDictionary(locale).articleDetail;
    return generatePageMetadata({
      title: t.notFoundTitle,
      description: t.notFoundDescription,
      path: `/artikel/${params.slug}`,
      locale,
      noIndex: true,
    });
  }

  const authorUrl = authorProfileUrl(article);
  const base = generatePageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/artikel/${article.slug}`,
    ogImage: article.image,
    imageAlt: article.imageAlt,
    locale,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    // og:article:author berisi URL profil penulis (hanya bila penulis advokat dengan profil).
    authors: article.author.lawyerSlug ? [authorUrl] : undefined,
    section: article.category,
    tags: article.tags,
    keywords: article.tags.length > 0 ? article.tags : undefined,
  });

  return {
    ...base,
    // <meta name="author"> memakai nama + URL (bukan URL saja seperti og:article:author).
    authors: [
      article.author.lawyerSlug ? { name: article.author.name, url: authorUrl } : { name: article.author.name },
    ],
    category: article.category,
  };
}

/** Artikel terkait: kategori sama dulu, lalu jumlah tag yang sama, lalu yang terbaru. */
function pickRelatedArticles(article: ArticleEntry, articles: ArticleEntry[]): ArticleEntry[] {
  const tags = new Set(article.tags.map((tag) => tag.toLowerCase()));

  return articles
    .filter((item) => item.slug !== article.slug)
    .map((item, order) => ({
      item,
      order,
      score:
        (item.category === article.category ? 10 : 0) +
        item.tags.filter((tag) => tags.has(tag.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, MAX_RELATED_ARTICLES)
    .map(({ item }) => item);
}

const SERVICE_KEYWORDS: Array<{ key: string; slug: string }> = [
  { key: 'pidana', slug: 'hukum-pidana' },
  { key: 'criminal', slug: 'hukum-pidana' },
  { key: 'perdata', slug: 'hukum-perdata' },
  { key: 'civil', slug: 'hukum-perdata' },
  { key: 'perjanjian', slug: 'hukum-perdata' },
  { key: 'agreement', slug: 'hukum-perdata' },
  { key: 'kontrak', slug: 'hukum-perdata' },
  { key: 'contract', slug: 'hukum-perdata' },
  { key: 'bisnis', slug: 'hukum-bisnis' },
  { key: 'business', slug: 'hukum-bisnis' },
  { key: 'korporat', slug: 'hukum-bisnis' },
  { key: 'corporate', slug: 'hukum-bisnis' },
  { key: 'akuisisi', slug: 'hukum-bisnis' },
  { key: 'acquisition', slug: 'hukum-bisnis' },
  { key: 'due diligence', slug: 'hukum-bisnis' },
  { key: 'keluarga', slug: 'hukum-keluarga' },
  { key: 'family', slug: 'hukum-keluarga' },
  { key: 'perceraian', slug: 'hukum-keluarga' },
  { key: 'divorce', slug: 'hukum-keluarga' },
  { key: 'custody', slug: 'hukum-keluarga' },
  { key: 'properti', slug: 'hukum-properti' },
  { key: 'property', slug: 'hukum-properti' },
  { key: 'pertanahan', slug: 'hukum-properti' },
  { key: 'tanah', slug: 'hukum-properti' },
  { key: 'land', slug: 'hukum-properti' },
  { key: 'ketenagakerjaan', slug: 'hukum-ketenagakerjaan' },
  { key: 'employment', slug: 'hukum-ketenagakerjaan' },
  { key: 'phk', slug: 'hukum-ketenagakerjaan' },
  { key: 'termination', slug: 'hukum-ketenagakerjaan' },
  { key: 'pekerja', slug: 'hukum-ketenagakerjaan' },
  { key: 'employee', slug: 'hukum-ketenagakerjaan' },
];

function mapTagsToServices(article: ArticleEntry, locale: Locale) {
  const tagText = `${article.tags.join(' ')} ${article.category}`.toLowerCase();
  const slugs = new Set<string>();
  SERVICE_KEYWORDS.forEach((item) => {
    if (tagText.includes(item.key)) slugs.add(item.slug);
  });

  const services = getServices(locale);
  const related = services.filter((service) => slugs.has(service.slug));
  return (related.length > 0 ? related : services).slice(0, MAX_RELATED_SERVICES);
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const locale = getCurrentLocale();
  const t = getDictionary(locale);
  const labels = getArticleLabels(locale);
  const articles = await getArticles(locale);
  const index = articles.findIndex((item) => item.slug === params.slug);
  const article = index >= 0 ? articles[index] : undefined;

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(`/artikel/${article.slug}`);
  const headings = extractHeadings(article.content, 3);
  const showToc = headings.length >= TOC_MIN_HEADINGS;
  const relatedArticles = pickRelatedArticles(article, articles);
  const relatedServices = mapTagsToServices(article, locale);
  // Daftar diurutkan terbaru dulu: "sebelumnya" = lebih lama, "berikutnya" = lebih baru.
  const previousArticle = articles[index + 1] ?? null;
  const nextArticle = index > 0 ? articles[index - 1] : null;

  return (
    <main id="main" className="flex flex-col">
      <JsonLd data={buildArticleSchema(article, locale)} />

      <article className="flex flex-col">
        <header className="relative overflow-hidden bg-navy pb-10 pt-24 sm:pb-14 lg:pb-16 lg:pt-28">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-primary/40" />
          <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div aria-hidden="true" className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
            <Breadcrumb
              items={[
                { label: t.common.home, href: '/' },
                { label: t.common.articles, href: '/artikel' },
                { label: article.title },
              ]}
              currentPath={`/artikel/${article.slug}`}
            />

            <div className="mt-4 grid gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
              <div className="min-w-0" data-aos="fade-up">
                {article.category && <CategoryLink category={article.category} tone="dark" />}
                <h1 className="mt-4 break-words font-sans text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="mt-4 max-w-2xl break-words font-body text-base leading-relaxed text-white/75 sm:text-lg">
                    {article.excerpt}
                  </p>
                )}
                <ArticleMeta
                  article={article}
                  locale={locale}
                  tone="dark"
                  showCategory={false}
                  className="mt-6 border-t border-white/10 pt-6"
                />
              </div>

              <div className="relative min-w-0" data-aos="fade-up" data-aos-delay="100">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 hidden rounded-[2rem] border border-primary/30 lg:block"
                />
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-primary/20 shadow-2xl shadow-black/30 sm:rounded-3xl">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-offwhite">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10 lg:px-16 lg:py-16 xl:grid-cols-[minmax(0,1fr)_21rem] xl:gap-14">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <KeyPoints points={article.keyPoints} locale={locale} />

              {showToc && <ArticleToc headings={headings} locale={locale} variant="mobile" className="lg:hidden" />}

              <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-8">
                <Markdown content={article.content} className="max-w-[68ch]" />

                {article.tags.length > 0 && (
                  <ul className="mt-10 flex flex-wrap gap-2 border-t border-primary/10 pt-6" aria-label="Tags">
                    {article.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/artikel?q=${encodeURIComponent(tag)}`}
                          className="inline-flex min-h-[36px] items-center rounded-full bg-primary/10 px-3 py-1 font-body text-sm text-primary-700 transition-colors hover:bg-primary/20"
                        >
                          #{tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ArticleFaq faqs={article.faqs} locale={locale} />

              <LegalDisclaimer locale={locale} />

              <AuthorBox author={article.author} locale={locale} />

              <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
                <p className="font-sans text-sm font-semibold text-dark">{t.articleDetail.shareArticle}</p>
                <div className="mt-3">
                  <SocialShareButtons
                    title={article.title}
                    url={articleUrl}
                    locale={locale}
                    text={article.excerpt}
                  />
                </div>
              </div>

              {(previousArticle || nextArticle) && (
                <nav aria-label={labels.articleNav} className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {previousArticle && (
                    <Link
                      href={`/artikel/${previousArticle.slug}`}
                      rel="prev"
                      className="group flex min-h-[44px] min-w-0 flex-col rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-colors hover:border-primary/30 sm:p-5"
                    >
                      <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-dark/45">
                        <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        {t.articleDetail.previousArticle}
                      </span>
                      <span className="mt-2 line-clamp-2 break-words font-sans text-sm font-semibold leading-snug text-dark group-hover:text-primary sm:text-base">
                        {previousArticle.title}
                      </span>
                    </Link>
                  )}
                  {nextArticle && (
                    <Link
                      href={`/artikel/${nextArticle.slug}`}
                      rel="next"
                      className="group flex min-h-[44px] min-w-0 flex-col rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-colors hover:border-primary/30 sm:col-start-2 sm:items-end sm:p-5 sm:text-right"
                    >
                      <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-dark/45">
                        {t.articleDetail.nextArticle}
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="mt-2 line-clamp-2 break-words font-sans text-sm font-semibold leading-snug text-dark group-hover:text-primary sm:text-base">
                        {nextArticle.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </div>

            <aside className="min-w-0" aria-label={t.articleDetail.consultNow}>
              <div className="space-y-6 lg:sticky lg:top-28">
                {showToc && (
                  <ArticleToc headings={headings} locale={locale} variant="sidebar" className="hidden lg:block" />
                )}
                <ConsultCta locale={locale} articleTitle={article.title} articleUrl={articleUrl} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section aria-labelledby="related_title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {relatedArticles.length > 0 && (
            <>
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
                    {labels.continueReading}
                  </p>
                  <h2
                    id="related_title"
                    className="mt-2 font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl lg:text-4xl"
                  >
                    {t.articleDetail.relatedArticles}
                  </h2>
                </div>
                <Link
                  href="/artikel"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 font-sans text-sm font-semibold text-primary transition-colors hover:text-navy"
                >
                  {t.common.viewAll}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <ul className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
                {relatedArticles.map((item, itemIndex) => (
                  <li
                    key={item.slug}
                    className="w-[82%] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none"
                    data-aos="fade-up"
                    data-aos-delay={itemIndex * 100}
                  >
                    <ArticleCard
                      article={item}
                      locale={locale}
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          {relatedServices.length > 0 && (
            <div className={relatedArticles.length > 0 ? 'mt-12 sm:mt-16' : ''}>
              <h2
                id={relatedArticles.length > 0 ? undefined : 'related_title'}
                className="font-sans text-xl font-bold tracking-tight text-dark sm:text-2xl"
              >
                {t.articleDetail.relatedServices}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {relatedServices.map((service) => (
                  <li key={service.slug} className="min-w-0">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="group flex h-full min-h-[44px] items-start gap-3 rounded-2xl border border-primary/10 bg-offwhite p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white hover:shadow-md sm:p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                        <ScaleIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-words font-sans text-base font-semibold leading-snug text-dark group-hover:text-primary">
                          {service.title}
                        </span>
                        <span className="mt-1 line-clamp-2 font-body text-sm leading-relaxed text-dark/65">
                          {service.shortDesc}
                        </span>
                      </span>
                      <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
