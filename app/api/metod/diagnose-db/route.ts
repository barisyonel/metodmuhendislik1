import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

/**
 * Detaylı veritabanı bağlantı tanılama endpoint'i
 * Vercel'den veritabanına bağlanamama sorununu tespit etmek için
 */
export async function GET() {
  const diagnostics: {
    timestamp: string;
    environment: {
      nodeEnv: string;
      vercel: string;
      dbHost: string;
      dbPort: string;
      dbUser: string;
      dbName: string;
      hasPassword: boolean;
      dbSsl: string;
      dbSslRejectUnauthorized: string;
    };
    connectionTests: Array<{
      test: string;
      status: 'success' | 'error' | 'warning';
      message: string;
      details?: unknown;
    }>;
    recommendations: string[];
  } = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'not set',
      vercel: process.env.VERCEL || 'not set',
      dbHost: process.env.DB_HOST || 'not set',
      dbPort: process.env.DB_PORT || 'not set',
      dbUser: process.env.DB_USER || 'not set',
      dbName: process.env.DB_NAME || 'not set',
      hasPassword: !!process.env.DB_PASSWORD,
      dbSsl: process.env.DB_SSL || 'not set',
      dbSslRejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED || 'not set',
    },
    connectionTests: [],
    recommendations: [],
  };

  // 1. Environment variables kontrolü
  if (!process.env.DB_HOST) {
    diagnostics.connectionTests.push({
      test: 'Environment Variables',
      status: 'error',
      message: 'DB_HOST eksik!',
    });
    diagnostics.recommendations.push('Vercel\'de DB_HOST environment variable\'ını ekleyin');
  } else if (process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1') {
    diagnostics.connectionTests.push({
      test: 'Environment Variables',
      status: 'error',
      message: 'DB_HOST localhost olamaz! Vercel\'de remote veritabanı gerekli.',
    });
    diagnostics.recommendations.push('DB_HOST\'u remote veritabanı adresi ile değiştirin (örn: mysql.metodmuhendislik.com)');
  } else {
    diagnostics.connectionTests.push({
      test: 'Environment Variables',
      status: 'success',
      message: 'Tüm gerekli environment variables mevcut',
    });
  }

  // 2. SSL ayarları kontrolü
  const useSSL = process.env.DB_SSL === 'true' || (process.env.VERCEL === '1' && process.env.NODE_ENV === 'production');
  if (process.env.VERCEL === '1' && process.env.DB_SSL !== 'true') {
    diagnostics.connectionTests.push({
      test: 'SSL Configuration',
      status: 'warning',
      message: 'Vercel\'de DB_SSL=false ama kod otomatik SSL açıyor. Bu çelişkiye neden olabilir.',
    });
    diagnostics.recommendations.push('Vercel\'de DB_SSL=true olarak ayarlayın veya kod mantığını düzeltin');
  }

  // 3. Gerçek bağlantı testi
  try {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = parseInt(process.env.DB_PORT || '3306');
    const dbUser = process.env.DB_USER || 'metodmuhendislik';
    const dbPassword = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'metodmuhendislik_db';

    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      connectTimeout: 10000, // 10 saniye timeout
      ...(useSSL ? {
        ssl: {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
        }
      } : {}),
    });

    // Basit sorgu testi
    const [rows] = await connection.query('SELECT 1 as test, NOW() as current_time');

    diagnostics.connectionTests.push({
      test: 'Database Connection',
      status: 'success',
      message: 'Veritabanı bağlantısı başarılı!',
      details: rows,
    });

    await connection.end();
  } catch (error: unknown) {
    const err = error as {
      code?: string;
      message?: string;
      errno?: number;
      sqlState?: string;
      sqlMessage?: string;
    };

    let errorType = 'Unknown error';
    let recommendation = '';

    if (err.code === 'ECONNREFUSED') {
      errorType = 'Connection Refused - Veritabanı sunucusu bağlantıyı reddetti';
      recommendation = '1. Veritabanı sunucusunun çalıştığından emin olun\n2. Firewall/IP whitelist kontrolü yapın\n3. Vercel\'in IP\'lerine erişim izni verin';
    } else if (err.code === 'ETIMEDOUT') {
      errorType = 'Connection Timeout - Bağlantı zaman aşımına uğradı';
      recommendation = '1. Veritabanı sunucusunun erişilebilir olduğundan emin olun\n2. Firewall ayarlarını kontrol edin\n3. DB_HOST adresinin doğru olduğundan emin olun';
    } else if (err.code === 'ENOTFOUND') {
      errorType = 'Host Not Found - DB_HOST adresi bulunamadı';
      recommendation = '1. DB_HOST adresinin doğru olduğundan emin olun\n2. DNS çözümlemesi yapılabildiğini kontrol edin\n3. www.metodmuhendislik.com yerine mysql.metodmuhendislik.com gibi bir adres gerekebilir';
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR' || err.errno === 1045) {
      errorType = 'Access Denied - Kullanıcı adı veya şifre hatalı';
      recommendation = '1. DB_USER ve DB_PASSWORD değerlerini kontrol edin\n2. MySQL kullanıcısının remote host\'tan bağlanma izni olduğundan emin olun\n3. Kullanıcı izinlerini kontrol edin: GRANT ALL PRIVILEGES ON database.* TO user@\'%\' IDENTIFIED BY \'password\';';
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      errorType = 'Database Not Found - Veritabanı bulunamadı';
      recommendation = '1. DB_NAME değerinin doğru olduğundan emin olun\n2. Veritabanının var olduğunu kontrol edin';
    }

    diagnostics.connectionTests.push({
      test: 'Database Connection',
      status: 'error',
      message: `${errorType}: ${err.message || 'Connection failed'}`,
      details: {
        code: err.code,
        errno: err.errno,
        sqlState: err.sqlState,
        sqlMessage: err.sqlMessage,
      },
    });

    if (recommendation) {
      diagnostics.recommendations.push(recommendation);
    }
  }

  // 4. Host adresi analizi
  if (process.env.DB_HOST) {
    const host = process.env.DB_HOST;
    if (host.includes('www.')) {
      diagnostics.connectionTests.push({
        test: 'Host Address',
        status: 'warning',
        message: 'DB_HOST www. ile başlıyor - Bu genellikle web sitesi adresidir, MySQL host adresi değil',
      });
      diagnostics.recommendations.push('DB_HOST genellikle mysql.metodmuhendislik.com veya direkt IP adresi olmalıdır. Hosting sağlayıcınızdan MySQL host adresini öğrenin');
    }
  }

  return NextResponse.json(diagnostics, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

