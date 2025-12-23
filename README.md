# 🏗️ Metod Mühendislik - Endüstriyel Üretim Web Sitesi

Modern ve profesyonel bir kurumsal web sitesi. CNC lazer kesim, CNC büküm, kaynak, elektrostatik toz boya, mağaza raf ve ürünleri, çelik konstrüksiyon ve elektrik pano üretimi hizmetleri sunan Metod Mühendislik için geliştirilmiştir.

## 🚀 Teknolojiler

- **Framework:** Next.js 16.1 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS 4
- **Veritabanı:** MySQL 8.0
- **Kimlik Doğrulama:** Session-based (bcryptjs)
- **Deployment:** Vercel / Docker
- **AI Desteği:** Cursor, Gemini & Canva (UI/UX Tasarım)

## ✨ Özellikler

### 🎨 Kullanıcı Arayüzü
- ✅ Tam responsive tasarım (Mobil, Tablet, Desktop)
- ✅ Modern ve kullanıcı dostu arayüz
- ✅ SEO optimize edilmiş sayfalar
- ✅ Hızlı sayfa yükleme süreleri
- ✅ Dinamik ürün yönetimi

### 🔐 Yönetici Paneli
- ✅ Güvenli admin girişi (`/metod`)
- ✅ Ürün CRUD işlemleri
- ✅ Otomatik SEO meta etiketleri
- ✅ Veritabanı yönetimi

### 📊 SEO Özellikleri
- ✅ Otomatik meta etiketleri (Title, Description, Keywords)
- ✅ OpenGraph ve Twitter Card desteği
- ✅ Dinamik sitemap
- ✅ Canonical URL'ler
- ✅ H1/H2 hiyerarşisi

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- MySQL 8.0+ (veya Docker)

### Yerel Geliştirme

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/barisyonel/metodmuhendislik.git
cd metodmuhendislik
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**
`.env.local` dosyası oluşturun:
```env
# Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!

# MySQL Veritabanı
DB_HOST=localhost
DB_USER=metodmuhendislik
DB_PASSWORD=metod2024!
DB_NAME=metodmuhendislik_db
DB_PORT=3307

# Geliştirme
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Veritabanını başlatın (Docker ile):**
```bash
npm run docker:dev
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🐳 Docker ile Çalıştırma

### Geliştirme Ortamı (Sadece MySQL)
```bash
npm run docker:dev
```

### Production Ortamı (Tam Stack)
```bash
npm run docker:up
```

Detaylı Docker kurulumu için `DOCKER_SETUP.md` dosyasına bakın.

## 📦 Vercel'e Deploy

### Hızlı Deploy

1. **Vercel hesabınızla GitHub'ı bağlayın:**
   - [Vercel Dashboard](https://vercel.com/dashboard) → New Project
   - GitHub repository'yi seçin

2. **Ortam Değişkenlerini Ekleyin:**
   Vercel Dashboard → Settings → Environment Variables:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=metod2024!
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   DB_PORT=3306
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

3. **Deploy:**
   - Vercel otomatik olarak deploy edecek
   - Her push'ta otomatik yeniden deploy

### Vercel MySQL Entegrasyonu

Vercel'de MySQL kullanmak için:
- **Vercel Postgres** (önerilen) veya
- **PlanetScale** (MySQL uyumlu) veya
- **External MySQL** (kendi sunucunuz)

Detaylı bilgi için [Vercel Database Docs](https://vercel.com/docs/storage/vercel-postgres) sayfasına bakın.

## 📁 Proje Yapısı

```
method-muhendislik/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── components/        # React Components
│   ├── metod/            # Admin Panel
│   ├── hizmetler/        # Services Pages
│   └── urunler/          # Products Pages
├── lib/                   # Utility Functions
├── public/                # Static Assets
├── docker/                # Docker Configurations
├── scripts/               # Helper Scripts
└── docs/                  # Documentation
```

## 🔧 NPM Scripts

```bash
# Geliştirme
npm run dev              # Geliştirme sunucusu
npm run build            # Production build
npm run start            # Production sunucusu
npm run lint             # ESLint kontrolü

# Docker
npm run docker:dev       # Geliştirme MySQL başlat
npm run docker:up        # Production stack başlat
npm run docker:down      # Docker durdur

# Veritabanı
npm run db:shell         # MySQL shell'e bağlan
npm run db:backup        # Veritabanı yedekle
npm run db:restore       # Veritabanı geri yükle
```

## 📚 Dokümantasyon

- [MySQL Kurulumu](MYSQL_SETUP.md)
- [Docker Kurulumu](DOCKER_SETUP.md)
- [Admin Panel Kullanımı](ADMIN_PANEL.md)
- [Veritabanı Erişim](DATABASE_ACCESS.md)
- [Hızlı Başlangıç](QUICK_START.md)

## 🔒 Güvenlik

- ✅ Session-based authentication
- ✅ bcryptjs password hashing
- ✅ HTTP-only cookies
- ✅ Middleware route protection
- ✅ SQL injection koruması (prepared statements)

## 🌐 Canlı Site

- **Production:** [https://metodmuhendislik.com](https://metodmuhendislik.com)
- **Admin Panel:** [https://metodmuhendislik.com/metod](https://metodmuhendislik.com/metod)

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Metod Mühendislik - [Website](https://metodmuhendislik.com)

---

**Not:** Production'a deploy etmeden önce `.env.local` dosyasındaki şifreleri değiştirmeyi unutmayın!
