'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  buildWhatsAppMessage,
  buildWhatsAppURL,
  type KonsultasiForm,
} from '@/lib/whatsapp';

type FormErrors = Partial<Record<keyof KonsultasiForm, string>>;

type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

const bidangHukumOptions = [
  'Hukum Pidana',
  'Hukum Perdata',
  'Hukum Bisnis',
  'Hukum Keluarga',
  'Hukum Properti',
  'Hukum Ketenagakerjaan',
  'Hukum Administrasi',
  'Lainnya',
];

const sumberInfoOptions = [
  'Google',
  'Media Sosial',
  'Referensi Teman',
  'Lainnya',
];

const jenisKelaminOptions = ['Laki-laki', 'Perempuan'];
const statusKasusOptions = ['Baru', 'Sudah Berjalan', 'Naik Banding'];
const waktuKonsulOptions = ['Segera', 'Minggu Ini', 'Fleksibel'];

const initialForm: KonsultasiForm = {
  nama: '',
  telepon: '',
  email: '',
  jenisKelamin: '',
  kota: '',
  bidangHukum: '',
  statusKasus: '',
  deskripsiSingkat: '',
  waktuKonsul: '',
  sumberInfo: '',
};

export default function KonsultasiForm() {
  const [form, setForm] = useState<KonsultasiForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof KonsultasiForm) => (event: InputEvent) => {
    let value = event.target.value;

    if (field === 'telepon') {
      value = value.replace(/\D/g, '');
    }

    if (field === 'deskripsiSingkat' && value.length > 500) {
      value = value.slice(0, 500);
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (data: KonsultasiForm): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.nama.trim()) {
      nextErrors.nama = 'Nama lengkap wajib diisi.';
    }

    if (!data.telepon.trim()) {
      nextErrors.telepon = 'Nomor telepon wajib diisi.';
    } else if (!/^\d+$/.test(data.telepon)) {
      nextErrors.telepon = 'Nomor telepon harus berupa angka.';
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = 'Format email tidak valid.';
    }

    if (!data.jenisKelamin) {
      nextErrors.jenisKelamin = 'Pilih jenis kelamin.';
    }

    if (!data.kota.trim()) {
      nextErrors.kota = 'Kota domisili wajib diisi.';
    }

    if (!data.bidangHukum) {
      nextErrors.bidangHukum = 'Pilih bidang hukum.';
    }

    if (!data.statusKasus) {
      nextErrors.statusKasus = 'Pilih status kasus.';
    }

    if (!data.waktuKonsul) {
      nextErrors.waktuKonsul = 'Pilih waktu konsultasi.';
    }

    if (!data.deskripsiSingkat.trim()) {
      nextErrors.deskripsiSingkat = 'Deskripsi singkat wajib diisi.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppMessage({
      ...form,
      sumberInfo: form.sumberInfo.trim() || 'Tidak disebutkan',
    });
    const waUrl = buildWhatsAppURL(message);

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  return (
    <form className="space-y-10" noValidate onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
          Data Diri
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nama" className="text-sm font-medium text-dark">
            Nama Lengkap
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            autoComplete="name"
            placeholder="Nama lengkap"
            value={form.nama}
            onChange={handleChange('nama')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="telepon" className="text-sm font-medium text-dark">
            No. WhatsApp atau Telepon
          </label>
          <input
            id="telepon"
            name="telepon"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="08xx"
            value={form.telepon}
            onChange={handleChange('telepon')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.telepon && (
            <p className="text-sm text-red-500">{errors.telepon}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-dark">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email@gmail.com"
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="kota" className="text-sm font-medium text-dark">
            Kota Domisili
          </label>
          <input
            id="kota"
            name="kota"
            type="text"
            placeholder="Kota domisili"
            value={form.kota}
            onChange={handleChange('kota')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.kota && <p className="text-sm text-red-500">{errors.kota}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-dark">Jenis Kelamin</p>
        <div className="flex flex-wrap gap-4">
          {jenisKelaminOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-dark/80 transition hover:border-primary/40"
            >
              <input
                type="radio"
                name="jenisKelamin"
                value={option}
                checked={form.jenisKelamin === option}
                onChange={handleChange('jenisKelamin')}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.jenisKelamin && (
          <p className="text-sm text-red-500">{errors.jenisKelamin}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
          Detail Kasus
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="bidangHukum" className="text-sm font-medium text-dark">
            Bidang Hukum
          </label>
          <select
            id="bidangHukum"
            name="bidangHukum"
            value={form.bidangHukum}
            onChange={handleChange('bidangHukum')}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Pilih bidang hukum</option>
            {bidangHukumOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.bidangHukum && (
            <p className="text-sm text-red-500">{errors.bidangHukum}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="statusKasus" className="text-sm font-medium text-dark">
            Status Kasus
          </label>
          <div className="flex flex-wrap gap-4">
            {statusKasusOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-dark/80 transition hover:border-primary/40"
              >
                <input
                  type="radio"
                  name="statusKasus"
                  value={option}
                  checked={form.statusKasus === option}
                  onChange={handleChange('statusKasus')}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.statusKasus && (
            <p className="text-sm text-red-500">{errors.statusKasus}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="waktuKonsul" className="text-sm font-medium text-dark">
          Waktu Konsultasi
        </label>
        <div className="flex flex-wrap gap-4">
          {waktuKonsulOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-dark/80 transition hover:border-primary/40"
            >
              <input
                type="radio"
                name="waktuKonsul"
                value={option}
                checked={form.waktuKonsul === option}
                onChange={handleChange('waktuKonsul')}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.waktuKonsul && (
          <p className="text-sm text-red-500">{errors.waktuKonsul}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="deskripsiSingkat" className="text-sm font-medium text-dark">
            Deskripsi Singkat Kasus
          </label>
          <span className="text-xs text-dark/50">
            {form.deskripsiSingkat.length}/500
          </span>
        </div>
        <textarea
          id="deskripsiSingkat"
          name="deskripsiSingkat"
          rows={4}
          value={form.deskripsiSingkat}
          onChange={handleChange('deskripsiSingkat')}
          placeholder="Tuliskan kronologi singkat kasus Anda"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.deskripsiSingkat && (
          <p className="text-sm text-red-500">{errors.deskripsiSingkat}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
          Informasi Tambahan
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="space-y-2">
        <label htmlFor="sumberInfo" className="text-sm font-medium text-dark">
          Dari mana tahu Raya Law Firm
        </label>
        <select
          id="sumberInfo"
          name="sumberInfo"
          value={form.sumberInfo}
          onChange={handleChange('sumberInfo')}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Pilih sumber informasi</option>
          {sumberInfoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] text-base font-semibold text-white transition-all duration-300 hover:bg-[#22c55e] hover:shadow-lg hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Memproses...
            </>
          ) : (
            <>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi via WhatsApp
            </>
          )}
        </button>

        <div className="grid gap-3 text-sm text-dark/70 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            <span>Data aman dan rahasia</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <span>Gratis tanpa syarat</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>Respons cepat dalam 24 jam</span>
          </div>
        </div>
      </div>
    </form>
  );
}
