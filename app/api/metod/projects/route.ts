import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Tüm projeleri getir
export async function GET() {
  try {
    const projects = await query<Project[]>(
      "SELECT * FROM projects ORDER BY sort_order ASC, id DESC"
    );

    return NextResponse.json({
      success: true,
      data: Array.isArray(projects) ? projects : [],
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number; sqlMessage?: string };
    console.error("❌ Projeler yükleme hatası:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      fullError: String(error),
    });
    
    // Hata durumunda boş array döndür ama hata bilgisini de ekle
    return NextResponse.json({
      success: false,
      data: [],
      error: process.env.NODE_ENV === 'development' ? {
        code: err.code,
        message: err.message,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
      } : undefined,
      errorMessage: err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' 
        ? "Veritabanı bağlantısı kurulamadı" 
        : "Projeler yüklenirken hata oluştu",
    });
  }
}

// Yeni proje oluştur
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("📥 Proje oluşturma isteği alındı:", { 
      hasTitle: !!body.title,
      title: body.title,
      hasImage: !!body.image_url,
      imageUrl: body.image_url?.substring(0, 50) + "...",
      hasImages: !!body.images,
      imagesType: body.images ? typeof body.images : "yok",
      imagesCount: body.images ? (typeof body.images === 'string' ? 'string' : Array.isArray(body.images) ? body.images.length : 'unknown') : 0,
      category: body.category,
      sortOrder: body.sort_order,
      isActive: body.is_active 
    });
    
    const {
      title,
      description,
      image_url,
      images,
      category,
      client_name,
      location,
      project_date,
      sort_order,
      is_active,
    } = body;

    if (!title || !image_url) {
      console.error("❌ Validasyon hatası: Başlık veya görsel URL eksik", { 
        title: !!title, 
        image_url: !!image_url,
        titleValue: title,
        imageUrlValue: image_url 
      });
      return NextResponse.json(
        { success: false, message: "Başlık ve görsel URL gerekli" },
        { status: 400 }
      );
    }

    // images kolonu varsa kullan
    let imagesJson: string = "";
    if (images) {
      if (typeof images === 'string') {
        imagesJson = images;
      } else if (Array.isArray(images)) {
        imagesJson = JSON.stringify(images);
      } else {
        imagesJson = "";
      }
    }

    console.log("Veritabanına ekleniyor:", {
      title,
      description: description || "",
      image_url,
      imagesJson: imagesJson || "boş",
      category: category || "Genel",
      client_name: client_name || null,
      location: location || null,
      project_date: project_date || null,
      sort_order: sort_order || 0,
      is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1,
    });

    // images kolonunu kontrol et ve ekle (eğer yoksa)
    let insertId: number = 0;
    try {
      const result = await query<{ insertId: number }>(
        `INSERT INTO projects (title, description, image_url, images, category, client_name, location, project_date, sort_order, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          description || "",
          image_url,
          imagesJson || null,
          category || "Genel",
          client_name || null,
          location || null,
          project_date || null,
          sort_order || 0,
          is_active !== undefined ? (is_active ? 1 : 0) : 1,
        ]
      );
      insertId = result.insertId;
      console.log("✅ Proje başarıyla oluşturuldu, ID:", insertId);
    } catch (error: unknown) {
      // images kolonu yoksa sadece image_url kullan
      const err = error as { code?: string; sqlMessage?: string; message?: string };
      console.error("İlk INSERT hatası:", {
        code: err.code,
        sqlMessage: err.sqlMessage,
        message: err.message,
      });
      
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.sqlMessage?.includes('images')) {
        console.log("images kolonu yok, sadece image_url ile tekrar deniyor...");
        try {
          const result = await query<{ insertId: number }>(
            `INSERT INTO projects (title, description, image_url, category, client_name, location, project_date, sort_order, is_active) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              title,
              description || "",
              image_url,
              category || "Genel",
              client_name || null,
              location || null,
              project_date || null,
              sort_order || 0,
              is_active !== undefined ? (is_active ? 1 : 0) : 1,
            ]
          );
          insertId = result.insertId;
          console.log("✅ Proje başarıyla oluşturuldu (images olmadan), ID:", insertId);
        } catch (err2: unknown) {
          const err2Obj = err2 as { code?: string; sqlMessage?: string; message?: string };
          console.error("İkinci INSERT hatası:", {
            code: err2Obj.code,
            sqlMessage: err2Obj.sqlMessage,
            message: err2Obj.message,
          });
          throw err2;
        }
      } else {
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla oluşturuldu",
      data: { id: insertId },
    });
  } catch (error: unknown) {
    console.error("❌ Proje oluşturma hatası:", error);
    const err = error as { code?: string; sqlMessage?: string; message?: string; errno?: number };
    
    // Hata detaylarını logla
    const errorDetails = {
      code: err.code,
      sqlMessage: err.sqlMessage,
      message: err.message,
      errno: err.errno,
      fullError: String(error),
    };
    console.error("Error details:", errorDetails);
    
    let errorMessage = err.sqlMessage || err.message || "Proje oluşturulurken hata oluştu";
    
    // Veritabanı bağlantı hatası için özel mesaj
    if (err.code === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('connection')) {
      errorMessage = "Veritabanı bağlantısı kurulamadı. Docker MySQL container'ının çalıştığından emin olun.";
    }
    
    // Tablo yoksa özel mesaj
    if (err.code === 'ER_NO_SUCH_TABLE' || errorMessage.includes("doesn't exist")) {
      errorMessage = "Projects tablosu bulunamadı. Lütfen migration script'ini çalıştırın: scripts/create-projects-table.sql";
    }
    
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        errorCode: err.code,
        errorDetails: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      },
      { status: 500 }
    );
  }
}


