import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import { authSchema } from "@/lib/validation";
import { sanitizeInput } from "@/lib/sanitize";
import { handleApiError, ValidationError, AuthenticationError } from "@/lib/errors";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from "@/lib/constants";

// Force dynamic rendering because we use cookies
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Input sanitization
    const sanitizedBody = {
      username: sanitizeInput(body.username || ""),
      password: body.password || "", // Password sanitize edilmez, hash'lenir
    };

    // Zod validation
    const validationResult = authSchema.safeParse(sanitizedBody);
    
    if (!validationResult.success) {
      const fields: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path.join(".");
        fields[field] = issue.message;
      });
      
      throw new ValidationError("Kullanıcı adı ve şifre gereklidir", fields);
    }

    const { username, password } = validationResult.data;

    // Admin doğrulama
    const isValid = await verifyAdmin(username, password);

    if (!isValid) {
      throw new AuthenticationError("Kullanıcı adı veya şifre hatalı!");
    }

    // JWT token oluştur
    const token = generateToken(username);
    
    // Cookie'ye kaydet
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_COOKIE_MAX_AGE,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Giriş başarılı",
    });
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

