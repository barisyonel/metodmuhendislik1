# Environment Variables Kılavuzu

Bu dosya, Metod Mühendislik projesi için gerekli tüm environment variables'ları açıklar.

## 📋 Gerekli Environment Variables

### 1. Veritabanı Ayarları (MySQL)

```bash
DB_HOST=localhost              # Veritabanı sunucu adresi
DB_USER=metodmuhendislik      # Veritabanı kullanıcı adı
DB_PASSWORD=metod2024!        # Veritabanı şifresi
DB_NAME=metodmuhendislik_db   # Veritabanı adı
DB_PORT=3307                  # Veritabanı portu
```

**Not:** Production'da gerçek veritabanı bilgilerinizi kullanın.

### 2. Cloudinary Ayarları (Görsel Yükleme)

```bash
CLOUDINARY_CLOUD_NAME=dkkd4jvyk
CLOUDINARY_API_KEY=527393514682555
CLOUDINARY_API_SECRET=cabyJPZK6kJosJEd6PPLwR0jVco
```

**Nasıl Alınır:**
1. [Cloudinary Console](https://cloudinary.com/console) adresine gidin
2. Dashboard'dan `Cloud Name`, `API Key` ve `API Secret` bilgilerinizi kopyalayın

### 3. Admin Paneli Ayarları

```bash
ADMIN_USERNAME=admin          # Admin paneli kullanıcı adı
ADMIN_PASSWORD=metod2024!     # Admin paneli şifresi
```

**⚠️ ÖNEMLİ:** Production'da mutlaka güçlü bir şifre kullanın!

### 4. Otomatik Ayarlar (Genelde Değiştirmeyin)

Bu değişkenler genelde otomatik olarak ayarlanır:

```bash
NODE_ENV=production           # Vercel'de otomatik "production" olur
VERCEL=1                      # Vercel'de otomatik "1" olur
```

### 5. Opsiyonel Ayarlar

```bash
DEBUG=false                   # Debug modu (development için)
DB_DEBUG=false                # Veritabanı debug modu
DOCKER_BUILD=false            # Docker build için (sadece Docker kullanıyorsanız)
```

## 🚀 Vercel'de Ayarlama

### Adım 1: Vercel Dashboard'a Gidin

1. [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin
2. Projenizi seçin
3. **Settings** > **Environment Variables** sekmesine gidin

### Adım 2: Environment Variables Ekleyin

Aşağıdaki değişkenleri tek tek ekleyin:

#### Veritabanı Ayarları:
- `DB_HOST` = `your-database-host.com` (veya IP adresi)
- `DB_USER` = `your-database-username`
- `DB_PASSWORD` = `your-database-password`
- `DB_NAME` = `your-database-name`
- `DB_PORT` = `3306` (veya kullandığınız port)

#### Cloudinary Ayarları:
- `CLOUDINARY_CLOUD_NAME` = `your-cloud-name`
- `CLOUDINARY_API_KEY` = `your-api-key`
- `CLOUDINARY_API_SECRET` = `your-api-secret`

#### Admin Paneli:
- `ADMIN_USERNAME` = `your-admin-username`
- `ADMIN_PASSWORD` = `your-strong-password`

### Adım 3: Environment Seçimi

Her değişken için **Production**, **Preview** ve **Development** ortamlarını seçin:
- ✅ Production (canlı site)
- ✅ Preview (test deployment'ları)
- ✅ Development (opsiyonel)

### Adım 4: Deploy

Değişkenleri ekledikten sonra:
1. **Save** butonuna tıklayın
2. Yeni bir deployment başlatın (veya otomatik deploy bekleyin)

## 🔒 Güvenlik Notları

1. **Asla `.env` dosyasını git'e commit etmeyin!**
   - `.env` dosyası zaten `.gitignore`'da olmalı

2. **Production şifreleri:**
   - Güçlü, benzersiz şifreler kullanın
   - Şifreleri düzenli olarak değiştirin
   - Şifreleri asla paylaşmayın

3. **API Keys:**
   - Cloudinary API Secret'ı asla paylaşmayın
   - Eğer bir key sızdırıldıysa, hemen Cloudinary'den yeni key oluşturun

## 🧪 Test Etme

Environment variables'ları test etmek için:

1. **Veritabanı Bağlantısı:**
   ```
   https://your-site.com/api/metod/test-db
   ```

2. **Admin Paneli:**
   ```
   https://your-site.com/metod/login
   ```

## 📝 Local Development

Local development için:

1. `.env.example` dosyasını kopyalayın:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasını açın ve değerleri doldurun

3. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

## ❓ Sorun Giderme

### Veritabanı Bağlantı Hatası

- `DB_HOST` doğru mu?
- `DB_PORT` doğru mu? (genelde 3306 veya 3307)
- Veritabanı sunucusu erişilebilir mi?
- Firewall ayarları doğru mu?

### Cloudinary Yükleme Hatası

- `CLOUDINARY_CLOUD_NAME` doğru mu?
- `CLOUDINARY_API_KEY` ve `CLOUDINARY_API_SECRET` doğru mu?
- Cloudinary hesabınız aktif mi?

### Admin Paneli Giriş Hatası

- `ADMIN_USERNAME` ve `ADMIN_PASSWORD` doğru mu?
- Cookie'ler temizlendi mi? (Tarayıcı cache'ini temizleyin)

## 📞 Destek

Sorun yaşıyorsanız:
1. Tarayıcı konsolunu kontrol edin (F12)
2. Vercel deployment loglarını kontrol edin
3. `/api/metod/test-db` endpoint'ini test edin

