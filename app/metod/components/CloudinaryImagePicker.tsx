"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CloudinaryImage {
  public_id: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  folder: string;
}

interface CloudinaryImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  folder?: string;
  title?: string;
}

export default function CloudinaryImagePicker({
  isOpen,
  onClose,
  onSelect,
  folder = "metod-muhendislik",
  title = "Cloudinary'den Görsel Seç",
}: CloudinaryImagePickerProps) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadImages();
    } else {
      // Modal kapandığında state'i temizle
      setImages([]);
      setSelectedImage(null);
      setSearchTerm("");
      setNextCursor(null);
    }
  }, [isOpen, folder]);

  const loadImages = async (cursor?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        folder,
        max_results: "50",
      });
      if (cursor) {
        params.append("next_cursor", cursor);
      }

      const response = await fetch(`/api/metod/cloudinary-list?${params}`);
      const data = await response.json();

      if (data.success) {
        if (cursor) {
          // Daha fazla görsel yükle (append)
          setImages((prev) => [...prev, ...data.images]);
        } else {
          // İlk yükleme
          setImages(data.images);
        }
        setNextCursor(data.next_cursor || null);
      } else {
        setError(data.message || "Görseller yüklenemedi");
      }
    } catch (err) {
      setError("Görseller yüklenirken hata oluştu");
      console.error("Load images error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    }
  };

  const filteredImages = images.filter((img) =>
    img.public_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {images.length} görsel bulundu
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200">
          <input
            type="text"
            placeholder="Görsel ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && images.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => loadImages()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tekrar Dene
              </button>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Görsel bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.public_id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === image.url
                      ? "border-blue-600 ring-4 ring-blue-200"
                      : "border-slate-200 hover:border-blue-400"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.public_id}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {selectedImage === image.url && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <div className="bg-blue-600 text-white rounded-full p-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs truncate">
                      {image.public_id.split("/").pop()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {nextCursor && !loading && (
            <div className="text-center mt-6">
              <button
                onClick={() => loadImages(nextCursor)}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Daha Fazla Yükle
              </button>
            </div>
          )}

          {loading && images.length > 0 && (
            <div className="text-center mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            {selectedImage
              ? "Görsel seçildi"
              : "Lütfen bir görsel seçin"}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedImage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Seç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
