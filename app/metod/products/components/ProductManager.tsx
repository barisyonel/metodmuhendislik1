"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string | string[];
  category: string;
  link: string;
  is_active?: boolean | number;
  sort_order?: number;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    link: "",
    sort_order: 0,
    is_active: true,
  });

  // Ürünleri yükle
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/metod/products");
      const data = await response.json();
      if (data.success) {
        const productsData = Array.isArray(data.data) ? data.data : [];
        console.log("Yüklenen ürünler:", productsData.length);
        setProducts(productsData);
      } else {
        console.error("Ürün yükleme hatası:", data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Ürünler yüklenirken hata:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Görsel yükleme
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
        const errorData = await response.json().catch(() => ({ message: "Sunucu hatası" }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload response:", data);
      
      if (data.success && data.url) {
        const imageUrl = data.url;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
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

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalImageUrl = imagePreview || formData.image;
    if (!finalImageUrl || finalImageUrl.trim() === '' || !finalImageUrl.startsWith('http')) {
      alert("❌ Lütfen geçerli bir görsel yükleyin (URL 'http' ile başlamalıdır)!");
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("❌ Başlık ve açıklama zorunludur!");
      return;
    }

    setSaving(true);
    try {
      const url = editingProduct
        ? `/api/metod/products/${editingProduct.id}`
        : "/api/metod/products";
      const method = editingProduct ? "PUT" : "POST";

      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: finalImageUrl.trim(),
        category: formData.category.trim() || "",
        link: formData.link.trim() || "",
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active !== undefined ? formData.is_active : true,
      };

      console.log("Ürün kaydediliyor:", submitData);

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
        await loadProducts();
        resetForm();
        alert(editingProduct ? "✅ Ürün başarıyla güncellendi!" : "✅ Ürün başarıyla eklendi!");
        
        // Frontend'i tetikle
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('product-updated'));
        }
      } else {
        throw new Error(data.message || "Bilinmeyen hata");
      }
    } catch (error) {
      console.error("Ürün kaydetme hatası:", error);
      const errorMsg = error instanceof Error ? error.message : "Bir hata oluştu!";
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
      const response = await fetch(`/api/metod/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        loadProducts();
        alert("✅ Ürün silindi!");
        
        // Frontend'i tetikle
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('product-updated'));
        }
      } else {
        alert("❌ Hata: " + data.message);
      }
    } catch {
      alert("❌ Bir hata oluştu!");
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
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
    setEditingProduct(null);
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
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Örn: Elektrik Pano Sistemleri"
                  required
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  <span className="text-red-500">*</span> Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Ürün açıklaması..."
                  rows={4}
                  required
                />
              </div>

              {/* Görsel Yükleme */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  <span className="text-red-500">*</span> Ürün Görseli (Zorunlu)
                </label>
                <div className="space-y-3">
                  {imagePreview && imagePreview.trim() !== '' ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-green-400 shadow-lg bg-slate-100">
                      <Image
                        src={imagePreview}
                        alt="Product Preview"
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        ✓ Görsel Yüklendi
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
                      id="product-image-input"
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
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
                  disabled={saving || uploading || (!imagePreview && !formData.image)}
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
          <p className="text-slate-500 text-lg font-bold mb-2">Henüz ürün eklenmemiş</p>
          <p className="text-slate-400 text-sm mb-4">İlk ürününüzü ekleyerek başlayın</p>
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
                  {/* Görsel */}
                  <div className="relative w-full h-64 bg-slate-100">
                    {product.image && product.image.trim() !== '' ? (
                      <Image
                        src={product.image}
                        alt={product.title || `Ürün ${product.id}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">📦</div>
                          <p className="text-sm font-bold">Görsel Yok</p>
                        </div>
                      </div>
                    )}
                    {product.is_active !== true && product.is_active !== 1 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        Pasif
                      </div>
                    )}
                    {product.is_active === true || product.is_active === 1 ? (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        Aktif
                      </div>
                    ) : null}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                      #{(product.sort_order || 0)}
                    </div>
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
                            parseInt(e.target.value) || 0
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
    </div>
  );
}


