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

    // Cloudinary'ye yükle - slider için özel klasör
    console.log("Cloudinary'ye yükleme başlıyor...");
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
    const uploadOptions = {
      folder: "metod-muhendislik/sliders",
      resource_type: "image" as const,
      transformation: [
        { width: 1920, height: 1080, crop: "limit", quality: "auto" },
      ],
      timeout: 60000, // 60 saniye timeout
      chunk_size: 6000000, // 6MB chunk size
    };

    // Base64 veya buffer olarak yükle
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      uploadOptions
    );

    console.log("Cloudinary yükleme başarılı:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    const err = error as { 
      message?: string; 
      http_code?: number;
      error?: { message?: string; http_code?: number };
      response?: { error?: { message?: string } };
    };
    
    // Cloudinary hatalarını daha iyi handle et
    let errorMessage = "Görsel yüklenirken hata oluştu";
    let statusCode = 500;
    
    if (err.http_code) {
      errorMessage = err.message || "Cloudinary'ye yükleme başarısız oldu";
      statusCode = err.http_code >= 400 && err.http_code < 500 ? err.http_code : 500;
    } else if (err.error?.http_code) {
      errorMessage = err.error.message || "Cloudinary'ye yükleme başarısız oldu";
      statusCode = err.error.http_code >= 400 && err.error.http_code < 500 ? err.error.http_code : 500;
    } else if (err.message) {
      errorMessage = err.message;
    } else if (err.response?.error?.message) {
      errorMessage = err.response.error.message;
    }
    
    // Cloudinary kimlik doğrulama hatası kontrolü
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


