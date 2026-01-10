"use client";
import { useState } from "react";
import Image from "next/image";
import CloudinaryImagePicker from "../../components/CloudinaryImagePicker";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: string | string[] | null;
  category: string;
  client_name?: string;
  location?: string;
  project_date?: string;
  sort_order?: number;
  is_active?: boolean | number;
}

export default function ProjectManager({ initialProjects = [] }: { initialProjects?: Project[] }) {
  // ✅ Server Component'ten gelen verileri kullan, API route'a gerek yok!
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [showCloudinaryPicker, setShowCloudinaryPicker] = useState(false);
  const [cloudinaryPickerType, setCloudinaryPickerType] = useState<"main" | "gallery">("main");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    client_name: "",
    location: "",
    project_date: "",
    sort_order: 0,
    is_active: true,
  });

  // Sadece refresh için kullan (CRUD işlemlerinden sonra)
  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/metod/projects?t=${Date.now()}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success) {
        const projectsData = Array.isArray(data.data) ? data.data : [];
        console.log("✅ Projeler yenilendi:", projectsData.length);
        setProjects(projectsData);
      } else {
        console.error("Proje yükleme hatası:", data.message);
      }
    } catch (error) {
      console.error("Projeler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Görsel yükleme (ana görsel)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin!");
      return;
    }

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.success && data.url) {
        const imageUrl = data.url;
        setFormData((prev) => ({ ...prev, image_url: imageUrl }));
        setImagePreview(imageUrl);

        // Eğer imageList boşsa, ana görseli ekle
        if (imageList.length === 0) {
          setImageList([imageUrl]);
        } else if (!imageList.includes(imageUrl)) {
          setImageList([imageUrl, ...imageList]);
        }

        alert("✅ Görsel başarıyla Cloudinary'ye yüklendi!");
      } else {
        const errorMsg = data.message || "Görsel yüklenirken bir hata oluştu";
        console.error("Upload error response:", data);
        alert(`❌ Hata: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error instanceof Error ? error.message : "Görsel yüklenirken bir hata oluştu";
      alert(`Hata: ${errorMsg}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Ek görsel yükleme (galeri için)
  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin!");
      return;
    }

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.url) {
        const imageUrl = data.url;
        if (!imageList.includes(imageUrl)) {
          setImageList([...imageList, imageUrl]);
        }
        alert("✅ Ek görsel başarıyla yüklendi!");
      } else {
        const errorMsg = data.message || "Görsel yüklenirken bir hata oluştu";
        alert(`❌ Hata: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error instanceof Error ? error.message : "Görsel yüklenirken bir hata oluştu";
      alert(`Hata: ${errorMsg}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Görseli listeden sil
  const handleRemoveImage = (imageUrl: string) => {
    setImageList(imageList.filter((img) => img !== imageUrl));
    if (imageUrl === imagePreview) {
      setImagePreview(imageList.length > 1 ? imageList[0] : "");
      setFormData((prev) => ({ ...prev, image_url: imageList.length > 1 ? imageList[0] : "" }));
    }
  };

  // Ana görseli seç
  const handleSetMainImage = (imageUrl: string) => {
    setImagePreview(imageUrl);
    setFormData((prev) => ({ ...prev, image_url: imageUrl }));
  };

  // Cloudinary'den görsel seçme
  const handleCloudinarySelect = (imageUrl: string) => {
    if (cloudinaryPickerType === "main") {
      // Ana görsel olarak seç
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image_url: imageUrl }));
    } else {
      // Galeri görseli olarak ekle
      setImageList((prev) => {
        if (prev.includes(imageUrl)) {
          alert("Bu görsel zaten galeride mevcut!");
          return prev;
        }
        return [...prev, imageUrl];
      });
    }
  };

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalImageUrl = imagePreview || formData.image_url;
    if (!finalImageUrl || finalImageUrl.trim() === '' || !finalImageUrl.startsWith('http')) {
      alert("❌ Lütfen geçerli bir ana görsel yükleyin!");
      return;
    }

    if (!formData.title.trim()) {
      alert("❌ Proje başlığı zorunludur!");
      return;
    }

    setSaving(true);
    try {
      const url = editingProject
        ? `/api/metod/projects/${editingProject.id}`
        : "/api/metod/projects";
      const method = editingProject ? "PUT" : "POST";

      // imageList'i düzenle - ana görseli içermeli
      const finalImageList = imageList.length > 0
        ? imageList.includes(finalImageUrl)
          ? imageList
          : [finalImageUrl, ...imageList]
        : [finalImageUrl];

      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim() || "",
        image_url: finalImageUrl.trim(),
        images: finalImageList.length > 1 ? JSON.stringify(finalImageList) : null,
        category: formData.category.trim() || "Genel",
        client_name: formData.client_name.trim() || null,
        location: formData.location.trim() || null,
        project_date: formData.project_date || null,
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active !== undefined ? formData.is_active : true,
      };

      console.log("📤 Proje kaydediliyor:", {
        ...submitData,
        images: finalImageList.length > 1 ? `${finalImageList.length} görsel` : "sadece ana görsel",
      });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      console.log("📡 API yanıtı:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        let errorData: { message?: string; errorCode?: string; errorDetails?: unknown } = {};
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            message: `HTTP ${response.status}: ${response.statusText}`
          };
        }
        console.error("❌ API hatası:", {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
        });

        const errorMessage = errorData.message || `Sunucu hatası: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("📥 API yanıt verisi:", data);

      if (data.success) {
        console.log("✅ Proje başarıyla kaydedildi!");
        await loadProjects();
        resetForm();

        const message = editingProject
          ? "✅ Proje başarıyla güncellendi!\n\nSayfa yenilenecek..."
          : "✅ Proje başarıyla eklendi!\n\nSayfa yenilenecek...";
        alert(message);

        // Frontend'i tetikle ve sayfayı yenile
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.dispatchEvent(new Event('project-updated'));
            window.location.reload();
          }, 1500);
        }
      } else {
        console.error("❌ API başarısız yanıt:", data);
        throw new Error(data.message || "Bilinmeyen hata");
      }
    } catch (error) {
      console.error("❌ Proje kaydetme hatası:", error);
      const errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
      console.error("Hata detayları:", {
        message: errorMsg,
        error: error,
      });
      alert(`❌ Hata: ${errorMsg}\n\nLütfen tarayıcı konsolunu kontrol edin (F12) veya tekrar deneyin.`);
    } finally {
      setSaving(false);
    }
  };

  // Proje sil
  const handleDelete = async (id: number) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/metod/projects/${id}?t=${Date.now()}`, {
        method: "DELETE",
        cache: 'no-store',
      });

      const data = await response.json();
      if (data.success) {
        // Önce state'ten kaldır (anında görünürlük için)
        setProjects(prev => prev.filter(p => p.id !== id));

        // Sonra veritabanından yeniden yükle
        await loadProjects();

        alert("✅ Proje silindi!");

        // Frontend'i tetikle ve sayfayı yenile
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('project-updated'));
          // Sayfayı yenile (tüm sayfalarda güncelleme için)
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        alert("❌ Hata: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      image_url: project.image_url || "",
      category: project.category || "",
      client_name: project.client_name || "",
      location: project.location || "",
      project_date: project.project_date || "",
      sort_order: project.sort_order || 0,
      is_active: project.is_active === true || project.is_active === 1,
    });
    setImagePreview(project.image_url || "");

    // images kolonunu parse et
    let parsedImages: string[] = [];
    if (project.images) {
      if (typeof project.images === 'string') {
        try {
          parsedImages = JSON.parse(project.images);
        } catch {
          parsedImages = [project.images];
        }
      } else if (Array.isArray(project.images)) {
        parsedImages = project.images;
      }
    }
    // Eğer images yoksa ama image_url varsa, onu ekle
    if (parsedImages.length === 0 && project.image_url) {
      parsedImages = [project.image_url];
    }
    setImageList(parsedImages);

    setShowForm(true);
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "",
      client_name: "",
      location: "",
      project_date: "",
      sort_order: 0,
      is_active: true,
    });
    setImagePreview("");
    setImageList([]);
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
                  <span className="text-red-500">*</span> Proje Başlığı
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Örn: Gemiler için Elektrik Panoları"
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
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Proje açıklaması..."
                  rows={4}
                />
              </div>

              {/* Ana Görsel Yükleme */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  <span className="text-red-500">*</span> Ana Görsel (Zorunlu)
                </label>
                <div className="space-y-3">
                  {imagePreview && imagePreview.trim() !== '' ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-green-400 shadow-lg bg-slate-100">
                      <Image
                        src={imagePreview}
                        alt="Project Preview"
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        ✓ Ana Görsel
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-slate-400 text-sm mb-2">Ana görsel önizlemesi</p>
                        <p className="text-slate-300 text-xs">Görsel yüklendikten sonra burada görünecek</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="file"
                        id="project-image-input"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white cursor-pointer hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {uploading && (
                        <div className="absolute top-3 right-4 flex items-center gap-2 text-sm text-blue-600 bg-white/90 px-2 py-1 rounded">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Cloudinary&apos;ye yükleniyor...</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCloudinaryPickerType("main");
                        setShowCloudinaryPicker(true);
                      }}
                      disabled={uploading}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Cloudinary'den Seç
                    </button>
                  </div>
                </div>
              </div>

              {/* Ek Görseller (Galeri) */}
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  📸 Ek Görseller (Galeri - Proje Detay Sayfasında Görünecek)
                </label>
                <div className="space-y-3">
                  {imageList.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {imageList.map((img, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-slate-300">
                            <Image
                              src={img}
                              alt={`Görsel ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized={true}
                            />
                            {img === imagePreview && (
                              <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                                Ana
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              {img !== imagePreview && (
                                <button
                                  type="button"
                                  onClick={() => handleSetMainImage(img)}
                                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-blue-700"
                                >
                                  Ana Yap
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(img)}
                                className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="file"
                        id="project-additional-image-input"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleAdditionalImageUpload}
                        disabled={uploading}
                        className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white cursor-pointer hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {uploading && (
                        <div className="absolute top-3 right-4 flex items-center gap-2 text-sm text-purple-600 bg-white/90 px-2 py-1 rounded">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                          <span>Yükleniyor...</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCloudinaryPickerType("gallery");
                        setShowCloudinaryPicker(true);
                      }}
                      disabled={uploading}
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Cloudinary'den Seç
                    </button>
                  </div>
                  <p className="text-xs text-slate-600">
                    💡 İpucu: Birden fazla görsel ekleyerek proje detay sayfasında görsel galeri oluşturabilirsiniz.
                  </p>
                </div>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Örn: Marin Pano"
                />
              </div>

              {/* Müşteri Adı, Lokasyon, Tarih */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Müşteri Adı
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Müşteri adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Lokasyon"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Proje Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.project_date}
                    onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Sıralama ve Durum */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    📊 Sıralama Numarası
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
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    🔘 Durum
                  </label>
                  <select
                    value={formData.is_active ? "1" : "0"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.value === "1",
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="1">✅ Aktif (Gösterilecek)</option>
                    <option value="0">❌ Pasif (Gizli)</option>
                  </select>
                </div>
              </div>

              {/* Form Butonları */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={saving || uploading || (!imagePreview && !formData.image_url)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : editingProject ? (
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

      {/* Proje Listesi */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <div className="text-6xl mb-4">🏗️</div>
          <p className="text-slate-500 text-lg font-bold mb-2">Henüz proje eklenmemiş</p>
          <p className="text-slate-400 text-sm mb-4">İlk projenizi ekleyerek başlayın</p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            + İlk Projeyi Ekle
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            📋 Mevcut Projeler ({projects.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((project) => (
                <div
                  key={project.id}
                  className={`bg-white rounded-xl border-2 ${
                    project.is_active === true || project.is_active === 1
                      ? "border-green-200 shadow-xl"
                      : "border-slate-200 opacity-60"
                  } overflow-hidden shadow-lg hover:shadow-2xl transition-all`}
                >
                  {/* Görsel */}
                  <div className="relative w-full h-64 bg-slate-100">
                    {project.image_url && project.image_url.trim() !== '' ? (
                      <Image
                        src={project.image_url}
                        alt={project.title || `Proje ${project.id}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🏗️</div>
                          <p className="text-sm font-bold">Görsel Yok</p>
                        </div>
                      </div>
                    )}
                    {project.is_active !== true && project.is_active !== 1 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        Pasif
                      </div>
                    )}
                    {project.is_active === true || project.is_active === 1 ? (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        Aktif
                      </div>
                    ) : null}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                      #{(project.sort_order || 0)}
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 mb-1">
                      {project.title || `Proje #${project.id}`}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                      {project.description || "Açıklama yok"}
                    </p>
                    {project.category && (
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Sıralama */}
                    <div className="mb-4 mt-4 flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600">
                        Sıralama:
                      </label>
                      <input
                        type="number"
                        value={project.sort_order || 0}
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
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Cloudinary Image Picker Modal */}
      <CloudinaryImagePicker
        isOpen={showCloudinaryPicker}
        onClose={() => setShowCloudinaryPicker(false)}
        onSelect={handleCloudinarySelect}
        folder="metod-muhendislik/projects"
        title="Cloudinary'den Görsel Seç"
      />
    </div>
  );
}

