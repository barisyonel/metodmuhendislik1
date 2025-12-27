import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import KatalogViewer from "./components/KatalogViewer";
import KatalogPDFViewer from "./components/KatalogPDFViewer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog | Metod Mühendislik - Ürün ve Hizmet Kataloğu",
  description:
    "Metod Mühendislik ürün ve hizmet kataloğu. Elektrik pano üretimi, CNC lazer kesim, büküm, kaynak, elektrostatik toz boya ve çelik konstrüksiyon hizmetlerimizi keşfedin. PDF formatında indirebilirsiniz.",
  keywords:
    "metod mühendislik katalog, ürün kataloğu, elektrik pano katalog, CNC lazer kesim katalog, endüstriyel üretim katalog, marin pano katalog, İstanbul elektrik pano",
};

export default function KatalogPage() {
  const katalogFileName = "Metod Mühendislik.Katalog.pdf";
  const katalogUrl = `/dokumanlar/${encodeURIComponent(katalogFileName)}`;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-blue-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Katalog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Ürün ve Hizmet{" "}
                <span className="text-blue-300">Kataloğumuz</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Tüm ürün ve hizmetlerimizi detaylı olarak inceleyin. Elektrik pano üretimi, 
                CNC lazer kesim, büküm, kaynak ve endüstriyel çözümlerimiz hakkında 
                kapsamlı bilgi edinin.
              </p>
            </div>
          </div>
        </section>

        {/* Katalog İçerik Bölümü */}
        <section className="py-8 md:py-12 bg-white">
          <div className="w-full px-4 md:px-6 lg:px-8">
            {/* Üst Bilgi ve Butonlar */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                    Metod Mühendislik Kataloğu
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3 max-w-3xl">
                    Tüm ürün ve hizmetlerimizi detaylı olarak görebileceğiniz kapsamlı kataloğumuz. 
                    Elektrik pano sistemleri, marin panolar, CNC lazer kesim, büküm, kaynak, 
                    elektrostatik toz boya ve çelik konstrüksiyon hizmetlerimiz hakkında 
                    teknik bilgiler, görseller ve özellikler.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      PDF Formatı
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Ücretsiz İndirme
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Detaylı İçerik
                    </span>
                  </div>
                </div>
                <KatalogViewer katalogUrl={katalogUrl} katalogFileName={katalogFileName} />
              </div>
            </div>

            {/* PDF Viewer - Tam Genişlik */}
            <div className="w-full mb-8">
              <KatalogPDFViewer katalogUrl={katalogUrl} katalogFileName={katalogFileName} />
            </div>

            {/* Katalog İçeriği Hakkında Bilgi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 mt-8">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Katalog İçeriği
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Elektrik Pano Üretimi (Sıvaüstü, Sıvaaltı, Marin)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>CNC Lazer Kesim ve Büküm Hizmetleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Kaynak ve Metal İmalat Çözümleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Elektrostatik Toz Boya Hizmetleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Çelik Konstrüksiyon Projeleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Teknik Özellikler ve Standartlar</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Katalog Hakkında
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Kataloğumuz, 20+ yıllık deneyimimizle üretilen ürün ve hizmetlerimizi 
                    detaylı olarak sunmaktadır. ISO 9001 kalite standartlarına uygun üretim 
                    süreçlerimiz, modern tesislerimiz ve uzman ekibimizle gerçekleştirdiğimiz 
                    projeler hakkında bilgi edinebilirsiniz.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Katalog içeriğinde yer alan tüm ürün ve hizmetlerimiz için detaylı 
                    teklif almak ve uzman ekibimizle görüşmek için bizimle iletişime geçebilirsiniz.
                  </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-blue-600 to-slate-900 rounded-2xl p-6 md:p-8 lg:p-10 text-white text-center mt-8">
                <h2 className="text-2xl md:text-3xl font-black mb-3">
                  Katalog Hakkında Sorularınız mı Var?
                </h2>
                <p className="text-base md:text-lg text-blue-100 mb-6">
                  Uzman ekibimizle iletişime geçin, projeniz için en uygun çözümü birlikte belirleyelim.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20katalog%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105 text-sm md:text-base"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp ile İletişime Geç
                  </a>
                  <a
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all text-sm md:text-base"
                  >
                    İletişim Sayfası
                  </a>
                </div>
              </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
