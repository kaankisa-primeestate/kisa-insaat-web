"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PALETTES = [
  { id: "", label: "Taş & Bronz" },
  { id: "grafit", label: "Grafit & Kireç" },
  { id: "yesil", label: "Derin Yeşil & Pirinç" },
] as const;

const PARAM = "palet";

/** Seçilen paleti kök elemana yazar; boş değer varsayılana döner. */
function applyPalette(id: string) {
  if (id) document.documentElement.dataset.palet = id;
  else delete document.documentElement.dataset.palet;
}

/**
 * Geçici karşılaştırma aracı. Yalnızca adreste ?palet= parametresi varken
 * görünür; normal ziyaretçiler hiçbir şey görmez ve varsayılan paleti alır.
 * Renk kararı verildikten sonra bu bileşen ve alternatif palet tanımları
 * kaldırılacaktır.
 */
export default function PaletteSwitcher() {
  const params = useSearchParams();
  const requested = params.get(PARAM);
  const [override, setOverride] = useState<string | null>(null);

  const fromUrl =
    requested === null
      ? null
      : PALETTES.some((palette) => palette.id === requested)
        ? requested
        : "";
  const active = override ?? fromUrl;

  useEffect(() => {
    if (active === null) return;
    applyPalette(active);
  }, [active]);

  if (active === null) return null;

  function choose(id: string) {
    setOverride(id);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, id || "tas");
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-wrap justify-center gap-1 bg-surface/95 backdrop-blur-md border border-line-strong rounded-xl p-1.5 shadow-2xl max-w-[calc(100vw-32px)]">
      <span className="self-center px-2 text-[10px] uppercase tracking-widest text-fg-dim">
        Palet
      </span>
      {PALETTES.map((palette) => (
        <button
          key={palette.id || "tas"}
          type="button"
          onClick={() => choose(palette.id)}
          aria-pressed={active === palette.id}
          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            active === palette.id
              ? "bg-bronze text-bronze-ink"
              : "text-fg-muted hover:text-fg hover:bg-surface-3"
          }`}
        >
          {palette.label}
        </button>
      ))}
    </div>
  );
}
