import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from './env';

/**
 * Supabase client yang membawa sesi login admin (cookie). Dipakai di server
 * component, server action, dan route handler area admin.
 */
export function createSupabaseServerClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error('Supabase belum dikonfigurasi (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).');
  }

  const cookieStore = cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Dipanggil dari Server Component: cookie tidak bisa ditulis di sini.
          // Middleware yang akan me-refresh sesi.
        }
      },
    },
  });
}
