# Scenoo — Current Status

## Last Updated: 2026-05-03 23:03 ICT (UTC+7)

---

## Task: Modernize Sync Architecture Docs (0503_2301)

### Status: COMPLETE

**Files changed:**
- `.scenoo-brain/rules/coding-standards.md`
  - Replaced the manual backup-oriented `data_sync_flow` rules with local optimistic writes to IndexedDB plus automatic background queue sync.
  - Added explicit requirements for delta generation, local sync queueing, and offline-safe deferred sync without manual save/sync buttons.
- `.scenoo-brain/rules/db-schema.md`
  - Replaced the Cloudflare section to describe queue-driven delta sync and Cloudflare D1 as the ordering authority.
  - Added a new `conflict_resolution` block defining Property-Level Last-Writer-Wins (LWW) as the conflict strategy.

**Outcome:**
- `.scenoo-brain` now documents a Figma-style Local-First sync model based on optimistic local persistence, background queue sync, and property-level LWW conflict handling.
- The previous manual one-way backup framing has been removed from the targeted architecture rules.

### Technical Debt
- Documentation now defines the target sync model, but runtime adapter, queue processor, and conflict-resolution implementation still need to match these rules in application code.

### Next Step
Review implementation surfaces against the updated standard:
1) Audit adapters and persistence flows for mutation-to-delta queue creation.
2) Define the background sync worker/process contract with Cloudflare D1/R2.
3) Add implementation notes for property-level conflict metadata if not already documented.

---

## Task: Update Sidebar Branding Logo (0503_2045)

### Status: COMPLETE

**Files changed:**
- `components/dashboard/AppSidebar.tsx`
  - Added `next/image` import for optimized logo rendering in the sidebar header.
  - Replaced the expanded-state text branding block (`Scenoo` / `Production Hub`) with light-mode and dark-mode logo images using Tailwind `dark:` visibility classes.
  - Kept the existing sidebar layout and toggle behavior unchanged by limiting the edit to the branding slot only.

**Outcome:**
- Expanded AppSidebar branding now renders image-based logos for light and dark themes instead of text.
- The implementation uses the requested public asset paths: `/scenoo-full-light-logo.png` and `/scenoo-full-dark-logo.png`.

### Technical Debt
- Logo asset files are not currently present in `public/`; the UI wiring is complete, but those image files still need to be added for the logos to render.

### Next Step
Manual UI check in the workspace shell:
1) Add `/public/scenoo-full-light-logo.png` and `/public/scenoo-full-dark-logo.png` if they have not been committed yet.
2) Open any page using AppSidebar and verify the light logo appears in light theme.
3) Switch to dark theme and verify the dark logo appears with the same sizing and alignment.

---

## Task: Remove Breakdown Zoom Toolbar UI (0503_0920)

### Status: COMPLETE

**Files changed:**
- `components/breakdown/ScriptViewer.tsx`
  - Removed the floating top-left zoom toolbar (`-`, `%`, `+`) from the Breakdown ScriptViewer canvas.
  - Removed toolbar-only handler functions (`handleZoomIn`, `handleZoomOut`) after UI deletion.
  - Kept existing canvas rendering and scroll/zoom footprint logic intact to avoid regressions in layout behavior.

**Outcome:**
- The zoom tool highlighted in Breakdown is no longer visible in the UI.
- ScriptViewer still renders with the same structure and sizing model.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Breakdown:
1) Confirm the top-left zoom widget no longer appears.
2) Verify script canvas still renders and scrolls normally.

---

## Task: Implement Helios Zoom in Breakdown ScriptViewer (0502_1800)

### Status: COMPLETE

**Files changed:**
- `components/breakdown/ScriptViewer.tsx`
  - Added Helios zoom architecture hooks (`useRef`, `useState`, `useEffect`, `useCallback`) with cursor-anchored `adjustZoom(...)` math.
  - Added `ResizeObserver` tracking for dynamic script paper height to drive absolute footprint sizing.
  - Added global Ctrl+Wheel zoom listener scoped to viewer container with bounds clamp `50%..250%`.
  - Added top-left floating zoom toolbar with synchronized `%` readout and center-anchored `+/-` controls.
  - Replaced centered card layout with Absolute Footprint wrapper + scaled content transform to eliminate hardcoded bottom spacing (`mb-20`).

**Outcome:**
- Breakdown ScriptViewer now supports Helios cursor-anchored zoom behavior with stable pointer focus and symmetric footprint padding.
- The page canvas remains centered via absolute footprint math while preserving scroll and zoom consistency.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Breakdown:
1) Ctrl+Wheel zoom keeps pointer anchor stable on tagged text regions.
2) Toolbar `- / +` updates zoom and keeps the canvas centered.
3) Verify no phantom extra bottom space appears at any zoom level.

---

## Task: Sync <Page/120> With Scroll View Position (0502_1751)

### Status: COMPLETE

**Files changed:**
- `components/linescript/ScriptWorkspace.tsx`
  - Added `onCurrentPageChange` prop to sync active page back to parent state.
  - Added scroll-position page detection in `scroll` mode by finding the page whose center is closest to viewport center.
  - Added `data-scroll-page` / `data-page-num` markers on rendered pages for reliable DOM-based detection.
- `components/linescript/LineScriptContainer.tsx`
  - Passed `setCurrentPage` down as `onCurrentPageChange`.
- `components/linescript/LineScriptExportPreview.tsx`
  - Added `data-scroll-page` / `data-page-num` markers on mock pages for export scroll tracking.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Added scroll-position page detection in `scroll` mode, synchronized to `currentPage` state.
  - Updated current page only when nearest visible page changes to avoid redundant updates.

**Outcome:**
- In `scroll` view for both `linescript` and `linescript/export`, the pagination indicator (`<x / 120>`) now updates automatically according to the page currently centered in the viewport while the user scrolls.

### Technical Debt
- None introduced.

### Next Step
Manual UI check:
1) Open `scroll` mode in both tabs.
2) Scroll down/up and verify `<x / 120>` follows the currently viewed page.
3) Zoom in/out and re-check page tracking stability.

---

## Task: Add Breakdown-Style Next/Back Arrows to Line Script Tabs (0502_1740)

### Status: COMPLETE

**Files changed:**
- `components/linescript/ScriptWorkspace.tsx`
  - Added single-mode floating navigation overlay with left/right circular arrow buttons.
  - Added `disablePrev` / `disableNext` handling based on current page bounds.
  - Extended props to receive `onPrevPage` and `onNextPage` callbacks from parent.
- `components/linescript/LineScriptContainer.tsx`
  - Passed `handlePrevPage` and `handleNextPage` to `ScriptWorkspace` for overlay arrow navigation.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Added fixed single-mode floating navigation overlay matching Breakdown Export single-scene UI.
  - Reused existing `handlePrevPage` / `handleNextPage` with disable state guards.
  - Kept overlay outside scroll container to avoid moving with canvas scroll.

**Outcome:**
- Both tabs (`linescript` and `linescript/export`) now have Breakdown Export-style next/back floating arrows in Single Page mode.
- Arrow behavior and disabled states are consistent with page boundary logic.

### Technical Debt
- None introduced.

### Next Step
Manual UI check:
1) In both tabs, switch to Single Page and verify left/right floating arrows are visible.
2) Confirm left arrow disables on page 1 and right arrow disables on final page.
3) Confirm arrows stay fixed while scrolling/zooming the canvas.

---

## Task: Remove Two Pages + Default Single Page (0502_1737)

### Status: COMPLETE

**Files changed:**
- `components/linescript/LineScriptContainer.tsx`
  - Removed `two` from `viewMode` type.
  - Set default `viewMode` to `single`.
  - Updated pagination to always step by 1 page.
  - Removed `Two Pages` toggle button from topbar.
- `components/linescript/ScriptWorkspace.tsx`
  - Removed `two` from `viewMode` prop type.
  - Removed two-page render branch and kept only `single` / `scroll` behavior.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Removed `two` from `viewMode` type.
  - Set default `viewMode` to `single`.
  - Removed `Two Pages` toggle button from topbar.
  - Removed two-page footprint sizing branch.
  - Updated pagination to always step by 1 page.
- `components/linescript/LineScriptExportPreview.tsx`
  - Removed `two` from `viewMode` prop type.
  - Removed two-page preview render branch.

**Outcome:**
- Two-page display mode is fully removed from both Line Script and Line Script Export.
- Both tabs now open in Single Page mode by default.
- Pagination behavior is consistent with single-page navigation only.

### Technical Debt
- None introduced.

### Next Step
Manual UI check:
1) Open Line Script and Line Script Export, confirm initial mode is Single Page.
2) Confirm no `Two Pages` toggle is visible in either topbar.
3) Confirm prev/next pagination always increments/decrements by 1 page.

---

## Task: Move Navigate Scenes to Right Sidebar (0502_1734)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Reordered `LineScriptExportSidebar` to render after the main preview container in the body flex row.
  - Kept all existing props and toggle handlers unchanged.

**Outcome:**
- `Navigate Scenes` sidebar now appears on the right side of the Line Script Export workspace.
- No behavior regression for sidebar open/close or jump-to-page interactions.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script Export:
1) Confirm `Navigate Scenes` appears on the right side.
2) Confirm panel toggle icon still docks correctly and open/close animation works.
3) Confirm clicking a scene still jumps to the target page.

---

## Task: Line Script Export Zoom Baseline 63=>100 + Bounds Lock (0502_1732)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Added visible/effective zoom remap constants so visible `100%` renders at prior effective `63%` (`offset +37 bridge`).
  - Updated pointer-anchored zoom math (`adjustZoom`) to compute content coordinates using effective scale.
  - Locked visible zoom interactions to `100%..250%` across both toolbar `+/-` and Ctrl+Wheel path.
  - Clamped effective wheel scale to `0.63..2.13` to preserve the same visible bound contract.
  - Switched footprint sizing and transform to effective scale so layout matches remapped baseline.

**Outcome:**
- Current visual density that was previously around `63%` is now represented as visible `100%`.
- Users cannot zoom out below `100%` and cannot zoom in above `250%` from any interaction path.
- Cursor-anchored Ctrl+Wheel behavior remains stable after remapping.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script Export:
1) At visible `100%`, verify the preview matches prior visual scale of `63%`.
2) Ctrl+Wheel zoom-out hard-stops at `100%`.
3) Toolbar and Ctrl+Wheel zoom-in hard-stop at `250%`.

---

## Task: Clone Helios Zoom Architecture to Export Page (0502_1735)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Added Helios zoom refs/effects (`useRef`, `useEffect`, `useCallback`) with cursor-anchored `adjustZoom(...)` math.
  - Added global Ctrl+Wheel zoom listener scoped to export scroll container.
  - Bound topbar zoom `+/-` actions to centered `handleZoomIn` and `handleZoomOut` handlers.
  - Added explicit absolute footprint wrapper sized from ViewMode matrix (`single`/`two`/`scroll`) to remove phantom scroll space.
  - Kept `LineScriptExportSidebar` mounted and intact while replacing only the main preview container.
- `components/linescript/LineScriptExportPreview.tsx`
  - Removed hardcoded `pb-20` in `scroll`, `two`, and `single` view wrappers.
  - Relied on footprint wrapper for symmetric 80px padding behavior.

**Outcome:**
- Line Script Export now uses Helios-style absolute footprint zoom behavior consistent with the main Line Script workspace.
- Ctrl+Wheel remains cursor-anchored, toolbar zoom is synchronized, and the export canvas no longer introduces phantom trailing scroll space from stacked paddings.
- Sidebar structure remains preserved with no DOM breakage.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script Export:
1) Ctrl+Wheel inside preview keeps pointer anchor stable across zoom steps.
2) Toolbar `+/-` zooms toward viewport center and clamps at 50%..250%.
3) `single`, `two`, and `scroll` modes render without extra bottom phantom scroll.
4) Sidebar toggle and page jump interactions remain functional.

---

## Task: Line Script Export Action Buttons Restyle (0502_1713)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
  - Restyled top-right action group to match requested compact toolbar style.
  - Updated Share button to secondary style (white background, normal-case label).
  - Updated Export button to primary blue style with dropdown affordance icon.
  - Kept existing click handlers and modal behavior unchanged.

**Outcome:**
- Export page top-right actions now visually match the requested Share + Export button design in the provided mockup.
- No behavior regression: Share still opens share modal, Export still opens export modal.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script Export:
1) Verify top-right Share and Export match the requested visual style.
2) Confirm Share opens the share modal.
3) Confirm Export opens the export upgrade/export modal.

---

## Task: Line Script Zoom Baseline Remap + Bounds Lock (0502_1611)

### Status: COMPLETE

**Files changed:**
- `components/linescript/LineScriptContainer.tsx`
  - Remapped visible zoom to effective canvas zoom using offset bridge (`visible 100% => effective 60%`).
  - Locked visible zoom controls to `100%..250%` for toolbar `+/-` actions.
  - Passed mapped effective zoom into `ScriptWorkspace` and mapped wheel/viewport updates back to visible zoom.
- `components/linescript/ScriptWorkspace.tsx`
  - Added effective zoom bounds `60%..210%` to match visible `100%..250%`.
  - Updated Ctrl+Wheel clamp and defensive `adjustZoom` clamp to prevent over-zoom in/out.

**Outcome:**
- The old visual scale at `60%` now appears as `100%` in the UI.
- Visible zoom cannot go below `100%` or above `250%` via either toolbar buttons or Ctrl+Wheel.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script:
1) At visible `100%`, verify canvas matches old visual density of `60%`.
2) Zoom-out hard stops at `100%`.
3) Zoom-in hard stops at `250%`.

---

## Task: Expand Line Script Canvas to Full Bleed (0502_1517)

### Status: COMPLETE

**Files changed:**
- `components/linescript/LineScriptContainer.tsx`
  - Removed `p-5` and `justify-center` from main workspace wrapper around `ScriptWorkspace`.
  - Updated wrapper classes to `flex-1 overflow-hidden relative flex bg-[#f9f9ff]` for edge-to-edge stretch.
- `components/linescript/ScriptWorkspace.tsx`
  - Removed fixed box constraints (`max-w-[840px]`, surface background card styling, border, rounded corners, shadow) from root container.
  - Updated root classes to fluid full-bleed container: `w-full h-full flex flex-col relative overflow-hidden`.

**Outcome:**
- Line Script PDF workspace now renders as a full-bleed canvas without centered card constraints.
- Viewer area behavior is aligned with the Breakdown Export full-area styling direction.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script:
1) Confirm canvas now touches workspace edges with no outer card frame.
2) Confirm left/right sidebars and top toolbar layout remain stable.
3) Confirm scroll/zoom interactions still behave as expected.

---

## Task: Helios Cursor-Anchored Zoom for Line Script (0502_1513)

### Status: COMPLETE

**Files changed:**
- `components/linescript/LineScriptContainer.tsx`
  - Passed hoisted zoom setter into script workspace via `onZoomChange={setZoom}`.
- `components/linescript/ScriptWorkspace.tsx`
  - Added React hooks (`useRef`, `useEffect`, `useCallback`) and `onZoomChange` prop.
  - Implemented cursor-anchored Ctrl+Wheel zoom math with absolute clamp `50%..250%`.
  - Added external zoom sync effect to keep toolbar zoom and viewport scroll aligned.
  - Replaced scroll body with absolute-footprint wrapper (`700x1056` paper, scaled via transform, centered with guarded offsets).
  - Preserved existing script line map iteration and static mock script content.

**Outcome:**
- Line Script workspace now supports Helios-style cursor-anchored zoom.
- Toolbar zoom and Ctrl+Wheel zoom are synchronized through hoisted parent state.
- Paper footprint remains centered and scrollable across zoom levels without flexbox collision.

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Line Script:
1) Ctrl+Wheel inside paper keeps cursor anchor stable.
2) Toolbar +/- updates zoom without content jump.
3) Zoom hard-stops at `50%` and `250%`.

---

## Task: Remove /shotlist/table Default URL (0502_1329)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx`
  - Removed redirect from `/shotlist` to `/shotlist/table`.
  - Restored direct render of `ShotlistContainer` for module `shotlist`.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/shotlist/[view]/page.tsx`
  - Kept explicit `report` route.
  - Added redirect from `/shotlist/table` back to `/shotlist` to preserve backward compatibility.
  - Invalid view values still return `notFound()`.
- `components/layout/WorkspaceHeader.tsx`
  - Shotlist tab link changed from `/shotlist/table` to `/shotlist`.
- `components/shotlist/ShotlistContainer.tsx`
  - Updated view toggle routing:
    - Table -> `/workspace/{projectSlug}/{scriptId}/shotlist`
    - Report -> `/workspace/{projectSlug}/{scriptId}/shotlist/report`

**Outcome:**
- Default Shotlist URL is now `/shotlist` (as requested).
- `/shotlist/table` is no longer canonical and is redirected back to `/shotlist`.
- Report remains accessible via `/shotlist/report`.

### Technical Debt
- None introduced.

### Next Step
Manual navigation check:
1) Open `/workspace/{projectSlug}/{scriptId}/shotlist` (Table).
2) Switch to Report -> URL should be `/shotlist/report`.
3) Open `/workspace/{projectSlug}/{scriptId}/shotlist/table` -> should redirect to `/shotlist`.

---

## Task: Add Shotlist Table/Report URLs (0502_1250)

### Status: COMPLETE

**Files changed:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx`
  - Added redirect for `shotlist` module path to canonical URL: `/workspace/{projectSlug}/{scriptId}/shotlist/table`.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/shotlist/[view]/page.tsx`
  - Created new route for explicit shotlist views.
  - Supports only `table` and `report`; invalid views return `notFound()`.
- `components/layout/WorkspaceHeader.tsx`
  - Shotlist tab now links to `/shotlist/table`.
  - Active module detection now reads from pathname to support nested shotlist view routes.
- `components/shotlist/ShotlistContainer.tsx`
  - View mode now derives from URL param `view` (`table` or `report`) instead of local toggle state.
  - Table/Report toggle now pushes URLs:
    - `/workspace/{projectSlug}/{scriptId}/shotlist/table`
    - `/workspace/{projectSlug}/{scriptId}/shotlist/report`

**Outcome:**
- Shotlist now has explicit, shareable URLs for both Table and Report modes.
- Existing `/shotlist` path is preserved via redirect to `/shotlist/table`.

### Technical Debt
- None introduced.

### Next Step
Manual navigation check:
1) Open `/workspace/{projectSlug}/{scriptId}/shotlist/table`.
2) Switch to Report and confirm URL becomes `/shotlist/report`.
3) Open legacy `/shotlist` and confirm redirect to `/shotlist/table`.

---

## Task: Shotlist Report Zoom Baseline + Bounds Lock (0502_1246)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistReport.tsx`
  - Added report zoom constants: `MIN_VISIBLE_ZOOM=100`, `MAX_VISIBLE_ZOOM=250`, `REPORT_ZOOM_BASELINE_OFFSET=1`.
  - Updated report scale mapping so visible `100%` now renders with the same visual scale as previous `99%`.
  - Unified scale conversion via `toScale(...)` to keep pointer-anchored zoom math consistent.
  - Updated wheel clamp to lock report zoom strictly between `100%` and `250%`.
  - Added defensive clamp in `adjustZoom(...)` so all zoom inputs respect `100..250` bounds.

**Outcome:**
- In Shotlist Report tab, visible `100%` now matches the previous visual density of `99%`.
- Users cannot zoom out below `100%` and cannot zoom in beyond `250%` (toolbar + Ctrl+Wheel path).

### Technical Debt
- None introduced.

### Next Step
Manual UI check in Report tab: verify visible `100%` equals prior 99% baseline and confirm zoom hard-stops at `100%` and `250%`.

---

## Task: Helios Zoom — Shotlist Report View (0502_1225)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistContainer.tsx`
  - Removed `viewMode === 'table'` condition from Zoom controller — zoom now visible in both Table and Report modes.
  - Added `<ToolbarDivider />` after zoom controller block.
  - Passed `zoom={zoom}` and `onZoomChange={setZoom}` to `<ShotlistReport>`.
- `components/shotlist/ShotlistReport.tsx`
  - Full rewrite: accepts `zoom` and `onZoomChange` props.
  - Fixed-canvas Helios Zoom architecture: `EXACT_WIDTH=1200`, `EXACT_HEIGHT=920`.
  - `baseScale` derived from container height via `ResizeObserver` — 100% maps to height-fit.
  - `Ctrl+Wheel` zoom with pointer-anchored scroll via `adjustZoom` callback.
  - Grid changed from responsive `md:grid-cols-2 lg:grid-cols-3` to fixed `grid-cols-3`.
  - Bug fix: spec had `parseInt(parts, 10)` (array) — corrected to `parseInt(parts[0], 10)`.

**Outcome:**
- Report view now has the same Helios Zoom behavior as the table view.
- Zoom toolbar shows in both modes; Ctrl+Wheel zooms around cursor position.
- 100% zoom default perfectly fits the report canvas to screen height.

### Technical Debt
- None introduced.

---

## Task: Shotlist Toolbar Layout — Move Zoom Left of Bold (0502_1223)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistContainer.tsx`
  - Moved Zoom controller from right action group to left rich-text group.
  - Placed Zoom controller directly before BOLD so it appears on the left side of BOLD.
  - Removed old right-side Zoom block and related divider.
  - Preserved `viewMode === 'table'` condition for Zoom visibility.

