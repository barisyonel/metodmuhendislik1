import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sürdürülebilirlik | Metod Mühendislik - Çevre Dostu Üretim ve Sürdürülebilir Gelecek",
  description:
    "Metod Mühendislik sürdürülebilirlik politikası. Çevre dostu üretim, enerji verimliliği, atık yönetimi ve sosyal sorumluluk projelerimiz ile gelecek nesillere daha iyi bir dünya bırakmayı hedefliyoruz.",
  keywords:
    "sürdürülebilirlik, çevre dostu üretim, yeşil üretim, enerji verimliliği, karbon ayak izi, çevre koruma, sosyal sorumluluk, sürdürülebilir kalkınma",
  openGraph: {
    title: "Sürdürülebilirlik | Metod Mühendislik",
    description:
      "Çevre dostu üretim ve sürdürülebilir gelecek için Metod Mühendislik'in sürdürülebilirlik yaklaşımı ve hedefleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function Surdurulebilirlik() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-600 via-green-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-green-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-green-900/30 rounded-full">
                Sürdürülebilirlik
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Sürdürülebilir Gelecek İçin
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Çevre dostu üretim, enerji verimliliği ve sosyal sorumluluk ile gelecek nesillere daha iyi bir dünya bırakmayı hedefliyoruz
              </p>
            </div>
          </div>
        </section>

        {/* Sürdürülebilirlik Vizyonu */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Sürdürülebilirlik Vizyonumuz
                </h2>
                <p className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
                  <strong>Metod Mühendislik</strong> olarak, sadece bugünü değil, geleceği de düşünerek faaliyet gösteriyoruz. Sürdürülebilirlik, iş stratejimizin ve operasyonel yaklaşımımızın ayrılmaz bir parçasıdır.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Üretim faaliyetlerimizi çevreye saygılı, enerji verimli ve sosyal sorumluluk bilinciyle yürütmeyi taahhüt ediyoruz. Bu yaklaşımımız, iş süreçlerimizin her aşamasında kendini gösterir ve gelecek nesillere daha yaşanabilir bir dünya bırakma hedefimizi destekler.
                </p>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border-l-4 border-green-600 mt-8">
                  <p className="text-slate-800 text-lg leading-relaxed italic text-center font-medium">
                    &quot;Sürdürülebilir kalkınma, bugünün ihtiyaçlarını karşılarken gelecek nesillerin kendi ihtiyaçlarını karşılayabilme yeteneğini tehlikeye atmamaktır.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Çevre Dostu Üretim */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Çevre Dostu Üretim
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  Üretim süreçlerimizde çevresel etkimizi minimize etmek için sürekli olarak çalışıyoruz. Bu kapsamda:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Enerji Verimli Üretim
                      </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Üretim hatlarımızda enerji verimliliğini artırmak için modern teknolojiler kullanıyoruz. Enerji tüketimimizi optimize ederek karbon ayak izimizi sürekli azaltıyoruz.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Atık Yönetimi
                      </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Atık minimizasyonu ve geri dönüşüm programlarımızla atık miktarımızı azaltıyoruz. Üretim artıklarının geri kazanımı için sürekli iyileştirme çalışmaları yürütüyoruz.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Temiz Enerji Kullanımı
                      </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Tesislerimizde yenilenebilir enerji kaynaklarının kullanımını artırmak için çalışıyoruz. Güneş enerjisi sistemleri ve enerji verimli ekipmanlar ile çevresel etkimizi azaltıyoruz.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Sürdürülebilir Malzeme Kullanımı
                      </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Ürünlerimizde geri dönüştürülebilir ve çevre dostu malzemeler tercih ediyoruz. Tedarik zincirimizde de sürdürülebilir malzeme kullanımını destekliyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enerji Verimliliği */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Enerji Verimliliği ve İklim Değişikliği
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong>Metod Mühendislik</strong> olarak, iklim değişikliği ile mücadelede aktif rol alıyoruz. Enerji verimliliği, hem üretim süreçlerimizde hem de ürünlerimizde önceliğimizdir.
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    Ürünlerimizde Enerji Verimliliği
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Ürettiğimiz elektrik panoları ve kontrol sistemleri, enerji verimliliği sağlayacak şekilde tasarlanmaktadır. Özellikle kompanzasyon panolarımız ile müşterilerimizin enerji tüketimini optimize ederek hem maliyet tasarrufu hem de çevresel fayda sağlıyoruz.
                  </p>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span><strong>Kompanzasyon Sistemleri:</strong> Reaktif güç kompanzasyonu ile enerji kayıplarını minimize ediyoruz.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span><strong>Akıllı Kontrol Sistemleri:</strong> Otomasyon panolarımız ile enerji kullanımını optimize ediyoruz.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span><strong>Verimli Bileşenler:</strong> Enerji verimli kontaktörler, röleler ve diğer bileşenleri tercih ediyoruz.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-green-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    Karbon Ayak İzi Azaltma Hedeflerimiz
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-green-200">
                      <div className="text-4xl font-black text-green-600 mb-2">-30%</div>
                      <p className="text-slate-700 font-semibold">2025 yılına kadar karbon emisyonu azaltma hedefi</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-green-200">
                      <div className="text-4xl font-black text-green-600 mb-2">%50</div>
                      <p className="text-slate-700 font-semibold">Yenilenebilir enerji kullanım oranı hedefi</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-green-200">
                      <div className="text-4xl font-black text-green-600 mb-2">%80</div>
                      <p className="text-slate-700 font-semibold">Atık geri dönüşüm oranı hedefi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sürdürülebilir Tedarik Zinciri */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Sürdürülebilir Tedarik Zinciri
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  Sürdürülebilirliğin sadece kendi operasyonlarımızla sınırlı kalmaması gerektiğine inanıyoruz. Tedarik zincirimizdeki iş ortaklarımızı da sürdürülebilirlik konusunda destekliyor ve sürdürülebilir uygulamaları tercih ediyoruz.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      Tedarikçi Seçim Kriterlerimiz
                    </h3>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Çevre dostu üretim yapan tedarikçiler</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Sosyal sorumluluk standartlarına uygun çalışan firmalar</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Kalite ve çevre sertifikalarına sahip tedarikçiler</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Yerel tedarikçileri önceliklendirme</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      Tedarik Zinciri İyileştirmeleri
                    </h3>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Kısa tedarik zinciri ile lojistik karbon ayak izini azaltma</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Dijital süreçler ile kâğıt kullanımını minimize etme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Toplu sevkiyatlar ile nakliye verimliliğini artırma</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>Tedarikçilerimize sürdürülebilirlik eğitimleri sağlama</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sosyal Sorumluluk */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Sosyal Sorumluluk
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong>Metod Mühendislik</strong> olarak, sürdürülebilirliği sadece çevresel boyutuyla değil, sosyal boyutuyla da ele alıyoruz. Çalışanlarımıza, müşterilerimize ve topluma değer katmayı misyon ediniyoruz.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Çalışan Gelişimi
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Çalışanlarımızın sürekli gelişimi için eğitim programları düzenliyor, sağlıklı ve güvenli çalışma ortamı sağlıyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Eğitim Desteği
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Mesleki teknik eğitim kurumlarına destek sağlayarak, sektörün geleceğine katkıda bulunuyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Toplumsal Katkı
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Yerel topluma katkı sağlayan projelerde yer alarak, sosyal sorumluluk bilincimizi yansıtıyoruz.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-green-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    Çalışan Sağlığı ve Güvenliği
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Çalışanlarımızın sağlığı ve güvenliği en öncelikli konularımızdandır. İş güvenliği eğitimleri, düzenli sağlık kontrolleri ve ergonomik çalışma ortamları ile çalışanlarımızı koruyoruz.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-slate-700 font-semibold">
                        ✓ İş Güvenliği Eğitimleri
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-slate-700 font-semibold">
                        ✓ Düzenli Sağlık Kontrolleri
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-slate-700 font-semibold">
                        ✓ Ergonomik Çalışma Ortamları
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-slate-700 font-semibold">
                        ✓ İş Kazası Sıfır Tolerans Politikası
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sürdürülebilirlik Hedefleri */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Sürdürülebilirlik Hedeflerimiz
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed text-center">
                  Sürdürülebilirlik yolculuğumuzda net hedeflerimiz var. Bu hedeflere ulaşmak için sürekli çalışıyor ve ilerlememizi takip ediyoruz.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-black text-green-600">
                        2025
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Kısa Vadeli Hedefler
                      </h3>
                    </div>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span>Karbon emisyonunu %30 azaltmak</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span>Atık geri dönüşüm oranını %80&apos;e çıkarmak</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span>Enerji tüketimini %20 azaltmak</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span>ISO 14001 Çevre Yönetim Sistemi sertifikası almak</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-black text-blue-600">
                        2030
                      </div>
                      <h3 className="text-xl font-black text-slate-900">
                        Uzun Vadeli Hedefler
                      </h3>
                    </div>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span>Karbon nötr olmak</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span>%100 yenilenebilir enerji kullanımı</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span>Sıfır atık hedefine ulaşmak</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <span>Tüm tedarik zincirinde sürdürülebilirlik standartları</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sürdürülebilirlik Raporlama */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Şeffaflık ve Raporlama
              </h2>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-green-200">
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  Sürdürülebilirlik çalışmalarımızda şeffaflık ilkesini benimsiyoruz. Sürdürülebilirlik performansımızı düzenli olarak ölçüyor, raporluyor ve sürekli iyileştirme çalışmaları yürütüyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Müşterilerimiz, iş ortaklarımız ve tüm paydaşlarımız için sürdürülebilirlik konusundaki taahhütlerimizi yerine getirdiğimizi göstermek ve bu alandaki çabalarımızı paylaşmak önemlidir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sonuç ve CTA */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Sürdürülebilir Gelecek İçin Birlikte
              </h2>
              <p className="text-xl text-green-100 leading-relaxed mb-6">
                <strong>Metod Mühendislik</strong> olarak, sürdürülebilirlik konusundaki taahhütlerimizi yerine getirmek ve gelecek nesillere daha iyi bir dünya bırakmak için çalışıyoruz.
              </p>
              <p className="text-lg text-green-200 leading-relaxed mb-8">
                Sürdürülebilirlik yolculuğumuzda bize katılmak ve çevre dostu çözümlerimizden haberdar olmak ister misiniz?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20sürdürülebilirlik%20konusunda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105"
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

