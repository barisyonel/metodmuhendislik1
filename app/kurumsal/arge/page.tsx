import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ar-Ge ve İnovasyon | Metod Mühendislik - Teknoloji Geliştirme ve Yenilik",
  description:
    "Metod Mühendislik Ar-Ge faaliyetleri. Teknoloji geliştirme, inovasyon projeleri, akıllı pano sistemleri, Endüstri 4.0 çözümleri ve gelecek odaklı mühendislik çalışmalarımız.",
  keywords:
    "Ar-Ge, araştırma geliştirme, inovasyon, teknoloji geliştirme, Endüstri 4.0, akıllı pano, IoT, dijital dönüşüm, mühendislik inovasyonu",
  openGraph: {
    title: "Ar-Ge ve İnovasyon | Metod Mühendislik",
    description:
      "Teknoloji geliştirme ve inovasyon ile geleceğin enerji sistemlerini bugünden tasarlıyoruz. Ar-Ge çalışmalarımız ve projelerimiz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function Arge() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-purple-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-purple-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-purple-900/30 rounded-full">
                İnovasyon
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Ar-Ge ve İnovasyon
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Geleceğin teknolojilerini bugünden geliştiriyoruz. Ar-Ge çalışmalarımızla sektörde öncü olmaya devam ediyoruz
              </p>
            </div>
          </div>
        </section>

        {/* Ar-Ge Vizyonu */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Ar-Ge Vizyonumuz
                </h2>
                <p className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
                  <strong>Metod Mühendislik</strong> olarak, teknolojiyi takip eden değil, teknolojiye yön veren bir marka olmayı hedefliyoruz. Ar-Ge çalışmalarımız, bu vizyonun temel taşlarını oluşturmaktadır.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Sektörümüzdeki teknolojik gelişmeleri yakından takip ederek, müşterilerimize en güncel ve verimli çözümleri sunmak için sürekli araştırma ve geliştirme faaliyetleri yürütüyoruz. Endüstri 4.0, IoT (Nesnelerin İnterneti), akıllı pano sistemleri ve dijital dönüşüm konularında öncü projeler geliştiriyoruz.
                </p>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg border-l-4 border-purple-600 mt-8">
                  <p className="text-slate-800 text-lg leading-relaxed italic text-center font-medium">
                    &quot;İnovasyon, değişimin motorudur. Geleceği şekillendirmek için bugünden çalışıyoruz.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ar-Ge Faaliyetleri */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Ar-Ge Faaliyetlerimiz
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        Akıllı Pano Sistemleri (Smart Panel)
                      </h3>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        Endüstri 4.0 uyumlu, uzaktan izlenebilir ve yönetilebilir akıllı pano sistemleri geliştirme çalışmalarımız devam etmektedir. Bu sistemler, enerji tüketimini optimize eder, arıza öncesi uyarı verir ve operasyonel verimliliği artırır.
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>IoT sensör entegrasyonu ve veri toplama sistemleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Bulut tabanlı izleme ve kontrol platformları</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Yapay zeka destekli öngörücü bakım sistemleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Enerji yönetim ve optimizasyon yazılımları</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        Enerji Verimliliği Teknolojileri
                      </h3>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        Enerji verimliliğini artıran ve karbon ayak izini azaltan teknolojiler geliştiriyoruz. Kompanzasyon sistemleri, akıllı enerji yönetimi ve yenilenebilir enerji entegrasyonu konularında Ar-Ge projeleri yürütüyoruz.
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Gelişmiş kompanzasyon algoritmaları</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Dinamik enerji yönetim sistemleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Yenilenebilir enerji entegrasyon çözümleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Enerji depolama sistemleri</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🔧</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        Üretim Teknolojileri İnovasyonu
                      </h3>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        Üretim süreçlerimizi optimize etmek ve kaliteyi artırmak için otomasyon, robotik ve dijital teknolojiler üzerine çalışıyoruz. CNC teknolojileri, lazer kesim ve montaj otomasyonu konularında gelişmeler kaydediyoruz.
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-1">•</span>
                          <span>Dijital ikiz (Digital Twin) teknolojileri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-1">•</span>
                          <span>Otomatik kalite kontrol sistemleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-1">•</span>
                          <span>AR/VR destekli tasarım ve montaj</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-1">•</span>
                          <span>Yapay zeka destekli üretim planlama</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">
                        Dijital Dönüşüm ve Yazılım Geliştirme
                      </h3>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        Müşterilerimize dijital çözümler sunmak için yazılım geliştirme ekibimizle SCADA sistemleri, HMI arayüzleri ve bulut tabanlı uygulamalar geliştiriyoruz.
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>SCADA ve HMI yazılım geliştirme</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>Mobil uygulamalar ve web platformları</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>API entegrasyonları ve sistem mimarisi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          <span>Büyük veri analizi ve raporlama sistemleri</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ar-Ge Ekibi */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Ar-Ge Ekibimiz
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed text-center mb-8">
                  Ar-Ge faaliyetlerimiz, akademik seviyedeki mühendislerimiz ve uzman teknik ekibimiz tarafından yürütülmektedir. Ekip üyelerimiz, sürekli eğitim ve gelişim programlarıyla kendilerini yenilemektedir.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-purple-600">👨‍🔬</span>
                      Elektrik Mühendisleri
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Güç sistemleri, otomasyon ve kontrol sistemleri konularında uzman elektrik mühendislerimiz, yeni teknolojilerin geliştirilmesi ve uygulanması konularında çalışmaktadır.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-blue-600">💻</span>
                      Yazılım Geliştirme Uzmanları
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      SCADA, HMI, IoT ve bulut tabanlı sistemlerin geliştirilmesi için yazılım uzmanlarımız, modern teknolojileri kullanarak çözümler üretmektedir.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-green-600">🔬</span>
                      Test ve Doğrulama Ekibi
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Geliştirilen teknolojilerin test edilmesi, doğrulanması ve sertifikalandırılması için uzman test ekibimiz çalışmaktadır.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-orange-600">📊</span>
                      Proje Yönetimi
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Ar-Ge projelerinin planlanması, yönetimi ve koordinasyonu için deneyimli proje yöneticilerimiz görev almaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* İşbirlikleri */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Üniversite ve Endüstri İşbirlikleri
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed text-center mb-8">
                  Ar-Ge çalışmalarımızı güçlendirmek için üniversiteler, araştırma merkezleri ve teknoloji şirketleriyle işbirliği yapıyoruz.
                </p>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    İşbirliği Alanlarımız
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-purple-600">🎓</span>
                        Üniversite Ortaklıkları
                      </h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Ortak Ar-Ge projeleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Staj programları ve mezun istihdamı</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span>Akademik danışmanlık</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-blue-600">🤝</span>
                        Endüstri Ortaklıkları
                      </h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Teknoloji transferi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Ortak inovasyon projeleri</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>Lisanslama ve patent işbirlikleri</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gelecek Hedefleri */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Ar-Ge Gelecek Hedeflerimiz
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      Akıllı Pano Yaygınlaştırma
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Geliştirdiğimiz akıllı pano sistemlerini tüm ürün gamımıza entegre ederek, müşterilerimize standart özellik olarak sunmayı hedefliyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      Sürdürülebilir Teknolojiler
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Karbon ayak izini azaltan ve enerji verimliliğini maksimize eden teknolojiler geliştirmeye devam edeceğiz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="text-4xl mb-4">🔬</div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      Patent ve Fikri Mülkiyet
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Geliştirdiğimiz yenilikçi çözümleri patentleyerek, fikri mülkiyet portföyümüzü güçlendirmeyi planlıyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl p-6 border-2 border-orange-200">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      Uluslararası İşbirlikleri
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Global Ar-Ge ekosistemine katılarak, uluslararası projelere dahil olmayı ve teknoloji transferi yapmayı hedefliyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                İnovasyon ve Teknoloji İşbirlikleri
              </h2>
              <p className="text-purple-100 text-xl leading-relaxed mb-6">
                <strong>Metod Mühendislik</strong> olarak, teknoloji ve inovasyon konularında işbirliği yapmak isteyen üniversiteler, araştırma merkezleri ve teknoloji şirketleriyle çalışmaya açığız.
              </p>
              <p className="text-lg text-purple-200 leading-relaxed mb-8">
                Ar-Ge projelerimiz ve teknoloji geliştirme çalışmalarımız hakkında daha fazla bilgi almak veya işbirliği fırsatlarını değerlendirmek için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20Ar-Ge%20ve%20inovasyon%20konularında%20işbirliği%20yapmak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp ile İletişime Geç
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  İletişim Sayfası
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
