This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
0427_1156_reuse-projectcard-in-crew.md
0427_1240_update-sidebar-user-menu.md
0427_1315_refactor-workspace-routing.md
0427_1340_fix-turbopack-and-clickable-card.md
0427_2015_flexible-layer-fix.md
0427_2102_friendly-url-validation.md
0427_2110_audit-cursor-pointer.md
427_1317_fix-workspace-routing-catchall.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0427_1156_reuse-projectcard-in-crew.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to reuse the existing `ProjectCard` component inside the Crew page instead of using custom list UI, to ensure consistent thumbnails and roles.
  </role>

  <task>
    Execute Sub-task: Reuse ProjectCard in Crew Module.
    
    1. MODIFY `components/dashboard/ProjectCard.tsx`:
       - Add `customHref?: string;` to the `ProjectCardProps` interface.
       - Locate the `href` constant declaration inside the component.
       - Change it to prioritize `customHref`: 
         `const defaultHref = project.isOwner === false ? \`/projects/shared/\${slugify(project.title)}\` : \`/projects/\${slugify(project.title)}\`;`
         `const href = customHref || defaultHref;`
       - Ensure no other logic (like `isArchived` or `ROLE_STYLES`) is touched.

    2. MODIFY `app/crew/page.tsx`:
       - Delete the local `ProjectList` function and its return JSX completely.
       - Import `ProjectCard` from `@/components/dashboard/ProjectCard`.
       - In the "My Projects" section grid, map over `myProjects` and render:
         `<ProjectCard key={project.id} project={project} customHref={\`/crew/\${slugify(project.title)}\`} />`
       - In the "Shared with me" section grid, map over `manageableProjects` and render the same `ProjectCard` component with the same `customHref`.
       - Do NOT pass any menu-related props (`onToggleMenu`, `onEditClick`, etc.) to the `ProjectCard` in this file. This will ensure the 3-dots menu safely stays hidden on the Crew page.
  </task>

  <constraints>
    - Carefully parse the existing `ProjectCard.tsx` to inject the prop without breaking the new Archive or Role Badge features.
    - Ensure styling of the grid in `app/crew/page.tsx` uses `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` to match the dashboard layout.
  </constraints>
</system_prompt>
</file>

