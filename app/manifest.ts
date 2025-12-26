import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Metod Mühendislik - Elektrik Pano Üretimi ve Endüstriyel Üretim',
    short_name: 'Metod Mühendislik',
    description: 'Elektrik pano ve marin pano üretiminde 20+ yıllık deneyim. CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon hizmetleri.',
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

