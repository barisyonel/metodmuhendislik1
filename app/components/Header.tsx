"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import EKatalogButton from "./EKatalogButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [hizmetler, setHizmetler] = useState<Array<{
    name: string;
    href: string;
    icon: string;
    description: string;
  }>>([]);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Hizmetleri API'den yükle
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch("/api/metod/services?t=" + Date.now(), {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        // Response'u doğrudan JSON olarak al
        const data = await response.json();

        // Hata durumunu kontrol et
        if (!data.success) {
          console.error("❌ Hizmetler API hatası:", {
            error: data.error,
            errorCode: data.errorCode,
            message: data.message,
          });
          // Fallback: Varsayılan hizmetler
          setHizmetler([
            { name: "Elektrik Pano Üretimi", href: "/hizmetler/elektrik-pano-uretime", icon: "⚡", description: "Sıvaüstü, sıvaaltı ve marin pano üretimi" },
            { name: "CNC Lazer Kesim", href: "/hizmetler/cnc-lazer-kesim", icon: "⚡", description: "Hassas lazer kesim çözümleri" },
            { name: "CNC Büküm", href: "/hizmetler/cnc-bukum", icon: "🔧", description: "Profesyonel büküm hizmetleri" },
            { name: "Kaynak", href: "/hizmetler/kaynak", icon: "🔥", description: "Metal kaynak ve imalat" },
            { name: "Elektrostatik Toz Boya", href: "/hizmetler/elektrostatik-toz-boya", icon: "🎨", description: "Yüksek kaliteli toz boya" },
            { name: "Mağaza Raf Ve Ürünleri", href: "/hizmetler/magaza-raf-ve-urunleri", icon: "📦", description: "Mağaza raf sistemleri" },
            { name: "Çelik Konstrüksiyon", href: "/hizmetler/celik-konstruksiyon", icon: "🏗️", description: "Endüstriyel çelik yapılar" },
          ]);
          return;
        }

        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setHizmetler(
            data.data.map((s: { name: string; href: string; icon: string; description?: string }) => ({
              name: s.name || "",
              href: s.href || "",
              icon: s.icon || "⚡",
              description: s.description || "",
            }))
          );
        } else {
          // Fallback: Varsayılan hizmetler
          setHizmetler([
            { name: "Elektrik Pano Üretimi", href: "/hizmetler/elektrik-pano-uretime", icon: "⚡", description: "Sıvaüstü, sıvaaltı ve marin pano üretimi" },
            { name: "CNC Lazer Kesim", href: "/hizmetler/cnc-lazer-kesim", icon: "⚡", description: "Hassas lazer kesim çözümleri" },
            { name: "CNC Büküm", href: "/hizmetler/cnc-bukum", icon: "🔧", description: "Profesyonel büküm hizmetleri" },
            { name: "Kaynak", href: "/hizmetler/kaynak", icon: "🔥", description: "Metal kaynak ve imalat" },
            { name: "Elektrostatik Toz Boya", href: "/hizmetler/elektrostatik-toz-boya", icon: "🎨", description: "Yüksek kaliteli toz boya" },
            { name: "Mağaza Raf Ve Ürünleri", href: "/hizmetler/magaza-raf-ve-urunleri", icon: "📦", description: "Mağaza raf sistemleri" },
            { name: "Çelik Konstrüksiyon", href: "/hizmetler/celik-konstruksiyon", icon: "🏗️", description: "Endüstriyel çelik yapılar" },
          ]);
        }
      } catch (error) {
        console.error("Hizmetler yüklenirken hata:", error);
        // Fallback hizmetler
        setHizmetler([
          { name: "Elektrik Pano Üretimi", href: "/hizmetler/elektrik-pano-uretime", icon: "⚡", description: "Sıvaüstü, sıvaaltı ve marin pano üretimi" },
        ]);
      }
    };
    loadServices();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Sadece dropdown dışına tıklandığında kapat
      if (
        activeMenu &&
        !target.closest("[data-dropdown]") &&
        !target.closest("[data-dropdown-button]")
      ) {
        // Eğer clickedMenu varsa, sadece clickedMenu'yu temizle, menüyü açık bırak
        if (clickedMenu) {
          setClickedMenu(null);
        } else {
          // Tıklanmamışsa menüyü kapat
          setActiveMenu(null);
        }
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeMenu, clickedMenu]);

  const kurumsalItems = [
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Kalite Politikamız", href: "/kurumsal/kalite-politikamiz" },
    { name: "Kalite Belgelerimiz", href: "/kurumsal/kalite-belgelerimiz" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ÜST BANT - İLETİŞİM BİLGİLERİ - Modern Gradient */}
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-[110] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white text-xs py-2.5 border-b border-blue-500/30 shadow-lg transition-all duration-500 ${
          isScrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${isMobileMenuOpen ? "lg:opacity-100 lg:translate-y-0" : ""}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+902167595675"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">0 216 759 56 75</span>
            </a>
            <a
              href="mailto:info@metodmuhendislik.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">info@metodmuhendislik.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Pazartesi - Cuma: 08:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ANA NAVBAR - Modern Gradient Glassmorphism */}
      <header
        className={`fixed w-full z-[100] transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-2xl shadow-2xl shadow-blue-500/10 py-3 border-b border-blue-200/40"
            : "bg-gradient-to-r from-white/95 via-blue-50/20 to-white/95 backdrop-blur-xl shadow-lg shadow-blue-500/5 py-4 border-b border-blue-100/30"
        } ${isMobileMenuOpen ? "lg:opacity-100 lg:pointer-events-auto opacity-0 pointer-events-none" : ""}`}
        style={{ top: isScrolled ? "0" : "40px" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="group flex items-center relative z-10 shrink-0"
              aria-label="Ana Sayfa"
            >
              <div className="relative h-12 w-auto md:h-14 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Metod Mühendislik Logo"
                  width={464}
                  height={111}
                  className="h-full w-auto object-contain"
                  priority
                  sizes="(max-width: 768px) 200px, 250px"
                />
              </div>
            </Link>

            {/* MASAÜSTÜ NAVİGASYON - ORTALANMIŞ */}
            <nav
              className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2"
              aria-label="Ana Navigasyon"
            >
              <Link
                href="/"
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive("/")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                Anasayfa
                {isActive("/") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></span>
                )}
              </Link>

              {/* HİZMETLER MEGA MENU */}
              <div
                className="relative"
                data-dropdown
                onMouseEnter={() => {
                  setActiveMenu("h");
                  // Hover ile açıldığında clickedMenu'yu temizle
                  if (clickedMenu === "h") {
                    setClickedMenu(null);
                  }
                }}
                onMouseLeave={() => {
                  // Sadece tıklanmamışsa kapat
                  if (clickedMenu !== "h") {
                    setActiveMenu(null);
                  }
                }}
              >
                <button
                  data-dropdown-button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Tıklamada toggle yap
                    if (activeMenu === "h") {
                      setActiveMenu(null);
                      setClickedMenu(null);
                    } else {
                      setActiveMenu("h");
                      setClickedMenu("h");
                    }
                  }}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                    activeMenu === "h" || pathname?.startsWith("/hizmetler")
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                      : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                  }`}
                  aria-expanded={activeMenu === "h"}
                  aria-haspopup="true"
                >
                  <span className="font-bold">Hizmetler</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "h" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeMenu === "h" && (
                  <>
                    {/* Köprü - Button ile dropdown arasındaki boşluğu kapatır */}
                    <div className="absolute left-0 top-full w-full h-3 z-40"></div>
                    <div className="absolute left-0 top-full pt-3 w-[650px] z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div
                        data-dropdown
                        className="bg-white/98 backdrop-blur-2xl border-2 border-blue-200/50 shadow-2xl shadow-blue-500/20 rounded-2xl overflow-hidden"
                      >
                      <div className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-b border-blue-400/30 shadow-lg">
                        <h3 className="text-base font-black text-white mb-1">Tüm Hizmetlerimiz</h3>
                        <p className="text-xs text-blue-100 font-medium">Endüstriyel üretim çözümleri</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {hizmetler.length > 0 ? (
                          hizmetler.map((h) => (
                            <Link
                              key={h.name}
                              href={h.href}
                              className="group flex items-start gap-3 px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5"
                              onClick={() => {
                                // Link'e tıklandığında menüyü kapat
                                setActiveMenu(null);
                                setClickedMenu(null);
                              }}
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                                <span className="text-xl">{h.icon}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="block text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors leading-tight">
                                  {h.name}
                                </span>
                                {h.description && (
                                  <span className="block text-xs text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-600">
                                    {h.description}
                                  </span>
                                )}
                              </div>
                              <svg
                                className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
                            Hizmet yükleniyor...
                          </div>
                        )}
                      </div>
                    </div>
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/projeler"
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive("/projeler") || pathname?.startsWith("/projeler")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                Projeler
                {(isActive("/projeler") || pathname?.startsWith("/projeler")) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></span>
                )}
              </Link>

              <Link
                href="/urunler"
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive("/urunler") || pathname?.startsWith("/urunler")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                Ürünler
                {(isActive("/urunler") || pathname?.startsWith("/urunler")) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></span>
                )}
              </Link>

              <Link
                href="/iletisim"
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive("/iletisim") || pathname?.startsWith("/iletisim")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                    : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                }`}
              >
                İletişim
                {(isActive("/iletisim") || pathname?.startsWith("/iletisim")) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></span>
                )}
              </Link>

              {/* KURUMSAL DROPDOWN */}
              <div
                className="relative"
                data-dropdown
                onMouseEnter={() => {
                  setActiveMenu("k");
                  // Hover ile açıldığında clickedMenu'yu temizle
                  if (clickedMenu === "k") {
                    setClickedMenu(null);
                  }
                }}
                onMouseLeave={() => {
                  // Sadece tıklanmamışsa kapat
                  if (clickedMenu !== "k") {
                    setActiveMenu(null);
                  }
                }}
              >
                <button
                  data-dropdown-button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeMenu === "k") {
                      setActiveMenu(null);
                      setClickedMenu(null);
                    } else {
                      setActiveMenu("k");
                      setClickedMenu("k");
                    }
                  }}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                    activeMenu === "k" || pathname?.startsWith("/kurumsal")
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                      : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-md hover:shadow-blue-500/20"
                  }`}
                  aria-expanded={activeMenu === "k"}
                  aria-haspopup="true"
                >
                  Kurumsal
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "k" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeMenu === "k" && (
                  <>
                    {/* Köprü - Button ile dropdown arasındaki boşluğu kapatır */}
                    <div className="absolute left-0 top-full w-full h-3 z-40"></div>
                    <div className="absolute left-0 top-full pt-3 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div
                        data-dropdown
                        className="bg-white/95 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-2xl overflow-hidden"
                      >
                      {kurumsalItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-sm transition-all duration-200 border-b border-slate-100 last:border-b-0"
                          onClick={() => {
                            // Link'e tıklandığında menüyü kapat
                            setActiveMenu(null);
                            setClickedMenu(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </nav>

            {/* CTA BUTONLARI - E-Katalog ve WhatsApp - SAĞDA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <div className="hidden xl:block">
                <EKatalogButton className="px-5 py-2.5 text-sm" />
              </div>
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:scale-105 shadow-lg shadow-green-600/30 items-center gap-2 group flex"
                aria-label="WhatsApp ile Teklif Al"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Teklif Al
              </a>
            </div>

            {/* MOBİL MENÜ BUTONU */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-[103] ${
                isScrolled
                  ? "hover:bg-slate-100 text-slate-900"
                  : "hover:bg-slate-100 text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBİL MENÜ - Modern Slide-in */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[102] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className={`absolute right-0 top-0 h-full w-[90%] max-w-md bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="p-6 space-y-2">
              {/* MOBİL MENÜ HEADER */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative h-10 w-auto shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Metod Mühendislik Logo"
                      width={464}
                      height={111}
                      className="h-full w-auto object-contain"
                      sizes="180px"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
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

              {/* MOBİL MENÜ İÇERİK */}
              <Link
                href="/"
                className={`block px-4 py-3.5 rounded-xl font-semibold text-slate-700 transition-all ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anasayfa
              </Link>

              <div>
                <button
                  onClick={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "hizmetler" ? null : "hizmetler",
                    )
                  }
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-black transition-all ${
                    pathname?.startsWith("/hizmetler")
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                  }`}
                >
                  <span className="font-bold">Hizmetlerimiz</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === "hizmetler" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {mobileSubmenu === "hizmetler" && (
                  <div className="pl-4 mt-2 space-y-2">
                    {hizmetler.length > 0 ? (
                      hizmetler.map((h) => (
                        <Link
                          key={h.name}
                          href={h.href}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-slate-700 text-sm font-bold transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">{h.icon}</span>
                          </div>
                          <div className="flex-1">
                            <span className="block font-bold leading-tight">{h.name}</span>
                            {h.description && (
                              <span className="block text-xs text-slate-500 mt-0.5 font-normal">
                                {h.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-slate-400 text-sm text-center">
                        Hizmet yükleniyor...
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/projeler"
                className={`block px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/projeler") || pathname?.startsWith("/projeler")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projeler
              </Link>

              <Link
                href="/blog"
                className={`block px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/blog") || pathname?.startsWith("/blog")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>


              <Link
                href="/iletisim"
                className={`block px-4 py-3.5 rounded-xl font-semibold transition-all ${
                  isActive("/iletisim") || pathname?.startsWith("/iletisim")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>

              <div>
                <button
                  onClick={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "kurumsal" ? null : "kurumsal",
                    )
                  }
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-all ${
                    pathname?.startsWith("/kurumsal")
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Kurumsal</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === "kurumsal" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {mobileSubmenu === "kurumsal" && (
                  <div className="pl-4 mt-2 space-y-1">
                    {kurumsalItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl hover:bg-blue-50 text-slate-600 text-sm font-medium transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* MOBİL CTA BUTONLARI */}
              <div className="space-y-3 mt-4">
                <EKatalogButton className="w-full px-4 py-3.5 text-base" />
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-center hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp ile Teklif Al
                </a>
              </div>

              {/* MOBİL İLETİŞİM BİLGİLERİ */}
              <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-start gap-3 px-4 py-2 text-slate-600 text-sm">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">
                    İTOSB SANAYİ BÖLGESİ 3. YOL NO:21
                    <br />
                    TEPEÖREN - AKFİRAT TUZLA
                    <br />
                    İSTANBUL / TÜRKİYE
                  </span>
                </div>
                <a
                  href="tel:+902167595675"
                  className="flex items-center gap-3 px-4 py-2 text-slate-600 text-sm hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0 216 759 56 75</span>
                </a>
                <a
                  href="mailto:info@metodmuhendislik.com"
                  className="flex items-center gap-3 px-4 py-2 text-slate-600 text-sm hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@metodmuhendislik.com</span>
                </a>
              </div>

              {/* MOBİL MEDIA BACKLINK */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="flex justify-center px-4 py-3">
                  <a
                    href="https://bariscanyonel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-all duration-300 hover:gap-2.5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-orange-400 group-hover:text-orange-300 transition-colors uppercase tracking-wider">
                      media:
                    </span>
                    <span className="text-orange-500 group-hover:text-orange-400 font-bold uppercase tracking-wide">
                      BARİŞ CAN YÖNEL
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-orange-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-300 opacity-80 group-hover:opacity-100"
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
