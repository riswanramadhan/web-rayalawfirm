'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  locale: Locale;
}

export default function SocialShareButtons({
  title,
  url,
  locale,
}: SocialShareButtonsProps) {
  const t = getDictionary(locale).articleDetail;
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast(t.copySuccess);
    } catch {
      showToast(t.copyError);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          LinkedIn
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          {t.copyLink}
        </button>
      </div>

      {toast && (
        <div className="absolute left-0 top-full mt-3 rounded-xl bg-dark px-4 py-2 text-xs text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
