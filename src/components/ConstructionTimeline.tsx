"use client";

import { useState } from "react";
import { Calendar, Camera } from "lucide-react";
import SanityImg from "./SanityImg";
import { urlFor } from "@/sanity/image";
import type { ConstructionUpdate } from "@/sanity/types";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  month: "long",
  year: "numeric",
});

function formatUpdateDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

export default function ConstructionTimeline({
  updates,
}: {
  updates: ConstructionUpdate[];
}) {
  const [zoomed, setZoomed] = useState<string | null>(null);

  return (
    <div className="space-y-8 my-12">
      <div className="border-l-2 border-bronze/40 pl-6 space-y-12">
        {updates.map((update, index) => (
          <div key={update._id} className="relative group">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-bronze border-4 border-line group-hover:scale-125 transition-transform" />

            <div className="bg-surface/90 p-6 rounded-xl border border-line space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-2 text-bronze-light text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{formatUpdateDate(update.updateDate)}</span>
                </div>
                <span className="text-[10px] text-fg-dim font-mono">
                  Güncelleme #{updates.length - index}
                </span>
              </div>

              <h3 className="text-lg font-bold text-fg">{update.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed whitespace-pre-line">
                {update.description}
              </p>

              {update.photos?.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-fg-muted mb-3">
                    <Camera className="w-3.5 h-3.5 text-fg-dim shrink-0" />
                    <span>Şantiye Fotoğrafları ({update.photos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {update.photos.map((photo, photoIndex) => (
                      <button
                        key={photoIndex}
                        type="button"
                        onClick={() =>
                          setZoomed(urlFor(photo).width(1800).url())
                        }
                        aria-label={`${update.title} fotoğrafını büyüt`}
                        className="relative h-24 rounded-lg overflow-hidden border border-line hover:border-bronze cursor-pointer transition-all"
                      >
                        <SanityImg
                          image={photo}
                          alt={`${update.title} — ${photoIndex + 1}`}
                          sizes="(max-width: 640px) 50vw, 25vw"
                          width={480}
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Şantiye görseli"
          onClick={() => setZoomed(null)}
          className="fixed inset-0 bg-ground/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <div className="relative max-w-4xl w-full bg-surface rounded-xl overflow-hidden border border-line p-2">
            {/* Büyütülmüş görsel dış kaynaklı ve tek seferlik olduğu için doğrudan img kullanılır. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomed}
              alt="Şantiye görseli"
              className="w-full h-auto rounded-lg max-h-[80vh] object-contain mx-auto"
            />
            <button
              type="button"
              onClick={() => setZoomed(null)}
              className="absolute top-4 right-4 bg-ground/80 text-fg p-2 rounded-full text-xs hover:bg-bronze transition-colors"
            >
              Kapat ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
