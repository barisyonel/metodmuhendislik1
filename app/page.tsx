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
    "Elektrik pano ve marin pano üretiminde 20+ yıllık deneyim. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. CNC lazer kesim, büküm, kaynak ve çelik konstrüksiyon hizmetleri. İstanbul'da kaliteli ve güvenilir elektrik pano çözümleri.",
  keywords:
    "elektrik pano, marin pano, elektrik pano üretimi, sıvaüstü pano, sıvaaltı pano, dahili pano, enerji dağıtım panosu, CNC lazer kesim, CNC büküm, kaynak, metal kaynak, elektrostatik toz boya, mağaza raf, çelik konstrüksiyon, endüstriyel üretim, mühendislik çözümleri, İstanbul, Tuzla",
  openGraph: {
    title: "Metod Mühendislik | Elektrik Pano ve Marin Pano Üretimi - İstanbul",
    description:
      "Elektrik pano ve marin pano üretiminde uzman. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi. CNC lazer kesim, büküm, kaynak hizmetleri. İstanbul'da kaliteli ve güvenilir çözümler.",
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

        {/* HIZLI İSTATİSTİKLER - GÜVEN BÖLÜMÜ */}
        <section
          className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
          aria-label="İstatistikler ve Başarılar"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-6xl mx-auto">
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
                  <div className="text-4xl md:text-5xl mb-4">{stat.icon}</div>
                  <p className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
                    {stat.number}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÖRNEK ÜRÜNLER BÖLÜMÜ */}
        <section className="py-20 md:py-32 bg-white" aria-label="Örnek Ürünlerimiz">
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

        {/* MODERN HİZMETLER BÖLÜMÜ - Birleştirilmiş ve Modernize Edilmiş */}
        <section
          className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50"
          aria-label="Hizmetlerimiz"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
                Hizmetlerimiz
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
                ENDÜSTRİYEL ÜRETİM{" "}
                <span className="text-blue-600">ÇÖZÜMLERİ</span>
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                <strong className="text-blue-600">Elektrik pano ve marin pano üretimi</strong> ana faaliyet alanımızdır. 20+ yıllık deneyimimizle sıvaüstü, sıvaaltı, dahili ve marin pano üretiminde sektörün öncü firmasıyız. Ayrıca CNC lazer kesim, büküm, metal kaynak, elektrostatik toz boya, mağaza raf sistemleri ve çelik konstrüksiyon hizmetlerimizle yanınızdayız.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Elektrik Pano Üretimi",
                  desc: "20+ yıllık deneyimimizle elektrik pano ve marin pano üretimi. Sıvaüstü, sıvaaltı, dahili ve marin pano çözümleri. Güvenli ve verimli enerji dağıtım sistemleri.",
                  img: "/elektrıkpano.png",
                  link: "/hizmetler/elektrik-pano-uretime",
                  icon: "⚡",
                  color: "from-yellow-500 to-yellow-600",
                  featured: true,
                },
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
                  img: "/cncbukum.png",
                  link: "/hizmetler/cnc-bukum",
                  icon: "🔧",
                  color: "from-slate-600 to-slate-700",
                },
                {
                  title: "Kaynak & İmalat",
                  desc: "Yüksek kaliteli metal kaynak ve imalat hizmetleri ile güvenilir çözümler. TIG, MIG/MAG kaynak yöntemleri ile uzman ekibimizle profesyonel hizmet.",
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
              ].map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    item.featured 
                      ? "border-yellow-500 border-4 shadow-xl shadow-yellow-500/30 hover:border-yellow-600" 
                      : "border-slate-200 hover:border-blue-600"
                  }`}
                >
                  {/* Görsel */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
                    />
                    <div className="absolute top-4 right-4 text-4xl opacity-80 group-hover:opacity-100 transition-opacity z-10">
                      {item.icon}
                    </div>
                    {item.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                          Ana Hizmetimiz
                        </span>
                      </div>
                    )}
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
          </div>
        </section>

        {/* MODERN NEDEN BİZ BÖLÜMÜ */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          aria-label="Neden Bizi Seçmelisiniz"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block text-blue-400 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Neden Metod Mühendislik?
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-6">
                KALİTE, <span className="text-blue-400">GÜVEN</span> VE{" "}
                <span className="text-blue-400">DENEYİM</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                20+ yıllık deneyimimiz ve uzman ekibimizle endüstriyel üretimde
                güvenilir çözüm ortağınızız. Her projede kalite ve müşteri
                memnuniyetini ön planda tutuyoruz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold flex-shrink-0 mt-1 group-hover:bg-blue-500 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-slate-200 font-bold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "1500+", label: "Yıllık Üretim", icon: "🏭" },
                  { number: "450+", label: "Tamamlanan Proje", icon: "✅" },
                  { number: "12", label: "Ülkeye İhracat", icon: "🌍" },
                  { number: "20+", label: "Yıl Deneyim", icon: "⭐" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105"
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

        {/* KISA SEO İÇERİK BÖLÜMÜ - Daha Okunabilir */}
        <section
          className="py-20 md:py-32 bg-white"
          aria-label="Endüstriyel Üretim Hakkında"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Elektrik Pano Üretimi ve Endüstriyel Üretim Çözümleri
              </h2>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                <strong>Metod Mühendislik</strong> olarak, 20+ yıllık deneyimimizle elektrik pano ve marin pano üretiminde sektörün öncü firmasıyız. <strong>Elektrik pano üretimi</strong> ana faaliyet alanımızdır. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi ile güvenilir enerji dağıtım çözümleri sunuyoruz.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                CNC Lazer Kesim ve Büküm Hizmetleri
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                <strong>CNC lazer kesim</strong> teknolojimiz ile kalınlığı 25 mm'ye kadar olan siyah sac ve 15 mm'ye kadar olan paslanmaz çelik malzemelerde kesim işlemleri gerçekleştirebilmekteyiz. Kesim hassasiyetimiz ±0.05 mm seviyesindedir. <strong>CNC büküm</strong> hizmetlerimiz ile kompleks geometrili parçalar tek seferde ve yüksek hassasiyetle üretilebilmektedir.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                Metal Kaynak ve Elektrostatik Toz Boya
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                <strong>Metal kaynak</strong> ve imalat hizmetlerimiz, TIG kaynak, MIG/MAG kaynak ve elektrot kaynağı gibi farklı yöntemlerle gerçekleştirilmektedir. <strong>Elektrostatik toz boya</strong> teknolojimiz ile uzun ömürlü ve estetik yüzey işlemleri sunuyoruz. RAL renk standardına uygun boyama hizmetleri veriyoruz.
              </p>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-8 mb-4">
                Kalite ve Güvenilirlik
              </h3>

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                ISO 9001 Kalite Yönetim Sistemi sertifikamız ile üretim süreçlerimizin uluslararası standartlara uygunluğunu göstermekteyiz. Her projede, malzeme seçiminden nihai ürüne kadar tüm aşamalarda kalite kontrol testleri gerçekleştirilmektedir. 20+ yıllık deneyimimiz ve uzman ekibimizle, endüstriyel üretimde güvenilir çözüm ortağı olmaktayız.
              </p>
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
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Teklif Al
              </a>
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
