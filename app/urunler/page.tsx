import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { query } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürünlerimiz | Metod Mühendislik - Elektrik Pano ve Endüstriyel Çözümler",
  description:
    "Metod Mühendislik ürünleri: Elektrik panoları, CNC lazer kesim, CNC büküm, kaynak, toz boya ve çelik konstrüksiyon. 10+ yıllık deneyimle üretilen kaliteli ürünler.",
  keywords:
    "elektrik pano, ürünler, CNC lazer kesim, CNC büküm, kaynak, toz boya, çelik konstrüksiyon, endüstriyel ürünler, Metod Mühendislik ürünleri",
};

// Static export için: force-dynamic kaldırıldı
// export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";
  
  try {
    if (!text.includes('Ã') && !text.includes('Ä') && !text.includes('Å')) {
      return text;
    }
    return Buffer.from(text, 'latin1').toString('utf8');
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

async function getProducts(): Promise<Product[]> {
  try {
    const products = await query<Product[]>(
      "SELECT * FROM products WHERE is_active = TRUE OR is_active = 1 ORDER BY sort_order ASC, created_at DESC"
    );
    const productsData = Array.isArray(products) ? products : [];
    return productsData.map(fixProductEncoding);
  } catch (error) {
    console.error("Ürünler yüklenirken hata:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-blue-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Ürünlerimiz
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Kaliteli{" "}
                <span className="text-blue-300">Ürünlerimiz</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                10+ yıllık deneyimimizle ürettiğimiz elektrik pano ve endüstriyel üretim çözümleri.
                Elektrik panoları, CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon ürünleri.
              </p>
            </div>
          </div>
        </section>

        {/* Ürünler Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Henüz ürün eklenmemiş
                </h3>
                <p className="text-slate-600 mb-6">
                  Ürünler admin panelinden eklendikten sonra burada görünecektir.
                </p>
                <Link
                  href="/metod/products"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Admin Paneline Git
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {products.map((product) => {
                // Ürün linkini belirle
                const productUrl = product.link 
                  ? (product.link.startsWith('/') ? product.link : `/${product.link}`)
                  : `/urunler/urunler/${product.id}`;

                // Görselleri parse et
                let productImages: string[] = [];
                if (product.image) {
                  productImages.push(product.image);
                }
                if (product.images) {
                  try {
                    const parsed = typeof product.images === 'string' 
                      ? JSON.parse(product.images) 
                      : product.images;
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      productImages = parsed;
                      if (product.image && !productImages.includes(product.image)) {
                        productImages = [product.image, ...productImages];
                      }
                    }
                  } catch {
                    // Parse hatası - görmezden gel
                  }
                }

                return (
                  <Link
                    key={product.id}
                    href={productUrl}
                    className="group relative bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
                  >
                    {/* Görsel */}
                    <div className="relative h-[420px] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      {productImages.length > 0 ? (
                        <>
                          <Image
                            src={productImages[0]}
                            alt={product.title}
                            fill
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Görsel sayacı badge */}
                          {productImages.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-xs font-semibold z-10 backdrop-blur-sm shadow-md">
                              {productImages.length} görsel
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-slate-400 text-sm">Görsel yükleniyor...</span>
                        </div>
                      )}
                      {/* Overlay - İncele yazısı */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                        <span className="text-white text-xl font-bold px-6 py-3 bg-blue-600 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform">
                          İncele
                        </span>
                      </div>
                      {/* Kategori Badge */}
                      {product.category && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                            {product.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* İçerik */}
                    <div className="p-6 lg:p-8 flex flex-col grow">
                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6 line-clamp-4 grow">
                        {product.description}
                      </p>

                      {/* Detay Butonu */}
                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group-hover:text-blue-700">
                          <span>Ürün Detaylarını İncele</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              </div>
            )}
          </div>
        </section>

        {/* SEO İçerik Bölümü */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Gemiler için Elektrik Panoları (Marin Pano) Üretimi
              </h2>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                <strong>Metod Mühendislik</strong> olarak, denizcilik sektöründe kullanılan <strong>gemiler için elektrik panoları (marin pano)</strong> üretiminde uzmanız. 
                Marin elektrik panoları, deniz ortamının zorlu koşullarına dayanıklı olmalı ve <strong>IEC 60092</strong> standartlarına tam uyumlu olmalıdır.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                Marin Pano Özellikleri
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                Gemiler için üretilen elektrik panoları, <strong>paslanmaz çelik</strong> veya <strong>marine grade aluminyum</strong> malzemelerden üretilir. 
                <strong>IP66/IP67</strong> koruma sınıfı ile su geçirmez yapıya sahiptir. Deniz suyunun tuzlu ve aşındırıcı etkisine karşı özel koruyucu kaplamalar uygulanır. 
                Gemi gövdesi titreşimlerine dayanıklı tasarım ve güvenli enerji dağıtım sistemleri ile donatılır.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                Endüstriyel Elektrik Pano Projeleri
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                Fabrika, depo ve endüstriyel tesisler için <strong>sıvaüstü</strong>, <strong>sıvaaltı</strong> ve <strong>dikili tip</strong> elektrik panoları üretiyoruz. 
                Her proje, müşterinin özel ihtiyaçlarına göre tasarlanır ve <strong>IEC 61439</strong> standartlarına uygun olarak üretilir. 
                ISO 9001 kalite yönetim sistemi sertifikamız ile üretim süreçlerimizin kalitesini garanti ediyoruz.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                Neden Metod Mühendislik?
              </h3>

              <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg">
                <li><strong>10+ yıllık deneyim</strong> ile sektörde güvenilir çözüm ortağıyız</li>
                <li><strong>IEC standartlarına</strong> tam uyumlu üretim</li>
                <li><strong>Paslanmaz çelik</strong> ve <strong>marine grade</strong> malzeme kullanımı</li>
                <li><strong>Özel tasarım</strong> ve <strong>müşteri odaklı</strong> çözümler</li>
                <li><strong>Zamanında teslimat</strong> ve <strong>kaliteli işçilik</strong></li>
                <li><strong>Teknik destek</strong> ve <strong>bakım hizmetleri</strong></li>
              </ul>

              <p className="text-slate-700 text-lg leading-relaxed mt-8">
                Projeleriniz için detaylı teklif almak ve uzman ekibimizle görüşmek için bizimle iletişime geçebilirsiniz. 
                <strong> Gemiler için elektrik pano</strong> ve <strong>endüstriyel pano</strong> ihtiyaçlarınız için en uygun çözümü birlikte belirleyelim.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Projeniz İçin Teklif Alın
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20gemi%20elektrik%20panosu%20için%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
