import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Force dynamic rendering
// Static export sırasında undefined olmalı (API route'lar static export'ta çalışmaz)
export const dynamic = 'force-dynamic';

// Veritabanı bağlantısını test et
export async function GET() {
  try {
    // Basit bir test sorgusu
    const result = await query("SELECT 1 as test");
    
    return NextResponse.json({
      success: true,
      message: "Veritabanı bağlantısı başarılı",
      data: result,
      env: {
        DB_HOST: process.env.DB_HOST || 'localhost (default)',
        DB_USER: process.env.DB_USER || 'metodmuhendislik (default)',
        DB_NAME: process.env.DB_NAME || 'metodmuhendislik_db (default)',
        DB_PORT: process.env.DB_PORT || '3307 (default)',
        hasPassword: !!process.env.DB_PASSWORD,
      },
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number; sqlMessage?: string };
    
    return NextResponse.json({
      success: false,
      message: "Veritabanı bağlantı hatası",
      error: {
        code: err.code,
        message: err.message,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
        fullError: String(error),
      },
      env: {
        DB_HOST: process.env.DB_HOST || 'localhost (default)',
        DB_USER: process.env.DB_USER || 'metodmuhendislik (default)',
        DB_NAME: process.env.DB_NAME || 'metodmuhendislik_db (default)',
        DB_PORT: process.env.DB_PORT || '3307 (default)',
        hasPassword: !!process.env.DB_PASSWORD,
      },
    }, { status: 500 });
  }
}

