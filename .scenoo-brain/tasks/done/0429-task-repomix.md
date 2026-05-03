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
0429_0005_sync-export-ui-with-templates.md
0429_0048_hide-workspace-header-in-export.md
0429_0059_add-single-header-and-freeze.md
0429_0101_fix-single-scene-header.md
0429_0116_fix-all-scenes-header.md
0429_0118_restore-single-scene-header.md
0429_0126_fix-all-scenes-header-merge.md
0429_0145_fix-all-scenes-header-merge.md
0429_0205_native-sheet-frame.md
0429_0236_native-spreadsheet-fix.md
0429_0242_text-wrap-table.md
0429_1522_textarea-resize.md
0429_1533_all-scenes-color-tags.md
0429_1537_fix-all-scenes-color-tags.md
0429_1551_spreadsheet-selection-logic.md
0429_1606_bounding-box-selection.md
0429_1613_virtual-grid-single-scene.md
0429_1618_auto-blur-edit-mode.md
0429_1627_context-driven-blur.md
0429_1633_table-resizer-handles.md
0429_1638_persist-table-dimensions.md
0429_1642_table-autofit-dimensions.md
0429_1705_advanced-spreadsheet-editing.md
0429_1727_virtual-popout-editor.md
0429_1753_helios-export-report.md
0429_1814_helios-export-deep-audit.md
0429_1822_helios-rewrite-export-dom.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0429_0005_sync-export-ui-with-templates.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to perfectly replicate the UI of the provided printable templates into React components.
  </role>

  <task>
    Execute Sub-task: Sync Export Preview UI strictly with the provided PDF and CSV templates.

    1. **READ AND ANALYZE TARGET FILES**:
       - `script-breakdown-single-scene.pdf` and `script-breakdown-single-scene.csv`
       - `script-breakdown-all-scene.pdf` and `script-breakdown-all-scene.csv`
       - Observe the exact layout, typography, borders, and column/field structures. Do NOT invent web-style UI (like large rounded corners, floating boxes, or wide gaps). Treat these as strict Printable Documents.

    2. **REBUILD `components/breakdown/ExportPreviewSingle.tsx` (Single Scene)**:
       - **Wrapper**: Fixed A4 web dimensions (`w-[794px] min-h-[1123px]`), white background, sharp corners, hard shadow `shadow-[4px_4px_0_#bbb]`, thin `border-outline-variant`.
       - **Header**: 3 columns (Left: "SCRIPT BREAKDOWN", Center: "PROJECT TITLE", Right: "LOGO" box).
       - **Meta Data**: Row-based layout (no gaps), separated by thin dashed or solid bottom borders. Fields: Scene #, INT/EXT, D / N, Script Page, Location Name, Description.
       - **Category Grid**: Continuous grid (NO `gap`), separated by `border-r` and `border-b`. 
       - **Category Tags**: Small `inline-block` label at the top-left of each grid cell. 
         - Colors MUST match the exact hex codes from the PDF (e.g., CAST is red, PROPS is purple, etc.). Use inline `style={{ backgroundColor: bg, color: text, border: border }}`.
       - **Inputs**: All user-editable areas must be `<input>` or `<textarea>` with transparent backgrounds, `outline-none`, and `resize-none`. Use `font-mono` strictly for Labels and inherited `fontFamily` for input values.

    3. **REBUILD `components/breakdown/ExportPreviewTable.tsx` (All Scenes)**:
       - **Wrapper**: `overflow-auto w-full`.
       - **Table**: Standard `<table>` with `border-collapse border border-outline-variant`.
       - **Columns**: MUST strictly match the 17 columns from `script-breakdown-all-scene.csv` (SCENE, I/E, D/N, Script Page, LOCATION NAME, DESCRIPTION, CAST, EXTRA, PROPS, SET DRESSING, WARDROBE, MAKEUP/HAIR, VEHICLE / ANIMALS, SPECIAL EFFECTS, SOUND EFFECTS & MUSIC, SPECIAL EQUIPMENT, PRODUCTION NOTE).
       - **Cells**: Thin borders, tight padding (`p-1` or `p-2`). Header (`<th>`) is `font-mono text-[10px] uppercase font-bold`. Body cells contain `<input type="text">` or `<textarea>`.

    4. **REMOVE WATERMARK**:
       - Do NOT include the "MAED BY Scenoo" or "MADE BY Scenoo" text anywhere in either component.
  </task>

  <constraints>
    - Output the full, complete code for BOTH `components/breakdown/ExportPreviewSingle.tsx` and `components/breakdown/ExportPreviewTable.tsx`.
    - Do not use Tailwind `gap` in the Single Scene category grid; use borders to separate cells.
  </constraints>
</system_prompt>
</file>

<file path="0429_0048_hide-workspace-header-in-export.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to conditionally hide the global Workspace Header when the user is on the Breakdown Export Preview page, in order to maximize screen real estate for the document editor.
  </role>

  <task>
    Execute Sub-task: Hide WorkspaceHeader on /export routes.

    1. **MODIFY `components/layout/WorkspaceHeader.tsx`**:
       - Import `usePathname` from `next/navigation` (add it next to the existing `useParams` import).
       - Inside the component, initialize the hook: `const pathname = usePathname();`
       - Add a guard clause immediately after the hook initializations:
         `if (pathname?.includes('/export')) return null;`
  </task>

  <constraints>
    - Output the exact targeted replacements or the full updated code for `WorkspaceHeader.tsx`.
    - Do not modify any other routing or tab logic in this file.
  </constraints>
</system_prompt>
</file>

<file path="0429_0059_add-single-header-and-freeze.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to complete the header layout for the Single Scene Export Preview based on the provided PDF template, and implement a Google Sheets-like Freeze Row/Column feature for the All Scenes table.
  </role>

  <task>
    Execute Sub-task: Single Scene Header & Table Freeze View.

    1. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Locate the "Header Section" inside the A4 wrapper.
       - Rebuild it as a 2-row, 3-column grid layout strictly matching the PDF template without gaps (use thin borders).
       - **Row 1:** 
         - Left: Text "SCRIPT BREAKDOWN" (font-mono, text-[11px], bold).
         - Center: `<input placeholder="PROJECT TITLE">` (font-sans, bold, text-center, w-full, no border).
         - Right: A box containing "BRANDING LOGO" (font-mono, text-center, border-l).
       - **Row 2:**
         - Left: Empty `<div>`.
         - Center: `<input placeholder="OPTIONAL TEXT">` (font-sans, text-center, w-full, border-t).
         - Right: `<input placeholder="OPTIONAL TEXT">` (font-sans, text-center, w-full, border-t, border-l).
       - Apply the `fontFamily` prop dynamically to all `<input>` elements. Ensure the borders are `border-outline-variant` to match the printable document style.

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Add state: `const [freezeCols, setFreezeCols] = useState(1);`
       - Add state: `const [freezeRows, setFreezeRows] = useState(1);`
       - In the Top Action Bar toolbar, add two new Select dropdowns just before the existing Font Select:
         - **Freeze Columns:** Icon `view_column`, `<select>` options: 0, 1, 2, 3.
         - **Freeze Rows:** Icon `table_rows`, `<select>` options: 1, 2, 3.
       - Pass these values to the table: `<ExportPreviewTable fontFamily={fontFamily} freezeCols={freezeCols} freezeRows={freezeRows} />`

    3. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Update Props: `interface Props { fontFamily?: string; freezeCols?: number; freezeRows?: number; }`
       - Destructure defaults: `freezeCols = 1, freezeRows = 1`.
       - **Sticky Header (<thead>)**:
         - Keep `sticky top-0 bg-surface-container-low`.
         - For each `<th>`, if its index `< freezeCols`, apply inline style: `{ position: 'sticky', left: colIndex * 120, zIndex: 30 }`. Otherwise, `zIndex: 20`.
       - **Sticky Body (<tbody>)**:
         - For each `<tr>`, determine if it's frozen: `const isRowFrozen = rowIndex < (freezeRows - 1);`
         - Row `top` coordinate for frozen body rows: `top: (rowIndex + 1) * 41` (assuming 41px height per row).
         - For each `<td>`, determine if it's frozen: `const isColFrozen = colIndex < freezeCols;`
         - Apply inline style to `<td>`:
           `position: isRowFrozen || isColFrozen ? 'sticky' : 'relative',`
           `top: isRowFrozen ? (rowIndex + 1) * 41 : undefined,`
           `left: isColFrozen ? colIndex * 120 : undefined,`
           `zIndex: (isRowFrozen && isColFrozen) ? 20 : (isRowFrozen || isColFrozen) ? 10 : 1,`
           `backgroundColor: (isRowFrozen || isColFrozen) ? '#ffffff' : 'transparent'`
         - *Note: Make sure the `<input>` fields inside the cells still take up the full width and height with transparent backgrounds.*
  </task>

  <constraints>
    - Output the complete code for `ExportPreviewSingle.tsx` and `ExportPreviewTable.tsx`, and the targeted updates for `page.tsx`.
    - Ensure `min-w-[120px]` and `max-w-[120px]` are strictly applied to the table cells so the `left` calculation (`colIndex * 120`) perfectly aligns.
  </constraints>
