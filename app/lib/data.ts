// Server-side data fetching functions
// Bu fonksiyonlar server component'lerde direkt kullanılabilir
// API route'lara gerek yok!

import { query } from "@/lib/db";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string | string[] | null;
  category: string;
  link: string;
  is_active?: boolean | number;
  sort_order?: number;
}

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  link: string;
  color: string;
  is_active: boolean | number;
  sort_order: number;
}

interface Service {
  id: number;
  name: string;
  href: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean | number;
}

// Türkçe karakter encoding sorunlarını düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";

  try {
    // Double-encoded karakterleri kontrol et (Ã, Ä, Å)
    if (text.includes("Ã") || text.includes("Ä") || text.includes("Å")) {
      return Buffer.from(text, "latin1").toString("utf8");
    }

    // Önce Buffer decode dene (latin1 -> utf8)
    let decoded = text;
    try {
      decoded = Buffer.from(text, "latin1").toString("utf8");
      // Eğer decoded versiyonunda Türkçe karakterler varsa ve orijinal metinde yoksa kullan
      const turkishCharsInDecoded = /[ÜÇğşğıİĞŞÖöüçĞŞİ]/.test(decoded);
      const turkishCharsInOriginal = /[ÜÇğşğıİĞŞÖöüçĞŞİ]/.test(text);

      if (
        turkishCharsInDecoded &&
        !turkishCharsInOriginal &&
        decoded !== text
      ) {
        return decoded;
      }
    } catch {
      // Buffer decode başarısız olduysa devam et
    }

    // Manuel karakter düzeltmeleri - Daha agresif ve kapsamlı
    let fixed = text;

    // Özel karakterlerin temizlenmesi (◆, vb.) - Önce temizle
    fixed = fixed.replace(/[◆]/g, ""); // Görselde görülen ◆ karakterlerini kaldır

    // Yaygın encoding hatalarını düzelt (kelime sınırı olmadan, tüm string'de)
    // "Sretimi" -> "Üretimi" (S + retimi pattern - her yerde)
    fixed = fixed.replace(/Sretimi/gi, "Üretimi");
    fixed = fixed.replace(/Sretim/gi, "Üretim");
    fixed = fixed.replace(/Sretme/gi, "Üretme");

    // "Pano Sretimi" -> "Pano Üretimi" (özel pattern)
    fixed = fixed.replace(/Pano\s+Sretimi/gi, "Pano Üretimi");
    fixed = fixed.replace(/Pano\s+Sretim/gi, "Pano Üretim");

    // "!elik" veya "◆elik" -> "Çelik" (! veya ◆ + elik pattern)
    fixed = fixed.replace(/[!◆]elik/gi, "Çelik");
    fixed = fixed.replace(/Celik/gi, "Çelik"); // C -> Ç (başlangıçta)
    fixed = fixed.replace(/\bCelik\b/gi, "Çelik"); // Kelime sınırı ile

    // "Maxaza" -> "Mağaza" (Ma + x + aza pattern - her yerde)
    fixed = fixed.replace(/Maxaza/gi, "Mağaza");
    fixed = fixed.replace(/Ma\s+xaza/gi, "Mağaza"); // Boşluk varsa

    // "Srünleri" -> "Ürünleri" (S + rünleri pattern)
    fixed = fixed.replace(/Srünleri/gi, "Ürünleri");
    fixed = fixed.replace(/Srün/gi, "Ürün");
    fixed = fixed.replace(/Ve\s+Srünleri/gi, "Ve Ürünleri"); // "Ve Srünleri" -> "Ve Ürünleri"

    // "Konstruksiyon" -> "Konstrüksiyon" (u -> ü)
    fixed = fixed.replace(/Konstruksiyon/gi, "Konstrüksiyon");

    // Diğer yaygın hatalar
    fixed = fixed.replace(/Süretim/gi, "Üretim"); // Sü -> Ü (başlangıçta)
    fixed = fixed.replace(/Süretimi/gi, "Üretimi");

    // "Mağaza" için alternatif yazımlar
    fixed = fixed.replace(/Magaza/gi, "Mağaza"); // g -> ğ (a'dan sonra)
    fixed = fixed.replace(/\bMagaza\b/gi, "Mağaza"); // Kelime sınırı ile

    // Diğer Türkçe karakter hataları
    fixed = fixed.replace(/Süret/gi, "Üret"); // Genel pattern
    fixed = fixed.replace(/Srü/gi, "Ür"); // Genel pattern

    // Eğer düzeltme yapıldıysa döndür
    if (fixed !== text) {
      if (process.env.NODE_ENV === "development") {
        console.log(`🔧 fixTurkishEncoding: "${text}" -> "${fixed}"`);
      }
      return fixed;
    }

    return text;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ fixTurkishEncoding hatası:", error, "Text:", text);
    }
    return text;
  }
}

