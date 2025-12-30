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
  is_active: boolean | number;
}

export default function SliderManager() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    image_url: "",
    sort_order: 0,
    is_active: true,
  });
  
  // Video yönetimi state'leri
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [savingVideo, setSavingVideo] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  // Slider'ları yükle
  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/metod/sliders");
      const data = await response.json();
      if (data.success) {
        const slidersData = Array.isArray(data.data) ? data.data : [];
        console.log("Yüklenen slider'lar:", slidersData.length);
        setSliders(slidersData);
        
        // Mevcut video URL'ini bul (ilk aktif slider'dan)
        const activeSliderWithVideo = slidersData.find(
          (s: Slider) => {
            const isActive = s.is_active === true || s.is_active === 1;
            return isActive && s.video_url;
          }
        );
        if (activeSliderWithVideo) {
          setCurrentVideoUrl(activeSliderWithVideo.video_url);
          setVideoPreview(activeSliderWithVideo.video_url);
        } else {
          setCurrentVideoUrl(null);
          setVideoPreview("");
        }
        
        // Veritabanı bağlantı uyarısı varsa göster
        if (data.warning) {
          console.warn("⚠️", data.warning);
        }
      } else {
        console.error("Slider yükleme hatası:", data.message);
        setSliders([]);
      }
    } catch (error) {
      console.error("Slider'lar yüklenirken hata:", error);
      setSliders([]);
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      
      if (data.success && data.url) {
        const imageUrl = data.url;
        console.log("✅ Görsel URL'i alındı:", imageUrl);
        
        // State'i güncelle - hem formData hem de imagePreview
        const updatedFormData = { ...formData, image_url: imageUrl };
        setFormData(updatedFormData);
        setImagePreview(imageUrl);
        
        console.log("✅ State güncellendi - image_url:", imageUrl);
        console.log("✅ State güncellendi - formData:", updatedFormData);
        
        alert("✅ Görsel başarıyla Cloudinary'ye yüklendi! Artık 'Ekle' butonuna basabilirsiniz.");
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

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Görsel URL'ini kontrol et - hem imagePreview hem de formData'dan
    const currentImageUrl = imagePreview || formData.image_url;
    console.log("🔍 Form submit kontrolü:");
    console.log("  - imagePreview:", imagePreview);
    console.log("  - formData.image_url:", formData.image_url);
    console.log("  - currentImageUrl:", currentImageUrl);
    
    if (!currentImageUrl || currentImageUrl.trim() === '') {
      alert("❌ Lütfen bir görsel yükleyin!\n\nGörsel seçtikten sonra:\n1. 'Cloudinary'ye yükleniyor...' mesajını bekleyin\n2. '✅ Görsel başarıyla yüklendi!' mesajını görün\n3. Görsel önizlemesinin göründüğünü kontrol edin\n4. Sonra 'Ekle' butonuna basın");
      return;
    }

    if (!currentImageUrl.startsWith('http')) {
      alert("❌ Görsel URL'i geçersiz! Lütfen görseli tekrar yükleyin.");
      return;
    }

    setSaving(true);
    try {
      const url = editingSlider
        ? `/api/metod/sliders/${editingSlider.id}`
        : "/api/metod/sliders";
      const method = editingSlider ? "PUT" : "POST";

      // Görsel URL'ini tekrar kontrol et
      const finalImageUrl = imagePreview || formData.image_url;
      if (!finalImageUrl || !finalImageUrl.trim()) {
        alert("❌ Görsel URL'i bulunamadı! Lütfen görseli tekrar yükleyin.");
        return;
      }
      
      const submitData = {
        title: editingSlider?.title || "Slider",
        subtitle: editingSlider?.subtitle || "",
        description: editingSlider?.description || "",
        image_url: finalImageUrl.trim(),
        video_url: editingSlider?.video_url || null,
        link: editingSlider?.link || "",
        color: editingSlider?.color || "from-blue-600/50 via-blue-700/50 to-slate-900/60",
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active !== undefined ? formData.is_active : true,
      };

      console.log("Slider kaydediliyor:", submitData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.message || "Sunucu hatası");
      }

      const data = await response.json();
      if (data.success) {
        await loadSliders();
        resetForm();
        const message = editingSlider ? "✅ Slider başarıyla güncellendi!" : "✅ Slider başarıyla eklendi!";
        alert(message + "\n\nNot: Arayüzdeki slider'lar otomatik olarak güncellenecektir (5 saniye içinde).");
        
        // Frontend'i tetiklemek için window'a event gönder (eğer aynı tab'daysa)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('slider-updated'));
        }
      } else {
        throw new Error(data.message || "Bilinmeyen hata");
      }
    } catch (error) {
      console.error("Slider kaydetme hatası:", error);
      let errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
      
      // Veritabanı bağlantı hatası için özel mesaj
      if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("connection") || errorMsg.includes("bağlantı")) {
        errorMsg = "Veritabanı bağlantısı kurulamadı!\n\nLütfen:\n1. Docker'ın çalıştığından emin olun\n2. MySQL container'ının çalıştığını kontrol edin\n3. Tekrar deneyin";
      }
      
      alert(`❌ Hata: ${errorMsg}\n\nGörsel Cloudinary'ye yüklendi ancak veritabanına kaydedilemedi.`);
    } finally {
      setSaving(false);
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
        alert("✅ Slider silindi!");
      } else {
        alert("❌ Hata: " + data.message);
      }
    } catch {
      alert("❌ Bir hata oluştu!");
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData({
      image_url: slider.image_url,
      sort_order: slider.sort_order || 0,
      is_active: slider.is_active !== undefined ? (slider.is_active === true || slider.is_active === 1) : true,
    });
    setImagePreview(slider.image_url);
    setShowForm(true);
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      image_url: "",
      sort_order: 0,
      is_active: true,
    });
    setImagePreview("");
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
      alert("❌ Sıralama güncellenirken hata oluştu!");
    }
  };

  // Video yükleme
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya tipi kontrolü
    if (!file.type.startsWith("video/")) {
      alert("Lütfen bir video dosyası seçin!");
      return;
    }

    // Dosya boyutu kontrolü (50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Video boyutu 50MB'dan büyük olamaz!");
      return;
    }

    setUploadingVideo(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/metod/upload-slider-video", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Video upload response:", data);
      
      if (data.success && data.url) {
        const videoUrl = data.url;
        setVideoPreview(videoUrl);
        alert("✅ Video başarıyla Cloudinary'ye yüklendi! Artık 'Kaydet' butonuna basabilirsiniz.");
      } else {
        const errorMsg = data.message || "Video yüklenirken bir hata oluştu";
        console.error("Video upload error response:", data);
        alert(`❌ Hata: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Video upload error:", error);
      const errorMsg = error instanceof Error ? error.message : "Video yüklenirken bir hata oluştu";
      alert(`Hata: ${errorMsg}`);
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  };

  // Video'yu tüm aktif slider'lara kaydet
  const handleSaveVideo = async () => {
    const finalVideoUrl = videoPreview;
    if (!finalVideoUrl || finalVideoUrl.trim() === '' || !finalVideoUrl.startsWith('http')) {
      alert("❌ Lütfen geçerli bir video yükleyin (URL 'http' ile başlamalıdır)!");
      return;
    }

    // Aktif slider'ları bul
    const activeSliders = sliders.filter((s) => s.is_active === true || s.is_active === 1);
    
    if (activeSliders.length === 0) {
      alert("❌ Aktif slider bulunamadı! Önce en az bir slider'ı aktif yapın.");
      return;
    }

    setSavingVideo(true);
    try {
      // Tüm aktif slider'ları güncelle
      const updatePromises = activeSliders.map((slider) =>
        fetch(`/api/metod/sliders/${slider.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...slider,
            video_url: finalVideoUrl.trim(),
          }),
        })
      );

      const responses = await Promise.all(updatePromises);
      const results = await Promise.all(responses.map((r) => r.json()));

      const allSuccess = results.every((r) => r.success);
      if (allSuccess) {
        await loadSliders();
        setCurrentVideoUrl(finalVideoUrl);
        
        // Frontend'i tetikle
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('slider-updated'));
        }
        
        alert(`✅ Video başarıyla ${activeSliders.length} aktif slider'a kaydedildi!\n\nArayüzdeki slider'lar otomatik olarak güncellenecektir.`);
      } else {
        throw new Error("Bazı slider'lar güncellenemedi");
      }
    } catch (error) {
      console.error("Video kaydetme hatası:", error);
      const errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
      alert(`❌ Hata: ${errorMsg}`);
    } finally {
      setSavingVideo(false);
    }
  };

  // Video'yu sil
  const handleDeleteVideo = async () => {
    if (!confirm("Video'yu tüm slider'lardan silmek istediğinize emin misiniz?")) {
      return;
    }

    // Aktif slider'ları bul
    const activeSliders = sliders.filter((s) => s.is_active === true || s.is_active === 1);
    
    if (activeSliders.length === 0) {
      alert("❌ Aktif slider bulunamadı!");
      return;
    }

    setSavingVideo(true);
    try {
      // Tüm aktif slider'lardan video'yu kaldır
      const updatePromises = activeSliders.map((slider) =>
        fetch(`/api/metod/sliders/${slider.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...slider,
            video_url: null,
          }),
        })
      );

      const responses = await Promise.all(updatePromises);
      const results = await Promise.all(responses.map((r) => r.json()));

      const allSuccess = results.every((r) => r.success);
      if (allSuccess) {
        await loadSliders();
        setVideoPreview("");
        setCurrentVideoUrl(null);
        
        // Frontend'i tetikle
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('slider-updated'));
        }
        
        alert(`✅ Video başarıyla ${activeSliders.length} aktif slider'dan silindi!`);
      } else {
        throw new Error("Bazı slider'lar güncellenemedi");
      }
    } catch (error) {
      console.error("Video silme hatası:", error);
      const errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
      alert(`❌ Hata: ${errorMsg}`);
    } finally {
      setSavingVideo(false);
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
      {/* Video Yönetimi Bölümü */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              🎥 Slider Video Yönetimi
            </h2>
            <p className="text-sm text-slate-600">
              Slider&apos;ın sağ alt köşesinde görünecek video&apos;yu yönetin
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Mevcut Video */}
          {currentVideoUrl && (
            <div className="bg-white rounded-lg p-4 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="font-bold text-slate-900">Mevcut Video</span>
                </div>
                <button
                  onClick={handleDeleteVideo}
                  disabled={savingVideo}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  🗑️ Video&apos;yu Sil
                </button>
              </div>
              <video
                src={currentVideoUrl}
                controls
                className="w-full h-auto rounded-lg max-h-64 bg-slate-900"
              >
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
              <p className="text-xs text-slate-500 mt-2 font-mono truncate" title={currentVideoUrl}>
                {currentVideoUrl}
              </p>
            </div>
          )}

          {/* Video Yükleme */}
          <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              <span className="text-red-500">*</span> Yeni Video Yükle (10-15 saniye önerilir)
            </label>
            
            {videoPreview && videoPreview.trim() !== '' ? (
              <div className="mb-4">
                <div className="relative w-full rounded-lg overflow-hidden border-2 border-green-400 shadow-lg bg-slate-100">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-auto max-h-64"
                  >
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                    ✓ Video Yüklendi
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center mb-4">
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-2">Video önizlemesi</p>
                  <p className="text-slate-300 text-xs">Video yüklendikten sonra burada görünecek</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="file"
                  id="slider-video-input"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleVideoUpload}
                  disabled={uploadingVideo || savingVideo}
                  className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white cursor-pointer hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploadingVideo && (
                  <div className="absolute top-3 right-4 flex items-center gap-2 text-sm text-purple-600 bg-white/90 px-2 py-1 rounded">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span>Cloudinary&apos;ye yükleniyor...</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveVideo}
                  disabled={savingVideo || uploadingVideo || !videoPreview || videoPreview.trim() === ''}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {savingVideo ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    "💾 Video&apos;yu Kaydet"
                  )}
                </button>
                {videoPreview && (
                  <button
                    onClick={() => {
                      setVideoPreview("");
                    }}
                    disabled={savingVideo || uploadingVideo}
                    className="bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 px-6 py-3 rounded-lg font-bold transition-all"
                  >
                    Temizle
                  </button>
                )}
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50 p-3 rounded border border-blue-200">
                <span className="text-blue-600 font-bold">ℹ️</span>
                <div>
                  <p>• Video Cloudinary&apos;ye otomatik yüklenecektir</p>
                  <p>• Maksimum dosya boyutu: 50MB</p>
                  <p>• Desteklenen formatlar: MP4, WebM, OGG, MOV</p>
                  <p>• Video tüm aktif slider&apos;lara kaydedilecektir</p>
                  <p>• Arayüzde slider&apos;ın sağ alt köşesinde görünecektir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  <span className="text-red-500">*</span> Slider Görseli (Zorunlu)
                </label>
                <div className="space-y-3">
                  {imagePreview && imagePreview.trim() !== '' ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-green-400 shadow-lg bg-slate-100">
                      <Image
                        src={imagePreview}
                        alt="Slider Preview"
                        fill
                        className="object-cover"
                        unoptimized={true}
                        onError={(e) => {
                          console.error("Görsel önizleme hatası:", imagePreview);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log("✅ Görsel önizleme başarıyla yüklendi:", imagePreview);
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        ✓ Görsel Yüklendi
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono max-w-[80%] truncate">
                        {imagePreview}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-slate-400 text-sm mb-2">Görsel önizlemesi</p>
                        <p className="text-slate-300 text-xs">Görsel yüklendikten sonra burada görünecek</p>
                      </div>
                    </div>
                  )}
                  <div className="relative">
                  <input
                    type="file"
                      id="slider-image-input"
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
                    {!imagePreview && !uploading && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                        ⚠️ Lütfen bir görsel seçin. Görsel Cloudinary&apos;ye yüklendikten sonra &quot;Ekle&quot; butonuna basabilirsiniz.
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-blue-600 font-bold">ℹ️</span>
                    <div>
                      <p>• Görsel Cloudinary&apos;ye otomatik yüklenecektir</p>
                      <p>• Maksimum dosya boyutu: 10MB</p>
                      <p>• Desteklenen formatlar: JPEG, PNG, WebP</p>
                    </div>
                  </div>
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
                  <p className="text-xs text-slate-500 mt-1">
                    Düşük sayı önce gösterilir
                  </p>
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
                  <p className="text-xs text-slate-500 mt-1">
                    Sadece aktif slider&apos;lar gösterilir
                  </p>
                </div>
              </div>

              {/* Form Butonları */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={saving || uploading || (!imagePreview && !formData.image_url)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                  onClick={(e) => {
                    if (!imagePreview && !formData.image_url) {
                      e.preventDefault();
                      alert("❌ Lütfen önce bir görsel yükleyin! Görsel seçtikten sonra yükleme işleminin tamamlanmasını bekleyin.");
                    }
                  }}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : editingSlider ? (
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

      {/* Slider Listesi */}
      {sliders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-slate-500 text-lg font-bold mb-2">Henüz slider eklenmemiş</p>
          <p className="text-slate-400 text-sm mb-4">İlk slider&apos;ınızı ekleyerek başlayın</p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            + İlk Slider&apos;ı Ekle
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            📋 Mevcut Slider&apos;lar ({sliders.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliders
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((slider) => (
              <div
                key={slider.id}
                className={`bg-white rounded-xl border-2 ${
                  slider.is_active
                      ? "border-green-200 shadow-xl"
                    : "border-slate-200 opacity-60"
                  } overflow-hidden shadow-lg hover:shadow-2xl transition-all`}
              >
                {/* Görsel */}
                  <div className="relative w-full h-64 bg-slate-100 group cursor-pointer">
                    {slider.image_url && slider.image_url.trim() !== '' ? (
                      <>
                    <Image
                      src={slider.image_url}
                          alt={slider.title || `Slider ${slider.id}`}
                      fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized={true}
                          onError={(e) => {
                            console.error("Görsel yüklenemedi:", slider.image_url);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <a
                            href={slider.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            🔍 Tam Boyut Görüntüle
                          </a>
                        </div>
                      </>
                  ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-sm font-bold">Görsel Yok</p>
                        </div>
                    </div>
                  )}
                  {!slider.is_active && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                      Pasif
                    </div>
                  )}
                    {slider.is_active && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        Aktif
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                      #{slider.sort_order}
                    </div>
                </div>

                {/* İçerik */}
                <div className="p-6">
                      <h3 className="text-lg font-black text-slate-900 mb-1">
                      {slider.title || `Slider #${slider.id}`}
                      </h3>
                    <div className="mt-2 p-2 bg-slate-50 rounded text-xs border border-slate-200">
                      <p className="text-slate-500 font-mono truncate" title={slider.image_url}>
                        📷 {slider.image_url || "Görsel URL yok"}
                      </p>
                  </div>

                  {/* Sıralama */}
                    <div className="mb-4 mt-4 flex items-center gap-2">
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

                  {/* Butonlar */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(slider)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    >
                        ✏️ Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(slider.id)}
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
    </div>
  );
}

