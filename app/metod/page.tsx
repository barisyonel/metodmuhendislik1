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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Dashboard
        </h1>
        <p className="text-slate-600 text-sm">
          İçeriklerinizi buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.link}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-xs text-slate-500 mb-1">{stat.title}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500">
                ({stat.active} aktif)
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
