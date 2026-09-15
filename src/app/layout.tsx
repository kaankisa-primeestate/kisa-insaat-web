import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import PaletteSwitcher from "@/components/PaletteSwitcher";
import { getSiteSettings } from "@/sanity/settings";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** Başlık ve açıklama yönetim panelindeki Site Ayarları kaydından gelir. */
/*
 * Tema, sayfa boyanmadan önce uygulanır. Aksi hâlde gündüz modunu seçmiş bir
 * ziyaretçi her açılışta bir anlık koyu ekran görür.
 */
const TEMA_SCRIPT = `(function(){try{
var t=localStorage.getItem("tema");
if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"gunduz":"gece";}
if(t==="gunduz"){document.documentElement.dataset.tema="gunduz";}
}catch(e){}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.metaTitle,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.metaDescription,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      type: "website",
      locale: "tr_TR",
      siteName: settings.companyName,
    },
    icons: { icon: "/logo-mark.png" },
  };
}

/**
 * Kök yerleşim yalnızca belge iskeletini kurar. Site menüsü ve alt bilgisi
 * (site) grubunun kendi yerleşimindedir; böylece /studio yönetim paneli
 * sitenin başlık ve alt bilgisi olmadan tam ekran açılır.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_SCRIPT }} />
      </head>
      <body className="min-h-full bg-ground text-fg font-sans">
        {children}
        <Suspense fallback={null}>
          <PaletteSwitcher />
        </Suspense>
      </body>
    </html>
  );
}
