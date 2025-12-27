"use client";

import { useEffect, useState } from "react";

interface KatalogViewerProps {
  katalogUrl: string;
  katalogFileName: string;
}

export default function KatalogViewer({ katalogUrl, katalogFileName }: KatalogViewerProps) {
  const [pdfViewerUrl, setPdfViewerUrl] = useState<string | null>(null);

  useEffect(() => {
    // Client-side'da dinamik URL oluştur
    // Önce direkt PDF URL'yi dene
    setPdfViewerUrl(katalogUrl);
  }, [katalogUrl]);

  const handleNewTab = () => {
    window.open(katalogUrl, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = katalogUrl;
    link.download = katalogFileName.replace(/\s/g, "-");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:scale-105 text-sm md:text-base"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="hidden sm:inline">Kataloğu İndir</span>
        <span className="sm:hidden">İndir</span>
      </button>
      <button
        onClick={handleNewTab}
        className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all text-sm md:text-base"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <span className="hidden sm:inline">Yeni Sekmede Aç</span>
        <span className="sm:hidden">Aç</span>
      </button>
    </div>
  );
}

