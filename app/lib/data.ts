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

interface Service {
  id: number;
  name: string;
  href: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean | number;
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

// Hizmetleri veritabanından direkt çek (Server Component için)
export async function getServices(): Promise<Service[]> {
  try {
    const services = await query<Service[]>(
      "SELECT * FROM metod_services WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC"
    );
    const servicesData = Array.isArray(services) ? services : [];

    if (servicesData.length === 0) {
      console.warn("⚠️ Veritabanında aktif hizmet bulunamadı");
      return [];
    }

    console.log(`✅ ${servicesData.length} hizmet başarıyla yüklendi`);

    return servicesData.map(service => ({
      ...service,
      name: fixTurkishEncoding(service.name),
      description: service.description ? fixTurkishEncoding(service.description) : undefined,
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Hizmetler yüklenirken hata:", {
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

// ============================================
// ADMIN PANEL İÇİN FONKSİYONLAR (Tüm veriler - aktif/pasif)
// ============================================

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: string | string[] | null;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order: number;
  is_active: boolean | number;
}

// Admin panel için: Tüm ürünleri çek (aktif/pasif)
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await query<Product[]>(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    const productsData = Array.isArray(products) ? products : [];
    
    console.log(`✅ Admin: ${productsData.length} ürün yüklendi (tümü)`);
    
    return productsData.map(product => ({
      ...product,
      title: fixTurkishEncoding(product.title),
      description: fixTurkishEncoding(product.description),
      category: fixTurkishEncoding(product.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Ürünler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm slider'ları çek (aktif/pasif)
export async function getAllSliders(): Promise<Slider[]> {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders ORDER BY sort_order ASC, id ASC"
    );
    const slidersData = Array.isArray(sliders) ? sliders : [];
    
    console.log(`✅ Admin: ${slidersData.length} slider yüklendi (tümü)`);
    
    return slidersData;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Slider'lar yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm hizmetleri çek (aktif/pasif)
export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await query<Service[]>(
      "SELECT * FROM metod_services ORDER BY sort_order ASC, id ASC"
    );
    const servicesData = Array.isArray(services) ? services : [];
    
    console.log(`✅ Admin: ${servicesData.length} hizmet yüklendi (tümü)`);
    
    return servicesData.map(service => ({
      ...service,
      name: fixTurkishEncoding(service.name),
      description: service.description ? fixTurkishEncoding(service.description) : undefined,
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Hizmetler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm projeleri çek (aktif/pasif)
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await query<Project[]>(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    const projectsData = Array.isArray(projects) ? projects : [];
    
    console.log(`✅ Admin: ${projectsData.length} proje yüklendi (tümü)`);
    
    return projectsData.map(project => ({
      ...project,
      title: fixTurkishEncoding(project.title),
      description: fixTurkishEncoding(project.description),
      category: fixTurkishEncoding(project.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Projeler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}
