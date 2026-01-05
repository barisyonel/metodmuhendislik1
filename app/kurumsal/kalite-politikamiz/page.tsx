import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalite Politikamız | Metod Mühendislik",
  description:
    "Metod Mühendislik Kalite Politikası. Koşulsuz müşteri memnuniyeti, sıfır hata prensibi ve sürekli iyileştirme yaklaşımımız.",
  keywords: "kalite politikası, kalite yönetimi, ISO standartları, müşteri memnuniyeti",
};

export default function KalitePolitikasi() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Kalite Politikamız
            </h1>
            <p className="text-blue-200 text-lg">
              Müşteri Memnuniyeti ve Sürekli İyileştirme Taahhüdümüz
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-10 rounded-3xl border-2 border-blue-200 mb-10">
                <p className="text-2xl leading-loose italic text-slate-800 font-medium text-center">
                  &quot;Koşulsuz müşteri memnuniyeti ve sıfır hata prensibiyle üretim yapmayı,
                  teknolojik gelişmeleri yakından takip etmeyi taahhüt ediyoruz.&quot;
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Kalite Anlayışımız
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Metod Mühendislik olarak, kaliteyi sadece ürün ve hizmetlerimizde değil,
                  tüm iş süreçlerimizde ve müşteri ilişkilerimizde temel değer olarak
                  görüyoruz. 10+ yıllık deneyimimizle, endüstriyel üretim sektöründe
                  kalitenin öncüsü olmaya devam ediyoruz.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Kalite politikamız, tüm çalışanlarımız tarafından benimsenmiş ve
                  günlük iş akışımızın ayrılmaz bir parçası haline getirilmiştir.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Temel Prensiplerimiz
                </h2>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">
                      1. Müşteri Odaklılık
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Müşterilerimizin ihtiyaçlarını ve beklentilerini ön planda tutar,
                      her projede müşteri memnuniyetini en üst seviyede sağlamayı hedefleriz.
                      Düzenli geri bildirim alır ve sürekli iyileştirme yaparız.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">
                      2. Sıfır Hata Prensibi
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Tüm üretim süreçlerimizde sıfır hata hedefiyle çalışırız. Her aşamada
                      kalite kontrol önlemleri alır, mükemmeliyetçi yaklaşımla üretim yaparız.
                      İlk seferde doğru yapma prensibiyle çalışırız.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">
                      3. Sürekli İyileştirme
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      İş süreçlerimizi, teknolojilerimizi ve hizmet kalitemizi sürekli
                      olarak gözden geçirir ve iyileştiririz. Endüstriyel gelişmeleri yakından
                      takip eder, en güncel teknolojileri kullanırız.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">
                      4. Standartlara Uyum
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Ulusal ve uluslararası standartlara (IEC, ISO vb.) tam uyum
                      sağlarız. Tüm ürünlerimiz ve hizmetlerimiz standart gereksinimlerine
                      uygun olarak üretilir ve teslim edilir.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">
                      5. Ekip Çalışması
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Kalite hedeflerimize ulaşmak için tüm ekip üyelerimizle birlikte
                      çalışırız. Eğitim ve geliştirme programları ile ekibimizin bilgi ve
                      becerilerini sürekli geliştiririz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Kalite Yönetim Sistemimiz
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kalite yönetim sistemimiz, uluslararası standartlara uygun olarak
                  tasarlanmış ve sürekli olarak gözden geçirilmektedir. Sistemimiz
                  şunları kapsar:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                  <li>Proje planlama ve tasarım aşamalarında kalite standartları</li>
                  <li>Ham madde ve malzeme kontrolü</li>
                  <li>Üretim süreçlerinde kalite kontrol noktaları</li>
                  <li>Nihai ürün kalite kontrolü ve test prosedürleri</li>
                  <li>Müşteri geri bildirim sistemleri</li>
                  <li>Düzeltici ve önleyici faaliyetler</li>
                  <li>İç denetim ve sürekli iyileştirme süreçleri</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Teknolojik Gelişmeler
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Endüstriyel üretim teknolojilerindeki gelişmeleri yakından takip eder,
                  yeni teknolojileri işletmemize entegre ederiz. Bu sayede:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Üretim verimliliğimizi artırırız</li>
                  <li>Ürün kalitemizi sürekli yükseltiriz</li>
                  <li>Müşterilerimize daha hızlı ve güvenilir hizmet sunarız</li>
                  <li>Rekabet avantajımızı koruruz</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Kalite Taahhütlerimiz
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Müşterilerimize şu taahhütleri veriyoruz:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Standartlara tam uyumlu ürünler
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Zamanında teslimat garantisi
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Müşteri memnuniyeti odaklı hizmet
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Teknik destek ve danışmanlık
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Sürekli iyileştirme çalışmaları
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200">
                    <p className="text-slate-700 font-semibold">
                      ✓ Şeffaf iletişim ve raporlama
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Sonuç
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Kalite politikamız, tüm çalışanlarımız ve iş ortaklarımız için
                  rehber niteliğindedir. Bu politika doğrultusunda, müşterilerimize
                  en yüksek kalitede ürün ve hizmet sunmayı, sektörde öncü konumumuzu
                  korumayı ve sürekli gelişmeyi hedefliyoruz.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Kalite konusundaki taahhütlerimiz, günlük çalışma hayatımızın
                  temelini oluşturur ve tüm kararlarımızda öncelikli olarak
                  değerlendirilir.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}