**Outcome:**
- Zoom tools now appear on the left toolbar, adjacent to and left of the BOLD button as requested.
- No logic changes to zoom range or mapping.

### Technical Debt
- None introduced.

### Next Step
Quick visual check in Shotlist Table mode to confirm exact spacing/alignment between Zoom and BOLD on desktop and tablet widths.

---

## Task: Shotlist Zoom Scale Remap — 100% Visual Baseline (0502_1220)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistContainer.tsx`
  - Updated toolbar zoom-out clamp from `50` to `100`.
  - Added visible-to-effective remap so visible `100%` maps to effective table `70%`.
  - Added effective zoom bridge for wheel sync: table receives `zoom={zoom - 30}` clamped to `70..220`.
  - Added `handleTableZoomChange` to map table wheel zoom back to visible `100..250`.
- `components/shotlist/ShotlistTable.tsx`
  - Updated wheel clamp to effective range `70%..220%` to align with visible `100%..250%`.

**Outcome:**
- Visual baseline is now shifted: visible `100%` renders like previous `70%` behavior.
- User cannot zoom out below `100%` and cannot zoom in above `250%`.
- Toolbar percentage and Ctrl+Wheel remain synchronized through hoisted state mapping.

### Technical Debt
- None introduced.

### Next Step
Manual check in Shotlist Table mode: verify visible `100%` matches prior density/scale of old `70%`, and verify bounds lock at `100%` and `250%` for both toolbar and Ctrl+Wheel.

---

## Task: Shotlist — Absolute Zoom Toolbar & Hoisted Zoom State (0502_1215)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistContainer.tsx`
  - Added hoisted `zoom` state in container with strict absolute bounds (`50%` to `250%`).
  - Added zoom toolbar (`-`, current `%`, `+`) near search controls.
  - Zoom toolbar only renders when `viewMode === 'table'`.
  - Passed `zoom` and `onZoomChange={setZoom}` into `ShotlistTable`.
- `components/shotlist/ShotlistTable.tsx`
  - Updated props interface to receive `zoom` and `onZoomChange` from parent.
  - Removed local zoom state mutation path and auto-fit-driven zoom mutation.
  - Added external zoom sync effect with top-left anchored scroll recalculation to prevent jump.
  - Updated Ctrl+Wheel zoom path to emit hoisted zoom via `onZoomChange`.
  - Enforced absolute zoom clamp on wheel from `50%` to `250%`.

**Outcome:**
- Shotlist table now initializes and remains at absolute `100%` by default.
- Zoom is fully controlled by container state and synchronized across toolbar + Ctrl+Wheel.
- Existing table render footprint math and transform scale rendering remain unchanged.

### Technical Debt
- None introduced.

### Next Step
Run a quick manual UI check in Shotlist Table mode: confirm toolbar buttons and Ctrl+Wheel both keep zoom in sync and preserve top-left anchored scroll behavior.

---

## Task: Breakdown Export — Relative Zoom, Clean UI, and Breakdown Report (0502_1048)

### Status: COMPLETE

**Files changed:**
- `components/breakdown/ExportPreviewTable.tsx` — Removed `fontFamily` prop entirely. Added `export: 'pdf'` field to `MOCK_DATA` for report consumption.
- `components/breakdown/ExportPreviewSingle.tsx` — Removed `fontFamily` prop entirely. All font classes now hardcoded to `font-sans`.
- `components/breakdown/BreakdownExportReport.tsx` — CREATED. Dashboard mirroring `ShotlistReport.tsx` with 4 cards: Locations, Cast Frequency (split by comma), INT/EXT, Day/Night. Total Scenes summary card in header.
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`:
  - Removed `fontFamily` state entirely.
  - Updated `viewMode` type to `<'all' | 'single' | 'report'>`.
  - Relative zoom clamping: `minScale = fitZoom / 100`, `maxScale = (fitZoom * 2.5) / 100` — enforces 100% to 250% relative limits.
  - Replaced `<select>` zoom control and font selector with custom Relative Zoom controller:
    - Shows relative zoom percentage (e.g., "100% of fit").
    - `-` and `+` buttons step zoom by `fitZoom * 0.1` (10% relative steps).
    - Buttons disabled at bounds (fit zoom and 2.5× fit zoom).
  - Added "Report" button to View Mode toggle group.
  - Conditional rendering: `<BreakdownExportReport data={MOCK_DATA} />` when `viewMode === 'report'`.

**Outcome:**
- Font selection removed — consistent `font-sans` across all export previews.
- Zoom now operates on relative scale (100% = fit, 250% = max) instead of absolute percentages.
- New Report view provides dashboard overview of breakdown data.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Relative zoom controller shows correct percentage relative to fit, (2) zoom bounds prevent going below fit or above 2.5× fit, (3) Report view renders with correct stats from MOCK_DATA.

---

## Task: Breakdown Export Report — Recouple into Canvas with Height Auto-Fit (0502_1143)

### Status: COMPLETE

**UPDATED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`:**
- `exactContentWidth`: Returns `1200px` for report mode (was `794` for all non-all modes)
- `fitZoom`: Added report branch — scales based on `800px` fixed height: `((containerHeight - verticalSafeZone) / 800) * 100`
- `contentRef` left positioning: Changed from `viewMode === 'single' ? ... : ...` to `viewMode !== 'all' ? ... : ...` to center single and report modes
- Report wrapped in fixed container: `w-[1200px] h-[800px]` with border and shadow, rendered conditionally inside `contentRef`

**Outcome:**
- Report now renders INSIDE the scalable canvas as a fixed-dimension "slide" (1200x800)
- Height auto-fits to viewport at 100% zoom
- Consistent centering behavior across single and report modes

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Report view shows 1200x800 fixed-size container, (2) zoom scales based on height fit, (3) container centers correctly in viewport.

---

## Task: Breakdown Export — Flexible Autofit Footprint Mismatch Fix (0502_1015)

### Status: COMPLETE

**UPDATED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Removed legacy `+40` width offset from all-scenes content width baseline.
- Added `allScenesBaseWidth` from strict 17-column sum (`colWidths` fallback to `120`).
- Added DOM-driven width reconciliation: `measuredAllScenesWidth` from `contentRef.scrollWidth` (ResizeObserver path).
- `exactContentWidth` for `viewMode === 'all'` now uses `Math.max(allScenesBaseWidth, measuredAllScenesWidth)` so wrapper math matches physical table width.
- Unified horizontal safe-zone math into one JS pixel source (`viewportInsetX` / `horizontalSafeZone`) for both `fitZoom` and footprint wrapper width.
- Replaced mixed-unit wrapper width formula:
  - from `calc(exactContentWidth * zoom + 4vw)`
  - to `${exactContentWidth * (zoom / 100) + horizontalSafeZone}px`
- Synced visual content left inset with same computed pixel value (`left: ${viewportInsetX}px`) to remove subpixel drift against fit math.

**Outcome:**
- In All Scenes mode, scaled table footprint now tracks actual rendered DOM width, removing phantom horizontal overflow caused by width-model mismatch.
- Zoom engine behavior (`adjustZoom`, wheel handler, toolbar zoom) unchanged.

---

## Task: Breakdown Export — Helios Protocol Absolute Footprint Zoom Engine (0502_0309)

### Status: COMPLETE

**Step 1 — `components/breakdown/ExportPreviewTable.tsx`:**
- Removed `pb-[50vh] pr-[30vw]` safe-zone padding from root wrapper div
- Replaced with `bg-white shadow-sm` — footprint now owned by parent layout wrapper

**Step 2 — `components/breakdown/ExportPreviewSingle.tsx`:**
- Stripped `flex-1 overflow-y-auto bg-[#f9f9ff] py-8` from root div → `flex justify-center items-start gap-8 w-max`
- Both arrow button wrappers: `sticky top-1/2 -translate-y-1/2 mt-[400px]` → `sticky top-[50vh] -translate-y-1/2`

**Step 3 — `page.tsx`:**
- Added `useCallback` to React imports

**Step 4A — `page.tsx` — `ExportPageInner` logic block replaced:**
- Added `colWidths` to `useExportFormat()` destructure
- `exactContentWidth`: computed from `colWidths` sum (17 cols) for `all` mode; `922px` for `single` mode
- `ResizeObserver` on `scrollContainerRef` + `contentRef` → tracks `containerWidth` + `contentHeight`
- `fitZoom`: `(containerWidth - 4vw) / exactContentWidth * 100` — prevents horizontal overflow on load
- `prevViewMode` ref → auto-resets zoom on view mode switch
- `adjustZoom` wrapped in `useCallback` — cursor-anchored scroll recalc via `zoomRef` (avoids stale closure)
- `handleGlobalWheel`: Ctrl+Wheel only inside container, `minScale = fitZoom`, max `3.0×`
- `colorInputRef` preserved for toolbar color picker

**Step 4B — `page.tsx` — Main Content area replaced:**
- Outer wrapper: `flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]` (removed extra nesting div)
- Scroll container: `relative` added
- Footprint div: explicit `width = exactContentWidth × zoom + 4vw`, `height = contentHeight × zoom + 52vh`
- Content div: `position: absolute`, `top/left: 2vw`, `transform: scale(zoom)`, `transformOrigin: 0 0`, `width: exactContentWidth`
- Zero phantom space — scrollbar range exactly matches scaled content bounds

---

## Task: Shotlist — Remove Freeze/Sticky Mechanics (0501_2341)

### Status: COMPLETE

**Changes — `components/shotlist/ShotlistTable.tsx`:**
- Step 1: `renderStat` — removed `isSticky` / `c?.frozen` logic and `style` prop from stat `<td>`
- Step 2: `<thead>` — removed `sticky top-0 z-30`, removed frozen `style` from `<th>` cells
- Step 3: Spacer `<tr>` — removed `sticky z-20` and `style` from spacer `<td>` cells
- Step 4: Data `<td>` — removed `tdFrozenBase`, `baseClass`, `style` vars; all cells now use flat `tdBase`
- Step 5: `<tfoot>` — removed `sticky bottom-0 z-30`

**Outcome:** All `position: sticky` and frozen column/row logic eliminated. Table now scales cleanly under the Helios transform-based zoom system.

---

- Added `useState`, `useRef`, `useEffect`, `useCallback` to `ShotlistTable.tsx` imports
- Injected Helios zoom logic: `adjustZoom` (cursor-anchored scroll recalculation) + `handleGlobalWheel` (Ctrl+Wheel, passive:false, 0.5×–2.0× clamp)
- Wrapped table in safe-zone `div` (`pb-[50vh] pr-[30vw]`) for bottom/right breathing room
- Added `origin-top-left` scale wrapper driven by `zoom` state
- Outer scroll container gets `ref={scrollContainerRef}` + `touch-none`

---

## Task: Shotlist Phase 3 — Column Visibility, Filters & Report Dashboard (0502_2316)

### Status: COMPLETE

**Files changed:**
- `components/shotlist/ShotlistReport.tsx` — CREATED. Production Report dashboard with 9 stat cards (Locations, Int/Ext, Day/Night, Subjects, Shot Sizes, Shot Types, Angles, Movements, Lenses) + Total Shots / Est. Time summary.
- `components/shotlist/ShotlistTable.tsx` — OVERWRITTEN. Now accepts `visibleCols?: string[]`. Frozen column `left` positions recalculated dynamically at render time so no gaps appear when a frozen column is hidden.
- `components/shotlist/ShotlistContainer.tsx` — PATCHED. Added `ALL_COLUMN_KEYS`, `ShotlistReport` import, `viewMode / visibleCols / isColMenuOpen / isFilterMenuOpen` states, `toggleColumn` helper, Table/Report view-mode toggle, Cols dropdown with Reset, Filter placeholder dropdown. Footer hidden in Report mode. Footer `totalScriptTime` now uses `filteredShots` (was `shots`).

**Bug fixes applied vs spec:**
- `parseInt(parts, 10)` → `parseInt(parts[0], 10)` in `ShotlistReport` time accumulator.
- `e.target.files?.` → `e.target.files?.[0]` in storyboard input handler.

---

## Task: ShotlistTable Phase 2 — Footer & Storyboard Upload (0501_2315)

### Status: COMPLETE

**UPDATED `components/shotlist/ShotlistTable.tsx`**
- Added `useMemo` aggregation block: totalShots, totalScenes, timeFormatted, locStats, ieStats, dnStats, sizeStats, typeStats, angleStats, movStats, lensStats, subjStats, charStats, dialogueCount
- Fixed spec bug: `parseInt(parts, 10)` → `parseInt(parts[0], 10)` in scriptTime accumulator
- Fixed spec bug: `e.target.files?.` → `e.target.files?.[0]` in file input onChange
- `renderStat()` helper returns sticky-aware `<td>` with `group-hover` popover listing frequency breakdown
- `<tfoot sticky bottom-0 z-30>` renders 1 summary row across all 18 columns; empty cells for STORYBOARD, DESCRIPTION, SIDE, NOTE columns
- STORYBOARD `<td>` replaced with image dropzone: dashed-border `<label>`, `<input type="file" accept="image/*" hidden>`, edit overlay on hover when `storyboardUrl` exists, `add_a_photo` icon otherwise

---

## Task: ShotlistTable Native HTML Table Refactor (0501_2305)

### Status: COMPLETE

**REWROTE `components/shotlist/ShotlistTable.tsx`**
- Discarded old `div flex` layout; removed imports of `ShotlistTableHeader` and `ShotlistTableRow`
- Implemented `spanMap` algorithm: tracks `rowSpan` per row ID; `currentGroupRoot` resets on `sceneNumber` OR `location` boundary
- Injects `{ type: 'spacer' }` items whenever `sceneNumber` changes between consecutive rows
- `<table>` uses `border-collapse: collapse` + `table-layout: fixed`
- `<colgroup>` enforces exact pixel widths for all 18 columns
- Frozen columns (`#`, `SC#`, `SH#`) use `position: sticky` with explicit `left` offsets (0 / 48px / 112px); `z-index: 20/40`
- `SC#` and `LOCATION` cells rendered with `rowSpan` only when `showGroupCells === true` (root of group)
- Spacer rows render 3 individual frozen `<td>` + 1 `colSpan={15}` cell, all `bg-surface-container`
- Tailwind `group` on `<tr>` + `group-hover:bg-surface-container-low` on `<td>` ensures sticky cells highlight on row hover

---

---

## Task: Remove Rulers & Freeze Panes from Breakdown Export (0501_1644)

### Status: COMPLETE

**REWROTE `components/breakdown/ExportPreviewTable.tsx`**
- Removed `freezeCols`, `freezeRows` props; removed `getColLeft`/`useCallback`; removed `LETTERS` constant
- Removed all `position: sticky`, `zIndex: 40/50`, and `transform: translate(...)` from `<th>`/`<td>`
- All `<th>`/`<td>` now use `position: relative` only
- Added `<colgroup>` with `colWidths` applied per column
- Outermost `<div>` enforces safe zone: `w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]`
- `rowHeights` indexing corrected: header row 1 → `rowHeights[1]`, header row 2 → `rowHeights[2]`, data rows → `rowHeights[rowIndex + 3]`
- Removed stale "Infinite Bottom Ruler" `<tr>` with sticky left cell
- Virtual pop-out editor (`isEditing`) fully preserved with viewport-clamp `ref` callback

