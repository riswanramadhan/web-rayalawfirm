import {
  buildLlmsHeader,
  dateId,
  importantPages,
  loadLlmsContent,
  oneLine,
  optionalLinks,
  textResponse,
} from '@/lib/seo/llms';
import { absoluteUrl } from '@/lib/seo/schema';

export const revalidate = 3600;

const MAX_ARTICLES = 30;

/** /llms.txt — ringkasan situs untuk sistem AI (https://llmstxt.org). */
export async function GET() {
  const { services, lawyers, articles } = await loadLlmsContent();

  const sections: string[] = [buildLlmsHeader(services)];

  sections.push(
    [
      '## Layanan Hukum',
      '',
      ...services.map(
        (service) => `- [${service.title}](${absoluteUrl(`/layanan/${service.slug}`)}): ${oneLine(service.shortDesc)}`
      ),
    ].join('\n')
  );

  if (lawyers.length) {
    sections.push(
      [
        '## Tim Advokat',
        '',
        ...lawyers.map((lawyer) => {
          const focus = lawyer.specialization ? ` — spesialisasi: ${oneLine(lawyer.specialization)}` : '';
          return `- [${lawyer.name}](${absoluteUrl(`/tim/${lawyer.slug}`)}): ${oneLine(lawyer.position)}${focus}`;
        }),
      ].join('\n')
    );
  }

  if (articles.length) {
    sections.push(
      [
        '## Artikel Hukum',
        '',
        ...articles.slice(0, MAX_ARTICLES).map(
          (article) =>
            `- [${article.title}](${absoluteUrl(`/artikel/${article.slug}`)}): ${oneLine(article.excerpt)} (${article.category}, ${dateId(article.publishedAt)})`
        ),
      ].join('\n')
    );
  }

  sections.push(
    [
      '## Halaman Penting',
      '',
      ...importantPages().map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${oneLine(page.description)}`),
    ].join('\n')
  );

  sections.push(['## Optional', '', ...optionalLinks()].join('\n'));

  return textResponse(sections.join('\n\n'));
}