</system_prompt>
</file>

<file path="0429_0101_fix-single-scene-header.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to accurately implement the static Header Section of the Single Scene Breakdown Export Preview to match the printable document format.
  </role>

  <task>
    Execute Sub-task: Rebuild the Header Section in `ExportPreviewSingle.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Locate the top Header Section inside the A4 wrapper (the area above the Meta Rows Container).
       - Replace the existing Header Section with this exact HTML/Tailwind structure to ensure a seamless grid without gaps:

       ```tsx
       {/* Header Section */}
       <div className="grid grid-cols-3 border border-outline-variant mb-6">
         {/* Row 1 */}
         <div className="border-b border-r border-outline-variant p-3 flex items-center">
           <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">
             SCRIPT BREAKDOWN
           </span>
         </div>
         <div className="border-b border-r border-outline-variant p-3 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="PROJECT TITLE"
             className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="border-b border-outline-variant p-3 flex flex-col items-center justify-center text-outline">
           <span className="font-mono text-[10px] uppercase tracking-widest">BRANDING</span>
           <span className="font-mono text-[10px] uppercase tracking-widest">LOGO</span>
         </div>

         {/* Row 2 */}
         <div className="border-r border-outline-variant p-2"></div>
         <div className="border-r border-outline-variant p-2 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="p-2 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
       </div>
       ```
  </task>
  <constraints>
    - Output ONLY the updated Header block or the full `ExportPreviewSingle.tsx` code.
    - Do not alter the Meta Data rows or the Category Grid below it.
  </constraints>
</system_prompt>
</file>

<file path="0429_0116_fix-all-scenes-header.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to add the missing Document Header to the "All Scenes" Export Preview table to strictly match the provided CSV/PDF templates.
  </role>

  <task>
    Execute Sub-task: Add Document Header to `ExportPreviewTable.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the inner scrollable document wrapper: `<div className="w-full overflow-auto bg-white border border-outline-variant shadow-[4px_4px_0_#bbb] custom-scrollbar">`
       - Just INSIDE this wrapper, directly BEFORE the `<table>` element, insert the following Header block to perfectly match the Printable Document spec:

       ```tsx
       {/* Document Header */}
       <div className="w-max min-w-full grid grid-cols-5 border-b border-outline-variant bg-surface-container-lowest">
         <div className="p-3 border-r border-outline-variant flex items-center">
           <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">
             SCRIPT BREAKDOWN
           </span>
         </div>
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="PROJECT TITLE"
             className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="p-3 flex flex-col items-center justify-center text-outline">
           <span className="font-mono text-[10px] uppercase tracking-widest">BRANDING</span>
           <span className="font-mono text-[10px] uppercase tracking-widest">LOGO</span>
         </div>
       </div>
       ```
    2. **STRICT RULE**: Do NOT modify the existing Google Sheets-like Freeze row/column `sticky` logic inside the `<table>`, `<thead>`, or `<tbody>`. Simply prepend the block above.
  </task>

  <constraints>
    - Output the fully updated `ExportPreviewTable.tsx` code.
  </constraints>
</system_prompt>
</file>

<file path="0429_0118_restore-single-scene-header.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to restore the correct static Header Section for the Single Scene Breakdown Export Preview based on the original PDF template.
  </role>

  <task>
    Execute Sub-task: Restore the 2-row Header Section in `ExportPreviewSingle.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Locate the top Header Section inside the A4 wrapper (above the Meta Rows Container).
       - Completely replace whatever header is currently there with this exact 2-row, 3-column HTML/Tailwind structure to ensure a seamless grid without gaps:

       ```tsx
       {/* Header Section */}
       <div className="grid grid-cols-3 border border-outline-variant mb-6">
         {/* Row 1 */}
         <div className="border-b border-r border-outline-variant p-3 flex items-center">
           <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">
             SCRIPT BREAKDOWN
           </span>
         </div>
         <div className="border-b border-r border-outline-variant p-3 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="PROJECT TITLE"
             className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="border-b border-outline-variant p-3 flex flex-col items-center justify-center text-outline">
           <span className="font-mono text-[10px] uppercase tracking-widest">BRANDING</span>
           <span className="font-mono text-[10px] uppercase tracking-widest">LOGO</span>
         </div>

         {/* Row 2 */}
         <div className="border-r border-outline-variant p-2"></div>
         <div className="border-r border-outline-variant p-2 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
         <div className="p-2 flex items-center justify-center bg-surface-container-lowest">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>
       </div>
       ```
  </task>
  <constraints>
    - Output ONLY the updated Header block or the full `ExportPreviewSingle.tsx` code.
    - Do not alter the Meta Data rows or the Category Grid below it.
  </constraints>
</system_prompt>
</file>

<file path="0429_0126_fix-all-scenes-header-merge.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to correct the Document Header merging alignment in the "All Scenes" Export Preview table to perfectly match the 17-column CSV structure.
  </role>

  <task>
    Execute Sub-task: Fix Document Header Alignment in `ExportPreviewTable.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the `{/* Document Header */}` block that was added previously.
       - Replace it with this exact mathematically-measured grid layout. Since the table below has 17 columns of 120px each, this header must span exactly `2040px` and precisely align its 6 cells to match the CSV column spans (1 + 3 + 6 + 3 + 3 + 1 = 17 cols).

       ```tsx
       {/* Document Header (17 Columns Total) */}
       <div
         className="grid border-b border-outline-variant bg-surface-container-lowest"
         style={{
           width: '2040px',
           gridTemplateColumns: '120px 360px 720px 360px 360px 120px'
         }}
       >
         {/* Col 1: Empty (Above SCENE) */}
         <div className="border-r border-outline-variant"></div>

         {/* Col 2-4: SCRIPT BREAKDOWN */}
         <div className="p-3 border-r border-outline-variant flex items-center">
           <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">
             SCRIPT BREAKDOWN
           </span>
         </div>

         {/* Col 5-10: PROJECT TITLE */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="PROJECT TITLE"
             className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 11-13: OPTIONAL TEXT 1 */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 14-16: OPTIONAL TEXT 2 */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 17: BRANDING LOGO */}
         <div className="p-3 flex flex-col items-center justify-center text-outline">
           <span className="font-mono text-[10px] uppercase tracking-widest">BRANDING</span>
           <span className="font-mono text-[10px] uppercase tracking-widest">LOGO</span>
         </div>
       </div>
       ```

    2. **ENFORCE STRICT TABLE WIDTH**:
       - Ensure the `<table>` element directly below this header has an exact width of `2040px` and `table-layout: fixed` so the columns don't stretch unpredictably based on content length.
       - Update the table tag to: `<table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '2040px' }}>`
       - Ensure the `<th>` and `<td>` elements retain their width constraints (`w-[120px] min-w-[120px] max-w-[120px]`).
  </task>

  <constraints>
    - Output ONLY the updated sections or the full `ExportPreviewTable.tsx` code.
    - Do not break the existing Google Sheets-like Freeze row/column `sticky` logic.
  </constraints>
</system_prompt>
</file>

