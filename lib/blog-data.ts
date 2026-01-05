// Marmara Bölgesi İl ve İlçe Verileri

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  location: string;
  keywords: string[];
  date: string;
}

// İstanbul İlçeleri
export const istanbulDistricts = [
  "adalar",
  "arnavutkoy",
  "atasehir",
  "avcilar",
  "bagcilar",
  "bahcelievler",
  "bakirkoy",
  "basaksehir",
  "bayrampasa",
  "besiktas",
  "beykoz",
  "beylikduzu",
  "beyoglu",
  "buyukcekmece",
  "catalca",
  "cekmekoy",
  "esenler",
  "esenyurt",
  "eyupsultan",
  "fatih",
  "gaziosmanpasa",
  "gungoren",
  "kadikoy",
  "kagithane",
  "kartal",
  "kucukcekmece",
  "maltepe",
  "pendik",
  "sancaktepe",
  "sariyer",
  "silivri",
  "sultanbeyli",
  "sultangazi",
  "sile",
  "sisli",
  "tuzla",
  "umraniye",
  "uskudar",
  "zeytinburnu",
];

// İstanbul İlçe İsimleri (Türkçe)
export const istanbulDistrictNames: Record<string, string> = {
  adalar: "Adalar",
  arnavutkoy: "Arnavutköy",
  atasehir: "Ataşehir",
  avcilar: "Avcılar",
  bagcilar: "Bağcılar",
  bahcelievler: "Bahçelievler",
  bakirkoy: "Bakırköy",
  basaksehir: "Başakşehir",
  bayrampasa: "Bayrampaşa",
  besiktas: "Beşiktaş",
  beykoz: "Beykoz",
  beylikduzu: "Beylikdüzü",
  beyoglu: "Beyoğlu",
  buyukcekmece: "Büyükçekmece",
  catalca: "Çatalca",
  cekmekoy: "Çekmeköy",
  esenler: "Esenler",
  esenyurt: "Esenyurt",
  eyupsultan: "Eyüpsultan",
  fatih: "Fatih",
  gaziosmanpasa: "Gaziosmanpaşa",
  gungoren: "Güngören",
  kadikoy: "Kadıköy",
  kagithane: "Kağıthane",
  kartal: "Kartal",
  kucukcekmece: "Küçükçekmece",
  maltepe: "Maltepe",
  pendik: "Pendik",
  sancaktepe: "Sancaktepe",
  sariyer: "Sarıyer",
  silivri: "Silivri",
  sultanbeyli: "Sultanbeyli",
  sultangazi: "Sultangazi",
  sile: "Şile",
  sisli: "Şişli",
  tuzla: "Tuzla",
  umraniye: "Ümraniye",
  uskudar: "Üsküdar",
  zeytinburnu: "Zeytinburnu",
};

// Gebze ve Kocaeli İlçeleri
export const gebzeKocaeliDistricts = [
  "gebze",
  "izmit",
  "kocaeli",
  "darica",
  "dilovasi",
  "kartepe",
  "karamursel",
  "kandira",
  "basiskele",
  "cayirova",
  "derince",
  "golcuk",
];

export const gebzeKocaeliDistrictNames: Record<string, string> = {
  gebze: "Gebze",
  izmit: "İzmit",
  kocaeli: "Kocaeli",
  darica: "Darıca",
  dilovasi: "Dilovası",
  kartepe: "Kartepe",
  karamursel: "Karamürsel",
  kandira: "Kandıra",
  basiskele: "Başiskele",
  cayirova: "Çayırova",
  derince: "Derince",
  golcuk: "Gölcük",
};

// Diğer Marmara İlleri
export const otherMarmaraCities = [
  "bursa",
  "balikesir",
  "canakkale",
  "edirne",
  "kirklareli",
  "sakarya",
  "tekirdag",
  "yalova",
];

export const otherMarmaraCityNames: Record<string, string> = {
  bursa: "Bursa",
  balikesir: "Balıkesir",
  canakkale: "Çanakkale",
  edirne: "Edirne",
  kirklareli: "Kırklareli",
  sakarya: "Sakarya",
  tekirdag: "Tekirdağ",
  yalova: "Yalova",
};

