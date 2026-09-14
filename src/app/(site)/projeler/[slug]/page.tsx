import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import ConstructionTimeline from "@/components/ConstructionTimeline";
import SanityImg from "@/components/SanityImg";
import { sanityFetch } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";
import { getSiteSettings } from "@/sanity/settings";
import type { ProjectDetail } from "@/sanity/types";
import { whatsappHref } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

async function getProject(slug: string) {
  return sanityFetch<ProjectDetail | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    null,
  );
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(PROJECT_SLUGS_QUERY, {}, []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Proje bulunamadı" };
  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

const STATUS_LABEL: Record<ProjectDetail["status"], string> = {
  planned: "Planlanan Proje",
  ongoing: "Devam Eden Proje",
  completed: "Tamamlanan Proje",
};

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  const statusLabel =
    project.status === "ongoing"
      ? `${STATUS_LABEL.ongoing} (%${project.completionPercentage ?? 0})`
      : STATUS_LABEL[project.status];

  return (
    <main className="pt-24">
      {/*
        Kapak görseli dikey de yatay da olabilir. object-contain ile görselin
        tamamı gösterilir; arkasındaki bulanıklaştırılmış kopya boşlukları
        doldurur, böylece hiçbir oranda kırpma veya boş kenar oluşmaz.
      */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0" aria-hidden>
          <SanityImg
            image={project.mainImage}
            alt=""
            sizes="100vw"
            width={1200}
            className="object-cover blur-3xl scale-125 opacity-30"
          />
          <div className="absolute inset-0 bg-ground/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-1 lg:order-2 h-[45vh] min-h-[320px] lg:h-[62vh] lg:max-h-[680px]">
            <SanityImg
              image={project.mainImage}
              alt={project.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              width={1600}
              className="object-contain drop-shadow-2xl"
            />
          </div>

          <div className="order-2 lg:order-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-bronze text-bronze-ink font-bold text-xs uppercase tracking-wider">
                {statusLabel}
              </span>
              {project.adaParsel && (
                <span className="px-3 py-1 rounded-md bg-surface/80 text-fg-muted border border-line text-xs font-mono">
                  {project.adaParsel}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-fg-muted text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-fg-dim shrink-0" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-fg-dim shrink-0" />
                <span>Teslim: {project.deliveryDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg border-l-2 border-bronze pl-3">
              Proje Hakkında
            </h2>
            <p className="text-fg-muted leading-relaxed text-sm md:text-base whitespace-pre-line">
              {project.description}
            </p>
          </section>

          {project.gallery?.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-line">
              <h2 className="text-xl font-bold text-fg">Görsel Galerisi</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/3 rounded-lg overflow-hidden border border-line"
                  >
                    <SanityImg
                      image={image}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      width={900}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.updates?.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-line">
              <div>
                <h2 className="text-xl font-bold text-fg">
                  Şantiye İlerleme Günlüğü
                </h2>
                <p className="text-xs text-fg-muted mt-1">
                  Şantiyedeki en güncel imalat ve ilerleme aşamaları
                </p>
              </div>
              <ConstructionTimeline updates={project.updates} />
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface p-6 rounded-xl border border-line space-y-6 sticky top-28">
            {project.features?.length > 0 && (
              <>
                <h2 className="text-lg font-bold text-fg border-b border-line pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-bronze shrink-0" />
                  <span>Teknik Şartname &amp; Standartlar</span>
                </h2>
                <ul className="space-y-3 text-sm text-fg-muted">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {settings.whatsapp && (
              <div className="pt-4 border-t border-line">
                <a
                  href={`${whatsappHref(settings.whatsapp)}?text=${encodeURIComponent(
                    `Merhaba, ${project.title} projeniz hakkında bilgi almak istiyorum.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-bronze hover:bg-bronze-strong text-bronze-ink font-semibold py-3 rounded-lg text-xs transition-colors shadow-lg shadow-bronze-dark/20"
                >
                  <span>Proje Hakkında Bilgi Alın</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
