'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { inputClassName, primaryButtonClassName, secondaryButtonClassName } from '@/components/admin/form';
import { canOptimizeImage } from '@/components/admin/shell/image';
import { formatDate } from '@/lib/content/format';

export interface AdminArticleListItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  featured: boolean;
  authorName: string;
  coverUrl: string;
}

interface ArticleListProps {
  items: AdminArticleListItem[];
  /** Waktu server (ms) agar status "Terjadwal" konsisten server/klien. */
  now: number;
}

const ALL = '__all__';

const normalize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();

function ExternalIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function Thumbnail({ item }: { item: AdminArticleListItem }) {
  const url = item.coverUrl.trim();

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-offwhite md:aspect-video md:h-auto md:w-full md:rounded-none">
      {url ? (
        <Image
          src={url}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 80px"
          unoptimized={!canOptimizeImage(url)}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-primary text-white/70" aria-hidden="true">
          <svg className="h-7 w-7 md:h-9 md:w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function ArticleList({ items, now }: ArticleListProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(ALL);
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      const label = item.category.trim() || 'Umum';
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'id-ID'))
      .map(([label, count]) => ({ label, count }));
  }, [items]);

  const filtered = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      if (category !== ALL && (item.category.trim() || 'Umum') !== category) return false;
      if (terms.length === 0) return true;
      const haystack = normalize(`${item.title} ${item.category} ${item.authorName} ${item.slug}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [items, deferredQuery, category]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-dark/15 bg-white px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </span>
        <h2 className="mt-4 font-sans text-lg font-semibold text-dark">Belum ada artikel</h2>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-dark/60">
          Tulis artikel pertama untuk membantu calon klien menemukan Raya Law Firm di Google.
        </p>
        <Link href="/admin/artikel/baru" className={`${primaryButtonClassName} mt-6 w-full sm:w-auto`}>
          Tulis Artikel
        </Link>
      </div>
    );
  }

  const resetFilters = () => {
    setQuery('');
    setCategory(ALL);
  };

  const chipClass = (selected: boolean) =>
    `inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 ${
      selected ? 'border-navy bg-navy text-white' : 'border-dark/15 bg-white text-dark/70 hover:border-primary/40 hover:text-primary'
    }`;

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-dark/10 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
          <label htmlFor="article-search" className="sr-only">
            Cari artikel
          </label>
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-dark/40"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="article-search"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul atau kategori"
            className={`${inputClassName} min-h-[48px] pl-11`}
          />
        </div>

        {categories.length > 1 && (
          <div
            role="group"
            aria-label="Filter kategori"
            className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:-mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <button type="button" aria-pressed={category === ALL} onClick={() => setCategory(ALL)} className={chipClass(category === ALL)}>
              Semua
              <span className={`rounded-full px-1.5 text-xs tabular-nums ${category === ALL ? 'bg-white/20' : 'bg-dark/5'}`}>
                {items.length}
              </span>
            </button>
            {categories.map((entry) => {
              const selected = category === entry.label;
              return (
                <button
                  key={entry.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCategory(entry.label)}
                  className={chipClass(selected)}
                >
                  {entry.label}
                  <span className={`rounded-full px-1.5 text-xs tabular-nums ${selected ? 'bg-white/20' : 'bg-dark/5'}`}>
                    {entry.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-dark/50" aria-live="polite">
        Menampilkan {filtered.length} dari {items.length} artikel
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-dark/15 bg-white px-6 py-10 text-center">
          <p className="font-sans text-base font-semibold text-dark">Tidak ada artikel yang cocok</p>
          <p className="mt-1 text-sm text-dark/60">Coba kata kunci lain atau tampilkan semua kategori.</p>
          <button type="button" onClick={resetFilters} className={`${secondaryButtonClassName} mt-5`}>
            Reset pencarian
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {filtered.map((item) => {
            const publishedTime = new Date(item.publishedAt).getTime();
            const scheduled = !Number.isNaN(publishedTime) && publishedTime > now;

            return (
              <li
                key={item.id}
                className="flex gap-3 rounded-2xl border border-dark/10 bg-white p-3 shadow-sm transition-shadow hover:shadow-md md:flex-col md:gap-0 md:overflow-hidden md:p-0"
              >
                <Thumbnail item={item} />
                <div className="flex min-w-0 flex-1 flex-col md:p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="max-w-full truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {item.category || 'Umum'}
                    </span>
                    {item.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-[#7a5f1c] ring-1 ring-inset ring-gold/40">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                        Unggulan
                      </span>
                    )}
                    {scheduled && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-navy ring-1 ring-inset ring-primary/25">
                        Terjadwal
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 line-clamp-2 break-words font-sans text-[15px] font-semibold leading-snug text-dark md:text-base">
                    {item.title}
                  </h2>
                  <p className="mt-1 truncate text-xs text-dark/55">
                    {scheduled ? 'Terbit ' : ''}
                    {formatDate(item.publishedAt, 'id')}
                    {item.authorName ? ` · ${item.authorName}` : ''}
                  </p>
                  <div className="mt-auto pt-2 md:pt-4">
                    {scheduled ? (
                      <p className="text-xs text-dark/45">Tampil otomatis di website sesuai jadwal.</p>
                    ) : (
                      <a
                        href={`/artikel/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-ml-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                        aria-label={`Lihat artikel “${item.title}” di website (tab baru)`}
                      >
                        Lihat
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
