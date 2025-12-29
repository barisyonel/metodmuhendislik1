import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";

export default async function AdminDashboardPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <span className="text-white text-xl font-black">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  Yönetici Paneli
                </h1>
                <p className="text-sm text-slate-600">
                  Metod Mühendislik Admin Dashboard
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hızlı Erişim */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Ürün Yönetimi",
              description: "Anasayfadaki örnek ürünleri yönet",
              icon: "📦",
              link: "/metod/urunler",
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Hizmet Yönetimi",
              description: "Hizmetleri yönet ve güncelle",
              icon: "⚙️",
              link: "/metod/hizmetler",
              color: "from-green-500 to-green-600",
            },
            {
              title: "Ayarlar",
              description: "Site ayarlarını yönet",
              icon: "⚙️",
              link: "/metod/ayarlar",
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "SEO Yönetimi",
              description: "SEO ayarlarını düzenle",
              icon: "🔍",
              link: "/metod/seo",
              color: "from-orange-500 to-orange-600",
            },
            {
              title: "Slider Yönetimi",
              description: "Anasayfa slider'ını yönet",
              icon: "🖼️",
              link: "/metod/slider",
              color: "from-indigo-500 to-indigo-600",
            },
            {
              title: "Slider Video Yönetimi",
              description: "Slider'lara video ekle veya çıkar",
              icon: "🎥",
              link: "/metod/slider-video",
              color: "from-pink-500 to-pink-600",
            },
            {
              title: "Proje Yönetimi",
              description: "Projeler sayfasını yönet",
              icon: "🏗️",
              link: "/metod/projeler",
              color: "from-teal-500 to-teal-600",
            },
            {
              title: "Yedekleme",
              description: "Veritabanı yedekleme",
              icon: "💾",
              link: "/metod/backup",
              color: "from-red-500 to-red-600",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`bg-gradient-to-br ${item.color} p-4 rounded-xl text-white text-2xl`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

