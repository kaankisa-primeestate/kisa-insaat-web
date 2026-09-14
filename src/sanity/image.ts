import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Sanity gorselinden URL uretir. Hotspot bilgisini dikkate alir, boylece
 * kirpma her zaman panelde isaretlenen odak noktasina gore yapilir.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("crop");
}
