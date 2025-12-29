"use client";
import { useState, useEffect } from "react";

interface Service {
  id: number;
  name: string;
  href: string;
  icon: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean | number;
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    href: "",
    icon: "⚡",
    description: "",
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/metod/services?all=true");
      const data = await response.json();
      if (data.success) {
        setServices(Array.isArray(data.data) ? data.data : []);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Hizmetler yüklenirken hata:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.href.trim()) {
      alert("❌ İsim ve link zorunludur!");
      return;
    }

    setSaving(true);
    try {
      const url = editingService
        ? `/api/metod/services/${editingService.id}`
        : "/api/metod/services";
      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.message || "Sunucu hatası");
      }

      const data = await response.json();
      if (data.success) {
        await loadServices();
        resetForm();
        alert(editingService ? "✅ Hizmet başarıyla güncellendi!" : "✅ Hizmet başarıyla eklendi!");
      } else {
        throw new Error(data.message || "Bilinmeyen hata");
      }
    } catch (error) {
      console.error("Hizmet kaydetme hatası:", error);
      const errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
      alert(`❌ Hata: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/metod/services/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        loadServices();
        alert("✅ Hizmet silindi!");
      } else {
        alert("❌ Hata: " + data.message);
      }
    } catch {
      alert("❌ Bir hata oluştu!");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name || "",
      href: service.href || "",
      icon: service.icon || "⚡",
      description: service.description || "",
      sort_order: service.sort_order || 0,
      is_active: service.is_active === true || service.is_active === 1,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      href: "",
      icon: "⚡",
      description: "",
      sort_order: 0,
      is_active: true,
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleSortOrderChange = async (id: number, newOrder: number) => {
    try {
      const service = services.find((s) => s.id === id);
      if (!service) return;

      const response = await fetch(`/api/metod/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, sort_order: newOrder }),
      });

      const data = await response.json();
      if (data.success) {
        loadServices();
      }
    } catch {
      alert("❌ Sıralama güncellenirken hata oluştu!");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-slate-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">
          Hizmetler ({services.length})
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
        >
          + Yeni Hizmet Ekle
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                {editingService ? "Hizmet Düzenle" : "Yeni Hizmet Ekle"}
              </h3>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  <span className="text-red-500">*</span> Hizmet Adı
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Örn: Elektrik Pano Üretimi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  <span className="text-red-500">*</span> Link (URL)
                </label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/hizmetler/elektrik-pano-uretime"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  İkon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="⚡"
                  maxLength={2}
                />
                <p className="text-xs text-slate-500 mt-1">Bir emoji seçin (örn: ⚡, 🔧, 🎨)</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Kısa açıklama..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Durum
                  </label>
                  <select
                    value={formData.is_active ? "1" : "0"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.value === "1",
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">✅ Aktif</option>
                    <option value="0">❌ Pasif</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : editingService ? (
                    "💾 Güncelle"
                  ) : (
                    "➕ Ekle"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-6 py-3 rounded-lg font-bold transition-all"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <div className="text-6xl mb-4">🔧</div>
          <p className="text-slate-500 text-lg font-bold mb-2">Henüz hizmet eklenmemiş</p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            + İlk Hizmeti Ekle
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            📋 Mevcut Hizmetler ({services.length})
          </h3>
          <div className="space-y-3">
            {services
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                    service.is_active === true || service.is_active === 1
                      ? "border-green-200 bg-green-50"
                      : "border-slate-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl">{service.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{service.name}</h4>
                    <p className="text-sm text-slate-600">{service.description || "Açıklama yok"}</p>
                    <p className="text-xs text-slate-500 mt-1">{service.href}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={service.sort_order || 0}
                      onChange={(e) =>
                        handleSortOrderChange(service.id, parseInt(e.target.value) || 0)
                      }
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      ✏️ Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}


