import type { Metadata, Viewport } from "next"; // Viewport'u ekledik
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

// Viewport'u metadata dışına, ayrı bir export olarak taşıyoruz
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0056b3",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.metodmuhendislik.com'),
  title: {
    default: "Metod Mühendislik | Endüstriyel Üretim ve Mühendislik Çözümleri",
    template: "%s | Metod Mühendislik"
  },
  description: "CNC lazer kesim, CNC büküm, metal kaynak, elektrik pano, marin pano ve mühendislik çözümleri. Endüstriyel üretimde kalite ve güvenin adresi. 10+ yıllık deneyim ile hizmetinizdeyiz.",
  keywords: ["CNC lazer kesim", "CNC büküm", "kaynak", "metal kaynak", "elektrik pano", "marin pano", "endüstriyel üretim", "mühendislik çözümleri", "çelik konstrüksiyon", "elektrostatik toz boya"],
  authors: [{ name: "Metod Mühendislik" }],
  creator: "Metod Mühendislik",
  publisher: "Metod Mühendislik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.metodmuhendislik.com",
    siteName: "Metod Mühendislik",
    title: "Metod Mühendislik | Endüstriyel Üretim ve Mühendislik Çözümleri",
    description: "CNC lazer kesim, CNC büküm, metal kaynak, elektrik pano, marin pano ve mühendislik çözümleri. Endüstriyel üretimde kalite ve güvenin adresi.",
    images: [
      {
        url: "/logo.png",
        width: 464,
        height: 111,
        alt: "Metod Mühendislik Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metod Mühendislik | Endüstriyel Üretim ve Mühendislik Çözümleri",
    description: "CNC lazer kesim, CNC büküm, metal kaynak, elektrik pano, marin pano ve mühendislik çözümleri.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console ve diğer doğrulama kodları buraya eklenecek
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}