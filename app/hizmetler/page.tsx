import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Hizmetlerimiz | CNC Lazer Kesim, Büküm, Kaynak, Elektrik Pano ve Çelik Konstrüksiyon | Metod Mühendislik",
  description:
    "CNC lazer kesim, CNC büküm, metal kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon, elektrik pano ve marin pano üretimi hizmetlerimiz. İstanbul'da profesyonel endüstriyel üretim çözümleri. 20+ yıllık deneyim.",
  keywords:
    "CNC lazer kesim, CNC büküm, kaynak, metal kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, elektrik pano, marin pano, elektrik pano üretimi, İstanbul, endüstriyel üretim, Metod Mühendislik",
  openGraph: {
    title: "Hizmetlerimiz | Metod Mühendislik",
    description:
      "CNC lazer kesim, CNC büküm, metal kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon, elektrik pano ve marin pano üretimi hizmetlerimiz.",
    type: "website",
    locale: "tr_TR",
  },
};

interface Service {
  id: number;
  name: string;
  href: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean | number;
}

async function getServices(): Promise<Service[]> {
  try {
    const services = await query<Service[]>(
      "SELECT * FROM services WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC"
    );
    return Array.isArray(services) ? services : [];
  } catch (error) {
    console.error("Hizmetler yüklenirken hata:", error);
    return [];
  }
}

// Fallback hizmetler (veritabanı bağlantısı yoksa)
const fallbackServices = [
  {
    id: 1,
    name: "Elektrik Pano Üretimi",
    href: "/hizmetler/elektrik-pano-uretime",
    icon: "⚡",
    description: "20+ yıllık deneyimimizle elektrik pano ve marin pano üretiminde sektörün öncü firması. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    name: "CNC Lazer Kesim",
    href: "/hizmetler/cnc-lazer-kesim",
    icon: "🔺",
    description: "Hassas ve hızlı lazer kesim hizmetleri ile endüstriyel üretimde öncü. Yüksek kaliteli malzemelerde kesim çözümleri.",
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    name: "CNC Büküm",
    href: "/hizmetler/cnc-bukum",
    icon: "📐",
    description: "Profesyonel CNC büküm hizmetleri ile şekillendirme çözümleri. Hassas açı kontrolü ve kaliteli işçilik.",
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    name: "Kaynak & İmalat",
    href: "/hizmetler/kaynak",
    icon: "🔥",
    description: "Yüksek kaliteli metal kaynak ve imalat hizmetleri ile güvenilir çözümler. TIG, MIG/MAG kaynak yöntemleri.",
    sort_order: 4,
    is_active: true,
  },
  {
    id: 5,
    name: "Elektrostatik Toz Boya",
    href: "/hizmetler/elektrostatik-toz-boya",
    icon: "🎨",
    description: "Modern boya teknolojileri ile uzun ömürlü ve estetik yüzey işlemleri. Çevre dostu çözümler.",
    sort_order: 5,
    is_active: true,
  },
  {
    id: 6,
    name: "Mağaza Raf Ve Ürünleri",
    href: "/hizmetler/magaza-raf-ve-urunleri",
    icon: "📦",
    description: "Mağaza içi raf sistemleri ve özel ürünler. İhtiyacınıza özel tasarım ve üretim çözümleri.",
    sort_order: 6,
    is_active: true,
  },
  {
    id: 7,
    name: "Çelik Konstrüksiyon",
    href: "/hizmetler/celik-konstruksiyon",
    icon: "🏗️",
    description: "Sağlam ve dayanıklı çelik konstrüksiyon çözümleri. Endüstriyel yapılarda güvenilir hizmet.",
    sort_order: 7,
    is_active: true,
  },
];

