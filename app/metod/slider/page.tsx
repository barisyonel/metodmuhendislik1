import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllSliders } from "@/app/lib/data";
import SliderManager from "./components/SliderManager";
import AdminLayout from "../components/AdminLayout";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSliderPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  // ✅ Server Component - Veritabanından direkt çekiyoruz, API route'a gerek yok!
  const sliders = await getAllSliders();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Slider Yönetimi
        </h1>
        <p className="text-slate-600">
          Anasayfadaki hero slider&apos;ları ekleyin, düzenleyin ve yönetin
        </p>
      </div>
      <SliderManager initialSliders={sliders} />
    </AdminLayout>
  );
}
