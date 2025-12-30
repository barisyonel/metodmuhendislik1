import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "change-me-in-production-please-use-strong-secret";

export interface TokenPayload {
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * JWT token oluşturur
 * @param username - Kullanıcı adı
 * @returns JWT token string
 */
export function generateToken(username: string): string {
  if (!JWT_SECRET || JWT_SECRET === "change-me-in-production-please-use-strong-secret") {
    console.warn("⚠️ JWT_SECRET environment variable ayarlanmamış! Production'da mutlaka ayarlayın!");
  }

  return jwt.sign(
    { 
      username,
      iat: Math.floor(Date.now() / 1000),
    },
    JWT_SECRET,
    { 
      expiresIn: "7d", // 7 gün geçerli
      issuer: "metod-muhendislik",
      audience: "metod-admin-panel",
    }
  );
}

/**
 * JWT token'ı doğrular
 * @param token - Doğrulanacak JWT token
 * @returns Token payload veya null (geçersizse)
 */
export function verifyToken(token: string): TokenPayload | null {
  if (!token || typeof token !== "string") {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "metod-muhendislik",
      audience: "metod-admin-panel",
    }) as TokenPayload;

    return decoded;
  } catch {
    // Token geçersiz, süresi dolmuş veya imza hatalı
    return null;
  }
}

/**
 * Token'dan kullanıcı adını çıkarır
 * @param token - JWT token
 * @returns Kullanıcı adı veya null
 */
export function getUsernameFromToken(token: string): string | null {
  const payload = verifyToken(token);
  return payload?.username || null;
}

