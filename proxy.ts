import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting için basit in-memory store (production'da Redis kullanılmalı)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 dakika
const RATE_LIMIT_MAX_REQUESTS = 100; // Dakikada maksimum istek sayısı

function getRateLimitKey(request: NextRequest): string {
  // IP adresini al (Vercel'de x-forwarded-for header'ından)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

function checkRateLimit(request: NextRequest): boolean {
  // Admin paneli ve API route'ları için rate limiting
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/") && !pathname.startsWith("/metod/")) {
    return true; // Rate limiting sadece API ve admin için
  }

  const key = getRateLimitKey(request);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Yeni pencere başlat
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit aşıldı
  }

  record.count++;
  return true;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Rate limiting kontrolü
  if (!checkRateLimit(request)) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests",
        message: "Lütfen bir süre sonra tekrar deneyin.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      },
    );
  }

  // Non-www'den www'ye yönlendirme (production'da)
  if (
    process.env.NODE_ENV === "production" &&
    hostname === "metodmuhendislik.com" &&
    !hostname.includes("localhost")
  ) {
    url.hostname = "www.metodmuhendislik.com";
    return NextResponse.redirect(url, 301);
  }

  // SSL/HTTPS yönlendirmesi (production'da)
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") === "http" &&
    !url.hostname.includes("localhost")
  ) {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // Security headers
  const response = NextResponse.next();

  // Security headers ekle (next.config.ts'deki headers ile birlikte)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );

  // HTTPS zorunlu (production'da)
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
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
