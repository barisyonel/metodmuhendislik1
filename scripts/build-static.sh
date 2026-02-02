#!/bin/bash

# Static export için build script
# API route'larını geçici olarak devre dışı bırakır

echo "🔨 Static Export Build Başlatılıyor..."

# API klasörünü geçici olarak proje dışına taşı
if [ -d "app/api" ]; then
    echo "📦 API klasörü geçici olarak taşınıyor..."
    mv app/api ../api-backup-temp
    echo "✅ API klasörü ../api-backup-temp olarak yedeklendi"
fi

# Admin paneli sayfalarını geçici olarak devre dışı bırak (force-dynamic kullanıyor)
if [ -d "app/metod" ]; then
    echo "📦 Admin paneli (app/metod) geçici olarak taşınıyor..."
    mv app/metod ../metod-backup-temp
    echo "✅ Admin paneli ../metod-backup-temp olarak yedeklendi"
fi

# Ürün detay sayfasını geçici olarak devre dışı bırak (generateStaticParams sorunu)
if [ -d "app/urunler/urunler/[slug]" ]; then
    echo "📦 Ürün detay sayfası geçici olarak taşınıyor..."
    mv "app/urunler/urunler/[slug]" "../urunler-slug-backup-temp"
    echo "✅ Ürün detay sayfası yedeklendi"
fi

# .next klasörünü temizle (eski build'den kalan dosyalar olabilir)
if [ -d ".next" ]; then
    echo "🧹 Eski build dosyaları temizleniyor..."
    rm -rf .next
fi

# Build yap
echo "🏗️  Build yapılıyor..."
STATIC_EXPORT=true npm run build
BUILD_EXIT_CODE=$?

# Build sonucunu kontrol et (Next.js 16'da out klasörü proje kökünde oluşur)
if [ $BUILD_EXIT_CODE -eq 0 ] && [ -d "out" ]; then
    echo "✅ Build başarılı!"
    echo "📁 Dosyalar out klasöründe hazır"
    
    # API klasörünü geri getir
    if [ -d "../api-backup-temp" ]; then
        echo "📦 API klasörü geri getiriliyor..."
        mv ../api-backup-temp app/api
        echo "✅ API klasörü geri getirildi"
    fi
    
    # Admin panelini geri getir
    if [ -d "../metod-backup-temp" ]; then
        echo "📦 Admin paneli geri getiriliyor..."
        mv ../metod-backup-temp app/metod
        echo "✅ Admin paneli geri getirildi"
    fi
    
    # Ürün detay sayfasını geri getir
    if [ -d "../urunler-slug-backup-temp" ]; then
        echo "📦 Ürün detay sayfası geri getiriliyor..."
        mv "../urunler-slug-backup-temp" "app/urunler/urunler/[slug]"
        echo "✅ Ürün detay sayfası geri getirildi"
    fi
    
    # Dosya boyutunu göster
    echo ""
    echo "📊 Build bilgileri:"
    du -sh out
    echo "📁 Dosya sayısı:"
    find out -type f | wc -l
    # .htaccess dosyası oluştur (routing için gerekli)
    echo ""
    echo "📝 .htaccess dosyası oluşturuluyor..."
    cat > out/.htaccess << 'EOF'
# Next.js Static Export için .htaccess
# Tüm route'ları index.html'e yönlendir

RewriteEngine On
RewriteBase /

# 301 Yönlendirmeler: www ve non-www birleştirme
RewriteCond %{HTTP_HOST} ^metodmuhendislik\.com$ [NC]
RewriteRule ^(.*)$ https://www.metodmuhendislik.com/$1 [R=301,L]

# HTTP'den HTTPS'ye yönlendir
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# SEO: Duplicate/alternatif URL'leri canonical'a yönlendir
RewriteRule ^index\.html?$ / [R=301,L]
RewriteRule ^hizmetlerimiz/?$ /hizmetler [R=301,L]
RewriteRule ^hizmet-icerik/kaynak-28/?$ /hizmetler/kaynak [R=301,L]
RewriteRule ^hizmet-icerik/(.*)$ /hizmetler/$1 [R=301,L]

# _next klasörü ve statik dosyalar için özel kural - bunları index.html'e yönlendirme
RewriteCond %{REQUEST_URI} ^/_next/ [OR]
RewriteCond %{REQUEST_URI} \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot|webp|pdf)$ [NC]
RewriteRule . - [L]

# Trailing slash ekle (static export klasör yapısı için gerekli)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ $1/ [L,R=301]

# Eğer dosya veya klasör yoksa, index.html'e yönlendir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache ayarları
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Security headers ve karakter kodlama
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # CSS dosyaları için doğru Content-Type
  <FilesMatch "\.(css)$">
    Header set Content-Type "text/css; charset=utf-8"
  </FilesMatch>
  
  # JS dosyaları için doğru Content-Type
  <FilesMatch "\.(js)$">
    Header set Content-Type "application/javascript; charset=utf-8"
  </FilesMatch>
  
  # HTML dosyaları için Content-Type (sadece HTML dosyaları için)
  <FilesMatch "\.(html|htm)$">
    Header set Content-Type "text/html; charset=utf-8"
  </FilesMatch>
</IfModule>
EOF
    echo "✅ .htaccess dosyası oluşturuldu"
    
    echo ""
    echo "✅ Hazır! out klasöründeki dosyaları DirectAdmin'e yükleyebilirsiniz"
    echo "💡 ZIP oluşturmak için: cd out && zip -r ../site.zip ."
    echo "⚠️  ÖNEMLİ: .htaccess dosyasını da yüklemeyi unutma!"
else
    echo "❌ Build başarısız!"
    
    # Hata durumunda tüm klasörleri geri getir
    if [ -d "../api-backup-temp" ]; then
        mv ../api-backup-temp app/api
        echo "✅ API klasörü geri getirildi"
    fi
    if [ -d "../metod-backup-temp" ]; then
        mv ../metod-backup-temp app/metod
        echo "✅ Admin paneli geri getirildi"
    fi
    if [ -d "../urunler-slug-backup-temp" ]; then
        mv "../urunler-slug-backup-temp" "app/urunler/urunler/[slug]"
        echo "✅ Ürün detay sayfası geri getirildi"
    fi
    
    exit 1
fi

