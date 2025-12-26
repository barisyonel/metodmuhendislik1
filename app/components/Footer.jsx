import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative text-white py-16 border-t border-slate-800/50 overflow-hidden"
      role="contentinfo"
    >
      {/* Arka Plan Görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/metod.png"
          alt="Metod Mühendislik Arka Plan"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Overlay - Görselin üzerine koyu mavi gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/90"></div>
        {/* Ekstra overlay - Metni daha okunabilir yapmak için */}
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>

      {/* İçerik - Overlay'in üstünde */}
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center mb-6 group">
            <div className="relative h-12 w-auto group-hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="Metod Mühendislik Logo"
                width={464}
                height={111}
                className="h-full w-auto object-contain"
                sizes="200px"
              />
            </div>
          </Link>
          <p className="text-slate-200 text-sm leading-relaxed mb-4 drop-shadow-sm">
            Endüstriyel üretimde çözüm ortağınız. CNC lazer kesim, büküm ve
            kaynaklı imalatta kalite ve güvenin adresi.
          </p>
          <p className="text-slate-300 text-xs drop-shadow-sm">
            20+ yıllık deneyim ile sektörde öncü konumdayız.
          </p>
        </div>
        <nav aria-label="Footer Navigasyon">
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest drop-shadow-sm">
            Hızlı Linkler
          </h4>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link
                href="/kurumsal/hakkimizda"
                className="hover:text-white transition-colors"
              >
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler"
                className="hover:text-white transition-colors"
              >
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link
                href="/urunler"
                className="hover:text-white transition-colors"
              >
                Ürünler
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                className="hover:text-white transition-colors"
              >
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Hizmetler">
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest drop-shadow-sm">
            Hizmetlerimiz
          </h4>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>
              <Link
                href="/hizmetler/cnc-lazer-kesim"
                className="hover:text-white transition-colors"
              >
                CNC Lazer Kesim
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/cnc-bukum"
                className="hover:text-white transition-colors"
              >
                CNC Abkant Büküm
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/kaynak"
                className="hover:text-white transition-colors"
              >
                Kaynaklı İmalat
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/elektrostatik-toz-boya"
                className="hover:text-white transition-colors"
              >
                Elektrostatik Toz Boya
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/magaza-raf-ve-urunleri"
                className="hover:text-white transition-colors"
              >
                Mağaza Raf ve Ürünleri
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/celik-konstruksiyon"
                className="hover:text-white transition-colors"
              >
                Çelik Konstrüksiyon
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="hover:text-white transition-colors"
              >
                Elektrik Pano Üretimi
              </Link>
            </li>
          </ul>
        </nav>
        <address className="not-italic">
          <h4 className="font-bold mb-6 text-blue-400 uppercase text-xs tracking-widest drop-shadow-sm">
            İletişim
          </h4>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1" aria-hidden="true">
                📍
              </span>
              <span>
                İTOSB SANAYİ BÖLGESİ 3. YOL NO:21
                <br />
                TEPEÖREN - AKFİRAT TUZLA
                <br />
                İSTANBUL / TÜRKİYE
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400" aria-hidden="true">
                📞
              </span>
              <a
                href="tel:+902167595675"
                className="hover:text-white transition-colors text-base"
                aria-label="Telefon ile ara: 0 216 759 56 75"
              >
                0 216 759 56 75
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400" aria-hidden="true">
                💬
              </span>
              <a
                href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-base font-semibold"
                aria-label="WhatsApp ile iletişime geç: 0 542 578 60 60"
              >
                WhatsApp: 0 542 578 60 60
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400" aria-hidden="true">
                ✉️
              </span>
              <a
                href="mailto:info@metodmuhendislik.com"
                className="hover:text-white transition-colors text-base"
                aria-label="E-posta gönder: info@metodmuhendislik.com"
              >
                info@metodmuhendislik.com
              </a>
            </li>
            <li className="flex items-start gap-2 mt-4 pt-4 border-t border-white/10">
              <span className="text-blue-400 mt-1" aria-hidden="true">
                🕒
              </span>
              <div className="text-slate-200 text-sm">
                <p className="font-semibold mb-1">Çalışma Saatleri</p>
                <p>Pazartesi - Cuma: 08:00 - 18:00</p>
                <p>Cumartesi: 09:00 - 14:00</p>
                <p>Pazar: Kapalı</p>
              </div>
            </li>
            <li className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              <span className="text-blue-400" aria-hidden="true">
                🌐
              </span>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/metodmuhendislik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white transition-colors"
                  aria-label="LinkedIn sayfamızı ziyaret edin"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/metodmuhendislik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white transition-colors"
                  aria-label="Facebook sayfamızı ziyaret edin"
                >
                  Facebook
                </a>
              </div>
            </li>
          </ul>
        </address>
      </div>
      <div className="relative z-10 container mx-auto px-6 mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-300">
          <p>© {currentYear} Metod Mühendislik. Tüm Hakları Saklıdır.</p>
          <div className="flex gap-6">
            <Link
              href="/kurumsal/kvkk"
              className="hover:text-white transition-colors"
            >
              KVKK
            </Link>
            <Link
              href="/kurumsal/gizlilik-sozlesmesi"
              className="hover:text-white transition-colors"
            >
              Gizlilik Sözleşmesi
            </Link>
            <Link
              href="/kurumsal/kalite-politikamiz"
              className="hover:text-white transition-colors"
            >
              Kalite Politikamız
            </Link>
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-6 mt-6 pt-6 border-t border-white/20">
          <div className="flex justify-center items-center">
            <a
              href="https://bariscanyonel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-all duration-300 hover:gap-3"
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
    </footer>
  );
}
