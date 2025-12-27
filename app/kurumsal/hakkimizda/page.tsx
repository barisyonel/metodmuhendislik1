import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Metod Mühendislik - Elektrik Pano Üretimi ve Endüstriyel Çözümler",
  description:
    "Metod Mühendislik, 20+ yıllık deneyimiyle İstanbul Tuzla&apos;daki modern tesisimizde elektrik pano üretimi, marin pano, CNC lazer kesim ve endüstriyel üretim hizmetleri sunmaktadır. ISO 9001 kalite sertifikası ile güvenilir çözüm ortağınız.",
  keywords:
    "Metod Mühendislik, hakkımızda, şirket tarihçesi, İstanbul elektrik pano, Tuzla üretim tesisi, ISO 9001, endüstriyel üretim, 20 yıllık deneyim",
  openGraph: {
    title: "Hakkımızda | Metod Mühendislik",
    description:
      "20+ yıllık deneyimle İstanbul&apos;da elektrik pano ve endüstriyel üretim çözümleri sunan Metod Mühendislik hakkında bilgi edinin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function Hakkimizda() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-blue-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Şirketimiz
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Hakkımızda
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                20+ yıllık deneyimimizle elektrik pano üretimi ve endüstriyel çözümlerde
                sektörün güvenilir çözüm ortağıyız.
              </p>
            </div>
          </div>
        </section>

        {/* Şirket Tanıtım */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
                  <strong>Metod Mühendislik</strong>, endüstriyel tesislerin enerji güvenliğini sağlamak amacıyla kurulmuş bir mühendislik ve üretim merkezidir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Yılların verdiği tecrübe ile <strong>İstanbul Tuzla İTOSB (İstanbul Ticaret Odası Sanayi Bölgesi)</strong> merkezli fabrikamızda, Türkiye&apos;nin ve dünyanın dört bir yanına <strong>IEC standartlarında</strong> elektrik pano çözümleri sunuyoruz. 20+ yıllık deneyimimizle, endüstriyel üretim sektöründe güvenilir çözüm ortağı olmanın gururunu taşıyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Elektrik pano üretimi</strong> ana faaliyet alanımızdır. Sıvaüstü, sıvaaltı, dahili ve marin pano (gemi elektrik panoları) üretimi ile müşterilerimize güvenilir enerji dağıtım çözümleri sunmaktayız. Ayrıca <strong>CNC lazer kesim</strong>, <strong>CNC büküm</strong>, <strong>metal kaynak</strong>, <strong>elektrostatik toz boya</strong>, <strong>mağaza raf sistemleri</strong> ve <strong>çelik konstrüksiyon</strong> hizmetlerimizle endüstriyel üretimin her aşamasında yanınızdayız.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-6xl mx-auto">
              {[
                {
                  number: "20+",
                  label: "Yıllık Deneyim",
                  icon: "⭐",
                },
                {
                  number: "2000m²",
                  label: "Üretim Alanı",
                  icon: "🏭",
                },
                {
                  number: "12",
                  label: "Ülkeye İhracat",
                  icon: "🌍",
                },
                {
                  number: "ISO 9001",
                  label: "Kalite Sertifikası",
                  icon: "🏆",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="text-4xl md:text-5xl mb-4">{stat.icon}</div>
                  <p className="text-3xl md:text-4xl font-black text-blue-600 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Misyon, Vizyon, Değerler */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Misyon */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="text-4xl mb-4">🎯</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Misyonumuz</h2>
                  <p className="text-slate-700 leading-relaxed">
                    Endüstriyel tesislerin güvenli enerji dağıtımı için yüksek kaliteli elektrik pano ve üretim çözümleri sunarak, müşterilerimizin başarısına katkı sağlamak. ISO 9001 kalite standartlarına uygun üretim ile sektörde öncü olmak.
                  </p>
                </div>

                {/* Vizyon */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-2 border-slate-200">
                  <div className="text-4xl mb-4">🔮</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Vizyonumuz</h2>
                  <p className="text-slate-700 leading-relaxed">
                    Türkiye&apos;de ve uluslararası pazarlarda elektrik pano üretimi ve endüstriyel çözümlerde öncü firma olmak. Yenilikçi teknolojiler ve sürdürülebilir üretim anlayışı ile sektörü şekillendirmek.
                  </p>
                </div>

                {/* Değerler */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200">
                  <div className="text-4xl mb-4">💎</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Değerlerimiz</h2>
                  <ul className="text-slate-700 space-y-2 leading-relaxed">
                    <li>• <strong>Kalite:</strong> Her projede mükemmellik</li>
                    <li>• <strong>Güven:</strong> Şeffaf ve dürüst iletişim</li>
                    <li>• <strong>İnovasyon:</strong> Sürekli gelişim</li>
                    <li>• <strong>Müşteri Odaklılık:</strong> Memnuniyet önceliğimiz</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Şirket Tarihçesi */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Şirket Tarihçemiz
              </h2>
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-xl font-black text-slate-900 mb-3">2000&apos;li Yıllar - Kuruluş ve İlk Adımlar</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Metod Mühendislik, endüstriyel elektrik pano ihtiyacının artması ve kaliteli üretimin önem kazanması ile birlikte kuruldu. İlk yıllarında küçük ölçekli projelerle sektöre adım attık.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                  <h3 className="text-xl font-black text-slate-900 mb-3">2010&apos;lu Yıllar - Büyüme ve Genişleme</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Üretim kapasitemizi artırdık ve İstanbul Tuzla İTOSB&apos;daki modern tesisimize taşındık. CNC lazer kesim, büküm ve kaynak hizmetlerimizi ekleyerek hizmet yelpazemizi genişlettik.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
                  <h3 className="text-xl font-black text-slate-900 mb-3">2020&apos;li Yıllar - Uluslararası Pazarlar ve Sertifikasyon</h3>
                  <p className="text-slate-700 leading-relaxed">
                    ISO 9001 Kalite Yönetim Sistemi sertifikamızı aldık. 12 ülkeye ihracat yaparak uluslararası pazarda güçlü bir konum elde ettik. Marin pano (gemi elektrik panoları) üretiminde uzmanlaştık.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-600">
                  <h3 className="text-xl font-black text-slate-900 mb-3">Bugün - Sektörün Öncüsü</h3>
                  <p className="text-slate-700 leading-relaxed">
                    2000m² üretim alanımızda, 20+ yıllık deneyimimiz ve uzman ekibimizle endüstriyel üretimde güvenilir çözüm ortağı olmaya devam ediyoruz. Yenilikçi teknolojiler ve kaliteli hizmet anlayışı ile müşterilerimize değer katıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tesis ve Lokasyon */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                    Modern Üretim Tesisi
                  </h2>
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    <strong>İstanbul Tuzla İTOSB (İstanbul Ticaret Odası Sanayi Bölgesi)</strong> içerisinde, <strong>2000m²</strong> kapalı alan üzerinde kurulu modern üretim tesisimizde çalışmaktayız.
                  </p>
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    Tesisimizde <strong>CNC lazer kesim</strong>, <strong>CNC büküm</strong>, <strong>kaynak</strong>, <strong>elektrostatik toz boya</strong> ve <strong>elektrik pano montaj</strong> üniteleri bulunmaktadır. Tüm üretim süreçlerimiz <strong>ISO 9001</strong> kalite standartlarına uygun olarak gerçekleştirilmektedir.
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-black text-slate-900 mb-3">Adres</h3>
                    <p className="text-slate-700 mb-2">
                      İTOSB SANAYİ BÖLGESİ 3. YOL NO:21
                    </p>
                    <p className="text-slate-700 mb-2">
                      TEPEÖREN - AKFİRAT, TUZLA
                    </p>
                    <p className="text-slate-700 mb-4">
                      İSTANBUL, TÜRKİYE
                    </p>
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                    >
                      Haritada Görüntüle
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/metod.png"
                    alt="Metod Mühendislik Üretim Tesisi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Bizimle Çalışmak İster misiniz?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              20+ yıllık deneyimimiz ve uzman ekibimizle projenize değer katıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
