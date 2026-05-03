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
0425_1656_report_phase1-base-ui.md
0425_1742_report_phase2-shotlist_status.md
0425_1932_fix-ui-debt.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0425_1656_report_phase1-base-ui.md">
# Scenoo — Current Status Report

**Last updated:** 2026-04-25  
**Phase:** Phase 2 — Shotlist Table UI ✅ COMPLETE

---

## Completed

### Phase 1: Base UI (Task: 0425_1613_phase1-base-ui)

#### Infrastructure
- `app/globals.css` — Full design token system via Tailwind v4 `@theme` (all brand colors), `@layer utilities` (typography scale: display, h1–h3, body-md/lg, label-md/sm, Material Symbols CSS class)
- `app/layout.tsx` — Inter font via `next/font/google`, Material Symbols Outlined via `<link>` in `<head>`, metadata configured
- `types/project.ts` — Shared TypeScript types: `Project`, `TeamMember`, `ProjectStatus`

#### Landing Page (`/`)
- `app/page.tsx` — Container, assembles all landing sections
- `components/landing/LandingHeader.tsx` — Fixed sticky header, Scenoo logo, nav links, Log In + Sign Up as Next.js `<Link>` components (pure UI, no auth)
- `components/landing/HeroSection.tsx` — Display headline, CTA download buttons, hero screenshot
- `components/landing/FeaturesSection.tsx` — 3-column grid: Line Scripting, Breakdown (with tags), Shotlist
- `components/landing/FaqSection.tsx` — Native HTML `<details>/<summary>` accordion, group-open:-rotate-180 chevron
- `components/landing/BlogSection.tsx` — 3-card blog grid with hover shadow
- `components/landing/CtaSection.tsx` — Final CTA with amber button
- `components/landing/LandingFooter.tsx` — Footer with nav links

#### Production Hub Dashboard (`/dashboard`)
- `app/dashboard/page.tsx` — Container, holds MOCK_PROJECTS data (5 projects), assembles dashboard
- `components/dashboard/AppSidebar.tsx` — Fixed left sidebar, nav items, user initials avatar
- `components/dashboard/DashboardHeader.tsx` — Sticky top bar, search input, module tabs, icon buttons
- `components/dashboard/ProjectCard.tsx` — Project card with thumbnail, timecode badge, status chip, team member avatars
- `components/dashboard/NewProjectCard.tsx` — Dashed border "Start New Production" placeholder
- `components/dashboard/ProjectGrid.tsx` — Presentational grid with header (Filter + New Project buttons)

#### Build Verification
- `npm run build` → ✅ 0 TypeScript errors, 0 compile errors
- Routes generated: `/` (static), `/dashboard` (static)

---

## Architecture Notes
- All components are **React Server Components** (no `"use client"` — Phase 1 is pure UI)
- **Container/Presentational** pattern applied: `DashboardPage` owns mock data, passes via props
- **Log In / Sign Up** are `<Link href="/dashboard">` — no auth logic as specified
- **Design tokens** strictly from `ui-design.md` — no invented colors/spacing
- External images from spec reference (lh3.googleusercontent.com) used as-is for visual fidelity

---

## Technical Debt / Known Items
- `<img>` used instead of `next/image` (Phase 1 decision — avoids needing `remotePatterns` config for spec CDN URLs). Upgrade to `<Image>` when using real assets.
- Mock data in `app/dashboard/page.tsx` — to be replaced by IndexedDB adapter calls in Phase 2
- Search input in DashboardHeader is uncontrolled (no state) — Phase 1 UI only

---

## Next Step
**Phase 3:** Wire Shotlist to IndexedDB via DatabaseAdapter.
- Create `lib/db/IndexedDBAdapter.ts` with `getShotsByProject(projectId)` and `upsertShot(shot)` methods
- Replace `MOCK_SHOTS` in `ShotlistContainer` with adapter calls
- Implement bidirectional Canvas ↔ Shotlist sync (line delete → row delete, row delete → Canvas line delete)

