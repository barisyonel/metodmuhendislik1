import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllServices } from "@/app/lib/data";
import ServiceManager from "./components/ServiceManager";
import AdminLayout from "../components/AdminLayout";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminServicesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  // ✅ Server Component - Veritabanından direkt çekiyoruz, API route'a gerek yok!
  const services = await getAllServices();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Hizmet Yönetimi
        </h1>
        <p className="text-slate-600">
          Navbar&apos;daki hizmetler menüsünü ekleyin, düzenleyin ve yönetin
        </p>
      </div>
      <ServiceManager initialServices={services} />
    </AdminLayout>
  );
}
