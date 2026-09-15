import { defineField, defineType } from "sanity";
import { galleryField, imageField } from "../lib/fields";

/** İlanın ne için yayınlandığı. Durumdan bağımsızdır. */
export const LISTING_TYPES = [
  { title: "Satılık", value: "sale" },
  { title: "Kiralık", value: "rent" },
  { title: "Satılık veya Kiralık", value: "both" },
] as const;

/** İlanın güncel durumu. Etiketi ilan tipine göre sitede uyarlanır. */
export const PROPERTY_STATUSES = [
  { title: "Müsait", value: "available" },
  { title: "Opsiyonlu / Rezerve", value: "reserved" },
  { title: "İşlem Tamamlandı", value: "closed" },
] as const;

export const ROOM_COUNTS = [
  "1+0",
  "1+1",
  "2+1",
  "3+1",
  "4+1",
  "4+1 Dubleks",
  "5+1 Dubleks",
  "Ticari / Dükkan",
  "Ofis",
] as const;

/** Satış fiyatı alanı yalnızca satılık ve "satılık veya kiralık" ilanlarda görünür. */
const showsSalePrice = (type?: string) => type === "sale" || type === "both";
const showsRentPrice = (type?: string) => type === "rent" || type === "both";

export default defineType({
  name: "property",
  title: "Satılık & Kiralık Gayrimenkuller",
  type: "document",
  groups: [
    { name: "genel", title: "Genel Bilgiler", default: true },
    { name: "olcu", title: "Ölçüler & Fiyat" },
    { name: "gorseller", title: "Görseller" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Gayrimenkul Başlığı",
      type: "string",
      group: "genel",
      description: 'Örnek: "Polenium Rezidans Kat: 4, Daire: 12". 5-70 karakter.',
      validation: (Rule) => Rule.required().min(5).max(70),
    }),
    defineField({
      name: "slug",
      title: "URL Bağlantısı",
      type: "slug",
      group: "genel",
      description:
        "İlan başlığından otomatik üretilir. Boş bırakılabilir; o durumda sistem kendi kimliğini kullanır. Yayına alındıktan sonra değiştirmeyin, eski bağlantılar kırılır.",
      options: { source: "title", maxLength: 70 },
    }),
    defineField({
      name: "project",
      title: "İlişkili Proje",
      type: "reference",
      group: "genel",
      to: [{ type: "project" }],
      description: "Bu gayrimenkulün ait olduğu proje. Zorunlu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listingType",
      title: "İlan Tipi",
      type: "string",
      group: "genel",
      initialValue: "sale",
      description:
        "Satılık mı, kiralık mı, yoksa ikisi birden mi? Fiyat alanları bu seçime göre açılır.",
      options: { list: [...LISTING_TYPES], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      group: "genel",
      initialValue: "available",
      description:
        'Sitede gösterilen etiket ilan tipine göre uyarlanır: satılık bir ilanda "Satıldı", kiralık bir ilanda "Kiralandı" yazar.',
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
      description: 'Örnek: "4. Kat", "Çatı Katı", "Zemin"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "featured",
      title: "Ana Sayfada Öne Çıkar",
      type: "boolean",
      group: "genel",
      initialValue: false,
      description: "Ana sayfadaki öne çıkan ilanlar bölümünde gösterilir.",
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 5,
      group: "genel",
      description: "40-500 karakter. Öne çıkan özellikleri ve konumu anlatın.",
      validation: (Rule) => Rule.required().min(40).max(500),
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
      name: "salePrice",
      title: "Satış Fiyatı",
      type: "string",
      group: "olcu",
      initialValue: "Fiyat İçin İletişime Geçin",
      description:
        'Rakam yazacaksanız para birimiyle birlikte yazın. Fiyat vermek istemiyorsanız "Fiyat İçin İletişime Geçin" kalsın.',
      hidden: ({ document }) =>
        !showsSalePrice(document?.listingType as string | undefined),
      validation: (Rule) =>
        Rule.max(60).custom((value, context) => {
          const type = (context.document as { listingType?: string } | undefined)
            ?.listingType;
          if (!showsSalePrice(type)) return true;
          return value ? true : "Satılık ilanlarda satış fiyatı alanı zorunludur.";
        }),
    }),
    defineField({
      name: "rentPrice",
      title: "Aylık Kira Bedeli",
      type: "string",
      group: "olcu",
      initialValue: "Fiyat İçin İletişime Geçin",
      description: 'Aylık tutarı para birimiyle yazın. Örnek: "45.000 TL / ay"',
      hidden: ({ document }) =>
        !showsRentPrice(document?.listingType as string | undefined),
      validation: (Rule) =>
        Rule.max(60).custom((value, context) => {
          const type = (context.document as { listingType?: string } | undefined)
            ?.listingType;
          if (!showsRentPrice(type)) return true;
          return value ? true : "Kiralık ilanlarda kira bedeli alanı zorunludur.";
        }),
    }),
    defineField({
      name: "dues",
      title: "Aidat",
      type: "string",
      group: "olcu",
      description:
        'Opsiyonel. Örnek: "2.500 TL / ay". Kiralık ilanlarda en sık sorulan bilgidir.',
      validation: (Rule) => Rule.max(40),
    }),

    galleryField("images", "Gayrimenkul Görselleri", "card", {
      group: "gorseller",
      shape: "Kart görseli yataydır; 3:2 kadraj en iyi oturur.",
      max: 20,
      description:
        "En fazla 20 görsel. İlk görsel kartta kapak olarak kullanılır. Boş bırakılırsa yer tutucu gösterilir; ilan yine de yayınlanır.",
    }),
    imageField("floorPlan", "Kat Planı", "plan", {
      group: "gorseller",
      shape: "Her oran kabul edilir; dikey de kare de olabilir.",
      description:
        "Opsiyonel. Dikey veya kare olabilir, oran kontrolü uygulanmaz.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      listingType: "listingType",
      status: "status",
      room: "roomCount",
      gross: "grossArea",
      media: "images.0",
      projectTitle: "project.title",
    },
    prepare({ title, listingType, status, room, gross, media, projectTitle }) {
      const typeLabel =
        LISTING_TYPES.find((t) => t.value === listingType)?.title ?? "";
      const statusLabel =
        PROPERTY_STATUSES.find((s) => s.value === status)?.title ?? "";
      const parts = [
        projectTitle,
        room,
        gross ? `${gross} m2` : null,
        typeLabel,
        statusLabel,
      ];
      return { title, subtitle: parts.filter(Boolean).join(" · "), media };
    },
  },
});
