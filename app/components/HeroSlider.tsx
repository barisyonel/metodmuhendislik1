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
    // Debug: Slider verilerini kontrol et
    console.log('🎬 HeroSlider - initialSliders:', {
      count: initialSliders.length,
      sliders: initialSliders.map(s => ({
        id: s.id,
        title: s.title,
        is_active: s.is_active,
        image_url: s.image_url,
        hasImage: !!s.image_url && s.image_url.trim() !== ''
      }))
    });

    // İlk render'da server'dan gelen verileri kullan
    const filtered = initialSliders
      .filter((s) => s.is_active === true || s.is_active === 1)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((s) => ({
        id: s.id,
        img: s.image_url && s.image_url.trim() !== '' ? s.image_url : '/metod.png', // Fallback görsel
        title: s.title,
        subtitle: s.subtitle || "",
        description: s.description || "",
        color: s.color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        link: s.link || "#",
      }));

    console.log('🎬 HeroSlider - filtered slides:', {
      count: filtered.length,
      slides: filtered.map(s => ({ id: s.id, title: s.title, img: s.img }))
    });

    return filtered;
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

    // Debug: Development'ta video URL'ini logla
    if (process.env.NODE_ENV === 'development') {
      console.log('🎥 Video URL kontrolü:', {
        activeSliders: initialSliders.filter(s => s.is_active === true || s.is_active === 1).length,
        foundSlider: activeSliderWithVideo ? {
          id: activeSliderWithVideo.id,
          title: activeSliderWithVideo.title,
          video_url: activeSliderWithVideo.video_url
        } : null,
        videoUrl: videoUrl
      });
    }

    return videoUrl;
  });

  // Client-side hydration kontrolü - useEffect ile mount kontrolü
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Component mount olduktan sonra video'yu göster (hydration mismatch'i önlemek için)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);

    // Debug: Video durumunu kontrol et
    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 HeroSlider mount edildi:', {
        isMounted: true,
        globalVideoUrl: globalVideoUrl,
        hasVideo: globalVideoUrl && globalVideoUrl.trim() !== ''
      });
    }

    // Admin panelinden güncelleme event'ini dinle
    const handleSliderUpdate = () => {
      // Sayfayı yenile (server component tekrar çalışacak)
      window.location.reload();
    };

    window.addEventListener('slider-updated', handleSliderUpdate);

    return () => {
      window.removeEventListener('slider-updated', handleSliderUpdate);
    };
  }, [globalVideoUrl]);

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
      {/* Sadece client-side'da render et (hydration hatasını önlemek için) */}
      {isMounted && globalVideoUrl && globalVideoUrl.trim() !== '' ? (
        <div className="absolute bottom-6 right-6 z-[100] w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-black/20">
          <video
            src={globalVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-auto"
            suppressHydrationWarning
            onError={(e) => {
              // Video yükleme hatası - console'da göster
              const target = e.target as HTMLVideoElement;
              console.error('❌ Video yükleme hatası:', {
                videoUrl: globalVideoUrl,
                error: target.error,
                networkState: target.networkState,
                readyState: target.readyState
              });
            }}
            onLoadedData={() => {
              // Video başarıyla yüklendi
              if (process.env.NODE_ENV === 'development') {
                console.log('✅ Video başarıyla yüklendi:', globalVideoUrl);
              }
            }}
          >
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      ) : process.env.NODE_ENV === 'development' && (
        // Development'ta video yoksa debug bilgisi göster
        <div className="absolute bottom-6 right-6 z-[100] bg-yellow-500/80 text-black text-xs p-2 rounded">
          Video yok: isMounted={String(isMounted)}, videoUrl={globalVideoUrl || 'null'}
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
