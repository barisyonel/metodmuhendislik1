import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Non-www'den www'ye yönlendirme (production'da)
  if (
    process.env.NODE_ENV === 'production' &&
    hostname === 'metodmuhendislik.com' &&
    !hostname.includes('localhost')
  ) {
    url.hostname = 'www.metodmuhendislik.com';
    return NextResponse.redirect(url, 301);
  }

  // SSL/HTTPS yönlendirmesi (production'da)
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') === 'http' &&
    !url.hostname.includes('localhost')
  ) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Security headers
  const response = NextResponse.next();
  
  // Security headers ekle
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HTTPS zorunlu (production'da)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Admin paneli için koruma
  if (pathname.startsWith("/metod") && !pathname.startsWith("/metod/login")) {
    const token = request.cookies.get("metod_admin_token");

    if (!token) {
      return NextResponse.redirect(new URL("/metod/login", request.url));
    }
  }

  // Login sayfasına zaten giriş yapmışsa yönlendirme
  if (pathname === "/metod/login") {
    const token = request.cookies.get("metod_admin_token");

    if (token) {
      return NextResponse.redirect(new URL("/metod", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/metod/:path*",
    // Tüm istekleri yakala (www redirect için)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

