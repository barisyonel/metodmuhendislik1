# 📋 Metod Mühendislik Web Sitesi - Eksikler Raporu
**Tarih:** 26 Aralık 2025  
**Kapsam:** Tüm sayfalar ve bileşenler

---

## 🔴 KRİTİK EKSİKLER (Hemen Giderilmeli)

### 1. **EKSİK SAYFALAR** ⚠️
Sayfalar mevcut ama içerik eksik veya hiç yok:

#### 1.1. `/kurumsal/ekibimiz` - **SAYFA YOK**
- **Durum:** Header'da link var, sayfa yok
- **Etki:** 404 hatası verir
- **Çözüm:** Ekibimiz sayfası oluşturulmalı (ekip üyeleri, fotoğraflar, pozisyonlar)

#### 1.2. `/projeler` - **SAYFA YOK** 
- **Durum:** Header'da "Projeler" linki var ama `/urunler`'e yönlendiriyor (yanlış)
- **Etki:** Kullanıcı deneyimi kötü, SEO için eksik
- **Çözüm:** Projeler sayfası oluşturulmalı (tamamlanan projeler, görseller, açıklamalar)

#### 1.3. `/kurumsal/kvkk` - **SAYFA YOK**
- **Durum:** Footer'da link var, sayfa yok
- **Etki:** KVKK yasal gereklilik, 404 hatası verir
- **Çözüm:** KVKK sayfası oluşturulmalı (yasal metin, veri koruma politikası)

---

## 🟡 ORTA ÖNCELİKLİ EKSİKLER

### 2. **İÇERİK EKSİKLERİ**

#### 2.1. `/kurumsal/hakkimizda` - **İÇERİK ÇOK KISSA VE HATALI**
**Mevcut Durum:**
```tsx
// Sadece 2 paragraf var ve yarım kalmış
"Yılların verdiği tecrübe ile Samsun merkezli fabrikamızda..."
```
**Sorunlar:**
- ❌ "Samsun" yazıyor, "İstanbul" olmalı
- ❌ İçerik çok kısa (sadece 2 paragraf)
- ❌ Şirket tarihçesi yok
- ❌ Misyon/Vizyon yok
- ❌ Görsel/Video eksik
- ❌ Footer/Header eksik (sadece Header var)
- ❌ Metadata eksik

**Gereken:**
- ✅ Detaylı şirket tarihçesi (kuruluş, gelişim)
- ✅ Misyon, Vizyon, Değerler
- ✅ Şirket görselleri/fabrika fotoğrafları
- ✅ İstatistikler (yıl, çalışan sayısı, proje sayısı)
- ✅ Footer eklenmeli
- ✅ Metadata eklenmeli

#### 2.2. `/kurumsal/kalite-politikamiz` - **SADECE 1 CÜMLE**
**Mevcut Durum:**
```tsx
// Tek bir cümle var
"Koşulsuz müşteri memnuniyeti ve sıfır hata prensibiyle..."
```
**Sorunlar:**
- ❌ İçerik çok kısa
- ❌ Footer eksik
- ❌ Metadata eksik
- ❌ Görsel/ikon eksik

**Gereken:**
- ✅ Detaylı kalite politikası metni
- ✅ Kalite yönetim sistemi açıklaması
- ✅ ISO sertifikaları bilgisi
- ✅ Footer eklenmeli

#### 2.3. `/kurumsal/kalite-belgelerimiz` - **PLACEHOLDER'LAR**
**Mevcut Durum:**
```tsx
// Sadece emoji ve placeholder metinler
{["ISO 9001", "ISO 14001", "ISO 45001", "Tip Test Belgesi"].map(...)}
```
**Sorunlar:**
- ❌ PDF dosyaları yok
- ❌ Sertifika görselleri yok
- ❌ İndirme/inceleme fonksiyonu yok
- ❌ Footer eksik
- ❌ Metadata eksik

**Gereken:**
- ✅ Gerçek sertifika görselleri (PDF veya JPG)
- ✅ PDF indirme linkleri
- ✅ Sertifika detayları (tarih, geçerlilik)
- ✅ Lightbox/galeri görüntüleme
- ✅ Footer eklenmeli

---

### 3. **GÖRSEL EKSİKLERİ**

#### 3.1. Anasayfa Hero Slider
**Sorunlar:**
- ❌ Slide 2: `https://picsum.photos/seed/industrial1/2000/1200` (placeholder)
- ❌ Slide 4: `https://picsum.photos/seed/industrial4/2000/1200` (placeholder)

**Gereken:**
- ✅ Gerçek görseller (CNC lazer kesim, kaynak makinesi)

#### 3.2. Hizmet Sayfaları - Hero Section
**Sorunlar:**
- ❌ `/hizmetler/cnc-lazer-kesim` - Hero section'da görsel yok (diğerlerinde var)
- ❌ Bazı sayfalarda görsel path'leri placeholder

**Mevcut:**
- ✅ Kaynak: `/kaynak.png` ✓
- ✅ CNC Büküm: `/cncbukum.png` ✓
- ✅ Elektrik Pano: `/elektrıkpano.png` ✓
- ✅ Elektrostatik Toz Boya: `/Elektrostatik Toz Boya.png` ✓
- ✅ Çelik Konstrüksiyon: `/Çelik Konstruksiyon.png` ✓
- ✅ Mağaza Raf: `/Mağaza Raf Sistemleri ve Ürünleri.png` ✓
- ❌ CNC Lazer Kesim: Görsel yok

**Gereken:**
- ✅ CNC Lazer Kesim için hero section görseli eklenmeli

#### 3.3. Blog Sayfası
**Sorunlar:**
- ❌ Blog kartlarında görseller yok
- ❌ Placeholder içerikler var

