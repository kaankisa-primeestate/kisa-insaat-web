import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building, ShieldCheck, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />
      
      <main>
        <Hero />

        {/* Kurumsal Özet / Neden Kısa İnşaat */}
        <section className="py-24 bg-slate-900/50 border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                Kısa İnşaat Hakkında
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                Bostancı'da Güvenli ve Modern Mimari Standartları
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Yılların tecrübesiyle Kadıköy bölgesinde kentsel dönüşüm ve konut projeleri üreten Kısa İnşaat; mühendislik disiplini, deprem yönetmeliğine %100 uyum ve yüksek malzeme kalitesiyle güven inşa etmektedir.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Son deprem yönetmeliklerine tam uygun C35+ beton ve radye jeneral temel</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Zamanında teslimat ve şeffaf şantiye süreç yönetimi</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Estetik dış cephe tasarımı ve premium iç mekan donanımları</span>
                </div>
              </div>
            </div>

            {/* Vurgu Kartları */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-2">
                <Building className="w-8 h-8 text-amber-500 mb-2" />
                <div className="text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-400">Zamanında Teslim Oranı</div>
              </div>
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-2">
                <ShieldCheck className="w-8 h-8 text-amber-500 mb-2" />
                <div className="text-3xl font-extrabold text-white">Kadıköy</div>
                <div className="text-xs text-slate-400">Bostancı Odaklı Uzmanlık</div>
              </div>
              <div className="col-span-2 bg-gradient-to-r from-amber-600 to-amber-700 p-6 rounded-lg text-white space-y-2">
                <MapPin className="w-6 h-6 text-amber-200" />
                <div className="text-lg font-bold">Arsa Sahibi & Kentsel Dönüşüm</div>
                <p className="text-xs text-amber-100">
                  Mevcut binanızı Kısa İnşaat güvencesiyle yenilemek için hemen teklif isteyin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
