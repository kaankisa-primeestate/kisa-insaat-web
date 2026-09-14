import { defineArrayMember, defineField } from "sanity";
import { IMAGE_RULES, imageQuality } from "./validators";

type Preset = keyof typeof IMAGE_RULES;

const ALT_DESCRIPTION =
  "Gorselde ne oldugunu kisaca yazin. Google aramalarinda ve ekran okuyucularda kullanilir.";

/**
 * Tekil gorsel alani. Hotspot acik oldugu icin odak noktasi panelden isaretlenir
 * ve kirpma her ekran boyutunda otomatik dogru yapilir.
 */
export function imageField(
  name: string,
  title: string,
  preset: Preset,
  { required = false, description = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Gorsel Aciklamasi (Alt Metin)",
        type: "string",
        description: ALT_DESCRIPTION,
        validation: (Rule) => Rule.required().min(5).max(120),
      }),
    ],
    validation: (Rule) => {
      const check = Rule.custom(
        imageQuality(rules, { checkAspectRatio: preset !== "plan" }),
      );
      return required ? check.required() : check;
    },
  });
}

/**
 * Gorsel galerisi alani. Alt ve ust adet siniri, sayfanin bos kalmasini da
 * asiri sismesini de engeller.
 */
export function galleryField(
  name: string,
  title: string,
  preset: Preset,
  { min = 0, max = 20, description = "" } = {},
) {
  const rules = IMAGE_RULES[preset];
  return defineField({
    name,
    title,
    type: "array",
    description: description || `En az ${min}, en fazla ${max} gorsel.`,
    options: { layout: "grid" },
    of: [
      defineArrayMember({
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Gorsel Aciklamasi (Alt Metin)",
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
      const check = Rule.max(max).error(`En fazla ${max} gorsel eklenebilir.`);
      return min > 0
        ? check.min(min).error(`En az ${min} gorsel eklemelisiniz.`)
        : check;
    },
  });
}
