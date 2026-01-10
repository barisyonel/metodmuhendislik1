import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const hizmetler: {
  [key: string]: {
    title: string;
    description: string;
    metaDescription: string;
    keywords: string;
    icon: string;
    color: string;
    img: string;
    content: {
      h2: string;
      paragraphs: string[];
    }[];
    specs?: { k: string; v: string }[];
  };
} = {
  "cnc-lazer-kesim": {
    title: "CNC Lazer Kesim",
    description:
      "Hassas ve hızlı lazer kesim hizmetleri ile endüstriyel üretimde öncü. Yüksek kaliteli malzemelerde kesim çözümleri.",
    metaDescription:
      "CNC lazer kesim hizmetleri. İstanbul'da hassas lazer kesim çözümleri. ±0.05 mm hassasiyet ile profesyonel hizmet. Siyah sac ve paslanmaz çelik kesim.",
    keywords:
      "CNC lazer kesim, lazer kesim İstanbul, hassas kesim, metal kesim, endüstriyel kesim",
    icon: "⚡",
    color: "from-blue-500 to-blue-600",
    img: "https://picsum.photos/seed/laser1/600/400",
    content: [
      {
        h2: "CNC Lazer Kesim Teknolojisi ve Avantajları",
        paragraphs: [
          "CNC lazer kesim, endüstriyel üretimde en hassas ve hızlı kesim yöntemlerinden biridir. Yüksek güçlü lazer ışınları kullanılarak gerçekleştirilen bu işlem, çelik, paslanmaz çelik, alüminyum ve diğer metal malzemelerde mükemmel sonuçlar vermektedir.",
          "CNC lazer kesim teknolojisinin en büyük avantajları arasında, geleneksel kesim yöntemlerine göre çok daha yüksek hassasiyet, minimum malzeme kaybı ve hızlı üretim süreleri yer almaktadır. Metod Mühendislik olarak, son teknoloji CNC lazer kesim makinelerimiz ile çalışmaktayız.",
        ],
      },
      {
        h2: "Kesim Kapasitelerimiz ve Teknik Özellikler",
        paragraphs: [
          "Bu makinelerimiz sayesinde, kalınlığı 25 mm'ye kadar olan siyah sac ve 15 mm'ye kadar olan paslanmaz çelik malzemelerde kesim işlemleri gerçekleştirebilmekteyiz. Kesim hassasiyetimiz ±0.05 mm seviyesindedir, bu da endüstriyel standartların çok üzerinde bir kalite sunmaktadır.",
          "CNC lazer kesim hizmetlerimiz, otomotiv, makine imalatı, mimari uygulamalar ve genel endüstriyel üretim sektörlerinde yaygın olarak kullanılmaktadır. Kesim alanımız 2000 x 4000 mm boyutlarındadır.",
        ],
      },
      {
        h2: "Kullanım Alanları ve Uygulamalar",
        paragraphs: [
          "CNC lazer kesim teknolojimiz, çeşitli endüstriyel uygulamalarda kullanılmaktadır. Otomotiv sektöründe parça üretimi, makine imalatında gövde ve kapak üretimi, mimari uygulamalarda dekoratif elemanlar ve genel endüstriyel üretimde özel parçalar için ideal çözümler sunmaktayız.",
          "Her projede müşteri gereksinimlerini analiz ederek, en uygun kesim parametrelerini belirlemekte ve maksimum kalite ile minimum fire oranı hedeflemekteyiz.",
        ],
      },
    ],
    specs: [
      { k: "Kesim Alanı", v: "2000 x 4000 mm" },
      { k: "Siyah Sac Kapasite", v: "25 mm" },
      { k: "Paslanmaz Kapasite", v: "15 mm" },
      { k: "Hassasiyet", v: "± 0.05 mm" },
    ],
  },
  "cnc-bukum": {
    title: "CNC Büküm",
    description:
      "Profesyonel CNC büküm hizmetleri ile şekillendirme çözümleri. Hassas açı kontrolü ve kaliteli işçilik.",
    metaDescription:
      "CNC büküm hizmetleri. İstanbul'da profesyonel abkant büküm çözümleri. Hassas açı kontrolü ile kompleks geometrili parçalar için ideal çözüm.",
    keywords:
      "CNC büküm, abkant büküm, metal büküm, şekillendirme, İstanbul",
    icon: "🔧",
    color: "from-slate-600 to-slate-700",
    img: "/cncbukum.png",
    content: [
      {
        h2: "CNC Büküm ve Şekillendirme Çözümleri",
        paragraphs: [
          "CNC büküm veya CNC abkant büküm, metal levhaların hassas açılarla şekillendirilmesi için kullanılan modern bir üretim yöntemidir. Bu teknoloji sayesinde, kompleks geometrili parçalar tek seferde ve yüksek hassasiyetle üretilebilmektedir.",
          "CNC büküm makinelerimiz, programlanabilir kontrol sistemleri sayesinde, tekrarlanabilir ve tutarlı sonuçlar sunmaktadır. Endüstriyel üretimde CNC büküm hizmetlerimiz, özellikle pano üretimi, makine gövdeleri, mimari uygulamalar ve özel tasarım ürünlerinde kritik öneme sahiptir.",
        ],
      },
      {
        h2: "Büküm Kapasitelerimiz ve Teknik Özellikler",
        paragraphs: [
          "Uzman ekibimiz, her projede müşteri gereksinimlerini analiz ederek, en uygun büküm açılarını ve teknik çözümleri sunmaktadır. CNC büküm sürecimizde, malzeme kalınlığına ve tipine göre özel kalıplar kullanılarak, maksimum kalite ve minimum fire oranı hedeflenmektedir.",
          "Büküm işlemlerimizde, çelik, paslanmaz çelik, alüminyum ve diğer metal malzemelerde çalışabilmekteyiz. Büküm açıları 0° ile 180° arasında değişebilmekte ve hassasiyet ±0.1° seviyesindedir.",
        ],
      },
    ],
    specs: [
      { k: "Maksimum Büküm Uzunluğu", v: "4000 mm" },
      { k: "Maksimum Malzeme Kalınlığı", v: "10 mm" },
      { k: "Büküm Açısı", v: "0° - 180°" },
      { k: "Hassasiyet", v: "± 0.1°" },
    ],
  },
  kaynak: {
    title: "Kaynak & İmalat",
    description:
      "Yüksek kaliteli kaynak ve imalat hizmetleri ile güvenilir çözümler. Uzman ekibimizle profesyonel hizmet.",
    metaDescription:
      "Kaynak ve imalat hizmetleri. İstanbul'da TIG, MIG/MAG kaynak yöntemleri ile profesyonel kaynak hizmetleri. Çelik konstrüksiyon ve imalat çözümleri.",
    keywords:
      "kaynak, metal kaynak, TIG kaynak, MIG kaynak, imalat, çelik konstrüksiyon, İstanbul",
    icon: "🔥",
    color: "from-orange-500 to-orange-600",
    img: "https://picsum.photos/seed/weld1/600/400",
    content: [
      {
        h2: "Metal Kaynak ve İmalat Hizmetlerinde Uzmanlık",
        paragraphs: [
          "Metal kaynak ve imalat hizmetlerimiz, endüstriyel üretim süreçlerinin vazgeçilmez bir parçasıdır. TIG kaynak, MIG/MAG kaynak ve elektrot kaynağı gibi farklı metal kaynak yöntemlerini kullanarak, çelik, paslanmaz çelik, alüminyum ve diğer metal alaşımlarda profesyonel metal kaynak işlemleri gerçekleştirmekteyiz.",
          "Metal kaynak işlemlerimiz, uluslararası standartlara uygun olarak yapılmakta ve kalite kontrol testlerinden geçmektedir. Endüstriyel üretimde metal kaynak hizmetlerimiz, özellikle çelik konstrüksiyon, makine imalatı, tank ve basınçlı kap üretimi, elektrik pano ve marin pano üretimi gibi kritik uygulamalarda kullanılmaktadır.",
        ],
      },
      {
        h2: "Metal Kaynak Yöntemlerimiz ve Uygulamalar",
        paragraphs: [
          "Uzman kaynakçılarımız, yılların verdiği deneyimle, her türlü metal kaynak işlemini gerçekleştirebilmektedir. Metal kaynak işlemlerimizde, malzeme özelliklerine uygun kaynak malzemeleri ve parametreleri seçilerek, maksimum dayanıklılık ve güvenilirlik sağlanmaktadır.",
          "TIG kaynak yöntemi, özellikle ince malzemeler ve paslanmaz çelik uygulamalarında kullanılmaktadır. MIG/MAG kaynak yöntemi ise, daha kalın malzemeler ve seri üretim uygulamalarında tercih edilmektedir.",
        ],
      },
    ],
    specs: [
      { k: "Kaynak Yöntemleri", v: "TIG, MIG/MAG, Elektrot" },
      { k: "Malzeme Tipleri", v: "Çelik, Paslanmaz, Alüminyum" },
      { k: "Kalite Kontrol", v: "Uluslararası Standartlar" },
      { k: "Uygulama Alanları", v: "Konstrüksiyon, Makine, Tank" },
    ],
  },
  "elektrostatik-toz-boya": {
    title: "Elektrostatik Toz Boya",
    description:
      "Modern boya teknolojileri ile uzun ömürlü ve estetik yüzey işlemleri. Çevre dostu çözümler.",
    metaDescription:
      "Elektrostatik toz boya hizmetleri. İstanbul'da RAL renk standardına uygun boyama hizmetleri. Çevre dostu ve uzun ömürlü yüzey işlemleri.",
    keywords:
      "elektrostatik toz boya, toz boya, yüzey işleme, RAL renk, İstanbul",
    icon: "🎨",
    color: "from-purple-500 to-purple-600",
    img: "https://picsum.photos/seed/paint1/600/400",
    content: [
      {
        h2: "Elektrostatik Toz Boya ve Yüzey İşlemleri",
        paragraphs: [
          "Elektrostatik toz boya teknolojisi, endüstriyel üretimde uzun ömürlü ve estetik yüzey işlemleri için tercih edilen modern bir yöntemdir. Bu teknoloji sayesinde, metal yüzeylerde kalıcı, çevre dostu ve yüksek kaliteli boya kaplamaları elde edilmektedir.",
          "Elektrostatik toz boya işlemlerimiz, ön yüzey hazırlığından fırınlama sürecine kadar tüm aşamalarda uzman kontrolü altında gerçekleştirilmektedir. Metod Mühendislik olarak, geniş bir renk paleti ve farklı yüzey dokuları sunmaktayız.",
        ],
      },
      {
        h2: "Boya İşlem Süreçleri ve Renk Seçenekleri",
        paragraphs: [
          "Elektrostatik toz boya hizmetlerimiz, özellikle pano üretimi, makine gövdeleri, mimari uygulamalar ve genel endüstriyel ürünlerde kullanılmaktadır. Boya işlemlerimizde, RAL renk standardına uygun olarak çalışmakta ve müşteri taleplerine göre özel renkler de üretebilmekteyiz.",
          "Ön yüzey hazırlığı aşamasında, malzeme yüzeyi temizlenmekte ve gerekli durumlarda fosfatlama işlemi uygulanmaktadır. Boya uygulama aşamasında, elektrostatik yöntem kullanılarak boya parçacıkları malzeme yüzeyine eşit şekilde dağıtılmaktadır.",
        ],
      },
    ],
    specs: [
      { k: "Renk Standardı", v: "RAL" },
      { k: "Fırınlama Sıcaklığı", v: "180°C - 200°C" },
      { k: "Kaplama Kalınlığı", v: "60-120 μm" },
      { k: "Yüzey Hazırlık", v: "Fosfatlama, Temizleme" },
    ],
  },
  "magaza-raf-ve-urunleri": {
    title: "Mağaza Raf Ve Ürünleri",
    description:
      "Mağaza içi raf sistemleri ve özel ürünler. İhtiyacınıza özel tasarım ve üretim çözümleri.",
    metaDescription:
      "Mağaza raf ve ürünleri. İstanbul'da özel tasarım mağaza raf sistemleri. Estetik ve fonksiyonel mağaza düzenlemeleri için profesyonel çözümler.",
    keywords:
      "mağaza raf, raf sistemi, mağaza düzenleme, perakende çözümleri, İstanbul",
    icon: "📦",
    color: "from-green-500 to-green-600",
    img: "https://picsum.photos/seed/shelf1/600/400",
    content: [
      {
        h2: "Mağaza Raf Sistemleri ve Ürünleri",
        paragraphs: [
          "Mağaza içi düzenlemeleriniz için özel tasarım raf ve ürün çözümleri sunuyor, estetik ve fonksiyonelliği bir arada sağlıyoruz. Mağaza raf sistemlerimiz, müşteri ihtiyaçlarına özel olarak tasarlanmakta ve üretilmektedir.",
          "Raf sistemlerimizde, çelik, paslanmaz çelik ve alüminyum gibi dayanıklı malzemeler kullanılmaktadır. Tasarım aşamasında, mağaza içi mekan kullanımı ve müşteri akışı analiz edilerek, en uygun çözümler geliştirilmektedir.",
        ],
      },
      {
        h2: "Tasarım ve Üretim Süreçleri",
        paragraphs: [
          "Mağaza raf ve ürünlerimiz, CNC lazer kesim, CNC büküm ve kaynak işlemleri ile üretilmektedir. Yüzey işlemleri için elektrostatik toz boya uygulanmakta ve müşteri tercihlerine göre özel renkler seçilebilmektedir.",
          "Raf sistemlerimiz, modüler yapıda tasarlanmakta ve kolay montaj imkanı sunmaktadır. Ayrıca, mağaza içi vitrin sistemleri, askılık sistemleri ve özel ürünler de üretmekteyiz.",
        ],
      },
    ],
    specs: [
      { k: "Malzeme", v: "Çelik, Paslanmaz, Alüminyum" },
      { k: "Tasarım", v: "Özel Tasarım" },
      { k: "Yüzey İşlem", v: "Toz Boya" },
      { k: "Montaj", v: "Modüler Sistem" },
    ],
  },
  "celik-konstruksiyon": {
    title: "Çelik Konstrüksiyon",
    description:
      "Sağlam ve dayanıklı çelik konstrüksiyon çözümleri. Endüstriyel yapılarda güvenilir hizmet.",
    metaDescription:
      "Çelik konstrüksiyon hizmetleri. İstanbul'da mühendislik standartlarına uygun çelik yapı çözümleri. Fabrika binaları, depo yapıları ve endüstriyel tesisler.",
    keywords:
      "çelik konstrüksiyon, çelik yapı, endüstriyel yapı, fabrika binası, İstanbul",
    icon: "🏗️",
    color: "from-gray-600 to-gray-700",
    img: "https://picsum.photos/seed/steel1/600/400",
    content: [
      {
        h2: "Çelik Konstrüksiyon ve Mühendislik Çözümleri",
        paragraphs: [
          "Çelik konstrüksiyon projelerimiz, endüstriyel yapılarda güvenilir ve dayanıklı çözümler sunmaktadır. Uzman mühendislik ekibimiz, her projede statik hesaplamalar, tasarım ve üretim süreçlerini yönetmektedir.",
          "Çelik konstrüksiyon hizmetlerimiz, fabrika binaları, depo yapıları, köprüler ve özel mimari uygulamalar gibi geniş bir yelpazede kullanılmaktadır. Endüstriyel üretimde mühendislik çözümlerimiz, sadece üretim süreçleriyle sınırlı kalmamakta, proje yönetimi, teknik danışmanlık ve kalite kontrol hizmetlerini de kapsamaktadır.",
        ],
      },
      {
        h2: "Proje Yönetimi ve Teknik Danışmanlık",
        paragraphs: [
          "Müşterilerimizin ihtiyaçlarına özel çözümler geliştirerek, endüstriyel üretim süreçlerinde verimliliği artırmakta ve maliyetleri optimize etmekteyiz. Çelik konstrüksiyon projelerimizde, statik hesaplamalar ve mühendislik çözümleri, uzman ekibimiz tarafından gerçekleştirilmektedir.",
          "Üretim aşamasında, CNC lazer kesim, CNC büküm ve kaynak işlemleri kullanılarak, yüksek kaliteli çelik konstrüksiyon elemanları üretilmektedir. Montaj aşamasında ise, uzman ekibimiz tarafından profesyonel montaj hizmetleri sunulmaktadır.",
        ],
      },
    ],
    specs: [
      { k: "Proje Tipi", v: "Fabrika, Depo, Köprü" },
      { k: "Mühendislik", v: "Statik Hesaplama" },
      { k: "Üretim", v: "CNC Kesim, Büküm, Kaynak" },
      { k: "Montaj", v: "Profesyonel Montaj" },
    ],
  },
  "elektrik-pano-uretime": {
    title: "Elektrik Pano Üretimi",
    description:
      "Müşteri ihtiyaçlarına özel elektrik pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri.",
    metaDescription:
      "Elektrik pano üretimi. İstanbul'da sıvaüstü, sıvaaltı ve dahili pano üretimi. Güvenli ve verimli enerji dağıtım çözümleri için profesyonel hizmet.",
    keywords:
      "elektrik pano, marin pano, pano üretimi, elektrik panosu, enerji dağıtım, denizcilik pano, İstanbul",
    icon: "⚡",
    color: "from-yellow-500 to-yellow-600",
    img: "/elektrıkpano.png",
    content: [
      {
        h2: "Elektrik Pano Üretimi ve Enerji Dağıtım Çözümleri",
        paragraphs: [
          "Elektrik pano üretimi, endüstriyel ve ticari yapılarda güvenli enerji dağıtımı için kritik öneme sahiptir. Metod Mühendislik olarak, müşteri ihtiyaçlarına özel tasarım ve üretim çözümleri sunmaktayız.",
          "Sıvaüstü elektrik pano, sıvaaltı elektrik pano, dahili elektrik pano, marin pano ve özel tip elektrik panolar üretmekteyiz. Elektrik pano ve marin pano üretimimizde, uluslararası standartlara uygun olarak çalışmakta ve kalite kontrol testlerinden geçirmekteyiz.",
        ],
      },
      {
        h2: "Pano Tipleri ve Üretim Süreçleri",
        paragraphs: [
          "Her projede, müşteri gereksinimlerini analiz ederek, en uygun teknik çözümleri sunmaktayız. Elektrik pano ve marin pano üretim hizmetlerimiz, fabrika binaları, ticari yapılar, konut projeleri, endüstriyel tesisler ve denizcilik uygulamalarında yaygın olarak kullanılmaktadır.",
          "Elektrik pano ve marin pano üretimimizde, CNC lazer kesim ile gövde üretimi, CNC büküm ile şekillendirme ve metal kaynak işlemleri ile birleştirme gerçekleştirilmektedir. Özellikle marin pano üretiminde, deniz ortamına dayanıklı paslanmaz çelik ve özel koruma sistemleri kullanılmaktadır. Yüzey işlemleri için elektrostatik toz boya uygulanmakta ve montaj aşamasında elektrik ekipmanları yerleştirilmektedir.",
        ],
      },
      {
        h2: "Kalite Kontrol ve Güvenlik Standartları",
        paragraphs: [
          "Elektrik pano üretimimizde, uluslararası elektrik standartlarına uygun olarak çalışmakta ve kalite kontrol testlerinden geçirmekteyiz. Her pano, elektriksel testlerden geçirilmekte ve güvenlik sertifikaları ile teslim edilmektedir.",
          "Müşteri memnuniyeti ve güvenlik, elektrik pano üretimimizde en öncelikli konulardır. Uzman ekibimiz, her projede müşteri gereksinimlerini analiz ederek, en uygun teknik çözümleri sunmaktadır.",
        ],
      },
    ],
    specs: [
      { k: "Pano Tipleri", v: "Sıvaüstü, Sıvaaltı, Dahili" },
      { k: "Standartlar", v: "Uluslararası Elektrik Standartları" },
      { k: "Kalite Kontrol", v: "Elektriksel Testler" },
      { k: "Güvenlik", v: "Sertifikalı Üretim" },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(hizmetler).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  // Next.js 16'da params bir Promise olabilir
  const resolvedParams = params instanceof Promise ? await params : params;
  
  // URL decode ve normalize et
  let normalizedSlug = decodeURIComponent(resolvedParams.slug);
  const slugMapping: { [key: string]: string } = {
    'elektrik-pano-üretimi': 'elektrik-pano-uretime',
    'elektrik-pano-uretimi': 'elektrik-pano-uretime',
    'cnc-büküm': 'cnc-bukum',
    'magaza-raf-ve-ürünleri': 'magaza-raf-ve-urunleri',
    'çelik-konstrüksiyon': 'celik-konstruksiyon',
  };
  const finalSlug = slugMapping[normalizedSlug.toLowerCase()] || normalizedSlug.toLowerCase();
  const hizmet = hizmetler[finalSlug] || hizmetler[normalizedSlug] || hizmetler[resolvedParams.slug];

  if (!hizmet) {
    return {
      title: "Hizmet Bulunamadı | Metod Mühendislik",
    };
  }

  return {
    title: `${hizmet.title} | Metod Mühendislik`,
    description: hizmet.metaDescription,
    keywords: hizmet.keywords,
    openGraph: {
      title: `${hizmet.title} | Metod Mühendislik`,
      description: hizmet.metaDescription,
      type: "website",
      locale: "tr_TR",
    },
  };
}

export default async function HizmetDetayPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Next.js 16'da params bir Promise olabilir
  const resolvedParams = params instanceof Promise ? await params : params;
  
  // URL decode ve normalize et (Türkçe karakterler için)
  let normalizedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Türkçe karakterleri İngilizce karşılıklarına çevir
  const slugMapping: { [key: string]: string } = {
    'elektrik-pano-üretimi': 'elektrik-pano-uretime',
    'elektrik-pano-uretimi': 'elektrik-pano-uretime',
    'cnc-büküm': 'cnc-bukum',
    'cnc-bukum': 'cnc-bukum',
    'magaza-raf-ve-urunleri': 'magaza-raf-ve-urunleri',
    'mağaza-raf-ve-ürünleri': 'magaza-raf-ve-urunleri',
    'celik-konstruksiyon': 'celik-konstruksiyon',
    'çelik-konstrüksiyon': 'celik-konstruksiyon',
  };
  
  // Eğer mapping varsa kullan, yoksa normalize edilmiş slug'ı dene
  const finalSlug = slugMapping[normalizedSlug.toLowerCase()] || normalizedSlug.toLowerCase();
  
  // Önce mapping'i dene, sonra direkt slug'ı dene
  let hizmet = hizmetler[finalSlug] || hizmetler[normalizedSlug] || hizmetler[resolvedParams.slug];

  if (!hizmet) {
    // Debug: Development'ta hangi slug'ların denendiğini logla
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Hizmet bulunamadı:', {
        originalSlug: resolvedParams.slug,
        normalizedSlug,
        finalSlug,
        availableSlugs: Object.keys(hizmetler),
      });
    }
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-24 md:pt-28">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <div className="text-6xl mb-6">{hizmet.icon}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {hizmet.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 leading-relaxed">
                {hizmet.description}
              </p>
            </div>
          </div>
        </section>

        {/* İÇERİK BÖLÜMÜ */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {hizmet.content.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                    {section.h2}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-slate-700 text-lg leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {/* TEKNİK ÖZELLİKLER */}
              {hizmet.specs && (
                <div className="mt-12 bg-slate-50 rounded-2xl p-8">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                    Teknik Özellikler
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hizmet.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b border-slate-200 pb-4"
                      >
                        <span className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                          {spec.k}
                        </span>
                        <span className="text-blue-600 font-semibold text-lg">
                          {spec.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA BÖLÜMÜ */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              {hizmet.title} HİZMETİ İÇİN TEKLİF ALIN
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle projenizi değerlendirip en uygun çözümü sunuyoruz.
              Hemen iletişime geçin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/905425786060?text=Merhaba,%20${encodeURIComponent(hizmet.title)}%20hizmeti%20için%20teklif%20almak%20istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Teklif Al
              </a>
              <Link
                href="/hizmetler"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                TÜM HİZMETLERİMİZ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

