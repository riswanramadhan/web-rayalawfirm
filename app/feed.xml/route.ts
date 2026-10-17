import { getArticles } from '@/lib/content/articles';
import type { ArticleEntry } from '@/lib/content/types';
import { siteConfig } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo/schema';

export const revalidate = 3600;

const MAX_ITEMS = 50;

// Karakter kontrol yang tidak sah di XML 1.0.
const INVALID_XML_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

function escapeXml(value: string): string {
  return value
    .replace(INVALID_XML_CHARS, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const IMAGE_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  svg: 'image/svg+xml',
};

function guessImageType(url: string): string {
  const pathname = url.split(/[?#]/)[0] ?? '';
  const extension = pathname.split('.').pop()?.toLowerCase() ?? '';
  return IMAGE_TYPES[extension] ?? 'image/jpeg';
}

const toRfc822 = (iso: string): string => {
  const date = new Date(iso);
  return (Number.isNaN(date.getTime()) ? new Date() : date).toUTCString();
};

function renderItem(article: ArticleEntry): string {
  const link = absoluteUrl(`/artikel/${article.slug}`);
  const image = absoluteUrl(article.image);
  const seen = new Set<string>();
  const categories = [article.category, ...article.tags]
    .map((value) => value?.trim() ?? '')
    .filter((value) => {
      const key = value.toLowerCase();
      if (!value || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return [
    '    <item>',
    `      <title>${escapeXml(article.title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <pubDate>${toRfc822(article.publishedAt)}</pubDate>`,
    `      <description>${escapeXml(article.excerpt)}</description>`,
    ...categories.map((category) => `      <category>${escapeXml(category)}</category>`),
    `      <dc:creator>${escapeXml(article.author.name)}</dc:creator>`,
    `      <enclosure url="${escapeXml(image)}" type="${guessImageType(image)}" length="0" />`,
    '    </item>',
  ].join('\n');
}

/** /feed.xml — RSS 2.0 artikel hukum terbaru (juga dipakai Google/Bing sebagai sitemap). */
export async function GET() {
  const articles = (await getArticles('id').catch((): ArticleEntry[] => [])).slice(0, MAX_ITEMS);
  const feedUrl = absoluteUrl(siteConfig.feedPath);
  const channelLink = absoluteUrl('/artikel');
  const newest = articles.reduce<string | null>(
    (max, article) => (!max || article.updatedAt > max ? article.updatedAt : max),
    null
  );
  const year = new Date(newest ?? Date.now()).getUTCFullYear();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(siteConfig.feedTitle)}</title>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    `    <description>${escapeXml(
      `Artikel dan panduan hukum praktis dari ${siteConfig.name}, kantor hukum di Jakarta: pidana, perdata, bisnis, keluarga, pertanahan, dan ketenagakerjaan.`
    )}</description>`,
    '    <language>id-ID</language>',
    `    <lastBuildDate>${toRfc822(newest ?? new Date().toISOString())}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    <copyright>${escapeXml(`© ${year} ${siteConfig.name}`)}</copyright>`,
    '    <ttl>60</ttl>',
    '    <image>',
    `      <url>${escapeXml(absoluteUrl(siteConfig.logo))}</url>`,
    `      <title>${escapeXml(siteConfig.feedTitle)}</title>`,
    `      <link>${escapeXml(channelLink)}</link>`,
    '    </image>',
    ...articles.map(renderItem),
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(`${xml}\n`, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
