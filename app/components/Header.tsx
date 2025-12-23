"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null); // Tıklama ile açılan menü
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
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

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        activeMenu &&
        !target.closest("[data-dropdown]") &&
        !target.closest("[data-dropdown-button]")
      ) {
        setActiveMenu(null);
        setClickedMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeMenu]);

  const hizmetler = [
    { name: "CNC Lazer Kesim", href: "/hizmetler/cnc-lazer-kesim", icon: "⚡" },
    { name: "CNC Büküm", href: "/hizmetler/cnc-bukum", icon: "🔧" },
    { name: "Kaynak", href: "/hizmetler/kaynak", icon: "🔥" },
    {
      name: "Elektrostatik Toz Boya",
      href: "/hizmetler/elektrostatik-toz-boya",
      icon: "🎨",
    },
    {
      name: "Mağaza Raf Ve Ürünleri",
      href: "/hizmetler/magaza-raf-ve-urunleri",
      icon: "📦",
    },
    {
      name: "Çelik Konstrüksiyon",
      href: "/hizmetler/celik-konstruksiyon",
      icon: "🏗️",
    },
    {
      name: "Elektrik Pano Üretimi",
      href: "/hizmetler/elektrik-pano-uretime",
      icon: "⚡",
    },
  ];

  const kurumsalItems = [
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Kalite Politikamız", href: "/kurumsal/kalite-politikamiz" },
    { name: "Kalite Belgelerimiz", href: "/kurumsal/kalite-belgelerimiz" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ÜST BANT - İLETİŞİM BİLGİLERİ - Scroll'da gizlenir */}
      <div
        className={`hidden md:block bg-slate-900 text-white text-xs py-2 border-b border-slate-800 transition-all duration-500 ${
          isScrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+902167595675"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <span>📞</span>
              <span>0 216 759 56 75</span>
            </a>
            <a
              href="mailto:info@metodmuhendislik.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <span>✉️</span>
              <span>info@metodmuhendislik.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Pazartesi - Cuma: 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>

      {/* ANA NAVBAR - Temiz ve Profesyonel */}
      <header
        className={`fixed w-full z-[100] transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white shadow-lg py-3 border-b border-slate-200"
            : "bg-white shadow-sm py-4 border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* LOGO - Yatay Logo Optimizasyonu */}
            <Link
              href="/"
              className="group flex items-center"
              aria-label="Ana Sayfa"
            >
              <div className="relative h-12 w-auto md:h-14 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Metod Mühendislik Logo"
                  width={464}
                  height={111}
                  className="h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                  priority
                  sizes="(max-width: 768px) 200px, 250px"
                />
              </div>
            </Link>

            {/* MASAÜSTÜ NAVİGASYON - Temiz ve Profesyonel */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Ana Navigasyon"
            >
              <Link
                href="/"
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                Anasayfa
              </Link>

              {/* HİZMETLER DROPDOWN */}
              <div
                className="relative"
                data-dropdown
                onMouseEnter={() => {
                  setActiveMenu("h");
                }}
                onMouseLeave={() => {
                  // Tıklama ile açıldıysa kapatma, sadece hover ile açıldıysa kapat
                  if (clickedMenu !== "h") {
                    setActiveMenu(null);
                  }
                }}
              >
                <button
                  data-dropdown-button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeMenu === "h") {
                      setActiveMenu(null);
                      setClickedMenu(null);
                    } else {
                      setActiveMenu("h");
                      setClickedMenu("h");
                    }
                  }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 ${
                    activeMenu === "h" || pathname?.startsWith("/hizmetler")
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                  aria-expanded={activeMenu === "h"}
                  aria-haspopup="true"
                >
                  Hizmetler
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "h" ? "rotate-180" : ""}`}
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
                  <div className="absolute left-0 mt-2 w-72 pt-2 z-50">
                    <div
                      data-dropdown
                      className="bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden"
                      onMouseEnter={() => setActiveMenu("h")}
                      onMouseLeave={() => {
                        if (clickedMenu !== "h") {
                          setActiveMenu(null);
                        }
                      }}
                    >
                      {hizmetler.map((h) => (
                        <Link
                          key={h.name}
                          href={h.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group/item"
                          onClick={() => {
                            setActiveMenu(null);
                            setClickedMenu(null);
                          }}
                        >
                          <span className="text-xl">{h.icon}</span>
                          <span className="text-slate-700 group-hover/item:text-blue-600 font-medium text-sm transition-colors flex-1">
                            {h.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/urunler"
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/urunler") || pathname?.startsWith("/urunler")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                Projeler
              </Link>

              {/* KURUMSAL DROPDOWN */}
              <div
                className="relative"
                data-dropdown
                onMouseEnter={() => {
                  setActiveMenu("k");
                }}
                onMouseLeave={() => {
                  // Tıklama ile açıldıysa kapatma, sadece hover ile açıldıysa kapat
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
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-200 ${
                    activeMenu === "k" || pathname?.startsWith("/kurumsal")
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                  aria-expanded={activeMenu === "k"}
                  aria-haspopup="true"
                >
                  Kurumsal
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "k" ? "rotate-180" : ""}`}
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
                  <div className="absolute left-0 mt-2 w-56 pt-2 z-50">
                    <div
                      data-dropdown
                      className="bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden"
                      onMouseEnter={() => setActiveMenu("k")}
                      onMouseLeave={() => {
                        if (clickedMenu !== "k") {
                          setActiveMenu(null);
                        }
                      }}
                    >
                      {kurumsalItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-medium text-sm transition-colors"
                          onClick={() => {
                            setActiveMenu(null);
                            setClickedMenu(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* İLETİŞİM BUTONU - CTA */}
              <Link
                href="/iletisim"
                className="ml-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-600/30"
                aria-label="Teklif Al - İletişime Geç"
              >
                Teklif Al
              </Link>
            </nav>

            {/* MOBİL MENÜ BUTONU */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-[101] ${
                isScrolled
                  ? "hover:bg-white/50 text-slate-900"
                  : "hover:bg-slate-100 text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBİL MENÜ OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-2">
              {/* MOBİL MENÜ HEADER */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative h-10 w-auto flex-shrink-0">
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
                  className="p-2 rounded-lg hover:bg-slate-100"
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
                className={`block px-4 py-3 rounded-lg font-medium text-slate-700 transition-all ${
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
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname?.startsWith("/hizmetler")
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Hizmetlerimiz</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileSubmenu === "hizmetler" ? "rotate-180" : ""}`}
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
                {mobileSubmenu === "hizmetler" && (
                  <div className="pl-4 mt-2 space-y-1">
                    {hizmetler.map((h) => (
                      <Link
                        key={h.name}
                        href={h.href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-50 text-slate-600 text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{h.icon}</span>
                        <span>{h.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/urunler"
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive("/urunler") || pathname?.startsWith("/urunler")
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projeler
              </Link>

              <div>
                <button
                  onClick={() =>
                    setMobileSubmenu(
                      mobileSubmenu === "kurumsal" ? null : "kurumsal",
                    )
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname?.startsWith("/kurumsal")
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Kurumsal</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileSubmenu === "kurumsal" ? "rotate-180" : ""}`}
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
                        className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 text-slate-600 text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/iletisim"
                className="block px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold text-center mt-4 hover:bg-blue-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>

              {/* MOBİL İLETİŞİM BİLGİLERİ */}
              <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-start gap-3 px-4 py-2 text-slate-600 text-sm">
                  <span className="text-xl">📍</span>
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
                  className="flex items-center gap-3 px-4 py-2 text-slate-600 text-sm"
                >
                  <span className="text-xl">📞</span>
                  <span>0 216 759 56 75</span>
                </a>
                <a
                  href="mailto:info@metodmuhendislik.com"
                  className="flex items-center gap-3 px-4 py-2 text-slate-600 text-sm"
                >
                  <span className="text-xl">✉️</span>
                  <span>info@metodmuhendislik.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
