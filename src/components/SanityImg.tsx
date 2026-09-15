import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

type Props = {
  /** Panelden gelen görsel. Eksik olabilir; bu durumda yer tutucu çizilir. */
  image?: SanityImage | null;
  /** Boş bırakılırsa panelde girilen alt metin kullanılır. */
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Kaynak görselin istenecek genişliği. Yükseklik orana göre hesaplanır. */
  width?: number;
};

/** Görselin gerçekten yüklenmiş bir dosyaya işaret edip etmediğini denetler. */
function hasAsset(image?: SanityImage | null): image is SanityImage {
  if (!image || typeof image !== "object") return false;
  const asset = (image as { asset?: { _ref?: string } }).asset;
  return Boolean(asset?._ref);
}

/**
 * Görsel henüz yüklenmemişken gösterilen nötr yer tutucu. Sayfanın çökmesini
 * veya boş bir delik oluşmasını engeller.
 */
function Placeholder() {
  return (
    <div
      className="absolute inset-0 bg-surface flex items-center justify-center"
      aria-hidden
    >
      <Image
        src="/logo-mark-white.png"
        alt=""
        width={258}
        height={195}
        className="logo-adaptive w-1/3 max-w-[120px] h-auto opacity-10"
      />
    </div>
  );
}

/**
 * Sanity görselini next/image ile gösterir. Panelde işaretlenen odak noktası
 * (hotspot) dikkate alınarak kırpılır, bu yüzden hangi oranda kullanılırsa
 * kullanılsın önemli kısım kadrajda kalır.
 */
export default function SanityImg({
  image,
  alt,
  sizes,
  className = "object-cover",
  priority = false,
  width = 1600,
}: Props) {
  if (!hasAsset(image)) return <Placeholder />;

  return (
    <Image
      src={urlFor(image).width(width).url()}
      alt={alt ?? image.alt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
