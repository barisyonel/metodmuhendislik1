"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client_name?: string;
}

interface ReferencesCarouselProps {
  projects: Project[];
}

export default function ReferencesCarousel({ projects }: ReferencesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || projects.length === 0) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Piksel başına kaydırma hızı
    let animationFrameId: number;

    const scroll = () => {
      if (isScrollingRef.current) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }
      
      const scrollWidth = container.scrollWidth;
      const singleSetWidth = scrollWidth / 3; // 3 kopya var

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [projects]);

  // Projeleri iki kez kopyalayarak sürekli döngü oluştur
  const duplicatedProjects = [...projects, ...projects, ...projects];

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        Referanslar yükleniyor...
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Gradient Overlays - Soldan ve sağdan */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projeler/${project.id}`}
            className="group flex-shrink-0 w-[300px] md:w-[400px] lg:w-[450px] relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            {/* Görsel Container */}
            <div className="relative w-full h-[250px] md:h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 450px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  ⚡
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              {project.category && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                  {project.category}
                </div>
              )}
            </div>

            {/* İçerik */}
            <div className="p-5 md:p-6 bg-white">
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}
              {project.client_name && (
                <p className="text-xs text-slate-500 font-medium">
                  {project.client_name}
                </p>
              )}
              
              {/* Arrow Indicator */}
              <div className="flex items-center text-blue-600 font-semibold text-sm mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <span>Detayları Gör</span>
                <svg
                  className="w-4 h-4 ml-2"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
