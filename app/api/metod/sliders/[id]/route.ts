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
}

// Slider güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, description, image_url, video_url, link, color, sort_order, is_active } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { success: false, message: "Başlık ve görsel URL gerekli" },
        { status: 400 }
      );
    }

    await query(
      `UPDATE hero_sliders 
       SET title = ?, subtitle = ?, description = ?, image_url = ?, video_url = ?, link = ?, color = ?, sort_order = ?, is_active = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        subtitle || "",
        description || "",
        image_url,
        video_url || null,
        link || "",
        color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        sort_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Slider başarıyla güncellendi",
    });
  } catch (error) {
    console.error("Slider güncelleme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Slider güncellenirken hata oluştu",
      },
      { status: 500 }
    );
  }
}

// Slider sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await query("DELETE FROM hero_sliders WHERE id = ?", [id]);

    return NextResponse.json({
      success: true,
      message: "Slider başarıyla silindi",
    });
  } catch (error) {
    console.error("Slider silme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Slider silinirken hata oluştu",
      },
      { status: 500 }
    );
  }
}


