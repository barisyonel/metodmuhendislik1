import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/metod/:path*"],
};