**TARGETED EDITS `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Removed `LETTERS` constant
- Removed state: `freezeCols`, `freezeRows`, `resizing`, `isFreezeMenuOpen`
- Removed hooks destructured: `colWidths`, `setColWidths`, `rowHeights`, `setRowHeights`
- Deleted `startResize` function and its `useEffect` resize handler
- Deleted `topRulerRef`, `leftRulerRef`, `syncRulers`
- Deleted Freeze Menu button + dropdown JSX entirely
- Restructured Main Content: removed Top Ruler row, Left Ruler column, Content Row wrapper; replaced with flat `bg-[#f9f9ff]` div + single scroll container (no `onScroll`, no `--zoom-factor` CSS var)
- `<ExportPreviewTable>` call stripped of `freezeCols`/`freezeRows` props

---

---

## Task: Shotlist Rich Topbar (0501_1640)

### Status: COMPLETE

**MODIFIED `components/shotlist/ShotlistContainer.tsx`**
- Added imports: `useParams`, `ShareScriptModal`, `ExportUpgradeModal`, `ScriptVersion`
- Added `TOOLBAR_BTN` constant + `ToolbarDivider` component
- Injected modal state: `isShareModalOpen`, `isExportMenuOpen`, `exportType`
- Added `MOCK_SCRIPT` object seeded from route `params.scriptId`
- Replaced toolbar with: rich-text tools (bold/italic/underline/color/align/link) on left, search + New Shot + Share + Export dropdown on right
- Footer simplified to `{filteredShots.length} Shots` + `Est. Time`
- Both modals (`ShareScriptModal`, `ExportUpgradeModal`) wired and rendering

---

## Task: Hotfix — ExportUpgradeModal dynamic exportType (0501_1638)

### Status: COMPLETE

**REPLACED `components/linescript/ExportUpgradeModal.tsx`**
- Added `exportType?: 'pdf' | 'csv' | 'sheets' | null` to Props (default `'pdf'`)
- Added `CONTENT` map with per-type `title`, `message`, `icon`, `secondaryLabel`, `secondaryIcon`
- `pdf` → "Export with Watermark" secondary button; `csv`/`sheets` → "Cancel" secondary button
- `z-[200]` preserved (not lowered to `z-[1]` as spec draft had — stacking fix from prior session)
- Secondary button click: `if (type === 'pdf')` guard before watermark log, then always calls `onClose()`

---

## Task: Hotfix — ExportUpgradeModal alert removal (0501_1620)

### Status: COMPLETE

**MODIFIED `components/linescript/ExportUpgradeModal.tsx` line 42**
- Removed `alert("Mock: Generating PDF with watermark...")` — replaced with `console.log`.
- z-index Step 1 skipped: `z-[200]` was already applied by prior session (0501_2312 resolution).

---

## Task: Hotfix — ExportUpgradeModal z-index (0501_1617 + 0501_2312 resolution)

### Status: COMPLETE

**MODIFIED `components/linescript/ExportUpgradeModal.tsx` line 16**
- `z-[1]` → `z-[200]` (project modal standard per `0426_2152_report_fix-modal-zindex.md`)
- Modal now renders above `LineScriptExportSidebar` (`z-20`), topbar (`z-30`), and all dropdowns.

---

## Task: Helios Protocol — Export Layer Audit (0501_2312)

### Status: COMPLETE (Report Only — No Code Modified)

**CREATED `.scenoo-brain/reports/0501/0501_2312_report-helios-export-layer-audit.md`**

**Root Cause Identified:**
- `ExportUpgradeModal` overlay uses `z-[1]` (z-index: 1).
- `LineScriptExportSidebar` root div uses `z-20` (z-index: 20).
- Both compete in the same root stacking context → sidebar paints over modal.

**Fix Required (one line):**
- `components/linescript/ExportUpgradeModal.tsx` line 16: `z-[1]` → `z-[200]`

**Project z-index standard for modals:** `z-[200]` (established in `0426_2152_report_fix-modal-zindex.md`).

---

## Task: Line Script Export — Export Upgrade Modal (0501_1608)

### Status: COMPLETE

**CREATED `components/linescript/ExportUpgradeModal.tsx`**
- Client Component with `isOpen`/`onClose` props.
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[1]` (renders above sticky headers).
- Two CTAs: "Upgrade Plan" → `router.push('/settings/plans')`, "Export with Watermark" → mock alert + close.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`**
- Added `ExportUpgradeModal` import.
- Added `isExportModalOpen` state.
- `handleExportClick` now calls `setIsExportModalOpen(true)` (removed `alert()`).
- `<ExportUpgradeModal>` injected after `<ShareScriptModal>` in return block.

---

## Task: Line Script Export — PDF Viewer Interface (0501_1600)

### Status: COMPLETE

**REWRITTEN `components/linescript/LineScriptExportPreview.tsx`**
- Replaced old A4 input-grid with `MockScriptPage` renderer (794×1123px, dashed placeholder).
- Supports 3 view modes: `single` (1 page), `two` (spread, right page optional), `scroll` (5 pages + overflow count).
- Props: `viewMode`, `currentPage`, `totalPages`.

**REWRITTEN `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`**
- Uses `use(params)` for async `Promise<{projectSlug, scriptId}>` params.
- 3-column topbar: Back+Title | ViewMode switcher | Pagination+Zoom+Share+Export.
- Pagination chevrons appear only for `single`/`two` modes; two-page mode jumps by 2.
- `handleJumpToPage` switches from `scroll` → `single` before jumping.
- Share button opens `ShareScriptModal` with `MOCK_SCRIPT: ScriptVersion`.
- Export button shows premium upsell alert.
- `LineScriptExportSidebar` wired with toggle + `onJumpToPage`.

**`components/linescript/LineScriptExportSidebar.tsx`** — already matched spec, no changes needed.

---

## Task: Line Script Export Page — A4 Preview + Route + Export Button (0501_1545)

### Status: COMPLETE

**CREATED `components/linescript/LineScriptExportPreview.tsx`**
- A4 layout (`794px × 1123px`), `shadow-[4px_4px_0_#bbb]`, strict `1px solid #E5E7EB` borders.
- 3-col header: LINE SCRIPT | editable PROJECT TITLE | BRANDING LOGO placeholder.
- Body rows: 4-col (Shot #, Shot Size, Shot Type, Angle) → 2-col (Movement, Lens) → Description textarea → Note textarea → flex-fill footer.
- Borderless `<input>` / `<textarea>` for print-ready editing.

**CREATED `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`**
- Client Component with zoom state (50–200%, step 10).
- Topbar: back arrow, title, zoom controls, Print PDF button.
- Zoom applied via `transform: scale(zoom/100)` with `origin-top`.

**MODIFIED `components/linescript/LineScriptRightSidebar.tsx`** (3 targeted edits)
- Added `useRouter` import alongside existing `useParams`.
- Added `const router = useRouter()` in component body.
- Export button wired: `router.push(\`/workspace/\${projectSlug}/\${scriptId}/linescript/export\`)`.

---

## Last Updated: 2026-04-30 23:14 ICT (UTC+7)

---

## Task: LineScriptRightSidebar — Replace header with Export/Share action buttons (0430_2314)

### Status: COMPLETE

**MODIFIED `components/linescript/LineScriptRightSidebar.tsx`** (2 targeted replacements)

- **Imports added:** `useState`, `useParams`, `ShareScriptModal`, `ScriptVersion` type.
- **Header removed:** "Shot Details" `h-16` title block replaced entirely.
- **Action Buttons added:** `py-3 px-4` bar with two full-width buttons side-by-side:
  - `Export` — `download` icon, hover bg, border, uppercase tracking.
  - `Share` — `ios_share` icon, wires `onClick → setIsShareModalOpen(true)`.
- **`ShareScriptModal` mounted** above `<aside>`, fed `MOCK_SCRIPT` built from `useParams().scriptId` (fallback `"v1"`), `canManage={true}`.
- All 8 body form fields untouched.

---

## Task: Populate LineScriptRightSidebar with Shot Details form (0430_2257)

### Status: COMPLETE

**REPLACED `components/linescript/LineScriptRightSidebar.tsx`**

Full file rewrite (was empty stub):

- **Width:** Changed `w-72` → `w-80` for comfortable form viewing.
- **Header:** "Shot Details" title, `h-16`, `border-b border-outline-variant`.
- **8 form fields added:**
  - `Shot #` — text input, `defaultValue="1"`
  - `Shot Size` — `<select>` with 10 options + `expand_more` chevron icon
  - `Shot Type` — `<select>` with 11 options + chevron
  - `Angle` — `<select>` with 5 options + chevron
  - `Movement` — `<select>` with 6 options + chevron
  - `Lens` — text input, placeholder `"e.g. 35mm"`
  - `Description` — `<textarea rows={3}>`, `resize-none`
  - `Note` — `<textarea rows={2}>`, `bg-[#F9FAFB]`, `resize-none`
- All `<select>` elements use `appearance-none` + absolute-positioned `material-symbols-outlined` chevron.
- Toggle button retained: `right_panel_close` / `right_panel_open` icons.

---

## Task: Inject ShareScriptModal into BreakdownSidebar (0430_2250)

### Status: COMPLETE

**MODIFIED `components/breakdown/BreakdownSidebar.tsx`**

3 targeted replacements executed:

- **Imports:** Added `useState`, `ShareScriptModal`, `ScriptVersion` imports.
- **State + Mock data:** Injected `isShareModalOpen` state + `MOCK_SCRIPT: ScriptVersion` (uses `params.scriptId` with `"v1"` fallback). `<ShareScriptModal>` rendered before `<aside>`.
- **Share button:** Wired `onClick={() => setIsShareModalOpen(true)}` to the existing Share button.

---

## Task: Helios Alignment Fix — Rulers Converted to Collapsed Tables (0430_2209)

### Status: COMPLETE

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**

Two targeted replacements executed:

- **Top Ruler:** Replaced flex-div strip with `<table tableLayout=fixed borderCollapse=collapse>` + `<colgroup>` inside GPU `scale(zoom/100)` wrapper. Removed JS zoom multiplication from cell widths. Frozen `<th>` now corrects via `translateX(calc(var(--scroll-x, 0px) / var(--zoom-factor, 1)))` (content space, not screen space). `ref={topRulerRef}` remains on outermost div.
- **Left Ruler:** Replaced flex-col strip with `<table tableLayout=fixed borderCollapse=collapse>` inside GPU `scale(zoom/100)` wrapper. Removed JS zoom multiplication from row heights. Fixed row index references (spacer rows use `rowHeights[1]` and `rowHeights[2]`). Frozen `<th>` corrects via `translateY(calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))`. `ref={leftRulerRef}` remains on outermost div.

Resolves all 3 alignment pillars from 0430_2141 diagnostic: border-collapse discrepancy, sub-pixel cumulative drift, and frozen-cell coordinate-space mismatch.

---

## Task: Helios Protocol — Ruler Alignment Diagnostic Report (0430_2141)

### Status: COMPLETE (Diagnosis only — no code modified)

**CREATED `.scenoo-brain/reports/0430/0501_0445_report-helios-ruler-alignment.md`**

Diagnosed all 3 pillars of ruler misalignment:

- **Pillar 1 (Border-Collapse Discrepancy):** Table uses `borderCollapse: collapse` (shared 1px borders); flex ruler uses `border-r` with `border-box` (border inside width). Structural column boundary math diverges at non-trivial `colWidths`. Fix: rebuild ruler strip as `<table borderCollapse=collapse>` OR apply `ml-[-1px]` to all non-first ruler cells.
- **Pillar 2 (Sub-pixel Rounding):** Ruler cells use JS multiplication `colWidths[i] * (zoom/100)` — each cell rounds independently, cumulative drift over 17 columns. Table uses GPU `transform: scale()` — single float multiply with no per-cell rounding. Fix: remove JS zoom multiplication from ruler cells; wrap ruler strip in `transform: scale(zoom/100)` div (same as table container).
- **Pillar 3 (40px Offset + Frozen Column Transform):** 40px alignment is correct with `border-box`. Bug identified: ruler frozen column uses `translateX(var(--scroll-x))` (screen space) which is correct NOW but must become `translateX(calc(var(--scroll-x) / var(--zoom-factor)))` (content space) after the Pillar 2 scale-wrapper fix is applied.

Report includes 6-step action plan and verification checklist for `page.tsx`.

---

## Task: Helios Decoupled Rulers — Phase 3 Resize Migration (0430_2045)

### Status: COMPLETE

**MODIFIED `components/breakdown/ExportPreviewTable.tsx`**
- Removed `useEffect` from React imports (no longer needed in this file).
- Removed `resizing` state, `autoFitColumn`, `autoFitRow`, `startResize` functions, and resize `useEffect`.
- Removed `<div onMouseDown cursor-col-resize onDoubleClick>` drag handle from `LETTERS.map` thead row.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Added `LETTERS` constant at module level.
- Moved `useExportFormat()` destructure BEFORE zoom state; expanded to include `colWidths`, `setColWidths`, `setRowHeights`.
- Injected `resizing` state, `startResize`, and resize `useEffect` (with zoom-compensation delta: `delta / (zoom/100)`) after zoom state.
- Restructured Main Content outer div: `flex-1 flex overflow-hidden w-full relative` → `flex-1 flex flex-col overflow-hidden w-full relative`.
- Added Top Ruler row (24px height, `viewMode === 'all'`): corner spacer (40px) + `<div ref={topRulerRef}>` with `LETTERS.map` — each cell width = `colWidths[i] * (zoom/100)`, drag handle on right edge calls `startResize('col', i)`.
- Added Content Row (`flex flex-1 overflow-hidden`) wrapping Left Ruler + scroll container.
- Updated Left Ruler: spacer 1 = `rowHeights[1]`, spacer 2 = `rowHeights[2]`, data rows = `rowHeights[i+3]` (indices 3–14); each has bottom-edge `cursor-row-resize` drag handle.

## Last Updated: 2026-04-30 20:11 ICT (UTC+7)

---

## Task: Helios Decoupled Sync-Scroll Rulers — Phase 2 (0430_2011)

### Status: COMPLETE

**MODIFIED `components/breakdown/ExportPreviewTable.tsx`**
- `getColLeft`: starting `left` changed from `40` → `0` (row-number column extracted to page-level ruler).
- Removed corner `<th>` (w-[40px] sticky left-0) from Row 0 (Letters header).
- Removed row-number `<th>` (sticky left-0 …>1</th>) from Row 1 (Document Header).
- Removed row-number `<th>` (sticky left-0 …>2</th>) from Row 2 (Data Headers).
- Removed row-number `<td>` (w-[40px] sticky left-0 … {rowIndex + 3}) from all MOCK_DATA rows.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Added `topRulerRef` and `leftRulerRef` (`useRef<HTMLDivElement>(null)`).
- Added `syncRulers()` — reads `scrollLeft`/`scrollTop`, applies `translateX` to `topRulerRef` and `translateY` to `leftRulerRef` inside `requestAnimationFrame`.
- Added `rowHeights` to `useExportFormat()` destructuring.
- Restructured Main Content: outer `flex-1 flex overflow-hidden` now contains an inner `flex-1 flex overflow-hidden w-full relative` wrapper holding the Left Ruler strip + scroll container.
- Left Ruler strip (40px wide, `viewMode === 'all'` only): 2 header spacers (41 × zoom/100 px each) + 12 data row counters (rowHeights[i] × zoom/100 px each, fallback 41px), numbers 3–14.
- Scroll container: added `onScroll={syncRulers}`.

---

## Last Updated: 2026-04-30 18:12 ICT (UTC+7)

---

## Task: Helios Protocol — Decoupled Sync-Scroll Rulers Blueprint (0430_1812)

### Status: COMPLETE (Blueprint Only — No Source Code Modified)

**CREATED `.scenoo-brain/reports/0430/0430_1812_report-helios-decoupled-rulers.md`**

Full architectural blueprint delivered across 4 pillars:

- **Pillar A — DOM Extraction:** Root-caused `position: sticky` failure inside `transform: scale()`. Defined the 4-zone layout (Corner, Top Ruler, Left Ruler, Scroll Container). Identified all DOM nodes to extract from `ExportPreviewTable.tsx`.
- **Pillar B — Sync-Scroll Math:** Passive `scroll` listener + `requestAnimationFrame` sync. Exact formulas: `topRuler.style.transform = translateX(−scrollLeft)`, `leftRuler.style.transform = translateY(−scrollTop)`.
- **Pillar C — Zoom Synchronization:** Ruler cells live outside `scale()` wrapper — each cell dimension must be multiplied by `zoom / 100` in JS. Sub-pixel rounding strategy at non-integer zoom levels documented. `will-change: transform` scoped to strip containers only.
- **Pillar D — Migration Plan:** 5-phase step-by-step roadmap (Preparation → Top Ruler → Left Ruler → Column Resize Migration → Freeze Replacement → Cleanup). Risk register with 5 identified hazards and mitigations.

---

## Last Updated: 2026-04-30 10:25 ICT (UTC+7)

---

## Task: Apply Helios Cursor-Anchored Zoom to Export Module (0430_1023)

### Status: COMPLETE

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Added `useEffect` to React import.
- Added `scrollContainerRef = useRef<HTMLDivElement>(null)` inside `ExportPageInner`.
- Added `adjustZoom(newScale, clientX, clientY)` helper — reads current `scrollLeft/Top`, computes content pixel under cursor, calculates new scroll offsets, applies via `requestAnimationFrame` after state flush.
- Added `useEffect` wheel listener on `scrollContainerRef` — intercepts `ctrlKey` + trackpad pinch (`e.deltaY`), logarithmic scale via `Math.exp(-deltaY * 0.005)`, clamped 0.5–2.0, delegates scroll compensation to `adjustZoom` via `setTimeout(0)`. `{ passive: false }` blocks native browser zoom.
- Added `handleToolbarZoom(targetZoom)` — zooms anchored to viewport center; wired to Zoom `<select>` `onChange`.
- Scroll container div: added `ref={scrollContainerRef}` and `touch-none` class.
- Inner scale div: `transformOrigin` changed `'top center'` → `'0 0'`; `transition` removed; added `width: calc((100 / ${zoom}) * 100%)` and `height: calc((100 / ${zoom}) * 100%)` for footprint compensation.

**MODIFIED `components/breakdown/ExportPreviewTable.tsx`**
- Outermost `<div>` stripped of `h-full overflow-auto custom-scrollbar` — now `<div className="w-full bg-surface-container-lowest">`. All scrolling delegated to `scrollContainerRef` in `page.tsx`.
- Inner `pb-[50vh] pr-[30vw] w-max` safe zone wrapper preserved intact.

---

## Last Updated: 2026-04-30 10:10 ICT (UTC+7)

---

## Task: Helios Protocol — Cursor-Anchored Zoom Analysis Report (0430_1010)

### Status: COMPLETE

**CREATED `.scenoo-brain/reports/0430/0430_1010_report-helios-zoom-analysis.md`**
- Full architectural analysis and blueprint for implementing Google Sheets/Figma-style cursor-anchored zoom in the Export Module.
- **Pillar A:** `wheel` event interception with `{ passive: false }` to suppress native browser zoom on `ctrlKey` + pinch.
- **Pillar B:** Logarithmic scaling math via `Math.exp(-deltaY * ZOOM_SPEED)` — replaces linear `<select>` with smooth continuous zoom; constants: `ZOOM_SPEED=0.001`, `MIN=0.25`, `MAX=3.0`.
- **Pillar C:** Exact cursor-anchored scroll compensation math — derives content coordinate under cursor, calculates `newScrollLeft/Top` after scale ratio change, applies via `requestAnimationFrame` after React flush.
- **Pillar D:** DOM footprint compensation — `width: calc((1/zoom) * 100%)` on the scale wrapper's parent to keep scrollbars matching visual content size; `ResizeObserver` strategy for dynamic table widths.
- **Implementation Roadmap:** Two-phase plan targeting `page.tsx` (wheel hook + outer scroll viewport refactor) and `ExportPreviewTable.tsx` (remove inner `overflow-auto` to consolidate scroll into one container).
- Zero source files modified — analysis only.

---

## Last Updated: 2026-04-30 09:45 ICT (UTC+7)

---

## Task: Add Safe Zone to ExportPreviewTable (0430_0938)

### Status: COMPLETE

**MODIFIED `components/breakdown/ExportPreviewTable.tsx`**
- Wrapped `<table>` inside `<div className="pb-[50vh] pr-[30vw] w-max">` inside the existing `overflow-auto` container.
- Adds 50vh bottom + 30vw right scrollable padding so the pop-out editor never hits viewport edges.
- Zero changes to table logic, sticky headers, z-indexes, matrix selection, or resize/collision-detection refs.

---

## Last Updated: 2026-04-30 09:30 ICT (UTC+7)

---

## Task: Add Share Button & ShareExportModal to Export Page (0430_0922)

### Status: COMPLETE

**CREATED `components/breakdown/ShareExportModal.tsx`**
- Client Component. Props: `isOpen: boolean`, `onClose: () => void`.
- State: `emails: string[]`, `inputValue: string`, `access: string` (default `"Just Crew"`).
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]` — corrected from spec's `z-[1]` (would be behind topbar's `z-50`); matches `ShareScriptModal` pattern.
- Email chip input: Enter → validate `@` + dedup → chip; `close` icon removes chip.
- `handleClose`: clears `emails` + `inputValue`, calls `onClose`.
- People section: mock "Tri Pham (you)" row with amber "TP" avatar, Owner label.
- General Access: controlled `<select>` with `access` state driving lock/public icon and description text.
- Footer: "Copy link" secondary button (left) + "Share"/"Done" primary button (right), both call `handleClose`.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Imported `ShareExportModal`.
- Added `isShareModalOpen` state (default `false`).
- Rendered `<ShareExportModal>` alongside `<ExportUpgradeModal>` at root of `ExportPageInner`.
- Replaced `<div className="relative shrink-0 ml-4">` Export wrapper with a new `<div className="flex items-center gap-3 ml-4 shrink-0">` group containing: Share button (`ios_share` icon, white/border style) → Export dropdown wrapper (`relative shrink-0`, no `ml-4`).

---

## Last Updated: 2026-04-30 09:20 ICT (UTC+7)

---

## Task: Floating Navigation Arrows for Single Scene View (0430_0911)

### Status: COMPLETE

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Added `currentIndex`, `disablePrev`, `disableNext`, `handlePrev`, `handleNext` derived from `MOCK_SCENES` + `activeSceneId`.
- Passed 4 new props (`onPrev`, `onNext`, `disablePrev`, `disableNext`) down to `<ExportPreviewSingle />`.

**MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**
- Updated `Props` interface to include `onPrev?`, `onNext?`, `disablePrev?`, `disableNext?`.
- Root `<div>` layout changed to `flex justify-center items-start py-8 gap-8`.
- Left arrow button (chevron_left) inserted before A4 wrapper; sticky + `mt-[400px]` + `print:hidden`.
- Right arrow button (chevron_right) inserted after A4 wrapper; same structure wired to `onNext`/`disableNext`.

---

## Task: Rich UI for Export Scene Sidebar (0430_0906)

### Status: COMPLETE

**MODIFIED `components/breakdown/ExportSceneSidebar.tsx`**
- Removed local `Scene` interface; now imports `Scene` from `@/types/breakdown`.
- Scene list rows rewritten to match Breakdown module layout: `flex items-start gap-3 p-3 border-b border-outline-variant`.
- Checkbox wrapped in `div pt-0.5` (left side). Right side is a `<button>` triggering `onActiveChange`.
- Button interior: top row — `SCENE 01` label (`text-label-sm font-bold`, `text-primary` when active, `text-secondary` otherwise) + `INT. DAY` badge (`text-[10px] uppercase font-bold text-outline`). Bottom row — location (`text-body-md truncate`, `text-on-surface` when active, `text-on-surface-variant` otherwise).
- Active row gets `bg-primary-fixed/10` background; inactive rows get `hover:bg-surface-container`.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- `MOCK_SCENES` replaced with 10 full `Scene` objects (id, number, location, intExt, dayNight). All `as const` typed correctly.

---

## Task: Single Scene Selection Sidebar & Multi-Tab Export Logic (0430_0900)

### Status: COMPLETE

**CREATED `components/breakdown/ExportSceneSidebar.tsx`**
- Client Component. Props: `scenes`, `selectedIds`, `onSelectionChange`, `activeSceneId`, `onActiveChange`.
- Layout: `<aside className="w-80 h-full bg-surface-container-lowest border-l border-outline-variant flex flex-col shrink-0">`.
- Header: "Export Scenes" title + Select All checkbox with indeterminate state via `useRef`.
- Custom Range Input: `useEffect` on `rangeInput` → `parseRangeString()` → handles ranges (`1-3`), singles (`5`), reversed ranges, trailing commas, non-numeric segments. Only fires `onSelectionChange` when resolved set is non-empty.
- Scene List: scrollable, each row has accent-primary checkbox + clickable button label; active scene highlighted with `text-primary font-medium`.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Added `MOCK_SCENES`: 10 scenes, id `s1`–`s10`, number `1`–`10`.
- Added `activeSceneId` state (default `'s1'`); `selectedExportIds` state (default `new Set(['s1'])`).
- Imported `ExportSceneSidebar`; rendered after center view div, gated on `viewMode === 'single'`.
- Passed `activeSceneId` to `<ExportPreviewSingle activeSceneId={activeSceneId} />`.
- Added architecture comments in PDF, CSV, Sheets export `onClick` handlers.

**MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**
- `Props` now accepts `activeSceneId?: string`.
- `sceneNumber` derived via `activeSceneId.replace(/\D/g, '') || '1'`.
- `MetaField` extended with `defaultValue?: string`; initializes `useState(defaultValue ?? '')`.
- Scene `#` MetaField keyed on `activeSceneId` (forces remount on scene change) + `defaultValue={sceneNumber}`.

---

## Task: Refactor Export Topbar & Dynamic Upgrade Modal (0430_0848)

### Status: COMPLETE

**DELETED `components/breakdown/ExportRightSidebar.tsx`**
- File removed entirely — sidebar replaced by inline topbar controls.

**CREATED `components/breakdown/ExportUpgradeModal.tsx`**
- Client Component. Props: `isOpen`, `onClose`, `exportType: 'pdf' | 'csv' | 'sheets' | null`.
- `CONTENT` lookup table maps each exportType → `{ title, message, secondaryLabel }` — zero branching in JSX.
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]` — covers `z-50` topbar safely.
- Container: `bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full p-6`.
- **pdf**: "Export with Watermark" secondary → `onClose`; "Upgrade Plan" primary → `/settings/plans`.
- **csv/sheets**: "Cancel" secondary → `onClose`; "Upgrade Plan" primary → `/settings/plans`.
- Returns `null` when `!isOpen || !exportType` — zero DOM mount when closed.

**MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
- Removed `ExportRightSidebar` import + JSX; removed `isRightOpen` state.
- Added `exportType: 'pdf' | 'csv' | 'sheets' | null` state (default `null`).
- Added `isExportMenuOpen: boolean` state (default `false`).
- `<ExportUpgradeModal>` mounted just inside root `<div>` before the topbar.
- **View Mode Toggle** appended to topbar with `ml-auto` — pushes controls to far right. Active button: `bg-white shadow-sm text-on-surface font-medium`. Inactive: `text-on-surface-variant hover:text-on-surface`.
- **Export dropdown** button: `bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 + expand_more icon`.
- Dropdown items: PDF (`picture_as_pdf`, `text-on-surface`) + CSV (`lock`, `text-on-surface-variant`) + Google Sheets (`lock`, `text-on-surface-variant`). All 3 call `setExportType + setIsExportMenuOpen(false)`.
- Main content area now has no right sidebar sibling — full width.

**Note on z-index**: Task spec said `z-[1]` on modal overlay; corrected to `z-[200]` — `z-[1]` cannot cover a `z-50` topbar. This matches the stated intent ("safely cover z-50 dropdown menus"). Prior z-index fix session (0427_2115) confirms the codebase corrects `z-[1]` typos to proper values.

---

## Last Updated: 2026-04-30 08:30 ICT (UTC+7)

---

## Task: Pop-out Editor UX Enhancements — Smart Positioning & Dimensions (0430_0830)

### Status: COMPLETE

**`components/breakdown/ExportPreviewTable.tsx`**
- Pop-out `style`: added `minHeight: Math.max(124, rowHeights[rowIndex] || 41)` alongside existing `minWidth` ✅
- Collision detection `ref` callback: repositions pop-out to `right/-bottom` edge if it overflows viewport right/bottom; guarded by `dataset.positioned` to fire only once per mount ✅

**`components/breakdown/ExportPreviewSingle.tsx`**
- `MetaField` pop-out `style`: replaced `minWidth: Math.max(280, 120)` → `minWidth: 'calc(100% + 4px)', minHeight: 'calc(100% + 4px)'` — matches underlying cell size exactly ✅
- `MetaField` collision detection `ref` added ✅
- `CategoryCell` pop-out `style`: same `calc(100% + 4px)` replacement ✅
- `CategoryCell` collision detection `ref` added ✅

---

## Task: Enhance Pop-out Size & Auto-Scroll (0430_0801)

### Status: COMPLETE

**`components/breakdown/ExportPreviewTable.tsx`**
- Pop-out wrapper: `max-w-[400px] max-h-[300px]` → `max-w-[600px] max-h-[450px]` ✅
- `onFocus` textarea: added `e.currentTarget.scrollTop = e.currentTarget.scrollHeight` ✅

**`components/breakdown/ExportPreviewSingle.tsx`**
- `MetaField` pop-out: expanded to `max-w-[600px] max-h-[450px]` ✅; auto-scroll added ✅
- `CategoryCell` pop-out: expanded to `max-w-[600px] max-h-[450px]` ✅; auto-scroll added ✅

---

## Audit: Helios DOM & CSS Rewrite — Verification Pass (0430_0010)

### Status: CONFIRMED COMPLETE — Zero Changes Required

Full line-by-line audit of both files against all 4 Helios sub-tasks:

**`components/breakdown/ExportPreviewTable.tsx`**
- Item 1 (Strict table layout): `<table style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>` ✅; `width`/`minWidth` on `<th>` only (letter row lines 141-143, header row lines 192-194); zero width props on `<td>` ✅
- Item 2 (Absolute view mode): `<tr style={{ height: rowHeights[rowIndex] || 41 }}>` ✅; `<td>` has `p-0`, `overflow: 'visible'`, `position: relative` (sticky for frozen cols) ✅; view div is `absolute inset-0 overflow-hidden px-3 py-2 whitespace-normal break-words` ✅
- Item 3 (AutoFit no extra padding): `autoFitColumn` and `autoFitRow` use raw `el.scrollWidth`/`el.scrollHeight` with no `+24`/`+16` constants ✅
- Item 4 (Pop-out): `absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm max-w-[400px] max-h-[300px]` + `style={{ minWidth: Math.max(280, colWidths[colIndex] || 120) }}` ✅
- `onChange` on textarea only calls `setCellValues` — no JS height mutation ✅

**`components/breakdown/ExportPreviewSingle.tsx`**
- Item 4 (Pop-out) for `MetaField` (line 94) and `CategoryCell` (line 200): identical class structure + `style={{ minWidth: Math.max(280, 120) }}` ✅

---

## Last Updated: 2026-04-29 18:22 ICT (UTC+7)

---

## Task: Helios — DOM & CSS Rewrite for Export Module (0429_1822)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - **Strict table layout**: `<table>` now uses `style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}`. `border-collapse` className removed. `totalWidth` variable removed (no longer needed).
  - **td cleanup**: `width`, `minWidth`, `maxWidth` removed from `<td>` inline styles. `overflow: 'visible'` added so absolute pop-out is never clipped.
  - **Absolute view mode**: View-mode `<div>` changed from `w-full h-full` to `absolute inset-0 overflow-hidden` — row height is now driven purely by `<tr style={{ height: rowHeights[rowIndex] || 41 }}>`, text can never intrinsically expand the row.
  - **Pop-out fix**: Edit pop-out changed from `min-w-[calc(100%+4px)] min-h-[calc(100%+4px)]` to `style={{ minWidth: Math.max(280, colWidths[colIndex] || 120) }}` with `max-w-[400px] max-h-[300px] overflow-auto`.
  - **autoFit compounding fix**: Replaced `forEach + maxWidth + 24` / `maxHeight + 16` with `Math.max(...Array.from(elements).map(el => el.scrollWidth/scrollHeight))` — no extra padding added.
  - **Textarea**: Removed `onInput` and JS `scrollHeight/scrollWidth` auto-resize mutations from `onChange`. Native scrollbars within max-h/w constraints are the correct UX.

- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - **MetaField pop-out**: `min-w-[calc(100%+4px)] min-h-[calc(100%+4px)]` replaced with `style={{ minWidth: Math.max(280, 120) }}`. `max-w-[400px] max-h-[300px] overflow-auto` retained.
  - **CategoryCell pop-out**: Same pop-out fix applied.
  - **Textarea**: Removed `onInput` and JS auto-resize mutations from both `MetaField` and `CategoryCell` textareas. `onChange` now calls `setValue(e.target.value)` only.

---

## Task: Virtual Pop-out Cell Editor & Keybindings (0429_1727)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - `<td>` `position` changed from `undefined` (non-freeze) to `'relative'` — establishes positioning context for pop-out.
  - View-mode `<div>` is **always rendered** (no conditional unmount) — zero layout shift, table rows retain dimensions.
  - `isEditing` renders an absolutely-positioned pop-out wrapper (`top-[-2px] left-[-2px] z-[1]`, `min-w/h calc(100%+4px)`, `max-w-[400px] max-h-[300px]`, `overflow-auto`).
  - Pop-out contains: iPad save `<button>` (`onMouseDown: e.preventDefault()` prevents blur race) + `<textarea>` with `onChange`/`onInput` auto-resize (scrollHeight/scrollWidth), `onFocus` cursor-at-end, `onKeyDown` Enter-to-save / modifier-Enter newline, `onBlur` to close.

- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - **`MetaField`**: Added `position: 'relative'` to `containerStyle`. Replaced conditional `<textarea>`/`<input>` inline edit with always-visible view `<div>` + absolute pop-out overlay when `isEditing`. Identical auto-resize, focus, keydown, and blur logic.
  - **`CategoryCell`**: Added `position: 'relative'` to container style; removed `overflow: 'hidden'` (would clip absolute pop-out). Same view-always-rendered + pop-out-overlay pattern. Pop-out `textarea` style includes `color: "#191b23"` override for CategoryCell's colored header context.

---

## Task: Persist Table Dimensions in Context & LocalStorage (0429_1638)

### Completed

- **MODIFIED `components/breakdown/ExportFormatContext.tsx`**:
  - Added `colWidths`, `rowHeights` state + `setColWidths`, `setRowHeights` dispatchers to interface and provider.
  - `useEffect` (mount-only, `[]`) — hydrates both states from `localStorage` keys `scenoo_export_colWidths` / `scenoo_export_rowHeights`; wrapped in `try/catch` to discard malformed JSON. Runs only on client after mount — avoids Next.js SSR hydration mismatch.
  - Two separate `useEffect`s — persist `colWidths` / `rowHeights` to `localStorage` whenever they change (guarded: only writes when at least one entry exists, preventing overwrite on initial empty render).
  - Exposed `colWidths`, `setColWidths`, `rowHeights`, `setRowHeights` in context value.

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Removed local `useState` for `colWidths` and `rowHeights`.
  - Destructured `colWidths`, `setColWidths`, `rowHeights`, `setRowHeights` from `useExportFormat()`.
  - All drag-resize mouse event logic unchanged — now naturally writes to global context and auto-persists.

---

## Task: Row/Column Resizer Handles (0429_1633)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Added `colWidths`, `rowHeights`, `resizing` state.
  - `getColLeft(colIndex)` — computes cumulative sticky `left` from dynamic column widths (handles any `freezeCols` value).
  - `startResize(e, type, index)` — captures `startPos` + `startSize`, locks to `resizing` state.
  - `useEffect` on `[resizing]` — attaches `window` `mousemove`/`mouseup` listeners; calculates delta and clamps `newSize` (min 40px col, 20px row); sets `document.body.style.userSelect = 'none'` for drag lockout; removes listeners + resets `userSelect` on cleanup.
  - Letter row `<th>`: `width`/`minWidth` from `colWidths`, `position: relative` on non-sticky, col resize handle (`absolute right-0 h-full w-1 cursor-col-resize`).
  - Data header row `<th>`: same `width`/`minWidth` + `position: relative`.
  - Body `<tr>`: `height` from `rowHeights`.
  - Row number `<td>`: `position: relative` + row resize handle (`absolute bottom-0 w-full h-1 cursor-row-resize`).
  - Data `<td>`: `width`/`minWidth`/`maxWidth` from `colWidths`; sticky `left` via `getColLeft`.
  - Textarea/view div: changed `min-h-[36px]` → `h-full`, added `overflow-hidden` to textarea.
  - `totalWidth` computed dynamically — replaces hardcoded `width: 2080px`.

---

## Task: Auto-focus and Blur for Cell Editing (0429_1618)

### Status: Already Implemented — No Changes Required

Audited both files. All `autoFocus` and `onBlur` handlers were already present from the prior implementation pass:

- **`ExportPreviewTable.tsx`** — `<tbody>` textarea: `autoFocus` + `onBlur={() => setEditingCell(null)}` ✓
- **`ExportPreviewSingle.tsx`** — `MetaField` textarea (multiLine): `autoFocus` + `onBlur={() => setIsEditing(false)}` ✓
- **`ExportPreviewSingle.tsx`** — `MetaField` input (single-line): `autoFocus` + `onBlur={() => setIsEditing(false)}` ✓
- **`ExportPreviewSingle.tsx`** — `CategoryCell` textarea: `autoFocus` + `onBlur={() => setIsEditing(false)}` ✓

Zero layout shift confirmed: all edit-mode inputs share identical `padding` and `fontSize` with their read-only `<div>` counterparts.

---

## Task: Bounding Box Selection — All Scenes Export (0429_1606)

### Completed

- **MODIFIED `components/breakdown/ExportFormatContext.tsx`**:
  - Exported `getCellId(r, c) => \`row-${r}-col-${c}\`` helper — single source of truth for cell ID format.
  - Added `selectionStart` as a `useRef<{ row, col } | null>` (ref, not state — avoids triggering re-renders on start; reset in `endSelection`).
  - Added `startMatrixSelection(row, col)`: sets ref, sets `isDragging = true`, initializes `selectedCellIds` to `{ getCellId(row, col) }`.
  - Added `updateMatrixSelection(row, col)`: guards on `!selectionStart.current`; computes `minRow/maxRow/minCol/maxCol` bounding box; replaces `selectedCellIds` with a new Set of all cells in that rectangle.
  - Both new actions added to interface and context value.
  - Existing `startSelection` / `addToSelection` preserved — `ExportPreviewSingle.tsx` remains unaffected.

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Imported `getCellId` from context.
  - `initCellValues()` now keys by `getCellId(rowIndex, colIndex)` (numeric index) instead of `row-${rowIndex}-col-${colName}`.
  - `cellId` in tbody map now calls `getCellId(rowIndex, colIndex)`.
  - Destructured `startMatrixSelection` / `updateMatrixSelection` in place of `startSelection` / `addToSelection`.
  - `onMouseDown` → `startMatrixSelection(rowIndex, colIndex)`.
  - `onMouseEnter` → `isDragging && updateMatrixSelection(rowIndex, colIndex)`.

