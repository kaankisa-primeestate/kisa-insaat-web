import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export default function IletisimPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">İletişim Bilgileri</h1>
          <p className="text-slate-400">
            Projelerimiz, satıştaki dairelerimiz veya kentsel dönüşüm süreçleriyle ilgili bilgi almak için Bostancı merkez ofisimize bekleriz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Adres Kartı */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">Merkez Ofis Adresimiz</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bostancı Mahallesi Bağdat Caddesi No:520 Kat:2 Daire:6 Kadıköy - İstanbul / TÜRKİYE
            </p>
          </div>

          {/* Telefon Kartı */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">Telefon & WhatsApp</h3>
            <div className="text-slate-400 text-sm space-y-1">
              <p>Ofis: +90 (216) 352 97 94</p>
              <p>GSM / WhatsApp: +90 (532) 326 87 39</p>
            </div>
            <a
              href="https://wa.me/905323268739"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp ile Mesaj Gönder
            </a>
          </div>

          {/* E-Posta Kartı */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-3">E-Posta & Çalışma Saatleri</h3>
            <div className="text-slate-400 text-sm space-y-1">
              <p>E-Posta: info@kisainsaat.com</p>
              <p>Pazartesi - Cumartesi: 09:00 - 18:30</p>
            </div>
          </div>
        </div>

        {/* Google Harita */}
        <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-800">
          <iframe
            title="Kısa İnşaat Harita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.393437597193!2d29.0924!3d40.9547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac79496b864a7%3A0x6a053f3e1cb9f2a!2sBostanc%C4%B1%2C%20Ba%C4%9Fdat%20Cd.%20No%3A520%2C%2034744%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1725810000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
