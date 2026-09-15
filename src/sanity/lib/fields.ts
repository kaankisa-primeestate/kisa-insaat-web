import { defineArrayMember, defineField } from "sanity";
import { IMAGE_RULES, MAX_FILE_SIZE_MB, imageQuality } from "./validators";

type Preset = keyof typeof IMAGE_RULES;

const ALT_DESCRIPTION =
  "Görselde ne olduğunu kısaca yazın. Google aramalarında ve ekran okuyucularda kullanılır.";

/**
 * Kaynak dosya için önerilen uzun kenar. Site Sanity'den en fazla 1800 piksel
 * genişlik ister; 2400 piksel yüksek yoğunluklu ekranlarda pay bırakır. Daha
 * büyüğü yalnızca depolama harcar, görünen kalite artmaz.
 */
const RECOMMENDED_LONG_EDGE = 2400;

/**
 * Alan açıklamasının altına eklenen yükleme yönergesi. Metin doğrudan
 * doğrulama kurallarından üretilir; eşik değiştiğinde panel yazısı da
 * kendiliğinden güncellenir, ikisi ayrışamaz.
 */
function uploadHint(preset: Preset, shape?: string): string {
  const { minLongEdge, minShortEdge } = IMAGE_RULES[preset];
  const format =
    preset === "plan" ? "PNG (çizgi ve yazılar keskin kalır)" : "JPEG";

  return [
    `Önerilen: uzun kenar ${RECOMMENDED_LONG_EDGE} piksel, ${format}.`,
    shape,
    `Alt sınır: uzun kenar ${minLongEdge}, kısa kenar ${minShortEdge} piksel. Altındaki dosyalar kabul edilmez.`,
    `Tek dosya en fazla ${MAX_FILE_SIZE_MB} MB.`,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Tekil görsel alanı. Hotspot açık olduğu için odak noktası panelden
 * işaretlenir ve kırpma her ekran boyutunda otomatik doğru yapılır.
 */
export function imageField(
  name: string,
  title: string,
  preset: Preset,
  { required = false, description = "", group = "", shape = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "image",
    description: [description, uploadHint(preset, shape)]
      .filter(Boolean)
      .join(" "),
    ...(group ? { group } : {}),
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Görsel Açıklaması (Alt Metin)",
        type: "string",
        description: ALT_DESCRIPTION,
        validation: (Rule) => Rule.required().min(5).max(120),
      }),
    ],
    validation: (Rule) => {
      const base = required ? Rule.required() : Rule;
      return base.custom(
        imageQuality(rules, { checkAspectRatio: preset !== "plan" }),
      );
    },
  });
}

/**
 * Görsel galerisi alanı. Alt ve üst adet sınırı, sayfanın boş kalmasını da
 * aşırı şişmesini de engeller.
 */
export function galleryField(
  name: string,
  title: string,
  preset: Preset,
  { min = 0, max = 20, description = "", group = "", shape = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "array",
    description: [description || `En fazla ${max} görsel.`, uploadHint(preset, shape)]
      .filter(Boolean)
      .join(" "),
    ...(group ? { group } : {}),
    options: { layout: "grid" },
    of: [
      defineArrayMember({
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Görsel Açıklaması (Alt Metin)",
            type: "string",
            description: ALT_DESCRIPTION,
            validation: (Rule) => Rule.required().min(5).max(120),
          }),
        ],
        validation: (Rule) =>
          Rule.custom(imageQuality(rules, { checkAspectRatio: false })),
      }),
    ],
    validation: (Rule) => {
      const check = Rule.max(max).error(`En fazla ${max} görsel eklenebilir.`);
      return min > 0
        ? check.min(min).error(`En az ${min} görsel eklemelisiniz.`)
        : check;
    },
  });
}
