"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Service {
  id: number;
  name: string;
  href: string;
  icon?: string;
  description?: string;
}

export default function Footer({ initialServices = [] }: { initialServices?: Service[] }) {
  const currentYear = new Date().getFullYear();
  const [services] = useState<Array<{
    name: string;
    href: string;
  }>>(() => {
    // Server component'ten gelen verileri kullan (encoding düzeltmesi server-side'da yapılıyor)
    // getServices() fonksiyonu zaten fixTurkishEncoding kullanıyor
    if (initialServices && initialServices.length > 0) {
      return initialServices.slice(0, 6).map(s => ({
        name: s.name || "",
        href: s.href || "",
      }));
    }
    // Fallback hizmetler
    return [
      { name: "CNC Lazer Kesim", href: "/hizmetler/cnc-lazer-kesim" },
      { name: "CNC Büküm", href: "/hizmetler/cnc-bukum" },
      { name: "Kaynak", href: "/hizmetler/kaynak" },
      { name: "Elektrostatik Toz Boya", href: "/hizmetler/elektrostatik-toz-boya" },
      { name: "Elektrik Pano Üretimi", href: "/hizmetler/elektrik-pano-uretime" },
      { name: "Çelik Konstrüksiyon", href: "/hizmetler/celik-konstruksiyon" },
    ];
  });

  // Admin panelinden güncelleme event'ini dinle
  useEffect(() => {
    const handleServiceUpdate = () => {
      // Sayfayı yenile (server component tekrar çalışacak)
      window.location.reload();
    };
    
    window.addEventListener('service-updated', handleServiceUpdate);
    
    return () => {
      window.removeEventListener('service-updated', handleServiceUpdate);
    };
  }, []);


  return (
    <footer className="relative bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white overflow-hidden">
      {/* Üst Kavis (Wave) - Modern Gradient */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,100 480,20 720,50 C960,80 1200,40 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            className="text-blue-950"
          />
        </svg>
      </div>

      {/* Dekoratif Arka Plan Elementleri - Daha Belirgin */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10 pt-8 md:pt-12">
        {/* Üst Bölüm - Ana Bilgiler */}
        <div className="container mx-auto px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Logo ve Açıklama */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4 group">
                <div className="relative h-10 w-auto group-hover:opacity-90 transition-opacity">
                  <Image
                    src="/logo.png"
                    alt="Metod Mühendislik Logo"
                    width={464}
                    height={111}
                    className="h-full w-auto object-contain brightness-0 invert"
                    sizes="200px"
                    priority
                  />
                </div>
              </Link>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Endüstriyel üretimde çözüm ortağınız. 10+ yıllık deneyim ile kalite ve güvenin adresi.
              </p>
              
              {/* Sosyal Medya */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/company/metodmuhendislik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/metodmuhendislik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-600/50"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-white font-black text-xl mb-5 relative inline-block">
                Hızlı Linkler
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Ana Sayfa</span>
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Hizmetlerimiz</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projeler" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Projeler</span>
                  </Link>
                </li>
                <li>
                  <Link href="/urunler" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Ürünler</span>
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>İletişim</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kurumsal/hakkimizda" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Hakkımızda</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kurumsal/surdurulebilirlik" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Sürdürülebilirlik</span>
                  </Link>
                </li>
                <li>
                  <Link href="/kurumsal/arge" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                    <span>Ar-Ge</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hizmetler */}
            <div>
              <h3 className="text-white font-black text-xl mb-5 relative inline-block">
                Hizmetlerimiz
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2.5">
                {services.length > 0 ? (
                  services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                        <span>{service.name}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link href="/hizmetler/cnc-lazer-kesim" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                        <span>CNC Lazer Kesim</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/hizmetler/cnc-bukum" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                        <span>CNC Büküm</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/hizmetler/kaynak" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                        <span>Kaynak</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/hizmetler/elektrostatik-toz-boya" className="text-slate-300 hover:text-white transition-colors text-base font-semibold flex items-center gap-2 group">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-125"></span>
                        <span>Elektrostatik Toz Boya</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-white font-black text-xl mb-5 relative inline-block">
                İletişim
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed">
                    <p className="font-bold text-white mb-0.5 text-sm">Adres</p>
                    <p>İTOSB SANAYİ BÖLGESİ</p>
                    <p>3. YOL NO:21</p>
                    <p>TEPEÖREN - AKFİRAT TUZLA</p>
                    <p>İSTANBUL / TÜRKİYE</p>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a
                    href="tel:+902167595675"
                    className="text-slate-300 hover:text-white transition-colors text-sm font-bold"
                  >
                    0 216 759 56 75
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors text-sm font-bold"
                  >
                    WhatsApp: 0 542 578 60 60
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a
                    href="mailto:info@metodmuhendislik.com"
                    className="text-slate-300 hover:text-white transition-colors text-sm font-bold"
                  >
                    info@metodmuhendislik.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-slate-300 text-xs">
                    <p className="font-bold text-white mb-0.5 text-sm">Çalışma Saatleri</p>
                    <p>Pazartesi - Cuma: 08:00 - 18:00</p>
                    <p>Cumartesi: 09:00 - 14:00</p>
                    <p className="text-slate-400">Pazar: Kapalı</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alt Bölüm - Copyright ve Linkler */}
        <div className="border-t border-blue-500/20 bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">
                <p>© {currentYear} Metod Mühendislik. Tüm Hakları Saklıdır.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <Link
                  href="/kurumsal/kvkk"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  KVKK
                </Link>
                <Link
                  href="/kurumsal/gizlilik-sozlesmesi"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Gizlilik Sözleşmesi
                </Link>
                <Link
                  href="/kurumsal/kalite-politikamiz"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Kalite Politikamız
                </Link>
                <Link
                  href="/kurumsal/surdurulebilirlik"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Sürdürülebilirlik
                </Link>
                <Link
                  href="/kurumsal/arge"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Ar-Ge
                </Link>
              </div>
            </div>
            
            {/* Media Backlink */}
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
              <a
                href="https://bariscanyonel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs font-medium text-orange-500 hover:text-orange-400 transition-all duration-300"
              >
                <span className="text-orange-400 group-hover:text-orange-300 transition-colors uppercase tracking-wider">
                  media:
                </span>
                <span className="text-orange-500 group-hover:text-orange-400 font-bold uppercase tracking-wide">
                  BARİŞ CAN YÖNEL
                </span>
                <svg
                  className="w-3.5 h-3.5 text-orange-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-300"
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
    </footer>
  );
}

