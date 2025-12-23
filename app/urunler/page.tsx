import Link from "next/link";

// Örnek Veri (Normalde veritabanından gelir)
const products = [
  { id: 1, name: "Dikili Tip Panolar", slug: "dikili-tip-panolar", image: "/pano1.jpg" },
  { id: 2, name: "Duvar Tipi Panolar", slug: "duvar-tipi-panolar", image: "/pano2.jpg" },
  { id: 3, name: "Paslanmaz Panolar", slug: "paslanmaz-panolar", image: "/pano3.jpg" },
  { id: 4, name: "Kumanda Masaları", slug: "kumanda-masalari", image: "/pano4.jpg" },
];

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Üst Başlık Alanı */}
      <div className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ürün Katalogu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Metod Mühendislik kalitesiyle üretilen, endüstriyel standartlara tam uyumlu pano çözümlerimizi inceleyin.
          </p>
        </div>
      </div>

      {/* Ürün Grid Yapısı */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/urunler/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
                {/* Image bileşeni SEO ve Performans için kritiktir */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {/* Görseliniz varsa Image bileşenini aktif edin */}
                   <span className="text-xs italic">Ürün Görseli (Next/Image)</span>
                </div>
                
                {/* Hover Efekti */}
                <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <span className="text-sm text-blue-600 font-medium">Detayları İncele →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Metin Alanı (Katalog Altı 800-1200 Kelime) */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 prose prose-blue">
          <h2>Endüstriyel Pano Seçiminde Mühendislik Yaklaşımı</h2>
          <p>
            Mühendislik projelerinde doğru pano seçimi sadece bir muhafaza seçimi değildir; 
            sistemin ömrünü, güvenliğini ve bakım kolaylığını belirler... 
            (Buraya sektörle ilgili, anahtar kelime odaklı uzun makalenizi ekleyin).
          </p>
        </div>
      </section>
    </div>
  );
}