// Icon field'ı için emoji düzeltme fonksiyonu
// ÖNCELİK: Her zaman hizmet adına göre icon belirle (veritabanındaki icon'lar genelde yanlış/bozuk)
function fixIconEncoding(
  icon: string | null | undefined,
  serviceName: string = "",
): string {
  // Önce hizmet adına göre doğru icon'u belirle
  const nameBasedIcon = getIconByServiceName(serviceName);

  // Veritabanından gelen icon'u sadece referans olarak kontrol et
  if (icon && icon.trim() !== "") {
    const trimmedIcon = icon.trim();

    // Geçerli emoji karakterleri kontrol et
    const validEmojis = /[⚡🔧🔥🎨📦🏗️🔺📐🏭🔌💡⚙️🛠️📏🔨🎯✨]/.test(
      trimmedIcon,
    );

    // Bozuk encoding karakterleri kontrol et
    const brokenChars = [
      "â",
      "ši",
      "Δ",
      "Ϋ",
      "Ÿ",
      "Ž",
      "ї",
      "Ö",
      "¥",
      "◆",
      "!",
      "S",
    ];
    const hasBrokenEncoding = brokenChars.some((char) =>
      trimmedIcon.includes(char),
    );

    // Eğer icon geçerli bir emoji ise, bozuk encoding yoksa VE hizmet adına uygunsa kullan
    // Ancak çoğu durumda veritabanındaki icon'lar yanlış olduğu için her zaman nameBasedIcon kullan
    if (
      validEmojis &&
      !hasBrokenEncoding &&
      trimmedIcon.length <= 3 &&
      trimmedIcon === nameBasedIcon
    ) {
      return trimmedIcon;
    }
  }

  // Her durumda hizmet adına göre icon döndür (daha güvenilir)
  // Bu sayede her hizmetin kendine özgü icon'u olacak
  return nameBasedIcon;
}

// Hizmet adına göre emoji döndür
function getIconByServiceName(serviceName: string): string {
  const name = (serviceName || "").toLowerCase();

  // Daha spesifik kontrol - önce özel durumlar, sonra genel
  if (
    name.includes("elektrik") ||
    name.includes("pano") ||
    name.includes("marin")
  )
    return "⚡";
  if (
    name.includes("lazer") ||
    name.includes("kesim") ||
    name.includes("cnc lazer")
  )
    return "🔺";
  if (
    name.includes("büküm") ||
    name.includes("bukum") ||
    name.includes("cnc büküm") ||
    name.includes("cnc bukum")
  )
    return "📐";
  if (
    name.includes("kaynak") ||
    name.includes("welding") ||
    name.includes("metal kaynak")
  )
    return "🔥";
  if (
    name.includes("boya") ||
    name.includes("toz") ||
    name.includes("elektrostatik")
  )
    return "🎨";
  if (
    name.includes("raf") ||
    name.includes("mağaza") ||
    name.includes("magaza") ||
    name.includes("raf sistemleri")
  )
    return "📦";
  if (
    name.includes("konstrüksiyon") ||
    name.includes("konstruksiyon") ||
    name.includes("çelik") ||
    name.includes("celik") ||
    name.includes("steel")
  )
    return "🏗️";

  return "⚡"; // Default
}

