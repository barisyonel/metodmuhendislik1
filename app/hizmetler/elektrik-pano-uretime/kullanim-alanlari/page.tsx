import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrik Pano Kullanım Alanları | Metod Mühendislik",
  description:
    "Elektrik panolarının kullanım alanları. Fabrikalar, gemiler, ticari yapılar, konut projeleri, hastaneler, veri merkezleri ve daha fazlası için elektrik pano çözümleri. Sektörel çözümler ve özel tasarımlar.",
  keywords:
    "elektrik pano kullanım alanları, endüstriyel pano, gemi pano, ticari yapı pano, konut pano, hastane pano, veri merkezi pano, sektörel pano çözümleri, İstanbul",
  openGraph: {
    title: "Elektrik Pano Kullanım Alanları | Metod Mühendislik",
    description:
      "Elektrik panolarının kullanıldığı tüm sektörler için özel çözümler. 20+ yıllık deneyimle sektörel ihtiyaçlara uygun pano üretimi.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function KullanimAlanlariPage() {
  const kullanimAlanlari = [
    {
      title: "Fabrikalar ve Endüstriyel Tesisler",
      icon: "🏭",
      description:
        "Üretim hatları, makineler ve endüstriyel ekipmanların enerji ihtiyacını karşılayan ana dağıtım panoları, motor kontrol merkezleri ve otomasyon panoları.",
      panolar: [
        { name: "ADP", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "MCC", link: "/hizmetler/elektrik-pano-uretime/mcc-motor-kontrol-merkezi" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
        { name: "Otomasyon", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
      ],
      detaylar: [
        "Yüksek kısa devre dayanımı (IEC 61439 standartları)",
        "Modüler yapı ile kolay genişletilebilirlik",
        "Endüstri 4.0 uyumlu otomasyon sistemleri",
        "Enerji verimliliği optimizasyonu",
        "7/24 kesintisiz çalışma gereksinimi",
      ],
      teknikOzellikler: {
        gerilim: "400V / 690V",
        akim: "630A - 6300A",
        ip: "IP54 - IP65",
        standart: "IEC 61439-1/2",
      },
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Gemiler ve Denizcilik Uygulamaları",
      icon: "🚢",
      description:
        "Yük gemileri, yolcu gemileri, balıkçı tekneleri ve yatlarda kullanılan tuzlu su ortamına dayanıklı marin panoları. IEC 60092 standartlarına uygun üretim.",
      panolar: [
        { name: "Marin Pano", link: "/hizmetler/elektrik-pano-uretime/marin-pano" },
        { name: "Ana Dağıtım", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "Motor Kontrol", link: "/hizmetler/elektrik-pano-uretime/mcc-motor-kontrol-merkezi" },
      ],
      detaylar: [
        "Paslanmaz çelik ve özel koruyucu kaplamalar",
        "Yüksek nem ve tuzlu su ortamına dayanıklılık",
        "Gemi titreşim ve sarsıntılarına uyum",
        "Denizcilik standartlarına tam uyum (IEC 60092)",
        "Kompakt tasarım ile sınırlı alan kullanımı",
      ],
      teknikOzellikler: {
        gerilim: "380V / 440V",
        akim: "160A - 4000A",
        ip: "IP66 - IP67",
        standart: "IEC 60092",
      },
      color: "from-cyan-600 to-cyan-800",
    },
    {
      title: "Ticari Yapılar (AVM, Ofis Binaları)",
      icon: "🏢",
      description:
        "Alışveriş merkezleri, ofis binaları ve iş merkezlerinde kullanılan ana dağıtım panoları, kompanzasyon panoları ve bina otomasyon panoları.",
      panolar: [
        { name: "ADP", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
        { name: "DDC", link: "/hizmetler/elektrik-pano-uretime/ddc-panosu" },
        { name: "Otomasyon", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
      ],
      detaylar: [
        "Estetik ve modern tasarım",
        "Enerji verimliliği ve maliyet optimizasyonu",
        "HVAC, aydınlatma ve güvenlik sistemleri entegrasyonu",
        "Merkezi kontrol ve izleme sistemleri",
        "Düşük gürültü seviyesi",
      ],
      teknikOzellikler: {
        gerilim: "400V",
        akim: "400A - 4000A",
        ip: "IP54",
        standart: "IEC 61439",
      },
      color: "from-indigo-600 to-indigo-800",
    },
    {
      title: "Konut Projeleri",
      icon: "🏠",
      description:
        "Site yönetimi, ortak alanlar ve bina tesisatları için sıvaüstü, sıvaaltı ve dahili elektrik panoları.",
      panolar: [
        { name: "Sıvaüstü Pano", link: "/hizmetler/elektrik-pano-uretime" },
        { name: "Sıvaaltı Pano", link: "/hizmetler/elektrik-pano-uretime" },
        { name: "Dahili Pano", link: "/hizmetler/elektrik-pano-uretime" },
      ],
      detaylar: [
        "Kompakt ve estetik tasarım",
        "Kolay montaj ve bakım",
        "Güvenlik odaklı tasarım",
        "Modüler yapı ile esneklik",
        "Uygun maliyetli çözümler",
      ],
      teknikOzellikler: {
        gerilim: "230V / 400V",
        akim: "63A - 630A",
        ip: "IP54",
        standart: "IEC 61439",
      },
      color: "from-green-600 to-green-800",
    },
    {
      title: "Hastaneler ve Sağlık Tesisleri",
      icon: "🏥",
      description:
        "Kritik altyapı, ameliyathane, yoğun bakım ve tıbbi cihazlar için güvenilir enerji dağıtımı ve UPS panoları.",
      panolar: [
        { name: "ADP", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "UPS Pano", link: "/hizmetler/elektrik-pano-uretime/ups-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
        { name: "DDC", link: "/hizmetler/elektrik-pano-uretime/ddc-panosu" },
      ],
      detaylar: [
        "Kesintisiz güç kaynağı (UPS) entegrasyonu",
        "Kritik sistemler için yedekli besleme",
        "Hijyenik ve temizlik standartlarına uyum",
        "Elektromanyetik uyumluluk (EMC)",
        "7/24 güvenilir çalışma",
      ],
      teknikOzellikler: {
        gerilim: "400V",
        akim: "400A - 2500A",
        ip: "IP54",
        standart: "IEC 61439, ISO 9001",
      },
      color: "from-red-600 to-red-800",
    },
    {
      title: "Oteller ve Turizm Tesisleri",
      icon: "🏨",
      description:
        "Oda otomasyonu, merkezi sistem kontrolü, HVAC ve aydınlatma kontrolü için bina otomasyon panoları.",
      panolar: [
        { name: "DDC", link: "/hizmetler/elektrik-pano-uretime/ddc-panosu" },
        { name: "Otomasyon", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
      ],
      detaylar: [
        "Oda otomasyon sistemleri",
        "Enerji yönetimi ve optimizasyon",
        "Merkezi kontrol ve izleme",
        "Konfor ve güvenlik sistemleri",
        "Uzaktan erişim ve kontrol",
      ],
      teknikOzellikler: {
        gerilim: "400V",
        akim: "250A - 1600A",
        ip: "IP54",
        standart: "IEC 61439",
      },
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "Veri Merkezleri",
      icon: "💻",
      description:
        "Sunucular, network ekipmanları ve kritik IT sistemleri için kesintisiz güç kaynağı (UPS) panoları ve ana dağıtım panoları.",
      panolar: [
        { name: "UPS Pano", link: "/hizmetler/elektrik-pano-uretime/ups-panosu" },
        { name: "ADP", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
      ],
      detaylar: [
        "Yüksek güç yoğunluğu desteği",
        "Kesintisiz güç kaynağı entegrasyonu",
        "Soğutma sistemleri entegrasyonu",
        "Uzaktan izleme ve yönetim",
        "Yüksek verimlilik ve düşük kayıp",
      ],
      teknikOzellikler: {
        gerilim: "400V",
        akim: "630A - 6300A",
        ip: "IP54",
        standart: "IEC 61439, TIA-942",
      },
      color: "from-orange-600 to-orange-800",
    },
    {
      title: "Güneş Enerjisi Sistemleri",
      icon: "☀️",
      description:
        "Güneş enerjisi santralleri ve çatı üstü güneş panelleri için özel tasarım elektrik panoları ve invertör panoları.",
      panolar: [
        { name: "ADP", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
        { name: "Otomasyon", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
      ],
      detaylar: [
        "DC/AC invertör panoları",
        "Grid bağlantı sistemleri",
        "Enerji izleme ve yönetim",
        "Güneş enerjisi entegrasyonu",
        "Şebeke uyumluluk ve koruma",
      ],
      teknikOzellikler: {
        gerilim: "400V / 1000V DC",
        akim: "250A - 2500A",
        ip: "IP54 - IP65",
        standart: "IEC 61439, VDE",
      },
      color: "from-yellow-600 to-yellow-800",
    },
    {
      title: "Su ve Atıksu Tesisleri",
      icon: "💧",
      description:
        "Pompa istasyonları, arıtma tesisleri ve su dağıtım sistemleri için motor kontrol merkezleri ve otomasyon panoları.",
      panolar: [
        { name: "MCC", link: "/hizmetler/elektrik-pano-uretime/mcc-motor-kontrol-merkezi" },
        { name: "Otomasyon", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
        { name: "Kompanzasyon", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
      ],
      detaylar: [
        "Pompa kontrol sistemleri",
        "Proses otomasyonu",
        "Yüksek nem ortamına dayanıklılık",
        "SCADA sistem entegrasyonu",
        "Enerji verimliliği optimizasyonu",
      ],
      teknikOzellikler: {
        gerilim: "400V",
        akim: "400A - 2500A",
        ip: "IP54 - IP65",
        standart: "IEC 61439",
      },
      color: "from-blue-500 to-blue-700",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-4 text-sm font-bold transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Elektrik Pano Üretimi
              </Link>
              <div className="text-6xl mb-6">📍</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Elektrik Pano Kullanım Alanları
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                Elektrik panolarımız, enerjinin dağıtıldığı ve kontrol edildiği
                her alanda güvenilir çözümler sunar. 20+ yıllık deneyimimizle sektörel ihtiyaçlara özel çözümler üretiyoruz.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Geniş Kullanım Yelpazesi
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  Metod Mühendislik olarak, elektrik panolarının kullanıldığı
                  her sektörde 20+ yıllık deneyimimizle hizmet vermekteyiz. Her
                  sektörün kendine özgü ihtiyaçlarına özel çözümler üretiyoruz.
                </p>
              </div>

              {/* Detaylı Kullanım Alanları */}
              <div className="space-y-8 mb-12">
                {kullanimAlanlari.map((alan, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 hover:border-blue-300 transition-all overflow-hidden"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${alan.color} text-white p-6 md:p-8`}>
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{alan.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-black mb-3">{alan.title}</h3>
                          <p className="text-white/90 text-lg leading-relaxed">
                            {alan.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Sol Taraf - Pano Tipleri ve Detaylar */}
                        <div>
                          <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-blue-600">⚡</span>
                            Kullanılan Pano Tipleri
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {alan.panolar.map((pano, j) => (
                              <Link
                                key={j}
                                href={pano.link}
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-sm font-bold px-4 py-2 rounded-lg transition-all hover:scale-105"
                              >
                                {pano.name}
                              </Link>
                            ))}
                          </div>

                          <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            Özellikler ve Avantajlar
                          </h4>
                          <ul className="space-y-2">
                            {alan.detaylar.map((detay, j) => (
                              <li key={j} className="flex items-start gap-3 text-slate-700">
                                <span className="text-blue-600 font-bold mt-1">•</span>
                                <span>{detay}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Sağ Taraf - Teknik Özellikler */}
                        <div>
                          <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-purple-600">🔧</span>
                            Teknik Özellikler
                          </h4>
                          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                                <span className="font-bold text-slate-700">Gerilim Seviyesi</span>
                                <span className="text-blue-600 font-black">{alan.teknikOzellikler.gerilim}</span>
                              </div>
                              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                                <span className="font-bold text-slate-700">Akım Kapasitesi</span>
                                <span className="text-blue-600 font-black">{alan.teknikOzellikler.akim}</span>
                              </div>
                              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                                <span className="font-bold text-slate-700">IP Koruma Sınıfı</span>
                                <span className="text-blue-600 font-black">{alan.teknikOzellikler.ip}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-700">Standartlar</span>
                                <span className="text-blue-600 font-black text-sm">{alan.teknikOzellikler.standart}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sektörel Çözümler */}
              <div className="mb-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Sektörel Çözümlerimiz
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Her sektörün kendine özgü gereksinimleri vardır. Metod
                  Mühendislik olarak, sektörünüzün ihtiyaçlarını anlayarak özel
                  çözümler üretiyoruz:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-blue-200">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="font-black text-slate-900 mb-3 text-lg">
                      Sektörel Deneyim
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Her sektörde tamamladığımız projelerden kazandığımız
                      deneyimle, sektörel ihtiyaçları doğru analiz ediyoruz.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-blue-200">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="font-black text-slate-900 mb-3 text-lg">
                      Özel Tasarım
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Müşteri ihtiyaçlarına özel tasarım ve üretim. Standart
                      çözümlerden özel çözümlere kadar geniş yelpaze.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-blue-200">
                    <div className="text-4xl mb-4">🔑</div>
                    <h3 className="font-black text-slate-900 mb-3 text-lg">
                      Anahtar Teslim
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Dizayn, projelendirme, üretim, montaj ve satış sonrası
                      destek ile turn-key (anahtar teslim) hizmet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pano Tipleri Hızlı Linkler */}
              <div className="mb-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-center">
                  Pano Tipleri ve Detaylar
                </h2>
                <p className="text-blue-100 text-lg mb-8 text-center max-w-3xl mx-auto">
                  Her pano tipi hakkında detaylı bilgi için ilgili sayfalarımızı ziyaret edebilirsiniz.
                </p>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { name: "ADP - Ana Dağıtım Panosu", link: "/hizmetler/elektrik-pano-uretime/adp-ana-dagitim-panosu" },
                    { name: "MCC - Motor Kontrol Merkezi", link: "/hizmetler/elektrik-pano-uretime/mcc-motor-kontrol-merkezi" },
                    { name: "Kompanzasyon Panosu", link: "/hizmetler/elektrik-pano-uretime/kompanzasyon-panosu" },
                    { name: "Otomasyon Panosu", link: "/hizmetler/elektrik-pano-uretime/otomasyon-panosu" },
                    { name: "DDC Panosu", link: "/hizmetler/elektrik-pano-uretime/ddc-panosu" },
                    { name: "UPS Panosu", link: "/hizmetler/elektrik-pano-uretime/ups-panosu" },
                    { name: "Marin Pano", link: "/hizmetler/elektrik-pano-uretime/marin-pano" },
                    { name: "Teknik Özellikler", link: "/hizmetler/elektrik-pano-uretime/teknik-ozellikler" },
                  ].map((pano, i) => (
                    <Link
                      key={i}
                      href={pano.link}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-bold px-4 py-3 rounded-lg transition-all hover:scale-105 text-center"
                    >
                      {pano.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Projeniz İçin Teklif Alın
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Hangi sektörde olursanız olun, elektrik pano ihtiyaçlarınız
                    için uzman ekibimizle iletişime geçin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20elektrik%20pano%20ihtiyacım%20için%20teklif%20almak%20istiyorum."
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
                      href="/hizmetler/elektrik-pano-uretime"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Pano Tipleri
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
