'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/data/articles';

const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Hukum Pidana', value: 'Hukum Pidana' },
  { label: 'Hukum Perdata', value: 'Hukum Perdata' },
  { label: 'Hukum Bisnis', value: 'Hukum Bisnis' },
  { label: 'Hukum Keluarga', value: 'Hukum Keluarga' },
  { label: 'Hukum Properti', value: 'Properti & Pertanahan' },
  { label: 'Ketenagakerjaan', value: 'Ketenagakerjaan' },
];

const featuredArticle = articles.find((article) => article.featured) ?? articles[0];

const popularArticles = (() => {
  const featured = articles.filter((article) => article.featured);
  const rest = articles.filter((article) => !article.featured);
  return [...featured, ...rest].slice(0, 3);
})();

const categoryCounts = articles.reduce<Record<string, number>>((acc, article) => {
  acc[article.category] = (acc[article.category] ?? 0) + 1;
  return acc;
}, {});

export default function ArtikelClient() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredArticles = useMemo(() => {
    let list = articles.filter((article) => article.slug !== featuredArticle?.slug);

    if (activeFilter !== 'all') {
      list = list.filter((article) => article.category === activeFilter);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      list = list.filter((article) =>
        `${article.title} ${article.excerpt}`.toLowerCase().includes(query)
      );
    }

    return list;
  }, [activeFilter, searchTerm]);

  return (
    <section className="bg-offwhite py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
        {featuredArticle && (
          <Link
            href={`/artikel/${featuredArticle.slug}`}
            data-aos="fade-up"
            className="group mb-12 grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative min-h-[280px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-between p-8">
              <div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {featuredArticle.category}
                </span>
                <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 font-body text-base text-dark/70">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-dark/60">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-dark/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0115 0" />
                  </svg>
                  {featuredArticle.author}
                </span>
                <span>|</span>
                <span>{featuredArticle.date}</span>
                <span>|</span>
                <span>{featuredArticle.readTime}</span>
                <span className="ml-auto inline-flex items-center gap-2 font-semibold text-primary">
                  Baca Artikel
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3" data-aos="fade-up">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    activeFilter === filter.value
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/artikel/${article.slug}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {article.category}
                    </span>
                  </div>
                  <div className="space-y-3 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">
                      {article.category}
                    </p>
                    <h3 className="font-sans text-lg font-semibold text-dark">
                      {article.title}
                    </h3>
                    <p className="text-sm text-dark/70">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-dark/60">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          className="h-4 w-4 text-primary"
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
                        <p className="text-sm font-semibold text-dark">
                          {article.author}
                        </p>
                        <p className="text-xs text-dark/60">
                          {article.date} | {article.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-6" data-aos="fade-up">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-dark">Pencarian</p>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="mt-3 w-full rounded-xl border border-primary/30 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-dark">Artikel Populer</p>
              <ul className="mt-4 space-y-3 text-sm text-dark/70">
                {popularArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/artikel/${article.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-dark">Kategori</p>
              <ul className="mt-4 space-y-3 text-sm text-dark/70">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <li key={category} className="flex items-center justify-between">
                    <span>{category}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
