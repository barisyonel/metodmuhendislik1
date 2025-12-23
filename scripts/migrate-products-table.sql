-- Products tablosunu güncelleme script'i
-- Eğer tablo zaten varsa ve link kolonu yoksa bu script'i çalıştırın

USE metodmuhendislik_db;

-- Link kolonu ekle (eğer yoksa)
ALTER TABLE `products` 
ADD COLUMN IF NOT EXISTS `link` VARCHAR(500) AFTER `category`,
ADD COLUMN IF NOT EXISTS `is_active` BOOLEAN DEFAULT TRUE AFTER `link`,
ADD COLUMN IF NOT EXISTS `sort_order` INT DEFAULT 0 AFTER `is_active`;

-- Mevcut ürünlere varsayılan değerler ekle
UPDATE `products` 
SET `is_active` = TRUE, `sort_order` = `id` 
WHERE `is_active` IS NULL OR `sort_order` IS NULL;

