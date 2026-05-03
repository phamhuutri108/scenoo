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
0428_1426_report_breakdown-final-cleanup.md
0428_1439_report_hotfix-breakdown-spacing.md
0428_1446_report_hotfix-nav-and-sidebar-height.md
0428_1710_report_breakdown-tag-logic-ui.md
0428_1746_report_hotfix-popover-and-note.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0428_1426_report_breakdown-final-cleanup.md">
# Report: Final Breakdown UI Cleanup (0428_1415)

**Completed:** 2026-04-28 14:26 ICT (UTC+7)  
**Task Category:** Ad-hoc sub-task (from `tasks/0428/`)

---

## Task Summary
Executed final targeted UI cleanups on the Breakdown module: removed redundant headers, repositioned the Export button, and updated the collapsed toolbar icon.

---

## Components Modified

### 1. `components/breakdown/BreakdownSceneList.tsx`
- **Change:** Deleted entire header `<div className="p-4 border-b border-outline-variant">` block (was holding only "Scene List" `<span>`).
- **Impact:** Scene list now starts at the top with zero wasted header space; vertical layout optimized.

### 2. `components/breakdown/BreakdownSidebar.tsx`
- **Changes:**
  - Deleted `<h2 className="text-h3 text-on-surface">Scene Breakdown</h2>` from header.
  - Updated header wrapper: `flex justify-between` → `flex justify-end` (right-aligns EXPORT button).
  - Restyled EXPORT button: ghost style (`text-primary hover:bg-primary/10`) → solid primary (`bg-primary text-on-primary hover:bg-primary/90 shadow-sm`).
  - Retained `cursor-pointer` class on button.
- **Impact:** Cleaner header; EXPORT button now visually prominent as primary action.

### 3. `components/breakdown/TagToolbar.tsx`
- **Change:** Collapsed FAB icon: `chat_bubble` → `sell` (Material Design tag icon).
- **Impact:** Icon now semantically matches the tag-selection toolbar purpose.

---

## Outstanding Technical Debt
**None introduced.**

---

## Next Action Items
1. **Dev Server Verification:**
   - Confirm BreakdownSceneList has no header row — scene list starts at top.
   - Confirm BreakdownSidebar header shows only the solid blue EXPORT button, right-aligned, no title.
   - Collapse TagToolbar → verify floating FAB displays the `sell` tag icon.

2. **Visual QA:**
   - Test hover states on the new solid EXPORT button.
   - Confirm no layout shifts or spacing regressions in the sidebar.

---

## Files Changed
- `components/breakdown/BreakdownSceneList.tsx`
- `components/breakdown/BreakdownSidebar.tsx`
- `components/breakdown/TagToolbar.tsx`

---

## Status
✅ **COMPLETE** — All three targeted edits applied. Ready for dev server verification.
</file>

<file path="0428_1439_report_hotfix-breakdown-spacing.md">
# Hotfix: Breakdown Spacing & Header Polish

**Task Category:** Ad-hoc sub-task (from `tasks/0428/0428_1427_hotfix-breakdown-spacing.md`)

**Completed:** 2026-04-28 14:39 ICT (UTC+7)

---

## Components Modified

| File | Change | Rationale |
|------|--------|-----------|
| `components/breakdown/ScriptViewer.tsx` | `max-w-[800px]` → `max-w-[840px]` | 5% script paper width increase for better readability |
| `components/breakdown/BreakdownSidebar.tsx` | EXPORT button: added `w-full justify-center` | Full-width button fill; `cursor-pointer` retained |
| `components/layout/WorkspaceHeader.tsx` | `<header>` padding: `px-8` → `px-4` | Branding block repositioned closer to left edge |
| `components/layout/WorkspaceHeader.tsx` | Deleted avatar `<div>` (TP initials, `bg-brand-amber`) | Removed user profile avatar; help + notifications icons remain |

---

## Technical Debt

**None introduced.** All changes are targeted layout adjustments with no structural or logic modifications.

---

## Next Action Items

1. **Dev Server Verification:**
   - Confirm script paper is visibly wider in Breakdown view
   - Verify EXPORT button stretches full sidebar header width
   - Check header right side shows only help + notifications icons (no avatar)
   - Confirm header branding block sits tighter to left edge

2. **Visual QA:**
   - Test on desktop viewport (1920×1080 minimum)
   - Verify no layout regressions in other workspace modules (Line Script, Shotlist)

---

## Summary

Four targeted UI polish adjustments applied to Breakdown module and Workspace Header. All changes are CSS/layout-only with zero logic modifications. Ready for visual verification in dev environment.
</file>

<file path="0428_1446_report_hotfix-nav-and-sidebar-height.md">
# Hotfix: Nav Back Button & Sidebar Header Height

**Task Category:** Ad-hoc Sub-task (from `tasks/0428/`)  
**Completed:** 2026-04-28 14:46 ICT (UTC+7)

