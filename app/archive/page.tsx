"use client";

import { useState } from "react";
import AppSidebar from "@/components/dashboard/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DeleteForeverModal from "@/components/archive/DeleteForeverModal";
import type { Project } from "@/types/project";

const MOCK_ARCHIVED_PROJECTS: Project[] = [
  {
    id: "arch-1",
    title: "Lost Frequency",
    modifiedDate: "Archived Mar 10, 2024",
    status: "In Post",
    timecode: "01:12:44:00",
    thumbnail: "https://picsum.photos/seed/lost-frequency/800/450",
    thumbnailAlt: "Lost Frequency Production",
    teamMembers: [
      { src: "https://i.pravatar.cc/100?u=arch-member1", alt: "Team member" },
      { src: "https://i.pravatar.cc/100?u=arch-member2", alt: "Team member" },
    ],
    extraMemberCount: 2,
    isOwner: true,
    currentUserRole: "Owner",
    generalAccess: "Just Crew",
  },
  {
    id: "arch-2",
    title: "Midnight Reel",
    modifiedDate: "Archived Jan 22, 2024",
    status: "Shooting",
    timecode: "00:58:16:04",
    thumbnail: "https://picsum.photos/seed/midnight-reel/800/450",
    thumbnailAlt: "Midnight Reel Production",
    teamMembers: [
      { src: "https://i.pravatar.cc/100?u=arch-member3", alt: "Team member" },
    ],
    extraMemberCount: 5,
    isOwner: true,
    currentUserRole: "Owner",
    generalAccess: "Just Crew",
  },
  {
    id: "arch-3",
    title: "Echoes of April",
    modifiedDate: "Archived Feb 05, 2024",
    status: "Pre-Prod",
    timecode: "00:30:00:00",
    thumbnail: "https://picsum.photos/seed/echoes-april/800/450",
    thumbnailAlt: "Echoes of April Production",
    teamMembers: [{ initials: "SA" }],
    isOwner: true,
    currentUserRole: "Owner",
    generalAccess: "Just Crew",
  },
];

export default function ArchivePage() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} />
      <main className="flex-1 overflow-auto flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-8">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="text-h1 text-on-surface mb-6">Archive</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_ARCHIVED_PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isArchived={true}
                  isActive={activeMenuId === project.id}
                  onToggleMenu={() =>
                    setActiveMenuId((prev) =>
                      prev === project.id ? null : project.id
                    )
                  }
                  onCloseMenu={() => setActiveMenuId(null)}
                  onRecoverClick={() => setActiveMenuId(null)}
                  onDeleteForeverClick={() => setIsDeleteModalOpen(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <DeleteForeverModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

