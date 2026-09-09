import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConstructionTimeline from "@/components/ConstructionTimeline";
import { MapPin, Calendar, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

const mockProjectDetail = {
  id: "1",
  title: "Ebru Apartmanı",
  status: "ongoing",
  completionPercentage: 65,
  location: "Bostancı, Kadıköy / İstanbul",
  adaParsel: "901 Ada / 8 Parsel",
  deliveryDate: "Aralık 2026",
  heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop",
  description: "Bostancı Profesör Ali Nihat Tarlan Caddesi üzerinde, kentsel dönüşüm kapsamında yenilenen Ebru Apartmanı projemiz; Radye jeneral temel, C35 beton sınıfı, kapalı otopark ve modern mimari detaylarıyla Kadıköy'ün kalbinde yükselmektedir.",
  specifications: [
    "C35/40 Yüksek Dayanımlı Hazır Beton",
    "Radye Jeneral Temel ve Çift Kat Su Yalıtımı",
    "Kapalı Otopark & Araç Şarj İstasyonu Altyapısı",
    "Rehau / Pimapen 80'lik Serisi Isı Yalıtımlı Doğramalar",
    "Yerden Isıtma Sistemi ve Central Pay Ölçer",
    "Franke Ankastre Mutfak Seti & Lineadecor Mobilya",
  ],
  updates: [
    {
      id: "u1",
      date: "Eylül 2026",
      title: "Betonarme Karkas Tamamlandı, Dış Cephe Başladı",
      description: "Binanın 5. kat beton dökümü tamamlanmış olup, dış cephe kara sıva ve izotuğla örme işlemlerine başlanmıştır.",
      photos: [
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
      ],
    },
    {
      id: "u2",
      date: "Temmuz 2026",
      title: "Temel ve Bodrum Kat Beton Dökümü",
      description: "Radye temel beton dökümü laboratuvar denetiminde tamamlanarak zemin kat karkas imalatına geçilmiştir.",
      photos: [
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=600&auto=format&fit=crop",
      ],
    },
  ],
};

export default function ProjectDetailPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-24">
        <div className="relative h-[60vh] min-h-[400px] flex items-end justify-start bg-slate-950">
          <img
            src={mockProjectDetail.heroImage}
            alt={mockProjectDetail.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 pb-12 w-full space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                Devam Eden Proje (%{mockProjectDetail.completionPercentage})
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 text-xs font-mono">
                {mockProjectDetail.adaParsel}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {mockProjectDetail.title}
            </h1>

            <div className="flex items-center gap-4 text-slate-300 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{mockProjectDetail.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Teslim: {mockProjectDetail.deliveryDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white border-l-2 border-amber-500 pl-3">
                Proje Hakkında
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {mockProjectDetail.description}
              </p>
            </section>

            <section className="space-y-6 pt-6 border-t border-slate-900">
              <div>
                <h3 className="text-xl font-bold text-white">Canlı Şantiye İlerleme Günlüğü</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Şantiyemizdeki en güncel imalat ve ilerleme aşamaları
                </p>
              </div>

              <ConstructionTimeline updates={mockProjectDetail.updates} />
            </section>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Teknik Şartname & Standartlar</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-300">
                {mockProjectDetail.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/905320000000?text=Merhaba,%20${encodeURIComponent(mockProjectDetail.title)}%20projeniz%20hakkında%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg text-xs transition-colors shadow-lg shadow-amber-900/20"
                >
                  <span>Proje Hakkında Bilgi Alın</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
