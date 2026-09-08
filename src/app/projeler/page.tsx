"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, MapPin, Calendar, CheckCircle2, Clock } from "lucide-react";

// Örnek dinamik proje verisi (Sanity'den çekilecek yapı)
const mockProjects = [
  {
    id: "1",
    title: "Ebru Apartmanı",
    status: "ongoing",
    completionPercentage: 65,
    location: "Bostancı, Kadıköy / İstanbul",
    adaParsel: "901 Ada / 8 Parsel",
    deliveryDate: "Aralık 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    description: "Bostancı Profesör Ali Nihat Tarlan Caddesi üzerinde, kentsel dönüşüm kapsamında yenilenen, kapalı otoparklı ve akıllı ev sistemli prestijli konut projesi.",
  },
  {
    id: "2",
    title: "670 Ada Bostancı Projesi",
    status: "ongoing",
    completionPercentage: 30,
    location: "Bostancı, Kadıköy / İstanbul",
    adaParsel: "670 Ada / 24 Parsel",
    deliveryDate: "Haziran 2027",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    description: "Marmaray ve sahile yürüme mesafesinde, modern dış cephe mimarisi ve yüksek deprem güvenliğiyle yükselen konut projemiz.",
  },
  {
    id: "3",
    title: "Sahil Konakları",
    status: "completed",
    completionPercentage: 100,
    location: "Bostancı Sahil, Kadıköy",
    adaParsel: "Tamamlandı",
    deliveryDate: "2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    description: "Tamamlanıp hak sahiplerine zamanında teslim edilen, deniz manzaralı lüks konut projesi.",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");

  const filteredProjects = mockProjects.filter((p) => {
    if (filter === "ongoing") return p.status === "ongoing";
    if (filter === "completed") return p.status === "completed";
    return true;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Sayfa Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
            Mimari Portföyümüz
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Projelerimiz
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Kısa İnşaat güvencesiyle Kadıköy Bostancı bölgesinde hayata geçirdiğimiz devam eden ve tamamlanan projelerimiz.
          </p>
        </div>

        {/* Filtre Tabları */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 gap-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Tüm Projeler
            </button>
            <button
              onClick={() => setFilter("ongoing")}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                filter === "ongoing"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Devam Edenler
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                filter === "completed"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Tamamlananlar
            </button>
          </div>
        </div>

        {/* Proje Kartları Izgarası (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Görsel ve Rozet */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  {project.status === "ongoing" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5" />
                      Devam Ediyor (%{project.completionPercentage})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 text-amber-400 border border-amber-500/30 text-xs font-bold backdrop-blur-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tamamlandı
                    </span>
                  )}
                </div>
              </div>

              {/* Kart İçeriği */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Teslim: {project.deliveryDate}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">{project.adaParsel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
