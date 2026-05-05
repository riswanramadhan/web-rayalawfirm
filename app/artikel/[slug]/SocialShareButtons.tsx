'use client';

import { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Tautan berhasil disalin.');
    } catch {
      showToast('Gagal menyalin tautan.');
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
          Copy Link
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
