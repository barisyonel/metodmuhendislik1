import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

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

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Görsel URL gerekli" },
        { status: 400 }
      );
    }

    // Başlık yoksa basit bir başlık oluştur
    const finalTitle = title || "Slider";

    await query(
      `UPDATE hero_sliders 
       SET title = ?, subtitle = ?, description = ?, image_url = ?, video_url = ?, link = ?, color = ?, sort_order = ?, is_active = ?, updated_at = NOW()
       WHERE id = ?`,
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
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Slider başarıyla güncellendi",
    });
  } catch (error: unknown) {
    console.error("Slider güncelleme hatası:", error);
    const err = error as { code?: string; sqlMessage?: string; message?: string; errno?: number };
    console.error("Error details:", {
      code: err.code,
      sqlMessage: err.sqlMessage,
      message: err.message,
      errno: err.errno,
    });
    const errorMessage = err.sqlMessage || err.message || "Slider güncellenirken hata oluştu";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
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
  } catch (error: unknown) {
    console.error("Slider silme hatası:", error);
    const err = error as { code?: string; sqlMessage?: string; message?: string; errno?: number };
    console.error("Error details:", {
      code: err.code,
      sqlMessage: err.sqlMessage,
      message: err.message,
      errno: err.errno,
    });
    const errorMessage = err.sqlMessage || err.message || "Slider silinirken hata oluştu";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}


