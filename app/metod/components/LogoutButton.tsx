"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/metod/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/metod/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
    >
      Çıkış Yap
    </button>
  );
}

