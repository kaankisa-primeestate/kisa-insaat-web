import type { ValidationContext } from "sanity";
import { apiVersion } from "../env";

/**
 * Gorsel kalite esikleri. Bu degerlerin altindaki gorseller panelde reddedilir,
 * boylece siteye dusuk cozunurluklu veya bozuk oranli gorsel girmesi engellenir.
 */
export const IMAGE_RULES = {
  /** Hero / kapak gorselleri: genis ekranda tam genislik kaplar. */
  hero: { minWidth: 1600, minHeight: 900 },
  /** Kart ve galeri gorselleri. */
  card: { minWidth: 1200, minHeight: 800 },
  /** Kat plani: dikey de olabilir, oran kontrolu uygulanmaz. */
  plan: { minWidth: 1000, minHeight: 1000 },
} as const;

/** 12 MB ustu kaynak dosyalar depolama kotasini hizla tuketir. */
const MAX_FILE_SIZE_MB = 12;

/** Kart ve hero alanlarinda kabul edilebilir en/boy orani araligi. */
const MIN_ASPECT_RATIO = 1.1;
const MAX_ASPECT_RATIO = 2.4;

type ImageValue = { asset?: { _ref?: string } };

type AssetMeta = {
  size: number;
  metadata: { dimensions: { width: number; height: number } };
};

function formatMb(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(1);
}

/**
 * Yuklenen gorselin cozunurlugunu, dosya boyutunu ve en/boy oranini dogrular.
 * Cozunurluk ve dosya boyutu hata (kayit engellenir); oran sapmasi uyaridir.
 */
export function imageQuality(
  { minWidth, minHeight }: { minWidth: number; minHeight: number },
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

    if (width < minWidth || height < minHeight) {
      return `Görsel çözünürlüğü yetersiz: ${width}x${height}px. En az ${minWidth}x${minHeight}px olmalı. Lutfen daha yuksek çözünürlüklü bir dosya yükleyin.`;
    }

    if (asset.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Dosya cok büyük: ${formatMb(asset.size)} MB. En fazla ${MAX_FILE_SIZE_MB} MB olmalı.`;
    }

    if (checkAspectRatio) {
      const ratio = width / height;
      if (ratio < MIN_ASPECT_RATIO || ratio > MAX_ASPECT_RATIO) {
        return `Görsel orani (${ratio.toFixed(2)}:1) tasarım için uygun değil. Yatay ve 3:2 ile 16:9 arasinda bir görsel tercih edin.`;
      }
    }

    return true;
  };
}

/** Santiye guncellemesi gibi alanlarda ileri tarih girilmesini engeller. */
export function notInFuture(value: unknown): true | string {
  if (typeof value !== "string" || value.length === 0) return true;
  const entered = new Date(value);
  if (Number.isNaN(entered.getTime())) return true;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return entered > today
    ? "Gelecek bir tarih girilemez. Sadece gerçekleşmiş guncellemeler eklenir."
    : true;
}
