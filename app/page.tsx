import HeaderWrapper from "./components/HeaderWrapper";
import HeroSlider from "./components/HeroSlider";
import FooterWrapper from "./components/FooterWrapper";
import ProductsList from "./components/ProductsList";
import EKatalogButton from "./components/EKatalogButton";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProducts, getSliders } from "./lib/data";

export const metadata: Metadata = {
  title: "Metod Mühendislik | Enerjinin Güvenli Yönetimi - Elektrik Pano, Marin Pano, Endüstriyel Çözümler",
  description:
    "Modern dünyanın en temel ihtiyacı olan enerjinin güvenli, verimli ve sürdürülebilir yönetimi. 20+ yıllık deneyimle elektrik pano, marin pano, CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon hizmetleri. IEC standartları, ISO 9001 sertifikalı, 12 ülkeye ihracat. İstanbul Tuzla.",
  keywords:
    "elektrik pano, marin pano, enerji yönetimi, güvenli enerji dağıtımı, elektrik pano üretimi, sıvaüstü pano, sıvaaltı pano, dahili pano, ADP pano, MCC pano, kompanzasyon pano, otomasyon pano, DDC pano, UPS pano, CNC lazer kesim, CNC büküm, kaynak, metal kaynak, elektrostatik toz boya, çelik konstrüksiyon, endüstriyel üretim, IEC 61439, ISO 9001, İstanbul, Tuzla, İTOSB",
  openGraph: {
    title: "Metod Mühendislik | Enerjinin Güvenli Yönetimi - Elektrik Pano ve Endüstriyel Çözümler",
    description:
      "Enerjinin olduğu her yerde güveni ve kaliteyi inşa ediyoruz. 20+ yıllık deneyim, IEC standartları, ISO 9001 sertifikalı, 12 ülkeye ihracat. Elektrik pano, marin pano, CNC lazer kesim ve endüstriyel üretim çözümleri.",
    type: "website",
    locale: "tr_TR",
    url: "https://www.metodmuhendislik.com",
    siteName: "Metod Mühendislik",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function HomePage() {
  // Server Component - Veritabanına direkt bağlanıyoruz, API route'a gerek yok!
  const products = await getProducts(6); // İlk 6 ürünü al
  const sliders = await getSliders();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Metod Mühendislik",
    description:
      "Modern dünyanın en temel ihtiyacı olan enerjinin güvenli, verimli ve sürdürülebilir yönetimi. 20+ yıllık deneyimle elektrik pano, marin pano, CNC lazer kesim ve endüstriyel üretim çözümleri sunan ISO 9001 sertifikalı endüstriyel üretim firması",
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
      description: "Sıfır hata prensibi ile kalite",
    },
    {
      number: "2000m²",
      label: "Üretim Alanı",
      icon: "🏭",
      description: "Endüstri 4.0 standartları",
    },
    {
      number: "12",
      label: "Ülkeye İhracat",
      icon: "🌍",
      description: "Global çözüm ortağı",
    },
    {
      number: "ISO",
      label: "9001 Sertifikalı",
      icon: "✓",
      description: "IEC standartları uyumlu",
    },
  ];

  const whyChooseUs = [
    {
      icon: "🎯",
      title: "Akademik Seviye Uzman Kadro",
      description: "Akademik seviyedeki uzman teknik kadromuz ve deneyimli satış ekibimiz",
    },
    {
      icon: "⚡",
      title: "Sıfır Hata Prensibi",
      description: "Tam güvenlik ve sıfır hata ilkeleriyle üretilen kaliteli çözümler",
    },
    {
      icon: "🔧",
      title: "Endüstri 4.0 Standartları",
      description: "Endüstri 4.0 standartlarına uyumlu güçlü altyapı ve modern teknoloji",
    },
    {
      icon: "📊",
      title: "IEC ve ISO Standartları",
      description: "IEC 61439-1/2 ve ISO 9001:2015 sertifikalı kalite yönetim sistemi",
    },
    {
      icon: "💼",
      title: "Anahtar Teslim Çözümler",
      description: "Dizayn, projelendirme, montaj ve satış sonrası destek ile turn-key hizmet",
    },
    {
      icon: "🌐",
      title: "12 Ülkeye İhracat",
      description: "Global pazar deneyimi ile uluslararası standartlarda profesyonel hizmet",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeaderWrapper />
      <main>
        {/* MODERN HERO SECTION - Tam Ekran */}
        <section
          className="relative w-full h-screen overflow-hidden"
          aria-label="Ana Hero Bölümü"
        >
          <HeroSlider initialSliders={sliders} />
        </section>

        {/* HAKKIMIZDA ÖZET BÖLÜMÜ */}
        <section
          className="py-20 md:py-28 bg-white"
          aria-label="Hakkımızda"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-100 rounded-full">
                  Hakkımızda
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                  Metod <span className="text-blue-600">Mühendislik</span>
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-6 text-center">
                  Modern dünyanın en temel ihtiyacı olan enerjinin, güvenli, verimli ve sürdürülebilir bir şekilde yönetilmesi, mühendislik sanatının en kritik alanlarından biridir.
                </p>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 text-center">
                  Elektrik pano sektöründe 20+ yılı aşkın deneyimimiz, uzman kadromuz ve teknolojiye uyumlu üretim anlayışımızla sektörün saygın ve güvenilir markalarından biri haline geldik. Kaliteden asla ödün vermeyen, dürüst ve ilkeli hizmet anlayışımızla; mevcut konumumuzu korumak ve daha da ileriye taşımak en temel hedeflerimiz arasında yer almaktadır. Bu doğrultuda geleceğe emin adımlarla ilerlemeye devam ediyoruz.
                </p>
                <div className="text-center">
                  <Link
                    href="/kurumsal/hakkimizda"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors group"
                  >
                    Devamı
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
          </div>
        </section>

        {/* İSTATİSTİKLER VE HAKKIMIZDA - ÖZYILMAZLAR TARZI */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50"
          aria-label="Hakkımızda ve İstatistikler"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Sol Taraf - Metin ve Görsel */}
                <div className="space-y-8">
                  {/* Metin Bloğu */}
                  <div>
                    <p className="text-slate-800 text-xl md:text-2xl leading-relaxed font-medium">
                      Uzun yıllara dayanan sektör tecrübesi, uzman kadrosu ve teknolojiye uyumlu yapısıyla <span className="font-bold text-slate-900">elektrik pano sektöründe saygın bir konuma sahiptir.</span>
                    </p>
                  </div>
                  
                  {/* Üretim Görseli */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/elektrıkpano.png"
                      alt="Metod Mühendislik Üretim Tesisi - Elektrik Pano Üretimi"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>
                </div>

                {/* Sağ Taraf - Büyük İstatistikler */}
                <div className="flex flex-col gap-8 md:gap-12">
                  {/* 20+ Yıllık Deneyim */}
                  <div className="text-center md:text-left">
                    <div className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-3 leading-none">
                      20+
                    </div>
                    <div className="text-lg md:text-xl text-slate-600 font-medium uppercase tracking-wide">
                      Yıllık Deneyim
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Sıfır hata prensibi ile kalite</p>
                  </div>

                  {/* 2000m² Üretim Alanı */}
                  <div className="text-center md:text-left">
                    <div className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-3 leading-none">
                      2000m²
                    </div>
                    <div className="text-lg md:text-xl text-slate-600 font-medium uppercase tracking-wide">
                      Üretim Alanı
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Endüstri 4.0 standartları</p>
                  </div>

                  {/* Diğer İstatistikler - Daha Küçük */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-black text-blue-600 mb-1">
                        12
                      </div>
                      <div className="text-sm text-slate-600 font-medium">
                        Ülkeye İhracat
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-black text-blue-600 mb-1">
                        ISO
                      </div>
                      <div className="text-sm text-slate-600 font-medium">
                        9001 Sertifikalı
                      </div>
                    </div>
                  </div>
                </div>
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
                  Geniş <span className="text-blue-600">Hizmet</span> Yelpazesi
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                  Alçak gerilim panolarından otomasyon sistemlerine kadar uzanan geniş ürün gamımızla,
                  elektriğin güvenle dağıtılmasını, kontrol edilmesini ve yönetilmesini sağlıyoruz.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, i) => (
                  <Link
                    key={i}
                    href={service.link}
                    className="group relative overflow-hidden rounded-xl bg-white border border-slate-200/80 hover:border-blue-400/60 shadow-modern hover:shadow-modern-lg transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-75 group-hover:opacity-85 transition-opacity duration-500`} />
                      <div className="absolute top-4 left-4 text-4xl md:text-5xl drop-shadow-lg filter brightness-110">
                        {service.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-5 md:p-6 bg-white">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                        <span className="mr-2">Detaylı Bilgi</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border-2 border-blue-100">
                  <p className="text-slate-800 text-base leading-relaxed text-center mb-4">
                    <strong>Metod Mühendislik</strong> olarak, <strong>enerjinin olduğu her yerde güveni ve kaliteyi inşa etmek</strong> amacıyla faaliyet gösteriyoruz.
                    <strong>Elektrik pano üretimi</strong> (<strong>ADP</strong>, <strong>MCC</strong>, <strong>kompanzasyon</strong>, <strong>otomasyon</strong>, <strong>DDC</strong>, <strong>UPS</strong> ve <strong>marin panoları</strong>),
                    <strong>CNC lazer kesim</strong>, <strong>CNC büküm</strong>, <strong>metal kaynak</strong>,
                    <strong>elektrostatik toz boya</strong> ve <strong>çelik konstrüksiyon</strong> hizmetlerimizle endüstriyel üretim çözümleri sunuyoruz.
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed text-center">
                    <strong>IEC 61439-1/2</strong> uluslararası standartlarına tam uyumlu, <strong>ISO 9001:2015</strong> sertifikalı ürünlerimiz,
                    <strong>12 ülkeye ihracat</strong> yapılan, <strong>2000m²</strong> üretim alanına sahip İstanbul Tuzla İTOSB&apos;deki modern tesisimizde üretilmektedir.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <ProductsList initialProducts={products} />
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
                  Sıfır Hata, <span className="text-blue-400">Tam Güvenlik</span>
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  &quot;Kalite, kontrol edilmez; üretilir.&quot; felsefesiyle hareket ediyoruz.
                  20+ yıllık deneyimimiz, akademik seviyedeki uzman teknik kadromuz ve
                  endüstri 4.0 standartlarına uyumlu güçlü altyapımız ile sektörümüzde lider konumdayız.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
                {whyChooseUs.map((item, i) => (
                  <div
                    key={i}
                    className="group glass-effect rounded-xl p-6 border border-white/20 hover:border-blue-400/60 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-modern-lg animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
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
                <EKatalogButton variant="secondary" />
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

        {/* BLOG ÖNİZLEME BÖLÜMÜ */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50"
          aria-label="Blog"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-100 rounded-full">
                  Blog
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                  Haber ve <span className="text-blue-600">Değerlendirmeler</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                  Elektrik pano ve endüstriyel üretim sektöründeki en son atılımları, yenilikleri ve güncellemeleri paylaşıyoruz.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {[
                  {
                    title: "İstanbul'da Elektrik Pano Üretimi ve Montaj Hizmetleri",
                    description: "İstanbul'un tüm ilçelerinde elektrik pano üretimi, montaj, bakım ve onarım hizmetleri. Sıvaüstü, sıvaaltı, dahili ve marin pano çözümleri.",
                    category: "İstanbul İlçeleri",
                    link: "/blog/istanbul",
                    icon: "🏙️",
                  },
                  {
                    title: "Gebze ve Kocaeli Bölgesi Endüstriyel Üretim Çözümleri",
                    description: "Gebze, İzmit ve Kocaeli bölgesinde elektrik pano, kaynak hizmetleri ve endüstriyel üretim çözümleri. Hızlı teslimat ve kaliteli hizmet.",
                    category: "Gebze & Kocaeli",
                    link: "/blog/gebze-kocaeli",
                    icon: "🏭",
                  },
                  {
                    title: "Marmara Bölgesi Endüstriyel Üretim ve Hizmetler",
                    description: "Bursa, Balıkesir, Sakarya ve diğer Marmara illerinde elektrik pano üretimi, kaynak ve endüstriyel üretim hizmetleri.",
                    category: "Diğer Marmara",
                    link: "/blog/diger-marmara",
                    icon: "📍",
                  },
                ].map((blog, i) => (
                  <Link
                    key={i}
                    href={blog.link}
                    className="group bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {blog.icon}
                    </div>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>Devamını Oku</span>
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
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
                >
                  Tüm Blog Yazılarını Görüntüle
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
                  IEC ve ISO standartlarına tam uyumlu, sertifikalı üretim
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { name: "IEC 61439", desc: "Pano Standardı" },
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

      </main>
      <FooterWrapper />
    </>
  );
}
