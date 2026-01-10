import { MetadataRoute } from 'next';

// Static export için gerekli
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Metod Mühendislik - Elektrik Pano Üretimi ve Endüstriyel Üretim',
    short_name: 'Metod Mühendislik',
    description: 'Elektrik pano ve marin pano üretiminde 10+ yıllık deneyim. CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon hizmetleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0056b3',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['business', 'industrial', 'manufacturing'],
    lang: 'tr',
    dir: 'ltr',
    orientation: 'portrait',
  };
}

