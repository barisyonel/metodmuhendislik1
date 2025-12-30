import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { istanbulDistricts, istanbulDistrictNames } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "İstanbul İlçeleri Blog | Elektrik Pano ve Kaynak Hizmetleri",
  description:
    "İstanbul'un tüm ilçeleri için elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri. Kadıköy, Beşiktaş, Şişli, Tuzla ve diğer tüm ilçeler için özel içerikler.",
  keywords:
    "İstanbul elektrik pano, İstanbul kaynak hizmetleri, Kadıköy elektrik pano, Beşiktaş kaynak, Şişli endüstriyel üretim, Tuzla elektrik pano",
};

export default function IstanbulBlogPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                İstanbul İlçeleri Blog
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                İstanbul&apos;un 39 ilçesi için elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri hakkında detaylı bilgiler
              </p>
            </div>
          </div>
        </section>

        {/* İlçeler Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">
              İstanbul İlçeleri
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {istanbulDistricts.map((district) => {
                const districtName = istanbulDistrictNames[district] || district;
                return (
                  <div key={district} className="space-y-2">
                    <Link
                      href={`/blog/${district}-elektrik-pano`}
                      className="block p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl hover:shadow-lg hover:border-blue-600 transition-all group"
                    >
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                        {districtName} - Elektrik Pano
                      </h3>
                    </Link>
                    <Link
                      href={`/blog/${district}-kaynak`}
                      className="block p-4 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-xl hover:shadow-lg hover:border-orange-600 transition-all group"
                    >
                      <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-sm">
                        {districtName} - Kaynak
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              İstanbul&apos;da Hizmet Almak İster misiniz?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              İstanbul&apos;un tüm ilçelerinde elektrik pano ve kaynak hizmetleri için uzman ekibimizle iletişime geçin.
            </p>
            <a
              href="https://wa.me/905425786060?text=Merhaba,%20İstanbul%20için%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp ile Teklif Al
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

