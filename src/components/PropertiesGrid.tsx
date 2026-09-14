"use client";

import { useMemo, useState } from "react";
import { Filter, MessageCircle } from "lucide-react";
import SanityImg from "./SanityImg";
import type { ListingType, Property, PropertyStatus } from "@/sanity/types";
import { whatsappHref } from "@/lib/format";

const TYPE_FILTERS: { value: "all" | ListingType; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "sale", label: "Satılık" },
  { value: "rent", label: "Kiralık" },
];

/**
 * Rozet metni ilan tipiyle durumun birleşiminden üretilir; böylece kiralık bir
 * ilanda "Satıldı" gibi tutarsız bir etiket çıkması mümkün değildir.
 */
function statusBadge(listingType: ListingType, status: PropertyStatus) {
  if (status === "reserved") {
    return { label: "Opsiyonlu", className: "bg-amber-600 text-white" };
  }
  if (status === "closed") {
    const label =
      listingType === "rent"
        ? "Kiralandı"
        : listingType === "sale"
          ? "Satıldı"
          : "İşlem Tamamlandı";
    return { label, className: "bg-slate-700 text-slate-300" };
  }
  const label =
    listingType === "rent"
      ? "Kiralık"
      : listingType === "sale"
        ? "Satılık"
        : "Satılık / Kiralık";
  return { label, className: "bg-emerald-600 text-white" };
}

function PriceBlock({ property }: { property: Property }) {
  const showSale = property.listingType !== "rent" && property.salePrice;
  const showRent = property.listingType !== "sale" && property.rentPrice;

  return (
    <div className="min-w-0 space-y-1">
      {showSale && (
        <div>
          <div className="text-[10px] text-slate-500 uppercase">
            Satış Fiyatı
          </div>
          <div className="text-xs font-bold text-amber-400 truncate">
            {property.salePrice}
          </div>
        </div>
      )}
      {showRent && (
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Aylık Kira</div>
          <div className="text-xs font-bold text-emerald-400 truncate">
            {property.rentPrice}
          </div>
        </div>
      )}
      {property.dues && (
        <div className="text-[10px] text-slate-500">
          Aidat: {property.dues}
        </div>
      )}
    </div>
  );
}

export default function PropertiesGrid({
  properties,
  whatsapp,
}: {
  properties: Property[];
  whatsapp: string;
}) {
  const [type, setType] = useState<"all" | ListingType>("all");
  const [room, setRoom] = useState("all");

  const roomOptions = useMemo(
    () => ["all", ...Array.from(new Set(properties.map((p) => p.roomCount))).sort()],
    [properties],
  );

  /** "Satılık veya kiralık" ilanlar her iki filtrede de görünür. */
  const visible = properties.filter((property) => {
    const typeMatch =
      type === "all" ||
      property.listingType === type ||
      property.listingType === "both";
    const roomMatch = room === "all" || property.roomCount === room;
    return typeMatch && roomMatch;
  });

  const showTypeFilter = new Set(properties.map((p) => p.listingType)).size > 1;

  return (
    <>
      {(showTypeFilter || roomOptions.length > 2) && (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-12 space-y-4">
          {showTypeFilter && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <Filter className="w-4 h-4 text-amber-500 shrink-0" />
                <span>İlan Tipi:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {TYPE_FILTERS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setType(item.value)}
                    aria-pressed={type === item.value}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      type === item.value
                        ? "bg-amber-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {roomOptions.length > 2 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4 first:border-0 first:pt-0">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <Filter className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Oda Sayısı:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {roomOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRoom(option)}
                    aria-pressed={room === option}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      room === option
                        ? "bg-amber-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {option === "all" ? "Tümü" : option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-16">
          Bu kriterlere uyan gayrimenkul bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((property) => {
            const badge = statusBadge(property.listingType, property.status);
            return (
              <article
                key={property._id}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <SanityImg
                    image={property.images?.[0]}
                    alt={property.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {property.projectTitle && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-slate-950/80 text-amber-400 text-xs font-bold border border-amber-500/30 backdrop-blur-md">
                        {property.projectTitle}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold shadow-lg ${badge.className}`}
                    >
                      {badge.label}
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

                  <div className="pt-4 border-t border-slate-800 flex items-end justify-between gap-4">
                    <PriceBlock property={property} />

                    {whatsapp && property.status !== "closed" && (
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
