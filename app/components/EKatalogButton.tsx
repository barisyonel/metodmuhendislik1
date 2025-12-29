"use client";

interface EKatalogButtonProps {
  className?: string;
  variant?: "primary" | "secondary";
}

export default function EKatalogButton({ className = "", variant = "primary" }: EKatalogButtonProps) {
  const katalogFileName = "Metod Mühendislik.Katalog.pdf";
  const katalogUrl = `/dokumanlar/${encodeURIComponent(katalogFileName)}`;

  const handleEKatalogClick = () => {
    // Önce yeni sekmede aç
    window.open(katalogUrl, "_blank");
    
    // Sonra otomatik indir
    const link = document.createElement("a");
    link.href = katalogUrl;
    link.download = katalogFileName.replace(/\s/g, "-");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all shadow-lg hover:scale-105";
  
  const variantClasses = variant === "primary"
    ? "bg-blue-600/90 backdrop-blur-md border-2 border-blue-500/80 text-white hover:bg-blue-700/90"
    : "bg-white/10 backdrop-blur-md border-2 border-white/80 text-white hover:bg-white/20";

  // Default padding, className ile override edilebilir
  const defaultPadding = className.includes("px-") || className.includes("py-") || className.includes("p-") 
    ? "" 
    : "px-8 py-4";

  return (
    <button
      onClick={handleEKatalogClick}
      className={`${baseClasses} ${variantClasses} ${defaultPadding} ${className}`}
      aria-label="E-Katalogu aç ve indir"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      E-Katalog
    </button>
  );
}

