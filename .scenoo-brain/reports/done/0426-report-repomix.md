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
0426_0810_report_session-image-fix.md
0426_0832_report_fix-shotlist-layout.md
0426_0842_report_phase3-linescript.md
0426_0920_report-phase4-breakdown-completion.md
0426_1138_report-step1-sidebar-dashboard.md
0426_1140_report-step2-workspace-header.md
0426_1202_report_step2b-sidebar-persist.md
0426_1206_report_step2c-sidebar-glitch-fix.md
0426_1217_report_step2d-sidebar-route-logic.md
0426_1252_report_step2e-workspace-route-group.md
0426_1315_report_project-versions.md
0426_1335_report_step4-smart-import-modal.md
0426_1436_report_step5-delete-project-modal.md
0426_1445_report_fix-project-card-layer.md
0426_1502_report_fix-avatar-sizes.md
0426_1512_report_ui-cleanup-force-overwrite.md
0426_1555_step6-slugify-routing.md
0426_1638_report_versions-ui-update.md
0426_1642_report_add-edit-script-menu.md
0426_1700_report_fix-script-info-modal.md
0426_1802_report_sidebar-routes.md
0426_1834_report_crew-module-ui.md
0426_1910_report_invite-modal-enter-only.md
0426_1915_report_invite-modal-enter-only.md
0426_1923_report_crew-rbac-implementation.md
0426_1947_report_shared-url-and-script-rbac.md
0426_1951_report_fix-script-card-and-modal.md
0426_2030_share-project-modal.md
0426_2039_report_share-modal-multi-email.md
0426_2047_report_script-level-sharing-rbac.md
0426_2100_report_fix-script-rbac-strict-check.md
0426_2125_report_share-modal-ui-fixes.md
0426_2152_report_fix-modal-zindex.md
0426_2210_report_replace-status-with-role.md
0426_2320_report_build-settings-tab.md
0426_2345_report_refactor-settings-routing.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0426_0810_report_session-image-fix.md">
# Session Report — April 26, 2026

**Session Start:** ~20:26 (local)
**Agent:** GitHub Copilot (Claude Sonnet 4.6)

---

## What Was Done

### Problem Identified
Terminal logs showed repeated `⨯ upstream image response failed ... 400` errors for URLs from `lh3.googleusercontent.com/aida-public/...`. These are Google AI-generated placeholder image URLs that had **expired** and were returning HTTP 400, causing Next.js Image Optimization to fail and log errors on every page load.

### Root Cause
All mock/placeholder images across the app were sourced from Google's `aida-public` CDN (used by AI design tools to generate image prototypes). These URLs are **ephemeral** — they expire after a short period and are not intended for production use. There was no fallback.

---

## Files Modified

### 1. `next.config.ts`
- **Before:** `remotePatterns` only allowed `lh3.googleusercontent.com`
- **After:** Replaced with two stable placeholder services:
  - `picsum.photos` — for scene/project thumbnails and blog images
  - `i.pravatar.cc` — for user/team member avatars

### 2. `app/dashboard/page.tsx`
- **Before:** All 5 `MOCK_PROJECTS` entries had `lh3.googleusercontent.com` thumbnail URLs and avatar URLs for team members
- **After:**
  - Project thumbnails → `https://picsum.photos/seed/<slug>/800/450` (seeded for deterministic images per project)
  - Team member avatars → `https://i.pravatar.cc/100?u=<id>` (stable per user ID)

### 3. `components/landing/BlogSection.tsx`
- **Before:** 3 blog post images used expired Google URLs
- **After:** Each replaced with `https://picsum.photos/seed/<slug>/600/400`

### 4. `components/landing/HeroSection.tsx`
- **Before:** Hero mockup `<img>` tag used an expired Google URL
- **After:** Replaced with `https://picsum.photos/seed/hero-app/1200/675`

---

## What Was NOT Changed
- Component structure, styling, layout — untouched
- All `alt` text preserved as-is
- `sizes`, `fill`, `priority` props on `<Image>` components — untouched
- No refactoring, no new abstractions

---

## Outcome
- 400 errors in terminal logs are resolved
- Images now load reliably from stable placeholder CDNs
- `next.config.ts` `remotePatterns` is consistent with actual image sources in use

---

## Next Actions for Developer
- When real production assets are ready, replace `picsum.photos` / `pravatar.cc` URLs with actual hosted assets (Cloudflare R2 or similar)
- Add `r2.cloudflarestorage.com` (or your R2 public URL) to `remotePatterns` at that time
- Remove `picsum.photos` and `i.pravatar.cc` entries from `remotePatterns` once real assets are in place
</file>

<file path="0426_0832_report_fix-shotlist-layout.md">
# Report: Fix Shotlist Layout
**Date:** 2026-04-26 08:32 | **Task Type:** Sub-task (Bug Fix) | **Source:** `tasks/0426/0426_0832_fix-shotlist-layout.md`

## Task Summary
Fixed layout issue in `/shotlist` where the main container used `ml-64` (margin-left: 256px) but the sidebar component was missing, leaving blank white space on the left.

## Components Modified
| Component | Change |
|-----------|--------|
| `app/shotlist/page.tsx` | Added `AppSidebar` import; wrapped layout in flex container; rendered `<AppSidebar />` before `<main>` |

## Implementation Details
- **Import added:** `import AppSidebar from '@/components/dashboard/AppSidebar';`
- **Layout structure:** Changed from standalone `<main>` to `<div className="flex h-screen overflow-hidden">` wrapper
- **Sidebar placement:** `<AppSidebar />` positioned immediately before `<main>` tag
- **Margin preserved:** `ml-64` retained on `<main>` for proper spacing alignment

## Outstanding Technical Debt
None identified for this fix. Layout is now structurally sound.

## Next Action Items
1. Verify `/shotlist` renders correctly in browser with sidebar visible
2. Confirm no visual regressions in `ShotlistContainer` component
3. Proceed to Phase 3: Wire `DatabaseAdapter` into `ShotlistContainer` (pending separate task)

## Verification Status
- [x] Code change committed
- [ ] Browser verification (pending manual test)
- [ ] Phase 3 integration (future task)
</file>

<file path="0426_0842_report_phase3-linescript.md">
# Phase 3 — Line Script UI
**Date:** 2026-04-26  
**Task:** 0426_0842_phase3-linescript

## Status: COMPLETE ✓

## Files Created (7)

| File | Lines | Role |
|------|-------|------|
| `types/linescript.ts` | 20 | Type defs: `ActiveTool`, `LineType`, `MockScriptLine`, `MockScene` |
| `components/linescript/ScriptNavRail.tsx` | 52 | 80px collapsed icon rail — matches HTML reference exactly |
| `components/linescript/ScriptTopBar.tsx` | 44 | Top header: scene number + 3-tab nav + user icons |
| `components/linescript/FloatingToolbar.tsx` | 95 | 5-tool toolbar per feature spec (Scene Break, Lining+dropdown, Split, Annotation, Trash) |
| `components/linescript/ScriptWorkspace.tsx` | 115 | PDF card: controls bar + mock Courier script + static lining overlay |
| `components/linescript/LineScriptContainer.tsx` | 45 | State owner: activeTool, zoom, currentPage |
| `app/linescript/page.tsx` | 9 | Next.js route `/linescript` |

## Architecture Decisions

- **FloatingToolbar** is positioned as a sibling to the scrollable content div (relative to the card, not inside the scroll area) — prevents toolbar from scrolling away.
- **`"use client"`** applied only to components with hooks: `LineScriptContainer`, `FloatingToolbar`.
- **Lining dropdown** expands to the right of the toolbar button using `left-full ml-2`.
- **Tool toggle**: clicking an active tool deselects it (sets `activeTool → null`).
- **Trash** uses error color tokens (`bg-error-container`, `text-error`) to distinguish destructive intent.
- **CSS guards**: `touch-action: none; overscroll-behavior: none` applied to script content area per `coding-standards.md`.

## Design Token Compliance

All colors use `globals.css` CSS variables: `surface-container-lowest`, `surface-variant`, `primary`, `primary-container`, `on-primary-container`, `secondary`, `on-surface`, `error-container`, `on-error-container`, `inverse-surface`, `inverse-on-surface`, `outline-variant`. Zero invented values.

## Next Steps

- **Phase 4:** Wire IndexedDB adapter — persist drawn lines on create/modify.
- **Phase 4:** Integrate PDF.js for actual script rendering (replace mock Courier text).
- **Phase 4:** Integrate Fabric.js canvas overlay for real lining draw interactions.
- **Phase 4:** Implement Scene Break auto-detection from PDF.js parsed text.
</file>

<file path="0426_0920_report-phase4-breakdown-completion.md">
# Phase 4: Script Breakdown UI — Completion Report
**Completed:** 2026-04-26 02:14 UTC  
**Category:** Main Phase Task (Phase 4)

## Task Summary
Implemented the complete Script Breakdown UI module — a 3-panel layout for tagging script elements with industry-standard breakdown categories (Cast, Props, Wardrobe, SFX, Makeup, Sound, Stunts, Extras, Vehicles, Equipment, Notes).

## Components Created

### Core Types & Config
- **types/breakdown.ts** — `TagCategory`, `Scene`, `TaggedElement`, `ScriptLine`, `ScriptSegment`, `TAG_CONFIG` (12 categories with colors/icons/labels), `TAG_CATEGORIES`

### Route & Container
- **app/breakdown/page.tsx** — Route entry point
- **components/breakdown/BreakdownContainer.tsx** — Client container managing `activeSceneId` + `taggedElements` state; mock data: 3 scenes, 7 script lines, 6 tagged elements

### UI Components
- **BreakdownTopBar.tsx** — Header with "Production Dashboard" title, Breakdown/Line Script/Shotlist tabs, search bar, action buttons
- **BreakdownSceneList.tsx** — Left w-72 panel: scene cards with active highlight, INT/EXT/DAY/NIGHT labels, tag count badges
- **ScriptViewer.tsx** — Center script paper: monofont rendering with slug/action/character/dialogue indentation rules; color-highlighted tagged spans via inline styles from `TAG_CONFIG`
- **CategoryGroup.tsx** — Reusable single-category card: chip style (no note), row+badge style (with note), "No tags" empty state
- **BreakdownSidebar.tsx** — Right w-80 panel: all 12 `CategoryGroup` instances, Save/Export footer buttons
- **TagToolbar.tsx** — Fixed bottom floating bar: 12 tag buttons with category colors, hover effects, short labels

