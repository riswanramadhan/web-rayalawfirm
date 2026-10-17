'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ADMIN_LOGIN, getSafeAdminPath } from '@/components/admin/shell/paths';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface SignInState {
  error: string | null;
  /** Email terakhir yang dicoba, agar tidak perlu diketik ulang. */
  email?: string;
  fieldErrors?: { email?: string; password?: string };
}

const credentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email wajib diisi.')
    .max(254, 'Email terlalu panjang.')
    .email('Format email tidak valid.'),
  password: z.string().min(1, 'Kata sandi wajib diisi.').max(128, 'Kata sandi terlalu panjang.'),
});

const INVALID_CREDENTIALS = 'Email atau kata sandi salah.';

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

export async function signIn(_prevState: SignInState, formData: FormData): Promise<SignInState> {
  const rawEmail = readField(formData, 'email').trim();
  const parsed = credentialsSchema.safeParse({
    email: rawEmail,
    password: readField(formData, 'password'),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      error: 'Periksa kembali email dan kata sandi Anda.',
      email: rawEmail,
      fieldErrors: { email: flat.email?.[0], password: flat.password?.[0] },
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      error: 'Login belum tersedia: Supabase belum dikonfigurasi. Hubungi developer.',
      email: rawEmail,
    };
  }

  const { email, password } = parsed.data;

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email: email.toLowerCase(), password });

    if (error) {
      if (error.code === 'email_not_confirmed' || /email not confirmed/i.test(error.message)) {
        return {
          error: 'Email ini belum dikonfirmasi. Buka tautan konfirmasi di kotak masuk email Anda terlebih dahulu.',
          email,
        };
      }
      if (error.status === 429 || error.code === 'over_request_rate_limit') {
        return { error: 'Terlalu banyak percobaan masuk. Tunggu beberapa menit, lalu coba lagi.', email };
      }
      return { error: INVALID_CREDENTIALS, email };
    }

    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

    if (adminError) {
      console.error('[admin] is_admin check failed', adminError);
      await supabase.auth.signOut();
      return {
        error: 'Akses admin belum dapat diverifikasi. Pastikan migrasi database sudah dijalankan (lihat ADMIN-SETUP.md).',
        email,
      };
    }

    if (isAdmin !== true) {
      await supabase.auth.signOut();
      return { error: 'Akun ini tidak memiliki akses admin.', email };
    }
  } catch (error) {
    console.error('[admin] sign in failed', error);
    return {
      error: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda, lalu coba lagi.',
      email,
    };
  }

  // redirect() melempar error khusus Next.js, jadi harus di luar try/catch.
  redirect(getSafeAdminPath(formData.get('next')));
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServerClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error('[admin] sign out failed', error);
    }
  }

  redirect(ADMIN_LOGIN);
}
