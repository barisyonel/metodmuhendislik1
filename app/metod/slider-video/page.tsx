import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import VideoManager from "./components/VideoManager";

export default async function AdminSliderVideoPage() {
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
              <a href="/metod" className="text-blue-600 hover:text-blue-700">
                ← Dashboard&apos;a Dön
              </a>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  🎥 Slider Video Yönetimi
                </h1>
                <p className="text-sm text-slate-600">
                  Slider&apos;lara video ekleyin veya çıkarın (Sağ Alt Köşe)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <VideoManager />
      </main>
    </div>
  );
}

