import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.metodmuhendislik.com";

export const metadata: Metadata = {
  alternates: { canonical: `${baseUrl}/blog` },
  title: "Blog | Elektrik Pano ve Kaynak Hizmetleri - Marmara Bölgesi",
  description:
    "İstanbul, Gebze ve Marmara Bölgesi'ndeki tüm il ve ilçeler için elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri hakkında güncel bilgiler ve SEO içerikleri.",
  keywords:
    "elektrik pano blog, kaynak hizmetleri blog, İstanbul elektrik pano, Gebze kaynak, Marmara bölgesi endüstriyel üretim, elektrik pano üretimi blog",
};

export default function BlogPage() {
  const categories = [
    {
      name: "İstanbul İlçeleri",
      slug: "istanbul",
      description: "İstanbul'un tüm ilçeleri için elektrik pano ve kaynak hizmetleri",
      count: 39,
      icon: "🏙️",
    },
    {
      name: "Gebze & Kocaeli",
      slug: "gebze-kocaeli",
      description: "Gebze ve Kocaeli bölgesi için endüstriyel üretim çözümleri",
      count: 12,
      icon: "🏭",
    },
    {
      name: "Bursa",
      slug: "bursa",
      description: "Bursa ve ilçeleri için elektrik pano üretimi",
      count: 17,
      icon: "🌳",
    },
    {
      name: "Balıkesir",
      slug: "balikesir",
      description: "Balıkesir ve ilçeleri için kaynak hizmetleri",
      count: 20,
      icon: "🌊",
    },
    {
      name: "Diğer Marmara İlleri",
      slug: "diger-marmara",
      description: "Sakarya, Tekirdağ, Yalova ve diğer Marmara illeri",
      count: 25,
      icon: "📍",
    },
  ];

  const recentPosts = [
    {
      title: "Tuzla'da Elektrik Pano Üretimi ve Montaj Hizmetleri",
      slug: "tuzla-elektrik-pano-uretime",
      category: "İstanbul",
      date: "2024-01-15",
      excerpt: "Tuzla bölgesinde elektrik pano üretimi, montaj ve bakım hizmetleri. Endüstriyel tesisler için güvenilir çözümler.",
    },
    {
      title: "Gebze'de Profesyonel Kaynak Hizmetleri",
      slug: "gebze-kaynak-hizmetleri",
      category: "Gebze & Kocaeli",
      date: "2024-01-10",
      excerpt: "Gebze bölgesinde metal kaynak, TIG kaynak ve endüstriyel imalat hizmetleri. Uzman ekibimizle profesyonel çözümler.",
    },
    {
      title: "Kadıköy'de Elektrik Pano Montajı ve Bakımı",
      slug: "kadikoy-elektrik-pano-montaj",
      category: "İstanbul",
      date: "2024-01-05",
      excerpt: "Kadıköy'de elektrik pano montajı, bakımı ve onarım hizmetleri. Ticari ve endüstriyel projeler için kaliteli çözümler.",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Elektrik Pano ve Kaynak Hizmetleri Blog
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Marmara Bölgesi&apos;ndeki tüm il ve ilçeler için elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri hakkında güncel bilgiler
              </p>
            </div>
          </div>
        </section>

        {/* Kategoriler */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">
              Bölge Kategorileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/${category.slug}`}
                  className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-600"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>{category.count} Makale</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Son Yazılar */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">
              Son Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{post.date}</span>
                    <span className="text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all flex items-center gap-1">
                      Devamını Oku
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Bölgeniz İçin Özel Teklif Alın
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Marmara Bölgesi&apos;ndeki tüm il ve ilçelerde elektrik pano ve kaynak hizmetleri için uzman ekibimizle iletişime geçin.
            </p>
            <a
              href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
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

