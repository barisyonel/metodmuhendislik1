import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import AdminLayout from "./components/AdminLayout";
import {
  getAllProducts,
  getAllSliders,
  getAllServices,
  getAllProjects,
} from "@/app/lib/data";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  // İstatistikler için verileri çek
  const [products, sliders, services, projects] = await Promise.all([
    getAllProducts(),
    getAllSliders(),
    getAllServices(),
    getAllProjects(),
  ]);

  const stats = [
    {
      title: "Toplam Ürün",
      value: products.length,
      active: products.filter((p) => p.is_active === true || p.is_active === 1)
        .length,
      icon: "📦",
      color: "from-green-500 to-green-600",
      link: "/metod/products",
    },
    {
      title: "Toplam Slider",
      value: sliders.length,
      active: sliders.filter((s) => s.is_active === true || s.is_active === 1)
        .length,
      icon: "🖼️",
      color: "from-indigo-500 to-indigo-600",
      link: "/metod/slider",
    },
    {
      title: "Toplam Proje",
      value: projects.length,
      active: projects.filter((p) => p.is_active === true || p.is_active === 1)
        .length,
      icon: "🏗️",
      color: "from-orange-500 to-orange-600",
      link: "/metod/projects",
    },
    {
      title: "Toplam Hizmet",
      value: services.length,
      active: services.filter((s) => s.is_active === true || s.is_active === 1)
        .length,
      icon: "🔧",
      color: "from-purple-500 to-purple-600",
      link: "/metod/services",
    },
  ];

  const quickLinks = [
    {
      title: "Slider Yönetimi",
      description: "Anasayfa slider'larını yönet",
      icon: "🖼️",
      link: "/metod/slider",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Ürün Yönetimi",
      description: "Ürünleri ekle, düzenle, sil",
      icon: "📦",
      link: "/metod/products",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Proje Yönetimi",
      description: "Projeleri ve galerileri yönet",
      icon: "🏗️",
      link: "/metod/projects",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Hizmet Yönetimi",
      description: "Navbar hizmetler menüsünü yönet",
      icon: "🔧",
      link: "/metod/services",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Türkçe Karakter Düzeltme",
      description: "Bozuk Türkçe karakterleri düzelt",
      icon: "🔤",
      link: "/metod/fix-encoding",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <AdminLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Hoş Geldiniz! 👋
        </h1>
        <p className="text-slate-600">
          Metod Mühendislik yönetim paneline hoş geldiniz. İşlemlerinizi buradan
          yönetebilirsiniz.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.link}
            className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl text-white text-2xl`}
              >
                {stat.icon}
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
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {stat.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {stat.value}
              </span>
              <span className="text-sm text-slate-500">
                ({stat.active} aktif)
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item, i) => (
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
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity / Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Info */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>ℹ️</span>
            Sistem Bilgileri
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Toplam İçerik</span>
              <span className="font-bold text-slate-900">
                {products.length +
                  sliders.length +
                  projects.length +
                  services.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Aktif İçerik</span>
              <span className="font-bold text-green-600">
                {stats.reduce((sum, stat) => sum + stat.active, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>⚡</span>
            Hızlı İşlemler
          </h3>
          <div className="space-y-2">
            <Link
              href="/metod/products"
              className="block px-4 py-2 bg-white rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium text-slate-700"
            >
              + Yeni Ürün Ekle
            </Link>
            <Link
              href="/metod/projects"
              className="block px-4 py-2 bg-white rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium text-slate-700"
            >
              + Yeni Proje Ekle
            </Link>
            <Link
              href="/metod/slider"
              className="block px-4 py-2 bg-white rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium text-slate-700"
            >
              + Yeni Slider Ekle
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
