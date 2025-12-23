import { Metadata } from "next";
import Image from "next/image";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  is_active?: boolean;
}

// Slug'dan ürünü getir
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Önce link alanında slug'ı ara (örn: /urunler/urunler/elektrik-pano-sistemleri)
    const products = await query<Product[]>(
      "SELECT * FROM products WHERE (link = ? OR link LIKE ?) AND (is_active = TRUE OR is_active IS NULL) LIMIT 1",
      [`/urunler/urunler/${slug}`, `%/${slug}%`]
    );

    if (products && products.length > 0) {
      return products[0];
    }

    return null;
  } catch (error) {
    console.error("Ürün yüklenirken hata:", error);
    return null;
  }
}

// Meta etiketlerini otomatik oluştur
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

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
      canonical: product.link || `/urunler/urunler/${params.slug}`,
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ÜRÜN GÖRSELİ */}
          <div className="relative bg-gray-100 rounded-3xl aspect-square overflow-hidden border border-gray-200 shadow-inner">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 italic">
                  Ürün Görseli (Gulpano Tarzı Galeri)
                </span>
              </div>
            )}
          </div>

          {/* ÜRÜN BİLGİLERİ */}
          <div>
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

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
              Teknik Çizim ve Teklif İste
            </button>
          </div>
        </div>

        {/* ÜRÜN ALTINDAKİ SEO MAKALESİ */}
        <section className="mt-20 pt-12 border-t border-gray-100">
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
        </section>
      </div>
    </div>
  );
}
