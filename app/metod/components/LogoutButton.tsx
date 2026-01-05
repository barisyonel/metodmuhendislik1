"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-700 px-3 py-2 rounded-lg text-sm transition-colors"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          <span>Çıkış yapılıyor...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Çıkış</span>
        </>
      )}
    </button>
  );
}
