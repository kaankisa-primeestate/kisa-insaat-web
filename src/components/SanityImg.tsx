import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

type Props = {
  image: SanityImage;
  /** Boş bırakılırsa panelde girilen alt metin kullanılır. */
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Kaynak görselin istenecek genişliği. Yükseklik orana göre hesaplanır. */
  width?: number;
};

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
  const source = urlFor(image).width(width).url();
  const altText = alt ?? image.alt ?? "";

  return (
    <Image
      src={source}
      alt={altText}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
