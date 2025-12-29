import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

// Tek bir hizmeti getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const services = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );
    
    if (services.length === 0) {
      return NextResponse.json(
        { success: false, message: "Hizmet bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: services[0] },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Service GET error:", error);
    return NextResponse.json(
      { success: false, message: "Hizmet yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Hizmet güncelle
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
    const { name, href, icon, description, sort_order, is_active } = body;

    if (!name || !href) {
      return NextResponse.json(
        { success: false, message: "İsim ve link gerekli" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE services SET name = ?, href = ?, icon = ?, description = ?, sort_order = ?, is_active = ? WHERE id = ?",
      [
        name,
        href,
        icon || "⚡",
        description || null,
        sort_order || 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Hizmet başarıyla güncellendi",
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Service PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Hizmet güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Hizmet sil
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
    await query("DELETE FROM services WHERE id = ?", [id]);

    return NextResponse.json(
      {
        success: true,
        message: "Hizmet başarıyla silindi",
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Service DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Hizmet silinirken hata oluştu" },
      { status: 500 }
    );
  }
}

