'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

type FieldName = 'nama' | 'nomor' | 'email' | 'pesan';
type FormState = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ['nama', 'nomor', 'email', 'pesan'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialForm: FormState = { nama: '', nomor: '', email: '', pesan: '' };

interface KontakFormProps {
  locale: Locale;
  email: string;
}

const inputClass = (invalid: boolean) =>
  `block min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 font-body text-base text-dark outline-none transition placeholder:text-dark/40 focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-primary focus:ring-primary/20'
  }`;

/**
 * Form kontak yang membuka aplikasi email dengan pesan terisi. Tanpa
 * JavaScript, form tetap berfungsi lewat action mailto bawaan browser.
 */
export default function KontakForm({ locale, email }: KontakFormProps) {
  const t = getDictionary(locale);
  const copy = t.contactPage;
  const errorsCopy = t.consultationForm.errors;
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const refs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const id = (field: FieldName) => `kontak-${field}`;

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      let value = event.target.value;
      if (field === 'nomor') value = value.replace(/[^\d+\s-]/g, '');
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const digits = form.nomor.replace(/\D/g, '');
    if (!form.nama.trim()) next.nama = errorsCopy.name;
    if (!form.nomor.trim()) next.nomor = errorsCopy.phone;
    else if (digits.length < 9 || digits.length > 15) next.nomor = errorsCopy.phoneFormat;
    if (!form.email.trim()) next.email = errorsCopy.email;
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = errorsCopy.emailFormat;
    if (!form.pesan.trim()) next.pesan = errorsCopy.story;
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }

    const body = [
      `${copy.fields.name}: ${form.nama.trim()}`,
      `${copy.fields.phone}: ${form.nomor.trim()}`,
      `${copy.fields.email}: ${form.email.trim()}`,
      '',
      form.pesan.trim(),
    ].join('\n');

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(body)}`;
  };

  const fields: {
    name: FieldName;
    label: string;
    placeholder: string;
    type?: 'text' | 'tel' | 'email';
    inputMode?: 'text' | 'tel' | 'email';
    autoComplete: string;
    multiline?: boolean;
  }[] = [
    { name: 'nama', label: copy.fields.name, placeholder: copy.placeholders.name, type: 'text', autoComplete: 'name' },
    {
      name: 'nomor',
      label: copy.fields.phone,
      placeholder: copy.placeholders.phone,
      type: 'tel',
      inputMode: 'tel',
      autoComplete: 'tel',
    },
    {
      name: 'email',
      label: copy.fields.email,
      placeholder: copy.placeholders.email,
      type: 'email',
      inputMode: 'email',
      autoComplete: 'email',
    },
    { name: 'pesan', label: copy.fields.story, placeholder: copy.placeholders.story, autoComplete: 'off', multiline: true },
  ];

  return (
    <form
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary/10 bg-white p-5 shadow-xl shadow-primary/10 sm:p-8"
    >
      <div className="grid gap-5">
        {fields.map((field) => {
          const error = errors[field.name];
          const describedBy = error ? `${id(field.name)}-error` : undefined;

          return (
            <div key={field.name} className="space-y-2">
              <label htmlFor={id(field.name)} className="block font-sans text-sm font-semibold text-dark">
                {field.label}
                <span aria-hidden="true" className="ml-0.5 text-red-500">
                  *
                </span>
              </label>
              {field.multiline ? (
                <textarea
                  ref={(el) => {
                    refs.current[field.name] = el;
                  }}
                  id={id(field.name)}
                  name={field.name}
                  rows={5}
                  required
                  maxLength={2000}
                  value={form[field.name]}
                  onChange={handleChange(field.name)}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={`${inputClass(Boolean(error))} resize-y leading-relaxed`}
                />
              ) : (
                <input
                  ref={(el) => {
                    refs.current[field.name] = el;
                  }}
                  id={id(field.name)}
                  name={field.name}
                  type={field.type}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                  autoCapitalize={field.type === 'email' ? 'none' : undefined}
                  spellCheck={field.type === 'email' ? false : undefined}
                  required
                  value={form[field.name]}
                  onChange={handleChange(field.name)}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClass(Boolean(error))}
                />
              )}
              {error ? (
                <p id={`${id(field.name)}-error`} className="text-sm text-red-600">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <button
          type="submit"
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6fa6c9] to-accent px-6 text-base font-semibold text-navy shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
        >
          {copy.submit}
        </button>
        <p className="text-xs leading-relaxed text-dark/60">{copy.mailNote}</p>
      </div>
    </form>
  );
}
