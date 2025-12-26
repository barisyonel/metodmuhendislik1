// MySQL Bağlantı Hazırlığı
// Bu dosya MySQL entegrasyonu için hazırlanmıştır
// mysql2 veya prisma gibi bir kütüphane kullanılabilir

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// MySQL bağlantı havuzu
let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'metodmuhendislik',
      password: process.env.DB_PASSWORD || 'metod2024!',
      database: process.env.DB_NAME || 'metodmuhendislik_db',
      port: parseInt(process.env.DB_PORT || '3307'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  try {
    const pool = getPool();
    // mysql2 execute metodu [rows, fields] tuple döner
    const [rows] = await pool.execute(sql, params || []) as [T, unknown[]];
    
    // mysql2 returns [RowDataPacket[], FieldPacket[]]
    // We need to cast rows to T
    return rows;
  } catch (error: unknown) {
    // MySQL hatalarını daha iyi yakalama
    let errorDetails: Record<string, unknown> = {};
    
    if (error instanceof Error) {
      errorDetails = {
        name: error.name,
        message: error.message || 'No error message provided',
        stack: error.stack,
      };
      
      // MySQL özel hata özelliklerini kontrol et
      // mysql2 hataları genellikle Error objesi olarak gelir ama ek özellikler içerir
      const mysqlError = error as Error & { 
        code?: string; 
        errno?: number; 
        sqlState?: string; 
        sqlMessage?: string; 
        sql?: string;
      };
      
      if (mysqlError.code) errorDetails.code = mysqlError.code;
      if (mysqlError.errno !== undefined) errorDetails.errno = mysqlError.errno;
      if (mysqlError.sqlState) errorDetails.sqlState = mysqlError.sqlState;
      if (mysqlError.sqlMessage) errorDetails.sqlMessage = mysqlError.sqlMessage;
      if (mysqlError.sql) errorDetails.sql = mysqlError.sql;
      
      // Eğer message boşsa, code veya sqlMessage'dan birini kullan
      if (!errorDetails.message || errorDetails.message === '') {
        errorDetails.message = mysqlError.sqlMessage || mysqlError.code || 'Database connection error';
      }
    } else {
      // Error objesi değilse, direkt stringify et
      errorDetails = { 
        rawError: String(error),
        message: 'Non-Error object thrown',
      };
    }
    
    // Daha okunabilir hata mesajı
    const errorMessage = (errorDetails.message as string) || (errorDetails.sqlMessage as string) || 'Unknown database error';
    const errorCode = (errorDetails.code as string) || 'UNKNOWN';
    
    console.error('Database query error:', {
      code: errorCode,
      message: errorMessage,
      errno: errorDetails.errno,
      sqlState: errorDetails.sqlState,
      query: sql.substring(0, 200),
      params: params ? (Array.isArray(params) ? params.join(', ') : JSON.stringify(params)) : 'none',
    });
    
    throw error;
  }
}

export async function getConnection() {
  return await getPool().getConnection();
}

// Admin kullanıcı kontrolü
export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  // MySQL entegrasyonu aktif değilse basit kontrol
  if (!process.env.DB_HOST) {
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "metod2024!";
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  }

  try {
    const pool = getPool();
    type AdminUser = { password: string; username: string };
    const [rows] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ? AND is_active = TRUE',
      [username]
    ) as [Array<AdminUser>, unknown];
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return false;
    }

    const user = rows[0];
    if (!user || typeof user.password !== 'string') {
      return false;
    }

    // Şifre kontrolü (bcryptjs)
    return bcrypt.compareSync(password, user.password);
  } catch (error) {
    console.error('Database error:', error);
    // Hata durumunda basit kontrol'e geri dön
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "metod2024!";
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  }
}

