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
0502_0343_report-helios-shotlist-zoom.md
0502_1003_report-helios-export-autofit.md
0502_1007_report-helios-export-colgroup.md
0502_1031_report_export-hydration-mismatch.md
0502_1103_report-breakdown-export-relative-zoom.md
0502_1404_linescript-rich-topbar.md
0502_1414_linescript-topbar-actions.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0502_0343_report-helios-shotlist-zoom.md">
### Helios Protocol — Shotlist Zoom & Safe Zone Diagnostic Report
**Date:** 2026-05-02 03:43 ICT (UTC+7)
**Analyst:** Helios Diagnostic System
**Target:** `components/shotlist/ShotlistTable.tsx`

---

#### 1. The Symptom
The right safe zone padding (`pr-[2vw]`) visually appears to be massively oversized (hundreds of pixels wide) when the user scales/zooms out on the Shotlist table. Reducing the `pr` Tailwind class has no effect on this massive empty space.

#### 2. The Root Cause: Phantom Scroll Space
The bug is **not** caused by CSS padding. It is a fundamental conflict between CSS `transform: scale()`, fixed-width elements (`table-layout: fixed`), and relative footprint compensation.

**The mechanism of failure:**
1. The Shotlist table has 18 columns with fixed widths, totaling roughly `2056px` when all are visible. It behaves as a `max-content` element.
2. The zoom wrapper applies `transform: scale(zoom/100)`. If `zoom = 50`, the table visually shrinks to `1028px`.
3. However, CSS transforms are *visual only*. They do not alter the layout footprint. To the browser's scroll engine, the table still takes up `2056px` of layout space.
4. To fix the scrollbar footprint, the current code applies `width: calc((100 / zoom) * 100%)` to the scale wrapper. 
5. **The Fatal Flaw:** This formula forces the wrapper's layout width to become a percentage of the *viewport's* width. If the viewport is `1920px`, a `200%` width wrapper expands to `3840px`. 
6. The visual table is only `1028px` wide, left-aligned. The scroll container creates a scrollable area of `3840px`. 
7. Result: `3840px - 1028px = 2812px` of dead, empty "phantom" scroll space on the right side. The user perceives this as an oversized safe zone.

#### 3. The Architectural Solution
Because the table width is purely deterministic (based on `visibleCols`), we must calculate the exact pixel footprint in React and explicitly size a scroll-placeholder, completely abandoning the viewport-relative `calc()` approach.

**Step-by-Step Fix Blueprint for the next session:**

**Phase 1: Calculate Exact Table Width**
Inside `ShotlistTable.tsx`, sum the widths of the currently visible columns:
`const exactTableWidth = positionedCols.reduce((sum, col) => sum + col.width, 0);`

**Phase 2: Remove the Faulty Scale Wrapper CSS**
Remove the `width: calc(...)` and `height: calc(...)` inline styles from the `origin-top-left` scale wrapper. Let it simply be:
`style={{ transform: \`scale(${zoom / 100})\` }}`

**Phase 3: Restructure the DOM for Explicit Footprint**
To provide the scroll container with the correct bounds, create an absolute wrapper that explicitly dictates the scroll area based on the scaled width:
`const scaledWidth = exactTableWidth * (zoom / 100);`
We will use a `ResizeObserver` (or direct calculation) to sync the scaled visual footprint into the layout layer, ensuring the scrollbars perfectly hug the table's edges without generating phantom scroll areas.

---
*End of Helios Protocol Diagnostic Report.*
</file>

<file path="0502_1003_report-helios-export-autofit.md">
### Helios Protocol — Export Auto-Fit Alignment Diagnostic Report
**Date:** 2026-05-02 17:58 ICT (UTC+7)
**Analyst:** Helios Diagnostic System
**Target:** `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`

---

#### 1. The Symptom
On initial load, the "All Scenes" export table scales down to fit the screen, but it does not fit perfectly. A small horizontal scrollbar remains, indicating the scaled content footprint is slightly wider than the computed target boundary.

#### 2. The Root Cause: The Missing 40px Ruler Offset
The bug lies in a mathematical omission within the `exactContentWidth` calculation.

Currently, the width is calculated as:
`const exactContentWidth = Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0);`

