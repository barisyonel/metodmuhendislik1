import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalite Belgelerimiz ve Sertifikalarımız | Metod Mühendislik - Elektrik Pano Sertifikaları",
  description:
    "Metod Mühendislik kalite belgeleri ve sertifikaları. ISO 9001, ISO 14001, ISO 45001 kalite yönetim sistemi sertifikaları, TESTLA IP68/IP66/IP55 elektrik pano sertifikaları, TÜRK LOYDU tip onay belgeleri ve IEC 61439 standartlarına uygun üretim belgelerimiz.",
  keywords:
    "elektrik pano sertifikaları, ISO 9001, ISO 14001, ISO 45001, kalite belgeleri, sertifikalar, tip test belgesi, kalite yönetim sistemi, TESTLA sertifikası, IP68 pano, IP66 pano, IP55 pano, TÜRK LOYDU sertifikası, IEC 61439, elektrik pano kalite belgesi, marin pano sertifikası, sızdırmaz pano sertifikası",
  openGraph: {
    title: "Kalite Belgelerimiz ve Sertifikalarımız | Metod Mühendislik",
    description:
      "ISO standartlarına uygun kalite belgeleri, TESTLA elektrik pano sertifikaları ve TÜRK LOYDU tip onay belgelerimizi inceleyin.",
    type: "website",
    locale: "tr_TR",
  },
};

interface KaliteBelgesi {
  id: string;
  adi: string;
  aciklama: string;
  icerik: string;
  icon: string;
  renk: string;
}

const kaliteBelgeleri: KaliteBelgesi[] = [
  {
    id: "iso-9001",
    adi: "ISO 9001:2015",
    aciklama: "Kalite Yönetim Sistemi",
    icerik: "ISO 9001:2015 Kalite Yönetim Sistemi sertifikamız, ürün ve hizmet kalitemizin uluslararası standartlara uygunluğunu belgeler. Müşteri memnuniyeti, sürekli iyileştirme ve kalite odaklı yaklaşımımızı taahhüt eder.",
    icon: "✓",
    renk: "blue",
  },
  {
    id: "iso-14001",
    adi: "ISO 14001:2015",
    aciklama: "Çevre Yönetim Sistemi",
    icerik: "ISO 14001:2015 Çevre Yönetim Sistemi sertifikamız, çevresel sorumluluklarımızı ve sürdürülebilir üretim yaklaşımımızı belgeler. Çevre dostu üretim süreçleri ve çevresel etkilerin minimize edilmesi konusundaki taahhütlerimizi gösterir.",
    icon: "🌱",
    renk: "green",
  },
  {
    id: "iso-45001",
    adi: "ISO 45001:2018",
    aciklama: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
    icerik: "ISO 45001:2018 İş Sağlığı ve Güvenliği Yönetim Sistemi sertifikamız, çalışanlarımızın sağlığı ve güvenliği konusundaki yüksek standartlarımızı belgeler. İş güvenliği kültürümüz ve güvenli çalışma ortamı taahhütlerimizi gösterir.",
    icon: "🛡️",
    renk: "orange",
  },
  {
    id: "tip-test",
    adi: "Tip Test Belgesi",
    aciklama: "Ürün Tip Test Onayı",
    icerik: "Tip Test Belgemiz, ürünlerimizin ulusal ve uluslararası standartlara uygunluğunu, güvenlik gereksinimlerini karşıladığını ve kalite kriterlerini sağladığını belgeler. Ürünlerimizin teknik özelliklerinin bağımsız test ve onay süreçlerinden geçtiğini gösterir.",
    icon: "📋",
    renk: "purple",
  },
];

