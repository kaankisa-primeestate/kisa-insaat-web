import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
            Bize Ulaşın
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            İletişim Bilgileri
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Projelerimiz, satıştaki dairelerimiz veya kentsel dönüşüm süreçleriyle ilgili bilgi almak için Bostancı merkez ofisimize bekleriz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Adres Kartı */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Merkez Ofis Adresimiz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bağdat Caddesi, Bostancı Marmaray İstasyonu Yakını, Bostancı, Kadıköy / İstanbul
            </p>
          </div>

          {/* Telefon & WhatsApp Kartı */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Telefon & WhatsApp</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ofis: +90 (216) 000 00 00 <br />
              GSM / WhatsApp: +90 (532) 000 00 00
            </p>
            <a
              href="https://wa.me/905320000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline pt-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ile Mesaj Gönder</span>
            </a>
          </div>

          {/* E-Posta & Saatler */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">E-Posta & Çalışma Saatleri</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              E-Posta: info@kisainsaat.com <br />
              Pazartesi - Cumartesi: 09:00 - 18:30
            </p>
          </div>
        </div>

        {/* Harita / Konum Alanı */}
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-96 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12048.910943261778!2d29.0911!3d40.9525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac6382b6b2311%3A0x6b8c8f0000000000!2sBostanc%C4%B1%2C%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125 opacity-80"
          ></iframe>
        </div>
      </main>

      <Footer />
    </div>
  );
}
