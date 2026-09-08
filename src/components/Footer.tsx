import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Kolon 1: Logo ve Kısa Hakkımızda */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-600 rounded flex items-center justify-center font-bold text-white text-lg">
              K
            </div>
            <span className="text-lg font-bold tracking-wider text-white uppercase">
              KISA İNŞAAT
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Kadıköy Bostancı merkezli, kentsel dönüşüm ve nitelikli konut projelerinde güvenilir, çağdaş ve estetik mimari çözümler sunuyoruz.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold text-slate-300">
              IG
            </a>
            <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold text-slate-300">
              IN
            </a>
            <a href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold text-slate-300">
              FB
            </a>
          </div>
        </div>

        {/* Kolon 2: Hızlı Menü */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
            Hızlı Bağlantılar
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/kurumsal" className="hover:text-amber-500 transition-colors">Hakkımızda</Link></li>
            <li><Link href="/projeler" className="hover:text-amber-500 transition-colors">Devam Eden Projeler</Link></li>
            <li><Link href="/projeler" className="hover:text-amber-500 transition-colors">Tamamlanan Projeler</Link></li>
            <li><Link href="/satistaki-gayrimenkuller" className="hover:text-amber-500 transition-colors">Satıştaki Daireler</Link></li>
            <li><Link href="/kentsel-donusum" className="hover:text-amber-500 transition-colors">Kentsel Dönüşüm</Link></li>
          </ul>
        </div>

        {/* Kolon 3: İletişim Bilgileri */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-3">
            Ofis & İletişim
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>Bağdat Caddesi, Bostancı Marmaray Yakını, Kadıköy / İstanbul</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+90 (216) 000 00 00</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>info@kisainsaat.com</span>
            </li>
          </ul>
        </div>

        {/* Kolon 4: Kentsel Dönüşüm / Çağrı */}
        <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-800">
          <h4 className="text-white font-semibold text-sm mb-2">
            Binanızı Yenileyelim
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Kadıköy bölgesindeki arsanız veya kentsel dönüşüm kapsamındaki binanız için mimari teklif alın.
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
        <p>© {new Date().getFullYear()} Kısa İnşaat. Tüm hakları saklıdır.</p>
        <p className="tracking-wide">Tasarım & Mimari: Modern Kurumsal Çözümler</p>
      </div>
    </footer>
  );
}
