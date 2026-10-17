'use client';

import { useFormStatus } from 'react-dom';
import { Spinner } from '@/components/admin/form';
import { signOut } from '@/lib/admin/actions/auth';
import { LogoutIcon } from './icons';

const variants = {
  sidebar:
    'flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:opacity-60',
  menu:
    'flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:opacity-60',
  button:
    'inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-dark/15 bg-white px-5 text-sm font-semibold text-dark transition-colors hover:bg-dark/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-60',
} as const;

function SubmitInner({ variant, label }: { variant: keyof typeof variants; label: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={variants[variant]}>
      {pending ? <Spinner className="h-5 w-5" /> : <LogoutIcon className="h-5 w-5 shrink-0" />}
      <span>{pending ? 'Keluar…' : label}</span>
    </button>
  );
}

/** Tombol keluar (form + server action signOut) dengan status loading. */
export default function SignOutButton({
  variant = 'button',
  label = 'Keluar',
  className,
}: {
  variant?: keyof typeof variants;
  label?: string;
  className?: string;
}) {
  return (
    <form action={signOut} className={className}>
      <SubmitInner variant={variant} label={label} />
    </form>
  );
}
