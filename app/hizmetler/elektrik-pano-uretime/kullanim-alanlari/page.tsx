import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrik Pano Kullanım Alanları | Metod Mühendislik",
  description:
    "Elektrik panolarının kullanım alanları. Fabrikalar, gemiler, ticari yapılar, konut projeleri, hastaneler, veri merkezleri ve daha fazlası için elektrik pano çözümleri.",
  keywords:
    "elektrik pano kullanım alanları, endüstriyel pano, gemi pano, ticari yapı pano, konut pano, hastane pano, veri merkezi pano, İstanbul",
};

export default function KullanimAlanlariPage() {
  const kullanimAlanlari = [
    {
      title: "Fabrikalar ve Endüstriyel Tesisler",
      icon: "🏭",
      description:
        "Üretim hatları, makineler ve endüstriyel ekipmanların enerji ihtiyacını karşılayan ana dağıtım panoları, motor kontrol merkezleri ve otomasyon panoları.",
      panolar: ["ADP", "MCC", "Kompanzasyon", "Otomasyon"],
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Gemiler ve Denizcilik Uygulamaları",
      icon: "🚢",
      description:
        "Yük gemileri, yolcu gemileri, balıkçı tekneleri ve yatlarda kullanılan tuzlu su ortamına dayanıklı marin panoları. IEC 60092 standartlarına uygun üretim.",
      panolar: ["Marin Pano", "Ana Dağıtım", "Motor Kontrol"],
      color: "from-cyan-600 to-cyan-800",
    },
    {
      title: "Ticari Yapılar (AVM, Ofis Binaları)",
      icon: "🏢",
      description:
        "Alışveriş merkezleri, ofis binaları ve iş merkezlerinde kullanılan ana dağıtım panoları, kompanzasyon panoları ve bina otomasyon panoları.",
      panolar: ["ADP", "Kompanzasyon", "DDC", "Otomasyon"],
      color: "from-indigo-600 to-indigo-800",
    },
    {
      title: "Konut Projeleri",
      icon: "🏠",
      description:
        "Site yönetimi, ortak alanlar ve bina tesisatları için sıvaüstü, sıvaaltı ve dahili elektrik panoları.",
      panolar: ["Sıvaüstü Pano", "Sıvaaltı Pano", "Dahili Pano"],
      color: "from-green-600 to-green-800",
    },
    {
      title: "Hastaneler ve Sağlık Tesisleri",
      icon: "🏥",
      description:
        "Kritik altyapı, ameliyathane, yoğun bakım ve tıbbi cihazlar için güvenilir enerji dağıtımı ve UPS panoları.",
      panolar: ["ADP", "UPS Pano", "Kompanzasyon", "DDC"],
      color: "from-red-600 to-red-800",
    },
    {
      title: "Oteller ve Turizm Tesisleri",
      icon: "🏨",
      description:
        "Oda otomasyonu, merkezi sistem kontrolü, HVAC ve aydınlatma kontrolü için bina otomasyon panoları.",
      panolar: ["DDC", "Otomasyon", "Kompanzasyon"],
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "Veri Merkezleri",
      icon: "💻",
      description:
        "Sunucular, network ekipmanları ve kritik IT sistemleri için kesintisiz güç kaynağı (UPS) panoları ve ana dağıtım panoları.",
      panolar: ["UPS Pano", "ADP", "Kompanzasyon"],
      color: "from-orange-600 to-orange-800",
    },
    {
      title: "Güneş Enerjisi Sistemleri",
      icon: "☀️",
      description:
        "Güneş enerjisi santralleri ve çatı üstü güneş panelleri için özel tasarım elektrik panoları ve invertör panoları.",
      panolar: ["ADP", "Otomasyon", "Kompanzasyon"],
      color: "from-yellow-600 to-yellow-800",
    },
    {
      title: "Su ve Atıksu Tesisleri",
      icon: "💧",
      description:
        "Pompa istasyonları, arıtma tesisleri ve su dağıtım sistemleri için motor kontrol merkezleri ve otomasyon panoları.",
      panolar: ["MCC", "Otomasyon", "Kompanzasyon"],
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
                her alanda güvenilir çözümler sunar.
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {kullanimAlanlari.map((alan, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${alan.color} rounded-xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                  >
                    <div className="text-4xl mb-4">{alan.icon}</div>
                    <h3 className="text-xl font-black mb-3">{alan.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {alan.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {alan.panolar.map((pano, j) => (
                        <span
                          key={j}
                          className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full"
                        >
                          {pano}
                        </span>
                      ))}
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
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      Sektörel Deneyim
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Her sektörde tamamladığımız projelerden kazandığımız
                      deneyimle, sektörel ihtiyaçları doğru analiz ediyoruz.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      Özel Tasarım
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Müşteri ihtiyaçlarına özel tasarım ve üretim. Standart
                      çözümlerden özel çözümlere kadar geniş yelpaze.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      Anahtar Teslim Çözümler
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Dizayn, projelendirme, üretim, montaj ve satış sonrası
                      destek ile turn-key (anahtar teslim) hizmet.
                    </p>
                  </div>
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
