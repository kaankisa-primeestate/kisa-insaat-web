"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { whatsappHref } from "@/lib/format";

type Fields = {
  name: string;
  phone: string;
  email: string;
  address: string;
  adaParsel: string;
  currentBuilding: string;
  notes: string;
};

const EMPTY: Fields = {
  name: "",
  phone: "",
  email: "",
  address: "",
  adaParsel: "",
  currentBuilding: "",
  notes: "",
};

const INPUT_CLASS =
  "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors";

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/**
 * Teklif formu. Gönderildiğinde bilgiler biçimlendirilip WhatsApp üzerinden
 * firmaya iletilir; böylece başvurular hiçbir yere kaydedilmeden kaybolmaz.
 */
export default function RenewalForm({
  whatsapp,
  kvkkText,
}: {
  whatsapp: string;
  kvkkText: string;
}) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [showKvkk, setShowKvkk] = useState(false);

  const update = (key: keyof Fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const lines = [
      "Kentsel Dönüşüm / Arsa Değerlendirme Talebi",
      "",
      `Ad Soyad: ${fields.name}`,
      `Telefon: ${fields.phone}`,
      fields.email ? `E-posta: ${fields.email}` : null,
      `Bina / Arsa Adresi: ${fields.address}`,
      fields.adaParsel ? `Ada / Parsel: ${fields.adaParsel}` : null,
      fields.currentBuilding ? `Mevcut Yapı: ${fields.currentBuilding}` : null,
      fields.notes ? `Notlar: ${fields.notes}` : null,
    ].filter(Boolean);

    window.open(
      `${whatsappHref(whatsapp)}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Başvurunuz İletildi</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Bilgileriniz WhatsApp üzerinden tarafımıza aktarıldı. Mesaj penceresi
          açılmadıysa lütfen doğrudan bizi arayın. En kısa sürede sizinle
          iletişime geçeceğiz.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setConsent(false);
            setSent(false);
          }}
          className="mt-4 px-6 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Yeni Başvuru Yap
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-2">Teklif &amp; Bilgi Formu</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Adınız Soyadınız" required>
          <input
            type="text"
            name="name"
            required
            value={fields.name}
            onChange={update("name")}
            placeholder="Örn: Kaan Kısa"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Telefon Numaranız" required>
          <input
            type="tel"
            name="phone"
            required
            value={fields.phone}
            onChange={update("phone")}
            placeholder="0532 123 45 67"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Bina / Arsa Adresi" required>
          <input
            type="text"
            name="address"
            required
            value={fields.address}
            onChange={update("address")}
            placeholder="Mahalle, cadde ve ilçe"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Ada / Parsel">
          <input
            type="text"
            name="adaParsel"
            value={fields.adaParsel}
            onChange={update("adaParsel")}
            placeholder="Örn: 901 Ada / 8 Parsel"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Mevcut Yapı Bilgisi">
          <input
            type="text"
            name="currentBuilding"
            value={fields.currentBuilding}
            onChange={update("currentBuilding")}
            placeholder="Örn: 10 Daire / 5 Kat"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="E-Posta Adresiniz">
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={update("email")}
            placeholder="ornek@eposta.com"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <Field label="Eklemek İstedikleriniz">
        <textarea
          name="notes"
          rows={4}
          value={fields.notes}
          onChange={update("notes")}
          placeholder="Binanız veya beklentileriniz hakkında kısa bilgi girebilirsiniz..."
          className={INPUT_CLASS}
        />
      </Field>

      {kvkkText && (
        <div className="space-y-3">
          <label className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 w-4 h-4 accent-amber-600 shrink-0"
            />
            <span>
              Kişisel verilerimin{" "}
              <button
                type="button"
                onClick={() => setShowKvkk((open) => !open)}
                className="text-amber-400 hover:underline"
              >
                KVKK Aydınlatma Metni
              </button>{" "}
              kapsamında işlenmesini kabul ediyorum.
            </span>
          </label>

          {showKvkk && (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 max-h-56 overflow-y-auto text-[11px] text-slate-400 leading-relaxed whitespace-pre-line">
              {kvkkText}
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={!consent}
        className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors shadow-lg shadow-amber-900/20"
      >
        <Send className="w-4 h-4" />
        <span>Teklif Talebini Gönder</span>
      </button>

      <p className="text-[11px] text-slate-500 text-center leading-relaxed">
        Gönder&apos;e bastığınızda bilgileriniz WhatsApp üzerinden tarafımıza
        iletilir.
      </p>
    </form>
  );
}
