"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building, ShieldCheck, FileText, CheckCircle2, Send } from "lucide-react";

export default function UrbanRenewalPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
            Binanızı Yenileyelim
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Kentsel Dönüşüm & Arsa Değerlendirme
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Kadıköy Bostancı ve çevresindeki binanızı Kısa İnşaat güvencesiyle yenilemek veya arsanız için mimari proje teklifi almak için formu doldurabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sol Kolon: Süreç ve Güvence Bilgileri */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white border-l-2 border-amber-500 pl-3">
                Kısa İnşaat Kentsel Dönüşüm Süreci
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Ön İnceleme & Teknik Analiz</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Binanızın mevcut imar durumu, ada/parsel metrajı ve belediye şartnameleri uzman ekibimizce incelenir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Mimari Proje & Avam Çalışması</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Kat maliklerinin ihtiyaçlarına uygun, maximum alan verimliliği sağlayan estetik mimari taslak hazırlanır.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Şeffaf Sözleşme & Güvenli İnşaat</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Resmi sözleşme ve teknik şartname ile zamanında teslimat garantisi verilerek inşaat süreci başlatılır.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-amber-950/30 p-6 rounded-xl border border-amber-500/20 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Yüksek Deprem Güvenliği</h4>
                <p className="text-xs text-slate-400">
                  Tüm projelerimizde C35/40 hazır beton ve radye jeneral temel sistemi standart olarak uygulanır.
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Başvuru Formu */}
          <div className="lg:col-span-7 bg-slate-900 p-8 rounded-xl border border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Başvurunuz Alındı!</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Bina/Arsa bilgilerinizi inceleyip en kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold"
                >
                  Yeni Başvuru Yap
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Teklif & Bilgi Formu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Kaan Kısa"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0532 000 00 00"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Bina / Arsa Adresi *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Bostancı Mah. Ali Nihat Tarlan Cad."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Ada / Parsel Bilgisi (Varsa)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 901 Ada / 8 Parsel"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Mevcut Daire / Kat Sayısı
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 10 Daire / 5 Kat"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      placeholder="info@ornek.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Eklemek İstediğiniz Notlar
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Binanız veya beklentileriniz hakkında kısa bilgi girebilirsiniz..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-xl shadow-amber-900/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Teklif Başvurusunu Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