<file path="0429_0145_fix-all-scenes-header-merge.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to correct the Document Header merging alignment in the "All Scenes" Export Preview table to perfectly match the 17-column structure, eliminating the offset caused by the hidden spreadsheet column.
  </role>

  <task>
    Execute Sub-task: Fix Document Header Alignment in `ExportPreviewTable.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the `{/* Document Header */}` block.
       - Replace it entirely with this exact 5-cell grid layout. Since the table has exactly 17 data columns at 120px each, this header spans `2040px` and perfectly maps the 3-6-3-3-2 column merge ratio.

       ```tsx
       {/* Document Header (17 Columns Total = 2040px) */}
       <div
         className="grid border-b border-outline-variant bg-surface-container-lowest"
         style={{
           width: '2040px',
           gridTemplateColumns: '360px 720px 360px 360px 240px'
         }}
       >
         {/* Col 1-3 (360px): SCRIPT BREAKDOWN */}
         <div className="p-3 border-r border-outline-variant flex items-center">
           <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">
             SCRIPT BREAKDOWN
           </span>
         </div>

         {/* Col 4-9 (720px): PROJECT TITLE */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="PROJECT TITLE"
             className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 10-12 (360px): OPTIONAL TEXT 1 */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 13-15 (360px): OPTIONAL TEXT 2 */}
         <div className="p-3 border-r border-outline-variant flex items-center justify-center">
           <input
             type="text"
             placeholder="OPTIONAL TEXT"
             className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`}
           />
         </div>

         {/* Col 16-17 (240px): BRANDING LOGO */}
         <div className="p-3 flex flex-col items-center justify-center text-outline">
           <span className="font-mono text-[10px] uppercase tracking-widest">BRANDING</span>
           <span className="font-mono text-[10px] uppercase tracking-widest">LOGO</span>
         </div>
       </div>
       ```

    2. **ENFORCE STRICT TABLE WIDTH**:
       - Ensure the `<table>` element directly below this header has an exact width of `2040px` and `table-layout: fixed`. This prevents columns from dynamically resizing based on content and breaking the alignment.
       - Update the table tag to: `<table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '2040px' }} className="min-w-[2040px]">`
  </task>

  <constraints>
    - Output ONLY the updated sections or the full `ExportPreviewTable.tsx` code.
    - Do NOT alter the existing Google Sheets-like Freeze row/column `sticky` inline styles.
  </constraints>
</system_prompt>
</file>

<file path="0429_0205_native-sheet-frame.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to refactor the "All Scenes" Export Preview into a native spreadsheet layout (with A-Q column letters and 1-N row numbers), integrating the Document Header using native table `colSpan`, and fixing a severe z-index clipping issue on the Freeze tools menu.
  </role>

  <task>
    Execute Sub-task: Native Spreadsheet Frame & Z-Index Fix.

    1. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Locate the `isFreezeMenuOpen` toggle wrapper inside the Rich-text Toolbar.
       - **Fix Layering**: Ensure the parent wrapper has high z-index.
         Update the wrapper to: `<div className="relative z-">`
       - Update the dropdown container to float properly:
         `<div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-2xl rounded-md p-3 w-48 flex flex-col gap-3">`

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - **Remove Safe Zone**: The outermost div should just be:
         `<div className="w-full h-full overflow-auto bg-surface-container-lowest custom-scrollbar">`
       - **Update Table Base**:
         `<table className="w-max min-w-full border-collapse" style={{ tableLayout: 'fixed', width: '2080px' }}>`
       - **Setup Constants**:
         `const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];`
       - **Rebuild `<thead>` (Row 0 - Letters)**:
         ```tsx
         <thead className="z-50">
           <tr className="h-[24px]">
             {/* Corner Cell */}
             <th className="sticky top-0 left-0 z-[1] w-[40px] bg-surface-container-low border border-outline-variant"></th>
             {/* Column Letters */}
             {LETTERS.map((letter, i) => (
               <th key={letter} className="sticky top-0 z-[2] bg-surface-container-low border border-outline-variant text-[10px] font-normal text-on-surface-variant text-center" style={{ left: i < freezeCols ? 40 + i * 120 : undefined }}>
                 {letter}
               </th>
             ))}
           </tr>
         </thead>
         ```
       - **Rebuild `<tbody>`**:
         - **Row 1: Document Header (Merged Cells)**
           ```tsx
           <tr className="h-[60px] bg-surface-container-lowest">
             <td className="sticky left-0 z-[3] bg-surface-container-low border border-outline-variant text-center text-[10px] font-normal text-on-surface-variant">1</td>
             <td colSpan={3} className="p-3 border border-outline-variant">
               <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-outline">SCRIPT BREAKDOWN</span>
             </td>
             <td colSpan={6} className="p-3 border border-outline-variant text-center">
               <input type="text" placeholder="PROJECT TITLE" className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
             </td>
             <td colSpan={3} className="p-3 border border-outline-variant text-center">
               <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
             </td>
             <td colSpan={3} className="p-3 border border-outline-variant text-center">
               <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
             </td>
             <td colSpan={2} className="p-3 border border-outline-variant text-center flex flex-col items-center justify-center h-full">
               <span className="font-mono text-[10px] uppercase tracking-widest text-outline">BRANDING</span>
               <span className="font-mono text-[10px] uppercase tracking-widest text-outline">LOGO</span>
             </td>
           </tr>
           ```
         - **Row 2: Data Headers (SCENE, I/E, etc.)**
           ```tsx
           <tr className="h-[41px]">
             <td className="sticky left-0 z-[3] bg-surface-container-low border border-outline-variant text-center text-[10px] font-normal text-on-surface-variant">2</td>
             {COLUMNS.map((col, i) => (
               <td key={col} className="bg-surface-container-low border border-outline-variant px-3 py-2 text-left text-[10px] font-bold text-on-surface-variant whitespace-nowrap uppercase" style={{ position: i < freezeCols ? 'sticky' : 'relative', left: i < freezeCols ? 40 + i * 120 : undefined, zIndex: i < freezeCols ? 30 : 10 }}>
                 {col}
               </td>
             ))}
           </tr>
           ```
         - **Row 3+: Mock Data Rows**
           ```tsx
           {MOCK_DATA.map((row, rowIndex) => (
             <tr key={rowIndex} className="h-[41px]">
               <td className="sticky left-0 z-[3] bg-surface-container-low border border-outline-variant text-center text-[10px] font-normal text-on-surface-variant">
                 {rowIndex + 3}
               </td>
               {COLUMNS.map((col, colIndex) => (
                 <td key={col} className="border border-outline-variant p-0 min-w-[120px] max-w-[120px]" style={{ position: colIndex < freezeCols ? 'sticky' : 'relative', left: colIndex < freezeCols ? 40 + colIndex * 120 : undefined, zIndex: colIndex < freezeCols ? 30 : 10, backgroundColor: colIndex < freezeCols ? '#ffffff' : 'transparent' }}>
                   <input type="text" defaultValue={row[col] ?? ''} className={`w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:bg-primary/5 bg-transparent text-body-md text-on-surface transition-all ${fontFamily}`} />
                 </td>
               ))}
             </tr>
           ))}
           ```
  </task>

  <constraints>
    - Ensure the absolute popover in `page.tsx` uses `z-`.
    - Ensure the `colSpan` values perfectly add up to 17.
    - Output the complete, updated code for BOTH files.
  </constraints>
</system_prompt>
</file>

