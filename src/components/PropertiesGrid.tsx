"use client";

import { useMemo, useState } from "react";
import { Filter, MessageCircle } from "lucide-react";
import SanityImg from "./SanityImg";
import type { Property, PropertyStatus } from "@/sanity/types";
import { whatsappHref } from "@/lib/format";

const STATUS_STYLE: Record<PropertyStatus, { label: string; className: string }> =
  {
    available: {
      label: "Satılık",
      className: "bg-emerald-600 text-white",
    },
    reserved: {
      label: "Opsiyonlu",
      className: "bg-amber-600 text-white",
    },
    sold: {
      label: "Satıldı",
      className: "bg-slate-700 text-slate-300",
    },
  };

export default function PropertiesGrid({
  properties,
  whatsapp,
}: {
  properties: Property[];
  whatsapp: string;
}) {
  const [selectedRoom, setSelectedRoom] = useState("all");

  /** Filtre seçenekleri gerçekte var olan dairelerden üretilir. */
  const roomOptions = useMemo(
    () => [
      "all",
      ...Array.from(new Set(properties.map((p) => p.roomCount))).sort(),
    ],
    [properties],
  );

  const visible =
    selectedRoom === "all"
      ? properties
      : properties.filter((p) => p.roomCount === selectedRoom);

  return (
    <>
      {roomOptions.length > 2 && (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <Filter className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Oda Sayısına Göre Filtrele:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {roomOptions.map((room) => (
              <button
                key={room}
                type="button"
                onClick={() => setSelectedRoom(room)}
                aria-pressed={selectedRoom === room}
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
      )}

      {visible.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-16">
          Bu kategoride şu anda satışta daire bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((property) => {
            const status = STATUS_STYLE[property.status];
            return (
              <article
                key={property._id}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  {property.images?.[0] && (
                    <SanityImg
                      image={property.images[0]}
                      alt={property.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {property.projectTitle && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-slate-950/80 text-amber-400 text-xs font-bold border border-amber-500/30 backdrop-blur-md">
                        {property.projectTitle}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold shadow-lg ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                      <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                        <div className="text-[10px] text-slate-500 uppercase">
                          Tip
                        </div>
                        <div className="text-xs font-bold text-slate-200">
                          {property.roomCount}
                        </div>
                      </div>
                      <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                        <div className="text-[10px] text-slate-500 uppercase">
                          Brüt
                        </div>
                        <div className="text-xs font-bold text-slate-200">
                          {property.grossArea} m²
                        </div>
                      </div>
                      <div className="bg-slate-950/50 p-2 rounded border border-slate-800/80">
                        <div className="text-[10px] text-slate-500 uppercase">
                          Kat
                        </div>
                        <div className="text-xs font-bold text-slate-200">
                          {property.floor}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 uppercase">
                        Fiyat Bilgisi
                      </div>
                      <div className="text-xs font-bold text-amber-400 truncate">
                        {property.price}
                      </div>
                    </div>

                    {whatsapp && property.status !== "sold" && (
                      <a
                        href={`${whatsappHref(whatsapp)}?text=${encodeURIComponent(
                          `Merhaba, ${property.title} hakkında bilgi almak istiyorum.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Bilgi Al</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
