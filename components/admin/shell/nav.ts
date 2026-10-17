import type { ComponentType } from 'react';
import {
  DocumentIcon,
  HomeIcon,
  PencilSquareIcon,
  UserPlusIcon,
  UsersIcon,
  type IconProps,
} from './icons';

export interface AdminNavItem {
  href: string;
  label: string;
  /** Label pendek untuk tab bar mobile. */
  shortLabel?: string;
  description?: string;
  icon: ComponentType<IconProps>;
}

/** Menu utama (sidebar desktop & tab bar mobile). */
export const ADMIN_MAIN_NAV: readonly AdminNavItem[] = [
  { href: '/admin', label: 'Beranda', icon: HomeIcon },
  { href: '/admin/pengacara', label: 'Pengacara', icon: UsersIcon },
  { href: '/admin/artikel', label: 'Artikel', icon: DocumentIcon },
];

/** Aksi cepat di sidebar desktop. */
export const ADMIN_QUICK_NAV: readonly AdminNavItem[] = [
  { href: '/admin/pengacara/baru', label: 'Tambah Pengacara', icon: UserPlusIcon },
  { href: '/admin/artikel/baru', label: 'Tulis Artikel', shortLabel: 'Tulis', icon: PencilSquareIcon },
];

export const ADMIN_WRITE_ITEM = ADMIN_QUICK_NAV[1];

export const ADMIN_NAV_HREFS: readonly string[] = [...ADMIN_MAIN_NAV, ...ADMIN_QUICK_NAV].map((item) => item.href);
