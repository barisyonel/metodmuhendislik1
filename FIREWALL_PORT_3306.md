# MySQL Port 3306 Firewall Ayarları

## Önemli Not

**Web Application Firewall ≠ Server Firewall**

- **Web Application Firewall**: Web trafiği için (HTTP/HTTPS)
- **Server Firewall**: Tüm portlar için (MySQL port 3306 dahil)

## MySQL Port 3306 İçin Doğru Yer

### DirectAdmin'de Arayın:

1. **"Firewall"** bölümü
   - Ana menüde "Firewall" veya "Security" seçeneği
   - Port yönetimi burada olmalı

2. **"Server Manager"** (Admin Level)
   - Eğer admin yetkileriniz varsa
   - "Firewall" veya "Port Management" burada olabilir

3. **"Security"** bölümü
   - "Firewall Rules" veya "Port Rules" seçeneği

### Hosting Sağlayıcı Kontrol Paneli

Eğer DirectAdmin'de bulamazsanız:
- Hosting sağlayıcınızın ana kontrol panelinden firewall ayarlarına bakın
- Veya hosting sağlayıcınızla iletişime geçin

## Port 3306 Kontrolü

MySQL port 3306'in açık olması gerekiyor:
- **Port**: 3306
- **Protocol**: TCP
- **Action**: Allow

## Alternatif Çözüm

Eğer firewall'u kontrol edemiyorsanız:

1. **Allowed Hosts'ta `%` var mı?** ✅ (Zaten var)
2. **Veritabanı bilgileri doğru mu?** (Kontrol edin)
3. **DNS doğru mu?** (Kontrol edin)

Firewall port 3306'i engelliyor olabilir ama bu hosting sağlayıcı seviyesinde olabilir.

## Test

Local'de dev server'ı başlatın:
```bash
npm run dev
```

Eğer hala `ETIMEDOUT` hatası alıyorsanız:
- Firewall port 3306'i engelliyor olabilir
- Hosting sağlayıcınızla iletişime geçin

