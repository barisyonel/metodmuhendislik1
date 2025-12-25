import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";

export default async function AdminBackupPage() {
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
                <h1 className="text-2xl font-black text-slate-900">Yedekleme</h1>
                <p className="text-sm text-slate-600">Veritabanı yedekleme işlemleri</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">Veritabanı Yedekleme</h2>
            <p className="text-slate-600 mb-6">
              Veritabanı yedekleme işlemleri için terminal komutlarını kullanabilirsiniz:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2"># Yedekleme</div>
                <div>npm run db:backup</div>
              </div>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2"># Geri Yükleme</div>
                <div>npm run db:restore</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-black text-slate-900 mb-4">Yedekleme Bilgileri</h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">ℹ️</span>
                <span>Yedekler <code className="bg-slate-100 px-2 py-1 rounded text-sm">backups/</code> klasörüne kaydedilir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">ℹ️</span>
                <span>Düzenli yedekleme yapmanız önerilir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">ℹ️</span>
                <span>Yedekler SQL formatındadır</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

