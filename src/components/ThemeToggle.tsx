"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "tema";
const EVENT = "temadegisti";

type Tema = "gece" | "gunduz";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function readTema(): Tema {
  return document.documentElement.dataset.tema === "gunduz" ? "gunduz" : "gece";
}

/** Sunucuda tema bilinemez; varsayılan gece kabul edilir, istemcide düzeltilir. */
function readTemaOnServer(): Tema {
  return "gece";
}

function setTema(tema: Tema) {
  if (tema === "gunduz") document.documentElement.dataset.tema = "gunduz";
  else delete document.documentElement.dataset.tema;
  try {
    localStorage.setItem(STORAGE_KEY, tema);
  } catch {
    /* Depolama kapalıysa seçim yalnızca bu sayfa için geçerli olur. */
  }
  window.dispatchEvent(new Event(EVENT));
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const tema = useSyncExternalStore(subscribe, readTema, readTemaOnServer);
  const gunduz = tema === "gunduz";

  return (
    <button
      type="button"
      onClick={() => setTema(gunduz ? "gece" : "gunduz")}
      aria-label={gunduz ? "Gece moduna geç" : "Gündüz moduna geç"}
      title={gunduz ? "Gece modu" : "Gündüz modu"}
      className={`flex items-center justify-center w-9 h-9 rounded-md border border-line-strong text-fg-muted hover:text-fg hover:border-bronze transition-colors ${className}`}
    >
      {gunduz ? (
        <Moon className="w-4 h-4" aria-hidden />
      ) : (
        <Sun className="w-4 h-4" aria-hidden />
      )}
    </button>
  );
}
