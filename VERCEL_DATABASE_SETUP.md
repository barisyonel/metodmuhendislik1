# Vercel Veritabanı Kurulum Kılavuzu

## ⚠️ ÖNEMLİ: Vercel'de Localhost Kullanılamaz!

Vercel serverless bir ortamdır ve **localhost'a erişemez**. Bu yüzden remote bir MySQL veritabanı kullanmanız gerekiyor.

## 🔧 Çözüm: Remote MySQL Veritabanı Kullanın

### Seçenek 1: PlanetScale (Önerilen - Ücretsiz Plan Mevcut)

1. [PlanetScale](https://planetscale.com) adresine gidin ve hesap oluşturun
2. Yeni bir veritabanı oluşturun
3. **Settings** > **Connection strings** bölümünden bağlantı bilgilerini alın
4. Vercel'de environment variables ekleyin:
   ```
   DB_HOST=your-database-host.psdb.cloud
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   DB_PORT=3306
   ```

### Seçenek 2: Railway (Kolay Kurulum)

1. [Railway](https://railway.app) adresine gidin
2. "New Project" > "Database" > "MySQL" seçin
3. Veritabanı otomatik oluşturulur
4. **Variables** sekmesinden bağlantı bilgilerini alın
5. Vercel'de environment variables ekleyin

### Seçenek 3: AWS RDS (Production için)

1. AWS Console'a gidin
2. RDS > Create database
3. MySQL seçin ve yapılandırın
4. Security group'u internet erişimine açın
5. Bağlantı bilgilerini Vercel'e ekleyin

### Seçenek 4: DigitalOcean Managed Database

1. DigitalOcean'a gidin
2. Databases > Create Database Cluster
3. MySQL seçin
4. Bağlantı bilgilerini alın ve Vercel'e ekleyin

## 📝 Vercel'de Environment Variables Ayarlama

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**
3. Aşağıdaki değişkenleri ekleyin:

```bash
DB_HOST=your-remote-database-host.com
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306
```

**ÖNEMLİ:**
- `DB_HOST` **localhost veya 127.0.0.1 OLAMAZ!**
- Remote bir host adresi olmalı (örn: `xxx.psdb.cloud`, `xxx.railway.app`)
- Port genelde `3306` (MySQL default port)

## 🔒 SSL Bağlantısı (Önerilen)

Çoğu remote veritabanı servisi SSL gerektirir. Eğer SSL hatası alırsanız, `lib/db.ts` dosyasına SSL ayarları eklenebilir.

## ✅ Test Etme

Environment variables'ları ekledikten sonra:

1. Yeni bir deployment başlatın
2. Test endpoint'ini kontrol edin:
   ```
   https://your-site.vercel.app/api/metod/test-db
   ```
3. Başarılı olursa şu mesajı görmelisiniz:
   ```json
   {
     "success": true,
     "message": "Veritabanı bağlantısı başarılı"
   }
   ```

## 🐛 Sorun Giderme

### Hata: `ECONNREFUSED 127.0.0.1:3307`

**Sebep:** Vercel'de localhost kullanılamaz

**Çözüm:**
- Remote bir veritabanı kullanın
- `DB_HOST` environment variable'ını remote host adresi ile güncelleyin

### Hata: `Access denied for user`

**Sebep:** Kullanıcı adı veya şifre yanlış

**Çözüm:**
- `DB_USER` ve `DB_PASSWORD` değerlerini kontrol edin
- Veritabanı sağlayıcınızın dashboard'undan bilgileri doğrulayın

### Hata: `Unknown database`

**Sebep:** Veritabanı adı yanlış

**Çözüm:**
- `DB_NAME` değerini kontrol edin
- Veritabanı sağlayıcınızın dashboard'unda veritabanı adını doğrulayın

### Hata: SSL/TLS hatası

**Sebep:** Bazı veritabanı servisleri SSL gerektirir

**Çözüm:**
- `lib/db.ts` dosyasına SSL ayarları eklenebilir (gerekirse)

## 💡 Hızlı Başlangıç: PlanetScale

1. [PlanetScale](https://planetscale.com) → Sign up (ücretsiz)
2. "Create database" → İsim verin
3. "Connect" → "General" → Connection string'i kopyalayın
4. Connection string formatı:
   ```
   mysql://username:password@host:port/database
   ```
5. Bilgileri ayrıştırıp Vercel'e ekleyin:
   - `DB_HOST`: host kısmı (örn: `xxx.psdb.cloud`)
   - `DB_USER`: username
   - `DB_PASSWORD`: password
   - `DB_NAME`: database adı
   - `DB_PORT`: 3306

## 📞 Destek

Sorun yaşıyorsanız:
1. Vercel deployment loglarını kontrol edin
2. `/api/metod/test-db` endpoint'ini test edin
3. Veritabanı sağlayıcınızın dashboard'unu kontrol edin


