export type ProjectStatus = "In Post" | "Shooting" | "Ready" | "Pre-Prod";
export type ProjectRole = "Owner" | "Manager" | "User";
export type GeneralAccess = "Just Crew" | "Anyone with the link";

export interface TeamMember {
  src?: string;
  alt?: string;
  initials?: string;
}

export interface ScriptVersion {
  id: string;
  label: string;
  description: string;
  modifiedDate: string;
  pageCount: number;
  status: "Draft" | "Locked" | "Final";
  author: {
    name: string;
    avatar: string;
  };
  generalAccess?: GeneralAccess;
}

export interface Project {
  id: string;
  title: string;
  modifiedDate: string;
  status: ProjectStatus;
  timecode: string;
  thumbnail: string;
  thumbnailAlt: string;
  teamMembers: TeamMember[];
  extraMemberCount?: number;
  isOwner?: boolean;
  currentUserRole?: ProjectRole;
  generalAccess?: GeneralAccess;
}
