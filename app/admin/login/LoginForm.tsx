'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Field, FormErrorBanner, Spinner, TextInput, primaryButtonClassName } from '@/components/admin/form';
import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@/components/admin/shell/icons';
import { signIn, type SignInState } from '@/lib/admin/actions/auth';

const initialState: SignInState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={`${primaryButtonClassName} w-full text-base`}>
      {pending ? (
        <>
          <Spinner className="h-5 w-5" />
          <span>Memproses…</span>
        </>
      ) : (
        <>
          <span>Masuk</span>
          <ArrowRightIcon className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <FormErrorBanner message={state.error} />

      <Field label="Email" htmlFor="admin-email" error={state.fieldErrors?.email}>
        <TextInput
          id="admin-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          required
          maxLength={254}
          placeholder="nama@rayalawfirm.com"
          defaultValue={state.email ?? ''}
          invalid={Boolean(state.fieldErrors?.email)}
        />
      </Field>

      <Field label="Kata sandi" htmlFor="admin-password" error={state.fieldErrors?.password}>
        <div className="relative">
          <TextInput
            id="admin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
            maxLength={128}
            placeholder="Masukkan kata sandi"
            className="pr-14"
            invalid={Boolean(state.fieldErrors?.password)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-pressed={showPassword}
            aria-controls="admin-password"
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            className="absolute inset-y-0 right-1 my-auto flex h-11 w-11 items-center justify-center rounded-lg text-dark/45 transition-colors hover:bg-dark/5 hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </Field>

      <SubmitButton />
    </form>
  );
}