// Blog içeriği oluşturma fonksiyonu
export function generateBlogContent(
  location: string,
  locationName: string,
  serviceType: "elektrik-pano" | "kaynak" | "genel"
): BlogPost {
  // locationName'in undefined olmamasını garanti et
  const safeLocationName = locationName || location || "Marmara Bölgesi";
  
  const baseKeywords = [
    `${safeLocationName} elektrik pano`,
    `${safeLocationName} kaynak hizmetleri`,
    `${safeLocationName} endüstriyel üretim`,
    `Marmara bölgesi ${safeLocationName}`,
  ];

  let title = "";
  let description = "";
  let content = "";

  if (serviceType === "elektrik-pano") {
    title = `${safeLocationName}'de Elektrik Pano Üretimi ve Montaj Hizmetleri`;
    description = `${safeLocationName} bölgesinde elektrik pano üretimi, montaj, bakım ve onarım hizmetleri. Sıvaüstü, sıvaaltı, dahili ve marin pano çözümleri.`;
    content = generateElectricPanelContent(safeLocationName);
  } else if (serviceType === "kaynak") {
    title = `${safeLocationName}'de Profesyonel Kaynak Hizmetleri ve Metal İmalat`;
    description = `${safeLocationName} bölgesinde metal kaynak, TIG kaynak, MIG/MAG kaynak ve endüstriyel imalat hizmetleri. Uzman ekibimizle profesyonel çözümler.`;
    content = generateWeldingContent(safeLocationName);
  } else {
    title = `${safeLocationName}'de Elektrik Pano ve Kaynak Hizmetleri`;
    description = `${safeLocationName} bölgesinde elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri. Kaliteli ve güvenilir hizmet.`;
    content = generateGeneralContent(safeLocationName);
  }
  
  // Tarih formatını güvenli şekilde oluştur
  const today = new Date();
  const dateString = today.toISOString ? today.toISOString().split("T")[0] : today.toISOString().substring(0, 10);
  
  return {
    slug: `${location}-${serviceType}`,
    title: title || `${safeLocationName}'de Endüstriyel Üretim Hizmetleri`,
    description: description || `${safeLocationName} bölgesinde profesyonel hizmetler.`,
    content: content || generateGeneralContent(safeLocationName),
    category: safeLocationName.includes("İstanbul") ? "İstanbul" : safeLocationName.includes("Gebze") ? "Gebze & Kocaeli" : "Marmara",
    location: safeLocationName,
    keywords: baseKeywords,
    date: dateString,
  };
}

function generateElectricPanelContent(locationName: string): string {
  return `
    <div class="mb-8">
      <h2 class="text-3xl font-black text-slate-900 mb-4">${locationName}'de Elektrik Pano Üretimi ve Montaj Hizmetleri</h2>
      <p class="text-slate-700 text-lg leading-relaxed mb-6">${locationName} bölgesinde elektrik pano üretimi ve montaj hizmetleri sunan <strong>Metod Mühendislik</strong>, 10+ yıllık deneyimi ile sektörün öncü firmasıdır. ${locationName}'de endüstriyel tesisler, ticari yapılar ve konut projeleri için güvenilir elektrik pano çözümleri sunuyoruz. Marmara Bölgesi'nin en kaliteli elektrik pano üreticilerinden biri olarak, ${locationName} ve çevresinde hizmet vermekteyiz.</p>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">Elektrik Pano Çeşitleri</h3>
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h4 class="font-bold text-slate-900 mb-2">Sıvaüstü Elektrik Panoları</h4>
          <p class="text-slate-700">${locationName}'de endüstriyel ve ticari yapılar için sıvaüstü elektrik pano üretimi ve montajı. Duvar üzerine monte edilen, bakımı kolay ve erişilebilir panolar.</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h4 class="font-bold text-slate-900 mb-2">Sıvaaltı Elektrik Panoları</h4>
          <p class="text-slate-700">Modern binalar için sıvaaltı elektrik pano çözümleri. Estetik görünüm ve mekan tasarımına uyumlu panolar.</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h4 class="font-bold text-slate-900 mb-2">Dahili Elektrik Panolar</h4>
          <p class="text-slate-700">İç mekan uygulamaları için özel tasarım dahili panolar. Müşteri ihtiyaçlarına göre özelleştirilebilir çözümler.</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h4 class="font-bold text-slate-900 mb-2">Marin Panolar</h4>
          <p class="text-slate-700">Denizcilik sektörü için özel korumalı marin pano üretimi. Deniz ortamına dayanıklı malzemeler ve özel koruma sistemleri.</p>
        </div>
      </div>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">${locationName}'de Elektrik Pano Montajı ve Bakımı</h3>
      <p class="text-slate-700 text-lg leading-relaxed mb-4">${locationName} bölgesinde elektrik pano montajı, bakımı ve onarımı konusunda uzman ekibimizle hizmet veriyoruz. Tüm montaj işlemleri uluslararası standartlara (IEC, EN) uygun olarak gerçekleştirilmektedir. ${locationName}'de elektrik pano montajı için:</p>
      <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
        <li>Ücretsiz keşif ve proje değerlendirmesi</li>
        <li>Profesyonel montaj ekibi</li>
        <li>7/24 acil servis hizmeti</li>
        <li>Periyodik bakım ve kontrol hizmetleri</li>
        <li>Garanti ve teknik destek</li>
      </ul>
    </div>
    
    <div class="mb-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-blue-200">
      <h3 class="text-2xl font-black text-slate-900 mb-4">Neden ${locationName}'de Metod Mühendislik?</h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>10+ yıllık sektör deneyimi</strong> - Binlerce başarılı proje</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>ISO 9001 kalite sertifikası</strong> - Uluslararası standartlar</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Zamanında teslimat garantisi</strong> - Projeleriniz zamanında</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Uzman mühendislik ekibi</strong> - Alanında uzman personel</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>${locationName} bölgesinde hızlı servis</strong> - Hızlı müdahale</span>
        </li>
      </ul>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">${locationName}'de Elektrik Pano Fiyatları</h3>
      <p class="text-slate-700 text-lg leading-relaxed mb-4">${locationName}'de elektrik pano fiyatları, pano tipi, kapasitesi, özel gereksinimler ve montaj koşullarına göre değişiklik göstermektedir. ${locationName} bölgesi için en uygun fiyatlı elektrik pano çözümlerini sunmak için ücretsiz keşif hizmeti veriyoruz. Projenizin detaylarını paylaştığınızda, size özel teklif hazırlıyoruz.</p>
    </div>
    
    <div class="p-6 bg-blue-600 text-white rounded-xl">
      <p class="text-lg font-semibold mb-2">${locationName}'de elektrik pano ihtiyaçlarınız için bizimle iletişime geçin.</p>
      <p class="text-blue-100">Uzman ekibimiz projenizi değerlendirip en uygun çözümü sunacaktır. Ücretsiz keşif ve teklif hizmeti için WhatsApp üzerinden bize ulaşabilirsiniz.</p>
    </div>
  `;
}