<file path="0429_0236_native-spreadsheet-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the exact architectural fixes outlined in the recent Export Module audit report. You will resolve the z-index and overflow clipping issues organically without hacky DOM wrappers, and refactor the table into a native semantic spreadsheet.
  </role>

  <task>
    Execute Sub-task: Native Spreadsheet Refactor & Stacking Context Fix.

    1. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - **Fix B2 (Overflow clipping):** Locate the Top Action Bar wrapper (the `div` holding the Zoom, Font, Format, and Freeze tools). Remove the `overflow-x-auto` class so it no longer clips absolute positioned children.
       - **Fix B1 (Transform Stacking Context):** Add `relative z-50` to the Top Action Bar wrapper so it explicitly forms a high-level stacking context.
       - **Fix B1 (Transform Stacking Context):** Locate the center content wrapper that applies the zoom (the `div` with `style={{ transform: scale(...) }}`). Add `position: 'relative', zIndex: 10` to its inline `style` object. This forces the transform context to stay below the toolbar's `z-50`.

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - **Remove Fake Grid Headers:** Strip out the outer `div` grid that was simulating the Document Header. Everything must be native `<tr>` and `<th>`/`<td>` inside the `<table>`.
       - **Table Setup:** `<table className="w-max min-w-full border-collapse bg-white" style={{ tableLayout: 'fixed', width: '2080px' }}>`
       - **Rebuild `<thead>` (Max Z-Index: 30)**:
         - Wrap the entire head in `<thead className="sticky top-0 z-30">` (Fixes B4).
         - **Row 0 (Letters A-Q):** Start with an empty corner `<th>` (`w-[40px] sticky left-0 z-30`). Map `LETTERS`, applying `sticky left` logic matching `freezeCols` with `z-20` (frozen) or `z-10` (unfrozen).
         - **Row 1 (Document Header):** Native `colSpan` integration!
           - Corner `<th>1</th>` (sticky left-0 z-20).
           - SCRIPT BREAKDOWN: `<th colSpan={3}>...</th>`
           - PROJECT TITLE: `<th colSpan={6}>...</th>`
           - OPTIONAL TEXT 1: `<th colSpan={3}>...</th>`
           - OPTIONAL TEXT 2: `<th colSpan={3}>...</th>`
           - BRANDING LOGO: `<th colSpan={2}>...</th>`
         - **Row 2 (Data Headers):** Corner `<th>2</th>` (sticky left-0 z-20). Map `COLUMNS` (SCENE, I/E...), applying `sticky left` logic matching `freezeCols` with `z-20`.
       - **Rebuild `<tbody>` (Max Z-Index: 20)**:
         - Row numbers start at 3: `<td className="sticky left-0 z-20 w-[40px] ...">{rowIndex + 3}</td>`.
         - Data cells: apply `sticky left` logic with maximum `z-20`.
  </task>

  <constraints>
    - Output the complete, refactored code for BOTH `page.tsx` and `ExportPreviewTable.tsx`.
    - Do not use arbitrary z-indexes above `50`. The internal table z-index must strictly stay `<= 30`.
  </constraints>
</system_prompt>
</file>

<file path="0429_0242_text-wrap-table.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to enforce automatic text wrapping across the entire "All Scenes" Export Preview table by modifying header classes and replacing single-line inputs with multi-line textareas.
  </role>

  <task>
    Execute Sub-task: Enable Text Wrapping in `ExportPreviewTable.tsx`.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - **Update Headers (`<thead>`)**:
         - Locate the `<th>` elements rendering the `COLUMNS` (SCENE, I/E, etc.).
         - Remove the `whitespace-nowrap` class.
         - Add `whitespace-normal break-words` so long headers wrap naturally.

       - **Update Data Cells (`<tbody>`)**:
         - Locate the `<input type="text">` inside the data cells.
         - Replace the `<input>` element with a `<textarea>` element.
         - Retain all existing styling classes: `w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:bg-primary/5 bg-transparent text-body-md text-on-surface transition-all ${fontFamily}`.
         - Add these new classes to the textarea: `resize-none whitespace-normal break-words overflow-hidden`.
         - Ensure `defaultValue={row[col] ?? ''}` is preserved on the new `<textarea>`.
         - Remove any fixed height classes (like `h-[41px]`) on the `<tr>` elements inside the `<tbody>` so they can dynamically expand their height based on the textarea content.
  </task>

  <constraints>
    - Output ONLY the fully updated `ExportPreviewTable.tsx` code.
    - Ensure the styling mimics the original input perfectly but supports multi-line wrapping.
  </constraints>
</system_prompt>
</file>

<file path="0429_1522_textarea-resize.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to allow users to manually stretch the height of data cells in the Export Preview table, while strictly preventing horizontal stretching to protect the fixed table layout.
  </role>

  <task>
    Execute Sub-task: Enable Vertical Resizing for Table Textareas.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the `<textarea>` element inside the `<tbody>` data cells.
       - Replace the `resize-none` and `overflow-hidden` classes with `resize-y` and `overflow-auto`.
       - The class string should be updated to strictly include `resize-y` (not `resize`).
       - Example classes: `w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:bg-primary/5 bg-transparent text-body-md text-on-surface transition-all resize-y whitespace-normal break-words overflow-auto`
       - IMPORTANT: Never use the generic `resize` class. Dragging horizontally will dynamically expand the `120px` cell width, breaking the 17-column strict table layout and misaligning it with the Document Header's `colSpan` structure.
  </task>

  <constraints>
    - Output ONLY the updated `<tbody>` section or the full `ExportPreviewTable.tsx` code.
    - Ensure no horizontal resizing is possible.
  </constraints>
</system_prompt>
</file>

<file path="0429_1533_all-scenes-color-tags.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to apply industry-standard Breakdown Tag colors to the specific column headers of the "All Scenes" Export Preview spreadsheet.
  </role>

  <task>
    Execute Sub-task: Apply Color Codes to Table Headers.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Create a new constant dictionary `TAG_COLORS` at the top of the file mapping the exact column names to their respective background and text hex colors:
         ```tsx
         const TAG_COLORS: Record<string, { bg: string; text: string }> = {
           'CAST': { bg: '#FFE5E5', text: '#8B0000' },
           'EXTRAS': { bg: '#D6F0D6', text: '#1A5C1A' },
           'PROPS': { bg: '#ECD6FF', text: '#4B0080' },
           'SET DRESSING': { bg: '#E8F5E9', text: '#006400' },
           'WARDROBE': { bg: '#D6F4FF', text: '#003D5C' },
           'MAKEUP/HAIR': { bg: '#FFE8D6', text: '#7A3000' },
           'VEHICLES': { bg: '#FFD6EC', text: '#7A0040' },
           'SFX': { bg: '#CCE5FF', text: '#003D8F' },
           'SOUND': { bg: '#EDD8C8', text: '#4A1F00' },
           'EQUIPMENT': { bg: '#F5ECC8', text: '#5C4000' },
           'NOTES': { bg: '#ECECEC', text: '#333333' }
         };
         ```
       - Locate the `<thead>` section, specifically Row 2 (Data Column Headers) where `COLUMNS.map((col, i) => ...)` is rendered inside the `<tr>`.
       - Update the `<th>` rendering logic to conditionally apply these tag colors via inline styles, while falling back to default Tailwind classes for non-tag columns:

         ```tsx
         {COLUMNS.map((col, i) => {
           const colorConfig = TAG_COLORS[col];
           return (
             <th 
               key={col} 
               className={`border border-outline-variant px-3 py-2 text-left text-[10px] font-bold whitespace-normal break-words ${!colorConfig ? 'bg-surface-container-low text-on-surface-variant' : ''}`}
               style={{ 
                 position: i < freezeCols ? 'sticky' : 'relative', 
                 left: i < freezeCols ? 40 + i * 120 : undefined, 
                 zIndex: i < freezeCols ? 20 : 10,
                 ...(colorConfig ? { backgroundColor: colorConfig.bg, color: colorConfig.text } : {})
               }}
             >
               {col}
             </th>
           );
         })}
         ```
  </task>

  <constraints>
    - Output ONLY the fully updated `ExportPreviewTable.tsx` code.
    - Ensure all previous fixes (text wrapping `whitespace-normal`, `<textarea>` data cells with `resize-y`, and semantic `colSpan` integration) are completely preserved. Do not revert to old UI behaviors.
  </constraints>
</system_prompt>
</file>

