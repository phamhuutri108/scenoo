"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import AppSidebar from "@/components/dashboard/AppSidebar";
import ImportScriptModal from "@/components/projects/ImportScriptModal";
import ShareScriptModal from "@/components/projects/ShareScriptModal";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import type { ScriptVersion } from "@/types/project";

const MOCK_VERSIONS: ScriptVersion[] = [
  { id: "v1", label: "Draft 1", description: "Initial writer's draft. First pass, unformatted.", modifiedDate: "Mar 12, 2024", pageCount: 87, status: "Draft", author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" }, generalAccess: "Anyone with the link" },
  { id: "v2", label: "Draft 2", description: "Director's revision. Scene trims and dialogue polish.", modifiedDate: "Apr 01, 2024", status: "Draft", pageCount: 92, author: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/100?u=member2" }, generalAccess: "Just Crew" },
  { id: "v3", label: "Shooting Script", description: "Locked production draft. All departments approved.", modifiedDate: "Apr 18, 2024", status: "Final", pageCount: 94, author: { name: "Sarah K", avatar: "https://i.pravatar.cc/100?u=member3" }, generalAccess: "Just Crew" },
];

interface PageProps { params: Promise<{ slug: string[] }> }

export default function ProjectVersionsPage({ params }: PageProps) {
  const { slug } = use(params);
  const projectSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [shareScript, setShareScript] = useState<ScriptVersion | null>(null);

  const currentProject = MOCK_PROJECTS.find(p => slugify(p.title) === projectSlug);
  const projectName = currentProject?.title || "Unknown Project";

  // STRICT RBAC Logic: Users can manage scripts ONLY if they hold an explicit Owner or Manager role.
  const canManageScripts = currentProject?.currentUserRole === "Owner" || currentProject?.currentUserRole === "Manager";

  const existingSlugs = MOCK_VERSIONS.map(v => slugify(v.label));

  return (
    <div className="bg-background text-on-background min-h-screen flex overflow-hidden">
      <ImportScriptModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} existingSlugs={existingSlugs} projectSlug={projectSlug} />
      <ShareScriptModal isOpen={!!shareScript} onClose={() => setShareScript(null)} script={shareScript} canManage={canManageScripts} />

      {/* Script Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="text-h3 text-on-surface">Delete Script</h2>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <p className="text-body-md text-on-surface-variant">This script version will be kept in the project&apos;s Trash tab for 30 days before being permanently deleted.</p>
            </div>
            <div className="p-4 border-t border-outline-variant flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-label-md text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer">Cancel</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-error text-on-error rounded-lg text-label-md hover:opacity-90 transition-opacity cursor-pointer">Move to Trash</button>
            </div>
          </div>
        </div>
      )}

      <AppSidebar defaultExpanded={true} persistKey="sidebar-projects" />

      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between w-full h-16 px-8 bg-white/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-30">
          <div className="flex items-center text-h3">
            <Link href="/projects" className="text-on-surface-variant hover:text-on-surface transition-colors font-medium">Projects</Link>
            <span className="material-symbols-outlined mx-2 text-[20px] text-on-surface-variant">chevron_right</span>
            <span className="text-on-surface font-medium">{projectName}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1280px] mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-display text-on-surface mb-2">Script Versions</h1>
            <p className="text-body-md text-on-surface-variant">Select a version to open the full workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_VERSIONS.map((version) => (
              <Link key={version.id} href={`/workspace/${projectSlug}/${slugify(version.label)}/breakdown`} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col relative min-h-[220px] block cursor-pointer hover:border-primary">

                {/* 3-Dots Menu - ALWAYS VISIBLE TO EVERYONE */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(activeMenuId === version.id ? null : version.id); }}
                    className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                  {activeMenuId === version.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(null); }} />
                      <div className="absolute top-full right-0 mt-1 w-36 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-20 flex flex-col py-1 overflow-hidden">
                        {/* Edit - Restricted to Managers/Owners */}
                        {canManageScripts && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(null); setIsImportModalOpen(true); }}
                            className="w-full text-left px-4 py-2 text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            Edit Script
                          </button>
                        )}

                        {/* Share - Visible to Everyone */}
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(null); setShareScript(version); }}
                          className="w-full text-left px-4 py-2 text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                        >
                          Share
                        </button>

                        {/* Delete - Restricted to Managers/Owners */}
                        {canManageScripts && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(null); setIsDeleteModalOpen(true); }}
                            className="w-full text-left px-4 py-2 text-label-md text-error hover:bg-error-container transition-colors cursor-pointer"
                          >
                            Delete Script
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col flex-1 mt-2">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-surface-container relative shrink-0" title={`Imported by ${version.author.name}`}>
                      <Image
                        src={version.author.avatar}
                        alt={version.author.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-h3 text-on-surface mb-2">{version.label}</h3>
                  <p className="text-body-md text-on-surface-variant line-clamp-2 mb-4 flex-1">{version.description}</p>
                  <div className="flex items-center justify-between text-label-sm text-outline pt-4 border-t border-outline-variant">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">menu_book</span>{version.pageCount} pages</div>
                    <span>{version.modifiedDate}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* New Version Dashed Card - RBAC Protected */}
            {canManageScripts && (
              <div
                onClick={() => setIsImportModalOpen(true)}
                className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-6 hover:bg-surface-container-low hover:border-primary transition-all cursor-pointer group min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">add</span>
                </div>
                <p className="text-h3 text-on-surface-variant group-hover:text-primary transition-colors">
                  {MOCK_VERSIONS.length > 0 ? "New Version" : "Import Script"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
