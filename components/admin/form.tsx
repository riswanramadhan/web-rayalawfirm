'use client';

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { inputClassName } from './form-classes';

export { inputClassName, primaryButtonClassName, secondaryButtonClassName } from './form-classes';

/*
 * Komponen form admin — mobile first:
 *  - font input 16px (mencegah auto-zoom iOS)
 *  - tinggi target sentuh ≥ 44px
 *  - label selalu terlihat, pesan error terhubung via aria-describedby
 */


interface FieldProps {
  label: string;
  /** id elemen input; dibuat otomatis bila tidak diisi lewat render-prop. */
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  /** Tampilkan penghitung karakter, mis. { value: 52, max: 60 }. */
  counter?: { value: number; max: number; recommended?: [number, number] };
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, hint, error, required, counter, children, className }: FieldProps) {
  const describedBy = htmlFor ? `${htmlFor}-desc` : undefined;
  let counterTone = 'text-dark/45';
  if (counter) {
    if (counter.value > counter.max) counterTone = 'text-red-600';
    else if (counter.recommended && counter.value >= counter.recommended[0] && counter.value <= counter.recommended[1])
      counterTone = 'text-emerald-600';
  }

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-dark">
          {label}
          {required && <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>}
        </label>
        {counter && (
          <span className={`shrink-0 text-xs tabular-nums ${counterTone}`} aria-live="polite">
            {counter.value}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {(error || hint) && (
        <div id={describedBy} className="mt-1.5 space-y-1">
          {error && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
          {hint && !error && <p className="text-xs leading-relaxed text-dark/55">{hint}</p>}
        </div>
      )}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function TextInput({ className, invalid, id, ...props }, ref) {
    return (
      <input
        ref={ref}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={id ? `${id}-desc` : undefined}
        className={`${inputClassName} min-h-[48px] ${className ?? ''}`}
        {...props}
      />
    );
  }
);

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function TextArea({ className, invalid, id, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-desc` : undefined}
      className={`${inputClassName} leading-relaxed ${className ?? ''}`}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  function Select({ className, invalid, id, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={id ? `${id}-desc` : undefined}
          className={`${inputClassName} min-h-[48px] appearance-none pr-10 ${className ?? ''}`}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark/50"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
);

interface ToggleProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({ id, checked, onChange, label, description, disabled }: ToggleProps) {
  const autoId = useId();
  const toggleId = id ?? autoId;

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-dark/10 bg-white p-4">
      <div>
        <label htmlFor={toggleId} className="text-sm font-semibold text-dark">
          {label}
        </label>
        {description && <p className="mt-1 text-xs leading-relaxed text-dark/55">{description}</p>}
      </div>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:opacity-50 ${
          checked ? 'bg-primary' : 'bg-dark/20'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

interface ListInputProps {
  id?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  /** "chips" untuk tag/keahlian singkat, "list" untuk kalimat panjang. */
  variant?: 'chips' | 'list';
  maxItems?: number;
  invalid?: boolean;
  addLabel?: string;
}

/** Editor daftar teks (tag, keahlian, pencapaian, poin penting, dll). */
export function ListInput({
  id,
  value,
  onChange,
  placeholder = 'Ketik lalu tekan Enter',
  variant = 'list',
  maxItems = 20,
  invalid,
  addLabel = 'Tambah',
}: ListInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [draft, setDraft] = useState('');

  const add = () => {
    const parts = (variant === 'chips' ? draft.split(',') : [draft])
      .map((part) => part.trim())
      .filter(Boolean)
      .filter((part) => !value.includes(part));
    if (!parts.length) {
      setDraft('');
      return;
    }
    onChange([...value, ...parts].slice(0, maxItems));
    setDraft('');
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const updateAt = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  const full = value.length >= maxItems;

  return (
    <div className="space-y-2">
      {value.length > 0 &&
        (variant === 'chips' ? (
          <ul className="flex flex-wrap gap-2">
            {value.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 py-1 pl-3 pr-1 text-sm font-medium text-primary-700"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-primary/15"
                  aria-label={`Hapus ${item}`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="space-y-2">
            {value.map((item, index) => (
              <li key={index} className="flex items-start gap-2 rounded-xl border border-dark/10 bg-offwhite p-2">
                <span className="mt-3 w-6 shrink-0 text-center text-xs font-semibold text-dark/40">{index + 1}</span>
                <textarea
                  value={item}
                  onChange={(event) => updateAt(index, event.target.value)}
                  rows={1}
                  aria-label={`Item ${index + 1}`}
                  className="min-h-[44px] flex-1 resize-y rounded-lg border border-transparent bg-transparent px-2 py-2.5 text-base text-dark outline-none focus:border-primary/40 focus:bg-white"
                />
                <div className="flex shrink-0 flex-col">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-dark/50 hover:bg-dark/5 disabled:opacity-30"
                    aria-label="Naikkan"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.83l-3.71 3.94a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-dark/50 hover:bg-dark/5 disabled:opacity-30"
                    aria-label="Turunkan"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                  aria-label={`Hapus item ${index + 1}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ol>
        ))}

      {!full && (
        <div className="flex gap-2">
          <input
            id={inputId}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                event.preventDefault();
                add();
              }
            }}
            placeholder={placeholder}
            aria-invalid={invalid || undefined}
            aria-describedby={`${inputId}-desc`}
            className={`${inputClassName} min-h-[48px]`}
          />
          <button
            type="button"
            onClick={add}
            disabled={!draft.trim()}
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-primary/10 px-4 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary/20 disabled:opacity-40"
          >
            {addLabel}
          </button>
        </div>
      )}
      {full && <p className="text-xs text-dark/50">Batas maksimal {maxItems} item tercapai.</p>}
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Bagian yang bisa dilipat (mis. terjemahan Inggris). */
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function FormSection({ title, description, children, collapsible, defaultOpen = true }: FormSectionProps) {
  if (collapsible) {
    return (
      <details
        open={defaultOpen}
        className="group rounded-2xl border border-dark/10 bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <span>
            <span className="block font-sans text-base font-semibold text-dark">{title}</span>
            {description && <span className="mt-0.5 block text-xs text-dark/55">{description}</span>}
          </span>
          <svg
            className="h-5 w-5 shrink-0 text-dark/40 transition-transform group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </summary>
        <div className="space-y-5 border-t border-dark/5 px-4 pb-6 pt-5 sm:px-6">{children}</div>
      </details>
    );
  }

  return (
    <section className="rounded-2xl border border-dark/10 bg-white p-4 shadow-sm sm:p-6">
      <header className="mb-5">
        <h2 className="font-sans text-base font-semibold text-dark">{title}</h2>
        {description && <p className="mt-1 text-xs leading-relaxed text-dark/55">{description}</p>}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

interface FormErrorBannerProps {
  message: string | null;
}

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
      <p>{message}</p>
    </div>
  );
}

interface StickyActionBarProps {
  children: ReactNode;
}

/**
 * Bar tombol aksi yang menempel di bawah layar pada mobile (mudah dijangkau
 * jempol) dan statis di desktop.
 */
export function StickyActionBar({ children }: StickyActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 border-t border-dark/10 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:px-6 sm:py-4 sm:shadow-sm">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">{children}</div>
    </div>
  );
}



export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