// Ürünleri veritabanından direkt çek (Server Component için)
export async function getProducts(limit?: number): Promise<Product[]> {
  // Vercel build sırasında veritabanına bağlanmayı engelle (build timeout'larını önlemek için)
  if (process.env.VERCEL === "1") {
    const dbHost = process.env.DB_HOST;
    if (
      !dbHost ||
      dbHost === "SET" ||
      dbHost === "localhost" ||
      dbHost === "127.0.0.1" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(
        "⚠️ Vercel build: Ürünler için veritabanı bağlantısı atlanıyor (fallback kullanılacak)",
      );
      return [];
    }
  }

  try {
    const limitClause = limit ? `LIMIT ${limit}` : "";
    const products = await query<Product[]>(
      `SELECT * FROM products WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, created_at DESC ${limitClause}`,
    );
    const productsData = Array.isArray(products) ? products : [];

    if (productsData.length === 0) {
      console.warn("⚠️ Veritabanında aktif ürün bulunamadı");
      return [];
    }

    console.log(`✅ ${productsData.length} ürün başarıyla yüklendi`);

    return productsData.map((product) => ({
      ...product,
      title: fixTurkishEncoding(product.title),
      description: fixTurkishEncoding(product.description),
      category: fixTurkishEncoding(product.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Ürünler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });

    // Bağlantı hatası ise detaylı bilgi ver
    if (
      err.code === "ER_ACCESS_DENIED_ERROR" ||
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND"
    ) {
      console.error("💡 Veritabanı bağlantı bilgilerini kontrol edin:");
      console.error(`   DB_HOST: ${process.env.DB_HOST || "localhost"}`);
      console.error(`   DB_PORT: ${process.env.DB_PORT || "3306"}`);
      console.error(`   DB_USER: ${process.env.DB_USER || "metodmuhendislik"}`);
      console.error(
        `   DB_NAME: ${process.env.DB_NAME || "metodmuhendislik_db"}`,
      );
    }

    return [];
  }
}

// Slider'ları veritabanından direkt çek (Server Component için)
export async function getSliders(): Promise<Slider[]> {
  // Vercel build sırasında veritabanına bağlanmayı engelle (build timeout'larını önlemek için)
  if (process.env.VERCEL === "1") {
    const dbHost = process.env.DB_HOST;
    if (
      !dbHost ||
      dbHost === "SET" ||
      dbHost === "localhost" ||
      dbHost === "127.0.0.1" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(
        "⚠️ Vercel build: Slider'lar için veritabanı bağlantısı atlanıyor (fallback kullanılacak)",
      );
      return [];
    }
  }

  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, id ASC",
    );
    const slidersData = Array.isArray(sliders) ? sliders : [];

    if (slidersData.length === 0) {
      console.warn("⚠️ Veritabanında aktif slider bulunamadı");
      return [];
    }

    console.log(`✅ ${slidersData.length} slider başarıyla yüklendi`);

    return slidersData;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Slider'lar yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });

    // Bağlantı hatası ise detaylı bilgi ver
    if (
      err.code === "ER_ACCESS_DENIED_ERROR" ||
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND"
    ) {
      console.error("💡 Veritabanı bağlantı bilgilerini kontrol edin:");
      console.error(`   DB_HOST: ${process.env.DB_HOST || "localhost"}`);
      console.error(`   DB_PORT: ${process.env.DB_PORT || "3306"}`);
      console.error(`   DB_USER: ${process.env.DB_USER || "metodmuhendislik"}`);
      console.error(
        `   DB_NAME: ${process.env.DB_NAME || "metodmuhendislik_db"}`,
      );
    }

    return [];
  }
}

