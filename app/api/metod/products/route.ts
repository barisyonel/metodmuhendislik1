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
    return NextResponse.json(
      { success: true, data: products || [] },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
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
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
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

    console.log("📥 POST - Gelen veri:", {
      title,
      image,
      images,
      imagesType: typeof images,
      isArray: Array.isArray(images),
    });

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Başlık ve açıklama zorunludur" },
        { status: 400 }
      );
    }

    // images kolonu varsa kullan, yoksa image kullan
    // images zaten array veya JSON string olarak gelebilir
    let imagesJson: string = "";

    // Önce images'i kontrol et
    if (images !== undefined && images !== null) {
      // Eğer images zaten string ise (JSON), direkt kullan
      if (typeof images === 'string') {
        // JSON string ise, geçerli mi kontrol et
        try {
          const parsed = JSON.parse(images);
          if (Array.isArray(parsed) && parsed.length > 0) {
            imagesJson = images; // Geçerli JSON array
          } else {
            // Boş array veya geçersiz, image'den oluştur
            imagesJson = JSON.stringify([image || ""].filter(Boolean));
          }
        } catch {
          // Geçersiz JSON ise, array olarak yeniden oluştur
          imagesJson = JSON.stringify([image || ""].filter(Boolean));
        }
      } else if (Array.isArray(images)) {
        // Eğer array ise, JSON'a çevir
        const validImages = images.filter(img => img && typeof img === 'string' && img.trim() !== '');
        imagesJson = validImages.length > 0 ? JSON.stringify(validImages) : JSON.stringify([image || ""].filter(Boolean));
      } else {
        // Geçersiz tip ise, image'den oluştur
        imagesJson = JSON.stringify([image || ""].filter(Boolean));
      }
    } else if (image) {
      // Sadece image varsa, array olarak kaydet
      imagesJson = JSON.stringify([image]);
    } else {
      // Hiç görsel yoksa boş array
      imagesJson = JSON.stringify([]);
    }

    console.log("💾 POST - Images JSON kaydediliyor:", {
      imagesInput: images,
      imageInput: image,
      imagesJson: imagesJson,
      parsed: JSON.parse(imagesJson || '[]'),
    });

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
        console.log("✅ Ürün başarıyla eklendi (images kolonu ile). ID:", insertId);
      } catch (error: unknown) {
        // images kolonu yoksa önce eklemeyi dene
        if (isDatabaseError(error) && (error.code === 'ER_BAD_FIELD_ERROR' || error.sqlMessage?.includes('images'))) {
          console.warn("⚠️ images kolonu bulunamadı, ekleniyor...");
          try {
            // images kolonunu ekle
            await connection.execute(
              "ALTER TABLE products ADD COLUMN images TEXT NULL AFTER image"
            );
            console.log("✅ images kolonu eklendi, tekrar deniyor...");

            // Tekrar eklemeyi dene
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
            console.log("✅ Ürün başarıyla eklendi (images kolonu eklendikten sonra). ID:", insertId);
          } catch (alterError: unknown) {
            console.error("❌ images kolonu eklenirken hata:", alterError);
            // Kolon eklenemezse, sadece image ile kaydet
            try {
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
              console.warn("⚠️ Ürün eklendi ama images kolonu kullanılamadı. Sadece image kaydedildi.");
            } catch (err2: unknown) {
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

    // Eklenen ürünü tekrar çek ve görselleri kontrol et
    let insertedProduct = null;
    try {
      const [insertedRows] = await connection.execute(
        "SELECT * FROM products WHERE id = ?",
        [insertId]
      ) as [Array<Record<string, unknown>>, unknown];
      if (insertedRows && insertedRows.length > 0) {
        insertedProduct = insertedRows[0];
        console.log("✅ Eklenen ürün veritabanından çekildi:", {
          id: insertedProduct.id,
          title: insertedProduct.title,
          image: insertedProduct.image,
          images: insertedProduct.images,
          imagesParsed: insertedProduct.images ? JSON.parse(String(insertedProduct.images || '[]')) : [],
        });
      }
    } catch (checkError) {
      console.error("⚠️ Eklenen ürün kontrol edilirken hata:", checkError);
    } finally {
      connection.release();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ürün başarıyla eklendi",
        data: {
          id: insertId,
          images: imagesJson,
          imagesCount: JSON.parse(imagesJson || '[]').length,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
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
    const connection = await getConnection();
    try {
      try {
        // is_active ve sort_order desteği ekle
        await connection.execute(
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
        console.log("✅ Ürün güncellendi (images kolonu ile). ID:", id);
      } catch (error: unknown) {
        // images kolonu yoksa önce eklemeyi dene
        if (isDatabaseError(error) && (error.code === 'ER_BAD_FIELD_ERROR' || error.sqlMessage?.includes('images'))) {
          console.warn("⚠️ images kolonu bulunamadı, ekleniyor...");
          try {
            // images kolonunu ekle
            await connection.execute(
              "ALTER TABLE products ADD COLUMN images TEXT NULL AFTER image"
            );
            console.log("✅ images kolonu eklendi, tekrar deniyor...");

            // Tekrar güncellemeyi dene
            await connection.execute(
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
            console.log("✅ Ürün güncellendi (images kolonu eklendikten sonra). ID:", id);
          } catch (alterError: unknown) {
            console.error("❌ images kolonu eklenirken hata:", alterError);
            // Kolon eklenemezse, sadece image ile güncelle
            await connection.execute(
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
            console.warn("⚠️ Ürün güncellendi ama images kolonu kullanılamadı. Sadece image güncellendi.");
          }
        } else {
          throw error;
        }
      } finally {
        connection.release();
      }
    } catch (error: unknown) {
      connection.release();
      throw error;
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

