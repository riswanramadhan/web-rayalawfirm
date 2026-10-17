'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { primaryButtonClassName, secondaryButtonClassName } from '@/components/admin/form';
import { SeoScoreBadge, StatusIcon } from './SeoPanel';
import type { SeoReport } from './seo';

export interface PublishSummary {
  title: string;
  slug: string;
  category: string;
  authorName: string;
  /** Label jadwal, mis. "Langsung setelah dikonfirmasi" / "Sabtu, 24 Oktober 2026 pukul 09.00". */
  scheduleLabel: string;
  scheduled: boolean;
  featured: boolean;
  wordCount: number;
  readingMinutes: number;
  hasCover: boolean;
  hasEnglish: boolean;
}

interface PublishConfirmDialogProps {
  open: boolean;
  summary: PublishSummary;
  seo: SeoReport;
  onCancel: () => void;
  onConfirm: () => void;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-dark/45 sm:w-32 sm:shrink-0 sm:pt-0.5">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-dark">{children}</dd>
    </div>
  );
}

/**
 * Konfirmasi terakhir sebelum menerbitkan (artikel tidak bisa diubah setelah
 * terbit). Bottom sheet di HP, modal di desktop.
 */
export default function PublishConfirmDialog({ open, summary, seo, onCancel, onConfirm }: PublishConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [open, onCancel]);

  if (!open || typeof document === 'undefined') return null;

  const problems = seo.checks.filter((check) => check.status === 'fail');
  const words = new Intl.NumberFormat('id-ID').format(summary.wordCount);

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        tabIndex={-1}
        onClick={onCancel}
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="publish-dialog-title"
        aria-describedby="publish-dialog-warning"
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
      >
        <div className="overflow-y-auto overscroll-contain px-5 pb-4 pt-4 sm:px-7 sm:pt-7">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-dark/10 sm:hidden" aria-hidden="true" />
          <h2 id="publish-dialog-title" className="font-sans text-xl font-bold text-dark">
            {summary.scheduled ? 'Jadwalkan artikel ini?' : 'Terbitkan artikel ini?'}
          </h2>
          <p className="mt-1 text-sm text-dark/60">Periksa ringkasan di bawah sebelum melanjutkan.</p>

          <dl className="mt-4 divide-y divide-dark/5 rounded-2xl border border-dark/10 px-4">
            <Row label="Judul">
              <span className="font-semibold">{summary.title}</span>
            </Row>
            <Row label="Alamat URL">
              <span className="break-all text-dark/70">rayalawfirm.com/artikel/{summary.slug}</span>
            </Row>
            <Row label="Kategori">{summary.category}</Row>
            <Row label="Penulis">{summary.authorName}</Row>
            <Row label="Jadwal terbit">
              {summary.scheduled && (
                <span className="mr-2 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-navy">
                  Terjadwal
                </span>
              )}
              {summary.scheduleLabel}
            </Row>
            <Row label="Panjang">
              {words} kata · {summary.readingMinutes} menit baca
            </Row>
            <Row label="Skor SEO">
              <span className="flex flex-wrap items-center gap-2">
                <SeoScoreBadge report={seo} />
                <span className="text-dark/60">{seo.label}</span>
              </span>
            </Row>
            <Row label="Lainnya">
              <span className="block">{summary.hasCover ? 'Dengan gambar sampul' : 'Tanpa gambar sampul (memakai gambar bawaan)'}</span>
              <span className="block">{summary.hasEnglish ? 'Dengan terjemahan Inggris' : 'Tanpa terjemahan Inggris'}</span>
              {summary.featured && <span className="block">Ditandai sebagai artikel unggulan</span>}
            </Row>
          </dl>

          {problems.length > 0 && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                {problems.length} poin SEO belum terpenuhi
              </p>
              <ul className="mt-2 space-y-1.5">
                {problems.slice(0, 4).map((check) => (
                  <li key={check.id} className="flex items-start gap-2 text-sm text-amber-900/80">
                    <StatusIcon status={check.status} className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{check.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            id="publish-dialog-warning"
            className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p>
              <strong className="font-semibold">Artikel tidak dapat diubah setelah terbit.</strong> Pastikan judul, isi, dan
              alamat URL sudah benar — perbaikan setelah terbit hanya bisa dilakukan oleh developer.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-dark/10 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-7 sm:pb-6">
          <button ref={cancelRef} type="button" onClick={onCancel} className={secondaryButtonClassName}>
            Periksa lagi
          </button>
          <button type="button" onClick={onConfirm} className={primaryButtonClassName}>
            Terbitkan
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
