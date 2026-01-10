import { Metadata } from "next";
import Link from "next/link";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductGallery from "./components/ProductGallery";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  generateSEODescription,
  generateSEOKeywords,
  generateOGImage,
  generateCanonicalURL,
} from "@/lib/seo-utils";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string; // JSON string olarak çoklu görseller
  category: string;
  link: string;
  is_active?: boolean;
}

// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";

  try {
    if (!text.includes("Ã") && !text.includes("Ä") && !text.includes("Å")) {
      return text;
    }
    return Buffer.from(text, "latin1").toString("utf8");
  } catch {
    return text;
  }
}

function fixProductEncoding(product: Product): Product {
  return {
    ...product,
    title: fixTurkishEncoding(product.title),
    description: fixTurkishEncoding(product.description),
    category: fixTurkishEncoding(product.category),
  };
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const id = parseInt(slug);
    if (!isNaN(id)) {
      const productsById = await query<Product[]>(
        "SELECT * FROM products WHERE id = ? AND (is_active = TRUE OR is_active IS NULL) LIMIT 1",
        [id],
      );
      if (productsById && productsById.length > 0) {
        return fixProductEncoding(productsById[0]);
      }
    }

    const products = await query<Product[]>(
      "SELECT * FROM products WHERE (link = ? OR link LIKE ?) AND (is_active = TRUE OR is_active IS NULL) LIMIT 1",
      [`/urunler/urunler/${slug}`, `%/${slug}%`],
    );

    if (products && products.length > 0) {
      return fixProductEncoding(products[0]);
    }

    return null;
  } catch (error) {
    const err = error as { code?: string; errno?: number };
    const isConnectionError =
      err.code === "ECONNREFUSED" ||
      err.code === "ETIMEDOUT" ||
      err.code === "ENOTFOUND" ||
      err.errno === -111 ||
      err.errno === -61;
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

    if (!isConnectionError || !isProduction) {
      console.error("Ürün yüklenirken hata:", error);
    }
    return null;
  }
}

export function generateStaticParams() {
  // Static export için: Build sırasında veritabanı bağlantısı olmayabilir
  // Bu yüzden boş array döndürüyoruz
  // Not: Static export'ta dinamik sayfalar build sırasında oluşturulmaz
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | Metod Mühendislik",
      description: "Aradığınız ürün bulunamadı.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.metodmuhendislik.com";
  const metaDescription = generateSEODescription(product.description, 160);
  const keywords = generateSEOKeywords(
    product.title,
    product.category,
    product.description,
  );
  const ogImage = generateOGImage(product.image);
  const canonicalUrl = generateCanonicalURL(
    product.link || `/urunler/urunler/${resolvedParams.slug}`,
    baseUrl,
  );

  return {
    title: `${product.title} | Metod Mühendislik`,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: "Metod Mühendislik" }],
    creator: "Metod Mühendislik",
    publisher: "Metod Mühendislik",
    openGraph: {
      title: `${product.title} | Metod Mühendislik`,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Metod Mühendislik",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Metod Mühendislik`,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Görselleri parse et
  let productImages: string[] = [];

  if (product.images) {
    try {
      const imagesString =
        typeof product.images === "string"
          ? product.images
          : String(product.images);
      let parsedImages: string[] = [];
      try {
        parsedImages = JSON.parse(imagesString);
      } catch {
        if (Array.isArray(product.images)) {
          parsedImages = product.images;
        }
      }

      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        const validImages = parsedImages.filter(
          (img) => img && typeof img === "string" && img.trim() !== "",
        );
        if (validImages.length > 0) {
          productImages = validImages;
        }
      }
    } catch (e) {
      console.error("Images parse error:", e);
    }
  }

  if (product.image) {
    const imageUrl = product.image.trim();
    if (imageUrl) {
      if (!productImages.includes(imageUrl)) {
        productImages = [imageUrl, ...productImages];
      } else {
        productImages = [
          imageUrl,
          ...productImages.filter((img) => img !== imageUrl),
        ];
      }
    }
  }

  if (productImages.length === 0 && product.image) {
    const imageUrl = product.image.trim();
    if (imageUrl) {
      productImages = [imageUrl];
    }
  }

  productImages = productImages.filter((img) => img && img.trim() !== "");

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        {/* Hero Section - Modern ve Etkileyici */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
          {/* Arka Plan Dekorasyonu */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Modern Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8 animate-slide-up">
              <Link
                href="/"
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                Ana Sayfa
              </Link>
              <span className="text-slate-300">/</span>
              <Link
                href="/urunler"
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                Ürünler
              </Link>
              <span className="text-slate-300">/</span>
              {product.category && (
                <>
                  <span className="text-slate-500">{product.category}</span>
                  <span className="text-slate-300">/</span>
                </>
              )}
              <span className="text-slate-900 font-semibold">
                {product.title}
              </span>
            </nav>

            {/* Ürün Başlık ve Kategori */}
            <div className="max-w-4xl mb-8 animate-slide-up">
              {product.category && (
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-full shadow-lg">
                    {product.category}
                  </span>
                  <span className="px-3 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    #{product.id}
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                {product.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Ana İçerik */}
        <section className="container mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Sol Kolon - Görsel Galeri */}
            <div className="lg:sticky lg:top-24 lg:h-fit animate-fade-in">
              {productImages.length > 0 && (
                <ProductGallery
                  images={productImages}
                  productTitle={product.title}
                />
              )}
            </div>

            {/* Sağ Kolon - Ürün Bilgileri */}
            <div className="space-y-8 animate-slide-up">
              {/* Ürün Açıklaması */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></span>
                  Ürün Hakkında
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Özellikler Kartı */}
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-8 shadow-xl border border-blue-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></span>
                  Ürün Bilgileri
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-blue-100">
                    <span className="text-slate-600 font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Kategori
                    </span>
                    <span className="text-slate-900 font-bold">
                      {product.category || "Belirtilmemiş"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-blue-100">
                    <span className="text-slate-600 font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                      Ürün Kodu
                    </span>
                    <span className="text-slate-900 font-bold">
                      #{product.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-600 font-semibold flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Durum
                    </span>
                    <span className="px-4 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
                      Aktif
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Butonları */}
              <div className="space-y-4">
                <a
                  href={`https://wa.me/905425786060?text=Merhaba,%20${encodeURIComponent(product.title)}%20ürünü%20için%20teklif%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 px-8 rounded-2xl font-black text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>WhatsApp ile Teklif Al</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>

                <Link
                  href="/urunler"
                  className="group w-full bg-white border-2 border-slate-300 text-slate-700 py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Tüm Ürünlere Dön</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO İçerik Bölümü - Modern Tasarım */}
        <section className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></span>
                {product.title} Hakkında Detaylı Bilgi
              </h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-lg leading-relaxed mb-6 text-slate-700">
                  {product.description}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                  <p className="text-slate-700 leading-relaxed">
                    Metod Mühendislik olarak,{" "}
                    <strong className="text-slate-900">{product.title}</strong>{" "}
                    konusunda uzman ekibimizle hizmet vermekteyiz.{" "}
                    <strong className="text-slate-900">
                      {product.category}
                    </strong>{" "}
                    kategorisindeki bu ürünümüz, endüstriyel standartlara uygun
                    olarak üretilmektedir. Detaylı teknik bilgi ve teklif için
                    bizimle iletişime geçebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
