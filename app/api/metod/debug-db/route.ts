import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Detaylı veritabanı debug endpoint'i
export async function GET() {
  const debugInfo: {
    connection: { status: string; error?: string; details?: any };
    tables: { status: string; tables?: string[]; error?: string };
    testQueries: { [key: string]: { status: string; data?: any; error?: string } };
    env: { [key: string]: string | boolean };
  } = {
    connection: { status: 'checking' },
    tables: { status: 'checking' },
    testQueries: {},
    env: {
      DB_HOST: process.env.DB_HOST || 'localhost (default)',
      DB_USER: process.env.DB_USER || 'metodmuhendislik (default)',
      DB_NAME: process.env.DB_NAME || 'metodmuhendislik_db (default)',
      DB_PORT: process.env.DB_PORT || '3306 (default)',
      hasPassword: !!process.env.DB_PASSWORD,
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  };

  // 1. Bağlantı testi
  try {
    const testResult = await query("SELECT 1 as test, NOW() as current_time");
    debugInfo.connection = {
      status: 'success',
      details: testResult,
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number; sqlMessage?: string };
    debugInfo.connection = {
      status: 'error',
      error: `${err.code || 'UNKNOWN'}: ${err.message || 'Connection failed'}`,
      details: {
        code: err.code,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
      },
    };
    return NextResponse.json(debugInfo, { status: 500 });
  }

  // 2. Tabloları listele
  try {
    const tables = await query<Array<{ Tables_in_metodmuhendislik_db: string }>>(
      "SHOW TABLES"
    );
    debugInfo.tables = {
      status: 'success',
      tables: tables.map(t => Object.values(t)[0]),
    };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    debugInfo.tables = {
      status: 'error',
      error: `${err.code || 'UNKNOWN'}: ${err.message || 'Failed to list tables'}`,
    };
  }

  // 3. Her tablo için veri sayısını kontrol et
  const importantTables = ['hero_sliders', 'services', 'products', 'projects'];
  
  for (const table of importantTables) {
    try {
      const count = await query<Array<{ count: number }>>(
        `SELECT COUNT(*) as count FROM ${table}`
      );
      debugInfo.testQueries[table] = {
        status: 'success',
        data: { count: count[0]?.count || 0 },
      };
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string; sqlMessage?: string };
      if (err.code === 'ER_NO_SUCH_TABLE') {
        debugInfo.testQueries[table] = {
          status: 'error',
          error: 'Table does not exist',
        };
      } else {
        debugInfo.testQueries[table] = {
          status: 'error',
          error: `${err.code || 'UNKNOWN'}: ${err.message || 'Query failed'}`,
        };
      }
    }
  }

  return NextResponse.json(debugInfo);
}

