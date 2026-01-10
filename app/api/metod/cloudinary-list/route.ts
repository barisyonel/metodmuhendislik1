import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = 'force-dynamic';

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkkd4jvyk",
  api_key: process.env.CLOUDINARY_API_KEY || "527393514682555",
  api_secret: process.env.CLOUDINARY_API_SECRET || "cabyJPZK6kJosJEd6PPLwR0jVco",
});

export async function GET(request: NextRequest) {
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
    const folder = searchParams.get("folder") || "metod-muhendislik";
    const maxResults = parseInt(searchParams.get("max_results") || "50");
    const nextCursor = searchParams.get("next_cursor") || undefined;

    try {
      // Cloudinary'den görselleri listele
      // Resources API kullan (daha güvenilir)
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: folder,
        max_results: maxResults,
        next_cursor: nextCursor || undefined,
      });

      // Görselleri formatla
      interface CloudinaryResource {
        public_id: string;
        secure_url: string;
        width?: number;
        height?: number;
        format?: string;
        bytes?: number;
        created_at?: string;
        folder?: string;
      }
      const images = (result.resources || []).map((resource: CloudinaryResource) => ({
        public_id: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        bytes: resource.bytes,
        created_at: resource.created_at,
        folder: resource.folder || folder,
      }));

      return NextResponse.json({
        success: true,
        images,
        next_cursor: result.next_cursor || null,
        total_count: result.total_count || images.length,
      });
    } catch (apiError: unknown) {
      console.error("Cloudinary API error:", apiError);
      const err = apiError as { message?: string; http_code?: number };
      // Daha detaylı hata mesajı
      const errorMessage = err.message || err.http_code
        ? `Cloudinary API hatası: ${err.message || `HTTP ${err.http_code}`}`
        : "Görseller listelenirken hata oluştu";
      
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          details: process.env.NODE_ENV === "development" ? apiError : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Cloudinary list error:", error);
    const err = error as { message?: string };
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Görseller listelenirken hata oluştu",
      },
      { status: 500 }
    );
  }
}
