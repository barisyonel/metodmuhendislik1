import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

export default async function AdminAyarlarPage() {
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
                <h1 className="text-2xl font-black text-slate-900">Site Ayarları</h1>
                <p className="text-sm text-slate-600">Genel site ayarlarını yönetin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">Site Bilgileri</h2>
            <p className="text-slate-600 mb-4">
              Site ayarları şu anda kod içinde yönetiliyor. Gelecekte veritabanı tabanlı yönetim
              eklenecek.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-700">Site Adı</span>
                <span className="text-slate-600">Metod Mühendislik</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-700">E-posta</span>
                <span className="text-slate-600">info@metodmuhendislik.com</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-700">Telefon</span>
                <span className="text-slate-600">0 216 759 56 75</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">Bakım Modu</h2>
            <p className="text-slate-600 mb-4">
              Siteyi bakım moduna almak için <code className="bg-slate-100 px-2 py-1 rounded text-sm">.env.local</code> dosyasına <code className="bg-slate-100 px-2 py-1 rounded text-sm">MAINTENANCE_MODE=true</code> ekleyin.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