export default function KaliteBelgeleri() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Kalite Belgelerimiz
            </h1>
            <p className="text-blue-200 text-lg max-w-3xl">
              Uluslararası standartlara uygun kalite yönetim sistemlerimiz ve sertifikalarımız. 
              Kalite, çevre ve iş güvenliği konularındaki taahhütlerimiz.
            </p>
          </div>
        </section>

        {/* Sertifika Görselleri Bölümü */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Sertifika Görselleri Bölümü */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                  Sertifika Belgelerimiz
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* TESTLA IP68 Sertifikası */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      TESTLA IP68 Sertifikası
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Marin Panel Marka SP Model Sızdırmaz Pano - TS EN 62208 Standardı
                    </p>
                    <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-slate-200">
                      <Image
                        src="/sertfikalar/sertfika1.jpeg"
                        alt="TESTLA IP68 Sertifikası - Sızdırmaz Pano"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* TESTLA IP66 Sertifikası */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      TESTLA IP66 Sertifikası
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Marin Panel Marka DP Model Duvar Tipi Pano - TS EN 62208 Standardı
                    </p>
                    <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-slate-200">
                      <Image
                        src="/sertfikalar/sertfika2.jpeg"
                        alt="TESTLA IP66 Sertifikası - Duvar Tipi Pano"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* TESTLA IP55 Sertifikası */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      TESTLA IP55 Sertifikası
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Marin Panel Marka DT Model Dikili Tip Modüler Pano - TS EN IEC 61439 Standardı
                    </p>
                    <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-slate-200">
                      <Image
                        src="/sertfikalar/sertfika3.jpeg"
                        alt="TESTLA IP55 Sertifikası - Dikili Tip Modüler Pano"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* TÜRK LOYDU Type Approval Certificate */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      TÜRK LOYDU Tip Onay Sertifikası
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Marin Panel Switchboards / Groups - Type Approval Certificate (2022-2027)
                    </p>
                    <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-slate-200">
                      <Image
                        src="/sertfikalar/serfika.jpeg"
                        alt="TÜRK LOYDU Tip Onay Sertifikası"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kalite Belgeleri Grid - Butonlar Kaldırıldı */}
              <div className="mt-16 mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                  Kalite Yönetim Sistemlerimiz
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {kaliteBelgeleri.map((belge) => {
                    const renkClass = {
                      blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
                      green: "from-green-50 to-green-100 border-green-200 text-green-700",
                      orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-700",
                      purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
                    }[belge.renk];

                    const renkIcon = {
                      blue: "bg-blue-600",
                      green: "bg-green-600",
                      orange: "bg-orange-600",
                      purple: "bg-purple-600",
                    }[belge.renk];

                    return (
                      <div
                        key={belge.id}
                        className={`bg-gradient-to-br ${renkClass} p-8 rounded-2xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`${renkIcon} text-white w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0`}>
                            {belge.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">
                              {belge.adi}
                            </h3>
                            <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                              {belge.aciklama}
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {belge.icerik}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SEO İçerik Bölümü - Elektrik Pano Odaklı */}
              <div className="mb-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-10 border-2 border-slate-200">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                  Elektrik Pano Sertifikaları ve Kalite Standartları
                </h2>
                <div className="prose prose-lg max-w-none text-slate-700 space-y-4 leading-relaxed">
                  <p>
                    <strong>Metod Mühendislik</strong> olarak, ürettiğimiz <strong>elektrik panoları</strong> için 
                    uluslararası standartlara uygunluk belgelerine sahibiz. <strong>TESTLA Elektrik Laboratuvarları</strong> 
                    tarafından test edilen ve sertifikalandırılan <strong>IP68, IP66 ve IP55</strong> koruma sınıfına sahip 
                    <strong>elektrik panolarımız</strong>, <strong>TS EN 62208</strong> ve <strong>TS EN IEC 61439</strong> 
                    standartlarına tam uyumludur.
                  </p>
                  <p>
                    <strong>Marin panolar</strong>, <strong>sıvaüstü panolar</strong>, <strong>sıvaaltı panolar</strong>, 
                    <strong>dahili panolar</strong> ve <strong>modüler panolar</strong> için sahip olduğumuz sertifikalar, 
                    ürünlerimizin farklı ortam koşullarında güvenli ve verimli çalışmasını garanti eder. 
                    <strong>TÜRK LOYDU</strong> tarafından verilen <strong>Tip Onay Sertifikamız</strong>, 
                    ürünlerimizin denizcilik sektöründe kullanım için uygunluğunu belgeler.
                  </p>
                  <p>
                    <strong>IEC 61439-1/2</strong> standartlarına uygun üretilen <strong>elektrik panolarımız</strong>, 
                    <strong>ISO 9001:2015</strong> Kalite Yönetim Sistemi, <strong>ISO 14001:2015</strong> Çevre Yönetim 
                    Sistemi ve <strong>ISO 45001:2018</strong> İş Sağlığı ve Güvenliği Yönetim Sistemi sertifikalarımız 
                    ile desteklenmektedir. Bu kapsamlı sertifikasyon yapısı, müşterilerimize en yüksek kalitede 
                    <strong>elektrik pano çözümleri</strong> sunmamızı sağlar.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h3 className="font-black text-slate-900 mb-2">IP Koruma Sınıfları</h3>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• <strong>IP68:</strong> Sızdırmaz pano - Suya tam dayanıklı</li>
                        <li>• <strong>IP66:</strong> Duvar tipi pano - Toz ve su sıçramasına dayanıklı</li>
                        <li>• <strong>IP55:</strong> Modüler pano - Toz ve su sıçramasına korumalı</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h3 className="font-black text-slate-900 mb-2">Standartlar ve Belgeler</h3>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• <strong>TS EN 62208:</strong> Boş pano standartı</li>
                        <li>• <strong>TS EN IEC 61439:</strong> Alçak gerilim pano standartı</li>
                        <li>• <strong>TÜRK LOYDU:</strong> Denizcilik tip onay belgesi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bilgilendirme Bölümü */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-10 border-2 border-slate-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                      Kalite Belgelerimiz Hakkında
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                      <p>
                        Metod Mühendislik olarak, ürün ve hizmet kalitemizin sürekli olarak 
                        uluslararası standartlara uygunluğunu sağlamak için kalite yönetim 
                        sistemlerimizi etkin bir şekilde uygulamaktayız.
                      </p>
                      <p>
                        ISO sertifikalarımız, müşterilerimize ve paydaşlarımıza kalite, çevre 
                        ve iş güvenliği konularındaki taahhütlerimizi gösterir. Bu belgeler, 
                        bağımsız denetim kuruluşları tarafından düzenli olarak gözden geçirilir 
                        ve yenilenir.
                      </p>
                      <p>
                        Belge görüntüleme veya indirme talepleriniz için lütfen bizimle iletişime geçin.
                      </p>
                    </div>
                  </div>
                </div>

                {/* İletişim Butonu */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    İletişime Geç
                  </a>
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20kalite%20belgeleriniz%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp ile İletişim
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
