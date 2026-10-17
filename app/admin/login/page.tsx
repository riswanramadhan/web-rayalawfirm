import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getSafeAdminPath } from '@/components/admin/shell/paths';
import { ArrowLeftIcon, DatabaseIcon, ShieldIcon, WarningIcon } from '@/components/admin/shell/icons';
import SignOutButton from '@/components/admin/shell/SignOutButton';
import { getAdminContext } from '@/lib/admin/auth';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Masuk',
};

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams?: { next?: string | string[]; error?: string | string[] };
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function LoginFrame({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[46vh] min-h-[280px] bg-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(75,143,187,0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.18),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      <main className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 text-white/80">
          <ShieldIcon className="h-4 w-4 text-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Area khusus admin</span>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white px-5 py-8 shadow-2xl shadow-navy/15 xs:px-7 sm:px-8 sm:py-10">
          <div className="flex justify-center">
            <Image
              src="/images/logo-rayalawfirm-with-title.png"
              alt="Raya Law Firm"
              width={173}
              height={80}
              className="h-16 w-auto object-contain sm:h-[72px]"
              priority
            />
          </div>
          {children}
        </div>

        <nav aria-label="Tautan login" className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-sm font-semibold text-navy transition-colors hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Kembali ke website
          </Link>
          <p className="text-center text-xs text-dark/45">© {year} Raya Law Firm. Hak cipta dilindungi.</p>
        </nav>
      </main>
    </div>
  );
}

function NotConfiguredCard() {
  return (
    <div className="mt-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <DatabaseIcon className="h-6 w-6" />
      </div>
      <h1 className="mt-4 font-sans text-xl font-bold text-dark sm:text-2xl">Supabase belum dikonfigurasi</h1>
      <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-dark/65">
        Dashboard admin membutuhkan koneksi database. Isi variabel lingkungan berikut di <code className="rounded bg-dark/5 px-1 py-0.5 text-[0.85em]">.env.local</code>{' '}
        (lokal) dan di pengaturan hosting, lalu jalankan ulang server.
      </p>
      <ul className="mt-4 space-y-2">
        {['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'].map((name) => (
          <li key={name}>
            <code className="block break-all rounded-xl border border-dark/10 bg-[#f4f7fa] px-3 py-2.5 font-mono text-[13px] font-medium text-navy">
              {name}
            </code>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl bg-gold/10 px-3 py-3 text-sm leading-relaxed text-dark/75">
        Panduan lengkap ada di berkas <strong className="font-semibold text-dark">ADMIN-SETUP.md</strong> pada root proyek.
      </p>
    </div>
  );
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const next = getSafeAdminPath(firstParam(searchParams?.next));

  if (!isSupabaseConfigured()) {
    return (
      <LoginFrame>
        <NotConfiguredCard />
      </LoginFrame>
    );
  }

  const context = await getAdminContext();

  if (context.user && context.isAdmin) {
    redirect(next);
  }

  const forbidden = Boolean(context.user) || firstParam(searchParams?.error) === 'forbidden';

  return (
    <LoginFrame>
      <div className="mt-7 text-center">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-dark">Masuk Dashboard Admin</h1>
        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-dark/60">
          Kelola profil pengacara dan artikel website Raya Law Firm.
        </p>
      </div>

      {forbidden && (
        <div role="alert" className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <WarningIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-amber-900">Akun ini tidak memiliki akses admin</p>
              <p className="mt-1 leading-relaxed text-amber-800/90">
                {context.user?.email ? (
                  <>
                    Anda masuk sebagai <span className="break-all font-medium">{context.user.email}</span>. Keluar, lalu masuk
                    dengan akun admin yang terdaftar.
                  </>
                ) : (
                  'Silakan masuk dengan akun admin yang terdaftar.'
                )}
              </p>
            </div>
          </div>
          {context.user && <SignOutButton className="mt-4" label="Keluar dari akun ini" />}
        </div>
      )}

      <div className="mt-7">
        <LoginForm next={next} />
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-dark/45">
        Lupa kata sandi atau belum punya akun? Hubungi pengelola website.
      </p>
    </LoginFrame>
  );
}
