import { defineArrayMember, defineField } from "sanity";
import { IMAGE_RULES, imageQuality } from "./validators";

type Preset = keyof typeof IMAGE_RULES;

const ALT_DESCRIPTION =
  "Görselde ne olduğunu kısaca yazın. Google aramalarında ve ekran okuyucularda kullanılır.";

/**
 * Tekil görsel alanı. Hotspot açık olduğu için odak noktası panelden
 * işaretlenir ve kırpma her ekran boyutunda otomatik doğru yapılır.
 */
export function imageField(
  name: string,
  title: string,
  preset: Preset,
  { required = false, description = "", group = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "image",
    description,
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
  { min = 0, max = 20, description = "", group = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "array",
    description: description || `En az ${min}, en fazla ${max} görsel.`,
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
