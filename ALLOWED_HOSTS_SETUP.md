# Allowed Hosts Ayarları - DirectAdmin

## Durum
"Allowed Hosts" alanında zaten şunlar var:
- `%` (tüm IP'lere izin) ✅
- `localhost` ✅

Bu durumda remote erişim **ZATEN AÇIK**!

## Eğer % Yoksa

1. "Allow access from" alanına: `%` yazın
2. "+ Add Host" butonuna tıklayın
3. `%` listede görünmeli

## Eğer % Zaten Varsa (Şu Anki Durum)

✅ **Hiçbir şey yapmanıza gerek yok!**
- Remote erişim zaten açık
- Tüm IP'lerden bağlantıya izin veriliyor

## Şimdi Test Edin

1. Local'de dev server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Veritabanı bağlantısı çalışmalı!

## Hala Çalışmıyorsa

Eğer `%` ekledikten sonra hala bağlanamıyorsanız:

### 1. Firewall Kontrolü
- DirectAdmin → "Firewall" veya "Security" bölümüne gidin
- Port **3306**'in açık olduğundan emin olun

### 2. Veritabanı Bilgilerini Kontrol Edin
- `.env.local` dosyasındaki bilgileri kontrol edin:
  - DB_HOST=www.metodmuhendislik.com
  - DB_USER=metodmuhendislik_new_metod
  - DB_PASSWORD=Metod2024!NewDB
  - DB_NAME=metodmuhendislik_new_metod

### 3. DNS Kontrolü
- `www.metodmuhendislik.com` doğru IP'ye yönlendiriliyor mu?
- Terminal'de test: `nslookup www.metodmuhendislik.com`

### 4. Port Testi
- Port 3306 erişilebilir mi?
- Firewall portu engelliyor olabilir

## Özet

✅ **Allowed Hosts'ta `%` varsa**: Remote erişim açık, başka bir sorun var
❌ **Allowed Hosts'ta `%` yoksa**: `%` ekleyin ve tekrar deneyin