<file path="0427_1240_update-sidebar-user-menu.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to update the user profile block in the AppSidebar to match the "My Profile" settings and implement a popup dropdown menu for Settings and Logout.
  </role>

  <task>
    Execute Sub-task: Sync Sidebar User Info & Add Dropdown Menu.
    
    1. OVERWRITE `components/dashboard/AppSidebar.tsx`:
       - Add a local state `isUserMenuOpen` (boolean).
       - Update the bottom user profile block's hardcoded data:
         - Avatar Initials: "TP" (with `bg-brand-amber` background).
         - Name: "Tri Pham".
         - Role: "Director".
       - Change the outer wrapper of this user block from `<Link>` to a `<button>` that toggles `isUserMenuOpen`.
       - Render a dropdown menu directly above the user block when `isUserMenuOpen` is true.
       - The dropdown MUST contain:
         - A `<Link>` to `/settings/my-profile` labeled "Settings" with a `settings` icon.
         - A `<button>` labeled "Logout" with a `logout` icon, styled with `text-error` and `hover:bg-error-container`.
       - Ensure the dropdown uses `absolute bottom-full mb-2 z-50` and has a `min-w-[160px]` so it doesn't get cramped when the sidebar is collapsed (`w-20`).
       - Add a full-screen invisible backdrop (`fixed inset-0 z-40`) to close the menu when clicking outside.
  </task>

  <files_to_overwrite>
    <file path="components/dashboard/AppSidebar.tsx">
      ```tsx
      "use client";

      import { useState, useEffect } from "react";
      import Link from "next/link";
      import { usePathname } from "next/navigation";

      interface AppSidebarProps {
        defaultExpanded?: boolean;
        persistKey?: string;
      }

      const NAV_ITEMS = [
        { icon: "folder_open", label: "Projects", href: "/projects" },
        { icon: "video_library", label: "Assets", href: "/assets" },
        { icon: "groups", label: "Crew", href: "/crew" },
        { icon: "delete", label: "Archive", href: "/archive" },
        { icon: "settings", label: "Settings", href: "/settings" },
      ];

      export default function AppSidebar({ defaultExpanded = true, persistKey }: AppSidebarProps) {
        const pathname = usePathname();
        const [isExpanded, setIsExpanded] = useState(defaultExpanded);
        const [enableTransition, setEnableTransition] = useState(false);
        const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

        useEffect(() => {
          if (persistKey) {
            const stored = localStorage.getItem(persistKey);
            if (stored !== null) {
              setIsExpanded(stored === "true");
            } else {
              setIsExpanded(defaultExpanded);
            }
          } else {
            setIsExpanded(defaultExpanded);
          }
          const timer = setTimeout(() => {
            setEnableTransition(true);
          }, 50);
          return () => clearTimeout(timer);
        }, [persistKey, defaultExpanded]);

        const toggleSidebar = () => {
          const newState = !isExpanded;
          setIsExpanded(newState);
          if (persistKey) {
            localStorage.setItem(persistKey, String(newState));
          }
        };

        const isActive = (href: string) => {
          if (href === "/projects" && pathname.startsWith("/projects")) return true;
          if (href === "/crew" && pathname.startsWith("/crew")) return true;
          if (href === "/settings" && pathname.startsWith("/settings")) return true;
          return pathname === href;
        };

        return (
          <aside
            className={`shrink-0 h-screen flex flex-col p-4 bg-surface-container-lowest border-r border-outline-variant z-40 relative ${
              enableTransition ? "transition-all duration-300" : ""
            } ${isExpanded ? "w-64" : "w-20"}`}
          >
            {/* Header */}
            <div
              className={`mb-8 flex items-center ${
                isExpanded ? "justify-between px-2" : "justify-center"
              }`}
            >
              {isExpanded && (
                <div className="overflow-hidden whitespace-nowrap">
                  <h1 className="text-h2 text-on-surface tracking-tight">Scenoo</h1>
                  <p className="text-label-sm text-on-surface-variant">Production Hub</p>
                </div>
              )}
              <button
                onClick={toggleSidebar}
                className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors shrink-0"
                aria-label="Toggle sidebar"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isExpanded ? "chevron_left" : "menu"}
                </span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isExpanded ? "justify-start gap-3" : "justify-center"
                    } ${
                      active
                        ? "bg-surface-container text-on-surface font-medium"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    {isExpanded && <span className="text-label-md whitespace-nowrap">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>

            {/* User Profile Block with Dropdown */}
            <div className="mt-auto pt-4 border-t border-outline-variant relative">
              
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div 
                    className={`absolute bottom-full mb-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 py-1 flex flex-col overflow-hidden min-w-[160px] ${
                      isExpanded ? "left-0 w-full" : "left-0"
                    }`}
                  >
                    <Link
                      href="/settings/my-profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-left text-label-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">settings</span>
                      Settings
                    </Link>
                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-left text-label-md text-error hover:bg-error-container transition-colors flex items-center gap-3 w-full"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Logout
                    </button>
                  </div>
                </>
              )}

              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-full flex items-center p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer text-left ${
                  isExpanded ? "gap-3 justify-start" : "justify-center"
                } ${isUserMenuOpen ? "bg-surface-container-low" : ""}`}
                title={!isExpanded ? "Tri Pham - Director" : undefined}
              >
                <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-label-sm font-medium shrink-0 shadow-sm">
                  TP
                </div>
                {isExpanded && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-label-md text-on-surface truncate">Tri Pham</span>
                    <span className="text-label-sm text-on-surface-variant truncate">Director</span>
                  </div>
                )}
              </button>
            </div>
          </aside>
        );
      }
      ```
    </file>
  </files_to_overwrite>

  <constraints>
    - Ensure the component uses standard Tailwind classes from the design system.
  </constraints>
</system_prompt>
</file>

<file path="0427_1315_refactor-workspace-routing.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to refactor the Workspace routing from static paths to dynamic, database-ready paths: `/workspace/[...projectSlug]/[scriptId]/[module]`.
  </role>

  <task>
    Execute Sub-task: Workspace Dynamic Routing Refactor.
    
    1. **CLEANUP (Delete old routes):**
       - You MUST delete the following old directories and their `page.tsx` files:
         - `app/(workspace)/breakdown`
         - `app/(workspace)/linescript`
         - `app/(workspace)/shotlist`
    
    2. **CREATE DYNAMIC ROUTE:**
       - Create a new file: `app/(workspace)/workspace/[...projectSlug]/[scriptId]/[module]/page.tsx`
       - This page will act as a catch-all for the 3 workspace modules.
       - Use `await params` (Next.js 15+ pattern) to read the `module` parameter.
       - Switch based on `module`:
         - `"breakdown"` -> return `<BreakdownContainer />`
         - `"linescript"` -> return `<LineScriptContainer />`
         - `"shotlist"` -> return `<ShotlistContainer />`
         - default -> return `notFound()`
    
    3. **UPDATE WORKSPACE HEADER:**
       - OVERWRITE `components/layout/WorkspaceHeader.tsx`.
       - Use `useParams` from `next/navigation` to extract `projectSlug` (string array), `scriptId` (string), and `module` (string).
       - Reconstruct the `NAV_TABS` array dynamically so the `href` includes the current project and script context: `/workspace/${slugStr}/${scriptId}/...`.
       - Update the active tab styling to check against the current `module` param instead of `pathname`.
       
    4. **UPDATE PROJECT VERSIONS PAGE:**
       - MODIFY `app/projects/[...slug]/page.tsx`.
       - In the mapping of `MOCK_VERSIONS` (where script cards are rendered), add a primary action to enter the workspace.
       - Wrap the `version.label` (e.g., "Draft 1") in a `<Link>` or add a prominent "Open Workspace" button inside the card that navigates to `/workspace/${projectSlugStr}/${version.id}/breakdown`.
  </task>

  <files_to_overwrite>
    <file path="app/(workspace)/workspace/[...projectSlug]/[scriptId]/[module]/page.tsx">
      ```tsx
      import { notFound } from "next/navigation";
      import BreakdownContainer from "@/components/breakdown/BreakdownContainer";
      import LineScriptContainer from "@/components/linescript/LineScriptContainer";
      import ShotlistContainer from "@/components/shotlist/ShotlistContainer";

      interface PageProps {
        params: Promise<{
          projectSlug: string[];
          scriptId: string;
          module: string;
        }>;
      }

      // Dynamic Metadata based on module
      export async function generateMetadata({ params }: PageProps) {
        const { module } = await params;
        const titles: Record<string, string> = {
          breakdown: "Script Breakdown | Scenoo",
          linescript: "Line Script | Scenoo",
          shotlist: "Shotlist | Scenoo",
        };
        return { title: titles[module] || "Workspace | Scenoo" };
      }

      export default async function WorkspaceModulePage({ params }: PageProps) {
        const { module } = await params;

        switch (module) {
          case "breakdown":
            return <BreakdownContainer />;
          case "linescript":
            return <LineScriptContainer />;
          case "shotlist":
            return <ShotlistContainer />;
          default:
            notFound();
        }
      }
      ```
    </file>

    <file path="components/layout/WorkspaceHeader.tsx">
      ```tsx
      'use client';

      import Link from 'next/link';
      import { useParams } from 'next/navigation';

      export default function WorkspaceHeader() {
        const params = useParams();
        const projectSlugArr = params.projectSlug as string[] | undefined;
        const scriptId = params.scriptId as string | undefined;
        const currentModule = params.module as string | undefined;

        // Reconstruct the base URL. Fallback handles rendering during transitions.
        const projectSlugStr = projectSlugArr ? projectSlugArr.join('/') : 'default';
        const safeScriptId = scriptId || 'v1';
        const baseUrl = `/workspace/${projectSlugStr}/${safeScriptId}`;

        const NAV_TABS = [
          { id: 'breakdown', label: 'Breakdown', href: `${baseUrl}/breakdown` },
          { id: 'linescript', label: 'Line Script', href: `${baseUrl}/linescript` },
          { id: 'shotlist', label: 'Shotlist', href: `${baseUrl}/shotlist` },
        ] as const;

        return (
          <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-white border-b border-[#E5E7EB] z-30">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
              <Link href="/projects" className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </Link>
              <span className="text-[#191b23] text-sm font-semibold tracking-tight">Scenoo Workspace</span>
            </div>

            {/* Center: Tabs */}
            <nav className="flex h-full gap-8">
              {NAV_TABS.map((tab) => {
                const isActive = currentModule === tab.id;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`text-sm font-medium flex items-center h-full border-b-2 transition-colors ${
                      isActive
                        ? 'text-[#0058be] border-[#0058be]'
                        : 'text-[#424754] border-transparent hover:text-[#191b23]'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">help</span>
              </button>
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-xs font-semibold shadow-sm ml-2">
                TP
              </div>
            </div>
          </header>
        );
      }
      ```
    </file>
  </files_to_overwrite>

  <instructions>
    1. Apply the file overwrites.
    2. Then, locate `app/projects/[...slug]/page.tsx`. Find the mapping for `MOCK_VERSIONS`. Inside the script card, next to or below the `version.modifiedDate`, add a `<Link>` button that says "Open Workspace".
    The href MUST be: ``href={`/workspace/${projectSlug}/${version.id}/breakdown`}``. Style it with `bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg text-label-md hover:bg-primary-container/80 transition-colors`.
    3. Physically delete the old `app/(workspace)/breakdown`, `app/(workspace)/linescript`, and `app/(workspace)/shotlist` folders.
  </instructions>
</system_prompt>
</file>

<file path="0427_1340_fix-turbopack-and-clickable-card.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to fix a Next.js Turbopack panic by refactoring the workspace routing to use strict dynamic segments, and to make the script version cards directly clickable instead of using a button.
  </role>

  <task>
    Execute Sub-task: Fix Turbopack Panic & Make Script Cards Clickable.
    
    1. **FIX TURBOPACK ROUTING (Strict Dynamic Segments):**
       - You MUST completely delete the folder `app/(workspace)/workspace/[...workspaceParams]`.
       - Create a new strict directory structure: `app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx`.
       - Update `page.tsx` to read `projectSlug`, `scriptId`, and `module` directly from `await params` (as simple strings, not an array).
       
    2. **UPDATE WORKSPACE HEADER:**
       - OVERWRITE `components/layout/WorkspaceHeader.tsx`.
       - Update `useParams` logic. Since the segments are now strict, `projectSlug`, `scriptId`, and `module` will be simple strings.
       - Construct `baseUrl = \`/workspace/${projectSlug}/${scriptId}\``.

    3. **MAKE SCRIPT CARDS CLICKABLE:**
       - MODIFY `app/projects/[...slug]/page.tsx`.
       - Locate the `MOCK_VERSIONS.map` loop.
       - Remove the "Open Workspace" button that was recently added.
       - Change the outer `<div>` wrapper of each script card to a Next.js `<Link>`.
       - Set `href={\`/workspace/${projectSlug}/${version.id}/breakdown\`}` on the `<Link>`.
       - Add `block cursor-pointer hover:border-primary hover:shadow-md transition-all` to the card's `className`.
       - **CRITICAL:** Inside the card, the 3-dots `<button>` trigger and all its dropdown menu buttons ("Edit Script", "Delete Script", "Share") MUST have `e.preventDefault(); e.stopPropagation();` at the beginning of their `onClick` handlers so that interacting with the menu does not trigger the `<Link>` navigation.
  </task>

  <files_to_overwrite>
    <file path="app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx">
      ```tsx
      import { notFound } from "next/navigation";
      import BreakdownContainer from "@/components/breakdown/BreakdownContainer";
      import LineScriptContainer from "@/components/linescript/LineScriptContainer";
      import ShotlistContainer from "@/components/shotlist/ShotlistContainer";

      interface PageProps {
        params: Promise<{
          projectSlug: string;
          scriptId: string;
          module: string;
        }>;
      }

      export async function generateMetadata({ params }: PageProps) {
        const { module } = await params;
        const titles: Record<string, string> = {
          breakdown: "Script Breakdown | Scenoo",
          linescript: "Line Script | Scenoo",
          shotlist: "Shotlist | Scenoo",
        };
        return { title: titles[module] || "Workspace | Scenoo" };
      }

      export default async function WorkspaceModulePage({ params }: PageProps) {
        const { module } = await params;

        switch (module) {
          case "breakdown":
            return <BreakdownContainer />;
          case "linescript":
            return <LineScriptContainer />;
          case "shotlist":
            return <ShotlistContainer />;
          default:
            notFound();
        }
      }
      ```
    </file>

    <file path="components/layout/WorkspaceHeader.tsx">
      ```tsx
      'use client';

      import Link from 'next/link';
      import { useParams } from 'next/navigation';

      export default function WorkspaceHeader() {
        const params = useParams();
        const projectSlug = (params.projectSlug as string) || 'default';
        const scriptId = (params.scriptId as string) || 'v1';
        const currentModule = (params.module as string) || 'breakdown';

        const baseUrl = `/workspace/${projectSlug}/${scriptId}`;

        const NAV_TABS = [
          { id: 'breakdown', label: 'Breakdown', href: `${baseUrl}/breakdown` },
          { id: 'linescript', label: 'Line Script', href: `${baseUrl}/linescript` },
          { id: 'shotlist', label: 'Shotlist', href: `${baseUrl}/shotlist` },
        ] as const;

        return (
          <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-white border-b border-[#E5E7EB] z-30">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
              <Link href="/projects" className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </Link>
              <span className="text-[#191b23] text-sm font-semibold tracking-tight">Scenoo Workspace</span>
            </div>

            {/* Center: Tabs */}
            <nav className="flex h-full gap-8">
              {NAV_TABS.map((tab) => {
                const isActive = currentModule === tab.id;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`text-sm font-medium flex items-center h-full border-b-2 transition-colors ${
                      isActive
                        ? 'text-[#0058be] border-[#0058be]'
                        : 'text-[#424754] border-transparent hover:text-[#191b23]'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">help</span>
              </button>
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-xs font-semibold shadow-sm ml-2">
                TP
              </div>
            </div>
          </header>
        );
      }
      ```
    </file>
  </files_to_overwrite>

  <instructions>
    1. Physically DELETE the folder `app/(workspace)/workspace/[...workspaceParams]`.
    2. Create `app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx` using the code provided.
    3. Overwrite `components/layout/WorkspaceHeader.tsx` using the code provided.
    4. Follow the strict modification rules in `app/projects/[...slug]/page.tsx` to remove the button, wrap the card in `<Link>`, and add `e.stopPropagation()` to all menu items inside it.
  </instructions>
</system_prompt>
</file>

<file path="0427_2015_flexible-layer-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to resolve a z-index stacking context bug gracefully using standard Tailwind conventions.
  </role>

  <task>
    Execute Sub-task: Audit and Fix Layering Issues (Modals vs. Card Menus).

    **The Bug:** The 3-dots menu button (`more_vert`) inside the script version cards currently has a high z-index (`z-50`), causing it to bleed through and overlap the global `ImportScriptModal` backdrop overlay.

    **Your Objective:** Fix this layering issue using ONLY standard Tailwind z-index classes (`z-10`, `z-20`, `z-30`, `z-40`, `z-50`). Do NOT use inline styles (`style={{ zIndex: ... }}`) or arbitrary values (e.g., `z-`).

    1. **Audit `components/projects/ImportScriptModal.tsx`**:
       - Ensure the outermost backdrop overlay uses a standard maximum z-index (e.g., `z-50`).
       - CRITICAL: You must preserve the centering layout. Do not alter or remove `flex`, `items-center`, `justify-center`, or `p-4` classes.

    2. **Audit `app/projects/[...slug]/page.tsx`**:
       - Locate the script cards rendered inside the `MOCK_VERSIONS.map` loop.
       - Lower the z-index of the 3-dots menu wrapper (currently `z-50`) to a sensible lower value (e.g., `z-20` or `z-30`) so it comfortably sits below any global `z-50` modal.
       - Ensure the dropdown menu itself (the absolute positioned list) also scales down its z-index properly to stay within the logical hierarchy.
  </task>

  <constraints>
    - Trust your expertise to adjust the exact z-index numbers, as long as standard Tailwind classes are used and the modal sits on top.
    - DO NOT change, add, or remove any structural flexbox, margin, or padding classes. The layout must look exactly the same, just with fixed layering.
  </constraints>
</system_prompt>
</file>

<file path="0427_2102_friendly-url-validation.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to update the script URL routing to use friendly URLs (slugs) instead of UUIDs, and implement real-time unique constraint validation in the Import Script Modal.
  </role>

  <task>
    Execute Sub-task: Friendly URL & Unique Slug Validation.
    
    1. **UPDATE SLUGIFY UTILITY:**
       - OVERWRITE `lib/utils.ts`.
       - Update the `slugify` function to safely convert periods `.`, commas `,`, and underscores `_` into hyphens `-` before stripping out special characters. This ensures "Draft 1.1" becomes `draft-1-1`.
       - Add a regex pass to collapse multiple consecutive hyphens (`-+`) into a single hyphen.

    2. **UPDATE IMPORT SCRIPT MODAL:**
       - OVERWRITE `components/projects/ImportScriptModal.tsx`.
       - Add `existingSlugs: string[]` and `projectSlug: string` to `ImportScriptModalProps`.
       - Manage local states for `versionName` and `description`.
       - Calculate `currentSlug = slugify(versionName)`.
       - Calculate `isDuplicate = versionName.trim() !== "" && existingSlugs.includes(currentSlug)`.
       - Render the full layout ensuring the outermost overlay strictly uses `"fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"` to maintain safe layering and centering.
       - Form Structure:
         - Field 1: "ORIGINAL NAME" -> `<input>` with `defaultValue="NeonNights_Script.pdf" disabled bg-surface-container-low cursor-not-allowed`.
         - Field 2: "VERSION NAME" -> `<input>` bound to `versionName`. If `isDuplicate`, apply `border-error focus:border-error focus:ring-error`.
         - Below Field 2 Helper Text:
           - If `isDuplicate`, show `<p className="text-label-sm text-error mt-1.5">Phiên bản này đã tồn tại. Hãy thêm .1 hoặc -2 vào sau (VD: Draft 1.1) để tiếp tục.</p>`.
           - Else if `versionName.trim() !== ""`, show `<p className="text-label-sm text-on-surface-variant mt-1.5">URL: /workspace/{projectSlug}/{currentSlug}/breakdown</p>`.
         - Field 3: "DESCRIPTION (Optional)" -> `<textarea>` bound to `description`.
       - Footer: The "Import Script" button MUST be disabled if `!versionName.trim() || isDuplicate`.

    3. **UPDATE PROJECT VERSIONS PAGE:**
       - MODIFY `app/projects/[...slug]/page.tsx` (Use targeted modifications, do not overwrite the entire file).
       - Step A: Before rendering `<ImportScriptModal>`, calculate `existingSlugs`:
         `const existingSlugs = MOCK_VERSIONS.map(v => slugify(v.label));`
       - Step B: Pass the new props to the modal:
         `<ImportScriptModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} existingSlugs={existingSlugs} projectSlug={projectSlug} />`
       - Step C: Inside the `MOCK_VERSIONS.map` loop, locate the Next.js `<Link>` wrapper for the script card. Update its `href` to use the slugified label instead of the id:
         `href={\`/workspace/${projectSlug}/${slugify(version.label)}/breakdown\`}`
  </task>

  <files_to_overwrite>
    <file path="lib/utils.ts">
      ```typescript
      const VIETNAMESE_MAP: Record<string, string> = {
        à: "a", á: "a", ả: "a", ã: "a", ạ: "a",
        â: "a", ầ: "a", ấ: "a", ẩ: "a", ẫ: "a", ậ: "a",
        ă: "a", ằ: "a", ắ: "a", ẳ: "a", ẵ: "a", ặ: "a",
        è: "e", é: "e", ẻ: "e", ẽ: "e", ẹ: "e",
        ê: "e", ề: "e", ế: "e", ể: "e", ễ: "e", ệ: "e",
        ì: "i", í: "i", ỉ: "i", ĩ: "i", ị: "i",
        ò: "o", ó: "o", ỏ: "o", õ: "o", ọ: "o",
        ô: "o", ồ: "o", ố: "o", ổ: "o", ỗ: "o", ộ: "o",
        ơ: "o", ờ: "o", ớ: "o", ở: "o", ỡ: "o", ợ: "o",
        ù: "u", ú: "u", ủ: "u", ũ: "u", ụ: "u",
        ư: "u", ừ: "u", ứ: "u", ử: "u", ữ: "u", ự: "u",
        ỳ: "y", ý: "y", ỷ: "y", ỹ: "y", ỵ: "y",
        đ: "d",
      };

      export function slugify(str: string): string {
        return str
          .toLowerCase()
          .split("")
          .map((ch) => VIETNAMESE_MAP[ch] ?? ch)
          .join("")
          .replace(/[.,_]/g, "-") // Convert dots, commas, underscores to hyphens
          .replace(/[^a-z0-9\s-]/g, "") // Remove all other special chars
          .trim()
          .replace(/\s+/g, "-") // Convert spaces to hyphens
          .replace(/-+/g, "-"); // Collapse multiple hyphens into one
      }
      ```
    </file>

    <file path="components/projects/ImportScriptModal.tsx">
      ```tsx
      "use client";

      import { useState } from "react";
      import { slugify } from "@/lib/utils";

      interface ImportScriptModalProps {
        isOpen: boolean;
        onClose: () => void;
        existingSlugs: string[];
        projectSlug: string;
      }

      export default function ImportScriptModal({ isOpen, onClose, existingSlugs, projectSlug }: ImportScriptModalProps) {
        const [versionName, setVersionName] = useState("");
        const [description, setDescription] = useState("");

        if (!isOpen) return null;

        const currentSlug = slugify(versionName);
        const isDuplicate = versionName.trim() !== "" && existingSlugs.includes(currentSlug);
        const isSaveDisabled = !versionName.trim() || isDuplicate;

        const handleClose = () => {
          setVersionName("");
          setDescription("");
          onClose();
        };

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl w-full max-w-lg flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
                <h2 className="text-h3 text-on-surface">Script Information</h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* File Dropzone - Visual Only */}
                <div className="w-full h-32 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low hover:border-primary transition-all group">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[28px] mb-2">
                    upload_file
                  </span>
                  <p className="text-label-md text-on-surface-variant group-hover:text-primary transition-colors">
                    Click to upload or drag & drop PDF
                  </p>
                </div>

                {/* Original Name */}
                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                    Original Name
                  </label>
                  <input
                    type="text"
                    defaultValue="NeonNights_Script.pdf"
                    disabled
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface-variant cursor-not-allowed"
                  />
                </div>

                {/* Version Name */}
                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                    Version Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={versionName}
                    onChange={(e) => setVersionName(e.target.value)}
                    placeholder="e.g. Draft 1"
                    className={`w-full px-4 py-2.5 bg-surface-container-lowest border rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-1 transition-all ${
                      isDuplicate
                        ? "border-error focus:border-error focus:ring-error"
                        : "border-outline-variant focus:border-primary focus:ring-primary"
                    }`}
                  />
                  {isDuplicate ? (
                    <p className="text-label-sm text-error mt-1.5">
                      Phiên bản này đã tồn tại. Hãy thêm .1 hoặc -2 vào sau (VD: Draft 1.1) để tiếp tục.
                    </p>
                  ) : (
                    versionName.trim() !== "" && (
                      <p className="text-label-sm text-on-surface-variant mt-1.5">
                        URL: /workspace/{projectSlug}/{currentSlug}/breakdown
                      </p>
                    )
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">
                    Description <span className="normal-case tracking-normal font-normal text-outline">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief notes about this version..."
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                </div>

                {/* Smart Transfer */}
                <div className="p-4 bg-primary-fixed/30 border border-primary-fixed rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                      auto_awesome
                    </span>
                    <div className="flex-1">
                      <label className="block text-label-md text-on-surface font-bold mb-1">
                        Smart Transfer Data
                      </label>
                      <p className="text-body-md text-on-surface-variant mb-3">
                        Copy breakdown tags and line scripts from an older version to this new upload.
                      </p>
                      <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-md text-body-md text-on-surface focus:outline-none focus:border-primary">
                        <option value="none">None (Start fresh)</option>
                        <option value="v1">Draft 1</option>
                        <option value="v3">Shooting Script</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest rounded-b-xl">
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-lg text-label-md font-medium text-on-surface border border-outline-variant hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isSaveDisabled}
                  className={`px-5 py-2 rounded-lg text-label-md font-medium transition-all shadow-sm ${
                    isSaveDisabled
                      ? "bg-surface-variant text-outline cursor-not-allowed"
                      : "bg-primary text-on-primary hover:bg-primary/90"
                  }`}
                >
                  Import Script
                </button>
              </div>
            </div>
          </div>
        );
      }
      ```
    </file>
  </files_to_overwrite>

  <instructions>
    1. Overwrite `lib/utils.ts` and `components/projects/ImportScriptModal.tsx` entirely.
    2. Modify `app/projects/[...slug]/page.tsx` specifically by computing `existingSlugs` from `MOCK_VERSIONS`, passing it down to the Modal, and updating the script card's `<Link href>` to use `slugify(version.label)`.
  </instructions>
</system_prompt>
</file>

<file path="0427_2110_audit-cursor-pointer.md">
<system_prompt>
  <role>
    You are a UX/UI Expert and Senior Frontend Engineer. Your task is to perform a flexible audit across the application to ensure all interactive elements display the correct cursor (hand cursor), while strictly preserving all existing layouts.
  </role>

  <task>
    Execute Sub-task: Audit and Apply `cursor-pointer` to Interactive Elements.

    1. **Audit Scope**: Scan the UI components for elements that trigger actions (e.g., elements with `onClick`, `Link` components lacking default cursors, Dropdown toggles, and icon buttons) but do not explicitly have the `cursor-pointer` class.
    
    2. **Primary Targets to Check & Fix**:
       - 3-dots menu triggers (`more_vert`) in `components/dashboard/ProjectCard.tsx` and `app/projects/[...slug]/page.tsx`.
       - Header icon buttons (help, notifications) in `components/layout/WorkspaceHeader.tsx` and `components/dashboard/DashboardHeader.tsx`.
       - Close buttons and custom clickable `<div>` elements (like the File Dropzone) in all Modals (`ImportScriptModal`, `ShareProjectModal`, `ShareScriptModal`, `DeleteProjectModal`, etc.).
       - Any list items, tabs, or custom toggles that act as buttons.

    3. **Action**: Append the `cursor-pointer` Tailwind class to the `className` string of these elements. If an element is explicitly disabled, ensure `cursor-not-allowed` is used instead.
  </task>

  <constraints>
    - **FLEXIBILITY**: You are trusted to autonomously identify and fix any missing cursors on interactive elements across the files you have in context.
    - **STRICT RULE 1 (No Layout Changes)**: You are ONLY allowed to add `cursor-pointer` (or `cursor-not-allowed`). You MUST NOT change, add, or remove `flex`, `p-*`, `m-*`, `z-*`, `bg-*`, `justify-*`, `items-*`, or any other structural/visual classes.
    - **STRICT RULE 2 (Targeted Output)**: Do not output entire files. Only output the specific lines or small JSX blocks that require the cursor update, so as not to override recent hotfixes.
  </constraints>
</system_prompt>
</file>

<file path="427_1317_fix-workspace-routing-catchall.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to fix a Next.js `TurbopackInternalError` caused by placing dynamic segments after a Catch-All segment.
  </role>

  <task>
    Execute Sub-task: Fix Workspace Routing Catch-All Error.
    
    1. **CLEANUP (Delete invalid route structure):**
       - You MUST completely delete the folder `app/(workspace)/workspace/[...projectSlug]/` and all its contents.
       
    2. **CREATE NEW VALID ROUTE:**
       - Create a new directory structure and file: `app/(workspace)/workspace/[...workspaceParams]/page.tsx`
       - Next.js requires Catch-All segments to be the last segment in the path. This single Catch-All will capture the `projectSlug`, `scriptId`, and `module` as a single array of strings.
       - Inside `page.tsx`, parse `workspaceParams`:
         - The last element is the `module` ("breakdown", "linescript", or "shotlist").
         - Render the corresponding container based on the `module`.
         
    3. **UPDATE WORKSPACE HEADER:**
       - OVERWRITE `components/layout/WorkspaceHeader.tsx`.
       - Update the `useParams` logic to read `workspaceParams` instead of the old separate params.
       - Extract the variables: `currentModule` (last item), `safeScriptId` (second to last item), and `projectSlugStr` (the rest of the items joined by `/`).
  </task>

  <files_to_overwrite>
    <file path="app/(workspace)/workspace/[...workspaceParams]/page.tsx">
      ```tsx
      import { notFound } from "next/navigation";
      import BreakdownContainer from "@/components/breakdown/BreakdownContainer";
      import LineScriptContainer from "@/components/linescript/LineScriptContainer";
      import ShotlistContainer from "@/components/shotlist/ShotlistContainer";

      interface PageProps {
        params: Promise<{
          workspaceParams: string[];
        }>;
      }

      // Dynamic Metadata based on module
      export async function generateMetadata({ params }: PageProps) {
        const resolvedParams = await params;
        const workspaceParams = resolvedParams.workspaceParams || [];
        const module = workspaceParams[workspaceParams.length - 1];

        const titles: Record<string, string> = {
          breakdown: "Script Breakdown | Scenoo",
          linescript: "Line Script | Scenoo",
          shotlist: "Shotlist | Scenoo",
        };
        return { title: titles[module] || "Workspace | Scenoo" };
      }

      export default async function WorkspaceModulePage({ params }: PageProps) {
        const resolvedParams = await params;
        const workspaceParams = resolvedParams.workspaceParams || [];

        // A valid workspace URL must have at least projectSlug, scriptId, and module
        if (workspaceParams.length < 3) {
          notFound();
        }

        // Extract variables from the catch-all array
        const module = workspaceParams[workspaceParams.length - 1];
        // const scriptId = workspaceParams[workspaceParams.length - 2];
        // const projectSlugArr = workspaceParams.slice(0, -2);

        switch (module) {
          case "breakdown":
            return <BreakdownContainer />;
          case "linescript":
            return <LineScriptContainer />;
          case "shotlist":
            return <ShotlistContainer />;
          default:
            notFound();
        }
      }
      ```
    </file>

    <file path="components/layout/WorkspaceHeader.tsx">
      ```tsx
      'use client';

      import Link from 'next/link';
      import { useParams } from 'next/navigation';

      export default function WorkspaceHeader() {
        const params = useParams();
        const workspaceParams = params.workspaceParams as string[] | undefined;

        // Fallback defaults
        let projectSlugStr = 'default';
        let safeScriptId = 'v1';
        let currentModule = 'breakdown';

        // Reconstruct variables from the catch-all array
        if (workspaceParams && workspaceParams.length >= 3) {
          currentModule = workspaceParams[workspaceParams.length - 1];
          safeScriptId = workspaceParams[workspaceParams.length - 2];
          projectSlugStr = workspaceParams.slice(0, -2).join('/');
        }

        const baseUrl = `/workspace/${projectSlugStr}/${safeScriptId}`;

        const NAV_TABS = [
          { id: 'breakdown', label: 'Breakdown', href: `${baseUrl}/breakdown` },
          { id: 'linescript', label: 'Line Script', href: `${baseUrl}/linescript` },
          { id: 'shotlist', label: 'Shotlist', href: `${baseUrl}/shotlist` },
        ] as const;

        return (
          <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-white border-b border-[#E5E7EB] z-30">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
              <Link href="/projects" className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </Link>
              <span className="text-[#191b23] text-sm font-semibold tracking-tight">Scenoo Workspace</span>
            </div>

            {/* Center: Tabs */}
            <nav className="flex h-full gap-8">
              {NAV_TABS.map((tab) => {
                const isActive = currentModule === tab.id;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`text-sm font-medium flex items-center h-full border-b-2 transition-colors ${
                      isActive
                        ? 'text-[#0058be] border-[#0058be]'
                        : 'text-[#424754] border-transparent hover:text-[#191b23]'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">help</span>
              </button>
              <button className="text-[#424754] hover:text-[#191b23] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center text-white text-xs font-semibold shadow-sm ml-2">
                TP
              </div>
            </div>
          </header>
        );
      }
      ```
    </file>
  </files_to_overwrite>

  <instructions>
    1. Physically DELETE the folder `app/(workspace)/workspace/[...projectSlug]` and its children.
    2. Apply the file creation and overwrites above.
  </instructions>
</system_prompt>
</file>

</files>
