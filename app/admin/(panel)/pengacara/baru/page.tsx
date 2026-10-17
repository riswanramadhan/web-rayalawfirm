import type { Metadata } from 'next';
import LawyerForm from '@/components/admin/lawyers/LawyerForm';
import LawyerPageHeader from '@/components/admin/lawyers/LawyerPageHeader';
import { requireAdmin } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'Tambah Pengacara' };
export const dynamic = 'force-dynamic';

export default async function NewLawyerPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <LawyerPageHeader
        showBack
        title="Tambah Pengacara"
        description="Lengkapi profil agar tampil di halaman Tim website. Isian bertanda * wajib diisi."
      />
      <LawyerForm mode="create" />
    </div>
  );
}
