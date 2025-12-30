// Server-side data fetching functions
// Bu fonksiyonlar server component'lerde direkt kullanılabilir
// API route'lara gerek yok!

import { query } from "@/lib/db";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string | string[] | null;
  category: string;
  link: string;
  is_active?: boolean | number;
  sort_order?: number;
}

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  link: string;
  color: string;
  is_active: boolean | number;
  sort_order: number;
}

// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";
  
  try {
    if (!text.includes('Ã') && !text.includes('Ä') && !text.includes('Å')) {
      return text;
    }
    return Buffer.from(text, 'latin1').toString('utf8');
  } catch (error) {
    return text;
  }
}

// Ürünleri veritabanından direkt çek (Server Component için)
export async function getProducts(limit?: number): Promise<Product[]> {
  try {
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const products = await query<Product[]>(
      `SELECT * FROM products WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, created_at DESC ${limitClause}`
    );
    const productsData = Array.isArray(products) ? products : [];
    return productsData.map(product => ({
      ...product,
      title: fixTurkishEncoding(product.title),
      description: fixTurkishEncoding(product.description),
      category: fixTurkishEncoding(product.category),
    }));
  } catch (error) {
    console.error("Ürünler yüklenirken hata:", error);
    return [];
  }
}

// Slider'ları veritabanından direkt çek (Server Component için)
export async function getSliders(): Promise<Slider[]> {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, id ASC"
    );
    return Array.isArray(sliders) ? sliders : [];
  } catch (error) {
    console.error("Slider'lar yüklenirken hata:", error);
    return [];
  }
}

