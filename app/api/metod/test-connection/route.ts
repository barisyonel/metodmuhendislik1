import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Static export sırasında undefined olmalı (API route'lar static export'ta çalışmaz)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Basit bir test sorgusu
    const result = await query<Array<{ test: number; current_time: string }>>(
      "SELECT 1 as test, NOW() as current_time"
    );
    
    // Ürün sayısını kontrol et
    const products = await query<Array<{ count: number }>>(
      "SELECT COUNT(*) as count FROM products WHERE (is_active = TRUE OR is_active = 1)"
    );
    
    // Slider sayısını kontrol et
    const sliders = await query<Array<{ count: number }>>(
      "SELECT COUNT(*) as count FROM hero_sliders WHERE (is_active = TRUE OR is_active = 1)"
    );
    
    return NextResponse.json({
      success: true,
      message: "Veritabanı bağlantısı başarılı",
      data: {
        connection: result[0],
        products: {
          active: products[0]?.count || 0,
        },
        sliders: {
          active: sliders[0]?.count || 0,
        },
        env: {
          DB_HOST: process.env.DB_HOST || 'localhost',
          DB_PORT: process.env.DB_PORT || '3306',
          DB_USER: process.env.DB_USER || 'metodmuhendislik',
          DB_NAME: process.env.DB_NAME || 'metodmuhendislik_db',
          NODE_ENV: process.env.NODE_ENV || 'development',
          VERCEL: process.env.VERCEL || 'false',
        },
      },
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number; sqlMessage?: string };
    return NextResponse.json({
      success: false,
      message: "Veritabanı bağlantı hatası",
      error: {
        code: err.code || 'UNKNOWN',
        message: err.message || 'Connection failed',
        errno: err.errno,
        sqlMessage: err.sqlMessage,
      },
      env: {
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_USER: process.env.DB_USER || 'metodmuhendislik',
        DB_NAME: process.env.DB_NAME || 'metodmuhendislik_db',
        hasPassword: !!process.env.DB_PASSWORD,
        NODE_ENV: process.env.NODE_ENV || 'development',
        VERCEL: process.env.VERCEL || 'false',
      },
    }, { status: 500 });
  }
}


