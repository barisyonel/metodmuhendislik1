import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrostatik Toz Boya | Metod Mühendislik",
  description:
    "Elektrostatik toz boya hizmetleri. İstanbul'da RAL renk standardına uygun boyama hizmetleri. Çevre dostu ve uzun ömürlü yüzey işlemleri.",
  keywords:
    "elektrostatik toz boya, toz boya, yüzey işleme, RAL renk, İstanbul",
};

export default function ElektrostatikTozBoyaPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          {/* Arka Plan Görseli */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Elektrostatik Toz Boya.png"
              alt="Elektrostatik Toz Boya - Metod Mühendislik"
              fill
              className="object-cover opacity-20"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="text-6xl mb-6">🎨</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Elektrostatik Toz Boya
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                Modern boya teknolojileri ile uzun ömürlü ve estetik yüzey işlemleri. Çevre dostu çözümler.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Görsel */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/Elektrostatik Toz Boya.png"
                    alt="Elektrostatik Toz Boya - Metod Mühendislik"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Elektrostatik Toz Boya ve Yüzey İşlemleri
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Elektrostatik toz boya teknolojisi, endüstriyel üretimde uzun ömürlü ve estetik yüzey işlemleri için tercih edilen modern bir yöntemdir. Bu teknoloji sayesinde, metal yüzeylerde kalıcı, çevre dostu ve yüksek kaliteli boya kaplamaları elde edilmektedir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Elektrostatik toz boya işlemlerimiz, ön yüzey hazırlığından fırınlama sürecine kadar tüm aşamalarda uzman kontrolü altında gerçekleştirilmektedir. Metod Mühendislik olarak, geniş bir renk paleti ve farklı yüzey dokuları sunmaktayız.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Boya İşlem Süreçleri ve Renk Seçenekleri
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Elektrostatik toz boya hizmetlerimiz, özellikle pano üretimi, makine gövdeleri, mimari uygulamalar ve genel endüstriyel ürünlerde kullanılmaktadır. Boya işlemlerimizde, RAL renk standardına uygun olarak çalışmakta ve müşteri taleplerine göre özel renkler de üretebilmekteyiz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Ön yüzey hazırlığı aşamasında, malzeme yüzeyi temizlenmekte ve gerekli durumlarda fosfatlama işlemi uygulanmaktadır. Boya uygulama aşamasında, elektrostatik yöntem kullanılarak boya parçacıkları malzeme yüzeyine eşit şekilde dağıtılmaktadır.
                </p>
              </div>

              <div className="mt-12 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Teknik Özellikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Renk Standardı
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">RAL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Fırınlama Sıcaklığı
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">180°C - 200°C</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Kaplama Kalınlığı
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">60-120 μm</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                      Yüzey Hazırlık
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">Fosfatlama, Temizleme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Elektrostatik Toz Boya HİZMETİ İÇİN TEKLİF ALIN
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz.
              Hemen iletişime geçin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20Elektrostatik%20Toz%20Boya%20hizmeti%20için%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <Link
                href="/hizmetler"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                TÜM HİZMETLERİMİZ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

