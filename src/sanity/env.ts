export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Sanity proje kimligi. Gizli bir bilgi degildir; tarayiciya giden pakette
 * zaten yer alir. Ortam degiskeni tanimlanirsa o oncelikli olur, boylece
 * ilerde ayri bir test projesine gecmek mumkun kalir.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bl8gogw0";

export const isSanityConfigured = projectId.length > 0;
