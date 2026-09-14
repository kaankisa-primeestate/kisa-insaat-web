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
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md">
        <Clock className="w-3.5 h-3.5" />
        Devam Ediyor (%{completion ?? 0})
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 text-amber-400 border border-amber-500/30 text-xs font-bold backdrop-blur-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Tamamlandı
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 text-sky-300 border border-sky-400/30 text-xs font-bold backdrop-blur-md">
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
          <div className="inline-flex flex-wrap justify-center bg-slate-900 p-1.5 rounded-lg border border-slate-800 gap-1">
            {availableFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                  filter === item.value
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-center text-sm text-slate-400 py-16">
          Bu kategoride henüz proje bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project) => (
            <Link
              key={project._id}
              href={`/projeler/${project.slug}`}
              className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-600/50 transition-all flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
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
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 gap-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">
                      Teslim: {project.deliveryDate}
                    </span>
                  </div>
                  {project.adaParsel && (
                    <span className="font-mono text-[11px] text-slate-500 shrink-0">
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
