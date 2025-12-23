import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Admin doğrulama (MySQL entegrasyonu sonrası db.ts'den gelecek)
    const isValid = await verifyAdmin(username, password);

    if (isValid) {
      // Session token oluştur (production'da daha güvenli token kullanın)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      
      // Cookie'ye kaydet
      const cookieStore = await cookies();
      cookieStore.set("metod_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 gün
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Giriş başarılı",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Kullanıcı adı veya şifre hatalı!",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Bir hata oluştu",
      },
      { status: 500 }
    );
  }
}

