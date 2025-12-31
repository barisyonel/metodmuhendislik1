import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllProjects } from "@/app/lib/data";
import ProjectManager from "./components/ProjectManager";
import AdminLayout from "../components/AdminLayout";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProjectsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/metod/login");
  }

  // ✅ Server Component - Veritabanından direkt çekiyoruz, API route'a gerek yok!
  const projects = await getAllProjects();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Proje Yönetimi
        </h1>
        <p className="text-slate-600">
          Projeleri ekleyin, düzenleyin ve görsel galerileri yönetin
        </p>
      </div>
      <ProjectManager initialProjects={projects} />
    </AdminLayout>
  );
}
