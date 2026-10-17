'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ACCEPTED_IMAGE_TYPES, MAX_SOURCE_IMAGE_BYTES } from '@/lib/admin/image-upload';

interface ImageInputProps {
  id?: string;
  /** URL gambar yang sudah tersimpan (mode edit). */
  currentUrl?: string;
  /** File baru yang dipilih (belum diupload — upload terjadi saat Simpan). */
  file: File | null;
  onFileChange: (file: File | null) => void;
  /** Rasio tampilan pratinjau, mis. "aspect-[3/4]" untuk foto profil. */
  aspectClassName?: string;
  invalid?: boolean;
  label?: string;
}

/**
 * Pemilih gambar dengan pratinjau lokal. Gambar BELUM diunggah saat dipilih;
 * form mengunggahnya ketika tombol Simpan ditekan (setelah lolos cek mode HOLD).
 */
export default function ImageInput({
  id,
  currentUrl,
  file,
  onFileChange,
  aspectClassName = 'aspect-video',
  invalid,
  label = 'Pilih gambar',
}: ImageInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const shownUrl = previewUrl ?? (currentUrl || null);

  const handleFiles = (files: FileList | null) => {
    setLocalError(null);
    const picked = files?.[0];
    if (!picked) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(picked.type)) {
      setLocalError('Format harus JPG, PNG, WebP, atau AVIF.');
      return;
    }
    if (picked.size > MAX_SOURCE_IMAGE_BYTES) {
      setLocalError('Ukuran gambar maksimal 15 MB.');
      return;
    }
    onFileChange(picked);
  };

  return (
    <div className="space-y-3">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border-2 border-dashed ${
          invalid || localError ? 'border-red-400' : 'border-dark/15'
        } bg-offwhite ${aspectClassName}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
      >
        {shownUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shownUrl} alt="Pratinjau gambar" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-dark/50 transition-colors hover:bg-primary/5 hover:text-primary"
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm9-12h.008v.008H12.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-sm font-semibold">{label}</span>
            <span className="text-xs">JPG, PNG, WebP · otomatis dikompres</span>
          </button>
        )}
        {file && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-navy shadow">
            Baru · belum diunggah
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        tabIndex={-1}
        aria-hidden="true"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      <div className="flex flex-wrap gap-2">
        <button
          id={inputId}
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-dark/15 bg-white px-4 text-sm font-semibold text-dark transition-colors hover:bg-dark/5"
        >
          {shownUrl ? 'Ganti gambar' : label}
        </button>
        {file && (
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            Batalkan gambar baru
          </button>
        )}
      </div>
      {localError && (
        <p className="text-sm font-medium text-red-600" role="alert">
          {localError}
        </p>
      )}
    </div>
  );
}
