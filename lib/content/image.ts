/**
 * Pastikan URL gambar dari database bisa dirender next/image (sesuai
 * images.remotePatterns di next.config.js). URL dari host lain diganti
 * placeholder agar halaman publik tidak error.
 */
export function safeImageSrc(src: string | null | undefined, placeholder: string): string {
  const value = src?.trim();
  if (!value) return placeholder;
  if (value.startsWith('/') && !value.startsWith('//')) return value;

  try {
    const { protocol, hostname, pathname } = new URL(value);
    if (protocol !== 'https:') return placeholder;
    if (hostname === 'images.unsplash.com') return value;

    const configured = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseHost = configured ? new URL(configured).hostname : null;
    if (supabaseHost && hostname === supabaseHost && pathname.startsWith('/storage/v1/object/public/')) {
      return value;
    }
  } catch {
    // URL tidak valid
  }

  return placeholder;
}
