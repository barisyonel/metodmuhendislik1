import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import ProductsList from "./components/ProductsList";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metod Mühendislik | CNC Lazer Kesim, Büküm, Kaynak, Elektrik Pano ve Çelik Konstrüksiyon",
  description:
    "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza rafları, çelik konstrüksiyon ve elektrik pano üretimi hizmetleri. İstanbul'da 20+ yıllık deneyim ile endüstriyel üretim çözümleri. Kaliteli ve güvenilir hizmet.",
  keywords:
    "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, elektrik pano üretimi, endüstriyel üretim, mühendislik çözümleri, İstanbul, Tuzla",
  openGraph: {
    title: "Metod Mühendislik | CNC Lazer Kesim, Büküm, Kaynak ve Elektrik Pano Üretimi",
    description:
      "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza rafları, çelik konstrüksiyon ve elektrik pano üretimi hizmetleri. İstanbul'da kaliteli ve güvenilir çözümler.",
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
      "CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza rafları, çelik konstrüksiyon ve elektrik pano üretimi hizmetleri sunan endüstriyel üretim firması",
    url: "https://metodmuhendislik.com",
    logo: "https://metodmuhendislik.com/logo.png",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* HERO SECTION - FULL WIDTH SLIDER */}
        <section
          className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden"
          aria-label="Ana Hero Bölümü"
        >
          <HeroSlider />
        </section>

        {/* ÖRNEK ÜRÜNLER BÖLÜMÜ */}
        <section className="py-16 md:py-24 bg-white" aria-label="Örnek Ürünlerimiz">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
                Ürünlerimiz
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                Örnek Ürünlerimiz
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Endüstriyel üretim çözümlerimizden örnekler. Kaliteli ve güvenilir ürünlerimizi keşfedin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductsList />
            </div>

            {/* Tüm Ürünleri Gör Butonu */}
            <div className="text-center mt-12">
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
        </section>

        {/* HERO SECTION - 3 SORUYA CEVAP */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* H1 - Ana Başlık */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight text-center">
                Endüstriyel Üretimde Güvenilir Çözüm Ortağınız
              </h1>
              
              {/* 3 Soruya Cevap - F-Tipi Okuma Düzeni */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
                {/* Ne Sunuyorsunuz? */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">
                    Ne Sunuyoruz?
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon ve elektrik pano üretimi hizmetleri.
                  </p>
                </div>

                {/* Kullanıcıya Ne Fayda Sağlıyorsunuz? */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">
                    Size Ne Fayda Sağlıyoruz?
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    20+ yıllık deneyim, ISO 9001 kalite sertifikası, zamanında teslimat garantisi ve uzman mühendislik ekibi ile projelerinizi güvenle teslim ediyoruz.
                  </p>
                </div>

                {/* Kullanıcı Ne Yapmalı? */}
                <div className="text-center md:text-left">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">
                    Ne Yapmalısınız?
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    Hemen ücretsiz teklif alın! Uzman ekibimiz projenizi değerlendirip en uygun çözümü sunuyor.
                  </p>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
                  >
                    Teklif Al
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HIZLI İSTATİSTİKLER - GÜVEN BÖLÜMÜ - Gulpano Tarzı */}
        <section
          className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
          aria-label="İstatistikler ve Başarılar"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                METOD MÜHENDİSLİK
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
              {[
                {
                  number: "12",
                  label: "Ülkeye İhracat",
                  icon: "🌍",
                },
                {
                  number: "6000m²",
                  label: "Üretim Alanı",
                  icon: "🏭",
                },
                {
                  number: "%100",
                  label: "Türk Sermayesi",
                  icon: "🇹🇷",
                },
                {
                  number: "20+",
                  label: "Yıllık Tecrübe",
                  icon: "⭐",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center group cursor-default bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <p className="text-5xl md:text-6xl font-black text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
                    {stat.number}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-200 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÇÖZÜMLER BÖLÜMÜ - Gulpano Tarzı */}
        <section className="py-20 md:py-32 bg-white" aria-label="Çözümlerimiz">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Endüstriyel Üretim Çözümlerimiz
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Üstün teknoloji sınırsız kalite anlayışıyla geleceğe çözüm sunan
                ürünlerimiz TSE standartlarında üretilmektedir. CNC lazer kesim, büküm, kaynak, elektrostatik toz boya, mağaza raf sistemleri, çelik konstrüksiyon ve elektrik pano üretimi hizmetlerimizle yanınızdayız.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  title: "CNC Lazer Kesim",
                  desc: "Hassas ve hızlı lazer kesim çözümleri ile endüstriyel üretimde öncü. Yüksek kaliteli malzemelerde kesim hizmetleri.",
                  link: "/hizmetler/cnc-lazer-kesim",
                  icon: "⚡",
                },
                {
                  title: "CNC Büküm",
                  desc: "Profesyonel CNC büküm hizmetleri ile şekillendirme çözümleri. Hassas açı kontrolü ve kaliteli işçilik.",
                  link: "/hizmetler/cnc-bukum",
                  icon: "🔧",
                },
                {
                  title: "Kaynak & İmalat",
                  desc: "Yüksek kaliteli kaynak ve imalat hizmetleri ile güvenilir çözümler. Uzman ekibimizle profesyonel hizmet.",
                  link: "/hizmetler/kaynak",
                  icon: "🔥",
                },
                {
                  title: "Elektrik Pano Üretimi",
                  desc: "Müşteri ihtiyaçlarına özel elektrik pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri.",
                  link: "/hizmetler/elektrik-pano-uretime",
                  icon: "⚡",
                },
              ].map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Gözat
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
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HİZMETLER BÖLÜMÜ - DETAYLI KARTLAR */}
        <section
          className="py-20 md:py-32 bg-slate-50 container mx-auto px-6"
          aria-label="Hizmetlerimiz"
        >
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
              Tüm Hizmetlerimiz
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
              ENDÜSTRİYEL <br className="md:hidden" /> ÜRETİM{" "}
              <span className="text-blue-600">ÇÖZÜMLERİ</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              CNC lazer kesim, büküm, kaynak ve mühendislik hizmetlerimizle
              endüstriyel üretimde güvenilir çözüm ortağınızız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CNC Lazer Kesim",
                desc: "Hassas ve hızlı lazer kesim hizmetleri ile endüstriyel üretimde öncü. Yüksek kaliteli malzemelerde kesim çözümleri. ±0.05 mm hassasiyet ile profesyonel hizmet.",
                img: "https://picsum.photos/seed/laser1/600/400",
                link: "/hizmetler/cnc-lazer-kesim",
                icon: "⚡",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "CNC Büküm",
                desc: "Profesyonel CNC büküm hizmetleri ile şekillendirme çözümleri. Hassas açı kontrolü ve kaliteli işçilik. Kompleks geometrili parçalar için ideal çözüm.",
                img: "https://picsum.photos/seed/bend1/600/400",
                link: "/hizmetler/cnc-bukum",
                icon: "🔧",
                color: "from-slate-600 to-slate-700",
              },
              {
                title: "Kaynak & İmalat",
                desc: "Yüksek kaliteli kaynak ve imalat hizmetleri ile güvenilir çözümler. TIG, MIG/MAG kaynak yöntemleri ile uzman ekibimizle profesyonel hizmet.",
                img: "https://picsum.photos/seed/weld1/600/400",
                link: "/hizmetler/kaynak",
                icon: "🔥",
                color: "from-orange-500 to-orange-600",
              },
              {
                title: "Elektrostatik Toz Boya",
                desc: "Modern boya teknolojileri ile uzun ömürlü ve estetik yüzey işlemleri. Çevre dostu çözümler. RAL renk standardına uygun boyama hizmetleri.",
                img: "https://picsum.photos/seed/paint1/600/400",
                link: "/hizmetler/elektrostatik-toz-boya",
                icon: "🎨",
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Mağaza Raf Ve Ürünleri",
                desc: "Mağaza içi raf sistemleri ve özel ürünler. İhtiyacınıza özel tasarım ve üretim çözümleri. Estetik ve fonksiyonel mağaza düzenlemeleri.",
                img: "https://picsum.photos/seed/shelf1/600/400",
                link: "/hizmetler/magaza-raf-ve-urunleri",
                icon: "📦",
                color: "from-green-500 to-green-600",
              },
              {
                title: "Çelik Konstrüksiyon",
                desc: "Sağlam ve dayanıklı çelik konstrüksiyon çözümleri. Endüstriyel yapılarda güvenilir hizmet. Mühendislik standartlarına uygun projeler.",
                img: "https://picsum.photos/seed/steel1/600/400",
                link: "/hizmetler/celik-konstruksiyon",
                icon: "🏗️",
                color: "from-gray-600 to-gray-700",
              },
              {
                title: "Elektrik Pano Üretimi",
                desc: "Müşteri ihtiyaçlarına özel elektrik pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri. Sıvaüstü, sıvaaltı ve dahili pano üretimi.",
                img: "https://picsum.photos/seed/panel1/600/400",
                link: "/hizmetler/elektrik-pano-uretime",
                icon: "⚡",
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((item, i) => (
              <Link
                href={item.link}
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Görsel */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
                  />
                  <div className="absolute top-4 right-4 text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.desc}
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
        </section>

        {/* ÜSTÜN TEKNOLOJİ BÖLÜMÜ - Gulpano Tarzı */}
        <section
          className="py-20 md:py-32 bg-white"
          aria-label="Üstün Teknoloji"
        >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-600 to-slate-900 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl mb-4">🏭</div>
                    <div className="text-4xl font-black mb-2">METOD</div>
                    <div className="text-2xl font-bold text-blue-300">
                      MÜHENDİSLİK
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                  Üstün Teknoloji, Sınırsız Kalite
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  <strong>Metod Mühendislik</strong> olarak, başarı yolculuğumuzu
                  20 yıldır, &quot;üstün teknoloji sınırsız kalite&quot;
                  anlayışıyla sürdürüp sektördeki öncü firmalar arasındaki
                  iddiamıza devam etmekteyiz.
                </p>
                <Link
                  href="/kurumsal/hakkimizda"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
                >
                  BİLGİ
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

        {/* SOSYAL KANIT BÖLÜMÜ - Müşteri Yorumları ve Referanslar */}
        <section
          className="py-20 md:py-32 bg-slate-50"
          aria-label="Müşteri Yorumları ve Referanslar"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
                Sosyal Kanıt
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Müşterilerimiz Ne Diyor?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                20+ yıldır sektörde güvenilir çözüm ortağı olarak hizmet veriyoruz
              </p>
            </div>

            {/* Müşteri Yorumları */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Ahmet Yılmaz",
                  company: "ABC Endüstri A.Ş.",
                  comment:
                    "Metod Mühendislik ile çalışmaktan çok memnunuz. CNC lazer kesim hizmetlerinde zamanında teslimat ve yüksek kalite standartları sunuyorlar.",
                  rating: 5,
                },
                {
                  name: "Ayşe Demir",
                  company: "XYZ Makine Sanayi",
                  comment:
                    "Elektrik pano üretimi projemizde profesyonel yaklaşımları ve teknik desteği ile projemizi başarıyla tamamladık. Kesinlikle tavsiye ederim.",
                  rating: 5,
                },
                {
                  name: "Mehmet Kaya",
                  company: "DEF Çelik Konstrüksiyon",
                  comment:
                    "Çelik konstrüksiyon projemizde mühendislik çözümleri ve üretim kalitesi açısından beklentilerimizi aştılar. Teşekkürler Metod Mühendislik!",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed mb-6">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Referans Logoları / Sektörler */}
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-8">
                Güvendiğimiz Sektörler
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                {[
                  "CNC Lazer Kesim",
                  "CNC Büküm",
                  "Kaynak",
                  "Çelik Konstrüksiyon",
                  "Enerji",
                  "Elektrik Pano Üretimi",
                ].map((sector, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-center"
                  >
                    <p className="text-slate-700 font-semibold text-sm">{sector}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEDEN BİZ BÖLÜMÜ - Güçlendirilmiş */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          aria-label="Neden Bizi Seçmelisiniz"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block text-blue-400 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Neden Metod Mühendislik?
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                KALİTE, <span className="text-blue-400">GÜVEN</span> VE{" "}
                <span className="text-blue-400">DENEYİM</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                20+ yıllık deneyimimiz ve uzman ekibimizle endüstriyel üretimde
                güvenilir çözüm ortağınızız. Her projede kalite ve müşteri
                memnuniyetini ön planda tutuyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  {[
                    {
                      icon: "✓",
                      title: "ISO 9001 Kalite Yönetim Sistemi",
                      desc: "Uluslararası kalite standartlarına uygun üretim",
                    },
                    {
                      icon: "✓",
                      title: "20+ Yıllık Sektör Deneyimi",
                      desc: "Binlerce başarılı proje ile kanıtlanmış tecrübe",
                    },
                    {
                      icon: "✓",
                      title: "Uzman Mühendislik Ekibi",
                      desc: "Alanında uzman mühendislerle profesyonel hizmet",
                    },
                    {
                      icon: "✓",
                      title: "Zamanında Teslimat Garantisi",
                      desc: "Projelerinizi zamanında ve kaliteli şekilde teslim",
                    },
                    {
                      icon: "✓",
                      title: "6000m² Üretim Alanı",
                      desc: "Modern teknoloji ile donatılmış geniş üretim tesisi",
                    },
                    {
                      icon: "✓",
                      title: "12 Ülkeye İhracat",
                      desc: "Uluslararası standartlarda üretim ve hizmet",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-slate-200 font-bold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/kurumsal/hakkimizda"
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
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
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    İletişime Geç
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "1500+", label: "Yıllık Üretim", icon: "🏭" },
                  { number: "450+", label: "Tamamlanan Proje", icon: "✅" },
                  { number: "12", label: "Ülkeye İhracat", icon: "🌍" },
                  { number: "20+", label: "Yıl Deneyim", icon: "⭐" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <p className="text-4xl font-black text-blue-400 mb-2">
                      {stat.number}
                    </p>
                    <p className="text-slate-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO İÇERİK BÖLÜMÜ - 800-1200 Kelime */}
        <section
          className="py-20 md:py-32 bg-white"
          aria-label="Endüstriyel Üretim Hakkında"
        >
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-[1800px] mx-auto">
              <div className="prose prose-lg prose-slate max-w-none seo-article-content">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Endüstriyel Üretimde CNC Lazer Kesim, Büküm, Kaynak ve Elektrik Pano Üretimi Hizmetlerinin Önemi
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Modern endüstriyel üretim süreçlerinde, hassas ve kaliteli
                  imalat çözümleri büyük önem taşımaktadır.
                  <strong> Metod Mühendislik</strong> olarak, 20 yılı aşkın
                  deneyimimizle sektörde öncü konumdayız. CNC lazer kesim, CNC
                  büküm, kaynak ve mühendislik çözümleri alanında sunduğumuz
                  hizmetler, endüstriyel üretimde güvenilir çözüm ortağı
                  olmamızı sağlamaktadır.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  CNC Lazer Kesim Teknolojisi ve Avantajları
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>CNC lazer kesim</strong>, endüstriyel üretimde en
                  hassas ve hızlı kesim yöntemlerinden biridir. Yüksek güçlü
                  lazer ışınları kullanılarak gerçekleştirilen bu işlem, çelik,
                  paslanmaz çelik, alüminyum ve diğer metal malzemelerde
                  mükemmel sonuçlar vermektedir. CNC lazer kesim teknolojisinin
                  en büyük avantajları arasında, geleneksel kesim yöntemlerine
                  göre çok daha yüksek hassasiyet, minimum malzeme kaybı ve
                  hızlı üretim süreleri yer almaktadır.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, son teknoloji CNC lazer kesim
                  makinelerimiz ile çalışmaktayız. Bu makinelerimiz sayesinde,
                  kalınlığı 25 mm&apos;ye kadar olan siyah sac ve 15 mm&apos;ye
                  kadar olan paslanmaz çelik malzemelerde kesim işlemleri
                  gerçekleştirebilmekteyiz. Kesim hassasiyetimiz ±0.05 mm
                  seviyesindedir, bu da endüstriyel standartların çok üzerinde
                  bir kalite sunmaktadır. CNC lazer kesim hizmetlerimiz,
                  otomotiv, makine imalatı, mimari uygulamalar ve genel
                  endüstriyel üretim sektörlerinde yaygın olarak
                  kullanılmaktadır.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  CNC Büküm ve Şekillendirme Çözümleri
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>CNC büküm</strong> veya CNC abkant büküm, metal
                  levhaların hassas açılarla şekillendirilmesi için kullanılan
                  modern bir üretim yöntemidir. Bu teknoloji sayesinde, kompleks
                  geometrili parçalar tek seferde ve yüksek hassasiyetle
                  üretilebilmektedir. CNC büküm makinelerimiz, programlanabilir
                  kontrol sistemleri sayesinde, tekrarlanabilir ve tutarlı
                  sonuçlar sunmaktadır.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Endüstriyel üretimde CNC büküm hizmetlerimiz, özellikle pano
                  üretimi, makine gövdeleri, mimari uygulamalar ve özel tasarım
                  ürünlerinde kritik öneme sahiptir. Uzman ekibimiz, her projede
                  müşteri gereksinimlerini analiz ederek, en uygun büküm
                  açılarını ve teknik çözümleri sunmaktadır. CNC büküm
                  sürecimizde, malzeme kalınlığına ve tipine göre özel kalıplar
                  kullanılarak, maksimum kalite ve minimum fire oranı
                  hedeflenmektedir.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  Kaynak ve İmalat Hizmetlerinde Uzmanlık
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Kaynak</strong> ve imalat hizmetlerimiz, endüstriyel
                  üretim süreçlerinin vazgeçilmez bir parçasıdır. TIG kaynak,
                  MIG/MAG kaynak ve elektrot kaynağı gibi farklı kaynak
                  yöntemlerini kullanarak, çelik, paslanmaz çelik, alüminyum ve
                  diğer metal alaşımlarda profesyonel kaynak işlemleri
                  gerçekleştirmekteyiz. Kaynak işlemlerimiz, uluslararası
                  standartlara uygun olarak yapılmakta ve kalite kontrol
                  testlerinden geçmektedir.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Endüstriyel üretimde kaynak hizmetlerimiz, özellikle çelik
                  konstrüksiyon, makine imalatı, tank ve basınçlı kap üretimi
                  gibi kritik uygulamalarda kullanılmaktadır. Uzman
                  kaynakçılarımız, yılların verdiği deneyimle, her türlü kaynak
                  işlemini gerçekleştirebilmektedir. Kaynak işlemlerimizde,
                  malzeme özelliklerine uygun kaynak malzemeleri ve
                  parametreleri seçilerek, maksimum dayanıklılık ve güvenilirlik
                  sağlanmaktadır.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  Elektrostatik Toz Boya ve Yüzey İşlemleri
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrostatik toz boya</strong> teknolojisi,
                  endüstriyel üretimde uzun ömürlü ve estetik yüzey işlemleri
                  için tercih edilen modern bir yöntemdir. Bu teknoloji
                  sayesinde, metal yüzeylerde kalıcı, çevre dostu ve yüksek
                  kaliteli boya kaplamaları elde edilmektedir. Elektrostatik toz
                  boya işlemlerimiz, ön yüzey hazırlığından fırınlama sürecine
                  kadar tüm aşamalarda uzman kontrolü altında
                  gerçekleştirilmektedir.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, geniş bir renk paleti ve farklı
                  yüzey dokuları sunmaktayız. Elektrostatik toz boya
                  hizmetlerimiz, özellikle pano üretimi, makine gövdeleri,
                  mimari uygulamalar ve genel endüstriyel ürünlerde
                  kullanılmaktadır. Boya işlemlerimizde, RAL renk standardına
                  uygun olarak çalışmakta ve müşteri taleplerine göre özel
                  renkler de üretebilmekteyiz.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  Çelik Konstrüksiyon ve Mühendislik Çözümleri
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Çelik konstrüksiyon</strong> projelerimiz, endüstriyel
                  yapılarda güvenilir ve dayanıklı çözümler sunmaktadır. Uzman
                  mühendislik ekibimiz, her projede statik hesaplamalar, tasarım
                  ve üretim süreçlerini yönetmektedir. Çelik konstrüksiyon
                  hizmetlerimiz, fabrika binaları, depo yapıları, köprüler ve
                  özel mimari uygulamalar gibi geniş bir yelpazede
                  kullanılmaktadır.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Endüstriyel üretimde mühendislik çözümlerimiz, sadece üretim
                  süreçleriyle sınırlı kalmamakta, proje yönetimi, teknik
                  danışmanlık ve kalite kontrol hizmetlerini de kapsamaktadır.
                  Müşterilerimizin ihtiyaçlarına özel çözümler geliştirerek,
                  endüstriyel üretim süreçlerinde verimliliği artırmakta ve
                  maliyetleri optimize etmekteyiz.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  Elektrik Pano Üretimi ve Enerji Dağıtım Çözümleri
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrik pano üretimi</strong>, endüstriyel ve ticari yapılarda güvenli enerji dağıtımı için kritik öneme sahiptir. Metod Mühendislik olarak, müşteri ihtiyaçlarına özel tasarım ve üretim çözümleri sunmaktayız. Sıvaüstü pano, sıvaaltı pano, dahili pano ve özel tip panolar üretmekteyiz.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Elektrik pano üretimimizde, uluslararası standartlara uygun olarak çalışmakta ve kalite kontrol testlerinden geçirmekteyiz. Her projede, müşteri gereksinimlerini analiz ederek, en uygun teknik çözümleri sunmaktayız. Elektrik pano üretim hizmetlerimiz, fabrika binaları, ticari yapılar, konut projeleri ve endüstriyel tesislerde yaygın olarak kullanılmaktadır.
                </p>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6">
                  Kalite ve Güvenilirlik Standartları
                </h2>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, tüm üretim süreçlerimizde kalite ve
                  güvenilirliği ön planda tutmaktayız. ISO 9001 Kalite Yönetim
                  Sistemi sertifikamız, üretim süreçlerimizin uluslararası
                  standartlara uygunluğunu göstermektedir. Her projede, malzeme
                  seçiminden nihai ürüne kadar tüm aşamalarda kalite kontrol
                  testleri gerçekleştirilmektedir.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Endüstriyel üretimde, zamanında teslimat ve müşteri
                  memnuniyeti bizim için kritik öneme sahiptir. 20 yılı aşkın
                  deneyimimiz ve uzman ekibimizle, her projede müşterilerimizin
                  beklentilerini aşmayı hedeflemekteyiz. CNC lazer kesim, CNC
                  büküm, kaynak ve diğer hizmetlerimizde, modern teknoloji ve
                  geleneksel ustalığı birleştirerek, endüstriyel üretimde
                  güvenilir çözüm ortağı olmaktayız.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Sektördeki lider konumumuz, sürekli teknoloji yatırımları,
                  uzman personel eğitimleri ve müşteri odaklı hizmet anlayışımız
                  sayesinde korunmaktadır. Endüstriyel üretim ihtiyaçlarınız
                  için Metod Mühendislik ile iletişime geçerek, profesyonel
                  çözümlerimizden faydalanabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BÖLÜMÜ */}
        <section
          className="relative py-20 md:py-32 text-white overflow-hidden"
          aria-label="İletişim Çağrısı"
        >
          {/* Arka Plan Görseli */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/metod.png"
              alt="Metod Mühendislik Arka Plan"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Overlay - Görselin üzerine koyu mavi gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-blue-900/85"></div>
            {/* Ekstra overlay - Metni daha okunabilir yapmak için */}
            <div className="absolute inset-0 bg-slate-900/30"></div>
          </div>

          {/* İçerik - Overlay'in üstünde */}
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight drop-shadow-lg">
              PROJENİZ İÇİN <br className="md:hidden" /> HEMEN TEKLİF ALIN
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü
              sunuyoruz. Hemen iletişime geçin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl hover:scale-105 backdrop-blur-sm"
              >
                İLETİŞİME GEÇ
              </Link>
              <Link
                href="/urunler"
                className="bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg"
              >
                ÜRÜNLERİ İNCELE
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
