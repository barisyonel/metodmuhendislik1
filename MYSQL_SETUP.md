# MySQL Entegrasyonu Rehberi

## Yönetici Paneli MySQL Entegrasyonu

Bu rehber, yönetici panelini MySQL veritabanı ile entegre etmek için adımları içerir.

## 1. MySQL Paketini Yükleyin

```bash
npm install mysql2
```

**Not:** `mysql2` paketi zaten TypeScript tiplerini içerir, ayrıca `@types/mysql2` yüklemeye gerek yoktur.

## 2. DirectAdmin'de MySQL Veritabanı Oluşturun

1. DirectAdmin'e giriş yapın
2. "MySQL Management" bölümüne gidin
3. Yeni bir veritabanı oluşturun: `metodmuhendislik_db`
4. Kullanıcı oluşturun ve veritabanına yetki verin
5. Veritabanı bilgilerini not edin

## 3. Veritabanı Tablosunu Oluşturun

DirectAdmin'de phpMyAdmin'e giriş yapın ve aşağıdaki SQL'i çalıştırın:

```sql
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- İlk admin kullanıcısını ekleyin (şifre: metod2024!)
-- Şifre hash'lenmiş olmalı (bcrypt veya argon2 kullanın)
INSERT INTO `admin_users` (`username`, `password`, `email`, `is_active`) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'admin@metodmuhendislik.com', TRUE);
```

## 4. .env Dosyasını Oluşturun

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# Admin Panel Ayarları
ADMIN_USERNAME=admin
ADMIN_PASSWORD=metod2024!

# MySQL Veritabanı Ayarları
DB_HOST=localhost
DB_USER=metodmuhendislik
DB_PASSWORD=your_mysql_password_here
DB_NAME=metodmuhendislik_db
DB_PORT=3306

# Güvenlik
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://metodmuhendislik.com
```

## 5. lib/db.ts Dosyasını Aktif Edin

`lib/db.ts` dosyasındaki yorum satırlarını kaldırın ve MySQL bağlantısını aktif edin:

```typescript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ? AND is_active = TRUE',
      [username]
    );
    
    if (rows.length === 0) {
      return false;
    }

    // Şifre kontrolü (bcryptjs kullanın - bcrypt yerine)
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, rows[0].password);
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
}
```

## 6. Şifre Hash'leme için bcrypt Kurun

### Seçenek 1: bcryptjs (Önerilen - TypeScript tipleri dahil)

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### Seçenek 2: bcrypt (Native - daha hızlı ama kurulum sorunları olabilir)

```bash
npm install bcrypt
npm install --save-dev @types/bcrypt
```

**Not:** Eğer `@types/bcrypt` bulunamazsa, `bcryptjs` kullanmanız önerilir çünkü tamamen JavaScript ile yazılmıştır ve kurulum sorunları yaşamaz.

## Güvenlik Notları

1. **Şifre Hash'leme**: Asla düz metin şifre saklamayın. bcrypt veya argon2 kullanın.
2. **HTTPS**: Production'da mutlaka HTTPS kullanın.
3. **SQL Injection**: Prepared statements kullanın (zaten kullanıyoruz).
4. **Rate Limiting**: Brute force saldırılarına karşı rate limiting ekleyin.
5. **Session Güvenliği**: Cookie'lerde httpOnly ve secure flag'leri kullanın.

## Test Etme

1. `/metod/login` adresine gidin
2. Kullanıcı adı ve şifre ile giriş yapın
3. Dashboard'a yönlendirilmelisiniz

## Sorun Giderme

- **Bağlantı Hatası**: MySQL bilgilerini kontrol edin
- **Yetki Hatası**: Kullanıcının veritabanına erişim yetkisi olduğundan emin olun
- **Port Hatası**: DirectAdmin'de MySQL port'unu kontrol edin (genellikle 3306)
