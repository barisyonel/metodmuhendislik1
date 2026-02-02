import type { NextConfig } from "next";

// DirectAdmin için static export kontrolü
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // DirectAdmin için static export
  ...(isStaticExport && { output: "export" }),
  // Docker için standalone, Vercel için otomatik algılanır
  ...(!isStaticExport && process.env.DOCKER_BUILD === "true" && { output: "standalone" }),

  // SSR ve performans ayarları
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Experimental features
  experimental: {
    // Server Actions için optimize edilmiş
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Image optimizasyonu
  images: {
    // Static export için image optimizasyonu kapatılmalı
    ...(isStaticExport && { unoptimized: true }),
    ...(!isStaticExport && {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "picsum.photos",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "**",
        },
      ],
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      qualities: [75, 95], // Kullanılan quality değerleri
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: false,
      contentSecurityPolicy:
        "default-src 'self'; script-src 'none'; style-src 'unsafe-inline';",
    }),
  },

  // Headers ayarları (static export'ta çalışmaz)
  // Development'ta header'ları devre dışı bırak (CSS sorununu önlemek için)
  ...(!isStaticExport && process.env.NODE_ENV === "production" && {
    async headers() {
    const securityHeaders = [
      {
        key: "Content-Type",
        value: "text/html; charset=utf-8",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    // Production'da HSTS ekle
    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      });
    }

    // Content Security Policy (CSP)
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' data: https: blob:;
      media-src 'self' https:;
      connect-src 'self' https://api.cloudinary.com https://www.google-analytics.com;
      frame-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim();

    return [
      {
        source: "/dokumanlar/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
      // CSS ve JS dosyaları için özel header'lar (CSP ve diğer header'ları devre dışı bırak)
      // ÖNEMLİ: Bu kural HTML sayfalarından ÖNCE gelmeli
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // HTML sayfaları için tüm header'lar
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
    },
  }),

  // Redirects (static export'ta çalışmaz, .htaccess kullanılmalı)
  ...(!isStaticExport && {
    async redirects() {
    return [
      // SEO: Duplicate/alternatif URL'leri canonical'a yönlendir
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/hizmetlerimiz", destination: "/hizmetler", permanent: true },
      { source: "/hizmetlerimiz/", destination: "/hizmetler", permanent: true },
      { source: "/hizmet-icerik/kaynak-28", destination: "/hizmetler/kaynak", permanent: true },
      { source: "/hizmet-icerik/kaynak-28/", destination: "/hizmetler/kaynak", permanent: true },
      { source: "/hizmet-icerik/:path*", destination: "/hizmetler/:path*", permanent: true },
      // Non-www'den www'ye yönlendirme (production'da)
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [
                {
                  type: "host" as const,
                  value: "metodmuhendislik.com",
                },
              ],
              destination: "https://www.metodmuhendislik.com/:path*",
              permanent: true,
            },
          ]
        : []),
      // HTTP'den HTTPS'ye yönlendirme (production'da)
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [
                {
                  type: "header" as const,
                  key: "x-forwarded-proto",
                  value: "http",
                },
              ],
              destination: "https://www.metodmuhendislik.com/:path*",
              permanent: true,
            },
          ]
        : []),
    ];
    },
  }),
};

export default nextConfig;