import { MetadataRoute } from "next";
import { query } from "@/lib/db";

interface Product {
  id: number;
  slug?: string;
  link?: string;
  updated_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.metodmuhendislik.com";
  const lastModified = new Date("2025-12-26");

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kurumsal/hakkimizda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kurumsal/kalite-politikamiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kurumsal/kalite-belgelerimiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kurumsal/kvkk`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kurumsal/gizlilik-sozlesmesi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kurumsal/ekibimiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Hizmet sayfaları
  const services: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/hizmetler/elektrik-pano-uretime`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0, // Elektrik pano için en yüksek öncelik
    },
    {
      url: `${baseUrl}/hizmetler/cnc-lazer-kesim`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/cnc-bukum`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/kaynak`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/elektrostatik-toz-boya`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/magaza-raf-ve-urunleri`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/celik-konstruksiyon`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Blog sayfaları
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/istanbul`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/gebze-kocaeli`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/diger-marmara`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dinamik ürün sayfaları (veritabanından)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await query<Product[]>(
      "SELECT id, link, updated_at FROM products WHERE (is_active = TRUE OR is_active = 1) ORDER BY updated_at DESC",
    );

    if (Array.isArray(products) && products.length > 0) {
      productPages = products.map((product) => {
        let url = `${baseUrl}/urunler`;

        // Link varsa kullan, yoksa ID ile oluştur
        if (product.link) {
          url = product.link.startsWith("/")
            ? `${baseUrl}${product.link}`
            : `${baseUrl}/${product.link}`;
        } else if (product.id) {
          url = `${baseUrl}/urunler/urunler/${product.id}`;
        }

        return {
          url,
          lastModified: product.updated_at
            ? new Date(product.updated_at)
            : lastModified,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    // Production'da bağlantı hatalarını sessizce handle et
    const err = error as { code?: string; errno?: number };
    const isConnectionError =
      err.code === "ECONNREFUSED" ||
      err.code === "ETIMEDOUT" ||
      err.code === "ENOTFOUND" ||
      err.errno === -111 ||
      err.errno === -61;
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

    if (!isConnectionError || !isProduction) {
      console.error("Sitemap ürün yükleme hatası:", error);
    }
    // Hata durumunda devam et, ürün sayfaları olmadan sitemap oluştur
  }

  // Dinamik proje sayfaları (veritabanından)
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    interface Project {
      id: number;
      updated_at?: string;
    }

    const projects = await query<Project[]>(
      "SELECT id, updated_at FROM projects WHERE (is_active = TRUE OR is_active = 1) ORDER BY updated_at DESC LIMIT 100",
    );

    if (Array.isArray(projects) && projects.length > 0) {
      projectPages = projects.map((project) => ({
        url: `${baseUrl}/projeler/${project.id}`,
        lastModified: project.updated_at
          ? new Date(project.updated_at)
          : lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    // Production'da bağlantı hatalarını sessizce handle et
    const err = error as { code?: string; errno?: number };
    const isConnectionError =
      err.code === "ECONNREFUSED" ||
      err.code === "ETIMEDOUT" ||
      err.code === "ENOTFOUND" ||
      err.errno === -111 ||
      err.errno === -61;
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

    if (!isConnectionError || !isProduction) {
      console.error("Sitemap proje yükleme hatası:", error);
    }
  }

  // Tüm sayfaları birleştir
  return [
    ...staticPages,
    ...services,
    ...blogPages,
    ...productPages,
    ...projectPages,
  ];
}
