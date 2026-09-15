"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import type { SiteSettings } from "@/sanity/types";
import { formatPhone, telHref, whatsappHref } from "@/lib/format";

const NAV_LINKS = [
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/projeler", label: "Projelerimiz" },
  { href: "/gayrimenkuller", label: "Satılık & Kiralık" },
  { href: "/kentsel-donusum", label: "Kentsel Dönüşüm" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-md py-4 shadow-xl border-b border-line"
          : "bg-gradient-to-b from-ground/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/*
          Logo 1046x197 oranındadır; kare bir kutuya sokulduğunda okunmaz hale
          gelir. Bu nedenle yükseklik sabitlenip genişlik serbest bırakılır.
          Logo zaten "KISA" yazdığı için yanında aynı yazı tekrarlanmaz.
        */}
        <Link href="/" className="flex items-center gap-4 group shrink-0">
          <Image
            src="/logo-white.png"
            alt={settings.companyName}
            width={1046}
            height={197}
            priority
            className={`logo-adaptive w-auto transition-all duration-300 ${
              isScrolled ? "h-7 md:h-8" : "h-8 md:h-10"
            }`}
          />
          <span className="hidden sm:block w-px h-7 bg-surface-3 group-hover:bg-bronze/60 transition-colors" />
          <span className="hidden sm:block text-sm font-semibold tracking-[0.22em] text-fg uppercase">
            İnşaat
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-fg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-bronze transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {settings.whatsapp && (
            <a
              href={whatsappHref(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-wa hover:bg-wa-hover text-fg text-xs font-semibold px-4 py-2.5 rounded-md transition-all shadow-lg shadow-wa/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}
          {settings.phone && (
            <a
              href={telHref(settings.phone)}
              className="flex items-center gap-2 border border-line-strong hover:border-bronze text-fg text-xs font-semibold px-4 py-2.5 rounded-md transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-fg-muted" />
              <span>{formatPhone(settings.phone)}</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-fg p-2 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-line px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-fg hover:text-bronze font-medium"
            >
              {link.label}
            </Link>
          ))}
          {settings.whatsapp && (
            <div className="pt-4 border-t border-line">
              <a
                href={whatsappHref(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-wa text-fg text-sm font-semibold py-2.5 rounded-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İletişim</span>
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
