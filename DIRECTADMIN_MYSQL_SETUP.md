# DirectAdmin MySQL Remote Access Kurulumu

## Sorun
Local development'ta `ETIMEDOUT` hatası alınıyor. DNS kayıtları doğru ama MySQL remote erişimi kapalı.

## Çözüm: DirectAdmin'de MySQL Remote Access Açma

### Adım 1: DirectAdmin'e Giriş
- URL: `https://www.metodmuhendislik.com:2222`
- Kullanıcı adı ve şifrenizle giriş yapın

### Adım 2: MySQL Management Bölümüne Git
1. Ana menüden **"MySQL Management"** veya **"Database Management"** seçin
2. **"Remote MySQL"** veya **"Remote Access"** sekmesine tıklayın

### Adım 3: Remote Host Ekle
1. **"Add Host"** veya **"Allow Remote Access"** butonuna tıklayın
2. İzin verilecek IP adreslerini ekleyin:
   - **Local development için**: Kendi IP'nizi ekleyin (veya `%` tüm IP'lere izin verir)
   - **Vercel için**: Vercel IP aralıklarını ekleyin

### Adım 4: MySQL Kullanıcısına Remote İzin Ver
phpMyAdmin'e gidin ve şu SQL komutunu çalıştırın:

```sql
GRANT ALL PRIVILEGES ON metodmuhendislik_new_metod.* 
TO 'metodmuhendislik_new_metod'@'%' 
IDENTIFIED BY 'Metod2024!NewDB';

FLUSH PRIVILEGES;
```

**NOT**: `%` tüm IP'lere izin verir. Daha güvenli için sadece belirli IP'leri ekleyin.

### Adım 5: Firewall Kontrolü
1. DirectAdmin → **"Firewall"** veya **"Security"** bölümüne gidin
2. Port **3306**'in açık olduğundan emin olun

### Adım 6: Test
Local'de dev server'ı yeniden başlatın:
```bash
npm run dev
```

## Alternatif Çözüm: Sadece Vercel IP'lerine İzin Ver

Daha güvenli bir yaklaşım için sadece Vercel'in IP aralıklarını ekleyin:

1. DirectAdmin → Remote MySQL
2. Vercel IP aralıklarını ekleyin (Vercel dokümantasyonundan kontrol edin)
3. Local development için kendi IP'nizi ekleyin

## Güvenlik Notları

⚠️ **% (yüzde) kullanmak tüm IP'lere izin verir - güvenlik riski oluşturur**
✅ **Önerilen**: Sadece gerekli IP'leri ekleyin
✅ **Production**: Sadece Vercel IP'lerine izin verin
✅ **Local**: Kendi IP'nizi ekleyin veya geçici olarak % kullanın

