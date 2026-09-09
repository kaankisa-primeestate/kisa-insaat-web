"use client";
import React, { useState } from "react";
import { Calendar, Camera, CheckCircle2, ChevronRight } from "lucide-react";

interface ConstructionUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
}

interface ConstructionTimelineProps {
  updates: ConstructionUpdate[];
}

export default function ConstructionTimeline({ updates }: ConstructionTimelineProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="space-y-8 my-12">
      <div className="border-l-2 border-amber-500/40 pl-6 space-y-12">
        {updates.map((update, idx) => (
          <div key={update.id} className="relative group">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-950 group-hover:scale-125 transition-transform" />

            <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>{update.date}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Güncelleme #{updates.length - idx}</span>
              </div>

              <h4 className="text-lg font-bold text-white">{update.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{update.description}</p>

              {update.photos && update.photos.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Camera className="w-3.5 h-3.5 text-amber-500" />
                    <span>Şantiye Fotoğrafları ({update.photos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {update.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setSelectedPhoto(photo)}
                        className="relative h-24 rounded-lg overflow-hidden border border-slate-800 hover:border-amber-500 cursor-pointer group/photo transition-all"
                      >
                        <img
                          src={photo}
                          alt={`${update.title} - ${pIdx + 1}`}
                          className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          Büyüt
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-2">
            <img src={selectedPhoto} alt="Şantiye Görseli" className="w-full h-auto rounded-lg max-h-[80vh] object-contain mx-auto" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-slate-950/80 text-white p-2 rounded-full text-xs hover:bg-amber-600 transition-colors"
            >
              Kapat ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
