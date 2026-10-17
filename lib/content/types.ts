/**
 * Tipe data konten dinamis (pengacara & artikel).
 *
 * - `*Row`  : bentuk baris mentah di tabel Supabase (kolom snake_case,
 *             termasuk kolom terjemahan `_en`).
 * - Profile/Entry : bentuk yang sudah dilokalkan & siap dipakai komponen UI.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LawyerRow {
  id: string;
  slug: string;
  name: string;
  position: string;
  position_en: string | null;
  specialization: string;
  specialization_en: string | null;
  bio: string;
  bio_en: string | null;
  expertise: string[];
  expertise_en: string[];
  achievements: string[];
  achievements_en: string[];
  handled_cases: string[];
  handled_cases_en: string[];
  education: string[];
  image_url: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  phone: string;
  email: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  title_en: string | null;
  excerpt: string;
  excerpt_en: string | null;
  content: string;
  content_en: string | null;
  category: string;
  category_en: string | null;
  tags: string[];
  tags_en: string[];
  key_points: string[];
  key_points_en: string[];
  faqs: FaqItem[];
  faqs_en: FaqItem[];
  cover_image_url: string;
  cover_image_alt: string | null;
  author_name: string;
  author_name_en: string | null;
  author_lawyer_id: string | null;
  meta_title: string | null;
  meta_title_en: string | null;
  meta_description: string | null;
  meta_description_en: string | null;
  featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

/** Profil pengacara yang sudah dilokalkan. */
export interface LawyerProfile {
  id: string;
  slug: string;
  name: string;
  position: string;
  specialization: string;
  /** Biografi singkat (boleh kosong). Paragraf dipisah baris kosong. */
  bio: string;
  expertise: string[];
  achievements: string[];
  handledCases: string[];
  education: string[];
  /** Selalu terisi (fallback ke placeholder bila admin belum upload foto). */
  image: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  /** Format internasional tanpa "+", mis. 6281335663379. Boleh kosong. */
  phone: string;
  email: string;
  updatedAt: string;
}

export interface ArticleAuthor {
  name: string;
  /** Slug profil pengacara (/tim/[slug]) jika penulis adalah anggota tim. */
  lawyerSlug: string | null;
  position: string | null;
  image: string | null;
}

/** Artikel yang sudah dilokalkan. */
export interface ArticleEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Konten dalam format Markdown sederhana (lihat lib/markdown.ts). */
  content: string;
  category: string;
  tags: string[];
  /** Poin penting / ringkasan — ditampilkan di atas artikel (bagus untuk AI Overview). */
  keyPoints: string[];
  faqs: FaqItem[];
  /** Selalu terisi (fallback ke gambar OG bila kosong). */
  image: string;
  imageAlt: string;
  author: ArticleAuthor;
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  /** ISO 8601 */
  publishedAt: string;
  /** ISO 8601 */
  updatedAt: string;
  wordCount: number;
  readingMinutes: number;
}
