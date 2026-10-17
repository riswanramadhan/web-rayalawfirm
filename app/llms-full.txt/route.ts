import type { ArticleEntry, FaqItem, LawyerProfile } from '@/lib/content/types';
import type { Service } from '@/lib/data/services';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { parseMarkdown, stripInline } from '@/lib/markdown';
import { formatPhoneDisplay } from '@/lib/metadata';
import {
  buildLlmsHeader,
  dateId,
  importantPages,
  isProfileUrl,
  loadLlmsContent,
  oneLine,
  optionalLinks,
  textResponse,
} from '@/lib/seo/llms';
import { absoluteUrl } from '@/lib/seo/schema';

export const revalidate = 3600;

const MAX_ARTICLES = 200;

const bulletList = (items: string[]) => items.filter(Boolean).map((item) => `- ${oneLine(item)}`);

/** Gabungkan baris; null = baris opsional yang dilewati. */
const compact = (lines: Array<string | null>) => lines.filter((line): line is string => line !== null);

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => oneLine(paragraph))
    .filter(Boolean);

function faqBlock(faqs: FaqItem[]): string[] {
  if (!faqs.length) return [];
  return [
    '',
    'Pertanyaan umum:',
    ...faqs.flatMap((faq) => ['', `T: ${oneLine(faq.question)}`, `J: ${oneLine(faq.answer)}`]),
  ];
}

/** Markdown artikel → teks polos dengan heading bertingkat di bawah "### Judul artikel". */
function markdownToOutline(source: string): string {
  return parseMarkdown(source)
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `${'#'.repeat(block.level + 2)} ${stripInline(block.text)}`;
        case 'paragraph':
          return stripInline(block.text);
        case 'quote':
          return `> ${stripInline(block.text)}`;
        case 'list':
          return block.items
            .map((item, index) => `${block.ordered ? `${index + 1}.` : '-'} ${stripInline(item)}`)
            .join('\n');
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n\n')
    .trim();
}

function aboutSection(): string {
  const t = getDictionary('id').aboutPage;

  return [
    '## Tentang Raya Law Firm',
    '',
    `URL: ${absoluteUrl('/tentang')}`,
    '',
    oneLine(t.heroDescription),
    '',
    oneLine(t.background),
    '',
    `Visi: ${oneLine(t.visionText)}`,
    '',
    'Misi:',
    ...bulletList(t.missions),
    '',
    'Nilai-nilai:',
    ...t.values.map((value) => `- ${value.title}: ${oneLine(value.description)}`),
  ].join('\n');
}

function serviceSection(service: Service): string {
  return [
    `### ${service.title}`,
    '',
    `URL: ${absoluteUrl(`/layanan/${service.slug}`)}`,
    `Ringkasan: ${oneLine(service.shortDesc)}`,
    '',
    'Cakupan layanan:',
    ...bulletList(service.highlights),
    '',
    'Penjelasan:',
    '',
    paragraphs(service.fullDesc).join('\n\n'),
    '',
    'Proses penanganan:',
    ...service.process.map((step, index) => `${index + 1}. ${oneLine(step.title)} — ${oneLine(step.desc)}`),
    ...faqBlock(service.faq),
  ].join('\n');
}

function lawyerSection(lawyer: LawyerProfile): string {
  const links = [
    isProfileUrl(lawyer.linkedin) ? `LinkedIn: ${lawyer.linkedin}` : '',
    isProfileUrl(lawyer.instagram) ? `Instagram: ${lawyer.instagram}` : '',
    isProfileUrl(lawyer.facebook) ? `Facebook: ${lawyer.facebook}` : '',
  ].filter(Boolean);

  const lines = compact([
    `### ${lawyer.name}`,
    '',
    `- URL profil: ${absoluteUrl(`/tim/${lawyer.slug}`)}`,
    `- Jabatan: ${oneLine(lawyer.position)}`,
    lawyer.specialization ? `- Spesialisasi: ${oneLine(lawyer.specialization)}` : null,
    lawyer.expertise.length ? `- Keahlian: ${lawyer.expertise.map(oneLine).join('; ')}` : null,
    lawyer.handledCases.length ? `- Perkara yang ditangani: ${lawyer.handledCases.map(oneLine).join('; ')}` : null,
    lawyer.achievements.length ? `- Pencapaian & sertifikasi: ${lawyer.achievements.map(oneLine).join('; ')}` : null,
    lawyer.education.length ? `- Pendidikan: ${lawyer.education.map(oneLine).join('; ')}` : null,
    lawyer.email ? `- Email: ${lawyer.email}` : null,
    lawyer.phone ? `- WhatsApp: ${formatPhoneDisplay(lawyer.phone)}` : null,
    ...links.map((link) => `- ${link}`),
  ]);

  const bio = paragraphs(lawyer.bio ?? '');
  if (bio.length) lines.push('', 'Profil:', '', bio.join('\n\n'));

  return lines.join('\n');
}

function articleSection(article: ArticleEntry): string {
  const author = article.author.lawyerSlug
    ? `${article.author.name}${article.author.position ? `, ${article.author.position}` : ''} (${absoluteUrl(`/tim/${article.author.lawyerSlug}`)})`
    : article.author.name;

  const lines = compact([
    `### ${article.title}`,
    '',
    `- URL: ${absoluteUrl(`/artikel/${article.slug}`)}`,
    `- Kategori: ${article.category}`,
    article.tags.length ? `- Tag: ${article.tags.join(', ')}` : null,
    `- Penulis: ${author}`,
    `- Diterbitkan: ${dateId(article.publishedAt)}`,
    article.updatedAt !== article.publishedAt ? `- Diperbarui: ${dateId(article.updatedAt)}` : null,
    `- Waktu baca: ${article.readingMinutes} menit`,
    '',
    `Ringkasan: ${oneLine(article.excerpt)}`,
  ]);

  if (article.keyPoints.length) lines.push('', 'Poin penting:', ...bulletList(article.keyPoints));

  const body = markdownToOutline(article.content);
  if (body) lines.push('', 'Isi artikel:', '', body);

  lines.push(...faqBlock(article.faqs));

  return lines.join('\n');
}

/** /llms-full.txt — seluruh pengetahuan situs dalam teks polos untuk sistem AI. */
export async function GET() {
  const { services, lawyers, articles } = await loadLlmsContent();

  const sections: string[] = [buildLlmsHeader(services), aboutSection()];

  sections.push(['## Layanan Hukum', '', services.map(serviceSection).join('\n\n')].join('\n'));

  if (lawyers.length) {
    sections.push(['## Tim Advokat', '', lawyers.map(lawyerSection).join('\n\n')].join('\n'));
  }

  if (articles.length) {
    sections.push(
      ['## Artikel Hukum', '', articles.slice(0, MAX_ARTICLES).map(articleSection).join('\n\n')].join('\n')
    );
  }

  sections.push(
    [
      '## Halaman Penting',
      '',
      ...importantPages().map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${oneLine(page.description)}`),
    ].join('\n')
  );

  sections.push(['## Optional', '', ...optionalLinks().slice(1)].join('\n'));

  return textResponse(sections.join('\n\n'));
}
