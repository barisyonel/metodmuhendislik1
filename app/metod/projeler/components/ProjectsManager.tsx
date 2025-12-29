"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order: number;
  is_active: boolean;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "Genel",
    client_name: "",
    location: "",
    project_date: "",
    sort_order: 0,
    is_active: true,
  });

  // Projeleri yükle
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/metod/projects");
      const data = await response.json();
      if (data.success) {
        setProjects(data.data || []);
      }
    } catch (error) {
      console.error("Projeler yüklenirken hata:", error);
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

      const response = await fetch("/api/metod/upload-project", {
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

    if (!formData.title || !formData.image_url) {
      alert("Lütfen başlık ve görsel alanlarını doldurun!");
      return;
    }

    try {
      const url = editingProject
        ? `/api/metod/projects/${editingProject.id}`
        : "/api/metod/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          project_date: formData.project_date || null,
          client_name: formData.client_name || null,
          location: formData.location || null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        loadProjects();
        resetForm();
        alert(editingProject ? "Proje güncellendi!" : "Proje eklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Proje sil
  const handleDelete = async (id: number) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/metod/projects/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        loadProjects();
        alert("Proje silindi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      image_url: project.image_url,
      category: project.category || "Genel",
      client_name: project.client_name || "",
      location: project.location || "",
      project_date: project.project_date
        ? new Date(project.project_date).toISOString().split("T")[0]
        : "",
      sort_order: project.sort_order || 0,
      is_active: project.is_active !== undefined ? project.is_active : true,
    });
    setShowForm(true);
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "Genel",
      client_name: "",
      location: "",
      project_date: "",
      sort_order: 0,
      is_active: true,
    });
    setEditingProject(null);
    setShowForm(false);
  };

  // Sıralamayı güncelle
  const handleSortOrderChange = async (id: number, newOrder: number) => {
    try {
      const project = projects.find((p) => p.id === id);
      if (!project) return;

      const response = await fetch(`/api/metod/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, sort_order: newOrder }),
      });

      const data = await response.json();
      if (data.success) {
        loadProjects();
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
      {/* Proje Ekle Butonu */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">
          Projeler ({projects.length})
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
        >
          + Yeni Proje Ekle
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                {editingProject ? "Proje Düzenle" : "Yeni Proje Ekle"}
              </h3>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Başlık */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Proje Başlığı *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Görsel Yükleme */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Görsel (Cloudinary) *
                </label>
                <div className="space-y-3">
                  {formData.image_url && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-300">
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-600">Yükleniyor...</p>
                  )}
                  <p className="text-xs text-slate-500">
                    Görsel Cloudinary&apos;ye yüklenecektir (Max: 10MB)
                  </p>
                </div>
              </div>

              {/* Grid: Kategori, Müşteri, Lokasyon, Tarih */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Örn: Gemiler için Elektrik Panoları"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Müşteri Adı */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Müşteri Adı
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) =>
                      setFormData({ ...formData, client_name: e.target.value })
                    }
                    placeholder="Müşteri firma adı"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Lokasyon */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Örn: İstanbul, Türkiye"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Proje Tarihi */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Proje Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.project_date}
                    onChange={(e) =>
                      setFormData({ ...formData, project_date: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sıralama ve Durum */}
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
                  {editingProject ? "Güncelle" : "Ekle"}
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

      {/* Proje Listesi */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-slate-500">Henüz proje eklenmemiş.</p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-bold"
          >
            İlk projeyi ekleyin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((project) => (
              <div
                key={project.id}
                className={`bg-white rounded-xl border-2 ${
                  project.is_active
                    ? "border-green-200"
                    : "border-slate-200 opacity-60"
                } overflow-hidden shadow-lg`}
              >
                {/* Görsel */}
                <div className="relative w-full h-48 bg-slate-100">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized={project.image_url.startsWith("http")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Görsel Yok
                    </div>
                  )}
                  {!project.is_active && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Pasif
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-black text-slate-900 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Proje Detayları */}
                  <div className="space-y-1 mb-4 text-xs text-slate-500">
                    {project.client_name && (
                      <div className="flex items-center gap-2">
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{project.client_name}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-2">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.project_date && (
                      <div className="flex items-center gap-2">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{new Date(project.project_date).getFullYear()}</span>
                      </div>
                    )}
                  </div>

                  {/* Sıralama */}
                  <div className="mb-4 flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-600">
                      Sıralama:
                    </label>
                    <input
                      type="number"
                      value={project.sort_order}
                      onChange={(e) =>
                        handleSortOrderChange(
                          project.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                  </div>

                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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


