import { z, type ZodError } from 'zod';

/**
 * Skema validasi form admin — dipakai di client (validasi instan) dan di
 * server action (validasi final sebelum ke database).
 */

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "Muh. Alif, S.H." → "muh-alif-sh" */
export function slugify(value: string, maxLength = 80): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/&/g, ' dan ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '');
}

/** "0813-3566 3379" / "+62 813..." → "6281335663379". Kosong tetap kosong. */
export function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d]/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

const trimmed = (max: number) => z.string().trim().max(max, `Maksimal ${max} karakter`);

const optionalText = (max: number) => trimmed(max).default('');

const nullableText = (max: number) =>
  trimmed(max)
    .nullish()
    .transform((value) => (value && value.length > 0 ? value : null));

const stringList = (maxItems: number, maxLength: number) =>
  z
    .array(z.string().trim().max(maxLength, `Setiap item maksimal ${maxLength} karakter`))
    .max(maxItems, `Maksimal ${maxItems} item`)
    .default([])
    .transform((items) => items.filter((item) => item.length > 0));

const httpsUrlOrEmpty = trimmed(500)
  .default('')
  .refine((value) => value === '' || /^https:\/\/[^\s]+\.[^\s]+$/i.test(value), {
    message: 'Gunakan URL lengkap yang diawali https://',
  });

const imageUrl = trimmed(1000)
  .default('')
  .refine((value) => value === '' || /^https:\/\/[^\s]+$/i.test(value) || /^\/[^\s]*$/.test(value), {
    message: 'URL gambar tidak valid',
  });

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, 'Slug minimal 2 karakter')
  .regex(SLUG_PATTERN, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung (-)');

// ---------------------------------------------------------------------------
// Pengacara
// ---------------------------------------------------------------------------

export const lawyerInputSchema = z.object({
  slug: slugSchema.max(80, 'Slug maksimal 80 karakter'),
  name: z.string().trim().min(2, 'Nama wajib diisi').max(160, 'Maksimal 160 karakter'),
  position: z.string().trim().min(2, 'Jabatan wajib diisi').max(120, 'Maksimal 120 karakter'),
  specialization: z
    .string()
    .trim()
    .min(2, 'Spesialisasi wajib diisi')
    .max(200, 'Maksimal 200 karakter'),
  bio: optionalText(5000),
  expertise: stringList(20, 120),
  achievements: stringList(25, 250),
  handled_cases: stringList(25, 250),
  education: stringList(10, 250),
  position_en: nullableText(120),
  specialization_en: nullableText(200),
  bio_en: nullableText(5000),
  expertise_en: stringList(20, 120),
  achievements_en: stringList(25, 250),
  handled_cases_en: stringList(25, 250),
  image_url: imageUrl,
  linkedin: httpsUrlOrEmpty,
  instagram: httpsUrlOrEmpty,
  facebook: httpsUrlOrEmpty,
  phone: z
    .string()
    .trim()
    .default('')
    .transform(normalizePhone)
    .refine((value) => value === '' || /^\d{9,15}$/.test(value), {
      message: 'Nomor telepon/WhatsApp tidak valid',
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(160)
    .default('')
    .refine((value) => value === '' || z.string().email().safeParse(value).success, {
      message: 'Format email tidak valid',
    }),
  sort_order: z.coerce
    .number()
    .int('Harus bilangan bulat')
    .min(0, 'Minimal 0')
    .max(9999, 'Maksimal 9999')
    .default(100),
  is_active: z.boolean().default(true),
});

export type LawyerInput = z.input<typeof lawyerInputSchema>;
export type LawyerData = z.output<typeof lawyerInputSchema>;

// ---------------------------------------------------------------------------
// Artikel
// ---------------------------------------------------------------------------

export const faqItemSchema = z.object({
  question: z.string().trim().min(5, 'Pertanyaan minimal 5 karakter').max(300, 'Maksimal 300 karakter'),
  answer: z.string().trim().min(5, 'Jawaban minimal 5 karakter').max(3000, 'Maksimal 3000 karakter'),
});

const faqList = z
  .array(
    z.object({
      question: z.string().trim().max(300, 'Maksimal 300 karakter'),
      answer: z.string().trim().max(3000, 'Maksimal 3000 karakter'),
    })
  )
  .max(20, 'Maksimal 20 FAQ')
  .default([])
  .transform((items) => items.filter((item) => item.question.length > 0 || item.answer.length > 0))
  .pipe(z.array(faqItemSchema));

export const articleInputSchema = z.object({
  slug: slugSchema.max(120, 'Slug maksimal 120 karakter'),
  title: z.string().trim().min(5, 'Judul minimal 5 karakter').max(200, 'Maksimal 200 karakter'),
  excerpt: z
    .string()
    .trim()
    .min(30, 'Ringkasan minimal 30 karakter')
    .max(400, 'Maksimal 400 karakter'),
  content: z
    .string()
    .trim()
    .min(50, 'Isi artikel minimal 50 karakter')
    .max(100000, 'Isi artikel terlalu panjang'),
  category: z.string().trim().min(2, 'Kategori wajib diisi').max(80, 'Maksimal 80 karakter'),
  tags: stringList(15, 60),
  key_points: stringList(10, 300),
  faqs: faqList,
  cover_image_url: imageUrl,
  cover_image_alt: nullableText(200),
  author_lawyer_id: z
    .string()
    .uuid('Penulis tidak valid')
    .nullish()
    .transform((value) => value ?? null),
  author_name: z
    .string()
    .trim()
    .max(120, 'Maksimal 120 karakter')
    .default('')
    .transform((value) => value || 'Tim Redaksi Raya Law Firm'),
  meta_title: nullableText(70),
  meta_description: nullableText(170),
  featured: z.boolean().default(false),
  published_at: z
    .string()
    .trim()
    .nullish()
    .transform((value) => (value ? value : null))
    .refine((value) => value === null || !Number.isNaN(Date.parse(value)), {
      message: 'Tanggal terbit tidak valid',
    }),
  title_en: nullableText(200),
  excerpt_en: nullableText(400),
  content_en: nullableText(100000),
  category_en: nullableText(80),
  tags_en: stringList(15, 60),
  key_points_en: stringList(10, 300),
  faqs_en: faqList,
  meta_title_en: nullableText(70),
  meta_description_en: nullableText(170),
});

export type ArticleInput = z.input<typeof articleInputSchema>;
export type ArticleData = z.output<typeof articleInputSchema>;

// ---------------------------------------------------------------------------

/** Ubah ZodError menjadi { "field.path": "pesan pertama" }. */
export function toFieldErrors(error: ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_form';
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
