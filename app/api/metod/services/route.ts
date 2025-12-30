import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

interface Service {
  id: number;
  name: string;
  href: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
}

// Tüm hizmetleri getir (Public API - yetkilendirme gerekmez)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    
    // Admin paneli için tüm hizmetleri getir (aktif/pasif)
    const queryString = all
      ? "SELECT * FROM metod_services ORDER BY sort_order ASC, id ASC"
      : "SELECT * FROM metod_services WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC";
    
    const services = await query<Service[]>(queryString);

    return NextResponse.json(
      {
        success: true,
        data: Array.isArray(services) ? services : [],
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number; sqlMessage?: string };
    console.error("❌ Hizmetler yükleme hatası:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      fullError: String(error),
    });
    
    // Hata durumunda açık hata mesajı döndür
    const isConnectionError = err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND';
    
    return NextResponse.json(
      {
        success: false,
        data: [],
        error: isConnectionError 
          ? "Veritabanı bağlantısı kurulamadı"
          : "Hizmetler yüklenirken hata oluştu",
        errorCode: err.code,
        message: isConnectionError
          ? (process.env.NODE_ENV === 'development' 
              ? "Veritabanı bağlantısı kurulamadı. Lütfen veritabanı sunucusunun çalıştığından ve environment variables'ların doğru ayarlandığından emin olun."
              : "Veritabanı bağlantısı kurulamadı")
          : (err.sqlMessage || err.message || "Hizmetler yüklenirken hata oluştu"),
        errorDetails: process.env.NODE_ENV === 'development' ? {
          code: err.code,
          message: err.message,
          errno: err.errno,
          sqlMessage: err.sqlMessage,
        } : undefined,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  }
}

// Yeni hizmet oluştur
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
    const { name, href, icon, description, sort_order, is_active } = body;

    if (!name || !href) {
      return NextResponse.json(
        { success: false, message: "İsim ve link gerekli" },
        { status: 400 }
      );
    }

    console.log("📥 Hizmet oluşturma isteği:", {
      name,
      href,
      icon: icon || "⚡",
      description: description || "",
      sort_order: sort_order || 0,
      is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1,
    });

    const result = await query<{ insertId: number }>(
      `INSERT INTO metod_services (name, href, icon, description, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        href,
        icon || "⚡",
        description || null,
        sort_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );

    console.log("✅ Hizmet başarıyla oluşturuldu, ID:", result.insertId);

    return NextResponse.json(
      {
        success: true,
        message: "Hizmet başarıyla oluşturuldu",
        data: { id: result.insertId },
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("❌ Hizmet oluşturma hatası:", error);
    const err = error as { code?: string; sqlMessage?: string; message?: string; errno?: number };
    
    let errorMessage = err.sqlMessage || err.message || "Hizmet oluşturulurken hata oluştu";
    
    if (err.code === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED')) {
      errorMessage = "Veritabanı bağlantısı kurulamadı. Docker MySQL container'ının çalıştığından emin olun.";
    }
    
    if (err.code === 'ER_NO_SUCH_TABLE' || errorMessage.includes("doesn't exist")) {
      errorMessage = "metod_services tablosu bulunamadı. Lütfen migration script'ini çalıştırın: directadmin-setup.sql";
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

