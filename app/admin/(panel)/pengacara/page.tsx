import type { Metadata } from 'next';
import Link from 'next/link';
import SuccessToast from '@/components/admin/Toast';
import { primaryButtonClassName } from '@/components/admin/form-classes';
import LawyerList, { type AdminLawyerListItem } from '@/components/admin/lawyers/LawyerList';
import LawyerPageHeader from '@/components/admin/lawyers/LawyerPageHeader';
import { requireAdmin } from '@/lib/admin/auth';
import { isMissingTableError, listLawyersForAdmin } from '@/lib/admin/queries/lawyers';

export const metadata: Metadata = { title: 'Pengacara' };
export const dynamic = 'force-dynamic';

export default async function AdminLawyersPage() {
  const { supabase } = await requireAdmin();
  const { rows, error } = await listLawyersForAdmin(supabase);

  const items: AdminLawyerListItem[] = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    position: row.position,
    specialization: row.specialization,
    imageUrl: row.image_url ?? '',
    isActive: row.is_active,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  }));

  const activeCount = items.filter((item) => item.isActive).length;
  const hiddenCount = items.length - activeCount;

  return (
    <div className="space-y-6">
      <SuccessToast message="Data pengacara berhasil disimpan." />

      <LawyerPageHeader
        title="Pengacara"
        description={
          error ? (
            'Profil tim yang tampil di halaman Tim website.'
          ) : (
            <span className="tabular-nums">
              {activeCount} aktif · {hiddenCount} disembunyikan
            </span>
          )
        }
        actions={
          <Link href="/admin/pengacara/baru" className={`${primaryButtonClassName} w-full sm:w-auto`}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Tambah Pengacara
          </Link>
        }
      />

      {error ? (
        isMissingTableError(error) ? (
          <div role="status" className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-dark/80">
            <h2 className="font-sans text-base font-semibold text-dark">Database belum disiapkan</h2>
            <p className="mt-1">
              Tabel <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">lawyers</code> belum ditemukan. Jalankan
              migration <code className="break-all rounded bg-white/70 px-1.5 py-0.5 text-xs">supabase/migrations/20261017000000_init.sql</code>{' '}
              di Supabase (lihat panduan <strong>ADMIN-SETUP.md</strong>), lalu muat ulang halaman ini.
            </p>
          </div>
        ) : (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
            <h2 className="font-sans text-base font-semibold">Gagal memuat data pengacara</h2>
            <p className="mt-1">Periksa koneksi internet Anda lalu muat ulang halaman. Jika masalah berlanjut, hubungi developer.</p>
          </div>
        )
      ) : (
        <LawyerList items={items} />
      )}
    </div>
  );
}