// Hizmetleri veritabanından direkt çek (Server Component için)
export async function getServices(): Promise<Service[]> {
  // Vercel build sırasında veritabanına bağlanmayı engelle (build timeout'larını önlemek için)
  // Vercel build ortamında static export yapılırken veritabanı bağlantısı timeout olabilir
  // Bu durumda hemen fallback return et, build'i bloklama
  if (process.env.VERCEL === "1") {
    // DB_HOST yoksa, 'SET' ise (placeholder), veya geçersizse hemen return et
    const dbHost = process.env.DB_HOST;
    if (
      !dbHost ||
      dbHost === "SET" ||
      dbHost === "localhost" ||
      dbHost === "127.0.0.1" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(
        "⚠️ Vercel build ortamında - veritabanı bağlantısı atlanıyor (fallback kullanılacak)",
      );
      return [];
    }
  }

  try {
    const services = await query<Service[]>(
      "SELECT * FROM metod_services WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC",
    );
    const servicesData = Array.isArray(services) ? services : [];

    if (servicesData.length === 0) {
      console.warn("⚠️ Veritabanında aktif hizmet bulunamadı veya timeout");
      return [];
    }

    console.log(`✅ ${servicesData.length} hizmet başarıyla yüklendi`);

    return servicesData.map((service) => {
      const originalName = service.name || "";
      const originalDescription = service.description || "";
      const originalIcon = service.icon || "";

      // Ham veriyi logla (development'ta)
      if (process.env.NODE_ENV === "development") {
        console.log("📥 Ham veritabanı verisi:", {
          id: service.id,
          name: originalName,
          nameBytes: Buffer.from(originalName).toString("hex"),
          description: originalDescription,
          icon: originalIcon,
        });
      }

      const fixedName = fixTurkishEncoding(originalName);
      const fixedDescription = originalDescription
        ? fixTurkishEncoding(originalDescription)
        : undefined;
      const fixedIcon = fixIconEncoding(originalIcon, fixedName);

      // Debug: Development'ta icon atamalarını logla
      if (process.env.NODE_ENV === "development") {
        if (originalIcon !== fixedIcon) {
          console.log(
            `🎨 Icon düzeltmesi: "${fixedName}" -> "${originalIcon}" -> "${fixedIcon}"`,
          );
        } else {
          console.log(`✅ Icon doğru: "${fixedName}" -> "${fixedIcon}"`);
        }
      }

      // href field'ını normalize et (Türkçe karakterleri İngilizce karşılıklarına çevir)
      let normalizedHref = service.href || "";
      if (
        normalizedHref.includes("üretimi") ||
        normalizedHref.includes("uretimi")
      ) {
        normalizedHref = normalizedHref
          .replace(/[üÜ]/g, "u")
          .replace(/[çÇ]/g, "c")
          .replace(/[ğĞ]/g, "g")
          .replace(/[şŞ]/g, "s")
          .replace(/[ıİ]/g, "i")
          .replace(/[öÖ]/g, "o");
      }
      // Eğer href hala Türkçe karakter içeriyorsa normalize et
      if (/[üçğışöÜÇĞIŞÖ]/.test(normalizedHref)) {
        const hrefMapping: { [key: string]: string } = {
          "/hizmetler/elektrik-pano-üretimi":
            "/hizmetler/elektrik-pano-uretime",
          "/hizmetler/elektrik-pano-uretimi":
            "/hizmetler/elektrik-pano-uretime",
          "/hizmetler/cnc-büküm": "/hizmetler/cnc-bukum",
          "/hizmetler/mağaza-raf-ve-ürünleri":
            "/hizmetler/magaza-raf-ve-urunleri",
          "/hizmetler/çelik-konstrüksiyon": "/hizmetler/celik-konstruksiyon",
        };
        normalizedHref =
          hrefMapping[normalizedHref] ||
          normalizedHref.replace(/[üçğışöÜÇĞIŞÖ]/g, (char) => {
            const map: { [key: string]: string } = {
              ü: "u",
              Ü: "U",
              ç: "c",
              Ç: "C",
              ğ: "g",
              Ğ: "G",
              ş: "s",
              Ş: "S",
              ı: "i",
              İ: "I",
              ö: "o",
              Ö: "O",
            };
            return map[char] || char;
          });
      }

      // Debug: Development'ta encoding düzeltmelerini logla
      if (process.env.NODE_ENV === "development") {
        if (originalName !== fixedName) {
          console.log(
            `✅ Name encoding düzeltmesi: "${originalName}" -> "${fixedName}"`,
          );
        }
        if (originalDescription && originalDescription !== fixedDescription) {
          console.log(
            `✅ Description encoding düzeltmesi: "${originalDescription}" -> "${fixedDescription}"`,
          );
        }
        if (service.href !== normalizedHref) {
          console.log(
            `✅ Href normalize düzeltmesi: "${service.href}" -> "${normalizedHref}"`,
          );
        }
      }

      return {
        ...service,
        name: fixedName,
        icon: fixedIcon,
        description: fixedDescription,
        href: normalizedHref,
      };
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };

    // Vercel build sırasında hata loglama (throttle ile spam'i önle)
    const isVercelBuild = process.env.VERCEL === "1";
    const isTimeout =
      err.code === "ETIMEDOUT" || err.message?.includes("timeout");

    if (!isVercelBuild || !isTimeout) {
      console.error("❌ Hizmetler yüklenirken hata:", {
        code: err.code,
        message: err.message,
        errno: err.errno,
      });
    } else {
      // Vercel build'de timeout hatalarını sadece bir kez logla
      console.warn(
        "⚠️ Vercel build: Veritabanı bağlantı timeout'u - fallback kullanılacak",
      );
    }

    // Bağlantı hatası ise detaylı bilgi ver (sadece development'ta veya gerçek hatalarda)
    if (
      !isVercelBuild &&
      (err.code === "ER_ACCESS_DENIED_ERROR" ||
        err.code === "ECONNREFUSED" ||
        err.code === "ENOTFOUND")
    ) {
      console.error("💡 Veritabanı bağlantı bilgilerini kontrol edin:");
      console.error(`   DB_HOST: ${process.env.DB_HOST || "localhost"}`);
      console.error(`   DB_PORT: ${process.env.DB_PORT || "3306"}`);
      console.error(`   DB_USER: ${process.env.DB_USER || "metodmuhendislik"}`);
      console.error(
        `   DB_NAME: ${process.env.DB_NAME || "metodmuhendislik_db"}`,
      );
    }

    // Hata durumunda hemen fallback return et (build timeout'larını önlemek için)
    return [];
  }
}

// ============================================
// PROJELER İÇİN FONKSİYONLAR
// ============================================

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: string | string[] | null;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order: number;
  is_active: boolean | number;
}

