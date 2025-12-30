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
  } catch {
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
    
    if (productsData.length === 0) {
      console.warn("⚠️ Veritabanında aktif ürün bulunamadı");
      return [];
    }
    
    console.log(`✅ ${productsData.length} ürün başarıyla yüklendi`);
    
    return productsData.map(product => ({
      ...product,
      title: fixTurkishEncoding(product.title),
      description: fixTurkishEncoding(product.description),
      category: fixTurkishEncoding(product.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Ürünler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    
    // Bağlantı hatası ise detaylı bilgi ver
    if (err.code === 'ER_ACCESS_DENIED_ERROR' || err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      console.error("💡 Veritabanı bağlantı bilgilerini kontrol edin:");
      console.error(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
      console.error(`   DB_PORT: ${process.env.DB_PORT || '3306'}`);
      console.error(`   DB_USER: ${process.env.DB_USER || 'metodmuhendislik'}`);
      console.error(`   DB_NAME: ${process.env.DB_NAME || 'metodmuhendislik_db'}`);
    }
    
    return [];
  }
}

// Slider'ları veritabanından direkt çek (Server Component için)
export async function getSliders(): Promise<Slider[]> {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, id ASC"
    );
    const slidersData = Array.isArray(sliders) ? sliders : [];
    
    if (slidersData.length === 0) {
      console.warn("⚠️ Veritabanında aktif slider bulunamadı");
      return [];
    }
    
    console.log(`✅ ${slidersData.length} slider başarıyla yüklendi`);
    
    return slidersData;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Slider'lar yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    
    // Bağlantı hatası ise detaylı bilgi ver
    if (err.code === 'ER_ACCESS_DENIED_ERROR' || err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      console.error("💡 Veritabanı bağlantı bilgilerini kontrol edin:");
      console.error(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
      console.error(`   DB_PORT: ${process.env.DB_PORT || '3306'}`);
      console.error(`   DB_USER: ${process.env.DB_USER || 'metodmuhendislik'}`);
      console.error(`   DB_NAME: ${process.env.DB_NAME || 'metodmuhendislik_db'}`);
    }
    
    return [];
  }
}

