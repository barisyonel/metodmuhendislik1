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
  } catch (error) {
    console.error("Projeler yükleme hatası:", error);
    // Hata durumunda boş array döndür
    return NextResponse.json({
      success: true,
      data: [],
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

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla oluşturuldu",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Proje oluşturma hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Proje oluşturulurken hata oluştu",
      },
      { status: 500 }
    );
  }
}


