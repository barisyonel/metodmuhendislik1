"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  is_active: boolean;
  sort_order: number;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    link: "",
  });

  // Ürünleri yükle
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/metod/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Ürünler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Form gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? "/api/metod/products"
        : "/api/metod/products";
      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct
        ? { ...formData, id: editingProduct.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        loadProducts();
        resetForm();
        alert(editingProduct ? "Ürün güncellendi!" : "Ürün eklendi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Ürün sil
  const handleDelete = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/metod/products?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        loadProducts();
        alert("Ürün silindi!");
      } else {
        alert("Hata: " + data.message);
      }
    } catch {
      alert("Bir hata oluştu!");
    }
  };

  // Düzenleme için formu aç
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      link: product.link,
    });
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
    });
    setEditingProduct(null);
    setShowForm(false);
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
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ürün başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Açıklama *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ürün açıklaması"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: Elektrik Panoları"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Link
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/urunler/urunler/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Görsel URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Meta Etiketleri Önizleme */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-black text-slate-900">
                    🔍 SEO Meta Etiketleri (Otomatik Oluşturulacak)
                  </h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                    Otomatik
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">
                      Meta Title
                    </label>
                    <div className="bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-700">
                      {formData.title
                        ? `${formData.title} | Metod Mühendislik`
                        : "Başlık girildiğinde otomatik oluşturulacak"}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">
                      Meta Description
                    </label>
                    <div className="bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-700">
                      {formData.description ? (
                        <>
                          {formData.description.length > 160
                            ? formData.description.substring(0, 157) + "..."
                            : formData.description}
                          <span className="text-xs text-slate-500 ml-2">
                            ({formData.description.length} karakter)
                          </span>
                        </>
                      ) : (
                        "Açıklama girildiğinde otomatik oluşturulacak"
                      )}
                    </div>
                    {formData.description && formData.description.length > 160 && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⚠️ Açıklama 160 karakterden uzun, otomatik kısaltılacak
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">
                      Meta Keywords
                    </label>
                    <div className="bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-700">
                      {formData.title && formData.category
                        ? `${formData.title}, ${formData.category}, Metod Mühendislik, endüstriyel üretim`
                        : "Başlık ve kategori girildiğinde otomatik oluşturulacak"}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1 block">
                      OpenGraph Image
                    </label>
                    <div className="bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-700">
                      {formData.image
                        ? formData.image
                        : "Görsel URL'i girildiğinde otomatik kullanılacak"}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                    <p className="text-xs text-blue-800">
                      <strong>ℹ️ Bilgi:</strong> Bu meta etiketleri ürün kaydedildiğinde otomatik
                      olarak oluşturulur ve ürün detay sayfasında kullanılır. Herhangi bir ek
                      işlem yapmanıza gerek yoktur.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  {editingProduct ? "Güncelle" : "Ekle"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ürün Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-600">Henüz ürün eklenmemiş.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
            >
              {/* Görsel */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-4">
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                {/* Butonlar */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