// Projeleri veritabanından direkt çek (Server Component için)
export async function getProjects(limit?: number): Promise<Project[]> {
  // Vercel build sırasında veritabanına bağlanmayı engelle (build timeout'larını önlemek için)
  if (process.env.VERCEL === "1") {
    const dbHost = process.env.DB_HOST;
    if (
      !dbHost ||
      dbHost === "SET" ||
      dbHost === "localhost" ||
      dbHost === "127.0.0.1" ||
      process.env.NEXT_PHASE === "phase-production-build"
    ) {
      console.warn(
        "⚠️ Vercel build: Projeler için veritabanı bağlantısı atlanıyor (fallback kullanılacak)",
      );
      return [];
    }
  }

  try {
    const limitClause = limit ? `LIMIT ${limit}` : "";
    const projects = await query<Project[]>(
      `SELECT * FROM projects WHERE (is_active = TRUE OR is_active = 1) ORDER BY sort_order ASC, id DESC ${limitClause}`,
    );
    const projectsData = Array.isArray(projects) ? projects : [];

    if (projectsData.length === 0) {
      console.warn("⚠️ Veritabanında aktif proje bulunamadı");
      return [];
    }

    console.log(`✅ ${projectsData.length} proje başarıyla yüklendi`);

    return projectsData.map((project) => ({
      ...project,
      title: fixTurkishEncoding(project.title),
      description: fixTurkishEncoding(project.description),
      category: fixTurkishEncoding(project.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Projeler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });

    return [];
  }
}

// ============================================
// ADMIN PANEL İÇİN FONKSİYONLAR (Tüm veriler - aktif/pasif)
// ============================================

// Admin panel için: Tüm ürünleri çek (aktif/pasif)
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await query<Product[]>(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
    const productsData = Array.isArray(products) ? products : [];

    console.log(`✅ Admin: ${productsData.length} ürün yüklendi (tümü)`);

    return productsData.map((product) => ({
      ...product,
      title: fixTurkishEncoding(product.title),
      description: fixTurkishEncoding(product.description),
      category: fixTurkishEncoding(product.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Ürünler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm slider'ları çek (aktif/pasif)
export async function getAllSliders(): Promise<Slider[]> {
  try {
    const sliders = await query<Slider[]>(
      "SELECT * FROM hero_sliders ORDER BY sort_order ASC, id ASC",
    );
    const slidersData = Array.isArray(sliders) ? sliders : [];

    console.log(`✅ Admin: ${slidersData.length} slider yüklendi (tümü)`);

    return slidersData;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Slider'lar yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm hizmetleri çek (aktif/pasif)
export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await query<Service[]>(
      "SELECT * FROM metod_services ORDER BY sort_order ASC, id ASC",
    );
    const servicesData = Array.isArray(services) ? services : [];

    console.log(`✅ Admin: ${servicesData.length} hizmet yüklendi (tümü)`);

    return servicesData.map((service) => ({
      ...service,
      name: fixTurkishEncoding(service.name),
      description: service.description
        ? fixTurkishEncoding(service.description)
        : undefined,
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Hizmetler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}

// Admin panel için: Tüm projeleri çek (aktif/pasif)
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await query<Project[]>(
      "SELECT * FROM projects ORDER BY created_at DESC",
    );
    const projectsData = Array.isArray(projects) ? projects : [];

    console.log(`✅ Admin: ${projectsData.length} proje yüklendi (tümü)`);

    return projectsData.map((project) => ({
      ...project,
      title: fixTurkishEncoding(project.title),
      description: fixTurkishEncoding(project.description),
      category: fixTurkishEncoding(project.category),
    }));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; errno?: number };
    console.error("❌ Admin: Projeler yüklenirken hata:", {
      code: err.code,
      message: err.message,
      errno: err.errno,
    });
    return [];
  }
}
