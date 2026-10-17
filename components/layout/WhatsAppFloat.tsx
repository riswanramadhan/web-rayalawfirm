'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { buildWhatsAppURL, WA_NUMBER } from '@/lib/whatsapp';

const isTextField = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || target.matches('input:not([type="checkbox"]):not([type="radio"]), textarea, select'));

/**
 * Tombol WhatsApp mengambang. Animasi murni CSS (lihat .wa-* di globals.css):
 * tetap tampil walau JavaScript gagal, menghormati prefers-reduced-motion,
 * dan tidak memerlukan framer-motion di setiap halaman.
 */
export default function WhatsAppFloat() {
  const { locale } = useLanguage();
  const t = getDictionary(locale);
  const waLink = buildWhatsAppURL(t.whatsapp.defaultMessage, WA_NUMBER);
  const [fieldFocused, setFieldFocused] = useState(false);

  // Sembunyikan tombol di layar kecil saat pengguna mengetik (keyboard virtual).
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      if (isTextField(event.target)) setFieldFocused(true);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!isTextField(event.relatedTarget)) setFieldFocused(false);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return (
    <div
      className={`fab-safe fixed z-30 transition-opacity duration-200 ${
        fieldFocused ? 'max-lg:pointer-events-none max-lg:opacity-0' : ''
      }`}
    >
      <div className="wa-pop relative">
        <span aria-hidden="true" className="wa-ripple pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" />
        <span
          aria-hidden="true"
          className="wa-ripple wa-ripple-delay pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.common.contactNow} — ${t.common.whatsappFab}`}
          className="wa-float wa-shake relative flex h-14 min-w-[56px] items-center justify-center gap-3 rounded-full bg-[#25D366] px-4 text-white shadow-lg shadow-[#25D366]/40 transition-[box-shadow,transform] duration-300 hover:scale-[1.06] hover:shadow-[0_0_0_8px_rgba(37,211,102,0.18),0_8px_32px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 active:scale-95 md:justify-start md:px-5"
        >
          <span
            aria-hidden="true"
            className="wa-dot absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500"
          />

          <svg aria-hidden="true" className="wa-bob h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          <span className="hidden whitespace-nowrap text-sm font-semibold md:block" aria-hidden="true">
            {t.common.contactNow}
          </span>
        </a>
      </div>
    </div>
  );
}
