"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Menu, X, ArrowLeft } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        !isHomePage || isScrolled
          ? "bg-slate-900/98 backdrop-blur-md py-4 shadow-2xl border-b border-slate-800"
          : "bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Sol Logo ve Ana Sayfa / Geri Alanı */}
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 font-semibold bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-all"
              title="Ana Sayfaya Dön"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </Link>
          )}

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-600 group-hover:bg-amber-500 rounded flex items-center justify-center font-bold text-white text-lg tracking-wider transition-colors">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-wider text-white uppercase font-sans">
                KISA İNŞAAT
              </span>
              <span className="text-[9px] tracking-widest text-amber-500 uppercase font-semibold">
                Bostancı · Kadıköy
              </span>
            </div>
          </Link>
        </div>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-200">
          <Link
            href="/kurumsal"
            className={`transition-colors ${pathname === "/kurumsal" ? "text-amber-500 font-bold" : "hover:text-amber-500"}`}
          >
            Kurumsal
          </Link>
          <Link
            href="/projeler"
            className={`transition-colors ${pathname.startsWith("/projeler") ? "text-amber-500 font-bold" : "hover:text-amber-500"}`}
          >
            Projelerimiz
          </Link>
          <Link
            href="/satistaki-gayrimenkuller"
            className={`transition-colors ${pathname === "/satistaki-gayrimenkuller" ? "text-amber-500 font-bold" : "hover:text-amber-500"}`}
          >
            Satıştaki Daireler
          </Link>
          <Link
            href="/kentsel-donusum"
            className={`transition-colors ${pathname === "/kentsel-donusum" ? "text-amber-500 font-bold" : "hover:text-amber-500"}`}
          >
            Kentsel Dönüşüm
          </Link>
          <Link
            href="/iletisim"
            className={`transition-colors ${pathname === "/iletisim" ? "text-amber-500 font-bold" : "hover:text-amber-500"}`}
          >
            İletişim
          </Link>
        </nav>

        {/* Sağ İletişim Butonları */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/905323268739"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-all shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+902163529794"
            className="flex items-center gap-2 border border-slate-700 hover:border-amber-500 text-slate-200 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>0216 352 97 94</span>
          </a>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/kurumsal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            Kurumsal
          </Link>
          <Link
            href="/projeler"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            Projelerimiz
          </Link>
          <Link
            href="/satistaki-gayrimenkuller"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            Satıştaki Daireler
          </Link>
          <Link
            href="/kentsel-donusum"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            Kentsel Dönüşüm
          </Link>
          <Link
            href="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-amber-500 font-medium"
          >
            İletişim
          </Link>
        </div>
      )}
    </header>
  );
}