**The mechanism of failure:**
1. The equation accurately sums the 17 data columns (defaulting to 17 * 120 = `2040px`).
2. However, the decoupled architecture (implemented in a prior Phase) extracts the row numbers into a dedicated `Left Ruler` panel, which is rendered alongside the table.
3. The `Left Ruler` and its corresponding `Corner Block` in the top header have a hardcoded width of **40px**.
4. Therefore, the true layout width of the entire visual block is `2040px + 40px = 2080px`.
5. Because `fitZoom` is calculated using `2040px` as the denominator (`(containerWidth - safeZoneX) / 2040`), the resulting zoom ratio is slightly too large.
6. When this oversized zoom ratio is applied to the true `2080px` footprint, the content exceeds `containerWidth - safeZoneX`, causing an unwanted horizontal scrollbar.

#### 3. The Architectural Solution
The `exactContentWidth` must explicitly account for the 40px ruler offset to reflect the true, complete layout footprint.

**Mathematical Fix for the next session:**
Update the calculation inside `page.tsx` to include the `40px` offset:
`const exactContentWidth = viewMode === 'all' ? 40 + Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0) : 794 + 128;`

This exact alignment will ensure the calculated `fitZoom` produces a scaled dimension that perfectly matches the browser's viewport down to the pixel.

---
*End of Helios Protocol Diagnostic Report.*
</file>

<file path="0502_1007_report-helios-export-colgroup.md">
### Helios Protocol — Export Table CSS Grid & Auto-Fit Diagnostic Report
**Date:** 2026-05-02 11:06 ICT (UTC+7)
**Analyst:** Helios Diagnostic System
**Target:** `app/(workspace)/.../breakdown/export/page.tsx` & `ExportPreviewTable.tsx`

---

#### 1. The Symptom
The "All Scenes" export table still fails to perfectly fit the screen width on load, showing a phantom horizontal scrollbar despite auto-fit math being applied.

#### 2. The Root Cause: Two Compounding Architecture Failures

**A. The Math Mistake (False Offset)**
In the Decoupled Rulers architecture, the 40px Left Ruler is a **sibling** to the main `scrollContainerRef`. The `containerWidth` measured by the `ResizeObserver` measures *only* the space remaining after the Left Ruler. 
By erroneously adding `40 +` to the `exactContentWidth` in the previous hotfix, we forced the scale footprint wrapper to be 40 * zoom pixels **wider** than the actual data table inside it. This directly generated a phantom scrollbar.

**B. The CSS Table-Layout Failure (Silent Layout Drift)**
The CSS property `table-layout: fixed` determines column widths strictly by reading the **first row** of the `<table>`. 
In Phase 2 of Decoupled Rulers, the letter row (A-Q) was extracted from the table. The new first row became the Document Header, which is a single cell spanning the entire table (`colSpan={17}`).
Because the first row is a merged cell, the browser cannot calculate individual column widths and silently falls back to `table-layout: auto`. This breaks the strict link between our React `colWidths` state and the actual rendered DOM footprint, causing the table to stretch intrinsically based on content.
Additionally, an orphaned `<th>` tag remained at the end of the Data Headers row, creating an 18th column in a 17-column grid.

#### 3. The Architectural Solution

**Phase 1: Revert the Math Offset**
Remove the `40 +` from the `exactContentWidth` calculation in `page.tsx`. The calculation must strictly be the sum of the 17 `colWidths`.

**Phase 2: Enforce Strict CSS Column Widths**
Inject a standard HTML `<colgroup>` at the very top of the `<table>` in `ExportPreviewTable.tsx`. This explicitly dictates the fixed pixel width of every column to the CSS rendering engine, bypassing the `colSpan` limitation of the first row.
Finally, delete the orphaned 18th `<th>` element to restore grid integrity.

---
*End of Helios Protocol Diagnostic Report.*
</file>

<file path="0502_1031_report_export-hydration-mismatch.md">
# Breakdown Export Hydration Mismatch Report

## Metadata
- Completion Time (VN): 2026-05-02 10:31 ICT (UTC+7)
- Task Category: Ad-hoc sub-task / bug fix (from tasks/0502/)
- Scope: Hydration mismatch in Breakdown Export All Scenes render path

## Task/Bug Name
- Bug: React hydration mismatch caused by SSR/client divergence in inline style computation for export viewport footprint.

## Components Modified
- app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx

