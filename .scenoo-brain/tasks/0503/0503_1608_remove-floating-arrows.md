<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to remove the redundant floating left/right navigation arrows from the single page canvas in the Line Script and Line Script Export modules. Users will rely entirely on the bottom bar for pagination.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Cleanup: Remove Floating Arrows from Line Script Modules.

    **Step 1: Update `ScriptWorkspace.tsx` Props & Render**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Remove `onPrevPage` and `onNextPage` from the `Props` interface and component signature.
    - Delete the `<div className="absolute inset-0 pointer-events-none z-50">` block containing the `chevron_left` and `chevron_right` buttons.

    Locate the `Props` interface:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      onCurrentPageChange: (page: number) => void;
      onPrevPage: () => void;
      onNextPage: () => void;
      zoom: number;
      onZoomChange: (z: number) => void;
      viewMode: 'single' | 'scroll';
    }
    ```
    Replace with:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      onCurrentPageChange: (page: number) => void;
      zoom: number;
      onZoomChange: (z: number) => void;
      viewMode: 'single' | 'scroll';
    }
    ```

    Locate the component signature:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      onCurrentPageChange,
      onPrevPage,
      onNextPage,
      zoom,
      onZoomChange,
      viewMode,
    }: Props) {
    ```
    Replace with:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      onCurrentPageChange,
      zoom,
      onZoomChange,
      viewMode,
    }: Props) {
    ```

    Locate the beginning of the `return` block containing the arrows:
    ```tsx
      return (
        <div className="w-full h-full flex flex-col relative overflow-hidden">
          {viewMode === 'single' && (
            <div className="absolute inset-0 pointer-events-none z-50">
              <button
                onClick={onPrevPage}
                disabled={disablePrev}
                className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              </button>
              <button
                onClick={onNextPage}
                disabled={disableNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </button>
            </div>
          )}

          <div
            ref={scrollContainerRef}
    ```
    Replace with:
    ```tsx
      return (
        <div className="w-full h-full flex flex-col relative overflow-hidden">
          <div
            ref={scrollContainerRef}
    ```

    **Step 2: Update `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Remove `onPrevPage` and `onNextPage` props from the `<ScriptWorkspace />` component call.

    Locate the `<ScriptWorkspace>` call:
    ```tsx
            <ScriptWorkspace
              activeTool={activeTool}
              onToolChange={setActiveTool}
              currentPage={currentPage}
              totalPages={totalPages}
              onCurrentPageChange={setCurrentPage}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              zoom={zoom}
              onZoomChange={setZoom}
              viewMode={viewMode}
            />
    ```
    Replace with:
    ```tsx
            <ScriptWorkspace
              activeTool={activeTool}
              onToolChange={setActiveTool}
              currentPage={currentPage}
              totalPages={totalPages}
              onCurrentPageChange={setCurrentPage}
              zoom={zoom}
              onZoomChange={setZoom}
              viewMode={viewMode}
            />
    ```

    **Step 3: Clean up `linescript/export/page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Delete the `viewMode === 'single'` arrows block from the scaled content container.

    Locate this exact block inside the Footprint Wrapper (Scaled PDF Content):
    ```tsx
                {/* Scaled PDF Content */}
                <div style={{
                  position: 'absolute',
                  top: `max(40px, calc(50% - ${(contentH * (zoom / 100)) / 2}px))`,
                  left: `max(40px, calc(50% - ${(contentW * (zoom / 100)) / 2}px))`,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: '0 0',
                  width: `${contentW}px`,
                  height: `${contentH}px`,
                }}>
                  {viewMode === 'single' && (
                    <div className="absolute inset-0 pointer-events-none z-50">
                      <button onClick={handlePrevPage} disabled={disablePrev} className="absolute left-[-60px] top-[50vh] -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden">
                        <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                      </button>
                      <button onClick={handleNextPage} disabled={disableNext} className="absolute right-[-60px] top-[50vh] -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden">
                        <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                      </button>
                    </div>
                  )}
                  <LineScriptExportPreview viewMode={viewMode} currentPage={currentPage} totalPages={totalPages} />
                </div>
    ```
    Replace with:
    ```tsx
                {/* Scaled PDF Content */}
                <div style={{
                  position: 'absolute',
                  top: `max(40px, calc(50% - ${(contentH * (zoom / 100)) / 2}px))`,
                  left: `max(40px, calc(50% - ${(contentW * (zoom / 100)) / 2}px))`,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: '0 0',
                  width: `${contentW}px`,
                  height: `${contentH}px`,
                }}>
                  <LineScriptExportPreview viewMode={viewMode} currentPage={currentPage} totalPages={totalPages} />
                </div>
    ```
  </task>

  <constraints>
    - Ensure you only remove the arrow buttons and related props.
    - Do NOT remove `handlePrevPage`, `handleNextPage`, `disablePrev`, or `disableNext` variables from the components, as they are still functionally used by the bottom pagination bar.
  </constraints>
</system_prompt>