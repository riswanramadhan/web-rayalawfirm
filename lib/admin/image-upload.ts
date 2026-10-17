'use client';

import { getSupabaseBrowserClient } from '@/lib/supabase/browser';
import { MEDIA_BUCKET } from '@/lib/supabase/env';
import { slugify } from './schemas';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
export const MAX_SOURCE_IMAGE_BYTES = 15 * 1024 * 1024;

interface CompressOptions {
  /** Sisi terpanjang maksimum (px). */
  maxSize?: number;
  quality?: number;
}

async function decodeImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; release: () => void }> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file);
      return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
    } catch {
      // lanjut ke fallback <img>
    }
  }

  const url = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
  await image.decode();
  return {
    source: image,
    width: image.naturalWidth,
    height: image.naturalHeight,
    release: () => URL.revokeObjectURL(url),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Perkecil & kompres gambar di browser (WebP, fallback JPEG) supaya website
 * tetap cepat (Core Web Vitals) walau admin mengunggah foto besar dari HP.
 */
export async function compressImage(file: File, options: CompressOptions = {}): Promise<Blob> {
  const { maxSize = 1600, quality = 0.82 } = options;

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Format gambar harus JPG, PNG, WebP, atau AVIF.');
  }
  if (file.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error('Ukuran gambar maksimal 15 MB.');
  }

  const decoded = await decodeImage(file);
  try {
    const scale = Math.min(1, maxSize / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Browser tidak mendukung pemrosesan gambar.');
    context.imageSmoothingQuality = 'high';
    context.drawImage(decoded.source, 0, 0, width, height);

    const webp = await canvasToBlob(canvas, 'image/webp', quality);
    if (webp && webp.type === 'image/webp') return webp;

    const jpeg = await canvasToBlob(canvas, 'image/jpeg', quality);
    if (jpeg) return jpeg;

    return file;
  } finally {
    decoded.release();
  }
}

/**
 * Kompres lalu unggah ke bucket Supabase "media". Mengembalikan URL publik.
 * Panggil HANYA setelah requestWriteAccess() mengembalikan 'enabled'
 * (storage juga dikunci oleh mode HOLD di level database).
 */
export async function uploadAdminImage(
  file: File,
  folder: 'lawyers' | 'articles',
  baseName: string,
  options?: CompressOptions
): Promise<string> {
  const blob = await compressImage(file, options);
  const extension = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  const path = `${folder}/${new Date().getFullYear()}/${slugify(baseName, 60) || 'gambar'}-${random}.${extension}`;

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, blob, {
    contentType: blob.type || 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) {
    if (/row-level security|unauthorized|403/i.test(error.message)) {
      throw new Error('Upload gambar ditolak. Fitur pembaruan data belum diaktifkan atau sesi berakhir.');
    }
    throw new Error(`Upload gambar gagal: ${error.message}`);
  }

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
