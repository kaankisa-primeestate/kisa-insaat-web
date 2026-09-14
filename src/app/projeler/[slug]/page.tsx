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
      <div className="relative h-[60vh] min-h-[400px] flex items-end justify-start bg-slate-950">
        <SanityImg
          image={project.mainImage}
          alt={project.title}
          sizes="100vw"
          priority
          width={2000}
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 pb-12 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
              {statusLabel}
            </span>
            {project.adaParsel && (
              <span className="px-3 py-1 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 text-xs font-mono">
                {project.adaParsel}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Teslim: {project.deliveryDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-l-2 border-amber-500 pl-3">
              Proje Hakkında
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {project.description}
            </p>
          </section>

          {project.gallery?.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-slate-900">
              <h2 className="text-xl font-bold text-white">Görsel Galerisi</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-4/3 rounded-lg overflow-hidden border border-slate-800"
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
            <section className="space-y-6 pt-6 border-t border-slate-900">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Şantiye İlerleme Günlüğü
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Şantiyedeki en güncel imalat ve ilerleme aşamaları
                </p>
              </div>
              <ConstructionTimeline updates={project.updates} />
            </section>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 sticky top-28">
            {project.features?.length > 0 && (
              <>
                <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Teknik Şartname &amp; Standartlar</span>
                </h2>
                <ul className="space-y-3 text-xs text-slate-300">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {settings.whatsapp && (
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`${whatsappHref(settings.whatsapp)}?text=${encodeURIComponent(
                    `Merhaba, ${project.title} projeniz hakkında bilgi almak istiyorum.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg text-xs transition-colors shadow-lg shadow-amber-900/20"
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
