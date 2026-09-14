import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import RenewalForm from "@/components/RenewalForm";
import { getSiteSettings } from "@/sanity/settings";

export const metadata: Metadata = {
  title: "Kentsel Dönüşüm",
  description:
    "Binanız veya arsanız için kentsel dönüşüm teklifi alın. Kadıköy Bağdat Caddesi ve çevresindeki dönüşüm uygulamalarında uzmanız.",
};

const STEPS = [
  {
    title: "Ön İnceleme & Teknik Analiz",
    body: "Binanızın mevcut imar durumu, ada/parsel metrajı ve belediye şartnameleri uzman ekibimizce incelenir.",
  },
  {
    title: "Mimari Proje & Avan Çalışması",
    body: "Kat maliklerinin ihtiyaçlarına uygun, azami alan verimliliği sağlayan estetik mimari taslak hazırlanır.",
  },
  {
    title: "Şeffaf Sözleşme & Güvenli İnşaat",
    body: "Resmî sözleşme ve teknik şartname ile zamanında teslimat garantisi verilerek inşaat süreci başlatılır.",
  },
];

export default async function UrbanRenewalPage() {
  const settings = await getSiteSettings();

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-bronze text-xs font-bold uppercase tracking-widest">
          Binanızı Yenileyelim
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
          Kentsel Dönüşüm &amp; Arsa Değerlendirme
        </h1>
        <p className="text-fg-muted text-base leading-relaxed">
          Binanızı Kısa İnşaat güvencesiyle yenilemek veya arsanız için mimari
          proje teklifi almak istiyorsanız formu doldurabilirsiniz. Kadıköy
          Bağdat Caddesi ve çevresindeki dönüşüm süreçlerinde özel uzmanlığa
          sahibiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface p-8 rounded-xl border border-line space-y-6">
            <h2 className="text-xl font-bold text-fg border-l-2 border-bronze pl-3">
              Kentsel Dönüşüm Sürecimiz
            </h2>

            <div className="space-y-6">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-bronze/10 border border-bronze/30 text-bronze-light flex items-center justify-center font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-fg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-surface to-bronze-dark/30 p-6 rounded-xl border border-bronze/20 flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-bronze shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-fg">
                Yüksek Deprem Güvenliği
              </h2>
              <p className="text-xs text-fg-muted leading-relaxed">
                Projelerimizde güncel deprem yönetmeliğine uygun beton sınıfı ve
                temel sistemi standart olarak uygulanır.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-surface p-8 rounded-xl border border-line">
          <RenewalForm
            whatsapp={settings.whatsapp}
            kvkkText={settings.kvkkText}
          />
        </div>
      </div>
    </main>
  );
}
