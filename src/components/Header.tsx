"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md py-4 shadow-xl border-b border-slate-800"
          : "bg-gradient-to-b from-slate-950/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded flex items-center justify-center font-bold text-white text-xl tracking-wider">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wider text-white uppercase font-sans">
              KISA İNŞAAT
            </span>
            <span className="text-[10px] tracking-widest text-amber-500 uppercase">
              Bostancı · Kadıköy
            </span>
          </div>
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <Link href="/kurumsal" className="hover:text-amber-500 transition-colors">
            Kurumsal
          </Link>
          <Link href="/projeler" className="hover:text-amber-500 transition-colors">
            Projelerimiz
          </Link>
          <Link href="/satistaki-gayrimenkuller" className="hover:text-amber-500 transition-colors">
            Satıştaki Daireler
          </Link>
          <Link href="/kentsel-donusum" className="hover:text-amber-500 transition-colors">
            Kentsel Dönüşüm
          </Link>
          <Link href="/iletisim" className="hover:text-amber-500 transition-colors">
            İletişim
          </Link>
        </nav>

        {/* Sağ Aksiyon Butonları */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/905320000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-all shadow-lg shadow-emerald-900/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+902160000000"
            className="flex items-center gap-2 border border-slate-700 hover:border-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-all"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>0216 000 00 00</span>
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

      {/* Mobil Menü Açılır Alanı */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
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
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="https://wa.me/905320000000"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp İletişim</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
