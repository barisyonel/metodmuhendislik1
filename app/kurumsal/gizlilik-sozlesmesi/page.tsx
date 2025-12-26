import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi | Metod Mühendislik",
  description:
    "Metod Mühendislik Gizlilik Sözleşmesi. Web sitemizi kullanırken verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi.",
  keywords: "gizlilik sözleşmesi, gizlilik politikası, veri koruma",
};

export default function GizlilikSozlesmesiPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Gizlilik Sözleşmesi
            </h1>
            <p className="text-blue-200 text-lg">
              Verilerinizin Korunması ve Gizlilik Politikamız
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  1. Genel Bilgiler
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Metod Mühendislik Sanayi ve Ticaret Limited Şirketi (&quot;Metod Mühendislik&quot;,
                  &quot;biz&quot;, &quot;bizim&quot;) olarak, web sitemizi ziyaret eden kullanıcılarımızın
                  gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik Sözleşmesi, web sitemizi
                  kullanırken toplanan bilgilerin nasıl toplandığını, kullanıldığını, paylaşıldığını
                  ve korunduğunu açıklamaktadır.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Web sitemizi kullanarak, bu Gizlilik Sözleşmesi&apos;ndeki koşulları kabul
                  etmiş sayılırsınız. Bu sözleşmeyi kabul etmiyorsanız, lütfen web sitemizi
                  kullanmayın.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  2. Toplanan Bilgiler
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Web sitemizi kullanırken aşağıdaki bilgiler toplanabilir:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      2.1. Doğrudan Sağladığınız Bilgiler
                    </h3>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                      <li>İletişim formlarında sağladığınız ad, soyad, e-posta adresi, telefon numarası</li>
                      <li>Teklif talebi formlarında sağladığınız iş bilgileri</li>
                      <li>E-posta iletişimlerinde paylaştığınız bilgiler</li>
                      <li>Sosyal medya platformları üzerinden gönderdiğiniz mesajlar</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      2.2. Otomatik Olarak Toplanan Bilgiler
                    </h3>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                      <li>IP adresi ve tarayıcı bilgileri</li>
                      <li>Ziyaret edilen sayfalar ve ziyaret süreleri</li>
                      <li>Tarayıcı türü ve işletim sistemi bilgileri</li>
                      <li>Referans URL (hangi web sitesinden geldiğiniz)</li>
                      <li>Çerezler (Cookies) aracılığıyla toplanan bilgiler</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  3. Bilgilerin Kullanım Amacı
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Hizmetlerimiz hakkında bilgi sağlamak ve müşteri taleplerini yanıtlamak</li>
                  <li>Teklif hazırlama ve proje takibi süreçlerini yürütmek</li>
                  <li>Web sitemizin iyileştirilmesi ve kullanıcı deneyiminin geliştirilmesi</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                  <li>Güvenlik önlemlerinin alınması ve dolandırıcılığın önlenmesi</li>
                  <li>İstatistiksel analizler ve raporlama</li>
                  <li>Pazarlama ve tanıtım faaliyetleri (açık rızanız ile)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  4. Çerezler (Cookies)
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz
                  etmek amacıyla çerezler kullanmaktadır. Çerezler, web sitesini ziyaret
                  ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır.
                </p>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Kullandığımız Çerez Türleri:
                  </h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>
                      <strong>Gerekli Çerezler:</strong> Web sitesinin temel işlevlerinin
                      çalışması için zorunludur.
                    </li>
                    <li>
                      <strong>Analitik Çerezler:</strong> Web sitesinin nasıl kullanıldığını
                      anlamamıza yardımcı olur.
                    </li>
                    <li>
                      <strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlar ve
                      kullanıcı deneyimini kişiselleştirir.
                    </li>
                  </ul>
                  <p className="text-slate-700 mt-4">
                    Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz.
                    Ancak bu, web sitesinin bazı özelliklerinin düzgün çalışmamasına neden olabilir.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  5. Bilgilerin Paylaşılması
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kişisel bilgileriniz, aşağıdaki durumlar dışında üçüncü kişilerle paylaşılmaz:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Yasal yükümlülüklerimizin yerine getirilmesi için</li>
                  <li>Hizmet sağlayıcılarımıza (hosting, e-posta servisleri vb.) - sadece hizmet sunumu için gerekli olan bilgiler</li>
                  <li>İş ortaklarımıza - yasal sınırlar içinde ve gerekli güvenlik önlemleri alınarak</li>
                  <li>Açık rızanız ile</li>
                  <li>Yasal zorunluluklar veya mahkeme kararları gereğince</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Bilgilerinizi paylaştığımız üçüncü taraflar, bu bilgileri yalnızca belirtilen
                  amaçlar için kullanır ve gizliliğini korur.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  6. Veri Güvenliği
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel bilgilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemleri
                  almaktayız. Bu önlemler arasında şifreleme, güvenlik duvarları, erişim kontrolleri
                  ve düzenli güvenlik denetimleri yer almaktadır. Ancak, internet üzerinden hiçbir
                  veri aktarımının %100 güvenli olmadığını ve bu nedenle mutlak güvenlik garantisi
                  veremeyeceğimizi belirtmek isteriz.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  7. Veri Saklama Süresi
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel bilgileriniz, işleme amacının gerektirdiği süre boyunca ve yasal
                  saklama yükümlülüklerimiz kapsamında saklanmaktadır. Bu süre sona erdiğinde,
                  bilgileriniz güvenli bir şekilde silinir veya anonim hale getirilir.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  8. Haklarınız
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Kişisel verilerinize erişim talep etme</li>
                  <li>Hatalı verilerin düzeltilmesini isteme</li>
                  <li>Verilerinizin silinmesini talep etme</li>
                  <li>Veri işlemeye itiraz etme</li>
                  <li>Veri taşınabilirliği talep etme</li>
                  <li>Rızanızı geri çekme</li>
                </ul>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mt-4">
                  <p className="text-slate-900 font-semibold mb-2">
                    Haklarınızı kullanmak için:
                  </p>
                  <p className="text-slate-700">
                    <strong>E-posta:</strong> info@metodmuhendislik.com<br />
                    <strong>Telefon:</strong> 0 216 759 56 75<br />
                    <strong>Adres:</strong> İTOSB SANAYİ BÖLGESİ 3. YOL NO:21, TEPEÖREN - AKFİRAT, TUZLA, İSTANBUL
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  9. Üçüncü Taraf Linkler
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Web sitemizde üçüncü taraf web sitelerine linkler bulunabilir. Bu linklere
                  tıkladığınızda, o web sitelerinin gizlilik politikaları geçerli olacaktır.
                  Üçüncü taraf web sitelerinin gizlilik uygulamalarından sorumlu değiliz.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  10. Değişiklikler
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Bu Gizlilik Sözleşmesi zaman zaman güncellenebilir. Önemli değişiklikler
                  yapıldığında, web sitemizde veya e-posta yoluyla sizi bilgilendireceğiz.
                  Güncel sürümü kontrol etmek için bu sayfayı düzenli olarak ziyaret etmenizi
                  öneririz.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  11. İletişim
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Gizlilik Sözleşmesi veya veri işleme uygulamalarımız hakkında sorularınız,
                  endişeleriniz veya talepleriniz için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <p className="text-slate-900 font-semibold mb-2">Metod Mühendislik</p>
                  <p className="text-slate-700">İTOSB SANAYİ BÖLGESİ 3. YOL NO:21</p>
                  <p className="text-slate-700">TEPEÖREN - AKFİRAT, TUZLA, İSTANBUL</p>
                  <p className="text-slate-700 mt-2">Telefon: 0 216 759 56 75</p>
                  <p className="text-slate-700">E-posta: info@metodmuhendislik.com</p>
                  <p className="text-slate-700 mt-4">
                    <strong>Son Güncelleme:</strong> 26 Aralık 2025
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
