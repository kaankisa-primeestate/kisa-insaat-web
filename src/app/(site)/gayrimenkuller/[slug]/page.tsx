import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MessageCircle, Phone } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import SanityImg from "@/components/SanityImg";
import { sanityFetch } from "@/sanity/client";
import { PROPERTY_BY_SLUG_QUERY, PROPERTY_SLUGS_QUERY } from "@/sanity/queries";
import { getSiteSettings } from "@/sanity/settings";
import type { ListingType, PropertyDetail, PropertyStatus } from "@/sanity/types";
import { formatPhone, telHref, whatsappHref } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

async function getProperty(slug: string) {
  return sanityFetch<PropertyDetail | null>(
    PROPERTY_BY_SLUG_QUERY,
    { slug },
    null,
  );
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(PROPERTY_SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "İlan bulunamadı" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
  };
}

/** Rozet metni ilan tipi ile durumun birleşiminden üretilir. */
function statusLabel(listingType: ListingType, status: PropertyStatus) {
  if (status === "reserved") return "Opsiyonlu / Rezerve";
  if (status === "closed")
    return listingType === "rent"
      ? "Kiralandı"
      : listingType === "sale"
        ? "Satıldı"
        : "İşlem Tamamlandı";
  return listingType === "rent"
    ? "Kiralık"
    : listingType === "sale"
      ? "Satılık"
      : "Satılık / Kiralık";
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="text-[10px] uppercase tracking-widest text-fg-dim">
        {label}
      </dt>
      <dd className="text-base font-semibold text-fg mt-0.5">{value}</dd>
    </div>
  );
}

export default async function PropertyDetailPage({ params }: Params) {
  const { slug } = await params;
  const [property, settings] = await Promise.all([
    getProperty(slug),
    getSiteSettings(),
  ]);

  if (!property) notFound();

  const badge = statusLabel(property.listingType, property.status);
  const showSale = property.listingType !== "rent" && property.salePrice;
  const showRent = property.listingType !== "sale" && property.rentPrice;
  const [cover, ...rest] = property.images ?? [];

  const message = encodeURIComponent(
    `Merhaba, ${property.title} ilanı hakkında bilgi almak istiyorum.`,
  );

  return (
    <main className="pt-28 pb-24 max-w-7xl mx-auto px-6 w-full">
      <Link
        href="/gayrimenkuller"
        className="inline-flex items-center gap-2 text-xs font-semibold text-fg-muted hover:text-bronze transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tüm ilanlara dön</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Sol sütun: görseller ve açıklama */}
        <div className="lg:col-span-7 space-y-10">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-line">
            <SanityImg
              image={cover}
              alt={property.title}
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              width={1600}
            />
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-ground/85 backdrop-blur-sm border border-line text-xs font-bold text-fg">
              {badge}
            </span>
          </div>

          {rest.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-fg">
                Diğer Görseller
                <span className="ml-2 text-xs font-normal text-fg-dim tabular-nums">
                  {rest.length} adet
                </span>
              </h2>
              <ImageGallery images={rest} alt={property.title} />
            </section>
          )}

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-fg border-l-2 border-bronze pl-3">
              Açıklama
            </h2>
            <p className="text-base text-fg-muted leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </section>

          {property.floorPlan && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-fg border-l-2 border-bronze pl-3">
                Kat Planı
              </h2>
              <ImageGallery
                images={[property.floorPlan]}
                alt={`${property.title} kat planı`}
                columns="grid-cols-1 max-w-md"
              />
            </section>
          )}
        </div>

        {/* Sağ sütun: künye ve iletişim */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div>
              {property.projectTitle && (
                <Link
                  href={
                    property.projectSlug
                      ? `/projeler/${property.projectSlug}`
                      : "/projeler"
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-bronze hover:text-bronze-light transition-colors mb-3"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{property.projectTitle}</span>
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
                {property.title}
              </h1>
              {property.projectLocation && (
                <p className="text-sm text-fg-muted mt-2">
                  {property.projectLocation}
                </p>
              )}
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Fact label="Oda Sayısı" value={property.roomCount} />
              <Fact label="Bulunduğu Kat" value={property.floor} />
              <Fact label="Brüt Alan" value={`${property.grossArea} m²`} />
              <Fact label="Net Alan" value={`${property.netArea} m²`} />
              {showSale && (
                <Fact label="Satış Fiyatı" value={property.salePrice!} />
              )}
              {showRent && (
                <Fact label="Aylık Kira" value={property.rentPrice!} />
              )}
              {property.dues && <Fact label="Aidat" value={property.dues} />}
            </dl>

            {property.status !== "closed" && (
              <div className="bg-surface border border-line rounded-xl p-6 space-y-3">
                <p className="text-sm text-fg-muted leading-relaxed">
                  Bu ilan hakkında detaylı bilgi almak veya yerinde görmek için
                  bize ulaşın.
                </p>
                {settings.whatsapp && (
                  <a
                    href={`${whatsappHref(settings.whatsapp)}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-fg font-semibold py-3.5 rounded-lg text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp ile Bilgi Al</span>
                  </a>
                )}
                {settings.phone && (
                  <a
                    href={telHref(settings.phone)}
                    className="w-full flex items-center justify-center gap-2 border border-line-strong hover:border-bronze text-fg font-semibold py-3.5 rounded-lg text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-fg-muted" />
                    <span>{formatPhone(settings.phone)}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
