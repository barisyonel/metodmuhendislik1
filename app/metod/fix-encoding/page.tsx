import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminLayout from "../components/AdminLayout";
import FixEncodingContent from "../components/FixEncodingContent";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FixEncodingPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Türkçe Karakter Düzeltme
        </h1>
        <p className="text-slate-600">
          Veritabanındaki bozuk Türkçe karakterleri kontrol edin ve düzeltin
        </p>
      </div>
      <FixEncodingContent />
    </AdminLayout>
  );
}
