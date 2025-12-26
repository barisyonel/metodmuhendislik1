import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker için standalone, Vercel için otomatik algılanır
  ...(process.env.DOCKER_BUILD === 'true' && { output: 'standalone' }),
  
  // SSR ve performans ayarları
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Image optimizasyonu
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Headers ayarları
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Redirects (gerekirse)
  async redirects() {
    return [
      // Non-www'den www'ye yönlendirme (production'da)
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'metodmuhendislik.com',
            },
          ],
          destination: 'https://www.metodmuhendislik.com/:path*',
          permanent: true,
        },
      ] : []),
      // HTTP'den HTTPS'ye yönlendirme (production'da)
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://www.metodmuhendislik.com/:path*',
          permanent: true,
        },
      ] : []),
    ];
  },
};

export default nextConfig;