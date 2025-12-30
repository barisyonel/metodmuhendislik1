import { Metadata } from "next";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductGallery from "./components/ProductGallery";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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

// Varsayılan ürünler (fallback için)
const defaultProducts: Record<string, Product> = {
  "elektrik-pano-sistemleri": {
    id: 1,
    title: "Elektrik Pano ve Marin Pano Üretimi",
    description: "IEC standartlarına uygun elektrik pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano sistemleri. 20+ yıllık deneyimle güvenilir enerji dağıtım çözümleri. İstanbul'da profesyonel elektrik pano üretim hizmeti.",
    image: "/elektrıkpano.png",
    category: "Elektrik Panoları",
    link: "/urunler/urunler/elektrik-pano-sistemleri",
  },
  "cnc-lazer-kesim": {
    id: 2,
    title: "CNC Lazer Kesilmiş Parçalar",
    description: "Hassas CNC lazer kesim ile üretilmiş metal parçalar. ±0.05 mm hassasiyet ile endüstriyel standartlarda üretim. Kompleks geometrili parçalar için profesyonel çözümler. Siyah sac, paslanmaz çelik ve alüminyum malzemelerde kesim hizmetleri.",
    image: "/metod.png",
    category: "CNC Lazer Kesim",
    link: "/urunler/urunler/cnc-lazer-kesim",
  },
  "cnc-bukum": {
    id: 7,
    title: "CNC Abkant Büküm ve Metal Şekillendirme",
    description: "CNC büküm teknolojisi ile hassas metal şekillendirme. Kompleks geometrili parçalar tek seferde üretilir. Kalınlığı 6 mm'ye kadar sac malzemelerde yüksek hassasiyetli büküm hizmetleri. Endüstriyel üretim için ideal çözümler.",
    image: "/cncbukum.png",
    category: "CNC Büküm",
    link: "/urunler/urunler/cnc-bukum",
  },
  "kaynak-imalat": {
    id: 3,
    title: "Kaynak ve Metal İmalat Hizmetleri",
    description: "TIG, MIG/MAG ve elektrot kaynak yöntemleri ile profesyonel metal kaynak işlemleri. Çelik, paslanmaz çelik ve alüminyum kaynak hizmetleri. Çelik konstrüksiyon ve makine imalatında uzman ekibimizle kaliteli kaynak işlemleri.",
    image: "/kaynak.png",
    category: "Kaynak & İmalat",
    link: "/urunler/urunler/kaynak-imalat",
  },
  "toz-boya": {
    id: 4,
    title: "Elektrostatik Toz Boya İşlemleri",
    description: "Modern toz boya teknolojisi ile uzun ömürlü ve estetik yüzey işlemleri. RAL renk standardına uygun boyama hizmetleri. Çevre dostu ve kalıcı yüzey kaplama çözümleri. Metal ürünlerinizin korunması ve görsel iyileştirmesi için profesyonel hizmet.",
    image: "/Elektrostatik Toz Boya.png",
    category: "Yüzey İşlemleri",
    link: "/urunler/urunler/toz-boya",
  },
  "celik-konstruksiyon": {
    id: 5,
    title: "Çelik Konstrüksiyon ve Endüstriyel Yapılar",
    description: "Endüstriyel çelik konstrüksiyon çözümleri. Sağlam ve dayanıklı çelik yapılar. Mühendislik standartlarına uygun projeler. Fabrika binaları, çatı sistemleri ve endüstriyel tesisler için güvenilir çelik konstrüksiyon hizmetleri.",
    image: "/Çelik Konstrüksiyon.png",
    category: "Çelik Konstrüksiyon",
    link: "/urunler/urunler/celik-konstruksiyon",
  },
  "magaza-raf-sistemleri": {
    id: 6,
    title: "Mağaza Raf Sistemleri ve Özel Ürünler",
    description: "Mağaza içi raf sistemleri ve özel ürün tasarımları. İhtiyacınıza özel tasarım ve üretim çözümleri. Estetik ve fonksiyonel mağaza düzenlemeleri. Perakende ve endüstriyel depolama çözümleri için profesyonel raf sistemleri.",
    image: "/Mağaza Raf Sistemleri ve Ürünleri.png",
    category: "Raf Sistemleri",
    link: "/urunler/urunler/magaza-raf-sistemleri",
  },
};

// Slug veya ID'den ürünü getir
// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";
  
  try {
    // Eğer text zaten doğru encode edilmişse direkt döndür
    if (!text.includes('Ã') && !text.includes('Ä') && !text.includes('Å')) {
      return text;
    }
    
    // Double-encoded karakterleri düzelt
    // Latin1 olarak yorumlanmış UTF-8 karakterlerini düzelt
    return Buffer.from(text, 'latin1').toString('utf8');
  } catch (error) {
    // Hata durumunda orijinal text'i döndür
    return text;
  }
}

