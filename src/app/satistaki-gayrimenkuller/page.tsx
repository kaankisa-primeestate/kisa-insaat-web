"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Maximize2, Layers, MessageCircle, Filter, Tag } from "lucide-react";

const mockProperties = [
  {
    id: "1",
    title: "Ebru Apt. Kat: 4, Daire: 12",
    projectName: "Ebru Apartmanı",
    status: "available",
    roomCount: "3+1",
    grossArea: 135,
    netArea: 105,
    floor: "4. Kat",
    price: "Fiyat İçin İletişime Geçin",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
    features: "Yerden ısıtma, Lineadecor mutfak, Franke ankastre set, akıllı ev altyapısı, kapalı otopark.",
  },
  {
    id: "2",
    title: "670 Ada Apt. Kat: 2, Daire: 5",
    projectName: "670 Ada Bostancı",
    status: "available",
    roomCount: "2+1",
    grossArea: 95,
    netArea: 75,
    floor: "2. Kat",
    price: "Fiyat İçin İletişime Geçin",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    features: "Balkonlu, ebeveyn banyolu, emlak konut kalitesinde malzeme, Marmaray'a 5 dk mesafe.",
  },
  {
    id: "3",
    title: "Ebru Apt. Çatı Dubleksi No: 15",
    projectName: "Ebru Apartmanı",
    status: "reserved",
    roomCount: "4+1 Dubleks",
    grossArea: 210,
    netArea: 170,
    floor: "Çatı Katı",
    price: "Opsiyonlu / Rezerve",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    features: "Geniş teraslı, Adalar manzaralı, çift banyolu özel yapım dubleks daire.",
  },
];

export default function PropertiesPage() {
  const [selectedRoom, setSelectedRoom] = useState<string>("all");

  const filteredProperties = mockProperties.filter((p) => {
    if (selectedRoom !== "all" && !p.roomCount.includes(selectedRoom)) return false;
    return true;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
            Gayrimenkul Showroom
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Satıştaki Gayrimenkuller
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Kısa İnşaat projelerinde yer alan satılık konut ve ticari alanları inceleyebilir, detaylı bilgi için doğrudan bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        {/* Filtre Barı */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Oda Sayısına Göre Filtrele:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "2+1", "3+1", "4+1"].map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedRoom === room
                    ? "bg-amber-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {room === "all" ? "Tümü" : room}
              </button>
            ))}
          </div>
        </div>

        {/* Daire Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Görsel ve Durum Rozeti */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-slate-950/80 text-amber-400 text-xs font-bold border border-amber-500/30 backdrop-blur-md">
                    {prop.projectName}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {prop.status === "available" ? (
                    <span className="px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold shadow-lg">
                      Satılık
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md bg-amber-600 text-white text-xs font-bold shadow-lg">
                      Opsiyonlu
                    </span>
                  )}
                </div>
              </div>

              {/* Detaylar */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prop.features}
                  </p>

                  {/* Özellik Izgarası */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                      <div className="text-[10px] text-slate-500 uppercase">Tip</div>
                      <div className="text-xs font-bold text-slate-200">{prop.roomCount}</div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                      <div className="text-[10px] text-slate-500 uppercase">Alan</div>
                      <div className="text-xs font-bold text-slate-200">{prop.grossArea} m²</div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                      <div className="text-[10px] text-slate-500 uppercase">Kat</div>
                      <div className="text-xs font-bold text-slate-200">{prop.floor}</div>
                    </div>
                  </div>
                </div>

                {/* Fiyat ve WhatsApp Butonu */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Fiyat Bilgisi</div>
                    <div className="text-xs font-bold text-amber-400">{prop.price}</div>
                  </div>

                  <a
                    href={`https://wa.me/905320000000?text=Merhaba,%20${encodeURIComponent(prop.title)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Bilgi Al</span>
                  </a>
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
