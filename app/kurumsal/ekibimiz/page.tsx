import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekibimiz | Metod Mühendislik - Uzman Ekip ve Deneyimli Profesyoneller",
  description:
    "Metod Mühendislik&apos;in deneyimli ekibi: Uzman mühendisler, teknik ekip ve yönetim kadrosu. 20+ yıllık sektör deneyimi ile kaliteli hizmet sunuyoruz.",
  keywords:
    "Metod Mühendislik ekibi, uzman mühendisler, teknik ekip, elektrik pano uzmanları, endüstriyel üretim ekibi",
  openGraph: {
    title: "Ekibimiz | Metod Mühendislik",
    description:
      "20+ yıllık deneyimle elektrik pano ve endüstriyel üretim alanında uzman ekibimizle tanışın.",
    type: "website",
    locale: "tr_TR",
  },
};

// Ekip üyeleri verisi (Gerçek verilerle güncellenebilir)
const teamMembers = [
  {
    id: 1,
    name: "Yönetim Ekibi",
    position: "Genel Müdürlük",
    description:
      "20+ yıllık sektör deneyimi ile şirketin stratejik yönetimi ve gelişimi konusunda liderlik yapmaktadır.",
    icon: "👔",
  },
  {
    id: 2,
    name: "Mühendislik Ekibi",
    position: "Elektrik Mühendisleri",
    description:
      "Elektrik pano tasarımı, marin pano projeleri ve endüstriyel çözümler konusunda uzmanlaşmış mühendislerden oluşmaktadır.",
    icon: "⚡",
  },
  {
    id: 3,
    name: "Üretim Ekibi",
    position: "Üretim Müdürü ve Teknisyenler",
    description:
      "CNC lazer kesim, büküm, kaynak ve montaj operasyonlarında deneyimli teknik ekibimiz.",
    icon: "🔧",
  },
  {
    id: 4,
    name: "Kalite Kontrol Ekibi",
    position: "Kalite Mühendisleri",
    description:
      "ISO 9001 kalite standartlarına uygunluk denetimi ve üretim süreçlerinin kalite kontrolünden sorumludur.",
    icon: "✅",
  },
  {
    id: 5,
    name: "Proje Yönetimi",
    position: "Proje Yöneticileri",
    description:
      "Müşteri projelerinin planlanması, takibi ve zamanında teslimatından sorumlu profesyonel ekibimiz.",
    icon: "📋",
  },
  {
    id: 6,
    name: "Satış ve Pazarlama",
    position: "Satış ve Pazarlama Ekibi",
    description:
      "Yurt içi ve yurt dışı müşteri ilişkileri, teklif hazırlama ve pazarlama faaliyetlerini yürütmektedir.",
    icon: "📞",
  },
];

export default function Ekibimiz() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/metod.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-blue-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Ekip
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Ekibimiz
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                20+ yıllık deneyime sahip, uzman ve deneyimli ekibimizle tanışın. 
                Her birimiz, kaliteli hizmet sunmak için çalışıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Ekip Tanıtım */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Deneyimli ve Uzman Ekibimiz
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                Metod Mühendislik, elektrik pano üretimi ve endüstriyel çözümler alanında 
                uzmanlaşmış, deneyimli ve dinamik bir ekibe sahiptir. Her bir ekip üyemiz, 
                müşterilerimize en iyi hizmeti sunmak için sürekli gelişim ve eğitim alanında 
                kendini yenilemektedir.
              </p>
            </div>

            {/* Ekip Üyeleri Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group"
                >
                  {/* Avatar/Kart Başlık */}
                  <div className="bg-gradient-to-br from-blue-600 to-slate-900 text-white p-8 text-center">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {member.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                    <p className="text-blue-200 font-semibold">{member.position}</p>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <p className="text-slate-700 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ekip Değerleri */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Ekip Kültürümüz ve Değerlerimiz
                </h2>
                <p className="text-slate-700 text-lg max-w-3xl mx-auto">
                  Ekibimiz, ortak değerler etrafında birleşmiş, müşteri memnuniyeti ve 
                  kaliteli üretim odaklı çalışmaktadır.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Uzmanlık",
                    description: "Sektörde derinlemesine bilgi ve deneyim",
                    icon: "🎓",
                  },
                  {
                    title: "İşbirliği",
                    description: "Takım çalışması ve uyum içinde çalışma",
                    icon: "🤝",
                  },
                  {
                    title: "İnovasyon",
                    description: "Sürekli gelişim ve yenilikçi çözümler",
                    icon: "💡",
                  },
                  {
                    title: "Güvenilirlik",
                    description: "Zamanında teslimat ve sözünde durma",
                    icon: "⚡",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all text-center"
                  >
                    <div className="text-5xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-6xl mx-auto">
              {[
                {
                  number: "20+",
                  label: "Yıllık Deneyim",
                  icon: "⭐",
                },
                {
                  number: "50+",
                  label: "Uzman Ekip Üyesi",
                  icon: "👥",
                },
                {
                  number: "ISO 9001",
                  label: "Kalite Sertifikası",
                  icon: "🏆",
                },
                {
                  number: "2000m²",
                  label: "Üretim Alanı",
                  icon: "🏭",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <div className="text-4xl md:text-5xl mb-4">{stat.icon}</div>
                  <p className="text-3xl md:text-4xl font-black text-blue-400 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              Ekibimize Katılmak İster misiniz?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Yetenekli ve deneyimli profesyonelleri aramıza katılmaya davet ediyoruz.
            </p>
            <a
              href="mailto:info@metodmuhendislik.com?subject=İş Başvurusu"
              className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
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
              İş Başvurusu Yap
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