### Styling & Config
- **app/globals.css** — Added 12 `--color-tag-*` CSS tokens, `.custom-scrollbar` utility, `.script-paper` elevation shadow

### Navigation Update
- **components/linescript/ScriptTopBar.tsx** — Updated Breakdown tab href from `#` to `/breakdown`

## Architecture Decisions
- **Pure UI Phase:** No IndexedDB calls; all state is mock data in `BreakdownContainer`
- **Single Source of Truth:** `TAG_CONFIG` defines all category metadata (colors, icons, labels) — referenced by `ScriptViewer`, `CategoryGroup`, `TagToolbar`
- **Component Reuse:** Leverages existing `ScriptNavRail` (80px icon sidebar) from linescript module
- **Render Strategy:** `CategoryGroup` adapts: elements with `note` → row cards; without note → pill chips
- **Design Tokens:** All colors follow international industry standards per `feature-breakdown.md`

## Files Modified
| File | Changes |
|------|---------|
| app/globals.css | +12 tag colors, +custom-scrollbar, +script-paper |
| components/linescript/ScriptTopBar.tsx | Breakdown href: `#` → `/breakdown` |

## Files Created (9 new)
| File | Lines | Purpose |
|------|-------|---------|
| types/breakdown.ts | 65 | Type definitions + TAG_CONFIG |
| app/breakdown/page.tsx | 9 | Route entry |
| components/breakdown/BreakdownContainer.tsx | 110 | State + mock data |
| components/breakdown/BreakdownTopBar.tsx | 50 | Header |
| components/breakdown/BreakdownSceneList.tsx | 75 | Scene list panel |
| components/breakdown/ScriptViewer.tsx | 60 | Script paper |
| components/breakdown/CategoryGroup.tsx | 85 | Category card |
| components/breakdown/BreakdownSidebar.tsx | 45 | Sidebar |
| components/breakdown/TagToolbar.tsx | 85 | Floating tag bar |

## Quality Assurance
- ✅ TypeScript: Zero errors (`tsc --noEmit` passes)
- ✅ Design System: All colors match `ui-design.md` tokens
- ✅ Repository/Adapter Pattern: No direct browser API calls; ready for Phase 5 `DatabaseAdapter` integration
- ✅ Component Structure: All files <300 lines; clear separation of container/presentational logic

## Outstanding Technical Debt
None. Pure UI phase complete with no blockers.

## Next Action Items

**Phase 5: Script Breakdown — Interaction Logic**
1. Wire up text selection → tag creation (mouse `mouseup` event + Selection API)
2. Implement `DatabaseAdapter` calls for IndexedDB persistence
3. Load tagged elements from IndexedDB on `BreakdownContainer` mount
4. Implement remove tag → IndexedDB delete
5. Implement "Save Breakdown" button → local snapshot
6. Implement "Export Scene" → PDF/HTML export

**Testing Checklist:**
- [ ] Navigate to `/breakdown` — layout renders correctly
- [ ] Scene list responds to clicks
- [ ] Script viewer displays mock data with color highlights
- [ ] Tag toolbar buttons are clickable (no-op in Phase 4)
- [ ] Sidebar displays all 12 categories with mock tags
</file>

<file path="0426_1138_report-step1-sidebar-dashboard.md">
# Step 1 — Sidebar Toggle & Dashboard Cleanup

**Completed:** 2026-04-26 04:37 UTC  
**Task Type:** Sub-task (from `tasks/0426/`)  
**Status:** ✅ Complete

## Components Modified

| File | Changes |
|------|---------|
| `components/dashboard/AppSidebar.tsx` | Added `"use client"` directive, `useState(true)` toggle state, dynamic width `w-64`↔`w-20` with `transition-all duration-300`, toggle button with `chevron_left`/`menu` icons, conditional label/title/user-info rendering, design token colors applied |
| `components/dashboard/DashboardHeader.tsx` | Removed `MODULE_TABS` const and entire nav block, kept search input + notification/help buttons, updated all colors to design tokens |
| `app/dashboard/page.tsx` | Changed outer wrapper to `flex h-screen overflow-hidden`, removed `ml-64` from `<main>`, applied `flex-1 overflow-auto` to `<main>` |

## Architecture Notes

- Sidebar converted from `fixed` positioned to `shrink-0` flex child — enables dynamic width without JS margin offsets
- `DashboardHeader` `sticky top-0` works correctly inside `overflow-auto` main container
- All colors migrated to design tokens per `ui-design.md`

## Outstanding Technical Debt

None identified.

## Next Action Items

1. Run `npm run dev` and verify sidebar toggle animation in browser
2. Confirm collapsed state shows icon-only layout with centered icons
3. Test responsive behavior and edge cases
4. Proceed to Step 2 of layout refactor
</file>

<file path="0426_1140_report-step2-workspace-header.md">
# Step 2 — Unified Workspace Header & Layout Sync

**Task Category:** Main Phase Task (from `tasks/0426/0426_1140_step2-workspace-header.md`)  
**Completed:** 2026-04-26 04:51 UTC  
**Status:** ✅ Complete

---

## Summary

Executed Step 2 of the global layout refactor: created a unified `WorkspaceHeader` component and synchronized the layout across all workspace tabs (`/breakdown`, `/linescript`, `/shotlist`). Eliminated duplicate navigation, top bars, and nav rails from individual containers.

---

## Components Modified

### Created
- **`components/layout/WorkspaceHeader.tsx`**
  - `"use client"` directive
  - `usePathname()` for active-tab detection
  - Left: "Scenoo Workspace" branding
  - Center: 3 navigation tabs (Breakdown, Line Script, Shotlist) with active state styling (`#0058be` active, `#424754` inactive)
  - Right: 3 icon buttons (Help, Notifications, User Profile)
  - Height: `h-16`, border-bottom: `#E5E7EB`

### Updated Page Layouts
- **`app/breakdown/page.tsx`**
  - Added `AppSidebar` + `WorkspaceHeader` imports
  - Unified layout: `AppSidebar` → `<main>` → `WorkspaceHeader` → `BreakdownContainer`
  - Removed standalone `BreakdownContainer` render

- **`app/linescript/page.tsx`**
  - Added `AppSidebar` + `WorkspaceHeader` imports
  - Unified layout: `AppSidebar` → `<main>` → `WorkspaceHeader` → `LineScriptContainer`
  - Removed standalone `LineScriptContainer` render

- **`app/shotlist/page.tsx`**
  - Added `AppSidebar` + `WorkspaceHeader` imports
  - Unified layout: `AppSidebar` → `<main>` → `WorkspaceHeader` → `ShotlistContainer`
  - Removed redundant `ml-64` margin on `<main>`

### Updated Containers
- **`components/linescript/LineScriptContainer.tsx`**
  - Removed `ScriptNavRail` import and render
  - Removed `ScriptTopBar` import and render
  - Stripped `h-screen` wrapper and `ml-[80px]` offset
  - Root now: `flex-1 overflow-hidden relative p-8 flex justify-center`

- **`components/breakdown/BreakdownContainer.tsx`**
  - Removed `ScriptNavRail` import and render
  - Removed `BreakdownTopBar` import and render
  - Stripped `h-screen` wrapper and `ml-[80px]` offset
  - Root now: `flex-1 flex overflow-hidden relative`

- **`components/shotlist/ShotlistContainer.tsx`**
  - Removed duplicate nav tabs ("Breakdown", "Line Script", "Shotlist")
  - Removed "Production Dashboard" title
  - Replaced `h-16` header with slim `h-14` toolbar
  - Toolbar contains: search input + "New Shot" button only

---

## Architecture Notes

**Layout Chain (all workspace routes):**
```
h-screen flex row
  ├─ AppSidebar (shrink-0, w-64/w-20 toggle)
  └─ main (flex-1, flex-col)
      ├─ WorkspaceHeader (h-16, shrink-0) ← single source of truth
      └─ [Container] (flex-1, overflow-hidden)
```

