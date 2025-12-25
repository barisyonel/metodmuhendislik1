"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Swiper stilleri
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      img: "/elektrıkpano.png",
      title: "Elektrik Pano & Marin Pano Üretimi",
      subtitle: "Güvenli Enerji Dağıtım Çözümleri",
      description:
        "20+ yıllık deneyimimizle elektrik pano ve marin pano üretiminde sektörün öncü firması. Sıvaüstü, sıvaaltı, dahili ve marin pano üretimi ile güvenilir enerji dağıtım çözümleri sunuyoruz.",
      color: "from-blue-600/50 via-blue-700/50 to-slate-900/60",
      link: "/hizmetler/elektrik-pano-uretime",
    },
    {
      id: 2,
      img: "https://picsum.photos/seed/industrial1/2000/1200",
      title: "CNC Lazer Kesim",
      subtitle: "Hassas ve Hızlı Üretim",
      description:
        "Yüksek teknoloji lazer kesim makinelerimiz ile hassas ve hızlı üretim çözümleri",
      color: "from-blue-500/40 via-blue-700/50 to-slate-900/60",
      link: "/hizmetler/cnc-lazer-kesim",
    },
    {
      id: 3,
      img: "/cncbukum.png",
      title: "CNC Büküm",
      subtitle: "Profesyonel İmalat Çözümleri",
      description:
        "CNC büküm teknolojimiz ile şekillendirme işlemlerinde mükemmellik",
      color: "from-slate-600/40 via-slate-700/50 to-blue-800/60",
      link: "/hizmetler/cnc-bukum",
    },
    {
      id: 4,
      img: "https://picsum.photos/seed/industrial4/2000/1200",
      title: "Metal Kaynak & İmalat",
      subtitle: "Profesyonel Kaynak Hizmetleri",
      description:
        "Metal kaynak ve imalat hizmetlerimizle endüstriyel üretimde güvenilir çözümler",
      color: "from-orange-500/40 via-orange-600/50 to-slate-900/60",
      link: "/hizmetler/kaynak",
    },
  ];

  return (
    <div className="h-full w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
        className="h-full w-full"
        aria-label="Ana Slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Görsel */}
              <Image
                src={slide.img}
                alt={`${slide.title} - ${slide.subtitle}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={90}
              />

              {/* Hafif Siyah Overlay - Görseli biraz koyulaştırmak için */}
              <div className="absolute inset-0 bg-black/30 z-10" />

              {/* Renkli Gradient Overlay - Daha hafif ve yumuşak */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}
              />

              {/* İçerik - 3 Soruya Cevap */}
              <div className="relative z-20 text-white px-6 md:px-16 lg:px-24 max-w-6xl mx-auto text-center">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4">
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Endüstriyel Üretim Çözümleri
                    </span>
                  </div>
                  
                  {/* Ne Sunuyorsunuz? */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                    {slide.title}
                  </h1>
                  
                  {/* Kullanıcıya Ne Fayda Sağlıyorsunuz? */}
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-300 mb-3">
                    {slide.subtitle}
                  </p>
                  <p className="text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  {/* Kullanıcı Ne Yapmalı? - CTA Butonları */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-xl shadow-green-600/30 hover:bg-green-700 hover:scale-105 transition-all min-w-[200px]"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Teklif Al
                    </a>
                    <Link
                      href={slide.link}
                      className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white/20 transition-all min-w-[200px]"
                    >
                      Hizmetleri İncele
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
                    </Link>
                  </div>
                  
                  {/* Hızlı İletişim */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                    <a
                      href="tel:+902167595675"
                      className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    >
                      <span>📞</span>
                      <span>0 216 759 56 75</span>
                    </a>
                    <span className="text-white/30">|</span>
                    <a
                      href="mailto:info@metodmuhendislik.com"
                      className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    >
                      <span>✉️</span>
                      <span>info@metodmuhendislik.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <svg
                  className="w-6 h-6 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
