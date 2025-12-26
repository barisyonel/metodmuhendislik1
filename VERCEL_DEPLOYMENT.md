# 🚀 Vercel Deployment Guide - Metod Mühendislik

## 📋 Ön Gereksinimler

1. **Vercel Hesabı**: [vercel.com](https://vercel.com) üzerinden hesap oluşturun
2. **GitHub/GitLab/Bitbucket Repository**: Projeniz bir Git repository'de olmalı
3. **Domain**: `www.metodmuhendislik.com` domain'i hazır olmalı

## 🔧 Vercel'de Proje Oluşturma

### 1. Vercel Dashboard'a Giriş
- [Vercel Dashboard](https://vercel.com/dashboard) üzerinden giriş yapın
- "Add New..." → "Project" seçin

### 2. Repository Bağlama
- GitHub/GitLab/Bitbucket repository'nizi seçin
- Veya projeyi manuel olarak yükleyin

### 3. Build Ayarları
Vercel otomatik olarak Next.js projelerini algılar, ancak şu ayarları kontrol edin:

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
.next
```

**Install Command:**
```bash
npm install
```

### 4. Environment Variables (Ortam Değişkenleri)

Vercel Dashboard → Project Settings → Environment Variables bölümünden şu değişkenleri ekleyin:

```env
# Database
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306

# Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.metodmuhendislik.com
NODE_ENV=production

# Cloudinary (Görsel yükleme için)
CLOUDINARY_CLOUD_NAME=dkkd4jvyk
CLOUDINARY_API_KEY=527393514682555
CLOUDINARY_API_SECRET=cabyJPZK6kJosJEd6PPLwR0jVco
```

## 🌐 Domain Ayarları

### 1. Domain Ekleme
1. Vercel Dashboard → Project Settings → Domains
2. "Add Domain" butonuna tıklayın
3. `www.metodmuhendislik.com` domain'ini ekleyin
4. Vercel size DNS kayıtlarını gösterecek

### 2. DNS Ayarları
Domain sağlayıcınızın DNS ayarlarına şu kayıtları ekleyin:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel'in IP adresi - Vercel dashboard'da gösterilir)
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (Vercel dashboard'da gösterilir)
```

**Alternatif olarak (Vercel'in önerdiği yöntem):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### 3. SSL Sertifikası
- Vercel otomatik olarak SSL sertifikası sağlar (Let's Encrypt)
- Domain eklendikten sonra SSL otomatik olarak aktif olur
- SSL aktif olması birkaç dakika sürebilir

## 🔄 Redirect Ayarları

Proje otomatik olarak şu yönlendirmeleri yapar:
- ✅ `metodmuhendislik.com` → `www.metodmuhendislik.com` (301 redirect)
- ✅ `http://` → `https://` (301 redirect)

Bu ayarlar `next.config.ts` ve `middleware.ts` dosyalarında yapılandırılmıştır.

## 📊 Deployment Sonrası Kontroller

### 1. Site Erişimi
- [ ] `https://www.metodmuhendislik.com` açılıyor mu?
- [ ] SSL sertifikası aktif mi? (🔒 ikonu görünüyor mu?)
- [ ] Non-www'den www'ye redirect çalışıyor mu?

### 2. SEO Kontrolleri
- [ ] `https://www.metodmuhendislik.com/sitemap.xml` erişilebilir mi?
- [ ] `https://www.metodmuhendislik.com/robots.txt` erişilebilir mi?
- [ ] Google Search Console'a site ekleyin
- [ ] Sitemap'i Google Search Console'a gönderin

### 3. Fonksiyon Kontrolleri
- [ ] Admin paneli (`/metod/login`) çalışıyor mu?
- [ ] Ürün listesi görüntüleniyor mu?
- [ ] İletişim formu çalışıyor mu?
- [ ] Görsel yükleme (Cloudinary) çalışıyor mu?

## 🔍 Troubleshooting

### Build Hatası
```bash
# Yerel olarak test edin
npm run build
```

### Database Bağlantı Hatası
- Environment variables'ların doğru olduğundan emin olun
- Database'in Vercel'den erişilebilir olduğundan emin olun (IP whitelist)

### Domain Redirect Çalışmıyor
- DNS kayıtlarının doğru olduğundan emin olun
- DNS propagation 24-48 saat sürebilir
- Vercel dashboard'da domain durumunu kontrol edin

## 📈 Performance Optimizasyonları

Vercel otomatik olarak şunları sağlar:
- ✅ Edge Network (CDN)
- ✅ Automatic HTTPS
- ✅ Image Optimization
- ✅ Automatic Compression
- ✅ Serverless Functions

## 🔐 Güvenlik

Proje şu güvenlik özelliklerini içerir:
- ✅ Security Headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ HTTPS zorunlu
- ✅ Admin panel koruması

## 📞 Destek

Sorun yaşarsanız:
1. Vercel Dashboard → Project → Deployments → Logs kontrol edin
2. Vercel Support: [vercel.com/support](https://vercel.com/support)
3. Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

## ✅ Deployment Checklist

- [ ] Git repository'ye push yapıldı
- [ ] Vercel'de proje oluşturuldu
- [ ] Environment variables eklendi
- [ ] Domain eklendi ve DNS ayarları yapıldı
- [ ] SSL sertifikası aktif
- [ ] Build başarılı
- [ ] Site erişilebilir
- [ ] Redirect'ler çalışıyor
- [ ] Sitemap ve robots.txt erişilebilir
- [ ] Google Search Console'a site eklendi
- [ ] Tüm fonksiyonlar test edildi

---

**Son Güncelleme:** 26 Aralık 2025
**Site URL:** https://www.metodmuhendislik.com

