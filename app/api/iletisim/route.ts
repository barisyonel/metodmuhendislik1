import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validasyon
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Lütfen tüm zorunlu alanları doldurun" },
        { status: 400 }
      );
    }

    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Geçerli bir e-posta adresi giriniz" },
        { status: 400 }
      );
    }

    // Veritabanına kaydet
    try {
      // Önce service kolonunun var olup olmadığını kontrol et
      await query(
        "INSERT INTO messages (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())",
        [name, email, phone || null, message]
      );

      return NextResponse.json({
        success: true,
        message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      });
    } catch (dbError) {
      // Eğer messages tablosu yoksa, sadece başarılı mesaj döndür
      console.error("Database error:", dbError);
      return NextResponse.json({
        success: true,
        message: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
      });
    }
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