// Ürün verilerini düzelt
function fixProductEncoding(product: Product): Product {
  return {
    ...product,
    title: fixTurkishEncoding(product.title),
    description: fixTurkishEncoding(product.description),
    category: fixTurkishEncoding(product.category),
  };
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  // Önce varsayılan ürünlerde ara
  if (defaultProducts[slug]) {
    return defaultProducts[slug];
  }

  try {
    // ID olarak dene
    const id = parseInt(slug);
    if (!isNaN(id)) {
      // ID varsayılan ürünlerde var mı kontrol et
      const defaultProductById = Object.values(defaultProducts).find(p => p.id === id);
      if (defaultProductById) {
        return defaultProductById;
      }

      // Veritabanından ara
      const productsById = await query<Product[]>(
        "SELECT * FROM products WHERE id = ? AND (is_active = TRUE OR is_active IS NULL) LIMIT 1",
        [id]
      );
      if (productsById && productsById.length > 0) {
        return fixProductEncoding(productsById[0]);
      }
    }

    // Link alanında slug'ı ara (örn: /urunler/urunler/elektrik-pano-sistemleri)
    const products = await query<Product[]>(
      "SELECT * FROM products WHERE (link = ? OR link LIKE ?) AND (is_active = TRUE OR is_active IS NULL) LIMIT 1",
      [`/urunler/urunler/${slug}`, `%/${slug}%`]
    );

    if (products && products.length > 0) {
      return fixProductEncoding(products[0]);
    }

    return null;
  } catch (error) {
    // Production'da bağlantı hatalarını sessizce handle et
    const err = error as { code?: string; errno?: number };
    const isConnectionError = err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || 
                              err.code === 'ENOTFOUND' || err.errno === -111 || err.errno === -61;
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    
    if (!isConnectionError || !isProduction) {
      console.error("Ürün yüklenirken hata:", error);
    }
    // Hata durumunda varsayılan ürünleri kontrol et
    return defaultProducts[slug] || null;
  }
}

// Statik olarak önceden oluşturulacak slug'lar
export async function generateStaticParams() {
  return Object.keys(defaultProducts).map((slug) => ({
    slug: slug,
  }));
}

// Meta etiketlerini otomatik oluştur
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

  // Açıklamadan meta description oluştur (160 karakter sınırı)
  const metaDescription =
    product.description.length > 160
      ? product.description.substring(0, 157) + "..."
      : product.description;

  return {
    title: `${product.title} | Metod Mühendislik`,
    description: metaDescription,
    keywords: `${product.title}, ${product.category}, Metod Mühendislik, endüstriyel üretim`,
    openGraph: {
      title: product.title,
      description: metaDescription,
      images: product.image ? [product.image] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: metaDescription,
      images: product.image ? [product.image] : [],
    },
    alternates: {
      canonical: product.link || `/urunler/urunler/${resolvedParams.slug}`,
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
  if (product.image) {
    productImages.push(product.image);
  }
  
  // Eğer images JSON kolonu varsa parse et
  if (product.images) {
    try {
      const parsedImages = JSON.parse(product.images);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        productImages = parsedImages;
      }
    } catch (e) {
      // JSON parse hatası - image kullan
      console.error("Images parse error:", e);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <div className="container mx-auto px-6 py-12">
        {/* ÜRÜN GÖRSEL GALERİSİ */}
        {productImages.length > 0 && (
          <div className="mb-12">
            <ProductGallery images={productImages} productTitle={product.title} />
          </div>
        )}

        {/* ÜRÜN BİLGİLERİ */}
        <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-500 mb-4">
              Ürünler / {product.category} / {product.title}
            </nav>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>
            {product.category && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full mb-6">
                {product.category}
              </span>
            )}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* TEKNİK ÖZELLİKLER TABLOSU */}
            <div className="border rounded-2xl overflow-hidden mb-8">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <th className="p-4 font-semibold text-slate-700">Kategori</th>
                    <td className="p-4 text-gray-600">{product.category}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-4 font-semibold text-slate-700">Ürün Kodu</th>
                    <td className="p-4 text-gray-600">#{product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <a
              href={`https://wa.me/905425786060?text=Merhaba,%20${encodeURIComponent(product.title)}%20ürünü%20için%20teklif%20almak%20istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp ile Teklif Al
            </a>
        </div>

      </div>

      {/* ÜRÜN ALTINDAKİ SEO MAKALESİ */}
      <section className="container mx-auto px-6 mt-20 pt-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {product.title} Hakkında Detaylı Bilgi
          </h2>
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">{product.description}</p>
            <p>
              Metod Mühendislik olarak, {product.title} konusunda uzman ekibimizle
              hizmet vermekteyiz. {product.category} kategorisindeki bu ürünümüz,
              endüstriyel standartlara uygun olarak üretilmektedir. Detaylı teknik
              bilgi ve teklif için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
