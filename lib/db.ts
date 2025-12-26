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
    const [rows] = await pool.execute(sql, params || []);
    
    // mysql2 returns [RowDataPacket[], FieldPacket[]]
    // We need to cast rows to T
    return rows as T;
  } catch (error: unknown) {
    // MySQL hatalarını daha iyi yakalama
    let errorDetails: Record<string, unknown> = {};
    
    if (error instanceof Error) {
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
      
      // MySQL özel hata özelliklerini kontrol et
      const mysqlError = error as { code?: string; errno?: number; sqlState?: string; sqlMessage?: string; sql?: string };
      if (mysqlError.code) errorDetails.code = mysqlError.code;
      if (mysqlError.errno) errorDetails.errno = mysqlError.errno;
      if (mysqlError.sqlState) errorDetails.sqlState = mysqlError.sqlState;
      if (mysqlError.sqlMessage) errorDetails.sqlMessage = mysqlError.sqlMessage;
      if (mysqlError.sql) errorDetails.sql = mysqlError.sql;
    } else {
      // Error objesi değilse, direkt stringify et
      errorDetails = { rawError: error };
    }
    
    // Daha okunabilir hata mesajı
    const errorMessage = errorDetails.message || errorDetails.sqlMessage || 'Unknown database error';
    const errorCode = errorDetails.code || 'UNKNOWN';
    
    console.error('Database query error:', {
      code: errorCode,
      message: errorMessage,
      errno: errorDetails.errno,
      sqlState: errorDetails.sqlState,
      query: sql.substring(0, 200),
      params: params ? (Array.isArray(params) ? params.join(', ') : JSON.stringify(params)) : 'none',
      fullError: errorDetails,
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

