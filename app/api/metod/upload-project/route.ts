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

    // Base64'e dönüştür
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Cloudinary'ye yükle - projeler için özel klasör
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "metod-muhendislik/projects",
      resource_type: "image",
      transformation: [
        { width: 1200, height: 800, crop: "limit", quality: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const err = error as { message?: string; http_code?: number };
    // Cloudinary hatalarını daha iyi handle et
    if (err.http_code) {
      return NextResponse.json(
        {
          success: false,
          message: err.message || "Cloudinary'ye yükleme başarısız oldu",
        },
        { status: err.http_code >= 400 && err.http_code < 500 ? err.http_code : 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Görsel yüklenirken hata oluştu",
      },
      { status: 500 }
    );
  }
}


