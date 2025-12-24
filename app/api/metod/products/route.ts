import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Tüm ürünleri getir
export async function GET() {
  try {
    const products = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, data: products || [] });
  } catch (error: unknown) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { success: false, message: "Ürünler yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Yeni ürün ekle
export async function POST(request: NextRequest) {
  try {
    // Kimlik doğrulama kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, image, category, link } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    const result = await query<{ insertId: number }>(
      "INSERT INTO products (title, description, image, category, link) VALUES (?, ?, ?, ?, ?)",
      [title, description, image || "", category || "", link || ""]
    );

    const insertResult = result as unknown as { insertId: number };
    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla eklendi",
      data: { id: insertResult?.insertId || 0 },
    });
  } catch (error: unknown) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün eklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Ürün güncelle
export async function PUT(request: NextRequest) {
  try {
    // Kimlik doğrulama kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, description, image, category, link } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { success: false, message: "ID, başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE products SET title = ?, description = ?, image = ?, category = ?, link = ? WHERE id = ?",
      [title, description, image || "", category || "", link || "", id]
    );

    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla güncellendi",
    });
  } catch (error: unknown) {
    console.error("Products PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Ürün sil
export async function DELETE(request: NextRequest) {
  try {
    // Kimlik doğrulama kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Ürün ID'si gerekli" },
        { status: 400 }
      );
    }

    await query("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla silindi",
    });
  } catch (error: unknown) {
    console.error("Products DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün silinirken hata oluştu" },
      { status: 500 }
    );
  }
}

