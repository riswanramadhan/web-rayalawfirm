'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { MarkdownHeading } from '@/lib/markdown';
import { ChevronDownIcon, ListIcon } from './icons';
import { getArticleLabels } from './labels';

interface ArticleTocProps {
  headings: MarkdownHeading[];
  locale: Locale;
  /** mobile: <details> yang bisa dibuka-tutup · sidebar: navigasi sticky dengan penanda bagian aktif. */
  variant: 'mobile' | 'sidebar';
  className?: string;
}

/** Minimal jumlah heading agar daftar isi ditampilkan (samakan dengan halaman detail). */
const TOC_MIN_HEADINGS = 3;

function TocList({
  headings,
  activeId,
  onNavigate,
}: {
  headings: MarkdownHeading[];
  activeId?: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ol className="space-y-0.5 border-l border-primary/15">
      {headings.map((heading) => {
        const active = heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onNavigate}
              aria-current={active ? 'location' : undefined}
              className={`-ml-px flex min-h-[40px] items-center border-l-2 py-1.5 pr-2 font-body text-sm leading-snug transition-colors ${
                heading.level >= 3 ? 'pl-7 text-[0.8125rem]' : 'pl-4'
              } ${
                active
                  ? 'border-primary font-semibold text-primary'
                  : 'border-transparent text-dark/70 hover:border-primary/40 hover:text-primary'
              }`}
            >
              <span className="min-w-0 break-words">{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function ArticleToc({ headings, locale, variant, className = '' }: ArticleTocProps) {
  const t = getArticleLabels(locale);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (variant !== 'sidebar' || typeof IntersectionObserver === 'undefined') return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = headings.find((heading) => visible.get(heading.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings, variant]);

  if (headings.length < TOC_MIN_HEADINGS) return null;

  if (variant === 'mobile') {
    return (
      <details
        ref={detailsRef}
        className={`group rounded-2xl border border-primary/10 bg-white shadow-sm ${className}`}
      >
        <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden">
          <ListIcon className="h-5 w-5 shrink-0 text-primary" />
          <span className="font-sans text-sm font-semibold text-dark">{t.toc}</span>
          <span className="font-body text-xs text-dark/50">{t.tocSections(headings.length)}</span>
          <ChevronDownIcon className="ml-auto h-5 w-5 shrink-0 text-dark/50 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label={t.toc} className="border-t border-primary/10 px-4 pb-4 pt-3 sm:px-5">
          <TocList
            headings={headings}
            onNavigate={() => {
              if (detailsRef.current) detailsRef.current.open = false;
            }}
          />
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-labelledby="article_toc_title"
      className={`rounded-2xl border border-primary/10 bg-white p-5 shadow-sm ${className}`}
    >
      <p id="article_toc_title" className="flex items-center gap-2 font-sans text-sm font-semibold text-dark">
        <ListIcon className="h-5 w-5 text-primary" />
        {t.toc}
      </p>
      {/* Sisakan ruang untuk kartu konsultasi di bawahnya (sidebar sticky). */}
      <div className="mt-3 max-h-[max(8rem,calc(100vh_-_29rem))] overflow-y-auto overscroll-contain pr-1">
        <TocList headings={headings} activeId={activeId} />
      </div>
    </nav>
  );
}
