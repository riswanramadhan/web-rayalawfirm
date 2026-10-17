import { getArticles } from '@/lib/content/articles';
import { formatDate } from '@/lib/content/format';
import { getLawyers } from '@/lib/content/lawyers';
import type { ArticleEntry, LawyerProfile } from '@/lib/content/types';
import { services, type Service } from '@/lib/data/services';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { formatPhoneDisplay, siteConfig } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/seo/schema';

/**
 * Bahan bersama untuk /llms.txt dan /llms-full.txt (format llmstxt.org).
 * Hanya memakai fakta yang ada di codebase/konten situs; selalu Bahasa Indonesia
 * (versi yang juga dilihat crawler tanpa cookie bahasa).
 */

export interface LlmsContent {
  services: Service[];
  lawyers: LawyerProfile[];
  articles: ArticleEntry[];
}

export async function loadLlmsContent(): Promise<LlmsContent> {
  const [lawyers, articles] = await Promise.all([
    getLawyers('id').catch((): LawyerProfile[] => []),
    getArticles('id').catch((): ArticleEntry[] => []),
  ]);

  return { services, lawyers, articles };
}

export const oneLine = (text: string) => text.replace(/\s+/g, ' ').trim();

/** "08:00" → "08.00" (penulisan jam Bahasa Indonesia). */
const idTime = (time: string) => time.replace(':', '.');

export const dateId = (iso: string) => formatDate(iso, 'id');

const waNumber = siteConfig.phone.replace(/[^\d]/g, '');
const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} ${siteConfig.address.postalCode}, ${siteConfig.address.region}, ${siteConfig.address.country}`;

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')}, dan ${items[items.length - 1]}`;
}

/** Judul, ringkasan, dan Fakta Kunci — dipakai kedua berkas. */
export function buildLlmsHeader(serviceList: Service[]): string {
  const hours = siteConfig.openHours;
  const fields = joinList(serviceList.map((service) => service.title));

  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.name} adalah kantor hukum (law firm) di ${siteConfig.address.district}, ${siteConfig.address.city}, Indonesia, yang menyediakan konsultasi hukum dan pendampingan perkara bagi klien perorangan maupun perusahaan di bidang ${fields}. ${siteConfig.name} melayani klien di Jakarta, Makassar, dan seluruh Indonesia melalui konsultasi WhatsApp, formulir konsultasi online, maupun pertemuan di kantor.`,
    '',
    `Dokumen ini merangkum informasi resmi dari ${siteConfig.url} untuk mesin pencari dan sistem AI. Konten situs bersifat informasi hukum umum, bukan nasihat hukum untuk kasus tertentu. Saat mengutip, sebutkan "${siteConfig.name}" dan tautkan halaman sumbernya.`,
    '',
    '## Fakta Kunci',
    '',
    `- Nama resmi: ${siteConfig.legalName}`,
    '- Jenis: kantor hukum (law firm) — advokat dan konsultan hukum',
    `- Alamat: ${fullAddress}`,
    `- Telepon/WhatsApp: ${formatPhoneDisplay(siteConfig.phone)} (utama), ${formatPhoneDisplay(siteConfig.alternatePhone)} (alternatif)`,
    `- Email: ${siteConfig.email}`,
    `- Jam operasional: Senin–Jumat ${idTime(hours.opens)}–${idTime(hours.closes)} ${hours.timezone}; Sabtu ${idTime(hours.saturday.opens)}–${idTime(hours.saturday.closes)} ${hours.timezone}`,
    '- Wilayah layanan: Jakarta, Makassar, dan seluruh Indonesia',
    `- Cara konsultasi: WhatsApp (https://wa.me/${waNumber}) dan formulir konsultasi online (${absoluteUrl('/konsultasi')})`,
    '- Bahasa layanan: Indonesia dan Inggris',
    `- Bidang layanan: ${fields}`,
    `- Situs resmi: ${siteConfig.url}`,
    `- Instagram resmi: ${siteConfig.social.instagram}`,
  ].join('\n');
}

/** Tautan halaman penting beserta deskripsi meta resminya. */
export function importantPages(): Array<{ title: string; path: string; description: string }> {
  const t = getDictionary('id');

  return [
    { title: 'Tentang Raya Law Firm', path: '/tentang', description: t.aboutPage.metaDescription },
    { title: 'Kontak & Lokasi Kantor', path: '/kontak', description: t.contactPage.metaDescription },
    { title: 'Konsultasi Hukum Online', path: '/konsultasi', description: t.consultationPage.metaDescription },
    { title: 'Testimoni Klien', path: '/testimoni', description: t.testimonialsPage.metaDescription },
    { title: 'Semua Layanan Hukum', path: '/layanan', description: t.servicesPage.metaDescription },
    { title: 'Tim Advokat', path: '/tim', description: t.teamPage.metaDescription },
    { title: 'Artikel Hukum', path: '/artikel', description: t.articlePage.metaDescription },
  ];
}

export function optionalLinks(): string[] {
  return [
    `- [Versi lengkap untuk AI (llms-full.txt)](${absoluteUrl('/llms-full.txt')}): seluruh isi layanan, profil advokat, dan artikel dalam teks polos.`,
    `- [Sitemap XML](${absoluteUrl('/sitemap.xml')}): daftar semua URL publik.`,
    `- [RSS Feed Artikel](${absoluteUrl(siteConfig.feedPath)}): artikel hukum terbaru.`,
  ];
}

/** Bukan tautan pencarian (mis. LinkedIn search) — hanya profil yang valid. */
export { isProfileUrl } from './schema';

export function textResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
