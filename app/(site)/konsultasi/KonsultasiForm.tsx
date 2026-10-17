'use client';

import Link from 'next/link';
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { buildWhatsAppMessage, buildWhatsAppURL, type KonsultasiForm as KonsultasiFormData } from '@/lib/whatsapp';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

type FieldName = keyof KonsultasiFormData;
type FormErrors = Partial<Record<FieldName, string>>;
type InputEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

const STORY_MAX = 500;
const FIELD_ORDER: FieldName[] = ['nama', 'telepon', 'email', 'ceritakan'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm: KonsultasiFormData = {
  nama: '',
  telepon: '',
  email: '',
  ceritakan: '',
};

interface KonsultasiFormProps {
  locale: Locale;
  /** Prefix id input agar unik bila form dipakai di lebih dari satu tempat. */
  idPrefix?: string;
  /** 'page' = halaman /konsultasi (dengan pemisah & badge), 'card' = versi ringkas (beranda). */
  variant?: 'page' | 'card';
}

const inputClass = (invalid: boolean) =>
  `block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 font-body text-base text-dark outline-none transition placeholder:text-dark/40 focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-primary focus:ring-primary/20'
  }`;

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-dark/50">{children}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export default function KonsultasiForm({ locale, idPrefix = 'konsultasi', variant = 'page' }: KonsultasiFormProps) {
  const t = getDictionary(locale);
  const copy = t.consultationForm;
  const [form, setForm] = useState<KonsultasiFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const id = (field: FieldName) => `${idPrefix}-${field}`;
  const isPage = variant === 'page';

  const handleChange = (field: FieldName) => (event: InputEvent) => {
    let value = event.target.value;

    if (field === 'telepon') value = value.replace(/[^\d+\s-]/g, '');
    if (field === 'ceritakan' && value.length > STORY_MAX) value = value.slice(0, STORY_MAX);

    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSentUrl(null);
  };

  const validate = (data: KonsultasiFormData): FormErrors => {
    const next: FormErrors = {};
    const phoneDigits = data.telepon.replace(/\D/g, '');

    if (!data.nama.trim()) next.nama = copy.errors.name;
    if (!data.telepon.trim()) next.telepon = copy.errors.phone;
    else if (phoneDigits.length < 9 || phoneDigits.length > 15) next.telepon = copy.errors.phoneFormat;
    if (!data.email.trim()) next.email = copy.errors.email;
    else if (!EMAIL_PATTERN.test(data.email.trim())) next.email = copy.errors.emailFormat;
    if (!data.ceritakan.trim()) next.ceritakan = copy.errors.story;

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setShowSummary(true);
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setShowSummary(false);
    const cleaned: KonsultasiFormData = {
      nama: form.nama.trim(),
      telepon: form.telepon.trim(),
      email: form.email.trim(),
      ceritakan: form.ceritakan.trim(),
    };
    const url = buildWhatsAppURL(buildWhatsAppMessage(cleaned, locale));
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const describedBy = (field: FieldName, hint?: boolean) =>
    [hint ? `${id(field)}-hint` : '', errors[field] ? `${id(field)}-error` : ''].filter(Boolean).join(' ') ||
    undefined;

  const label = (field: FieldName, text: string) => (
    <label htmlFor={id(field)} className="block font-sans text-sm font-semibold text-dark">
      {text}
      <span aria-hidden="true" className="ml-0.5 text-red-500">
        *
      </span>
    </label>
  );

  const errorText = (field: FieldName) =>
    errors[field] ? (
      <p id={`${id(field)}-error`} className="flex items-start gap-1.5 text-sm text-red-600">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form className={isPage ? 'space-y-8' : 'space-y-5'} noValidate onSubmit={handleSubmit}>
      {showSummary && Object.values(errors).some(Boolean) ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {copy.errorSummary}
        </p>
      ) : null}

      {isPage ? <Divider>{copy.personalData}</Divider> : null}

      <div className={`grid gap-5 ${isPage ? 'md:grid-cols-2 md:gap-6' : ''}`}>
        <div className="space-y-2">
          {label('nama', copy.fields.name)}
          <input
            ref={(el) => {
              fieldRefs.current.nama = el;
            }}
            id={id('nama')}
            name="nama"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
            maxLength={120}
            placeholder={copy.placeholders.name}
            value={form.nama}
            onChange={handleChange('nama')}
            aria-invalid={errors.nama ? true : undefined}
            aria-describedby={describedBy('nama')}
            className={inputClass(Boolean(errors.nama))}
          />
          {errorText('nama')}
        </div>

        <div className="space-y-2">
          {label('telepon', copy.fields.phone)}
          <input
            ref={(el) => {
              fieldRefs.current.telepon = el;
            }}
            id={id('telepon')}
            name="telepon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            required
            maxLength={20}
            placeholder={copy.placeholders.phone}
            value={form.telepon}
            onChange={handleChange('telepon')}
            aria-invalid={errors.telepon ? true : undefined}
            aria-describedby={describedBy('telepon', true)}
            className={inputClass(Boolean(errors.telepon))}
          />
          <p id={`${id('telepon')}-hint`} className="text-xs text-dark/55">
            {copy.hints.phone}
          </p>
          {errorText('telepon')}
        </div>

        <div className={`space-y-2 ${isPage ? 'md:col-span-2' : ''}`}>
          {label('email', copy.fields.email)}
          <input
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            required
            maxLength={160}
            placeholder={copy.placeholders.email}
            value={form.email}
            onChange={handleChange('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            className={inputClass(Boolean(errors.email))}
          />
          {errorText('email')}
        </div>
      </div>

      {isPage ? <Divider>{copy.caseDetails}</Divider> : null}

      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          {label('ceritakan', copy.fields.story)}
          <span className="flex-shrink-0 text-xs tabular-nums text-dark/50" aria-hidden="true">
            {form.ceritakan.length}/{STORY_MAX}
          </span>
        </div>
        <textarea
          ref={(el) => {
            fieldRefs.current.ceritakan = el;
          }}
          id={id('ceritakan')}
          name="ceritakan"
          rows={isPage ? 6 : 4}
          required
          maxLength={STORY_MAX}
          value={form.ceritakan}
          onChange={handleChange('ceritakan')}
          placeholder={copy.placeholders.story}
          aria-invalid={errors.ceritakan ? true : undefined}
          aria-describedby={describedBy('ceritakan', true)}
          className={`${inputClass(Boolean(errors.ceritakan))} resize-y leading-relaxed`}
        />
        <p id={`${id('ceritakan')}-hint`} className="text-xs text-dark/55">
          {copy.hints.story}
        </p>
        {errorText('ceritakan')}
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-base font-semibold text-dark shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:bg-[#22c55e] hover:shadow-xl hover:shadow-green-500/30 active:scale-[0.99]"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {copy.submit}
        </button>

        <div aria-live="polite">
          {sentUrl ? (
            <div className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-4">
              <p className="font-sans text-sm font-semibold text-dark">{copy.successTitle}</p>
              <p className="mt-1 text-sm text-dark/70">{copy.successDescription}</p>
              <a
                href={sentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#25D366] px-4 text-sm font-semibold text-dark transition-colors hover:bg-[#22c55e]"
              >
                {copy.openWhatsApp}
                <span className="sr-only"> {t.common.opensInNewTab}</span>
              </a>
            </div>
          ) : null}
        </div>

        <p className="text-xs leading-relaxed text-dark/60">
          {copy.privacyPrefix}{' '}
          <Link href="/kebijakan-privasi" className="font-semibold text-primary underline-offset-2 hover:underline">
            {t.common.privacyPolicy}
          </Link>
          .
        </p>

        {isPage ? (
          <ul className="grid gap-3 text-sm text-dark/70 sm:grid-cols-3">
            {[t.common.dataSafe, t.common.noConditions, t.common.fastResponse].map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </form>
  );
}
