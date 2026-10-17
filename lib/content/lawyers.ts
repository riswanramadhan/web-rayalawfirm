import { unstable_cache } from 'next/cache';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { createSupabasePublicClient } from '@/lib/supabase/public';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import {
  CONTENT_REVALIDATE_SECONDS,
  CONTENT_TAGS,
  isNextInternalError,
  LAWYER_PLACEHOLDER_IMAGE,
} from './cache';
import { getStaticLawyerRows } from './fallback';
import { safeImageSrc } from './image';
import type { LawyerProfile, LawyerRow } from './types';

export function normalizeLawyerRow(row: LawyerRow): LawyerRow {
  return {
    ...row,
    position: row.position ?? '',
    specialization: row.specialization ?? '',
    bio: row.bio ?? '',
    expertise: row.expertise ?? [],
    expertise_en: row.expertise_en ?? [],
    achievements: row.achievements ?? [],
    achievements_en: row.achievements_en ?? [],
    handled_cases: row.handled_cases ?? [],
    handled_cases_en: row.handled_cases_en ?? [],
    education: row.education ?? [],
  };
}

const fetchActiveLawyerRows = unstable_cache(
  async (): Promise<LawyerRow[]> => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from('lawyers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw new Error(`[content] gagal memuat pengacara: ${error.message}`);
    return ((data ?? []) as LawyerRow[]).map(normalizeLawyerRow);
  },
  ['content:lawyers:active:v1'],
  { tags: [CONTENT_TAGS.lawyers], revalidate: CONTENT_REVALIDATE_SECONDS }
);

/** Baris pengacara aktif (DB bila tersedia, jika tidak data statis). */
export async function loadActiveLawyerRows(): Promise<LawyerRow[]> {
  if (!isSupabaseConfigured()) return getStaticLawyerRows();

  try {
    return await fetchActiveLawyerRows();
  } catch (error) {
    if (isNextInternalError(error)) throw error;
    console.error(error);
    return getStaticLawyerRows();
  }
}

const pickText = (locale: Locale, base: string, en: string | null | undefined) =>
  locale !== defaultLocale && en && en.trim() ? en : base;

const pickList = (locale: Locale, base: string[], en: string[] | null | undefined) =>
  locale !== defaultLocale && en && en.length > 0 ? en : base;

export function toLawyerProfile(row: LawyerRow, locale: Locale = defaultLocale): LawyerProfile {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    position: pickText(locale, row.position, row.position_en),
    specialization: pickText(locale, row.specialization, row.specialization_en),
    bio: pickText(locale, row.bio, row.bio_en),
    expertise: pickList(locale, row.expertise, row.expertise_en),
    achievements: pickList(locale, row.achievements, row.achievements_en),
    handledCases: pickList(locale, row.handled_cases, row.handled_cases_en),
    education: row.education,
    image: safeImageSrc(row.image_url, LAWYER_PLACEHOLDER_IMAGE),
    linkedin: row.linkedin ?? '',
    instagram: row.instagram ?? '',
    facebook: row.facebook ?? '',
    phone: (row.phone ?? '').replace(/[^\d]/g, ''),
    email: row.email ?? '',
    updatedAt: row.updated_at,
  };
}

/** Pengacara aktif, urut sesuai sort_order, sudah dilokalkan. */
export async function getLawyers(locale: Locale = defaultLocale): Promise<LawyerProfile[]> {
  const rows = await loadActiveLawyerRows();
  return rows.map((row) => toLawyerProfile(row, locale));
}

export async function getLawyerBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Promise<LawyerProfile | undefined> {
  const rows = await loadActiveLawyerRows();
  const row = rows.find((item) => item.slug === slug);
  return row ? toLawyerProfile(row, locale) : undefined;
}
