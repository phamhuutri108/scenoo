<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to execute a multi-module UI/UX layout refactor targeting sidebars, toolbars, and global headers.
    CRITICAL: Use TARGETED REPLACEMENTS. Pay extreme attention to flexbox layouts and React states.
  </role>

  <task>
    **Step 1: Sidebar Toggle Icons (3 files)**
    Synchronize the sidebar toggle icons to match AppSidebar (`menu` when closed, `chevron` when open).
    - File: `components/breakdown/BreakdownSceneList.tsx`
      Find `{isOpen ? 'left_panel_close' : 'left_panel_open'}` (or similar) and replace it EXACTLY with `{isOpen ? 'chevron_left' : 'menu'}`.
    - File: `components/breakdown/BreakdownSidebar.tsx`
      Find `{isOpen ? 'right_panel_close' : 'right_panel_open'}` and replace it EXACTLY with `{isOpen ? 'chevron_right' : 'menu'}`.
    - File: `components/linescript/LineScriptRightSidebar.tsx`
      Find `{isOpen ? 'right_panel_close' : 'right_panel_open'}` and replace it EXACTLY with `{isOpen ? 'chevron_right' : 'menu'}`.

    **Step 2: Move LineScript Topbar to Bottom**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Locate the Rich Text & Zoom Topbar `div` (the `h-14` container holding the centered tool cluster).
    - Move this entire `div` block from ABOVE the workspace wrapper to BELOW the workspace wrapper (`<div className="flex-1 flex overflow-hidden bg-[#f9f9ff] relative">`).
    - Change its class from `border-b` to `border-t`.

    **Step 3: Copy Bottom Bar to BreakdownContainer & Lift Zoom State**
    - File: `components/breakdown/BreakdownContainer.tsx`
    - Inject these state variables at the top of the component:
      ```tsx
      const [zoom, setZoom] = useState(100);
      const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = 120;
      const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
      const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
      const handleZoomIn = () => setZoom(z => Math.min(z + 10, 250));
      const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));
      ```
    - Update the return block. Wrap the existing `flex-1 flex overflow-hidden` inside a new `<div className="flex-1 flex flex-col overflow-hidden bg-background relative">`.
    - Pass zoom props to ScriptViewer: `<ScriptViewer scriptLines={MOCK_SCRIPT_LINES} zoom={zoom} onZoomChange={setZoom} />`
    - Paste the exact same `h-14` bottom bar from Step 2 (containing Zoom, View Mode, Pagination) directly below the workspace div.

    **Step 4: Strip Local Zoom from Breakdown ScriptViewer**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Add `zoom: number; onZoomChange: (z: number) => void;` to the `Props` interface.
    - Remove the local `const [zoom, setZoom] = useState(100);` state.
    - Replace all internal `setZoom` calls with `onZoomChange`.
    - Delete the sticky floating zoom toolbar (`<div className="sticky top-4 left-4 z-50 w-0 h-0 overflow-visible">...</div>`).

    **Step 5: TagToolbar "Floating Up" Vertical Stack**
    - File: `components/breakdown/TagToolbar.tsx`
    - Refactor the component to position as a bottom-right FAB with a vertical stack.
    Replace the entire `return` block with this structure:
    ```tsx
    return (
      <div className="fixed bottom-6 right-80 z-[1] flex flex-col items-end">
        {!isCollapsed && (
          <div ref={toolbarRef} className="flex flex-col items-end gap-2 mb-4 animate-in slide-in-from-bottom-2 relative">
            {selectedTagForQty && (
              <div className="absolute right-full mr-4 bg-white shadow-2xl border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-[#424754] shrink-0">Qty</span>
                <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 h-8 text-center text-[13px] font-semibold border border-[#E5E7EB] rounded-lg outline-none focus:border-[#3B82F6] transition-colors" autoFocus />
                <button onClick={() => handleApply(selectedTagForQty)} className="h-8 w-8 flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg transition-colors cursor-pointer shrink-0">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
              </div>
            )}
            {TAG_CATEGORIES.map((category) => {
              const cfg = TAG_CONFIG[category];
              const isSelected = selectedTagForQty === category;
              return (
                <button key={category} onClick={() => handleTagButtonClick(category)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer ${HOVER_BG[category]} ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}`} style={{ backgroundColor: cfg.bgColor, borderColor: cfg.borderColor }}>
                  <span className="material-symbols-outlined text-[16px]" style={{ color: cfg.textColor, fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cfg.textColor }}>{SHORT_LABEL[category]}</span>
                </button>
              );
            })}
          </div>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-14 h-14 bg-white border border-[#E5E7EB] shadow-2xl rounded-full flex items-center justify-center hover:bg-[#F9FAFB] transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[24px] text-[#3B82F6]">
            {isCollapsed ? 'sell' : 'close'}
          </span>
        </button>
      </div>
    );
    ```

    **Step 6: WorkspaceHeader Export/Share/Settings Buttons**
    - File: `components/layout/WorkspaceHeader.tsx`
    - Locate the right-side actions container (`<div className="flex items-center gap-2">`).
    - Swap the `handleShareClick` button and the `handleExportClick` button so Share comes first.
    - Inject the Settings button next to Export:
      ```tsx
      <button onClick={() => router.push('/settings')} className="flex items-center justify-center bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] p-2 rounded-lg transition-colors cursor-pointer shrink-0">
        <span className="material-symbols-outlined text-[20px]">settings</span>
      </button>
      ```
  </task>
</system_prompt>