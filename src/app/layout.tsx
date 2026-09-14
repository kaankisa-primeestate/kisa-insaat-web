import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/settings";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** Başlık ve açıklama yönetim panelindeki Site Ayarları kaydından gelir. */
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
    >
      <body className="min-h-full bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
