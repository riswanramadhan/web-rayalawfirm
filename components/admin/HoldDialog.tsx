'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface HoldDialogProps {
  open: boolean;
  onClose: () => void;
  /** Mis. "menambah pengacara", "memperbarui profil", "menerbitkan artikel". */
  actionLabel?: string;
}

const developerName = process.env.NEXT_PUBLIC_DEVELOPER_NAME?.trim() || 'developer';
const developerWhatsApp = (process.env.NEXT_PUBLIC_DEVELOPER_WHATSAPP ?? '').replace(/[^\d]/g, '');
const developerEmail = process.env.NEXT_PUBLIC_DEVELOPER_EMAIL?.trim() ?? '';

function buildContactHref(actionLabel: string): string | null {
  const message = `Halo ${developerName}, saya admin Raya Law Firm. Saya ingin ${actionLabel} di dashboard admin, mohon aktifkan fitur pembaruan data website.`;

  if (developerWhatsApp) {
    return `https://wa.me/${developerWhatsApp}?text=${encodeURIComponent(message)}`;
  }
  if (developerEmail) {
    return `mailto:${developerEmail}?subject=${encodeURIComponent('Aktivasi pembaruan data website Raya Law Firm')}&body=${encodeURIComponent(message)}`;
  }
  return null;
}

/**
 * Dialog MODE HOLD: muncul saat admin mencoba menyimpan sementara developer
 * belum mengaktifkan penulisan data (app_settings.admin_writes_enabled).
 */
export default function HoldDialog({ open, onClose, actionLabel = 'menyimpan perubahan' }: HoldDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !mounted) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      // Jaga fokus keyboard tetap di dalam dialog.
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
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
      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [open, mounted, onClose]);

  if (!open || !mounted) return null;

  const contactHref = buildContactHref(actionLabel);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="hold-dialog-title"
        aria-describedby="hold-dialog-description"
        className="relative w-full max-w-md rounded-t-3xl bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-dark/10 sm:hidden" aria-hidden="true" />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        <h2 id="hold-dialog-title" className="mt-5 font-sans text-xl font-bold text-dark">
          Pembaruan data belum diaktifkan
        </h2>
        <div id="hold-dialog-description" className="mt-3 space-y-3 font-body text-[0.95rem] leading-relaxed text-dark/70">
          <p>
            Dashboard admin ini masih dalam <strong className="text-dark">mode demo</strong>. Perubahan yang Anda
            buat <strong className="text-dark">belum tersimpan</strong> ke website.
          </p>
          <p>
            Untuk dapat {actionLabel}, fitur pembaruan data perlu diaktifkan terlebih dahulu oleh {developerName}.
            Permintaan Anda sudah tercatat dan isian form tetap tersimpan di layar ini.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-dark/15 px-5 text-sm font-semibold text-dark transition-colors hover:bg-dark/5"
          >
            Mengerti
          </button>
          {contactHref && (
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              Hubungi {developerName}
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