---

## Phase 2: Shotlist Table UI (Task: 0425_1716_phase2-shotlist)

### Files Created
- `types/shotlist.ts` — `ShotRow` interface covering all 18 columns; `IntExt`, `DayNight`, `ShotSide` literal union types
- `components/shotlist/ShotlistTableHeader.tsx` — Sticky single-tier header row; 3 frozen left columns via `position: sticky`
- `components/shotlist/ShotlistTableRow.tsx` — Single data row; frozen columns inherit row hover via Tailwind `group`/`group-hover`; color-coded INT/EXT and D/N badges; storyboard thumbnail slot with dashed placeholder fallback
- `components/shotlist/ShotlistTable.tsx` — Scrollable container (`overflow-auto`, `hide-scrollbar`); "add row" placeholder at bottom
- `components/shotlist/ShotlistContainer.tsx` — Container owning 7 mock shots across 3 scenes; live search filter (description/scene/location/subjects); script time aggregator in footer
- `app/shotlist/page.tsx` — Route page, integrates with existing 256px sidebar via `ml-64`
- `app/globals.css` — Added `.hide-scrollbar` utility

### Architecture
- **Container/Presentational** split strictly applied
- No IndexedDB, API, or localStorage calls — mock data only (Phase 2 constraint)
- 18 columns exactly matching `feature-shotlist.md`; frozen columns: #, SC#, SH#
- `group-hover:bg-blue-50/50` propagated to all frozen cells to prevent sticky color bleed on row hover
- Design tokens from `ui-design.md` used throughout (no invented colors)
- Implement "New Project" modal with form → save to IndexedDB
- Read `.scenoo-brain/rules/db-schema.md` before starting
</file>

<file path="0425_1742_report_phase2-shotlist_status.md">
# Task Report: Phase 2 — Shotlist Table UI

**Task Type:** Main Phase Task (`tasks/0425/1716_phase2-shotlist.md`)
**Completion Time:** 17:42, 2026-04-25

---

## Task/Bug Name
Phase 2: Build the Shotlist Table UI

## Components Modified
- `types/shotlist.ts` — Defines `ShotRow` interface and supporting types for all 18 columns
- `components/shotlist/ShotlistTableHeader.tsx` — Sticky header row, 3 frozen columns, 15 scrollable columns
- `components/shotlist/ShotlistTableRow.tsx` — Single data row, sticky/frozen columns, color badges, storyboard slot
- `components/shotlist/ShotlistTable.tsx` — Scrollable container, add-row placeholder
- `components/shotlist/ShotlistContainer.tsx` — Container with mock data, search, script time aggregation
- `app/shotlist/page.tsx` — Route page for `/shotlist`
- `app/globals.css` — `.hide-scrollbar` utility for scroll container

## Outstanding Technical Debt
- No IndexedDB or DatabaseAdapter integration yet (mock data only)
- No Canvas sync or row/line deletion logic (Phase 3 scope)
- `<img>` used for storyboard thumbnails (upgrade to Next.js `<Image>` in future phase)

## Next Action Items
- Implement `IndexedDBAdapter` and wire `ShotlistContainer` to use it for all shot data
- Add bidirectional sync: Canvas line ↔ Shotlist row (delete, update)
- Replace all mock data with persistent storage
- Upgrade image handling to Next.js `<Image>` for production assets
</file>

<file path="0425_1932_fix-ui-debt.md">
# Fix UI Technical Debt

**Task/Bug Name:** Fix Next.js Image Errors (Hardcoded Fix)

**Components Modified:**
- next.config.ts
- components/dashboard/ProjectCard.tsx
- components/landing/BlogSection.tsx

**Outstanding Technical Debt:**
- None for this sub-task. All required hardcoded fixes were applied as specified.

**Next Action Items:**
- Monitor for any further Next.js image optimization errors.
- Review other UI components for similar configuration issues if new errors arise.

**Task Category:** Ad-hoc sub-task/bug fix (from tasks/0425/)
</file>

</files>
