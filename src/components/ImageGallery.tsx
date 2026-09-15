"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SanityImg from "./SanityImg";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

/**
 * Görsel ızgarası ve büyütme penceresi. Görsellerden birine tıklandığında tam
 * ekran açılır; oklarla veya klavyeyle geziler, Esc ile kapanır.
 */
export default function ImageGallery({
  images,
  alt,
  columns = "grid-cols-2 md:grid-cols-3",
}: {
  images: SanityImage[];
  /** Tek tek alt metni girilmemiş görseller için yedek açıklama. */
  alt: string;
  columns?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={`grid ${columns} gap-3`}>
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`${index + 1}. görseli büyüt`}
            className="relative aspect-4/3 rounded-lg overflow-hidden border border-line hover:border-bronze transition-colors group"
          >
            <SanityImg
              image={image}
              alt={image.alt ?? `${alt} — ${index + 1}`}
              sizes="(max-width: 768px) 50vw, 33vw"
              width={900}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 bg-ground/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            {/* Büyütülmüş görsel tek seferlik ve dış kaynaklı olduğu için doğrudan img kullanılır. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(images[openIndex]).width(1800).url()}
              alt={images[openIndex].alt ?? alt}
              className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="absolute -top-3 -right-3 md:top-3 md:right-3 w-10 h-10 rounded-full bg-surface border border-line-strong text-fg flex items-center justify-center hover:bg-bronze hover:text-bronze-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Önceki görsel"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/90 border border-line-strong text-fg flex items-center justify-center hover:bg-bronze hover:text-bronze-ink transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Sonraki görsel"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/90 border border-line-strong text-fg flex items-center justify-center hover:bg-bronze hover:text-bronze-ink transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface/90 border border-line text-xs text-fg-muted tabular-nums">
                  {openIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
