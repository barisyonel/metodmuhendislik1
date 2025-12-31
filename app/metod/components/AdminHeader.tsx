"use client";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function AdminHeader() {
  const router = useRouter();

  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Right side - User actions */}
        <div className="flex items-center gap-4 ml-auto">
          <button
            onClick={() => window.open("/", "_blank")}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
          >
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Siteyi Görüntüle
          </button>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
