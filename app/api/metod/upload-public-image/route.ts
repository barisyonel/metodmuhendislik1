import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

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

    const body = await request.json();
    const { imagePath } = body;

    if (!imagePath) {
      return NextResponse.json(
        { success: false, message: "Görsel yolu gerekli" },
        { status: 400 }
      );
    }

    // Public klasöründeki görseli oku
    const publicPath = path.join(process.cwd(), "public", imagePath);
    
    if (!fs.existsSync(publicPath)) {
      return NextResponse.json(
        { success: false, message: "Görsel bulunamadı" },
        { status: 404 }
      );
    }

    // Görseli oku
    const imageBuffer = fs.readFileSync(publicPath);
    const base64 = imageBuffer.toString("base64");
    const dataURI = `data:image/png;base64,${base64}`;

    // Cloudinary'ye yükle
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "metod-muhendislik/sliders",
      resource_type: "image",
      transformation: [
        { width: 1920, height: 1080, crop: "limit", quality: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    console.error("Public image upload error:", error);
    const err = error as { message?: string; http_code?: number };
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Görsel yüklenirken hata oluştu",
      },
      { status: 500 }
    );
  }
}

