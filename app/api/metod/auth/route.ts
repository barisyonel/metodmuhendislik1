import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Input validation
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: "Kullanıcı adı ve şifre gereklidir",
        },
        { status: 400 }
      );
    }

    // Admin doğrulama
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
  } catch (error: unknown) {
    console.error("Auth error:", error);
    const err = error as { message?: string };
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Bir hata oluştu",
      },
      { status: 500 }
    );
  }
}

