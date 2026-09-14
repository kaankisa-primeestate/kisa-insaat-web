import Link from "next/link";
import { ArrowRight, Building, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import Hero from "@/components/Hero";
import { heroImages } from "@/content/hero";

const HIGHLIGHTS = [
  "Son deprem yönetmeliklerine tam uygun betonarme ve temel çözümleri",
  "Zamanında teslimat ve şeffaf şantiye süreç yönetimi",
  "Estetik dış cephe tasarımı ve premium iç mekân donanımları",
];

export default function Home() {
  return (
    <main>
      <Hero images={heroImages} />

      <section className="py-24 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
              Kısa İnşaat Hakkında
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
              Türkiye Genelinde Güvenli ve Modern Mimari Standartları
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Yılların tecrübesiyle Türkiye genelinde konut, ticari yapı ve
              kentsel dönüşüm projeleri üreten Kısa İnşaat; mühendislik
              disiplini, deprem yönetmeliğine tam uyum ve yüksek malzeme
              kalitesiyle güven inşa etmektedir.
            </p>
            <div className="space-y-3 pt-2">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-2"
            >
              <span>Projelerimizi inceleyin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-2">
              <Building className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-3xl font-extrabold text-white">Türkiye</div>
              <div className="text-xs text-slate-400">
                Geneli Proje Deneyimi
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-2">
              <ShieldCheck className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-3xl font-extrabold text-white">
                Bağdat Cd.
              </div>
              <div className="text-xs text-slate-400">
                Kentsel Dönüşüm Uzmanlığı
              </div>
            </div>
            <div className="col-span-2 bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-lg text-white space-y-2">
              <MapPin className="w-6 h-6 text-amber-200" />
              <div className="text-lg font-bold">
                Arsa Sahibi &amp; Kentsel Dönüşüm
              </div>
              <p className="text-xs text-amber-100">
                Mevcut binanızı Kısa İnşaat güvencesiyle yenilemek için hemen
                teklif isteyin.
              </p>
              <Link
                href="/kentsel-donusum"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white pt-2 hover:gap-2.5 transition-all"
              >
                <span>Teklif formu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