### Zero TypeScript errors. Google Sheets-style rectangular drag selection now active.

---

## Task: Virtual Grid — Single Scene (0429_1613)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - Imported `getCellId` from `ExportFormatContext`; removed `labelToId` helper.
  - `MetaField`: added `virtualRow`/`virtualCol` props; `id = getCellId(virtualRow, virtualCol)`; swapped `startSelection` → `startMatrixSelection`, `addToSelection` → `updateMatrixSelection`.
  - `CategoryCell`: same swap; added `virtualRow`/`virtualCol` props.
  - Virtual coordinate map applied at all call sites:
    - Meta row 0: Scene #(0,0) | INT/EXT(0,1) | D/N(0,2)
    - Meta row 1: Script Page(1,0) | Location Name(1,1) | Description(1,2)
    - Category rows 2–5: CAST→EXTRAS, MAKEUP/HAIR→WARDROBE, VEHICLE→SOUND, EQUIPMENT+PRODUCTION NOTES(colSpan=2)
  - Visual layout (grid columns, colSpan, hex colors) fully preserved. Zero layout shift on view↔edit toggle.

### Bounding box drag selection now works identically on Single Scene and All Scenes views.

---

## Task: Spreadsheet Interaction & Global Formatting Logic (0429_1551)

### Completed

- **CREATED `components/breakdown/ExportFormatContext.tsx`**:
  - `ExportFormatProvider` wraps all export UI as the single source of truth for selection and formatting.
  - State: `selectedCellIds: Set<string>`, `cellStyles: Record<string, React.CSSProperties>`, `isDragging: boolean`.
  - Actions: `startSelection`, `addToSelection`, `endSelection`, `applyFormat`.
  - Global `window.addEventListener('mouseup', endSelection)` inside provider `useEffect` — fires even when user releases outside a cell.

- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
  - Refactored into `ExportFormatProvider` + inner `ExportPageInner` to allow context consumption.
  - Toolbar buttons wired: Bold/Italic/Underline toggle (active state via `TOOLBAR_BTN_ACTIVE`), Text Color via hidden `<input type="color">`, Align Left/Center/Right.
  - Toggle logic: checks if ALL selected cells share the style, then inverts.

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Each `<tbody>` cell is keyed as `row-${rowIndex}-col-${col}`.
  - Cell state: `editingCell: string | null`, `cellValues: Record<string, string>` (initialized from `MOCK_DATA`).
  - View mode: `<div cursor-cell select-none>` with `onMouseDown → startSelection`, `onMouseEnter → addToSelection (if dragging)`, `onDoubleClick → setEditingCell`.
  - Edit mode: `<textarea autoFocus onBlur={() => setEditingCell(null)>` with same `min-h-[36px] px-3 py-2` — zero layout shift.
  - Selected cells: `border-primary bg-primary/10` via Tailwind. `cellStyles[id]` applied to both modes.

- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - `CategoryCell` and `MetaField` now consume `useExportFormat`.
  - IDs computed via `labelToId()`: `single-box-CAST`, `single-meta-SCENE__` etc.
  - Same View/Edit/Drag pattern applied. Selection highlight via inline `outline: 2px solid #6750A4` + `backgroundColor: rgba(103,80,164,0.08)`.
  - `CategoryCell` edit mode: `<textarea autoFocus>` with matching `padding: "4px 8px"`. `MetaField` edit mode: `<input>` (single) or `<textarea rows={2}>` (multiLine).
  - Zero TypeScript errors confirmed.

---

## Task: Apply Color Codes to Table Headers — All Scenes Export (0429_1533)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Added `TAG_COLORS` constant dictionary at top of file mapping 11 breakdown category column names to `{ bg, text }` hex pairs.
  - Keys aligned to actual `COLUMNS` values: `'EXTRA'` (not `'EXTRAS'`), `'VEHICLE / ANIMALS'` (not `'VEHICLES'`), `'SPECIAL EFFECTS'` (not `'SFX'`), `'SOUND EFFECTS & MUSIC'` (not `'SOUND'`), `'SPECIAL EQUIPMENT'` (not `'EQUIPMENT'`), `'PRODUCTION NOTE (Underline)'` (not `'NOTES'`).
  - Row 2 `<th>` render refactored: `COLUMNS.map` now returns JSX with `colorConfig` lookup — colored headers get `backgroundColor + color` via inline style; non-tag headers (`SCENE`, `I/E`, `D/N`, etc.) keep `bg-surface-container-low text-on-surface-variant` Tailwind classes.
  - `position: 'relative'` set on non-frozen headers (replaces `undefined`) — consistent with task spec.
  - All previous fixes preserved: `whitespace-normal break-words` text wrapping, `<textarea>` data cells with `resize-y`, semantic `colSpan` document header.

---

## Task: Enable Vertical Resizing for Table Textareas (0429_1522)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Replaced `resize-none` → `resize-y` on `<tbody>` textarea — users can now drag cell height.
  - Replaced `overflow-hidden` → `overflow-auto` — scrollbar appears when content exceeds resized height.
  - Horizontal resizing remains impossible (`resize-y` only), protecting the fixed 17-column layout.

---

## Previous Task: Enable Text Wrapping in ExportPreviewTable (0429_0242)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - **Headers (Row 2):** Replaced `whitespace-nowrap` with `whitespace-normal break-words` on all `<th>` COLUMNS cells — long headers now wrap naturally.
  - **Data Cells:** Replaced `<input type="text">` with `<textarea>` — added `resize-none whitespace-normal break-words overflow-hidden`; kept all original styling classes intact; `defaultValue` preserved.
  - **`<tr>` height:** Removed `h-[41px]` from `<tbody>` rows — rows now expand dynamically based on textarea content.

---

## Previous Task: Native Spreadsheet Refactor & Stacking Context Fix (0429_0236)

### Completed

- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
  - **Fix B2 (Overflow clipping):** Removed `overflow-x-auto` from Top Action Bar wrapper — no longer clips absolutely-positioned children (freeze menu dropdown).
  - **Fix B1 (Toolbar stacking context):** Added `relative z-50` to Top Action Bar wrapper — toolbar explicitly forms a high-level stacking context above all table content.
  - **Fix B1 (Transform stacking context):** Added `position: 'relative', zIndex: 10` to the zoom transform `<div>` — forces the CSS transform stacking context to stay below the toolbar's `z-50`.

- **REBUILT `components/breakdown/ExportPreviewTable.tsx`**:
  - Added `bg-white` to `<table>` element.
  - **Moved Document Header + Data Headers rows from `<tbody>` into `<thead>`** — all 3 header rows are now native `<thead>` content.
  - `<thead>` is now `sticky top-0 z-30` — entire header group sticks on vertical scroll (Fix B4).
  - All header cells converted from `<td>` to `<th>` — proper semantic spreadsheet.
  - **Z-index hierarchy (max ≤ 30):**
    - Corner of Row 0 (letters): `sticky left-0 z-30` (king cell — must survive both scroll axes).
    - Frozen letter/column-header cells: `sticky left-X z-20`.
    - Unfrozen letter/header cells: `z-10`.
    - Row 1 & 2 corner cells: `sticky left-0 z-20`.
    - Tbody row-number cells: `sticky left-0 z-20`.
    - Frozen tbody data cells: `sticky left-X z-20`.
  - **Row numbering** in `<tbody>` starts at 3 (rows 0–2 are now in `<thead>`).
  - `colSpan` integrity preserved: 3+6+3+3+2 = 17 columns ✓.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-29 02:05 ICT (UTC+7)

---

## Task: Native Spreadsheet Frame & Z-Index Fix (0429_0205)

### Completed

- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
  - Added `isFreezeMenuOpen` state.
  - Replaced two separate inline freeze selects with a single "Freeze" toggle button + absolute dropdown.
  - Dropdown wrapper: `<div className="relative z-50 shrink-0">` — fixes clipping against toolbar stacking context.
  - Dropdown popover: `absolute top-full right-0 mt-2 bg-white border shadow-2xl rounded-md p-3 w-48`.

- **REBUILT `components/breakdown/ExportPreviewTable.tsx`**:
  - Removed old `<div>` Document Header + `TABLE_COLUMNS` constant.
  - New constants: `LETTERS` (A–Q, 17 items), `COLUMNS` (17 column labels), `MOCK_DATA` (12 rows).
  - Outer wrapper: `w-full h-full overflow-auto bg-surface-container-lowest custom-scrollbar`.
  - Table: `tableLayout: fixed`, `width: 2080px` (40px row-number col + 17 × 120px).
  - `<thead>`: Row 0 — corner cell (40px sticky top+left) + 17 letter headers (sticky top, frozen cols also sticky left).
  - `<tbody>` Row 1: Document Header via native `colSpan` — 3+6+3+3+2 = 17 ✓.
  - `<tbody>` Row 2: Data column headers with sticky-freeze logic.
  - `<tbody>` Row 3+: 12 mock data rows with editable `<input>` cells, sticky freeze cols.

