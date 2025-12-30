import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { query, getConnection } from "@/lib/db";

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
    let imagesJson: string = "";
    
    // Önce images'i kontrol et
    if (images) {
      if (typeof images === 'string') {
        // JSON string ise, geçerli mi kontrol et
        try {
          JSON.parse(images); // Validate JSON
          imagesJson = images;
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
    
    console.log("💾 UPDATE - Images JSON kaydediliyor:", {
      id,
      imagesInput: images,
      imageInput: image,
      imagesJson: imagesJson,
      parsed: JSON.parse(imagesJson || '[]'),
    });
    
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
        const err = error as { code?: string; sqlMessage?: string };
        if (err.code === 'ER_BAD_FIELD_ERROR' || err.sqlMessage?.includes('images')) {
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

    // Güncellenen ürünü tekrar çek ve görselleri kontrol et
    const checkConnection = await getConnection();
    try {
      const [updatedRows] = await checkConnection.execute(
        "SELECT * FROM products WHERE id = ?",
        [id]
      ) as [Array<Record<string, unknown>>, unknown];
      if (updatedRows && updatedRows.length > 0) {
        const updatedProduct = updatedRows[0];
        console.log("✅ Güncellenen ürün veritabanından çekildi:", {
          id: updatedProduct.id,
          title: updatedProduct.title,
          image: updatedProduct.image,
          images: updatedProduct.images,
          imagesParsed: updatedProduct.images ? JSON.parse(String(updatedProduct.images || '[]')) : [],
        });
      }
    } catch (checkError) {
      console.error("⚠️ Güncellenen ürün kontrol edilirken hata:", checkError);
    } finally {
      checkConnection.release();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ürün başarıyla güncellendi",
        data: {
          id: Number(id),
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
