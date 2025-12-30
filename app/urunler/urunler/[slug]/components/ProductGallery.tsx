"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Debug: Görselleri kontrol et
  console.log("🖼️ ProductGallery - Gelen görseller:", images, "Sayı:", images?.length);

  // Görselleri filtrele (boş veya geçersiz URL'leri kaldır)
  const validImages = images?.filter(img => img && typeof img === 'string' && img.trim() !== '') || [];

  // selectedImage'i validImages uzunluğuna göre sınırla
  const safeSelectedImage = validImages.length > 0 ? Math.min(selectedImage, validImages.length - 1) : 0;

  // Klavye ile navigasyon - useEffect hook'u conditional return'den önce olmalı
  useEffect(() => {
    if (validImages.length === 0) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && safeSelectedImage > 0) {
        setSelectedImage(safeSelectedImage - 1);
      } else if (e.key === 'ArrowRight' && safeSelectedImage < validImages.length - 1) {
        setSelectedImage(safeSelectedImage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [safeSelectedImage, validImages.length]);

  // Early return - hook'lardan sonra
  if (!images || images.length === 0) {
    console.warn("⚠️ ProductGallery - Görsel yok!");
    return null;
  }

  if (validImages.length === 0) {
    console.warn("⚠️ ProductGallery - Geçerli görsel yok!");
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Ana Görsel - Modern ve Büyük */}
      <div className="relative group">
          <div className="relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500">
          <div className="relative aspect-[16/10] w-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
                <div className="text-slate-400">
                  <svg className="w-16 h-16 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            )}
            <Image
              src={validImages[safeSelectedImage]}
              alt={`${productTitle} - Görsel ${safeSelectedImage + 1}`}
              fill
              className={`object-contain transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
              sizes="100vw"
              priority={safeSelectedImage === 0}
              unoptimized={validImages[safeSelectedImage]?.startsWith('http')}
              onLoad={() => setImageLoaded(true)}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            
            {/* Zoom İkonu */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>

            {/* Navigasyon Butonları */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(safeSelectedImage > 0 ? safeSelectedImage - 1 : validImages.length - 1);
                    setImageLoaded(false);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  aria-label="Önceki görsel"
                >
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(safeSelectedImage < validImages.length - 1 ? safeSelectedImage + 1 : 0);
                    setImageLoaded(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                  aria-label="Sonraki görsel"
                >
                  <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Görsel Sayacı - Modern Badge */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl z-10">
            <span className="flex items-center gap-2">
              <span className="text-blue-300">📸</span>
              <span>{safeSelectedImage + 1} / {validImages.length}</span>
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Galeri - Modern Grid */}
      {validImages.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Tüm Görseller</h3>
            <p className="text-sm text-slate-500">Klavye ile gezin: ← →</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {validImages.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setImageLoaded(false);
                }}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                  safeSelectedImage === index
                    ? "border-blue-600 ring-4 ring-blue-200 shadow-lg scale-105"
                    : "border-slate-200 hover:border-blue-400 hover:scale-105 shadow-md hover:shadow-lg"
                }`}
                aria-label={`Görsel ${index + 1}'i seç`}
              >
                <Image
                  src={img}
                  alt={`${productTitle} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                  unoptimized={img?.startsWith('http')}
                />
                {/* Aktif görsel overlay */}
                {safeSelectedImage === index && (
                  <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                    <div className="bg-blue-600 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
