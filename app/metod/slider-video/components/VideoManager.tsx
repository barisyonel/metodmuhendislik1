"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function VideoManager() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState<string | null>(null);
  const [sliders, setSliders] = useState<any[]>([]);

  useEffect(() => {
    loadCurrentVideo();
  }, []);

  // Mevcut videoyu yükle (ilk aktif slider'dan)
  const loadCurrentVideo = async () => {
    try {
      const response = await fetch("/api/metod/sliders");
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setSliders(data.data || []);
        // İlk aktif slider'dan video URL'ini al
        const activeSliderWithVideo = data.data.find(
          (s: any) => s.is_active && s.video_url
        );
        if (activeSliderWithVideo) {
          setVideoUrl(activeSliderWithVideo.video_url);
        } else {
          setVideoUrl(null);
        }
      }
    } catch (error) {
      console.error("Video yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Video yükleme
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Lütfen bir video dosyası seçin!");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Video boyutu 50MB'dan büyük olamaz!");
      return;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/metod/upload-slider-video", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success && data.url) {
        // Video Cloudinary'ye yüklendi, önizleme için state'e kaydet
        setNewVideoUrl(data.url);
        alert("✅ Video Cloudinary'ye yüklendi! Lütfen 'Kaydet' butonuna tıklayarak slider'lara ekleyin.");
      } else {
        alert("Hata: " + (data.message || "Video yüklenemedi"));
      }
    } catch (error) {
      console.error("Video upload error:", error);
      alert("Video yüklenirken bir hata oluştu!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Videoyu tüm aktif slider'lara kaydet (eski videoları sil)
  const saveVideoToAllSliders = async (newVideoUrl: string) => {
    try {
      // Mevcut slider'ları kullan (zaten yüklü)
      const allSliders = sliders.length > 0 ? sliders : [];
      
      // Eğer slider'lar yüklenmemişse, API'den yükle
      if (allSliders.length === 0) {
        const response = await fetch("/api/metod/sliders");
        const data = await response.json();
        
        if (!data.success) {
          throw new Error("Slider'lar yüklenemedi");
        }
        
        const loadedSliders = data.data || [];
        
        if (loadedSliders.length === 0) {
          alert("Önce slider eklemeniz gerekiyor! Lütfen /metod/slider sayfasından slider ekleyin.");
          throw new Error("Slider bulunamadı");
        }
        
        // Slider'ları state'e kaydet
        setSliders(loadedSliders);
        
        // Önce tüm slider'lardan videoları temizle
        for (const slider of loadedSliders) {
          const clearResponse = await fetch(`/api/metod/sliders/${slider.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...slider,
              video_url: null,
            }),
          });
          
          const clearData = await clearResponse.json();
          if (!clearData.success) {
            console.error(`Slider ${slider.id} temizlenirken hata:`, clearData);
          }
        }

        // Sonra sadece aktif slider'lara yeni videoyu ekle
        const activeSliders = loadedSliders.filter((s: any) => s.is_active);
        
        if (activeSliders.length === 0) {
          alert("Aktif slider bulunamadı! Lütfen en az bir slider'ı aktif hale getirin.");
          throw new Error("Aktif slider bulunamadı");
        }

        let successCount = 0;
        for (const slider of activeSliders) {
          const saveResponse = await fetch(`/api/metod/sliders/${slider.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...slider,
              video_url: newVideoUrl,
            }),
          });
          
          const saveData = await saveResponse.json();
          if (saveData.success) {
            successCount++;
          } else {
            console.error(`Slider ${slider.id} kaydedilirken hata:`, saveData);
          }
        }

        if (successCount === 0) {
          throw new Error("Hiçbir slider'a video eklenemedi");
        }

        // Slider'ları yeniden yükle
        await loadCurrentVideo();
        
        return true;
      } else {
        // Slider'lar zaten yüklü, direkt işle
        // Önce tüm slider'lardan videoları temizle
        for (const slider of allSliders) {
          const clearResponse = await fetch(`/api/metod/sliders/${slider.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...slider,
              video_url: null,
            }),
          });
          
          const clearData = await clearResponse.json();
          if (!clearData.success) {
            console.error(`Slider ${slider.id} temizlenirken hata:`, clearData);
          }
        }

        // Sonra sadece aktif slider'lara yeni videoyu ekle
        const activeSliders = allSliders.filter((s: any) => s.is_active);
        
        if (activeSliders.length === 0) {
          alert("Aktif slider bulunamadı! Lütfen en az bir slider'ı aktif hale getirin.");
          throw new Error("Aktif slider bulunamadı");
        }

        let successCount = 0;
        for (const slider of activeSliders) {
          const saveResponse = await fetch(`/api/metod/sliders/${slider.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...slider,
              video_url: newVideoUrl,
            }),
          });
          
          const saveData = await saveResponse.json();
          if (saveData.success) {
            successCount++;
          } else {
            console.error(`Slider ${slider.id} kaydedilirken hata:`, saveData);
          }
        }

        if (successCount === 0) {
          throw new Error("Hiçbir slider'a video eklenemedi");
        }

        // Slider'ları yeniden yükle
        await loadCurrentVideo();
        
        return true;
      }
    } catch (error) {
      console.error("Video kaydetme hatası:", error);
      throw error;
    }
  };

  // Video kaydet
  const handleSaveVideo = async () => {
    if (!newVideoUrl) {
      alert("Lütfen önce bir video yükleyin!");
      return;
    }

    // Önce slider'ları kontrol et
    if (sliders.length === 0) {
      const response = await fetch("/api/metod/sliders");
      const data = await response.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSliders(data.data);
      } else {
        alert("⚠️ Slider bulunamadı! Lütfen önce /metod/slider sayfasından slider ekleyin.");
        return;
      }
    }

    setSaving(true);
    try {
      await saveVideoToAllSliders(newVideoUrl);
      setVideoUrl(newVideoUrl);
      setNewVideoUrl(null);
      alert("✅ Video başarıyla tüm aktif slider'lara kaydedildi!");
    } catch (saveError: any) {
      console.error("Video kaydetme hatası:", saveError);
      const errorMessage = saveError?.message || "Video kaydedilirken hata oluştu";
      alert(`⚠️ ${errorMessage}. Lütfen tekrar deneyin.`);
    } finally {
      setSaving(false);
    }
  };

  // Video sil
  const handleVideoDelete = async () => {
    if (!confirm("Videoyu kaldırmak istediğinize emin misiniz? Bu işlem tüm slider'lardan videoyu kaldıracak.")) {
      return;
    }

    try {
      // Slider'ları yeniden yükle
      const response = await fetch("/api/metod/sliders");
      const data = await response.json();
      const allSliders = data.success ? data.data || [] : [];

      // Tüm slider'lardan videoyu kaldır
      for (const slider of allSliders) {
        await fetch(`/api/metod/sliders/${slider.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...slider,
            video_url: null,
          }),
        });
      }

      setVideoUrl(null);
      await loadCurrentVideo();
      alert("Video başarıyla kaldırıldı!");
    } catch (error) {
      console.error("Video silme hatası:", error);
      alert("Video kaldırılırken bir hata oluştu!");
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
      {/* Başlık */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          🎥 Slider Video Yönetimi
        </h2>
        <p className="text-slate-600">
          Slider&apos;ların sağ alt köşesinde görünecek tek bir video yükleyebilirsiniz. Yeni video eklendiğinde eski video otomatik olarak silinir.
        </p>
      </div>

      {/* Video Yönetim Alanı */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        {/* Mevcut Video */}
        {videoUrl ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">
                ✓ Mevcut Video
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                Aktif
              </span>
            </div>
            <div className="relative w-full rounded-lg overflow-hidden border-2 border-green-400 bg-white shadow-lg">
              <video
                src={videoUrl}
                controls
                className="w-full max-h-96"
              >
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-6 bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg text-center">
            <p className="text-yellow-700 font-bold mb-2">⚠️ Henüz video eklenmemiş</p>
            <p className="text-sm text-yellow-600">
              Aşağıdaki alandan video yükleyebilirsiniz
            </p>
          </div>
        )}

        {/* Yeni Video Önizleme */}
        {newVideoUrl && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">
                🎬 Yeni Video Önizleme
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                Yüklendi - Kaydetmeyi Unutmayın!
              </span>
            </div>
            <div className="relative w-full rounded-lg overflow-hidden border-2 border-blue-400 bg-white shadow-lg">
              <video
                src={newVideoUrl}
                controls
                className="w-full max-h-96"
              >
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
            <button
              onClick={handleSaveVideo}
              disabled={saving}
              className={`mt-4 w-full px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                saving
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
              }`}
            >
              {saving ? "⏳ Kaydediliyor..." : "✅ Videoyu Kaydet"}
            </button>
          </div>
        )}

        {/* Video Yükleme Alanı */}
        <div className="border-2 border-dashed border-purple-300 bg-purple-50/30 rounded-lg p-6">
          <label className="block text-lg font-black text-purple-700 mb-4">
            🎥 Video Yükle
          </label>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={uploading}
                className="flex-1 px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white cursor-pointer hover:border-purple-500 transition-colors"
                id="video-upload-input"
              />
              <label
                htmlFor="video-upload-input"
                className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                  uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 cursor-pointer hover:scale-105"
                }`}
              >
                {uploading ? "Yükleniyor..." : "📹 Video Seç"}
              </label>
            </div>
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span>Video Cloudinary&apos;ye yükleniyor...</span>
              </div>
            )}
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
              <p className="text-sm font-semibold text-purple-800 mb-2">
                ℹ️ Video Bilgileri:
              </p>
              <ul className="text-sm text-purple-700 space-y-1 list-disc list-inside">
                <li>Max dosya boyutu: 50MB</li>
                <li>Önerilen süre: 10-15 saniye</li>
                <li>Desteklenen formatlar: MP4, WebM, OGG, MOV</li>
                <li>Video tüm slider&apos;ların sağ alt köşesinde sabit kalacak</li>
                <li className="font-bold text-purple-900">Yeni video eklendiğinde eski video otomatik silinir</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Video Silme Butonu */}
        {videoUrl && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={handleVideoDelete}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
            >
              🗑️ Videoyu Kaldır
            </button>
          </div>
        )}
      </div>

      {/* Mevcut Slider'lar */}
      <div className="mt-8">
        <h3 className="text-xl font-black text-slate-900 mb-4">
          📸 Mevcut Slider&apos;lar ({sliders.length})
        </h3>
        {sliders.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border-2 border-dashed border-slate-300 text-center">
            <p className="text-slate-500 mb-4">Henüz slider eklenmemiş.</p>
            <a
              href="/metod/slider"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              Slider Ekle
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((slider) => (
                <div
                  key={slider.id}
                  className={`bg-white rounded-xl border-2 overflow-hidden shadow-lg transition-all hover:shadow-xl ${
                    slider.is_active
                      ? "border-green-200"
                      : "border-slate-200 opacity-60"
                  }`}
                >
                  {/* Slider Görseli */}
                  <div className="relative w-full h-48 bg-slate-100">
                    {slider.image_url ? (
                      <>
                        <Image
                          src={slider.image_url}
                          alt={slider.title || `Slider ${slider.id}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={slider.image_url.startsWith("http")}
                        />
                        {!slider.is_active && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                              Pasif
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <div className="text-center">
                          <p className="text-sm font-bold">Görsel Yok</p>
                        </div>
                      </div>
                    )}
                    {slider.is_active && slider.image_url && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Aktif
                      </div>
                    )}
                  </div>
                  
                  {/* Slider Bilgileri */}
                  <div className="p-4">
                    <p className="text-base font-black text-slate-900 mb-2 truncate">
                      {slider.title || `Slider #${slider.id}`}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-500">
                        Sıra: {slider.sort_order}
                      </p>
                      {slider.video_url ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                          ✓ Video Var
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                          ⚠️ Video Yok
                        </span>
                      )}
                    </div>
                    {slider.image_url && (
                      <p className="text-xs text-slate-400 truncate mt-2" title={slider.image_url}>
                        {slider.image_url.length > 50 
                          ? slider.image_url.substring(0, 50) + "..." 
                          : slider.image_url}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

