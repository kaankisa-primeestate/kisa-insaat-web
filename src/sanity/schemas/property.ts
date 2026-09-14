import { defineField, defineType } from "sanity";
import { galleryField, imageField } from "../lib/fields";

export const PROPERTY_STATUSES = [
  { title: "Satilik", value: "available" },
  { title: "Opsiyonlu / Rezerve", value: "reserved" },
  { title: "Satildi", value: "sold" },
] as const;

export const ROOM_COUNTS = [
  "1+1",
  "2+1",
  "3+1",
  "4+1",
  "4+1 Dubleks",
  "5+1 Dubleks",
  "Ticari / Dukkan",
] as const;

export default defineType({
  name: "property",
  title: "Satistaki Gayrimenkuller",
  type: "document",
  groups: [
    { name: "genel", title: "Genel Bilgiler", default: true },
    { name: "olcu", title: "Olculer & Fiyat" },
    { name: "gorseller", title: "Gorseller" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Daire Basligi",
      type: "string",
      group: "genel",
      description: 'Ornek: "Ebru Apt. Kat: 4, Daire: 12". 5-70 karakter.',
      validation: (Rule) => Rule.required().min(5).max(70),
    }),
    defineField({
      name: "project",
      title: "Iliskili Proje",
      type: "reference",
      group: "genel",
      to: [{ type: "project" }],
      description: "Bu dairenin ait oldugu proje. Zorunlu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Satis Durumu",
      type: "string",
      group: "genel",
      initialValue: "available",
      options: { list: [...PROPERTY_STATUSES], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "roomCount",
      title: "Oda Sayisi",
      type: "string",
      group: "genel",
      options: { list: [...ROOM_COUNTS] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "floor",
      title: "Bulundugu Kat",
      type: "string",
      group: "genel",
      description: 'Ornek: "4. Kat", "Cati Kati", "Zemin"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "featured",
      title: "Ana Sayfada One Cikar",
      type: "boolean",
      group: "genel",
      initialValue: false,
      description: "Ana sayfadaki one cikan daireler bolumunde gosterilir.",
    }),

    defineField({
      name: "grossArea",
      title: "Brut m2",
      type: "number",
      group: "olcu",
      validation: (Rule) => Rule.required().min(20).max(2000),
    }),
    defineField({
      name: "netArea",
      title: "Net m2",
      type: "number",
      group: "olcu",
      validation: (Rule) =>
        Rule.required()
          .min(15)
          .max(2000)
          .custom((value, context) => {
            const gross = (context.document as { grossArea?: number } | undefined)
              ?.grossArea;
            if (typeof value !== "number" || typeof gross !== "number")
              return true;
            return value <= gross
              ? true
              : "Net m2, brut m2'den buyuk olamaz. Degerleri kontrol edin.";
          }),
    }),
    defineField({
      name: "price",
      title: "Fiyat",
      type: "string",
      group: "olcu",
      initialValue: "Fiyat Icin Iletisime Gecin",
      description:
        'Rakam yazacaksaniz para birimiyle birlikte yazin. Bos birakmayin; fiyat vermek istemiyorsaniz "Fiyat Icin Iletisime Gecin" kalsin.',
      validation: (Rule) => Rule.required().max(60),
    }),

    galleryField("images", "Daire Gorselleri", "card", {
      min: 1,
      max: 20,
      description: "En az 1, en fazla 20 gorsel. Ilk gorsel kartta kapak olarak kullanilir.",
    }),
    imageField("floorPlan", "Kat Plani", "plan", {
      description: "Opsiyonel. Dikey veya kare olabilir, oran kontrolu uygulanmaz.",
    }),

    defineField({
      name: "description",
      title: "Daire Aciklamasi",
      type: "text",
      rows: 5,
      group: "genel",
      description: "40-500 karakter. One cikan ozellikleri ve konumu anlatin.",
      validation: (Rule) => Rule.required().min(40).max(500),
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      room: "roomCount",
      gross: "grossArea",
      media: "images.0",
      projectTitle: "project.title",
    },
    prepare({ title, status, room, gross, media, projectTitle }) {
      const label =
        PROPERTY_STATUSES.find((s) => s.value === status)?.title ?? "Durum yok";
      const parts = [projectTitle, room, gross ? `${gross} m2` : null, label];
      return {
        title,
        subtitle: parts.filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
