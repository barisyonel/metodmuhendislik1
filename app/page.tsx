import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import ProductsList from "./components/ProductsList";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metod Mühendislik | Elektrik Pano Üretimi - Marin Pano, Sıvaüstü, Sıvaaltı Pano",
  description:
    "Elektrik pano ve marin pano üretiminde 20+ yıllık deneyim. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon hizmetleri. İstanbul&apos;da kaliteli ve güvenilir elektrik pano çözümleri.",
  keywords:
    "elektrik pano, marin pano, elektrik pano üretimi, sıvaüstü pano, sıvaaltı pano, dahili pano, enerji dağıtım panosu, CNC lazer kesim, CNC büküm, kaynak, metal kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, endüstriyel üretim, mühendislik çözümleri, İstanbul, Tuzla",
  openGraph: {
    title: "Metod Mühendislik | Elektrik Pano ve Marin Pano Üretimi - İstanbul",
    description:
      "Elektrik pano ve marin pano üretiminde uzman. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. CNC lazer kesim, büküm, kaynak hizmetleri. İstanbul&apos;da kaliteli ve güvenilir çözümler.",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Metod Mühendislik",
    description:
      "Elektrik pano ve marin pano üretiminde 20+ yıllık deneyim. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. Ayrıca CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza rafları ve çelik konstrüksiyon hizmetleri sunan endüstriyel üretim firması",
    url: "https://www.metodmuhendislik.com",
    logo: "https://www.metodmuhendislik.com/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "İTOSB SANAYİ BÖLGESİ 3. YOL NO:21",
      addressLocality: "TEPEÖREN - AKFİRAT TUZLA",
      addressRegion: "İSTANBUL",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+90-216-759-56-75",
      email: "info@metodmuhendislik.com",
      availableLanguage: "Turkish",
    },
    telephone: "+90-216-759-56-75",
    email: "info@metodmuhendislik.com",
    sameAs: [
      "https://www.linkedin.com/company/metodmuhendislik",
      "https://www.facebook.com/metodmuhendislik",
    ],
  };

  const services = [
    {
      title: "Elektrik Pano Üretimi",
      description: "Sıvaüstü, sıvaaltı, marin ve dahili pano üretimi",
      icon: "⚡",
      image: "/elektrıkpano.png",
      link: "/hizmetler/elektrik-pano-uretime",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "CNC Lazer Kesim",
      description: "Hassas ve hızlı lazer kesim çözümleri",
      icon: "🔺",
      image: "/metod.png",
      link: "/hizmetler/cnc-lazer-kesim",
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "CNC Büküm",
      description: "Profesyonel büküm ve şekillendirme",
      icon: "📐",
      image: "/cncbukum.png",
      link: "/hizmetler/cnc-bukum",
      color: "from-green-600 to-green-800",
    },
    {
      title: "Metal Kaynak",
      description: "TIG, MIG/MAG kaynak hizmetleri",
      icon: "🔥",
      image: "/kaynak.png",
      link: "/hizmetler/kaynak",
      color: "from-orange-600 to-orange-800",
    },
    {
      title: "Elektrostatik Toz Boya",
      description: "RAL renk standardında boyama hizmetleri",
      icon: "🎨",
      image: "/Elektrostatik Toz Boya.png",
      link: "/hizmetler/elektrostatik-toz-boya",
      color: "from-pink-600 to-pink-800",
    },
    {
      title: "Çelik Konstrüksiyon",
      description: "Endüstriyel yapı çözümleri",
      icon: "🏗️",
      image: "/Çelik Konstrüksiyon.png",
      link: "/hizmetler/celik-konstruksiyon",
      color: "from-slate-600 to-slate-800",
    },
  ];

  const stats = [
    {
      number: "20+",
      label: "Yıllık Deneyim",
      icon: "⭐",
      description: "Sektörde lider konum",
    },
    {
      number: "2000m²",
      label: "Üretim Alanı",
      icon: "🏭",
      description: "Modern tesisler",
    },
    {
      number: "12",
      label: "Ülkeye İhracat",
      icon: "🌍",
      description: "Uluslararası standart",
    },
    {
      number: "ISO",
      label: "9001 Sertifikalı",
      icon: "✓",
      description: "Kalite garantisi",
    },
  ];

  const whyChooseUs = [
    {
      icon: "🎯",
      title: "Uzman Ekip",
      description: "Alanında uzman mühendisler ve teknisyenler ile profesyonel hizmet",
    },
    {
      icon: "⚡",
      title: "Hızlı Teslimat",
      description: "Zamanında ve kaliteli teslimat garantisi ile projelerinizi güvende",
    },
    {
      icon: "🔧",
      title: "Modern Teknoloji",
      description: "Son teknoloji makine parkı ile yüksek kaliteli üretim",
    },
    {
      icon: "📊",
      title: "Kalite Odaklı",
      description: "ISO 9001 sertifikalı kalite yönetim sistemi ile standartların üzerinde",
    },
    {
      icon: "💼",
      title: "Çözüm Ortağı",
      description: "Sadece üretici değil, projelerinizde güvenilir çözüm ortağı",
    },
    {
      icon: "🌐",
      title: "Global Deneyim",
      description: "12 ülkeye ihracat deneyimi ile uluslararası standartlarda hizmet",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white min-h-screen">
        {/* MODERN HERO SECTION */}
        <section
          className="relative w-full h-[90vh] md:h-[95vh] overflow-hidden"
          aria-label="Ana Hero Bölümü"
        >
          <HeroSlider />
        </section>

        {/* GÜVEN UNSURLARI - İSTATİSTİKLER */}
        <section
          className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b border-slate-200"
          aria-label="Güven Unsurları"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-100 rounded-full">
                  Güvenilir Çözüm Ortağınız
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                  Sektörde <span className="text-blue-600">Öncü</span> Konumdayız
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="group relative bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {stat.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="text-5xl md:text-6xl font-black text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1">
                        {stat.label}
                      </h3>
                      <p className="text-xs text-slate-600">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HİZMETLER ÖNİZLEME - MODERN GRID */}
        <section
          className="py-20 md:py-32 bg-white"
          aria-label="Hizmetlerimiz"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-100 rounded-full">
                  Hizmetlerimiz
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                  Endüstriyel <span className="text-blue-600">Üretim</span> Çözümleri
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                  20+ yıllık deneyimimizle, elektrik pano üretiminden CNC lazer kesime kadar
                  geniş hizmet yelpazemiz ile yanınızdayız.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, i) => (
                  <Link
                    key={i}
                    href={service.link}
                    className="group relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                      <div className="absolute top-4 left-4 text-5xl drop-shadow-lg">
                        {service.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Detaylı Bilgi</span>
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
          </div>
        </section>

        {/* ÖRNEK ÜRÜNLER BÖLÜMÜ */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50"
          aria-label="Örnek Ürünlerimiz"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-100 rounded-full">
                  Ürünlerimiz
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
                  Örnek <span className="text-blue-600">Ürünlerimiz</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Endüstriyel üretim çözümlerimizden örnekler. Kaliteli ve güvenilir ürünlerimizi keşfedin.
                </p>
              </div>

              {/* SEO İyileştirici Metin */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-slate-700 text-base leading-relaxed text-center">
                  <strong>Metod Mühendislik</strong> olarak, <strong>elektrik pano üretimi</strong>,{" "}
                  <strong>marin pano</strong>, <strong>sıvaüstü pano</strong> ve{" "}
                  <strong>sıvaaltı pano</strong> başta olmak üzere endüstriyel üretim çözümleri
                  sunuyoruz. <strong>CNC lazer kesim</strong>, <strong>CNC büküm</strong>,{" "}
                  <strong>metal kaynak</strong>, <strong>elektrostatik toz boya</strong> ve{" "}
                  <strong>çelik konstrüksiyon</strong> hizmetlerimizle üretilen ürünlerimiz, ISO
                  9001 kalite standartlarına uygun olarak İstanbul&apos;daki modern tesisimizde
                  üretilmektedir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <ProductsList />
              </div>

              {/* Tüm Ürünleri Gör Butonu */}
              <div className="text-center">
                <Link
                  href="/urunler"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
                >
                  Tüm Ürünleri Görüntüle
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
            </div>
          </div>
        </section>

        {/* NEDEN BİZ - MODERN TASARIM */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden"
          aria-label="Neden Bizi Seçmelisiniz"
        >
          {/* Arka Plan Dekorasyon */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-blue-400 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                  Neden Metod Mühendislik?
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-6">
                  Sektörde <span className="text-blue-400">Güvenilir</span> Çözüm Ortağınız
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  20+ yıllık deneyimimiz ve uzman ekibimizle endüstriyel üretimde kalite ve
                  müşteri memnuniyetini ön planda tutuyoruz.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {whyChooseUs.map((item, i) => (
                  <div
                    key={i}
                    className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp ile Teklif Al
                </a>
                <Link
                  href="/kurumsal/hakkimizda"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Hakkımızda
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
            </div>
          </div>
        </section>

        {/* SERTİFİKALAR VE GÜVEN UNSURLARI */}
        <section
          className="py-16 md:py-24 bg-white border-y border-slate-200"
          aria-label="Sertifikalarımız"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Sertifikalarımız ve Standartlar
                </h2>
                <p className="text-slate-600">
                  Uluslararası kalite standartlarına uygun üretim
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "ISO 9001", desc: "Kalite Yönetimi" },
                  { name: "ISO 14001", desc: "Çevre Yönetimi" },
                  { name: "ISO 45001", desc: "İş Güvenliği" },
                  { name: "Tip Test", desc: "Ürün Onayı" },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all text-center"
                  >
                    <div className="text-3xl font-black text-blue-600 mb-2">{cert.name}</div>
                    <p className="text-xs text-slate-600">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODERN CTA BÖLÜMÜ */}
        <section
          className="relative py-20 md:py-32 text-white overflow-hidden"
          aria-label="İletişim Çağrısı"
        >
          {/* Arka Plan */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/metod.png"
              alt="Metod Mühendislik"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
            <div className="absolute inset-0 bg-slate-900/40"></div>
          </div>

          {/* İçerik */}
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-blue-300 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Hemen Başlayalım
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Projeniz İçin <br className="md:hidden" />
                <span className="text-blue-300">Hemen Teklif Alın</span>
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz.
                Hemen iletişime geçin!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp ile Teklif Al
                </a>
                <Link
                  href="/katalog"
                  className="bg-blue-600/90 backdrop-blur-md border-2 border-blue-500/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700/90 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Kataloğu İncele
                </Link>
                <Link
                  href="/iletisim"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
