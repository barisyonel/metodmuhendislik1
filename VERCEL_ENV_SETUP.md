# Vercel Environment Variables Kurulumu

## 🔴 ÖNEMLİ: Vercel'de Veritabanı Bağlantısı İçin Gerekli Environment Variables

Vercel'de deploy sonrası veritabanı bağlantısı için **MUTLAKA** şu environment variable'ları ayarlayın:

### 1. Veritabanı Bağlantı Bilgileri

```bash
# Remote MySQL Host (PlanetScale, Railway, AWS RDS, vb.)
DB_HOST=your-remote-host.com
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=metodmuhendislik_db

# SSL Ayarları (Remote veritabanı için genellikle gerekli)
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

### 2. Ortam Değişkenleri

```bash
NODE_ENV=production
VERCEL=1
```

### 3. Admin Panel

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!
```

### 4. Cloudinary

```bash
CLOUDINARY_CLOUD_NAME=dkkd4jvyk
CLOUDINARY_API_KEY=527393514682555
CLOUDINARY_API_SECRET=cabyJPZK6kJosJEd6PPLwR0jVco
```

### 5. JWT (Opsiyonel - Production için güçlü secret kullanın)

```bash
JWT_SECRET=your-strong-secret-here
JWT_EXPIRES_IN=7d
JWT_AUDIENCE=metod-admin-panel
```

## 📝 Vercel'de Environment Variables Nasıl Eklenir?

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** → **Environment Variables** bölümüne gidin
4. Her bir değişkeni ekleyin:
   - **Name**: Değişken adı (örn: `DB_HOST`)
   - **Value**: Değişken değeri (örn: `your-remote-host.com`)
   - **Environment**: `Production`, `Preview`, `Development` (hepsini seçin)

5. **Save** butonuna tıklayın
6. **Redeploy** yapın (değişikliklerin aktif olması için)

## ⚠️ Önemli Notlar

1. **DB_HOST**: `localhost` veya `127.0.0.1` kullanmayın! Vercel'de remote veritabanı gerekli.
2. **DB_SSL**: Remote veritabanı için genellikle `true` olmalı
3. **DB_SSL_REJECT_UNAUTHORIZED**: PlanetScale gibi servisler için `false` olmalı
4. **DB_PORT**: Genellikle `3306` (MySQL default port)

## 🔍 Sorun Giderme

### Veritabanı Bağlantı Hatası Alıyorsanız:

1. **Environment Variables Kontrolü:**
   - Vercel Dashboard → Settings → Environment Variables
   - Tüm değişkenlerin doğru değerlerle ayarlandığından emin olun

2. **Vercel Logs Kontrolü:**
   - Vercel Dashboard → Deployments → Son deployment → Functions Logs
   - Hata mesajlarını kontrol edin

3. **Test Endpoint:**
   - `https://your-domain.vercel.app/api/metod/test-connection`
   - Bu endpoint bağlantı durumunu gösterir

4. **Remote Veritabanı Kontrolü:**
   - Veritabanı sunucusunun çalıştığından emin olun
   - IP whitelist'te Vercel IP'lerinin olduğundan emin olun
   - SSL sertifikasının geçerli olduğundan emin olun

## 🚀 Remote MySQL Veritabanı Seçenekleri

1. **PlanetScale** (Önerilen)
   - Ücretsiz plan mevcut
   - Otomatik SSL
   - Kolay kurulum

2. **Railway**
   - Ücretsiz plan mevcut
   - MySQL desteği
   - Kolay kurulum

3. **AWS RDS**
   - Ücretli ama güvenilir
   - Yüksek performans
   - Ölçeklenebilir

4. **DigitalOcean Managed Database**
   - Uygun fiyatlı
   - Kolay yönetim
   - İyi performans


