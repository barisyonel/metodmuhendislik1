/**
 * SEO utility functions for generating meta tags
 */

/**
 * Generate SEO-friendly description from text
 */
export function generateSEODescription(
  description: string,
  maxLength: number = 160,
): string {
  if (!description) return "";

  // HTML tag'lerini temizle
  const cleanDescription = description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanDescription.length <= maxLength) {
    return cleanDescription;
  }

  // Son kelimeyi kesmemek için son boşluğa kadar al
  const truncated = cleanDescription.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Generate SEO-friendly keywords from title, category, and description
 */
export function generateSEOKeywords(
  title: string,
  category?: string,
  description?: string,
): string {
  const keywords: string[] = [];

  // Title'dan anahtar kelimeler
  if (title) {
    keywords.push(title);
    // Title'daki kelimeleri de ekle
    const titleWords = title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 5);
    keywords.push(...titleWords);
  }

  // Category ekle
  if (category) {
    keywords.push(category);
  }

  // Açıklamadan önemli kelimeler (opsiyonel)
  if (description) {
    const descWords = description
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 4)
      .slice(0, 5);
    keywords.push(...descWords);
  }

  // Genel anahtar kelimeler
  keywords.push(
    "Metod Mühendislik",
    "endüstriyel üretim",
    "mühendislik çözümleri",
  );

  // Tekrarları kaldır ve string'e çevir
  const uniqueKeywords = Array.from(new Set(keywords));
  return uniqueKeywords.join(", ");
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImage(imageUrl?: string | null): string {
  if (imageUrl && imageUrl.trim() !== "") {
    return imageUrl.trim();
  }
  // Fallback to default logo
  return "/logo.png";
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(
  path: string,
  baseUrl: string = "https://www.metodmuhendislik.com",
): string {
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  cleanPath = cleanPath.replace(/\/+$/, "") || "/"; // Trailing slash kaldır, tutarlılık için
  return `${baseUrl}${cleanPath}`;
}