---

## Last Updated: 2026-04-29 01:45 ICT (UTC+7)

---

## Task: Fix Document Header Merge Alignment — All Scenes Export (0429_0145)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Removed phantom first 120px cell (was causing a 1-column right-shift of the entire header vs the table body).
  - Collapsed from **6-cell grid** (`120px 360px 720px 360px 360px 120px`) to **5-cell grid** (`360px 720px 360px 360px 240px`) — exact 3-6-3-3-2 column merge ratio over 17 × 120px = 2040px.
  - Col 1-3 (360px): "SCRIPT BREAKDOWN" label.
  - Col 4-9 (720px): PROJECT TITLE `<input>` (centered, bold, 14px).
  - Col 10-12 (360px): OPTIONAL TEXT 1 `<input>`.
  - Col 13-15 (360px): OPTIONAL TEXT 2 `<input>`.
  - Col 16-17 (240px): BRANDING LOGO placeholder text.
  - Added `className="min-w-[2040px]"` to `<table>` tag — enforces strict non-collapsing width.
  - Existing sticky freeze logic (`<thead>` + `<tbody>` col/row) — **zero changes**.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-29 01:16 ICT (UTC+7)

---

## Task: Add Document Header to All Scenes Export Preview (0429_0116)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Inserted a 5-column Document Header `<div>` directly inside the scrollable wrapper, immediately before `<table>`.
  - Col 1: "SCRIPT BREAKDOWN" label (`font-mono`, 11px, bold, uppercase, `text-outline`).
  - Col 2: `<input placeholder="PROJECT TITLE">` (14px, bold, centered, uppercase, dynamic `fontFamily`).
  - Col 3: `<input placeholder="OPTIONAL TEXT">` (`text-label-sm`, centered, uppercase, dynamic `fontFamily`).
  - Col 4: `<input placeholder="OPTIONAL TEXT">` (same as Col 3).
  - Col 5: "BRANDING / LOGO" text placeholder (`font-mono`, 10px, uppercase, `text-outline`, stacked lines).
  - Header uses `bg-surface-container-lowest`, `border-b border-outline-variant`; each column separated by `border-r border-outline-variant`.
  - Existing `<thead>` sticky freeze and `<tbody>` sticky col/row freeze logic — **zero changes**.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-29 01:15 ICT (UTC+7)

---

## Task: Single Scene Header & Table Freeze View (0429_0059)

### Completed

- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - Rebuilt header as true **2-row × 3-column CSS Grid** (`gridTemplateColumns: "1fr 2fr 1fr"`, `gridTemplateRows: "auto auto"`).
  - Row 1 — Col 1: "SCRIPT BREAKDOWN" (font-mono, 11px, bold, uppercase). Col 2: `<input placeholder="PROJECT TITLE">` (font-sans via `className={fontFamily}`, bold, text-center, no border). Col 3: "BRANDING LOGO" text (font-mono, 9px, gray, `borderLeft`).
  - Row 2 — Col 1: empty `<div>` with `borderRight` + `borderTop`. Col 2: `<input placeholder="OPTIONAL TEXT">` (`borderTop`). Col 3: `<input placeholder="OPTIONAL TEXT">` (`borderTop` + `borderLeft`).
  - All three Row 2 `<input>` elements use `className={fontFamily}` for dynamic font application.
  - No double-border gaps — each border defined on one side only.

- **MODIFIED `components/breakdown/ExportPreviewTable.tsx`**:
  - Props updated: `interface Props { fontFamily?: string; freezeCols?: number; freezeRows?: number; }` — defaults `freezeCols = 1, freezeRows = 1`.
  - `<thead>` gets `sticky top-0 bg-surface-container-low`.
  - All columns standardized to **`width: '120px'`** (`min-w-[120px] max-w-[120px]`) so `colIndex * 120` is exact.
  - Frozen `<th>` (`colIndex < freezeCols`): `position: 'sticky', left: colIndex * 120, zIndex: 30`; non-frozen: `zIndex: 20`. Fallback bg `#f9fafb` for non-colored frozen header cells.
  - Frozen body `<td>`: sticky with `top: (rowIndex + 1) * 41` (row freeze) and/or `left: colIndex * 120` (col freeze). z-index: both=20, either=10, none=1. Background: `#ffffff` when frozen, `transparent` otherwise.
  - `isRowFrozen = rowIndex < (freezeRows - 1)` — default `freezeRows=1` freezes no body rows (header-only freeze).

- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
  - Added `const [freezeCols, setFreezeCols] = useState(1)` and `const [freezeRows, setFreezeRows] = useState(1)`.
  - Toolbar: inserted **Freeze Columns** select (icon `view_column`, options 0–3) and **Freeze Rows** select (icon `table_rows`, options 1–3) immediately before Font Select.
  - `<ExportPreviewTable>` now receives `freezeCols={freezeCols} freezeRows={freezeRows}`.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-29 ICT (UTC+7)

---

## Task: Sync Export Preview UI with PDF/CSV Templates (0429_0005)

### Completed

- **REBUILT `components/breakdown/ExportPreviewSingle.tsx`**:
  - Wrapper: `w-[794px] min-h-[1123px]`, white bg, sharp corners, `shadow-[4px_4px_0_#bbb]`, `border border-outline-variant`. No `padding` on outer — borders drive layout.
  - **Header**: 3-column grid (`1fr 2fr 1fr`) with `borderRight`/`borderBottom` dividers. Left: SCRIPT BREAKDOWN (monospace). Center: PROJECT TITLE `<input>` row + two OPTIONAL TEXT `<input>` sub-columns. Right: dashed BRANDING "LOGO" placeholder.
  - **Meta rows**: 3 border-separated rows (Scene #/INT/EXT/D/N → Script Page/Location Name → Description textarea). No dashed borders — plain `1px solid #E5E7EB` throughout.
  - **Category grid**: `display:grid, gridTemplateColumns: 1fr 1fr 1fr`, `flex:1`, **zero gap**. Cells use `borderRight`+`borderBottom` only.
  - **Category labels**: Solid color full-width spans at top of each cell. Exact hex codes: CAST `#FF0000`, PROPS `#8800CC`, EXTRAS `#00AA00`, MAKEUP/HAIR `#FF6600`, SET DRESSING `#33BB33`, WARDROBE `#00AADD`, VEHICLE / ANIMALS `#FF55AA`, SPECIAL EFFECTS `#0055BB`, SOUND EFFECTS & MUSIC `#FFCC00`/black, SPECIAL EQUIPMENT `#888888`, PRODUCTION NOTES `#DDDDDD`/black.
  - PRODUCTION NOTES (Underline) uses `colSpan={2}` → `gridColumn: span 2`.
  - **No watermark** ("MAED BY Scenoo" removed).

- **REBUILT `components/breakdown/ExportPreviewTable.tsx`**:
  - Wrapper changed to `overflow-auto w-full` (removed old `flex-1 bg-white border shadow-sm m-6`).
  - Removed all mock data (`MOCK_DATA` array and `Row` type).
  - **17 exact columns** matching `script-breakdown-all-scene.csv`: SCENE, I/E, D/N, Script Page, LOCATION NAME, DESCRIPTION, CAST, EXTRA, PROPS, SET DRESSING, WARDROBE, MAKEUP/HAIR, VEHICLE / ANIMALS, SPECIAL EFFECTS, SOUND EFFECTS & MUSIC, SPECIAL EQUIPMENT, PRODUCTION NOTE (Underline).
  - Headers: `font-mono text-[10px] uppercase font-bold`, category cols use same hex color system as single-scene sheet.
  - Body: 12 empty rows, each cell has `<input type="text">` with `px-1 py-1` tight padding.
  - **No watermark**.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-28 23:31 ICT (UTC+7)

---

## Task: Build Export Right Sidebar & Rich-Text Toolbar (0428_2331)

### Completed
- **CREATED `components/breakdown/ExportRightSidebar.tsx`**: Client Component.
  - Props: `{ isOpen, onToggle, viewMode, setViewMode, onCsvClick }`.
  - Floating toggle button (`right-full`, absolute) with `right_panel_open`/`right_panel_close` icons.
  - Aside with `transition-all duration-300`: `w-72` when open, `w-0 border-l-0 overflow-hidden` when closed.
  - VIEW MODE section: toggle group (All Scenes / Single Scene) wired to `viewMode`/`setViewMode`.
  - EXPORT OPTIONS section: "Download PDF" primary blue button + "Download CSV" locked upsale button routing to `/settings/plans` via `onCsvClick`.
- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
  - Added `isRightOpen` state (default `true`) and `zoom` state (default `100`).
  - Removed unused `useParams` import.
  - **Top Action Bar** converted to Excel-like rich-text toolbar: Back + Title → divider → Zoom select (50/75/90/100%) → Font select → divider → Format group (`format_bold`, `format_italic`, `format_underlined`, `format_color_text`) → divider → Align group (`format_align_left`, `format_align_center`, `format_align_right`) → divider → Link button. All toolbar buttons use shared `TOOLBAR_BTN` class with `cursor-pointer`.
  - **Main layout** restructured: `flex-1 flex overflow-hidden` container; center area with `overflow-auto` + zoom `scale()` wrapper (`transformOrigin: 'top center'`); right area renders `<ExportRightSidebar />`.
  - View mode toggle moved entirely into the right sidebar.
  - CSV upsale routing preserved via `onCsvClick` prop.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-28 23:10 ICT (UTC+7)

---

## Task: Fix A4 Single Scene Overflow (0428_2259)

### Completed
- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - **A4 Wrapper**: Inner wrapper now enforces exact A4 web dimensions — `w-[794px] min-h-[1123px] shrink-0 mx-auto bg-white border border-outline-variant shadow-sm my-8 p-8 flex flex-col gap-4`.
  - **Category Grid**: Changed to `flex-1 grid grid-cols-3 gap-3 mt-2` — fills remaining height proportionally, tighter spacing.
  - **Category Box**: Removed `min-h-[140px]` (overflow culprit), reduced padding to `p-2.5`, added `overflow-hidden`.
  - **Textarea**: Downgraded font from `text-body-md` → `text-label-sm` for denser content rendering.
  - HEX color mappings and inline `style={{}}` tags preserved unchanged.

---

## Task: Refine Single Scene Export Preview UI (0428_2256)

### Completed
- **MODIFIED `components/breakdown/ExportPreviewSingle.tsx`**:
  - Replaced single-color `color` prop system with exact `bg / text / border` hex triplets per category definition (`CategoryDef` type).
  - Removed `hexToRgb` helper (no longer needed).
  - **Category Box outer wrapper**: Now purely neutral — `border border-outline-variant bg-white flex flex-col p-3 min-h-[140px] rounded-sm`. No color applied to the wrapper.
  - **Label badge**: `<span>` with `font-mono text-[10px] font-bold px-2 py-1 mb-2 uppercase w-max` and inline `style={{ backgroundColor, color, border }}` injecting exact hex values.
  - **Textarea**: `w-full flex-1 outline-none resize-none text-body-md bg-transparent text-on-surface`.
  - Fixed category name: `VEHICLES / ANIMALS` → `VEHICLE / ANIMALS`.
  - PRODUCTION NOTES changed from `col-span-2` → `col-span-3` (full-width bottom row).
  - Zero TypeScript errors.



### Completed
- **CREATED `components/breakdown/ExportPreviewSingle.tsx`**: Client Component. Simulates an A4 printable sheet with 3 sections:
  - **Header**: 3-column grid — "Script Breakdown" label / editable project title input (center) / logo placeholder.
  - **Meta Section**: 3-column grid with inline `<input>` and `<textarea>` fields (dashed bottom border, focus → primary blue) for Scene #, INT/EXT, D/N, Script Page, Location Name, Description.
  - **Category Grid**: `grid-cols-3` with 10 category boxes + 1 Production Notes box (`col-span-2`). Each box has a colored header (`rgba(hex, 0.1)` bg) and a `<textarea>` body. Exact hex colors per spec.
- **MODIFIED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**: Added `useState<'all' | 'single'>` (default `'all'`). Added centered toggle group (All Scenes / Single Scene) in the Top Action Bar between the back button and download buttons. Conditionally renders `<ExportPreviewTable />` or `<ExportPreviewSingle />`.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-28 22:40 ICT (UTC+7)

---

## Task: Build Breakdown Export Preview Page and Spreadsheet UI (0428_2240)

### Completed
- **CREATED `components/breakdown/ExportPreviewTable.tsx`**: Client Component. Renders a 17-column spreadsheet (`SCENE` → `NOTES`) with 4 mock rows. Each cell uses `<input type="text" defaultValue>` for inline editing. Table is horizontally/vertically scrollable with sticky header.
- **CREATED `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**: Client Component. Full-height flex layout with a 56px top action bar (Back button with `arrow_back` icon + "Export Preview" title on left; "Download CSV" secondary + "Download PDF" primary on right). Renders `<ExportPreviewTable />` in remaining space.
- **MODIFIED `components/breakdown/BreakdownSidebar.tsx`**: Added `"use client"` directive. Imported `useParams`, `useRouter` from `next/navigation`. Wired Export button `onClick` → `router.push(\`/workspace/${params.projectSlug}/${params.scriptId}/breakdown/export\`)`.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-28 22:33 ICT (UTC+7)

---

## Task: Update Breakdown Sidebar Footer — Export & Share Buttons (0428_2233)

### Completed
- `components/breakdown/BreakdownSidebar.tsx`: Replaced single "Export" button (with `ios_share` icon) with a 3-button layout:
  - **Save Breakdown** — full width, primary blue (`bg-[#3B82F6]`), `save` icon, `cursor-pointer`.
  - **Export** — `flex-1`, secondary style (`bg-white border border-[#E5E7EB]`), `download` icon, `cursor-pointer`.
  - **Share** — `flex-1`, secondary style, `ios_share` icon, `cursor-pointer`.
  - Export + Share wrapped in `<div className="flex gap-2 w-full mt-2">`.

### Zero TypeScript Errors.

---

## Last Updated: 2026-04-28 22:24 ICT (UTC+7)

---

## Task: Apply Sidebar Toggles to Breakdown Module (0428_2224)

### Completed
- `components/linescript/LineScriptLeftSidebar.tsx`: Removed `isOpen` and `onToggle` from Props and destructure. Removed the `<div className="relative h-full shrink-0">` wrapper and absolute toggle button. Now renders a permanent `<aside className="...w-16">` — always visible, no toggle.
- `components/linescript/LineScriptContainer.tsx`: Removed `isLeftOpen` state and `setIsLeftOpen`. Updated `<LineScriptLeftSidebar>` call to pass only `activeTool` and `onToolChange`.
- `components/breakdown/BreakdownSceneList.tsx`: Added `isOpen: boolean; onToggle: () => void` to Props. Wrapped return in `<div className="relative h-full shrink-0">`. Aside width transitions via `w-64 border-r` ↔ `w-0 border-r-0 overflow-hidden`. Floating toggle button (`left_panel_close`/`left_panel_open`) mounted after aside.
- `components/breakdown/BreakdownSidebar.tsx`: Added `isOpen: boolean; onToggle: () => void` to Props. Wrapped return in `<div className="relative h-full shrink-0">`. Aside width transitions via `w-80 border-l` ↔ `w-0 border-l-0 overflow-hidden`. Floating toggle button (`right_panel_close`/`right_panel_open`) mounted after aside.
- `components/breakdown/BreakdownContainer.tsx`: Added `isLeftOpen` and `isRightOpen` state (both `true`). Wired `isOpen` and `onToggle` into `BreakdownSceneList` and `BreakdownSidebar`.

### Zero TypeScript Errors across all 5 modified files.

---

## Last Updated: 2026-04-28 18:15 ICT (UTC+7)

---

## Task: Line Script UI Layout & Components (0428_1805)

### Completed
- `components/linescript/ShotDetailSidebar.tsx`: **CREATED** — collapsible right panel (`w-72 shrink-0`); returns `null` when `isOpen=false`; header with "Shot Details" title + close icon button; body with Shot #, Shot Size (`EWS/WS/FS/MFS/MS/MCU/CU/ECU/Random/Custom`), Movement (`Static/Pan/Tilt/Dolly/Handheld/Custom`) selects; all inputs styled with design tokens.
- `components/linescript/LineScriptContainer.tsx`: Added `isSidebarOpen` state + `ShotDetailSidebar` import; restructured return to horizontal flex `flex-1 flex overflow-hidden bg-background relative`; inner workspace wrapper uses `flex-1 overflow-hidden relative p-5 justify-center bg-[#f9f9ff]` (outer padding reduced from `p-8` → `p-5`); `isSidebarOpen` + `onToggleSidebar` wired and passed to `ScriptWorkspace`; `ShotDetailSidebar` mounted as right sibling.
- `components/linescript/ScriptWorkspace.tsx`: `isSidebarOpen` + `onToggleSidebar` added to Props interface and destructure; `max-w-[850px]` → `max-w-[840px]`; inner paper padding `p-12` → `p-[40px]`; toggle button added to Script Controls Bar far-right group with `right_panel_open`/`right_panel_close` icon swap.
- `components/linescript/FloatingToolbar.tsx`: Repositioned from `absolute top-8 left-4 flex-col` → `fixed bottom-8 left-8 rounded-2xl flex items-center`; drag handle (`drag_indicator`) added as first element; lining dropdown direction flipped from `left-full ml-2 top-0` → `bottom-full mb-2 left-0` (opens upward); vertical divider `h-6 w-px` replaces horizontal `w-full h-px`.

### Technical Debt
- `FloatingToolbar` is marked as "draggable-ready" but drag logic is not yet implemented (only the drag handle UI exists).
- `ShotDetailSidebar` form inputs are uncontrolled — no state or callbacks wired yet.

### Next Step
Verify in dev server: (1) toggle sidebar button in script controls bar opens/closes the right panel; (2) floating toolbar appears as a horizontal pill at bottom-left with drag handle; (3) lining dropdown opens upward from the toolbar; (4) sidebar panel shows Shot #, Shot Size, Movement form fields.

---

## Last Updated: 2026-04-28 17:45 ICT (UTC+7)

---

## Task: Hotfix Popover Clipping & Production Note Enhancement (0428_1735)

### Completed
- `components/breakdown/TagToolbar.tsx`: Refactored DOM structure — outer `div` (`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center`) holds `ref={toolbarRef}`; QTY popover rendered as a sibling **above** the toolbar (`mb-2`, horizontal `flex items-center gap-2` layout with Qty label, number input, Apply, and close button); toolbar div stripped of fixed-positioning classes, `overflow-x-auto` no longer clips the popover. Per-button `relative`/`absolute` wrappers removed; single popover driven by `selectedTagForQty` state.
- `components/breakdown/BreakdownSidebar.tsx`: Production Note section wrapped in `p-5 bg-primary/5 border-t border-primary/20 shrink-0`; icon + bold label row added (`edit_note` Material icon + `text-primary uppercase tracking-wider`); textarea `rows` increased `3` → `5`; textarea background changed `bg-[#F9FAFB]` → `bg-white` for contrast against the tinted wrapper.

### Technical Debt
- `bg-primary/5`, `border-primary/20`, `text-primary`, `text-label-sm` in BreakdownSidebar depend on design token configuration in Tailwind. Verify these tokens are defined in `tailwind.config`.
- `animate-in slide-in-from-bottom-2` in TagToolbar requires `tailwindcss-animate` package to be installed.

### Next Step
Verify in dev server: (1) click any tag button in TagToolbar → confirm QTY popover appears centered above the full toolbar (not clipped); (2) confirm popover is fully visible including in overflow-x-auto scroll zone; (3) check BreakdownSidebar — Production Note section has tinted background, icon, bold label, and taller textarea with white background.

---

## Last Updated: 2026-04-28 17:10 ICT (UTC+7)

---

## Task: Breakdown Tag Logic & UI Overhaul (0428_1710)

### Completed
- `types/breakdown.ts`: `TagCategory` replaced with 11 production-standard keys; `quantity?: number` added to `TaggedElement`; `TAG_CONFIG` fully updated with industry colors
- `components/breakdown/CategoryGroup.tsx`: Accordion redesign — collapsible header with `LABEL (totalQty)`, vertical element rows with inline quantity editing (pencil), `onUpdateQuantity` callback
- `components/breakdown/BreakdownSidebar.tsx`: Maps 11 new categories; passes `onUpdateQuantity`; Production Note textarea section added at bottom
- `components/breakdown/TagToolbar.tsx`: Updated for 11 categories; mini-qty popover per button (click → select qty → Apply); `onTagSelect` now includes `quantity`; click-outside dismissal
- `components/breakdown/TagSelectionModal.tsx`: NEW — desktop tag modal with element name + qty inputs, searchable category list with color dots, "tag all mentions" checkbox, submit guard
- `components/breakdown/BreakdownContainer.tsx`: Wired `onUpdateQuantity`, `productionNote`, updated mock data (`sfx` → `special-effects`)
- TypeScript: 0 errors

### Technical Debt
- `TagSelectionModal` not yet mounted (awaits Phase 5 text-selection x/y wiring)
- `handleTagSelect` logs to console; Phase 5 will create actual `TaggedElement` records

### Next Step
Phase 5: Text selection → tag creation in `ScriptViewer`. On text highlight, show `TagSelectionModal` at cursor position; on submit, push new `TaggedElement` to state.

---

## Previous Task: Hotfix Nav Back Button & Sidebar Header Height (0428_1436)

### Completed
- `components/layout/WorkspaceHeader.tsx`: Back button `href="/projects"` → `` href={`/projects/${projectSlug}`} `` — navigates back to the specific project, not the root dashboard.
- `components/breakdown/BreakdownSidebar.tsx`: EXPORT wrapper padding `p-6` → `py-3 px-4` — header now tightly hugs the EXPORT button height. `cursor-pointer` retained.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) in Workspace, click the back arrow → confirm URL lands on `/projects/{slug}` (not `/projects`); (2) confirm EXPORT button wrapper in BreakdownSidebar is visibly shorter (matches WorkspaceHeader height).

---

## Last Updated: 2026-04-28 14:30 ICT (UTC+7)

---

## Task: Hotfix Breakdown Spacing & Header Polish (0428_1427)

### Completed
- `components/breakdown/ScriptViewer.tsx`: `max-w-[800px]` → `max-w-[840px]` — script paper 5% wider.
- `components/breakdown/BreakdownSidebar.tsx`: EXPORT button gains `w-full justify-center` — fills full sidebar header width. `cursor-pointer` retained.
- `components/layout/WorkspaceHeader.tsx`: Deleted avatar `<div>` (TP initials, `bg-brand-amber`) from right actions block; only help + notifications icons remain.
- `components/layout/WorkspaceHeader.tsx`: `<header>` horizontal padding `px-8` → `px-4` — branding block pushed closer to edge.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) script paper is visibly wider in Breakdown view; (2) EXPORT button stretches full sidebar header width; (3) header right side shows only help + notifications icons, no avatar; (4) header branding block sits closer to the left edge.

