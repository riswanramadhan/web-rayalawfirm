import Link from 'next/link';
import type { ReactNode } from 'react';

interface ArticlePageHeaderProps {
  title: string;
  description?: ReactNode;
  /** Tampilkan tautan kembali ke daftar artikel. */
  showBack?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
}

export default function ArticlePageHeader({ title, description, showBack, actions, children }: ArticlePageHeaderProps) {
  return (
    <header className="space-y-3">
      {showBack && (
        <Link
          href="/admin/artikel"
          className="-ml-2 hidden min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 lg:inline-flex"
        >
          <span aria-hidden="true">←</span> Artikel
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words font-sans text-2xl font-bold tracking-tight text-dark sm:text-3xl">{title}</h1>
          {description && <div className="mt-1.5 text-sm leading-relaxed text-dark/60">{description}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}
