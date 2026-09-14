import { sanityFetch } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";
import type { SiteSettings } from "./types";

/**
 * Site Ayarları kaydı henüz yayınlanmamışsa kullanılan güvenli varsayılanlar.
 * Site böylece hiçbir koşulda boş telefon veya kırık bağlantı göstermez.
 */
const FALLBACK: SiteSettings = {
  companyName: "Kısa İnşaat",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  mapEmbedUrl: "",
  workingHours: "",
  metaTitle: "Kısa İnşaat",
  metaDescription:
    "Türkiye genelinde konut ve ticari yapı projeleri üreten inşaat firması.",
  kvkkText: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
    {},
    null,
  );
  return { ...FALLBACK, ...(settings ?? {}) };
}
