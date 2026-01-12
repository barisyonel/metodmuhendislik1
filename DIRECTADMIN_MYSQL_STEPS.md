# DirectAdmin MySQL Remote Access Açma - Adım Adım

## 1. Databases Bölümüne Git

DirectAdmin ana sayfasında:
- **"Databases"** ikonuna tıklayın (SQL ikonu)
- Veya sol menüden **"MySQL Management"** seçin

## 2. Remote MySQL Ayarları

### Seçenek A: DirectAdmin'de Remote MySQL Bölümü Varsa

1. **"Remote MySQL"** veya **"Remote Access"** sekmesine gidin
2. **"Add Host"** butonuna tıklayın
3. IP adresi ekleyin:
   - **Tüm IP'lere izin için**: `%` (yüzde işareti)
   - **Belirli IP için**: Kendi IP'nizi ekleyin
   - **Vercel için**: Vercel IP aralıklarını ekleyin
4. **"Add"** veya **"Save"** butonuna tıklayın

### Seçenek B: phpMyAdmin Üzerinden

Eğer DirectAdmin'de Remote MySQL bölümü yoksa, phpMyAdmin kullanın.

## 3. phpMyAdmin'e Git

1. Databases bölümünde **"phpMyAdmin"** linkine tıklayın
2. Veya DirectAdmin ana sayfasında **"phpMyAdmin"** ikonunu bulun

## 4. SQL Komutunu Çalıştır

phpMyAdmin'de:

1. Üst menüden **"SQL"** sekmesine tıklayın
2. SQL sorgu kutusuna şu komutu yapıştırın:

```sql
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* 
TO 'metodmuhendislik_new_metod'@'%' 
IDENTIFIED BY 'Metod2024!NewDB';

FLUSH PRIVILEGES;
```

3. **"Go"** veya **"Çalıştır"** butonuna tıklayın
4. Başarı mesajı görmelisiniz

## 5. Firewall Kontrolü (Opsiyonel)

DirectAdmin'de:
1. **"Firewall"** veya **"Security"** bölümüne gidin
2. Port **3306**'in açık olduğundan emin olun
3. Gerekirse port 3306'i ekleyin

## 6. Test

Local'de dev server'ı yeniden başlatın:

```bash
npm run dev
```

Artık veritabanı bağlantısı çalışmalı!

## Güvenlik Notları

⚠️ **`%` kullanmak tüm IP'lere izin verir - güvenlik riski**
✅ **Önerilen**: 
- Production için sadece Vercel IP'lerini ekleyin
- Local development için geçici olarak `%` kullanabilirsiniz
- İleride sadece gerekli IP'leri ekleyin

## Sorun Giderme

### Hala çalışmıyorsa:

1. **Kullanıcı adı/şifre kontrolü**:
   - Vercel Environment Variables'daki bilgileri kontrol edin
   - phpMyAdmin'de kullanıcıyı kontrol edin

2. **Veritabanı adı kontrolü**:
   - `metodmuhendislik_new_metod` doğru mu?
   - phpMyAdmin'de veritabanını kontrol edin

3. **Port kontrolü**:
   - Port 3306 açık mı?
   - Firewall ayarlarını kontrol edin

4. **IP kontrolü**:
   - Remote MySQL'de IP doğru eklenmiş mi?
   - `%` eklediyseniz tüm IP'lere izin vermiş olmalısınız

