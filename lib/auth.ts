import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("metod_admin_token");
    
    if (!token || !token.value) {
      console.log("Yetkilendirme hatası: Token bulunamadı");
      return false;
    }

    // Token doğrulama (basit kontrol, production'da daha güvenli olmalı)
    try {
      const decoded = Buffer.from(token.value, "base64").toString("utf-8");
      // Token geçerli mi kontrol et (username:timestamp formatında olmalı)
      const isValid = decoded.includes(":") && decoded.split(":").length === 2;
      
      if (!isValid) {
        console.log("Yetkilendirme hatası: Geçersiz token formatı");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Token decode hatası:", error);
      return false;
    }
  } catch (error) {
    console.error("Yetkilendirme kontrolü hatası:", error);
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("metod_admin_token");
}

