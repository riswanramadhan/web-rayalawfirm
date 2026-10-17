import type { Metadata } from 'next';
import Link from 'next/link';
import SuccessToast from '@/components/admin/Toast';
import ArticleList, { type AdminArticleListItem } from '@/components/admin/articles/ArticleList';
import ArticlePageHeader from '@/components/admin/articles/ArticlePageHeader';
import { primaryButtonClassName } from '@/components/admin/form-classes';
import { requireAdmin } from '@/lib/admin/auth';
import { isArticlesTableMissing, listArticlesForAdmin } from '@/lib/admin/queries/articles';

export const metadata: Metadata = { title: 'Artikel' };
export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const { supabase } = await requireAdmin();
  const { rows, error } = await listArticlesForAdmin(supabase);
  const now = Date.now();

  const items: AdminArticleListItem[] = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    publishedAt: row.published_at,
    featured: row.featured,
    authorName: row.author_name,
    coverUrl: row.cover_image_url,
  }));

  const scheduledCount = items.filter((item) => new Date(item.publishedAt).getTime() > now).length;

  return (
    <div className="space-y-6">
      <SuccessToast message="Artikel berhasil diterbitkan." />

      <ArticlePageHeader
        title="Artikel"
        description={
          error ? (
            'Artikel hukum yang tampil di halaman Artikel website.'
          ) : (
            <span className="tabular-nums">
              {items.length} artikel
              {scheduledCount > 0 ? ` · ${scheduledCount} terjadwal` : ''}
            </span>
          )
        }
        actions={
          <Link href="/admin/artikel/baru" className={`${primaryButtonClassName} w-full sm:w-auto`}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Tulis Artikel
          </Link>
        }
      >
        <p className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-dark/75">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Artikel yang sudah terbit tidak dapat diubah atau dihapus dari dashboard. Gunakan pratinjau sebelum menerbitkan.
          </span>
        </p>
      </ArticlePageHeader>

      {error ? (
        isArticlesTableMissing(error) ? (
          <div role="status" className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-dark/80">
            <h2 className="font-sans text-base font-semibold text-dark">Database belum disiapkan</h2>
            <p className="mt-1">
              Tabel <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">articles</code> belum ditemukan. Jalankan
              migration{' '}
              <code className="break-all rounded bg-white/70 px-1.5 py-0.5 text-xs">
                supabase/migrations/20261017000000_init.sql
              </code>{' '}
              di Supabase (lihat panduan <strong>ADMIN-SETUP.md</strong>), lalu muat ulang halaman ini.
            </p>
          </div>
        ) : (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
            <h2 className="font-sans text-base font-semibold">Gagal memuat daftar artikel</h2>
            <p className="mt-1">
              Periksa koneksi internet Anda lalu muat ulang halaman. Jika masalah berlanjut, hubungi developer.
            </p>
          </div>
        )
      ) : (
        <ArticleList items={items} now={now} />
      )}
    </div>
  );
}
