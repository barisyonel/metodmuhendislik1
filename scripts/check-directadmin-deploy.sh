#!/bin/bash

# DirectAdmin Deploy Kontrol Scripti
# Bu script, DirectAdmin'e deploy için gerekli kontrolleri yapar

echo "🔍 DirectAdmin Deploy Kontrolü Başlatılıyor..."
echo ""

# 1. Node.js kontrolü
echo "1️⃣ Node.js Kontrolü:"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js yüklü: $NODE_VERSION"
else
    echo "   ❌ Node.js yüklü değil"
    echo "   💡 DirectAdmin'de Node.js desteği olmayabilir"
fi
echo ""

# 2. Next.js build kontrolü
echo "2️⃣ Next.js Build Kontrolü:"
if [ -f "package.json" ]; then
    echo "   ✅ package.json bulundu"
    if grep -q "next" package.json; then
        echo "   ✅ Next.js bağımlılığı mevcut"
    else
        echo "   ❌ Next.js bağımlılığı bulunamadı"
    fi
else
    echo "   ❌ package.json bulunamadı"
fi
echo ""

# 3. API route kontrolü
echo "3️⃣ API Route Kontrolü:"
if [ -d "app/api" ]; then
    API_COUNT=$(find app/api -name "route.ts" | wc -l | tr -d ' ')
    echo "   ✅ API route'lar bulundu: $API_COUNT adet"
    echo "   ⚠️  API route'lar için Node.js server gerekli"
else
    echo "   ℹ️  API route bulunamadı (static export mümkün)"
fi
echo ""

# 4. Veritabanı bağlantı kontrolü
echo "4️⃣ Veritabanı Bağlantı Kontrolü:"
if [ -f "lib/db.ts" ]; then
    echo "   ✅ Veritabanı konfigürasyonu mevcut"
    if grep -q "DB_HOST" lib/db.ts; then
        echo "   ✅ Environment variable desteği var"
    fi
else
    echo "   ❌ Veritabanı konfigürasyonu bulunamadı"
fi
echo ""

# 5. Build testi
echo "5️⃣ Build Testi:"
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules mevcut"
    echo "   🔄 Build testi yapılıyor..."
    npm run build 2>&1 | head -20
    if [ $? -eq 0 ]; then
        echo "   ✅ Build başarılı!"
    else
        echo "   ❌ Build başarısız"
    fi
else
    echo "   ⚠️  node_modules bulunamadı"
    echo "   💡 Önce 'npm install' çalıştırın"
fi
echo ""

# 6. Öneriler
echo "📋 ÖNERİLER:"
echo ""
echo "✅ EN İYİ ÇÖZÜM: Vercel + Domain Yönlendirme"
echo "   - Next.js'i Vercel'e deploy edin"
echo "   - DirectAdmin'den domain'i Vercel'e yönlendirin"
echo "   - Detaylar için: DIRECTADMIN_DEPLOYMENT.md dosyasına bakın"
echo ""
echo "⚠️  ALTERNATİF: Static Export (API'ler çalışmaz)"
echo "   - next.config.ts'de 'output: export' ekleyin"
echo "   - Sadece frontend sayfaları çalışır"
echo "   - Admin paneli ve API route'lar çalışmaz"
echo ""
echo "❌ DirectAdmin'de Node.js Server:"
echo "   - DirectAdmin'de genelde Node.js desteği yok"
echo "   - Hosting sağlayıcınızla Node.js desteği olup olmadığını kontrol edin"
echo ""

echo "✅ Kontrol tamamlandı!"

