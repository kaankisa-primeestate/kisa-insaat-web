import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import EmptyState from "@/components/EmptyState";
import { sanityFetch } from "@/sanity/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries";
import type { ProjectStatus, ProjectSummary } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description:
    "Kısa İnşaat'ın Türkiye genelinde hayata geçirdiği devam eden, tamamlanan ve planlanan yapı projeleri.",
};

/** Footer'daki hızlı bağlantılar bu değerlerle gelir. */
const FILTER_BY_PARAM: Record<string, ProjectStatus> = {
  devam: "ongoing",
  tamamlanan: "completed",
  planlanan: "planned",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string }>;
}) {
  const [{ durum }, projects] = await Promise.all([
    searchParams,
    sanityFetch<ProjectSummary[]>(ALL_PROJECTS_QUERY, {}, []),
  ]);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="text-bronze text-xs font-bold uppercase tracking-widest">
          Mimari Portföyümüz
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-fg">
          Projelerimiz
        </h1>
        <p className="text-fg-muted text-base leading-relaxed">
          Türkiye genelinde hayata geçirdiğimiz konut, ticari yapı ve kentsel
          dönüşüm projelerimiz.
        </p>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="Projeler yakında yayınlanacak"
          description="Proje portföyümüz şu anda güncelleniyor. Devam eden ve tamamlanan çalışmalarımız hakkında bilgi almak için bizimle iletişime geçebilirsiniz."
        />
      ) : (
        <ProjectsGrid
          projects={projects}
          initialFilter={durum ? (FILTER_BY_PARAM[durum] ?? "all") : "all"}
        />
      )}
    </main>
  );
}
