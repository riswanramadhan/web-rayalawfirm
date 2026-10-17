import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LawyerForm from '@/components/admin/lawyers/LawyerForm';
import LawyerPageHeader from '@/components/admin/lawyers/LawyerPageHeader';
import { ExternalIcon, LawyerAvatar, StatusBadge } from '@/components/admin/lawyers/shared';
import { requireAdmin } from '@/lib/admin/auth';
import { getLawyerForAdmin } from '@/lib/admin/queries/lawyers';
import { formatDate } from '@/lib/content/format';

export const metadata: Metadata = { title: 'Edit Pengacara' };
export const dynamic = 'force-dynamic';

interface EditLawyerPageProps {
  params: { id: string };
}

export default async function EditLawyerPage({ params }: EditLawyerPageProps) {
  const { supabase } = await requireAdmin();
  const lawyer = await getLawyerForAdmin(supabase, params.id);

  if (!lawyer) notFound();

  return (
    <div className="space-y-6">
      <LawyerPageHeader
        showBack
        title="Edit Pengacara"
        description="Perbarui profil, atur urutan, atau sembunyikan dari website."
      >
        <div className="flex items-center gap-3 rounded-2xl border border-dark/10 bg-white p-3 shadow-sm sm:p-4">
          <LawyerAvatar name={lawyer.name} imageUrl={lawyer.image_url ?? ''} size={48} />
          <div className="min-w-0 flex-1">
            <p className="break-words font-sans text-sm font-semibold text-dark sm:text-base">{lawyer.name}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <StatusBadge active={lawyer.is_active} />
              {lawyer.updated_at && (
                <span className="text-xs text-dark/45">Diperbarui {formatDate(lawyer.updated_at, 'id')}</span>
              )}
            </div>
          </div>
          {lawyer.is_active && (
            <a
              href={`/tim/${lawyer.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
              aria-label={`Lihat profil ${lawyer.name} di website (tab baru)`}
            >
              <span className="hidden sm:inline">Lihat profil</span>
              <ExternalIcon />
            </a>
          )}
        </div>
      </LawyerPageHeader>

      <LawyerForm mode="edit" lawyer={lawyer} />
    </div>
  );
}
