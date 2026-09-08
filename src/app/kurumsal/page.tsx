import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ShieldCheck, Award, Users } from "lucide-react";

export default function CorporatePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <Header />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-20">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
            Biz Kimiz?
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Hakkımızda & Vizyonumuz
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Kısa İnşaat; Kadıköy Bostancı merkezli mimari tecrübesiyle estetik, güvenli ve çevreye duyarlı yaşam alanları inşa etmektedir.
          </p>
        </div>

        {/* Kurumsal Metin ve Görsel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white border-l-2 border-amber-500 pl-3">
              Mühendislik Disiplini ve Güven İlkesi
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              İnşaat sektöründe kalite standartlarını ve güvenilirliği ön planda tutan Kısa İnşaat, özellikle Kadıköy bölgesinde kentsel dönüşüm ve nitelikli konut projelerinde uzmanlaşmıştır.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Her bir projemizde son deprem yönetmeliklerine %100 uyum, yüksek nitelikli inşaat malzemeleri kullanımı ve modern mimari çizgiler standart olarak uygulanmaktadır.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">Kalite Standardımız</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Projelerimizin her aşamasında beton ve demir laboratuvar testleri eksiksiz uygulanır.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white">Zamanında Teslimat</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Sözleşmede taahhüt edilen teslim tarihlerine sadık kalınarak şeffaf süreç yönetilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
