<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to clean up empty wrapper boxes (holders) left behind after removing the Share and Export buttons from the Breakdown and Line Script modules.
    CRITICAL: Use TARGETED REPLACEMENTS to remove the orphaned DOM nodes completely.
  </role>

  <task>
    Execute UI Cleanup: Remove Empty Action Wrappers.

    **Step 1: Clean up `LineScriptContainer.tsx` (Topbar)**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Locate the `w-80` wrapper div at the right side of the Topbar (it may be empty or contain commented code) and delete it.

    Locate this exact block (at the end of the Rich Text & Zoom Topbar wrapper):
    ```tsx
            {/* 3. Pagination */}
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
              <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
            </div>
          </div>

          {/* Right Actions (Share/Export) */}
          <div className="flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
            {/* (This may be empty or contain buttons) */}
          </div>
        </div>
    ```
    Replace with (removing the Right Actions div completely):
    ```tsx
            {/* 3. Pagination */}
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
              <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
            </div>
          </div>
        </div>
    ```

    **Step 2: Clean up `BreakdownSidebar.tsx`**
    - File: `components/breakdown/BreakdownSidebar.tsx`
    - Locate the orphaned Action buttons wrapper at the top of the `<aside>` and delete it.

    Locate this exact block:
    ```tsx
        <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-0 border-l-0 overflow-hidden'}`}>
          {/* Action buttons */}
          <div className="py-3 px-4 border-b border-[#E5E7EB] shrink-0">
            <div className="flex gap-2 w-full">
              {/* (This may be empty) */}
            </div>
          </div>
    ```
    Replace with:
    ```tsx
        <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-0 border-l-0 overflow-hidden'}`}>
    ```

    **Step 3: Clean up `LineScriptRightSidebar.tsx`**
    - File: `components/linescript/LineScriptRightSidebar.tsx`
    - Locate the orphaned Action Buttons wrapper at the top of the `<aside>` and delete it.

    Locate this exact block:
    ```tsx
        <aside className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`} >
          {/* Action Buttons */}
          <div className="py-3 px-4 border-b border-outline-variant shrink-0">
            <div className="flex gap-2 w-full">
              {/* (This may be empty) */}
            </div>
          </div>
    ```
    Replace with:
    ```tsx
        <aside className={`bg-surface-container-lowest border-l border-outline-variant transition-all duration-300 h-full flex flex-col ${isOpen ? 'w-80' : 'w-0 border-l-0 overflow-hidden'}`} >
    ```
  </task>
</system_prompt>