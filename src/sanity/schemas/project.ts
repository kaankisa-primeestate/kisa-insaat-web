import { defineArrayMember, defineField, defineType } from "sanity";
import { galleryField, imageField } from "../lib/fields";

export const PROJECT_STATUSES = [
  { title: "Planlanan", value: "planned" },
  { title: "Devam Ediyor", value: "ongoing" },
  { title: "Tamamlandı", value: "completed" },
] as const;

export default defineType({
  name: "project",
  title: "Projeler",
  type: "document",
  groups: [
    { name: "genel", title: "Genel Bilgiler", default: true },
    { name: "gorseller", title: "Görseller" },
    { name: "detay", title: "Açıklama & Şartname" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Proje Adı",
      type: "string",
      group: "genel",
      description: "Kart ve sayfa basliginda görünür. 3-60 karakter.",
      validation: (Rule) => Rule.required().min(3).max(60),
    }),
    defineField({
      name: "slug",
      title: "URL Bağlantısı",
      type: "slug",
      group: "genel",
      description:
        "Proje adından otomatik üretilir. Yayina alindiktan sonra değiştirmeyin, eski bağlantılar kirilir.",
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
      title: "Tamamlanma Yüzdesi (%)",
      type: "number",
      group: "genel",
      description:
        "Sadece devam eden projeler için. Kartlarda ilerleme rozeti olarak gösterilir.",
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
              : "Devam eden projeler için tamamlanma yüzdesi zorunludur.";
          }),
    }),
    defineField({
      name: "location",
      title: "Lokasyon",
      type: "string",
      group: "genel",
      description: 'Örnek: "Bostanci, Kadikoy / Istanbul"',
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: "adaParsel",
      title: "Ada / Parsel",
      type: "string",
      group: "genel",
      description: 'Örnek: "901 Ada / 8 Parsel"',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "deliveryDate",
      title: "Teslim Tarihi",
      type: "string",
      group: "genel",
      description: 'Örnek: "Aralik 2026" veya tamamlanan projeler için "2024"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      group: "genel",
      description:
        "Küçük sayi once gösterilir. Boş bırakırsanız en yeni proje basa gelir.",
      initialValue: 0,
    }),

    imageField("mainImage", "Kapak Görseli", "hero", {
      group: "gorseller",
      description:
        "Proje kartında ve detay sayfasının üstünde kullanılır. Boş bırakılırsa yerine logodan üretilmiş nötr bir yer tutucu gösterilir; proje yine de yayınlanır.",
    }),
    galleryField("gallery", "Görsel Galerisi", "card", {
      group: "gorseller",
      max: 24,
      description:
        "Proje detay sayfasindaki galeri. En fazla 24 görsel. Sırası sürükleyerek değiştirilebilir.",
    }),

    defineField({
      name: "description",
      title: "Proje Açıklaması",
      type: "text",
      rows: 6,
      group: "detay",
      description: "80-600 karakter. Projenin konumunu ve one çıkan yanlarini anlatın.",
      validation: (Rule) => Rule.required().min(80).max(600),
    }),
    defineField({
      name: "features",
      title: "Teknik Özellikler & Şartname",
      type: "array",
      group: "detay",
      description:
        "Her madde tek satir olmalı. Örnek: \"C35/40 Yuksek Dayanimli Hazir Beton\". En fazla 14 madde.",
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
      title: "Sıralama (manuel)",
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