---

## Last Updated: 2026-04-28 14:20 ICT (UTC+7)

---

## Task: Final Breakdown UI Cleanup (0428_1415)

### Completed
- `components/breakdown/BreakdownSceneList.tsx`: Deleted entire `<div className="p-4 border-b border-outline-variant">` header block (was holding only "Scene List" span) — sidebar now starts directly at the scene list scroll area.
- `components/breakdown/BreakdownSidebar.tsx`:
  - Deleted `<h2 className="text-h3 text-on-surface">Scene Breakdown</h2>`.
  - Changed header wrapper from `flex justify-between` → `flex justify-end` so EXPORT button right-aligns.
  - Restyled EXPORT button: ghost (`text-primary hover:bg-primary/10`) → solid primary (`bg-primary text-on-primary hover:bg-primary/90 shadow-sm`). `cursor-pointer` retained.
- `components/breakdown/TagToolbar.tsx`: Collapsed FAB icon changed from `chat_bubble` → `sell` (Material Design tag icon). `cursor-pointer` retained.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) BreakdownSceneList has no header row — scene list starts at top; (2) BreakdownSidebar header shows only the solid blue EXPORT button aligned right, no title; (3) collapse TagToolbar → floating FAB shows the `sell` tag icon.

---

## Last Updated: 2026-04-28 14:10 ICT (UTC+7)

---

## Task: Clean Up Headers & Reposition Export Button (0428_1410)

### Completed
- `components/breakdown/BreakdownSceneList.tsx`: Deleted `{scenes.length} Scenes` badge from header. Header now shows only "Scene List" label.
- `components/breakdown/BreakdownSidebar.tsx`:
  - Deleted subtitle `<p>Editing Scene...</p>` from header.
  - Updated header `<div>` to use `flex justify-between items-center`.
  - Moved "Export Scene" button from footer to header, positioned right after `<h2>Scene Breakdown</h2>`.
  - Restyled button: text "EXPORT", primary blue color (`text-primary`), hover state `hover:bg-primary/10`, padding `px-3 py-1.5`, rounded corners, flex layout with gap.
  - Deleted entire footer `<div>` (was only container for Export button).

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Scene List header shows only label, no count badge; (2) Sidebar header displays "Scene Breakdown" title + "EXPORT" button in horizontal flex layout; (3) no footer section below category groups.

---

## Last Updated: 2026-04-28 14:00 ICT (UTC+7)

---

## Task: Breakdown UI Space Optimization & Cleanup (0428_1354)

### Completed
- `app/(workspace)/layout.tsx`: Removed `<AppSidebar />` import and usage — workspace now spans full screen width.
- `components/breakdown/BreakdownSceneList.tsx`: Panel width `w-72` → `w-64`. Deleted `tagCounts` badge block entirely. Removed unused `TAG_BADGE_COLORS` constant and `TagCategory` import.
- `components/breakdown/BreakdownSidebar.tsx`: Panel width `w-80` → `w-72`. Deleted "Save Breakdown" button + `space-y-3` footer spacing. Only "Export Scene" button remains.
- `components/breakdown/TagToolbar.tsx`: Added `'use client'` + `useState`. Collapsed state returns floating circular `chat_bubble` button (`fixed bottom-6 right-80`). Expanded state: removed "Tag Selection" label div; `more_vert` → `close` icon wired to `setIsCollapsed(true)`.
- `components/breakdown/ScriptViewer.tsx`: Outer padding `p-12` → `p-4`. Inner paper padding `p-[80px]` → `p-[40px]`. Deleted "Add Scene Break" button block.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Workspace spans full width — no sidebar; (2) Scene list narrower, no tag count badges; (3) Sidebar has no Save button; (4) Tag toolbar collapse → floating `chat_bubble` icon; expand → toolbar back; (5) Script viewer has reduced padding, no "Add Scene Break" button.

---

## Last Updated: 2026-04-27 21:20 ICT (UTC+7)

---

## Task: Audit `cursor-pointer` u2014 Workspace Modules Pass (0427_2120)

### Completed
- `components/breakdown/BreakdownTopBar.tsx`: notifications + help_outline icon buttons.
- `components/breakdown/BreakdownSidebar.tsx`: Save Breakdown + Export Scene buttons.
- `components/breakdown/CategoryGroup.tsx`: `add` header button; `close` remove-tag button (row style); `close` remove-tag button (chip style).
- `components/breakdown/TagToolbar.tsx`: all 12 category tag buttons + `more_vert` overflow button.
- `components/breakdown/BreakdownSceneList.tsx`: all scene list `<button>` items.
- `components/breakdown/ScriptViewer.tsx`: Add Scene Break button.
- `components/linescript/ScriptTopBar.tsx`: notifications + account_circle buttons.
- `components/linescript/ScriptNavRail.tsx`: Profile button.
- `components/linescript/FloatingToolbar.tsx`: scene-break, lining, split, annotation, trash tool buttons + lining dropdown option buttons.
- `components/linescript/ScriptWorkspace.tsx`: zoom_out, zoom_in, print, download buttons.
- `components/shotlist/ShotlistContainer.tsx`: New Shot button.
- `components/shotlist/ShotlistTable.tsx` / `ShotlistTableHeader.tsx` / `ShotlistTableRow.tsx`: no interactive buttons u2014 clean, no changes.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: hover all workspace controls u2014 tag toolbar pills, scene list items, floating tool buttons, zoom controls, print/download, and New Shot u2014 confirm hand cursor throughout.

---

## Last Updated: 2026-04-27 21:15 ICT (UTC+7)

---

## Task: Audit `cursor-pointer` — Settings Pages Pass (0427_2115)

### Completed
- `app/settings/my-profile/page.tsx`: `cursor-pointer` added to Save Changes button. Avatar wrapper + label already had it from prior session.
- `app/settings/change-password/page.tsx`: `cursor-pointer` added to Change Password button.
- `app/settings/plans/page.tsx`: `cursor-pointer` added to Individual toggle, Team and Enterprise toggle, Current Plan button, Get Max plan button.
- `app/settings/billing/page.tsx`: `cursor-pointer` added to Adjust plan, Update (payment method), View (3× invoice rows), and Cancel (cancellation) buttons.
- `components/settings/SettingsSidebar.tsx`: All items are `<Link>` → `<a>` — native pointer cursor applies; no change needed.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: hover all Settings page buttons — Save Changes, Change Password, plan toggle, Current Plan, Get Max, Adjust plan, Update, View invoices, Cancel — confirm hand cursor on each.

---

## Last Updated: 2026-04-27 21:10 ICT (UTC+7)

---

## Task: Audit & Apply `cursor-pointer` to Interactive Elements (0427_2110)

### Completed
- `components/dashboard/DashboardHeader.tsx`: `cursor-pointer` added to notifications + help_outline icon buttons.
- `components/layout/WorkspaceHeader.tsx`: `cursor-pointer` added to help + notifications icon buttons.
- `components/dashboard/ProjectCard.tsx`: `cursor-pointer` added to `more_vert` trigger button and all 5 dropdown menu buttons (Recover, Delete Forever, Edit Project, Share, Delete Project).
- `components/projects/ImportScriptModal.tsx`: `cursor-pointer` added to close button + Cancel button; `cursor-pointer` added to enabled-state branch of Import Script submit button (disabled branch keeps `cursor-not-allowed`).
- `components/projects/ShareScriptModal.tsx`: `cursor-pointer` added to close, remove-email tag, Send Request, Copy link, and Done/Share buttons.
- `components/projects/ShareProjectModal.tsx`: same as ShareScriptModal — 5 buttons updated.
- `components/projects/DeleteProjectModal.tsx`: `cursor-pointer` added to close, Cancel, and Move to Trash buttons.
- `app/projects/[...slug]/page.tsx`: `cursor-pointer` added to inline delete-script modal (close, Cancel, Move to Trash), `more_vert` trigger, 3 dropdown buttons (Edit Script, Share, Delete Script), and 2 header icon buttons (notifications, help).

### Technical Debt
- None introduced. Zero structural/layout classes modified.

### Next Step
Verify in dev server: hover over all icon buttons, modal close buttons, and dropdown menu items — confirm hand cursor appears on all interactive elements. Confirm disabled "Import Script" button still shows `cursor-not-allowed`.

---

## Last Updated: 2026-04-27 21:02 ICT (UTC+7)

---

## Task: Friendly URL & Unique Slug Validation (0427_2102)

### Completed
- `lib/utils.ts`: added `.replace(/[.,_]/g, "-")` pass before special-char strip; added `.replace(/-+/g, "-")` at the end to collapse consecutive hyphens. "Draft 1.1" → `draft-1-1`.
- `components/projects/ImportScriptModal.tsx`: fully overwritten — added `existingSlugs: string[]` + `projectSlug: string` to props; manages local `versionName` + `description` state; computes `currentSlug` + `isDuplicate`; Vietnamese duplicate error message below Version Name field; URL preview when valid and not duplicate; Import Script button disabled when `!versionName.trim() || isDuplicate`; `handleClose` resets state on modal close.
- `app/projects/[...slug]/page.tsx`: three targeted edits — (1) `existingSlugs` computed from `MOCK_VERSIONS.map(v => slugify(v.label))` before return; (2) `<ImportScriptModal>` now receives `existingSlugs={existingSlugs} projectSlug={projectSlug}`; (3) script card `<Link href>` updated from `version.id` to `slugify(version.label)`.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) navigate to `/projects/{slug}` → script card links now use slugified labels (e.g., `/workspace/{projectSlug}/draft-1/breakdown`); (2) open Import Script Modal → type "Draft 1" → confirm duplicate warning + disabled button; (3) type "Draft 3" → confirm URL preview shows `/workspace/{projectSlug}/draft-3/breakdown` + button enabled; (4) type "NeonNights_Script" → confirm dots/underscores become hyphens in preview.

---

## Last Updated: 2026-04-27 21:20 ICT (UTC+7)

---

## Task: Fix Z-Index Layering — Modal vs Card Menus (0427_2115)

### Completed
- `components/projects/ImportScriptModal.tsx`: root overlay `z-[100]` → `z-50` (standard Tailwind maximum; arbitrary value removed).
- `app/projects/[...slug]/page.tsx`:
  - 3-dots menu wrapper (line 93): `z-50` → `z-20`.
  - Click-outside `fixed inset-0` overlay: `z-40` → `z-10`.
  - Dropdown list container: `z-50` → `z-20`.
- Z-index hierarchy is now correct: global modals at `z-50` sit above card dropdowns at `z-20`.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) open a 3-dots menu on a script card, then click "Edit Script" — confirm `ImportScriptModal` renders on top and card menu is not visible through the backdrop; (2) confirm dropdown still opens and closes correctly (click-outside still works).

---

## Last Updated: 2026-04-27 13:55 ICT (UTC+7)

---

## Task: Fix Turbopack Panic & Make Script Cards Clickable (0427_1340)

### Completed
- Deleted `app/(workspace)/workspace/[...workspaceParams]/` (catch-all caused TurbopackInternalError when co-located with subsequent dynamic siblings).
- Created strict segment path `app/(workspace)/workspace/[projectSlug]/[scriptId]/[module]/page.tsx`: params read as plain strings via `await params`; switch on `module` → `BreakdownContainer` / `LineScriptContainer` / `ShotlistContainer` / `notFound()`.
- Overwrote `components/layout/WorkspaceHeader.tsx`: `useParams` now reads `projectSlug`, `scriptId`, `module` as simple strings (not array); `baseUrl` constructed as `` `/workspace/${projectSlug}/${scriptId}` ``; active tab resolved via `currentModule === tab.id`.
- Modified `app/projects/[...slug]/page.tsx`:
  - Outer card `<div>` converted to `<Link href={\`/workspace/${projectSlug}/${version.id}/breakdown\`}>` with added `block cursor-pointer hover:border-primary` classes.
  - Removed "Open Workspace" `<div><Link>` block — navigation now driven by full-card click.
  - Added `e.stopPropagation()` to all 5 onClick handlers in the 3-dots menu system (trigger button, overlay backdrop, Edit Script, Share, Delete Script).

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) navigate to `/workspace/{slug}/{versionId}/breakdown` → confirm no TurbopackInternalError; (2) on `/projects/{slug}`, click anywhere on a script card → confirm navigation to workspace URL; (3) confirm 3-dots menu opens/closes without triggering card navigation.

---

## Last Updated: 2026-04-27 13:17 ICT (UTC+7)

---

## Task: Fix Workspace Routing Catch-All Error (427_1317)

### Completed
- Deleted invalid route `app/(workspace)/workspace/[...projectSlug]/[scriptId]/[module]/page.tsx` (and its ancestor dirs) — caused `TurbopackInternalError` because dynamic segments `[scriptId]` and `[module]` appeared after a catch-all `[...projectSlug]`.
- Created `app/(workspace)/workspace/[...workspaceParams]/page.tsx`: single catch-all array captures `projectSlug + scriptId + module`; `generateMetadata` sets dynamic `<title>`; min-length guard (< 3 segments → `notFound()`); switch on last element → `BreakdownContainer` / `LineScriptContainer` / `ShotlistContainer` / `notFound()`.
- Overwrote `components/layout/WorkspaceHeader.tsx`: `useParams` now reads `workspaceParams[]`; extracts `currentModule` (last), `safeScriptId` (second-to-last), `projectSlugStr` (rest joined by `/`); fallback defaults guard against during-transition renders.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: navigate to `/workspace/{slug}/{versionId}/breakdown` → confirm no TurbopackInternalError; confirm WorkspaceHeader active tab highlights correctly; confirm tab links switch between `/breakdown`, `/linescript`, `/shotlist`.

---

## Last Updated: 2026-04-27 13:35 ICT (UTC+7)

---

## Task: Workspace Dynamic Routing Refactor (0427_1320)

### Completed
- Deleted `app/(workspace)/breakdown/page.tsx`, `app/(workspace)/linescript/page.tsx`, `app/(workspace)/shotlist/page.tsx` and their parent directories.
- Created `app/(workspace)/workspace/[...projectSlug]/[scriptId]/[module]/page.tsx`: async Server Component using `await params` (Next.js 15+ pattern); `generateMetadata` for dynamic `<title>`; switches on `module` param → `BreakdownContainer` / `LineScriptContainer` / `ShotlistContainer` / `notFound()`.
- Overwrote `components/layout/WorkspaceHeader.tsx`: replaced `usePathname`-based static tabs with `useParams` reading `projectSlug[]`, `scriptId`, and `module`; reconstructs `baseUrl` and `NAV_TABS` dynamically; active tab checks `currentModule === tab.id`; added `arrow_back` link to `/projects`; fallback values during route transitions.
- Updated `app/projects/[...slug]/page.tsx`: card `<Link href="/breakdown">` wrapper replaced with non-link `<div>`; added `<Link>` "Open Workspace" button with `href={\`/workspace/${projectSlug}/${version.id}/breakdown\`}` styled `bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg text-label-md hover:bg-primary-container/80 transition-colors`.

### Technical Debt
- `WorkspaceHeader` fallback `projectSlugStr = 'default'` / `safeScriptId = 'v1'` is a guard for during-transition renders — not a real project reference. Harmless for now.

### Next Step
Verify in dev server: (1) Navigate to `/projects/{slug}` → click "Open Workspace" on any script card → confirm URL is `/workspace/{slug}/{versionId}/breakdown`; (2) Confirm `WorkspaceHeader` tabs show correct active state; (3) Confirm back arrow returns to `/projects`; (4) Confirm `/breakdown`, `/linescript`, `/shotlist` static routes return 404.

---

## Last Updated: 2026-04-27 12:50 ICT (UTC+7)

---

## Task: Sync Sidebar User Info & Add Dropdown Menu (0427_1240)

### Completed
- `components/dashboard/AppSidebar.tsx`: fully overwritten per task spec.
  - Added `isUserMenuOpen: boolean` state.
  - Extracted `isActive()` helper function (was inline `pathname.startsWith`).
  - Aside background: `bg-white` → `bg-surface-container-lowest`; added `relative` for dropdown positioning.
  - Header title block wrapped in `overflow-hidden whitespace-nowrap`; toggle button gains `shrink-0`.
  - Nav refactored: `space-y-2` → `flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar`; link padding `px-3 py-2` → `p-3`; icon size `text-[20px]` → `text-[24px]`; `fontVariationSettings` FILL toggle added for active icons.
  - User block: `<Link href="/settings/my-profile">` replaced with `<button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}`.
  - Avatar initials: `"AR"` → `"TP"`, `bg-surface-container` → `bg-brand-amber text-white shadow-sm`.
  - User name/role: "Alex Rivera / Executive Producer" → "Tri Pham / Director".
  - Dropdown rendered `absolute bottom-full mb-2 z-50 min-w-[160px]` above user block; contains `<Link>` to `/settings/my-profile` (Settings) and `<button>` (Logout, `text-error hover:bg-error-container`).
  - Full-screen invisible backdrop (`fixed inset-0 z-40`) closes menu on outside click.

### Technical Debt
- Logout button has no handler — closes menu only. Wire to Cloudflare auth signout when auth is implemented.

### Next Step
Verify in dev server: (1) sidebar shows "Tri Pham / Director" with amber avatar; (2) clicking user block opens dropdown above it with Settings + Logout items; (3) clicking outside closes dropdown; (4) dropdown min-width holds when sidebar is collapsed to `w-20`.

---

## Task: Reuse ProjectCard in Crew Module (0427_1156)

### Completed
- `components/dashboard/ProjectCard.tsx`: added `customHref?: string` to `ProjectCardProps` interface; destructured it in component signature; split the single `href` const into `defaultHref` (original logic) + `href = customHref || defaultHref`.
- `app/crew/page.tsx`: removed local `ProjectList` sub-component; removed unused `Link` and `type { Project }` imports; imported `ProjectCard`; both "My Projects" and "Shared with me (Manageable)" sections now render `<ProjectCard customHref={\`/crew/\${slugify(project.title)}\`}>` inside `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` — matching dashboard layout. No menu props passed → 3-dots menu safely hidden on Crew page.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: navigate to `/crew` → confirm project cards now show thumbnails, role badges, and team avatars; confirm clicking a card navigates to `/crew/{slug}` (not `/projects/{slug}`).

---

---

## Task: Settings Nested Routing & Avatar Upload (0426_2345)

### Completed
- `components/settings/SettingsSidebar.tsx`: new Client Component using `usePathname` for active link detection; links to all 4 sub-routes.
- `app/settings/layout.tsx`: new Server Component layout rendering `AppSidebar`, `DashboardHeader`, `SettingsSidebar`, and `{children}`.
- `app/settings/page.tsx`: overwritten to a single server-side `redirect("/settings/my-profile")`.
- `app/settings/my-profile/page.tsx`: profile form with clickable avatar upload — dark overlay + `photo_camera` icon on `group-hover`, local `avatarPreview` state via `URL.createObjectURL`.
- `app/settings/change-password/page.tsx`: extracted password form.
- `app/settings/plans/page.tsx`: extracted Plans & Pricing UI.
- `app/settings/billing/page.tsx`: extracted Billing UI (plan summary, payment method, invoices table, cancellation).
- `components/dashboard/AppSidebar.tsx`: bottom user info block wrapped in `<Link href="/settings/my-profile">` with `hover:bg-surface-container-low transition-colors cursor-pointer`.

### Technical Debt
- Plans tab "Team and Enterprise" toggle is UI-only.
- All form inputs are uncontrolled; no submission/validation logic.
- Invoice "View" and payment "Update" buttons are no-ops.
- Static mock data — needs Cloudflare D1 when auth/billing is live.

