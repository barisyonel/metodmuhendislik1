import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Metod Mühendislik",
  description:
    "Metod Mühendislik KVKK Aydınlatma Metni. Kişisel verilerin korunması hakkında bilgilendirme ve aydınlatma metni.",
  keywords: "KVKK, kişisel verilerin korunması, aydınlatma metni, gizlilik",
};

export default function KVKKPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-blue-200 text-lg">
              Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  1. Veri Sorumlusu
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
                  kişisel verileriniz aşağıda belirtilen kapsamda işlenmektedir.
                </p>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-2">Veri Sorumlusu:</p>
                  <p className="text-slate-700">Metod Mühendislik Sanayi ve Ticaret Limited Şirketi</p>
                  <p className="text-slate-700 mt-2">Adres: İTOSB SANAYİ BÖLGESİ 3. YOL NO:21, TEPEÖREN - AKFİRAT, TUZLA, İSTANBUL</p>
                  <p className="text-slate-700">Telefon: 0 216 759 56 75</p>
                  <p className="text-slate-700">E-posta: info@metodmuhendislik.com</p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  2. İşlenen Kişisel Veriler ve İşleme Amaçları
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                  <li>Müşteri ilişkileri yönetimi ve iletişim süreçlerinin yürütülmesi</li>
                  <li>Teklif hazırlama, proje takibi ve hizmet sunumu</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>İş süreçlerinin planlanması ve yürütülmesi</li>
                  <li>Müşteri memnuniyeti değerlendirme ve iyileştirme çalışmaları</li>
                  <li>Pazarlama ve tanıtım faaliyetlerinin yürütülmesi (açık rıza ile)</li>
                  <li>Web sitesi ziyaret istatistiklerinin takibi</li>
                </ul>
                <p className="text-slate-700 leading-relaxed">
                  İşlenen kişisel veriler arasında kimlik bilgileri, iletişim bilgileri,
                  müşteri işlem bilgileri, müşteri işlem güvenlik bilgileri, pazarlama
                  bilgileri ve web sitesi kullanım bilgileri yer almaktadır.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  3. Kişisel Verilerin İşlenme Yöntemi ve Hukuki Sebebi
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen işleme
                  şartları ve amaçları kapsamında, yasal mevzuata uygun olarak işlenmektedir.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Hukuki sebepler: Sözleşmenin kurulması veya ifası, yasal yükümlülüğün
                  yerine getirilmesi, meşru menfaatlerimiz, açık rızanız ve yasal
                  yükümlülüklerimizdir.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  4. Kişisel Verilerin Aktarılması
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Kişisel verileriniz, yasal yükümlülüklerimizin yerine getirilmesi,
                  hizmet kalitesinin artırılması ve yasal zorunlulukların karşılanması
                  amacıyla:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2">
                  <li>Yasal zorunluluklar çerçevesinde kamu kurum ve kuruluşlarına</li>
                  <li>Hizmet sağlayıcılarımıza (hosting, e-posta servisleri vb.)</li>
                  <li>İş ortaklarımıza (yasal sınırlar içinde)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  5. Kişisel Verilerin Toplanma Yöntemi
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verileriniz, sözleşmeler, başvuru formları, web sitesi formları,
                  e-posta, telefon, WhatsApp, sosyal medya platformları ve diğer iletişim
                  kanalları üzerinden toplanmaktadır.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  6. Kişisel Verilerin Saklama Süresi
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal
                  saklama yükümlülüklerimiz kapsamında saklanmaktadır. İşleme amacının sona
                  ermesi veya saklama süresinin dolması halinde, kişisel verileriniz KVKK
                  ve ilgili mevzuat hükümlerine uygun olarak silinmekte, yok edilmekte veya
                  anonim hale getirilmektedir.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  7. Veri Sahibinin Hakları
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  KVKK&apos;nın 11. maddesi uyarınca, kişisel veri sahibi olarak aşağıdaki
                  haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                  <li>Düzeltme, silme, yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                  <li>Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                  <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                </ul>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-slate-900 font-semibold mb-2">
                    Başvuru Yöntemi:
                  </p>
                  <p className="text-slate-700 mb-2">
                    Yukarıda belirtilen haklarınızı kullanmak için yazılı başvurunuzu, kimlik
                    tespiti yapılabilecek şekilde, aşağıdaki adrese iletebilirsiniz:
                  </p>
                  <p className="text-slate-700">
                    <strong>E-posta:</strong> info@metodmuhendislik.com<br />
                    <strong>Posta:</strong> İTOSB SANAYİ BÖLGESİ 3. YOL NO:21, TEPEÖREN - AKFİRAT, TUZLA, İSTANBUL
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  8. İletişim
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  KVKK kapsamındaki haklarınız ve kişisel verilerinizin işlenmesi hakkında
                  sorularınız için bizimle iletişime geçebilirsiniz.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  <strong>Son Güncelleme:</strong> 26 Aralık 2025
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
