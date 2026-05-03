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
0428_1354_refactor-breakdown-ui.md
0428_1410_hotfix-breakdown-headers.md
0428_1415_hotfix-breakdown-final-cleanup.md
0428_1427_hotfix-breakdown-spacing.md
0428_1436_hotfix-nav-and-sidebar-height.md
0428_1710_breakdown-tag-logic-ui.md
0428_1735_hotfix-popover-and-note.md
0428_2156_step1-linescript-sidebars.md
0428_2205_step2-linescript-tools-sidebar.md
0428_2212_narrow-linescript-sidebar.md
0428_2216_move-toggles-into-sidebars.md
0428_2224_apply-toggles-to-breakdown.md
0428_2233_add-share-button-breakdown.md
0428_2240_build-breakdown-export-preview.md
0428_2249_BREAKDOWN-EXPORT-VIEWS.MD
0428_2256_REFINE-SINGLE-SCENE-UI.MD
0428_2259_FIX-A4-SINGLE-SCENE-OVERFLOW.MD
0428_2321_UPSALE-AND-TYPOGRAPHY.MD
0428_2331_export-rich-text-toolbar.md
0429_0005_sync-export-ui-with-templates.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0428_1354_refactor-breakdown-ui.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to implement a comprehensive UI refactor for the Script Breakdown workspace based on explicit design feedback. The goal is to maximize the PDF working area (simulating an 80% scale) and remove redundant elements.
  </role>

  <task>
    Execute Sub-task: Breakdown UI Space Optimization & Cleanup.

    1. **HIDE MAIN SIDEBAR IN WORKSPACE (Task 2)**:
       - MODIFY `app/(workspace)/layout.tsx`.
       - Completely REMOVE the `<AppSidebar />` component from this layout. The workspace should span the full width of the screen.

    2. **OPTIMIZE SCENE LIST & REMOVE BADGES (Task 1 & Visual Notes)**:
       - MODIFY `components/breakdown/BreakdownSceneList.tsx`.
       - Reduce the panel width: Change `w-72` to `w-64`.
       - Locate the rendering of `scene.tagCounts` (the small badges like "3 Cast", "2 Props" under the scene name). COMPLETELY DELETE this block to clean up the UI.

    3. **OPTIMIZE RIGHT SIDEBAR & REMOVE "SAVE" (Task 1 & Task 4)**:
       - MODIFY `components/breakdown/BreakdownSidebar.tsx`.
       - Reduce the panel width: Change `w-80` to `w-72`.
       - Locate the footer area (`<div className="p-4 border-t...">`).
       - COMPLETELY DELETE the "Save Breakdown" button (since the system will auto-save). Keep only the "Export Scene" button.

    4. **REFACTOR TAG TOOLBAR (Task 3.1 & 3.2)**:
       - MODIFY `components/breakdown/TagToolbar.tsx`.
       - Add a local state: `const [isCollapsed, setIsCollapsed] = useState(false);`
       - **If `isCollapsed` is true:** Return ONLY a floating circular button:
         `<button onClick={() => setIsCollapsed(false)} className="fixed bottom-6 right-80 w-14 h-14 bg-surface-container-lowest border border-outline-variant shadow-2xl rounded-full flex items-center justify-center hover:bg-surface-container transition-colors z-[1] cursor-pointer"><span className="material-symbols-outlined text-[24px] text-primary">chat_bubble</span></button>`
       - **If `isCollapsed` is false (Expanded):**
         - Delete the left-most `<div className="px-3 border-r...">` containing the text "Tag Selection".
         - Change the right-most `more_vert` icon button to a `close` icon.
         - Wire its `onClick` to `setIsCollapsed(true)`.

    5. **EXPAND SCRIPT VIEWER & REMOVE EXTRA BUTTON (Task 1 & Visual Notes)**:
       - MODIFY `components/breakdown/ScriptViewer.tsx`.
       - Reduce outer padding: Change `<section className="... p-12 ...">` to use `p-4` or `p-5`.
       - Reduce inner paper padding: Change `p-[80px]` to `p-[40px]`.
       - Locate the `<button>` at the bottom containing "Add Scene Break". COMPLETELY DELETE this button.
  </task>

  <constraints>
    - STRICT RULE: Do not drop any `cursor-pointer` classes from interactive elements.
    - Keep the 12 breakdown category colors intact.
    - Output the exact modified code for these 5 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_1410_hotfix-breakdown-headers.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to perform targeted UI modifications to the Breakdown module's headers based on user feedback, focusing on removing redundant labels and repositioning the Export button.
  </role>

  <task>
    Execute Sub-task: Clean Up Headers & Reposition Export Button.

    1. **MODIFY `components/breakdown/BreakdownSceneList.tsx` (Task 1):**
       - Locate the header section: `<div className="p-4 border-b border-outline-variant flex justify-between items-center">`.
       - Find and COMPLETELY DELETE the `<span ...>{scenes.length} Scenes</span>` badge.
       - Keep the `<span className="text-h3 text-on-surface">Scene List</span>` intact.

    2. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Task 1, 2 & 3):**
       - Locate the header section: `<div className="p-6 border-b border-outline-variant shrink-0">`.
       - Find and COMPLETELY DELETE the subtitle: `<p className="text-label-sm text-outline">Editing Scene {activeSceneId...} Elements</p>`.
       - Update the header's wrapper `<div>` to use flexbox for horizontal alignment: `<div className="p-6 border-b border-outline-variant shrink-0 flex justify-between items-center">`.
       - Locate the "Export Scene" button in the footer. REMOVE it from the footer.
       - MOVE this button into the newly flexed header, placing it right after the `<h2>Scene Breakdown</h2>` tag.
       - UPDATE the moved button's UI to match the new spec:
         - Change text to "EXPORT".
         - Change styling to use the primary blue color: `<button className="text-label-sm font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer">`
         - Keep its original export icon (e.g., `<span className="material-symbols-outlined text-[18px]">ios_share</span>` or similar).
  </task>

  <constraints>
    - STRICT RULE: Do not drop any `cursor-pointer` classes from interactive elements.
    - Only modify the specific elements mentioned. Do not rewrite or alter the rest of the Sidebar or Scene List component structures.
    - Output the exact modified code snippets or full components for these 2 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_1415_hotfix-breakdown-final-cleanup.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to perform the final targeted UI cleanups on the Breakdown module based on the latest design feedback.
  </role>

  <task>
    Execute Sub-task: Final Breakdown UI Cleanup (Titles, Export Button & Floating Icon).

    1. **MODIFY `components/breakdown/BreakdownSceneList.tsx` (Task 1):**
       - Find the header wrapper: `<div className="p-4 border-b border-outline-variant flex justify-between items-center">`.
       - Find and COMPLETELY DELETE the `<span className="text-h3 text-on-surface">Scene List</span>` element.
       - If the header wrapper `<div>` is now completely empty (because the "3 Scenes" badge was removed in a previous step), COMPLETELY DELETE the entire header `<div>` to save vertical space.

    2. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Task 1 & 2):**
       - Locate the header section: `<div className="p-6 border-b border-outline-variant shrink-0 flex justify-between items-center">`.
       - Find and COMPLETELY DELETE the `<h2 ...>Scene Breakdown</h2>` element.
       - Because the title is now gone, change the wrapper's flex alignment from `justify-between` to `justify-end` so the Export button aligns to the right: `<div className="p-6 border-b border-outline-variant shrink-0 flex justify-end items-center">`.
       - Locate the "EXPORT" button. Update its classes to be a solid primary button (blue background, white text): 
         Change from: `className="text-label-sm font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"`
         Change to: `className="text-label-sm font-bold bg-primary text-on-primary hover:bg-primary/90 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer shadow-sm"`

    3. **MODIFY `components/breakdown/TagToolbar.tsx` (Task 3):**
       - Locate the collapsed floating button (the FAB returned when `isCollapsed` is true).
       - Find the Material Symbol icon span: `<span className="material-symbols-outlined text-[24px] text-primary">chat_bubble</span>`
       - CHANGE the inner text from `chat_bubble` to `sell` (which is the Material Design tag icon).
  </task>

  <constraints>
    - STRICT RULE: Do not drop the `cursor-pointer` class on the EXPORT button or the collapsed FAB.
    - Only modify the specific elements mentioned.
    - Output the exact targeted replacements or the updated components for these 3 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_1427_hotfix-breakdown-spacing.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to perform targeted layout adjustments to the Breakdown module and Workspace Header based on the latest visual feedback.
  </role>

  <task>
    Execute Sub-task: Final UI Spacing & Alignment Adjustments.

    1. **MODIFY `components/breakdown/ScriptViewer.tsx` (Task 1):**
       - Increase the overall script paper size by 5%.
       - Locate the main script paper container: `<div className="script-paper w-full max-w-[800px] ...">`.
       - STRICTLY change `max-w-[800px]` to `max-w-[840px]`.

    2. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Task 2):**
       - Widen the EXPORT button to fill the panel width.
       - Locate the `<button>` element for "EXPORT" inside the header.
       - Add `w-full` and `justify-center` to its `className` so it spans the entire width of the sidebar.

    3. **MODIFY `components/layout/WorkspaceHeader.tsx` (Task 3 & 4):**
       - **Task 3 (Remove Avatar):** Locate the right-side actions block of the header. Find and COMPLETELY DELETE the User Profile avatar element (the circular element containing initials like "TP" or similar). Leave the notification and help icons intact.
       - **Task 4 (Adjust Left Margin):** Push the left branding block closer to the edge for better balance. Find the outermost `<header>` wrapper. Change its horizontal padding class from `px-8` to `px-4`.
  </task>

  <constraints>
    - STRICT RULE: Do not drop the `cursor-pointer` class on the EXPORT button or any other interactive elements.
    - Only modify the specific elements mentioned. Do not rewrite or alter the rest of the layout structures.
    - Output the exact targeted replacements or the updated components for these 3 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_1436_hotfix-nav-and-sidebar-height.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to apply targeted fixes to the Workspace routing and Breakdown UI layout based on direct user feedback.
  </role>

  <task>
    Execute Sub-task: Fix Back Button Routing & Sidebar Header Height.

    1. **MODIFY `components/layout/WorkspaceHeader.tsx` (Task 1):**
       - Locate the Back button `<Link>` element: `<Link href="/projects" className="...">`
       - Update its `href` attribute so it navigates back to the specific project being edited instead of the root projects dashboard. 
       - Change `href="/projects"` to `href={\`/projects/${projectSlug}\`}`. (Note: the `projectSlug` variable is already extracted from `useParams()` at the top of the component).

    2. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Task 2):**
       - Locate the header section that wraps the "EXPORT" button. It currently uses `p-6` which makes the container too tall compared to the button.
       - Locate: `<div className="p-6 border-b border-outline-variant shrink-0 flex justify-end items-center">`
       - Change `p-6` to `py-3 px-4` to reduce the vertical padding and make the wrapper tightly hug the EXPORT button.
  </task>

  <constraints>
    - STRICT RULE: Do not drop the `cursor-pointer` class or any other existing classes on the Back button or EXPORT button.
    - Only modify the specific attributes (`href` and `className` padding) mentioned.
    - Output the exact targeted replacements for these 2 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_1710_breakdown-tag-logic-ui.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to implement the new Tagging UX flow, redefine the Breakdown Categories, and refactor the Sidebar UI based on the latest design specifications for iPad vs. Desktop workflows.
  </role>

  <task>
    Execute Sub-task: Implement Dual-Mode Tagging UX & Refactor Sidebar.

    1. **UPDATE TYPES & CONFIG (`types/breakdown.ts`)**:
       - Update `TagCategory` union type to exactly these 11 values: `'cast' | 'extras' | 'props' | 'set-dressing' | 'wardrobe' | 'makeup-hair' | 'vehicle-animals' | 'special-effects' | 'sound-music' | 'special-equipment' | 'custom'`.
       - Add `quantity?: number;` to the `TaggedElement` interface.
       - Update `TAG_CONFIG` mapping to match these 11 keys. Use standard industry colors for the first 10. For `'custom'`, use label "Add Category", an `add` icon, and neutral styling.

    2. **REFACTOR SIDEBAR LISTS (`components/breakdown/CategoryGroup.tsx`)**:
       - Redesign the component to match a clean accordion-style list.
       - The header should display the category name and the total quantity of all elements inside it (e.g., `PROPS (11)`).
       - If there are elements, map through them as a vertical list. Each row should have:
         - Left side: The element text (e.g., `Polaroid Camera`).
         - Right side: The specific quantity (e.g., `1`) and a small `edit` (pencil) icon button next to it to adjust the quantity.
       - Remove the old "chip" and "row" rendering styles entirely.

    3. **ADD PRODUCTION NOTE (`components/breakdown/BreakdownSidebar.tsx`)**:
       - Ensure `BreakdownSidebar` maps over the new 11 categories.
       - At the very bottom of the sidebar (after the categories), add a dedicated section for "PRODUCTION NOTE".
       - It should be a `<textarea>` with a label, allowing the user to write general notes for the entire scene.

    4. **UPDATE TOOLBAR & ADD MINI-QTY POPOVER (`components/breakdown/TagToolbar.tsx`)**:
       - Update the mapped buttons to reflect the new `TAG_CONFIG`. "NOTE" will naturally disappear, and "Add Category" will appear.
       - Add a local state `selectedTagForQty: TagCategory | null`.
       - When a user clicks a tag button (when toolbar is expanded), instead of firing the tag immediately, show a small popover *above* that specific button containing a number `<input>` (default `1`) and an "Apply" button.

    5. **CREATE VERTICAL TAG MODAL UI (`components/breakdown/TagSelectionModal.tsx`)**:
       - CREATE this new file. It represents the Desktop UX (when Toolbar is collapsed).
       - It should be an absolute/fixed positioned pop-up (mocked for now, ready to receive x/y coordinates from text selection).
       - UI Structure:
         - Top: "ELEMENT NAME" input + "QTY" number input (default `1`).
         - Middle: Searchable vertical list of the 11 `TAG_CONFIG` categories with their color dots.
         - Bottom: "Tag all mentions in script" checkbox + "Add Element" submit button.
       - Export this component so it can be mounted in `BreakdownContainer` in the future.
  </task>

  <constraints>
    - STRICT RULE: Do not drop any `cursor-pointer` classes on interactive elements.
    - Ensure the UI logic clearly prepares for the rule: If Toolbar is collapsed -> Use `TagSelectionModal`. If Toolbar is expanded -> Use Toolbar + Mini-QTY Popover. (You only need to build the UI states for this phase).
    - Output targeted replacements or full files for the modified files, and the full code for the new `TagSelectionModal.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_1735_hotfix-popover-and-note.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to fix a critical CSS clipping bug with a popover component and enhance the visual prominence of a sidebar section based on direct user feedback.
  </role>

  <task>
    Execute Sub-task: Fix Toolbar Popover Clipping & Enhance Production Note.

    1. **MODIFY `components/breakdown/TagToolbar.tsx` (Fix Popover Clipping):**
       - **The Bug:** The mini-QTY popover is currently rendered inside the toolbar container which uses `overflow-x-auto`. This causes the popover to be visually clipped by the browser (only the shadow bleeds out).
       - **The Fix:** Refactor the DOM structure so the popover is a sibling to the scrollable container, not a child of it.
       - Wrap everything in a positioning div: 
         `<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1] flex flex-col items-center">`
       - Conditionally render the QTY popover *first* inside this new wrapper, giving it a bottom margin so it hovers above the toolbar: 
         `{selectedTagForQty && (<div className="mb-2 bg-surface-container-lowest shadow-2xl border border-outline-variant rounded-xl p-3 flex items-center gap-2 animate-in slide-in-from-bottom-2">...</div>)}`
       - Render the actual toolbar below it. Remove the `fixed`, `bottom-6`, `left-1/2`, `-translate-x-1/2`, and `z-[1]` classes from the toolbar itself, keeping only its visual and scroll classes:
         `<div className="bg-surface/95 backdrop-blur-md border border-outline-variant shadow-2xl rounded-2xl flex p-2 gap-0.5 items-center max-w-[95vw] overflow-x-auto hide-scrollbar w-full">...</div>`

    2. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Enhance Production Note):**
       - **The Bug:** The "PRODUCTION NOTE" section at the bottom is too short and lacks visual hierarchy.
       - **The Fix:** 
       - Wrap the entire Production Note section in a highlighted container block: `<div className="p-5 bg-primary/5 border-t border-primary/20 shrink-0">`
       - Add an icon and make the label pop:
         `<div className="flex items-center gap-2 mb-3">`
         `<span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>`
         `<label className="text-label-sm font-bold text-primary uppercase tracking-wider">Production Note</label>`
         `</div>`
       - Increase the textarea height: Set `rows={5}` or `min-h-[120px]`.
       - Ensure the textarea has a solid white background (`bg-white`) to stand out against the `bg-primary/5` wrapper, and keep standard focus rings.
  </task>

  <constraints>
    - STRICT RULE: Do not drop the `cursor-pointer` class from any buttons or interactive elements.
    - Maintain all existing state logic (`selectedTagForQty`, `qty`, `productionNote`, etc.).
    - Output the exact targeted replacements or the full corrected code for these 2 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_2156_step1-linescript-sidebars.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is Step 1 of the Line Script UI refactor: Build the scaffolding for two empty collapsible sidebars (left and right) and expand the script paper width to match the system specs.
  </role>

  <task>
    Execute Step 1: Create empty collapsible sidebars and manage their states.

    1. **CREATE `components/linescript/LineScriptLeftSidebar.tsx`**:
       - Create a new Client Component.
       - Props: `{ isOpen: boolean }`.
       - Structure: `<aside className={\`bg-surface-container-lowest border-r border-outline-variant transition-all duration-300 shrink-0 ${isOpen ? 'w-64' : 'w-0 border-r-0 overflow-hidden'}\`}></aside>`

    2. **CREATE `components/linescript/LineScriptRightSidebar.tsx`**:
       - Create a new Client Component.
       - Props: `{ isOpen: boolean }`.
       - Structure: `<aside className={\`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 shrink-0 flex flex-col ${isOpen ? 'w-72' : 'w-0 border-l-0 overflow-hidden'}\`}></aside>`

    3. **MODIFY `components/linescript/LineScriptContainer.tsx`**:
       - Add React state for the sidebars:
         `const [isLeftOpen, setIsLeftOpen] = useState(true);`
         `const [isRightOpen, setIsRightOpen] = useState(true);`
       - Update the root wrapper to standard flex layout: `<div className="flex-1 flex overflow-hidden bg-background relative">`
       - Render the components in order:
         - `<LineScriptLeftSidebar isOpen={isLeftOpen} />`
         - `<ScriptWorkspace ... (pass the new states and setter functions down as props) />`
         - `<LineScriptRightSidebar isOpen={isRightOpen} />`
       - Remove existing `p-8` or `justify-center` from the root wrapper if they exist, so the flex children fill the space naturally.

    4. **MODIFY `components/linescript/ScriptWorkspace.tsx`**:
       - Add new props to the interface: `isLeftOpen: boolean`, `isRightOpen: boolean`, `onToggleLeft: () => void`, `onToggleRight: () => void`.
       - Inside the Script Controls Bar (the `h-12` header inside the workspace):
         - Add a toggle button on the **far left**:
           `<button onClick={onToggleLeft} className="p-1 rounded text-secondary hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"><span className="material-symbols-outlined text-sm">{isLeftOpen ? 'left_panel_close' : 'left_panel_open'}</span></button>`
         - Add a toggle button on the **far right**:
           `<button onClick={onToggleRight} className="p-1 rounded text-secondary hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"><span className="material-symbols-outlined text-sm">{isRightOpen ? 'right_panel_close' : 'right_panel_open'}</span></button>`
       - Update the script paper wrapper container: Change `max-w-[800px]` to `max-w-[840px]`.
  </task>

  <constraints>
    - STRICT RULE: Keep the `cursor-pointer` class on all newly added buttons.
    - Output the complete code for the 2 new sidebar files, and the exact targeted updates for `LineScriptContainer.tsx` and `ScriptWorkspace.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2205_step2-linescript-tools-sidebar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is Step 2 of the Line Script UI refactor: Move the floating tools directly into the newly created Left Sidebar, create a clean "Script Tools" panel, and remove the floating toolbar entirely to prevent text overlap.
  </role>

  <task>
    Execute Step 2: Embed tools into Left Sidebar and clean up the Workspace.

    1. **MODIFY `components/linescript/LineScriptLeftSidebar.tsx`**:
       - Update the Props interface to include tool state: `{ isOpen: boolean; activeTool: ActiveTool; onToolChange: (tool: ActiveTool) => void; }`
       - Wrap the inner content conditionally so it only renders when `isOpen` is true to prevent overflow issues: `{isOpen && ( ... )}`
       - Add a sticky Header inside the sidebar:
         `<div className="h-12 border-b border-outline-variant flex items-center px-4 shrink-0"><span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Script Tools</span></div>`
       - Add a scrollable body container: `<div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 items-center custom-scrollbar">`
       - Re-create the tool buttons inside this body container (mirroring the old FloatingToolbar logic). Use `material-symbols-outlined`. Tools from top to bottom:
         - Scene Break (`horizontal_rule`)
         - Lining (Straight/Zigzag logic)
         - Split (`align_vertical_center` or similar)
         - Textbox (`text_format`)
         - Shapes (`category`)
         - Image (`image`)
         - More (`add_circle`)
       - Keep the active state styling logic: `activeTool === '...' ? 'bg-primary-container text-on-primary-container' : 'text-secondary hover:bg-surface-container hover:text-primary'`.
       - Add the Color Picker section: 5 circular `<div className="w-4 h-4 rounded-full cursor-pointer">` with standard Tailwind colors (blue, red, yellow, green, black).
       - Add a horizontal divider: `<div className="w-full h-px bg-outline-variant my-2" />`
       - Add the Trash tool (`delete`) at the bottom with error colors (`text-error hover:bg-error-container`).

    2. **MODIFY `components/linescript/LineScriptContainer.tsx`**:
       - Import `ActiveTool` type if missing.
       - Pass `activeTool={activeTool}` and `onToolChange={setActiveTool}` to the `<LineScriptLeftSidebar />` component.

    3. **MODIFY `components/linescript/ScriptWorkspace.tsx`**:
       - Completely REMOVE the `<FloatingToolbar />` component from the render tree.
       - Remove the import statement for `FloatingToolbar`.
       - Keep `activeTool` and `onToolChange` props untouched in this file, as the workspace still needs them to handle future canvas drawing interactions.

    4. **DELETE `components/linescript/FloatingToolbar.tsx`**:
       - This file is deprecated. Instruct the user or directly remove it if your environment permits.
  </task>

  <constraints>
    - STRICT RULE: Retain the `cursor-pointer` class on all tool buttons and color dots.
    - Ensure the width transition (`w-64` to `w-0`) implemented in Step 1 remains intact.
    - Output the full updated code for `LineScriptLeftSidebar.tsx` and the targeted replacements for `LineScriptContainer.tsx` and `ScriptWorkspace.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2212_narrow-linescript-sidebar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to narrow the Line Script Left Sidebar to act as a slim tool rail (exactly 1/4 of its original width) and clean up overflowing text.
  </role>

  <task>
    Execute Sub-task: Narrow Left Sidebar & Clean Up Layout.

    1. **MODIFY `components/linescript/LineScriptLeftSidebar.tsx`**:
       - Change the expanded width class from `w-64` to `w-16` (64px).
       - Update the `<aside>` wrapper classes: 
         `<aside className={\`bg-surface-container-lowest border-r border-outline-variant transition-all duration-300 shrink-0 flex flex-col ${isOpen ? 'w-16' : 'w-0 border-r-0 overflow-hidden'}\`}>`
       - **Remove the Header:** The text "SCRIPT TOOLS" will overflow in a `w-16` container. Completely remove the header block (`<div className="h-12...">...Script Tools...</div>`).
       - **Adjust Spacing:** Update the scrollable body container to center the icons perfectly within the narrow column. Use:
         `<div className="flex-1 overflow-y-auto py-6 flex flex-col gap-3 items-center custom-scrollbar w-full">`
  </task>

  <constraints>
    - STRICT RULE: Retain all existing tool buttons, the `activeTool` logic, the `cursor-pointer` classes, and the color picker section.
    - Output the full updated code for `LineScriptLeftSidebar.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2216_move-toggles-into-sidebars.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to refactor the Line Script module by moving the sidebar toggle buttons directly into their respective Sidebar components, utilizing an absolute positioned floating UI to survive the `w-0` overflow-hidden state.
  </role>

  <task>
    Execute Sub-task: Move Sidebar Toggles Into Sidebars.

    1. **MODIFY `components/linescript/LineScriptLeftSidebar.tsx`**:
       - Update Props to include `onToggle: () => void`.
       - Wrap the return statement in a relative positioning container:
         `<div className="relative h-full shrink-0">`
         `  <aside className={...existing classes...}>...</aside>`
         `  <button onClick={onToggle} className="absolute top-4 left-full bg-surface-container-lowest border border-outline-variant border-l-0 rounded-r-lg p-1 cursor-pointer z-50 text-secondary hover:text-primary shadow-sm flex items-center justify-center transition-colors">`
         `    <span className="material-symbols-outlined text-[18px]">{isOpen ? 'left_panel_close' : 'left_panel_open'}</span>`
         `  </button>`
         `</div>`

    2. **MODIFY `components/linescript/LineScriptRightSidebar.tsx`**:
       - Update Props to include `onToggle: () => void`.
       - Wrap the return statement similarly:
         `<div className="relative h-full shrink-0">`
         `  <aside className={...existing classes...}>...</aside>`
         `  <button onClick={onToggle} className="absolute top-4 right-full bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l-lg p-1 cursor-pointer z-50 text-secondary hover:text-primary shadow-sm flex items-center justify-center transition-colors">`
         `    <span className="material-symbols-outlined text-[18px]">{isOpen ? 'right_panel_close' : 'right_panel_open'}</span>`
         `  </button>`
         `</div>`

    3. **MODIFY `components/linescript/LineScriptContainer.tsx`**:
       - Pass `onToggle={() => setIsLeftOpen(!isLeftOpen)}` to `<LineScriptLeftSidebar />`.
       - Pass `onToggle={() => setIsRightOpen(!isRightOpen)}` to `<LineScriptRightSidebar />`.

    4. **MODIFY `components/linescript/ScriptWorkspace.tsx`**:
       - **Clean up Props:** Remove `isLeftOpen`, `isRightOpen`, `onToggleLeft`, `onToggleRight` from the component props/interface.
       - **Clean up UI:** In the "Script Controls Bar" (`h-12` header), entirely remove the left toggle button (`left_panel_close`/`open`) and the right toggle button (`right_panel_close`/`open`). Keep only the Zoom controls, Print, and Download buttons.
  </task>

  <constraints>
    - STRICT RULE: Keep the `cursor-pointer` class on all interactive elements.
    - Make sure the toggle buttons render *outside* the `<aside>` but *inside* the `<div relative>` wrapper so they don't get clipped by `overflow-hidden` when closed.
    - Output the exact targeted replacements or full updated code for these 4 components.
  </constraints>
</system_prompt>
</file>

<file path="0428_2224_apply-toggles-to-breakdown.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to remove the toggle button from the Line Script Left Sidebar (making it a permanent tool rail) and replicate the floating toggle button pattern to both sidebars in the Breakdown module.
  </role>

  <task>
    Execute Sub-task: Update Sidebar Toggles across Line Script and Breakdown.

    1. **MODIFY `components/linescript/LineScriptLeftSidebar.tsx`**:
       - Remove `isOpen` and `onToggle` from the component props.
       - Remove the `<div className="relative h-full shrink-0">` wrapper and the absolute `<button>`.
       - Keep only the `<aside className="bg-surface-container-lowest border-r border-outline-variant shrink-0 flex flex-col w-16">` and its inner content.

    2. **MODIFY `components/linescript/LineScriptContainer.tsx`**:
       - Remove the `isLeftOpen` state and `setIsLeftOpen`.
       - Update the rendering to `<LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />` (without toggle props).

    3. **MODIFY `components/breakdown/BreakdownSceneList.tsx` (Left Sidebar)**:
       - Update Props to include `isOpen: boolean; onToggle: () => void;`.
       - Wrap the return statement in `<div className="relative h-full shrink-0">`.
       - Update the `<aside>` classes to handle the width transition:
         `<aside className={\`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 \${isOpen ? 'w-72 border-r' : 'w-0 border-r-0 overflow-hidden'}\`}>`
       - Add the floating toggle button inside the wrapper (after the aside):
         `<button onClick={onToggle} className="absolute top-4 left-full bg-surface-container-lowest border border-outline-variant border-l-0 rounded-r-lg p-1 cursor-pointer z-50 text-secondary hover:text-primary shadow-sm flex items-center justify-center transition-colors">`
         `  <span className="material-symbols-outlined text-[18px]">{isOpen ? 'left_panel_close' : 'left_panel_open'}</span>`
         `</button>`

    4. **MODIFY `components/breakdown/BreakdownSidebar.tsx` (Right Sidebar)**:
       - Update Props to include `isOpen: boolean; onToggle: () => void;`.
       - Wrap the return statement in `<div className="relative h-full shrink-0">`.
       - Update the `<aside>` classes to handle the width transition:
         `<aside className={\`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 \${isOpen ? 'w-80 border-l' : 'w-0 border-l-0 overflow-hidden'}\`}>`
       - Add the floating toggle button inside the wrapper (after the aside):
         `<button onClick={onToggle} className="absolute top-4 right-full bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l-lg p-1 cursor-pointer z-50 text-secondary hover:text-primary shadow-sm flex items-center justify-center transition-colors">`
         `  <span className="material-symbols-outlined text-[18px]">{isOpen ? 'right_panel_close' : 'right_panel_open'}</span>`
         `</button>`

    5. **MODIFY `components/breakdown/BreakdownContainer.tsx`**:
       - Add state for the sidebars:
         `const [isLeftOpen, setIsLeftOpen] = useState(true);`
         `const [isRightOpen, setIsRightOpen] = useState(true);`
       - Pass the new props down to the sidebars:
         `<BreakdownSceneList ... isOpen={isLeftOpen} onToggle={() => setIsLeftOpen(!isLeftOpen)} />`
         `<BreakdownSidebar ... isOpen={isRightOpen} onToggle={() => setIsRightOpen(!isRightOpen)} />`
  </task>

  <constraints>
    - STRICT RULE: Retain the `cursor-pointer` class on all toggle buttons.
    - Output the exact targeted replacements or the full updated code for these 5 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_2233_add-share-button-breakdown.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to update the footer action buttons in the Breakdown Sidebar, specifically modifying the Export button and adding a new Share button side-by-side.
  </role>

  <task>
    Execute Sub-task: Update Breakdown Sidebar Footer (Export & Share).

    1. **MODIFY `components/breakdown/BreakdownSidebar.tsx`**:
       - Locate the footer section at the bottom of the sidebar (typically containing "Save Breakdown" and "Export Scene" buttons).
       - Keep the "Save Breakdown" button as full width on top.
       - Below it, wrap the secondary actions in a horizontal flex container: `<div className="flex gap-2 w-full mt-2">` (or similar depending on existing gap logic).
       - **Export Button**: 
         - Update its width to `flex-1`.
         - Change its icon to `<span className="material-symbols-outlined text-[18px]">download</span>`.
         - Keep the label as "Export".
       - **Share Button** (NEW):
         - Create a duplicate of the Export button style, set width to `flex-1`.
         - Use icon: `<span className="material-symbols-outlined text-[18px]">ios_share</span>`.
         - Set the label to "Share".
  </task>

  <constraints>
    - STRICT RULE: You MUST retain the `cursor-pointer` class on all 3 buttons (Save, Export, Share) as per the recent global audit.
    - Ensure both Export and Share buttons share the same styling (likely `text-secondary hover:text-on-surface hover:bg-surface-container` or similar secondary button styles used in the existing component).
    - Output the exact targeted replacements or the full updated code for `BreakdownSidebar.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2240_build-breakdown-export-preview.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to build a spreadsheet-like Export Preview interface for the Script Breakdown module, allowing users to edit breakdown data like Google Sheets before downloading.
  </role>

  <task>
    Execute Sub-task: Build Breakdown Export Preview Page and Spreadsheet UI.

    1. **CREATE `components/breakdown/ExportPreviewTable.tsx`**:
       - Create a Client Component.
       - Define the 17 standard columns based on the CSV spec: `['SCENE', 'I/E', 'D/N', 'PAGE', 'LOCATION', 'DESCRIPTION', 'CAST', 'EXTRAS', 'PROPS', 'SET DRESSING', 'WARDROBE', 'MAKEUP/HAIR', 'VEHICLES', 'SFX', 'SOUND', 'EQUIPMENT', 'NOTES']`.
       - Create mock data for 3-5 rows matching these columns.
       - **UI Structure:**
         - Wrapper: `<div className="flex-1 overflow-auto bg-white border border-outline-variant shadow-sm m-6 custom-scrollbar">`
         - Table: Use standard HTML `<table>` with `border-collapse`.
         - Header (`<thead>`): `sticky top-0 bg-surface-container-low z-10`. Header cells (`<th>`) should have `border border-outline-variant px-3 py-2 text-left text-label-sm font-bold text-on-surface-variant whitespace-nowrap`.
         - Body (`<tbody>`): Render rows. Each cell (`<td>`) must have `border border-outline-variant p-0 min-w-[120px]`.
         - **Spreadsheet Editor:** Inside each `<td>`, render an `<input type="text" defaultValue={value} className="w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:bg-primary/5 bg-transparent text-body-md text-on-surface transition-all" />`.

    2. **CREATE `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Create a Client Component (`"use client";`).
       - Import `useParams` and `useRouter` from `next/navigation`.
       - Render a full-height flex column:
         - **Top Action Bar:** `<div className="h-14 border-b border-outline-variant bg-surface-container-lowest px-6 flex items-center justify-between shrink-0">`
         - **Left side of Action Bar:** A "Back" button (`<button onClick={() => router.back()}... >` with a `arrow_back` icon) and title "Export Preview".
         - **Right side of Action Bar:** Two buttons: "Download CSV" and "Download PDF" (styled as primary/secondary buttons, `cursor-pointer`).
         - **Main Content:** Render the `<ExportPreviewTable />` below the action bar to fill the remaining space.

    3. **MODIFY `components/breakdown/BreakdownSidebar.tsx`**:
       - Add `"use client";` if not already present.
       - Import `useParams` and `useRouter` from `next/navigation`.
       - Inside the component, initialize:
         `const router = useRouter();`
         `const params = useParams();`
       - Locate the "Export Scene" button in the footer.
       - Add an `onClick` handler to the Export button:
         `onClick={() => router.push(\`/workspace/${params.projectSlug}/${params.scriptId}/breakdown/export\`)}`
  </task>

  <constraints>
    - STRICT RULE: Maintain the `cursor-pointer` class on all new interactive elements (Back, Download buttons).
    - Ensure the table expands properly and scrolls horizontally/vertically without breaking the page layout.
    - Output the complete code for the 2 new files and the targeted update for `BreakdownSidebar.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2249_BREAKDOWN-EXPORT-VIEWS.MD">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to upgrade the Breakdown Export Preview page by introducing a "Single Scene" view mode alongside the existing "All Scenes" view, using the exact layout from the provided CSV/PDF specs and the exact hex colors from the design system.
  </role>

  <task>
    Execute Sub-task: Implement Toggle and Single Scene Export Preview.

    1. **CREATE `components/breakdown/ExportPreviewSingle.tsx`**:
       - Create a new Client Component simulating an A4 printable sheet.
       - **Wrapper**: `<div className="w-full max-w-4xl mx-auto bg-white border border-outline-variant shadow-sm m-6 p-10 flex flex-col gap-6">`
       - **Header Section**: 3 columns (Left: "SCRIPT BREAKDOWN", Center: "PROJECT TITLE" input, Right: Logo placeholder).
       - **Meta Section**: Grid layout for scene metadata.
         - Row 1: Scene #, INT/EXT, D/N.
         - Row 2: Script Page, Location Name.
         - Row 3: Description (textarea).
         - Use `<input type="text">` and `<textarea>` with `bg-transparent outline-none border-b border-dashed border-outline-variant focus:border-primary` for all meta fields.
       - **Category Grid Section**: `<div className="grid grid-cols-3 gap-4 mt-4">`. Render 10 category boxes + 1 wide box for Production Notes.
       - **Category Box UI**: 
         - Wrapper: `border` with the specific category color.
         - Header: `bg` with category color at 10% opacity (`/10` in Tailwind), text color matching the exact hex.
         - Body: `<textarea className="w-full h-32 p-2 outline-none resize-none text-body-md" />`.
       - **Exact Colors & Mapping**:
         - CAST (`#FF0000`)
         - PROPS (`#8B00FF`)
         - EXTRAS (`#228B22`)
         - MAKEUP/HAIR (`#FF6600`)
         - SET DRESSING (`#008080`)
         - WARDROBE (`#00BFFF`)
         - VEHICLES / ANIMALS (`#FF69B4`)
         - SPECIAL EFFECTS (`#0066CC`)
         - SOUND EFFECTS & MUSIC (`#8B4513`)
         - SPECIAL EQUIPMENT (`#C8950A`)
         - PRODUCTION NOTES (`#555555`) - *Note: Make this span 2 columns (`col-span-2`).*

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Add React state: `const [viewMode, setViewMode] = useState<'all' | 'single'>('all');`
       - In the "Top Action Bar", add a Toggle Group in the center (between the Back button and Download buttons).
         - Wrapper: `<div className="flex bg-surface-container-low p-1 rounded-lg">`
         - Button "All Scenes": `px-4 py-1.5 rounded-md text-label-md transition-colors cursor-pointer ${viewMode === 'all' ? 'bg-white shadow-sm font-bold text-primary' : 'text-on-surface-variant hover:text-on-surface'}`
         - Button "Single Scene": Apply the inverse logic.
       - In the "Main Content" area, render conditionally:
         `{viewMode === 'all' ? <ExportPreviewTable /> : <ExportPreviewSingle />}`
  </task>

  <constraints>
    - STRICT RULE: Keep the `cursor-pointer` class on the new toggle buttons.
    - Output the complete code for `ExportPreviewSingle.tsx` and the targeted updates for `page.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2256_REFINE-SINGLE-SCENE-UI.MD">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer and UX/UI Expert. Your task is to overhaul the "Single Scene" Breakdown Export Preview UI to look strictly like a professional, printable document, removing any playful or "childish" UI elements.
  </role>

  <task>
    Execute Sub-task: Refine `ExportPreviewSingle.tsx` UI and apply precise HEX color pairs.

    1. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - **Document Wrapper**: Maintain the A4 style (`max-w-4xl mx-auto bg-white border border-outline-variant shadow-sm p-10`).
       - **Typography**: Emphasize monospace fonts for labels (`font-mono`) to give it a technical sheet feel.
       - **Category Box UI (CRITICAL FIX)**:
         - Stop applying colors to the outer box wrapper. 
         - **Box Wrapper**: `<div className="border border-outline-variant bg-white flex flex-col p-3 min-h-[140px] rounded-sm">` (Neutral, thin border, white background).
         - **Label Tag**: Render a small, tight badge at the top-left of the box content using the EXACT 3-hex color pairs defined below.
           `<span className="inline-block font-mono text-[10px] font-bold px-2 py-1 mb-2 uppercase w-max" style={{ backgroundColor: bgHex, color: textHex, border: \`1px solid ${borderHex}\` }}>{CategoryName}</span>`
         - **Textarea**: `<textarea className="w-full flex-1 outline-none resize-none text-body-md bg-transparent text-on-surface" />`

    2. **EXACT HEX COLOR MAPPING (Background / Text / Border)**:
       - CAST: bg `#FFE5E5`, text `#8B0000`, border `#FF0000`
       - PROPS: bg `#ECD6FF`, text `#4B0080`, border `#8B00FF`
       - EXTRAS: bg `#D6F0D6`, text `#1A5C1A`, border `#228B22`
       - WARDROBE: bg `#D6F4FF`, text `#003D5C`, border `#00BFFF`
       - MAKEUP/HAIR: bg `#FFE8D6`, text `#7A3000`, border `#FF6600`
       - SET DRESSING: bg `#E8F5E9`, text `#006400`, border `#2E8B57`
       - VEHICLE / ANIMALS: bg `#FFD6EC`, text `#7A0040`, border `#FF69B4`
       - SPECIAL EFFECTS: bg `#CCE5FF`, text `#003D8F`, border `#0066CC`
       - SOUND EFFECTS & MUSIC: bg `#EDD8C8`, text `#4A1F00`, border `#8B4513`
       - SPECIAL EQUIPMENT: bg `#F5ECC8`, text `#5C4000`, border `#C8950A`
       - PRODUCTION NOTES: bg `#ECECEC`, text `#333333`, border `#888888` (Apply `col-span-2` or `col-span-3` to make this span the full bottom width).
  </task>

  <constraints>
    - STRICT RULE: Do NOT use Tailwind arbitrary classes or opacity fractions for category colors (e.g., no `bg-red-500/10`). Use inline `style={{}}` to inject the exact hex codes into the label tags.
    - STRICT RULE: The main category `<div border>` must remain purely neutral (`border-outline-variant bg-white`).
    - Output the full updated code for `ExportPreviewSingle.tsx`.
  </constraints>
</system_prompt>
</file>

<file path="0428_2259_FIX-A4-SINGLE-SCENE-OVERFLOW.MD">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to fix the A4 page scaling and content overflow issues in the Single Scene Breakdown Export Preview.
  </role>

  <task>
    Execute Sub-task: Lock `ExportPreviewSingle.tsx` to exact A4 dimensions and strictly prevent vertical overflow.

    1. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - **A4 Wrapper (CRITICAL)**: Change the root wrapper classes to enforce exact A4 web dimensions (794x1123 px).
         Update to: `<div className="w-[794px] min-h-[1123px] shrink-0 mx-auto bg-white border border-outline-variant shadow-sm my-8 p-8 flex flex-col gap-4">`
       - **Category Grid Section**: Make the grid container take up the remaining height proportionally and reduce the gap to prevent pushing content down.
         Update to: `<div className="flex-1 grid grid-cols-3 gap-3 mt-2">`
       - **Category Box UI**: Remove the hardcoded `min-h-[140px]` that forces overflow. Let the parent grid stretch the boxes naturally.
         Update wrapper to: `<div className="border border-outline-variant bg-white flex flex-col p-2.5 rounded-sm overflow-hidden">`
       - **Textarea Inside Box**: Ensure textareas fill the available space without breaking the box layout. Reduce font size slightly for dense inputs.
         Update textarea to: `<textarea className="w-full flex-1 outline-none resize-none text-label-sm bg-transparent text-on-surface" />`
  </task>

  <constraints>
    - Output the exact targeted replacements or the full updated code for `ExportPreviewSingle.tsx`.
    - Do not modify the existing HEX color mappings or the `style={{}}` tags injected previously.
  </constraints>
</system_prompt>
</file>

<file path="0428_2321_UPSALE-AND-TYPOGRAPHY.MD">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to refine the Breakdown Export Preview by removing the visual watermark, adding a locked "Up-sale" UI for CSV exports, and introducing a Typography selection feature.
  </role>

  <task>
    Execute Sub-task: UI Refinements, Up-sale CSV Button, and Font Customization.

    1. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Add state: `const [fontFamily, setFontFamily] = useState('font-sans');`
       - In the "Top Action Bar", add a Font Selector dropdown just before the Download buttons:
         `<select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="bg-surface-container-low border border-outline-variant text-label-md px-3 py-1.5 rounded-md outline-none cursor-pointer text-on-surface-variant hover:text-on-surface">`
         `  <option value="font-sans">Inter (Sans)</option>`
         `  <option value="font-serif">Serif</option>`
         `  <option value="font-mono">Mono</option>`
         `</select>`
       - Update the "Download CSV" button to act as an up-sale trigger:
         `<button onClick={() => router.push('/settings/plans')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-label-md text-on-surface-variant bg-surface-container-low border border-outline-variant hover:bg-surface-container transition-colors cursor-pointer">`
         `  <span className="material-symbols-outlined text-[16px]">lock</span>`
         `  Download CSV`
         `</button>`
       - Pass the `fontFamily` prop to the conditionally rendered components: 
         `<ExportPreviewTable fontFamily={fontFamily} />` and `<ExportPreviewSingle fontFamily={fontFamily} />`.

    2. **MODIFY `components/breakdown/ExportPreviewSingle.tsx`**:
       - Update the Props interface: `interface Props { fontFamily?: string; }`
       - Destructure `fontFamily = 'font-sans'` from props.
       - Apply the `${fontFamily}` dynamic class to all `<input>` and `<textarea>` elements within the form.
       - **STRICT RULE**: The Category Labels (the small tags injected with `style={{}}`) MUST remain explicitly `font-mono`. Do not apply the dynamic font to them.
       - **Remove Watermark**: Locate and completely delete the "MAED BY Scenoo" text element from the layout.

    3. **MODIFY `components/breakdown/ExportPreviewTable.tsx`**:
       - Update the Props interface: `interface Props { fontFamily?: string; }`
       - Destructure `fontFamily = 'font-sans'` from props.
       - Apply the `${fontFamily}` dynamic class to the `<input>` elements inside the table cells:
         `<input type="text" defaultValue={value} className={\`w-full h-full px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:bg-primary/5 bg-transparent text-body-md text-on-surface transition-all ${fontFamily}\`} />`
  </task>

  <constraints>
    - STRICT RULE: Maintain the `cursor-pointer` class on all newly added interactive elements (select, lock button).
    - Output the exact targeted replacements or the full updated code for these 3 files.
  </constraints>
</system_prompt>
</file>

<file path="0428_2331_export-rich-text-toolbar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Engineer. Your task is to refactor the Breakdown Export Preview page by moving the view/export controls to a collapsible right sidebar and transforming the top action bar into an Excel-like rich-text formatting toolbar.
  </role>

  <task>
    Execute Sub-task: Build Export Right Sidebar & Rich-Text Toolbar.

    1. **CREATE `components/breakdown/ExportRightSidebar.tsx`**:
       - Create a new Client Component.
       - Props: `{ isOpen: boolean; onToggle: () => void; viewMode: 'all' | 'single'; setViewMode: (v: 'all' | 'single') => void; onCsvClick: () => void; }`
       - Use the floating toggle pattern (wrap aside in `<div className="relative h-full shrink-0">`).
       - Floating Button: absolute, positioned on the left edge (`right-full`), using `right_panel_open` / `right_panel_close` icons.
       - Aside classes: `bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-72' : 'w-0 border-l-0 overflow-hidden'}`
       - Content inside aside:
         - A section for "VIEW MODE" with the Toggle Group ("All Scenes" / "Single Scene").
         - A section for "EXPORT OPTIONS" with the "Download PDF" button (primary blue) and "Download CSV" button (locked up-sale styling).

    2. **MODIFY `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**:
       - Add state for sidebar: `const [isRightOpen, setIsRightOpen] = useState(true);`
       - Add state for zoom: `const [zoom, setZoom] = useState(100);`
       - **Update Top Action Bar**:
         - Keep Left side: Back button and "Export Preview" title.
         - Add a vertical divider: `<div className="w-px h-6 bg-outline-variant mx-4" />`
         - **New Toolbar**:
           - Zoom Select: `<select value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="...">` (options: 50%, 75%, 90%, 100%).
           - Font Select: (Keep existing `fontFamily` select).
           - Divider.
           - Text Format Group: 4 buttons (`format_bold`, `format_italic`, `format_underlined`, `format_color_text`).
           - Divider.
           - Align Group: 3 buttons (`format_align_left`, `format_align_center`, `format_align_right`).
           - Divider.
           - Link Button: 1 button (`link`).
           - *Note: Style all toolbar buttons as `w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer`*.
       - **Update Main Layout Structure**:
         - The space below the Top Bar should be a flex container: `<div className="flex-1 flex overflow-hidden">`
         - Center Area: `<div className="flex-1 overflow-auto bg-surface-container-low flex flex-col items-center custom-scrollbar">`
           - Add a Zoom Wrapper around the preview components: 
             `<div style={{ transform: \`scale(${zoom / 100})\`, transformOrigin: 'top center', transition: 'transform 0.2s ease-in-out' }} className="w-full flex justify-center pb-20">`
             - Conditionally render `<ExportPreviewTable />` or `<ExportPreviewSingle />`.
         - Right Area: Render `<ExportRightSidebar />` passing all required props.
  </task>

  <constraints>
    - STRICT RULE: Maintain the `cursor-pointer` class on all toolbar buttons, sidebar toggles, and export buttons.
    - Ensure the up-sale logic (routing to `/settings/plans` for CSV) is passed correctly to the new sidebar via `onCsvClick`.
    - Output the complete code for `ExportRightSidebar.tsx` and the full updated code for `page.tsx`.
  </constraints>
</system_prompt>
</file>

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

</files>
