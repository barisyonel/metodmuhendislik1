# Method Muhendislik

Kurumsal web sitesi ve icerik yonetimi icin gelistirilmis Next.js tabanli uygulama. Proje; hizmetler, urunler, projeler ve kurumsal sayfalarin yonetimini hedefler.

## Ozellikler
- Hizmet/urun/proje sayfalari ve detaylari
- Medya yukleme (Cloudinary)
- MySQL tabanli veri modeli
- Statik export secenegi
- SEO: sitemap ve robots

## Teknoloji
- Next.js 16
- React 19
- TypeScript
- MySQL (mysql2)
- Cloudinary
- Tailwind CSS (PostCSS)

## Kurulum
Gereksinimler:
- Node.js 18+ (onerilir)
- MySQL 8+

Kurulum adimlari:
1) Bagimliliklari yukleyin
   - `npm install`
2) Ortam degiskenlerini tanimlayin (asagida)
3) Gelistirme sunucusunu baslatin
   - `npm run dev`

## Komutlar
- `npm run dev` gelistirme
- `npm run build` production build
- `npm run start` production calistirma
- `npm run lint` eslint
- `npm run build:static` statik export
- `npm run hash:password` sifre hash uretimi
- `npm run db:view` db dosya goruntuleme
- `npm run db:backup` db yedek
- `npm run db:restore` db geri yukleme

## Ortam Degiskenleri
`.env.local` (veya deploy ortaminda) tanimlayin. Degerleri README'de paylasilmamistir.

Zorunlu/onerilen degiskenler:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_SSL`
- `DB_SSL_REJECT_UNAUTHORIZED`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `STATIC_EXPORT`
- `DOCKER_BUILD`

Notlar:
- Gizli anahtar ve sifreleri repoya eklemeyin.
- Uretim ortaminda SSL ve guvenlik ayarlarini aktif edin.

## Klasor Yapisi (Ozet)
- `app/` sayfalar, API route'lar ve UI
- `lib/` ortak yardimci fonksiyonlar
- `public/` statik dosyalar
- `scripts/` bakim ve build scriptleri

## Deploy
Vercel veya kendi sunucunuza deploy edebilirsiniz. Uretimde gerekli ortam degiskenlerini eklediginizden emin olun.
