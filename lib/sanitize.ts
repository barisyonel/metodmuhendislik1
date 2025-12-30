/**
 * HTML içeriğini temizler ve XSS saldırılarına karşı korur
 * Basit ama etkili HTML sanitization
 * @param dirty - Temizlenecek HTML string
 * @returns Temizlenmiş HTML string
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }

  // İzin verilen HTML tag'leri
  const allowedTags = ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6"];
  const allowedAttrs = ["href", "target", "rel"];

  // Tehlikeli karakterleri ve script'leri kaldır
  let cleaned = dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Script tag'lerini kaldır
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "") // Iframe tag'lerini kaldır
    .replace(/javascript:/gi, "") // javascript: protokolünü kaldır
    .replace(/on\w+\s*=/gi, ""); // Event handler'ları kaldır (onclick, onerror, vb.)

  // İzin verilen tag'ler dışındaki tüm tag'leri kaldır
  const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  cleaned = cleaned.replace(tagPattern, (match, tagName) => {
    const lowerTag = tagName.toLowerCase();
    if (allowedTags.includes(lowerTag)) {
      // İzin verilen tag, ama attribute'ları temizle
      let cleanedTag = `<${lowerTag}`;
      // Sadece izin verilen attribute'ları koru
      const attrPattern = /\s+(\w+)(?:=(["'])(.*?)\2)?/gi;
      let attrMatch;
      while ((attrMatch = attrPattern.exec(match)) !== null) {
        const attrName = attrMatch[1].toLowerCase();
        if (allowedAttrs.includes(attrName)) {
          const attrValue = attrMatch[3] || "";
          // URL attribute'larını kontrol et
          if (attrName === "href" || attrName === "src") {
            if (attrValue.startsWith("http://") || attrValue.startsWith("https://") || attrValue.startsWith("mailto:") || attrValue.startsWith("tel:")) {
              cleanedTag += ` ${attrName}="${attrValue}"`;
            }
          } else {
            cleanedTag += ` ${attrName}${attrMatch[2] ? `="${attrValue}"` : ""}`;
          }
        }
      }
      cleanedTag += match.includes("/>") ? " />" : ">";
      return cleanedTag;
    }
    return ""; // İzin verilmeyen tag'leri kaldır
  });

  return cleaned;
}

/**
 * Kullanıcı girdisini temizler (HTML tag'leri ve JavaScript kodlarını kaldırır)
 * @param input - Temizlenecek string
 * @returns Temizlenmiş string
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(/[<>]/g, "") // < ve > karakterlerini kaldır
    .replace(/javascript:/gi, "") // javascript: protokolünü kaldır
    .replace(/on\w+=/gi, "") // event handler'ları kaldır (onclick, onerror, vb.)
    .replace(/data:/gi, "") // data: protokolünü kaldır
    .replace(/vbscript:/gi, "") // vbscript: protokolünü kaldır
    .trim();
}

/**
 * URL'i güvenli hale getirir
 * @param url - Kontrol edilecek URL
 * @returns Güvenli URL veya boş string
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    
    // Sadece güvenli protokollere izin ver
    const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return "";
    }

    return parsedUrl.toString();
  } catch {
    // Geçersiz URL ise boş string döndür
    return "";
  }
}

/**
 * SQL injection'a karşı koruma (basit kontrol)
 * @param input - Kontrol edilecek string
 * @returns Güvenli string
 */
export function sanitizeSql(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Tehlikeli SQL karakterlerini kaldır veya escape et
  return input
    .replace(/['";\\]/g, "") // SQL injection karakterlerini kaldır
    .replace(/--/g, "") // SQL comment'lerini kaldır
    .replace(/\/\*/g, "") // SQL comment başlangıcını kaldır
    .replace(/\*\//g, ""); // SQL comment bitişini kaldır
}

