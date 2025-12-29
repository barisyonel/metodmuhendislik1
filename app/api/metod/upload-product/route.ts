import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkkd4jvyk",
  api_key: process.env.CLOUDINARY_API_KEY || "527393514682555",
  api_secret: process.env.CLOUDINARY_API_SECRET || "cabyJPZK6kJosJEd6PPLwR0jVco",
});

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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Dosya boyutu 10MB'dan büyük olamaz" },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Sadece JPEG, PNG ve WebP formatları desteklenir" },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a dönüştür
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("Cloudinary'ye ürün görseli yükleme başlıyor...");
    console.log("Dosya bilgileri:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkkd4jvyk",
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
    });
    
    // Stream upload kullan (büyük dosyalar için daha iyi)
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "metod-muhendislik/products",
          resource_type: "image",
          transformation: [
            { width: 1200, height: 800, crop: "limit", quality: "auto" },
          ],
          timeout: 60000, // 60 saniye timeout
          chunk_size: 6000000, // 6MB chunk size
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("Cloudinary upload failed: No result returned"));
          }
        }
      ).end(buffer);
    }) as { secure_url: string; public_id: string };

    console.log("Cloudinary yükleme başarılı:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const err = error as { message?: string; http_code?: number };
    
    let errorMessage = "Görsel yüklenirken hata oluştu";
    let statusCode = 500;
    
    if (err.http_code) {
      errorMessage = err.message || "Cloudinary'ye yükleme başarısız oldu";
      statusCode = err.http_code >= 400 && err.http_code < 500 ? err.http_code : 500;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    if (errorMessage.includes("Invalid API Key") || errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
      errorMessage = "Cloudinary API anahtarı geçersiz. Lütfen .env dosyasını kontrol edin.";
    }
    
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: statusCode }
    );
  }
}

