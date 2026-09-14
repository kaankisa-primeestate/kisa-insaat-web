"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Sanity Studio yalnizca tarayicida calisir; `sanity` paketi sunucu tarafinda
 * degerlendirilemez. Bu nedenle yapilandirma bu istemci bileseni icinde
 * import edilir ve sunucu bilesenine hic tasinmaz.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
