import type { Metadata } from 'next';
import ArticleForm from '@/components/admin/articles/ArticleForm';
import ArticlePageHeader from '@/components/admin/articles/ArticlePageHeader';
import { requireAdmin } from '@/lib/admin/auth';
import { listArticleCategories, listArticleSlugs, listAuthorOptions } from '@/lib/admin/queries/articles';

export const metadata: Metadata = { title: 'Tulis Artikel' };
export const dynamic = 'force-dynamic';

export default async function NewArticlePage() {
  const { supabase } = await requireAdmin();

  const [categories, authors, existingSlugs] = await Promise.all([
    listArticleCategories(supabase),
    listAuthorOptions(supabase),
    listArticleSlugs(supabase),
  ]);

  return (
    <div className="space-y-6">
      <ArticlePageHeader
        showBack
        title="Tulis Artikel"
        description="Isian bertanda * wajib diisi. Draf tersimpan otomatis di browser ini — periksa pratinjau & checklist SEO sebelum menerbitkan."
      />
      <ArticleForm categories={categories} authors={authors} existingSlugs={existingSlugs} />
    </div>
  );
}
