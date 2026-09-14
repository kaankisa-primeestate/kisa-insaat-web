import type { Metadata } from "next";
import PropertiesGrid from "@/components/PropertiesGrid";
import EmptyState from "@/components/EmptyState";
import { sanityFetch } from "@/sanity/client";
import { ALL_PROPERTIES_QUERY } from "@/sanity/queries";
import { getSiteSettings } from "@/sanity/settings";
import type { Property } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Satıştaki Gayrimenkuller",
  description:
    "Kısa İnşaat projelerinde yer alan satılık konut ve ticari alanlar. Oda sayısı, metrekare ve kat bilgileriyle birlikte inceleyin.",
};

export default async function PropertiesPage() {
  const [properties, settings] = await Promise.all([
    sanityFetch<Property[]>(ALL_PROPERTIES_QUERY, {}, []),
    getSiteSettings(),
  ]);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
          Gayrimenkul Portföyü
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Satıştaki Gayrimenkuller
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Kısa İnşaat projelerinde yer alan satılık konut ve ticari alanları
          inceleyebilir, detaylı bilgi için doğrudan bizimle iletişime
          geçebilirsiniz.
        </p>
      </div>

      {properties.length === 0 ? (
        <EmptyState
          title="Şu anda satışta daire bulunmuyor"
          description="Satışa çıkacak yeni daireler kısa süre içinde burada yayınlanacak. Öncelikli bilgilendirilmek isterseniz bizimle iletişime geçebilirsiniz."
        />
      ) : (
        <PropertiesGrid properties={properties} whatsapp={settings.whatsapp} />
      )}
    </main>
  );
}
