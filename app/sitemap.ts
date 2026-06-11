import type { MetadataRoute } from 'next';
import { articles } from '@/lib/data/articles';
import { services } from '@/lib/data/services';
import { lawyers } from '@/lib/data/team';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    '',
    '/tentang',
    '/layanan',
    '/tim',
    '/testimoni',
    '/artikel',
    '/konsultasi',
    '/kontak',
    '/kebijakan-privasi',
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '/kebijakan-privasi' ? ('yearly' as const) : ('weekly' as const),
      priority: route === '' ? 1 : route === '/kebijakan-privasi' ? 0.3 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/layanan/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...lawyers.map((lawyer) => ({
      url: `${baseUrl}/tim/${lawyer.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.75 : 0.65,
    })),
  ];
}