---

## Task Summary
Applied two targeted UI fixes to the Workspace navigation and Breakdown sidebar layout:
1. Back button now routes to the specific project instead of the root projects dashboard
2. EXPORT button wrapper padding reduced to align header height with WorkspaceHeader

---

## Components Modified

### `components/layout/WorkspaceHeader.tsx` (Line 24)
- **Change:** Back button `href` attribute
- **Before:** `href="/projects"`
- **After:** `` href={`/projects/${projectSlug}`} ``
- **Impact:** Users clicking back arrow now return to their originating project page, not the root dashboard

### `components/breakdown/BreakdownSidebar.tsx` (Line 14)
- **Change:** Header wrapper padding
- **Before:** `className="p-6 border-b border-outline-variant shrink-0 flex justify-end items-center"`
- **After:** `className="py-3 px-4 border-b border-outline-variant shrink-0 flex justify-end items-center"`
- **Impact:** EXPORT button wrapper is now vertically compact; header height visually aligns with WorkspaceHeader
- **Preserved:** `cursor-pointer` class on EXPORT button (no regression)

---

## Outstanding Technical Debt
None introduced.

---

## Next Action Items
1. **Dev Server Verification:**
   - Navigate to any workspace module (Breakdown/LineScript/Shotlist)
   - Click the back arrow → confirm URL lands on `/projects/{projectSlug}` (not `/projects`)
   - Verify EXPORT button header height matches WorkspaceHeader height visually

2. **Regression Testing:**
   - Confirm all workspace navigation tabs still function correctly
   - Confirm EXPORT button remains clickable and styled correctly

---

## Notes
- Both changes are minimal, targeted edits with no structural refactoring
- No new dependencies or breaking changes introduced
- Fixes align with the local-first architecture and design token approach
</file>

<file path="0428_1710_report_breakdown-tag-logic-ui.md">
# Report: Breakdown Tag Logic & UI Overhaul

| Field | Value |
|---|---|
| **Report generated** | 2026-04-28 17:10 ICT (UTC+7) |
| **Task type** | Ad-hoc sub-task (from `tasks/0428/`) |
| **Source task** | `.scenoo-brain/tasks/0428/0428_1710_breakdown-tag-logic-ui.md` |
| **TypeScript check** | ✅ `npx tsc --noEmit` — 0 errors |

---

## Task / Bug Name

**Implement Dual-Mode Tagging UX & Refactor Breakdown Sidebar**

Redefine the 11 production-standard tag categories, overhaul the sidebar accordion UI, add a mini-quantity popover to the toolbar, and build the new `TagSelectionModal` component for the desktop (collapsed-toolbar) workflow.

---

## Components Modified

### Modified — `types/breakdown.ts`
- `TagCategory` union replaced: 12 old keys → 11 new production-standard keys
  `cast | extras | props | set-dressing | wardrobe | makeup-hair | vehicle-animals | special-effects | sound-music | special-equipment | custom`
- `TaggedElement` interface: added `quantity?: number`
- `TAG_CONFIG`: fully rebuilt with industry-standard breakdown colors per key; `custom` entry uses label "Add Category", icon `add_circle`, neutral gray palette

### Modified — `components/breakdown/CategoryGroup.tsx`
- **Full rewrite.** Chip and row render styles removed entirely.
- Accordion layout: collapsible header (local `isOpen`, default open) showing colored icon + `LABEL (N)` where N = sum of all element quantities
- Body: vertical `<ul>` rows — element text (left) | qty badge + pencil edit + remove (right)
- Inline quantity editing: pencil click → number input; Enter/blur commits, Escape cancels
- New props: `onUpdateQuantity(id: string, quantity: number)`

### Modified — `components/breakdown/BreakdownSidebar.tsx`
- Iterates updated `TAG_CATEGORIES` (11 items)
- Threads new `onUpdateQuantity` prop down to `CategoryGroup`
- **Production Note section** added at bottom of sidebar: `<label>` + 3-row `<textarea>`, prop-driven via `productionNote` / `onProductionNoteChange`

### Modified — `components/breakdown/TagToolbar.tsx`
- `HOVER_BG` and `SHORT_LABEL` records rebuilt for all 11 categories
- Tag buttons no longer fire immediately on click
- New state: `selectedTagForQty: TagCategory | null` + `qty: number`
- Click → per-button mini popover (`absolute bottom-full`) with number input + Apply button
- Apply → `onTagSelect(category, quantity)` then reset
- Click-outside dismissal via `document mousedown` listener (cleaned up in `useEffect` return)
- `onTagSelect` signature: `(category: TagCategory, quantity: number) => void`

