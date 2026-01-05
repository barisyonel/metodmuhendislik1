import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrik Pano Üretimi İstanbul | Sıvaüstü, Sıvaaltı, Marin Pano | Metod Mühendislik",
  description:
    "İstanbul Tuzla'da elektrik pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. IEC 61439 standartlarında, ISO 9001 sertifikalı elektrik panosu üretimi. 10+ yıllık deneyim, 12 ülkeye ihracat. Ücretsiz keşif ve teknik destek.",
  keywords:
    "elektrik pano, elektrik panosu, pano üretimi, elektrik pano üretimi, sıvaüstü pano, sıvaaltı pano, dahili pano, marin pano, denizcilik pano, elektrik pano İstanbul, elektrik pano Tuzla, elektrik pano İTOSB, IEC 61439, ISO 9001, enerji dağıtım panosu, ana dağıtım panosu, ADP pano, MCC pano, kompanzasyon pano, otomasyon pano, DDC pano, UPS pano",
  openGraph: {
    title: "Elektrik Pano Üretimi İstanbul | Metod Mühendislik",
    description:
      "İstanbul Tuzla'da profesyonel elektrik pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano. IEC standartlarında, ISO 9001 sertifikalı. 10+ yıllık deneyim.",
    type: "website",
    locale: "tr_TR",
    url: "https://www.metodmuhendislik.com/hizmetler/elektrik-pano-uretime",
    siteName: "Metod Mühendislik",
    images: [
      {
        url: "/elektrıkpano.png",
        width: 1200,
        height: 630,
        alt: "Elektrik Pano Üretimi - Metod Mühendislik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elektrik Pano Üretimi İstanbul | Metod Mühendislik",
    description: "İstanbul Tuzla'da profesyonel elektrik pano üretimi. IEC standartlarında, ISO 9001 sertifikalı.",
    images: ["/elektrıkpano.png"],
  },
  alternates: {
    canonical: "https://www.metodmuhendislik.com/hizmetler/elektrik-pano-uretime",
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

export default function ElektrikPanoUretimiPage() {
  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://www.metodmuhendislik.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hizmetler",
        "item": "https://www.metodmuhendislik.com/hizmetler",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Elektrik Pano Üretimi",
        "item": "https://www.metodmuhendislik.com/hizmetler/elektrik-pano-uretime",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          {/* Arka Plan Görseli */}
          <div className="absolute inset-0 z-0">
                  <Image
                    src="/elektrıkpano.png"
                    alt="Elektrik Pano Üretimi İstanbul - Sıvaüstü, Sıvaaltı, Dahili ve Marin Pano Üretimi - Metod Mühendislik"
                    fill
                    className="object-cover opacity-20"
                    priority
                    quality={90}
                  />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="text-6xl mb-6">⚡</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Elektrik Pano Üretimi İstanbul | Profesyonel Pano Üretimi
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                İstanbul Tuzla'da müşteri ihtiyaçlarına özel elektrik pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. IEC standartlarında, ISO 9001 sertifikalı. Güvenli ve verimli enerji dağıtım çözümleri.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Görsel */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/elektrıkpano.png"
                    alt="Elektrik Pano Üretimi İstanbul - Endüstriyel Elektrik Panosu Üretim Tesisi - Metod Mühendislik Tuzla"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </div>

              {/* Schema.org Service Markup */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Elektrik Pano Üretimi",
                    "provider": {
                      "@type": "Organization",
                      "name": "Metod Mühendislik",
                      "url": "https://www.metodmuhendislik.com",
                      "logo": "https://www.metodmuhendislik.com/logo.png",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "İTOSB SANAYİ BÖLGESİ 3. YOL NO:21",
                        "addressLocality": "TEPEÖREN - AKFİRAT TUZLA",
                        "addressRegion": "İSTANBUL",
                        "addressCountry": "TR",
                      },
                      "telephone": "+90-216-759-56-75",
                      "email": "info@metodmuhendislik.com",
                    },
                    "areaServed": {
                      "@type": "City",
                      "name": "İstanbul",
                    },
                    "description":
                      "İstanbul Tuzla'da profesyonel elektrik pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. IEC 61439 standartlarında, ISO 9001 sertifikalı.",
                    "offers": {
                      "@type": "Offer",
                      "description": "Elektrik Pano Üretimi Hizmeti",
                    },
                  }),
                }}
              />

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Elektrik Pano Üretimi ve Enerji Dağıtım Çözümleri
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrik pano üretimi</strong>, endüstriyel ve ticari yapılarda güvenli
                  enerji dağıtımı için kritik öneme sahiptir. Metod Mühendislik
                  olarak, İstanbul Tuzla'da müşteri ihtiyaçlarına özel tasarım ve üretim çözümleri
                  sunmaktayız. <strong>Elektrik pano</strong> üretimimizde IEC 61439 standartlarına uygun olarak çalışmakta ve ISO 9001 kalite yönetim sistemi ile sertifikalı hizmet vermekteyiz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Sıvaüstü elektrik pano</strong>, <strong>sıvaaltı elektrik pano</strong>, <strong>dahili
                  elektrik pano</strong>, <strong>marin pano</strong> ve özel tip <strong>elektrik panolar</strong>
                  üretmekteyiz. <strong>Elektrik pano</strong> ve <strong>marin pano</strong> üretimimizde,
                  uluslararası standartlara uygun olarak çalışmakta ve kalite
                  kontrol testlerinden geçirmekteyiz. İstanbul, Tuzla ve İTOSB bölgesinde <strong>elektrik pano üretimi</strong> konusunda 10+ yıllık deneyime sahibiz.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Elektrik Pano Tipleri ve Üretim Süreçleri
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Her projede, müşteri gereksinimlerini analiz ederek, en uygun
                  teknik çözümleri sunmaktayız. <strong>Elektrik pano</strong> ve <strong>marin pano</strong>
                  üretim hizmetlerimiz, fabrika binaları, ticari yapılar, konut
                  projeleri, endüstriyel tesisler ve denizcilik uygulamalarında
                  yaygın olarak kullanılmaktadır. İstanbul ve çevresinde <strong>elektrik pano üretimi</strong> konusunda uzman ekibimiz ile hizmet vermekteyiz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrik pano</strong> ve <strong>marin pano</strong> üretimimizde, CNC lazer kesim ile
                  gövde üretimi, CNC büküm ile şekillendirme ve metal kaynak
                  işlemleri ile birleştirme gerçekleştirilmektedir. Özellikle
                  <strong>marin pano</strong> üretiminde, deniz ortamına dayanıklı paslanmaz
                  çelik ve özel koruma sistemleri kullanılmaktadır. Yüzey
                  işlemleri için elektrostatik toz boya uygulanmakta ve montaj
                  aşamasında elektrik ekipmanları yerleştirilmektedir. Tüm <strong>elektrik pano</strong> üretimimiz IEC 61439 standartlarına uygundur.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Kalite Kontrol ve Güvenlik Standartları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrik pano</strong> üretimimizde, uluslararası elektrik
                  standartlarına (IEC 61439) uygun olarak çalışmakta ve kalite kontrol
                  testlerinden geçirmekteyiz. Her <strong>elektrik pano</strong>, elektriksel testlerden
                  geçirilmekte ve güvenlik sertifikaları ile teslim
                  edilmektedir. ISO 9001 kalite yönetim sistemi ile sertifikalı <strong>elektrik pano üretimi</strong> hizmetimiz, İstanbul Tuzla'daki tesisimizde gerçekleştirilmektedir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Müşteri memnuniyeti ve güvenlik, <strong>elektrik pano</strong> üretimimizde en
                  öncelikli konulardır. Uzman ekibimiz, her projede müşteri
                  gereksinimlerini analiz ederek, en uygun teknik çözümleri
                  sunmaktadır. İstanbul ve çevresinde <strong>elektrik pano</strong> ihtiyacı olan tüm müşterilerimize profesyonel hizmet sunmaktayız.
                </p>
              </div>

              <div className="mt-12 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Elektrik Pano Teknik Özellikleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Elektrik Pano Tipleri
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      Sıvaüstü, Sıvaaltı, Dahili, Marin
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Standartlar
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      IEC 61439, ISO 9001
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Lokasyon
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      İstanbul Tuzla, İTOSB
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Deneyim
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      10+ Yıl, 12 Ülkeye İhracat
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Kalite Kontrol
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      Elektriksel Testler, Sertifikalı
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Güvenlik
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      CE, TSE Standartları
                    </span>
                  </div>
                </div>
              </div>

              {/* Hızlı Linkler Bölümü */}
              <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Daha Fazla Bilgi
                </h2>
                <p className="text-slate-700 text-lg mb-6">
                  Elektrik panoları hakkında detaylı bilgilere ulaşmak için aşağıdaki sayfaları ziyaret edebilirsiniz:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/kullanim-alanlari"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">📍</div>
                    <h3 className="font-black text-slate-900 mb-2">Kullanım Alanları</h3>
                    <p className="text-slate-600 text-sm">
                      Sektörlere göre elektrik pano kullanım alanları ve çözümler
                    </p>
                  </Link>
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/teknik-ozellikler"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">🔧</div>
                    <h3 className="font-black text-slate-900 mb-2">Teknik Özellikler</h3>
                    <p className="text-slate-600 text-sm">
                      Standartlar, IP sınıfları ve teknik parametreler
                    </p>
                  </Link>
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/uretim-sureci"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">⚙️</div>
                    <h3 className="font-black text-slate-900 mb-2">Üretim Süreci</h3>
                    <p className="text-slate-600 text-sm">
                      Adım adım üretim süreci ve kalite kontrol
                    </p>
                  </Link>
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">⚡</div>
                    <h3 className="font-black text-slate-900 mb-2">ADP Panosu</h3>
                    <p className="text-slate-600 text-sm">
                      Ana Dağıtım Panosu özellikleri ve kullanımı
                    </p>
                  </Link>
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/mcc-motor-kontrol-merkezi"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">🔌</div>
                    <h3 className="font-black text-slate-900 mb-2">MCC Panosu</h3>
                    <p className="text-slate-600 text-sm">
                      Motor Kontrol Merkezi detayları
                    </p>
                  </Link>
                  <Link
                    href="/hizmetler/elektrik-pano-uretime/sss"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">❓</div>
                    <h3 className="font-black text-slate-900 mb-2">Sık Sorulan Sorular</h3>
                    <p className="text-slate-600 text-sm">
                      Elektrik pano hakkında merak edilenler
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Elektrik Pano Üretimi HİZMETİ İÇİN TEKLİF ALIN
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü
              sunuyoruz. Hemen iletişime geçin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20Elektrik%20Pano%20Üretimi%20hizmeti%20için%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <Link
                href="/hizmetler"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                TÜM HİZMETLERİMİZ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
