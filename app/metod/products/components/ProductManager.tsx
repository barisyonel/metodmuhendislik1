"use client";
import { useState } from "react";
import Image from "next/image";
import CloudinaryImagePicker from "../../components/CloudinaryImagePicker";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string | string[] | null;
  category: string;
  link: string;
  is_active?: boolean | number;
  sort_order?: number;
}

export default function ProductManager({
  initialProducts = [],
}: {
  initialProducts?: Product[];
}) {
  // ✅ Server Component'ten gelen verileri kullan, API route'a gerek yok!
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showCloudinaryPicker, setShowCloudinaryPicker] = useState(false);
  const [cloudinaryPickerType, setCloudinaryPickerType] = useState<"main" | "gallery">("main");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    link: "",
    sort_order: 0,
    is_active: true,
  });

  // Sadece refresh için kullan (CRUD işlemlerinden sonra)
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/metod/products?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (data.success) {
        const productsData = Array.isArray(data.data) ? data.data : [];
        console.log(`✅ ${productsData.length} ürün yenilendi`);
        setProducts(productsData);
      } else {
        console.error("❌ Ürün yükleme hatası:", data.message);
      }
    } catch (error) {
      console.error("❌ Ürünler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tek görsel yükleme (ana görsel için)
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

      const response = await fetch("/api/metod/upload-product", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.success && data.url) {
        const imageUrl = data.url;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
        // Ana görseli images array'inin başına ekle (eğer yoksa)
        setProductImages((prev) => {
          if (prev.includes(imageUrl)) {
            // Zaten varsa başa taşı
            return [imageUrl, ...prev.filter((img) => img !== imageUrl)];
          } else {
            // Yoksa başa ekle
            return [imageUrl, ...prev];
          }
        });
        alert("✅ Ana görsel başarıyla yüklendi!");
      } else {
        const errorMsg = data.message || "Görsel yüklenirken bir hata oluştu";
        console.error("Upload error response:", data);
        alert(`❌ Hata: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Görsel yüklenirken bir hata oluştu";
      alert(`Hata: ${errorMsg}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Birden fazla görsel yükleme
  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Maksimum 9 görsel kontrolü
    const currentImageCount = productImages.length;
    const maxImages = 9;

    if (currentImageCount >= maxImages) {
      alert(
        `⚠️ Maksimum ${maxImages} görsel ekleyebilirsiniz!\n\nŞu anda ${currentImageCount} görsel var.`,
      );
      e.target.value = "";
      return;
    }

    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} bir görsel dosyası değil!`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} dosyası 10MB'dan büyük!`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Toplam görsel sayısı kontrolü (mevcut + yeni)
    const totalAfterUpload = currentImageCount + validFiles.length;
    if (totalAfterUpload > maxImages) {
      const allowedCount = maxImages - currentImageCount;
      alert(
        `⚠️ Maksimum ${maxImages} görsel ekleyebilirsiniz!\n\nŞu anda ${currentImageCount} görsel var. Sadece ${allowedCount} görsel daha ekleyebilirsiniz.`,
      );
      e.target.value = "";
      return;
    }

    // Her dosyayı sırayla yükle
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadingIndex(i);

      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/metod/upload-product", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Sunucu hatası" }));
          throw new Error(
            errorData.message ||
              `HTTP ${response.status}: ${response.statusText}`,
          );
        }

        const data = await response.json();

        if (data.success && data.url) {
          const imageUrl = data.url;
          console.log(
            `✅ Görsel ${i + 1}/${validFiles.length} yüklendi:`,
            imageUrl,
          );

          // Yeni görseli ekle (duplicate kontrolü ile)
          setProductImages((prev) => {
            if (prev.includes(imageUrl)) {
              console.log("⚠️ Görsel zaten mevcut, atlanıyor:", imageUrl);
              return prev;
            }
            const newImages = [...prev, imageUrl];
            const maxImages = 9;
            console.log(
              `📸 Görsel eklendi. Toplam görsel sayısı: ${newImages.length}/${maxImages}`,
            );

            // Maksimum 9 görsel kontrolü
            if (newImages.length > maxImages) {
              alert(`⚠️ Maksimum ${maxImages} görsel ekleyebilirsiniz!`);
              return prev;
            }

            return newImages;
          });

          // İlk görsel ana görsel değilse, ana görseli ayarla
          if (i === 0 && !imagePreview) {
            console.log(
              "⭐ İlk görsel ana görsel olarak ayarlanıyor:",
              imageUrl,
            );
            setImagePreview(imageUrl);
            setFormData((prev) => ({ ...prev, image: imageUrl }));
          }
        } else {
          alert(
            `❌ ${file.name} yüklenirken hata: ${data.message || "Bilinmeyen hata"}`,
          );
        }
      } catch (error) {
        console.error(`Upload error for ${file.name}:`, error);
        alert(`❌ ${file.name} yüklenirken hata oluştu`);
      }
    }

    setUploadingIndex(null);
    e.target.value = "";
    if (validFiles.length > 0) {
      alert(`✅ ${validFiles.length} görsel başarıyla yüklendi!`);
    }
  };

  // Görsel silme
  const handleRemoveImage = (index: number) => {
    const removedImage = productImages[index];
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);

    // Eğer silinen görsel ana görselse, ilk görseli ana görsel yap
    if (removedImage === imagePreview && newImages.length > 0) {
      setImagePreview(newImages[0]);
      setFormData((prev) => ({ ...prev, image: newImages[0] }));
    } else if (newImages.length === 0) {
      setImagePreview("");
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  // Cloudinary'den görsel seçme
  const handleCloudinarySelect = (imageUrl: string) => {
    if (cloudinaryPickerType === "main") {
      // Ana görsel olarak seç
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } else {
      // Galeri görseli olarak ekle
      setProductImages((prev) => {
        if (prev.includes(imageUrl)) {
          alert("Bu görsel zaten galeride mevcut!");
          return prev;
        }
        const newImages = [...prev, imageUrl];
        if (newImages.length > 9) {
          alert("⚠️ Maksimum 9 görsel ekleyebilirsiniz!");
          return prev;
        }
        return newImages;
      });
    }
  };

  // Ana görsel seçme
  const handleSetMainImage = (imageUrl: string) => {
    setImagePreview(imageUrl);
    setFormData((prev) => ({ ...prev, image: imageUrl }));
    // Görseli başa taşı
    setProductImages((prev) => {
      const filtered = prev.filter((img) => img !== imageUrl);
      return [imageUrl, ...filtered];
    });
  };

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasyon hatalarını temizle
    setValidationErrors({});

    const finalImageUrl = imagePreview || formData.image;
    if (
      !finalImageUrl ||
      finalImageUrl.trim() === "" ||
      !finalImageUrl.startsWith("http")
    ) {
      setValidationErrors({
        image:
          "Lütfen geçerli bir ana görsel yükleyin (URL 'http' ile başlamalıdır)",
      });
      alert(
        "❌ Lütfen geçerli bir ana görsel yükleyin (URL 'http' ile başlamalıdır)!",
      );
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      const errors: Record<string, string> = {};
      if (!formData.title.trim()) errors.title = "Başlık zorunludur";
      if (!formData.description.trim())
        errors.description = "Açıklama zorunludur";
      setValidationErrors(errors);
      alert("❌ Başlık ve açıklama zorunludur!");
      return;
    }

    setSaving(true);
    try {
      const url = editingProduct
        ? `/api/metod/products/${editingProduct.id}`
        : "/api/metod/products";
      const method = editingProduct ? "PUT" : "POST";

      // Görselleri hazırla - İLK GÖRSEL KAPAK FOTOĞRAFI OLACAK
      let allImages: string[] = [];

      // productImages array'inden başla
      if (productImages.length > 0) {
        allImages = [...productImages];
      }

      // Kapak fotoğrafını (ana görsel) başa ekle (eğer yoksa)
      // İlk görsel her zaman kapak fotoğrafı olacak
      if (finalImageUrl.trim()) {
        if (!allImages.includes(finalImageUrl.trim())) {
          // Kapak fotoğrafı yoksa başa ekle
          allImages = [finalImageUrl.trim(), ...allImages];
        } else {
          // Kapak fotoğrafı zaten varsa, başa taşı
          allImages = [
            finalImageUrl.trim(),
            ...allImages.filter((img) => img !== finalImageUrl.trim()),
          ];
        }
      }

      // Eğer hiç görsel yoksa, en azından kapak fotoğrafını ekle
      if (allImages.length === 0 && finalImageUrl.trim()) {
        allImages = [finalImageUrl.trim()];
      }

      // Maksimum 6 görsel kontrolü
      if (allImages.length > 6) {
        alert(
          `⚠️ Maksimum 6 görsel ekleyebilirsiniz! İlk 6 görsel kaydedilecek.`,
        );
        allImages = allImages.slice(0, 6);
      }

      console.log("📸 Kaydedilecek görseller:", {
        total: allImages.length,
        kapakFotoğrafı: allImages[0] || "Yok",
        ekGörseller: allImages.slice(1),
      });

      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: finalImageUrl.trim(),
        images: allImages, // Her zaman images array'i gönder (tek görsel olsa bile)
        category: formData.category.trim() || "",
        link: formData.link.trim() || "",
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active !== undefined ? formData.is_active : true,
      };

      console.log("📤 Ürün kaydediliyor:", {
        ...submitData,
        imagesCount: submitData.images?.length || 0,
        images: submitData.images,
      });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      // Validasyon hatalarını saklamak için değişken
      let validationErrorsToShow: Record<string, string> = {};

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));

        // Validasyon hatalarını kontrol et
        if (errorData.details && errorData.details.fields) {
          validationErrorsToShow = errorData.details.fields;
          setValidationErrors(errorData.details.fields);
        }

        // Validasyon hatası varsa özel hata fırlat
        if (Object.keys(validationErrorsToShow).length > 0) {
          const validationError = new Error("Validasyon hatası") as Error & {
            validationErrors: Record<string, string>;
          };
          validationError.validationErrors = validationErrorsToShow;
          throw validationError;
        }

        throw new Error(errorData.message || "Sunucu hatası");
      }

      const data = await response.json();
      console.log("📥 API Response:", data);
      console.log("📥 API Response Data:", {
        success: data.success,
        message: data.message,
        data: data.data,
        imagesCount: data.data?.imagesCount,
        images: data.data?.images,
        details: data.details,
      });

      if (data.success) {
        // Başarılı ise validasyon hatalarını temizle
        setValidationErrors({});
        console.log("✅ Ürün başarıyla kaydedildi!");
        console.log("📸 Gönderilen görsel sayısı:", allImages.length);
        console.log(
          "📸 API'den dönen görsel sayısı:",
          data.data?.imagesCount || 0,
        );

        // Kısa bir bekleme (veritabanı güncellemesi için)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Ürünleri yeniden yükle
        await loadProducts();

        // Yüklenen ürünü kontrol et
        if (editingProduct) {
          const updatedProduct = products.find(
            (p) => p.id === editingProduct.id,
          );
          if (updatedProduct) {
            console.log("🔄 Güncellenen ürün:", updatedProduct);
            console.log("🔄 Ürün görselleri:", updatedProduct.images);
          }
        }

        // Formu sıfırla
        resetForm();

        // Başarı mesajı
        const savedImagesCount = data.data?.imagesCount || allImages.length;
        const message = editingProduct
          ? `✅ Ürün başarıyla güncellendi!\n\n📸 ${savedImagesCount} görsel kaydedildi.\n\nSayfa yenilenecek...`
          : `✅ Ürün başarıyla eklendi!\n\n📸 ${savedImagesCount} görsel kaydedildi.\n\nSayfa yenilenecek...`;
        alert(message);

        // Frontend'i tetikle ve sayfayı yenile
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.dispatchEvent(new Event("product-updated"));
            console.log("🔄 Frontend güncelleme eventi gönderildi");
            // Sayfayı yenile (görsellerin görünmesi için)
            window.location.reload();
          }, 1500);
        }
      } else {
        // Validasyon hatalarını kontrol et
        if (data.details && data.details.fields) {
          const validationErrorsToShow = data.details.fields;
          setValidationErrors(validationErrorsToShow);
          const errorFields = Object.entries(validationErrorsToShow)
            .map(([field, message]) => `${field}: ${message}`)
            .join("\n");
          alert(
            `❌ Validasyon Hatası!\n\nLütfen aşağıdaki alanları kontrol edin:\n\n${errorFields}`,
          );
          return; // Validasyon hatası gösterildi, fonksiyondan çık
        } else {
          throw new Error(data.message || "Bilinmeyen hata");
        }
      }
    } catch (error) {
      console.error("Ürün kaydetme hatası:", error);

      // Validasyon hatası kontrolü
      if (error && typeof error === "object" && "validationErrors" in error) {
        const validationErrorsToShow = (error as Error & {
          validationErrors: Record<string, string>;
        }).validationErrors;
        if (
          validationErrorsToShow &&
          Object.keys(validationErrorsToShow).length > 0
        ) {
          const errorFields = Object.entries(validationErrorsToShow)
            .map(([field, message]) => `${field}: ${message}`)
            .join("\n");
          alert(
            `❌ Validasyon Hatası!\n\nLütfen aşağıdaki alanları kontrol edin:\n\n${errorFields}`,
          );
          return; // Validasyon hatası gösterildi, alert gösterilmesin
        }
      }

      // Genel hata mesajı
      const errorMsg =
        error instanceof Error ? error.message : "Bir hata oluştu!";
      alert(`❌ Hata: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  // Ürün sil
  const handleDelete = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/metod/products/${id}?t=${Date.now()}`,
        {
          method: "DELETE",
          cache: "no-store",
        },
      );

      const data = await response.json();
      if (data.success) {
        // Önce state'ten kaldır (anında görünürlük için)
        setProducts((prev) => prev.filter((p) => p.id !== id));

        // Sonra veritabanından yeniden yükle
        await loadProducts();

        alert("✅ Ürün silindi!");

        // Frontend'i tetikle ve sayfayı yenile
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("product-updated"));
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
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setValidationErrors({});
    setFormData({
      title: product.title || "",
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
      link: product.link || "",
      sort_order: product.sort_order || 0,
      is_active: product.is_active === true || product.is_active === 1,
    });
    setImagePreview(product.image || "");

    // Görselleri parse et
    let images: string[] = [];

    // Önce images JSON kolonunu parse et
    if (product.images) {
      try {
        const parsed =
          typeof product.images === "string"
            ? JSON.parse(product.images)
            : product.images;
        if (Array.isArray(parsed) && parsed.length > 0) {
          images = parsed;
          console.log(
            `📸 Ürün ${product.id} - ${parsed.length} görsel parse edildi:`,
            parsed,
          );
        }
      } catch (e) {
        console.error("Images parse error:", e, "Raw images:", product.images);
      }
    }

    // Ana görseli ekle (eğer yoksa başa ekle, varsa başa taşı)
    if (product.image) {
      if (!images.includes(product.image)) {
        images = [product.image, ...images];
      } else {
        images = [
          product.image,
          ...images.filter((img) => img !== product.image),
        ];
      }
    }

    // Eğer hiç görsel yoksa ve sadece product.image varsa, onu kullan
    if (images.length === 0 && product.image) {
      images = [product.image];
    }

    console.log(
      `✅ Ürün ${product.id} - Toplam ${images.length} görsel yüklendi:`,
      images,
    );
    setProductImages(images);
    setShowForm(true);
  };

  // Formu sıfırla
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "",
      link: "",
      sort_order: 0,
      is_active: true,
    });
    setImagePreview("");
    setProductImages([]);
    setEditingProduct(null);
    setValidationErrors({});
    setShowForm(false);
  };

  // Sıralamayı güncelle
  const handleSortOrderChange = async (id: number, newOrder: number) => {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const response = await fetch(`/api/metod/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, sort_order: newOrder }),
      });

      const data = await response.json();
      if (data.success) {
        loadProducts();
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
      {/* Ürün Ekle Butonu */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">
          Ürünler ({products.length})
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
        >
          + Yeni Ürün Ekle
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">
                {editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
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
                  <span className="text-red-500">*</span> Ürün Başlığı
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    // Validasyon hatasını temizle
                    if (validationErrors.title) {
                      setValidationErrors({ ...validationErrors, title: "" });
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    validationErrors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="Örn: Elektrik Pano Sistemleri"
                  required
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600 font-medium">
                    {validationErrors.title}
                  </p>
                )}
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  <span className="text-red-500">*</span> Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    // Validasyon hatasını temizle
                    if (validationErrors.description) {
                      setValidationErrors({
                        ...validationErrors,
                        description: "",
                      });
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    validationErrors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="Ürün açıklaması..."
                  rows={4}
                  required
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600 font-medium">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Ana Görsel Yükleme */}
              <div
                className={`bg-blue-50 p-4 rounded-lg border-2 ${
                  validationErrors.image
                    ? "border-red-300 bg-red-50"
                    : "border-blue-200"
                }`}
              >
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  <span className="text-red-500">*</span> Ana Görsel (Zorunlu -
                  Kartlarda görünecek)
                </label>
                {validationErrors.image && (
                  <div className="mb-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">
                      {validationErrors.image}
                    </p>
                  </div>
                )}
                <div className="space-y-3">
                  {imagePreview && imagePreview.trim() !== "" ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-green-400 shadow-lg bg-slate-100">
                      <Image
                        src={imagePreview}
                        alt="Ana Görsel Önizleme"
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
                        <p className="text-slate-400 text-sm mb-2">
                          Ana görsel önizlemesi
                        </p>
                        <p className="text-slate-300 text-xs">
                          Ana görsel yüklendikten sonra burada görünecek
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="file"
                        id="product-image-input"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white cursor-pointer hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {uploading && (
                        <div className="absolute top-3 right-4 flex items-center gap-2 text-sm text-blue-600 bg-white/90 px-2 py-1 rounded">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Yükleniyor...</span>
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
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
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
                  Ek Görseller (Ürün detay sayfasında galeri olarak görünecek)
                </label>
                <div className="space-y-4">
                  {/* Görsel Sayısı Bilgisi */}
                  <div className="mb-2 p-2 bg-purple-100 rounded-lg">
                    <p className="text-sm font-bold text-purple-700">
                      {productImages.length} / 9 görsel yüklü
                      {productImages.length >= 9 && (
                        <span className="ml-2 text-red-600">
                          (Maksimum limit)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      İlk görsel kapak fotoğrafı olarak ürün kartlarında görünecek
                    </p>
                  </div>

                  {/* Mevcut Görseller */}
                  {productImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {productImages.map((img, index) => (
                        <div
                          key={index}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                            img === imagePreview
                              ? "border-green-500 ring-2 ring-green-300"
                              : "border-gray-300"
                          } group`}
                        >
                          <Image
                            src={img}
                            alt={`Görsel ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            unoptimized={true}
                          />
                          {img === imagePreview && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold z-10 shadow-md">
                              Ana Görsel
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {img !== imagePreview && (
                              <button
                                type="button"
                                onClick={() => handleSetMainImage(img)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                                title="Kapak fotoğrafı yap"
                              >
                                Ana Görsel Yap
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold"
                              title="Sil"
                            >
                              🗑️ Sil
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Görsel Yükleme Butonu */}
                  <div className="relative">
                    <input
                      type="file"
                      id="product-images-input"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleMultipleImageUpload}
                      disabled={uploadingIndex !== null}
                      multiple
                      className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white cursor-pointer hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {uploadingIndex !== null && (
                      <div className="absolute top-3 right-4 flex items-center gap-2 text-sm text-purple-600 bg-white/90 px-2 py-1 rounded">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span>Yükleniyor... ({uploadingIndex + 1})</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCloudinaryPickerType("gallery");
                        setShowCloudinaryPicker(true);
                      }}
                      disabled={uploadingIndex !== null || productImages.length >= 9}
                      className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Cloudinary'den Seç
                    </button>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-slate-500">
                        💡 Birden fazla görsel seçebilirsiniz (Ctrl/Cmd +
                        tıklama ile çoklu seçim).
                      </p>
                      <p className="text-xs text-slate-500">
                        ⭐ Ana görseli (kapak fotoğrafı) değiştirmek için
                        görselin üzerine gelip &quot;Kapak Yap&quot; butonuna
                        tıklayın.
                      </p>
                      <p className="text-xs text-slate-500">
                        Maksimum 9 görsel ekleyebilirsiniz. İlk görsel ürün
                        kartlarında kapak fotoğrafı olarak görünecek.
                      </p>
                      {productImages.length > 0 && (
                        <p className="text-xs font-bold text-purple-600">
                          ✅ {productImages.length} görsel hazır - Ürünü
                          kaydedin!
                        </p>
                      )}
                    </div>
                  </div>
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
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Örn: Elektrik Panoları"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Link (URL)
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="/urunler/urunler/elektrik-pano-sistemleri"
                />
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
                  disabled={
                    saving || uploading || (!imagePreview && !formData.image)
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : editingProduct ? (
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

      {/* Ürün Listesi */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-slate-500 text-lg font-bold mb-2">
            Henüz ürün eklenmemiş
          </p>
          <p className="text-slate-400 text-sm mb-4">
            İlk ürününüzü ekleyerek başlayın
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
          >
            + İlk Ürünü Ekle
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            📋 Mevcut Ürünler ({products.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border-2 ${
                    product.is_active === true || product.is_active === 1
                      ? "border-green-200 shadow-xl"
                      : "border-slate-200 opacity-60"
                  } overflow-hidden shadow-lg hover:shadow-2xl transition-all`}
                >
                  {/* Görsel Galeri */}
                  <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                    {(() => {
                      // Görselleri parse et
                      let productImagesList: string[] = [];
                      if (product.image) {
                        productImagesList.push(product.image);
                      }
                      if (product.images) {
                        try {
                          const parsed =
                            typeof product.images === "string"
                              ? JSON.parse(product.images)
                              : product.images;
                          if (Array.isArray(parsed) && parsed.length > 0) {
                            productImagesList = parsed;
                            if (
                              product.image &&
                              !productImagesList.includes(product.image)
                            ) {
                              productImagesList = [
                                product.image,
                                ...productImagesList,
                              ];
                            }
                          }
                        } catch {
                          // Parse hatası - görmezden gel
                        }
                      }

                      if (productImagesList.length > 0) {
                        return (
                          <>
                            <Image
                              src={productImagesList[0]}
                              alt={product.title || `Ürün ${product.id}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              unoptimized={true}
                            />
                            {/* Görsel sayacı badge */}
                            {productImagesList.length > 1 && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2.5 py-1 rounded-lg text-xs font-semibold z-10 backdrop-blur-sm shadow-md">
                                {productImagesList.length} görsel
                              </div>
                            )}
                          </>
                        );
                      } else {
                        return (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                            <div className="text-center p-4">
                              <div className="text-4xl mb-2">📦</div>
                              <p className="text-sm font-bold">Görsel Yok</p>
                            </div>
                          </div>
                        );
                      }
                    })()}
                    {product.is_active !== true && product.is_active !== 1 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold z-10 shadow-md">
                        Pasif
                      </div>
                    )}
                    {product.is_active === true || product.is_active === 1 ? (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold z-10 shadow-md">
                        Aktif
                      </div>
                    ) : null}
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 mb-1">
                      {product.title || `Ürün #${product.id}`}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                      {product.description || "Açıklama yok"}
                    </p>
                    {product.category && (
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                          {product.category}
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
                        value={product.sort_order || 0}
                        onChange={(e) =>
                          handleSortOrderChange(
                            product.id,
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                      />
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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
        folder="metod-muhendislik/products"
        title="Cloudinary'den Görsel Seç"
      />
    </div>
  );
}
