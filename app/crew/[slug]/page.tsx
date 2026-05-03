"use client";

import { use, useState } from "react";
import Link from "next/link";
import AppSidebar from "@/components/dashboard/AppSidebar";
import InviteUserModal from "@/components/crew/InviteUserModal";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

interface PageProps { params: Promise<{ slug: string }> }

export default function CrewManagementPage({ params }: PageProps) {
  const { slug } = use(params);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const currentProject = MOCK_PROJECTS.find(p => slugify(p.title) === slug);
  const projectName = currentProject?.title || "Unknown Project";

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} persistKey="sidebar-projects" />
      <InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between w-full h-16 px-8 bg-white/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-30">
          <div className="flex items-center text-h3">
            <Link href="/crew" className="text-on-surface-variant hover:text-on-surface transition-colors font-medium">Crew</Link>
            <span className="material-symbols-outlined mx-2 text-[20px] text-on-surface-variant">chevron_right</span>
            <span className="text-on-surface font-medium">{projectName}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1280px] mx-auto w-full">
          {/* Table Header */}
          <div className="grid grid-cols-4 text-[11px] font-bold text-outline uppercase tracking-wider mb-2 px-6">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
          </div>

          {/* Owner Row */}
          <div className="grid grid-cols-4 items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-amber flex items-center justify-center text-white font-medium text-label-md shrink-0">
                TP
              </div>
              <span className="text-label-md text-on-surface font-semibold truncate">Tri Pham</span>
            </div>
            <div className="text-body-md text-on-surface-variant truncate pr-4">phamhuutri.work@gmail.com</div>
            <div className="text-body-md text-on-surface-variant truncate">Owner</div>
            <div></div>
          </div>

          {/* Add User Seat Button */}
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="w-full py-6 bg-surface-container-low hover:bg-surface-container border border-transparent hover:border-outline-variant rounded-xl flex flex-col items-center justify-center gap-2 transition-all group mt-2"
          >
            <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">add</span>
            <span className="text-label-md text-primary">Add User Seat</span>
          </button>
        </div>
      </main>
    </div>
  );
}
