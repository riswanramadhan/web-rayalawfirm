/*
 * Utilitas path area admin — murni TypeScript (aman dipakai di server action,
 * server component, maupun client component).
 */

export const ADMIN_HOME = '/admin';
export const ADMIN_LOGIN = '/admin/login';

/**
 * Tujuan redirect setelah login. Hanya menerima path internal /admin…
 * (mencegah open redirect ke domain lain).
 */
export function getSafeAdminPath(value: unknown): string {
  if (typeof value !== 'string') return ADMIN_HOME;

  const path = value.trim();
  if (!path.startsWith(ADMIN_HOME) || path.startsWith('//') || /[\\\s]/.test(path)) return ADMIN_HOME;

  const rest = path.slice(ADMIN_HOME.length);
  if (rest && !/^[/?#]/.test(rest)) return ADMIN_HOME;
  if (path === ADMIN_LOGIN || path.startsWith(`${ADMIN_LOGIN}?`) || path.startsWith(`${ADMIN_LOGIN}/`)) {
    return ADMIN_HOME;
  }

  return path.slice(0, 512);
}

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/** '/admin' cocok persis; path lain cocok bila sama atau merupakan turunannya. */
export function matchesAdminPath(pathname: string, href: string): boolean {
  const current = normalize(pathname);
  if (href === ADMIN_HOME) return current === ADMIN_HOME;
  return current === href || current.startsWith(`${href}/`);
}

/** Dari sekumpulan href, pilih yang paling spesifik (terpanjang) yang cocok. */
export function pickActiveHref(pathname: string, hrefs: readonly string[]): string | null {
  let best: string | null = null;
  for (const href of hrefs) {
    if (matchesAdminPath(pathname, href) && (!best || href.length > best.length)) best = href;
  }
  return best;
}

/**
 * Halaman form (tambah/edit) tampil "fokus" di mobile: tab bar bawah
 * disembunyikan agar tombol simpan yang menempel di bawah tidak tertutup.
 */
export function isFocusRoute(pathname: string): boolean {
  const segments = normalize(pathname).split('/').filter(Boolean);
  return segments.length >= 3 && (segments[1] === 'pengacara' || segments[1] === 'artikel');
}

/** Tujuan tombol kembali di app bar mobile untuk halaman fokus. */
export function getBackLink(pathname: string): { href: string; label: string } | null {
  if (!isFocusRoute(pathname)) return null;
  const section = normalize(pathname).split('/').filter(Boolean)[1];
  return section === 'pengacara'
    ? { href: '/admin/pengacara', label: 'Kembali ke daftar pengacara' }
    : { href: '/admin/artikel', label: 'Kembali ke daftar artikel' };
}

/** Judul bagian yang tampil di app bar mobile. */
export function getSectionTitle(pathname: string): string {
  const current = normalize(pathname);
  if (current === ADMIN_HOME) return 'Beranda';
  if (current === '/admin/pengacara/baru') return 'Tambah Pengacara';
  if (current.startsWith('/admin/pengacara/')) return 'Edit Pengacara';
  if (current === '/admin/pengacara') return 'Pengacara';
  if (current === '/admin/artikel/baru') return 'Tulis Artikel';
  if (current.startsWith('/admin/artikel')) return 'Artikel';
  return 'Dashboard Admin';
}
