import type { SupabaseClient, User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type AdminContext =
  | { configured: false; user: null; isAdmin: false; supabase: null }
  | { configured: true; user: null; isAdmin: false; supabase: SupabaseClient }
  | { configured: true; user: User; isAdmin: boolean; supabase: SupabaseClient };

export type AuthorizedAdmin = {
  configured: true;
  user: User;
  isAdmin: true;
  supabase: SupabaseClient;
};

/**
 * Membaca sesi admin dari cookie & memverifikasi ke database (fungsi
 * public.is_admin()). Tidak pernah melempar error.
 */
export async function getAdminContext(): Promise<AdminContext> {
  if (!isSupabaseConfigured()) {
    return { configured: false, user: null, isAdmin: false, supabase: null };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { configured: true, user: null, isAdmin: false, supabase };
  }

  const { data, error } = await supabase.rpc('is_admin');

  return {
    configured: true,
    user,
    isAdmin: !error && data === true,
    supabase,
  };
}

/** Untuk server component area admin: redirect ke login bila bukan admin. */
export async function requireAdmin(): Promise<AuthorizedAdmin> {
  const context = await getAdminContext();

  if (!context.configured || !context.user) {
    redirect('/admin/login');
  }

  if (!context.isAdmin) {
    redirect('/admin/login?error=forbidden');
  }

  return context as AuthorizedAdmin;
}

/** Status saklar HOLD dari database. false = mode hold (penyimpanan dikunci). */
export async function getAdminWritesEnabled(supabase: SupabaseClient): Promise<boolean> {
  const { data, error } = await supabase.rpc('admin_writes_enabled');
  if (error) return false;
  return data === true;
}