**Active Tab Detection:**
- `usePathname()` returns current route
- Logic: `pathname === href || pathname.startsWith(href + '/')` prevents false positives (e.g., `/linescripts` won't match `/linescript`)
- No prop drilling or global state required

**Sidebar Integration:**
- `AppSidebar` is a flex child (`shrink-0`), not `position: fixed`
- No `ml-*` offsets needed on `<main>` — flex layout handles spacing naturally

---

## Outstanding Technical Debt

1. **Orphaned Components** (safe to delete in cleanup pass)
   - `components/linescript/ScriptNavRail.tsx` — no longer imported
   - `components/linescript/ScriptTopBar.tsx` — no longer imported
   - `components/breakdown/BreakdownTopBar.tsx` — no longer imported

2. **Notifications Button**
   - Removed from `ShotlistContainer` header during refactor
   - If per-page notifications are needed, wire through `WorkspaceHeader` right-side icons

3. **TagToolbar Position** (BreakdownContainer)
   - `TagToolbar` remains as direct child of root `div`
   - Assumed to be `position: fixed` or `absolute` — verify if layout shift occurs

---

## Next Action Items

1. **Test Navigation:**
   - Run `npm run dev`
   - Navigate between `/breakdown`, `/linescript`, `/shotlist`
   - Verify active tab highlight tracks correctly in `WorkspaceHeader`
   - Verify sidebar toggle still works

2. **Visual Regression Check:**
   - Confirm no layout shifts or overflow issues
   - Check that container content fills remaining height correctly
   - Verify search bar and action buttons in Shotlist toolbar are accessible

3. **Proceed to Step 3:**
   - Next phase: integrate container-specific toolbars or refinements as needed

---

## Files Changed Summary

| File | Change Type | Lines Modified |
|------|-------------|-----------------|
| `components/layout/WorkspaceHeader.tsx` | Created | 60 |
| `app/breakdown/page.tsx` | Updated | 10 |
| `app/linescript/page.tsx` | Updated | 10 |
| `app/shotlist/page.tsx` | Updated | 10 |
| `components/linescript/LineScriptContainer.tsx` | Updated | 45 |
| `components/breakdown/BreakdownContainer.tsx` | Updated | 140 |
| `components/shotlist/ShotlistContainer.tsx` | Updated | 30 |
| `.scenoo-brain/reports/current-status.md` | Updated | 20 |

**Total:** 7 files, ~325 lines modified/created
</file>

<file path="0426_1202_report_step2b-sidebar-persist.md">
# Step 2b — Sidebar State Persistence

**Task Category:** Sub-task (from `tasks/0426/0426_1158_step2b-sidebar-persist.md`)  
**Completion Time:** 2026-04-26 05:02 UTC  
**Status:** ✅ Complete

## Components Modified

- `components/dashboard/AppSidebar.tsx`

## Changes Summary

### State Management
- Added `isMounted` state (initialized `false`) to guard against hydration mismatch.
- `isExpanded` remains initialized to `true` (SSR-safe default).
- Added `useEffect` hook that:
  - Reads `localStorage.getItem('scenoo_sidebar_expanded')` on mount.
  - Corrects `isExpanded` if a stored value exists.
  - Sets `isMounted = true` to signal client-side readiness.

### localStorage Integration
- Defined constant `SIDEBAR_KEY = 'scenoo_sidebar_expanded'`.
- New `handleToggle()` function:
  - Toggles `isExpanded` state.
  - Writes new state to localStorage as string (`"true"` or `"false"`).
- Button `onClick` wired to `handleToggle()`.

### Hydration Safety
- CSS transition class `transition-all duration-300` is conditionally applied only when `isMounted === true`.
- Prevents visual width-slide flash on first paint when sidebar restores from localStorage.

## Technical Debt

None identified.

## Next Action Items

1. Proceed to Step 3 of the layout refactor (per task spec).
2. Test sidebar persistence across page reloads in development environment.
</file>

<file path="0426_1206_report_step2c-sidebar-glitch-fix.md">
# Sidebar Hydration Glitch Fix — Step 2c

**Task Category:** Sub-task / Bug Fix (from `tasks/0426/`)  
**Completion Time:** 2026-04-26 05:22 UTC  
**Status:** ✅ COMPLETE

---

## Task Summary
Fixed hydration animation glitch in AppSidebar where the sidebar would flash from expanded → collapsed on page reload due to transition classes being enabled simultaneously with state changes.

## Components Modified
- `components/dashboard/AppSidebar.tsx`

### Changes Made
1. **Introduced `enableTransition` state** — separate from `isMounted`, controls when CSS transitions are active
2. **Decoupled width snap from transition activation** — used `setTimeout(50ms)` to delay transition enablement
3. **Removed `isMounted` state** — no longer needed; `enableTransition` now gates the `transition-all duration-300` class

### Technical Details
- **Before:** `setIsExpanded` + `setIsMounted(true)` fired in same React 18 batch → transition class enabled at same time as width change → browser animated the snap
- **After:** `setIsExpanded` fires immediately (no transition), then 50ms later `setEnableTransition(true)` activates transitions for user interactions only

## Outstanding Technical Debt
None identified.

## Next Action Items
1. **Manual verification:** Reload dashboard page and confirm sidebar no longer flashes on hard refresh
2. **Test user interactions:** Verify toggle button still animates smoothly after initial load
3. Proceed to next layout refinement task if glitch is resolved
</file>

<file path="0426_1217_report_step2d-sidebar-route-logic.md">
# Step 2d — Route-Specific Sidebar State Logic

**Task Category**: Sub-task (from `tasks/0426/0426_1217_step2d-sidebar-route-logic.md`)  
**Completion Time**: 2026-04-26 05:30 UTC  
**Status**: ✅ VERIFIED COMPLETE

## Summary
Verified that all 5 target files were already fully compliant with Step 2d specification. No modifications required.

## Components Verified
1. **`components/dashboard/AppSidebar.tsx`**
   - Props: `defaultExpanded?: boolean` (default `true`), `persistKey?: string`
   - Logic: localStorage gating behind `persistKey` check; falls back to `defaultExpanded` if no stored value
   - Hydration fix: `enableTransition` + `setTimeout(50)` preserved

2. **`app/dashboard/page.tsx`**
   - Renders: `<AppSidebar defaultExpanded={true} />` (no `persistKey`)
   - Behavior: Always expanded on reload

3. **`app/breakdown/page.tsx`**
   - Renders: `<AppSidebar defaultExpanded={false} persistKey="scenoo_workspace_sidebar_state" />`
   - Behavior: Defaults collapsed, state persisted across workspace tabs

4. **`app/linescript/page.tsx`**
   - Renders: `<AppSidebar defaultExpanded={false} persistKey="scenoo_workspace_sidebar_state" />`
   - Behavior: Defaults collapsed, state persisted across workspace tabs

5. **`app/shotlist/page.tsx`**
   - Renders: `<AppSidebar defaultExpanded={false} persistKey="scenoo_workspace_sidebar_state" />`
   - Behavior: Defaults collapsed, state persisted across workspace tabs

## Architecture Notes
- Single `persistKey` value shared across all 3 workspace routes ensures sidebar state persists as user switches between Breakdown / LineScript / Shotlist.
- Dashboard intentionally has no `persistKey` — resets to expanded on every reload.
- SSR-safe: localStorage reads/writes only occur client-side in `useEffect`.

## Technical Debt
None identified.

## Next Action
Proceed to Step 3 of the layout refactor.
</file>

<file path="0426_1252_report_step2e-workspace-route-group.md">
# Step 2e — Workspace Route Group Refactor

**Completed:** 2026-04-26 05:51 UTC  
**Task Type:** Sub-task (from `tasks/0426/0426_1248_step2e-workspace-route-group.md`)  
**Category:** Layout Architecture Refactor

---

## Summary

Refactored workspace routing using Next.js Route Groups to eliminate `AppSidebar` remount on tab switches. Moved `/breakdown`, `/linescript`, `/shotlist` into `app/(workspace)/` and created a shared layout that persists the sidebar across client-side navigation.

---

## Components Modified

### Created
- **`app/(workspace)/layout.tsx`** — Shared layout with `AppSidebar` (no `persistKey`) + `WorkspaceHeader` + `{children}`. Uses design token classes (`bg-background text-on-background`).

### Moved (Directory Structure)
- `app/breakdown` → `app/(workspace)/breakdown`
- `app/linescript` → `app/(workspace)/linescript`
- `app/shotlist` → `app/(workspace)/shotlist`

### Stripped (Page Files)
- **`app/(workspace)/breakdown/page.tsx`** — Removed layout wrapper, `AppSidebar`, `WorkspaceHeader` imports. Now returns `<BreakdownContainer />` only.
- **`app/(workspace)/linescript/page.tsx`** — Same pattern.
- **`app/(workspace)/shotlist/page.tsx`** — Same pattern.

---

## Key Behavior Changes

| Before | After |
|--------|-------|
| Each page file duplicated layout shell + sidebar/header | Single shared layout in `app/(workspace)/layout.tsx` |
| `AppSidebar` mounted/unmounted on every tab switch | `AppSidebar` persists across tab navigation |
| `persistKey` used in all 3 pages | `persistKey` removed; sidebar resets on F5, preserves state on client nav |
| URL paths: `/breakdown`, `/linescript`, `/shotlist` | URL paths unchanged (route groups don't affect URLs) |

---

## Outstanding Technical Debt

- **Orphaned components:** `ScriptNavRail.tsx`, `ScriptTopBar.tsx`, `BreakdownTopBar.tsx` are no longer imported. Safe to delete after confirming no other references.
- **Notifications button:** Was removed from Shotlist during Step 2. If needed per-page, wire through `WorkspaceHeader` right icons.

---

## Next Action Items

1. **Test in dev server:** Run `npm run dev`, navigate between `/breakdown`, `/linescript`, `/shotlist` tabs.
2. **Verify sidebar behavior:** Confirm sidebar does NOT flicker/remount on tab switch. Verify F5 reload collapses sidebar, client nav preserves state.
3. **Proceed to Step 3:** Once verified, continue with the next phase of the layout refactor.

---

## Architecture Notes

- Route groups (`(workspace)`) are a Next.js feature that groups routes without affecting the URL structure.
- Removing `persistKey` is intentional per spec: hard reload (F5) always collapses sidebar; client-side navigation naturally preserves React state since `AppSidebar` no longer unmounts.
- `metadata` exports preserved in each page file — these are Server Component metadata, compatible with the new layout.
</file>

<file path="0426_1315_report_project-versions.md">
# Report: Step 3 — Dynamic Route for Project Versions

## Task/Bug Name
Step 3 — Dynamic Route for Project Versions

## Components Modified
- `components/dashboard/ProjectCard.tsx`
- `app/projects/[id]/page.tsx`

## Outstanding Technical Debt
- Version data is currently hardcoded as mock objects; it needs to be connected to the real project/script version store.
- The `/projects/[id]` route currently redirects versions to `/breakdown` without preserving a selected project context.

## Next Action Items
1. Implement real version metadata syncing from the local project database.
2. Update version cards to navigate into the workspace with project-specific state.
3. Add import/script upload handling for the new Project Versions page.
</file>

<file path="0426_1335_report_step4-smart-import-modal.md">
# Step 4 — Smart Import Modal

**Completed:** 2026-04-26 13:35 ICT  
**Category:** Main Phase Task (from `tasks/0426/0426_1335_step4-smart-import-modal.md`)

## Task Summary
Build the Smart Import Modal UI and wire it to the Project Versions page. Modal accepts file upload, version name input, and Smart Transfer version selection. Integrate modal state into the existing Project Versions page without disrupting the version grid.

## Components Modified

### Created
- **`components/projects/ImportScriptModal.tsx`**
  - Client component with `isOpen` / `onClose` props
  - Guard: `!isOpen → return null`
  - Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50`
  - Modal container: `bg-white border border-outline-variant rounded-xl shadow-2xl w-full max-w-lg`
  - Sections:
    - Header: Title + close icon button
    - Body: File dropzone (dashed border, `upload_file` icon), version name input (pre-filled: `260426_NeonNights_Script_Draft_v2`), Smart Transfer select (options: None, Draft 1, Shooting Script) + `auto_awesome` helper box
    - Footer: Cancel (secondary) + Import (primary) buttons
  - Design tokens: `border-outline-variant`, `bg-primary`, `text-on-primary`, `bg-primary-fixed/30`, `text-on-surface`, `text-on-surface-variant`

### Modified
- **`app/projects/[id]/page.tsx`**
  - Added imports: `useState` from react, `ImportScriptModal` from components
  - Added state: `const [isModalOpen, setIsModalOpen] = useState(false)`
  - Wired Import Script button: `onClick={() => setIsModalOpen(true)}`
  - Rendered modal: `<ImportScriptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />` inside root div
  - Version grid: **unchanged**

## Outstanding Technical Debt

1. **File dropzone is static UI only** — No `<input type="file">` or drag event handlers implemented. Requires Step 5 integration.
2. **Import button has no action handler** — Button renders but does not trigger import logic. Requires backend/state management in Step 5.
3. **Smart Transfer select has no logic** — Dropdown renders with mock options but does not execute version comparison or data transfer. Requires Step 5 implementation.

## Next Action Items

1. **Step 5:** Implement file upload handler + drag-and-drop logic for the dropzone
2. **Step 5:** Wire Import button to trigger version creation + Smart Transfer data migration
3. **Step 5:** Implement Smart Transfer logic to compare versions and transfer Breakdown/LineScript/Shotlist data
4. **Testing:** Verify modal opens/closes correctly, form inputs are accessible, design tokens render as expected
</file>

<file path="0426_1436_report_step5-delete-project-modal.md">
# Step 5 — Delete Project Modal & Dropdown Menu

**Completed:** 2026-04-26 14:36 ICT  
**Category:** Main Phase Task (Step 5 of Dashboard UI Implementation)

## Task Summary
Implemented the Delete Project flow from the Project Card's 3-dot menu, including a dropdown menu with Edit/Delete options and a confirmation modal with 30-day trash warning.

## Components Modified

### `components/dashboard/ProjectCard.tsx`
- Added `"use client"` directive
- Imported `useState` from React
- Added `onEditClick` and `onDeleteClick` props to interface
- Implemented `isMenuOpen` state toggle on 3-dot button click
- Rendered dropdown menu with invisible overlay (z-10) and menu container (z-20, `absolute top-12 right-3`)
- Both menu buttons use `e.preventDefault()` to block `<Link>` navigation
- Edit Project button: neutral styling
- Delete Project button: error color (`text-error`, `hover:bg-error-container`)

### `components/dashboard/ProjectGrid.tsx`
- Added `onDeleteProjectClick` and `onEditProjectClick` to `ProjectGridProps` interface
- Updated function signature to destructure both new props
- Threaded both handlers down to `<ProjectCard>` component

### `app/dashboard/page.tsx`
- Added `"use client"` directive
- Imported `useState` and `DeleteProjectModal`
- Added `isDeleteModalOpen` state management
- Passed `onDeleteProjectClick={() => setIsDeleteModalOpen(true)}` to `<ProjectGrid>`
- Passed `onEditProjectClick={() => {}}` as placeholder (no-op for now)
- Rendered `<DeleteProjectModal>` at root level with state handlers

## Components Created

### `components/projects/DeleteProjectModal.tsx`
- Client component with `isOpen`, `onClose`, `onConfirm` props
- Guard: returns `null` if `!isOpen`
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50`
- Modal container: `bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm`
- Header: Title "Delete Project" + close icon button
- Body: Warning text "This project will be kept in the Trash tab for 30 days before being permanently deleted." (`text-body-md text-on-surface-variant`)
- Footer: Cancel button (secondary style) + Move to Trash button (`bg-error text-on-error hover:opacity-90`)

## Design Tokens Applied
- `bg-surface-container-lowest`, `border-outline-variant`, `text-on-surface`, `text-on-surface-variant`, `text-error`, `bg-error-container`, `text-on-error`

## Outstanding Technical Debt

1. **Delete Logic Not Wired** — `onConfirm` in the modal currently just closes the modal. Actual project deletion (moving to trash state in IndexedDB) is not implemented.
2. **Edit Modal Missing** — `onEditProjectClick` is a no-op placeholder. Edit Project modal needs to be created in a future step.
3. **Trash State Management** — No IndexedDB schema or filtering logic exists yet to handle `status: "trashed"` projects.

## Deviations from Spec

- Spec targeted `app/projects/page.tsx` for Step 4 — that file does not exist in the current codebase. Changes were applied to `app/dashboard/page.tsx` (the actual host of `ProjectGrid`).
- `onEditClick` prop was added to `ProjectCard` (not in original spec) because the dropdown menu references it — omitting it would cause a runtime crash.

## Next Action Items

1. Implement actual delete logic in `onConfirm` handler — move selected project to IndexedDB with `status: "trashed"`.
2. Filter trashed projects from the active project list in `ProjectGrid`.
3. Create Edit Project modal and wire `onEditProjectClick` handler.
4. Add Trash tab to dashboard to display deleted projects with restore/permanent delete options.
</file>

<file path="0426_1445_report_fix-project-card-layer.md">
# Report: Fix ProjectCard Dropdown Layering & Positioning

**Task:** `0426_1445_fix-project-card-layer`  
**Time (VN/UTC+7):** 2026-04-26 14:45

## Changes Made

**File:** `components/dashboard/ProjectCard.tsx`

1. **Removed `overflow-hidden` from root div** — was clipping the dropdown below card boundaries.
2. **Added `rounded-t-xl overflow-hidden` to thumbnail wrapper** — preserves rounded top corners without relying on parent clipping.
3. **Wrapped `<button>` + menu in `<div className="relative z-50">`** — establishes a stacking context above the thumbnail; anchors dropdown positioning to the button instead of the root card.
4. **Dropdown position changed:** `absolute top-12 right-3` → `absolute top-full right-0 mt-2` — now anchors flush below the button.
5. **Z-index corrected:** overlay `z-10` → `z-40`, dropdown `z-20` → `z-50` — dropdown always renders above the overlay, overlay captures outside clicks.

## Result

- Dropdown appears directly below the 3-dots button, not floating at a fixed card offset.
- Dropdown is never clipped by parent `overflow-hidden`.
- Menu items are clickable (z-50 > overlay z-40).
- All `e.preventDefault()` calls preserved to block Next.js Link navigation.
</file>

<file path="0426_1502_report_fix-avatar-sizes.md">
# Report: Fix Avatar Image Sizes Prop
**Timestamp:** 2026-04-26 15:02 (UTC+7)

## Task
Added missing `sizes` prop to team member avatar `<Image>` components in `ProjectCard.tsx`.

## Changes
- **File:** `components/dashboard/ProjectCard.tsx`
- **Line:** Avatar `<Image>` inside `project.teamMembers.map`
- **Change:** Added `sizes="24px"` to suppress Next.js Image Optimization warning (`fill` without `sizes`)

## Result
- Terminal warning eliminated.
- No logic changes; only the missing prop added.

## Next Step
None. Task complete.
</file>

<file path="0426_1512_report_ui-cleanup-force-overwrite.md">
# UI Cleanup & Route Migration — Report

**Task Category:** Sub-task (from `tasks/0426/0426_1507_ui-cleanup-force-overwrite.md`)  
**Completed:** 2026-04-26 15:12 ICT (UTC+7)

---

## Task Summary
Force-overwrite execution of route migration (`/dashboard` → `/projects`) and UI cleanup across sidebar, landing header, project grid, and new project card components. Created `ProjectInfoModal` for project creation flow.

## Components Modified

| File | Changes |
|------|---------|
| `app/dashboard/page.tsx` | Moved to `app/projects/page.tsx`; added `ProjectInfoModal` import and state management |
| `components/dashboard/AppSidebar.tsx` | "Cinematic Utility" → "Scenoo"; Projects href `/dashboard` → `/projects` |
| `components/landing/LandingHeader.tsx` | All `/dashboard` hrefs → `/projects` (2 occurrences) |
| `components/dashboard/NewProjectCard.tsx` | Added `onClick: () => void` prop; text "Start New Production" → "New Project" |
| `components/dashboard/ProjectGrid.tsx` | Added `onNewProjectClick` prop; removed inline "New Project" button; wired `onClick` to `NewProjectCard` |
| `components/projects/ProjectInfoModal.tsx` | **Created** — overlay modal with 4 text inputs, image dropzone, Cancel/Save footer |

## Outstanding Technical Debt

- **Data Persistence:** `ProjectInfoModal.handleSave()` currently closes without persisting to IndexedDB. Needs integration with project creation model once defined.
- **Function Rename:** `DashboardPage` → `ProjectsPage` for semantic clarity (already applied).

## Next Action Items

1. Verify `/projects` route loads in dev server (`npm run dev`)
2. Test `NewProjectCard` click opens `ProjectInfoModal`
3. Confirm Save button disabled until project name entered
4. Integrate `ProjectInfoModal` with IndexedDB project creation flow
</file>

<file path="0426_1555_step6-slugify-routing.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your exact goal is to implement slug-based routing for projects and update the breadcrumb UI.
  </role>

  <task>
    Execute Sub-task: Data Extraction & Slugify Routing.
    
    You MUST perform the following steps:

    1. Create `lib/utils.ts`:
       - Write and export a robust `slugify` function.
       - It MUST handle Vietnamese diacritics (e.g., convert "á, à, ả, ã, ạ, â, ă" to "a", "đ" to "d", "ơ, ô" to "o", etc.).
       - It MUST convert the string to lowercase.
       - It MUST replace spaces with hyphens `-`.
       - It MUST remove all special characters (like `, ? > < ! @ # $ % ^ & *`).

    2. Create `lib/mock-data.ts`:
       - Extract the `MOCK_PROJECTS` array and the `Project` type import from `app/projects/page.tsx` into this new file.
       - Export `MOCK_PROJECTS`.

    3. Update `app/projects/page.tsx`:
       - Import `MOCK_PROJECTS` from `@/lib/mock-data`.
       - Ensure no other logic breaks.

    4. Update `components/dashboard/ProjectCard.tsx`:
       - Import the `slugify` function from `@/lib/utils`.
       - Change the Next.js `<Link href={...}>` to use `/projects/${slugify(project.title)}` instead of `project.id`.

    5. TERMINAL COMMAND: Rename the dynamic route folder:
       `mv app/projects/\[id\] app/projects/\[slug\]`

    6. Update `app/projects/[slug]/page.tsx` (formerly `[id]/page.tsx`):
       - Import `MOCK_PROJECTS` from `@/lib/mock-data` and `slugify` from `@/lib/utils`.
       - Destructure `slug` from `params`.
       - Find the current project: `const currentProject = MOCK_PROJECTS.find(p => slugify(p.title) === slug);`
       - Update the Breadcrumb UI: Find `<span className="text-h3 text-on-surface">Project 1</span>` and replace "Project 1" with `{currentProject?.title || "Unknown Project"}`.
  </task>

  <constraints>
    - Run the terminal folder rename command BEFORE rewriting the `[slug]/page.tsx` file.
    - Output the full, complete source code for all modified and created files (`lib/utils.ts`, `lib/mock-data.ts`, `app/projects/page.tsx`, `ProjectCard.tsx`, and `app/projects/[slug]/page.tsx`).
    - DO NOT use placeholder comments.
  </constraints>
</system_prompt>
</file>

<file path="0426_1638_report_versions-ui-update.md">
# Report: Project Versions UI Update

**Completed:** 2026-04-26 16:38 ICT (UTC+7)  
**Task Type:** Ad-hoc Sub-task (from `tasks/0426/0426_1645_versions-ui-update.md`)  
**Target File:** `app/projects/[slug]/page.tsx`

---

## Task Summary

Executed full design spec overwrite for Project Versions page. Migrated from legacy `useParams` hook to modern `use(params)` pattern, removed header Import button, replaced status badges with per-card dropdown menus, and added Delete Confirmation Modal.

---

## Components Modified

| File | Changes |
|------|---------|
| `app/projects/[slug]/page.tsx` | Full overwrite: `useParams` → `use(params)` + `PageProps` interface; sticky header (breadcrumb + notification/help icons); removed Import Script button; replaced `STATUS_STYLES` badges with `more_vert` 3-dots dropdown per card; added Delete Confirmation Modal (z-50, 30-day trash message); dashed "New Version" card appends to grid with `onClick → setIsImportModalOpen(true)` |

---

## Outstanding Technical Debt

1. **Delete Action (UI-only):** No IndexedDB soft-delete implemented. When local DB is wired, implement `markVersionAsDeleted()` in IndexedDB and wire dropdown action.
2. **Accessibility:** Dropdown menu has no keyboard trap, focus management, or ARIA labels. Add `role="menu"`, `aria-expanded`, and keyboard navigation (Escape to close, arrow keys to navigate).
3. **State Management:** `activeMenuId` is component-level state. Consider moving to context if multiple dropdowns appear across the app.

---

## Next Action Items

1. **Dev Server Verification:** Run dev server and test:
   - 3-dots menu opens/closes per card
   - "Delete Script" → confirmation modal appears
   - Dashed card → ImportScriptModal opens
   - Header no longer displays Import Script button

2. **Accessibility Pass:** Add keyboard trap and ARIA attributes to dropdown.

3. **IndexedDB Integration:** Wire delete action to soft-delete in local DB when ready.

---

## Notes

- Removed `STATUS_STYLES` constant (no longer used).
- Migrated from `useParams()` hook to `use(params)` for better async handling in Next.js 15+.
- Delete modal is fully styled per design tokens (error color, backdrop blur, shadow).
</file>

<file path="0426_1642_report_add-edit-script-menu.md">
# Report: Add Edit Script Menu + Enforce Layering

**Task ID**: 0426_1650  
**Completed**: 2026-04-26 16:42 ICT (UTC+7)  
**Category**: Ad-hoc sub-task (from `tasks/0426/`)

---

## Task Summary

Updated the script version card's dropdown menu to include an "Edit Script" option and enforced strict z-index layering rules to prevent clipping.

---

## Components Modified

| File | Changes |
|------|---------|
| `app/projects/[slug]/page.tsx` | Menu wrapper `z-20` → `z-50`; overlay `z-30` → `z-40`; dropdown `z-40` → `z-50` + `flex flex-col`; added "Edit Script" button above "Delete Script"; removed stale header comment |

---

## Technical Implementation

- **Z-Index Stack**: Wrapper (50) > Overlay (40) > Dropdown (50) — ensures dropdown floats freely outside card bounds without clipping
- **Menu Structure**: "Edit Script" (neutral styling) positioned above "Delete Script" (error styling)
- **Card Layout**: No `overflow-hidden` on parent card — allows dropdown to extend beyond card boundaries

---

## Outstanding Technical Debt

- "Edit Script" button has no navigation handler — needs wiring to script editor route when implemented
- No keyboard trap or focus management on dropdown (accessibility debt)

---

## Next Action Items

1. Verify in dev server: dropdown shows both "Edit Script" and "Delete Script"
2. Confirm dropdown floats outside card bounds without clipping
3. Wire "Edit Script" button to script editor route (future task)
</file>

<file path="0426_1700_report_fix-script-info-modal.md">
# Fix Script Info Modal Layering & Wiring

**Completed:** 2026-04-26 17:00 ICT (UTC+7)  
**Category:** Ad-hoc sub-task (from `tasks/0426/`)

---

## Task Summary

Resolved z-index conflict between ImportScriptModal and dropdown menu, renamed modal title, and wired "Edit Script" button to open the modal.

---

## Components Modified

### `components/projects/ImportScriptModal.tsx`
- **Line 12:** Root overlay z-index `z-50` → `z-[100]` (ensures modal renders above dropdown)
- **Line 16:** Modal title "Import Script" → "Script Information"

### `app/projects/[slug]/page.tsx`
- **Line 102:** "Edit Script" button `onClick` handler now calls `setIsImportModalOpen(true)` alongside `setActiveMenuId(null)`

---

## Technical Debt

- **Z-index Discrepancy:** Task spec specified `z-[1]` for modal overlay, but `z-index: 1` is lower than the dropdown's `z-50`. Implemented `z-[100]` to match stated intent ("sits above z-50 dropdown"). Confirm with task author if `z-[1]` was intentional.

---

## Next Action Items

1. **Dev Server Verification:**
   - Open any script card's 3-dots menu
   - Click "Edit Script"
   - Confirm modal title reads "Script Information"
   - Confirm modal renders above dropdown overlay without z-index conflict

2. **Follow-up:** Clarify z-index spec (`z-[1]` vs `z-[100]`) with task author if needed
</file>

<file path="0426_1802_report_sidebar-routes.md">
# Task: Add Sidebar Routes & Active State

## Components Modified
- `components/dashboard/AppSidebar.tsx`
- `app/assets/page.tsx`
- `app/crew/page.tsx`
- `app/archive/page.tsx`
- `app/settings/page.tsx`

## Description
Implemented sidebar route handling and active state logic for the new dashboard sections. Added four route pages with a consistent layout using `AppSidebar` and `DashboardHeader`, each displaying a centered "Coming Soon" placeholder.

## Outstanding Technical Debt
- None introduced. The new route pages are placeholder UIs and do not yet include feature content.

## Next Action Items
- Verify the dev server navigation behavior for `/assets`, `/crew`, `/archive`, and `/settings`.
- Confirm the sidebar active state highlights the correct route when navigating between pages and that `/projects` remains active on the projects page.
</file>

<file path="0426_1834_report_crew-module-ui.md">
# Crew Module UI Report

## Task/Bug Name
Crew Module UI (0426_1822)

## Components Modified
- `app/crew/page.tsx`
- `app/crew/[slug]/page.tsx`
- `.scenoo-brain/reports/current-status.md`

## Outstanding Technical Debt
- The Owner row is hardcoded as `Tri Pham` with an amber avatar. This should be replaced with authenticated session data once Cloudflare D1 authentication is connected.
- The `Add User Seat` button is currently a UI placeholder and needs a real invite/seating workflow integration later.

## Next Action Items
1. Run the dev server and verify `/crew` renders the project selection grid.
2. Click a project card and confirm the breadcrumb shows `Crew > {Project Title}`.
3. Confirm the Owner row displays correctly on the project crew page and that the button styling matches the design.
</file>

<file path="0426_1910_report_invite-modal-enter-only.md">
# Report: InviteUserModal — Enter-Only Chip Input

**Task Category:** Ad-hoc Sub-task (from `tasks/0426/`)  
**Completed:** 2026-04-26 19:10 ICT (UTC+7)

---

## Summary

Refined the multi-email invite modal to accept Enter as the sole chip trigger (removed comma). Updated helper text and placeholder for clarity.

---

## Components Modified

| File | Change |
|------|--------|
| `components/crew/InviteUserModal.tsx` | Removed `e.key === ","` condition from `handleKeyDown`; Enter is now the only chip trigger; placeholder simplified to `"colleague@example.com"`; helper text updated to "Press Enter to add multiple emails." |

---

## Technical Debt

- None introduced.

---

## Next Action Items

1. **Dev Server Verification:**
   - Type an email → press comma → confirm NO chip is created
   - Type an email → press Enter → confirm chip appears and input clears
   - Verify placeholder text matches updated helper text

2. **Integration Testing:**
   - Navigate to `/crew/{slug}` → click "Add User Seat"
   - Test multi-email flow with Enter-only trigger
   - Confirm Send Invite button enables/disables correctly

---

## Related Tasks

- **0426_1900:** Multi-Email Invite & Shared Project Security (parent task)
- **0426_1845:** Crew Invite Modal & Dashboard Split (foundational)
</file>

<file path="0426_1915_report_invite-modal-enter-only.md">
# Task Report: InviteUserModal — Enter-Only Chip

**Task Category**: Ad-hoc sub-task (from `tasks/0426/`)  
**Completed**: 2026-04-26 19:15 ICT (UTC+7)

---

## Task Summary
Refined multi-email input behavior in `InviteUserModal` to accept Enter key only (removed comma trigger).

## Components Modified
- **`components/crew/InviteUserModal.tsx`**
  - `handleKeyDown`: removed `e.key === ","` condition — Enter is now the sole chip trigger
  - Placeholder text: `"colleague1@example.com, colleague2@..."` → `"colleague@example.com"`
  - Helper text: `"Press Enter or comma to add multiple emails."` → `"Press Enter to add multiple emails."`

## Outstanding Technical Debt
- None introduced.

## Next Action Items
1. Verify in dev server: type email → press comma → confirm NO chip created
2. Verify in dev server: type email → press Enter → confirm chip appears
3. Test full invite flow: add multiple emails via Enter → click "Send Invite" → confirm modal closes and resets
</file>

<file path="0426_1923_report_crew-rbac-implementation.md">
# Crew RBAC Implementation — Report

**Completed:** 2026-04-26 19:23 ICT (UTC+7)  
**Task Type:** Ad-hoc sub-task (`tasks/0426/0426_1917_crew-rbac-implementation.md`)

---

## Summary

Implemented Role-Based Access Control (RBAC) for the Crew Management module. Added `ProjectRole` type system, assigned roles to all mock projects, split crew project selection into "My Projects" and "Shared with me (Manageable)" sections with strict RBAC filtering, and wired role selection into the invite modal.

---

## Components Modified

| File | Change |
|------|--------|
| `types/project.ts` | Added `ProjectRole = "Owner" \| "Manager" \| "User"` type; added `currentUserRole?: ProjectRole` to `Project` interface |
| `lib/mock-data.ts` | Assigned `currentUserRole` to all 5 mock projects: Owners get "Owner", Shadow Protocol gets "Manager", Urban Pulse gets "User" |
| `app/crew/page.tsx` | Extracted `ProjectList` sub-component; split page into "My Projects" (`isOwner !== false`) and "Shared with me (Manageable)" (`isOwner === false && currentUserRole === "Manager"`) sections |
| `components/crew/InviteUserModal.tsx` | Added `selectedRole: ProjectRole` state; added "Assign Role" radio group (User/Manager); reset `selectedRole` on all close/cancel paths; added `border-t` to footer |

---

## RBAC Filtering Logic

**"My Projects" section:**
- Filter: `isOwner !== false`
- Result: Neon Nights, Dust & Glory, The Archive (3 cards)

**"Shared with me (Manageable)" section:**
- Filter: `isOwner === false && currentUserRole === "Manager"`
- Result: Shadow Protocol (1 card)
- Excluded: Urban Pulse (`currentUserRole === "User"` fails the Manager gate)

---

## Outstanding Technical Debt

1. **Mock-derived roles:** `currentUserRole` is hardcoded in mock data. Production implementation must inject from Cloudflare D1 session/auth context.
2. **Native radio buttons:** Current implementation uses `<input type="radio">`. Defer custom styling until design system form control tokens are finalized.
3. **Invite action:** Role selection is UI-only. Wire to D1 invite record creation when auth is implemented.

---

## Next Action Items

1. **Dev server verification:**
   - Navigate to `/crew` → confirm "My Projects" shows 3 cards, "Shared with me (Manageable)" shows 1 card (Shadow Protocol)
   - Verify Urban Pulse does NOT appear in either section
   - Open invite modal on any crew page → confirm role radios render and reset on cancel

2. **Production wiring (future):**
   - Replace mock `currentUserRole` with session-injected role from Cloudflare D1
   - Wire invite modal role selection to D1 team member creation endpoint
   - Add role-based permission checks to crew management actions (edit, delete, invite)

---

## Files Verified

- ✅ All 4 files overwritten per spec
- ✅ No syntax errors (JSX structure validated)
- ✅ Type safety: `ProjectRole` union enforced across all components
- ✅ RBAC filter logic: Urban Pulse correctly excluded from both sections
</file>

<file path="0426_1947_report_shared-url-and-script-rbac.md">
# Report: Shared URL, Script RBAC & Uploader Avatars

**Task Category:** Ad-hoc sub-task (from `tasks/0426/`)  
**Completed:** 2026-04-26 19:47 ICT (UTC+7)  
**Task File:** `0426_1935_shared-url-and-script-rbac.md`

---

## Summary

Implemented shared project URL routing via catch-all segments, applied script-level RBAC to hide management UI from standard Users, and added uploader avatars to script version cards.

---

## Components Modified

| File | Change |
|------|--------|
| `app/projects/[slug]/` | Renamed to `app/projects/[...slug]` (catch-all route) |
| `components/dashboard/ProjectCard.tsx` | Conditional `href`: shared projects route to `/projects/shared/{slug}` |
| `app/projects/[...slug]/page.tsx` | Updated `PageProps` to `string[]`; added `author` field to `ScriptVersion`; implemented `canManageScripts` RBAC gate; wrapped 3-dots menu and "New Version" card; added 32×32 circular uploader avatar |

---

## Technical Implementation

### Route Catch-All
- `[slug]` → `[...slug]` now handles both `/projects/neon-nights` (owner) and `/projects/shared/shadow-protocol` (shared).
- `projectSlug` extracted as `slug[slug.length - 1]` to safely handle multi-segment paths.

### RBAC Logic
```typescript
const canManageScripts = currentProject?.isOwner !== false || currentProject?.currentUserRole === "Manager";
```
- Owners and Managers see: 3-dots menu, "Edit Script" / "Delete Script" options, "New Version" dashed card.
- Standard Users see: script cards only (no management UI).

### Uploader Avatar
- `ScriptVersion.author` now includes `{ name: string; avatar: string }`.
- 32×32 circular `next/image` rendered opposite the document icon in each script card.
- Tooltip shows `"Imported by {author.name}"`.

---

## Outstanding Technical Debt

1. **Mock Data Dependency**
   - `canManageScripts`, `isOwner`, and `author` are all mock-driven.
   - Production requires: Cloudflare D1 session injection for `isOwner` / `currentUserRole`; D1/IndexedDB script record for real `author` data.

2. **No Keyboard Trap / Focus Management**
   - 3-dots dropdown has no keyboard accessibility (accessibility debt).

---

## Next Action Items

1. **Dev Server Verification**
   - Confirm `/projects` dashboard: shared project card links to `/projects/shared/{slug}`.
   - Confirm owner project card links to `/projects/{slug}`.
   - On a User-role shared project page: 3-dots menus and "New Version" card are hidden.
   - Each script card displays the circular 32×32 uploader avatar.

2. **Production Wiring**
   - Wire `isOwner` and `currentUserRole` from Cloudflare D1 session context.
   - Wire `author` from the script upload record in D1/IndexedDB.

3. **Accessibility**
   - Add keyboard trap and focus management to 3-dots dropdown menu.
</file>

<file path="0426_1951_report_fix-script-card-and-modal.md">
# Report: Fix Script Card Overlap & Add Modal Description

**Task ID:** 0426_1945  
**Category:** Ad-hoc Sub-task (from `tasks/0426/`)  
**Completed:** 2026-04-26 19:51 ICT (UTC+7)

---

## Summary

Fixed UI overlap issue on script version cards and extended the Import Script Modal with a Description field.

---

## Components Modified

### 1. `app/projects/[...slug]/page.tsx`
- **Change:** Removed blue `description` document icon from script card header
- **Change:** Promoted `author.avatar` `<Image>` from `w-8 h-8` to `w-12 h-12 rounded-full` positioned on the left
- **Change:** Removed `justify-between` wrapper; now uses `flex items-start` only
- **Result:** 3-dots menu (`absolute top-4 right-4 z-50`) no longer overlapped by avatar or icon

### 2. `components/projects/ImportScriptModal.tsx`
- **Change:** Added `useState` import
- **Change:** Added `description` state with `setDescription` handler
- **Change:** Inserted `<textarea>` field with label "DESCRIPTION" between Version Name and Smart Transfer inputs
- **Styling:** `rows={3}`, `resize-none`, matching input field styling (border, focus states, padding)

---

## Outstanding Technical Debt

None introduced.

---

## Next Action Items

1. **Dev Server Verification:**
   - Confirm each script card displays the 48×48 circular avatar in the top-left corner
   - Confirm 3-dots menu is fully visible and clickable without overlap
   - Confirm Description textarea appears in Import Modal between Version Name and Smart Transfer

2. **Testing Checklist:**
   - Open `/projects/[project-slug]` and inspect script card layout
   - Click "New Version" or "Edit Script" to open Import Modal
   - Verify textarea accepts input and state updates correctly

---

## Files Changed

- `app/projects/[...slug]/page.tsx` (lines 133–145)
- `components/projects/ImportScriptModal.tsx` (lines 1–13, + textarea insertion)
- `.scenoo-brain/reports/current-status.md` (updated timestamp and task entry)
</file>

<file path="0426_2030_share-project-modal.md">
# Task Report: Share Project Modal & Shared Menu Re-enable

**Completed:** 2026-04-26 20:30 ICT (UTC+7)  
**Category:** Ad-hoc Sub-task (Feature Implementation)

---

## Overview

Implemented Google Drive-style "Share Project" feature with strict access control. Re-enabled 3-dots menu for shared projects, allowing non-owners to request access while preventing unauthorized edit/delete operations.

---

## Components Modified

| File | Change |
|------|--------|
| `types/project.ts` | Added `GeneralAccess` type; added `generalAccess?: GeneralAccess` field to `Project` interface |
| `lib/mock-data.ts` | Injected `generalAccess` on all 5 mock projects (mixed "Just Crew" / "Anyone with the link") |
| `components/dashboard/ProjectCard.tsx` | Added `onShareClick?` prop; relaxed menu guard to `(isOwner !== false \|\| onShareClick)`; wrapped Edit/Delete in individual `isOwner` guards |
| `components/dashboard/ProjectGrid.tsx` | Added `onShareProjectClick: (project: Project) => void` prop; wired Share callback for both My Projects and Shared Projects; omitted edit/delete props from shared section |
| `components/projects/ShareProjectModal.tsx` | **Created** — 3-mode modal: Owner (full access), Shared+Just Crew (locked + request), Shared+Anyone (public link) |
| `app/projects/page.tsx` | Imported `ShareProjectModal`; added `shareProject` state; wired FAB and `ProjectGrid` callback; rendered modal |

---

## Key Implementation Details

### Menu Access Control
- **My Projects:** 3-dots shows Edit / Share / Delete (all enabled)
- **Shared Projects:** 3-dots shows Share only (Edit/Delete hidden via guard)
- Menu visibility: `(isOwner !== false || onShareClick) && onToggleMenu && onCloseMenu`

### Modal Modes
1. **Owner Mode:** Email input, people list, general access dropdown (Restricted / Public)
2. **Shared + Just Crew:** Locked permission box + message textarea + Send Request button
3. **Shared + Anyone with Link:** Public status + Copy Link button

### Bug Fixes Applied
- **React `<select>` bug:** Spec used `selected` on `<option>` elements (non-React pattern). Corrected to `defaultValue={access}` on `<select>`.
- **Z-index correction:** Spec had `z-[1]` on modal backdrop (would render behind dropdown's `z-50`). Corrected to `z-[100]` per prior `ImportScriptModal` fix pattern.

---

## Outstanding Technical Debt

| Item | Impact | Resolution Path |
|------|--------|-----------------|
| Mock `generalAccess` data | Share state is display-only | Inject from Cloudflare D1 session on auth |
| `Copy link` button | No clipboard handler | Wire to `navigator.clipboard.writeText()` when API ready |
| Owner dropdown change | Doesn't persist | Add state handler + API call when sharing API is implemented |
| `isOwner` derivation | Depends on mock data | Pull from Cloudflare D1 session context |

---

## Next Action Items

1. **Dev Server Verification:**
   - My Projects card → 3-dots → confirm Edit / Share / Delete visible
   - Shared Projects card → 3-dots → confirm Share only (no Edit/Delete)
   - Shadow Protocol (Just Crew) → Share → confirm Mode 2 (locked + textarea)
   - Urban Pulse (Anyone with link) → Share → confirm Mode 3 (public)
   - Neon Nights (Owner) → Share → confirm Mode 1 (email input + dropdown)

2. **Future Wiring:**
   - Connect `Copy link` to clipboard API
   - Wire owner's general access dropdown to real share API
   - Implement "Send Request" backend flow (D1 invite record)
   - Inject `generalAccess` and `isOwner` from session instead of mock data

---

## Files Reference

- Spec: `.scenoo-brain/reports/0426/0426_2015_share-project-modal.md`
- Status: `.scenoo-brain/reports/current-status.md` (updated)
</file>

<file path="0426_2039_report_share-modal-multi-email.md">
# Report: Multi-Email Input for Share Modal

**Completed:** 2026-04-26 20:39 ICT (UTC+7)  
**Category:** Sub-task (Ad-hoc Feature)  
**Status:** ✅ Complete

---

## Task Summary

Implemented multi-email chip input UI inside the Share Project Modal to match the behavior of the Invite User Modal. Owners can now add multiple recipients via Enter key, with visual chip feedback and individual removal buttons.

---

## Components Modified

### `components/projects/ShareProjectModal.tsx`

**Changes:**
- Added `emails: string[]` and `inputValue: string` state variables
- Implemented `handleKeyDown` handler: captures Enter key, validates email format (`includes("@")`), prevents duplicates, creates chip
- Created `removeEmail(emailToRemove)` to delete individual chips
- Created `handleClose()` to reset all three state variables (`emails`, `inputValue`, `requestText`) on modal close
- Replaced simple `<input>` with `focus-within` flex container holding mapped email chips + transparent input field
- Added helper text: "Press Enter to add multiple emails."
- Updated footer button label: `emails.length > 0 ? "Share" : "Done"`
- Wired header X button, footer Done/Share button, and "Send Request" button to `handleClose`

**Preserved (not overwritten):**
- `z-[100]` overlay z-index (spec had `z-50`, which would render behind dropdown)
- `defaultValue={access}` on `<select>` (spec had `selected={...}` attributes, which is not valid React)

---

## Technical Debt

1. **Email Validation:** Minimal check (`includes("@")`) — full RFC 5322 regex deferred to when real invite API is wired
2. **Share Button Handler:** "Share" button has no API call yet — wire to invite/sharing backend when ready
3. **Chip Removal UX:** No keyboard support (e.g., Backspace to remove last chip) — can be added in future iteration

---

## Next Action Items

1. **Dev Server Verification:**
   - Owner modal: type email → press Enter → chip appears
   - Type second email → press Enter → second chip appears
   - With chips present, footer button reads "Share"
   - Clicking X or Done resets all chips and closes modal

2. **Integration:** Wire "Share" button to invite API when Cloudflare D1 backend is ready

3. **Polish (Future):** Add keyboard shortcuts (Backspace to remove last chip, Escape to clear all)

---

## Files Changed

- `components/projects/ShareProjectModal.tsx` — 5 targeted edits (import, state, handlers, UI, button logic)

---

## Blockers / Risks

None. Feature is UI-complete and ready for backend integration.
</file>

<file path="0426_2047_report_script-level-sharing-rbac.md">
# Report: Script-Level Sharing & RBAC Implementation

**Completed:** 2026-04-26 20:47 ICT (UTC+7)  
**Task Type:** Ad-hoc Sub-task (from `tasks/0426/0426_2045_share-script-implementation.md`)  
**Status:** ✅ Complete

---

## Task Summary

Brought robust Share and RBAC logic from Project level down to individual Script level. Implemented script-level sharing modal with role-based access control (Owner vs. Non-owner views).

---

## Components Modified

| File | Change | Impact |
|------|--------|--------|
| `types/project.ts` | Added `ScriptVersion` interface with `generalAccess?: GeneralAccess` | Centralized type definition; removed local interface from page |
| `components/projects/ShareScriptModal.tsx` | **Created** — 3-mode Google Drive-style modal | Enables script sharing UI with role-based rendering |
| `app/projects/[...slug]/page.tsx` | Removed local `ScriptVersion`; imported from types; added `shareScript` state; unwrapped 3-dots menu; guarded Edit/Delete individually; always-visible Share button | Menu now visible to all users; Share button accessible to everyone; RBAC enforced per action |

---

## Technical Implementation

### ShareScriptModal Render Paths

1. **Owner Mode** (`canManage === true`)
   - Email chip input with Enter-to-add
   - "People with access" list (hardcoded owner)
   - General access dropdown (Just Crew / Anyone with the link)
   - Footer: Copy link + Share/Done button

2. **Non-owner + Just Crew** (`canManage === false` + `access === "Just Crew"`)
   - Locked permission box with lock icon
   - Message textarea for access request
   - Footer: Send Request button

3. **Non-owner + Anyone with link** (`canManage === false` + `access === "Anyone with the link"`)
   - Read-only people list
   - Read-only general access display
   - Footer: Copy link + Done button

### RBAC Logic

```
canManageScripts = currentProject?.isOwner !== false || currentProject?.currentUserRole === "Manager"
```

- **Edit Script** button: `{canManageScripts && ...}`
- **Delete Script** button: `{canManageScripts && ...}`
- **Share button**: Always visible (no guard)
- **3-dots menu**: Always visible (no guard)

---

## Outstanding Technical Debt

| Item | Severity | Notes |
|------|----------|-------|
| `generalAccess` dropdown onChange not wired | Medium | Currently visual-only; wire when sharing API implemented |
| `Copy link` button has no clipboard handler | Medium | Stub implementation; add clipboard.writeText() when ready |
| Mock-only `generalAccess` values | Low | Production will read from IndexedDB/D1 |
| Mock-only `author` field on scripts | Low | Real data from script upload record in D1/IndexedDB |

---

## Next Action Items

1. **Dev Server Verification**
   - [ ] Open project → click 3-dots on Draft 1 (Anyone with link) → Share → confirm Owner mode
   - [ ] Verify Edit/Delete hidden for non-managers
   - [ ] Verify Share button opens correct modal mode per `generalAccess` + `canManage`
   - [ ] Confirm Draft 1 shows Copy link footer
   - [ ] Confirm Draft 2 (Just Crew, non-owner) shows locked permission box

2. **Future Integration**
   - Wire `<select>` onChange to update script `generalAccess` in IndexedDB
   - Implement `Copy link` clipboard handler
   - Connect email chip input to actual sharing API (D1 invite records)
   - Inject real `generalAccess` + `author` from local DB on page load

---

## Files Reference

- Task spec: `.scenoo-brain/tasks/0426/0426_2045_share-script-implementation.md`
- Status log: `.scenoo-brain/reports/current-status.md`
</file>

<file path="0426_2100_report_fix-script-rbac-strict-check.md">
# Report: Fix Script RBAC Strict Check

**Task Category:** Ad-hoc Bug Fix (from `tasks/0426/`)  
**Completed:** 2026-04-26 21:00 ICT (UTC+7)  
**Lead Developer:** Claude (Sonnet 4.6)

---

## Summary

Fixed a critical RBAC permission leak in the Script Versions page where loose boolean checking (`isOwner !== false`) accidentally granted Edit/Delete permissions to standard Users.

---

## Components Modified

| File | Change |
|------|--------|
| `app/projects/[...slug]/page.tsx` | Line 33–34: Replaced `canManageScripts = currentProject?.isOwner !== false \|\| currentProject?.currentUserRole === "Manager"` with strict equality check: `canManageScripts = currentProject?.currentUserRole === "Owner" \|\| currentProject?.currentUserRole === "Manager"` |

---

## Technical Details

**Root Cause:**  
The expression `isOwner !== false` evaluates to `true` when `isOwner` is `undefined` (field not set on project object). This silently granted manage permissions to any User-role member whose project entry lacked the `isOwner` field.

**Fix:**  
Strict equality check against `currentUserRole` ensures only explicit "Owner" or "Manager" roles can access Edit Script, Delete Script, and New Version card.

---

## Outstanding Technical Debt

- `currentUserRole` remains mock-driven via `MOCK_PROJECTS`; production must inject from Cloudflare D1 session.

---

## Next Action Items

1. **Verification:** Open a project mapped to `currentUserRole: "User"` (e.g., Urban Pulse) in dev server.
2. **Confirm:** Edit Script, Delete Script, and New Version card are all absent from the UI.
3. **Integration:** Wire `currentUserRole` to Cloudflare D1 session when auth is implemented.
</file>

<file path="0426_2125_report_share-modal-ui-fixes.md">
# Task Report: Share Modal UI Fixes (0426_2120)

**Category:** Ad-hoc sub-task (from `tasks/0426/`)  
**Completed:** 2026-04-26 21:25 ICT (UTC+7)

---

## Summary

Fixed UI overlaps and text labels in Share Modals. Corrected z-index layering to prevent modals from bleeding above the 3-dots dropdown menu, and standardized the General Access option text.

---

## Components Modified

### `components/projects/ShareProjectModal.tsx`
- **Line 45:** Root overlay z-index `z-[100]` → `z-[1]`
- **Note:** Option text already correctly displayed "Just Crew" (no change needed)

### `components/projects/ShareScriptModal.tsx`
- **Line 45:** Root overlay z-index `z-50` → `z-[1]`
- **Lines 106–109:** Fixed broken React `selected` prop pattern
  - **Before:** `<select>` with `selected={access === "Just Crew"}` on each `<option>` (invalid React syntax)
  - **After:** `<select defaultValue={access}>` with clean `<option>` elements
- **Line 107:** Option text "Restricted / Just Crew" → "Just Crew"

---

## Technical Debt

None introduced. All changes are minimal, targeted fixes.

---

## Verification Checklist

- [ ] Share modals no longer render above the 3-dots dropdown menu
- [ ] General Access dropdown displays "Just Crew" (not "Restricted / Just Crew")
- [ ] No console warnings related to React `selected` prop

---

## Next Action

Verify in dev server: open a project, click the 3-dots menu on a script card, then open the Share modal — confirm the modal stays below the dropdown and the option text reads correctly.
</file>

<file path="0426_2152_report_fix-modal-zindex.md">
# Bug Fix Report — Modal Z-Index Overlap

**Date:** April 26, 2026 (Vietnam Time UTC+7)
**Report Type:** Ad-hoc Bug Fix (`tasks/0426/`)
**Task File:** `0426_2145_fix-zindex-typo.md`

---

## Bug Description

When opening the **Share modal** from the 3-dots menu on a script card in `/projects/[project-name]`, the 3-dots menu button (`more_vert` icon) was visually overlapping the modal — appearing on top of it.

**Root Cause:** Both the Share modals and the 3-dot menu button used `z-50` (or lower). Since the script cards are rendered later in the DOM than the modal portals, same-z-index elements later in the DOM stacked on top, causing the menu icon to bleed through the modal overlay.

---

## Components Modified

| File | Change |
|------|--------|
| `components/projects/ShareScriptModal.tsx` | Modal overlay z-index: `z-[2]` → `z-[200]` |
| `components/projects/ShareProjectModal.tsx` | Modal overlay z-index: `z-[2]` → `z-[200]` |

---

## Z-Index Hierarchy (Post-Fix)

| Layer | z-index |
|-------|---------|
| Sticky header | `z-30` |
| 3-dot dropdown backdrop | `z-40` |
| 3-dot menu / card buttons | `z-50` |
| Share modals (fixed overlay) | `z-[200]` |
| Delete confirmation modal | `z-50` *(still needs to be raised if same issue occurs)* |

---

## Outstanding Technical Debt

- The **Delete Script** confirmation modal in `app/projects/[...slug]/page.tsx` still uses `z-50` for its overlay. If the 3-dot menu is open when delete is triggered, it may show the same overlap bug. Should be raised to `z-[200]` for consistency.
- No global z-index token system exists — values are hardcoded. A design token (`--z-modal: 200`, `--z-dropdown: 50`) would prevent future regressions.

---

## Next Action Items

1. Raise the Delete modal in `app/projects/[...slug]/page.tsx` from `z-50` to `z-[200]`.
2. Consider defining a z-index scale in `globals.css` or a tokens file to enforce consistent layering across all modals and dropdowns.
</file>

<file path="0426_2210_report_replace-status-with-role.md">
# Task Report: Replace Status Badge with Role Badge

**Task/Bug Name:** Replace Status Badge with Role Badge (0426_2200)

**Task Type:** Ad-hoc sub-task/bug fix (from `tasks/0426/`)

**Components Modified:**
- `components/dashboard/ProjectCard.tsx`

**Outstanding Technical Debt:**
- None introduced.

**Next Action Items:**
- Verify in dev server that each ProjectCard footer displays the correct role badge (OWNER / MANAGER / MEMBER) instead of project status.
</file>

<file path="0426_2320_report_build-settings-tab.md">
# Task Report: Build Settings Tab UI with Inner Sidebar

**Task/Bug Name:** Build Settings Tab UI with Inner Sidebar (0426_2320)

**Task Category:** Ad-hoc sub-task (from `tasks/0426/`)

**Components Modified:**
- `app/settings/page.tsx` (fully overwritten)
- `.scenoo-brain/reports/current-status.md` (progress log updated)

**Outstanding Technical Debt:**
- Plans tab "Team and Enterprise" toggle is UI-only; no state change implemented.
- All form inputs are uncontrolled (`defaultValue`) — no submission logic or validation wired.
- Invoice "View" buttons and payment "Update" button are no-ops.
- Mock data (invoices, plan details) is static inline; will need real data from Cloudflare D1 when auth/billing is live.

**Next Action Items:**
- Start dev server and navigate to `/settings` to confirm all four tabs render correctly with proper active state transitions.
- Wire up form submission, validation, and connect to local/cloud data as backend features become available.
</file>

<file path="0426_2345_report_refactor-settings-routing.md">
# Task Report: Settings Nested Routing & Avatar Upload

**Task/Bug Name:** Refactor Settings from State-Based Layout to Next.js App Router Nested Routing + Avatar Upload UI  
**Task ID:** `0426_2345_REFACTOR-SETTINGS-ROUTING`  
**Task Category:** Ad-hoc sub-task (from `tasks/0426/`)  
**Completion Time:** 2026-04-26 23:45 ICT (UTC+7)

---

## Components Modified

| File | Action |
|------|--------|
| `components/settings/SettingsSidebar.tsx` | **Created** — Client Component; uses `usePathname` for active link detection; renders two nav groups (Profile Settings, Subscription) |
| `app/settings/layout.tsx` | **Created** — Shared Server Component layout; composes `AppSidebar`, `DashboardHeader`, `SettingsSidebar`, and `{children}` |
| `app/settings/page.tsx` | **Overwritten** — Reduced to a single server-side `redirect("/settings/my-profile")`; all old state-based UI removed |
| `app/settings/my-profile/page.tsx` | **Created** — Profile form with clickable avatar: `group-hover` dark overlay + `photo_camera` icon; local `avatarPreview` state via `URL.createObjectURL` |
| `app/settings/change-password/page.tsx` | **Created** — Extracted password form (Current, New, Confirm fields + CTA) |
| `app/settings/plans/page.tsx` | **Created** — Extracted Plans & Pricing UI (Pro card + Max card with `border-primary` highlight) |
| `app/settings/billing/page.tsx` | **Created** — Extracted Billing UI (plan summary, payment method, invoices table, cancellation section) |
| `components/dashboard/AppSidebar.tsx` | **Modified** — Bottom user info block (`AR` / Alex Rivera) wrapped in `<Link href="/settings/my-profile">` with `hover:bg-surface-container-low transition-colors cursor-pointer` |
| `.scenoo-brain/reports/current-status.md` | **Updated** — Progress log reflects new completed state |

---

## Architectural Changes

- **Before:** `/settings` was a single Client Component (`"use client"`) managing all four tabs via `useState<SettingsTab>`. Navigation between tabs caused no URL change; deep linking was impossible.  
- **After:** `/settings` is a proper Next.js App Router nested route tree. Each tab is a dedicated sub-route (`/my-profile`, `/change-password`, `/plans`, `/billing`). The shared chrome (AppSidebar, DashboardHeader, SettingsSidebar) lives in `app/settings/layout.tsx` and does not re-render on sub-route changes.

---

## Outstanding Technical Debt

- **Plans toggle (UI-only):** "Team and Enterprise" button in Plans page has no state — does not switch plan cards.
- **Uncontrolled forms:** All inputs use `defaultValue`; no controlled state, validation, or submission logic wired.
- **No-op actions:** Invoice "View" buttons, payment "Update" button, and billing "Cancel" button fire no events.
- **Static mock data:** Invoices, plan details, and user info are hardcoded inline; requires Cloudflare D1 integration once auth/billing is live.
- **Avatar URL leak:** `URL.createObjectURL` in `my-profile/page.tsx` is not revoked on component unmount — should add `useEffect` cleanup (`URL.revokeObjectURL`) when real persistence is implemented.

---

## Next Action Items

1. **Verify routing in dev server** — Navigate to `/settings` and confirm redirect to `/settings/my-profile` fires. Click each sidebar link and confirm URL updates and active state highlights correctly.
2. **Test avatar preview** — Select an image file; confirm preview renders inside the circular avatar replacing the "TP" initials.
3. **Confirm AppSidebar link** — Click the "Alex Rivera" block in the collapsed and expanded sidebar states; confirm navigation to `/settings/my-profile`.
4. **Wire Plans toggle** — Add `useState` for `Individual | Team` in `plans/page.tsx` and conditionally render the appropriate card set.
5. **Add `URL.revokeObjectURL` cleanup** — Implement `useEffect` in `my-profile/page.tsx` to prevent memory leaks when avatar upload is connected to real storage.
</file>

</files>
