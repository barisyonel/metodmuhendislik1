import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query, getConnection } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

// Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string;
  category?: string;
  link?: string;
  is_active?: boolean | number;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

// Database error interface
interface DatabaseError extends Error {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sqlState?: string;
}

// Type guard for DatabaseError
function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof Error && 'code' in error;
}

// Request body interfaces
interface ProductPostBody {
  title: string;
  description: string;
  image?: string;
  images?: string | string[];
  category?: string;
  link?: string;
  is_active?: boolean | number;
  sort_order?: number;
}

interface ProductPutBody extends ProductPostBody {
  id: number;
}

// Tüm ürünleri getir
export async function GET() {
  try {
    const products = await query<Product[]>(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, data: products || [] });
  } catch (error: unknown) {
    const err = isDatabaseError(error) ? error : { message: String(error) };
    console.error("❌ Products GET error:", {
      code: isDatabaseError(error) ? error.code : undefined,
      message: err.message,
      errno: isDatabaseError(error) ? error.errno : undefined,
      sqlMessage: isDatabaseError(error) ? error.sqlMessage : undefined,
      fullError: String(error),
    });

    let errorMessage = "Ürünler yüklenirken hata oluştu";
    if (isDatabaseError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
        errorMessage = "Veritabanı bağlantısı kurulamadı. Lütfen veritabanı sunucusunun çalıştığından emin olun.";
      } else if (error.code === 'ER_NO_SUCH_TABLE') {
        errorMessage = "Products tablosu bulunamadı. Lütfen migration script'ini çalıştırın.";
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        errorCode: isDatabaseError(error) ? error.code : undefined,
        errorDetails: process.env.NODE_ENV === 'development' && isDatabaseError(error) ? {
          code: error.code,
          message: error.message,
          errno: error.errno,
          sqlMessage: error.sqlMessage,
        } : undefined,
      },
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

    const body = await request.json() as ProductPostBody;
    const { title, description, image, images, category, link, is_active, sort_order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    // images kolonu varsa kullan, yoksa image kullan
    // images zaten array veya JSON string olarak gelebilir
    let imagesJson: string = "";
    if (images) {
      // Eğer images zaten string ise (JSON), direkt kullan
      if (typeof images === 'string') {
        imagesJson = images;
      } else if (Array.isArray(images)) {
        // Eğer array ise, JSON'a çevir
        imagesJson = JSON.stringify(images);
      } else {
        imagesJson = "";
      }
    } else if (image) {
      // Sadece image varsa, array olarak kaydet
      imagesJson = JSON.stringify([image]);
    } else {
      imagesJson = "";
    }
    
    const finalImage = image || "";

    // images kolonunu kontrol et ve ekle (eğer yoksa)
    let insertId: number = 0;
    const connection = await getConnection();
    try {
      try {
        // is_active ve sort_order desteği ekle
        const [result] = await connection.execute(
          "INSERT INTO products (title, description, image, images, category, link, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            title, 
            description, 
            finalImage, 
            imagesJson, 
            category || "", 
            link || "",
            is_active !== undefined ? (is_active ? 1 : 0) : 1,
            sort_order || 0
          ]
        );
        const resultHeader = result as ResultSetHeader;
        insertId = resultHeader.insertId;
      } catch (error: unknown) {
        // images kolonu yoksa sadece image kullan
        if (isDatabaseError(error) && (error.code === 'ER_BAD_FIELD_ERROR' || error.sqlMessage?.includes('images'))) {
          try {
            // is_active ve sort_order ile dene
            const [result] = await connection.execute(
              "INSERT INTO products (title, description, image, category, link, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                title, 
                description, 
                finalImage, 
                category || "", 
                link || "",
                is_active !== undefined ? (is_active ? 1 : 0) : 1,
                sort_order || 0
              ]
            );
            const resultHeader = result as ResultSetHeader;
            insertId = resultHeader.insertId;
          } catch (err2: unknown) {
            // is_active ve sort_order yoksa eski formatı kullan
            if (isDatabaseError(err2) && (err2.code === 'ER_BAD_FIELD_ERROR' || err2.sqlMessage?.includes('is_active') || err2.sqlMessage?.includes('sort_order'))) {
              const [result] = await connection.execute(
                "INSERT INTO products (title, description, image, category, link) VALUES (?, ?, ?, ?, ?)",
                [title, description, finalImage, category || "", link || ""]
              );
              const resultHeader = result as ResultSetHeader;
              insertId = resultHeader.insertId;
            } else {
              throw err2;
            }
          }
        } else {
          throw error;
        }
      }
    } finally {
      connection.release();
    }

    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla eklendi",
      data: { id: insertId },
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

    const body = await request.json() as ProductPutBody;
    const { id, title, description, image, images, category, link, is_active, sort_order } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { success: false, message: "ID, başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    // images kolonu varsa kullan, yoksa image kullan
    // images zaten array veya JSON string olarak gelebilir
    let imagesJson: string = "";
    if (images) {
      // Eğer images zaten string ise (JSON), direkt kullan
      if (typeof images === 'string') {
        imagesJson = images;
      } else if (Array.isArray(images)) {
        // Eğer array ise, JSON'a çevir
        imagesJson = JSON.stringify(images);
      } else {
        imagesJson = "";
      }
    } else if (image) {
      // Sadece image varsa, array olarak kaydet
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
      if (isDatabaseError(error) && (error.code === 'ER_BAD_FIELD_ERROR' || error.sqlMessage?.includes('images'))) {
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
          if (isDatabaseError(err2) && (err2.code === 'ER_BAD_FIELD_ERROR' || err2.sqlMessage?.includes('is_active') || err2.sqlMessage?.includes('sort_order'))) {
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

