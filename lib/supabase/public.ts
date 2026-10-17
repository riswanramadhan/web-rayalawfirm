import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from './env';

/**
 * Client anonim tanpa sesi untuk membaca konten publik. Hanya dipanggil di dalam
 * unstable_cache (lib/content/*). Jangan set fetch `cache: 'no-store'` di sini:
 * itu memicu DynamicServerError saat route statis (sitemap/feed/llms)
 * diregenerasi sehingga diam-diam jatuh ke data statis.
 */
export function createSupabasePublicClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error('Supabase belum dikonfigurasi.');
  }

  return createClient(env.url, env.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
