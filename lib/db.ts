// MySQL Bağlantı Hazırlığı
// Bu dosya MySQL entegrasyonu için hazırlanmıştır
// mysql2 veya prisma gibi bir kütüphane kullanılabilir

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// MySQL bağlantı havuzu
let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    // Vercel'de localhost kullanılamaz - remote veritabanı gerekli
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = parseInt(process.env.DB_PORT || '3306');
    const dbUser = process.env.DB_USER || 'metodmuhendislik';
    const dbPassword = process.env.DB_PASSWORD || 'metod2024!';
    const dbName = process.env.DB_NAME || 'metodmuhendislik_db';
    
    // Production'da localhost kullanımını engelle
    if ((process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') && 
        (dbHost === 'localhost' || dbHost === '127.0.0.1')) {
      console.error('❌ HATA: Vercel/Production ortamında localhost kullanılamaz!');
      console.error('Lütfen remote bir MySQL veritabanı kullanın (PlanetScale, Railway, AWS RDS, vb.)');
      console.error('DB_HOST environment variable\'ını remote host adresi ile güncelleyin.');
    }
    
    // Development ortamında bağlantı bilgilerini logla (güvenlik için sadece development)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔌 Veritabanı bağlantı bilgileri:');
      console.log(`   Host: ${dbHost}`);
      console.log(`   Port: ${dbPort}`);
      console.log(`   User: ${dbUser}`);
      console.log(`   Database: ${dbName}`);
      console.log(`   Password: ${dbPassword ? '***' : 'YOK'}`);
    }
    
    // SSL ayarları
    // Local development için SSL kapalı, production/Vercel için açık
    const useSSL = process.env.DB_SSL === 'true' || (process.env.VERCEL === '1' && process.env.NODE_ENV === 'production');
    
    pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      port: dbPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
      connectTimeout: 60000,
      // SSL ayarları - Local development için false, production için true
      ssl: useSSL ? {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      } : false, // false olarak ayarla (undefined yerine) - MySQL SSL desteklemiyorsa
    });
    
    // Bağlantı kurulduğunda charset'i ayarla
    pool.on('connection', (connection: mysql.PoolConnection) => {
      connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
      connection.query("SET CHARACTER SET utf8mb4");
      connection.query("SET character_set_connection=utf8mb4");
    });
  }
  return pool;
}

// Bağlantı hatası loglama için throttle mekanizması
let lastConnectionErrorLog = 0;
const CONNECTION_ERROR_LOG_INTERVAL = 60000; // 60 saniyede bir log

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  try {
    const pool = getPool();
    // Her sorgudan önce charset'i ayarla - Türkçe karakter desteği için kritik
    await pool.execute("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
    await pool.execute("SET CHARACTER SET utf8mb4");
    await pool.execute("SET character_set_connection=utf8mb4");
    
    // mysql2 execute metodu [rows, fields] tuple döner
    const [rows] = await pool.execute(sql, params || []) as [T, unknown[]];
    
    // mysql2 returns [RowDataPacket[], FieldPacket[]]
    // We need to cast rows to T
    return rows;
  } catch (error: unknown) {
    // MySQL hatalarını daha iyi yakalama ve loglama
    let errorCode = 'UNKNOWN';
    let errorMessage = 'Unknown database error';
    let errno: number | undefined;
    let sqlState: string | undefined;
    let sqlMessage: string | undefined;
    
    if (error instanceof Error) {
      errorMessage = error.message || 'No error message provided';
      
      // MySQL özel hata özelliklerini kontrol et
      const mysqlError = error as Error & { 
        code?: string; 
        errno?: number; 
        sqlState?: string; 
        sqlMessage?: string; 
        sql?: string;
      };
      
      if (mysqlError.code) errorCode = mysqlError.code;
      if (mysqlError.errno !== undefined) errno = mysqlError.errno;
      if (mysqlError.sqlState) sqlState = mysqlError.sqlState;
      if (mysqlError.sqlMessage) sqlMessage = mysqlError.sqlMessage;
      
      // Eğer message boşsa, code veya sqlMessage'dan birini kullan
      if (!errorMessage || errorMessage.trim() === '') {
        errorMessage = sqlMessage || errorCode || 'Database connection error';
      }
    } else {
      errorMessage = String(error) || 'Non-Error object thrown';
    }
    
    // Production ortamında ve bağlantı hatalarında daha az detaylı log
    const isConnectionError = errorCode === 'ECONNREFUSED' || errorCode === 'ETIMEDOUT' || 
                              errorCode === 'ENOTFOUND' || errorCode === 'ER_ACCESS_DENIED_ERROR' ||
                              errno === -111 || errno === -61 || errno === 1045;
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    
    // Bağlantı hataları (hem production hem development için)
    if (isConnectionError) {
      // Bağlantı hatalarını throttle ile logla - spam'i önle
      const now = Date.now();
      if (now - lastConnectionErrorLog > CONNECTION_ERROR_LOG_INTERVAL) {
        lastConnectionErrorLog = now;
        // Production'da da hata logla (Vercel logs'da görünsün)
        if (isProduction) {
          console.error('❌ Database connection error:', {
            code: errorCode,
            message: errorMessage,
            errno: errno,
            env: {
              DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
              DB_PORT: process.env.DB_PORT || 'NOT SET',
              DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
              DB_NAME: process.env.DB_NAME ? 'SET' : 'MISSING',
              DB_SSL: process.env.DB_SSL || 'NOT SET',
              VERCEL: process.env.VERCEL || 'NOT SET',
            },
          });
        } else {
          // Development'ta detaylı log
          console.error('❌ Database connection error:', {
            code: errorCode,
            message: errorMessage,
            errno: errno,
            sqlState: sqlState,
            sqlMessage: sqlMessage,
          });
          console.error('💡 Veritabanı bağlantı bilgilerini kontrol edin:');
          console.error(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
          console.error(`   DB_PORT: ${process.env.DB_PORT || '3306'}`);
          console.error(`   DB_USER: ${process.env.DB_USER || 'metodmuhendislik'}`);
          console.error(`   DB_NAME: ${process.env.DB_NAME || 'metodmuhendislik_db'}`);
          console.error(`   DB_SSL: ${process.env.DB_SSL || 'false'}`);
        }
      }
    } else {
      // Gerçek hatalar için (bağlantı dışı) detaylı loglama
      const isDevelopment = process.env.NODE_ENV === 'development';
      if (isDevelopment || !isProduction) {
        console.error('❌ Database query error:');
        console.error('  Code:', errorCode);
        console.error('  Message:', errorMessage);
        if (errno !== undefined) console.error('  Errno:', errno);
        if (sqlState) console.error('  SQL State:', sqlState);
        if (sqlMessage) console.error('  SQL Message:', sqlMessage);
        console.error('  Query:', sql.substring(0, 200));
        console.error('  Params:', params ? (Array.isArray(params) ? params.join(', ') : JSON.stringify(params)) : 'none');
        if (error instanceof Error && error.stack) {
          console.error('  Stack:', error.stack);
        }
      } else {
        // Production'da gerçek hatalar için sadece özet log
        console.error('❌ Database query error:', errorCode, errorMessage);
      }
    }
    
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

