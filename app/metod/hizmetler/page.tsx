import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

export default async function AdminHizmetlerPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  const hizmetler = [
    {
      slug: "elektrik-pano-uretime",
      title: "Elektrik Pano Üretimi",
      description: "Ana hizmetimiz - Elektrik pano ve marin pano üretimi",
      icon: "⚡",
    },
    {
      slug: "cnc-lazer-kesim",
      title: "CNC Lazer Kesim",
      description: "Hassas lazer kesim hizmetleri",
      icon: "⚡",
    },
    {
      slug: "cnc-bukum",
      title: "CNC Büküm",
      description: "Profesyonel büküm hizmetleri",
      icon: "🔧",
    },
    {
      slug: "kaynak",
      title: "Kaynak & İmalat",
      description: "Metal kaynak ve imalat hizmetleri",
      icon: "🔥",
    },
    {
      slug: "elektrostatik-toz-boya",
      title: "Elektrostatik Toz Boya",
      description: "Yüzey işleme hizmetleri",
      icon: "🎨",
    },
    {
      slug: "magaza-raf-ve-urunleri",
      title: "Mağaza Raf Ve Ürünleri",
      description: "Mağaza içi raf sistemleri",
      icon: "📦",
    },
    {
      slug: "celik-konstruksiyon",
      title: "Çelik Konstrüksiyon",
      description: "Çelik yapı çözümleri",
      icon: "🏗️",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/metod" className="text-blue-600 hover:text-blue-700">
                ← Dashboard&apos;a Dön
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Hizmet Yönetimi</h1>
                <p className="text-sm text-slate-600">Hizmet sayfalarını yönetin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-slate-600">
            Hizmet sayfaları şu anda statik içerik olarak yönetiliyor. İçerikleri düzenlemek için
            <code className="bg-slate-100 px-2 py-1 rounded mx-1 text-sm">
              app/hizmetler/[slug]/page.tsx
            </code>
            dosyasını düzenleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hizmetler.map((hizmet) => (
            <div
              key={hizmet.slug}
              className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{hizmet.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{hizmet.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{hizmet.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/hizmetler/${hizmet.slug}`}
                    target="_blank"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all text-center"
                  >
                    Sayfayı Görüntüle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

