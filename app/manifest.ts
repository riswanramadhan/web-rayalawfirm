import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Raya Law Firm',
    short_name: 'Raya Law',
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#0b1220',
    icons: [
      {
        src: siteConfig.logo,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: siteConfig.logo,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