function generateWeldingContent(locationName: string): string {
  return `
    <div class="mb-8">
      <h2 class="text-3xl font-black text-slate-900 mb-4">${locationName}'de Profesyonel Kaynak Hizmetleri ve Metal İmalat</h2>
      <p class="text-slate-700 text-lg leading-relaxed mb-6">${locationName} bölgesinde metal kaynak ve imalat hizmetleri sunan <strong>Metod Mühendislik</strong>, endüstriyel üretimde güvenilir çözüm ortağınızdır. ${locationName}'de TIG, MIG/MAG ve elektrot kaynak yöntemleri ile profesyonel hizmet veriyoruz. Marmara Bölgesi'nin en kaliteli kaynak hizmeti sağlayıcılarından biri olarak, ${locationName} ve çevresinde 10+ yıllık deneyimimizle hizmet vermekteyiz.</p>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">Kaynak Yöntemleri</h3>
      <div class="space-y-4">
        <div class="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
          <h4 class="font-bold text-slate-900 mb-2">TIG Kaynak (Tungsten Inert Gas)</h4>
          <p class="text-slate-700">${locationName}'de paslanmaz çelik ve alüminyum için TIG kaynak hizmetleri. Yüksek kaliteli, temiz ve estetik kaynak dikişleri. Özellikle ince malzemeler ve hassas işler için idealdir.</p>
        </div>
        <div class="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
          <h4 class="font-bold text-slate-900 mb-2">MIG/MAG Kaynak</h4>
          <p class="text-slate-700">Çelik ve demir malzemeler için MIG/MAG kaynak çözümleri. Hızlı ve verimli kaynak işlemleri. Endüstriyel üretimde yaygın olarak kullanılan yöntem.</p>
        </div>
        <div class="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
          <h4 class="font-bold text-slate-900 mb-2">Elektrot Kaynağı</h4>
          <p class="text-slate-700">Genel amaçlı kaynak işlemleri için elektrot kaynağı hizmetleri. Çelik konstrüksiyon ve genel imalat işlerinde kullanılır.</p>
        </div>
      </div>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">${locationName}'de Metal İmalat ve Çelik Konstrüksiyon</h3>
      <p class="text-slate-700 text-lg leading-relaxed mb-4">${locationName} bölgesinde metal imalat, çelik konstrüksiyon ve özel parça üretimi konusunda uzmanız. Endüstriyel projeler için kaliteli ve dayanıklı çözümler sunuyoruz. ${locationName}'de metal imalat hizmetlerimiz:</p>
      <ul class="list-disc list-inside space-y-2 text-slate-700 mb-4">
        <li>Çelik konstrüksiyon üretimi ve montajı</li>
        <li>Makine gövdeleri ve özel parça imalatı</li>
        <li>Tank ve basınçlı kap üretimi</li>
        <li>Özel tasarım metal parçalar</li>
        <li>Endüstriyel ekipman üretimi</li>
      </ul>
    </div>
    
    <div class="mb-8">
      <h3 class="text-2xl font-black text-slate-900 mb-4">Hizmet Alanlarımız</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-slate-50 rounded-lg">
          <h4 class="font-bold text-slate-900 mb-2">Çelik Konstrüksiyon Kaynağı</h4>
          <p class="text-slate-700 text-sm">Fabrika binaları, depo yapıları ve endüstriyel tesisler için çelik konstrüksiyon kaynak hizmetleri.</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg">
          <h4 class="font-bold text-slate-900 mb-2">Makine Gövdeleri İmalatı</h4>
          <p class="text-slate-700 text-sm">Endüstriyel makineler için özel tasarım gövde ve parça üretimi.</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg">
          <h4 class="font-bold text-slate-900 mb-2">Tank ve Basınçlı Kap Üretimi</h4>
          <p class="text-slate-700 text-sm">Endüstriyel tanklar ve basınçlı kaplar için kaynak ve imalat hizmetleri.</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg">
          <h4 class="font-bold text-slate-900 mb-2">Özel Tasarım Metal Parçalar</h4>
          <p class="text-slate-700 text-sm">Müşteri ihtiyaçlarına özel tasarım ve üretim çözümleri.</p>
        </div>
      </div>
    </div>
    
    <div class="mb-8 p-6 bg-gradient-to-br from-slate-50 to-orange-50 rounded-xl border-2 border-orange-200">
      <h3 class="text-2xl font-black text-slate-900 mb-4">${locationName}'de Kaynak Hizmeti İçin Neden Metod Mühendislik?</h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Uzman kaynakçılar</strong> - Yılların verdiği deneyim</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Modern kaynak ekipmanları</strong> - Son teknoloji makineler</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Kalite kontrol</strong> - Tüm kaynaklar test edilir</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>Hızlı teslimat</strong> - Zamanında proje tamamlama</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-green-600 font-bold text-xl">✓</span>
          <span class="text-slate-700"><strong>${locationName} bölgesinde servis</strong> - Hızlı müdahale</span>
        </li>
      </ul>
    </div>
    
    <div class="p-6 bg-orange-600 text-white rounded-xl">
      <p class="text-lg font-semibold mb-2">${locationName}'de kaynak ve metal imalat ihtiyaçlarınız için Metod Mühendislik ile iletişime geçin.</p>
      <p class="text-orange-100">Uzman ekibimiz projenizi değerlendirip en uygun çözümü sunacaktır. Ücretsiz keşif ve teklif hizmeti için WhatsApp üzerinden bize ulaşabilirsiniz.</p>
    </div>
  `;
}

