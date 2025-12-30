import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url: string | null;
  link: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Bağlantı hatası loglama için throttle mekanizması
let lastSliderErrorLog = 0;
const SLIDER_ERROR_LOG_INTERVAL = 60000; // 60 saniyede bir log

// Tüm slider'ları getir (Public API - yetkilendirme gerekmez)
export async function GET() {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders ORDER BY sort_order ASC, id ASC"
    );

    const slidersData = Array.isArray(sliders) ? sliders : [];
    // Sadece başarılı durumlarda log (spam'i önlemek için)
    if (slidersData.length > 0 && process.env.NODE_ENV === 'development') {
      console.log(`✅ Slider'lar yüklendi: ${slidersData.length} adet`);
    }
    
    return NextResponse.json({
      success: true,
      data: slidersData,
    });
  } catch (error: unknown) {
    const err = error as { code?: string; sqlMessage?: string; message?: string };
    
    // Veritabanı bağlantı hatası durumunda boş array döndür (frontend'in çalışması için)
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND') {
      // Throttle loglama - spam'i önle
      const now = Date.now();
      if (now - lastSliderErrorLog > SLIDER_ERROR_LOG_INTERVAL) {
        lastSliderErrorLog = now;
        // Sadece development'ta veya debug modunda log
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
          console.warn("⚠️ Veritabanı bağlantısı yok - boş slider listesi döndürülüyor");
        }
      }
      
      return NextResponse.json({
        success: true,
        data: [],
        warning: process.env.NODE_ENV === 'development' 
          ? "Veritabanı bağlantısı kurulamadı. Docker MySQL container'ının çalıştığından emin olun."
          : undefined,
      });
    }
    
    // Diğer hatalar için sadece development'ta log
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Slider yükleme hatası:", error);
    }
    
    // Hata durumunda boş array döndür
    return NextResponse.json({
      success: true,
      data: [],
    });
  }
}

// Yeni slider oluştur
export async function POST(request: NextRequest) {
  try {
    // Yetkilendirme kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.error("Yetkisiz erişim denemesi - POST /api/metod/sliders");
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim. Lütfen giriş yapın." },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Slider oluşturma isteği:", { 
      hasImage: !!body.image_url,
      hasTitle: !!body.title,
      sortOrder: body.sort_order,
      isActive: body.is_active 
    });
    
    const { title, subtitle, description, image_url, video_url, link, color, sort_order, is_active } = body;

    // Validasyon
    if (!image_url || typeof image_url !== 'string' || image_url.trim() === '') {
      return NextResponse.json(
        { success: false, message: "Görsel URL gerekli ve geçerli olmalıdır" },
        { status: 400 }
      );
    }

    // Başlık yoksa basit bir başlık oluştur
    const finalTitle = (title && typeof title === 'string' && title.trim() !== '') 
      ? title.trim() 
      : "Slider";

    console.log("Veritabanına ekleniyor:", {
      title: finalTitle,
      image_url,
      sort_order: sort_order || 0,
      is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1,
    });

    const result = await query<{ insertId: number }>(
      `INSERT INTO hero_sliders (title, subtitle, description, image_url, video_url, link, color, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        finalTitle,
        subtitle || "",
        description || "",
        image_url,
        video_url || null,
        link || "",
        color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        sort_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );

    console.log("Slider başarıyla oluşturuldu, ID:", result.insertId);

    return NextResponse.json({
      success: true,
      message: "Slider başarıyla oluşturuldu",
      data: { id: result.insertId },
    });
  } catch (error: unknown) {
    console.error("Slider oluşturma hatası:", error);
    const err = error as { code?: string; sqlMessage?: string; message?: string; errno?: number };
    console.error("Error details:", {
      code: err.code,
      sqlMessage: err.sqlMessage,
      message: err.message,
      errno: err.errno,
    });
    
    let errorMessage = err.sqlMessage || err.message || "Slider oluşturulurken hata oluştu";
    
    // Veritabanı bağlantı hatası için özel mesaj
    if (err.code === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('connection')) {
      errorMessage = "Veritabanı bağlantısı kurulamadı. Docker MySQL container'ının çalıştığından emin olun.";
    }
    
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        errorCode: err.code,
      },
      { status: 500 }
    );
  }
}


