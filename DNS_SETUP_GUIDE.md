# DNS Kayıtları Düzenleme Rehberi

## Sorun
Vercel DNS ayarları güncellendikten sonra DirectAdmin'e (`https://www.metodmuhendislik.com:2222`) erişilemiyor.

## Neden?
- DNS kayıtları Vercel'e yönlendirildi (216.198.79.1)
- DirectAdmin farklı bir sunucuda çalışıyor (136.243.71.174)
- Port 2222 DirectAdmin için özel port, Vercel üzerinden erişilemez

## Çözüm: DNS Kayıtlarını Düzenleyin

### Mevcut DNS Kayıtları (Görüntüden):
```
metodmuhendislik.com.    A    216.198.79.1    (Vercel)
www                      A    216.198.79.1    (Vercel)
directadmin              A    136.243.71.174  (DirectAdmin)
ftp                      A    136.243.71.174  (DirectAdmin)
mail                     A    136.243.71.174  (DirectAdmin)
```

### Önerilen DNS Yapılandırması:

#### 1. Ana Domain (Vercel için - DEĞİŞTİRMEYİN):
```
metodmuhendislik.com.    A    216.198.79.1
www                      A    216.198.79.1
```

#### 2. DirectAdmin için Subdomain (EKLEYİN):
```
directadmin              A    136.243.71.174
```

**Kullanım**: `https://directadmin.metodmuhendislik.com:2222`

#### 3. Veritabanı için Subdomain (OPSİYONEL):
```
mysql                    A    136.243.71.174
```

**Kullanım**: `.env.local` ve Vercel'de `DB_HOST=mysql.metodmuhendislik.com`

## Adım Adım Yapılacaklar

### DirectAdmin DNS Yönetiminde:

1. **DirectAdmin'e başka bir yoldan erişin**:
   - Hosting sağlayıcınızın kontrol panelinden
   - Veya IP adresi ile: `https://136.243.71.174:2222`

2. **DNS Management** bölümüne gidin

3. **Yeni A Record ekleyin**:
   - **Name**: `directadmin`
   - **Type**: `A`
   - **Value**: `136.243.71.174`
   - **TTL**: `3600` (veya varsayılan)

4. **Kaydedin ve bekleyin** (DNS propagation 5-30 dakika sürebilir)

5. **Test edin**:
   ```bash
   # Terminal'de test:
   nslookup directadmin.metodmuhendislik.com
   
   # Tarayıcıda test:
   https://directadmin.metodmuhendislik.com:2222
   ```

## Alternatif: Ana Domain'i Geri Al (Önerilmez)

Eğer DirectAdmin'i ana domain'den erişmek istiyorsanız:
- `metodmuhendislik.com` → `136.243.71.174` (DirectAdmin)
- `www.metodmuhendislik.com` → `216.198.79.1` (Vercel)

**⚠️ Bu durumda**: 
- Ana domain DirectAdmin'e gider
- www subdomain Vercel'e gider
- SEO ve kullanıcı deneyimi açısından karışıklık yaratabilir

## Önerilen Yapı

✅ **En iyi çözüm**: Subdomain kullanımı
- `www.metodmuhendislik.com` → Vercel (web sitesi)
- `directadmin.metodmuhendislik.com` → DirectAdmin (yönetim)
- `mysql.metodmuhendislik.com` → DirectAdmin (veritabanı - opsiyonel)

Bu şekilde:
- Web sitesi Vercel'de çalışır ✅
- DirectAdmin'e erişim mümkün olur ✅
- Her şey düzenli ve ayrılmış olur ✅