### Next Step
Verify in dev server: navigate to `/settings` (should redirect to `/settings/my-profile`), confirm sidebar active states update on route change, and test avatar image preview on file select.

---

## Task: Build Settings Tab UI with Inner Sidebar (0426_2320)

### Completed
- `app/settings/page.tsx`: fully overwritten from placeholder to complete Settings page.
- Implemented inner sidebar with two navigation groups: "Profile Settings" (My Profile, Change Password) and "Subscription" (Plans & Pricing, Billing).
- Active tab state managed via `useState<SettingsTab>` — no external state library needed.
- **Profile tab**: circular avatar with initials "TP" (`bg-brand-amber`), 4 form fields (Name, Role, Email disabled, Company optional), "Save Changes" CTA.
- **Password tab**: lock icon header, 3 password fields, "Change Password" CTA.
- **Plans tab**: dual pricing cards (Pro $17/mo current, Max from $100/mo highlighted with `border-primary`), Individual/Team toggle UI.
- **Billing tab**: Plan summary section, Payment method (Visa •••• 4242), Invoices table (3 mock rows), Cancellation section with `bg-error` button.
- All styling strictly uses existing design tokens; no new colors or spacing invented.

### Technical Debt
- Plans tab "Team and Enterprise" toggle is UI-only; no state change implemented.
- All form inputs are uncontrolled (`defaultValue`) — no submission logic or validation wired.
- Invoice "View" buttons and payment "Update" button are no-ops.
- Mock data (invoices, plan details) is static inline; will need real data from Cloudflare D1 when auth/billing is live.

### Next Step
Verify in dev server: navigate to `/settings` and confirm all 4 sidebar tabs render their respective content correctly with proper active state styling.

---

## Task: Build Archive Tab & Delete Forever Flow (0426_2210)

### Completed
- `components/dashboard/ProjectCard.tsx`: added `isArchived?: boolean`, `onRecoverClick?: () => void`, `onDeleteForeverClick?: () => void` to `ProjectCardProps`. Menu trigger condition updated to show for archived cards. Dropdown conditionally renders "Recover" + "Delete Forever" (text-error) when `isArchived` is true; otherwise renders existing Edit/Share/Delete actions. No breaking change to non-archived cards.
- `components/archive/DeleteForeverModal.tsx`: new component created. Matches `DeleteProjectModal` design tokens. Title "Delete Forever?", permanent deletion warning body, "Cancel" + red "Delete" footer buttons. Uses `z-50` overlay consistent with codebase pattern.
- `app/archive/page.tsx`: replaced "Coming Soon" placeholder. Client component with `useState` for `activeMenuId` and `isDeleteModalOpen`. `MOCK_ARCHIVED_PROJECTS` (3 entries) rendered in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` inside `max-w-[1280px]` container. `onRecoverClick` closes menu (placeholder); `onDeleteForeverClick` opens `DeleteForeverModal`. Zero TypeScript errors.

### Technical Debt
- `onRecoverClick` is a no-op placeholder — real recover logic (restoring from IndexedDB/local store) is not yet implemented.
- `MOCK_ARCHIVED_PROJECTS` is static; will need to be replaced with actual archived project queries from local store.

### Next Step
Verify in dev server: navigate to `/archive` and confirm (1) 3 archived project cards render, (2) 3-dots menu shows "Recover" and "Delete Forever", (3) "Delete Forever" opens the confirmation modal.

---

## Task: Replace Status Badge with Role Badge (0426_2200)

### Completed
- `components/dashboard/ProjectCard.tsx`: removed `STATUS_STYLES` and `ProjectStatus` import.
- Added `ROLE_STYLES` mapping: `Owner` → amber, `Manager` → emerald, `User` → blue.
- Footer badge now reads `project.currentUserRole` (fallback: `"User"`); "User" role displays as "MEMBER".
- No TypeScript errors after change.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: ProjectCard footer shows role badge (OWNER / MANAGER / MEMBER) instead of project status.

---

## Task: Fix Share Modals Z-Index Typo (0426_2145)

### Completed
- `components/projects/ShareProjectModal.tsx`: root overlay `z-[1]` → `z-[2]`.
- `components/projects/ShareScriptModal.tsx`: root overlay `z-[1]` → `z-[2]`.
- Both modals now render above the 3-dots dropdown menu.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: Share modals appear on top of the 3-dots dropdown when triggered from the ProjectCard context menu.

---

## Task: Share Modal UI Fixes (0426_2120)

### Completed
- `components/projects/ShareProjectModal.tsx`: root overlay `z-[100]` → `z-[1]`.
- `components/projects/ShareScriptModal.tsx`: root overlay `z-50` → `z-[1]`; `<select>` fixed from broken `selected` prop pattern to `defaultValue={access}`; option text "Restricted / Just Crew" → "Just Crew".

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Share modals no longer bleed above the 3-dots dropdown; (2) General access dropdown shows "Just Crew" (not "Restricted / Just Crew").

---

## Task: Fix Script RBAC Strict Check (0426_2050)

### Completed
- `app/projects/[...slug]/page.tsx`: replaced loose `isOwner !== false` guard with strict equality check on `currentUserRole`.
  - **Before:** `const canManageScripts = currentProject?.isOwner !== false || currentProject?.currentUserRole === "Manager";`
  - **After:** `const canManageScripts = currentProject?.currentUserRole === "Owner" || currentProject?.currentUserRole === "Manager";`
  - Eliminates permission leak where `isOwner === undefined` (no field set) evaluated to `true`, granting manage access to `User`-role members.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server with a project whose `currentUserRole` is `"User"` (e.g., Urban Pulse): confirm Edit Script, Delete Script, and New Version card are all hidden.

---

## Task: Script-Level Sharing & RBAC (0426_2045)

### Completed
- `types/project.ts`: added `ScriptVersion` interface (id, label, description, modifiedDate, pageCount, status, author, `generalAccess?: GeneralAccess`) — shared type, replaces local interface in page.
- `components/projects/ShareScriptModal.tsx`: created — Google Drive-style modal scoped to `ScriptVersion`; accepts `canManage: boolean`; 3 render paths: (1) Owner — email chip input + people list + general access dropdown; (2) Non-owner + Just Crew — locked permission box + message textarea + Send Request; (3) Non-owner + Anyone with link — read-only public status view. State resets on close (`handleClose`).
- `app/projects/[...slug]/page.tsx`: removed local `ScriptVersion` interface; imports from `@/types/project`; imports `ShareScriptModal`; adds `shareScript: ScriptVersion | null` state; `MOCK_VERSIONS` updated with `generalAccess` values (Draft 1 → Anyone with the link; Draft 2, Shooting Script → Just Crew); 3-dots menu div is now always visible (removed `canManageScripts` wrapper); Edit Script and Delete Script buttons wrapped individually in `{canManageScripts && ...}`; Share button always visible between them.

### Technical Debt
- `generalAccess` on `ScriptVersion` is mock-only; production reads from IndexedDB/D1.
- General access `<select>` onChange is not wired — purely visual. Wire when script sharing API is implemented.
- `Copy link` button has no clipboard handler (stub).

### Next Step
Verify in dev server: (1) 3-dots menu visible on all script cards regardless of RBAC; (2) Edit/Delete hidden for non-managers; (3) Share button opens correct modal mode based on `generalAccess` + `canManage`; (4) Draft 1 (Anyone with link) shows Copy link footer; (5) Draft 2 (Just Crew, non-owner) shows locked permission box.

---

## Task: Share Project Modal & Shared Menu (0426_2015)

### Completed
- `types/project.ts`: added `GeneralAccess = "Just Crew" | "Anyone with the link"` type; added `generalAccess?: GeneralAccess` to `Project` interface.
- `lib/mock-data.ts`: injected `generalAccess` on all 5 projects — Neon Nights (`Just Crew`), Dust & Glory (`Anyone with the link`), Shadow Protocol (`Just Crew`), The Archive (`Just Crew`), Urban Pulse (`Anyone with the link`).
- `components/dashboard/ProjectCard.tsx`: added `onShareClick?: () => void` prop; relaxed menu guard from owner-only (`isOwner !== false && ... && onEditClick && onDeleteClick`) to `(isOwner !== false || onShareClick) && onToggleMenu && onCloseMenu`; Edit/Delete buttons wrapped in `{project.isOwner !== false && ...}` guards; Share button rendered for any project when `onShareClick` is provided.
- `components/dashboard/ProjectGrid.tsx`: added `onShareProjectClick: (project: Project) => void` to props; wired `onShareClick` for `myProjects.map`; shared project cards now receive `isActive`, `onToggleMenu`, `onCloseMenu`, `onShareClick` — Edit/Delete deliberately omitted.
- `components/projects/ShareProjectModal.tsx`: created — 3-mode Google Drive-style modal: Mode 1 (Owner) full access with email input, people list, general access dropdown; Mode 2 (Shared + Just Crew) locked with permission box, message textarea, Send Request button; Mode 3 (Shared + Anyone with link) public status with Copy link button. Fixed React `selected` bug from spec — uses `defaultValue` on `<select>` instead.
- `app/projects/page.tsx`: imported `ShareProjectModal`; added `shareProject: Project | null` state; wired FAB button `onClick`; passed `onShareProjectClick` to `ProjectGrid`; rendered `ShareProjectModal` with `isOpen={!!shareProject}` / `onClose={() => setShareProject(null)}`.

### Technical Debt
- `generalAccess` and `isOwner` are mock-only; production will read from Cloudflare D1 session.
- Owner dropdown in ShareProjectModal calls no real API — change is purely visual; wire when sharing API is implemented.
- `Copy link` button is a UI stub with no clipboard handler.

### Next Step
Verify in dev server: (1) My Projects 3-dots shows Edit / Share / Delete; (2) Shared Projects 3-dots shows Share only (no Edit/Delete); (3) Shadow Protocol Share modal shows locked Mode 2 (Just Crew); (4) Urban Pulse Share modal shows Mode 3 (Anyone with the link); (5) Neon Nights Share modal shows Mode 1 (Owner) with email input and dropdown.

### [VN TIME] 2026-04-26 20:35
- Đã loại bỏ chữ "Restricted" khỏi dropdown và UI chia sẻ dự án (ShareProjectModal), chỉ còn hiển thị "Just Crew" theo yêu cầu screenshot.
- Không phát sinh lỗi sau chỉnh sửa.

### [VN TIME] 2026-04-26 20:40 — Sub-task: Multi-Email Input for Share Modal
- `components/projects/ShareProjectModal.tsx`: added `emails: string[]` + `inputValue` state; added `handleKeyDown` (Enter → chip), `removeEmail`, `handleClose` (resets all 3 states).
- Replaced simple `<input>` in owner view with `focus-within` flex chip container + transparent input; hint text "Press Enter to add multiple emails." added below.
- Header X button and footer Done button wired to `handleClose`; Send Request button wired to `handleClose`.
- Footer button label: `emails.length > 0 ? "Share" : "Done"`.
- Preserved `z-[100]` overlay z-index and `defaultValue={access}` select pattern from prior implementation.

---

## Task: Fix Script Card Overlap & Add Modal Description (0426_1945)

### Completed
- `app/projects/[...slug]/page.tsx`: Removed blue `description` document icon from script card. Moved `author.avatar` `<Image>` to the left slot at `w-12 h-12 rounded-full`. Removed `justify-between` wrapper; 3-dots menu no longer overlapped.
- `components/projects/ImportScriptModal.tsx`: Added `useState` import, `description` state, and a `<textarea>` (rows=3, resize-none) with "DESCRIPTION" label inserted between Version Name and Smart Transfer inputs.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) each script card shows the 48×48 avatar in the top-left with no overlap by the 3-dots menu; (2) Import Script Modal displays the Description textarea between Version Name and Smart Transfer.

---

## Task: Shared URL, Script RBAC & Uploader Avatars (0426_1935)

### Completed
- `app/projects/[slug]/` → `app/projects/[...slug]/`: route folder renamed to catch-all segment; now handles both `/projects/neon-nights` and `/projects/shared/shadow-protocol`.
- `components/dashboard/ProjectCard.tsx`: conditional `href` — `isOwner === false` → `/projects/shared/${slugify(title)}`; otherwise `/projects/${slugify(title)}`.
- `app/projects/[...slug]/page.tsx`:
  - `PageProps` updated to `params: Promise<{ slug: string[] }>`.
  - `projectSlug` extracted as `slug[slug.length - 1]` (catch-all safe).
  - `ScriptVersion` interface extended with `author: { name: string; avatar: string }`; `MOCK_VERSIONS` populated with author data.
  - RBAC: `canManageScripts = currentProject?.isOwner !== false || currentProject?.currentUserRole === "Manager"`.
  - 3-dots menu and "New Version" dashed card wrapped in `{canManageScripts && ...}`.
  - 32×32 circular `next/image` avatar rendered opposite the document icon in each script card.

### Technical Debt
- RBAC `canManageScripts` and `isOwner` still driven by mock data; must be injected from Cloudflare D1 session in production.
- Uploader `author` field is mock-only; real data will come from the script upload record in D1/IndexedDB.

### Next Step
Verify in dev server: (1) `/projects` → shared project card links to `/projects/shared/{slug}`; (2) owner project card links to `/projects/{slug}`; (3) on a shared/User-role project page, 3-dots menus and "New Version" card are hidden; (4) each script card shows the circular uploader avatar.

---

## Task: Crew RBAC Implementation (0426_1917)

### Completed
- `types/project.ts`: added `ProjectRole = "Owner" | "Manager" | "User"` type; added `currentUserRole?: ProjectRole` to `Project` interface.
- `lib/mock-data.ts`: `currentUserRole: "Owner"` on Neon Nights, Dust & Glory, The Archive; `currentUserRole: "Manager"` on Shadow Protocol; `currentUserRole: "User"` on Urban Pulse.
- `app/crew/page.tsx`: extracted `ProjectList` sub-component; split page into "My Projects" section (`isOwner !== false`) and "Shared with me (Manageable)" section (strict RBAC: `isOwner === false && currentUserRole === "Manager"`); Urban Pulse (role=User) is excluded from both sections.
- `components/crew/InviteUserModal.tsx`: added `selectedRole: ProjectRole` state defaulting to `"User"`; added "Assign Role" radio group (User / Manager) below email chip area; all close/cancel handlers now reset `selectedRole` to `"User"`; footer action row has `border-t border-outline-variant pt-6`.

### Technical Debt
- `currentUserRole` is derived from mock data; will need to be injected from session/auth context (Cloudflare D1) in production.
- Radio buttons use native `<input type="radio">` — consider custom styled component when design system tokens for form controls are finalized.

### Next Step
Verify in dev server: (1) `/crew` page shows "My Projects" (Neon Nights, Dust & Glory, The Archive) and "Shared with me (Manageable)" (Shadow Protocol only — Urban Pulse must NOT appear); (2) `/crew/{slug}` → Add User Seat → confirm role radio buttons render and reset on cancel.

---

## Task: InviteUserModal — Enter-Only Chip (0426_1910)

### Completed
- `components/crew/InviteUserModal.tsx`: removed `e.key === ","` from `handleKeyDown` — Enter is the only chip trigger; placeholder updated to `"colleague@example.com"`; helper text updated to "Press Enter to add multiple emails."

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: type an email → press comma → confirm NO chip created; press Enter → confirm chip appears.

---

## Task: Multi-Email Invite & Shared Project Security (0426_1900)

### Completed
- `components/crew/InviteUserModal.tsx`: replaced single `email` state with `emails: string[]` + `inputValue` state; `handleKeyDown` adds valid email on Enter/comma and clears input; duplicate check prevents same email twice; chip rendering with individual `removeEmail` buttons; placeholder hidden after first chip; Send Invite disabled when `emails.length === 0`; Cancel/X both reset state fully.
- `components/dashboard/ProjectCard.tsx`: all menu props (`onEditClick`, `onDeleteClick`, `isActive`, `onToggleMenu`, `onCloseMenu`) made optional (`?`); 3-dots menu `<div className="relative z-50">` wrapped in ownership guard: `{project.isOwner !== false && onToggleMenu && onCloseMenu && onEditClick && onDeleteClick && ( ... )}`
- `components/dashboard/ProjectGrid.tsx`: `sharedProjects.map` now passes ONLY `key` and `project` to `<ProjectCard />`; all edit/delete/menu props stripped from shared section.

### Technical Debt
- Email validation is minimal (checks `@` presence). Full RFC 5322 regex deferred to when real invite API is wired.

### Next Step
Verify in dev server: (1) `/crew/{slug}` → Add User Seat → type email → press Enter → chip appears → type second email → comma adds it → Send Invite enabled; (2) `/projects` dashboard → shared project cards have no 3-dots menu.

---

## Task: Crew Invite Modal & Dashboard Split (0426_1845)

### Completed
- `components/crew/` directory created
- `types/project.ts`: added `isOwner?: boolean` to `Project` interface
- `lib/mock-data.ts`: `isOwner: true` on Neon Nights, Dust & Glory, The Archive; `isOwner: false` on Shadow Protocol, Urban Pulse
- `components/crew/InviteUserModal.tsx`: created — modal overlay (z-50) with email input, Cancel / Send Invite buttons; Send Invite disabled when email is empty; mock phase: closes and resets on submit
- `app/crew/[slug]/page.tsx`: imported `InviteUserModal` + `useState`; added `isInviteModalOpen` state; wired `Add User Seat` button `onClick` to `setIsInviteModalOpen(true)`; modal rendered outside `<main>` alongside sidebar
- `components/dashboard/ProjectGrid.tsx`: split `projects` into `myProjects` (isOwner !== false) and `sharedProjects` (isOwner === false); "My Projects" section with header + Filter button + `NewProjectCard`; "Shared with me" section renders only when `sharedProjects.length > 0`, never includes `NewProjectCard`

### Technical Debt
- Invite email is UI-only — no D1 invite record created. Wire when Cloudflare auth is implemented.
- `isOwner` is derived from mock data; will need to be injected from session/auth context in production.

### Next Step
Verify in dev server: (1) `/projects` dashboard shows "My Projects" (3 cards + New) and "Shared with me" (2 cards, no New card), (2) navigate to `/crew/{slug}` → click "Add User Seat" → confirm modal opens with email input → Cancel closes it.

---

## Task: Crew Module UI (0426_1822)

### Completed
- `app/crew/[slug]/` directory created via `mkdir -p`
- `app/crew/page.tsx`: overwritten — transforms "Coming Soon" into a **Select a Project** directory; maps `MOCK_PROJECTS` into clickable cards linking to `/crew/${slugify(project.title)}`; uses `"use client"`, `AppSidebar`, `DashboardHeader`
- `app/crew/[slug]/page.tsx`: created — full Crew Management interface with:
  - Breadcrumb header: `Crew > {projectName}` with back-link to `/crew`
  - 4-column table header (NAME / EMAIL / ROLE / STATUS)
  - Hardcoded Owner row: "Tri Pham" with `bg-brand-amber` avatar initials "TP"
  - **Add User Seat** button styled with `bg-surface-container-low` / `text-primary`
  - Project resolved from `MOCK_PROJECTS` via `slugify` match on slug param

### Technical Debt
- Owner row is hardcoded. When auth is wired (Cloudflare D1), pull actual user from session.
- No user seats yet — Add User Seat button is a UI stub; connect to D1 invite flow later.

### Next Step
Navigate to `/crew` in dev server → click a project card → confirm breadcrumb and Owner row render correctly.

---

## Task: Add Sidebar Routes & Active State (0426_1745)

### Completed
- `app/assets/page.tsx`: created — "Coming Soon" placeholder with `video_library` icon
- `app/crew/page.tsx`: created — "Coming Soon" placeholder with `groups` icon
- `app/archive/page.tsx`: created — "Coming Soon" placeholder with `delete` icon, 30-day trash note
- `app/settings/page.tsx`: created — "Coming Soon" placeholder with `settings` icon
- `components/dashboard/AppSidebar.tsx`: updated
  - Added `usePathname` from `next/navigation` for dynamic active detection
  - Added `Link` from `next/link` replacing `<a>` tags
  - `NAV_ITEMS` extended: added Archive (`/archive`); removed hardcoded `active` booleans
  - Active state computed via `pathname.startsWith(item.href)` per nav item
  - Design tokens applied to border/background/text classes (replacing raw hex values)

### Technical Debt
- None introduced. Archive and Settings pages are pure placeholder UI.

### Next Step
Verify in dev server: navigate to each sidebar tab (/assets, /crew, /archive, /settings) and confirm the correct item highlights. Then confirm /projects still highlights "Projects".

---

## Task: Slugify Routing (0426_1555)

### Completed
- `lib/utils.ts`: created — exports `slugify` with full Vietnamese diacritic map (all tones for a/ă/â/e/ê/i/o/ô/ơ/u/ư/y/đ), lowercases, strips specials, replaces spaces with hyphens
- `lib/mock-data.ts`: created — `MOCK_PROJECTS` array and `Project` type extracted from `app/projects/page.tsx`
- `app/projects/page.tsx`: replaced inline `MOCK_PROJECTS` array with import from `@/lib/mock-data`
- `components/dashboard/ProjectCard.tsx`: Link href changed from `project.id` to `slugify(project.title)`
- `app/projects/[id]/` → `app/projects/[slug]/` (folder renamed)
- `app/projects/[slug]/page.tsx`: params destructured to `slug`; `currentProject` resolved via `slugify` match; breadcrumb now shows `currentProject?.title || "Unknown Project"`

### Technical Debt
- `MOCK_PROJECTS` is still in-memory. When IndexedDB is wired, `[slug]/page.tsx` will need to read from local DB instead of the static array to resolve the project title.

### Next Step
Verify slug navigation end-to-end in dev server: click a project card → confirm URL is `/projects/neon-nights` → confirm breadcrumb shows "Neon Nights".

---

## Task: Project Versions UI Update (0426_1645)

### Completed
- `app/projects/[slug]/page.tsx`: fully overwritten per spec
  - Migrated from `useParams` hook to `use(params)` with typed `PageProps` interface
  - Removed "Import Script" button from header; replaced header with sticky bar (breadcrumb + notification + help icons)
  - Replaced `STATUS_STYLES` badges with per-card 3-dots `more_vert` button + dropdown
  - Dropdown contains "Delete Script" option (`text-error`, `hover:bg-error-container`)
  - Added Delete Confirmation Modal overlay (z-50, "Move to Trash" CTA, 30-day trash message)
  - New Version dashed card (`onClick → setIsImportModalOpen(true)`) appended after script cards
  - Label logic: shows "New Version" when versions exist, "Import Script" when list is empty

### Technical Debt
- Delete action is UI-only (no IndexedDB soft-delete yet). Wire when local DB is implemented.
- `activeMenuId` dropdown has no keyboard-trap / focus management (accessibility debt).

### Next Step
Verify in dev server: (1) 3-dots menu opens/closes per card, (2) "Delete Script" opens confirmation modal, (3) dashed card opens ImportScriptModal, (4) header no longer has Import Script button.

---

## Task: Add Edit Script Menu + Enforce Layering (0426_1650)

### Completed
- `app/projects/[slug]/page.tsx`: targeted 3-point edit
  - Menu wrapper: `z-20` → `z-50`
  - Click-away overlay: `z-30` → `z-40`
  - Dropdown container: `z-40` → `z-50`, added `flex flex-col`
  - Added "Edit Script" button above "Delete Script" (`text-on-surface`, `hover:bg-surface-container`)
  - Removed stale comment in header

### Technical Debt
- "Edit Script" action is UI-only (no navigation/handler yet). Wire to script editor route when implemented.

### Next Step
Verify in dev server: (1) dropdown shows both "Edit Script" and "Delete Script", (2) dropdown floats freely outside card bounds without clipping.

---

## Task: Fix Script Info Modal Layering & Wiring (0426_1659)

## Last Updated: 2026-04-26 17:00 ICT (UTC+7)

### Completed
- `components/projects/ImportScriptModal.tsx`:
  - Root overlay: `z-50` → `z-[100]` (task spec said `z-[1]` but that is lower than dropdown's z-50 — corrected to `z-[100]` to match stated intent)
  - Header text: "Import Script" → "Script Information"
- `app/projects/[slug]/page.tsx`:
  - "Edit Script" button `onClick`: now calls `setIsImportModalOpen(true)` alongside `setActiveMenuId(null)`

### Technical Debt
- Task spec `z-[1]` vs `z-[100]` discrepancy should be confirmed with author — `z-[1]` would render modal behind dropdown.

### Next Step
Verify in dev server: (1) clicking "Edit Script" in dropdown opens modal with title "Script Information", (2) modal renders above the dropdown overlay without z-index conflict.

---

## Task: Fix ProjectCard 3-dots Button Active State (0426_1715)

## Last Updated: 2026-04-26 17:15 ICT (UTC+7)

### Completed
- `components/dashboard/ProjectCard.tsx`: targeted className update on 3-dots `<button>`
  - Base classes: `p-1 rounded-md transition-colors` (static)
  - Active (`isMenuOpen === true`): `bg-surface-container text-on-surface`
  - Idle (`isMenuOpen === false`): `text-on-surface-variant hover:text-on-surface hover:bg-surface-container`

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) 3-dots button highlights with `bg-surface-container` when dropdown is open, (2) returns to muted variant color when dropdown closes.

---

## Task: Breakdown Export — Relative Zoom, Clean UI, and Report Dashboard (0502_1048)

### Status: COMPLETE

**Last Updated: 2026-05-02 11:02 ICT (UTC+7)**

**Step 1 — Export Data for the Report:**
- `components/breakdown/ExportPreviewTable.tsx`:
  - Added `export` field to `MOCK_DATA` (value: `'pdf'`)
  - Exported `MOCK_DATA` as named export for use in page component
  - Removed `fontFamily` prop from component interface
  - Removed `fontFamily` usage from all input elements (hardcoded to `font-sans`)

**Step 2 — Create BreakdownExportReport Component:**
- `components/breakdown/BreakdownExportReport.tsx` — CREATED
  - Dashboard mirroring `ShotlistReport.tsx` with stat cards:
    - Total Scenes (summary card)
    - Locations (frequency distribution)
    - Cast Frequency (comma-split and counted)
    - INT / EXT (frequency distribution)
    - Day / Night (frequency distribution)
  - Uses Design Tokens approach for consistent styling

**Step 3 — Update Export Page:**
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`:
  - Removed `fontFamily` state
  - Updated `viewMode` type to `<'all' | 'single' | 'report'>`
  - Implemented Relative Zoom controller:
    - Replaced `<select>` zoom dropdown with custom `-` / `+` buttons
    - Relative zoom steps: `fitZoom * 0.1` (10% relative steps)
    - Hard limits: `minScale = fitZoom / 100`, `maxScale = (fitZoom * 2.5) / 100` (100% to 250%)
    - Displays percentage relative to fit zoom (e.g., "125% of fit")
  - Added "Report" button to View Mode toggle group
  - Conditional rendering: `<BreakdownExportReport data={MOCK_DATA} />` when `viewMode === 'report'`
  - Removed `fontFamily` prop from `ExportPreviewTable` and `ExportPreviewSingle` calls

