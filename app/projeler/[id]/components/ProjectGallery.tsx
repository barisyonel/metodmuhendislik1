"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<
    import("swiper").Swiper | null
  >(null);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <svg
            className="w-16 h-16 mx-auto mb-4"
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
          <p>Görsel bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Ana Görsel Slider */}
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={images.length > 1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={images.length > 1}
          className="w-full h-full"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${projectTitle} - Görsel ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid (Eğer birden fazla görsel varsa) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                if (swiperInstance) {
                  if (images.length > 1) {
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
  );
}
