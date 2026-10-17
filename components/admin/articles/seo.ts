import { countWords, extractHeadings } from '@/lib/markdown';

/* Penilaian SEO artikel (murni, tanpa hooks) — dipakai SeoPanel & dialog konfirmasi. */

export type SeoStatus = 'pass' | 'warn' | 'fail';

export interface SeoCheck {
  id: string;
  label: string;
  status: SeoStatus;
  detail: string;
  tip?: string;
}

export interface SeoInput {
  title: string;
  metaTitle: string;
  excerpt: string;
  metaDescription: string;
  content: string;
  slug: string;
  keyPointCount: number;
  faqCount: number;
  hasCover: boolean;
  coverAlt: string;
  /** Opsional: hasil countWords(content) bila sudah dihitung. */
  wordCount?: number;
}

export interface SeoReport {
  checks: SeoCheck[];
  /** 0–100 */
  score: number;
  tone: 'good' | 'ok' | 'poor';
  label: string;
  wordCount: number;
  h2Count: number;
  effectiveTitle: string;
  effectiveDescription: string;
}

const number = (value: number) => new Intl.NumberFormat('id-ID').format(value);

export function evaluateSeo(input: SeoInput): SeoReport {
  const effectiveTitle = (input.metaTitle.trim() || input.title.trim()).replace(/\s+/g, ' ');
  const effectiveDescription = (input.metaDescription.trim() || input.excerpt.trim()).replace(/\s+/g, ' ');
  const titleLength = effectiveTitle.length;
  const descriptionLength = effectiveDescription.length;
  const wordCount = input.wordCount ?? countWords(input.content);
  const h2Count = extractHeadings(input.content, 2).filter((heading) => heading.level === 2).length;
  const hasInternalLink = input.content.includes('](/');
  const slugLength = input.slug.trim().length;

  const checks: SeoCheck[] = [
    {
      id: 'title',
      label: 'Judul SEO 30–65 karakter',
      status:
        titleLength >= 30 && titleLength <= 65
          ? 'pass'
          : titleLength >= 15 && titleLength <= 90
            ? 'warn'
            : 'fail',
      detail: titleLength ? `${titleLength} karakter` : 'Belum diisi',
      tip:
        titleLength > 65
          ? 'Judul terlalu panjang akan terpotong di Google. Isi "Judul SEO" yang lebih ringkas.'
          : titleLength > 0 && titleLength < 30
            ? 'Tambahkan kata kunci utama agar judul lebih deskriptif.'
            : undefined,
    },
    {
      id: 'description',
      label: 'Deskripsi 120–160 karakter',
      status:
        descriptionLength >= 120 && descriptionLength <= 160
          ? 'pass'
          : descriptionLength >= 70 && descriptionLength <= 200
            ? 'warn'
            : 'fail',
      detail: descriptionLength ? `${descriptionLength} karakter` : 'Belum diisi',
      tip:
        descriptionLength > 160
          ? 'Deskripsi akan terpotong. Isi "Deskripsi SEO" yang lebih singkat.'
          : descriptionLength < 120
            ? 'Perjelas manfaat artikel bagi pembaca dalam 1–2 kalimat.'
            : undefined,
    },
    {
      id: 'words',
      label: 'Isi minimal 800 kata',
      status: wordCount >= 800 ? 'pass' : wordCount >= 300 ? 'warn' : 'fail',
      detail: `${number(wordCount)} kata`,
      tip: wordCount < 800 ? 'Artikel yang lengkap & mendalam lebih dipercaya Google dan pembaca.' : undefined,
    },
    {
      id: 'headings',
      label: 'Minimal 2 subjudul H2',
      status: h2Count >= 2 ? 'pass' : h2Count === 1 ? 'warn' : 'fail',
      detail: `${h2Count} subjudul`,
      tip: h2Count < 2 ? 'Bagi isi menjadi beberapa bagian dengan tombol H2 di toolbar.' : undefined,
    },
    {
      id: 'key-points',
      label: 'Ada Poin Penting',
      status: input.keyPointCount >= 3 ? 'pass' : input.keyPointCount > 0 ? 'warn' : 'fail',
      detail: `${input.keyPointCount} poin`,
      tip: input.keyPointCount < 3 ? 'Disarankan 3–5 poin ringkas.' : undefined,
    },
    {
      id: 'faqs',
      label: 'Minimal 2 FAQ',
      status: input.faqCount >= 2 ? 'pass' : input.faqCount === 1 ? 'warn' : 'fail',
      detail: `${input.faqCount} FAQ`,
      tip: input.faqCount < 2 ? 'FAQ dapat tampil sebagai hasil kaya (rich result) di Google.' : undefined,
    },
    {
      id: 'cover',
      label: 'Ada gambar sampul',
      status: input.hasCover ? 'pass' : 'fail',
      detail: input.hasCover ? 'Sudah dipilih' : 'Belum ada',
      tip: input.hasCover ? undefined : 'Gambar sampul tampil saat artikel dibagikan ke WhatsApp & media sosial.',
    },
    {
      id: 'alt',
      label: 'Ada teks alt gambar',
      status: input.hasCover && input.coverAlt.trim() ? 'pass' : 'warn',
      detail: input.coverAlt.trim() ? 'Sudah diisi' : input.hasCover ? 'Memakai judul' : 'Tanpa gambar',
      tip: input.hasCover && !input.coverAlt.trim() ? 'Jelaskan isi gambar untuk aksesibilitas & Google Images.' : undefined,
    },
    {
      id: 'internal-link',
      label: 'Ada tautan internal',
      status: hasInternalLink ? 'pass' : 'warn',
      detail: hasInternalLink ? 'Ada' : 'Belum ada',
      tip: hasInternalLink
        ? undefined
        : 'Tautkan ke halaman lain di website, mis. [layanan hukum perdata](/layanan/hukum-perdata) atau [konsultasi](/konsultasi).',
    },
    {
      id: 'slug',
      label: 'Slug maksimal 75 karakter',
      status: slugLength === 0 ? 'fail' : slugLength <= 75 ? 'pass' : 'warn',
      detail: slugLength ? `${slugLength} karakter` : 'Belum diisi',
      tip: slugLength > 75 ? 'URL yang pendek lebih mudah dibaca & dibagikan.' : undefined,
    },
  ];

  const points = checks.reduce((total, check) => total + (check.status === 'pass' ? 1 : check.status === 'warn' ? 0.5 : 0), 0);
  const score = Math.round((points / checks.length) * 100);
  const tone = score >= 80 ? 'good' : score >= 60 ? 'ok' : 'poor';
  const label = tone === 'good' ? 'Sangat baik' : tone === 'ok' ? 'Cukup baik' : 'Perlu perbaikan';

  return { checks, score, tone, label, wordCount, h2Count, effectiveTitle, effectiveDescription };
}

export const seoToneClassName: Record<SeoReport['tone'], { text: string; bg: string; ring: string; bar: string }> = {
  good: { text: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-600/20', bar: 'bg-emerald-500' },
  ok: { text: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-600/20', bar: 'bg-amber-500' },
  poor: { text: 'text-red-700', bg: 'bg-red-50', ring: 'ring-red-600/20', bar: 'bg-red-500' },
};