<file path="0429_1537_fix-all-scenes-color-tags.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to perfectly synchronize the Tag Colors in the "All Scenes" ExportPreviewTable with the exact 3-value hex definitions (bg, text, border) found in ExportPreviewSingle.
  </role>

  <task>
    Execute Sub-task: Sync All Scenes Tag Colors with Single Scene Config.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Cross-reference the colors currently used in `ExportPreviewSingle.tsx`. Each category strictly requires `bg`, `text`, AND `border` hex codes.
       - Update the `TAG_COLORS` dictionary to include the exact `border` properties:
         ```tsx
         const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
           'CAST': { bg: '#FFE5E5', text: '#8B0000', border: '#FF0000' },
           'EXTRAS': { bg: '#D6F0D6', text: '#1A5C1A', border: '#228B22' },
           'PROPS': { bg: '#ECD6FF', text: '#4B0080', border: '#8B00FF' },
           'SET DRESSING': { bg: '#E8F5E9', text: '#006400', border: '#2E8B57' },
           'WARDROBE': { bg: '#D6F4FF', text: '#003D5C', border: '#00BFFF' },
           'MAKEUP/HAIR': { bg: '#FFE8D6', text: '#7A3000', border: '#FF6600' },
           'VEHICLES': { bg: '#FFD6EC', text: '#7A0040', border: '#FF69B4' },
           'SFX': { bg: '#CCE5FF', text: '#003D8F', border: '#0066CC' },
           'SOUND': { bg: '#EDD8C8', text: '#4A1F00', border: '#8B4513' },
           'EQUIPMENT': { bg: '#F5ECC8', text: '#5C4000', border: '#C8950A' },
           'NOTES': { bg: '#ECECEC', text: '#333333', border: '#888888' }
         };
         ```
       - Locate the `<thead>` Row 2 where `COLUMNS.map((col, i) => ...)` is rendered.
       - Update the inline `style` injection to explicitly apply the `1px solid` border using the hex code, overriding the default tailwind border for tagged columns:

         ```tsx
         {COLUMNS.map((col, i) => {
           const colorConfig = TAG_COLORS[col];
           return (
             <th 
               key={col} 
               className={`px-3 py-2 text-left text-[10px] font-bold whitespace-normal break-words ${!colorConfig ? 'bg-surface-container-low text-on-surface-variant border border-outline-variant' : ''}`}
               style={{ 
                 position: i < freezeCols ? 'sticky' : 'relative', 
                 left: i < freezeCols ? 40 + i * 120 : undefined, 
                 zIndex: i < freezeCols ? 20 : 10,
                 ...(colorConfig ? { 
                   backgroundColor: colorConfig.bg, 
                   color: colorConfig.text,
                   border: `1px solid ${colorConfig.border}`
                 } : {})
               }}
             >
               {col}
             </th>
           );
         })}
         ```
  </task>

  <constraints>
    - Output ONLY the fully updated `ExportPreviewTable.tsx` code.
    - Preserve all `sticky` logic, `whitespace-normal`, and `<textarea>` data cell functionalities.
  </constraints>
</system_prompt>
</file>

<file path="0429_1551_spreadsheet-selection-logic.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to refactor the Export Module to implement Google Sheets-like cell interaction (Single click to select, Drag to multi-select, Double-click to edit) and wire up the rich-text formatting toolbar across both "All Scenes" (Table) and "Single Scene" (A4 form) views.
  </role>

  <task>
    Execute Sub-task: Spreadsheet Interaction & Global Formatting Logic.

    1. **CREATE `components/breakdown/ExportFormatContext.tsx`**:
       - Create and export a React Context to act as the single source of truth for selection and formatting.
       - **State:** 
         - `selectedCellIds: Set<string>`
         - `cellStyles: Record<string, React.CSSProperties>` (maps cell ID to its bold, italic, color, alignment, etc.)
         - `isDragging: boolean`
       - **Actions:** `startSelection(id)`, `addToSelection(id)`, `endSelection()`, `applyFormat(styleKey, value)`.
       - Wrap this in an `<ExportFormatProvider>`.

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Wrap the entire page content inside `<ExportFormatProvider>`.
       - Locate the Toolbar buttons (Bold, Italic, Color, Align, etc.). Wire their `onClick` handlers to consume `applyFormat` from the context (e.g., applying `fontWeight: "bold"` to all `selectedCellIds`).

    3. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Refactor the data cells (`<tbody> td`). Instead of rendering a permanent `<textarea>`, implement View/Edit modes.
       - **ID Strategy:** Each cell needs a unique ID (e.g., `row-${rowIndex}-col-${col}`).
       - **View Mode (Default):** Render a `<div>` with `cursor-cell`. 
         - `onMouseDown`: call `startSelection(id)`.
         - `onMouseEnter`: if `isDragging`, call `addToSelection(id)`.
         - `onDoubleClick`: trigger local state `setEditingCell(id)`.
         - **Styles:** Read from `cellStyles[id]`. If `selectedCellIds.has(id)`, add a visible highlight (e.g., `ring-2 ring-primary bg-primary/10`).
       - **Edit Mode:** If `editingCell === id`, render a `<textarea autoFocus onBlur={() => setEditingCell(null)}>`.

    4. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Apply the exact same View/Edit and Drag-to-Select pattern to the `CategoryBox` components and the Meta inputs (Scene, Location, etc.).
       - **ID Strategy:** Use category labels or meta field names as unique IDs (e.g., `single-box-CAST`, `single-meta-LOCATION`).
       - Make the boxes selectable (click/drag) and editable (double-click to reveal textarea). Apply `cellStyles[id]` to the rendered text.

    5. **DOM Event Listener**:
       - Ensure a global `window.addEventListener('mouseup')` or an `onMouseUp` on the root container exists to fire `endSelection()` properly even if the user releases the mouse outside a cell.
  </task>

  <constraints>
    - Ensure zero layout shifting when switching between `div` (view) and `textarea` (edit). Both must use matching padding, dimensions, and text wrapping.
    - Output the complete code for the new Context file, and the updated `page.tsx`, `ExportPreviewTable.tsx`, and `ExportPreviewSingle.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0429_1606_bounding-box-selection.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to upgrade the cell selection algorithm in the Export Module from a path-based approach to a Bounding Box (Matrix) selection, perfectly mimicking Google Sheets behavior.
  </role>

  <task>
    Execute Sub-task: Implement Bounding Box Selection.

    1. **MODIFY `components/breakdown/ExportFormatContext.tsx`**:
       - Add state to track the origin cell: `selectionStart: { row: number, col: number } | null`.
       - Create a helper to generate consistent cell IDs: `const getCellId = (r: number, c: number) => \`row-${r}-col-${c}\`;`
       - Add action: `startMatrixSelection(row: number, col: number)`:
         - Sets `isDragging` to true.
         - Records `selectionStart` as `{ row, col }`.
         - Sets `selectedCellIds` to a new Set containing only `getCellId(row, col)`.
       - Add action: `updateMatrixSelection(row: number, col: number)`:
         - If `!isDragging` or `!selectionStart`, return.
         - Calculate boundaries:
           `minRow = Math.min(selectionStart.row, row)`
           `maxRow = Math.max(selectionStart.row, row)`
           `minCol = Math.min(selectionStart.col, col)`
           `maxCol = Math.max(selectionStart.col, col)`
         - Loop through all rows from `minRow` to `maxRow`, and cols from `minCol` to `maxCol`.
         - Add `getCellId(r, c)` for all iterations into a new Set, and update `selectedCellIds`.

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Ensure the cell ID matches the Context format (e.g., `row-${rowIndex}-col-${colIndex}`).
       - Update the `<div>` inside `<tbody>` data cells:
         - `onMouseDown`: Call `startMatrixSelection(rowIndex, colIndex)`.
         - `onMouseEnter`: If `isDragging`, call `updateMatrixSelection(rowIndex, colIndex)`.
  </task>

  <constraints>
    - Output the complete, fully updated code for BOTH `ExportFormatContext.tsx` and `ExportPreviewTable.tsx`.
    - Ensure `ExportPreviewSingle.tsx` remains unaffected (it can still use the basic `startSelection(id)` and `addToSelection(id)` methods since it lacks strict matrix coordinates).
  </constraints>
</system_prompt>
</file>

