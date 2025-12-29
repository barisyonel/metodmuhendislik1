"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Swiper stilleri
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  link: string;
  color: string;
}

// Varsayılan slider'lar kaldırıldı - Admin panelinden eklenebilir
const defaultSlides: Array<{
  id: number;
  img: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  link: string;
}> = [];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Array<{
    id: number;
    img: string;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    link: string;
  }>>([]);
  const [globalVideoUrl, setGlobalVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Slider verilerini API'den yükle
    const loadSliders = async () => {
      try {
        setLoading(true);
        // Cache bypass için timestamp ekle ve no-cache header'ları ekle
        const response = await fetch(`/api/metod/sliders?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        const data = await response.json();
        console.log("🔍 API'den gelen slider verisi:", {
          success: data.success,
          count: Array.isArray(data.data) ? data.data.length : 0,
          allSliders: data.data,
        });
        
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Sadece aktif slider'ları al ve sıralama yap
          // MySQL'den gelen is_active değeri 0 veya 1 olabilir, boolean kontrolü yap
          const activeSliders = data.data
            .filter((s: SliderData & { is_active: boolean | number }) => {
              const isActive = s.is_active === true || s.is_active === 1;
              console.log(`  Slider ${s.id}: is_active=${s.is_active} (${typeof s.is_active}) -> ${isActive ? '✅ Aktif' : '❌ Pasif'}`);
              return isActive;
            })
            .sort(
              (a: SliderData & { sort_order: number }, b: SliderData & { sort_order: number }) =>
                (a.sort_order || 0) - (b.sort_order || 0)
            )
            .map((s: SliderData) => ({
              id: s.id,
              img: s.image_url,
              title: s.title,
              subtitle: s.subtitle || "",
              description: s.description || "",
              color: s.color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
              link: s.link || "#",
            }));

          console.log(`📊 Toplam ${data.data.length} slider'dan ${activeSliders.length} aktif slider bulundu`);
          
          if (activeSliders.length > 0) {
            console.log("✅ Aktif slider'lar yüklendi:", activeSliders.length);
            setSlides(activeSliders);
          } else {
            console.warn("⚠️ Aktif slider bulunamadı! Tüm slider'lar pasif olabilir.");
            setSlides([]);
          }

          // İlk aktif slider'dan video URL'ini al (global video)
          const activeSliderWithVideo = data.data.find(
            (s: SliderData & { is_active: boolean | number }) => 
              (s.is_active === true || s.is_active === 1) && s.video_url
          );
          if (activeSliderWithVideo) {
            setGlobalVideoUrl(activeSliderWithVideo.video_url);
          } else {
            setGlobalVideoUrl(null);
          }
        } else {
          // Slider yoksa boş array
          console.warn("⚠️ API'den slider verisi gelmedi veya boş");
          setSlides([]);
          setGlobalVideoUrl(null);
        }
      } catch (error) {
        console.error("Slider yükleme hatası:", error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    loadSliders();
    
    // Her 5 saniyede bir slider'ları yeniden yükle (güncellemeler için - daha hızlı senkronizasyon)
    const interval = setInterval(loadSliders, 5000);
    
    // Admin panelinden güncelleme event'ini dinle
    const handleSliderUpdate = () => {
      console.log("🔄 Slider güncelleme event'i alındı, slider'lar yeniden yükleniyor...");
      loadSliders();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('slider-updated', handleSliderUpdate);
    }
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('slider-updated', handleSliderUpdate);
      }
    };
  }, []);

  // Slider yoksa boş alan göster
  if (loading) {
    return (
      <div className="h-full w-full relative bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Slider yükleniyor...</p>
        </div>
      </div>
    );
  }

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
      {globalVideoUrl && (
        <div className="absolute bottom-6 right-6 z-50 w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm">
          <video
            src={globalVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
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
