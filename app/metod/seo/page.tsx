import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

export default async function AdminSEOPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/metod" className="text-blue-600 hover:text-blue-700">
                ← Dashboard&apos;a Dön
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">SEO Yönetimi</h1>
                <p className="text-sm text-slate-600">SEO ayarlarını yönetin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">SEO Durumu</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-green-900">Meta Etiketleri</h3>
                  <p className="text-sm text-green-700">Ürünler için otomatik oluşturuluyor</p>
                </div>
                <span className="text-green-600 font-bold">✓ Aktif</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-green-900">OpenGraph</h3>
                  <p className="text-sm text-green-700">Sosyal medya paylaşımları için hazır</p>
                </div>
                <span className="text-green-600 font-bold">✓ Aktif</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-green-900">Structured Data</h3>
                  <p className="text-sm text-green-700">JSON-LD formatında mevcut</p>
                </div>
                <span className="text-green-600 font-bold">✓ Aktif</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">SEO İpuçları</h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Ürün eklerken başlık ve açıklama alanlarını doldurun</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Meta açıklamalar otomatik oluşturuluyor (160 karakter limiti)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Görseller Cloudinary&apos;de optimize ediliyor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>H1/H2 hiyerarşisi sayfalarda mevcut</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

