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
0430_0801_enhance-popout-size-scroll.md
0430_0830_enhance-popout-ux.md
0430_0848_export-topbar-and-modal.md
0430_0900_export-scene-sidebar.md
0430_0906_export-sidebar-rich-ui.md
0430_0911_export-single-scene-navigation.md
0430_0922_export-share-modal.md
0430_0938_export-safe-zone.md
0430_1010_helios-zoom-report.md
0430_1023_apply-helios-zoom-export.md
0430_1039_helios-export-zoom-failure.md
0430_1054_apply-helios-zoom-fix.md
0430_1104_export-infinite-rulers.md
0430_1114_helios-decoupled-rulers.md
0430_2011_decoupled-rulers-phase2.md
0430_2045_decoupled-rulers-phase3-refined.md
0430_2105_decoupled-rulers-phase4.md
0430_2141_helios-ruler-alignment.md
0430_2209_helios-ruler-table-rewrite.md
0430_2250_breakdown-share-modal.md
0430_2257_linescript-shotlist-sidebar.md
0430_2314_linescript-sidebar-header.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0430_0801_enhance-popout-size-scroll.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to enhance the Virtual Pop-out Editor in the Export Module by increasing its maximum dimensions by 50% and fixing the auto-scroll behavior on focus.
  </role>

  <task>
    Execute Sub-task: Enhance Pop-out Size & Auto-Scroll.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - **Expand Pop-out**: Locate the Edit Mode absolute pop-out wrapper `<div>`. Change its classes `max-w-[400px] max-h-[300px]` to `max-w-[600px] max-h-[450px]`.
       - **Auto-scroll to Bottom**: Locate the `onFocus` handler on the `<textarea>`. Update it to scroll the view to the bottom immediately after placing the cursor:
         ```tsx
         onFocus={(e) => {
           const len = e.currentTarget.value.length;
           e.currentTarget.setSelectionRange(len, len);
           e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
         }}
         ```

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Apply the exact same two changes to BOTH the `MetaField` and `CategoryCell` pop-out wrappers and their `<textarea>` elements.
       - Expand max bounds from `max-w-[400px] max-h-[300px]` to `max-w-[600px] max-h-[450px]`.
       - Add `e.currentTarget.scrollTop = e.currentTarget.scrollHeight;` to their `onFocus` handlers.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx`.
    - Do not alter any other logic, constraints, context integration, or matrix selection handlers.
  </constraints>
</system_prompt>
</file>

<file path="0430_0830_enhance-popout-ux.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to enhance the Virtual Pop-out Editor in the Export Module by implementing dynamic collision detection (smart positioning), increasing default heights, and mapping exact cell dimensions for the Single Scene view.
  </role>

  <task>
    Execute Sub-task: Pop-out Editor UX Enhancements (Smart Positioning & Dimensions).

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the Edit Mode pop-out wrapper `<div>` (the one with `absolute top-[-2px] left-[-2px]...`).
       - Update its inline `style` to increase the minimum height: 
         `style={{ minWidth: Math.max(280, colWidths[colIndex] || 120), minHeight: Math.max(124, rowHeights[rowIndex] || 41) }}`
       - Add a dynamic collision detection `ref` to smartly reposition the pop-out if it overflows the viewport:
         ```tsx
         ref={(node) => {
           if (node && !node.dataset.positioned) {
             const rect = node.getBoundingClientRect();
             if (rect.right > window.innerWidth) {
               node.style.left = 'auto';
               node.style.right = '-2px';
             }
             if (rect.bottom > window.innerHeight) {
               node.style.top = 'auto';
               node.style.bottom = '-2px';
             }
             node.dataset.positioned = 'true';
           }
         }}
         ```

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Locate the Edit Mode pop-out wrapper `<div>` inside BOTH the `MetaField` and `CategoryCell` components.
       - Update their inline `style` to perfectly match the underlying cell size:
         `style={{ minWidth: 'calc(100% + 4px)', minHeight: 'calc(100% + 4px)' }}`
       - Add the exact same dynamic collision detection `ref` block (as shown above) to both pop-out wrappers to handle viewport edges.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx`.
    - Do not modify any existing `onFocus` auto-scroll logic, context dispatchers, or max-bounds (`max-w-[90vw] max-h-[80vh]`).
  </constraints>
</system_prompt>
</file>

<file path="0430_0848_export-topbar-and-modal.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to refactor the Export Module's layout by moving sidebar actions to the top action bar, deleting the old sidebar, and creating a dynamic upgrade modal for export options.
  </role>

  <task>
    Execute Sub-task: Refactor Export Topbar & Dynamic Upgrade Modal.

    1. **DELETE `components/breakdown/ExportRightSidebar.tsx`**:
       - This file is no longer needed. Remove it completely.

    2. **CREATE `components/breakdown/ExportUpgradeModal.tsx`**:
       - Create a new Client Component.
       - **Props**: `isOpen: boolean`, `onClose: () => void`, `exportType: 'pdf' | 'csv' | 'sheets' | null`.
       - **Overlay**: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4`.
       - **Container**: `bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full p-6`.
       - **Dynamic Content based on `exportType`**:
         - **'pdf'**: 
           - Title: "Export PDF"
           - Message: "Your PDF will include a Scenoo watermark. Upgrade your plan to export clean, watermark-free documents."
           - Secondary Button: "Export with Watermark" (calls `onClose`)
           - Primary Button: "Upgrade Plan" (routes to `/settings/plans`)
         - **'csv'**: 
           - Title: "Export CSV"
           - Message: "Exporting to local CSV is a premium feature. Upgrade your plan to unlock full data portability."
           - Secondary Button: "Cancel" (calls `onClose`)
           - Primary Button: "Upgrade Plan" (routes to `/settings/plans`)
         - **'sheets'**: 
           - Title: "Sync to Google Sheets"
           - Message: "Real-time 1-way sync to your Google Drive account is available on premium plans. Upgrade to seamlessly edit your shotlist in Google Sheets."
           - Secondary Button: "Cancel" (calls `onClose`)
           - Primary Button: "Upgrade Plan" (routes to `/settings/plans`)
       - Use `useRouter` from `next/navigation` for the Upgrade Plan button.

    3. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Remove `ExportRightSidebar` import and its usage in the JSX.
       - Remove `isRightOpen` state.
       - Add new state: `const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);`
       - Add new state: `const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);`
       - Import and mount `<ExportUpgradeModal isOpen={!!exportType} onClose={() => setExportType(null)} exportType={exportType} />` just inside the root `<div>`.
       - **Update the Top Action Bar**:
         - On the far right of the top bar (after the zoom/format controls), add the View Mode toggle and Export button.
         - **View Mode Toggle**: 
           `<div className="flex bg-surface-container-low p-1 rounded-lg ml-auto shrink-0">`
           Render two buttons ("All Scenes" and "Single Scene") wired to `setViewMode`. Active button has `bg-white shadow-sm text-on-surface`, inactive has `text-on-surface-variant hover:text-on-surface`.
         - **Export Button & Dropdown**:
           Wrap in `<div className="relative shrink-0 ml-4">`.
           Button: `bg-primary text-white px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:bg-primary/90`. Label: "Export" + `expand_more` icon.
           Dropdown (`isExportMenuOpen === true`): `absolute top-full right-0 mt-2 w-56 bg-white border border-outline-variant shadow-2xl rounded-xl py-2 z-50 flex flex-col`.
           - Item 1 (PDF): `picture_as_pdf` icon + "PDF". Text color: `text-on-surface`.
           - Item 2 (CSV): `lock` icon + "CSV". Text color: `text-on-surface-variant` (to indicate locked).
           - Item 3 (Sheets): `lock` icon + "Google Sheets". Text color: `text-on-surface-variant` (to indicate locked).
           - All 3 items `onClick` should call `setExportType('...')` and `setIsExportMenuOpen(false)`.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportUpgradeModal.tsx` (new file) and `page.tsx` (modified file).
    - Ensure `z-[1]` is used on the modal overlay to safely cover the `z-50` dropdown menus.
  </constraints>
</system_prompt>
</file>

