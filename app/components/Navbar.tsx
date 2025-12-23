"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHizmetlerOpen, setIsHizmetlerOpen] = useState(false);
  const [isKurumsalOpen, setIsKurumsalOpen] = useState(false);

  // Sayfa kaydırma takibi
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hizmetItems = [
    { name: "CNC Lazer Kesim", href: "/hizmetler/cnc-lazer-kesim" },
    { name: "CNC Büküm", href: "/hizmetler/cnc-bukum" },
    { name: "Kaynak", href: "/hizmetler/kaynak" },
    { name: "Elektrostatik Toz Boya", href: "/hizmetler/elektrostatik-toz-boya" },
    { name: "Mağaza Raf Ve Ürünleri", href: "/hizmetler/magaza-raf-ve-urunleri" },
    { name: "Çelik Konstrüksiyon", href: "/hizmetler/celik-konstruksiyon" },
    { name: "Elektrik Pano Üretimi", href: "/hizmetler/elektrik-pano-uretime" },
  ];

  const kurumsalItems = [
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Kalite Politikamız", href: "/kurumsal/kalite-politikamiz" },
    { name: "Kalite Belgelerimiz", href: "/kurumsal/kalite-belgelerimiz" },
    { name: "KVKK", href: "/kurumsal/kvkk" },
  ];

  return (
    <header
      className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl py-3 shadow-2xl shadow-slate-900/5 border-b border-white/20"
          : "bg-white py-5 shadow-none border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between">

        {/* LOGO ALANI */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
             <span className="text-white font-black text-xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              METOD
            </span>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
              Mühendislik
            </span>
          </div>
        </Link>

        {/* MASAÜSTÜ NAVİGASYON */}
        <nav className="hidden lg:flex items-center space-x-1">
          
          <Link href="/" className="px-4 py-2 rounded-full text-[13px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-wider">
            Ana Sayfa
          </Link>

          {/* HİZMETLERİMİZ DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHizmetlerOpen(true)}
            onMouseLeave={() => setIsHizmetlerOpen(false)}
          >
            <button className={`px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-1 transition-all uppercase tracking-wider cursor-pointer ${isHizmetlerOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}>
              Hizmetlerimiz
              <svg className={`w-3 h-3 transition-transform duration-300 ${isHizmetlerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isHizmetlerOpen && (
              <div className="absolute left-0 mt-0 w-80 pt-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                  {hizmetItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="group flex items-center justify-between px-5 py-4 rounded-xl hover:bg-blue-600 transition-all"
                    >
                      <span className="text-slate-600 group-hover:text-white font-semibold text-sm transition-colors">{item.name}</span>
                      <span className="text-blue-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/urunler" className="px-4 py-2 rounded-full text-[13px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-wider">
            Ürünler
          </Link>

          {/* KURUMSAL DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsKurumsalOpen(true)}
            onMouseLeave={() => setIsKurumsalOpen(false)}
          >
            <button className={`px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-1 transition-all uppercase tracking-wider cursor-pointer ${isKurumsalOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}>
              Kurumsal
              <svg className={`w-3 h-3 transition-transform duration-300 ${isKurumsalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isKurumsalOpen && (
              <div className="absolute left-0 mt-0 w-64 pt-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                  {kurumsalItems.map((sub) => (
                    <Link 
                      key={sub.name} 
                      href={sub.href}
                      className="group flex items-center justify-between px-5 py-4 rounded-xl hover:bg-blue-600 transition-all"
                    >
                      <span className="text-slate-600 group-hover:text-white font-semibold text-sm transition-colors">{sub.name}</span>
                      <span className="text-blue-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* SAĞ TARAF - AKSİYON BUTONU */}
        <div className="flex items-center gap-4">
          <Link 
            href="/iletisim" 
            className={`hidden md:block font-bold text-xs tracking-widest px-8 py-3 rounded-full transition-all duration-300 ${
              isScrolled 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:scale-105" 
                : "bg-slate-900 text-white hover:bg-blue-600"
            }`}
          >
            İLETİŞİM
          </Link>
          
          {/* MOBİL MENÜ TETİKLEYİCİ */}
          <button className="lg:hidden p-2 bg-slate-100 rounded-lg text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}