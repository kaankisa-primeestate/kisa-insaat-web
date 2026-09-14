"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, CheckCircle2, Clock, MapPin, Ruler } from "lucide-react";
import SanityImg from "./SanityImg";
import type { ProjectStatus, ProjectSummary } from "@/sanity/types";

type Filter = "all" | ProjectStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tüm Projeler" },
  { value: "ongoing", label: "Devam Edenler" },
  { value: "completed", label: "Tamamlananlar" },
  { value: "planned", label: "Planlananlar" },
];

function StatusBadge({
  status,
  completion,
}: {
  status: ProjectStatus;
  completion?: number;
}) {
  if (status === "ongoing") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-wa text-fg text-xs font-bold backdrop-blur-md">
        <Clock className="w-3.5 h-3.5" />
        Devam Ediyor (%{completion ?? 0})
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2/90 text-bronze-light border border-bronze/30 text-xs font-bold backdrop-blur-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Tamamlandı
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2/90 text-planned border border-planned/30 text-xs font-bold backdrop-blur-md">
      <Ruler className="w-3.5 h-3.5" />
      Planlanan
    </span>
  );
}

export default function ProjectsGrid({
  projects,
  initialFilter = "all",
}: {
  projects: ProjectSummary[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  /** Hiç projesi olmayan durumlar için sekme gösterilmez. */
  const availableFilters = FILTERS.filter(
    (f) => f.value === "all" || projects.some((p) => p.status === f.value),
  );

  return (
    <>
      {availableFilters.length > 2 && (
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center bg-surface p-1.5 rounded-lg border border-line gap-1">
            {availableFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                  filter === item.value
                    ? "bg-bronze text-bronze-ink shadow-lg shadow-bronze-dark/20"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-center text-sm text-fg-muted py-16">
          Bu kategoride henüz proje bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project) => (
            <Link
              key={project._id}
              href={`/projeler/${project.slug}`}
              className="bg-surface rounded-xl overflow-hidden border border-line hover:border-bronze/50 transition-all flex flex-col group"
            >
              {/* Mimari render'lar dikeydir; kart görseli 4:5 oranında tutulur. */}
              <div className="relative aspect-4/5 overflow-hidden">
                <SanityImg
                  image={project.mainImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <StatusBadge
                    status={project.status}
                    completion={project.completionPercentage}
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col grow justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-fg-muted text-xs">
                    <MapPin className="w-3.5 h-3.5 text-fg-dim shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-fg group-hover:text-bronze-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-fg-muted gap-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-fg-dim shrink-0" />
                    <span className="truncate">
                      Teslim: {project.deliveryDate}
                    </span>
                  </div>
                  {project.adaParsel && (
                    <span className="font-mono text-[11px] text-fg-dim shrink-0">
                      {project.adaParsel}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
