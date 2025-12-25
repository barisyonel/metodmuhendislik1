import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import {
  istanbulDistricts,
  istanbulDistrictNames,
  gebzeKocaeliDistricts,
  gebzeKocaeliDistrictNames,
  otherMarmaraCities,
  otherMarmaraCityNames,
  generateBlogContent,
} from "@/lib/blog-data";

export async function generateStaticParams() {
  // Blog sayfaları şimdilik devre dışı - build hatası nedeniyle
  // TODO: Blog sayfaları düzeltildikten sonra tekrar aktif edilecek
  return [];
  
  /* 
  const params: { slug: string }[] = [];

  // İstanbul ilçeleri
  istanbulDistricts.forEach((district) => {
    params.push({ slug: `${district}-elektrik-pano` });
    params.push({ slug: `${district}-kaynak` });
  });

  // Gebze ve Kocaeli ilçeleri
  gebzeKocaeliDistricts.forEach((district) => {
    params.push({ slug: `${district}-elektrik-pano` });
    params.push({ slug: `${district}-kaynak` });
  });

  // Diğer Marmara illeri
  otherMarmaraCities.forEach((city) => {
    params.push({ slug: `${city}-elektrik-pano` });
    params.push({ slug: `${city}-kaynak` });
  });

  return params;
  */
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { location, locationName, serviceType } = parseSlug(params.slug);
  const post = generateBlogContent(location, locationName, serviceType);

  return {
    title: `${post.title} | Metod Mühendislik`,
    description: post.description,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "tr_TR",
    },
  };
}

function parseSlug(slug: string): {
  location: string;
  locationName: string;
  serviceType: "elektrik-pano" | "kaynak" | "genel";
} {
  const parts = slug.split("-");
  const serviceType = parts[parts.length - 1] as "elektrik-pano" | "kaynak";
  const location = parts.slice(0, -1).join("-");

  let locationName = location; // Default olarak location'ı kullan

  // İstanbul ilçeleri kontrolü
  if (istanbulDistricts.includes(location)) {
    locationName = istanbulDistrictNames[location] || location;
  }
  // Gebze ve Kocaeli kontrolü
  else if (gebzeKocaeliDistricts.includes(location)) {
    locationName = gebzeKocaeliDistrictNames[location] || location;
  }
  // Diğer Marmara illeri kontrolü
  else if (otherMarmaraCities.includes(location)) {
    locationName = otherMarmaraCityNames[location] || location;
  }

  // Eğer locationName hala boşsa, location'ı kullan
  if (!locationName || locationName.trim() === "") {
    locationName = location;
  }

  return { location, locationName, serviceType };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { location, locationName, serviceType } = parseSlug(params.slug);
  const post = generateBlogContent(location, locationName, serviceType);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <nav className="text-sm text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">
                Ana Sayfa
              </Link>
              {" / "}
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              {" / "}
              <span className="text-white">{post.location}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {post.description}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <article
              className="prose prose-lg prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border-2 border-blue-200">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                {post.location}'de Hizmet Almak İster misiniz?
              </h3>
              <p className="text-slate-700 mb-6">
                {post.location} bölgesinde elektrik pano ve kaynak hizmetleri için uzman ekibimizle iletişime geçin. Ücretsiz keşif ve teklif hizmeti sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
                  className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                >
                  İletişime Geç
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

