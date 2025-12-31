"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string | string[] | null;
  category: string;
  link: string;
  is_active?: boolean | number;
  sort_order?: number;
}

// Double-encoded Türkçe karakterleri düzelt
function fixTurkishEncoding(text: string | null | undefined): string {
  if (!text) return "";
  
  try {
    // Eğer text zaten doğru encode edilmişse direkt döndür
    if (!text.includes('Ã') && !text.includes('Ä') && !text.includes('Å')) {
      return text;
    }
    
    // Double-encoded karakterleri düzelt
    // Latin1 olarak yorumlanmış UTF-8 karakterlerini düzelt
    return Buffer.from(text, 'latin1').toString('utf8');
  } catch (error) {
    // Hata durumunda orijinal text'i döndür
    console.warn("Encoding düzeltme hatası:", error);
    return text;
  }
}

// Ürün verilerini düzelt
function fixProductEncoding(product: Product): Product {
  return {
    ...product,
    title: fixTurkishEncoding(product.title),
    description: fixTurkishEncoding(product.description),
    category: fixTurkishEncoding(product.category),
  };
}

export default function ProductsList({ initialProducts = [] }: { initialProducts?: Product[] }) {
  // Server component'ten gelen verileri kullan, API route'a gerek yok!
  const [products] = useState<Product[]>(() => {
    // İlk render'da server'dan gelen verileri kullan
    return initialProducts.map(fixProductEncoding);
  });

  useEffect(() => {
    // Admin panelinden güncelleme event'ini dinle
    const handleProductUpdate = () => {
      console.log("🔄 Ürün güncelleme eventi alındı, sayfa yenileniyor...");
      // Sayfayı yenile (server component tekrar çalışacak)
      window.location.reload();
    };
    
    window.addEventListener('product-updated', handleProductUpdate);
    
    return () => {
      window.removeEventListener('product-updated', handleProductUpdate);
    };
  }, []);

  // Ürün görsellerini parse et
  function parseProductImages(product: Product): string[] {
    const images: string[] = [];
    
    // Önce images JSON kolonunu parse et
    if (product.images) {
      try {
        const parsed = typeof product.images === 'string' 
          ? JSON.parse(product.images) 
          : product.images;
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Geçerli görselleri filtrele
          const validImages = parsed.filter((img: string) => img && typeof img === 'string' && img.trim() !== '');
          images.push(...validImages);
        }
      } catch (e) {
        console.error("Images parse error:", e, "Raw images:", product.images);
      }
    }
    
    // Ana görseli ekle (eğer yoksa başa ekle, varsa başa taşı)
    if (product.image && product.image.trim() !== '') {
      if (!images.includes(product.image)) {
        images.unshift(product.image); // Başa ekle
      } else {
        // Ana görsel zaten varsa, başa taşı
        const filtered = images.filter(img => img !== product.image);
        images.length = 0;
        images.push(product.image, ...filtered);
      }
    }
    
    // Eğer hiç görsel yoksa ve sadece product.image varsa, onu kullan
    if (images.length === 0 && product.image && product.image.trim() !== '') {
      images.push(product.image);
    }
    
    return images;
  }

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-slate-600">Henüz ürün eklenmemiş.</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product: Product, index: number) => {
        // Link varsa onu kullan, yoksa ID ile oluştur
        const productUrl = product.link 
          ? (product.link.startsWith('/') ? product.link : `/${product.link}`)
          : `/urunler/urunler/${product.id}`;
        
        // Görselleri parse et
        const productImages = parseProductImages(product);
        const hasMultipleImages = productImages.length > 1;
        
        return (
        <Link
          href={productUrl}
          key={product.id}
          className="group relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
        >
          {/* Ürün Numarası Badge */}
          <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
            {String(index + 1).padStart(2, '0')}
          </div>
          {/* Ürün Görseli - Sabit Yükseklik */}
          <div className="relative w-full h-80 bg-gray-50 overflow-hidden flex items-center justify-center">
            {productImages.length > 0 ? (
              <>
                {/* Ana görsel */}
                <Image
                  src={productImages[0]}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover'da ikinci görsel (eğer varsa) */}
                {hasMultipleImages && productImages[1] && (
                  <Image
                    src={productImages[1]}
                    alt={`${product.title} - Görsel 2`}
                    width={600}
                    height={400}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {/* Görsel sayacı badge */}
                {hasMultipleImages && (
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold z-10 backdrop-blur-sm">
                    📸 {productImages.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Görsel yükleniyor...</span>
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Kategori Badge */}
            {product.category && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {product.category}
                </span>
              </div>
            )}
          </div>

          {/* İçerik - Sabit Yükseklik */}
          <div className="p-6 flex flex-col grow">
            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-14">
              {product.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 grow">
              {product.description}
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
              <span>Detayları İncele</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
        );
      })}
    </>
  );
}
