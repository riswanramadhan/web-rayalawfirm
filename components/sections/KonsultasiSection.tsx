'use client';

import type {
  ChangeEvent,
  FormEvent,
} from 'react';
import { useState } from 'react';
import {
  buildWhatsAppMessage,
  buildWhatsAppURL,
  type KonsultasiForm,
} from '../../lib/whatsapp';

const bidangOptions = [
  'Pidana',
  'Perdata',
  'Bisnis',
  'Keluarga',
  'Properti',
  'Ketenagakerjaan',
  'Lainnya',
];

const reasons = [
  'Respons cepat dan pendampingan yang jelas',
  'Strategi hukum terukur untuk setiap kasus',
  'Kerahasiaan dan etika profesi terjaga',
  'Tim advokat berpengalaman lintas sektor',
];

const initialForm: KonsultasiForm = {
  nama: '',
  telepon: '',
  email: '-',
  jenisKelamin: '-',
  kota: '-',
  bidangHukum: '',
  statusKasus: '-',
  deskripsiSingkat: '',
  waktuKonsul: 'Segera',
  sumberInfo: 'Homepage',
};

type FormErrors = Partial<Record<keyof KonsultasiForm, string>>;

export default function KonsultasiSection() {
  const [form, setForm] = useState<KonsultasiForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof KonsultasiForm) =>
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.nama.trim()) {
      nextErrors.nama = 'Nama wajib diisi.';
    }
    if (!form.telepon.trim()) {
      nextErrors.telepon = 'Nomor telepon wajib diisi.';
    }
    if (!form.bidangHukum.trim()) {
      nextErrors.bidangHukum = 'Pilih bidang hukum.';
    }
    if (!form.deskripsiSingkat.trim()) {
      nextErrors.deskripsiSingkat = 'Deskripsi singkat wajib diisi.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const message = buildWhatsAppMessage(form);
    const url = buildWhatsAppURL(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  return (
    <section className="bg-navy py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-6 sm:gap-16 lg:grid-cols-2 lg:px-16">
        <div data-aos="fade-right" className="space-y-6 lg:sticky lg:top-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent">
            Konsultasi Cepat
          </span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Konsultasi Hukum Praktis untuk Kebutuhan Mendesak
          </h2>
          <p className="font-body text-base text-white/70 lg:text-lg">
            Sampaikan ringkasan kasus Anda dan dapatkan arahan awal dari tim kami. Setiap konsultasi dijaga kerahasiaannya dan ditangani secara profesional.
          </p>

          <div className="grid gap-3">
            {reasons.map((reason) => (
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

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm text-white/70 backdrop-blur-sm">
            <p className="font-semibold text-white">Kontak Darurat WhatsApp</p>
            <p className="mt-1">+62 813-3566-3379 (24 jam)</p>
          </div>
        </div>

        <div data-aos="fade-left">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-xl shadow-primary/10"
          >
            <div className="grid gap-5">
              <div>
                <label
                  htmlFor="konsultasi-nama"
                  className="text-sm font-semibold text-dark"
                >
                  Nama Lengkap
                </label>
                <input
                  id="konsultasi-nama"
                  type="text"
                  value={form.nama}
                  onChange={handleChange('nama')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Nama lengkap"
                />
                {errors.nama && (
                  <p className="mt-1 text-xs text-red-600">{errors.nama}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="konsultasi-telepon"
                  className="text-sm font-semibold text-dark"
                >
                  Nomor Telepon
                </label>
                <input
                  id="konsultasi-telepon"
                  type="tel"
                  value={form.telepon}
                  onChange={handleChange('telepon')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: 081234567890"
                />
                {errors.telepon && (
                  <p className="mt-1 text-xs text-red-600">{errors.telepon}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="konsultasi-bidang"
                  className="text-sm font-semibold text-dark"
                >
                  Bidang Hukum
                </label>
                <select
                  id="konsultasi-bidang"
                  value={form.bidangHukum}
                  onChange={handleChange('bidangHukum')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Pilih bidang hukum</option>
                  {bidangOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.bidangHukum && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.bidangHukum}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="konsultasi-deskripsi"
                  className="text-sm font-semibold text-dark"
                >
                  Deskripsi Singkat
                </label>
                <textarea
                  id="konsultasi-deskripsi"
                  rows={4}
                  value={form.deskripsiSingkat}
                  onChange={handleChange('deskripsiSingkat')}
                  className="mt-2 w-full rounded-xl border border-primary/30 bg-white/80 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Ceritakan kronologi singkat kasus Anda"
                />
                {errors.deskripsiSingkat && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.deskripsiSingkat}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
