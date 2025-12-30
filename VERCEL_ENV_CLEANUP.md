# Vercel Environment Variables Temizleme ve Düzeltme

## 🗑️ SİLİNMESİ GEREKENLER

1. **Value** - Yanlış eklenmiş, silinmeli
2. **Key** - Yanlış eklenmiş, silinmeli

## ➕ EKLENMESİ GEREKENLER

### 1. DB_HOST (EN ÖNEMLİ!)
```
Name: DB_HOST
Value: your-remote-database-host.com
Environment: All Environments
```

**Örnek değerler:**
- PlanetScale: `xxxxx.xxxxx.planetscale.com`
- Railway: `xxxxx.railway.app`
- AWS RDS: `your-db.xxxxx.rds.amazonaws.com`

### 2. DB_SSL_REJECT_UNAUTHORIZED (Önerilir)
```
Name: DB_SSL_REJECT_UNAUTHORIZED
Value: false
Environment: All Environments
```

**Not:** PlanetScale ve çoğu remote MySQL servisi için `false` olmalı.

## ✅ DOĞRU OLANLAR (Silmeyin!)

- ✅ DB_SSL
- ✅ DB_PORT
- ✅ DB_USER
- ✅ DB_PASSWORD
- ✅ DB_NAME
- ✅ CLOUDINARY_CLOUD_NAME
- ✅ CLOUDINARY_API_KEY
- ✅ CLOUDINARY_API_SECRET
- ✅ ADMIN_USERNAME
- ✅ ADMIN_PASSWORD

## 📋 TAM LİSTE (Son Durum)

Değişkenlerin son hali şöyle olmalı:

1. **DB_HOST** ⚠️ EKSİK - EKLEYİN!
2. **DB_PORT** ✅
3. **DB_USER** ✅
4. **DB_PASSWORD** ✅
5. **DB_NAME** ✅
6. **DB_SSL** ✅
7. **DB_SSL_REJECT_UNAUTHORIZED** ⚠️ EKSİK - EKLEYİN!
8. **CLOUDINARY_CLOUD_NAME** ✅
9. **CLOUDINARY_API_KEY** ✅
10. **CLOUDINARY_API_SECRET** ✅
11. **ADMIN_USERNAME** ✅
12. **ADMIN_PASSWORD** ✅

## 🔧 Adımlar

1. **"Value" değişkenini silin**
   - Üç nokta menüsünden → Delete

2. **"Key" değişkenini silin**
   - Üç nokta menüsünden → Delete

3. **DB_HOST ekleyin**
   - Add New → Name: `DB_HOST`
   - Value: Remote veritabanı host adresiniz
   - Environment: All Environments

4. **DB_SSL_REJECT_UNAUTHORIZED ekleyin**
   - Add New → Name: `DB_SSL_REJECT_UNAUTHORIZED`
   - Value: `false`
   - Environment: All Environments

5. **Redeploy yapın**
   - Deployments → Son deployment → ... → Redeploy

## ⚠️ ÖNEMLİ NOT

**DB_HOST** olmadan veritabanı bağlantısı kurulamaz! Bu yüzden "Slider bulunamadı" hatası alıyorsunuz.


