import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Tek bir projeyi getir (Public API - yetkilendirme gerekmez)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projects = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );
    
    if (projects.length === 0) {
      return NextResponse.json(
        { success: false, message: "Proje bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: projects[0] });
  } catch (error: unknown) {
    console.error("Project GET error:", error);
    return NextResponse.json(
      { success: false, message: "Proje yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Proje güncelle
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

    // images kolonunu kontrol et ve güncelle (eğer yoksa)
    try {
      await query(
        "UPDATE projects SET title = ?, description = ?, image_url = ?, images = ?, category = ?, client_name = ?, location = ?, project_date = ?, sort_order = ?, is_active = ? WHERE id = ?",
        [
          title,
          description || "",
          image_url,
          imagesJson,
          category || "Genel",
          client_name || null,
          location || null,
          project_date || null,
          sort_order || 0,
          is_active !== undefined ? (is_active ? 1 : 0) : 1,
          id,
        ]
      );
    } catch (error: unknown) {
      // images kolonu yoksa sadece image_url kullan
      const err = error as { code?: string; sqlMessage?: string };
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.sqlMessage?.includes('images')) {
        await query(
          "UPDATE projects SET title = ?, description = ?, image_url = ?, category = ?, client_name = ?, location = ?, project_date = ?, sort_order = ?, is_active = ? WHERE id = ?",
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
            id,
          ]
        );
      } else {
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla güncellendi",
    });
  } catch (error: unknown) {
    console.error("Project PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Proje güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Proje sil
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
    await query("DELETE FROM projects WHERE id = ?", [id]);

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla silindi",
    });
  } catch (error: unknown) {
    console.error("Project DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Proje silinirken hata oluştu" },
      { status: 500 }
    );
  }
}
