import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrik Pano Teknik Özellikler ve Standartlar | Metod Mühendislik",
  description:
    "Elektrik pano teknik özellikleri, standartlar ve sertifikalar. IEC 61439, ISO 9001, IP koruma sınıfları, gerilim seviyeleri, kısa devre dayanımı ve daha fazlası.",
  keywords:
    "elektrik pano teknik özellikler, IEC 61439, ISO 9001, IP koruma sınıfı, gerilim seviyesi, kısa devre dayanımı, elektrik pano standartları, İstanbul",
};

export default function TeknikOzelliklerPage() {
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
              <div className="text-6xl mb-6">📊</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Teknik Özellikler ve Standartlar
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                IEC ve ISO standartlarına uygun, sertifikalı elektrik pano
                üretimi teknik özellikleri.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Standartlar */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Uluslararası Standartlar
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">⚡</span>
                      IEC 61439-1/2
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Alçak gerilim kumanda ve dağıtım panoları için
                      uluslararası standart. Tip test sertifikası ve uygunluk
                      belgesi.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      ISO 9001:2015
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Kalite yönetim sistemi sertifikası. Tüm üretim
                      süreçlerimiz ISO 9001 standartlarına uygun
                      yönetilmektedir.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-purple-600">🚢</span>
                      IEC 60092 (Marin)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Denizcilik elektrik sistemleri için özel standart. Marin
                      panolarımız bu standarta tam uyumludur.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-orange-600">🔒</span>
                      TS EN Standartları
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Türk standartlarına uygunluk. TSE standartlarına uygun
                      üretim ve belgelendirme.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gerilim ve Akım */}
              <div className="mb-12 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Gerilim ve Akım Özellikleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Gerilim Seviyeleri
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      230V, 380V, 400V, 690V
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Frekans
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      50Hz / 60Hz
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Kısa Devre Dayanımı
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      25kA - 100kA
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Anma Akımı
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                      16A - 6300A
                    </span>
                  </div>
                </div>
              </div>

              {/* IP Koruma Sınıfları */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  IP Koruma Sınıfları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  IP (Ingress Protection) koruma sınıfları, panoların toz, su ve
                  dış etkilere karşı koruma seviyesini belirtir.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      ip: "IP20",
                      desc: "İç mekan kullanımı için temel koruma",
                      icon: "🏠",
                    },
                    {
                      ip: "IP54",
                      desc: "Toza ve sıçrayan suya karşı koruma",
                      icon: "🏭",
                    },
                    {
                      ip: "IP65",
                      desc: "Toza ve düşük basınçlı suya karşı tam koruma",
                      icon: "🌊",
                    },
                    {
                      ip: "IP66",
                      desc: "Güçlü su jetlerine karşı koruma (Marin)",
                      icon: "🚢",
                    },
                    {
                      ip: "IP67",
                      desc: "Geçici suya daldırmaya karşı koruma",
                      icon: "💧",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 border-2 border-slate-200"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-2xl font-black text-blue-600 mb-2">
                        {item.ip}
                      </div>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test ve Kalite Kontrol */}
              <div className="mb-12 bg-gradient-to-br from-green-50 to-slate-50 rounded-2xl p-8 border-2 border-green-200">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Test ve Kalite Kontrol
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      test: "İzolasyon Testi",
                      desc: "Elektriksel izolasyon direnci ölçümü",
                    },
                    {
                      test: "Dielektrik Testi",
                      desc: "Yüksek gerilim testi (2.5kV + 2 × Un)",
                    },
                    {
                      test: "Fonksiyon Testi",
                      desc: "Tüm fonksiyonların test edilmesi",
                    },
                    {
                      test: "Kısa Devre Testi",
                      desc: "Kısa devre dayanım testleri",
                    },
                    {
                      test: "Termal Test",
                      desc: "Sıcaklık artışı ve termal dayanım testleri",
                    },
                    {
                      test: "EMC Testi",
                      desc: "Elektromanyetik uyumluluk testleri",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white rounded-lg p-4"
                    >
                      <div className="text-green-600 font-bold text-xl">✓</div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          {item.test}
                        </h3>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sertifikalar */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Sertifikalar ve Belgeler
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Kalite Sertifikaları
                    </h3>
                    <ul className="space-y-2 text-slate-700">
                      <li>• ISO 9001:2015 Kalite Yönetim Sistemi</li>
                      <li>• ISO 14001 Çevre Yönetim Sistemi</li>
                      <li>• ISO 45001 İş Sağlığı ve Güvenliği</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Ürün Sertifikaları
                    </h3>
                    <ul className="space-y-2 text-slate-700">
                      <li>• IEC 61439 Tip Test Sertifikası</li>
                      <li>• TSE Uygunluk Belgesi</li>
                      <li>• Marin Pano Sınıf Kayıt (BV, DNV, ABS, LR)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Teknik Detaylar İçin İletişime Geçin
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Projeniz için özel teknik özellikler ve standartlar hakkında
                    detaylı bilgi almak için bizimle iletişime geçin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20elektrik%20pano%20teknik%20özellikleri%20hakkında%20bilgi%20almak%20istiyorum."
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
                      WhatsApp ile İletişime Geç
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
