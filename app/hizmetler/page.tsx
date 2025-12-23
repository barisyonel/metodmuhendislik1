import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | CNC Lazer Kesim, Büküm, Kaynak, Elektrik Pano ve Çelik Konstrüksiyon",
  description:
    "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon ve elektrik pano üretimi hizmetlerimiz. İstanbul'da profesyonel endüstriyel üretim çözümleri.",
  keywords:
    "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, elektrik pano üretimi, İstanbul, endüstriyel üretim",
  openGraph: {
    title: "Hizmetlerimiz | Metod Mühendislik",
    description:
      "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon ve elektrik pano üretimi hizmetlerimiz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function HizmetlerPage() {
  const hizmetler = [
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
      img: "https://picsum.photos/seed/bend1/600/400",
    },
    {
      slug: "kaynak",
      title: "Kaynak & İmalat",
      description:
        "Yüksek kaliteli kaynak ve imalat hizmetleri ile güvenilir çözümler. TIG, MIG/MAG kaynak yöntemleri ile uzman ekibimizle profesyonel hizmet.",
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
    {
      slug: "elektrik-pano-uretime",
      title: "Elektrik Pano Üretimi",
      description:
        "Müşteri ihtiyaçlarına özel elektrik pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri. Sıvaüstü, sıvaaltı ve dahili pano üretimi.",
      icon: "⚡",
      color: "from-yellow-500 to-yellow-600",
      img: "https://picsum.photos/seed/panel1/600/400",
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
                  className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
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
            <Link
              href="/iletisim"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
            >
              İLETİŞİME GEÇ
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