<file path="0429_1613_virtual-grid-single-scene.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to apply the Spreadsheet-like Bounding Box multi-select logic and View/Edit modes to the "Single Scene" form by engineering a Virtual Grid coordinate system.
  </role>

  <task>
    Execute Sub-task: Virtual Grid Mapping & Multi-Select for Single Scene.

    1. **ANALYZE THE VIRTUAL GRID**:
       - The `ExportFormatContext` bounding box selection relies strictly on `(row, col)` matrix logic. Since `ExportPreviewSingle.tsx` is built with flex/grid CSS and not a native `<table>`, you MUST assign virtual coordinates to each interactive field to fake a spatial matrix.
       - **Meta Row 0**: Scene (0,0) | I/E (0,1) | D/N (0,2)
       - **Meta Row 1**: Script Page (1,0) | Location Name (1,1) | Description (1,2)
       - **Category Row 2**: CAST (2,0) | PROPS (2,1) | EXTRAS (2,2)
       - **Category Row 3**: WARDROBE (3,0) | MAKEUP/HAIR (3,1) | SET DRESSING (3,2)
       - **Category Row 4**: VEHICLE / ANIMALS (4,0) | SPECIAL EFFECTS (4,1) | SOUND EFFECTS & MUSIC (4,2)
       - **Category Row 5**: SPECIAL EQUIPMENT (5,0) | PRODUCTION NOTES (5,1)

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Import and consume `ExportFormatContext` (`startMatrixSelection`, `updateMatrixSelection`, `selectedCellIds`, `cellStyles`, `isDragging`).
       - Define local state: `const [editingCell, setEditingCell] = useState<string | null>(null);`

       - **Refactor `CategoryBox` Component**:
         - Add `virtualRow: number` and `virtualCol: number` to its props.
         - Compute `const id = \`row-${virtualRow}-col-${virtualCol}\`;`
         - **View Mode (Default)**: Render a `<div className="cursor-cell">` to display the text. 
           - Attach: `onMouseDown={() => startMatrixSelection(virtualRow, virtualCol)}`
           - Attach: `onMouseEnter={() => isDragging && updateMatrixSelection(virtualRow, virtualCol)}`
           - Attach: `onDoubleClick={() => setEditingCell(id)}`
           - Styling: Apply `cellStyles[id]`. Add a visual selection ring (e.g., `ring-2 ring-primary bg-primary/5`) if `selectedCellIds.has(id)`.
         - **Edit Mode**: If `editingCell === id`, render the original `<textarea autoFocus onBlur={() => setEditingCell(null)} ...>`.
         - Ensure the `<div>` padding, font, and dimensions perfectly match the `<textarea>` to avoid layout jumping when double-clicking.

       - **Refactor Meta Section (Scene, I/E, D/N, etc.)**:
         - Apply the exact same View/Edit Mode logic to the 6 top meta `<input>` elements. 
         - Explicitly pass the virtual coordinates `(0,0)` to `(1,2)` to their respective handlers.

       - **Update Mapping Logic**:
         - When mapping the `CATEGORIES` array, mathematically or explicitly pass the correct `virtualRow` (starting at 2) and `virtualCol` (0 to 2) to each `CategoryBox`.
  </task>

  <constraints>
    - Output ONLY the fully updated `ExportPreviewSingle.tsx` code.
    - Zero layout shifting is permitted when toggling between the `div` view and `textarea`/`input` edit modes.
    - Preserve all original layout grids (`grid-cols-3`), `colSpan` structures, and explicit Category hex colors.
  </constraints>
</system_prompt>
</file>

<file path="0429_1618_auto-blur-edit-mode.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the "click-away to blur" functionality for the Spreadsheet and Single Scene views in the Export Module, allowing users to naturally exit edit mode.
  </role>

  <task>
    Execute Sub-task: Auto-focus and Blur for Cell Editing.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Locate the Edit Mode rendering logic inside the `<tbody>` data cells (where `editingCell === id`).
       - Ensure the `<textarea>` explicitly includes the `autoFocus` property so the cursor lands inside immediately upon double-clicking.
       - Attach `onBlur={() => setEditingCell(null)}` to the `<textarea>` so that clicking anywhere outside the cell reverts it to the read-only `<div>` view.

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Locate the Edit Mode rendering logic inside the `CategoryBox` component (the `<textarea>`).
       - Locate the Edit Mode rendering logic for the 6 top Meta Section `<input>` fields (Scene, I/E, D/N, Page, Location, Description).
       - Ensure all of these inputs/textareas include the `autoFocus` property.
       - Attach `onBlur={() => setEditingCell(null)}` to all of them to trigger the exact same click-away exit logic.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx`.
    - Ensure zero layout shift occurs during the blur transition (the text in `textarea`/`input` must perfectly match the padding and typography of the read-only `div`).
  </constraints>
</system_prompt>
</file>

<file path="0429_1627_context-driven-blur.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to completely eliminate the sticky focus/blinking cursor bug in the Export Module by lifting the edit mode state into the global Context.
  </role>

  <task>
    Execute Sub-task: Centralize Edit State to Fix Blinking Cursor Bug.

    1. **MODIFY `components/breakdown/ExportFormatContext.tsx`**:
       - Add `editingCell: string | null` to the Context state.
       - Add `setEditingCell: (id: string | null) => void` to the Context interface and provider.
       - Inside the `startMatrixSelection` function (and `startSelection` if it exists), add `setEditingCell(null);` at the very beginning. This guarantees that clicking ANY new cell immediately force-closes the currently active textarea system-wide.

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Remove the local `const [editingCell, setEditingCell] = useState(...)` declaration.
       - Extract `editingCell` and `setEditingCell` directly from the Context using your context hook (e.g., `const { ..., editingCell, setEditingCell } = useExportFormat();`).
       - Ensure `onDoubleClick` sets the id, and the `autoFocus` / `onBlur` logic remains intact but now drives the global state.

    3. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Remove the local `editingCell` state declaration entirely.
       - Extract `editingCell` and `setEditingCell` from the Context.
       - Wire this global state into all `CategoryBox` components and Meta `<input>`/`<textarea>` fields.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportFormatContext.tsx`, `ExportPreviewTable.tsx`, and `ExportPreviewSingle.tsx`.
    - Do not alter layout, styling, or existing `autoFocus` logic. Only rewire the state architecture.
  </constraints>
</system_prompt>
</file>

<file path="0429_1633_table-resizer-handles.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement drag-to-resize functionality for rows and columns in the "All Scenes" ExportPreviewTable, using specific grab handles on the header cells, exactly like Google Sheets.
  </role>

  <task>
    Execute Sub-task: Implement Row/Column Resizer Handles.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - **State Management**:
         - Add states to track dynamic sizes: `const [colWidths, setColWidths] = useState<Record<number, number>>({});` and `const [rowHeights, setRowHeights] = useState<Record<number, number>>({});`
         - Add state for the active dragging operation: `const [resizing, setResizing] = useState<{ type: 'col' | 'row', index: number, startPos: number, startSize: number } | null>(null);`

       - **Drag & Drop Logic**:
         - Implement `onMouseDown` on the handles to set the `resizing` state.
         - Attach `mousemove` and `mouseup` event listeners to the `window` (inside a `useEffect` dependent on `resizing`) to calculate the delta `e.clientX` / `e.clientY` and update `setColWidths` / `setRowHeights` in real-time.

       - **Column Headers (A, B, C... or Data Headers)**:
         - Locate the `<th>` rendering the column headers.
         - Inject dynamic width via inline styles: `width: colWidths[index] || 120, minWidth: colWidths[index] || 120`.
         - Add a vertical drag handle inside the `<th>`: `<div onMouseDown={(e) => startResize(e, 'col', index)} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary z-50 select-none" />`. (Ensure the `<th>` has `position: relative` or `sticky`).

       - **Row Headers (1, 2, 3... at the left edge)**:
         - Locate the `<tr>` or the first `<td>` responsible for the row number.
         - Inject dynamic height via inline styles: `height: rowHeights[rowIndex] || 41`.
         - Add a horizontal drag handle inside this first cell: `<div onMouseDown={(e) => startResize(e, 'row', rowIndex)} className="absolute bottom-0 left-0 right-0 h-1 cursor-row-resize hover:bg-primary z-50 select-none" />`.

       - **Clean up Data Cells (`<textarea>` / View Mode `<div>`)**:
         - Remove the `resize-y` class from all data cells.
         - Force them to expand perfectly to their container: `w-full h-full resize-none overflow-hidden`. The cell size is now strictly dictated by the `colWidths` and `rowHeights` states.
  </task>

  <constraints>
    - Output ONLY the fully updated `ExportPreviewTable.tsx` code.
    - Preserve all previous features: `ExportFormatContext` integration, Bounding Box matrix selection, View/Edit modes, and sticky coordinates.
    - Ensure smooth dragging by preventing text selection (`user-select: none`) globally during the active drag phase.
  </constraints>
</system_prompt>
</file>

