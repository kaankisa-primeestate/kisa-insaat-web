import React from "react";
import Link from "next/link";
import { ChevronRight, Building2, Home } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
      {/* Arka Plan Görsel Katmanı & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />

      {/* İçerik */}
      <div className="relative max-w-5xl mx-auto px-6 text-center text-white z-10 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
          <Building2 className="w-3.5 h-3.5" />
          <span>Kadıköy Bostancı'nın Prestijli Yapıları</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 font-sans">
          Geleceği İnşa Ediyoruz, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            Kalıcı Değerler
          </span> Sunuyoruz.
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Kısa İnşaat güvencesiyle Bostancı ve çevresinde modern mimari, yüksek deprem güvenliği ve estetik yaşam alanları üretiyoruz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/satistaki-gayrimenkuller"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-md transition-all shadow-xl shadow-amber-900/30"
          >
            <Home className="w-5 h-5" />
            <span>Satıştaki Daireleri İncele</span>
          </Link>
          <Link
            href="/projeler"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 bg-slate-900/60 text-slate-200 hover:text-white font-semibold px-8 py-4 rounded-md backdrop-blur-sm transition-all"
          >
            <span>Devam Eden Projelerimiz</span>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
