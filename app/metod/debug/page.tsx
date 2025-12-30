"use client";

import { useState, useEffect } from "react";

interface ConnectionDetails {
  test?: number;
  current_time?: string;
  [key: string]: unknown;
}

interface QueryData {
  count?: number;
  [key: string]: unknown;
}

interface DebugInfo {
  connection: { status: string; error?: string; details?: ConnectionDetails };
  tables: { status: string; tables?: string[]; error?: string };
  testQueries: { [key: string]: { status: string; data?: QueryData; error?: string } };
  env: { [key: string]: string | boolean };
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDebugInfo();
  }, []);

  const loadDebugInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/metod/debug-db");
      const data = await response.json();
      setDebugInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Veritabanı Debug</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p>Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Veritabanı Debug</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
            <p className="text-red-800">Hata: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!debugInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Veritabanı Debug</h1>
          <button
            onClick={loadDebugInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Yenile
          </button>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(debugInfo.env).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="font-mono text-sm text-gray-600">{key}:</span>
                <span className="ml-2 font-mono text-sm">
                  {typeof value === "boolean" ? (value ? "✓" : "✗") : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bağlantı Durumu</h2>
          {debugInfo.connection.status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800 font-semibold">✅ Bağlantı Başarılı</p>
              {debugInfo.connection.details && (
                <pre className="mt-2 text-sm text-gray-700">
                  {JSON.stringify(debugInfo.connection.details, null, 2)}
                </pre>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-semibold">❌ Bağlantı Hatası</p>
              <p className="text-red-600 mt-2">{debugInfo.connection.error}</p>
            </div>
          )}
        </div>

        {/* Tables */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tablolar</h2>
          {debugInfo.tables.status === "success" ? (
            <div>
              <p className="text-green-800 font-semibold mb-2">
                ✅ {debugInfo.tables.tables?.length || 0} tablo bulundu
              </p>
              <ul className="list-disc list-inside space-y-1">
                {debugInfo.tables.tables?.map((table) => (
                  <li key={table} className="font-mono text-sm">{table}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-semibold">❌ Tablolar listelenemedi</p>
              <p className="text-red-600 mt-2">{debugInfo.tables.error}</p>
            </div>
          )}
        </div>

        {/* Test Queries */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tablo Veri Sayıları</h2>
          <div className="space-y-4">
            {Object.entries(debugInfo.testQueries).map(([table, result]) => (
              <div
                key={table}
                className={`border rounded p-4 ${
                  result.status === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-semibold">{table}</span>
                  {result.status === "success" ? (
                    <span className="text-green-800 font-semibold">
                      ✅ {result.data?.count || 0} kayıt
                    </span>
                  ) : (
                    <span className="text-red-800 font-semibold">
                      ❌ {result.error}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Çözüm Önerileri */}
        {debugInfo.connection.status === "error" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">
              🔧 Çözüm Önerileri
            </h2>
            <ul className="list-disc list-inside space-y-2 text-yellow-700">
              <li>
                <strong>Local Development:</strong> Docker MySQL container&apos;ının çalıştığından emin olun:
                <code className="block bg-yellow-100 p-2 rounded mt-1">
                  docker-compose up -d
                </code>
              </li>
              <li>
                <strong>Environment Variables:</strong> .env dosyasında DB_HOST, DB_USER, DB_PASSWORD, DB_NAME değerlerini kontrol edin
              </li>
              <li>
                <strong>Production (Vercel):</strong> Remote bir MySQL veritabanı kullanın (PlanetScale, Railway, AWS RDS)
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Vercel Dashboard → Settings → Environment Variables</li>
                  <li>DB_HOST: Remote host adresi (localhost olamaz!)</li>
                  <li>DB_USER, DB_PASSWORD, DB_NAME: Veritabanı bilgileri</li>
                  <li>DB_SSL: true (çoğu remote DB için gerekli)</li>
                </ul>
              </li>
              <li>
                <strong>Environment Check:</strong>{" "}
                <a
                  href="/api/metod/check-env"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  /api/metod/check-env
                </a>{" "}
                endpoint&apos;ini kontrol edin
              </li>
              <li>
                <strong>Test:</strong>{" "}
                <a
                  href="/api/metod/test-db"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  /api/metod/test-db
                </a>{" "}
                endpoint&apos;ini kontrol edin
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