<file path="0430_0900_export-scene-sidebar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to build a new right sidebar for selecting scenes in the Export Module's Single Scene view, and prepare the architectural state for multi-tab CSV/Sheets exporting.
  </role>

  <task>
    Execute Sub-task: Single Scene Selection Sidebar & Multi-Tab Export Logic.

    1. **CREATE `components/breakdown/ExportSceneSidebar.tsx`**:
       - Create a Client Component.
       - **Props**: `scenes: { id: string, number: number }[]`, `selectedIds: Set<string>`, `onSelectionChange: (ids: Set<string>) => void`, `activeSceneId: string`, `onActiveChange: (id: string) => void`.
       - **Layout**: `<aside className="w-80 h-full bg-surface-container-lowest border-l border-outline-variant flex flex-col shrink-0">`
       - **Header**: "Export Scenes" title + Select All checkbox.
       - **Custom Range Input**: `<input>` for typing ranges like "1-3, 5". Add a `useEffect` that parses this string using Regex, extracts the scene numbers, and automatically updates `onSelectionChange` with the matching scene IDs.
       - **Scene List**: Scrollable column. Map over `scenes`. Each row contains:
         - A `<input type="checkbox">` bound to `selectedIds.has(scene.id)`.
         - A clickable label (Scene {number}) that calls `onActiveChange(scene.id)`. Highlight the active scene's label with primary text color.

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - **Mock Data**: Create a simple `MOCK_SCENES` array containing 10 mock scenes (id: 's1' to 's10', number: 1 to 10).
       - **State**: 
         - `activeSceneId` (default 's1').
         - `selectedExportIds` (default `new Set(['s1'])`).
       - **Pass Props**: Pass `activeSceneId` to `<ExportPreviewSingle activeSceneId={activeSceneId} />` (you will need to update ExportPreviewSingle's interface to accept this prop optionally).
       - **Render Sidebar**: Immediately after the center view area, conditionally render: 
         `{viewMode === 'single' && <ExportSceneSidebar ...props />}`.
       - **Multi-Tab Architecture Comments**: In the Topbar Dropdown where `setExportType('csv' | 'sheets' | 'pdf')` is called, add explicit architectural comments stating the data structure rule:
         `// ARCHITECTURE RULE: For PDF, map selectedExportIds to multiple A4 pages.`
         `// ARCHITECTURE RULE: For CSV and Google Sheets, map selectedExportIds to SEPARATE TABS (Worksheets) inside the document.`

    3. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Update the Props interface to accept `activeSceneId?: string`.
       - Use this prop to conditionally render the "Scene #:" value in the MetaField (fallback to '1' if not provided).
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportSceneSidebar.tsx` (new file), `page.tsx` (modified), and `ExportPreviewSingle.tsx` (modified).
    - Ensure the auto-tick logic for the custom range input handles basic errors gracefully (e.g., trailing commas).
  </constraints>
</system_prompt>
</file>

<file path="0430_0906_export-sidebar-rich-ui.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to upgrade the UI of the ExportSceneSidebar to perfectly match the detailed scene list layout found in the Breakdown module, displaying full scene metadata alongside the export checkbox.
  </role>

  <task>
    Execute Sub-task: Rich UI for Export Scene Sidebar.

    1. **MODIFY `components/breakdown/ExportSceneSidebar.tsx`**:
       - Import the `Scene` interface from `@/types/breakdown`.
       - Update the `scenes` prop type from `{ id: string, number: number }[]` to `Scene[]`.
       - Rewrite the render logic for the scene list items to match `BreakdownSceneList.tsx`. Each row should be a `<div>` with `flex items-start gap-3 p-3 border-b border-outline-variant`.
       - **Left side (Checkbox)**: Render the `<input type="checkbox">` wrapped in a `div` with `pt-0.5`. Wire it to toggle the scene's ID in `selectedIds` via `onSelectionChange`.
       - **Right side (Clickable Info)**: Render a `<button>` that triggers `onActiveChange(scene.id)`. Inside it, use the exact layout from the Breakdown module:
         ```tsx
         <div className="flex-1 text-left cursor-pointer">
           <div className="flex justify-between items-start mb-1">
             <span className={`text-label-sm font-bold ${isActive ? 'text-primary' : 'text-secondary'}`}>
               SCENE {String(scene.number).padStart(2, '0')}
             </span>
             <span className="text-[10px] uppercase font-bold text-outline">
               {scene.intExt}. {scene.dayNight}
             </span>
           </div>
           <div className={`text-body-md truncate ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
             {scene.location}
           </div>
         </div>
         ```
       - Ensure `isActive` state drives the text color changes (`text-primary` for active, `text-secondary`/`text-on-surface-variant` for inactive). Apply a subtle background highlight (e.g., `bg-primary-fixed/10`) to the entire row if active.

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Update the `MOCK_SCENES` array to satisfy the full `Scene` interface.
       - Provide at least 5 mock scenes with rich data. Example:
         `{ id: 's1', number: 1, location: 'Apartment - Living Room', intExt: 'INT', dayNight: 'DAY' }`
       - Pass these rich objects down to `ExportSceneSidebar`.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportSceneSidebar.tsx` and `page.tsx`.
    - Do not break the existing regex auto-tick logic for the custom range input.
  </constraints>
</system_prompt>
</file>

<file path="0430_0911_export-single-scene-navigation.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement Next/Prev scene navigation buttons for the Single Scene PDF Preview in the Export Module.
  </role>

  <task>
    Execute Sub-task: Add Floating Navigation Arrows to Single Scene View.

    1. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Locate the `activeSceneId` state and `MOCK_SCENES` array.
       - Calculate the current index: `const currentIndex = MOCK_SCENES.findIndex(s => s.id === activeSceneId);`
       - Create navigation logic:
         ```tsx
         const disablePrev = currentIndex <= 0;
         const disableNext = currentIndex === -1 || currentIndex >= MOCK_SCENES.length - 1;
         
         const handlePrev = () => {
           if (!disablePrev) setActiveSceneId(MOCK_SCENES[currentIndex - 1].id);
         };
         
         const handleNext = () => {
           if (!disableNext) setActiveSceneId(MOCK_SCENES[currentIndex + 1].id);
         };
         ```
       - Pass these 4 new props down to `<ExportPreviewSingle />`.

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Update the `Props` interface to accept: `onPrev?: () => void`, `onNext?: () => void`, `disablePrev?: boolean`, `disableNext?: boolean`.
       - Update the root `<div>` layout to allow sticky side elements:
         Change `<div className="flex-1 overflow-y-auto bg-[#f9f9ff] flex justify-center py-8">`
         to `<div className="flex-1 overflow-y-auto bg-[#f9f9ff] flex justify-center items-start py-8 gap-8">`
       - Insert the Left Arrow Button immediately BEFORE the A4 wrapper `<div>`:
         ```tsx
         <div className="sticky top-1/2 -translate-y-1/2 print:hidden shrink-0 mt-[400px]">
           <button 
             onClick={onPrev} 
             disabled={disablePrev} 
             className="w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
           >
             <span className="material-symbols-outlined text-[24px]">chevron_left</span>
           </button>
         </div>
         ```
       - Insert the Right Arrow Button immediately AFTER the A4 wrapper `<div>` using the exact same structure but with the `chevron_right` icon and wired to `onNext` and `disableNext`.
       - Note: `mt-[400px]` is used alongside `sticky top-1/2` to ensure it pushes down slightly into the viewport center while scrolling the tall A4 page.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `page.tsx` and `ExportPreviewSingle.tsx`.
    - MUST include `print:hidden` on the arrow wrappers so they do not show up when exporting the PDF.
    - Preserve all existing logic (ExportSceneSidebar, ExportUpgradeModal, etc.).
  </constraints>
</system_prompt>
</file>

<file path="0430_0922_export-share-modal.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to add a "Share" button to the Export Module's topbar and implement its corresponding modal, perfectly replicating the existing Share Project/Script modal's UI and chip-input functionality.
  </role>

  <task>
    Execute Sub-task: Add Share Export Modal & Button.

    1. **CREATE `components/breakdown/ShareExportModal.tsx`**:
       - Create a Client Component.
       - **Props**: `isOpen: boolean`, `onClose: () => void`.
       - **State**: `emails: string[]`, `inputValue: string`, `access: string` (default "Just Crew").
       - **Overlay**: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4`.
       - **Container**: `bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-lg w-full flex flex-col p-6`.
       - **Logic**:
         - Implement `handleKeyDown` for the email input: trigger on "Enter", validate with `.includes("@")`, prevent duplicates, and create a chip.
         - Implement `removeEmail(emailToRemove)` to delete individual chips.
         - Implement `handleClose()` to clear states (`emails`, `inputValue`) and call `onClose()`.
       - **UI Elements**:
         - Header: Title "Share Document" + close (`close`) icon button.
         - Input Area: A focus-within flex container wrapping the mapped email chips (with `close` icon to remove) and a transparent `<input>` for typing.
         - Helper Text: "Press Enter to add multiple emails." below the input.
         - People List: A mock list showing the current user as "Owner" (e.g., You, Tri Pham, Owner).
         - General Access: A `<select defaultValue={access}>` with options "Just Crew" and "Anyone with the link".
         - Footer: "Copy link" button (secondary style, `link` icon) on the left, and a primary button on the right that reads "Share" if `emails.length > 0`, otherwise "Done". Both footer buttons should call `handleClose()`.

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Import `ShareExportModal`.
       - Add state: `const [isShareModalOpen, setIsShareModalOpen] = useState(false);`
       - Render `<ShareExportModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />` at the root level of `ExportPageInner`.
       - Locate the top action bar on the far right where the Export button dropdown wrapper is located (`<div className="relative shrink-0 ml-4">` or similar).
       - Group the new Share button and the Export wrapper inside a new `<div className="flex items-center gap-3 ml-4 shrink-0">`.
       - **Share Button UI** (place it before the Export wrapper):
         ```tsx
         <button 
           onClick={() => setIsShareModalOpen(true)} 
           className="bg-white text-on-surface border border-outline-variant px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors cursor-pointer"
         >
           <span className="material-symbols-outlined text-[18px]">ios_share</span>
           Share
         </button>
         ```
       - Ensure the Export dropdown wrapper no longer needs `ml-4` since the parent flex container handles the `gap-3` spacing.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ShareExportModal.tsx` (new file) and `page.tsx` (modified file).
    - Maintain strict adherence to design tokens and the exact multi-email chip UX from `ShareProjectModal`.
  </constraints>
</system_prompt>
</file>

<file path="0430_0938_export-safe-zone.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to add a "safe zone" (extra scrollable padding) to the right and bottom of the ExportPreviewTable to ensure the virtual pop-out editor has ample space to expand without hitting the viewport edges.
  </role>

  <task>
    Execute Sub-task: Add Safe Zone to All Scenes Table.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the root `<div>` that has `overflow-auto` and wraps the `<table>`.
       - Wrap the `<table>` element itself inside a new `<div>` that applies the safe zone padding: `<div className="pb-[50vh] pr-[30vw] w-max">`.
       - Ensure the structure looks exactly like this:
         ```tsx
         return (
           <div className="w-full h-full overflow-auto bg-surface-container-lowest custom-scrollbar">
             <div className="pb-[50vh] pr-[30vw] w-max">
               <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
                 {/* table content remains untouched */}
               </table>
             </div>
           </div>
         );
         ```
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx`.
    - Do not modify any table logic, sticky header z-indexes, matrix selection, or the dynamic collision detection `ref`.
  </constraints>
</system_prompt>
</file>

<file path="0430_1010_helios-zoom-report.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". Your objective is NOT to modify the current source code, but to research, analyze, and write a highly detailed technical report on how to implement a Google Sheets/Figma-like cursor-anchored zoom mechanism in a React/Next.js environment.
  </role>

  <task>
    Execute Sub-task: Write Helios Analysis Report on Cursor-Anchored Zoom.

    1. Create a new markdown file at exactly: `.scenoo-brain/reports/0430/0430_1010_report-helios-zoom-analysis.md`
    2. The report must deeply analyze and provide the architectural blueprint for the following 4 pillars:
       
       **A. Native Pinch-to-Zoom Interception:**
       - How to use `{ passive: false }` on the `wheel` event to detect `e.ctrlKey` (trackpad pinch).
       - How to reliably call `e.preventDefault()` to stop the browser's native full-page UI zoom.
       
       **B. Logarithmic Scaling Math:**
       - Why linear addition/subtraction feels clunky.
       - The math formula using `Math.exp` (e.g., `newScale = oldScale * Math.exp(-e.deltaY * speed)`) to achieve butter-smooth zooming.
       
       **C. Cursor-Anchored Scroll Compensation (The Core Logic):**
       - The exact mathematics required to keep the content under the user's cursor perfectly still while zooming in/out.
       - How to calculate the cursor's local coordinates relative to the scroll container.
       - How to adjust `scrollLeft` and `scrollTop` simultaneously using `requestAnimationFrame` to compensate for the CSS `transform: scale()` offset.
       
       **D. DOM Footprint Compensation:**
       - When scaling a container down via CSS transform (e.g., 50%), the physical DOM footprint remains 100%, causing massive empty scrollable areas.
       - The CSS calc trick (`width: calc((100 / zoom) * 100%)`) to shrink the wrapper dynamically so the scrollbars perfectly match the visual content size.

    3. Provide a clear, step-by-step implementation roadmap for how we will eventually inject this logic into the Export Module (`page.tsx` and `ExportPreviewTable.tsx`).
  </task>

  <constraints>
    - Output ONLY the markdown content for the report file.
    - Do not output any direct modifications to existing `.tsx` files.
    - Be extremely precise with the Javascript/React math formulas in the report.
  </constraints>
</system_prompt>
</file>

<file path="0430_1023_apply-helios-zoom-export.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the "Helios Protocol" Cursor-Anchored Zoom logic into the Export module, fixing trackpad pinch-to-zoom and removing inner scroll conflicts.
  </role>

  <task>
    Execute Sub-task: Apply Helios Cursor-Anchored Zoom to Export Module.

    1. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Import `useRef` and `useEffect`.
       - Create `const scrollContainerRef = useRef<HTMLDivElement>(null);`.
       - Add the core scroll-compensation helper function inside `ExportPageInner`:
         ```tsx
         const adjustZoom = (newScale: number, clientX: number, clientY: number) => {
           const container = scrollContainerRef.current;
           if (!container) return;
           
           const rect = container.getBoundingClientRect();
           const mouseX = clientX - rect.left;
           const mouseY = clientY - rect.top;

           setZoom((prevZoom) => {
             const oldScale = prevZoom / 100;
             if (oldScale === newScale) return prevZoom;

             const scrollX = container.scrollLeft;
             const scrollY = container.scrollTop;
             
             // Content pixel currently under the cursor
             const contentX = (scrollX + mouseX) / oldScale;
             const contentY = (scrollY + mouseY) / oldScale;

             // New scroll required to keep that pixel under the cursor
             const newScrollX = contentX * newScale - mouseX;
             const newScrollY = contentY * newScale - mouseY;

             requestAnimationFrame(() => {
               container.scrollLeft = newScrollX;
               container.scrollTop = newScrollY;
             });

             return Math.round(newScale * 100);
           });
         };
         ```
       - Add the `wheel` event listener `useEffect` to intercept trackpad pinch gestures:
         ```tsx
         useEffect(() => {
           const container = scrollContainerRef.current;
           if (!container) return;

           const handleWheel = (e: WheelEvent) => {
             if (e.ctrlKey) {
               e.preventDefault(); // Block native browser UI zoom
               setZoom((currentZoom) => {
                 const currentScale = currentZoom / 100;
                 // Logarithmic scaling for smooth trackpad feel
                 let newScale = currentScale * Math.exp(-e.deltaY * 0.005);
                 newScale = Math.min(Math.max(newScale, 0.5), 2); // Clamp 50% to 200%
                 
                 // Execute adjustment asynchronously to read correct DOM state
                 setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
                 return currentZoom; // State update handled inside adjustZoom
               });
             }
           };

           container.addEventListener('wheel', handleWheel, { passive: false });
           return () => container.removeEventListener('wheel', handleWheel);
         }, []);
         ```
       - Add a helper for the Toolbar Zoom Select:
         ```tsx
         const handleToolbarZoom = (targetZoom: number) => {
           const container = scrollContainerRef.current;
           if (!container) return;
           const rect = container.getBoundingClientRect();
           // Zoom into the exact center of the viewport
           const centerX = rect.left + container.clientWidth / 2;
           const centerY = rect.top + container.clientHeight / 2;
           adjustZoom(targetZoom / 100, centerX, centerY);
         };
         ```
       - Update the Toolbar's Zoom `<select>` `onChange` (and any related zoom-in/out buttons) to use `handleToolbarZoom(Number(e.target.value))` instead of direct `setZoom`.
       - Update the main scrollable wrapper (the one wrapping the scaled content):
         Add `ref={scrollContainerRef}` and the class `touch-none`.
       - Update the scaled inner wrapper's inline style to enforce `0 0` origin and footprint compensation for ALL view modes:
         ```tsx
         style={{
           transform: `scale(${zoom / 100})`,
           transformOrigin: '0 0',
           width: `calc((100 / ${zoom}) * 100%)`,
           height: `calc((100 / ${zoom}) * 100%)`,
         }}
         ```
         *(REMOVE any `transition` from this style/class to prevent lag against `requestAnimationFrame`)*.

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the outermost `<div>` wrapper of the component.
       - Remove `h-full` and `overflow-auto` from its className.
       - It should simply be `<div className="w-full bg-surface-container-lowest">` or similar, allowing it to expand to its full natural height. The scrolling is now 100% handled by the parent `scrollContainerRef` in `page.tsx`.
       - Preserve the `pb-[50vh] pr-[30vw] w-max` safe zone wrapper perfectly intact.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `page.tsx` and `ExportPreviewTable.tsx`.
    - Be careful with `setZoom` closure scoping; the `setTimeout` trick inside `handleWheel` safely delegates the math to `adjustZoom` without stale state.
    - Ensure all sticky headers (`top-0`, `left-0`) remain intact in the table.
  </constraints>
</system_prompt>
</file>

<file path="0430_1039_helios-export-zoom-failure.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The Phase 1 & 2 implementation of Cursor-Anchored Zoom failed to replicate Google Sheets behavior. Your task is to analyze the root causes and output a highly technical diagnostic report.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the current code fails based on the symptoms provided, and define the absolute mathematical and architectural solutions.
  </helios_directive>

  <symptoms>
    1. Trackpad zoom leaks: When zooming in via trackpad, the Sidebar still zooms natively (the browser's native UI zoom is not fully blocked).
    2. Toolbar zoom at 50% pushes the table out of bounds/clipped.
    3. Toolbar zoom to 100% anchors to the exact center of the screen, which is extremely jarring (Google Sheets anchors to the top-left).
  </symptoms>

  <task>
    Create a detailed report at exactly: `.scenoo-brain/reports/0430/0430_1737_report-helios-export-zoom-failure.md`

    The report MUST address these 3 pillars of failure:

    **Pillar 1: Global Native Zoom Leak (The Sidebar Issue)**
    - Analyze why attaching the `wheel` event to `scrollContainerRef` fails when the cursor hovers over Sidebars/Topbars.
    - Propose moving the `e.ctrlKey` interception to a `useEffect` bound globally to `document`, while keeping the `e.deltaY` redirection scoped to the local `zoom` state.

    **Pillar 2: The Flexbox & Transform Origin Conflict (The 50% Clipping Issue)**
    - Analyze the destructive relationship between `transform-origin: 0 0`, the CSS footprint compensation `width: calc((100 / zoom) * 100%)`, and parent layout properties (like `justify-center`, `items-center`, or flex spacing). 
    - When the wrapper fakes a 200% width at 0.5 scale, flexbox alignment pushes it off-screen. Propose a layout fix (e.g., removing `justify-center`, enforcing `block` layout with explicit alignments, or using a nested absolute container).

    **Pillar 3: Top-Left Viewport Anchoring (The Toolbar Zoom Issue)**
    - Analyze the flaw in `handleToolbarZoom` which forces the anchor to `clientWidth / 2` and `clientHeight / 2`.
    - Provide the exact math to anchor toolbar zooming to the **top-left corner of the currently visible viewport** (i.e., `container.scrollLeft` and `container.scrollTop`), perfectly mimicking Google Sheets.

    Conclude the report with a strict, step-by-step action plan to fix `page.tsx` and `ExportPreviewTable.tsx`.
  </task>

  <constraints>
    - Output ONLY the markdown content for the report.
    - Do not write any code modifications outside the report.
  </constraints>
</system_prompt>
</file>

<file path="0430_1054_apply-helios-zoom-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to fix the Cursor-Anchored Zoom logic in the Export module by strictly resolving the 3 failures identified in the Helios diagnostic report.
  </role>

  <task>
    Execute Sub-task: Apply Helios Zoom Fixes (Pillars 1, 2, and 3).

    **1. MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:

    *   **Fix Pillar 2 (Flexbox & Transform Conflict)**:
        *   Locate the main scrollable container (`<div ref={scrollContainerRef} ...>`). Completely REMOVE `items-center`, `justify-center`, or any flex centering classes. It must naturally align left.
        *   Locate the inner scaled wrapper (`<div style={{ transform: ... }}>`). Completely REMOVE `flex` and `justify-center` from its `className`. It must be a standard block element to ensure `transformOrigin: '0 0'` anchors to the true top-left without negative offset clipping.

    *   **Fix Pillar 1 (Global Native Zoom Leak)**:
        *   Update the `useEffect` that handles the trackpad zoom. It MUST attach the `wheel` event to `document` instead of `scrollContainerRef.current` to catch events even when the cursor is over the sidebar.
        *   Implementation:
            ```tsx
            useEffect(() => {
              const handleGlobalWheel = (e: WheelEvent) => {
                if (!e.ctrlKey) return;
                e.preventDefault(); // Block native browser zoom globally

                const container = scrollContainerRef.current;
                if (!container) return;

                setZoom((currentZoom) => {
                  const currentScale = currentZoom / 100;
                  let newScale = currentScale * Math.exp(-e.deltaY * 0.005);
                  newScale = Math.min(Math.max(newScale, 0.5), 2);
                  
                  setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
                  return currentZoom;
                });
              };

              document.addEventListener('wheel', handleGlobalWheel, { passive: false });
              return () => document.removeEventListener('wheel', handleGlobalWheel);
            }, []);
            ```

    *   **Fix Pillar 3 (Toolbar Top-Left Anchoring)**:
        *   Update the `handleToolbarZoom` function to anchor the zoom to the top-left of the viewport (`rect.left`, `rect.top`) instead of the geometric center (`clientWidth / 2`).
        *   Implementation:
            ```tsx
            const handleToolbarZoom = (targetZoom: number) => {
              const container = scrollContainerRef.current;
              if (!container) return;
              const rect = container.getBoundingClientRect();
              adjustZoom(targetZoom / 100, rect.left, rect.top);
            };
            ```

    **2. MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
    *   Verify the outermost wrapper `<div>`. Ensure there are absolutely NO flex centering classes (`items-center`, `justify-center`, or `m-auto`). It should strictly be `<div className="w-full bg-surface-container-lowest">` or similar block layout.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `page.tsx` and `ExportPreviewTable.tsx`.
    - Ensure the `adjustZoom` helper function remains intact and uses the exact `clientX - rect.left` and `clientY - rect.top` relative math.
  </constraints>
</system_prompt>
</file>

<file path="0430_1104_export-infinite-rulers.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement "Infinite Rulers" and integrated safe zones for the ExportPreviewTable to prevent position: sticky headers from detaching during deep panning/zooming.
  </role>

  <task>
    Execute Sub-task: Integrated Table Safe Zones & Infinite Rulers.

    **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:

    1. **Remove Outer Safe Zone Wrapper**:
       - Locate the `<div>` wrapper that has `pb-[50vh] pr-[30vw] w-max`.
       - Completely UNWRAP the `<table>` from this div. The `<table>` should now be a direct child of the root `<div className="w-max bg-surface-container-lowest">` (change `w-full` to `w-max` on the root if not already).

    2. **Extend the `<thead>` (Right Ruler & Safe Zone)**:
       - In **Row 0** (the `LETTERS.map` row), upgrade the corner cell's `z-index` from `z-30` to `z-40` (`className="w-[40px] sticky left-0 z-40 bg-surface-container-low border border-outline-variant"`).
       - Immediately after the `LETTERS.map` loop, append a dummy extension `<th>`:
         `<th className="bg-surface-container-low border-b border-outline-variant z-10" style={{ minWidth: '100vw' }}></th>`
       - In **Row 1** (Document Header), append an empty extension cell after the colSpan groups:
         `<th className="border-none bg-transparent pointer-events-none"></th>`
       - In **Row 2** (Data Headers), append an empty extension cell after the `COLUMNS.map` loop:
         `<th className="border-none bg-transparent pointer-events-none"></th>`

    3. **Extend the `<tbody>` (Bottom Ruler & Right Safe Zone)**:
       - Inside the `MOCK_DATA.map` loop, append an empty extension cell to every data row after the `COLUMNS.map` loop:
         `<td className="border-none bg-transparent pointer-events-none"></td>`
       - Immediately AFTER the `MOCK_DATA.map` loop ends, append a final dummy `<tr>` to act as the infinite bottom ruler and vertical safe zone:
         ```tsx
         {/* Infinite Bottom Ruler & Vertical Safe Zone */}
         <tr style={{ height: '100vh' }}>
           <td className="sticky left-0 z-20 bg-surface-container-low border-r border-outline-variant"></td>
           <td colSpan={LETTERS.length + 1} className="border-none bg-transparent pointer-events-none"></td>
         </tr>
         ```
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx`.
    - Do NOT modify the `colSpan` math of the Document Header (Row 1); it still spans the 17 data columns, while the new dummy `<th>` naturally occupies the 18th column slot.
    - Ensure all existing sticky logic, Resize Observer / AutoFit logic, and Bounding Box selection logic remains completely intact.
  </constraints>
</system_prompt>
</file>

<file path="0430_1114_helios-decoupled-rulers.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". Your objective is NOT to modify the source code yet, but to write a highly detailed architectural blueprint for implementing "Decoupled Sync-Scroll Rulers" in a React spreadsheet environment.
  </role>

  <task>
    Write a Helios Analysis Report on Decoupled Sync-Scroll Rulers.

    1. Create a markdown file at exactly: `.scenoo-brain/reports/0430/0430_1812_report-helios-decoupled-rulers.md`
    2. The report must deeply analyze and provide the blueprint for these 4 pillars:

       **A. DOM Extraction (Breaking the Table):**
       - Explain the CSS limitation: why `position: sticky` fails inside a `transform: scale()` wrapper.
       - Detail the structural shift: removing the A-Q letter headers and 1-N row counters from the `<table>` element entirely.
       - Define the new layout: A fixed top container (Top Ruler), a fixed left container (Left Ruler), a fixed top-left corner block, and the main scrollable data table underneath.

       **B. Sync-Scroll Mathematics (requestAnimationFrame):**
       - How to attach a fast/passive `onScroll` event to the main scroll container (`scrollContainerRef`).
       - The exact math to translate the decoupled rulers (e.g., `topRulerRef.current.style.transform = 'translateX(-' + scrollLeft + 'px)'`) to perfectly synchronize with the table's scrolling without jitter.

       **C. Zoom Synchronization (Dynamic Dimension Mapping):**
       - Since the decoupled rulers will live OUTSIDE the `transform: scale()` wrapper to avoid the sticky bug, they will not zoom automatically.
       - Detail the math required to pass the `zoom` state to the rulers and dynamically calculate their individual cell dimensions (e.g., `width: calc(120px * (zoom / 100))`) so the ruler ticks align flawlessly with the scaled table columns/rows at any zoom level.

       **D. Migration Plan for Export Module:**
       - Provide a step-by-step roadmap for refactoring `ExportPreviewTable.tsx` and `page.tsx` to implement this decoupled layer system safely.
  </task>

  <constraints>
    - Output ONLY the markdown content for the report file.
    - Do NOT output any direct modifications to existing `.tsx` files.
    - Be extremely precise with the DOM interaction and math formulas.
  </constraints>
</system_prompt>
</file>

<file path="0430_2011_decoupled-rulers-phase2.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect implementing Phase 2 of the "Helios Decoupled Sync-Scroll Rulers" blueprint.
  </role>

  <task>
    Execute Phase 2: Left Ruler Extraction & Vertical Sync.

    **Step 1: Clean Up `ExportPreviewTable.tsx` (Remove Left Ruler)**
    Modify `components/breakdown/ExportPreviewTable.tsx`:
    - Locate the `getColLeft` function. Change its starting `left` value from `40` to `0` (since the 40px row-number column will no longer exist inside the table):
      ```tsx
      const getColLeft = useCallback((colIndex: number) => {
        let left = 0; // Changed from 40
        for (let j = 0; j < colIndex; j++) {
          left += colWidths[j] || 120;
        }
        return left;
      }, [colWidths]);
      ```
    - In `<thead>`, remove the empty corner `<th>` cells (`w-[40px] sticky left-0`) from all header rows (Document Header row and Data Header row).
    - In `<tbody>`, remove the row-number `<td>` cell (`w-[40px] sticky left-0... {rowIndex + 3}`) from the `MOCK_DATA.map` row loop.

    **Step 2: Implement Left Ruler in `page.tsx`**
    Modify `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx` (`ExportPageInner` component):
    - Add `const leftRulerRef = useRef<HTMLDivElement>(null);`.
    - Update the `syncRulers` function to handle both X and Y axis synchronization:
      ```tsx
      const syncRulers = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollTop } = scrollContainerRef.current;
        requestAnimationFrame(() => {
          if (topRulerRef.current) {
            topRulerRef.current.style.transform = `translateX(-${scrollLeft}px)`;
          }
          if (leftRulerRef.current) {
            leftRulerRef.current.style.transform = `translateY(-${scrollTop}px)`;
          }
        });
      };
      ```
    - Wrap the `scrollContainerRef` main view in a flex row to place the Left Ruler beside it. Update the layout structure right below the Top Ruler:
      ```tsx
      <div className="flex-1 flex overflow-hidden w-full relative">
        {viewMode === 'all' && (
          <div className="w-[40px] shrink-0 bg-surface-container-low border-r border-outline-variant z-40 overflow-hidden relative">
            <div ref={leftRulerRef} className="will-change-transform flex flex-col w-full h-max">
              {/* Spacers for the 2 Header Rows (assuming default 41px height for each) */}
              <div className="w-full border-b border-outline-variant shrink-0" style={{ height: 41 * (zoom / 100) }} />
              <div className="w-full border-b border-outline-variant shrink-0" style={{ height: 41 * (zoom / 100) }} />
              
              {/* Data Row Counters */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-full flex items-center justify-center text-[10px] text-on-surface-variant font-normal border-b border-outline-variant shrink-0"
                  style={{ height: (rowHeights[i] || 41) * (zoom / 100) }}
                >
                  {i + 3}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef} 
          className="flex-1 overflow-auto touch-none custom-scrollbar" 
          onScroll={syncRulers}
        >
          {/* existing scaled wrapper div and viewMode conditional renders */}
        </div>
      </div>
      ```
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx` and `page.tsx`.
    - Do not alter existing zoom scale math or Top Ruler logic.
    - Ensure `ExportPreviewTable` properly relies on `0` left offset now that the 40px column is extracted.
  </constraints>
</system_prompt>
</file>

<file path="0430_2045_decoupled-rulers-phase3-refined.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement Phase 3 of the Decoupled Rulers (Resize Logic). 
    CRITICAL: You must use TARGETED REPLACEMENTS. Do NOT output the entire file, as it will cause truncation and layout errors in the IDE.
  </role>

  <task>
    Execute Phase 3: Column & Row Resize Migration via Targeted Updates.

    **Step 1: Clean `components/breakdown/ExportPreviewTable.tsx`**
    - Remove the `resizing` state, `startResize`, `autoFitColumn`, and `autoFitRow` functions.
    - Inside `<thead>` (Row 0, `LETTERS.map`), remove the `<div onMouseDown={...} cursor-col-resize />` and `onDoubleClick` handle.
    - Inside `<tbody>`, remove the `<div onMouseDown={...} cursor-row-resize />` handle from the row-number `<td>`.

    **Step 2: Inject State & Logic into `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Locate `const [zoom, setZoom] = useState(100);` inside `ExportPageInner`.
    - Inject the following resize logic immediately after it:
      ```tsx
      const [resizing, setResizing] = useState<{ type: 'col' | 'row'; index: number; startPos: number; startSize: number } | null>(null);

      const startResize = (e: React.MouseEvent, type: 'col' | 'row', index: number) => {
        e.preventDefault();
        e.stopPropagation();
        const startPos = type === 'col' ? e.clientX : e.clientY;
        const startSize = type === 'col' ? (colWidths[index] || 120) : (rowHeights[index] || 41);
        setResizing({ type, index, startPos, startSize });
      };

      useEffect(() => {
        if (!resizing) return;
        const handleMouseMove = (e: MouseEvent) => {
          const currentPos = resizing.type === 'col' ? e.clientX : e.clientY;
          // Scale compensation math:
          const delta = (currentPos - resizing.startPos) / (zoom / 100);
          const newSize = Math.max(
            resizing.type === 'col' ? 40 : 20,
            resizing.startSize + delta
          );

          if (resizing.type === 'col') {
            setColWidths(prev => ({ ...prev, [resizing.index]: newSize }));
          } else {
            setRowHeights(prev => ({ ...prev, [resizing.index]: newSize }));
          }
        };

        const handleMouseUp = () => setResizing(null);

        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
          document.body.style.userSelect = '';
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }, [resizing, zoom, setColWidths, setRowHeights]);
      ```

    **Step 3: Update Top Ruler UI (Targeted)**
    - In `page.tsx`, locate the `LETTERS.map` loop inside `<div ref={topRulerRef}...>`.
    - Replace the mapped `<div>` with this exact code to safely inject the column drag handle:
      ```tsx
      {LETTERS.map((letter, i) => (
        <div 
          key={letter}
          className="relative h-full border-r border-outline-variant text-[10px] font-normal text-on-surface-variant flex items-center justify-center shrink-0"
          style={{ width: (colWidths[i] || 120) * (zoom / 100) }}
        >
          {letter}
          <div
            onMouseDown={(e) => startResize(e, 'col', i)}
            className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-primary z-50 select-none"
          />
        </div>
      ))}
      ```

    **Step 4: Update Left Ruler UI (Targeted)**
    - In `page.tsx`, locate the `<div ref={leftRulerRef}...>` wrapper.
    - Replace its inner contents with this exact code to inject row drag handles:
      ```tsx
      <div ref={leftRulerRef} className="will-change-transform flex flex-col w-full h-max">
        {/* Spacer 1 - Doc Header */}
        <div className="relative w-full border-b border-outline-variant shrink-0" style={{ height: (rowHeights[1] || 41) * (zoom / 100) }}>
          <div onMouseDown={(e) => startResize(e, 'row', 1)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
        </div>
        {/* Spacer 2 - Data Header */}
        <div className="relative w-full border-b border-outline-variant shrink-0" style={{ height: (rowHeights[2] || 41) * (zoom / 100) }}>
          <div onMouseDown={(e) => startResize(e, 'row', 2)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
        </div>
        
        {/* Data Row Counters */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rowIndex = i + 3;
          return (
            <div 
              key={i}
              className="relative w-full flex items-center justify-center text-[10px] text-on-surface-variant font-normal border-b border-outline-variant shrink-0"
              style={{ height: (rowHeights[rowIndex] || 41) * (zoom / 100) }}
            >
              {rowIndex}
              <div
                onMouseDown={(e) => startResize(e, 'row', rowIndex)}
                className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none"
              />
            </div>
          );
        })}
      </div>
      ```
  </task>

  <constraints>
    - NEVER output the entire `page.tsx` file. Provide ONLY the snippets requested for replacement.
    - Ensure `relative` and `shrink-0` are preserved so the layout does not collapse.
  </constraints>
</system_prompt>
</file>

<file path="0430_2105_decoupled-rulers-phase4.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect implementing Phase 4 (Matrix Transform Freeze) of the Decoupled Rulers blueprint.
    CRITICAL: You must use TARGETED REPLACEMENTS. Do NOT output the entire file to avoid IDE truncation.
  </role>

  <task>
    Execute Phase 4: CSS Variable Matrix Translation for Frozen Cells.
    Since `position: sticky` fails inside `transform: scale()`, we will use JS-synced CSS Variables and `transform: translate` to freeze rows and columns physically.

    **Step 1: Inject CSS Variables & Zoom Factor in `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Locate the `syncRulers` function and update it to inject CSS variables into the scroll container:
      ```tsx
      const syncRulers = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollTop } = scrollContainerRef.current;
        requestAnimationFrame(() => {
          if (topRulerRef.current) {
            topRulerRef.current.style.transform = `translateX(-${scrollLeft}px)`;
          }
          if (leftRulerRef.current) {
            leftRulerRef.current.style.transform = `translateY(-${scrollTop}px)`;
          }
          // Inject scroll coordinates as CSS variables for internal table freeze logic
          scrollContainerRef.current.style.setProperty('--scroll-x', `${scrollLeft}px`);
          scrollContainerRef.current.style.setProperty('--scroll-y', `${scrollTop}px`);
        });
      };
      ```
    - Locate `<div ref={scrollContainerRef}` and inject `--zoom-factor` into its `style`:
      ```tsx
      <div 
        ref={scrollContainerRef} 
        className="flex-1 overflow-auto touch-none custom-scrollbar" 
        onScroll={syncRulers}
        style={{ '--zoom-factor': zoom / 100 } as React.CSSProperties}
      >
      ```

    **Step 2: Update Top Ruler Freeze in `page.tsx`**
    - Inside `page.tsx`, locate the `LETTERS.map` in `topRulerRef`.
    - Replace the mapped `<div>` with this updated translation logic:
      ```tsx
      {LETTERS.map((letter, i) => {
        const isFrozen = i < freezeCols;
        return (
          <div 
            key={letter}
            className={`relative h-full border-r border-outline-variant text-[10px] font-normal text-on-surface-variant flex items-center justify-center shrink-0 ${isFrozen ? 'z-[1] bg-surface-container-low shadow-[2px_0_4px_rgba(0,0,0,0.05)]' : ''}`}
            style={{ 
              width: (colWidths[i] || 120) * (zoom / 100),
              transform: isFrozen ? `translateX(var(--scroll-x, 0px))` : 'none'
            }}
          >
            {letter}
            <div
              onMouseDown={(e) => startResize(e, 'col', i)}
              className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-primary z-50 select-none"
            />
          </div>
        );
      })}
      ```

    **Step 3: Update Left Ruler Freeze in `page.tsx`**
    - Inside `page.tsx`, locate the `leftRulerRef` div contents.
    - Replace its contents with this updated translation logic (spacers are always frozen vertically, data rows depend on `freezeRows`):
      ```tsx
      <div ref={leftRulerRef} className="will-change-transform flex flex-col w-full h-max">
        {/* Spacer 1 - Doc Header (Always frozen vertically) */}
        <div className="relative w-full border-b border-outline-variant shrink-0 z-[1] bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]" style={{ height: (rowHeights[2] || 41) * (zoom / 100), transform: 'translateY(var(--scroll-y, 0px))' }}>
          <div onMouseDown={(e) => startResize(e, 'row', 1)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
        </div>
        {/* Spacer 2 - Data Header (Always frozen vertically) */}
        <div className="relative w-full border-b border-outline-variant shrink-0 z-[1] bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]" style={{ height: (rowHeights[3] || 41) * (zoom / 100), transform: 'translateY(var(--scroll-y, 0px))' }}>
          <div onMouseDown={(e) => startResize(e, 'row', 2)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
        </div>
        
        {/* Data Row Counters */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rowIndex = i + 3;
          const isFrozen = i < freezeRows;
          return (
            <div 
              key={i}
              className={`relative w-full flex items-center justify-center text-[10px] text-on-surface-variant font-normal border-b border-outline-variant shrink-0 ${isFrozen ? 'z-[1] bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]' : ''}`}
              style={{ 
                height: (rowHeights[rowIndex] || 41) * (zoom / 100),
                transform: isFrozen ? `translateY(var(--scroll-y, 0px))` : 'none'
              }}
            >
              {rowIndex}
              <div
                onMouseDown={(e) => startResize(e, 'row', rowIndex)}
                className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none"
              />
            </div>
          );
        })}
      </div>
      ```

    **Step 4: Execute Inverse-Scale Translation in `ExportPreviewTable.tsx`**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Replace the entire `<thead>` with this logic (apply `translateY` scaled by `--zoom-factor`):
      ```tsx
      <thead className="z-30">
        {/* Document Header */}
        <tr style={{ height: rowHeights[2] || 41 }}>
          <th colSpan={5} className="bg-surface-container-lowest border-b border-outline-variant" style={{ position: 'relative', zIndex: 40, transform: `translateY(calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))` }}>
            {/* inner grid content remains exactly the same as current code */}
          </th>
        </tr>
        {/* Data Headers */}
        <tr style={{ height: rowHeights[3] || 41 }}>
          {COLUMNS.map((col, i) => {
            const isColFrozen = i < freezeCols;
            const colorConfig = TAG_COLORS[col];
            return (
              <th
                key={col}
                className={`border border-outline-variant text-[10px] font-normal text-center whitespace-normal break-words p-1 ${colorConfig ? 'font-bold' : 'bg-surface-container-low text-on-surface-variant'}`}
                style={{
                  width: colWidths[i] || 120,
                  minWidth: colWidths[i] || 120,
                  backgroundColor: colorConfig?.bg,
                  color: colorConfig?.text,
                  position: 'relative',
                  zIndex: isColFrozen ? 50 : 40,
                  transform: `translate(${isColFrozen ? 'calc(var(--scroll-x, 0px) / var(--zoom-factor, 1))' : '0px'}, calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))`
                }}
              >
                {col}
              </th>
            );
          })}
        </tr>
      </thead>
      ```
      *(Note: When replacing `<th colSpan={5}...>`, keep its inner `<div className="grid grid-cols-5...` contents perfectly intact).*

    **Step 5: Apply Logic to Body Data Cells in `ExportPreviewTable.tsx`**
    - Inside `<tbody>`, locate the `MOCK_DATA.map((row, dataIndex) => ...` loop.
    - Replace the `<td>` wrapper inside the `COLUMNS.map` with this:
      ```tsx
      {COLUMNS.map((col, colIndex) => {
        const isColFrozen = colIndex < freezeCols;
        const isRowFrozen = dataIndex < freezeRows;
        const isFrozen = isColFrozen || isRowFrozen;
        const cellId = getCellId(rowIndex, colIndex);
        const isSelected = selectedCellIds.has(cellId);
        const isEditing = editingCell === cellId;

        return (
          <td
            key={col}
            className="p-0 border border-outline-variant bg-white"
            style={{
              width: colWidths[colIndex] || 120,
              minWidth: colWidths[colIndex] || 120,
              position: 'relative',
              overflow: 'visible',
              zIndex: isColFrozen && isRowFrozen ? 40 : isFrozen ? 30 : 1,
              transform: `translate(${isColFrozen ? 'calc(var(--scroll-x, 0px) / var(--zoom-factor, 1))' : '0px'}, ${isRowFrozen ? 'calc(var(--scroll-y, 0px) / var(--zoom-factor, 1))' : '0px'})`
            }}
          >
            {/* The inner View mode div and Edit mode popout remain exactly the same */}
      ```
  </task>

  <constraints>
    - Provide ONLY the specific code snippets required to replace the target areas.
    - Ensure you don't delete the Document Header inner `div` structure during the `<thead>` swap.
  </constraints>
</system_prompt>
</file>

<file path="0430_2141_helios-ruler-alignment.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The Decoupled Rulers are structurally complete, but they visually misalign with the scaled data table due to browser rendering differences. Your task is to analyze this alignment failure and output a highly technical diagnostic report.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the flex-based rulers misalign with the table-based layout, and define the absolute architectural solutions.
  </helios_directive>

  <symptoms>
    1. The Top Ruler (A-Q) and Left Ruler (1-N) do not perfectly align with the columns/rows of the `ExportPreviewTable` below them.
    2. The misalignment gets worse towards the right side of the screen (cumulative drift).
    3. The misalignment changes or worsens at non-100% zoom levels (e.g., 50%, 75%).
  </symptoms>

  <task>
    Create a detailed report at exactly: `.scenoo-brain/reports/0430/0501_0445_report-helios-ruler-alignment.md`

    The report MUST address these 3 pillars of failure:

    **Pillar 1: The Box-Model & Border-Collapse Discrepancy**
    - Analyze the difference between a `<table>` using `border-collapse: collapse` and a `<div>` flex container using `border-r`.
    - In a collapsed table, borders overlap (shared 1px). In a flex row, borders add up. 17 columns * 1px = 17px of drift.
    - Propose a CSS solution for the rulers to perfectly match collapsed table math (e.g., negative margins `ml-[-1px]`, or changing `box-sizing`, or recreating rulers as `<table>` elements).

    **Pillar 2: Sub-pixel Rounding vs GPU Matrix Scaling**
    - The table is scaled via GPU `transform: scale(zoom / 100)` which preserves floating-point precision perfectly.
    - The rulers are scaled via JS injected inline styles: `width: colWidth * (zoom / 100)`. Browsers often round inline `width` to the nearest physical pixel, causing sub-pixel cumulative drift across 17 columns.
    - Propose an architectural fix: Should the rulers ALSO be wrapped in a `transform: scale()` container instead of using JS multiplication for their individual cell dimensions? (Note: We extracted them to avoid `position: sticky` bugs, but we can still scale their wrappers if we handle the sync-scroll matrix properly).

    **Pillar 3: The 40px Offset Alignment**
    - The Top Ruler has a 40px corner block. The Left Ruler is 40px wide. 
    - Ensure the math in `syncRulers` and the flex layout completely accounts for these fixed offsets when translating coordinates.

    Conclude the report with a strict, step-by-step action plan to fix `page.tsx`.
  </task>

  <constraints>
    - Output ONLY the markdown content for the report.
    - Do not write any code modifications outside the report.
  </constraints>
</system_prompt>
</file>

<file path="0430_2209_helios-ruler-table-rewrite.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect resolving sub-pixel cumulative drift and box-model alignment errors in the Decoupled Rulers system.
    CRITICAL: You must use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute Helios Alignment Fix: Convert Rulers to Collapsed Tables with GPU Scale Wrappers.

    **Modify `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**

    **Step 1: Replace Top Ruler Structure**
    - Locate the `<div ref={topRulerRef}...>` block.
    - Replace the entire `topRulerRef` container with this new Table-based structure. Notice we wrap the table in a GPU `scale()` and remove JS zoom multipliers from cell widths, matching the main table's behavior:
      ```tsx
      <div ref={topRulerRef} className="will-change-transform h-full w-max">
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: '0 0', height: '100%' }}>
          <table style={{ tableLayout: 'fixed', borderCollapse: 'collapse', height: '100%', margin: 0, padding: 0 }}>
            <colgroup>
              {LETTERS.map((_, i) => (
                <col key={i} style={{ width: colWidths[i] || 120, minWidth: colWidths[i] || 120 }} />
              ))}
            </colgroup>
            <tbody>
              <tr style={{ height: '100%' }}>
                {LETTERS.map((letter, i) => {
                  const isFrozen = i < freezeCols;
                  return (
                    <th
                      key={letter}
                      className={`relative border-r border-outline-variant text-[10px] font-normal text-on-surface-variant p-0 m-0 align-middle ${isFrozen ? 'z-50 bg-surface-container-low shadow-[2px_0_4px_rgba(0,0,0,0.05)]' : ''}`}
                      style={{
                        transform: isFrozen ? `translateX(calc(var(--scroll-x, 0px) / var(--zoom-factor, 1)))` : 'none'
                      }}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        {letter}
                      </div>
                      <div
                        onMouseDown={(e) => startResize(e, 'col', i)}
                        className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-primary z-50 select-none"
                      />
                    </th>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      ```

    **Step 2: Replace Left Ruler Structure**
    - Locate the `<div ref={leftRulerRef}...>` block.
    - Replace it entirely with this Table-based structure. We use `scale()` and remove JS zoom multipliers from the row heights, dividing the freeze `translateY` by `--zoom-factor` to align with the scaled coordinate space:
      ```tsx
      <div ref={leftRulerRef} className="will-change-transform w-full h-max">
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: '0 0', width: '100%' }}>
          <table style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: '100%', margin: 0, padding: 0 }}>
            <tbody>
              {/* Spacer 1 - Doc Header */}
              <tr style={{ height: rowHeights[1] || 41 }}>
                <th className="relative border-b border-outline-variant p-0 m-0 z-50 bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]" style={{ transform: 'translateY(calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))' }}>
                  <div onMouseDown={(e) => startResize(e, 'row', 1)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
                </th>
              </tr>
              {/* Spacer 2 - Data Header */}
              <tr style={{ height: rowHeights[2] || 41 }}>
                <th className="relative border-b border-outline-variant p-0 m-0 z-50 bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]" style={{ transform: 'translateY(calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))' }}>
                  <div onMouseDown={(e) => startResize(e, 'row', 2)} className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none" />
                </th>
              </tr>
              {/* Data Row Counters */}
              {Array.from({ length: 12 }).map((_, i) => {
                const rowIndex = i + 3;
                const isFrozen = i < freezeRows;
                return (
                  <tr key={i} style={{ height: rowHeights[rowIndex] || 41 }}>
                    <th className={`relative border-b border-outline-variant text-[10px] font-normal text-on-surface-variant p-0 m-0 align-middle ${isFrozen ? 'z-50 bg-surface-container-low shadow-[0_2px_4px_rgba(0,0,0,0.05)]' : ''}`} style={{ transform: isFrozen ? `translateY(calc(var(--scroll-y, 0px) / var(--zoom-factor, 1)))` : 'none' }}>
                      <div className="flex items-center justify-center w-full h-full">
                        {rowIndex}
                      </div>
                      <div
                        onMouseDown={(e) => startResize(e, 'row', rowIndex)}
                        className="absolute bottom-0 left-0 right-0 h-[5px] cursor-row-resize hover:bg-primary z-50 select-none"
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      ```
  </task>

  <constraints>
    - Ensure targeted replacements ONLY. Do not rewrite or output unchanged sections of `page.tsx`.
    - Double check that `topRulerRef` and `leftRulerRef` remain on the outermost div of their respective blocks, as `syncRulers` translates these elements in screen-space.
  </constraints>
</system_prompt>
</file>

<file path="0430_2250_breakdown-share-modal.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to wire the existing "Share" button in the Breakdown Sidebar to the `ShareScriptModal`.
    CRITICAL: You must use TARGETED REPLACEMENTS. Do NOT output the entire file to avoid IDE truncation.
  </role>

  <task>
    Execute Hotfix: Inject Share Modal into BreakdownSidebar.

    **Step 1: Inject State, Imports, and Mock Data**
    - File: `components/breakdown/BreakdownSidebar.tsx`
    - Add `useState` to the React import.
    - Import `ShareScriptModal` and `ScriptVersion`.
    - Inject `isShareModalOpen` state and `MOCK_SCRIPT` data.
    
    Locate the imports and interface at the top:
    ```tsx
    import { useParams, useRouter } from 'next/navigation';
    import type { TaggedElement } from '@/types/breakdown';
    import { TAG_CATEGORIES } from '@/types/breakdown';
    import CategoryGroup from './CategoryGroup';

    interface Props {
    ```
    Replace with:
    ```tsx
    import { useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import type { TaggedElement } from '@/types/breakdown';
    import { TAG_CATEGORIES } from '@/types/breakdown';
    import CategoryGroup from './CategoryGroup';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';

    interface Props {
    ```

    Locate the component initialization:
    ```tsx
    export default function BreakdownSidebar({
      activeSceneId,
      taggedElements,
      onRemoveTag,
      onUpdateQuantity,
      productionNote,
      onProductionNoteChange,
      isOpen,
      onToggle,
    }: Props) {
      const router = useRouter();
      const params = useParams();

      return (
        <div className="relative h-full shrink-0">
          <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-0 border-l-0 overflow-hidden'}`}>
    ```
    Replace with:
    ```tsx
    export default function BreakdownSidebar({
      activeSceneId,
      taggedElements,
      onRemoveTag,
      onUpdateQuantity,
      productionNote,
      onProductionNoteChange,
      isOpen,
      onToggle,
    }: Props) {
      const router = useRouter();
      const params = useParams();
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);

      // Mock script for UI phase
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
          <ShareScriptModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            script={MOCK_SCRIPT}
            canManage={true}
          />
          <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-0 border-l-0 overflow-hidden'}`}>
    ```

    **Step 2: Wire the Share Button onClick**
    Locate the Share button inside the Action buttons `div` in the same file:
    ```tsx
            <button className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              Share
            </button>
    ```
    Replace with:
    ```tsx
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              Share
            </button>
    ```
  </task>

  <constraints>
    - Provide ONLY the specific code snippets required for replacement.
    - Do not output the whole file.
  </constraints>
</system_prompt>
</file>

<file path="0430_2257_linescript-shotlist-sidebar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to populate the existing empty `LineScriptRightSidebar.tsx` with the Shot Details form fields per the product specification.
  </role>

  <task>
    Execute Sub-task: Populate LineScriptRightSidebar with Shotlist details.

    **Step 1: Overwrite `components/linescript/LineScriptRightSidebar.tsx`**
    - Create the static UI form for the 8 required fields: Shot #, Shot Size, Shot Type, Angle, Movement, Lens, Description, Note.
    - Change the expanded width from `w-72` to `w-80` to ensure comfortable form viewing.
    - Ensure all dropdowns (`<select>`) have custom chevron icons (`expand_more`) and are styled consistently with the design tokens.
    - Use full replacement for this file since it is small.

    File content to use:
    ```tsx
    'use client';

    interface Props {
      isOpen: boolean;
      onToggle: () => void;
    }

    const SHOT_SIZE_OPTIONS = ['EWS', 'WS', 'FS', 'MFS', 'MS', 'MCU', 'CU', 'ECU', 'Random', 'Custom'];
    const SHOT_TYPE_OPTIONS = ['Observe', 'Single', 'Two', 'Three', 'Four', 'Group', 'OTS', 'POV', 'Insert', 'B-roll', 'Custom'];
    const ANGLE_OPTIONS = ['Eye Level', 'Low Angle', 'High Angle', 'Bird Eye', 'Custom'];
    const MOVEMENT_OPTIONS = ['Static', 'Pan', 'Tilt', 'Dolly', 'Handheld', 'Custom'];

    export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
      return (
        <div className="relative h-full shrink-0">
          <aside
            className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`}
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-outline-variant shrink-0">
              <span className="text-h3 text-on-surface">Shot Details</span>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
              {/* Shot # */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot #</label>
                <input type="text" defaultValue="1" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>

              {/* Shot Size */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Size</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none">
                    {SHOT_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Shot Type */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Type</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none">
                    {SHOT_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Angle */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Angle</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none">
                    {ANGLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Movement */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Movement</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none">
                    {MOVEMENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Lens */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Lens</label>
                <input type="text" placeholder="e.g. 35mm" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Description</label>
                <textarea rows={3} placeholder="Shot description..." className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
              </div>

              {/* Note */}
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Note</label>
                <textarea rows={2} placeholder="Additional notes..." className="w-full px-3 py-2 bg-[#F9FAFB] border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
              </div>
            </div>
          </aside>

          {/* Floating Toggle Button */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-full bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l-lg p-1 cursor-pointer z-50 text-secondary hover:text-primary shadow-sm flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">{isOpen ? 'right_panel_close' : 'right_panel_open'}</span>
          </button>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output the fully updated code for `LineScriptRightSidebar.tsx`.
    - Do not modify other files.
  </constraints>
</system_prompt>
</file>

<file path="0430_2314_linescript-sidebar-header.md">
<system_prompt>
  <role>
    you are a senior frontend architect. your task is to update the header of `linescriptrightsidebar.tsx` by replacing the text title with export and share buttons, and wiring up the share modal.
    critical: you must use targeted replacements. do not output the entire file.
  </role>

  <task>
    execute ui update: replace sidebar header with action buttons.

    **step 1: update imports**
    - file: `components/linescript/LineScriptRightSidebar.tsx`
    - locate the top of the file:
      ```tsx
      'use client';

      interface Props {
      ```
    - replace it with:
      ```tsx
      'use client';

      import { useState } from 'react';
      import { useParams } from 'next/navigation';
      import ShareScriptModal from '@/components/projects/ShareScriptModal';
      import type { ScriptVersion } from '@/types/project';

      interface Props {
      ```

    **step 2: replace component initialization and header**
    - locate this exact block:
      ```tsx
      export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
        return (
          <div className="relative h-full shrink-0">
            <aside
              className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`}
            >
              {/* Header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-outline-variant shrink-0">
                <span className="text-h3 text-on-surface">Shot Details</span>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
      ```
    - replace it completely with:
      ```tsx
      export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
        const params = useParams();
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
            <ShareScriptModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              script={MOCK_SCRIPT}
              canManage={true}
            />
            <aside
              className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`}
            >
              {/* Action Buttons */}
              <div className="py-3 px-4 border-b border-outline-variant shrink-0">
                <div className="flex gap-2 w-full">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                  </button>
                  <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    Share
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
      ```
  </task>

  <constraints>
    - provide only the specific code snippets required for replacement.
    - do not modify the 8 form fields in the body section.
  </constraints>
</system_prompt>
</file>

</files>
