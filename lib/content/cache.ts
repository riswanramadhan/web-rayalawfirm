/** Tag cache Next.js untuk konten dinamis. Dipakai revalidateTag() setelah admin menyimpan. */
export const CONTENT_TAGS = {
  lawyers: 'content:lawyers',
  articles: 'content:articles',
} as const;

/** Konten publik di-refresh paling lambat tiap 5 menit (jaga-jaga bila DB diubah langsung). */
export const CONTENT_REVALIDATE_SECONDS = 300;

export const LAWYER_PLACEHOLDER_IMAGE = '/images/logo-rayalawfirm.png';
export const ARTICLE_PLACEHOLDER_IMAGE = '/images/og-rayalawfirm.jpg';

/**
 * Error internal Next.js (mis. DYNAMIC_SERVER_USAGE, NEXT_NOT_FOUND) harus
 * diteruskan, bukan ditelan menjadi fallback data statis.
 */
export function isNextInternalError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('digest' in error)) return false;
  const digest = (error as { digest: unknown }).digest;
  return typeof digest === 'string' && /^(DYNAMIC_SERVER_USAGE|NEXT_)/.test(digest);
}