**Gereken:**
- ✅ Blog yazıları için görseller eklenmeli
- ✅ Gerçek blog içerikleri oluşturulmalı

---

### 4. **LINK VE NAVİGASYON SORUNLARI**

#### 4.1. Header Navigation
**Sorunlar:**
- ❌ "Projeler" linki `/urunler`'e yönlendiriyor (yanlış)
- ❌ `/projeler` sayfası yok
- ❌ "Ekibimiz" linki var ama sayfa yok

#### 4.2. Footer Links
**Sorunlar:**
- ❌ KVKK linki var ama sayfa yok (`/kurumsal/kvkk`)

---

### 5. **İÇERİK VE SEO EKSİKLERİ**

#### 5.1. `/urunler` Sayfası
**Mevcut Durum:**
```tsx
// Basit placeholder içerik
const products = [
  { id: 1, name: "Dikili Tip Panolar", ... },
  // Sadece 4 örnek ürün
]
```
**Sorunlar:**
- ❌ Placeholder ürünler kullanılıyor
- ❌ Gerçek ürün verileri veritabanından çekilmiyor
- ❌ SEO içeriği çok kısa ("Buraya sektörle ilgili... ekleyin")
- ❌ Görseller eksik
- ❌ Metadata eksik

**Gereken:**
- ✅ Veritabanından gerçek ürünler çekilmeli
- ✅ Detaylı SEO içeriği (800-1200 kelime)
- ✅ Ürün görselleri eklenmeli
- ✅ Metadata eklenmeli

#### 5.2. Hizmet Sayfaları Metadata
**Durum:** Bazı sayfalarda metadata var, bazılarında eksik

**Mevcut:**
- ✅ CNC Lazer Kesim: Metadata var
- ✅ Kaynak: Metadata var
- ✅ Elektrik Pano: Metadata var
- ✅ CNC Büküm: Metadata var
- ✅ Elektrostatik Toz Boya: Metadata var
- ✅ Çelik Konstrüksiyon: Metadata var
- ✅ Mağaza Raf: Metadata var

**Sorunlar:**
- ⚠️ Bazı sayfalarda OpenGraph görselleri eksik
- ⚠️ Canonical URL'ler kontrol edilmeli

---

### 6. **HARİTA VE İLETİŞİM**

#### 6.1. İletişim Sayfası - Harita
**Sorunlar:**
- ❌ Google Maps embed URL placeholder
- ❌ Gerçek koordinatlar kullanılmıyor

**Mevcut:**
```tsx
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.1234567890123!..."
// Placeholder koordinatlar
```

**Gereken:**
- ✅ İTOSB Sanayi Bölgesi için gerçek koordinatlar
- ✅ Embed URL düzeltilmeli

---

### 7. **DİĞER EKSİKLER**

#### 7.1. Footer İçeriği
**Durum:** Footer var ve iyi durumda
**Küçük Eksikler:**
- ⚠️ KVKK linki çalışmıyor (sayfa yok)
- ⚠️ Copyright yılı sabit (dinamik olmalı)

#### 7.2. Blog Sayfası
**Sorunlar:**
- ❌ Recent posts placeholder (gerçek blog yazıları yok)
- ❌ Blog kategorileri sayıları doğru mu kontrol edilmeli
- ❌ Blog görselleri eksik

#### 7.3. Ürün Detay Sayfası
**Durum:** İyi durumda
**Küçük Eksikler:**
- ⚠️ SEO içeriği tekrar ediyor (description aynı)
- ⚠️ İlgili ürünler bölümü yok

---

## 📊 ÖZET İSTATİSTİKLER

### Eksik Sayfa Sayısı: **3**
1. `/kurumsal/ekibimiz`
2. `/projeler`
3. `/kurumsal/kvkk`

### Eksik İçerik Sayfası: **3**
1. `/kurumsal/hakkimizda` (çok kısa ve hatalı)
2. `/kurumsal/kalite-politikamiz` (sadece 1 cümle)
3. `/urunler` (placeholder içerik)

### Eksik Görsel: **6+**
1. Hero Slider - 2 placeholder görsel
2. CNC Lazer Kesim hero görseli
3. Blog görselleri
4. Kalite belgeleri PDF/görselleri
5. Ürün görselleri (placeholder'lar)

### Link Sorunları: **3**
1. Header "Projeler" yanlış yönlendiriyor
2. Footer KVKK linki 404
3. Header Ekibimiz linki 404

---

## 🎯 ÖNCELİK SIRASI

### Yüksek Öncelik (Hemen):
1. ✅ Eksik sayfalar oluştur (Ekibimiz, Projeler, KVKK)
2. ✅ Hakkımızda sayfasını genişlet ve düzelt
3. ✅ Kalite Politikası içeriğini genişlet
4. ✅ Header'daki yanlış linkleri düzelt

### Orta Öncelik:
5. ✅ Kalite belgeleri PDF/görsellerini ekle
6. ✅ Placeholder görselleri gerçek görsellerle değiştir
7. ✅ CNC Lazer Kesim hero görseli ekle
8. ✅ Ürünler sayfası içeriğini düzelt

### Düşük Öncelik:
9. ✅ Blog görselleri ekle
10. ✅ İletişim harita koordinatlarını düzelt
11. ✅ Footer'ı güncelle

---

## 📝 NOTLAR

- Tüm sayfalarda Footer eksikliği var (sadece Header var)
- Metadata'lar genel olarak iyi durumda
- SEO için bazı sayfalarda içerik uzatılmalı
- Kurumsal sayfalar çok basit, detaylandırılmalı

---

**Rapor Hazırlayan:** AI Assistant  
**Tarih:** 26 Aralık 2025  
**Versiyon:** 1.0

