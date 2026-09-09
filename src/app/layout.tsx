import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kısa İnşaat | Bostancı Kadıköy Kentsel Dönüşüm & Nitelikli Konut Projeleri",
  description: "Kadıköy Bostancı merkezli, kentsel dönüşüm ve nitelikli konut projelerinde güvenilir, çağdaş ve estetik mimari çözümler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950`}>
        {children}
      </body>
    </html>
  );
}
