'use client';

import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { inputClassName, primaryButtonClassName, secondaryButtonClassName } from '@/components/admin/form';
import { formatDate } from '@/lib/content/format';
import { ExternalIcon, LawyerAvatar, PencilIcon, StatusBadge } from './shared';

export interface AdminLawyerListItem {
  id: string;
  slug: string;
  name: string;
  position: string;
  specialization: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
  updatedAt: string;
}

type StatusFilter = 'all' | 'active' | 'hidden';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'hidden', label: 'Disembunyikan' },
];

const normalize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();

export default function LawyerList({ items }: { items: AdminLawyerListItem[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const active = items.filter((item) => item.isActive).length;
    return { all: items.length, active, hidden: items.length - active };
  }, [items]);

  const filtered = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      if (status === 'active' && !item.isActive) return false;
      if (status === 'hidden' && item.isActive) return false;
      if (terms.length === 0) return true;
      const haystack = normalize(`${item.name} ${item.position} ${item.specialization} ${item.slug}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [items, deferredQuery, status]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-dark/15 bg-white px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        </span>
        <h2 className="mt-4 font-sans text-lg font-semibold text-dark">Belum ada data pengacara</h2>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-dark/60">
          Tambahkan profil pengacara pertama agar tampil di halaman Tim website.
        </p>
        <Link href="/admin/pengacara/baru" className={`${primaryButtonClassName} mt-6 w-full sm:w-auto`}>
          Tambah Pengacara
        </Link>
      </div>
    );
  }

  const resetFilters = () => {
    setQuery('');
    setStatus('all');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-dark/10 bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-3 sm:space-y-0 sm:p-4">
        <div className="relative sm:flex-1">
          <label htmlFor="lawyer-search" className="sr-only">
            Cari pengacara
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
            id="lawyer-search"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama, jabatan, atau spesialisasi"
            className={`${inputClassName} min-h-[48px] pl-11`}
          />
        </div>

        <div role="group" aria-label="Filter status tampil" className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const selected = status === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setStatus(filter.value)}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 ${
                  selected
                    ? 'border-navy bg-navy text-white'
                    : 'border-dark/15 bg-white text-dark/70 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {filter.label}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${selected ? 'bg-white/20' : 'bg-dark/5'}`}
                >
                  {counts[filter.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-dark/50" aria-live="polite">
        Menampilkan {filtered.length} dari {items.length} pengacara
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-dark/15 bg-white px-6 py-10 text-center">
          <p className="font-sans text-base font-semibold text-dark">Tidak ada pengacara yang cocok</p>
          <p className="mt-1 text-sm text-dark/60">Coba kata kunci lain atau tampilkan semua status.</p>
          <button type="button" onClick={resetFilters} className={`${secondaryButtonClassName} mt-5`}>
            Reset pencarian
          </button>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <li
              key={item.id}
              className={`flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 ${
                item.isActive ? 'border-dark/10' : 'border-dashed border-dark/15'
              }`}
            >
              <div className="flex items-start gap-3">
                <LawyerAvatar
                  name={item.name}
                  imageUrl={item.imageUrl}
                  className={item.isActive ? '' : 'opacity-60 grayscale'}
                />
                <div className="min-w-0 flex-1">
                  <h2 className="break-words font-sans text-base font-semibold leading-snug text-dark">{item.name}</h2>
                  <p className="mt-0.5 break-words text-sm font-medium text-primary">{item.position || '—'}</p>
                  <p className="mt-1 line-clamp-1 break-words text-xs text-dark/55">
                    {item.specialization || 'Spesialisasi belum diisi'}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <StatusBadge active={item.isActive} />
                <span className="text-xs font-medium tabular-nums text-dark/50">Urutan #{item.sortOrder}</span>
                {item.updatedAt && (
                  <span className="text-xs text-dark/40">Diperbarui {formatDate(item.updatedAt, 'id')}</span>
                )}
              </div>

              <div className="mt-4 flex gap-2 border-t border-dark/5 pt-4">
                <Link
                  href={`/admin/pengacara/${item.id}`}
                  className={`${secondaryButtonClassName} flex-1 px-4`}
                  aria-label={`Edit ${item.name}`}
                >
                  <PencilIcon />
                  Edit
                </Link>
                {item.isActive && (
                  <a
                    href={`/tim/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                    aria-label={`Lihat profil ${item.name} di website (tab baru)`}
                  >
                    Lihat profil
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
