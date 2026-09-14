export type HeroImage = {
  /** public/hero/ altindaki dosya yolu. Ornek: "/hero/ebru-apartmani.jpg" */
  src: string;
  /** Gorselde ne oldugu. SEO ve ekran okuyucular icin zorunlu. */
  alt: string;
};

/**
 * Ana sayfadaki hero arka planinda donen fotograflar.
 *
 * Fotograflari public/hero/ klasorune koyup buraya ekleyin. Onerilen olcu:
 * en az 2400x1350 piksel, yatay, 16:9 civari. 1-5 fotograf ideal.
 *
 * Liste bos oldugu surece hero, logodaki kule simgesinden uretilmis
 * tasarimli bir arka plan gosterir; site kirik gorunmez.
 *
 * Yonetim paneli baglandiktan sonra bu liste Sanity'den beslenecek.
 */
export const heroImages: HeroImage[] = [];
