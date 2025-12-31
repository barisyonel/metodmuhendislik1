#!/bin/bash

# MySQL Veritabanı Geri Yükleme Script'i

CONTAINER_NAME="metod-muhendislik-mysql-dev"
DB_NAME="metodmuhendislik_db"
DB_USER="metodmuhendislik"
DB_PASSWORD="metod2024!"

if [ -z "$1" ]; then
  echo "❌ Kullanım: ./scripts/restore-db.sh <backup-file.sql>"
  echo ""
  echo "Mevcut yedekler:"
  ls -lh ./backups/*.sql 2>/dev/null || echo "Henüz yedek yok"
  exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Dosya bulunamadı: $BACKUP_FILE"
  exit 1
fi

echo "🔄 Veritabanı geri yükleniyor..."
echo "Dosya: $BACKUP_FILE"
echo ""

# Veritabanını geri yükle
docker exec -i $CONTAINER_NAME mysql \
  -u $DB_USER \
  -p$DB_PASSWORD \
  $DB_NAME < $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ Veritabanı başarıyla geri yüklendi!"
else
  echo "❌ Geri yükleme sırasında hata oluştu!"
  exit 1
fi

