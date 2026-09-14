import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/sanity/settings";

/**
 * Ziyaretçiye açık sayfaların ortak çerçevesi. Ayarlar burada bir kez okunur
 * ve hem menüye hem alt bilgiye aktarılır.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </div>
  );
}
