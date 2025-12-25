import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | CNC Lazer Kesim, Büküm, Kaynak, Elektrik Pano ve Çelik Konstrüksiyon",
  description:
    "CNC lazer kesim, CNC büküm, metal kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon, elektrik pano ve marin pano üretimi hizmetlerimiz. İstanbul'da profesyonel endüstriyel üretim çözümleri.",
  keywords:
    "CNC lazer kesim, CNC büküm, kaynak, metal kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, elektrik pano, marin pano, elektrik pano üretimi, İstanbul, endüstriyel üretim",
  openGraph: {
    title: "Hizmetlerimiz | Metod Mühendislik",
    description:
      "CNC lazer kesim, CNC büküm, metal kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon, elektrik pano ve marin pano üretimi hizmetlerimiz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function HizmetlerPage() {
  const hizmetler = [
    {
      slug: "elektrik-pano-uretime",
      title: "Elektrik Pano Üretimi",
      description:
        "20+ yıllık deneyimimizle elektrik pano ve marin pano üretiminde sektörün öncü firması. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri.",
      icon: "⚡",
      color: "from-yellow-500 to-yellow-600",
      img: "/elektrıkpano.png",
      featured: true,
    },
    {
      slug: "cnc-lazer-kesim",
      title: "CNC Lazer Kesim",
      description:
        "Hassas ve hızlı lazer kesim hizmetleri ile endüstriyel üretimde öncü. Yüksek kaliteli malzemelerde kesim çözümleri. ±0.05 mm hassasiyet ile profesyonel hizmet.",
      icon: "⚡",
      color: "from-blue-500 to-blue-600",
      img: "https://picsum.photos/seed/laser1/600/400",
    },
    {
      slug: "cnc-bukum",
      title: "CNC Büküm",
      description:
        "Profesyonel CNC büküm hizmetleri ile şekillendirme çözümleri. Hassas açı kontrolü ve kaliteli işçilik. Kompleks geometrili parçalar için ideal çözüm.",
      icon: "🔧",
      color: "from-slate-600 to-slate-700",
      img: "/cncbukum.png",
    },
    {
      slug: "kaynak",
      title: "Kaynak & İmalat",
      description:
        "Yüksek kaliteli metal kaynak ve imalat hizmetleri ile güvenilir çözümler. TIG, MIG/MAG kaynak yöntemleri ile uzman ekibimizle profesyonel hizmet.",
      icon: "🔥",
      color: "from-orange-500 to-orange-600",
      img: "https://picsum.photos/seed/weld1/600/400",
    },
    {
      slug: "elektrostatik-toz-boya",
      title: "Elektrostatik Toz Boya",
      description:
        "Modern boya teknolojileri ile uzun ömürlü ve estetik yüzey işlemleri. Çevre dostu çözümler. RAL renk standardına uygun boyama hizmetleri.",
      icon: "🎨",
      color: "from-purple-500 to-purple-600",
      img: "https://picsum.photos/seed/paint1/600/400",
    },
    {
      slug: "magaza-raf-ve-urunleri",
      title: "Mağaza Raf Ve Ürünleri",
      description:
        "Mağaza içi raf sistemleri ve özel ürünler. İhtiyacınıza özel tasarım ve üretim çözümleri. Estetik ve fonksiyonel mağaza düzenlemeleri.",
      icon: "📦",
      color: "from-green-500 to-green-600",
      img: "https://picsum.photos/seed/shelf1/600/400",
    },
    {
      slug: "celik-konstruksiyon",
      title: "Çelik Konstrüksiyon",
      description:
        "Sağlam ve dayanıklı çelik konstrüksiyon çözümleri. Endüstriyel yapılarda güvenilir hizmet. Mühendislik standartlarına uygun projeler.",
      icon: "🏗️",
      color: "from-gray-600 to-gray-700",
      img: "https://picsum.photos/seed/steel1/600/400",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Hizmetlerimiz
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Endüstriyel üretimde kalite ve güvenin adresi. 20+ yıllık deneyimimizle
              profesyonel çözümler sunuyoruz.
            </p>
          </div>
        </section>

        {/* HİZMETLER LİSTESİ */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hizmetler.map((hizmet) => (
                <Link
                  href={`/hizmetler/${hizmet.slug}`}
                  key={hizmet.slug}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    hizmet.featured 
                      ? "border-4 border-yellow-500 shadow-xl shadow-yellow-500/30" 
                      : "border border-slate-200"
                  }`}
                >
                  {/* Görsel */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={hizmet.img}
                      alt={hizmet.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${hizmet.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
                    />
                    <div className="absolute top-4 right-4 text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {hizmet.icon}
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {hizmet.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {hizmet.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Detayları İncele</span>
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BÖLÜMÜ */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              PROJENİZ İÇİN HEMEN TEKLİF ALIN
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz.
              Hemen iletişime geçin!
            </p>
            <a
              href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp ile Teklif Al
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

