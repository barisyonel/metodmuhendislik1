# Yönetici Paneli Kullanım Kılavuzu

## 🚀 Hızlı Başlangıç

### 1. Giriş Bilgileri

Varsayılan giriş bilgileri:
- **URL**: `https://metodmuhendislik.com/metod`
- **Kullanıcı Adı**: `admin` (veya `.env.local` dosyasında belirlediğiniz)
- **Şifre**: `metod2024!` (veya `.env.local` dosyasında belirlediğiniz)

### 2. İlk Kurulum

1. Proje kök dizininde `.env.local` dosyası oluşturun:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!
```

2. Sunucuyu başlatın:
```bash
npm run dev
```

3. Tarayıcıda `/metod` adresine gidin
4. Otomatik olarak `/metod/login` sayfasına yönlendirileceksiniz
5. Giriş yapın

## 🔒 Güvenlik Özellikleri

- ✅ Kullanıcı adı ve şifre ile giriş
- ✅ Session tabanlı kimlik doğrulama
- ✅ HTTP-only cookies
- ✅ Middleware ile route koruması
- ✅ Gizli URL (`/metod` - normal sitede görünmez)

## 📁 Dosya Yapısı

```
app/
├── metod/
│   ├── login/
│   │   └── page.tsx          # Giriş sayfası
│   ├── components/
│   │   └── LogoutButton.tsx   # Çıkış butonu
│   └── page.tsx               # Dashboard ana sayfa
├── api/
│   └── metod/
│       ├── auth/
│       │   └── route.ts       # Giriş API
│       └── logout/
│           └── route.ts       # Çıkış API
lib/
└── auth.ts                    # Kimlik doğrulama yardımcıları
middleware.ts                  # Route koruma
```

## 🗄️ MySQL Entegrasyonu

MySQL entegrasyonu için `MYSQL_SETUP.md` dosyasına bakın.

### Hızlı MySQL Kurulumu:

1. `mysql2` paketini yükleyin:
```bash
npm install mysql2
```

2. `.env.local` dosyasına MySQL bilgilerini ekleyin:
```env
DB_HOST=localhost
DB_USER=metodmuhendislik
DB_PASSWORD=your_password
DB_NAME=metodmuhendislik_db
DB_PORT=3306
```

3. `lib/db.ts` dosyasındaki MySQL kodunu aktif edin

## 🎨 Özellikler

### Dashboard
- İstatistik kartları
- Hızlı erişim menüleri
- Son aktiviteler listesi

### Güvenlik
- Otomatik logout (7 gün sonra)
- Session kontrolü
- Route koruması

## 🔧 Özelleştirme

### Şifre Değiştirme

`.env.local` dosyasında:
```env
ADMIN_PASSWORD=yeni_sifreniz
```

### Session Süresi

`app/api/metod/auth/route.ts` dosyasında:
```typescript
maxAge: 60 * 60 * 24 * 7, // 7 gün (saniye cinsinden)
```

## 📝 Notlar

- Admin paneli normal site navigasyonunda görünmez
- Sadece `/metod` URL'si ile erişilebilir
- Giriş yapmadan dashboard'a erişilemez
- Çıkış yapıldığında session silinir

## 🐛 Sorun Giderme

### Giriş yapamıyorum
- `.env.local` dosyasının doğru oluşturulduğundan emin olun
- Kullanıcı adı ve şifrenin doğru olduğunu kontrol edin
- Tarayıcı console'unda hata var mı kontrol edin

### Session kayboluyor
- Cookie ayarlarını kontrol edin
- HTTPS kullanıyorsanız `secure: true` olduğundan emin olun

### MySQL bağlantı hatası
- Veritabanı bilgilerini kontrol edin
- DirectAdmin'de MySQL servisinin çalıştığından emin olun
- Port numarasını kontrol edin

## 📞 Destek

Sorunlar için `MYSQL_SETUP.md` dosyasına bakın veya hosting sağlayıcınızla iletişime geçin.

