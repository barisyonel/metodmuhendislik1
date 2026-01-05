import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
