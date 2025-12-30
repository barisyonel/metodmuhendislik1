import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Environment variables kontrol endpoint'i (sadece production'da güvenlik için gizli tutun)
export async function GET() {
  // Güvenlik: Sadece development veya özel bir secret ile erişilebilir
  const secret = process.env.ENV_CHECK_SECRET || 'dev-secret';
  const requestSecret = new URL(process.env.URL || 'http://localhost:3000').searchParams.get('secret');
  
  // Production'da secret kontrolü yap
  if (process.env.NODE_ENV === 'production' && requestSecret !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const envCheck = {
    hasDbHost: !!process.env.DB_HOST,
    dbHost: process.env.DB_HOST ? (process.env.DB_HOST.includes('localhost') || process.env.DB_HOST.includes('127.0.0.1') ? '❌ LOCALHOST (Vercel\'de çalışmaz!)' : '✅ Remote host') : '❌ Eksik',
    hasDbUser: !!process.env.DB_USER,
    hasDbPassword: !!process.env.DB_PASSWORD,
    hasDbName: !!process.env.DB_NAME,
    dbPort: process.env.DB_PORT || '3306',
    dbSsl: process.env.DB_SSL || 'false',
    isVercel: process.env.VERCEL === '1',
    nodeEnv: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    vercelEnv: process.env.VERCEL_ENV,
  };

  return NextResponse.json({
    message: 'Environment Variables Check',
    status: envCheck.hasDbHost && !envCheck.dbHost.includes('LOCALHOST') ? 'ok' : 'error',
    details: envCheck,
    recommendations: [
      !envCheck.hasDbHost ? 'DB_HOST environment variable eksik' : null,
      envCheck.dbHost.includes('LOCALHOST') ? 'DB_HOST localhost olamaz! Remote MySQL kullanın (PlanetScale, Railway, AWS RDS)' : null,
      !envCheck.hasDbUser ? 'DB_USER environment variable eksik' : null,
      !envCheck.hasDbPassword ? 'DB_PASSWORD environment variable eksik' : null,
      !envCheck.hasDbName ? 'DB_NAME environment variable eksik' : null,
      envCheck.isVercel && envCheck.dbSsl === 'false' ? 'Vercel\'de DB_SSL=true ayarlanmalı (çoğu remote DB için gerekli)' : null,
    ].filter(Boolean),
  });
}

