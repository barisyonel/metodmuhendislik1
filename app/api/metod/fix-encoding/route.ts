import { NextResponse } from "next/server";
import { query, getConnection } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// Force dynamic rendering
// Static export sırasında undefined olmalı (API route'lar static export'ta çalışmaz)
export const dynamic = 'force-dynamic';

// Double-encoded Türkçe karakterleri düzelt
export async function POST() {
  try {
    // Yetkilendirme kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const connection = await getConnection();
    let fixedCount = 0;

    try {
      // Önce bozuk karakterleri tespit et
      const products = await query<Array<{ id: number; title: string; description: string; category: string }>>(
        `SELECT id, title, description, category 
         FROM products 
         WHERE title LIKE '%Ã%' 
            OR title LIKE '%Ä%' 
            OR title LIKE '%Å%'
            OR description LIKE '%Ã%' 
            OR description LIKE '%Ä%' 
            OR description LIKE '%Å%'
            OR category LIKE '%Ã%' 
            OR category LIKE '%Ä%' 
            OR category LIKE '%Å%'`
      );

      if (products.length === 0) {
        return NextResponse.json({
          success: true,
          message: "Düzeltilecek kayıt bulunamadı",
          fixedCount: 0,
        });
      }

      // Her ürünü düzelt
      for (const product of products) {
        try {
          // Double-encoded karakterleri düzelt
          const fixedTitle = Buffer.from(product.title, 'latin1').toString('utf8');
          const fixedDescription = Buffer.from(product.description || '', 'latin1').toString('utf8');
          const fixedCategory = Buffer.from(product.category || '', 'latin1').toString('utf8');

          await connection.execute(
            `UPDATE products 
             SET title = ?, description = ?, category = ? 
             WHERE id = ?`,
            [fixedTitle, fixedDescription, fixedCategory, product.id]
          );

          fixedCount++;
        } catch (err) {
          console.error(`Ürün ${product.id} düzeltilirken hata:`, err);
        }
      }

      return NextResponse.json({
        success: true,
        message: `${fixedCount} ürün düzeltildi`,
        fixedCount,
        totalFound: products.length,
      });
    } finally {
      connection.release();
    }
  } catch (error: unknown) {
    console.error("Encoding düzeltme hatası:", error);
    const err = error as { code?: string; message?: string };
    
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Encoding düzeltilirken hata oluştu",
        errorCode: err.code,
      },
      { status: 500 }
    );
  }
}

// Bozuk karakterleri kontrol et (GET)
export async function GET() {
  try {
    // Yetkilendirme kontrolü
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const products = await query<Array<{ id: number; title: string; description: string; category: string }>>(
      `SELECT id, title, description, category 
       FROM products 
       WHERE title LIKE '%Ã%' 
          OR title LIKE '%Ä%' 
          OR title LIKE '%Å%'
          OR description LIKE '%Ã%' 
          OR description LIKE '%Ä%' 
          OR description LIKE '%Å%'
          OR category LIKE '%Ã%' 
          OR category LIKE '%Ä%' 
          OR category LIKE '%Å%'
       LIMIT 10`
    );

    return NextResponse.json({
      success: true,
      count: products.length,
      products: products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description?.substring(0, 100),
        category: p.category,
      })),
    });
  } catch (error: unknown) {
    console.error("Encoding kontrol hatası:", error);
    const err = error as { code?: string; message?: string };
    
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Encoding kontrol edilirken hata oluştu",
        errorCode: err.code,
      },
      { status: 500 }
    );
  }
}

