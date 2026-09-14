import { defineField, defineType } from "sanity";
import { galleryField } from "../lib/fields";
import { notInFuture } from "../lib/validators";

export default defineType({
  name: "constructionUpdate",
  title: "Santiye Guncellemeleri",
  type: "document",
  fields: [
    defineField({
      name: "project",
      title: "Iliskili Proje",
      type: "reference",
      to: [{ type: "project" }],
      description: "Bu guncellemenin ait oldugu proje. Zorunlu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updateDate",
      title: "Guncelleme Tarihi",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description: "Santiyede bu asamanin gerceklestigi tarih. Ileri tarih girilemez.",
      validation: (Rule) => Rule.required().custom(notInFuture),
    }),
    defineField({
      name: "title",
      title: "Guncelleme Basligi",
      type: "string",
      description: 'Ornek: "Betonarme Karkas Tamamlandi". 10-80 karakter.',
      validation: (Rule) => Rule.required().min(10).max(80),
    }),
    defineField({
      name: "description",
      title: "Aciklama",
      type: "text",
      rows: 4,
      description: "40-400 karakter. Bu asamada ne yapildigini anlatin.",
      validation: (Rule) => Rule.required().min(40).max(400),
    }),
    galleryField("photos", "Santiye Fotograflari", "card", {
      min: 1,
      max: 12,
      description: "En az 1, en fazla 12 fotograf. Zaman tunelinde kucuk kartlar halinde gosterilir.",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Ana Sayfada Goster",
      type: "boolean",
      initialValue: false,
      description: "Ana sayfadaki son gelismeler bolumunde gosterilir.",
    }),
  ],
  orderings: [
    {
      title: "Tarihe gore (yeniden eskiye)",
      name: "dateDesc",
      by: [{ field: "updateDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "updateDate",
      media: "photos.0",
      projectTitle: "project.title",
    },
    prepare({ title, date, media, projectTitle }) {
      return {
        title,
        subtitle: [projectTitle, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
