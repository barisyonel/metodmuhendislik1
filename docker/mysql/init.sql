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
  `category` VARCHAR(100),
  `link` VARCHAR(500),
  `is_active` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek ürünler ekle
INSERT INTO `products` (`title`, `description`, `image`, `category`, `link`, `is_active`, `sort_order`) VALUES
('Elektrik Pano Sistemleri', 'Sıvaüstü, sıvaaltı ve dahili elektrik pano üretimi. Uluslararası standartlara uygun, güvenli ve verimli enerji dağıtım çözümleri.', 'https://picsum.photos/seed/panel1/600/400', 'Elektrik Panoları', '/urunler/urunler/elektrik-pano-sistemleri', TRUE, 1),
('CNC Lazer Kesilmiş Parçalar', 'Hassas CNC lazer kesim ile üretilmiş metal parçalar. ±0.05 mm hassasiyet ile endüstriyel standartlarda üretim.', 'https://picsum.photos/seed/cnc1/600/400', 'CNC İmalat', '/urunler/urunler/cnc-lazer-kesilmis-parcalar', TRUE, 2),
('Bükülmüş Metal Levhalar', 'CNC büküm teknolojisi ile şekillendirilmiş metal levhalar. Kompleks geometrili parçalar için profesyonel çözümler.', 'https://picsum.photos/seed/bend1/600/400', 'CNC Büküm', '/urunler/urunler/bukulmus-metal-levhalar', TRUE, 3),
('Çelik Konstrüksiyon Elemanları', 'Endüstriyel yapılar için çelik konstrüksiyon elemanları. Mühendislik standartlarına uygun, dayanıklı ve güvenilir.', 'https://picsum.photos/seed/steel1/600/400', 'Konstrüksiyon', '/urunler/urunler/celik-konstruksiyon-elemanlari', TRUE, 4),
('Mağaza Raf Sistemleri', 'Özel tasarım mağaza raf sistemleri. Estetik ve fonksiyonel çözümler ile mağaza içi düzenlemeleriniz için ideal.', 'https://picsum.photos/seed/shelf1/600/400', 'Mağaza Ürünleri', '/urunler/urunler/magaza-raf-sistemleri', TRUE, 5),
('Toz Boyalı Ürünler', 'Elektrostatik toz boya ile kaplanmış ürünler. RAL renk standardına uygun, uzun ömürlü ve estetik yüzey işlemleri.', 'https://picsum.photos/seed/paint1/600/400', 'Yüzey İşleme', '/urunler/urunler/toz-boyalı-urunler', TRUE, 6)
ON DUPLICATE KEY UPDATE title=title;

CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20),
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

