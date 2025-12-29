import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

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

// Tüm slider'ları getir
export async function GET() {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders ORDER BY sort_order ASC, id ASC"
    );

    return NextResponse.json({
      success: true,
      data: Array.isArray(sliders) ? sliders : [],
    });
  } catch (error) {
    console.error("Slider yükleme hatası:", error);
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
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, subtitle, description, image_url, video_url, link, color, sort_order, is_active } = body;

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Görsel URL gerekli" },
        { status: 400 }
      );
    }

    // Başlık yoksa basit bir başlık oluştur
    const finalTitle = title || "Slider";

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

    return NextResponse.json({
      success: true,
      message: "Slider başarıyla oluşturuldu",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Slider oluşturma hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Slider oluşturulurken hata oluştu",
      },
      { status: 500 }
    );
  }
}


