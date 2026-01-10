#!/bin/bash

# Standalone Build Script (DirectAdmin'de Node.js desteği varsa)
# Bu build, tüm özelliklerin çalışması için Node.js server gerektirir

echo "🔨 Standalone Build Başlatılıyor..."
echo "⚠️  Bu build Node.js server gerektirir!"
echo ""

# .next klasörünü temizle
if [ -d ".next" ]; then
    echo "🧹 Eski build dosyaları temizleniyor..."
    rm -rf .next
fi

# Standalone build yap
echo "🏗️  Standalone build yapılıyor..."
DOCKER_BUILD=true npm run build

# Build sonucunu kontrol et
if [ $? -eq 0 ] && [ -d ".next/standalone" ]; then
    echo "✅ Build başarılı!"
    echo "📁 Dosyalar .next/standalone klasöründe hazır"
    echo ""
    echo "📊 Build bilgileri:"
    du -sh .next/standalone
    echo ""
    echo "📋 DirectAdmin'e Yükleme:"
    echo "1. .next/standalone klasöründeki dosyaları DirectAdmin'e yükle"
    echo "2. .next/static klasörünü de yükle"
    echo "3. public klasörünü de yükle"
    echo "4. Node.js server'ı başlat: node server.js"
    echo ""
    echo "⚠️  NOT: DirectAdmin'de Node.js desteği olmalı!"
    echo "⚠️  NOT: PM2 veya benzeri process manager kullanmanız gerekebilir"
else
    echo "❌ Build başarısız!"
    exit 1
fi