**Step 4 — Bug Fix (pre-existing):**
- `components/shotlist/ShotlistTable.tsx`:
  - Fixed type error: added `list &&` guard before `.map()` to handle undefined list

**Build Status:** ✓ Compiled successfully

---

## Task: Fix Multiple Open Menus — Lift State Up (0426_1725)

## Last Updated: 2026-04-26 17:30 ICT (UTC+7)

### Completed
- `components/dashboard/ProjectGrid.tsx`: added `"use client"` directive + `useState` import; added `activeMenuId: string | null` state; passes `isActive`, `onToggleMenu`, `onCloseMenu`, `onEditClick`, `onDeleteClick` down to each `ProjectCard`; grid updated to `xl:grid-cols-4 gap-6`.
- `components/dashboard/ProjectCard.tsx`: removed local `isMenuOpen` state and `useState` import; interface updated with `isActive`, `onToggleMenu`, `onCloseMenu` props; all internal `setIsMenuOpen` calls replaced with the lifted callbacks.

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) opening a dropdown on one card automatically closes any previously open dropdown, (2) clicking the backdrop closes the active menu without navigating.

---

## Task: Breakdown Export Zoom UI Cleanup (0502_1109)

## Last Updated: 2026-05-02 11:15 ICT (UTC+7)

### Completed
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`:
  - Removed "of fit" text from zoom display
  - Updated zoom percentage span to use design tokens: `text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center`
  - Zoom controller now displays only the percentage value (e.g., "125%")

### Technical Debt
- None introduced.

### Next Step
None — UI cleanup complete.

---

## Task: Height-Based Auto-Fit for Single Scene View (0502_1115)

## Last Updated: 2026-05-02 11:17 ICT (UTC+7)

### Completed
- `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`:
  - Added `containerHeight` state alongside `containerWidth`
  - Added `viewportInsetY` state for vertical safe zone calculation
  - Updated `ResizeObserver` to track both width and height from container
  - Made `fitZoom` formula conditional based on `viewMode`:
    - `viewMode === 'all'`: fits to `containerWidth` vs `exactContentWidth` (width-based)
    - `viewMode === 'single'`: fits to `containerHeight` vs `1187` (A4 layout height 1123px + 64px top/bottom gap)

### Technical Debt
- None introduced.

### Next Step
None — hotfix complete. Single Scene view now auto-fits document height to viewport.

---

## Task: Breakdown Export Single Scene Centering (0502_1120)

**Last Updated: 2026-05-02 11:25 ICT (UTC+7)**

### Completed

**Step 1: Simplified `ExportPreviewSingle.tsx`**
- Removed `onPrev`, `onNext`, `disablePrev`, `disableNext` from Props interface
- Deleted outer flex wrapper with navigation arrows
- Component now returns only the A4 `div` (794px × 1123px)

**Step 2: Updated `exactContentWidth` in `page.tsx`**
- Changed single view branch from `794 + 128` to `794` (exact A4 width)

**Step 3: Extracted Arrows & Implemented Centering in `page.tsx`**
- Added fixed navigation arrows inside Main Content wrapper (outside scrollContainerRef)
- Arrows only render for `viewMode === 'single'`
- Added `minWidth: '100%'` to layout footprint wrapper
- Updated `contentRef` left style for dynamic centering:
  - Single mode: `max(viewportInsetXpx, calc(50% - (exactContentWidth * zoom / 200)px))`
  - All scenes mode: `viewportInsetXpx` (original behavior)
- Removed navigation props from `<ExportPreviewSingle />` instantiation

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Navigation arrows appear fixed on left/right for Single Scene mode, (2) A4 document centers dynamically as viewport changes, (3) All Scenes mode remains left-aligned as before.

---

## Task: Shotlist Report Bottom Safe Margin (0502_1238)

**Last Updated: 2026-05-02 12:38 ICT (UTC+7)**

### Completed
- `components/shotlist/ShotlistReport.tsx`:
  - Tightened report viewport bottom inset to follow the same visual spacing rhythm as the top title gap.
  - Updated inset math from `bottomInset = topInset + 40` to `bottomInset = topInset + 8` so the report no longer appears clipped against the app's bottom edge while keeping top/bottom breathing room visually balanced.

### Technical Debt
- None introduced.

### Next Step
None — bottom safe margin adjustment is complete.

---

## Task: Line Script Rich Text & Zoom Topbar (0502_1404)

**Last Updated: 2026-05-02 14:09 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Added `TOOLBAR_BTN` class constant for consistent button styling
  - Added `ToolbarDivider()` helper component
  - Restructured main wrapper from `flex-row` to `flex-col`
  - Injected Rich Text & Zoom Topbar at the top (h-14)
  - Moved zoom controls to topbar with bold/italic/underline/color/align/link buttons
  - Removed `onZoomIn`/`onZoomOut` props from `<ScriptWorkspace />`

- `components/linescript/ScriptWorkspace.tsx`:
  - Removed `onZoomIn` and `onZoomOut` from Props interface
  - Removed component signature parameters
  - Cleaned up Script Controls Bar — removed zoom buttons, kept page counter and action buttons
  - Changed controls bar from `justify-between` to `justify-end`

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Topbar appears with zoom controls and rich text buttons, (2) Zoom works via topbar, (3) Script workspace layout remains intact.

---

## Task: Relocate Export & Share Buttons to Line Script Topbar (0502_1414)

**Last Updated: 2026-05-02 14:21 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptRightSidebar.tsx`:
  - Removed imports: `useState`, `useParams`, `useRouter`, `ShareScriptModal`, `ScriptVersion`
  - Removed local state: `isShareModalOpen` and `MOCK_SCRIPT`
  - Removed `<ShareScriptModal>` component
  - Removed entire "Action Buttons" div with Export and Share buttons

- `components/linescript/LineScriptContainer.tsx`:
  - Added imports: `useParams`, `useRouter`, `ShareScriptModal`, `ScriptVersion`
  - Added state: `isShareModalOpen`, `MOCK_SCRIPT`
  - Added Share and Export buttons to topbar using `ml-auto` flex layout
  - Export button uses blue background (`bg-[#3B82F6]`) matching design system
  - Share button uses white background with border

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Export and Share buttons appear in topbar on the right side, (2) Share modal opens correctly, (3) Export button navigates to correct route, (4) Right sidebar no longer shows action buttons.

---

## Task: Sync Export & Share Button Styles to Breakdown Reference (0502_1428)

**Last Updated: 2026-05-02 14:28 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Swapped button order: Export is now on the left, Share on the right
  - Applied consistent styling matching Breakdown module:
    - White background (`bg-white`)
    - Border color `#E5E7EB` (`border-[#E5E7EB]`)
    - Text color `#191b23` (`text-[#191b23]`)
    - Hover state `bg-[#F3F4F6]`
    - Padding `px-3 py-2` (was `py-1.5`)
    - Added `justify-center` for consistent alignment

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: Button styles now match Breakdown Sidebar reference exactly.

---

## Task: Line Script Persistent Pagination (0502_1645)

**Last Updated: 2026-05-02 16:43 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Removed `{viewMode !== 'scroll' && (...)}` conditional wrapper
  - Pagination controls now always visible
  - Updated text format from `"Page {currentPage}"` to `"{currentPage} / {totalPages}"`

- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`:
  - Removed `{(viewMode === 'single' || viewMode === 'two') && (...)}` conditional wrapper
  - Pagination controls now always visible
  - Text format already matches `"{currentPage} / {totalPages}"`

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: (1) Pagination controls visible in all view modes including Scroll, (2) Text format shows "X / 120" in both Line Script and Export pages.

---

## Task: Line Script Monospace Pagination (0502_1644)

**Last Updated: 2026-05-02 16:44 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Added `font-mono` class to pagination counter
  - Updated `min-w` from `[4rem]` to `[5rem]` for consistent monospace width

- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`:
  - Added `font-mono` class to pagination counter
  - Updated `min-w` from `w-16` to `[5rem]` for consistent monospace width

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: Pagination counter now renders with monospace font for consistent tabular alignment in both Line Script and Export pages.

---

## Task: Line Script Font Inter (0502_1645)

**Last Updated: 2026-05-02 16:45 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Changed `font-mono` to `font-inter`

- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`:
  - Changed `font-mono` to `font-inter`

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: Pagination counter now renders with Inter font family in both Line Script and Export pages.

---

## Task: Line Script Center Tools (0502_1656)

**Last Updated: 2026-05-02 16:59 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Added `relative` to Topbar wrapper
  - Created absolute-centered wrapper with `absolute left-1/2 -translate-x-1/2 flex items-center gap-2`
  - Reorganized tools in strict order: [Zoom] -> [Divider] -> [View Mode] -> [Divider] -> [Pagination]
  - Share/Export action container remains on right using `ml-auto`

- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`:
  - Added `relative` to Topbar wrapper
  - Reorganized tools into same absolute-centered wrapper structure
  - Centered: [Zoom] -> [Divider] -> [View Mode] -> [Divider] -> [Pagination]
  - Right-aligned: Share and Export buttons

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: All three tool clusters (Zoom, View Mode, Pagination) are perfectly centered in the Topbar for both Line Script and Line Script Export modules.

---

## Task: Line Script Font Inter (0502_1705)

**Last Updated: 2026-05-02 17:05 ICT (UTC+7)**

### Completed
- `components/linescript/LineScriptContainer.tsx`:
  - Changed `font-mono` to `font-inter` for Zoom counter
  - Changed `font-mono` to `font-inter` for Pagination counter

- `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`:
  - Changed `font-mono` to `font-inter` for Zoom counter
  - Changed `font-mono` to `font-inter` for Pagination counter

### Technical Debt
- None introduced.

### Next Step
Verify in dev server: All text in the centered tool clusters now renders with Inter font family.

---

## Task: Workspace Header Actions Refactoring (0503_1030)

### Status: COMPLETE

**Files changed:**

- `components/layout/WorkspaceHeader.tsx`:
  - Added `useRouter` import from `next/navigation`
  - Created `handleExportClick()` and `handleShareClick()` handlers
  - Replaced `help` and `notifications` icons with standardized Export/Share outline buttons
  - Export button triggers route navigation for Breakdown/Line Script, CustomEvent for Shotlist
  - Share button dispatches `openShareModal` CustomEvent globally

- `components/breakdown/BreakdownSidebar.tsx`:
  - Removed inline Export and Share buttons from action bar
  - Added `useEffect` listener for `openShareModal` event to open modal

- `components/linescript/LineScriptContainer.tsx`:
  - Removed inline Export and Share buttons from right-side actions (w-80 wrapper)
  - Added `useEffect` listener for `openShareModal` event to open modal

- `components/shotlist/ShotlistContainer.tsx`:
  - Removed inline Export (dropdown) and Share buttons from toolbar
  - Added `useEffect` listener for both `openShareModal` and `openExportModal` events

**Outcome:**
- Export and Share actions unified in global WorkspaceHeader
- Module-specific buttons removed to prevent duplication
- CustomEvent bus enables cross-component communication without prop drilling

### Technical Debt
- None introduced.

### Completed 2026-05-03 11:10 VN Time
- UI Cleanup: Removed empty action wrapper boxes from 3 components
  - `LineScriptContainer.tsx` - Removed empty Right Actions div (w-80 wrapper)
  - `BreakdownSidebar.tsx` - Removed empty Action buttons wrapper
  - `LineScriptRightSidebar.tsx` - Already clean (no empty wrapper)

### Technical Debt
- None introduced.

### Next Step
Verify in dev server:
1) Export/Share buttons appear in WorkspaceHeader for all modules
2) Clicking Export in Breakdown/Line Script navigates to `/export` route
3) Clicking Export in Shotlist opens export dropdown menu
4) Clicking Share opens ShareScriptModal in all modules

---

## Task: Global UI Scale-Down (0503_1115)

### Status: COMPLETE

**Files changed:**

- `app/globals.css`:
  - Added `html { zoom: 0.8; }` to scale entire UI to 80%
  - Added CSS overrides for viewport utilities to compensate for scale:
    - `.h-screen { height: 125vh !important; }`
    - `.min-h-screen { min-height: 125vh !important; }`
    - `.w-screen { width: 125vw !important; }`
    - `.min-w-screen { min-width: 125vw !important; }`

**Rationale:**
- At `zoom: 0.8`, 100vh only covers 80% of the physical screen
- Compensation factor: `100 / 0.8 = 125`
- Viewport utilities now use `125vh`/`125vw` to fill the physical screen

### Technical Debt
- None introduced.

### Completed 2026-05-03 11:16 VN Time (UTC+7)

---

## Task: Massive Layout Refactor (0503_1400)

### Status: COMPLETE

**Files changed:**

1. `components/breakdown/BreakdownSceneList.tsx`
   - Sidebar toggle icon: `'left_panel_close' : 'left_panel_open'` → `'chevron_left' : 'menu'`

2. `components/breakdown/BreakdownSidebar.tsx`
   - Sidebar toggle icon: `'right_panel_close' : 'right_panel_open'` → `'chevron_right' : 'menu'`

3. `components/linescript/LineScriptRightSidebar.tsx`
   - Sidebar toggle icon: `'right_panel_close' : 'right_panel_open'` → `'chevron_right' : 'menu'`

4. `components/linescript/LineScriptContainer.tsx`
   - Moved Rich Text & Zoom Topbar from above workspace to below workspace
   - Changed class from `border-b` to `border-t`

5. `components/breakdown/BreakdownContainer.tsx`
   - Added zoom state variables lifted from ScriptViewer
   - Added zoom controls (zoom, viewMode, pagination) bottom bar
   - ScriptViewer now receives `zoom` and `onZoomChange` props

6. `components/breakdown/ScriptViewer.tsx`
   - Removed local `zoom` state
   - Added `zoom: number` and `onZoomChange: (z: number) => void` to Props interface
   - All `setZoom` calls replaced with `onZoomChange`

7. `components/breakdown/TagToolbar.tsx`
   - Refactored to bottom-right FAB with vertical stack
   - QTY popover positioned to the left of toolbar
   - Collapsible toggle button

8. `components/layout/WorkspaceHeader.tsx`
   - Swapped Export and Share buttons (Share now first)
   - Added Settings button next to Export

**Rationale:**
- Unified layout pattern across Breakdown and Line Script modules
- Centralized zoom/pagination controls for consistent UX
- Cleaner sidebar toggle icons using Material Design standard icons

### Technical Debt
- None introduced.

### Completed 2026-05-03 15:20 VN Time (UTC+7)

- TagToolbar relocated from bottom-right to bottom-left
- Anchored at `left-[280px]` to clear the 256px sidebar
- Flex alignment reversed: `items-end` → `items-start`
- Popover direction reversed: `right-full mr-4` → `left-full ml-4`

### Completed 2026-05-03 17:00 VN Time (UTC+7)

- View Modes (Single Page / Scroll) implemented in ScriptViewer
- Pagination logic with `currentPage`, `totalPages`, `onCurrentPageChange` props
- Scroll sync auto-detection in Scroll mode (center-align page detection)
- Bottom bar controls: Zoom (50-250%), View Mode toggle, Pagination (prev/next)
- Floating navigation arrows in Single Page mode (hidden in Scroll mode)
- Mock page rendering for pages > 1 with placeholder UI

### Completed 2026-05-03 22:02 VN Time (UTC+7)

- Added "Shooting Schedule" and "Call Sheet" tabs to WorkspaceHeader
- Both tabs rendered as disabled state with lock icon
- Navigation logic handles `disabled` property with conditional rendering
