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
        <div className="text-bronze text-xs font-bold uppercase tracking-widest">
          Bize Ulaşın
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
          İletişim Bilgileri
        </h1>
        <p className="text-fg-muted text-base leading-relaxed">
          Projelerimiz, satıştaki dairelerimiz veya kentsel dönüşüm süreçleriyle
          ilgili bilgi almak için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-surface p-8 rounded-xl border border-line space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bronze/10 border border-bronze/30 text-bronze-light flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-fg">Merkez Ofisimiz</h2>
          <p className="text-sm text-fg-muted leading-relaxed">
            {settings.address}
          </p>
        </div>

        <div className="bg-surface p-8 rounded-xl border border-line space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bronze/10 border border-bronze/30 text-bronze-light flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-fg">Telefon &amp; WhatsApp</h2>
          <p className="text-sm text-fg-muted leading-relaxed space-y-1">
            {settings.phone && (
              <>
                Ofis:{" "}
                <a
                  href={telHref(settings.phone)}
                  className="hover:text-bronze-light transition-colors"
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
              className="inline-flex items-center gap-2 text-xs font-semibold text-wa-text hover:underline pt-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ile Mesaj Gönder</span>
            </a>
          )}
        </div>

        <div className="bg-surface p-8 rounded-xl border border-line space-y-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bronze/10 border border-bronze/30 text-bronze-light flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-fg">
            E-Posta &amp; Çalışma Saatleri
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed">
            {settings.email && (
              <>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-bronze-light transition-colors inline-flex items-center gap-1.5"
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
        <div className="bg-surface rounded-xl overflow-hidden border border-line h-96">
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
