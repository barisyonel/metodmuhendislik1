import { cookies } from "next/headers";
import { verifyToken, getUsernameFromToken } from "./jwt";
import { SESSION_COOKIE_NAME } from "./constants";

/**
 * Kullanıcının authenticated olup olmadığını kontrol eder
 * @returns true eğer kullanıcı authenticated ise
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!token || !token.value) {
      return false;
    }

    // JWT token doğrulama
    const payload = verifyToken(token.value);
    
    if (!payload || !payload.username) {
      return false;
    }
    
    return true;
  } catch {
    // Hata durumunda false döndür
    return false;
  }
}

/**
 * Token'dan kullanıcı adını alır
 * @returns Kullanıcı adı veya null
 */
export async function getCurrentUser(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!token || !token.value) {
      return null;
    }

    return getUsernameFromToken(token.value);
  } catch {
    return null;
  }
}

/**
 * Kullanıcıyı logout eder
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

