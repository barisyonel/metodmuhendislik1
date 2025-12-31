"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FixEncodingContent() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
    products?: Array<{
      id: number;
      title: string;
      description: string;
      category: string;
    }>;
  } | null>(null);
  const router = useRouter();

  const checkEncoding = async () => {
    try {
      setChecking(true);
      setResult(null);
      const response = await fetch("/api/metod/fix-encoding");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Kontrol edilirken hata oluştu",
      });
    } finally {
      setChecking(false);
    }
  };

  const fixEncoding = async () => {
    if (
      !confirm(
        "Bu işlem veritabanındaki tüm bozuk Türkçe karakterleri düzeltecek. Devam etmek istediğinizden emin misiniz?",
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      const response = await fetch("/api/metod/fix-encoding", {
        method: "POST",
      });
      const data = await response.json();
      setResult(data);

      if (data.success) {
        // 3 saniye sonra sayfayı yenile
        setTimeout(() => {
          router.refresh();
        }, 3000);
      }
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error ? error.message : "Düzeltilirken hata oluştu",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          <strong>⚠️ Uyarı:</strong> Bu işlem veritabanındaki bozuk Türkçe
          karakterleri düzeltecektir. İşlemden önce veritabanınızın yedeğini
          almanız önerilir.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <button
          onClick={checkEncoding}
          disabled={checking || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-sm hover:shadow-md"
        >
          {checking ? "Kontrol Ediliyor..." : "Bozuk Karakterleri Kontrol Et"}
        </button>

        <button
          onClick={fixEncoding}
          disabled={loading || checking}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold ml-4 transition-all shadow-sm hover:shadow-md"
        >
          {loading ? "Düzeltiliyor..." : "Tüm Bozuk Karakterleri Düzelt"}
        </button>
      </div>

      {result && (
        <div
          className={`rounded-xl p-6 mb-6 ${
            result.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              result.success ? "text-green-800" : "text-red-800"
            }`}
          >
            {result.success ? "✅ Başarılı" : "❌ Hata"}
          </h2>
          <p
            className={`mb-4 ${
              result.success ? "text-green-700" : "text-red-700"
            }`}
          >
            {result.message}
          </p>

          {result.count !== undefined && (
            <p className="text-sm text-gray-600">
              Düzeltilen kayıt sayısı: <strong>{result.count}</strong>
            </p>
          )}

          {result.products && result.products.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Bozuk karakter içeren ürünler:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.products.map((p) => (
                  <li key={p.id}>
                    <strong>#{p.id}</strong>: {p.title?.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-900">
          Nasıl Çalışır?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-700">
          <li>
            <strong>Kontrol Et:</strong> Veritabanında bozuk Türkçe karakter
            içeren ürünleri bulur
          </li>
          <li>
            <strong>Düzelt:</strong> Double-encoded karakterleri (örn: `Ã§` →
            `ç`, `Ä±` → `ı`) düzeltir
          </li>
          <li>
            <strong>Sonuç:</strong> Düzeltilen kayıt sayısını gösterir
          </li>
        </ol>
      </div>
    </div>
  );
}
