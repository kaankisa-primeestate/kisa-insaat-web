import { defineField, defineType } from "sanity";

/** Turkiye sabit/cep hat formati: +90 ile baslayan 12 haneli E.164. */
const TR_PHONE = /^\+90[0-9]{10}$/;

export default defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "iletisim", title: "İletişim", default: true },
    { name: "sosyal", title: "Sosyal Medya" },
    { name: "seo", title: "SEO & Meta" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Firma Adı",
      type: "string",
      group: "iletisim",
      initialValue: "Kısa İnşaat",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "phone",
      title: "Ofis Telefonu",
      type: "string",
      group: "iletisim",
      description:
        "Ulke kodu ile bosluksuz yazın. Örnek: +902161234567. Sitede okunakli formata cevrilir.",
      validation: (Rule) =>
        Rule.required().regex(TR_PHONE, {
          name: "telefon",
          invert: false,
        }).error("Format: +90 ile başlayan 12 hane. Örnek: +902161234567"),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Numarası",
      type: "string",
      group: "iletisim",
      description:
        "WhatsApp butonunun yonlendirecegi numara. Örnek: +905321234567",
      validation: (Rule) =>
        Rule.required().regex(TR_PHONE, { name: "whatsapp" }).error(
          "Format: +90 ile başlayan 12 hane. Örnek: +905321234567",
        ),
    }),
    defineField({
      name: "email",
      title: "E-Posta Adresi",
      type: "string",
      group: "iletisim",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Ofis Adresi",
      type: "text",
      rows: 3,
      group: "iletisim",
      description: "Footer ve iletisim sayfasinda görünür. 20-200 karakter.",
      validation: (Rule) => Rule.required().min(20).max(200),
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Haritalar Gömme Adresi",
      type: "url",
      group: "iletisim",
      description:
        'Google Haritalar > Paylaş > Harita yerleştir menüsündeki iframe içindeki src adresi. "https://www.google.com/maps/embed" ile başlamalı.',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ["https"] })
          .custom((value) =>
            typeof value !== "string" ||
            value.startsWith("https://www.google.com/maps/embed")
              ? true
              : "Adres https://www.google.com/maps/embed ile başlamalı. Paylasim linkini değil, gömme (embed) linkini kullanın.",
          ),
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "string",
      group: "iletisim",
      description: 'Örnek: "Pazartesi - Cumartesi: 09:00 - 18:30"',
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "instagram",
      title: "Instagram Adresi",
      type: "url",
      group: "sosyal",
      description: "Boş bırakırsanız ikon sitede gösterilmez.",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook Adresi",
      type: "url",
      group: "sosyal",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Adresi",
      type: "url",
      group: "sosyal",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),

    defineField({
      name: "metaTitle",
      title: "Site Başlığı (Tarayıcı Sekmesi)",
      type: "string",
      group: "seo",
      description:
        "Google sonuçlarında başlık olarak görünür. 30-60 karakter arasi idealdir.",
      validation: (Rule) => Rule.required().min(20).max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Site Açıklaması",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Google sonuçlarında basligin altındaki açıklama. 120-160 karakter arasi idealdir.",
      validation: (Rule) => Rule.required().min(80).max(160),
    }),
    defineField({
      name: "kvkkText",
      title: "KVKK Aydınlatma Metni",
      type: "text",
      rows: 8,
      group: "seo",
      description:
        "Teklif formunun altında gösterilir. Kişisel veri toplayan formlar için yasal zorunluluktur.",
      validation: (Rule) => Rule.required().min(100),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Ayarları", subtitle: "İletişim, sosyal medya, SEO" }),
  },
});
