# DirectAdmin Remote MySQL Erişim Sorunu Çözümü

## Sorun
phpMyAdmin'de `GRANT` komutu çalıştırılamıyor:
```
#1044 - Access denied for user 'metodmuhendislik_...'@'localhost'
```

## Neden?
Normal kullanıcılar `GRANT` komutunu çalıştıramaz. Sadece root/yönetici kullanıcılar çalıştırabilir.

## Çözüm 1: DirectAdmin Remote MySQL Bölümü (EN KOLAY) ✅

### Adımlar:

1. **DirectAdmin ana sayfasına dönün**
   - phpMyAdmin'den çıkış yapın
   - DirectAdmin ana sayfasına geri dönün

2. **"Databases" bölümüne gidin**
   - Ana sayfada "Databases" ikonuna tıklayın
   - Veya sol menüden "MySQL Management" seçin

3. **"Remote MySQL" sekmesini bulun**
   - MySQL yönetim sayfasında "Remote MySQL" veya "Remote Access" sekmesi olmalı
   - Eğer yoksa, "phpMyAdmin" linkinin yanında olabilir

4. **Remote Host Ekle**
   - "Add Host" veya "Allow Remote Access" butonuna tıklayın
   - IP adresi alanına: `%` (yüzde işareti) yazın
   - Bu tüm IP'lere izin verir (geçici olarak)
   - "Add" veya "Save" butonuna tıklayın

5. **Başarı mesajını kontrol edin**
   - "Host added successfully" gibi bir mesaj görmelisiniz

## Çözüm 2: Root ile phpMyAdmin (Alternatif)

Eğer DirectAdmin'de Remote MySQL bölümü yoksa:

1. **phpMyAdmin'den çıkış yapın**

2. **Root kullanıcısı ile giriş yapın**
   - DirectAdmin'den phpMyAdmin'e tekrar giriş yapın
   - Kullanıcı: `root`
   - Şifre: DirectAdmin root şifresi
   - (Hosting sağlayıcınızdan root şifresini alın)

3. **SQL komutunu çalıştırın**
   ```sql
   GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* 
   TO 'metodmuhendislik_new_metod'@'%' 
   IDENTIFIED BY 'Metod2024!NewDB';
   
   FLUSH PRIVILEGES;
   ```

## Çözüm 3: DirectAdmin Kullanıcı Yönetimi

1. **DirectAdmin → Databases → MySQL Management**

2. **Kullanıcı listesinde "metodmuhendislik_new_metod" bulun**

3. **"Modify" veya "Edit" butonuna tıklayın**

4. **"Remote Access" seçeneğini işaretleyin**
   - "Allow Remote Connections" checkbox'ını işaretleyin
   - Veya "Remote Host" alanına `%` ekleyin

5. **Kaydedin**

## Çözüm 4: SSH ile (İleri Seviye)

Eğer SSH erişiminiz varsa:

```bash
# SSH ile sunucuya bağlanın
ssh kullanici@136.243.71.174

# MySQL'e root olarak giriş yapın
mysql -u root -p

# SQL komutunu çalıştırın
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* 
TO 'metodmuhendislik_new_metod'@'%' 
IDENTIFIED BY 'Metod2024!NewDB';

FLUSH PRIVILEGES;
exit;
```

## Önerilen Yol

✅ **Çözüm 1'i deneyin** - DirectAdmin'de Remote MySQL bölümü en kolay yoldur.

Eğer bu bölüm yoksa:
- Hosting sağlayıcınızla iletişime geçin
- Veya Çözüm 2'yi deneyin (root ile phpMyAdmin)

## Test

Ayarları yaptıktan sonra:

1. Local'de dev server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Veritabanı bağlantısı çalışmalı!

