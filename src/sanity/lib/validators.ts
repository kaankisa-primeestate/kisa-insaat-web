import type { ValidationContext } from "sanity";
import { apiVersion } from "../env";

/**
 * Görsel kalite eşikleri. Bu değerlerin altındaki görseller panelde reddedilir,
 * böylece siteye düşük çözünürlüklü görsel girmesi engellenir.
 *
 * Ölçüler uzun/kısa kenar üzerinden tanımlanır; mimari render'lar genellikle
 * dikey, şantiye fotoğrafları yatay olduğu için ikisi de kabul edilmelidir.
 */
export const IMAGE_RULES = {
  /** Kapak ve hero görselleri. */
  hero: { minLongEdge: 1600, minShortEdge: 1000 },
  /** Kart ve galeri görselleri. */
  card: { minLongEdge: 1200, minShortEdge: 800 },
  /** Kat planı: oran kontrolü uygulanmaz. */
  plan: { minLongEdge: 1000, minShortEdge: 700 },
} as const;

/** 12 MB üstü kaynak dosyalar depolama kotasını hızla tüketir. */
export const MAX_FILE_SIZE_MB = 12;

/**
 * Kabul edilen en/boy oranı aralığı. Dikey render'lar (yaklaşık 0.70) ve yatay
 * fotoğraflar (yaklaşık 1.50) bu aralığa girer; yalnızca panorama şeritleri ve
 * aşırı ince dikey kırpmalar dışarıda kalır.
 */
const MIN_ASPECT_RATIO = 0.45;
const MAX_ASPECT_RATIO = 2.6;

type ImageValue = { asset?: { _ref?: string } };

type AssetMeta = {
  size: number;
  metadata: { dimensions: { width: number; height: number } };
};

function formatMb(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(1);
}

/**
 * Yüklenen görselin çözünürlüğünü, dosya boyutunu ve en/boy oranını doğrular.
 * Hata döndüğünde kayıt engellenir.
 */
export function imageQuality(
  { minLongEdge, minShortEdge }: { minLongEdge: number; minShortEdge: number },
  { checkAspectRatio = true }: { checkAspectRatio?: boolean } = {},
) {
  return async (
    value: unknown,
    context: ValidationContext,
  ): Promise<true | string> => {
    const ref = (value as ImageValue | undefined)?.asset?._ref;
    if (!ref) return true;

    const client = context.getClient({ apiVersion });
    const asset = await client.fetch<AssetMeta | null>(
      `*[_id == $id][0]{ size, metadata { dimensions { width, height } } }`,
      { id: ref },
    );
    if (!asset?.metadata?.dimensions) return true;

    const { width, height } = asset.metadata.dimensions;
    const longEdge = Math.max(width, height);
    const shortEdge = Math.min(width, height);

    if (longEdge < minLongEdge || shortEdge < minShortEdge) {
      return `Görsel çözünürlüğü yetersiz: ${width}×${height} piksel. Uzun kenar en az ${minLongEdge}, kısa kenar en az ${minShortEdge} piksel olmalı. Dikey veya yatay olması fark etmez.`;
    }

    if (asset.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Dosya çok büyük: ${formatMb(asset.size)} MB. En fazla ${MAX_FILE_SIZE_MB} MB olmalı.`;
    }

    if (checkAspectRatio) {
      const ratio = width / height;
      if (ratio < MIN_ASPECT_RATIO || ratio > MAX_ASPECT_RATIO) {
        return `Görsel oranı (${ratio.toFixed(2)}) tasarım için fazla uç. Panorama şeridi veya çok ince dikey kırpma yerine normal bir kadraj kullanın.`;
      }
    }

    return true;
  };
}

/** Şantiye güncellemesi gibi alanlarda ileri tarih girilmesini engeller. */
export function notInFuture(value: unknown): true | string {
  if (typeof value !== "string" || value.length === 0) return true;
  const entered = new Date(value);
  if (Number.isNaN(entered.getTime())) return true;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return entered > today
    ? "Gelecek bir tarih girilemez. Yalnızca gerçekleşmiş güncellemeler eklenir."
    : true;
}
