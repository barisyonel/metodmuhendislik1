# Hızlı Kurulum Rehberi

## MySQL2 Kurulumu (Düzeltilmiş)

`mysql2` paketi zaten TypeScript tiplerini içerir, bu yüzden `@types/mysql2` yüklemeye gerek yoktur.

```bash
npm install mysql2
```

## Şifre Hash'leme (Önerilen Yöntem)

`bcryptjs` kullanmanız önerilir çünkü kurulum sorunları yaşamaz:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

## Hızlı Test

1. Paketleri yükleyin:
```bash
npm install mysql2 bcryptjs
npm install --save-dev @types/bcryptjs
```

2. `.env.local` dosyasını oluşturun ve MySQL bilgilerinizi ekleyin

3. `lib/db.ts` dosyasındaki MySQL kodunu aktif edin

4. Test edin!

## Sorun Giderme

- **@types/mysql2 bulunamıyor**: Normal, çünkü mysql2 zaten tipleri içeriyor
- **@types/bcrypt bulunamıyor**: `bcryptjs` kullanın, sorun çıkmaz

