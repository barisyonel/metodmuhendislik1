import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otomasyon Panosu Üretimi | Metod Mühendislik",
  description:
    "Otomasyon panosu üretimi. PLC, SCADA, HMI sistemleri için otomasyon panoları. Endüstri 4.0 uyumlu, akıllı bina sistemleri, proses kontrol panoları. IEC standartlarına uygun üretim.",
  keywords:
    "otomasyon panosu, PLC pano, SCADA pano, HMI pano, endüstri 4.0, akıllı bina sistemleri, proses kontrol, İstanbul",
};

export default function OtomasyonPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-orange-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
              <div className="text-6xl mb-6">🤖</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Otomasyon Panosu
              </h1>
              <p className="text-xl md:text-2xl text-orange-200 leading-relaxed">
                Endüstri 4.0 ve akıllı bina sistemlerinin beyni. Karmaşık
                süreçlerin dijital kontrolü ve yönetimi.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Otomasyon Panosu Nedir?
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Otomasyon Panosu</strong>, endüstriyel süreçlerin,
                  bina sistemlerinin ve makine operasyonlarının otomatik
                  kontrolünü sağlayan panolardır. PLC (Programlanabilir Lojik
                  Kontrolcü), SCADA (Supervisory Control and Data Acquisition)
                  ve HMI (Human Machine Interface) sistemlerini içeren bu
                  panolar, karmaşık süreçlerin insan hatasından bağımsız, hassas
                  ve verimli bir şekilde yönetilmesini sağlar.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, <strong>Endüstri 4.0</strong> uyumlu
                  otomasyon panoları üretmekteyiz. PLC, SCADA ve HMI
                  altyapılarına uygun çözümlerimizle süreçleri
                  dijitalleştiriyor, uzaktan izleme ve kontrol imkanı sunuyoruz.
                  Özellikle akıllı bina sistemleri, proses kontrol ve üretim
                  hatları için özel tasarımlı otomasyon panoları üretiyoruz.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Otomasyon Panolarının Özellikleri
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-orange-600">🔌</span>
                      PLC Entegrasyonu
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Siemens, Schneider, ABB, Allen-Bradley gibi tüm önde gelen
                      PLC markalarıyla uyumlu otomasyon panoları. Modüler ve
                      esnek yapı.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">📊</span>
                      SCADA ve HMI
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Süreç görselleştirme, veri toplama ve operatör müdahalesi
                      için SCADA ve HMI sistemleri entegrasyonu.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-purple-600">🌐</span>
                      Endüstriyel Haberleşme
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Modbus, Profibus, Profinet, Ethernet/IP, OPC-UA gibi
                      endüstriyel haberleşme protokollerini destekler.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">🔒</span>
                      Güvenlik ve EMC
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      EMC (Elektromanyetik Uyumluluk) standartlarına uygun,
                      gürültü filtreleme ve koruma sistemleri içerir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Kullanım Alanları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Otomasyon panoları, otomatik kontrol gerektiren her sistemde
                  kullanılır:
                </p>
                <ul className="space-y-3 text-slate-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Akıllı Bina Sistemleri:</strong> HVAC kontrolü,
                      aydınlatma otomasyonu, güvenlik sistemleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Üretim Hatları:</strong> Otomatik üretim
                      süreçleri, makine kontrolü, kalite kontrol
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Proses Endüstrisi:</strong> Kimya, petrokimya,
                      gıda işleme tesisleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Su ve Atıksu:</strong> Pompa istasyonları, arıtma
                      tesisleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Enerji Santralleri:</strong> Güneş, rüzgar,
                      biyokütle enerji sistemleri
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
                      PLC Markaları
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      Tüm Markalar
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Haberleşme
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      Modbus, Profibus, Ethernet
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Gerilim Seviyesi
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      24V / 230V / 400V
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      IP Koruma Sınıfı
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      IP54 / IP65
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      EMC Uyumluluk
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      EN 61000-6-2/4
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Standartlar
                    </span>
                    <span className="text-orange-600 font-semibold text-lg">
                      IEC 61439
                    </span>
                  </div>
                </div>
              </div>

              <section className="py-20 md:py-32 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Otomasyon Panosu İçin Teklif Alın
                  </h2>
                  <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                    Endüstri 4.0 uyumlu otomasyon çözümleri için uzman
                    ekibimizle iletişime geçin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20Otomasyon%20Panosu%20için%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
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
