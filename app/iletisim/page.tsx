import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Metod Mühendislik - Elektrik Pano Üretimi",
  description:
    "Metod Mühendislik ile iletişime geçin. Elektrik pano, marin pano üretimi ve endüstriyel üretim çözümleri için teklif alın. İstanbul Tuzla.",
  keywords:
    "iletişim, teklif, elektrik pano, marin pano, İstanbul, Tuzla, Metod Mühendislik",
  openGraph: {
    title: "İletişim | Metod Mühendislik",
    description: "Elektrik pano ve endüstriyel üretim çözümleri için bizimle iletişime geçin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function IletisimPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              İletişim
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Projeleriniz için profesyonel çözümler sunuyoruz. Hemen bizimle iletişime geçin!
            </p>
          </div>
        </section>

        {/* İLETİŞİM BİLGİLERİ */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                İletişim Bilgileri
              </h2>
              <div className="space-y-6">
                {/* Adres */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="bg-blue-600 p-3 rounded-lg shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">Adres</h3>
                    <p className="text-slate-600 leading-relaxed mb-3">
                      İTOSB SANAYİ BÖLGESİ 3. YOL NO:21
                      <br />
                      TEPEÖREN - AKFİRAT TUZLA
                      <br />
                      İSTANBUL / TÜRKİYE
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=İTOSB+SANAYİ+BÖLGESİ+3.+YOL+NO:21+TEPEÖREN+AKFİRAT+TUZLA+İSTANBUL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Haritada Görüntüle
                    </a>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Telefon</h3>
                    <a
                      href="tel:+902167595675"
                      className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
                    >
                      0 216 759 56 75
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">WhatsApp</h3>
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold text-lg transition-colors flex items-center gap-2"
                    >
                      0 542 578 60 60
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* E-posta */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">E-posta</h3>
                    <a
                      href="mailto:info@metodmuhendislik.com"
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      info@metodmuhendislik.com
                    </a>
                  </div>
                </div>

                {/* Çalışma Saatleri */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Çalışma Saatleri</h3>
                    <p className="text-slate-600">
                      Pazartesi - Cuma: 08:00 - 18:00
                      <br />
                      Cumartesi: 09:00 - 13:00
                      <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="mt-8">
                <h3 className="font-bold text-slate-900 mb-4">Sosyal Medya</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/metodmuhendislik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/metodmuhendislik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HARİTA BÖLÜMÜ */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Konumumuz
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  İTOSB Sanayi Bölgesi&apos;nde bulunan tesisimizi ziyaret edebilir veya haritadan konumumuzu inceleyebilirsiniz.
                </p>
              </div>
              {/* HARİTA */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.1234567890123!2d29.3456789!3d40.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzM1LjYiTiAyOcKwMjAnNDQuNSJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str&q=İTOSB+SANAYİ+BÖLGESİ+3.+YOL+NO:21+TEPEÖREN+AKFİRAT+TUZLA+İSTANBUL"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Metod Mühendislik Konumu - İTOSB Sanayi Bölgesi"
                  />
                </div>
                
                {/* HARİTA ALTINDA ADRES BİLGİSİ */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Adresimiz</h3>
                        <p className="text-blue-100 leading-relaxed">
                          İTOSB SANAYİ BÖLGESİ 3. YOL NO:21
                          <br />
                          TEPEÖREN - AKFİRAT TUZLA
                          <br />
                          İSTANBUL / TÜRKİYE
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=İTOSB+SANAYİ+BÖLGESİ+3.+YOL+NO:21+TEPEÖREN+AKFİRAT+TUZLA+İSTANBUL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Yol Tarifi Al
                    </a>
                  </div>
                </div>
              </div>

              {/* EK BİLGİLER */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Çalışma Saatleri</h3>
                  <p className="text-slate-600 text-sm">
                    Pazartesi - Cuma
                    <br />
                    <span className="font-semibold">08:00 - 18:00</span>
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Hızlı İletişim</h3>
                  <p className="text-slate-600 text-sm">
                    WhatsApp ile
                    <br />
                    <a href="https://wa.me/905425786060" className="font-semibold text-green-600 hover:text-green-700">
                      0 542 578 60 60
                    </a>
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Telefon</h3>
                  <p className="text-slate-600 text-sm">
                    <a href="tel:+902167595675" className="font-semibold text-blue-600 hover:text-blue-700">
                      0 216 759 56 75
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
