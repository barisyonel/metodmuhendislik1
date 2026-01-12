# DirectAdmin'de Remote MySQL Açma - MANAGE USERS Yöntemi

## Adım 1: MANAGE USERS Butonuna Tıkla

1. DirectAdmin Databases sayfasında
2. Sağ üstteki **"MANAGE USERS"** (mavi buton) tıklayın
3. MySQL kullanıcı listesi açılacak

## Adım 2: Kullanıcıyı Bul ve Düzenle

1. Kullanıcı listesinde **"metodmuhendislik_new_metod"** kullanıcısını bulun
2. Kullanıcının yanındaki **"Modify"** veya **"Edit"** butonuna tıklayın

## Adım 3: Remote Access Ayarlarını Yap

Kullanıcı düzenleme sayfasında şunları arayın:

### Seçenek A: Remote Host Alanı
- **"Remote Host"** veya **"Allowed Hosts"** alanını bulun
- Bu alana: `%` (yüzde işareti) yazın
- Bu tüm IP'lere izin verir

### Seçenek B: Checkbox
- **"Allow Remote Connections"** checkbox'ını bulun
- Bu checkbox'ı işaretleyin
- Veya **"Remote Access"** seçeneğini aktif edin

### Seçenek C: Host Listesi
- **"Add Host"** butonuna tıklayın
- IP alanına: `%` yazın
- Kaydedin

## Adım 4: Kaydet

1. **"Save"** veya **"Update"** butonuna tıklayın
2. Başarı mesajını kontrol edin

## Alternatif: Veritabanı Manage Butonu

Eğer "MANAGE USERS" çalışmazsa:

1. **"metodmuhendislik_new_metod"** veritabanının yanındaki **"Manage"** butonuna tıklayın
2. Veritabanı yönetim sayfasında **"Users"** veya **"Access"** sekmesini bulun
3. Kullanıcı listesinde **"metodmuhendislik_new_metod"** kullanıcısını bulun
4. **"Modify"** veya **"Edit"** butonuna tıklayın
5. **"Remote Access"** seçeneğini bulun ve aktif edin

## Test

Ayarları yaptıktan sonra:

1. Local'de dev server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Veritabanı bağlantısı çalışmalı!

## Sorun Giderme

### Remote Host alanı yoksa:
- Hosting sağlayıcınızla iletişime geçin
- Veya SSH erişimi varsa SSH üzerinden yapın

### Hala çalışmıyorsa:
- Firewall'da port 3306'in açık olduğundan emin olun
- DirectAdmin → Firewall/Security bölümüne gidin

