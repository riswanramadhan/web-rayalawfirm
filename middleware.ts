import { NextResponse, type NextRequest } from 'next/server';
import { updateAdminSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { response, userId } = await updateAdminSession(request);
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';
  // Server action (POST + header Next-Action) jangan di-redirect: biarkan action
  // mengembalikan status 'unauthorized' agar form menampilkan pesan sesi berakhir.
  const isServerAction = request.method === 'POST' && request.headers.has('next-action');

  if (!userId && !isLoginPage && !isServerAction) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.search = '';
    if (pathname !== '/admin') {
      loginUrl.searchParams.set('next', pathname);
    }

    const redirect = NextResponse.redirect(loginUrl);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    redirect.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return redirect;
  }

  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
