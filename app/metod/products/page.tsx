import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllProducts } from "@/app/lib/data";
import ProductManager from "./components/ProductManager";
import AdminLayout from "../components/AdminLayout";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  // ✅ Server Component - Veritabanından direkt çekiyoruz, API route'a gerek yok!
  const products = await getAllProducts();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Ürün Yönetimi
        </h1>
        <p className="text-slate-600">
          Anasayfadaki ürünleri ekleyin, düzenleyin ve yönetin
        </p>
      </div>
      <ProductManager initialProducts={products} />
    </AdminLayout>
  );
}
