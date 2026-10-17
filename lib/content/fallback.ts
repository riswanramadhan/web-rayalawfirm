import { articles as staticArticles } from '@/lib/data/articles';
import { lawyers as staticLawyers } from '@/lib/data/team';
import {
  articleTranslationsEn,
  lawyerTranslationsEn,
} from '@/lib/i18n/localized-data';
import type { ArticleRow, LawyerRow } from './types';

/**
 * Data statis bawaan dalam bentuk baris database. Dipakai saat Supabase belum
 * dikonfigurasi / sedang error, dan sebagai sumber supabase/seed.sql.
 */
const STATIC_TIMESTAMP = '2026-05-01T00:00:00.000Z';

export function getStaticLawyerRows(): LawyerRow[] {
  return staticLawyers.map((lawyer, index) => {
    const en = lawyerTranslationsEn[lawyer.slug];

    return {
      id: `static-lawyer-${lawyer.slug}`,
      slug: lawyer.slug,
      name: lawyer.name,
      position: lawyer.position,
      position_en: en?.position ?? null,
      specialization: lawyer.specialization,
      specialization_en: en?.specialization ?? null,
      bio: '',
      bio_en: null,
      expertise: lawyer.expertise,
      expertise_en: en?.expertise ?? [],
      achievements: lawyer.achievements,
      achievements_en: en?.achievements ?? [],
      handled_cases: lawyer.handledCases,
      handled_cases_en: en?.handledCases ?? [],
      education: [],
      image_url: lawyer.image,
      linkedin: lawyer.linkedin,
      instagram: lawyer.instagram,
      facebook: lawyer.facebook,
      phone: lawyer.phone,
      email: lawyer.email,
      sort_order: (index + 1) * 10,
      is_active: true,
      created_at: STATIC_TIMESTAMP,
      updated_at: STATIC_TIMESTAMP,
    };
  });
}

export function getStaticArticleRows(): ArticleRow[] {
  return staticArticles.map((article) => {
    const en = articleTranslationsEn[article.slug];
    const publishedAt = new Date(`${article.date}T08:00:00+07:00`).toISOString();

    return {
      id: `static-article-${article.slug}`,
      slug: article.slug,
      title: article.title,
      title_en: en?.title ?? null,
      excerpt: article.excerpt,
      excerpt_en: en?.excerpt ?? null,
      content: article.content,
      content_en: en?.content ?? null,
      category: article.category,
      category_en: en?.category ?? null,
      tags: article.tags,
      tags_en: en?.tags ?? [],
      key_points: [],
      key_points_en: [],
      faqs: [],
      faqs_en: [],
      cover_image_url: article.image,
      cover_image_alt: null,
      author_name: 'Tim Redaksi Raya Law Firm',
      author_name_en: 'Raya Law Firm Editorial Team',
      author_lawyer_id: null,
      meta_title: article.metaTitle,
      meta_title_en: en?.metaTitle ?? null,
      meta_description: article.metaDesc,
      meta_description_en: en?.metaDesc ?? null,
      featured: article.featured,
      is_published: true,
      published_at: publishedAt,
      created_at: publishedAt,
      updated_at: publishedAt,
    };
  });
}
