"use client";

import { useState } from "react";
import AppSidebar from "@/components/dashboard/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectGrid from "@/components/dashboard/ProjectGrid";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";
import ProjectInfoModal from "@/components/projects/ProjectInfoModal";
import ShareProjectModal from "@/components/projects/ShareProjectModal";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [shareProject, setShareProject] = useState<Project | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <ProjectGrid
          projects={MOCK_PROJECTS}
          productionCount={12}
          onDeleteProjectClick={() => setIsDeleteModalOpen(true)}
          onEditProjectClick={() => setIsInfoModalOpen(true)}
          onNewProjectClick={() => setIsInfoModalOpen(true)}
          onShareProjectClick={(project) => setShareProject(project)}
        />
      </main>
      <button
        onClick={() => setIsInfoModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-[28px]">movie</span>
      </button>
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
      <ProjectInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
      <ShareProjectModal
        isOpen={!!shareProject}
        onClose={() => setShareProject(null)}
        project={shareProject}
      />
    </div>
  );
}
