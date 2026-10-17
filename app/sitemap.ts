import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content/articles';
import { getLawyers } from '@/lib/content/lawyers';
import type { ArticleEntry, LawyerProfile } from '@/lib/content/types';
import { services } from '@/lib/data/services';
import { siteConfig } from '@/lib/metadata';

export const revalidate = 3600;

/** Tanggal pembaruan terakhir konten statis (halaman non-dinamis). Perbarui saat kontennya diubah. */
const STATIC_CONTENT_UPDATED_AT = '2026-10-17T00:00:00.000Z';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const toDate = (iso: string | undefined, fallback: string): Date => {
  const date = new Date(iso ?? fallback);
  return Number.isNaN(date.getTime()) ? new Date(fallback) : date;
};

const latest = (dates: Date[], fallback: Date): Date =>
  dates.reduce((max, date) => (date > max ? date : max), fallback);

const url = (path: string) => (path === '/' ? siteConfig.url : `${siteConfig.url}${path}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [lawyers, articles] = await Promise.all([
    getLawyers('id').catch((): LawyerProfile[] => []),
    getArticles('id').catch((): ArticleEntry[] => []),
  ]);

  const staticDate = new Date(STATIC_CONTENT_UPDATED_AT);
  const articleDates = articles.map((article) => toDate(article.updatedAt, STATIC_CONTENT_UPDATED_AT));
  const lawyerDates = lawyers.map((lawyer) => toDate(lawyer.updatedAt, STATIC_CONTENT_UPDATED_AT));
  const newestArticle = latest(articleDates, staticDate);
  const newestLawyer = latest(lawyerDates, staticDate);
  const newestContent = latest([newestArticle, newestLawyer], staticDate);

  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency; lastModified: Date }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: newestContent },
    { path: '/layanan', priority: 0.9, changeFrequency: 'monthly', lastModified: staticDate },
    { path: '/konsultasi', priority: 0.9, changeFrequency: 'monthly', lastModified: staticDate },
    { path: '/tim', priority: 0.8, changeFrequency: 'monthly', lastModified: newestLawyer },
    { path: '/artikel', priority: 0.8, changeFrequency: 'daily', lastModified: newestArticle },
    { path: '/kontak', priority: 0.8, changeFrequency: 'yearly', lastModified: staticDate },
    { path: '/tentang', priority: 0.7, changeFrequency: 'yearly', lastModified: staticDate },
    { path: '/testimoni', priority: 0.6, changeFrequency: 'monthly', lastModified: staticDate },
    { path: '/kebijakan-privasi', priority: 0.2, changeFrequency: 'yearly', lastModified: staticDate },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: url(route.path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: url(`/layanan/${service.slug}`),
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...lawyers.map((lawyer) => ({
      url: url(`/tim/${lawyer.slug}`),
      lastModified: toDate(lawyer.updatedAt, STATIC_CONTENT_UPDATED_AT),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: url(`/artikel/${article.slug}`),
      lastModified: toDate(article.updatedAt, STATIC_CONTENT_UPDATED_AT),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.8 : 0.7,
    })),
  ];
}
