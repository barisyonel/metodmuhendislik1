import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DDC - Direct Digital Control Panosu Üretimi | Metod Mühendislik",
  description:
    "DDC (Direct Digital Control) panosu üretimi. Bina otomasyon sistemleri, HVAC kontrolü, akıllı bina yönetimi için DDC panoları. BACnet, Modbus protokolleri ile entegrasyon.",
  keywords:
    "DDC pano, direct digital control, bina otomasyonu, HVAC kontrolü, akıllı bina sistemleri, BACnet, Modbus, İstanbul",
};

export default function DDCPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
              <div className="text-6xl mb-6">🏢</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                DDC - Direct Digital Control Panosu
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 leading-relaxed">
                Bina otomasyon sistemleri için dijital kontrol. HVAC, aydınlatma
                ve enerji yönetimi çözümleri.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  DDC (Direct Digital Control) Panosu Nedir?
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>DDC (Direct Digital Control) Panosu</strong>, bina
                  otomasyon sistemlerinde kullanılan, HVAC (ısıtma,
                  havalandırma, klima), aydınlatma, güvenlik ve enerji yönetimi
                  sistemlerini dijital olarak kontrol eden panolardır. Analog
                  kontrol sistemlerine göre çok daha hassas, verimli ve esnek
                  kontrol imkanı sunar.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, <strong>BACnet</strong>,{" "}
                  <strong>Modbus</strong> ve <strong>LonWorks</strong> gibi bina
                  otomasyon protokollerini destekleyen DDC panoları
                  üretmekteyiz. Akıllı bina yönetimi sistemleri için özel
                  tasarlanan bu panolar, enerji verimliliğini artırır, konfor
                  seviyesini optimize eder ve uzaktan izleme ve kontrol imkanı
                  sunar.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  DDC Panolarının Özellikleri
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-xl p-6 border-2 border-indigo-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-indigo-600">🌡️</span>
                      HVAC Kontrolü
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Isıtma, soğutma, havalandırma ve klima sistemlerinin
                      hassas kontrolü. Sıcaklık, nem, hava kalitesi sensörleri
                      ile entegrasyon.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">💡</span>
                      Aydınlatma Kontrolü
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Zaman bazlı, sensör bazlı ve manuel aydınlatma kontrolü.
                      Enerji tasarrufu sağlayan akıllı aydınlatma sistemleri.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">📡</span>
                      Protokol Desteği
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      BACnet, Modbus, LonWorks gibi bina otomasyon
                      protokollerini destekler. Merkezi yönetim sistemleriyle
                      entegrasyon.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-purple-600">🌐</span>
                      Uzaktan Erişim
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Web tabanlı arayüz ve mobil uygulamalarla uzaktan izleme
                      ve kontrol. Bulut tabanlı veri yönetimi imkanı.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Kullanım Alanları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  DDC panoları, akıllı bina yönetimi gerektiren her yapıda
                  kullanılır:
                </p>
                <ul className="space-y-3 text-slate-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Ofis Binaları:</strong> HVAC, aydınlatma ve enerji
                      yönetimi
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span>
                      <strong>AVM ve Ticari Yapılar:</strong> Merkezi klima
                      kontrolü, aydınlatma otomasyonu
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Hastaneler:</strong> Hava kalitesi kontrolü,
                      kritik alan yönetimi
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Oteller:</strong> Oda otomasyonu, merkezi sistem
                      kontrolü
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Eğitim Kurumları:</strong> Sınıf ve laboratuvar
                      kontrolü
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
                      Kontrol Ünitesi
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      DDC Kontrolcü
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Protokoller
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      BACnet, Modbus, LonWorks
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Gerilim Seviyesi
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      24V / 230V
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      IP Koruma Sınıfı
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      IP54 / IP65
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Haberleşme
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      RS-485, Ethernet
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Standartlar
                    </span>
                    <span className="text-indigo-600 font-semibold text-lg">
                      IEC 61439, EN 15232
                    </span>
                  </div>
                </div>
              </div>

              <section className="py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    DDC Panosu İçin Teklif Alın
                  </h2>
                  <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                    Akıllı bina yönetimi için DDC panosu çözümlerimizi keşfedin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20DDC%20(Direct%20Digital%20Control)%20panosu%20için%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
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
