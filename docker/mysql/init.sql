-- MySQL Veritabanı İlk Kurulum Script'i
-- Bu script Docker container başlatıldığında otomatik çalışır

-- Veritabanı zaten docker-compose.yml'de oluşturuluyor
USE metodmuhendislik_db;

-- Admin kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- İlk admin kullanıcıları (şifre: metod2024!)
-- Şifre bcryptjs ile hash'lenmiş: $2b$10$YxeONmm38atJIgT8IqOyzeeq3M7qMvqJR7eT2R1Zjn3hmB6tFj4w6
-- Gerçek hash'i oluşturmak için: bcryptjs.hashSync('metod2024!', 10)
INSERT INTO `admin_users` (`username`, `password`, `email`, `is_active`) 
VALUES 
  ('admin', '$2b$10$YxeONmm38atJIgT8IqOyzeeq3M7qMvqJR7eT2R1Zjn3hmB6tFj4w6', 'admin@metodmuhendislik.com', TRUE),
  ('metodmuhendislik', '$2b$10$YxeONmm38atJIgT8IqOyzeeq3M7qMvqJR7eT2R1Zjn3hmB6tFj4w6', 'admin@metodmuhendislik.com', TRUE)
ON DUPLICATE KEY UPDATE password=VALUES(password), is_active=TRUE;

-- Ürünler tablosu
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(500),
  `images` TEXT NULL COMMENT 'JSON array of image URLs',
  `category` VARCHAR(100),
  `link` VARCHAR(500),
  `is_active` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek ürünler kaldırıldı - Tüm ürünler admin panelinden eklenmeli
-- Ürün eklemek için: /metod/products sayfasından admin panelini kullanın

CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20),
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hero Slider tablosu
CREATE TABLE IF NOT EXISTS `hero_sliders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `description` TEXT,
  `image_url` VARCHAR(500) NOT NULL,
  `video_url` VARCHAR(500) NULL,
  `link` VARCHAR(500),
  `color` VARCHAR(100) DEFAULT 'from-blue-600/50 via-blue-700/50 to-slate-900/60',
  `sort_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Varsayılan slider'lar kaldırıldı - Admin panelinden eklenebilir

-- Projeler tablosu
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(500) NOT NULL,
  `images` TEXT NULL,
  `category` VARCHAR(100) DEFAULT 'Genel',
  `client_name` VARCHAR(255),
  `location` VARCHAR(255),
  `project_date` DATE,
  `sort_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hizmetler tablosu (Navbar menüsü için)
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `href` VARCHAR(500) NOT NULL,
  `icon` VARCHAR(10) DEFAULT '⚡',
  `description` TEXT,
  `sort_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Varsayılan hizmetleri ekle
INSERT INTO `services` (`name`, `href`, `icon`, `description`, `sort_order`, `is_active`) VALUES
('Elektrik Pano Üretimi', '/hizmetler/elektrik-pano-uretime', '⚡', 'Sıvaüstü, sıvaaltı ve marin pano üretimi', 1, TRUE),
('CNC Lazer Kesim', '/hizmetler/cnc-lazer-kesim', '⚡', 'Hassas lazer kesim çözümleri', 2, TRUE),
('CNC Büküm', '/hizmetler/cnc-bukum', '🔧', 'Profesyonel büküm hizmetleri', 3, TRUE),
('Kaynak', '/hizmetler/kaynak', '🔥', 'Metal kaynak ve imalat', 4, TRUE),
('Elektrostatik Toz Boya', '/hizmetler/elektrostatik-toz-boya', '🎨', 'Yüksek kaliteli toz boya', 5, TRUE),
('Mağaza Raf Ve Ürünleri', '/hizmetler/magaza-raf-ve-urunleri', '📦', 'Mağaza raf sistemleri', 6, TRUE),
('Çelik Konstrüksiyon', '/hizmetler/celik-konstruksiyon', '🏗️', 'Endüstriyel çelik yapılar', 7, TRUE)
ON DUPLICATE KEY UPDATE name=name;

