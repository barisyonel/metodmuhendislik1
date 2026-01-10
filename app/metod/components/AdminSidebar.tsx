"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  title: string;
  icon: string;
  href: string;
  color: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: "📊",
    href: "/metod",
    color: "from-blue-500 to-blue-600",
    description: "Ana kontrol paneli",
  },
  {
    title: "Slider Yönetimi",
    icon: "🖼️",
    href: "/metod/slider",
    color: "from-indigo-500 to-indigo-600",
    description: "Anasayfa slider'ları",
  },
  {
    title: "Ürün Yönetimi",
    icon: "📦",
    href: "/metod/products",
    color: "from-green-500 to-green-600",
    description: "Ürünleri yönet",
  },
  {
    title: "Proje Yönetimi",
    icon: "🏗️",
    href: "/metod/projects",
    color: "from-orange-500 to-orange-600",
    description: "Projeleri yönet",
  },
  {
    title: "Hizmet Yönetimi",
    icon: "🔧",
    href: "/metod/services",
    color: "from-purple-500 to-purple-600",
    description: "Hizmetleri yönet",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/metod") {
      return pathname === "/metod";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-slate-200"
        aria-label="Menüyü aç/kapat"
      >
        <svg
          className="w-6 h-6 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
          <Link
            href="/metod"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <span className="text-white text-lg font-bold">M</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Admin Panel</h2>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
            aria-label="Menüyü kapat"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                  ${
                    active
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Siteyi Görüntüle
          </Link>
        </div>
      </aside>
    </>
  );
}
