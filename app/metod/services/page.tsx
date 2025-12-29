import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import ServiceManager from "./components/ServiceManager";

export default async function AdminServicesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
                  Hizmet Yönetimi
                </h1>
                <p className="text-sm text-slate-600">
                  Navbar&apos;daki hizmetler menüsünü yönetin
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <ServiceManager />
      </main>
    </div>
  );
}

