"use client";

import { useState } from "react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import NewProjectCard from "./NewProjectCard";

interface ProjectGridProps {
  projects: Project[];
  productionCount: number;
  onDeleteProjectClick: () => void;
  onEditProjectClick: () => void;
  onNewProjectClick: () => void;
  onShareProjectClick: (project: Project) => void;
}

export default function ProjectGrid({
  projects,
  productionCount,
  onDeleteProjectClick,
  onEditProjectClick,
  onNewProjectClick,
  onShareProjectClick,
}: ProjectGridProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const myProjects = projects.filter(p => p.isOwner !== false);
  const sharedProjects = projects.filter(p => p.isOwner === false);

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* My Projects Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-display text-on-surface">My Projects</h2>
            <p className="text-body-md text-on-surface-variant mt-1">
              Managing {myProjects.length} active productions
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md text-on-surface flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeMenuId === project.id}
              onToggleMenu={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
              onCloseMenu={() => setActiveMenuId(null)}
              onEditClick={() => {
                setActiveMenuId(null);
                onEditProjectClick();
              }}
              onDeleteClick={() => {
                setActiveMenuId(null);
                onDeleteProjectClick();
              }}
              onShareClick={() => {
                setActiveMenuId(null);
                onShareProjectClick(project);
              }}
            />
          ))}

          <NewProjectCard onClick={onNewProjectClick} />
        </div>
      </div>

      {/* Shared Projects Section */}
      {sharedProjects.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6 border-t border-outline-variant pt-8">
            <div>
              <h2 className="text-h2 text-on-surface">Shared with me</h2>
              <p className="text-body-md text-on-surface-variant mt-1">
                Projects you are collaborating on
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sharedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeMenuId === project.id}
                onToggleMenu={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                onCloseMenu={() => setActiveMenuId(null)}
                onShareClick={() => {
                  setActiveMenuId(null);
                  onShareProjectClick(project);
                }}
                /* STRICT SECURITY: Edit/Delete props are deliberately omitted here */
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
