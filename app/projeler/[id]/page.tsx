import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getProjectById } from "@/app/lib/project-data";
import ProjectGallery from "./components/ProjectGallery";
import {
  generateSEODescription,
  generateSEOKeywords,
  generateOGImage,
  generateCanonicalURL,
} from "@/lib/seo-utils";
import { query } from "@/lib/db";

export async function generateStaticParams() {
  try {
    const projects = await query<Array<{ id: number }>>(
      "SELECT id FROM projects WHERE (is_active = TRUE OR is_active = 1) ORDER BY id DESC LIMIT 100"
    );

    if (Array.isArray(projects) && projects.length > 0) {
      return projects.map((project) => ({ id: String(project.id) }));
    }
  } catch (error) {
    // Build sırasında veritabanı bağlantısı yoksa boş array döndür
    console.warn("Static params oluşturulurken veritabanı hatası (normal olabilir):", error);
  }

  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return {
      title: "Proje Bulunamadı | Metod Mühendislik",
      description: "Aradığınız proje bulunamadı.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.metodmuhendislik.com";
  const metaDescription = generateSEODescription(project.description, 160);
  const keywords = generateSEOKeywords(
    project.title,
    project.category,
    project.description,
  );

  // Görselleri parse et
  let projectImages: string[] = [];
  if (project.images) {
    if (typeof project.images === "string") {
      try {
        projectImages = JSON.parse(project.images);
      } catch {
        projectImages = [project.images];
      }
    } else if (Array.isArray(project.images)) {
      projectImages = project.images;
    }
  }
  if (projectImages.length === 0 && project.image_url) {
    projectImages = [project.image_url];
  } else if (
    projectImages.length > 0 &&
    project.image_url &&
    !projectImages.includes(project.image_url)
  ) {
    projectImages = [project.image_url, ...projectImages];
  }

  const ogImage = generateOGImage(projectImages[0] || project.image_url);
  const canonicalUrl = generateCanonicalURL(`/projeler/${project.id}`, baseUrl);

  return {
    title: `${project.title} | Metod Mühendislik`,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: "Metod Mühendislik" }],
    creator: "Metod Mühendislik",
    publisher: "Metod Mühendislik",
    openGraph: {
      title: `${project.title} | Metod Mühendislik`,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Metod Mühendislik",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Metod Mühendislik`,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  // Görselleri parse et
  let projectImages: string[] = [];
  if (project.images) {
    if (typeof project.images === "string") {
      try {
        projectImages = JSON.parse(project.images);
      } catch {
        projectImages = [project.images];
      }
    } else if (Array.isArray(project.images)) {
      projectImages = project.images;
    }
  }

  // Eğer images yoksa ama image_url varsa, onu ekle
  if (projectImages.length === 0 && project.image_url) {
    projectImages = [project.image_url];
  } else if (
    projectImages.length > 0 &&
    project.image_url &&
    !projectImages.includes(project.image_url)
  ) {
    // Ana görseli başa ekle
    projectImages = [project.image_url, ...projectImages];
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
          <div className="absolute inset-0 z-0">
            {projectImages.length > 0 && (
              <Image
                src={projectImages[0]}
                alt={project.title}
                fill
                className="object-cover opacity-30"
                priority
                unoptimized={true}
              />
            )}
          </div>
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-4xl">
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
                Projelere Dön
              </Link>
              <span className="inline-block text-blue-300 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                {project.category || "Proje"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Proje Detay İçeriği */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Sol Taraf - Görsel Galeri */}
                <div className="lg:col-span-2">
                  <ProjectGallery
                    images={projectImages}
                    projectTitle={project.title}
                  />
                </div>

                {/* Sağ Taraf - Proje Bilgileri */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-slate-200 sticky top-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">
                      Proje Detayları
                    </h2>

                    <div className="space-y-4">
                      {project.description && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Açıklama
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      )}

                      {project.client_name && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Müşteri
                          </h3>
                          <p className="text-slate-600">
                            {project.client_name}
                          </p>
                        </div>
                      )}

                      {project.location && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Lokasyon
                          </h3>
                          <p className="text-slate-600">{project.location}</p>
                        </div>
                      )}

                      {project.project_date && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Tarih
                          </h3>
                          <p className="text-slate-600">
                            {new Date(project.project_date).toLocaleDateString(
                              "tr-TR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      )}

                      {project.category && (
                        <div>
                          <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            Kategori
                          </h3>
                          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                            {project.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA Butonları */}
                    <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                      <a
                        href="https://wa.me/905425786060?text=Merhaba,%20proje%20hakkında%20bilgi%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30"
                      >
                        WhatsApp ile İletişime Geç
                      </a>
                      <a
                        href="/iletisim"
                        className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
                      >
                        İletişime Geç
                      </a>
                    </div>
                  </div>
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