## Change Summary
- Replaced render-time viewport calculation dependency on browser globals with deterministic initial state.
- Added client-only viewport inset synchronization using effect + resize listener.
- Kept footprint and zoom math architecture intact while ensuring first server render and first client render produce matching attributes.

## Outstanding Technical Debt
- Width/fit calculations still depend on multiple live layout signals (`ResizeObserver`, `scrollWidth`, and viewport inset), increasing coupling and debugging complexity.
- No automated regression test currently guards against hydration mismatch in export routes.
- Single-scene and all-scenes layout branches share sizing infrastructure but are not independently validated with snapshot or E2E coverage.

## Next Action Items
1. Add Playwright E2E assertion to confirm no hydration warnings on export page initial load.
2. Add lightweight utility to centralize viewport-safe-zone computation and avoid future render-time `window` access.
3. Add route-level QA checklist item for SSR/client style parity after export-layout changes.
</file>

<file path="0502_1103_report-breakdown-export-relative-zoom.md">
# Task Report: Breakdown Export — Relative Zoom, Clean UI, and Report Dashboard

**Task ID:** 0502_1048  
**Completed:** 2026-05-02 11:03 ICT (UTC+7)  
**Type:** Main Phase Task (Breakdown Export Module)

---

## Summary

Overhauled the Breakdown Export module with three major changes:
1. Removed font selection UI (hardcoded to `font-sans`)
2. Implemented Relative Zoom controller (100%–250% clamped)
3. Created new Breakdown Report dashboard view

---

## Components Modified

### 1. `components/breakdown/ExportPreviewTable.tsx`
- Removed `fontFamily` prop from interface
- Removed all `fontFamily` usage from input elements (hardcoded to `font-sans`)
- Added `export: 'pdf'` field to `MOCK_DATA`
- Exported `MOCK_DATA` as named export for consumption by page component

### 2. `components/breakdown/ExportPreviewSingle.tsx`
- Removed `fontFamily` prop from interface
- Updated root wrapper to use `font-sans` class directly
- Removed `fontFamily` from all input elements

### 3. `components/breakdown/BreakdownExportReport.tsx` (NEW)
- Created dashboard component mirroring `ShotlistReport.tsx` pattern
- Displays 4 stat cards:
  - **Locations** — Frequency distribution of location names
  - **Cast Frequency** — Comma-split cast names with frequency count
  - **INT / EXT** — Interior vs Exterior scene count
  - **Day / Night** — Day vs Night scene count
- Summary card showing Total Scenes count
- Uses Design Tokens for consistent styling

### 4. `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
- Removed `fontFamily` state
- Updated `viewMode` type: `<'all' | 'single' | 'report'>`
- Replaced zoom `<select>` dropdown with Relative Zoom controller:
  - `-` and `+` buttons with 10% relative steps (`fitZoom * 0.1`)
  - Hard limits: `minScale = fitZoom / 100`, `maxScale = (fitZoom * 2.5) / 100`
  - Display shows percentage relative to fit (e.g., "125% of fit")
- Added "Report" button to View Mode toggle group
- Conditional rendering for report view: `<BreakdownExportReport data={MOCK_DATA} />`
- Removed `fontFamily` prop from child component calls

### 5. `components/shotlist/ShotlistTable.tsx` (Bug Fix)
- Fixed pre-existing TypeScript error: added `list &&` guard before `.map()` to handle potentially undefined list

---

## Technical Debt

None introduced. All changes follow existing architecture patterns.

---

## Build Status

✓ Compiled successfully — No TypeScript errors

---

## Next Steps

Verify in dev server:
1. Relative Zoom controller respects 100%–250% bounds (cannot zoom below fit or above 2.5× fit)
2. Report view renders correctly with stat cards populated from `MOCK_DATA`
3. Font selection UI is removed; all preview elements render in `font-sans`
4. View Mode toggle shows three options: "All Scenes", "Single Scene", "Report"
</file>

