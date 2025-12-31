#!/bin/bash

# MySQL Veritabanı Yedekleme Script'i

CONTAINER_NAME="metod-muhendislik-mysql-dev"
DB_NAME="metodmuhendislik_db"
DB_USER="metodmuhendislik"
DB_PASSWORD="metod2024!"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Backup klasörünü oluştur
mkdir -p $BACKUP_DIR

echo "🔄 Veritabanı yedeği alınıyor..."
echo "Container: $CONTAINER_NAME"
echo "Veritabanı: $DB_NAME"
echo ""

# SQL dump oluştur
docker exec $CONTAINER_NAME mysqldump \
  -u $DB_USER \
  -p$DB_PASSWORD \
  $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ Yedek başarıyla oluşturuldu: $BACKUP_FILE"
  echo "📊 Dosya boyutu: $(du -h $BACKUP_FILE | cut -f1)"
else
  echo "❌ Yedek oluşturulurken hata oluştu!"
  exit 1
fi

