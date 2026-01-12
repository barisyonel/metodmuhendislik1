# DirectAdmin Erişim Rehberi

## Durum
- ✅ `directadmin.metodmuhendislik.com:2222` erişilebilir
- ❌ SSL sertifika hatası var (NET::ERR_CERT_COMMON_NAME_INVALID)
- ❌ IP adresi ile erişim çalışmıyor (firewall engeli olabilir)

## Çözüm 1: SSL Uyarısını Atlayın (Hemen Kullanım İçin)

1. Chrome'da "Gelişmiş" (Advanced) butonuna tıklayın
2. Sayfanın en altında "directadmin.metodmuhendislik.com'a devam et" linkini bulun
3. Bu linke tıklayın
4. DirectAdmin giriş sayfası açılacak

**NOT**: Bu güvenli değil ama DirectAdmin'e erişmek için geçici olarak kullanılabilir.

## Çözüm 2: IP Adresi ile Erişim

### Neden Çalışmıyor?
- Hosting sağlayıcınızın firewall'u port 2222'yi engelliyor olabilir
- DirectAdmin sadece belirli IP'lerden erişime izin veriyor olabilir
- Port 2222 dışarıdan erişime kapalı olabilir

### Alternatif Yöntemler:

#### A) Hosting Sağlayıcı Kontrol Paneli
- Hosting sağlayıcınızın ana kontrol panelinden DirectAdmin'e erişin
- Genellikle "DirectAdmin" veya "Control Panel" linki vardır

#### B) VPN veya SSH Tunnel
- SSH üzerinden port forwarding yapın
- Veya VPN ile sunucuya bağlanın

#### C) Subdomain Kullanımı (Önerilen)
- `directadmin.metodmuhendislik.com:2222` kullanın
- SSL uyarısını atlayın (yukarıdaki Çözüm 1)

## Çözüm 3: SSL Sertifikası Düzeltme (Kalıcı Çözüm)

### DirectAdmin'de SSL Sertifikası Ekleyin:

1. DirectAdmin'e giriş yapın (SSL uyarısını atlayarak)
2. **"SSL Certificates"** bölümüne gidin
3. **"Let's Encrypt"** sekmesine gidin
4. `directadmin.metodmuhendislik.com` için sertifika oluşturun
5. Veya mevcut sertifikayı güncelleyin

### Alternatif: Self-Signed Certificate Kullanımı

DirectAdmin varsayılan olarak self-signed certificate kullanır. Bu yüzden tarayıcı uyarı veriyor. Bu normal ve güvenli değil ama DirectAdmin yönetimi için kullanılabilir.

## Güvenlik Notları

⚠️ **SSL uyarısını atlamak güvenli değil** ama DirectAdmin yönetimi için geçici olarak kabul edilebilir.

✅ **Önerilen**: 
- DirectAdmin'e erişirken SSL uyarısını atlayın
- İşiniz bitince tarayıcıyı kapatın
- Mümkünse VPN kullanın
- İleride Let's Encrypt sertifikası ekleyin

## Hızlı Erişim

**Şimdi kullanım için**:
1. `https://directadmin.metodmuhendislik.com:2222` adresine gidin
2. "Gelişmiş" → "devam et" linkine tıklayın
3. DirectAdmin giriş sayfası açılacak

**IP ile deneme** (çalışmıyorsa normal):
- `https://136.243.71.174:2222` (firewall engeli olabilir)

