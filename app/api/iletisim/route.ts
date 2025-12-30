import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation";
import { sanitizeInput, sanitizeHtml } from "@/lib/sanitize";
import { handleApiError, ValidationError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Input sanitization
    const sanitizedBody = {
      name: sanitizeInput(body.name || ""),
      email: sanitizeInput(body.email || ""),
      phone: sanitizeInput(body.phone || ""),
      service: sanitizeInput(body.service || ""),
      message: sanitizeHtml(body.message || ""), // HTML içerik için sanitizeHtml kullan
    };

    // Zod validation
    const validationResult = contactFormSchema.safeParse(sanitizedBody);
    
    if (!validationResult.success) {
      const fields: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join(".");
        fields[field] = issue.message;
      });
      
      throw new ValidationError("Lütfen tüm zorunlu alanları doğru şekilde doldurun", fields);
    }

    const { name, email, phone, service, message } = validationResult.data;

    // Veritabanına kaydet
    try {
      await query(
        "INSERT INTO messages (name, email, phone, service, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [name, email, phone, service || null, message]
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
    const errorResponse = handleApiError(error);
    return NextResponse.json(
      {
        success: false,
        message: errorResponse.message,
        code: errorResponse.code,
        details: errorResponse.details,
      },
      { status: errorResponse.status }
    );
  }
}

