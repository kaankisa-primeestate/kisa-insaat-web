import React from "react";
import { ShieldCheck, Clock, Target, Compass } from "lucide-react";

export default function KurumsalPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Üst Başlık ve Özet */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider block mb-2">
            Biz Kimiz?
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Hakkımızda & Vizyonumuz
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Kısa İnşaat, müşterilerine hızlı ve kaliteli hizmet vermeyi amaçlayan müteahhitlik, mimarlık ve mühendislik firmasıdır. Şirket, ekonomi, çevre ve etik değerlere önem veren çağdaş, seçkin ve hedef odaklı tasarım yaklaşımı ile yüksek kaliteli inşaat projeleri gerçekleştirmektedir. Kısa İnşaat, aynı zamanda Eylül Giyim, Probar Barkod Sistemleri ve Polenium Plato gibi farklı sektörlerde faaliyet gösteren grup şirketlerine sahiptir.
          </p>
        </div>

        {/* Detay Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Sol Kolon - Misyonumuz */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-amber-500">Misyonumuz</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Müşterilerimizin hayallerini ihtiyaçları ile birleştiren estetik, modern ve konforlu projeler sunmak ve kendilerini güvende hissedebilecekleri yaşam alanları oluşturmaktır.
              </p>
            </div>
          </div>

          {/* Sağ Kolon - Vizyonumuz */}
          <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-amber-500">Vizyonumuz</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Mühendislik ve yönetim bilimlerindeki en son teknoloji kullanılarak daima yüksek kalite sağlamak, inşaat ve gayrimenkul sektörleri için farklı ve özel bir çözüm ortağı haline gelmek ve geleceğe değer katan projeler geliştirmektir.
              </p>
            </div>
          </div>
        </div>

        {/* Değerler / Kalite Standartları Kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Kalite Standardımız</h3>
              <p className="text-slate-400 text-sm">
                Projelerimizin her aşamasında beton ve demir laboratuvar testleri eksiksiz uygulanır, son deprem yönetmeliklerine %100 uyum sağlanır.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Zamanında Teslimat</h3>
              <p className="text-slate-400 text-sm">
                Sözleşmede taahhüt edilen teslim tarihlerine sadık kalınarak şeffaf ve güvenilir süreç yönetilir.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
