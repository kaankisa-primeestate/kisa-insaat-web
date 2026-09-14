import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Icerik cekmenin guvenli yolu. Sanity erisilemezse veya sorgu hata verirse
 * site cokmek yerine verilen yedek degeri kullanir; ziyaretci bos bir bolum
 * gorur, hata sayfasi gormez.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity sorgusu basarisiz:", error);
    return fallback;
  }
}
