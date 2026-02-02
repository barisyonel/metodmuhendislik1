import { MetadataRoute } from 'next';

// Static export için gerekli
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.metodmuhendislik.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: [
          '/metod/',
          '/api/',
          '/admin/',
          '/backup/',
          '/debug/',
          '/_next/',
          '/_next/webpack-hmr',
          '*.json',
          '*.xml',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/'],
        disallow: [
          '/metod/',
          '/api/',
          '/admin/',
          '/backup/',
          '/debug/',
          '/_next/',
          '/_next/webpack-hmr',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/_next/static/'],
        disallow: ['/metod/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/_next/static/'],
        disallow: ['/metod/', '/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

