"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useState } from "react";
import type { Metadata } from "next";

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Elektrik pano üretim süresi ne kadar?",
      answer:
        "Elektrik pano üretim süresi, pano tipine, büyüklüğüne ve karmaşıklığına göre değişmektedir. Basit bir pano için 2-3 hafta, kompleks sistemler için 6-12 hafta arasında değişebilir. Detaylı süre bilgisi için proje bazlı teklif almanız önerilir.",
    },
    {
      question: "Hangi pano tipini seçmeliyim?",
      answer:
        "Pano tipi seçimi, kullanım alanına, güç ihtiyacına ve özel gereksinimlere bağlıdır. Ana dağıtım için ADP, motor kontrolü için MCC, enerji tasarrufu için kompanzasyon panosu tercih edilir. Uzman ekibimiz, ihtiyaçlarınızı analiz ederek en uygun çözümü önerecektir.",
    },
    {
      question: "Elektrik panolarınız hangi standartlara uygun?",
      answer:
        "Tüm panolarımız IEC 61439-1/2 uluslararası standartlarına uygun olarak üretilmektedir. Ayrıca ISO 9001:2015 kalite yönetim sistemi sertifikamız bulunmaktadır. Marin panolarımız IEC 60092 standartlarına, tüm üretim süreçlerimiz TS EN standartlarına uygundur.",
    },
    {
      question: "IP koruma sınıfı nedir ve hangisini seçmeliyim?",
      answer:
        "IP (Ingress Protection) koruma sınıfı, panoların toz, su ve dış etkilere karşı koruma seviyesini belirtir. İç mekan için IP20-IP54, dış mekan için IP54-IP65, denizcilik uygulamaları için IP66-IP67 tercih edilir. Kullanım yerinize göre en uygun IP sınıfını belirleyebiliriz.",
    },
    {
      question: "Garanti ve satış sonrası hizmet var mı?",
      answer:
        "Evet, tüm panolarımız için garanti süresi sağlanmaktadır. Ayrıca satış sonrası destek, bakım, onarım ve yedek parça hizmetleri sunmaktayız. 7/24 teknik destek hattımız bulunmaktadır.",
    },
    {
      question: "Kompanzasyon panosu ne işe yarar?",
      answer:
        "Kompanzasyon panosu, reaktif güç kontrolü yaparak elektrik faturalarında %15-30 arası tasarruf sağlar, reaktif güç cezası ödemesini engeller, şebeke kalitesini artırır ve sistem ömrünü uzatır. Özellikle motor ve endüktif yüklerin bulunduğu tesislerde kullanılır.",
    },
    {
      question: "Marin pano ile normal pano arasındaki fark nedir?",
      answer:
        "Marin panolar, deniz ortamının zorlu koşullarına (tuzlu su, yüksek nem, titreşim) dayanıklı olarak üretilir. Paslanmaz çelik (316L) veya marine grade aluminyum malzeme kullanılır, IP66/IP67 koruma sınıfına sahiptir ve IEC 60092 standartlarına uygundur.",
    },
    {
      question: "Otomasyon panosu ne için kullanılır?",
      answer:
        "Otomasyon panoları, endüstriyel süreçlerin, bina sistemlerinin ve makine operasyonlarının otomatik kontrolünü sağlar. PLC, SCADA, HMI sistemleri içerir. Akıllı bina sistemleri, üretim hatları, proses kontrol ve HVAC sistemleri için kullanılır.",
    },
    {
      question: "UPS panosu ne işe yarar?",
      answer:
        "UPS (Kesintisiz Güç Kaynağı) panosu, elektrik kesintilerinde, voltaj düşümlerinde ve şebeke problemlerinde kritik sistemlerin kesintisiz çalışmasını garanti eder. Veri merkezleri, hastaneler, endüstriyel tesisler ve kritik altyapı sistemleri için vazgeçilmezdir.",
    },
    {
      question: "Fiyatlandırma nasıl yapılıyor?",
      answer:
        "Fiyatlandırma, pano tipine, büyüklüğüne, kullanılacak malzemelere, özel gereksinimlere ve projenin karmaşıklığına göre belirlenir. Detaylı teklif için projenizin teknik şartnamesi ile birlikte bizimle iletişime geçmeniz yeterlidir.",
    },
    {
      question: "Montaj hizmeti veriyor musunuz?",
      answer:
        "Evet, montaj ve devreye alma hizmeti sunmaktayız. Saha montajı, devreye alma, süpervizörlük hizmetleri ve eğitim hizmetleri sağlanabilir. Anahtar teslim (turn-key) çözümler sunuyoruz.",
    },
    {
      question: "Özel tasarım pano üretiyor musunuz?",
      answer:
        "Evet, müşteri ihtiyaçlarına özel tasarım ve üretim yapmaktayız. Standart çözümlerden özel çözümlere kadar geniş yelpazede hizmet vermekteyiz. Tasarım ve projelendirme hizmetlerimiz de bulunmaktadır.",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/hizmetler/elektrik-pano-uretime"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-4 text-sm font-bold transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Elektrik Pano Üretimi
              </Link>
              <div className="text-6xl mb-6">❓</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Sık Sorulan Sorular
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                Elektrik pano üretimi hakkında merak ettiğiniz soruların
                yanıtları.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 mb-12">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-lg flex-1">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
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
                    {openIndex === index && (
                      <div className="px-6 pb-5">
                        <div className="pt-2 border-t border-slate-200">
                          <p className="text-slate-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ek Soru Bölümü */}
              <div className="mb-12 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Sorunuz mu var?
                </h2>
                <p className="text-slate-700 mb-6">
                  Aradığınız sorunun cevabını bulamadıysanız, bizimle iletişime
                  geçmekten çekinmeyin. Uzman ekibimiz tüm sorularınızı
                  yanıtlamaktan memnuniyet duyacaktır.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/905425786060?text=Merhaba,%20elektrik%20pano%20hakkında%20bir%20sorum%20var."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp ile Sor
                  </a>
                  <Link
                    href="/iletisim"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    İletişim Formu
                  </Link>
                </div>
              </div>

              {/* CTA Section */}
              <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Projeniz İçin Teklif Alın
                  </h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Elektrik pano ihtiyaçlarınız için uzman ekibimizle iletişime
                    geçin ve detaylı bilgi alın.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/905425786060?text=Merhaba,%20elektrik%20pano%20için%20teklif%20almak%20istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp ile Teklif Al
                    </a>
                    <Link
                      href="/hizmetler/elektrik-pano-uretime"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Ana Sayfaya Dön
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
