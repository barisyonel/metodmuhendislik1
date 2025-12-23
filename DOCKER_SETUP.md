# Docker Kurulum Rehberi (MacBook)

Bu rehber MacBook'ta Docker kullanarak projeyi çalıştırmak için hazırlanmıştır.

## 📋 Gereksinimler

- Docker Desktop (Mac için)
- Docker Compose

## 🚀 Hızlı Başlangıç

### 1. Docker Desktop'u Başlatın

Docker Desktop uygulamasını açın ve çalıştığından emin olun.

### 2. Geliştirme Ortamı (Sadece MySQL)

Sadece MySQL'i Docker'da çalıştırmak için:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Bu komut:
- MySQL container'ını başlatır
- phpMyAdmin'i başlatır (http://localhost:8080)
- Veritabanını otomatik oluşturur

### 3. Next.js'i Lokal Çalıştırın

```bash
# Paketleri yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama: http://localhost:3000
phpMyAdmin: http://localhost:8080

### 4. .env.local Dosyasını Oluşturun

```env
# Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!

# MySQL (Docker container)
# MacBook'ta 3306 portu kullanılıyorsa 3307 kullanın
DB_HOST=localhost
DB_USER=metodmuhendislik
DB_PASSWORD=metod2024!
DB_NAME=metodmuhendislik_db
DB_PORT=3307

# Geliştirme
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🐳 Tam Docker Kurulumu (Production Benzeri)

Tüm uygulamayı Docker'da çalıştırmak için:

```bash
# Build ve başlat
docker-compose up -d --build

# Logları görüntüle
docker-compose logs -f app

# Durdur
docker-compose down
```

## 📊 Veritabanı Yönetimi

### phpMyAdmin ile

1. http://localhost:8080 adresine gidin
2. Giriş bilgileri:
   - Sunucu: `mysql`
   - Kullanıcı: `metodmuhendislik`
   - Şifre: `metod2024!`

### MySQL CLI ile

```bash
# Container'a bağlan
docker exec -it metod-muhendislik-mysql-dev mysql -u metodmuhendislik -pmetod2024! metodmuhendislik_db

# SQL komutları çalıştır
mysql> SHOW TABLES;
mysql> SELECT * FROM admin_users;
```

## 🔧 Yaygın Komutlar

### Container'ları Yönetme

```bash
# Tüm container'ları başlat
docker-compose up -d

# Container'ları durdur
docker-compose down

# Container'ları durdur ve volume'ları sil
docker-compose down -v

# Logları görüntüle
docker-compose logs -f

# Container durumunu kontrol et
docker-compose ps
```

### Veritabanı İşlemleri

```bash
# Veritabanını sıfırla
docker-compose down -v
docker-compose up -d

# Veritabanı yedeği al
docker exec metod-muhendislik-mysql-dev mysqldump -u metodmuhendislik -pmetod2024! metodmuhendislik_db > backup.sql

# Veritabanı yedeğini geri yükle
docker exec -i metod-muhendislik-mysql-dev mysql -u metodmuhendislik -pmetod2024! metodmuhendislik_db < backup.sql
```

## 🔐 Admin Kullanıcı Şifresini Hash'leme

MySQL'de şifre hash'lemek için Node.js script'i:

```bash
# Şifre hash'leme script'i oluştur
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('metod2024!', 10));"
```

Çıktıyı `docker/mysql/init.sql` dosyasındaki password alanına yapıştırın.

## 🐛 Sorun Giderme

### Port Zaten Kullanılıyor

```bash
# Port'u kontrol et
lsof -i :3000
lsof -i :3306
lsof -i :8080

# Port'u değiştir (docker-compose.yml'de)
ports:
  - "3001:3000"  # 3000 yerine 3001
```

### MySQL Bağlantı Hatası

```bash
# MySQL container'ının çalıştığını kontrol et
docker ps

# MySQL loglarını kontrol et
docker-compose logs mysql

# Container'ı yeniden başlat
docker-compose restart mysql
```

### Volume Sorunları

```bash
# Volume'ları temizle
docker-compose down -v
docker volume prune

# Yeniden başlat
docker-compose up -d
```

## 📝 Notlar

- **Geliştirme**: `docker-compose.dev.yml` kullanın (sadece MySQL)
- **Production**: `docker-compose.yml` kullanın (tam stack)
- **Veri Kalıcılığı**: Volume'lar sayesinde veritabanı verileri korunur
- **Hot Reload**: Geliştirme modunda kod değişiklikleri otomatik yansır

## 🚀 Production'a Hazırlık

Production için:

1. `.env` dosyasını production değerleriyle güncelleyin
2. `docker-compose.yml` dosyasındaki environment variable'ları kontrol edin
3. SSL sertifikalarını ekleyin
4. Reverse proxy (nginx) ekleyin (opsiyonel)

## 📚 Daha Fazla Bilgi

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql)

