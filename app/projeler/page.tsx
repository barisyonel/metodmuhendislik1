import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projelerimiz | Gemiler için Elektrik Panoları ve Endüstriyel Çözümler",
  description:
    "Metod Mühendislik'in tamamladığı projeler: Marin pano (gemi elektrik panoları), sıvaüstü panolar, sıvaaltı panolar, endüstriyel elektrik panoları. 20+ yıllık deneyimle gerçekleştirdiğimiz başarılı projeler.",
  keywords:
    "gemi elektrik panoları, marin pano, denizcilik elektrik panoları, gemi pano üretimi, endüstriyel projeler, elektrik pano projeleri, tamamlanan projeler, Metod Mühendislik projeleri",
};

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order: number;
  is_active: boolean;
}

export default async function ProjelerPage() {
  let projects: Project[] = [];

  try {
    const result = await query<Project[]>(
      "SELECT * FROM projects WHERE is_active = TRUE ORDER BY sort_order ASC, id DESC"
    );
    projects = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Projeler yüklenirken hata:", error);
    // Hata durumunda boş array kullan
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
          <div className="absolute inset-0 z-0">
            <Image
              src="/metod.png"
              alt="Projelerimiz"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-blue-300 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Başarı Hikayelerimiz
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                Projelerimiz
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
                20+ yıllık deneyimimizle gerçekleştirdiğimiz elektrik pano ve endüstriyel üretim projeleri.
              </p>
            </div>
          </div>
        </section>

        {/* Projeler Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-600 text-lg mb-4">
                    Henüz proje eklenmemiş.
                  </p>
                  <p className="text-slate-500">
                    Projeler yakında burada görüntülenecektir.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.map((project) => (
                      <a
                        key={project.id}
                        href={`/projeler/${project.id}`}
                        className="group relative bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-modern hover:shadow-modern-lg transition-all duration-500 hover:-translate-y-2 block"
                      >
                        {/* Görsel */}
                        <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                          {project.image_url ? (
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              unoptimized={project.image_url.startsWith("http")}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <svg
                                className="w-16 h-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                              {project.category || "Proje"}
                            </span>
                          </div>
                        </div>

                        {/* İçerik */}
                        <div className="p-6">
                          <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          {/* Proje Detayları */}
                          <div className="space-y-2 mb-4">
                            {project.client_name && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
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
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
                                <span>{project.client_name}</span>
                              </div>
                            )}
                            {project.location && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
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
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span>{project.location}</span>
                              </div>
                            )}
                            {project.project_date && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>{new Date(project.project_date).getFullYear()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {/* CTA Section */}
              <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-12 border-2 border-blue-100">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Projeniz İçin Teklif Alın
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Projeleriniz için detaylı teklif almak ve uzman ekibimizle görüşmek için bizimle iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20proje%20teklifi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp ile Teklif Al
                  </a>
                  <a
                    href="/iletisim"
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:scale-105"
                  >
                    İletişime Geç
                    <svg
                      className="w-5 h-5"
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
                  </a>
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


