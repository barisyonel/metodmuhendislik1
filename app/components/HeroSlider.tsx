"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  link: string;
  color: string;
  is_active: boolean | number;
  sort_order: number;
}

// Swiper stilleri
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider({ initialSliders = [] }: { initialSliders?: Slider[] }) {
  // Server component'ten gelen verileri kullan, API route'a gerek yok!
  const [slides] = useState<Array<{
    id: number;
    img: string;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    link: string;
  }>>(() => {
    // İlk render'da server'dan gelen verileri kullan
    return initialSliders
      .filter((s) => s.is_active === true || s.is_active === 1)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((s) => ({
        id: s.id,
        img: s.image_url,
        title: s.title,
        subtitle: s.subtitle || "",
        description: s.description || "",
        color: s.color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        link: s.link || "#",
      }));
  });
  
  const [globalVideoUrl] = useState<string | null>(() => {
    // İlk aktif slider'dan video URL'ini al
    const activeSliderWithVideo = initialSliders.find(
      (s) => {
        const isActive = s.is_active === true || s.is_active === 1;
        const hasVideo = s.video_url && typeof s.video_url === 'string' && s.video_url.trim() !== '';
        return isActive && hasVideo;
      }
    );
    const videoUrl = activeSliderWithVideo?.video_url || null;
    
    // Debug için console.log (geliştirme ortamında)
    if (process.env.NODE_ENV === 'development') {
      console.log('🎥 Video URL kontrolü:', {
        totalSliders: initialSliders.length,
        activeSliders: initialSliders.filter(s => s.is_active === true || s.is_active === 1).length,
        foundVideoUrl: videoUrl,
        activeSliderWithVideo: activeSliderWithVideo ? {
          id: activeSliderWithVideo.id,
          video_url: activeSliderWithVideo.video_url
        } : null
      });
    }
    
    return videoUrl;
  });

  useEffect(() => {
    // Admin panelinden güncelleme event'ini dinle
    const handleSliderUpdate = () => {
      console.log("🔄 Slider güncelleme event'i alındı, sayfa yenileniyor...");
      // Sayfayı yenile (server component tekrar çalışacak)
      window.location.reload();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('slider-updated', handleSliderUpdate);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('slider-updated', handleSliderUpdate);
      }
    };
  }, []);

  if (slides.length === 0) {
    return (
      <div className="h-full w-full relative bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-xl font-bold mb-2">Slider bulunamadı</p>
          <p className="text-slate-400">Admin panelinden slider ekleyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative">
      {/* Video - Slider'ın sağ alt köşesinde sabit (absolute pozisyon) */}
      {globalVideoUrl && globalVideoUrl.trim() !== '' && (
        <div className="absolute bottom-6 right-6 z-[100] w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-black/20">
          <video
            src={globalVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-auto"
            onError={(e) => {
              console.error('❌ Video yükleme hatası:', globalVideoUrl, e);
            }}
            onLoadedData={() => {
              if (process.env.NODE_ENV === 'development') {
                console.log('✅ Video başarıyla yüklendi:', globalVideoUrl);
              }
            }}
          >
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      )}

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
        className="h-screen w-full"
        aria-label="Ana Slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900">
              {/* Görsel - Tam ekranı doldur, yanlarda boşluk kalmasın */}
              <Image
                src={slide.img}
                alt={`${slide.title} - ${slide.subtitle}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={95}
                unoptimized={slide.img.startsWith("http")}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />

              {/* Hafif Siyah Overlay - Görseli biraz koyulaştırmak için */}
              <div className="absolute inset-0 bg-black/30 z-10" />

              {/* Renkli Gradient Overlay - Daha hafif ve yumuşak */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color} z-10`}
              />


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
