import Link from "next/link";
import Image from "next/image";
import { query } from "@/lib/db";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  is_active?: boolean;
  sort_order?: number;
}

async function getProducts(): Promise<Product[]> {
  try {
    // Önce basit sorgu dene (is_active olmadan)
    try {
      const products = await query<Product[]>(
        "SELECT * FROM products WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC LIMIT 6"
      );
      return Array.isArray(products) ? products : [];
    } catch (err: unknown) {
      // is_active kolonu yoksa basit sorgu dene
      const error = err as { code?: string; message?: string; sqlMessage?: string };
      if (error.code === 'ER_BAD_FIELD_ERROR' || error.message?.includes('is_active') || error.sqlMessage?.includes('is_active')) {
        const products = await query<Product[]>(
          "SELECT * FROM products ORDER BY created_at DESC LIMIT 6"
        );
        return Array.isArray(products) ? products : [];
      }
      throw err;
    }
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    // Veritabanı bağlantı hatası için özel mesaj
    if (err.code === 'ECONNREFUSED') {
      console.warn("Veritabanı bağlantısı reddedildi. Varsayılan ürünler gösteriliyor.");
    } else {
      console.error("Ürünler yüklenirken hata:", error);
    }
    // Hata durumunda varsayılan ürünler
    return [
      {
        id: 1,
        title: "Elektrik Pano Sistemleri",
        description:
          "Sıvaüstü, sıvaaltı ve dahili elektrik pano üretimi. Uluslararası standartlara uygun, güvenli ve verimli enerji dağıtım çözümleri.",
        image: "/elektrıkpano.png",
        link: "/urunler/urunler/elektrik-pano-sistemleri",
        category: "Elektrik Panoları",
      },
      {
        id: 2,
        title: "CNC Lazer Kesilmiş Parçalar",
        description:
          "Hassas CNC lazer kesim ile üretilmiş metal parçalar. ±0.05 mm hassasiyet ile endüstriyel standartlarda üretim.",
        image: "https://picsum.photos/seed/cnc1/600/400",
        link: "/urunler/urunler/cnc-lazer-kesilmis-parcalar",
        category: "CNC İmalat",
      },
      {
        id: 3,
        title: "Bükülmüş Metal Levhalar",
        description:
          "CNC büküm teknolojisi ile şekillendirilmiş metal levhalar. Kompleks geometrili parçalar için profesyonel çözümler.",
        image: "/cncbukum.png",
        link: "/urunler/urunler/bukulmus-metal-levhalar",
        category: "CNC Büküm",
      },
    ];
  }
}

export default async function ProductsList() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-slate-600">Henüz ürün eklenmemiş.</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product: Product) => (
        <Link
          href={`/urunler/urunler/${product.id}`}
          key={product.id}
          className="group relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
        >
          {/* Ürün Görseli - Sabit Yükseklik */}
          <div className="relative w-full h-64 bg-gray-50 overflow-hidden flex items-center justify-center">
            <Image
              src={product.image || "https://picsum.photos/600/400"}
              alt={product.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
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
      ))}
    </>
  );
}
