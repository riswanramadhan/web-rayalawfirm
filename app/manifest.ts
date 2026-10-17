import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: 'Raya Law',
    description: siteConfig.description,
    lang: 'id',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f8fbfd',
    theme_color: '#1a2e40',
    categories: ['business', 'legal'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'Konsultasi Hukum', short_name: 'Konsultasi', url: '/konsultasi' },
      { name: 'Layanan Hukum', short_name: 'Layanan', url: '/layanan' },
      { name: 'Artikel Hukum', short_name: 'Artikel', url: '/artikel' },
    ],
  };
}
