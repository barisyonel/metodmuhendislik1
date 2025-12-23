import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("metod_admin_token");
  
  if (!token) {
    return false;
  }

  // Token doğrulama (basit kontrol, production'da daha güvenli olmalı)
  try {
    const decoded = Buffer.from(token.value, "base64").toString("utf-8");
    // Token geçerli mi kontrol et
    return decoded.includes(":");
  } catch {
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("metod_admin_token");
}

