import type { Metadata } from "next";
import { Award, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "Kısa İnşaat; Türkiye genelinde konut, ticari yapı ve kentsel dönüşüm projeleri üreten, mühendislik disiplinini önceleyen bir inşaat firmasıdır.",
};

export default function CorporatePage() {
  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-20 w-full">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-bronze text-xs font-bold uppercase tracking-widest">
          Biz Kimiz?
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
          Hakkımızda &amp; Vizyonumuz
        </h1>
        <p className="text-fg-muted text-base leading-relaxed">
          Kısa İnşaat; Türkiye genelindeki mimari tecrübesiyle estetik, güvenli
          ve çevreye duyarlı yaşam alanları inşa etmektedir.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-fg border-l-2 border-bronze pl-3">
            Mühendislik Disiplini ve Güven İlkesi
          </h2>
          <p className="text-fg-muted text-base leading-relaxed">
            İnşaat sektöründe kalite standartlarını ve güvenilirliği ön planda
            tutan Kısa İnşaat, Türkiye genelinde konut, ticari yapı ve kentsel
            dönüşüm projeleri gerçekleştirmektedir.
          </p>
          <p className="text-fg-muted text-base leading-relaxed">
            İstanbul Kadıköy Bağdat Caddesi ve çevresindeki kentsel dönüşüm
            uygulamalarında ise özel bir uzmanlığa sahibiz; bölgenin imar
            dokusunu ve hak sahipliği süreçlerini yakından tanıyoruz.
          </p>
          <p className="text-fg-muted text-base leading-relaxed">
            Her projemizde son deprem yönetmeliklerine tam uyum, yüksek nitelikli
            inşaat malzemeleri kullanımı ve modern mimari çizgiler standart
            olarak uygulanmaktadır.
          </p>
        </div>

        <div className="bg-surface p-8 rounded-xl border border-line space-y-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-bronze shrink-0" />
            <div>
              <h3 className="text-base font-bold text-fg">
                Kalite Standardımız
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed mt-1">
                Projelerimizin her aşamasında beton ve demir laboratuvar
                testleri eksiksiz uygulanır.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-bronze shrink-0" />
            <div>
              <h3 className="text-base font-bold text-fg">
                Zamanında Teslimat
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed mt-1">
                Sözleşmede taahhüt edilen teslim tarihlerine sadık kalınarak
                şeffaf süreç yönetilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
