import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

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

    await query(
      `UPDATE projects 
       SET title = ?, description = ?, image_url = ?, category = ?, client_name = ?, location = ?, project_date = ?, sort_order = ?, is_active = ?, updated_at = NOW()
       WHERE id = ?`,
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

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla güncellendi",
    });
  } catch (error) {
    console.error("Proje güncelleme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Proje güncellenirken hata oluştu",
      },
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
  } catch (error) {
    console.error("Proje silme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Proje silinirken hata oluştu",
      },
      { status: 500 }
    );
  }
}


