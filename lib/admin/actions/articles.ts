'use server';

import { authorizeWrite, mapDatabaseError, revalidateContent } from '@/lib/admin/guard';
import { articleInputSchema, toFieldErrors, type ArticleInput } from '@/lib/admin/schemas';
import type { SaveResult } from '@/lib/admin/types';
import { pingIndexNow } from '@/lib/seo/indexnow';

type ArticleSaveResult = SaveResult<{ id: string; slug: string }>;

const INVALID_MESSAGE = 'Periksa kembali isian yang ditandai.';
const UNEXPECTED_MESSAGE = 'Gagal menerbitkan artikel. Coba lagi beberapa saat.';
const DEFAULT_AUTHOR = 'Tim Redaksi Raya Law Firm';

/**
 * Terbitkan artikel baru. Artikel tidak dapat diubah/dihapus dari dashboard
 * (sesuai cakupan admin & RLS database), jadi hanya ada operasi INSERT.
 */
export async function createArticle(input: ArticleInput): Promise<ArticleSaveResult> {
  const auth = await authorizeWrite();
  if (!auth.ok) return auth.result;

  const parsed = articleInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 'invalid', message: INVALID_MESSAGE, fieldErrors: toFieldErrors(parsed.error) };
  }

  const data = parsed.data;
  const { supabase } = auth.admin;

  try {
    let authorSlug: string | null = null;
    let authorName = data.author_name || DEFAULT_AUTHOR;

    if (data.author_lawyer_id) {
      const { data: lawyer, error: lawyerError } = await supabase
        .from('lawyers')
        .select('id, slug, name')
        .eq('id', data.author_lawyer_id)
        .maybeSingle();

      if (lawyerError) return mapDatabaseError(lawyerError);
      if (!lawyer) {
        return {
          status: 'invalid',
          message: INVALID_MESSAGE,
          fieldErrors: { author_lawyer_id: 'Penulis tidak ditemukan. Pilih ulang penulis.' },
        };
      }

      const author = lawyer as { id: string; slug: string; name: string };
      authorSlug = author.slug;
      authorName = author.name || authorName;
    }

    const publishedAt = data.published_at ? new Date(data.published_at).toISOString() : new Date().toISOString();

    // Kolom ditulis satu per satu (whitelist) — tidak ada kolom lain yang bisa disisipkan.
    const row = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags,
      key_points: data.key_points,
      faqs: data.faqs,
      cover_image_url: data.cover_image_url,
      cover_image_alt: data.cover_image_alt,
      author_lawyer_id: data.author_lawyer_id,
      author_name: authorName,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      featured: data.featured,
      published_at: publishedAt,
      title_en: data.title_en,
      excerpt_en: data.excerpt_en,
      content_en: data.content_en,
      category_en: data.category_en,
      tags_en: data.tags_en,
      key_points_en: data.key_points_en,
      faqs_en: data.faqs_en,
      meta_title_en: data.meta_title_en,
      meta_description_en: data.meta_description_en,
      is_published: true,
    };

    const { data: inserted, error } = await supabase.from('articles').insert(row).select('id, slug').single();

    if (error) return mapDatabaseError(error);

    const saved = inserted as { id: string; slug: string };

    // Data sudah tersimpan: kegagalan refresh cache / ping tidak boleh membuat simpan dianggap gagal.
    try {
      revalidateContent('articles');
    } catch (revalidateError) {
      console.error('[admin] revalidasi cache artikel gagal', revalidateError);
    }

    // Artikel terjadwal belum bisa diakses publik, jadi belum perlu di-ping.
    if (new Date(publishedAt).getTime() <= Date.now() + 60_000) {
      await pingIndexNow([
        `/artikel/${saved.slug}`,
        '/artikel',
        '/',
        ...(authorSlug ? [`/tim/${authorSlug}`] : []),
      ]);
    }

    return {
      status: 'ok',
      data: { id: saved.id, slug: saved.slug },
      message: 'Artikel berhasil diterbitkan.',
    };
  } catch (error) {
    console.error('[admin] createArticle gagal', error);
    return { status: 'error', message: UNEXPECTED_MESSAGE };
  }
}