export default async function HizmetlerPage() {
  const services = await getServices();
  const displayServices = services.length > 0 ? services : fallbackServices;

  // İstatistikler
  const stats = [
    { number: "20+", label: "Yıllık Deneyim", icon: "📅" },
    { number: "1000+", label: "Tamamlanan Proje", icon: "✅" },
    { number: "500+", label: "Mutlu Müşteri", icon: "😊" },
    { number: "7", label: "Hizmet Alanı", icon: "⚡" },
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        {/* Hero Section - Modern ve Etkileyici */}
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
          {/* Arka Plan Dekorasyonu */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                <span className="text-white/90 text-sm font-bold">HİZMETLERİMİZ</span>
              </div>
              
              {/* Ana Başlık */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                Endüstriyel Üretimde
                <span className="block text-blue-300 mt-2">Kalite ve Güven</span>
              </h1>
              
              {/* Alt Başlık */}
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                20+ yıllık deneyimimizle profesyonel çözümler sunuyoruz. 
                <span className="block mt-2 text-white font-semibold">
                  CNC lazer kesimden elektrik pano üretimine kadar geniş hizmet yelpazemiz.
                </span>
              </p>

              {/* İstatistikler */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.number}</div>
                    <div className="text-blue-100 text-sm font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hizmetler Grid - Modern ve Verimli Layout */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            {/* Bölüm Başlığı */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Tüm Hizmetlerimiz
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Endüstriyel üretimden özel tasarıma kadar geniş hizmet yelpazemizle yanınızdayız
              </p>
            </div>

            {/* Hizmetler Grid - Responsive ve Verimli */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {displayServices.map((service, index) => {
                const isFeatured = index === 0; // İlk hizmet featured
                
                return (
                  <Link
                    href={service.href}
                    key={service.id}
                    className={`group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
                      isFeatured 
                        ? "md:col-span-2 lg:col-span-1 border-4 border-yellow-400 shadow-yellow-400/30" 
                        : "border-2 border-slate-200"
                    }`}
                  >
                    {/* Görsel Container */}
                    <div className={`relative overflow-hidden ${isFeatured ? 'h-64' : 'h-56'}`}>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-slate-900/90 z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
                      
                      {/* İkon */}
                      <div className="absolute top-6 right-6 text-6xl z-20 opacity-90 group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </div>

                      {/* Hizmet Başlığı - Görsel Üzerinde */}
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-blue-200 transition-colors">
                          {service.name}
                        </h3>
                      </div>

                      {/* Dekoratif Element */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>

                    {/* İçerik */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col">
                      <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                        {service.description || `${service.name} hizmetlerimiz hakkında detaylı bilgi almak için tıklayın.`}
                      </p>
                      
                      {/* CTA Butonu */}
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                        <span>Detayları İncele</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Özellikler Bölümü - Modern Cards */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                  Neden Bizi Seçmelisiniz?
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımız
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  {
                    icon: "⭐",
                    title: "Kaliteli İşçilik",
                    description: "20+ yıllık deneyimimizle en yüksek kalite standartlarında üretim",
                  },
                  {
                    icon: "⚡",
                    title: "Hızlı Teslimat",
                    description: "Zamanında ve hızlı teslimat garantisi ile projelerinizi aksatmıyoruz",
                  },
                  {
                    icon: "🎯",
                    title: "Uzman Ekip",
                    description: "Alanında uzman mühendis ve teknik ekibimizle profesyonel hizmet",
                  },
                  {
                    icon: "💼",
                    title: "Geniş Hizmet Yelpazesi",
                    description: "Tek çatı altında tüm endüstriyel üretim ihtiyaçlarınızı karşılıyoruz",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-slate-200 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bölümü - Modern ve Etkileyici */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Arka Plan */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Projeniz İçin
                <span className="block text-blue-300 mt-2">Hemen Teklif Alın</span>
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz. 
                Hemen iletişime geçin ve kaliteli hizmetimizden yararlanın!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 min-w-[280px]"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp ile Teklif Al</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                <Link
                  href="/iletisim"
                  className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 min-w-[280px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>İletişim Formu</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO İçerik Bölümü */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Metod Mühendislik Hizmetleri
                </h2>
                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    Metod Mühendislik olarak, 20+ yıllık deneyimimizle endüstriyel üretim sektöründe 
                    öncü bir firma olarak hizmet vermekteyiz. İstanbul merkezli olarak Türkiye genelinde 
                    hizmet veren firmamız, CNC lazer kesim, CNC büküm, metal kaynak, elektrostatik toz boya, 
                    mağaza raf sistemleri, çelik konstrüksiyon ve elektrik pano üretimi alanlarında 
                    profesyonel çözümler sunmaktadır.
                  </p>
                  <p className="text-lg">
                    Müşteri memnuniyeti ve kalite odaklı hizmet anlayışımızla, her projede en yüksek 
                    standartları hedefliyoruz. Uzman ekibimiz ve modern teknolojik altyapımızla, 
                    endüstriyel üretim ihtiyaçlarınıza en uygun çözümleri sunuyoruz.
                  </p>
                  <p className="text-lg">
                    Tüm hizmetlerimizde ISO kalite standartlarına uygun üretim yapıyor, zamanında 
                    teslimat garantisi veriyoruz. Detaylı bilgi ve teklif almak için bizimle iletişime geçebilirsiniz.
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