function generateGeneralContent(locationName: string): string {
  return `
    <h2>${locationName}'de Endüstriyel Üretim Çözümleri</h2>
    <p>${locationName} bölgesinde elektrik pano üretimi, kaynak hizmetleri ve endüstriyel üretim çözümleri sunan Metod Mühendislik, Marmara Bölgesi'nin öncü firmalarından biridir.</p>
    
    <h3>Hizmetlerimiz</h3>
    <ul>
      <li><strong>Elektrik Pano Üretimi:</strong> ${locationName}'de sıvaüstü, sıvaaltı, dahili ve marin pano üretimi.</li>
      <li><strong>Kaynak Hizmetleri:</strong> Metal kaynak, TIG, MIG/MAG kaynak ve imalat hizmetleri.</li>
      <li><strong>CNC Lazer Kesim:</strong> Hassas lazer kesim çözümleri.</li>
      <li><strong>CNC Büküm:</strong> Profesyonel büküm hizmetleri.</li>
    </ul>
    
    <h3>${locationName} Bölgesinde Hizmet</h3>
    <p>${locationName} ve çevresinde endüstriyel üretim ihtiyaçlarınız için 7/24 hizmet veriyoruz. Uzman ekibimiz ve modern teknolojimiz ile ${locationName}'de kaliteli çözümler sunuyoruz.</p>
    
    <p>${locationName}'de elektrik pano ve kaynak hizmetleri için bizimle iletişime geçin.</p>
  `;
}

