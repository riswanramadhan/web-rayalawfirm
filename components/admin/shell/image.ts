/**
 * true bila src boleh dioptimasi next/image (path lokal, Supabase Storage
 * publik, atau Unsplash — sesuai images.remotePatterns di next.config.js).
 * Selain itu pakai `unoptimized` agar host asing tidak membuat halaman error.
 */
export function canOptimizeImage(src: string): boolean {
  if (src.startsWith('/') && !src.startsWith('//')) return true;

  try {
    const { protocol, hostname, pathname } = new URL(src);
    if (protocol !== 'https:') return false;
    if (hostname === 'images.unsplash.com') return true;
    if (!pathname.startsWith('/storage/v1/object/public/')) return false;
    const configured = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return configured ? new URL(configured).hostname === hostname : false;
  } catch {
    return false;
  }
}

/** Inisial nama untuk avatar cadangan, mis. "Ryan Arya, S.H." -> "RA". */
export function initialsOf(name: string): string {
  const words = name
    .split(',')[0]
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word) && !/\.$/.test(word));
  const letters = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase());
  return letters.join('') || name.trim().charAt(0).toUpperCase() || '?';
}
