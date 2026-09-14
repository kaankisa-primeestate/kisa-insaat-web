import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";
import { formatPhone, telHref } from "@/lib/format";

const QUICK_LINKS = [
  { href: "/kurumsal", label: "Hakkımızda" },
  { href: "/projeler?durum=devam", label: "Devam Eden Projeler" },
  { href: "/projeler?durum=tamamlanan", label: "Tamamlanan Projeler" },
  { href: "/gayrimenkuller", label: "Satılık & Kiralık İlanlar" },
  { href: "/kentsel-donusum", label: "Kentsel Dönüşüm" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { href: settings.instagram, label: "IG" },
    { href: settings.linkedin, label: "IN" },
    { href: settings.facebook, label: "FB" },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href));

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Image
            src="/logo-white.png"
            alt={settings.companyName}
            width={1046}
            height={197}
            className="h-8 w-auto"
          />
          <p className="text-sm leading-relaxed text-slate-400">
            Türkiye genelinde konut, ticari yapı ve kentsel dönüşüm projeleri
            üretiyoruz. Mühendislik disiplini ve yüksek malzeme kalitesiyle
            kalıcı yapılar inşa ediyoruz.
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold text-slate-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
            Hızlı Bağlantılar
          </h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
            Ofis &amp; İletişim
          </h4>
          <ul className="space-y-3 text-sm">
            {settings.address && (
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            )}
            {settings.phone && (
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={telHref(settings.phone)}
                  className="hover:text-amber-500 transition-colors"
                >
                  {formatPhone(settings.phone)}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-amber-500 transition-colors"
                >
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-800">
          <h4 className="text-white font-semibold text-sm mb-2">
            Binanızı Yenileyelim
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Arsanız veya kentsel dönüşüm kapsamındaki binanız için mimari teklif
            alın.
          </p>
          <Link
            href="/kentsel-donusum"
            className="inline-block w-full text-center bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold py-2.5 rounded transition-colors"
          >
            Teklif Formu Doldurun
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} {settings.companyName}. Tüm hakları
          saklıdır.
        </p>
        <Link href="/studio" className="hover:text-slate-300 transition-colors">
          Yönetim Paneli
        </Link>
      </div>
    </footer>
  );
}