### Created — `components/breakdown/TagSelectionModal.tsx` *(new file)*
- Desktop UX modal for the collapsed-toolbar flow
- Positions at cursor `(x, y)` via `translate(-50%, -110%)`; falls back to screen-center if no coords
- Backdrop `div` (z-200) handles click-outside close
- UI: header → element name + qty inputs → category search input → scrollable category list (color dot + check) → "Tag all mentions" checkbox + "Add Element" submit
- Submit button disabled guard: requires non-empty name **and** a selected category
- Exported and ready to mount in `BreakdownContainer` (Phase 5)

### Modified — `components/breakdown/BreakdownContainer.tsx`
- `handleTagSelect` signature updated to `(category: TagCategory, quantity: number)`
- New handler: `handleUpdateQuantity(id: string, quantity: number)`
- New state: `productionNote: string` + `setProductionNote`
- Mock data: `'sfx'` → `'special-effects'`; `note` badge fields replaced with `quantity` values
- All new props threaded to `BreakdownSidebar`

---

## Outstanding Technical Debt

| ID | Description | Severity |
|---|---|---|
| TD-01 | `TagSelectionModal` built but not mounted — requires Phase 5 text-selection to provide `x`/`y` cursor coordinates | Medium |
| TD-02 | `handleTagSelect` in `BreakdownContainer` logs to console only — no `TaggedElement` creation until Phase 5 text-selection wiring | Medium |
| TD-03 | `custom` ("Add Category") has no special-case handler — clicking Apply fires `onTagSelect('custom', qty)` which is a no-op | Low |

---

## Next Action Items

1. **Phase 5 — Text Selection → Tag Creation** (`ScriptViewer.tsx`)
   Capture `mouseup` events on the script text, extract the selected string and cursor `(x, y)` position, then conditionally mount `TagSelectionModal` (desktop / collapsed toolbar) or trigger the `TagToolbar` popover (tablet / expanded toolbar). On `onSubmit`, push a new `TaggedElement` into `BreakdownContainer` state.

2. **Resolve TD-03** — Define the custom category creation flow (modal or inline input) before shipping to production.

3. **Smoke-test in dev server** — Confirm accordion expand/collapse, inline qty editing, toolbar popover, and Production Note textarea all render correctly on both desktop and iPad viewport sizes.
</file>

<file path="0428_1746_report_hotfix-popover-and-note.md">
# Hotfix: Popover Clipping & Production Note Enhancement

**Completed:** 2026-04-28 17:46 ICT (UTC+7)  
**Category:** Ad-hoc Sub-task (from `tasks/0428/0428_1735_hotfix-popover-and-note.md`)

---

## Task Summary

Fixed critical CSS clipping bug in TagToolbar QTY popover and enhanced visual prominence of Production Note section in BreakdownSidebar.

---

## Components Modified

### 1. `components/breakdown/TagToolbar.tsx`
- **DOM Refactor:** Restructured to prevent `overflow-x-auto` clipping
  - New outer `div` (`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center`) holds `ref={toolbarRef}`
  - QTY popover rendered as first child (sibling to toolbar, not nested inside)
  - Toolbar div stripped of fixed-positioning classes; retains only visual/scroll classes
  - Per-button `relative`/`absolute` popover pattern removed
- **QTY Popover UI Updates:**
  - Horizontal flex layout: `Qty label | number input | check icon button`
  - Apply button replaced with `check` Material Symbol icon (square `w-8 h-8` button)
  - Close button removed; dismissal via click-outside only
  - Popover driven by single `selectedTagForQty` state

### 2. `components/breakdown/BreakdownSidebar.tsx`
- **Production Note Section Redesign:**
  - Wrapper: `p-5 bg-primary/5 border-t border-primary/20 shrink-0`
  - Label row: `edit_note` Material icon + bold primary-colored uppercase label
  - Textarea: `rows` increased `3` → `5`; background `bg-[#F9FAFB]` → `bg-white` for contrast

---

## Technical Debt

1. **Design Tokens Verification:** `bg-primary/5`, `border-primary/20`, `text-primary`, `text-label-sm` must be defined in `tailwind.config`. Verify resolution in dev build.
2. **Animation Dependency:** `animate-in slide-in-from-bottom-2` requires `tailwindcss-animate` package. Confirm installation.

---

## Next Action Items

1. **Dev Server Verification:**
   - Click any tag button → confirm QTY popover appears centered above toolbar (fully visible, no clipping)
   - Verify popover remains visible during horizontal scroll
   - Check BreakdownSidebar: Production Note has tinted background, icon, bold label, taller textarea with white background

2. **Design Token Audit:** Run build and confirm no Tailwind warnings for primary color opacity values.

---

## Files Changed

- `components/breakdown/TagToolbar.tsx` — DOM restructure + popover UI simplification
- `components/breakdown/BreakdownSidebar.tsx` — Production Note section enhancement
- `.scenoo-brain/reports/current-status.md` — Updated with task completion

---

## Status

✅ **COMPLETE** — Ready for dev server verification.
</file>

</files>
