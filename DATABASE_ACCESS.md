# Docker MySQL Veritabanı Dosyalarına Erişim Rehberi

## 📁 Veritabanı Dosyalarının Konumu

Docker'da MySQL veritabanı dosyaları **volume** içinde saklanır. İşte erişim yöntemleri:

## 🔍 Yöntem 1: Container İçinden Görüntüleme

### Container'a Bash ile Bağlanma

```bash
docker exec -it metod-muhendislik-mysql-dev bash
```

Container içinde:

```bash
# Veritabanı dosyalarını listelemek
ls -la /var/lib/mysql

# Belirli bir veritabanını görmek
ls -la /var/lib/mysql/metodmuhendislik_db/

# Dosya boyutlarını görmek
du -sh /var/lib/mysql/*
```

## 🔍 Yöntem 2: Volume'un Fiziksel Konumunu Bulma

### MacBook'ta Docker Volume Konumu

```bash
# Volume bilgilerini görüntüle
docker volume inspect metod-muhendislik_mysql_dev_data
```

Çıktıda `Mountpoint` alanını göreceksiniz. MacBook'ta genellikle:

```text
/var/lib/docker/volumes/metod-muhendislik_mysql_dev_data/_data
```

**Not:** MacBook'ta Docker Desktop kullanıyorsanız, bu yol Docker VM içindedir ve doğrudan erişilemez.

## 🔍 Yöntem 3: Dosyaları Host'a Kopyalama

### Tüm Veritabanı Dosyalarını Kopyalama

```bash
# Container'dan host'a kopyala
docker cp metod-muhendislik-mysql-dev:/var/lib/mysql ./mysql-files

# Belirli bir veritabanını kopyala
docker cp metod-muhendislik-mysql-dev:/var/lib/mysql/metodmuhendislik_db ./mysql-backup
```

## 🔍 Yöntem 4: phpMyAdmin ile Görüntüleme

1. <http://localhost:8080> adresine gidin
2. Giriş yapın:
   - Sunucu: `mysql`
   - Kullanıcı: `metodmuhendislik`
   - Şifre: `metod2024!`
3. Sol menüden veritabanını seçin
4. Tabloları ve verileri görüntüleyin

## 🔍 Yöntem 5: MySQL CLI ile Erişim

### Veritabanına Bağlanma

```bash
npm run db:shell
```

veya

```bash
docker exec -it metod-muhendislik-mysql-dev mysql -u metodmuhendislik -pmetod2024! metodmuhendislik_db
```

### SQL Komutları

```sql
-- Tüm tabloları listele
SHOW TABLES;

-- Tablo yapısını görüntüle
DESCRIBE admin_users;

-- Verileri görüntüle
SELECT * FROM admin_users;

-- Veritabanı bilgilerini görüntüle
SHOW DATABASES;
SHOW TABLE STATUS;
```

## 📊 Hızlı Komutlar

### NPM Script'leri ile

```bash
# Veritabanı dosyalarını görüntüle
npm run db:view

# Veritabanı yedeği al
npm run db:backup

# Veritabanı geri yükle
npm run db:restore backup.sql

# MySQL shell'e bağlan
npm run db:shell
```

### Manuel Docker Komutları

```bash
# Container içindeki dosyaları listelemek
docker exec metod-muhendislik-mysql-dev ls -la /var/lib/mysql

# Volume bilgilerini görüntülemek
docker volume ls
docker volume inspect metod-muhendislik_mysql_dev_data

# Container loglarını görüntülemek
docker logs metod-muhendislik-mysql-dev

# Container durumunu kontrol etmek
docker ps --filter "name=mysql"
```

## 💾 Veritabanı Yedekleme ve Geri Yükleme

### SQL Dump Oluşturma

```bash
# Yedek al
docker exec metod-muhendislik-mysql-dev mysqldump \
  -u metodmuhendislik \
  -pmetod2024! \
  metodmuhendislik_db > backup.sql

# veya npm script ile
npm run db:backup
```

### SQL Dump Geri Yükleme

```bash
# Geri yükle
docker exec -i metod-muhendislik-mysql-dev mysql \
  -u metodmuhendislik \
  -pmetod2024! \
  metodmuhendislik_db < backup.sql

# veya npm script ile
npm run db:restore backup.sql
```

## 📂 Dosya Yapısı

MySQL veritabanı dosyaları şu yapıda saklanır:

```text
/var/lib/mysql/
├── metodmuhendislik_db/          # Veritabanı klasörü
│   ├── admin_users.ibd           # Tablo dosyası
│   ├── admin_users.frm            # Tablo yapısı
│   ├── products.ibd
│   ├── products.frm
│   └── ...
├── ibdata1                        # InnoDB sistem dosyası
├── ib_logfile0                    # InnoDB log dosyası
├── ib_logfile1
└── mysql-bin.000001               # Binary log (eğer aktifse)
```

## 🔐 Güvenlik Notları

- Veritabanı dosyaları container içinde `/var/lib/mysql` konumunda
- Volume sayesinde container silinse bile veriler korunur
- Production'da mutlaka düzenli yedek alın
- Hassas veriler için şifreleme kullanın

## 🐛 Sorun Giderme

### Volume Bulunamıyor

```bash
# Tüm volume'ları listele
docker volume ls

# Volume'u yeniden oluştur
docker-compose down -v
docker-compose up -d
```

### Dosyalara Erişemiyorum

```bash
# Container'ın çalıştığından emin olun
docker ps

# Container'a bağlanmayı deneyin
docker exec -it metod-muhendislik-mysql-dev bash
```

### Veritabanı Bozuk

```bash
# Container'ı yeniden başlat
docker-compose restart mysql

# Veya tamamen sıfırla (DİKKAT: Veriler silinir!)
docker-compose down -v
docker-compose up -d
```

## 📚 Daha Fazla Bilgi

- [Docker Volume Documentation](https://docs.docker.com/storage/volumes/)
- [MySQL Data Directory](https://dev.mysql.com/doc/refman/8.0/en/data-directory.html)
- [Docker MySQL Best Practices](https://hub.docker.com/_/mysql)
