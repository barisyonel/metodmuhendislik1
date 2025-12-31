import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marin Pano - Gemi Elektrik Panosu Üretimi | Metod Mühendislik",
  description:
    "Marin pano (gemi elektrik panosu) üretimi. Denizcilik sektörü için özel tasarım, tuzlu su ortamına dayanıklı, IEC 60092 standartlarına uygun marin panoları. Paslanmaz çelik ve marine grade malzemeler.",
  keywords:
    "marin pano, gemi elektrik panosu, denizcilik pano, gemi pano üretimi, IEC 60092, paslanmaz çelik pano, marine grade, İstanbul",
};

export default function MarinPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
              <div className="text-6xl mb-6">🚢</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Marin Pano - Gemi Elektrik Panosu
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200 leading-relaxed">
                Denizcilik sektörü için özel tasarım. Tuzlu su, yüksek nem ve
                titreşime dayanıklı marin panoları.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Marin Pano (Gemi Elektrik Panosu) Nedir?
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Marin Pano</strong>, denizcilik sektöründe kullanılan,
                  gemilerin elektrik sistemlerini kontrol eden ve yöneten özel
                  elektrik panolarıdır. Deniz ortamının zorlu koşullarına (tuzlu
                  su, yüksek nem, titreşim, sıcaklık değişimleri) dayanıklı
                  olarak üretilmelidir. Gemilerin güvenli ve kesintisiz
                  çalışması için kritik öneme sahiptir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, <strong>IEC 60092</strong>{" "}
                  denizcilik standartlarına tam uyumlu marin panoları
                  üretmekteyiz. <strong>Paslanmaz çelik (316L)</strong> veya{" "}
                  <strong>marine grade aluminyum</strong> malzemelerden üretilen
                  panolarımız, özel koruma sistemleri, IP66/IP67 koruma
                  sınıfları ve anti-korozyon kaplamalar ile donatılmıştır.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Marin Panolarının Özellikleri
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-cyan-50 to-slate-50 rounded-xl p-6 border-2 border-cyan-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-cyan-600">🌊</span>
                      Deniz Ortamına Dayanıklılık
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Paslanmaz çelik (316L) veya marine grade aluminyum
                      malzemeler. Özel anti-korozyon kaplamalar ve IP66/IP67
                      koruma sınıfları ile tuzlu su ortamına dayanıklı üretim.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">⚡</span>
                      Titreşim Direnci
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Gemilerin titreşimli ortamına dayanıklı tasarım. Özel
                      bağlantı sistemleri ve titreşim sönümleyici elemanlar ile
                      donatılmış panolar.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">🔒</span>
                      Güvenlik ve Standartlar
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      IEC 60092 denizcilik standartlarına tam uyum. Sınıf kayıt
                      gereksinimlerine uygun üretim. SOLAS (Safety of Life at
                      Sea) uyumluluğu.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-purple-600">🚢</span>
                      Gemi Tipine Özel Tasarım
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Yük gemileri, yolcu gemileri, balıkçı tekneleri, yatlarda
                      kullanılan farklı pano tipleri. Her gemi tipine özel
                      çözümler.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Kullanım Alanları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Marin panoları, denizcilik sektöründeki her türlü gemi ve
                  deniz aracında kullanılır:
                </p>
                <ul className="space-y-3 text-slate-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Yük Gemileri:</strong> Kargo gemileri, konteyner
                      gemileri, tankerler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Yolcu Gemileri:</strong> Feribotlar, kruvaziyer
                      gemileri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Balıkçı Tekneleri:</strong> Ticari balıkçılık,
                      balık işleme tekneleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Yatlar:</strong> Özel yatlar, lüks tekneler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Denizcilik Ekipmanları:</strong> Şamandıralar,
                      deniz fenerleri, deniz platformları
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mb-12 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Teknik Özellikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Malzeme
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      Paslanmaz Çelik 316L
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      IP Koruma Sınıfı
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      IP66 / IP67
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Gerilim Seviyesi
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      230V / 400V / 690V
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Standartlar
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      IEC 60092
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Sınıf Kayıt
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      BV, DNV, ABS, LR
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Koruma
                    </span>
                    <span className="text-cyan-600 font-semibold text-lg">
                      Anti-Korozyon, Titreşim Direnci
                    </span>
                  </div>
                </div>
              </div>

              <section className="py-20 md:py-32 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Marin Pano İçin Teklif Alın
                  </h2>
                  <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
                    Denizcilik sektörü için özel tasarım marin panosu
                    çözümlerimizi keşfedin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20Marin%20Pano%20(Gemi%20Elektrik%20Panosu)%20için%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
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
                      Tüm Pano Tipleri
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