<file path="0502_1404_linescript-rich-topbar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to inject a new Rich Text & Zoom Topbar into the Line Script module, mirroring the exact UI design pattern used in the Breakdown Export module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Add Line Script Topbar & Relocate Zoom Controls.

    **Step 1: Inject Topbar into `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Add the `TOOLBAR_BTN` class and `ToolbarDivider` helper function.
    - Restructure the main `return` wrapper from `flex-row` to `flex-col`, inject the new topbar at the top, and wrap the sidebars + workspace in an inner `flex-1 flex` row.
    - Remove the passing of `onZoomIn` and `onZoomOut` to `<ScriptWorkspace>`.

    Locate the zoom bounds block:
    ```tsx
    const ZOOM_STEP = 10;
    const ZOOM_MIN = 50;
    const ZOOM_MAX = 200;
    ```
    Replace with:
    ```tsx
    const ZOOM_STEP = 10;
    const ZOOM_MIN = 50;
    const ZOOM_MAX = 200;

    const TOOLBAR_BTN = 'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
    function ToolbarDivider() {
      return <div className="w-px h-6 bg-outline-variant mx-1 shrink-0" />;
    }
    ```

    Locate the `return` block:
    ```tsx
      return (
        <div className="flex-1 flex overflow-hidden bg-background relative">
          <LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
          <div className="flex-1 overflow-hidden relative p-5 flex justify-center bg-[#f9f9ff]">
            <ScriptWorkspace
              activeTool={activeTool}
              onToolChange={setActiveTool}
              currentPage={currentPage}
              totalPages={120}
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />
          </div>
          <LineScriptRightSidebar isOpen={isRightOpen} onToggle={() => setIsRightOpen((v) => !v)} />
        </div>
      );
    ```
    Replace with:
    ```tsx
      return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center px-6 bg-white border-b border-[#E5E7EB] z-10 gap-1">
            <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0 mr-2">
              <button onClick={handleZoomOut} className={TOOLBAR_BTN}>
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
              <button onClick={handleZoomIn} className={TOOLBAR_BTN}>
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <ToolbarDivider />

            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_color_text</span></button>
            
            <ToolbarDivider />
            
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_align_left</span></button>
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_align_center</span></button>
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_align_right</span></button>

            <ToolbarDivider />

            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>
          </div>

          {/* ── Main Workspace Area ── */}
          <div className="flex-1 flex overflow-hidden relative">
            <LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
            <div className="flex-1 overflow-hidden relative p-5 flex justify-center bg-[#f9f9ff]">
              <ScriptWorkspace
                activeTool={activeTool}
                onToolChange={setActiveTool}
                currentPage={currentPage}
                totalPages={120}
                zoom={zoom}
              />
            </div>
            <LineScriptRightSidebar isOpen={isRightOpen} onToggle={() => setIsRightOpen((v) => !v)} />
          </div>
        </div>
      );
    ```

    **Step 2: Clean up `ScriptWorkspace.tsx`**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Remove `onZoomIn` and `onZoomOut` from `Props` and the component signature.
    - Delete the zoom buttons from the inner `Script Controls Bar` and change its flex alignment.

    Locate the `Props` interface:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      zoom: number;
      onZoomIn: () => void;
      onZoomOut: () => void;
    }
    ```
    Replace with:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      zoom: number;
    }
    ```

    Locate the component signature:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      zoom,
      onZoomIn,
      onZoomOut,
    }: Props) {
    ```
    Replace with:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      zoom,
    }: Props) {
    ```

    Locate the `Script Controls Bar` block:
    ```tsx
        {/* Script Controls Bar */}
        <div className="h-12 border-b border-surface-variant bg-surface-container-low flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onZoomOut}
              className="p-1 rounded text-secondary hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">zoom_out</span>
            </button>
            <span className="text-label-sm text-on-surface-variant">{zoom}%</span>
            <button
              onClick={onZoomIn}
              className="p-1 rounded text-secondary hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">zoom_in</span>
            </button>
          </div>
    ```
    Replace with:
    ```tsx
        {/* Script Controls Bar */}
        <div className="h-12 border-b border-surface-variant bg-surface-container-low flex items-center justify-end px-4 shrink-0">
    ```
  </task>
</system_prompt>
</file>

<file path="0502_1414_linescript-topbar-actions.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to hoist the Share and Export actions from the Line Script right sidebar up to the new Rich Text & Zoom Topbar in the Line Script Container.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Relocate Export & Share buttons to Line Script Topbar.

    **Step 1: Clean up `LineScriptRightSidebar.tsx`**
    - File: `components/linescript/LineScriptRightSidebar.tsx`
    - Remove imports for `useState`, `useParams`, `useRouter`, `ShareScriptModal`, and `ScriptVersion`.
    - Remove the local state `isShareModalOpen` and `MOCK_SCRIPT`.
    - Remove the `<ShareScriptModal>` and the entire `Action Buttons` div from the JSX return.

    Locate the imports and interface block:
    ```tsx
    import { useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';

    interface Props {
      isOpen: boolean;
      onToggle: () => void;
    }
    ```
    Replace with:
    ```tsx
    interface Props {
      isOpen: boolean;
      onToggle: () => void;
    }
    ```

    Locate the component signature and state block:
    ```tsx
    export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
      const params = useParams();
      const router = useRouter();
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);

      const MOCK_SCRIPT: ScriptVersion = {
        id: (params.scriptId as string) || "v1",
        label: "Current Draft",
        description: "Active script version in workspace.",
        modifiedDate: "Today",
        pageCount: 120,
        status: "Draft",
        author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" },
        generalAccess: "Just Crew"
      };

      return (
        <div className="relative h-full shrink-0">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          <aside className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`} >
            {/* Action Buttons */}
            <div className="py-3 px-4 border-b border-outline-variant shrink-0">
              <div className="flex gap-2 w-full">
                <button onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                  <span className="material-symbols-outlined text-[18px]">download</span> Export
                </button>
                <button onClick={() => setIsShareModalOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                  <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
                </button>
              </div>
            </div>
            {/* Header */}
    ```
    Replace with:
    ```tsx
    export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
      return (
        <div className="relative h-full shrink-0">
          <aside className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`} >
            {/* Header */}
    ```

    **Step 2: Inject states and actions into `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Import `useParams`, `useRouter`, `ShareScriptModal`, and `ScriptVersion`.
    - Add `isShareModalOpen`, `MOCK_SCRIPT` states.
    - Append the Share and Export buttons to the right side of the topbar using `ml-auto`.

    Locate the imports block:
    ```tsx
    import { useState } from 'react';
    import ScriptWorkspace from './ScriptWorkspace';
    import LineScriptLeftSidebar from './LineScriptLeftSidebar';
    import LineScriptRightSidebar from './LineScriptRightSidebar';
    import type { ActiveTool } from '@/types/linescript';
    ```
    Replace with:
    ```tsx
    import { useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import ScriptWorkspace from './ScriptWorkspace';
    import LineScriptLeftSidebar from './LineScriptLeftSidebar';
    import LineScriptRightSidebar from './LineScriptRightSidebar';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ActiveTool } from '@/types/linescript';
    import type { ScriptVersion } from '@/types/project';
    ```

    Locate the component signature and state block:
    ```tsx
    export default function LineScriptContainer() {
      const [activeTool, setActiveTool] = useState<ActiveTool>(null);
      const [zoom, setZoom] = useState(100);
      const [currentPage] = useState(24);
      const [isRightOpen, setIsRightOpen] = useState(true);

      function handleZoomIn() {
    ```
    Replace with:
    ```tsx
    export default function LineScriptContainer() {
      const params = useParams();
      const router = useRouter();
      const [activeTool, setActiveTool] = useState<ActiveTool>(null);
      const [zoom, setZoom] = useState(100);
      const [currentPage] = useState(24);
      const [isRightOpen, setIsRightOpen] = useState(true);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);

      const MOCK_SCRIPT: ScriptVersion = {
        id: (params.scriptId as string) || "v1",
        label: "Current Draft",
        description: "Active script version in workspace.",
        modifiedDate: "Today",
        pageCount: 120,
        status: "Draft",
        author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" },
        generalAccess: "Just Crew"
      };

      function handleZoomIn() {
    ```

    Locate the topbar ending and JSX wrapper:
    ```tsx
      return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center px-6 bg-white border-b border-[#E5E7EB] z-10 gap-1">
            {/* ... other tools ... */}
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_align_right</span></button>

            <ToolbarDivider />

            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>
          </div>

          {/* ── Main Workspace Area ── */}
    ```
    Replace with:
    ```tsx
      return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center px-6 bg-white border-b border-[#E5E7EB] z-10 gap-1">
            {/* ... other tools ... */}
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">format_align_right</span></button>

            <ToolbarDivider />

            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>

            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
              <button onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)} className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
            </div>
          </div>

          {/* ── Main Workspace Area ── */}
    ```
  </task>
</system_prompt>
</file>

</files>
