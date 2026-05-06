import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { articles, type Article } from '@/lib/data/articles';
import { services } from '@/lib/data/services';
import { buildWhatsAppURL } from '@/lib/whatsapp';
import { generatePageMetadata, siteConfig } from '@/lib/metadata';
import SocialShareButtons from './SocialShareButtons';

interface PageProps {
  params: { slug: string };
}

const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return generatePageMetadata({
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak tersedia.',
      path: `/artikel/${params.slug}`,
    });
  }

  return generatePageMetadata({
    title: article.metaTitle,
    description: article.metaDesc,
    path: `/artikel/${article.slug}`,
    ogImage: article.image,
  });
}

const renderContent = (content: string) => {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, index) => {
    if (block.startsWith('## ')) {
      return (
        <h3
          key={`heading-${index}`}
          className="mt-8 font-sans text-2xl font-semibold text-dark"
        >
          {block.replace('## ', '')}
        </h3>
      );
    }

    if (block.startsWith('>')) {
      return (
        <blockquote
          key={`quote-${index}`}
          className="mt-6 border-l-4 border-primary bg-primary/5 px-4 py-3 text-lg italic text-dark/80"
        >
          {block.replace('> ', '')}
        </blockquote>
      );
    }

    return (
      <p
        key={`paragraph-${index}`}
        className="mt-4 font-body text-base leading-relaxed text-dark/80 lg:text-lg"
      >
        {block}
      </p>
    );
  });
};

const mapTagsToServices = (article: Article) => {
  const tagText = `${article.tags.join(' ')} ${article.category}`.toLowerCase();
  const mapping: Array<{ key: string; slug: string }> = [
    { key: 'pidana', slug: 'hukum-pidana' },
    { key: 'perdata', slug: 'hukum-perdata' },
    { key: 'perjanjian', slug: 'hukum-perdata' },
    { key: 'kontrak', slug: 'hukum-perdata' },
    { key: 'bisnis', slug: 'hukum-bisnis' },
    { key: 'korporat', slug: 'hukum-bisnis' },
    { key: 'akuisisi', slug: 'hukum-bisnis' },
    { key: 'due diligence', slug: 'hukum-bisnis' },
    { key: 'keluarga', slug: 'hukum-keluarga' },
    { key: 'perceraian', slug: 'hukum-keluarga' },
    { key: 'properti', slug: 'hukum-properti' },
    { key: 'pertanahan', slug: 'hukum-properti' },
    { key: 'tanah', slug: 'hukum-properti' },
    { key: 'ketenagakerjaan', slug: 'hukum-ketenagakerjaan' },
    { key: 'phk', slug: 'hukum-ketenagakerjaan' },
    { key: 'pekerja', slug: 'hukum-ketenagakerjaan' },
  ];

  const slugs = new Set<string>();
  mapping.forEach((item) => {
    if (tagText.includes(item.key)) {
      slugs.add(item.slug);
    }
  });

  const related = services.filter((service) => slugs.has(service.slug));

  if (related.length > 0) {
    return related.slice(0, 3);
  }

  return services.slice(0, 3);
};

export default function ArtikelDetailPage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleUrl = new URL(`/artikel/${article.slug}`, siteConfig.url).toString();
  const authorBio =
    'Tim editorial Raya Law Firm merangkum artikel ini untuk memberikan panduan hukum yang ringkas, akurat, dan mudah dipahami.';
  const relatedArticles = articles
    .filter((item) => item.category === article.category && item.slug !== article.slug)
    .concat(articles.filter((item) => item.slug !== article.slug && item.category !== article.category))
    .slice(0, 3);
  const otherArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const relatedServices = mapTagsToServices(article);
  const index = articles.findIndex((item) => item.slug === article.slug);
  const prevArticle = index > 0 ? articles[index - 1] : null;
  const nextArticle = index < articles.length - 1 ? articles[index + 1] : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: [new URL(article.image, siteConfig.url).toString()],
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/logo.png', siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: articleUrl,
  } as const;

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden bg-navy py-14 sm:py-0">
        <div className="relative h-[520px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-16">
            <Breadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Artikel', href: '/artikel' },
                { label: article.title },
              ]}
            />
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {article.category}
            </span>
            <h1 className="mt-4 max-w-3xl font-sans text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0115 0" />
                </svg>
                {article.author}
              </span>
              <span>|</span>
              <span>{article.date}</span>
              <span>|</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[2fr_1fr] lg:px-16">
          <div>
            <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm">
              <div>{renderContent(article.content)}</div>

              <div className="mt-10 rounded-2xl border border-primary/10 bg-offwhite p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0115 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{article.author}</p>
                    <p className="text-xs text-dark/60">Admin Raya Law Firm</p>
                    <p className="mt-2 text-sm text-dark/70">{authorBio}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-dark">Bagikan Artikel</p>
                <div className="mt-3">
                  <SocialShareButtons title={article.title} url={articleUrl} />
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {prevArticle && (
                  <Link
                    href={`/artikel/${prevArticle.slug}`}
                    className="rounded-2xl border border-primary/10 bg-white p-5 text-sm text-dark/70 transition-colors hover:border-primary/30"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-dark/40">
                      Artikel Sebelumnya
                    </p>
                    <p className="mt-2 font-semibold text-dark">
                      {prevArticle.title}
                    </p>
                  </Link>
                )}
                {nextArticle && (
                  <Link
                    href={`/artikel/${nextArticle.slug}`}
                    className="rounded-2xl border border-primary/10 bg-white p-5 text-sm text-dark/70 transition-colors hover:border-primary/30"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-dark/40">
                      Artikel Berikutnya
                    </p>
                    <p className="mt-2 font-semibold text-dark">
                      {nextArticle.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
              <h3 className="text-lg font-semibold">Konsultasi Sekarang</h3>
              <p className="mt-2 text-sm text-white/80">
                Dapatkan arahan hukum dari tim advokat kami.
              </p>
              <a
                href={buildWhatsAppURL('Halo Raya Law Firm, saya ingin konsultasi mengenai artikel ini.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary"
              >
                Konsultasi via WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-dark">Artikel Terkait</h3>
              <ul className="mt-4 space-y-3 text-sm text-dark/70">
                {relatedArticles.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/artikel/${item.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-dark">Layanan Terkait</h3>
              <ul className="mt-4 space-y-3 text-sm text-dark/70">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
              Artikel Lainnya
            </h2>
            <Link href="/artikel" className="text-sm font-semibold text-primary">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((item, index) => (
              <Link
                key={item.slug}
                href={`/artikel/${item.slug}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">
                    {item.category}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm text-dark/70">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
