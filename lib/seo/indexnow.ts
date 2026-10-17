import { siteConfig } from '@/lib/metadata';

/**
 * IndexNow: memberi tahu Bing, Yandex, Seznam, Naver (dan ChatGPT Search yang
 * memakai indeks Bing) bahwa URL baru/berubah — artikel baru terindeks dalam
 * hitungan menit, bukan hari.
 *
 * Aktif hanya bila env INDEXNOW_KEY diisi. File kunci dilayani oleh
 * app/indexnow-key.txt/route.ts.
 */

export const INDEXNOW_KEY_PATH = '/indexnow-key.txt';

export function getIndexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key && /^[a-zA-Z0-9-]{8,128}$/.test(key) ? key : null;
}

/** Tidak pernah melempar error — kegagalan ping tidak boleh menggagalkan simpan. */
export async function pingIndexNow(paths: string[]): Promise<void> {
  const key = getIndexNowKey();
  if (!key || paths.length === 0) return;

  const host = new URL(siteConfig.url).host;
  const urlList = Array.from(new Set(paths.map((path) => new URL(path, siteConfig.url).toString())));

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: new URL(INDEXNOW_KEY_PATH, siteConfig.url).toString(),
        urlList,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);
  } catch (error) {
    console.warn('[indexnow] ping gagal', error);
  }
}
