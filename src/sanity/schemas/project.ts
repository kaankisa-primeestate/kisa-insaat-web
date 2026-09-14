import { defineArrayMember, defineField, defineType } from "sanity";
import { galleryField, imageField } from "../lib/fields";

export const PROJECT_STATUSES = [
  { title: "Planlanan", value: "planned" },
  { title: "Devam Ediyor", value: "ongoing" },
  { title: "Tamamlandi", value: "completed" },
] as const;

export default defineType({
  name: "project",
  title: "Projeler",
  type: "document",
  groups: [
    { name: "genel", title: "Genel Bilgiler", default: true },
    { name: "gorseller", title: "Gorseller" },
    { name: "detay", title: "Aciklama & Sartname" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Proje Adi",
      type: "string",
      group: "genel",
      description: "Kart ve sayfa basliginda gorunur. 3-60 karakter.",
      validation: (Rule) => Rule.required().min(3).max(60),
    }),
    defineField({
      name: "slug",
      title: "URL Baglantisi",
      type: "slug",
      group: "genel",
      description:
        "Proje adindan otomatik uretilir. Yayina alindiktan sonra degistirmeyin, eski baglantilar kirilir.",
      options: { source: "title", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Proje Durumu",
      type: "string",
      group: "genel",
      initialValue: "planned",
      options: {
        list: [...PROJECT_STATUSES],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completionPercentage",
      title: "Tamamlanma Yuzdesi (%)",
      type: "number",
      group: "genel",
      description:
        "Sadece devam eden projeler icin. Kartlarda ilerleme rozeti olarak gosterilir.",
      hidden: ({ document }) => document?.status !== "ongoing",
      validation: (Rule) =>
        Rule.min(0)
          .max(100)
          .custom((value, context) => {
            const status = (context.document as { status?: string } | undefined)
              ?.status;
            if (status !== "ongoing") return true;
            return typeof value === "number"
              ? true
              : "Devam eden projeler icin tamamlanma yuzdesi zorunludur.";
          }),
    }),
    defineField({
      name: "location",
      title: "Lokasyon",
      type: "string",
      group: "genel",
      description: 'Ornek: "Bostanci, Kadikoy / Istanbul"',
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: "adaParsel",
      title: "Ada / Parsel",
      type: "string",
      group: "genel",
      description: 'Ornek: "901 Ada / 8 Parsel"',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "deliveryDate",
      title: "Teslim Tarihi",
      type: "string",
      group: "genel",
      description: 'Ornek: "Aralik 2026" veya tamamlanan projeler icin "2024"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "order",
      title: "Siralama",
      type: "number",
      group: "genel",
      description:
        "Kucuk sayi once gosterilir. Bos birakirsaniz en yeni proje basa gelir.",
      initialValue: 0,
    }),

    imageField("mainImage", "Kapak Gorseli", "hero", {
      required: true,
      description:
        "Proje kartinda ve detay sayfasinin ustunde kullanilir. Yatay, yuksek cozunurluklu bir gorsel secin.",
    }),
    galleryField("gallery", "Gorsel Galerisi", "card", {
      max: 24,
      description:
        "Proje detay sayfasindaki galeri. En fazla 24 gorsel. Sirasi surukleyerek degistirilebilir.",
    }),

    defineField({
      name: "description",
      title: "Proje Aciklamasi",
      type: "text",
      rows: 6,
      group: "detay",
      description: "80-600 karakter. Projenin konumunu ve one cikan yanlarini anlatin.",
      validation: (Rule) => Rule.required().min(80).max(600),
    }),
    defineField({
      name: "features",
      title: "Teknik Ozellikler & Sartname",
      type: "array",
      group: "detay",
      description:
        "Her madde tek satir olmali. Ornek: \"C35/40 Yuksek Dayanimli Hazir Beton\". En fazla 14 madde.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required().min(5).max(90),
        }),
      ],
      validation: (Rule) =>
        Rule.max(14).error("En fazla 14 madde eklenebilir."),
    }),
  ],
  orderings: [
    {
      title: "Siralama (manuel)",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", status: "status", media: "mainImage", pct: "completionPercentage" },
    prepare({ title, status, media, pct }) {
      const label =
        PROJECT_STATUSES.find((s) => s.value === status)?.title ?? "Durum yok";
      return {
        title,
        subtitle: status === "ongoing" ? `${label} (%${pct ?? 0})` : label,
        media,
      };
    },
  },
});
