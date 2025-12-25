"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Ana Görsel */}
      <div className="relative w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
        <div className="relative aspect-video w-full">
          <Image
            src={images[selectedImage]}
            alt={`${productTitle} - Görsel ${selectedImage + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority={selectedImage === 0}
          />
        </div>
      </div>

      {/* Thumbnail Galeri */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-blue-600 ring-2 ring-blue-300"
                  : "border-gray-200 hover:border-blue-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productTitle} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 16vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Görsel Sayacı */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          Görsel {selectedImage + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