<file path="0429_1638_persist-table-dimensions.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to persist the dynamic column widths and row heights of the ExportPreviewTable by lifting their state into ExportFormatContext and syncing them with localStorage, ensuring dimensions survive page reloads.
  </role>

  <task>
    Execute Sub-task: Persist Table Dimensions in Context & LocalStorage.

    1. **MODIFY `components/breakdown/ExportFormatContext.tsx`**:
       - Add `colWidths: Record<number, number>` and `rowHeights: Record<number, number>` to the context state, along with their respective `setColWidths` and `setRowHeights` dispatchers.
       - Inside `<ExportFormatProvider>`, initialize these states.
       - Add a `useEffect` to safely hydrate from `localStorage` on mount (to avoid hydration mismatch errors):
         `localStorage.getItem('scenoo_export_colWidths')`
         `localStorage.getItem('scenoo_export_rowHeights')`
       - Add another `useEffect` to save to `localStorage` whenever `colWidths` or `rowHeights` change.

    2. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Remove the local `useState` declarations for `colWidths` and `rowHeights`.
       - Extract `colWidths`, `setColWidths`, `rowHeights`, and `setRowHeights` directly from your custom hook (e.g., `useExportFormat()`).
       - Keep the drag-to-resize mouse event logic intact; it will now naturally update the global context states and auto-save.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportFormatContext.tsx` and `ExportPreviewTable.tsx`.
    - Handle Next.js hydration safely (do not render differently on the server vs first client paint; read localStorage only after mount).
    - Ensure all previous Bounding Box selection and View/Edit mode logic remains fully intact.
  </constraints>
</system_prompt>
</file>

<file path="0429_1642_table-autofit-dimensions.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the "Auto-Fit" functionality (double-click to auto-size) for columns and rows in the ExportPreviewTable, perfectly mimicking Google Sheets.
  </role>

  <task>
    Execute Sub-task: Implement Double-Click Auto-Fit for Rows and Columns.

    1. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Inject `data-col={colIndex}` and `data-row={rowIndex}` attributes into the View Mode `<div>` (or the `<td>` wrapping it) for every data cell inside the `<tbody>`.
       
       - Create an auto-fit handler for columns:
         `const autoFitColumn = (e: React.MouseEvent, colIndex: number) => { ... }`
         - Call `e.stopPropagation()` and `e.preventDefault()`.
         - Use `document.querySelectorAll(\`[data-col="${colIndex}"]\`)`.
         - Iterate through all matched elements to find the maximum `scrollWidth`.
         - Add a padding/border buffer (e.g., 24px) to the max `scrollWidth`.
         - Call `setColWidths` (from Context) to update the dimension for `colIndex`.

       - Create an auto-fit handler for rows:
         `const autoFitRow = (e: React.MouseEvent, rowIndex: number) => { ... }`
         - Call `e.stopPropagation()` and `e.preventDefault()`.
         - Use `document.querySelectorAll(\`[data-row="${rowIndex}"]\`)`.
         - Iterate through all matched elements to find the maximum `scrollHeight`.
         - Add a padding/border buffer (e.g., 16px) to the max `scrollHeight`.
         - Call `setRowHeights` (from Context) to update the dimension for `rowIndex`.

       - Locate the column drag handle (`<div className="... cursor-col-resize ...">`) inside the `<th>` elements and attach:
         `onDoubleClick={(e) => autoFitColumn(e, index)}`

       - Locate the row drag handle (`<div className="... cursor-row-resize ...">`) inside the first `<td>` of each row and attach:
         `onDoubleClick={(e) => autoFitRow(e, rowIndex)}`
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx`.
    - `e.stopPropagation()` is absolutely critical on the double-click handlers to prevent accidentally triggering the cell's Edit Mode or Matrix Selection logic.
    - Preserve all previous functionality: `colWidths`/`rowHeights` context integration, drag-to-resize, and View/Edit modes.
  </constraints>
</system_prompt>
</file>

<file path="0429_1705_advanced-spreadsheet-editing.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to upgrade the Edit Mode (textarea) in the Export Module for BOTH `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx` to perfectly mimic Google Sheets' cell editing UX (pop-out expansion, Enter-to-save, Cmd+Enter for newline, cursor positioning, and iPad save button).
  </role>

  <task>
    Execute Sub-task: Advanced Spreadsheet Cell Editing UX.

    1. **Auto-expanding Pop-out Edit Box (No Layout Shift)**:
       - In both files, when a cell enters Edit Mode (`editingCell === id`), DO NOT unmount the View Mode `<div>`. Keep it rendered so the table/grid layout does not collapse.
       - Render the Edit Mode `<textarea>` inside an absolutely positioned wrapper ON TOP of the View Mode div.
       - Ensure the parent container (`<td>` or CategoryBox wrapper) has `relative` positioning and DOES NOT have `overflow-hidden` (so the pop-out isn't clipped).
       - Pop-out Wrapper Classes: `absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-xl min-w-[calc(100%+4px)] min-h-[calc(100%+4px)] w-max max-w-[400px] h-max max-h-[300px]`
       - Textarea Classes: `w-full h-full min-w-[120px] min-h-[41px] p-2 outline-none resize-none custom-scrollbar bg-transparent text-on-surface whitespace-pre-wrap break-words`
       - Add a dynamic resize handler to the `<textarea>`:
         `onChange={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = \`\${e.currentTarget.scrollHeight}px\`; }}`
       - The `max-h-[300px]` combined with `overflow-y-auto` ensures native auto-scrolling triggers when dragging to select long text.

    2. **Enter to Save, Cmd+Enter for Newline**:
       - Attach `onKeyDown` to the `<textarea>`.
       - If `e.key === 'Enter'`:
         - If `e.metaKey || e.ctrlKey`: 
           `e.preventDefault();`
           Manually insert `\n` at the cursor, update `selectionStart`/`End`, mutate `e.currentTarget.value`, and trigger height resize calculation.
         - Else if `!e.shiftKey`:
           `e.preventDefault(); setEditingCell(null);` (Saves and exits).

    3. **Cursor at the End on Focus**:
       - Attach `onFocus={(e) => { const len = e.currentTarget.value.length; e.currentTarget.setSelectionRange(len, len); }}` so the blinking cursor always jumps to the very end of existing text.

    4. **iPad Save Button (Blue Checkmark)**:
       - Inside the absolute pop-out wrapper (sibling to the textarea), render:
         `<button onMouseDown={(e) => e.preventDefault()} onClick={() => setEditingCell(null)} className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 z-[2]"><span className="material-symbols-outlined text-[14px]">check</span></button>`
       - *Crucial*: `onMouseDown={(e) => e.preventDefault()}` prevents the textarea's `onBlur` from firing before the button click registers.

    5. **Apply strictly to**:
       - `components/breakdown/ExportPreviewTable.tsx`
       - `components/breakdown/ExportPreviewSingle.tsx`
  </task>

  <constraints>
    - Output ONLY the fully updated code for `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx`.
    - Retain all `ExportFormatContext` logic, matrix selection bounds, `data-col`/`data-row` autofit attributes, and handle mappings.
  </constraints>
</system_prompt>
</file>

<file path="0429_1727_virtual-popout-editor.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the "Virtual Pop-out Editor" for cell editing in both `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx` to perfectly mimic Google Sheets, completely preventing underlying layout collapse.
  </role>

  <task>
    Execute Sub-task: Virtual Pop-out Cell Editor & Keybindings.

    1. **Keep View Mode Intact (Zero Layout Shift)**:
       - When a cell enters Edit Mode (`editingCell === id`), DO NOT unmount or hide the View Mode `<div>`. Keep it rendered exactly as is so the table row/column dimensions do not collapse.

    2. **Create the Virtual Pop-out**:
       - Ensure the parent container (`<td>` for Table, or the wrapper in `CategoryBox` for Single Scene) has `position: relative`.
       - Render the Edit Mode `<textarea>` inside a new wrapper: `<div className="absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-2xl min-w-[calc(100%+4px)] min-h-[calc(100%+4px)] max-w-[400px] max-h-[300px] overflow-hidden rounded-sm">`
       - The `<textarea>` should have classes: `w-full h-full min-w-max min-h-max p-2 outline-none resize-none custom-scrollbar bg-transparent whitespace-pre-wrap break-words`.
       - Add an `onChange` and `onInput` handler to the `<textarea>` to dynamically adjust its inline `height` and `width` based on `e.currentTarget.scrollHeight` and `e.currentTarget.scrollWidth` (allowing it to expand naturally until it hits the max constraints, at which point the parent wrapper's `overflow-auto` kicks in).

    3. **Keyboard & Focus Logic**:
       - **Auto-scroll to end**: Attach `onFocus={(e) => { const len = e.currentTarget.value.length; e.currentTarget.setSelectionRange(len, len); }}` so the cursor blinks at the very end of the text.
       - **Enter to Save**: Attach `onKeyDown` to the `<textarea>`.
         - If `e.key === 'Enter'`:
           - If `e.metaKey || e.ctrlKey || e.shiftKey`: allow the default newline, or manually insert `\n` at cursor, update `value`, and resize.
           - Else: `e.preventDefault(); setEditingCell(null);` (saves the text back to the real cell and closes the virtual pop-out).
       - **Blur**: `onBlur={() => setEditingCell(null)}` to save and close when clicking away.

    4. **iPad Save Button**:
       - Inside the absolute pop-out wrapper, render the floating save button: `<button onMouseDown={(e) => e.preventDefault()} onClick={() => setEditingCell(null)} className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md z-[2] cursor-pointer"><span className="material-symbols-outlined text-[14px]">check</span></button>`
       - The `onMouseDown` preventDefault is critical to stop the textarea's blur event from firing before the click registers.
  </task>

  <constraints>
    - Output ONLY the fully updated code for `components/breakdown/ExportPreviewTable.tsx` and `components/breakdown/ExportPreviewSingle.tsx`.
    - Do not modify `ExportFormatContext.tsx`, matrix selection bounds, or `data-col`/`data-row` auto-fit attributes.
  </constraints>
</system_prompt>
</file>

<file path="0429_1753_helios-export-report.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect and Code Auditor. Your task is to deeply analyze the current codebase of the Export Module and generate a highly detailed technical report. DO NOT WRITE OR MODIFY ANY COMPONENT CODE.
  </role>

  <task>
    Execute the "Helios" method: Deep Codebase Audit and Report Generation.

    Read and analyze the exact current state of the following files:
    1. `components/breakdown/ExportFormatContext.tsx`
    2. `components/breakdown/ExportPreviewTable.tsx`
    3. `components/breakdown/ExportPreviewSingle.tsx`

    Generate a comprehensive markdown report detailing exactly how the following mechanics are CURRENTLY implemented (describe what the code *actually* does right now, not what it should do):
    
    1. **State Management:** How is `editingCell` managed between the Context and the components?
    2. **View vs Edit Mode DOM:** What exact DOM elements (divs, textareas, wrappers) are rendered in View mode vs Edit mode? List their exact critical CSS classes (especially `position`, `z-index`, `overflow`, `min-w/h`, `max-w/h`).
    3. **Virtual Pop-out Logic:** How is the "Virtual Pop-out Editor" structurally built? Does it still have JS auto-resize (`scrollHeight`/`style.height`) or is it purely constrained by CSS? 
    4. **Event Handling & Focus:** Detail the exact events (`onDoubleClick`, `onBlur`, `onMouseDown`, `onKeyDown`) attached to the View cell, the Edit wrapper, and the `<textarea>`. Specifically, how are "Enter to save", "Cmd+Enter to newline", and "Click outside to blur" currently handled?
    5. **Layout Preservation:** Is the underlying View mode `<div>` unmounted, hidden, or kept in the DOM when Edit mode is active? Does the View mode `<div>` have `overflow-hidden` applied?
  </task>

  <constraints>
    - Output ONLY the markdown report.
    - Be extremely precise about the current DOM structure, conditional rendering, and CSS classes applied to the Edit mode.
  </constraints>
</system_prompt>
</file>

<file path="0429_1814_helios-export-deep-audit.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect and Code Auditor. Your task is to execute the "Helios" deep codebase audit specifically targeting the CSS layout mechanics and DOM calculation logic in the Export Module. DO NOT WRITE OR MODIFY ANY COMPONENT CODE.
  </role>

  <task>
    Execute the Helios method. Read and deeply analyze the exact current state of:
    1. `components/breakdown/ExportPreviewTable.tsx`
    2. `components/breakdown/ExportPreviewSingle.tsx`
    3. `components/breakdown/ExportFormatContext.tsx`

    Generate a highly detailed markdown report answering these specific technical questions based on the CURRENT code:

    1. **Table Layout Constraints:** Does the `<table>` element in `ExportPreviewTable.tsx` have `table-layout: fixed` applied? How exactly are column widths applied to the `<th>` and `<td>` tags (inline styles vs classes)? 
    2. **View Mode Overflow Failure:** Look at the read-only `<div>` inside the data `<td>`. Does it have absolute positioning or a strictly fixed height? If it only has `h-full` and `overflow-hidden`, explain how the parent `<td>` is currently handling overflowing text strings (is the `<td>` expanding its intrinsic height?).
    3. **Auto-Fit Logic Flaw:** Analyze the `autoFitColumn` and `autoFitRow` functions. EXACTLY what DOM element is `document.querySelectorAll` targeting to measure `scrollWidth`/`scrollHeight`? Is it measuring an element that already has padding applied, causing it to compound and grow on every double-click?
    4. **Virtual Pop-out Sizing:** Look at the absolute wrapper for the edit mode pop-out. What are its exact `width`, `min-width`, and `max-width` CSS classes? Why is it failing to expand horizontally to a comfortable width when editing?
  </task>

  <constraints>
    - Output ONLY the markdown report.
    - Be extremely analytical. State exactly what the code does right now, pointing out the exact CSS classes and JS DOM properties (`scrollWidth`, etc.) that are causing the layout to break.
  </constraints>
</system_prompt>
</file>

<file path="0429_1822_helios-rewrite-export-dom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Execute the "Helios" architectural rewrite for the Export Module's DOM and CSS, completely resolving table layout fighting, text overflow expanding rows, and auto-fit compounding bugs.
  </role>

  <task>
    Execute Sub-task: Helios DOM & CSS Rewrite.

    1. **STRICT TABLE LAYOUT (ExportPreviewTable.tsx)**:
       - Ensure the `<table>` has inline style: `tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content'`.
       - Remove ALL `width`, `minWidth`, and `maxWidth` inline styles and classes from data `<td>` elements.
       - Apply the dynamic width ONLY to the `<th>` elements (both the top letters and the frozen headers): `style={{ width: colWidths[index] || 120, minWidth: colWidths[index] || 120 }}`.

    2. **ABSOLUTE VIEW MODE (ExportPreviewTable & ExportPreviewSingle)**:
       - **Crucial**: The `<tr>` MUST have its height applied directly: `style={{ height: rowHeights[rowIndex] || 41 }}`.
       - The data `<td>` must have `position: relative; padding: 0; overflow: visible;`.
       - The View Mode `<div>` (holding the read-only text) MUST be: `className="absolute inset-0 overflow-hidden px-3 py-2 whitespace-normal break-words"`. This completely detaches the text height from the row height, ensuring the `<tr>` never expands intrinsically.

    3. **FIX AUTO-FIT COMPOUNDING BUG (ExportPreviewTable)**:
       - Inside `autoFitColumn` and `autoFitRow`: `el.scrollWidth` and `el.scrollHeight` ALREADY include the element's padding because of `box-sizing: border-box`.
       - DO NOT add extra padding constants (like +24 or +16).
       - Update state directly with the maximum measured value: 
         `const max = Math.max(...Array.from(elements).map(el => el.scrollWidth));`
         `if (max > 0) setColWidths(prev => ({ ...prev, [colIndex]: max }));`

    4. **VIRTUAL POP-OUT FIX (ExportPreviewTable & ExportPreviewSingle)**:
       - Update the Edit Mode pop-out wrapper `<div>` classes: `absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm`.
       - Apply an inline style to ensure it is comfortably wide: `style={{ minWidth: Math.max(280, colWidths[index] || 120) }}` (or `120` for Single Scene).
       - Keep `max-w-[400px] max-h-[300px]`.
  </task>

  <constraints>
    - Output ONLY the fully rewritten code for `ExportPreviewTable.tsx` and `ExportPreviewSingle.tsx`.
    - DO NOT re-introduce JS auto-resize (`onChange` height mutations) on the `<textarea>`. Native scrollbars within the max-h/w constraints are the correct UX.
    - Preserve all keyboard shortcuts, context state updates, and matrix selection logic.
  </constraints>
</system_prompt>
</file>

</files>
