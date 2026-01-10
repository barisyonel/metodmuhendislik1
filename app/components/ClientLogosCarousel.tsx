"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Logo {
  name: string;
  image: string;
}

interface ClientLogosCarouselProps {
  logos: Logo[];
}

export default function ClientLogosCarousel({ logos }: ClientLogosCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || logos.length === 0) return;

    let animationFrameId: number | null = null;
    let cleanupFn: (() => void) | null = null;

    // İlk render'dan sonra bir miktar bekle (DOM'un hazır olması için)
    const initTimeout = setTimeout(() => {
      let scrollPosition = 0;
      const scrollSpeed = 0.5; // Piksel başına kaydırma hızı

      const scroll = () => {
        if (isScrollingRef.current) {
          animationFrameId = requestAnimationFrame(scroll);
          return;
        }

        const scrollWidth = container.scrollWidth;
        const singleSetWidth = scrollWidth / 3; // 3 kopya var

        // scrollWidth geçerli değilse bekle
        if (scrollWidth === 0 || isNaN(singleSetWidth)) {
          animationFrameId = requestAnimationFrame(scroll);
          return;
        }

        scrollPosition += scrollSpeed;

        // Eğer bir set tamamen kaydırıldıysa, başa dön
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = scrollPosition - singleSetWidth;
        }

        container.scrollLeft = scrollPosition;
        animationFrameId = requestAnimationFrame(scroll);
      };

      // Otomatik kaydırma başlat
      animationFrameId = requestAnimationFrame(scroll);

      // Mouse hover'da durdur
      const handleMouseEnter = () => {
        isScrollingRef.current = true;
      };
      const handleMouseLeave = () => {
        isScrollingRef.current = false;
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup fonksiyonunu sakla
      cleanupFn = () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 100); // 100ms bekle - DOM'un hazır olması için

    // useEffect cleanup - setTimeout ve animasyonu temizle
    return () => {
      clearTimeout(initTimeout);
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [logos]);

  // Logoları 3 kez kopyalayarak sürekli döngü oluştur
  const duplicatedLogos = [...logos, ...logos, ...logos];

  if (logos.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Gradient Overlays - Soldan ve sağdan */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-8 md:gap-12 items-center overflow-x-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {duplicatedLogos.map((logo, index) => {
          // Sadece ilk setteki ilk 3 görsel için priority
          const isFirstSet = index < logos.length;
          const isPriority = isFirstSet && index < 3;

          // Path'teki boşlukları encode et - URL encoding kullan
          const imageSrc = logo.image.replace(/ /g, '%20');

          return (
            <div
              key={`${logo.name}-${index}`}
              className="group flex-shrink-0 flex items-center justify-center h-28 md:h-32 lg:h-36 min-w-[180px] md:min-w-[240px] lg:min-w-[280px] px-8 md:px-10 lg:px-12 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <div className="relative w-full h-full max-w-[180px] md:max-w-[240px] lg:max-w-[280px]">
                <Image
                  src={imageSrc}
                  alt={logo.name}
                  fill
                  className="object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 180px, (max-width: 1024px) 240px, 280px"
                  unoptimized
                  priority={isPriority}
                  onError={(e) => {
                    // Fallback için placeholder göster
                    const target = e.target as HTMLImageElement;
                    if (target && target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium text-center px-2">
                          ${logo.name}
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

