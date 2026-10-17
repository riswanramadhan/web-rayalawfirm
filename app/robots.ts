import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

/**
 * Mesin pencari & crawler AI diizinkan eksplisit. Setiap crawler hanya
 * mematuhi grup paling spesifik yang cocok dengannya, jadi setiap grup wajib
 * mengulang larangan /admin.
 */
const NAMED_CRAWLERS = [
  // Mesin pencari
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Applebot',
  'DuckAssistBot',
  // AI search / asisten / training
  'Applebot-Extended',
  'Google-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
];

const PRIVATE_PATHS = ['/admin', '/admin/', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      ...NAMED_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PRIVATE_PATHS,
      })),
    ],
    // Google & Bing juga menerima feed RSS sebagai sitemap (artikel baru lebih cepat ditemukan).
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}${siteConfig.feedPath}`],
    host: siteConfig.url,
  };
}
