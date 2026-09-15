"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import type { HeroImage } from "@/content/hero";

const SLIDE_INTERVAL_MS = 7000;

/**
 * Fotograf yokken gosterilen tasarimli arka plan. Logodaki kule simgesi ve
 * ince bir mimari izgara kullanir; boylece hero bos veya kirik gorunmez.
 */
function DesignedBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,var(--color-surface-3)_0%,var(--color-surface)_45%,var(--color-ground)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute -right-8 bottom-0 w-[66%] max-w-3xl opacity-[0.20]">
        <Image
          src="/logo-mark-white.png"
          alt=""
          width={258}
          height={195}
          className="logo-adaptive w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}

export default function Hero({ images = [] }: { images?: HeroImage[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % images.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-ground overflow-hidden pt-20">
      {/* Arka plan katmani */}
      <div className="absolute inset-0">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={index !== active}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover hero-slide-image"
              />
            </div>
          ))
        ) : (
          <DesignedBackdrop />
        )}
      </div>

      {/*
       * Okunabilirlik perdesi. Hangi fotograf yuklenirse yuklensin baslik ve
       * butonlarin kontrasti garanti altina alinir; acik veya kalabalik bir
       * gorsel tasarimi bozamaz.
       */}
      <div className="absolute inset-0 bg-ground/40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ground/90 via-ground/25 to-ground"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 45%, transparent 0%, color-mix(in srgb, var(--color-ground) 62%, transparent) 100%)",
        }}
      />

      {/* Icerik */}
      <div className="relative max-w-5xl mx-auto px-6 text-center text-fg z-10 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 font-sans">
          Geleceği İnşa Ediyoruz, <br />
          <span className="text-bronze-light">Kalıcı Değerler</span> Sunuyoruz.
        </h1>

        <p className="text-lg md:text-xl text-fg-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Kısa İnşaat güvencesiyle modern mimari, yüksek deprem güvenliği ve
          estetik yaşam alanları üretiyoruz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/gayrimenkuller"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-bronze hover:bg-bronze-strong text-bronze-ink font-semibold px-8 py-4 rounded-md transition-all shadow-xl shadow-bronze-dark/30"
          >
            <Home className="w-5 h-5" />
            <span>Satılık &amp; Kiralık İlanlar</span>
          </Link>
          <Link
            href="/projeler"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-line-strong hover:border-fg-muted bg-surface/60 text-fg hover:text-fg font-semibold px-8 py-4 rounded-md backdrop-blur-sm transition-all"
          >
            <span>Devam Eden Projelerimiz</span>
            <ChevronRight className="w-4 h-4 text-bronze" />
          </Link>
        </div>
      </div>

      {/* Slayt gostergeleri */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${index + 1}. görsele geç`}
              aria-current={index === active}
              className={`h-1 rounded-full transition-all ${
                index === active
                  ? "w-10 bg-bronze"
                  : "w-5 bg-fg/30 hover:bg-fg/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
