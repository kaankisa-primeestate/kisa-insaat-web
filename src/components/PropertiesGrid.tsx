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
    return { label: "Opsiyonlu", className: "bg-bronze text-bronze-ink" };
  }
  if (status === "closed") {
    const label =
      listingType === "rent"
        ? "Kiralandı"
        : listingType === "sale"
          ? "Satıldı"
          : "İşlem Tamamlandı";
    return { label, className: "bg-surface-3 text-fg-muted" };
  }
  const label =
    listingType === "rent"
      ? "Kiralık"
      : listingType === "sale"
        ? "Satılık"
        : "Satılık / Kiralık";
  return { label, className: "bg-wa text-fg" };
}

function PriceBlock({ property }: { property: Property }) {
  const showSale = property.listingType !== "rent" && property.salePrice;
  const showRent = property.listingType !== "sale" && property.rentPrice;

  return (
    <div className="min-w-0 space-y-1">
      {showSale && (
        <div>
          <div className="text-[10px] text-fg-dim uppercase">
            Satış Fiyatı
          </div>
          <div className="text-xs font-bold text-bronze-light truncate">
            {property.salePrice}
          </div>
        </div>
      )}
      {showRent && (
        <div>
          <div className="text-[10px] text-fg-dim uppercase">Aylık Kira</div>
          <div className="text-xs font-bold text-wa-text truncate">
            {property.rentPrice}
          </div>
        </div>
      )}
      {property.dues && (
        <div className="text-[10px] text-fg-dim">
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
        <div className="bg-surface p-4 rounded-xl border border-line mb-12 space-y-4">
          {showTypeFilter && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-fg-muted text-xs font-semibold">
                <Filter className="w-4 h-4 text-fg-dim shrink-0" />
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
                        ? "bg-bronze text-bronze-ink"
                        : "bg-surface-2 text-fg-muted hover:bg-surface-3"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {roomOptions.length > 2 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line pt-4 first:border-0 first:pt-0">
              <div className="flex items-center gap-2 text-fg-muted text-xs font-semibold">
                <Filter className="w-4 h-4 text-fg-dim shrink-0" />
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
                        ? "bg-bronze text-bronze-ink"
                        : "bg-surface-2 text-fg-muted hover:bg-surface-3"
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
        <p className="text-center text-sm text-fg-muted py-16">
          Bu kriterlere uyan gayrimenkul bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((property) => {
            const badge = statusBadge(property.listingType, property.status);
            return (
              <article
                key={property._id}
                className="bg-surface rounded-xl overflow-hidden border border-line hover:border-line-strong transition-all flex flex-col group"
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
                      <span className="px-3 py-1 rounded-md bg-ground/80 text-bronze-light text-xs font-bold border border-bronze/30 backdrop-blur-md">
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
                    <h3 className="text-xl font-bold text-fg group-hover:text-bronze-light transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-xs text-fg-muted leading-relaxed line-clamp-4">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line text-center">
                      <div className="bg-ground/50 p-2 rounded border border-line/80">
                        <div className="text-[10px] text-fg-dim uppercase">
                          Tip
                        </div>
                        <div className="text-xs font-bold text-fg">
                          {property.roomCount}
                        </div>
                      </div>
                      <div className="bg-ground/50 p-2 rounded border border-line/80">
                        <div className="text-[10px] text-fg-dim uppercase">
                          Brüt
                        </div>
                        <div className="text-xs font-bold text-fg">
                          {property.grossArea} m²
                        </div>
                      </div>
                      <div className="bg-ground/50 p-2 rounded border border-line/80">
                        <div className="text-[10px] text-fg-dim uppercase">
                          Kat
                        </div>
                        <div className="text-xs font-bold text-fg">
                          {property.floor}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line flex items-end justify-between gap-4">
                    <PriceBlock property={property} />

                    {whatsapp && property.status !== "closed" && (
                      <a
                        href={`${whatsappHref(whatsapp)}?text=${encodeURIComponent(
                          `Merhaba, ${property.title} hakkında bilgi almak istiyorum.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-wa hover:bg-wa-hover text-fg text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0"
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
