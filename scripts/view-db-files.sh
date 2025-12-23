#!/bin/bash

# Docker MySQL Veritabanı Dosyalarını Görüntüleme Script'i

echo "🔍 Docker MySQL Container Bilgileri:"
echo "======================================"
docker ps --filter "name=mysql" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "📁 MySQL Veritabanı Dosyalarının Konumu:"
echo "======================================"
echo "Container içinde: /var/lib/mysql"
echo ""

echo "📂 Volume Bilgileri:"
echo "======================================"
docker volume ls | grep mysql

echo ""
echo "🔧 Kullanışlı Komutlar:"
echo "======================================"
echo ""
echo "1. Container içindeki dosyaları listelemek:"
echo "   docker exec metod-muhendislik-mysql-dev ls -la /var/lib/mysql"
echo ""
echo "2. Container'a bash ile bağlanmak:"
echo "   docker exec -it metod-muhendislik-mysql-dev bash"
echo ""
echo "3. Volume'un fiziksel konumunu bulmak:"
echo "   docker volume inspect metod-muhendislik_mysql_dev_data"
echo ""
echo "4. Veritabanı dosyalarını kopyalamak:"
echo "   docker cp metod-muhendislik-mysql-dev:/var/lib/mysql ./mysql-backup"
echo ""
echo "5. phpMyAdmin ile görüntülemek:"
echo "   http://localhost:8080 adresine gidin"
echo ""

