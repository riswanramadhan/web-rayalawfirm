'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  buildWhatsAppMessage,
  buildWhatsAppURL,
  type KonsultasiForm,
} from '../../lib/whatsapp';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

const initialForm: KonsultasiForm = {
  nama: '',
  telepon: '',
  email: '',
  ceritakan: '',
};

type FormErrors = Partial<Record<keyof KonsultasiForm, string>>;
type InputEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

interface KonsultasiSectionProps {
  locale: Locale;
}

export default function KonsultasiSection({ locale }: KonsultasiSectionProps) {
  const t = getDictionary(locale).home.consultation;
  const [form, setForm] = useState<KonsultasiForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof KonsultasiForm) => (event: InputEvent) => {
    let value = event.target.value;

    if (field === 'telepon') {
      value = value.replace(/\D/g, '');
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.nama.trim()) nextErrors.nama = t.errors.name;
    if (!form.telepon.trim()) nextErrors.telepon = t.errors.phone;
    if (!form.email.trim()) {
      nextErrors.email = t.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t.errors.emailFormat;
    }
    if (!form.ceritakan.trim()) nextErrors.ceritakan = t.errors.story;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const url = buildWhatsAppURL(buildWhatsAppMessage(form, locale));
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  return (
    <section className="bg-navy py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-6 sm:gap-16 lg:grid-cols-2 lg:px-16">
        <div data-aos="fade-right" className="space-y-6 lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent">
            {t.badge}
          </span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white lg:text-5xl">
            {t.title}
          </h2>
          <p className="font-body text-base text-white/70 lg:text-lg">
            {t.description}
          </p>

          <div className="grid gap-3">
            {t.reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-accent">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <p className="text-sm text-white/70">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-left">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-xl shadow-primary/10"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="konsultasi-nama" className="text-sm font-semibold text-dark">
                  {t.fields.name}
                </label>
                <input
                  id="konsultasi-nama"
                  type="text"
                  autoComplete="name"
                  value={form.nama}
                  onChange={handleChange('nama')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={t.fields.namePlaceholder}
                />
                {errors.nama && <p className="mt-1 text-xs text-red-600">{errors.nama}</p>}
              </div>

              <div>
                <label htmlFor="konsultasi-telepon" className="text-sm font-semibold text-dark">
                  {t.fields.phone}
                </label>
                <input
                  id="konsultasi-telepon"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={form.telepon}
                  onChange={handleChange('telepon')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={t.fields.phonePlaceholder}
                />
                {errors.telepon && <p className="mt-1 text-xs text-red-600">{errors.telepon}</p>}
              </div>

              <div>
                <label htmlFor="konsultasi-email" className="text-sm font-semibold text-dark">
                  {t.fields.email}
                </label>
                <input
                  id="konsultasi-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={t.fields.emailPlaceholder}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="konsultasi-ceritakan" className="text-sm font-semibold text-dark">
                  {t.fields.story}
                </label>
                <textarea
                  id="konsultasi-ceritakan"
                  rows={4}
                  value={form.ceritakan}
                  onChange={handleChange('ceritakan')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={t.fields.storyPlaceholder}
                />
                {errors.ceritakan && <p className="mt-1 text-xs text-red-600">{errors.ceritakan}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {t.fields.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
