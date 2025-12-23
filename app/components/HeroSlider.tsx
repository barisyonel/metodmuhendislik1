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
      img: "https://picsum.photos/seed/industrial1/2000/1200",
      title: "CNC Lazer Kesim",
      subtitle: "Hassas ve Hızlı Üretim",
      description:
        "Yüksek teknoloji lazer kesim makinelerimiz ile hassas ve hızlı üretim çözümleri",
      color: "from-blue-600/90 to-slate-900/90",
      link: "/hizmetler/cnc-lazer-kesim",
    },
    {
      id: 2,
      img: "https://picsum.photos/seed/industrial2/2000/1200",
      title: "CNC Büküm",
      subtitle: "Profesyonel İmalat Çözümleri",
      description:
        "CNC büküm teknolojimiz ile şekillendirme işlemlerinde mükemmellik",
      color: "from-slate-700/90 to-blue-800/90",
      link: "/hizmetler/cnc-bukum",
    },
    {
      id: 3,
      img: "https://picsum.photos/seed/industrial3/2000/1200",
      title: "Mühendislik Çözümleri",
      subtitle: "Endüstriyel Üretimde Güven",
      description:
        "Uzman ekibimizle endüstriyel üretimde güvenilir çözüm ortağınızız",
      color: "from-slate-900/90 to-blue-900/90",
      link: "/hizmetler",
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

              {/* Gradient Overlay */}
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
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 transition-all min-w-[200px]"
                    >
                      <span className="text-xl">📞</span>
                      Teklif Al
                    </Link>
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
