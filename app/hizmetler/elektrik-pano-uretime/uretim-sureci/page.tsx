import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrik Pano Üretim Süreci | Metod Mühendislik",
  description:
    "Elektrik pano üretim sürecimiz. Adım adım üretim süreci: tasarım, projelendirme, gövde üretimi, montaj, test ve kalite kontrol, teslimat. ISO 9001 kalite standartları.",
  keywords:
    "elektrik pano üretim süreci, pano üretimi, kalite kontrol, test süreci, ISO 9001, İstanbul",
};

export default function UretimSureciPage() {
  const adimlar = [
    {
      adim: 1,
      title: "Tasarım ve Projelendirme",
      description:
        "Müşteri ihtiyaçlarının analizi, teknik şartname hazırlama, elektriksel ve mekanik tasarım. E-Plan ve CAD yazılımları ile hatasız tasarım.",
      icon: "📐",
      color: "from-blue-600 to-blue-800",
    },
    {
      adim: 2,
      title: "Malzeme Temini ve Kontrol",
      description:
        "Uluslararası geçerliliği olan, sertifikalı ve test edilmiş şalt malzeme seçimi. Malzeme giriş kalite kontrolü.",
      icon: "📦",
      color: "from-green-600 to-green-800",
    },
    {
      adim: 3,
      title: "Gövde Üretimi",
      description:
        "CNC lazer kesim ile gövde parçalarının kesilmesi, CNC büküm ile şekillendirme, metal kaynak ile birleştirme.",
      icon: "⚙️",
      color: "from-purple-600 to-purple-800",
    },
    {
      adim: 4,
      title: "Yüzey İşlemleri",
      description:
        "Kumlama, fosfatlama, elektrostatik toz boya uygulaması. RAL renk standardında, kalıcı ve koruyucu yüzey işlemleri.",
      icon: "🎨",
      color: "from-orange-600 to-orange-800",
    },
    {
      adim: 5,
      title: "Elektro Montaj",
      description:
        "Uzman teknisyenlerimiz tarafından, kablo kesit hesaplarına ve bağlantı tork değerlerine sadık kalınarak yapılan titiz montaj.",
      icon: "🔌",
      color: "from-red-600 to-red-800",
    },
    {
      adim: 6,
      title: "Test ve Kalite Kontrol",
      description:
        "İzolasyon testi, dielektrik testi, fonksiyon testi, kısa devre testleri. Tüm testlerin raporlanması ve sertifikalandırılması.",
      icon: "✅",
      color: "from-indigo-600 to-indigo-800",
    },
    {
      adim: 7,
      title: "Paketleme ve Sevkiyat",
      description:
        "Güvenli paketleme, lojistik planlama, sevkiyat organizasyonu. Müşteri lokasyonuna güvenli teslimat.",
      icon: "📦",
      color: "from-cyan-600 to-cyan-800",
    },
    {
      adim: 8,
      title: "Montaj ve Devreye Alma",
      description:
        "Saha montajı, devreye alma, süpervizörlük hizmetleri. Sistemin güvenle çalıştığından emin olmak.",
      icon: "🔧",
      color: "from-yellow-600 to-yellow-800",
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
              <div className="text-6xl mb-6">🔧</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Üretim Sürecimiz
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                ISO 9001 kalite standartlarına uygun, adım adım üretim
                sürecimiz. Her aşamada kalite kontrol.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  8 Adımlı Üretim Süreci
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  Metod Mühendislik olarak, elektrik pano üretiminde &quot;Sıfır
                  Hata&quot; ve &quot;Tam Güvenlik&quot; ilkeleriyle hareket
                  ediyoruz. Her adımda kalite kontrol yapılarak, en yüksek
                  kalite standartlarında üretim gerçekleştirilmektedir.
                </p>
              </div>

              {/* Adımlar */}
              <div className="space-y-8 mb-12">
                {adimlar.map((adim, i) => (
                  <div key={i} className="relative">
                    {/* Bağlantı Çizgisi */}
                    {i < adimlar.length - 1 && (
                      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-slate-200 z-0"></div>
                    )}
                    <div className="relative flex gap-6 items-start">
                      {/* Adım Numarası */}
                      <div
                        className={`bg-gradient-to-br ${adim.color} text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-xl z-10 flex-shrink-0`}
                      >
                        {adim.adim}
                      </div>
                      {/* İçerik */}
                      <div className="flex-1 bg-white rounded-xl p-6 border-2 border-slate-200 hover:shadow-xl transition-all">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`bg-gradient-to-br ${adim.color} text-white rounded-lg p-3 text-2xl`}
                          >
                            {adim.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">
                              {adim.title}
                            </h3>
                            <p className="text-slate-700 leading-relaxed">
                              {adim.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kalite Vurgusu */}
              <div className="mb-12 bg-gradient-to-br from-green-50 to-slate-50 rounded-2xl p-8 border-2 border-green-200">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 text-center">
                  Kalite Güvencesi
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">✓</div>
                    <h3 className="font-black text-slate-900 mb-2">
                      ISO 9001:2015
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Kalite yönetim sistemi sertifikalı üretim
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🔬</div>
                    <h3 className="font-black text-slate-900 mb-2">
                      Test ve Kontrol
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Her aşamada kalite kontrol ve test
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">📋</div>
                    <h3 className="font-black text-slate-900 mb-2">
                      Belgelendirme
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Tüm testlerin raporlanması ve belgelendirilmesi
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
                    Kaliteli üretim sürecimiz hakkında daha fazla bilgi almak
                    veya projeniz için teklif almak için bizimle iletişime
                    geçin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20elektrik%20pano%20üretim%20süreci%20hakkında%20bilgi%20almak%20istiyorum."
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
                      Ana Sayfaya Dön
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
