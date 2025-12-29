import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

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

    // Dosya boyutu kontrolü (max 50MB - video için daha büyük)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Video boyutu 50MB'dan büyük olamaz" },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü - video formatları
    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Sadece MP4, WebM, OGG ve MOV formatları desteklenir" },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a dönüştür
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("Cloudinary'ye video yükleme başlıyor...");
    console.log("Video dosya bilgileri:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkkd4jvyk",
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
    });

    // Stream upload kullan (büyük video dosyaları için daha iyi)
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "metod-muhendislik/slider-videos",
          resource_type: "video",
          transformation: [
            { quality: "auto", fetch_format: "auto" },
          ],
          timeout: 120000, // 120 saniye timeout (video için daha uzun)
          chunk_size: 10000000, // 10MB chunk size
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

    console.log("Cloudinary video yükleme başarılı:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Video upload error:", error);
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
        message: err.message || "Video yüklenirken hata oluştu",
      },
      { status: 500 }
    );
  }
}

