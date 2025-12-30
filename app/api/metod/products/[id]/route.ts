import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query } from "@/lib/db";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

// Tek bir ürünü getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await query<Array<Record<string, unknown>>>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    
    if (products.length === 0) {
      return NextResponse.json(
        { success: false, message: "Ürün bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: products[0] },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Product GET error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Ürün güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Kimlik doğrulama kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, image, images, category, link, is_active, sort_order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    // images kolonu varsa kullan, yoksa image kullan
    let imagesJson: string;
    if (images) {
      if (typeof images === 'string') {
        imagesJson = images;
      } else if (Array.isArray(images)) {
        imagesJson = JSON.stringify(images);
      } else {
        imagesJson = "";
      }
    } else if (image) {
      imagesJson = JSON.stringify([image]);
    } else {
      imagesJson = "";
    }
    
    const finalImage = image || "";

    // images kolonunu kontrol et ve güncelle (eğer yoksa)
    try {
      // is_active ve sort_order desteği ekle
      await query(
        "UPDATE products SET title = ?, description = ?, image = ?, images = ?, category = ?, link = ?, is_active = ?, sort_order = ? WHERE id = ?",
        [
          title, 
          description, 
          finalImage, 
          imagesJson, 
          category || "", 
          link || "",
          is_active !== undefined ? (is_active ? 1 : 0) : 1,
          sort_order !== undefined ? sort_order : 0,
          id
        ]
      );
    } catch (error: unknown) {
      // images kolonu yoksa sadece image kullan
      const err = error as { code?: string; sqlMessage?: string };
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.sqlMessage?.includes('images')) {
        try {
          // is_active ve sort_order ile dene
          await query(
            "UPDATE products SET title = ?, description = ?, image = ?, category = ?, link = ?, is_active = ?, sort_order = ? WHERE id = ?",
            [
              title, 
              description, 
              finalImage, 
              category || "", 
              link || "",
              is_active !== undefined ? (is_active ? 1 : 0) : 1,
              sort_order !== undefined ? sort_order : 0,
              id
            ]
          );
        } catch (err2: unknown) {
          // is_active ve sort_order yoksa eski formatı kullan
          const err2Obj = err2 as { code?: string; sqlMessage?: string };
          if (err2Obj.code === 'ER_BAD_FIELD_ERROR' || err2Obj.sqlMessage?.includes('is_active') || err2Obj.sqlMessage?.includes('sort_order')) {
            await query(
              "UPDATE products SET title = ?, description = ?, image = ?, category = ?, link = ? WHERE id = ?",
              [title, description, finalImage, category || "", link || "", id]
            );
          } else {
            throw err2;
          }
        }
      } else {
        throw error;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ürün başarıyla güncellendi",
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Product PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// Ürün sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Kimlik doğrulama kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await query("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json(
      {
        success: true,
        message: "Ürün başarıyla silindi",
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error("Product DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Ürün silinirken hata oluştu" },
      { status: 500 }
    );
  }
}
