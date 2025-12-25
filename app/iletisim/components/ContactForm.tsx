"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.message || "Bir hata oluştu" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status.type && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            status.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Adınız ve Soyadınız"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
            E-posta *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0 5XX XXX XX XX"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-bold text-slate-900 mb-2">
            Hizmet
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Hizmet Seçiniz</option>
            <option value="elektrik-pano">Elektrik Pano Üretimi</option>
            <option value="marin-pano">Marin Pano</option>
            <option value="cnc-lazer">CNC Lazer Kesim</option>
            <option value="cnc-bukum">CNC Büküm</option>
            <option value="kaynak">Kaynak & İmalat</option>
            <option value="toz-boya">Elektrostatik Toz Boya</option>
            <option value="magaza-raf">Mağaza Raf ve Ürünleri</option>
            <option value="celik-konstruksiyon">Çelik Konstrüksiyon</option>
            <option value="diger">Diğer</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
            Mesajınız *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Projeniz hakkında detaylı bilgi veriniz..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:scale-105 ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Gönderiliyor..." : "GÖNDER"}
        </button>
      </form>
    </>
  );
}

