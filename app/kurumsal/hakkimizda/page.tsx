import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Metod Mühendislik - Elektrik Pano Üretimi ve Endüstriyel Çözümler",
  description:
    "Metod Mühendislik, 20+ yıllık deneyimiyle İstanbul Tuzla&apos;daki modern tesisimizde elektrik pano üretimi, marin pano, CNC lazer kesim ve endüstriyel üretim hizmetleri sunmaktadır. ISO 9001 kalite sertifikası ile güvenilir çözüm ortağınız.",
  keywords:
    "Metod Mühendislik, hakkımızda, şirket tarihçesi, İstanbul elektrik pano, Tuzla üretim tesisi, ISO 9001, endüstriyel üretim, 20 yıllık deneyim",
  openGraph: {
    title: "Hakkımızda | Metod Mühendislik",
    description:
      "20+ yıllık deneyimle İstanbul&apos;da elektrik pano ve endüstriyel üretim çözümleri sunan Metod Mühendislik hakkında bilgi edinin.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function Hakkimizda() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/elektrıkpano.png')] bg-cover bg-center"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block text-blue-200 font-black text-xs tracking-[0.4em] uppercase mb-4 px-4 py-1.5 bg-blue-900/30 rounded-full">
                Şirketimiz
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Hakkımızda
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Modern dünyanın en temel ihtiyacı olan enerjinin, güvenli, verimli ve sürdürülebilir bir şekilde yönetilmesi
              </p>
            </div>
          </div>
        </section>

        {/* Ana Tanıtım */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  Biz Kimiz
                </h2>
                <p className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
                  Modern dünyanın en temel ihtiyacı olan enerjinin, güvenli, verimli ve sürdürülebilir bir şekilde yönetilmesi, mühendislik sanatının en kritik alanlarından biridir. <strong>Metod Mühendislik</strong> olarak bizler, 20+ yıllık deneyimimizle, enerjinin olduğu her yerde güveni ve kaliteyi inşa etmek amacıyla faaliyet gösteriyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Kurulduğumuz ilk günden bu yana, sadece bir pano üreticisi olmayı değil, aynı zamanda elektrik taahhüt ve enerji yönetimi sektöründe güvenilir bir çözüm ortağı olmayı hedefledik. Bugün geldiğimiz noktada, akademik seviyedeki uzman teknik kadromuz, sahadaki dinamikleri bilen deneyimli satış ekibimiz ve endüstri 4.0 standartlarına uyumlu güçlü altyapımız ile sektörümüzde hak ettiğimiz lider konumu korumanın gururunu yaşıyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  <strong>Metod Mühendislik</strong>, yerelden evrensele uzanan vizyonuyla, Türkiye&apos;deki sanayi kuruluşlarından dünyanın en zorlu coğrafyalarındaki enerji santrallerine kadar geniş bir yelpazede hizmet vermektedir. Alçak gerilim panolarından otomasyon sistemlerine kadar uzanan geniş ürün gamımızla, elektriğin güvenle dağıtılmasını, kontrol edilmesini ve yönetilmesini sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tarihçe */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                Tarihçe ve Kuruluş Hikayemiz
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600">
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    10+ yıllık deneyimimiz, elektrik pano üretimi konusunda hizmet vermek ve sektöre mühendislik tabanlı, kalite odaklı bir yaklaşım getirmek amacıyla kurulan şirketimizin, geçen süre zarfında istikrarlı bir büyüme grafiği çizdiğinin en somut kanıtıdır.
                  </p>
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    Kuruluşumuzun ilk yıllarında yerel projelere odaklanarak kazandığımız saha tecrübesi, sonraki yıllarda bizi uluslararası arenaya taşıyan en büyük gücümüz olmuştur. &quot;20+ yıllık tecrübe&quot; söylemimiz, sadece geçen zamanı değil, bu zaman dilimine sığdırılan yüzlerce başarılı projeyi, çözülen binlerce teknik sorunu ve kazanılan sayısız müşteri memnuniyetini ifade eder.
                  </p>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    Bugün <strong>Metod Mühendislik</strong>; sadece metal ve kablodan oluşan sistemler üretmemekte, aynı zamanda geçmişten gelen tecrübesini bugünün teknolojisiyle harmanlayarak geleceğin enerji altyapılarını kurmaktadır. Yerli üretim bandımızdan çıkan her ürün, Türk mühendisliğinin ve işçiliğinin kalitesini dünyaya taşıyan birer elçi niteliğindedir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Üretim Felsefesi */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              Üretim Felsefemiz ve Teknik Yetkinliklerimiz
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong>Metod Mühendislik</strong> olarak üretim felsefemizin temelinde &quot;Sıfır Hata&quot; ve &quot;Tam Güvenlik&quot; ilkeleri yatmaktadır. Elektrik panoları, bir tesisin kalbi niteliğindedir ve bu kalbin durması, tüm operasyonun durması anlamına gelir. Bu bilinçle, IEC 61439-1/2 uluslararası standartlarına tam uyum sağlayan belgeli ürünlerimizle sektörde fark yaratıyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  Üretim ve hizmet yelpazemiz, endüstrinin tüm ihtiyaçlarını karşılayacak çeşitliliğe sahiptir:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      A. Alçak Gerilim Panoları (ADP)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Ana Dağıtım Panoları (ADP), enerjinin tesise girdiği ve dağıtıldığı en kritik noktalardır. Yüksek kısa devre akımlarına dayanıklı, termal yönetim başarısı yüksek ve modüler yapıda ürettiğimiz ADP çözümlerimiz, tesislerin enerji sürekliliğini garanti altına alır.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      B. Motor Kontrol Merkezleri (MCC Panoları)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Endüstriyel tesislerin kas gücü olan motorların kontrolü, MCC panolarımızla sağlanır. Sabit veya çekmeceli tipte tasarladığımız MCC panolarımız, motorların güvenli yol almasını, korunmasını ve otomasyon sistemleriyle entegre çalışmasını sağlar.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      C. Kompanzasyon Panoları
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Enerji verimliliği ve maliyet yönetimi açısından kritik olan reaktif güç kontrolü, uzmanlık alanlarımızdan biridir. Tasarladığımız kompanzasyon panoları ile işletmelerin enerji cezası ödemesinin önüne geçiyor, şebeke kalitesini artırıyor ve sistem ömrünü uzatıyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      D. Otomasyon ve DDC Panoları
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Endüstri 4.0 ve akıllı bina sistemlerinin beyni olan Otomasyon ve DDC (Direct Digital Control) panolarımız, karmaşık süreçlerin insan hatasından bağımsız, hassas ve verimli bir şekilde yönetilmesini sağlar. PLC, SCADA ve HMI altyapılarına uygun çözümlerimizle süreçleri dijitalleştiriyoruz.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-slate-50 rounded-xl p-6 border-2 border-red-200 md:col-span-2">
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      E. Marin Panoları (Gemi Elektrik Panoları)
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Denizcilik sektörü için özel olarak tasarlanan marin panolarımız, tuzlu su ortamına, yüksek nem ve titreşime dayanıklı özel malzemelerle üretilmektedir. Denizcilik standartlarına (IEC 60092) tam uyumlu panolarımız, gemilerin enerji güvenliğini garanti altına alır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kalite Yönetimi */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                 Kalite Yönetimi ve Standartlar
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  &quot;Kalite, kontrol edilmez; üretilir.&quot; felsefesiyle hareket eden <strong>Metod Mühendislik</strong>, tüm organizasyon yapısını TS ISO 9001:2015 Kalite Yönetim Sistemi Standardı gerekleri doğrultusunda yapılandırmıştır. Bu sadece duvarda asılı bir belge değil, satın almadan sevkiyata, tasarımdan montaja kadar işleyen canlı bir sistemdir.
                </p>
                <p className="text-slate-700 text-lg font-semibold mb-4">
                  Tasarım ve imalat süreçlerimizde uyguladığımız kalite prosedürleri şunları kapsar:
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Projelendirme:</strong> E-Plan ve güncel CAD yazılımları ile hatasız elektriksel ve mekanik tasarım.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Malzeme Seçimi:</strong> Sadece uluslararası geçerliliği olan, sertifikalı ve test edilmiş şalt malzeme kullanımı.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Elektro Montaj:</strong> Uzman teknisyenlerimiz tarafından, kablo kesit hesaplarına ve bağlantı tork değerlerine sadık kalınarak yapılan titiz montaj.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Test ve Doğrulama:</strong> Üretimi tamamlanan her panonun, sevkiyat öncesi rutin testlerden (İzolasyon testi, Dielektrik testi, Fonksiyon testi vb.) geçirilmesi ve raporlanması.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* İhracat */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
               Global Güç: İhracat ve Uluslararası Başarılar
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong>Metod Mühendislik</strong>, Türkiye&apos;deki güçlü konumunun yanı sıra, dünya genelinde aranan bir marka haline gelmiştir. &quot;Sınır Tanımayan Enerji&quot; mottomuzla, bugün 12&apos;den fazla ülkeye aktif ihracat gerçekleştiriyoruz.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Global pazarın devleri ile yürüttüğümüz iş ortaklıkları, firmamızın uluslararası standartlara uyum yeteneğinin en somut kanıtıdır. İhracat yaptığımız ülkelerin çeşitliliği, farklı iklim koşullarına, farklı teknik regülasyonlara ve farklı lojistik zorluklara karşı adaptasyon yeteneğimizi göstermektedir.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    İhracat Haritamız
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Profesyonel iş ortaklığı kurduğumuz ve Türk bayrağını gururla dalgalandırdığımız ülkeler arasında çok geniş bir coğrafya bulunmaktadır. Bu çeşitlilik, <strong>Metod Mühendislik</strong>&apos;in -40 derecedeki Sibirya soğuğundan, +50 derecedeki Afrika sıcağına kadar her türlü ortamda çalışabilecek dayanıklılıkta panolar üretebildiğinin mühendislik kanıtıdır.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">Avrasya ve Ortadoğu</h4>
                      <p className="text-sm text-slate-600">Rusya, Azerbaycan, Kazakistan, Irak, Dubai, Suudi Arabistan</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">Afrika</h4>
                      <p className="text-sm text-slate-600">Libya, Cezayir, Tanzanya, Senegal, Mozambik</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">Avrupa ve Diğer</h4>
                      <p className="text-sm text-slate-600">İsviçre gibi kalite standartlarının zirvede olduğu ülkeler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">
                 Projeler ve İstatistiklerle Metod Mühendislik
              </h2>
              <p className="text-center text-slate-700 text-lg mb-8 max-w-3xl mx-auto">
                Rakamlar yalan söylemez. <strong>Metod Mühendislik</strong>&apos;in başarısı, tamamladığı projelerin niceliği ve niteliği ile ölçülebilir durumdadır.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    number: "20+",
                    label: "Yıllık Deneyim",
                    description: "Sektörde lider konum",
                    icon: "⭐",
                  },
                  {
                    number: "2000m²",
                    label: "Üretim Alanı",
                    description: "Modern tesisler",
                    icon: "🏭",
                  },
                  {
                    number: "12",
                    label: "Ülkeye İhracat",
                    description: "Uluslararası standart",
                    icon: "🌍",
                  },
                  {
                    number: "ISO",
                    label: "9001 Sertifikalı",
                    description: "Kalite garantisi",
                    icon: "🏆",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all text-center"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <p className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                      {stat.number}
                    </p>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-slate-600">{stat.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <p className="text-slate-700 text-lg leading-relaxed text-center">
                  Zengin ürün yelpazesi, dinamik iş gücü ve yüksek kapasiteli yerli üretim bandımız sayesinde, senede ortalama <strong>50+ büyük ölçekli proje</strong> tamamlamaktayız. Her bir proje; dizayn, projelendirme, elektro montaj ve satış sonrası destek hizmeti dahil olmak üzere anahtar teslim (turn-key) mantığıyla yönetilmektedir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İnsan Kaynakları */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
              İnsan Kaynakları ve Uzman Kadrosu
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  Teknoloji ne kadar ilerlerse ilerlesin, farkı yaratan insandır. <strong>Metod Mühendislik</strong>&apos;in en büyük sermayesi, akademik seviyedeki uzman teknik kadrosudur. Mühendislerimiz, teknikerlerimiz ve idari personelimiz, sürekli eğitim ve gelişim programlarıyla desteklenmektedir.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Ar-Ge Mühendisleri
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Sektörel yenilikleri takip eden Ar-Ge odaklı mühendislerden oluşan ekibimiz
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Montaj Teknisyenleri
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      El işçiliğini sanatla birleştiren montaj teknisyenlerinden oluşan deneyimli kadromuz
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Satış Ekibi
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Müşteri ihtiyaçlarını doğru analiz eden deneyimli satış ekibimiz
                    </p>
                  </div>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Bu güçlü kadro yapısı, projelerin zamanında, bütçesinde ve teknik şartnamelere tam uygun olarak teslim edilmesini sağlayan en önemli faktördür.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Satış Sonrası Destek */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                 Satış Sonrası Destek ve Müşteri Memnuniyeti
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  Bizim için proje, pano sevk edildiğinde bitmez; sistem güvenle çalıştığı sürece devam eder. <strong>Metod Mühendislik</strong>, satış sonrası destek hizmeti konusunda sektörün en hızlı ve çözüm odaklı firmalarından biridir.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Panolarımızın devreye alınması, süpervizörlük hizmetleri, periyodik bakım ve olası arıza durumlarında <strong>7/24 teknik destek</strong> sağlama yeteneğimiz, müşterilerimizin bizi tercih etmesindeki en büyük etkendir. İster İstanbul&apos;da bir fabrika, ister Senegal&apos;de bir maden tesisi olsun; <strong>Metod Mühendislik</strong> kalitesi her zaman ulaşılabilir durumdadır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vizyon */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center">
                 Vizyon ve Gelecek Hedefleri
              </h2>
              <div className="space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  Geleceğe bakışımız net: Elektrik panosu ve enerji yönetimi sektöründe, teknolojiyi takip eden değil, teknolojiye yön veren bir marka olmak.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Endüstri 4.0
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Endüstri 4.0 uyumlu, uzaktan izlenebilir ve yönetilebilir &quot;Akıllı Pano&quot; (Smart Panel) sistemlerinde pazar payımızı artırmak
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-slate-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Yenilenebilir Enerji
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Yenilenebilir enerji (Güneş, Rüzgar, Biyokütle) santrallerine yönelik özel çözümlerimizi çeşitlendirmek
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Global Marka
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      İhracat yaptığımız ülke sayısını 12&apos;den 20&apos;ye çıkararak global marka bilinirliğimizi artırmak
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      Sürdürülebilirlik
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Karbon ayak izimizi düşürerek, sürdürülebilir ve çevre dostu üretim tekniklerini geliştirmek
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sonuç */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                 Sonuç
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                <strong>Metod Mühendislik</strong>; 20+ yıllık deneyimi, uluslararası sertifikaları, güçlü mühendislik altyapısı ve %100 müşteri memnuniyeti odaklı çalışma prensibiyle, enerjinizin en güvenilir bekçisidir.
              </p>
              <p className="text-lg text-blue-200 leading-relaxed mb-8">
                Rusya&apos;nın soğuğundan Afrika&apos;nın sıcağına, İsviçre&apos;nin hassas standartlarından Papua Yeni Gine&apos;nin zorlu sahalarına kadar; elektriğin olduğu her yerde biz varız.
              </p>
              <p className="text-xl font-bold text-white mb-8">
                Projelerinizde çözüm ortağınız olmak, enerjinize güç katmak için buradayız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/905425786060?text=Merhaba,%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp ile Teklif Al
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
