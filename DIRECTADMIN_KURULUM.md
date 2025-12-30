# DirectAdmin Hosting - Veritabanı Kurulum Rehberi

## 📋 Adım Adım Kurulum

### 1. DirectAdmin'de MySQL Veritabanı Oluşturma

1. **DirectAdmin'e giriş yapın**
2. **MySQL Management** veya **Databases** bölümüne gidin
3. **Create Database** butonuna tıklayın
4. Veritabanı adı: `metodmuhendislik_db` (veya istediğiniz ad)
5. MySQL kullanıcı adı ve şifre oluşturun
6. **Create** butonuna tıklayın

### 2. Veritabanı Bilgilerini Not Edin

DirectAdmin size şu bilgileri verecek:
- **DB_HOST**: Genellikle `localhost` veya hosting'in MySQL host adresi
- **DB_USER**: Oluşturduğunuz MySQL kullanıcı adı
- **DB_PASSWORD**: MySQL kullanıcı şifresi
- **DB_NAME**: Veritabanı adı (genellikle `kullaniciadi_metodmuhendislik_db` formatında)
- **DB_PORT**: Genellikle `3306`

**ÖNEMLİ:** Bu bilgileri kaydedin, Vercel'de kullanacağız!

### 3. SQL Dosyasını Import Etme

#### Yöntem 1: phpMyAdmin ile (Önerilen)

1. DirectAdmin'de **phpMyAdmin** bölümüne gidin
2. Sol taraftan veritabanınızı seçin
3. Üst menüden **Import** sekmesine tıklayın
4. **Choose File** butonuna tıklayın
5. `directadmin-setup.sql` dosyasını seçin
6. **Go** veya **Import** butonuna tıklayın
7. Başarılı mesajını bekleyin

#### Yöntem 2: DirectAdmin File Manager ile

1. DirectAdmin'de **File Manager** bölümüne gidin
2. `directadmin-setup.sql` dosyasını yükleyin
3. **MySQL Management** → **Execute SQL** bölümüne gidin
4. Dosyayı seçin ve çalıştırın

### 4. Vercel Environment Variables Ayarlama

Vercel Dashboard'a gidin ve şu environment variable'ları ekleyin:

```env
# Veritabanı Bağlantı Bilgileri (DirectAdmin'den aldığınız bilgiler)
DB_HOST=localhost  # veya hosting'in MySQL host adresi
DB_PORT=3306
DB_USER=metodmuhendislik  # DirectAdmin'de oluşturduğunuz kullanıcı adı
DB_PASSWORD=metod2024!  # DirectAdmin'de oluşturduğunuz şifre
DB_NAME=metodmuhendislik_db  # veya kullaniciadi_metodmuhendislik_db

# SSL Ayarları (DirectAdmin MySQL genellikle SSL kullanmaz)
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false

# Diğer Ayarlar
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!
CLOUDINARY_CLOUD_NAME=dkkd4jvyk
CLOUDINARY_API_KEY=527393514682555
CLOUDINARY_API_SECRET=cabyJPZK6kJosJEd6PPLwR0jVco
```

### 5. Önemli Notlar

#### ⚠️ DB_HOST Sorunu

DirectAdmin'de MySQL genellikle `localhost` üzerinde çalışır. Ancak Vercel'den `localhost`'a bağlanamazsınız!

**Çözüm Seçenekleri:**

1. **Hosting'in MySQL Remote Access Özelliği Varsa:**
   - DirectAdmin'de MySQL'in dışarıdan erişime açık olup olmadığını kontrol edin
   - Eğer açıksa, `DB_HOST` olarak hosting'in IP adresini veya host adresini kullanın
   - Örnek: `DB_HOST=mysql.metodmuhendislik.com` veya `DB_HOST=123.45.67.89`

2. **Remote Access Yoksa:**
   - Hosting'inizde Next.js'i de çalıştırmanız gerekir (Vercel yerine)
   - Veya hosting'inizde bir API endpoint oluşturup Vercel'den oraya bağlanabilirsiniz

#### 🔒 Güvenlik

- MySQL kullanıcısına sadece gerekli veritabanına erişim verin
- Güçlü şifre kullanın
- Production'da SSL kullanmayı tercih edin (eğer destekleniyorsa)

### 6. Test Etme

Kurulum sonrası test etmek için:

1. Vercel'de projeyi redeploy edin
2. `/metod/debug` sayfasına gidin (veritabanı bağlantısını test eder)
3. Admin paneline giriş yapın: `/metod/login`
   - Kullanıcı adı: `admin`
   - Şifre: `metod2024!`

### 7. Sorun Giderme

#### Veritabanı Bağlantı Hatası

- `DB_HOST` değerini kontrol edin
- MySQL kullanıcı adı ve şifresini kontrol edin
- Veritabanı adının doğru olduğundan emin olun
- DirectAdmin'de MySQL servisinin çalıştığından emin olun

#### Tablolar Görünmüyor

- SQL dosyasının başarıyla import edildiğinden emin olun
- phpMyAdmin'de tabloları kontrol edin
- Veritabanı adının doğru olduğundan emin olun

### 8. Destek

Sorun yaşarsanız:
1. DirectAdmin MySQL loglarını kontrol edin
2. Vercel deployment loglarını kontrol edin
3. `/metod/debug` sayfasındaki hata mesajlarını kontrol edin


