import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPS Panosu Üretimi | Metod Mühendislik",
  description:
    "UPS panosu üretimi. Kesintisiz güç kaynağı (UPS) panoları, veri merkezleri, kritik sistemler için güvenilir enerji çözümleri. Bypass, statik transfer, akü yönetim sistemleri.",
  keywords:
    "UPS pano, kesintisiz güç kaynağı pano, UPS kontrol panosu, veri merkezi pano, kritik sistem pano, bypass paneli, İstanbul",
};

export default function UPSPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-red-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
              <div className="text-6xl mb-6">🔋</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                UPS Panosu
              </h1>
              <p className="text-xl md:text-2xl text-red-200 leading-relaxed">
                Kesintisiz güç kaynağı sistemleri için kontrol panoları. Kritik
                sistemlerin güvenilir enerji kaynağı.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  UPS Panosu Nedir?
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>UPS Panosu</strong>, kesintisiz güç kaynağı (UPS)
                  sistemlerinin kontrolünü, yönetimini ve güvenliğini sağlayan
                  panolardır. Elektrik kesintilerinde, voltaj düşümlerinde ve
                  şebeke problemlerinde kritik sistemlerin kesintisiz
                  çalışmasını garanti eder. Veri merkezleri, hastaneler,
                  endüstriyel tesisler ve kritik altyapı sistemleri için
                  vazgeçilmezdir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Metod Mühendislik olarak, <strong>bypass panelleri</strong>,{" "}
                  <strong>statik transfer switch (STS)</strong> panoları ve{" "}
                  <strong>akü yönetim sistemleri</strong> içeren UPS panoları
                  üretmekteyiz. Manuel ve otomatik bypass sistemleri, akü şarj
                  kontrolü, alarm ve izleme sistemleri ile donatılmış
                  panolarımız, kritik sistemlerin güvenliğini maksimum seviyede
                  tutar.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  UPS Panolarının Özellikleri
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-red-50 to-slate-50 rounded-xl p-6 border-2 border-red-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-red-600">⚡</span>
                      Bypass Sistemi
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Manuel ve otomatik bypass sistemleri. UPS bakımı veya
                      arızasında kesintisiz enerji sağlama. Statik transfer
                      switch (STS) ile hızlı geçiş.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">🔋</span>
                      Akü Yönetimi
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Akü şarj kontrolü, akü sağlığı izleme, akü test
                      sistemleri. Akü ömrünü uzatan akıllı şarj algoritmaları.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">📊</span>
                      İzleme ve Alarm
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Gerilim, akım, frekans, sıcaklık izleme. Uzaktan izleme ve
                      alarm sistemleri. SNMP, Modbus, Ethernet haberleşme.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-orange-600">🔒</span>
                      Güvenlik ve Koruma
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Aşırı akım, aşırı gerilim, kısa devre koruması. IP koruma
                      sınıfları ve EMC uyumluluk. Güvenli operasyon garantisi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Kullanım Alanları
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  UPS panoları, kesintisiz enerji gerektiren kritik sistemlerde
                  kullanılır:
                </p>
                <ul className="space-y-3 text-slate-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Veri Merkezleri:</strong> Sunucular, network
                      ekipmanları, kritik IT sistemleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Hastaneler:</strong> Ameliyathane, yoğun bakım,
                      tıbbi cihazlar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Endüstriyel Tesisler:</strong> Kontrol sistemleri,
                      güvenlik sistemleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>
                      <strong>Finans Kurumları:</strong> Bankalar, borsalar,
                      ödeme sistemleri
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>
                      <strong>İletişim:</strong> Telekomünikasyon merkezleri,
                      veri iletim sistemleri
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
                      UPS Güç Aralığı
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      1kVA - 1000kVA+
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Gerilim Seviyesi
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      230V / 400V
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Bypass Tipi
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      Manuel / Otomatik / STS
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      IP Koruma Sınıfı
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      IP54 / IP65
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Haberleşme
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      SNMP, Modbus, Ethernet
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Standartlar
                    </span>
                    <span className="text-red-600 font-semibold text-lg">
                      IEC 61439, EN 62040
                    </span>
                  </div>
                </div>
              </div>

              <section className="py-20 md:py-32 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    UPS Panosu İçin Teklif Alın
                  </h2>
                  <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                    Kritik sistemleriniz için kesintisiz güç kaynağı panosu
                    çözümlerimizi keşfedin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20UPS%20Panosu%20için%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
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
