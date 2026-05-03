"use client";

import AppSidebar from "@/components/dashboard/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export default function CrewSelectProjectPage() {
  const myProjects = MOCK_PROJECTS.filter(p => p.isOwner !== false);
  // Strict RBAC: Only show shared projects where user is a Manager
  const manageableProjects = MOCK_PROJECTS.filter(p => p.isOwner === false && p.currentUserRole === "Manager");

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} persistKey="sidebar-projects" />
      <main className="flex-1 overflow-auto flex flex-col">
        <DashboardHeader />
        <div className="p-8 max-w-[1280px] mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-display text-on-surface mb-2">Select a Project</h1>
            <p className="text-body-md text-on-surface-variant">Choose a project to manage its crew members and permissions.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-h2 text-on-surface mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  customHref={`/crew/${slugify(project.title)}`}
                />
              ))}
            </div>
          </div>

          {manageableProjects.length > 0 && (
            <div>
              <h2 className="text-h2 text-on-surface mb-6">Shared with me (Manageable)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {manageableProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    customHref={`/crew/${slugify(project.title)}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
