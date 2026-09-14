import { defineField, defineType } from "sanity";
import { galleryField } from "../lib/fields";
import { notInFuture } from "../lib/validators";

export default defineType({
  name: "constructionUpdate",
  title: "Şantiye Güncellemeleri",
  type: "document",
  fields: [
    defineField({
      name: "project",
      title: "İlişkili Proje",
      type: "reference",
      to: [{ type: "project" }],
      description: "Bu guncellemenin ait oldugu proje. Zorunlu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updateDate",
      title: "Güncelleme Tarihi",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      description: "Santiyede bu aşamanın gerceklestigi tarih. Ileri tarih girilemez.",
      validation: (Rule) => Rule.required().custom(notInFuture),
    }),
    defineField({
      name: "title",
      title: "Güncelleme Başlığı",
      type: "string",
      description: 'Örnek: "Betonarme Karkas Tamamlandı". 10-80 karakter.',
      validation: (Rule) => Rule.required().min(10).max(80),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
      description: "40-400 karakter. Bu aşamada ne yapıldığını anlatın.",
      validation: (Rule) => Rule.required().min(40).max(400),
    }),
    galleryField("photos", "Şantiye Fotoğrafları", "card", {
      min: 1,
      max: 12,
      description: "En az 1, en fazla 12 fotoğraf. Zaman tünelinde küçük kartlar halinde gösterilir.",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Ana Sayfada Göster",
      type: "boolean",
      initialValue: false,
      description: "Ana sayfadaki son gelismeler bölümünde gösterilir.",
    }),
  ],
  orderings: [
    {
      title: "Tarihe göre (yeniden eskiye)",
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
