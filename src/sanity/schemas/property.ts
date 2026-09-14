import { defineField, defineType } from "sanity";
import { galleryField, imageField } from "../lib/fields";

export const PROPERTY_STATUSES = [
  { title: "Satılık", value: "available" },
  { title: "Opsiyonlu / Rezerve", value: "reserved" },
  { title: "Satıldı", value: "sold" },
] as const;

export const ROOM_COUNTS = [
  "1+1",
  "2+1",
  "3+1",
  "4+1",
  "4+1 Dubleks",
  "5+1 Dubleks",
  "Ticari / Dükkan",
] as const;

export default defineType({
  name: "property",
  title: "Satıştaki Gayrimenkuller",
  type: "document",
  groups: [
    { name: "genel", title: "Genel Bilgiler", default: true },
    { name: "olcu", title: "Ölçüler & Fiyat" },
    { name: "gorseller", title: "Görseller" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Daire Başlığı",
      type: "string",
      group: "genel",
      description: 'Örnek: "Ebru Apt. Kat: 4, Daire: 12". 5-70 karakter.',
      validation: (Rule) => Rule.required().min(5).max(70),
    }),
    defineField({
      name: "project",
      title: "İlişkili Proje",
      type: "reference",
      group: "genel",
      to: [{ type: "project" }],
      description: "Bu dairenin ait oldugu proje. Zorunlu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Satış Durumu",
      type: "string",
      group: "genel",
      initialValue: "available",
      options: { list: [...PROPERTY_STATUSES], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "roomCount",
      title: "Oda Sayısı",
      type: "string",
      group: "genel",
      options: { list: [...ROOM_COUNTS] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "floor",
      title: "Bulunduğu Kat",
      type: "string",
      group: "genel",
      description: 'Örnek: "4. Kat", "Cati Kati", "Zemin"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "featured",
      title: "Ana Sayfada Öne Çıkar",
      type: "boolean",
      group: "genel",
      initialValue: false,
      description: "Ana sayfadaki one çıkan daireler bölümünde gösterilir.",
    }),

    defineField({
      name: "grossArea",
      title: "Brüt m2",
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
              : "Net m2, brüt m2'den büyük olamaz. Değerleri kontrol edin.";
          }),
    }),
    defineField({
      name: "price",
      title: "Fiyat",
      type: "string",
      group: "olcu",
      initialValue: "Fiyat İçin İletişime Gecin",
      description:
        'Rakam yazacaksaniz para birimiyle birlikte yazın. Boş bırakmayın; fiyat vermek istemiyorsaniz "Fiyat İçin İletişime Gecin" kalsin.',
      validation: (Rule) => Rule.required().max(60),
    }),

    galleryField("images", "Daire Görselleri", "card", {
      group: "gorseller",
      min: 1,
      max: 20,
      description: "En az 1, en fazla 20 görsel. Ilk görsel kartta kapak olarak kullanılır.",
    }),
    imageField("floorPlan", "Kat Planı", "plan", {
      group: "gorseller",
      description: "Opsiyonel. Dikey veya kare olabilir, oran kontrolü uygulanmaz.",
    }),

    defineField({
      name: "description",
      title: "Daire Açıklaması",
      type: "text",
      rows: 5,
      group: "genel",
      description: "40-500 karakter. One çıkan özellikleri ve konumu anlatın.",
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
