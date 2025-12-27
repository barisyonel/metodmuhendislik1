"use client";

import Image from "next/image";

interface KatalogPDFViewerProps {
  katalogUrl: string;
  katalogFileName: string;
}

export default function KatalogPDFViewer({ katalogUrl, katalogFileName }: KatalogPDFViewerProps) {
  const handlePreviewClick = () => {
    window.open(katalogUrl, "_blank");
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = katalogUrl;
    link.download = katalogFileName.replace(/\s/g, "-");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-slate-300 shadow-xl bg-gradient-to-br from-slate-50 to-white" style={{ minHeight: "calc(100vh - 350px)" }}>
      {/* Katalog Görsel Önizleme - Tıklanabilir */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 cursor-pointer group"
        onClick={handlePreviewClick}
      >
        {/* Katalog Görseli */}
        <div className="relative w-full max-w-5xl mb-6 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/katalog.png"
              alt="Metod Mühendislik Katalog Önizleme - Tıklayarak görüntüle"
              fill
              className="object-contain bg-white"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xl font-bold">Kataloğu görüntülemek için tıklayın</span>
                </div>
                <p className="text-center text-sm text-white/90">PDF formatında kataloğu yeni sekmede aç</p>
              </div>
            </div>
          </div>
          
          {/* Tıklama İkonu */}
          <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg group-hover:bg-blue-700 group-hover:scale-110 transition-all z-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePreviewClick();
            }}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105 text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Kataloğu Görüntüle
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Kataloğu İndir
          </button>
        </div>

        {/* Bilgi Rozetleri */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            PDF Formatında
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Hazır ve İndirilebilir
          </span>
        </div>
      </div>
    </div>
  );
}
