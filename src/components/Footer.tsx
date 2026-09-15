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
    <footer className="bg-ground text-fg-muted border-t border-line pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Image
            src="/logo-white.png"
            alt={settings.companyName}
            width={1046}
            height={197}
            className="logo-adaptive h-8 w-auto"
          />
          <p className="text-sm leading-relaxed text-fg-muted">
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
                  className="w-8 h-8 rounded bg-surface flex items-center justify-center hover:bg-bronze hover:text-bronze-ink transition-colors text-xs font-bold text-fg-muted"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-fg font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-bronze pl-3">
            Hızlı Bağlantılar
          </h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-bronze transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-fg font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-bronze pl-3">
            Ofis &amp; İletişim
          </h4>
          <ul className="space-y-3 text-sm">
            {settings.address && (
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fg-dim shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            )}
            {settings.phone && (
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-fg-dim shrink-0" />
                <a
                  href={telHref(settings.phone)}
                  className="hover:text-bronze transition-colors"
                >
                  {formatPhone(settings.phone)}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-fg-dim shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-bronze transition-colors"
                >
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="bg-surface/80 p-6 rounded-lg border border-line">
          <h4 className="text-fg font-semibold text-sm mb-2">
            Binanızı Yenileyelim
          </h4>
          <p className="text-xs text-fg-muted mb-4 leading-relaxed">
            Arsanız veya kentsel dönüşüm kapsamındaki binanız için mimari teklif
            alın.
          </p>
          <Link
            href="/kentsel-donusum"
            className="inline-block w-full text-center bg-bronze hover:bg-bronze-strong text-bronze-ink text-xs font-semibold py-2.5 rounded transition-colors"
          >
            Teklif Formu Doldurun
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-line text-xs text-fg-dim flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} {settings.companyName}. Tüm hakları
          saklıdır.
        </p>
        <Link href="/studio" className="hover:text-fg-muted transition-colors">
          Yönetim Paneli
        </Link>
      </div>
    </footer>
  );
}
