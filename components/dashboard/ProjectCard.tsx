"use client";

import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types/project";

const ROLE_STYLES: Record<string, string> = {
  Owner: "bg-brand-amber text-white",
  Manager: "bg-emerald-50 text-emerald-600",
  User: "bg-blue-50 text-blue-600",
};

interface ProjectCardProps {
  project: Project;
  customHref?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onShareClick?: () => void;
  isActive?: boolean;
  onToggleMenu?: () => void;
  onCloseMenu?: () => void;
  isArchived?: boolean;
  onRecoverClick?: () => void;
  onDeleteForeverClick?: () => void;
}

export default function ProjectCard({
  project,
  customHref,
  onEditClick,
  onDeleteClick,
  onShareClick,
  isActive,
  onToggleMenu,
  onCloseMenu,
  isArchived,
  onRecoverClick,
  onDeleteForeverClick,
}: ProjectCardProps) {
  const defaultHref = project.isOwner === false
    ? `/projects/shared/${slugify(project.title)}`
    : `/projects/${slugify(project.title)}`;
  const href = customHref || defaultHref;

  const currentRole = project.currentUserRole || "User";
  const displayRole = currentRole === "User" ? "MEMBER" : currentRole;
  const roleStyle = ROLE_STYLES[currentRole];

  const cardInner = (
    <div className="bg-white border border-gray-200 rounded-xl group hover:shadow-lg transition-all duration-300 relative">

        {/* Thumbnail Wrapper */}
        <div className="aspect-[16/9] relative rounded-t-xl overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
            {project.timecode}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-h3 text-on-surface">{project.title}</h3>
              <p className="text-label-sm text-on-surface-variant mt-1">
                {project.modifiedDate}
              </p>
            </div>

            {/* Trigger & Dropdown Menu */}
            {(isArchived || project.isOwner !== false || onShareClick) && onToggleMenu && onCloseMenu && (
              <div className="relative z-50">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleMenu();
                  }}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? "bg-surface-container text-on-surface"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    more_vert
                  </span>
                </button>

                {isActive && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={(e) => {
                        e.preventDefault();
                        onCloseMenu();
                      }}
                    />
                    <div className="absolute top-full right-0 mt-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 w-44 flex flex-col py-1 overflow-hidden">
                      {isArchived ? (
                        <>
                          {onRecoverClick && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onCloseMenu();
                                onRecoverClick();
                              }}
                              className="px-4 py-2 text-left text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                            >
                              Recover
                            </button>
                          )}
                          {onDeleteForeverClick && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onCloseMenu();
                                onDeleteForeverClick();
                              }}
                              className="px-4 py-2 text-left text-label-md text-error hover:bg-error-container transition-colors cursor-pointer"
                            >
                              Delete Forever
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {project.isOwner !== false && onEditClick && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onCloseMenu();
                                onEditClick();
                              }}
                              className="px-4 py-2 text-left text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                            >
                              Edit Project
                            </button>
                          )}

                          {onShareClick && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onCloseMenu();
                                onShareClick();
                              }}
                              className="px-4 py-2 text-left text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                            >
                              Share
                            </button>
                          )}

                          {project.isOwner !== false && onDeleteClick && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onCloseMenu();
                                onDeleteClick();
                              }}
                              className="px-4 py-2 text-left text-label-md text-error hover:bg-error-container transition-colors cursor-pointer"
                            >
                              Delete Project
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer (Role & Team) */}
          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${roleStyle}`}
            >
              {displayRole}
            </span>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {project.teamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"
                  >
                    {member.src ? (
                      <Image
                        src={member.src}
                        alt={member.alt || "Team member"}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-[9px] font-bold">
                        {member.initials}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {project.extraMemberCount && (
                <span className="ml-2 text-label-sm text-on-surface-variant font-medium">
                  +{project.extraMemberCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
  );

  return isArchived ? (
    <div className="block cursor-default opacity-80">{cardInner}</div>
  ) : (
    <Link href={href} className="block">{cardInner}</Link>
  );
}
