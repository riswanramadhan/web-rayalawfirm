'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  FacebookIcon,
  LinkIcon,
  LinkedInIcon,
  ShareIcon,
  WhatsAppIcon,
  XLogoIcon,
} from '@/components/articles/icons';
import { getArticleLabels } from '@/components/articles/labels';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  locale: Locale;
  /** Ringkasan singkat untuk Web Share API (opsional). */
  text?: string;
}

const baseButtonClass =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border px-3 font-sans text-sm font-semibold transition-colors sm:px-4';
const buttonClass = `${baseButtonClass} border-primary/20 bg-white text-primary hover:border-primary/40 hover:bg-primary/10`;
const primaryButtonClass = `${baseButtonClass} border-primary bg-primary text-white hover:bg-primary/90`;

export default function SocialShareButtons({ title, url, locale, text }: SocialShareButtonsProps) {
  const t = getDictionary(locale).articleDetail;
  const labels = getArticleLabels(locale);
  const [toast, setToast] = useState<string | null>(null);
  const [canShare, setCanShare] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast(t.copySuccess);
    } catch {
      showToast(t.copyError);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: text || title, url });
    } catch (error) {
      if ((error as DOMException)?.name !== 'AbortError') {
        await handleCopy();
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const networks: Array<{ name: string; href: string; icon: ReactNode; showLabel?: boolean }> = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />,
      showLabel: true,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon className="h-[18px] w-[18px] shrink-0 text-[#0A66C2]" />,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="h-[18px] w-[18px] shrink-0 text-[#1877F2]" />,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <XLogoIcon className="h-4 w-4 shrink-0 text-dark" />,
    },
  ];

  return (
    <div className="relative">
      <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
        {canShare && (
          <li>
            <button
              type="button"
              onClick={handleNativeShare}
              className={primaryButtonClass}
            >
              <ShareIcon className="h-[18px] w-[18px] shrink-0" />
              <span>{labels.share}</span>
              <span className="sr-only"> — {labels.shareNative}</span>
            </button>
          </li>
        )}
        {networks.map((network) => (
          <li key={network.name}>
            <a
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${labels.shareVia(network.name)} ${labels.opensInNewTab}`}
              className={buttonClass}
            >
              {network.icon}
              <span className={network.showLabel ? 'hidden xs:inline' : 'hidden md:inline'} aria-hidden="true">
                {network.name}
              </span>
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={handleCopy} className={buttonClass} aria-label={t.copyLink}>
            <LinkIcon className="h-[18px] w-[18px] shrink-0" />
            <span className="hidden xs:inline" aria-hidden="true">
              {t.copyLink}
            </span>
          </button>
        </li>
      </ul>

      <p
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute left-0 top-full z-20 mt-3 rounded-xl bg-dark px-4 py-2 font-body text-xs text-white shadow-lg transition-opacity duration-200 ${
          toast ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {toast ?? ''}
      </p>
    </div>
  );
}
