"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: string | string[];
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order?: number;
  is_active?: boolean | number;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<import('swiper').Swiper | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const id = params.id;
        if (!id) {
          router.push("/projeler");
          return;
        }

        const response = await fetch(`/api/metod/projects/${id}?t=${Date.now()}`, {
          cache: 'no-store',
        });
        const data = await response.json();

        if (data.success && data.data) {
          const projectData = data.data as Project;
          setProject(projectData);

          // Görselleri parse et
          let parsedImages: string[] = [];
          if (projectData.images) {
            if (typeof projectData.images === 'string') {
              try {
                parsedImages = JSON.parse(projectData.images);
              } catch {
                parsedImages = [projectData.images];
              }
            } else if (Array.isArray(projectData.images)) {
              parsedImages = projectData.images;
            }
          }
          
          // Eğer images yoksa ama image_url varsa, onu ekle
          if (parsedImages.length === 0 && projectData.image_url) {
            parsedImages = [projectData.image_url];
          } else if (parsedImages.length > 0 && projectData.image_url && !parsedImages.includes(projectData.image_url)) {
            // Ana görseli başa ekle
            parsedImages = [projectData.image_url, ...parsedImages];
          }
          
          setImageList(parsedImages);
        } else {
          router.push("/projeler");
        }
      } catch (error) {
        console.error("Proje yükleme hatası:", error);
        router.push("/projeler");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600">Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <main className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 text-lg mb-4">Proje bulunamadı</p>
            <Link
              href="/projeler"
              className="text-blue-600 hover:text-blue-700 font-bold"
            >
              ← Projelere Dön
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
          <div className="absolute inset-0 z-0">
            {imageList.length > 0 && (
              <Image
                src={imageList[0]}
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
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
                  {imageList.length > 0 ? (
                    <div className="space-y-4">
                      {/* Ana Görsel Slider */}
                      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl">
                        <Swiper
                          modules={[Navigation, Pagination, Autoplay, EffectFade]}
                          effect="fade"
                          navigation={imageList.length > 1}
                          pagination={{
                            clickable: true,
                            dynamicBullets: true,
                          }}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                          }}
                          loop={imageList.length > 1}
                          className="w-full h-full"
                          onSwiper={setSwiperInstance}
                          onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
                        >
                          {imageList.map((img, index) => (
                            <SwiperSlide key={index}>
                              <div className="relative w-full h-full">
                                <Image
                                  src={img}
                                  alt={`${project.title} - Görsel ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  priority={index === 0}
                                  unoptimized={true}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        {imageList.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                            {currentImageIndex + 1} / {imageList.length}
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Grid (Eğer birden fazla görsel varsa) */}
                      {imageList.length > 1 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {imageList.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (swiperInstance) {
                                  if (imageList.length > 1) {
                                    swiperInstance.slideToLoop(index);
                                  } else {
                                    swiperInstance.slideTo(index);
                                  }
                                }
                                setCurrentImageIndex(index);
                              }}
                              className={`relative w-full h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                currentImageIndex === index
                                  ? "border-blue-600 shadow-lg scale-105"
                                  : "border-slate-200 hover:border-blue-400 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                unoptimized={true}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>Görsel bulunamadı</p>
                      </div>
                    </div>
                  )}
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
                          <p className="text-slate-600">{project.client_name}</p>
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
                            {new Date(project.project_date).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
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

