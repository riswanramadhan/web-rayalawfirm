'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  buildWhatsAppMessage,
  buildWhatsAppURL,
  type KonsultasiForm,
} from '@/lib/whatsapp';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

type FormErrors = Partial<Record<keyof KonsultasiForm, string>>;
type InputEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

const initialForm: KonsultasiForm = {
  nama: '',
  telepon: '',
  email: '',
  ceritakan: '',
};

interface KonsultasiFormProps {
  locale: Locale;
}

export default function KonsultasiForm({ locale }: KonsultasiFormProps) {
  const t = getDictionary(locale);
  const formCopy = t.consultationForm;
  const [form, setForm] = useState<KonsultasiForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof KonsultasiForm) => (event: InputEvent) => {
    let value = event.target.value;

    if (field === 'telepon') {
      value = value.replace(/\D/g, '');
    }

    if (field === 'ceritakan' && value.length > 500) {
      value = value.slice(0, 500);
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (data: KonsultasiForm): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.nama.trim()) nextErrors.nama = formCopy.errors.name;
    if (!data.telepon.trim()) nextErrors.telepon = formCopy.errors.phone;
    if (!data.email.trim()) {
      nextErrors.email = formCopy.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = formCopy.errors.emailFormat;
    }
    if (!data.ceritakan.trim()) nextErrors.ceritakan = formCopy.errors.story;

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.open(
      buildWhatsAppURL(buildWhatsAppMessage(form, locale)),
      '_blank',
      'noopener,noreferrer'
    );
    setIsSubmitting(false);
  };

  return (
    <form className="space-y-8" noValidate onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
          {formCopy.personalData}
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nama" className="text-sm font-medium text-dark">
            {formCopy.fields.name}
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            autoComplete="name"
            placeholder={formCopy.placeholders.name}
            value={form.nama}
            onChange={handleChange('nama')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="telepon" className="text-sm font-medium text-dark">
            {formCopy.fields.phone}
          </label>
          <input
            id="telepon"
            name="telepon"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder={formCopy.placeholders.phone}
            value={form.telepon}
            onChange={handleChange('telepon')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.telepon && <p className="text-sm text-red-500">{errors.telepon}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-dark">
            {formCopy.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={formCopy.placeholders.email}
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="ceritakan" className="text-sm font-medium text-dark">
            {formCopy.fields.story}
          </label>
          <span className="text-xs text-dark/50">{form.ceritakan.length}/500</span>
        </div>
        <textarea
          id="ceritakan"
          name="ceritakan"
          rows={5}
          value={form.ceritakan}
          onChange={handleChange('ceritakan')}
          placeholder={formCopy.placeholders.story}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.ceritakan && <p className="text-sm text-red-500">{errors.ceritakan}</p>}
      </div>

      <div className="space-y-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-[#25D366] text-base font-semibold text-white transition-all duration-300 hover:bg-[#22c55e] hover:shadow-lg hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? formCopy.processing : formCopy.submit}
        </button>

        <div className="grid gap-3 text-sm text-dark/70 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            {t.common.dataSafe}
          </div>
          <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            {t.common.noConditions}
          </div>
          <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            {t.common.fastResponse}
          </div>
        </div>
      </div>
    </form>
  );
}
