import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  try {
  const cookieStore = await cookies();
  const token = cookieStore.get("metod_admin_token");
  
    if (!token || !token.value) {
    return false;
  }

  // Token doğrulama (basit kontrol, production'da daha güvenli olmalı)
  try {
    const decoded = Buffer.from(token.value, "base64").toString("utf-8");
      // Token geçerli mi kontrol et (username:timestamp formatında olmalı)
      const isValid = decoded.includes(":") && decoded.split(":").length === 2;
      
      if (!isValid) {
        return false;
      }
      
      return true;
    } catch (error) {
      // Token decode hatası - sessizce false döndür
      return false;
    }
  } catch (error) {
    // Dynamic server usage hatası - bu normal, sadece false döndür
    // Bu hata Next.js'in cookies() kullanımından kaynaklanıyor
    // ve route segment config'de dynamic = 'force-dynamic' ile çözülmeli
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("metod_admin_token");
}

