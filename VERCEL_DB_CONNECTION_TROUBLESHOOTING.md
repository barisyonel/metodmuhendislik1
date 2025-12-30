# Vercel Veritabanı Bağlantı Sorunları - Sorun Giderme Rehberi

## 🔍 Sorun Analizi

Local'de çalışıyor ama Vercel'de çalışmıyor - Bu durum genellikle şu nedenlerden kaynaklanır:

## ⚠️ Olası Sorunlar ve Çözümleri

### 1. **IP Whitelist / Firewall Sorunu** (EN YAYGIN)

**Sorun:** Vercel'in IP adresleri veritabanı sunucusuna erişemiyor.

**Çözüm:**
1. Veritabanı hosting panelinize gidin (DirectAdmin/cPanel)
2. MySQL Remote Access veya IP Whitelist bölümünü bulun
3. Vercel'in IP aralıklarını ekleyin:
   - Vercel tüm IP'lerden bağlanabilir (önerilmez - güvenlik riski)
   - Veya sadece belirli IP'leri whitelist'e ekleyin
4. Alternatif: `%` wildcard kullanarak tüm IP'lerden bağlantıya izin verin (güvenlik riski var)

**MySQL Komutu:**
```sql
-- Tüm IP'lerden bağlantıya izin ver (GÜVENLİK RİSKİ!)
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* TO 'metodmuhendislik_new_metod'@'%' IDENTIFIED BY 'Metod2024!NewDB';
FLUSH PRIVILEGES;
```

### 2. **DB_HOST Adresi Yanlış**

**Sorun:** `www.metodmuhendislik.com` web sitesi adresi, MySQL host adresi değil.

**Çözüm:**
1. Hosting sağlayıcınızdan MySQL host adresini öğrenin
2. Genellikle şu formatlardan biri olur:
   - `mysql.metodmuhendislik.com`
   - `localhost` (ama Vercel'de çalışmaz!)
   - `metodmuhendislik.com` (www olmadan)
   - Direkt IP adresi
3. Vercel'de `DB_HOST` değerini doğru host adresi ile güncelleyin

**Kontrol:**
- DirectAdmin/cPanel'de MySQL Management bölümünde host adresini kontrol edin
- phpMyAdmin'de bağlantı bilgilerini kontrol edin

### 3. **MySQL Kullanıcı İzinleri**

**Sorun:** MySQL kullanıcısı sadece `localhost`'tan bağlanma iznine sahip.

**Çözüm:**
```sql
-- Mevcut izinleri kontrol et
SELECT user, host FROM mysql.user WHERE user = 'metodmuhendislik_new_metod';

-- Remote host'tan bağlanma izni ver
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* TO 'metodmuhendislik_new_metod'@'%' IDENTIFIED BY 'Metod2024!NewDB';
FLUSH PRIVILEGES;
```

### 4. **SSL Ayarları**

**Sorun:** Veritabanı SSL gerektiriyor ama Vercel'de SSL kapalı.

**Çözüm:**
1. Vercel'de `DB_SSL=true` olarak ayarlayın
2. `DB_SSL_REJECT_UNAUTHORIZED=false` olarak bırakın (çoğu hosting için)

**Not:** Kod artık sadece `DB_SSL` environment variable'ını kontrol ediyor.

### 5. **Port Sorunu**

**Sorun:** MySQL portu farklı olabilir veya firewall tarafından engellenmiş olabilir.

**Çözüm:**
1. Vercel'de `DB_PORT=3306` olduğundan emin olun
2. Hosting sağlayıcınızdan MySQL portunu doğrulayın
3. Firewall'da 3306 portunun açık olduğundan emin olun

## 🔧 Tanılama Adımları

### 1. Diagnostic Endpoint Kullanın

Vercel'de deploy sonrası şu endpoint'i çağırın:
```
https://metodmuhendislik1.vercel.app/api/metod/diagnose-db
```

Bu endpoint şunları kontrol eder:
- Environment variables
- SSL ayarları
- Gerçek bağlantı testi
- Hata kodları ve öneriler

### 2. Vercel Logs Kontrolü

Vercel Dashboard → Deployments → Son deployment → Logs

Arayacağınız hata kodları:
- `ECONNREFUSED` → Firewall/IP whitelist sorunu
- `ETIMEDOUT` → Bağlantı zaman aşımı (host erişilemiyor)
- `ENOTFOUND` → Host adresi bulunamadı
- `ER_ACCESS_DENIED_ERROR` → Kullanıcı adı/şifre veya izin sorunu

### 3. Test Connection Endpoint

```
https://metodmuhendislik1.vercel.app/api/metod/test-connection
```

## 📋 Kontrol Listesi

- [ ] Vercel'de tüm environment variables doğru ayarlanmış
- [ ] DB_HOST web sitesi adresi değil, MySQL host adresi
- [ ] MySQL kullanıcısı remote host'tan bağlanma iznine sahip
- [ ] Firewall/IP whitelist ayarları yapılmış
- [ ] SSL ayarları doğru (DB_SSL=true/false)
- [ ] Port 3306 açık ve erişilebilir
- [ ] Şifre doğru (Vercel'de ve veritabanında aynı)

## 🚨 En Yaygın Sorun

**%90 ihtimalle:** MySQL kullanıcısı sadece `localhost`'tan bağlanma iznine sahip. Remote host'tan bağlanmak için `@'%'` wildcard kullanmanız gerekiyor.

**Çözüm:**
```sql
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* TO 'metodmuhendislik_new_metod'@'%' IDENTIFIED BY 'Metod2024!NewDB';
FLUSH PRIVILEGES;
```

## 📞 Destek

Sorun devam ederse:
1. `/api/metod/diagnose-db` endpoint'ini çağırın
2. Çıktıyı kaydedin
3. Hosting sağlayıcınızla iletişime geçin (IP whitelist, kullanıcı izinleri)

