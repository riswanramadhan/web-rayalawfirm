import { getIndexNowKey } from '@/lib/seo/indexnow';

export const dynamic = 'force-dynamic';

/** File verifikasi kunci IndexNow (lihat lib/seo/indexnow.ts). */
export function GET() {
  const key = getIndexNowKey();

  if (!key) {
    return new Response('Not Found', { status: 404 });
  }

  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
