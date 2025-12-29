"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Slider {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  video_url: string | null;
  link: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export default function SliderManager() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    image_url: "",
    sort_order: 0,
    is_active: true,
  });

  // Slider'ları yükle
  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = async () => {
    try {
      const response = await fetch("/api/metod/sliders");
      const data = await response.json();
      if (data.success) {
        setSliders(data.data || []);
      }
    } catch (error) {
      console.error("Slider'lar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Görsel yükleme
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya tipi kontrolü
    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin!");
      return;
    }

    // Dosya boyutu kontrolü (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Dosya boyutu 10MB'dan büyük olamaz!");
      return;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/metod/upload-slider", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image_url: data.url }));
        alert("Görsel başarıyla Cloudinary'ye yüklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Görsel yüklenirken bir hata oluştu!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };




  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url) {
      alert("Lütfen bir görsel seçin!");
      return;
    }

    try {
      const url = editingSlider
        ? `/api/metod/sliders/${editingSlider.id}`
        : "/api/metod/sliders";
      const method = editingSlider ? "PUT" : "POST";

      // Sadece görsel ve temel alanları gönder
      const submitData = {
        title: editingSlider?.title || "Slider",
        subtitle: editingSlider?.subtitle || "",
        description: editingSlider?.description || "",
        image_url: formData.image_url,
        video_url: editingSlider?.video_url || null,
        link: editingSlider?.link || "",
        color: editingSlider?.color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        sort_order: formData.sort_order,
        is_active: formData.is_active,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (data.success) {
        loadSliders();
        resetForm();
        alert(editingSlider ? "Slider güncellendi!" : "Slider eklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Slider sil
  const handleDelete = async (id: number) => {
    if (!confirm("Bu slider'ı silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/metod/sliders/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        loadSliders();
        alert("Slider silindi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData({
      image_url: slider.image_url,
      sort_order: slider.sort_order || 0,
      is_active: slider.is_active !== undefined ? slider.is_active : true,
    });
    setShowForm(true);
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      image_url: "",
      sort_order: 0,
      is_active: true,
    });
    setEditingSlider(null);
    setShowForm(false);
  };

  // Sıralamayı güncelle
  const handleSortOrderChange = async (id: number, newOrder: number) => {
    try {
      const slider = sliders.find((s) => s.id === id);
      if (!slider) return;

      const response = await fetch(`/api/metod/sliders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...slider, sort_order: newOrder }),
      });

      const data = await response.json();
      if (data.success) {
        loadSliders();
      }
    } catch {
      alert("Sıralama güncellenirken hata oluştu!");
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
      {/* Slider Ekle Butonu */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">
          Slider&apos;lar ({sliders.length})
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
        >
          + Yeni Slider Ekle
        </button>
      </div>


      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                {editingSlider ? "Slider Düzenle" : "Yeni Slider Ekle"}
              </h3>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Görsel Yükleme */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Görsel (Cloudinary) *
                </label>
                <div className="space-y-3">
                  {formData.image_url && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-blue-400 shadow-lg">
                      <Image
                        src={formData.image_url}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized={formData.image_url.startsWith("http")}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white cursor-pointer hover:border-blue-500 transition-colors"
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Yükleniyor...</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-500">
                    Görsel Cloudinary&apos;ye yüklenecektir (Max: 10MB)
                  </p>
                </div>
              </div>

              {/* Sıralama */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Aktif/Pasif */}
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Pasif</option>
                  </select>
                </div>
              </div>

              {/* Form Butonları */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  {editingSlider ? "Güncelle" : "Ekle"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold transition-all"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slider Listesi */}
      {sliders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-slate-500">Henüz slider eklenmemiş.</p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-bold"
          >
            İlk slider&apos;ı ekleyin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sliders
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((slider) => (
              <div
                key={slider.id}
                className={`bg-white rounded-xl border-2 ${
                  slider.is_active
                    ? "border-green-200"
                    : "border-slate-200 opacity-60"
                } overflow-hidden shadow-lg`}
              >
                {/* Görsel */}
                <div className="relative w-full h-48 bg-slate-100">
                  {slider.image_url ? (
                    <Image
                      src={slider.image_url}
                      alt={slider.title || `Slider ${slider.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={slider.image_url.startsWith("http") || slider.image_url.startsWith("/")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <p className="text-sm font-bold">Görsel Yok</p>
                        <p className="text-xs mt-1">Slider görseli eklenmemiş</p>
                      </div>
                    </div>
                  )}
                  {!slider.is_active && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      Pasif
                    </div>
                  )}
                  {slider.is_active && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      Aktif
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-slate-900 mb-1">
                        {slider.title}
                      </h3>
                      {slider.subtitle && (
                        <p className="text-sm text-blue-600 font-semibold mb-2">
                          {slider.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {slider.description}
                      </p>
                    </div>
                  </div>

                  {/* Sıralama */}
                  <div className="mb-4 flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-600">
                      Sıralama:
                    </label>
                    <input
                      type="number"
                      value={slider.sort_order}
                      onChange={(e) =>
                        handleSortOrderChange(
                          slider.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                  </div>

                  {/* Link */}
                  {slider.link && (
                    <p className="text-xs text-slate-500 mb-2">
                      Link: <span className="font-mono">{slider.link}</span>
                    </p>
                  )}

                  {/* Video Durumu */}
                  {slider.video_url ? (
                    <div className="mb-4 p-2 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-xs font-bold text-green-700 mb-1">
                        ✓ Video Eklendi
                      </p>
                      <p className="text-xs text-green-600 truncate">
                        {slider.video_url}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                      <p className="text-xs font-bold text-yellow-700">
                        ⚠️ Video Yok
                      </p>
                    </div>
                  )}

                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(slider)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(slider.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}


