import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rayalawfirm.co.id';

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

  const services = [
    'hukum-pidana',
    'hukum-perdata',
    'hukum-bisnis',
    'hukum-keluarga',
    'hukum-properti',
    'hukum-ketenagakerjaan',
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/kebijakan-privasi' ? ('yearly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : route === '/kebijakan-privasi' ? 0.3 : 0.8,
    })),
    ...services.map((slug) => ({
      url: `${baseUrl}/layanan/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
