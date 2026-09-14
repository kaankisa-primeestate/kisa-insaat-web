import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getSiteSettings } from "@/sanity/settings";
import { formatPhone, telHref, whatsappHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kısa İnşaat ile iletişime geçin. Projelerimiz, satıştaki dairelerimiz ve kentsel dönüşüm süreçleri hakkında bilgi alın.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
          Bize Ulaşın
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          İletişim Bilgileri
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Projelerimiz, satıştaki dairelerimiz veya kentsel dönüşüm süreçleriyle
          ilgili bilgi almak için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Merkez Ofisimiz</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {settings.address}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Telefon &amp; WhatsApp</h2>
          <p className="text-xs text-slate-400 leading-relaxed space-y-1">
            {settings.phone && (
              <>
                Ofis:{" "}
                <a
                  href={telHref(settings.phone)}
                  className="hover:text-amber-400 transition-colors"
                >
                  {formatPhone(settings.phone)}
                </a>
                <br />
              </>
            )}
            {settings.whatsapp && (
              <>GSM / WhatsApp: {formatPhone(settings.whatsapp)}</>
            )}
          </p>
          {settings.whatsapp && (
            <a
              href={whatsappHref(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline pt-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ile Mesaj Gönder</span>
            </a>
          )}
        </div>

        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">
            E-Posta &amp; Çalışma Saatleri
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {settings.email && (
              <>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {settings.email}
                </a>
                <br />
              </>
            )}
            {settings.workingHours}
          </p>
        </div>
      </div>

      {settings.mapEmbedUrl && (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-96">
          <iframe
            src={settings.mapEmbedUrl}
            title={`${settings.companyName} ofis konumu`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-125 opacity-80"
          />
        </div>
      )}
    </main>
  );
}
