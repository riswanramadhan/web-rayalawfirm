import Image from 'next/image';

/* Potongan UI kecil yang dipakai daftar, form, dan halaman edit pengacara (server & client). */

/** "Muh. Alif Maulana, S.H." → "MM" (gelar setelah koma diabaikan). */
export function getInitials(name: string): string {
  const words = (name.split(',')[0] ?? '')
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);
  if (words.length === 0) return '?';
  const first = words[0].charAt(0);
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
  return `${first}${last}`.toUpperCase();
}

const supabaseOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : null;
  } catch {
    return null;
  }
})();

/** true bila URL boleh dioptimasi next/image (sesuai remotePatterns di next.config.js). */
export function isOptimizableImage(url: string): boolean {
  if (url.startsWith('/') && !url.startsWith('//')) return true;
  if (/^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\//i.test(url)) return true;
  if (url.startsWith('https://images.unsplash.com/')) return true;
  return Boolean(supabaseOrigin && url.startsWith(`${supabaseOrigin}/storage/v1/object/public/`));
}

interface LawyerAvatarProps {
  name: string;
  imageUrl: string;
  /** Ukuran sisi dalam px (default 56). */
  size?: number;
  className?: string;
}

export function LawyerAvatar({ name, imageUrl, size = 56, className = '' }: LawyerAvatarProps) {
  const url = imageUrl.trim();
  const style = { width: size, height: size };

  if (!url) {
    return (
      <span
        style={style}
        className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-primary font-sans text-base font-semibold text-white ${className}`}
        aria-hidden="true"
      >
        {getInitials(name)}
      </span>
    );
  }

  return (
    <Image
      src={url}
      alt={`Foto ${name}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      unoptimized={!isOptimizableImage(url)}
      style={style}
      className={`shrink-0 rounded-xl bg-offwhite object-cover object-top ${className}`}
    />
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      Aktif
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-dark/5 px-2.5 py-1 text-xs font-semibold text-dark/60 ring-1 ring-inset ring-dark/10">
      <span className="h-1.5 w-1.5 rounded-full bg-dark/35" aria-hidden="true" />
      Disembunyikan
    </span>
  );
}

export function ExternalIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function PencilIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
      />
    </svg>
  );
}
