import type { ReactNode } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const { user } = await requireAdmin();

  return <AdminShell email={user.email ?? ''}>{children}</AdminShell>;
}
