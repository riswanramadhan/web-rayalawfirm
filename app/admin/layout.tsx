import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Admin',
    template: '%s · Admin Raya Law Firm',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/*
 * Penyesuaian gaya global khusus area admin (hanya aktif selama layout ini
 * ter-mount):
 *  - globals.css menyembunyikan kursor di desktop untuk CustomCursor situs
 *    publik; admin tidak memakai CustomCursor, jadi kursor dikembalikan.
 *  - body { overflow-x: hidden } membuat position: sticky tidak berfungsi;
 *    pemotongan horizontal tetap ditangani oleh <html>.
 */
const adminGlobalStyles = `
html body { overflow-x: visible; overflow-x: clip; -webkit-tap-highlight-color: transparent; }
@media (min-width: 1024px) {
  html * { cursor: auto !important; }
  html a[href], html button:not(:disabled), html summary, html select, html label[for],
  html [role="button"], html [role="switch"], html [role="tab"], html input[type="checkbox"],
  html input[type="radio"], html input[type="file"], html .cursor-pointer { cursor: pointer !important; }
  html input:not([type="checkbox"]):not([type="radio"]):not([type="file"]):not(:disabled),
  html textarea:not(:disabled), html .cursor-text { cursor: text !important; }
  html .cursor-default { cursor: default !important; }
  html .cursor-move { cursor: move !important; }
  html .cursor-grab { cursor: grab !important; }
  html .cursor-grabbing { cursor: grabbing !important; }
  html :disabled, html [aria-disabled="true"], html .cursor-not-allowed { cursor: not-allowed !important; }
}
`;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="id" className="min-h-[100dvh] bg-[#f4f7fa] font-sans text-dark antialiased">
      <style dangerouslySetInnerHTML={{ __html: adminGlobalStyles }} />
      {children}
    </div>
  );
}
