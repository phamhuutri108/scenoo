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
0502_0026_shotlist-full-safezone.md
0502_0303_report-helios-shotlist-zoom.md
0502_0304_shotlist-autofit-zoom-fix.md
0502_0305_shotlist-absolute-footprint.md
0502_0309_breakdown-export-helios-zoom.md
0502_1000_report-helios-export-autofit.md
0502_1003_hotfix-export-autofit-math.md
0502_1007_report-helios-export-colgroup.md
0502_1011_export-autofit-revert-math.md
0502-tasks-repomix.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0502_0026_shotlist-full-safezone.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to add top and left safe zones to the ShotlistTable to allow comfortable panning and zooming near the upper-left edges, treating the table as a free-floating document.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Add top and left padding to the safe zone wrapper.

    **Step 1: Update Safe Zone Padding**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Locate the safe zone wrapper `div` that currently only has `pb` and `pr`.
    - Add `pt-[15vh]` and `pl-[10vw]` to create space at the top and left. Add `shadow-sm` to the table so its borders remain clearly distinguishable from the safe zone background.

    Locate this exact block:
    ```tsx
            <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
              <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    ```

    Replace with:
    ```tsx
            <div className="w-max bg-surface-container-lowest pt-[15vh] pl-[10vw] pb-[50vh] pr-[30vw]">
              <table className="w-max bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0502_0303_report-helios-shotlist-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a massive "dead space" on the right side of the Shotlist table when zooming out, despite safe zone padding being reduced to 2vw.
    Your task is to write a highly technical diagnostic report identifying the CSS scale footprint mismatch and defining the architectural solution.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the phantom scroll space exists and define the architectural solution.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_0343_report-helios-shotlist-zoom.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_0304_shotlist-autofit-zoom-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the Helios Protocol. Your task is to resolve the phantom scroll space bug and implement dynamic auto-fitting zoom logic in the Shotlist table.
    CRITICAL: Use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute Hotfix: Dynamic Auto-Fit Zoom & Footprint Resolution.

    **Step 1: Inject Auto-Fit Logic and Restructure Zoom Bounds**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Calculate exact table width dynamically based on visible columns.
    - Implement a `ResizeObserver` to get accurate viewport dimensions.
    - Calculate `fitZoom` ensuring the scaled table perfectly matches viewport width.
    - Clamp the `handleGlobalWheel` logic so the user can NEVER zoom out past the `fitZoom` boundary.

    Locate this exact block at the top of the component:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const [zoom, setZoom] = useState(100);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
    ```
    Replace it up through the `items` declaration. Match this exactly:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      
      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(entries => {
          if (entries) {
            setContainerWidth(entries.contentRect.width);
          }
        });
        observer.observe(container);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? (containerWidth / (exactTableWidth + safeZonePx)) * 100 : 100;
      
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const prevVisibleColsStr = useRef<string | undefined>(undefined);

      useEffect(() => {
        if (containerWidth === 0) return;
        const currentColsStr = visibleCols?.join(',');
        
        if (prevVisibleColsStr.current === undefined || prevVisibleColsStr.current !== currentColsStr) {
          setZoom(fitZoom);
          prevVisibleColsStr.current = currentColsStr;
        } else if (zoom < fitZoom - 0.1) {
          setZoom(fitZoom);
        }
      }, [containerWidth, fitZoom, visibleCols, zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        setZoom(newScale * 100);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;
          
          e.preventDefault();
          
          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);
          
          const minScale = fitZoomRef.current / 100;
          newScale = Math.min(Math.max(newScale, minScale), 3.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const items: ProcessedItem[] = [];
    ```

    **Step 2: Clean up duplicate `activeCols` initialization**
    - Locate the mapping where `activeCols` used to be initialized mid-render.
    
    Locate this exact block:
    ```tsx
        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      let currentLeft = 0;
      const positionedCols = activeCols.map(c => {
    ```
    Replace with:
    ```tsx
        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      let currentLeft = 0;
      const positionedCols = activeCols.map(c => {
    ```

    **Step 3: Eradicate Phantom Scroll Space**
    - Per Helios Report, remove the toxic `calc()` footprint wrappers and add `w-max` so the post-transform bounding box tightly hugs the exact table width.
    
    Locate this exact block:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              width: `calc((100 / ${zoom}) * 100%)`, 
              height: `calc((100 / ${zoom}) * 100%)` 
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
    ```
    Replace with:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left w-max"
            style={{ 
              transform: `scale(${zoom / 100})`
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_0305_shotlist-absolute-footprint.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the Helios Protocol. Your task is to implement the "Absolute Footprint" pattern to permanently resolve the phantom scroll space bug on the Shotlist table.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Absolute Footprint & Exact Dimension Scaling.

    **Step 1: Update ResizeObserver to track exact table height**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Add `tableHeight` state and `tableRef`.
    - Observe both the scroll container and the table dynamically.
    - Fix the `fitZoom` formula to accurately subtract the safe zone before calculating the ratio.

    Locate this exact block at the top of the component:
    ```tsx
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(entries => {
          if (entries) {
            setContainerWidth(entries.contentRect.width);
          }
        });
        observer.observe(container);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? (containerWidth / (exactTableWidth + safeZonePx)) * 100 : 100;

      const fitZoomRef = useRef(fitZoom);
    ```
    
    Replace it EXACTLY with:
    ```tsx
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const [tableHeight, setTableHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const tableRef = useRef<HTMLTableElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const table = tableRef.current;
        if (!container || !table) return;

        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) {
              setContainerWidth(entry.contentRect.width);
            }
            if (entry.target === table) {
              setTableHeight(entry.contentRect.height);
            }
          }
        });
        observer.observe(container);
        observer.observe(table);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? ((containerWidth - safeZonePx) / exactTableWidth) * 100 : 100;

      const fitZoomRef = useRef(fitZoom);
    ```

    **Step 2: Restructure the DOM for decoupled layout vs. scale**
    - Wrap the scaled area in an explicit bounds box (`width/height` calculated via JS).
    - Set the scaled element to `position: absolute` so its unscaled dimensions do not trigger native scrollbars.
    
    Locate this exact block:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left w-max"
            style={{ 
              transform: `scale(${zoom / 100})`
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
              <table className="w-max bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
    ```

    Replace it EXACTLY with:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          {/* Explicit layout footprint wrapper per Helios Protocol */}
          <div
             style={{
               width: `calc(${exactTableWidth * (zoom / 100)}px + 4vw)`,
               height: `calc(${tableHeight * (zoom / 100)}px + 52vh)`,
               position: 'relative'
             }}
          >
            {/* Absolute positioning decouples scaled content from layout footprint */}
            <div
              style={{
                position: 'absolute',
                top: '2vw',
                left: '2vw',
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: `${exactTableWidth}px`
              }}
            >
              <table ref={tableRef} className="w-full bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_0309_breakdown-export-helios-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to inject the Helios Protocol "Absolute Footprint" zoom engine into the Breakdown Export view, perfectly matching the zero-phantom-space logic implemented in the Shotlist module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Sub-task: Absolute Footprint Zoom Engine for Export Module.

    **Step 1: Strip internal safe zones from `ExportPreviewTable.tsx`**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - The safe zone padding is now handled by the parent layout footprint wrapper.
    Locate:
    ```tsx
      return (
        <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
          <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
    ```
    Replace with:
    ```tsx
      return (
        <div className="w-max bg-white shadow-sm">
          <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
    ```

    **Step 2: Strip internal scrolling from `ExportPreviewSingle.tsx`**
    - File: `components/breakdown/ExportPreviewSingle.tsx`
    - Remove `overflow-y-auto` and background to prevent nested scroll conflicts.
    Locate:
    ```tsx
    export default function ExportPreviewSingle({ fontFamily = "font-sans", activeSceneId, onPrev, onNext, disablePrev, disableNext }: Props) {
      const sceneNumber = activeSceneId ? activeSceneId.replace(/\D/g, '') || '1' : '1';
      return (
        <div className="flex-1 overflow-y-auto bg-[#f9f9ff] flex justify-center items-start py-8 gap-8">
          <div className="sticky top-1/2 -translate-y-1/2 print:hidden shrink-0 mt-[400px]">
    ```
    Replace with:
    ```tsx
    export default function ExportPreviewSingle({ fontFamily = "font-sans", activeSceneId, onPrev, onNext, disablePrev, disableNext }: Props) {
      const sceneNumber = activeSceneId ? activeSceneId.replace(/\D/g, '') || '1' : '1';
      return (
        <div className="flex justify-center items-start gap-8 w-max">
          <div className="sticky top-[50vh] -translate-y-1/2 print:hidden shrink-0">
    ```

    **Step 3: Add `useCallback` to imports in `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Ensure `useCallback` is imported alongside `useState`, `useRef`, `useEffect`.

    **Step 4: Implement Absolute Footprint Zoom Engine in `page.tsx`**
    - Replace the hook block inside `ExportPageInner` to calculate the exact DOM footprint and execute the cursor-anchored zoom logic.

    Target 4A: Replace `ExportPageInner` top logic block.
    Locate exactly from `function ExportPageInner() {` down to the `handleNext` function:
    ```tsx
    function ExportPageInner() {
      const router = useRouter();
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat } = useExportFormat();
    ```
    *(And replace all hooks/state down to `handleNext`)*
    
    Replace with:
    ```tsx
    function ExportPageInner() {
      const router = useRouter();
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat, colWidths } = useExportFormat();

      const exactContentWidth = viewMode === 'all'
        ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
        : 794 + 128; // A4 width (794) + gap-8 arrows approximation

      const [containerWidth, setContainerWidth] = useState(0);
      const [contentHeight, setContentHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) setContainerWidth(entry.contentRect.width);
            if (entry.target === content) setContentHeight(entry.contentRect.height);
          }
        });
        observer.observe(container);
        observer.observe(content);
        return () => observer.disconnect();
      }, [viewMode]);

      const safeZoneX = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactContentWidth ? ((containerWidth - safeZoneX) / exactContentWidth) * 100 : 100;
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const prevViewMode = useRef(viewMode);
      useEffect(() => {
        if (containerWidth === 0) return;
        if (prevViewMode.current !== viewMode) {
          setZoom(fitZoom);
          prevViewMode.current = viewMode;
        } else if (zoom < fitZoom - 0.1) {
          setZoom(fitZoom);
        }
      }, [containerWidth, fitZoom, viewMode, zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        setZoom(newScale * 100);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);

          const minScale = fitZoomRef.current / 100;
          newScale = Math.min(Math.max(newScale, minScale), 3.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const handleToolbarZoom = (targetZoom: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        adjustZoom(targetZoom / 100, rect.left, rect.top);
      };

      const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);
      const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
      const [activeSceneId, setActiveSceneId] = useState('s1');
      const [selectedExportIds, setSelectedExportIds] = useState<Set<string>>(new Set(['s1']));

      const currentIndex = MOCK_SCENES.findIndex(s => s.id === activeSceneId);
      const disablePrev = currentIndex <= 0;
      const disableNext = currentIndex === -1 || currentIndex >= MOCK_SCENES.length - 1;

      const handlePrev = () => { if (!disablePrev) setActiveSceneId(MOCK_SCENES[currentIndex - 1].id); };
      const handleNext = () => { if (!disableNext) setActiveSceneId(MOCK_SCENES[currentIndex + 1].id); };
    ```

    Target 4B: Replace the Main Content area in the return statement.
    Locate:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef} 
              className="flex-1 overflow-auto touch-none custom-scrollbar" 
            >
    ```
    *(And replace down to the `{viewMode === 'single' && (` block)*

    Replace with:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-auto touch-none custom-scrollbar relative"
            >
              {/* Explicit layout footprint wrapper per Helios Protocol */}
              <div
                style={{
                  width: `calc(${exactContentWidth * (zoom / 100)}px + 4vw)`,
                  height: `calc(${contentHeight * (zoom / 100)}px + 52vh)`,
                  position: 'relative'
                }}
              >
                {/* Absolute positioning decouples scaled content from layout footprint */}
                <div
                  ref={contentRef}
                  style={{
                    position: 'absolute',
                    top: '2vw',
                    left: '2vw',
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: '0 0',
                    width: `${exactContentWidth}px`
                  }}
                >
                  {viewMode === 'all' ? (
                    <ExportPreviewTable fontFamily={fontFamily} />
                  ) : (
                    <ExportPreviewSingle
                      fontFamily={fontFamily}
                      activeSceneId={activeSceneId}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      disablePrev={disablePrev}
                      disableNext={disableNext}
                    />
                  )}
                </div>
              </div>
            </div>

            {viewMode === 'single' && (
    ```
  </task>

  <constraints>
    - Ensure exact targeted replacements are used to avoid deleting `MOCK_SCENES` or other layout pieces outside the target blocks.
  </constraints>
</system_prompt>
</file>

<file path="0502_1000_report-helios-export-autofit.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a slight horizontal overflow in the Breakdown Export "All Scenes" view because the auto-fit zoom calculation fails to perfectly match the screen width.
    Your task is to write a highly technical diagnostic report identifying the missing 40px ruler offset in the exactContentWidth equation and defining the architectural solution.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the auto-fit calculation produces a slightly oversized zoom level and define the mathematical fix.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_1758_report-helios-export-autofit.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_1003_hotfix-export-autofit-math.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to fix a mathematical omission in the Export auto-fit zoom logic where a 40px ruler offset was missing from the exact content width footprint calculation.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Add 40px offset to `exactContentWidth` calculation.

    **Step 1: Update exactContentWidth in Export page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Add `40 +` to the `viewMode === 'all'` branch to correctly account for the Left Ruler / Corner Block footprint.

    Locate this exact block:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```

    Replace with:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? 40 + Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0502_1007_report-helios-export-colgroup.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a phantom horizontal scrollbar in the Breakdown Export "All Scenes" view because the CSS table layout engine is failing and the math offset was incorrect.
    Your task is to write a highly technical diagnostic report identifying the `colSpan` bug in `table-layout: fixed` and the wrapper sizing mismatch.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the table auto-layout fallback happens and define the architectural solution.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_1106_report-helios-export-colgroup.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_1011_export-autofit-revert-math.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing Phase 1 of the Helios Protocol fix. Your task is to revert the faulty math offset in the Export page's auto-fit calculation.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Remove 40px offset from `exactContentWidth` calculation.

    **Step 1: Revert exactContentWidth in Export page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Remove `40 + ` from the `viewMode === 'all'` branch to strictly match the 17-column data footprint.

    Locate this exact block:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? 40 + Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```

    Replace with:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
[prompt kỹ thuật cho file 0502_1712_export-table-colgroup.md]
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing Phase 2 of the Helios Protocol fix. Your task is to enforce strict CSS table layout by injecting a `<colgroup>` and removing an orphaned `<th>` element.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Inject `<colgroup>` and clean up table headers.

    **Step 1: Inject `<colgroup>` below the `<table>` opening tag**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Map over `COLUMNS` to render a `<col>` for each column, explicitly setting its width from `colWidths`.

    Locate this exact block:
    ```tsx
          return (
            <div className="w-full bg-surface-container-lowest">
              <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
                <thead className="z-30">
    ```

    Replace with:
    ```tsx
          return (
            <div className="w-full bg-surface-container-lowest">
              <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
                <colgroup>
                  {COLUMNS.map((col, i) => (
                    <col key={col} style={{ width: colWidths[i] || 120 }} />
                  ))}
                </colgroup>
                <thead className="z-30">
    ```

    **Step 2: Remove the orphaned 18th `<th>`**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Locate the mapping of data headers and delete the empty `<th>` at the end.

    Locate this exact block:
    ```tsx
                      >
                        {col}
                      </th>
                    );
                  })}
                  <th className="border-none bg-transparent pointer-events-none"></th>
                </tr>
              </thead>
    ```

    Replace with:
    ```tsx
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502-tasks-repomix.md">
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
0502_0026_shotlist-full-safezone.md
0502_0303_report-helios-shotlist-zoom.md
0502_0304_shotlist-autofit-zoom-fix.md
0502_0305_shotlist-absolute-footprint.md
0502_0309_breakdown-export-helios-zoom.md
0502_1000_report-helios-export-autofit.md
0502_1003_hotfix-export-autofit-math.md
0502_1007_report-helios-export-colgroup.md
0502_1011_export-autofit-revert-math.md
0502_1015_helios-flexible-export-autofit-fix.md
0502_1048_breakdown-export-relative-zoom-and-report.md
0502_1109_breakdown-export-zoom-ui-fix.md
0502_1115_breakdown-export-single-autofit.md
0502_1120_breakdown-export-single-center.md
0502_1130_breakdown-export-fixed-arrows.md
0502_1143_breakdown-export-report-recouple.md
0502_1215_shotlist-feature-zoom-toolbar.md
0502_1225_shotlist-report-helios-zoom.md
0502_1435_linescript-topbar-alignment.md
0502_1513_linescript-helios-zoom.md
0502_1517_linescript-expand-canvas.md
0502_1612_linescript-view-modes.md
0502_1645_linescript-persistent-pagination.md
0502_1656_linescript-center-tools.md
0502_1704_linescript-export-actions-ui.md
0502_1735_linescript-export-helios-sync.md
0502_1800_breakdown-helios-zoom.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0502_0026_shotlist-full-safezone.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to add top and left safe zones to the ShotlistTable to allow comfortable panning and zooming near the upper-left edges, treating the table as a free-floating document.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Add top and left padding to the safe zone wrapper.

    **Step 1: Update Safe Zone Padding**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Locate the safe zone wrapper `div` that currently only has `pb` and `pr`.
    - Add `pt-[15vh]` and `pl-[10vw]` to create space at the top and left. Add `shadow-sm` to the table so its borders remain clearly distinguishable from the safe zone background.

    Locate this exact block:
    ```tsx
            <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
              <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    ```

    Replace with:
    ```tsx
            <div className="w-max bg-surface-container-lowest pt-[15vh] pl-[10vw] pb-[50vh] pr-[30vw]">
              <table className="w-max bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0502_0303_report-helios-shotlist-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a massive "dead space" on the right side of the Shotlist table when zooming out, despite safe zone padding being reduced to 2vw.
    Your task is to write a highly technical diagnostic report identifying the CSS scale footprint mismatch and defining the architectural solution.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the phantom scroll space exists and define the architectural solution.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_0343_report-helios-shotlist-zoom.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_0304_shotlist-autofit-zoom-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the Helios Protocol. Your task is to resolve the phantom scroll space bug and implement dynamic auto-fitting zoom logic in the Shotlist table.
    CRITICAL: Use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute Hotfix: Dynamic Auto-Fit Zoom & Footprint Resolution.

    **Step 1: Inject Auto-Fit Logic and Restructure Zoom Bounds**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Calculate exact table width dynamically based on visible columns.
    - Implement a `ResizeObserver` to get accurate viewport dimensions.
    - Calculate `fitZoom` ensuring the scaled table perfectly matches viewport width.
    - Clamp the `handleGlobalWheel` logic so the user can NEVER zoom out past the `fitZoom` boundary.

    Locate this exact block at the top of the component:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const [zoom, setZoom] = useState(100);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
    ```
    Replace it up through the `items` declaration. Match this exactly:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      
      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(entries => {
          if (entries) {
            setContainerWidth(entries.contentRect.width);
          }
        });
        observer.observe(container);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? (containerWidth / (exactTableWidth + safeZonePx)) * 100 : 100;
      
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const prevVisibleColsStr = useRef<string | undefined>(undefined);

      useEffect(() => {
        if (containerWidth === 0) return;
        const currentColsStr = visibleCols?.join(',');
        
        if (prevVisibleColsStr.current === undefined || prevVisibleColsStr.current !== currentColsStr) {
          setZoom(fitZoom);
          prevVisibleColsStr.current = currentColsStr;
        } else if (zoom < fitZoom - 0.1) {
          setZoom(fitZoom);
        }
      }, [containerWidth, fitZoom, visibleCols, zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        setZoom(newScale * 100);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;
          
          e.preventDefault();
          
          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);
          
          const minScale = fitZoomRef.current / 100;
          newScale = Math.min(Math.max(newScale, minScale), 3.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const items: ProcessedItem[] = [];
    ```

    **Step 2: Clean up duplicate `activeCols` initialization**
    - Locate the mapping where `activeCols` used to be initialized mid-render.
    
    Locate this exact block:
    ```tsx
        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      let currentLeft = 0;
      const positionedCols = activeCols.map(c => {
    ```
    Replace with:
    ```tsx
        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      let currentLeft = 0;
      const positionedCols = activeCols.map(c => {
    ```

    **Step 3: Eradicate Phantom Scroll Space**
    - Per Helios Report, remove the toxic `calc()` footprint wrappers and add `w-max` so the post-transform bounding box tightly hugs the exact table width.
    
    Locate this exact block:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left"
            style={{ 
              transform: `scale(${zoom / 100})`, 
              width: `calc((100 / ${zoom}) * 100%)`, 
              height: `calc((100 / ${zoom}) * 100%)` 
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
    ```
    Replace with:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left w-max"
            style={{ 
              transform: `scale(${zoom / 100})`
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_0305_shotlist-absolute-footprint.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the Helios Protocol. Your task is to implement the "Absolute Footprint" pattern to permanently resolve the phantom scroll space bug on the Shotlist table.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Absolute Footprint & Exact Dimension Scaling.

    **Step 1: Update ResizeObserver to track exact table height**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Add `tableHeight` state and `tableRef`.
    - Observe both the scroll container and the table dynamically.
    - Fix the `fitZoom` formula to accurately subtract the safe zone before calculating the ratio.

    Locate this exact block at the top of the component:
    ```tsx
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(entries => {
          if (entries) {
            setContainerWidth(entries.contentRect.width);
          }
        });
        observer.observe(container);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? (containerWidth / (exactTableWidth + safeZonePx)) * 100 : 100;

      const fitZoomRef = useRef(fitZoom);
    ```
    
    Replace it EXACTLY with:
    ```tsx
      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      const exactTableWidth = activeCols.reduce((sum, c) => sum + c.width, 0);

      const [containerWidth, setContainerWidth] = useState(0);
      const [tableHeight, setTableHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const tableRef = useRef<HTMLTableElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const table = tableRef.current;
        if (!container || !table) return;

        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) {
              setContainerWidth(entry.contentRect.width);
            }
            if (entry.target === table) {
              setTableHeight(entry.contentRect.height);
            }
          }
        });
        observer.observe(container);
        observer.observe(table);
        return () => observer.disconnect();
      }, []);

      const safeZonePx = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactTableWidth ? ((containerWidth - safeZonePx) / exactTableWidth) * 100 : 100;

      const fitZoomRef = useRef(fitZoom);
    ```

    **Step 2: Restructure the DOM for decoupled layout vs. scale**
    - Wrap the scaled area in an explicit bounds box (`width/height` calculated via JS).
    - Set the scaled element to `position: absolute` so its unscaled dimensions do not trigger native scrollbars.
    
    Locate this exact block:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          <div 
            className="origin-top-left w-max"
            style={{ 
              transform: `scale(${zoom / 100})`
            }}
          >
            <div className="w-max bg-transparent pt-[2vw] pl-[2vw] pb-[50vh] pr-[2vw]">
              <table className="w-max bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
    ```

    Replace it EXACTLY with:
    ```tsx
      return (
        <div 
          ref={scrollContainerRef}
          className="w-full h-full overflow-auto custom-scrollbar bg-[#f9f9ff] relative touch-none"
        >
          {/* Explicit layout footprint wrapper per Helios Protocol */}
          <div
             style={{
               width: `calc(${exactTableWidth * (zoom / 100)}px + 4vw)`,
               height: `calc(${tableHeight * (zoom / 100)}px + 52vh)`,
               position: 'relative'
             }}
          >
            {/* Absolute positioning decouples scaled content from layout footprint */}
            <div
              style={{
                position: 'absolute',
                top: '2vw',
                left: '2vw',
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: `${exactTableWidth}px`
              }}
            >
              <table ref={tableRef} className="w-full bg-white shadow-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_0309_breakdown-export-helios-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to inject the Helios Protocol "Absolute Footprint" zoom engine into the Breakdown Export view, perfectly matching the zero-phantom-space logic implemented in the Shotlist module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Sub-task: Absolute Footprint Zoom Engine for Export Module.

    **Step 1: Strip internal safe zones from `ExportPreviewTable.tsx`**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - The safe zone padding is now handled by the parent layout footprint wrapper.
    Locate:
    ```tsx
      return (
        <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
          <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
    ```
    Replace with:
    ```tsx
      return (
        <div className="w-max bg-white shadow-sm">
          <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
    ```

    **Step 2: Strip internal scrolling from `ExportPreviewSingle.tsx`**
    - File: `components/breakdown/ExportPreviewSingle.tsx`
    - Remove `overflow-y-auto` and background to prevent nested scroll conflicts.
    Locate:
    ```tsx
    export default function ExportPreviewSingle({ fontFamily = "font-sans", activeSceneId, onPrev, onNext, disablePrev, disableNext }: Props) {
      const sceneNumber = activeSceneId ? activeSceneId.replace(/\D/g, '') || '1' : '1';
      return (
        <div className="flex-1 overflow-y-auto bg-[#f9f9ff] flex justify-center items-start py-8 gap-8">
          <div className="sticky top-1/2 -translate-y-1/2 print:hidden shrink-0 mt-[400px]">
    ```
    Replace with:
    ```tsx
    export default function ExportPreviewSingle({ fontFamily = "font-sans", activeSceneId, onPrev, onNext, disablePrev, disableNext }: Props) {
      const sceneNumber = activeSceneId ? activeSceneId.replace(/\D/g, '') || '1' : '1';
      return (
        <div className="flex justify-center items-start gap-8 w-max">
          <div className="sticky top-[50vh] -translate-y-1/2 print:hidden shrink-0">
    ```

    **Step 3: Add `useCallback` to imports in `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Ensure `useCallback` is imported alongside `useState`, `useRef`, `useEffect`.

    **Step 4: Implement Absolute Footprint Zoom Engine in `page.tsx`**
    - Replace the hook block inside `ExportPageInner` to calculate the exact DOM footprint and execute the cursor-anchored zoom logic.

    Target 4A: Replace `ExportPageInner` top logic block.
    Locate exactly from `function ExportPageInner() {` down to the `handleNext` function:
    ```tsx
    function ExportPageInner() {
      const router = useRouter();
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat } = useExportFormat();
    ```
    *(And replace all hooks/state down to `handleNext`)*
    
    Replace with:
    ```tsx
    function ExportPageInner() {
      const router = useRouter();
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat, colWidths } = useExportFormat();

      const exactContentWidth = viewMode === 'all'
        ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
        : 794 + 128; // A4 width (794) + gap-8 arrows approximation

      const [containerWidth, setContainerWidth] = useState(0);
      const [contentHeight, setContentHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) setContainerWidth(entry.contentRect.width);
            if (entry.target === content) setContentHeight(entry.contentRect.height);
          }
        });
        observer.observe(container);
        observer.observe(content);
        return () => observer.disconnect();
      }, [viewMode]);

      const safeZoneX = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactContentWidth ? ((containerWidth - safeZoneX) / exactContentWidth) * 100 : 100;
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

      const prevViewMode = useRef(viewMode);
      useEffect(() => {
        if (containerWidth === 0) return;
        if (prevViewMode.current !== viewMode) {
          setZoom(fitZoom);
          prevViewMode.current = viewMode;
        } else if (zoom < fitZoom - 0.1) {
          setZoom(fitZoom);
        }
      }, [containerWidth, fitZoom, viewMode, zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        setZoom(newScale * 100);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);

          const minScale = fitZoomRef.current / 100;
          newScale = Math.min(Math.max(newScale, minScale), 3.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const handleToolbarZoom = (targetZoom: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        adjustZoom(targetZoom / 100, rect.left, rect.top);
      };

      const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);
      const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
      const [activeSceneId, setActiveSceneId] = useState('s1');
      const [selectedExportIds, setSelectedExportIds] = useState<Set<string>>(new Set(['s1']));

      const currentIndex = MOCK_SCENES.findIndex(s => s.id === activeSceneId);
      const disablePrev = currentIndex <= 0;
      const disableNext = currentIndex === -1 || currentIndex >= MOCK_SCENES.length - 1;

      const handlePrev = () => { if (!disablePrev) setActiveSceneId(MOCK_SCENES[currentIndex - 1].id); };
      const handleNext = () => { if (!disableNext) setActiveSceneId(MOCK_SCENES[currentIndex + 1].id); };
    ```

    Target 4B: Replace the Main Content area in the return statement.
    Locate:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef} 
              className="flex-1 overflow-auto touch-none custom-scrollbar" 
            >
    ```
    *(And replace down to the `{viewMode === 'single' && (` block)*

    Replace with:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-auto touch-none custom-scrollbar relative"
            >
              {/* Explicit layout footprint wrapper per Helios Protocol */}
              <div
                style={{
                  width: `calc(${exactContentWidth * (zoom / 100)}px + 4vw)`,
                  height: `calc(${contentHeight * (zoom / 100)}px + 52vh)`,
                  position: 'relative'
                }}
              >
                {/* Absolute positioning decouples scaled content from layout footprint */}
                <div
                  ref={contentRef}
                  style={{
                    position: 'absolute',
                    top: '2vw',
                    left: '2vw',
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: '0 0',
                    width: `${exactContentWidth}px`
                  }}
                >
                  {viewMode === 'all' ? (
                    <ExportPreviewTable fontFamily={fontFamily} />
                  ) : (
                    <ExportPreviewSingle
                      fontFamily={fontFamily}
                      activeSceneId={activeSceneId}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      disablePrev={disablePrev}
                      disableNext={disableNext}
                    />
                  )}
                </div>
              </div>
            </div>

            {viewMode === 'single' && (
    ```
  </task>

  <constraints>
    - Ensure exact targeted replacements are used to avoid deleting `MOCK_SCENES` or other layout pieces outside the target blocks.
  </constraints>
</system_prompt>
</file>

<file path="0502_1000_report-helios-export-autofit.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a slight horizontal overflow in the Breakdown Export "All Scenes" view because the auto-fit zoom calculation fails to perfectly match the screen width.
    Your task is to write a highly technical diagnostic report identifying the missing 40px ruler offset in the exactContentWidth equation and defining the architectural solution.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the auto-fit calculation produces a slightly oversized zoom level and define the mathematical fix.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_1758_report-helios-export-autofit.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_1003_hotfix-export-autofit-math.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to fix a mathematical omission in the Export auto-fit zoom logic where a 40px ruler offset was missing from the exact content width footprint calculation.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Add 40px offset to `exactContentWidth` calculation.

    **Step 1: Update exactContentWidth in Export page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Add `40 +` to the `viewMode === 'all'` branch to correctly account for the Left Ruler / Corner Block footprint.

    Locate this exact block:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```

    Replace with:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? 40 + Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0502_1007_report-helios-export-colgroup.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The user is experiencing a phantom horizontal scrollbar in the Breakdown Export "All Scenes" view because the CSS table layout engine is failing and the math offset was incorrect.
    Your task is to write a highly technical diagnostic report identifying the `colSpan` bug in `table-layout: fixed` and the wrapper sizing mismatch.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the table auto-layout fallback happens and define the architectural solution.
  </helios_directive>

  <task>
    Create file: `.scenoo-brain/reports/0502/0502_1106_report-helios-export-colgroup.md`
    
    Populate it with this exact content:
    ```md
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
    ```
  </task>

  <constraints>
    - Output ONLY the markdown file creation block. Do not modify other code.
  </constraints>
</system_prompt>
</file>

<file path="0502_1011_export-autofit-revert-math.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing Phase 1 of the Helios Protocol fix. Your task is to revert the faulty math offset in the Export page's auto-fit calculation.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Remove 40px offset from `exactContentWidth` calculation.

    **Step 1: Revert exactContentWidth in Export page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Remove `40 + ` from the `viewMode === 'all'` branch to strictly match the 17-column data footprint.

    Locate this exact block:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? 40 + Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```

    Replace with:
    ```tsx
          const exactContentWidth = viewMode === 'all'
            ? Array.from({ length: 17 }).reduce((sum, _, i) => sum + (colWidths[i] || 120), 0)
            : 794 + 128; // A4 width (794) + gap-8 arrows approximation
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
[prompt kỹ thuật cho file 0502_1712_export-table-colgroup.md]
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing Phase 2 of the Helios Protocol fix. Your task is to enforce strict CSS table layout by injecting a `<colgroup>` and removing an orphaned `<th>` element.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Inject `<colgroup>` and clean up table headers.

    **Step 1: Inject `<colgroup>` below the `<table>` opening tag**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Map over `COLUMNS` to render a `<col>` for each column, explicitly setting its width from `colWidths`.

    Locate this exact block:
    ```tsx
          return (
            <div className="w-full bg-surface-container-lowest">
              <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
                <thead className="z-30">
    ```

    Replace with:
    ```tsx
          return (
            <div className="w-full bg-surface-container-lowest">
              <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
                <colgroup>
                  {COLUMNS.map((col, i) => (
                    <col key={col} style={{ width: colWidths[i] || 120 }} />
                  ))}
                </colgroup>
                <thead className="z-30">
    ```

    **Step 2: Remove the orphaned 18th `<th>`**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Locate the mapping of data headers and delete the empty `<th>` at the end.

    Locate this exact block:
    ```tsx
                      >
                        {col}
                      </th>
                    );
                  })}
                  <th className="border-none bg-transparent pointer-events-none"></th>
                </tr>
              </thead>
    ```

    Replace with:
    ```tsx
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_1015_helios-flexible-export-autofit-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect and an Expert Bug Hunter. Your task is to diagnose and fix a persistent phantom horizontal scrollbar issue in the "All Scenes" Export view.
    You must dynamically analyze the root cause instead of relying on a pre-defined hardcoded fix.
  </role>

  <symptoms>
    - On initial load in `viewMode === 'all'`, the table scales down to fit the screen (`fitZoom` logic is working).
    - However, a slight horizontal scrollbar remains. The scaled content footprint (or its wrapper) is slightly wider than the computed target boundary.
    - We recently extracted the rulers (Decoupled Rulers architecture) and injected a `<colgroup>`. The `exactContentWidth` in `page.tsx` is currently just the sum of the 17 `colWidths`.
    - There is a mismatch between the mathematical `exactContentWidth` used in `page.tsx` for the zoom footprint wrapper and the ACTUAL rendered DOM width of the `<ExportPreviewTable>`.
  </symptoms>

  <task>
    Execute a flexible bug hunt and fix the layout footprint mismatch.

    **Step 1: Analyze `app/(workspace)/.../breakdown/export/page.tsx` and `components/breakdown/ExportPreviewTable.tsx`**
    - Look for accumulated CSS border widths (e.g., 17 columns * 1px borders under `border-collapse`), paddings, or rogue `min-w` classes that make the physical table wider than the sum of `colWidths`.
    - Look at the scale footprint wrapper in `page.tsx`: `width: calc(${exactContentWidth * (zoom / 100)}px + 4vw)`. Ensure the math strictly aligns with the actual table rendering.

    **Step 2: Generate the Fix**
    - Apply the necessary CSS or mathematical adjustments to perfectly sync the table's physical width with the `exactContentWidth` calculation.
    - Output ONLY the TARGETED REPLACEMENTS for the blocks that need fixing.
  </task>

  <strict_guardrails>
    - DO NOT modify the `adjustZoom`, `handleGlobalWheel`, or `handleToolbarZoom` logic. The cursor-anchored logarithmic zoom math is perfect and untouchable.
    - DO NOT break the Decoupled Rulers architecture (`syncRulers`, `topRulerRef`, `leftRulerRef`).
    - DO NOT remove `position: absolute` or `transform: scale(...)` from the visual content wrapper.
    - DO NOT mess with the design tokens or inject arbitrary hardcoded colors/spacing unrelated to this specific footprint width bug.
  </strict_guardrails>
</system_prompt>
</file>

<file path="0502_1048_breakdown-export-relative-zoom-and-report.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to overhaul the Breakdown Export module by introducing "Relative Zoom" math (clamping 100% to 250%), removing font selection, and building a new Breakdown Report view.
  </role>

  <task>
    Execute Sub-task: Relative Zoom, Clean UI, and Breakdown Report.

    **Step 1: Export Data for the Report**
    - File: `components/breakdown/ExportPreviewTable.tsx`
    - Add `export` to `MOCK_DATA` so it can be consumed by the new report component.
    - Remove the `fontFamily` prop entirely from this component and `components/breakdown/ExportPreviewSingle.tsx`.

    **Step 2: Create BreakdownExportReport Component**
    - Create a new file: `components/breakdown/BreakdownExportReport.tsx`
    - Build a dashboard mirroring `ShotlistReport.tsx` with cards for: Total Scenes, INT/EXT Stats, D/N Stats, Location Stats, and Cast Frequency (split Cast strings by comma).
    
    Code for `BreakdownExportReport.tsx`:
    ```tsx
    'use client';
    import { useMemo } from 'react';

    interface Props { data: Record<string, string>[]; }

    export default function BreakdownExportReport({ data }: Props) {
      const stats = useMemo(() => {
        const countFreq = (arr: string[]) => {
          const counts: Record<string, number> = {};
          arr.forEach(a => { const key = a?.trim(); if (key) counts[key] = (counts[key] || 0) + 1; });
          return Object.entries(counts).sort((a, b) => b[1] - a[1]);
        };
        const splitCount = (arr: string[]) => {
          const split = arr.flatMap(a => a.split(',').map(s => s.trim()).filter(Boolean));
          return countFreq(split);
        };

        const uniqueScenes = new Set(data.map(r => r['SCENE']).filter(Boolean));

        return {
          totalScenes: uniqueScenes.size,
          ieStats: countFreq(data.map(r => r['I/E'])),
          dnStats: countFreq(data.map(r => r['D/N'])),
          locStats: countFreq(data.map(r => r['LOCATION NAME'])),
          castStats: splitCount(data.map(r => r['CAST'])),
        };
      }, [data]);

      const renderCard = (title: string, entries: [string, number][]) => (
        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm flex flex-col h-64">
          <h3 className="text-label-md font-bold text-on-surface uppercase mb-4 pb-2 border-b border-outline-variant/50 shrink-0">{title}</h3>
          <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
            {entries.map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-body-md text-on-surface-variant truncate pr-4" title={k}>{k}</span>
                <span className="font-mono text-label-sm bg-surface-container px-2 py-0.5 rounded text-secondary shrink-0">{v}</span>
              </div>
            ))}
            {entries.length === 0 && <div className="text-body-md text-outline italic">No data</div>}
          </div>
        </div>
      );

      return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#f9f9ff] p-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-h1 text-on-surface">Breakdown Report</h1>
              <div className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-center shadow-sm min-w-32">
                <div className="text-[10px] uppercase font-bold text-outline">Total Scenes</div>
                <div className="text-h2 text-primary">{stats.totalScenes}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {renderCard('Locations', stats.locStats)}
              {renderCard('Cast Frequency', stats.castStats)}
              {renderCard('INT / EXT', stats.ieStats)}
              {renderCard('Day / Night', stats.dnStats)}
            </div>
          </div>
        </div>
      );
    }
    ```

    **Step 3: Implement Relative Zoom & Update Toolbar**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Remove `fontFamily` state entirely.
    - Update `viewMode` state type to `<'all' | 'single' | 'report'>`.
    - Modify the `handleGlobalWheel` min/max bounds: `minScale = fitZoomRef.current / 100` and `maxScale = (fitZoomRef.current * 2.5) / 100`. (This enforces 100% to 250% relative limits).
    - Import `BreakdownExportReport` and `MOCK_DATA` from `ExportPreviewTable`. 
    - Replace the `<select>` zoom control and font selector with a custom Relative Zoom controller:
      `const relativeZoom = Math.round((zoom / fitZoom) * 100) || 100;`
      Add `-` and `+` buttons that step the zoom by `fitZoom * 0.1` (10% relative steps) without exceeding bounds.
    - Add the "Report" button to the View Mode toggle group.
    - In the JSX body, conditionally render `<BreakdownExportReport data={MOCK_DATA} />` when `viewMode === 'report'`.
  </task>

  <strict_guardrails>
    - DO NOT change the core `adjustZoom` cursor-anchored logic, just change the `minScale` and `maxScale` clamping logic.
    - Ensure `fitZoom` is visually represented as "100%" to the user, and the hard cap is exactly 2.5x of `fitZoom` (250%).
  </strict_guardrails>
</system_prompt>
</file>

<file path="0502_1109_breakdown-export-zoom-ui-fix.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to clean up the Relative Zoom controller UI in the Breakdown Export toolbar.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Clean up Zoom UI typography and remove redundant text.

    **Step 1: Fix Zoom Display UI**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Locate the zoom controller in the top action bar (the buttons for `-` and `+` and the percentage text span).
    - Remove the " of fit" text so it ONLY displays the percentage variable (e.g., `{relativeZoom}%`).
    - Enforce the design system's UI typography tokens on the text span: `text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center` to prevent it from inheriting monospace or incorrect styles.

    Look for the block that renders the zoom controls, similar to:
    `<span>{relativeZoom}% of fit</span>` (or whatever exact markup the previous AI generated).

    Replace it with the cleaned-up version. Ensure the minus and plus buttons retain their `onClick` math logic unchanged.

    Example of the corrected text node:
    `<span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{relativeZoom}%</span>`
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet for the zoom control UI block.
    - Do NOT modify the `adjustZoom`, `handleGlobalWheel`, or the actual zooming math logic.
  </constraints>
</system_prompt>
</file>

<file path="0502_1115_breakdown-export-single-autofit.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to update the auto-fit zoom logic in the Breakdown Export module so that "Single Scene" mode fits the document HEIGHT to the viewport, rather than its width.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Implement Height-Based Auto-Fit for Single Scene View.

    **Step 1: Track container height and update fitZoom formula**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Update the `ResizeObserver` to track `containerHeight` alongside `containerWidth`.
    - Make the `fitZoom` formula conditional based on `viewMode`.
      - If `viewMode === 'all'`, fit to `containerWidth` vs `exactContentWidth`.
      - If `viewMode === 'single'`, fit to `containerHeight` vs `1187` (A4 layout height 1123px + 64px top/bottom gap).

    Locate this exact block:
    ```tsx
      const [containerWidth, setContainerWidth] = useState(0);
      const [contentHeight, setContentHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) setContainerWidth(entry.contentRect.width);
            if (entry.target === content) setContentHeight(entry.contentRect.height);
          }
        });
        observer.observe(container);
        observer.observe(content);
        return () => observer.disconnect();
      }, [viewMode]);

      const safeZoneX = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const fitZoom = containerWidth && exactContentWidth ? ((containerWidth - safeZoneX) / exactContentWidth) * 100 : 100;
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;
    ```

    Replace with:
    ```tsx
      const [containerWidth, setContainerWidth] = useState(0);
      const [containerHeight, setContainerHeight] = useState(0);
      const [contentHeight, setContentHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target === container) {
              setContainerWidth(entry.contentRect.width);
              setContainerHeight(entry.contentRect.height);
            }
            if (entry.target === content) setContentHeight(entry.contentRect.height);
          }
        });
        observer.observe(container);
        observer.observe(content);
        return () => observer.disconnect();
      }, [viewMode]);

      const safeZoneX = typeof window !== 'undefined' ? window.innerWidth * 0.04 : 0;
      const safeZoneY = typeof window !== 'undefined' ? window.innerHeight * 0.04 : 0;

      let fitZoom = 100;
      if (viewMode === 'all' && containerWidth && exactContentWidth) {
        fitZoom = ((containerWidth - safeZoneX) / exactContentWidth) * 100;
      } else if (viewMode === 'single' && containerHeight) {
        fitZoom = ((containerHeight - safeZoneY) / 1187) * 100; // A4 height (1123px) + vertical padding buffer (64px)
      }

      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
    - Do not modify the rest of the zoom math or the wheel handler.
  </constraints>
</system_prompt>
</file>

<file path="0502_1120_breakdown-export-single-center.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to extract the navigation arrows out of the scalable container and implement dynamic centering for the Single Scene PDF document.
  </role>

  <task>
    **Step 1: Simplify `ExportPreviewSingle.tsx`**
    - File: `components/breakdown/ExportPreviewSingle.tsx`
    - Remove `onPrev`, `onNext`, `disablePrev`, `disableNext` from the `Props` interface and component signature.
    - Delete the outer `<div className="flex justify-center items-start gap-8 w-max">` wrapper entirely, along with the two `<button>` wrappers for the chevrons.
    - Return ONLY the inner A4 `div` (the one with `width: "794px"`, `minHeight: "1123px"`) as the root element of this component.

    **Step 2: Update `page.tsx` exactContentWidth**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Update the `exactContentWidth` calculation. Remove the `+ 128` gap compensation for the `single` view branch, making it exactly `794`.
      *(e.g., `viewMode === 'single' ? 794 : ...`)*

    **Step 3: Extract Arrows & Center PDF in `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Locate the `Main Content` wrapper (`<div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">`).
    - Inside this wrapper, but OUTSIDE the `scrollContainerRef`, inject the fixed navigation arrows for Single Scene mode:
      ```tsx
      {viewMode === 'single' && (
        <>
          <button onClick={handlePrev} disabled={disablePrev} className="absolute left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden">
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button onClick={handleNext} disabled={disableNext} className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden">
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </>
      )}
      ```
    - Find the explicit Layout Footprint wrapper (the one with `width: ... + horizontalSafeZone`). Add `minWidth: '100%'` to its inline styles so it always spans the viewport.
    - Find the `contentRef` wrapper (the one with `position: 'absolute'` and `transform: scale(...)`). Update its `left` style to strictly center the content conditionally:
      `left: viewMode === 'single' ? \`max(\${viewportInsetX}px, calc(50% - \${(exactContentWidth * (zoom / 100)) / 2}px))\` : \`\${viewportInsetX}px\``
      *(Note: Use whatever safe-zone variable is currently defined in the file, like `viewportInsetX` or `safeZoneX`).*
    - Remove the `onPrev`, `onNext`, `disablePrev`, `disableNext` props from the `<ExportPreviewSingle />` instantiation.
  </task>

  <constraints>
    - Do NOT break the existing `fitZoom` math or the logarithmic zoom wheel event.
    - Only output the targeted replacement blocks for both files.
  </constraints>
</system_prompt>
</file>

<file path="0502_1130_breakdown-export-fixed-arrows.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to extract the Single Scene navigation arrows into an isolated, non-scrollable overlay layer to prevent them from drifting during zoom/scroll interactions.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Decouple Navigation Arrows from Scroll Context.

    **Step 1: Locate and remove the existing arrows**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Search for the existing `<button onClick={handlePrev} ...>` and `<button onClick={handleNext} ...>` elements. They might be sitting inside the `Main Content` div or near the `scrollContainerRef`.
    - Completely delete those existing button elements from their current location to avoid duplication.

    **Step 2: Inject the Isolated Overlay Layer**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Locate the `Main Content` root wrapper:
      `<div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">`
    - Just INSIDE this wrapper, before or after the `scrollContainerRef` div, inject the new overlay layer.

    Target exact replacement block:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
    ```

    Replace with:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Navigation Overlay - Immune to scroll/zoom */}
            {viewMode === 'single' && (
              <div className="absolute inset-0 pointer-events-none z-[1]">
                <button 
                  onClick={handlePrev} 
                  disabled={disablePrev} 
                  className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>
                <button 
                  onClick={handleNext} 
                  disabled={disableNext} 
                  className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto w-12 h-12 bg-white border border-outline-variant shadow-lg rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer print:hidden"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>
              </div>
            )}
            
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
    ```
  </task>

  <constraints>
    - You MUST ensure the old buttons are deleted from the JSX so they do not duplicate.
    - Do NOT modify the `adjustZoom`, `fitZoom`, or `handleGlobalWheel` math.
  </constraints>
</system_prompt>
</file>

<file path="0502_1143_breakdown-export-report-recouple.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. The user has decided to REVERT the decoupling of the Breakdown Report. They want it placed BACK INSIDE the scalable canvas, but treated as a fixed-dimension "slide" (1200x800) that automatically scales to fit the viewport HEIGHT at 100% zoom.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Recouple Report into Canvas & Apply Height Auto-Fit.

    **Status: COMPLETE** — Executed at 2026-05-02 11:48:45 (VN Time)

    **Step 1: Restore Main Content Wrapper**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Remove the `viewMode === 'report' ? (...) : (...)` conditional split at the top of the `Main Content` block that was added in the previous step.
    - Ensure the `Canvas Area Wrapper` and `scrollContainerRef` are ALWAYS rendered as the root of the main content area.

    **Step 2: Update Dimensions and Auto-Fit Math**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Update `exactContentWidth` to return 1200 when in report mode.
    - Update `fitZoom` to scale based on 800px height when in report mode.

    Locate the dimension variables and add the report branch:
    ```tsx
      const exactContentWidth = viewMode === 'all'
        ? Math.max(allScenesBaseWidth, measuredAllScenesWidth)
        : viewMode === 'single' ? 794 : 1200; // Force 1200px width for report slide
    ```
    
    Update the `fitZoom` calculation (adapt variables to whatever is in the file, e.g., `horizontalSafeZone` or `safeZoneX`):
    ```tsx
      let fitZoom = 100;
      if (viewMode === 'all' && containerWidth && exactContentWidth) {
        fitZoom = ((containerWidth - horizontalSafeZone) / exactContentWidth) * 100;
      } else if (viewMode === 'single' && containerHeight) {
        fitZoom = ((containerHeight - safeZoneY) / 1187) * 100;
      } else if (viewMode === 'report' && containerHeight) {
        fitZoom = ((containerHeight - safeZoneY) / 800) * 100; // 800px fixed height for report
      }
    ```

    **Step 3: Render Report Inside Content Ref**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`
    - Update the `left` style on `contentRef` to center the layout for `viewMode !== 'all'`.
    - Inside `contentRef`, conditionally render the 3 modes. Wrap the Report in a fixed size container.

    Replace the `contentRef` inner block:
    ```tsx
            {/* Absolute positioning decouples scaled content from layout footprint */}
            <div
              ref={contentRef}
              style={{
                position: 'absolute',
                top: '2vw',
                left: viewMode !== 'all' ? `max(${viewportInsetX}px, calc(50% - ${(exactContentWidth * (zoom / 100)) / 2}px))` : `${viewportInsetX}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: `${exactContentWidth}px`
              }}
            >
              {viewMode === 'all' && <ExportPreviewTable />}
              {viewMode === 'single' && <ExportPreviewSingle activeSceneId={activeSceneId} />}
              {viewMode === 'report' && (
                <div className="w-[1200px] h-[800px] border border-outline-variant shadow-[4px_4px_0_#bbb] shrink-0 mx-auto overflow-hidden">
                  <BreakdownExportReport data={MOCK_DATA} />
                </div>
              )}
            </div>
    ```

    **Step 4: Clean up closing tags**
    - Remove the trailing `)}` that previously closed the `viewMode === 'report' ?` ternary at the bottom of the canvas wrapper to fix the JSX syntax.
  </task>

  <results>
    - [x] exactContentWidth returns 1200px for report mode
    - [x] fitZoom scales based on 800px height for report mode
    - [x] contentRef centers layout for non-'all' modes using `viewMode !== 'all'`
    - [x] Report wrapped in fixed 1200x800 container with border and shadow
    - [x] Report rendered conditionally inside contentRef (no root-level rendering)
  </results>

  <constraints>
    - Ensure `BreakdownExportReport` is completely removed from the unscaled root level.
    - Do not break the `handleGlobalWheel` zoom math.
  </constraints>
</system_prompt>
</file>

<file path="0502_1215_shotlist-feature-zoom-toolbar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the Absolute Zoom Toolbar feature for the Shotlist module by hoisting the zoom state, while STRICTLY PRESERVING the current 100% scale rendering and footprint math.
  </role>

  <task>
    Implement Feature: Absolute Zoom Toolbar & Hoisted State.

    **Step 1: Hoist Zoom State & Inject Toolbar in `ShotlistContainer.tsx`**
    - File: `components/shotlist/ShotlistContainer.tsx`
    - Add `zoom` state initialized strictly to `100`.
    - Inject the zoom toolbar UI next to the search input, but ONLY when `viewMode === 'table'`.
    - Pass `zoom` and `onZoomChange={setZoom}` to the `<ShotlistTable>` component.

    Locate the state block:
    ```tsx
      const [viewMode, setViewMode] = useState<'table' | 'report'>('table');
      const [visibleCols, setVisibleCols] = useState<string[]>(ALL_COLUMN_KEYS.map(c => c.key));
      const [isColMenuOpen, setIsColMenuOpen] = useState(false);
      const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    ```
    Replace with:
    ```tsx
      const [viewMode, setViewMode] = useState<'table' | 'report'>('table');
      const [visibleCols, setVisibleCols] = useState<string[]>(ALL_COLUMN_KEYS.map(c => c.key));
      const [isColMenuOpen, setIsColMenuOpen] = useState(false);
      const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

      const [zoom, setZoom] = useState(100);
      const handleZoomOut = () => setZoom(z => Math.max(50, z - 10));
      const handleZoomIn = () => setZoom(z => Math.min(250, z + 10));
    ```

    Locate the toolbar render block:
    ```tsx
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shots, scenes, locations..."
                  className="pl-9 pr-4 py-2 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all outline-none"
                />
              </div>
              <ToolbarDivider />
    ```
    Replace with:
    ```tsx
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shots, scenes, locations..."
                  className="pl-9 pr-4 py-2 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all outline-none"
                />
              </div>
              <ToolbarDivider />

              {/* Zoom Controller */}
              {viewMode === 'table' && (
                <>
                  <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
                    <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
                    <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                  <ToolbarDivider />
                </>
              )}
    ```

    Locate the conditional table render inside `<div className="flex-1 overflow-hidden">`:
    ```tsx
            {viewMode === 'table' ? (
              <ShotlistTable rows={filteredShots} visibleCols={visibleCols} />
            ) : (
    ```
    Replace with:
    ```tsx
            {viewMode === 'table' ? (
              <ShotlistTable rows={filteredShots} visibleCols={visibleCols} zoom={zoom} onZoomChange={setZoom} />
            ) : (
    ```

    **Step 2: Sync Zoom Props in `ShotlistTable.tsx`**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Receive `zoom` and `onZoomChange` via props.
    - Remove local `zoom` state.
    - Implement the top-left anchored scroll sync to handle external toolbar clicks.

    Locate the interface block:
    ```tsx
    interface ShotlistTableProps {
      rows: ShotRow[];
      visibleCols?: string[];
    }
    ```
    Replace with:
    ```tsx
    interface ShotlistTableProps {
      rows: ShotRow[];
      visibleCols?: string[];
      zoom: number;
      onZoomChange: (z: number) => void;
    }
    ```

    Locate the local zoom state:
    ```tsx
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;
    ```
    Replace with:
    ```tsx
      const fitZoomRef = useRef(fitZoom);
      fitZoomRef.current = fitZoom;

      const zoomRef = useRef(zoom);
      zoomRef.current = zoom;
    ```

    Locate the `adjustZoom` and `handleGlobalWheel` block:
    ```tsx
      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        setZoom(newScale * 100);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);

          const minScale = fitZoomRef.current / 100;
          newScale = Math.min(Math.max(newScale, minScale), 3.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);
    ```
    Replace with:
    ```tsx
      // Sync external toolbar zoom changes (Top-Left anchored to prevent jumps)
      useEffect(() => {
        if (zoom !== zoomRef.current) {
          const container = scrollContainerRef.current;
          if (container) {
            const { scrollLeft, scrollTop } = container;
            const contentX = scrollLeft / (zoomRef.current / 100);
            const contentY = scrollTop / (zoomRef.current / 100);
            const newScale = zoom / 100;
            requestAnimationFrame(() => {
              container.scrollLeft = contentX * newScale;
              container.scrollTop = contentY * newScale;
            });
          }
          zoomRef.current = zoom;
        }
      }, [zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        const newZoom = Math.round(newScale * 100);
        zoomRef.current = newZoom;
        onZoomChange(newZoom);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, [onZoomChange]);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);

          // Absolute clamp from 50% to 250%
          newScale = Math.min(Math.max(newScale, 0.5), 2.5);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);
    ```
  </task>

  <strict_guardrails>
    - RULE 1: ABSOLUTE 100% DEFAULT. The table must initialize at exactly 100% scale without any auto-fit adjustments mutating the initial rendering. 
    - RULE 2: UNTOUCHABLE DOM/CSS. Do NOT modify the `return` JSX block. You must preserve the `style={{ width: \`calc(...)\` }}` layout footprint and `transform: \`scale(...)\`` completely unmodified.
    - Output ONLY the targeted replacement blocks provided in the task above.
  </strict_guardrails>
</system_prompt>
</file>

<file path="0502_1225_shotlist-report-helios-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to apply the Helios Zoom Protocol to the Shotlist Report view. The report must be a fixed 1200x920 canvas that defaults to 100% scale, perfectly fitting the screen HEIGHT.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Add Helios Zoom to Shotlist Report.

    **Step 1: Update `ShotlistContainer.tsx` to pass zoom props and show Toolbar**
    - File: `components/shotlist/ShotlistContainer.tsx`
    - Remove the `{viewMode === 'table' && (` condition wrapping the Zoom Controller so it shows in both table and report modes.
    - Pass `zoom={zoom}` and `onZoomChange={setZoom}` to `<ShotlistReport>`.

    Locate the zoom controller block:
    ```tsx
              {/* Zoom Controller */}
              {viewMode === 'table' && (
                <>
                  <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
                    <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
                    <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                  <ToolbarDivider />
                </>
              )}
    ```
    Replace with:
    ```tsx
              {/* Zoom Controller */}
              <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
                <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
                <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
              <ToolbarDivider />
    ```

    Locate the view mode render block:
    ```tsx
            {viewMode === 'table' ? (
              <ShotlistTable rows={filteredShots} visibleCols={visibleCols} zoom={zoom} onZoomChange={setZoom} />
            ) : (
              <ShotlistReport rows={filteredShots} />
            )}
    ```
    Replace with:
    ```tsx
            {viewMode === 'table' ? (
              <ShotlistTable rows={filteredShots} visibleCols={visibleCols} zoom={zoom} onZoomChange={setZoom} />
            ) : (
              <ShotlistReport rows={filteredShots} zoom={zoom} onZoomChange={setZoom} />
            )}
    ```

    **Step 2: Rebuild `ShotlistReport.tsx` with Helios Zoom Architecture**
    - File: `components/shotlist/ShotlistReport.tsx`
    - Accept `zoom` and `onZoomChange` props.
    - Implement the `scrollContainerRef`, `ResizeObserver`, and `handleGlobalWheel` logic.
    - Use `EXACT_WIDTH = 1200` and `EXACT_HEIGHT = 920`.
    - Make the internal grid `grid-cols-3` instead of responsive, since the width is fixed.
    
    Replace the ENTIRE file content with the following fully engineered version:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo, useState, useRef, useEffect, useCallback } from 'react';

    interface Props {
      rows: ShotRow[];
      zoom: number;
      onZoomChange: (z: number) => void;
    }

    const EXACT_WIDTH = 1200;
    const EXACT_HEIGHT = 920;

    export default function ShotlistReport({ rows, zoom, onZoomChange }: Props) {
      const stats = useMemo(() => {
        const countFreq = (arr: string[]) => {
          const counts: Record<string, number> = {};
          arr.forEach(a => {
            const key = a?.trim();
            if (key) counts[key] = (counts[key] || 0) + 1;
          });
          return Object.entries(counts).sort((a, b) => b[1] - a[1]);
        };

        const totalScriptTime = rows.reduce((acc, s) => {
          const parts = s.scriptTime.split(':');
          const mm = parseInt(parts, 10);
          const ss = parseInt(parts[1], 10);
          return acc + (mm || 0) * 60 + (ss || 0);
        }, 0);
        const totalMin = Math.floor(totalScriptTime / 60);
        const totalSec = totalScriptTime % 60;

        return {
          totalShots: rows.length,
          timeFormatted: `${String(totalMin).padStart(2, '0')}:${String(totalSec).padStart(2, '0')}`,
          locStats: countFreq(rows.map(r => r.location)),
          ieStats: countFreq(rows.map(r => r.intExt)),
          dnStats: countFreq(rows.map(r => r.dayNight)),
          sizeStats: countFreq(rows.map(r => r.shotSize)),
          typeStats: countFreq(rows.map(r => r.shotType)),
          angleStats: countFreq(rows.map(r => r.angle)),
          movStats: countFreq(rows.map(r => r.movement)),
          lensStats: countFreq(rows.map(r => r.lens)),
          subjStats: countFreq(rows.flatMap(r => r.subjects.split(',').map(s => s.trim()).filter(Boolean))),
        };
      }, [rows]);

      const [containerWidth, setContainerWidth] = useState(0);
      const [containerHeight, setContainerHeight] = useState(0);
      const scrollContainerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            setContainerWidth(entry.contentRect.width);
            setContainerHeight(entry.contentRect.height);
          }
        });
        observer.observe(container);
        return () => observer.disconnect();
      }, []);

      const viewportInsetY = typeof window !== 'undefined' ? window.innerHeight * 0.02 : 0;
      const viewportInsetX = typeof window !== 'undefined' ? window.innerWidth * 0.02 : 0;

      // 100% zoom = perfectly fits the container height
      const baseScale = containerHeight ? (containerHeight - viewportInsetY * 2) / EXACT_HEIGHT : 1;
      const actualScale = baseScale * (zoom / 100);

      const zoomRef = useRef(zoom);

      // Sync external toolbar zoom changes
      useEffect(() => {
        if (zoom !== zoomRef.current) {
          zoomRef.current = zoom;
        }
      }, [zoom]);

      const adjustZoom = useCallback((newZoomVal: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const prevScale = baseScale * (zoomRef.current / 100);
        const newScale = baseScale * (newZoomVal / 100);

        const contentX = (scrollLeft + mouseX) / prevScale;
        const contentY = (scrollTop + mouseY) / prevScale;

        const roundedZoom = Math.round(newZoomVal);
        zoomRef.current = roundedZoom;
        onZoomChange(roundedZoom);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          scrollContainerRef.current.scrollLeft = contentX * newScale - mouseX;
          scrollContainerRef.current.scrollTop = contentY * newScale - mouseY;
        });
      }, [baseScale, onZoomChange]);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          let newZoom = zoomRef.current * Math.exp(-e.deltaY * zoomSpeed);
          newZoom = Math.min(Math.max(newZoom, 50), 250);

          setTimeout(() => adjustZoom(newZoom, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const renderCard = (title: string, data: [string, number][]) => (
        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm flex flex-col h-64 shrink-0">
          <h3 className="text-label-md font-bold text-on-surface uppercase mb-4 pb-2 border-b border-outline-variant/50 shrink-0">{title}</h3>
          <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
            {data.map(([k, v]) => (
              <div key={k} className="flex justify-between items-center">
                <span className="text-body-md text-on-surface-variant truncate pr-4" title={k}>{k}</span>
                <span className="font-mono text-label-sm bg-surface-container px-2 py-0.5 rounded text-secondary shrink-0">{v}</span>
              </div>
            ))}
            {data.length === 0 && <div className="text-body-md text-outline italic">No data</div>}
          </div>
        </div>
      );

      return (
        <div className="w-full h-full bg-[#f9f9ff] flex-1 relative overflow-hidden flex flex-col">
          <div
            ref={scrollContainerRef}
            className="w-full h-full overflow-auto custom-scrollbar relative touch-none"
          >
            {/* Layout Footprint Wrapper */}
            <div
              style={{
                width: `${EXACT_WIDTH * actualScale + viewportInsetX * 2}px`,
                height: `${EXACT_HEIGHT * actualScale + viewportInsetY * 2}px`,
                minWidth: '100%',
                position: 'relative'
              }}
            >
              {/* Scaled Content Canvas */}
              <div
                style={{
                  position: 'absolute',
                  top: `max(${viewportInsetY}px, calc(50% - ${(EXACT_HEIGHT * actualScale) / 2}px))`,
                  left: `max(${viewportInsetX}px, calc(50% - ${(EXACT_WIDTH * actualScale) / 2}px))`,
                  transform: `scale(${actualScale})`,
                  transformOrigin: '0 0',
                  width: `${EXACT_WIDTH}px`,
                  height: `${EXACT_HEIGHT}px`,
                }}
              >
                {/* The actual Report slide */}
                <div className="w-full h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-h1 text-on-surface">Production Report</h1>
                    <div className="flex gap-4">
                      <div className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-center shadow-sm min-w-32">
                        <div className="text-[10px] uppercase font-bold text-outline">Total Shots</div>
                        <div className="text-h2 text-primary">{stats.totalShots}</div>
                      </div>
                      <div className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-center shadow-sm min-w-32">
                        <div className="text-[10px] uppercase font-bold text-outline">Est. Time</div>
                        <div className="text-h2 text-primary">{stats.timeFormatted}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fixed 3-column grid */}
                  <div className="grid grid-cols-3 gap-6">
                    {renderCard('Locations', stats.locStats)}
                    {renderCard('INT / EXT', stats.ieStats)}
                    {renderCard('Day / Night', stats.dnStats)}
                    {renderCard('Subjects', stats.subjStats)}
                    {renderCard('Shot Sizes', stats.sizeStats)}
                    {renderCard('Shot Types', stats.typeStats)}
                    {renderCard('Angles', stats.angleStats)}
                    {renderCard('Movements', stats.movStats)}
                    {renderCard('Lenses', stats.lensStats)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```
  </task>

  <strict_guardrails>
    - Ensure the 100% base state strictly maps to the height-based auto-fit logic.
  </strict_guardrails>
</system_prompt>
</file>

<file path="0502_1435_linescript-topbar-alignment.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to mathematically align the Export & Share buttons container in the Topbar with the Right Sidebar below it, creating a seamless vertical grid line.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Grid Alignment.

    **Step 1: Adjust Topbar padding**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Modify the main Topbar wrapper to remove the right padding (`pr-0` instead of `px-6`). This allows the action container to sit flush against the right edge of the screen.

    Locate this exact block:
    ```tsx
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center px-6 bg-white border-b border-[#E5E7EB] z-10 gap-1">
    ```

    Replace with:
    ```tsx
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center pl-6 pr-0 bg-white border-b border-[#E5E7EB] z-10 gap-1">
    ```

    **Step 2: Constrain action block and stretch buttons**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Constrain the wrapper of the two buttons to `w-80` (matching the sidebar's 320px width), make it `h-full`, and add a left border.
    - Re-apply the `flex-1` class to both the Export and Share `<button>` elements so they stretch symmetrically inside this 320px block.

    Locate this exact block:
    ```tsx
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>

            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)} className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
            </div>
          </div>
    ```

    Replace with:
    ```tsx
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>

            <div className="flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
              <button onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
            </div>
          </div>
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0502_1513_linescript-helios-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to apply the "Helios Protocol" Absolute Footprint Zoom architecture to the PDF viewer in the Line Script module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Implement Helios Cursor-Anchored Zoom for Line Script.

    **Step 1: Update `LineScriptContainer.tsx` to pass `onZoomChange`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Pass `onZoomChange={setZoom}` to the `<ScriptWorkspace>` component.

    Locate the `<ScriptWorkspace>` instantiation:
    ```tsx
              <ScriptWorkspace
                activeTool={activeTool}
                onToolChange={setActiveTool}
                currentPage={currentPage}
                totalPages={120}
                zoom={zoom}
              />
    ```
    Replace with:
    ```tsx
              <ScriptWorkspace
                activeTool={activeTool}
                onToolChange={setActiveTool}
                currentPage={currentPage}
                totalPages={120}
                zoom={zoom}
                onZoomChange={setZoom}
              />
    ```

    **Step 2: Update `ScriptWorkspace.tsx` Props & Imports**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Add `useRef`, `useEffect`, `useCallback` to the React import.
    - Add `onZoomChange` to the `Props` interface.

    Locate the imports block:
    ```tsx
    import type { ActiveTool, MockScriptLine } from '@/types/linescript';
    ```
    Replace with:
    ```tsx
    import { useRef, useEffect, useCallback } from 'react';
    import type { ActiveTool, MockScriptLine } from '@/types/linescript';
    ```

    Locate the `Props` interface:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      zoom: number;
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
      onZoomChange: (z: number) => void;
    }
    ```

    **Step 3: Inject Helios Zoom Math into `ScriptWorkspace`**
    - File: `components/linescript/ScriptWorkspace.tsx`

    Locate the component signature:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      zoom,
    }: Props) {
      return (
    ```
    Replace with:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      zoom,
      onZoomChange,
    }: Props) {
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const zoomRef = useRef(zoom);

      // Sync external toolbar zoom changes (Top-Left anchored to prevent jumps)
      useEffect(() => {
        if (zoom !== zoomRef.current) {
          const container = scrollContainerRef.current;
          if (container) {
            const { scrollLeft, scrollTop } = container;
            const contentX = scrollLeft / (zoomRef.current / 100);
            const contentY = scrollTop / (zoomRef.current / 100);
            const newScale = zoom / 100;
            requestAnimationFrame(() => {
              container.scrollLeft = contentX * newScale;
              container.scrollTop = contentY * newScale;
            });
          }
          zoomRef.current = zoom;
        }
      }, [zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        const newZoom = Math.round(newScale * 100);
        zoomRef.current = newZoom;
        onZoomChange(newZoom);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, [onZoomChange]);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);

          // Absolute clamp from 50% to 250%
          newScale = Math.min(Math.max(newScale, 0.5), 2.5);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      return (
    ```

    **Step 4: Implement Absolute Footprint DOM Structure**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Convert the `overflow-y-auto` container to the absolute footprint sizing model so it scales the 700x1056px paper and perfectly centers it without flexbox collision.

    Locate the current render block inside the root wrapper:
    ```tsx
      return (
        <div className="w-full max-w-[840px] bg-surface-container-lowest border border-surface-variant rounded-lg shadow-sm flex flex-col h-full relative overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar relative p-[40px] flex flex-col items-center bg-[#f9f9ff]">
            <div className="script-paper w-full max-w-[700px] bg-white min-h-[1056px] p-12 font-mono text-[14px] leading-relaxed relative mb-20">
              <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE 1</div>
    ```
    *(Note: The background color class on the wrapper might be slightly different in your file, match the structure).*
    
    Replace with:
    ```tsx
      return (
        <div className="w-full max-w-[840px] bg-surface-container-lowest border border-surface-variant rounded-lg shadow-sm flex flex-col h-full relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
          >
            {/* Footprint Wrapper */}
            <div style={{
              width: `${700 * (zoom/100) + 80}px`,
              height: `${1056 * (zoom/100) + 80}px`,
              minWidth: '100%',
              minHeight: '100%',
              position: 'relative'
            }}>
              {/* Scaled PDF Content */}
              <div style={{
                position: 'absolute',
                top: `max(40px, calc(50% - ${(1056 * (zoom / 100)) / 2}px))`,
                left: `max(40px, calc(50% - ${(700 * (zoom / 100)) / 2}px))`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: '700px',
                height: '1056px'
              }}>
                <div className="script-paper w-full h-full bg-white p-12 font-mono text-[14px] leading-relaxed relative shadow-md">
                  <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE 1</div>
    ```

    Locate the end of the `script-paper` block:
    ```tsx
              <div className="absolute right-6 top-64 bottom-48 w-4 border-r-2 border-y-2 border-secondary" />
              <div className="absolute right-2 top-64 text-[10px] text-secondary font-bold">1A/2</div>
            </div>
          </div>
        </div>
      );
    ```
    Replace with:
    ```tsx
              <div className="absolute right-6 top-64 bottom-48 w-4 border-r-2 border-y-2 border-secondary" />
              <div className="absolute right-2 top-64 text-[10px] text-secondary font-bold">1A/2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    ```
  </task>

  <strict_guardrails>
    - DO NOT modify the `ScriptLine` map iteration or the static mock lines inside the paper.
    - Ensure the DOM replacement strictly preserves the `touch-none` and `overflow-auto` layout for `scrollContainerRef`.
  </strict_guardrails>
</system_prompt>
</file>

<file path="0502_1517_linescript-expand-canvas.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to remove the fixed box constraints around the Line Script PDF viewer and expand it into a full-bleed, edge-to-edge canvas, matching the styling logic of the Breakdown Export module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Hotfix: Expand Line Script Canvas to Full Bleed.

    **Step 1: Remove Padding from `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Remove `p-5` and `justify-center` from the wrapper div surrounding `<ScriptWorkspace>` to allow it to stretch edge-to-edge.

    Locate this exact block:
    ```tsx
          {/* ── Main Workspace Area ── */}
          <div className="flex-1 flex overflow-hidden relative">
            <LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
            <div className="flex-1 overflow-hidden relative p-5 flex justify-center bg-[#f9f9ff]">
              <ScriptWorkspace
    ```
    Replace with:
    ```tsx
          {/* ── Main Workspace Area ── */}
          <div className="flex-1 flex overflow-hidden relative">
            <LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
            <div className="flex-1 overflow-hidden relative flex bg-[#f9f9ff]">
              <ScriptWorkspace
    ```

    **Step 2: Remove Box Constraints from `ScriptWorkspace.tsx`**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Remove `max-w-[840px]`, `bg-surface-container-lowest`, `border`, `border-surface-variant`, `rounded-lg`, and `shadow-sm` from the root div.
    - Ensure it acts as a fluid `w-full h-full` container.

    Locate this exact block (at the root of the component return):
    ```tsx
      return (
        <div className="w-full max-w-[840px] bg-surface-container-lowest border border-surface-variant rounded-lg shadow-sm flex flex-col h-full relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
          >
    ```
    Replace with:
    ```tsx
      return (
        <div className="w-full h-full flex flex-col relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
          >
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement blocks.
  </constraints>
</system_prompt>
</file>

<file path="0502_1612_linescript-view-modes.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to implement the Multi-View Mode (Single, Two Pages, Scroll) and Pagination for the Line Script PDF viewer, maintaining the Helios Absolute Footprint Zoom architecture.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Add View Modes and Pagination to Line Script Workspace.

    **Step 1: Update Topbar State & Layout in `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Add `viewMode` state and update `currentPage` to use a setter.
    - Implement pagination handlers (`handlePrevPage`, `handleNextPage`).
    - Inject the View Mode switcher and Pagination controls into the Topbar just before the `w-80` Share/Export container.

    Locate the state block:
    ```tsx
      const [activeTool, setActiveTool] = useState<ActiveTool>(null);
      const [zoom, setZoom] = useState(100);
      const [currentPage] = useState(24);
      const [isRightOpen, setIsRightOpen] = useState(true);
    ```
    Replace with:
    ```tsx
      const [activeTool, setActiveTool] = useState<ActiveTool>(null);
      const [zoom, setZoom] = useState(100);
      const [currentPage, setCurrentPage] = useState(1);
      const [viewMode, setViewMode] = useState<'single' | 'two' | 'scroll'>('scroll');
      const [isRightOpen, setIsRightOpen] = useState(true);

      const totalPages = 120;
      const handlePrevPage = () => setCurrentPage(p => Math.max(1, viewMode === 'two' ? p - 2 : p - 1));
      const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, viewMode === 'two' ? p + 2 : p + 1));
    ```

    Locate the end of the topbar rendering block:
    ```tsx
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>

            <div className="flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
    ```
    Replace with:
    ```tsx
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[20px]">link</span></button>

            {/* ── View Mode & Pagination ── */}
            <div className="flex items-center gap-2 ml-auto pr-4">
              <div className="flex items-center bg-[#f9f9ff] border border-[#E5E7EB] p-1 rounded-lg shrink-0">
                <button onClick={() => setViewMode('single')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'single' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Single Page</button>
                <button onClick={() => setViewMode('two')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'two' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Two Pages</button>
                <button onClick={() => setViewMode('scroll')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'scroll' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Scroll</button>
              </div>

              {viewMode !== 'scroll' && (
                <>
                  <ToolbarDivider />
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                    <span className="text-label-sm font-medium text-on-surface-variant min-w-[4rem] text-center">Page {currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
    ```

    Locate the `<ScriptWorkspace>` instance rendering:
    ```tsx
              <ScriptWorkspace
                activeTool={activeTool}
                onToolChange={setActiveTool}
                currentPage={currentPage}
                totalPages={120}
                zoom={zoom}
                onZoomChange={setZoom}
              />
    ```
    Replace with:
    ```tsx
              <ScriptWorkspace
                activeTool={activeTool}
                onToolChange={setActiveTool}
                currentPage={currentPage}
                totalPages={totalPages}
                zoom={zoom}
                onZoomChange={setZoom}
                viewMode={viewMode}
              />
    ```

    **Step 2: Dynamic Footprint Math in `ScriptWorkspace.tsx`**
    - File: `components/linescript/ScriptWorkspace.tsx`
    - Receive `viewMode`. Compute layout dimensions based on `single`, `two`, or `scroll`.
    - Map the pages inside the scaled canvas container.

    Locate the `Props` interface:
    ```tsx
    interface Props {
      activeTool: ActiveTool;
      onToolChange: (tool: ActiveTool) => void;
      currentPage: number;
      totalPages: number;
      zoom: number;
      onZoomChange: (z: number) => void;
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
      onZoomChange: (z: number) => void;
      viewMode: 'single' | 'two' | 'scroll';
    }
    ```

    Locate the component signature and inject the footprint constants:
    ```tsx
    export default function ScriptWorkspace({
      activeTool,
      onToolChange,
      currentPage,
      totalPages,
      zoom,
      onZoomChange,
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
      onZoomChange,
      viewMode,
    }: Props) {
      const PAGE_W = 700;
      const PAGE_H = 1056;
      const GAP = 40;

      let contentW = PAGE_W;
      let contentH = PAGE_H;
      let pagesToRender: (number | null)[] = [];

      if (viewMode === 'single') {
        contentW = PAGE_W;
        contentH = PAGE_H;
        pagesToRender = [currentPage];
      } else if (viewMode === 'two') {
        contentW = PAGE_W * 2 + GAP;
        contentH = PAGE_H;
        pagesToRender = [currentPage, currentPage + 1 <= totalPages ? currentPage + 1 : null];
      } else if (viewMode === 'scroll') {
        contentW = PAGE_W;
        const scrollPages = 5; // Mocking 5 pages for continuous scroll
        contentH = PAGE_H * scrollPages + GAP * (scrollPages - 1);
        pagesToRender = Array.from({ length: scrollPages }).map((_, i) => i + 1);
      }
    ```

    Locate the rendering footprint block:
    ```tsx
            {/* Footprint Wrapper */}
            <div style={{
              width: `${700 * (zoom/100) + 80}px`,
              height: `${1056 * (zoom/100) + 80}px`,
              minWidth: '100%',
              minHeight: '100%',
              position: 'relative'
            }}>
              {/* Scaled PDF Content */}
              <div style={{
                position: 'absolute',
                top: `max(40px, calc(50% - ${(1056 * (zoom / 100)) / 2}px))`,
                left: `max(40px, calc(50% - ${(700 * (zoom / 100)) / 2}px))`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: '700px',
                height: '1056px'
              }}>
                <div className="script-paper w-full h-full bg-white p-12 font-mono text-[14px] leading-relaxed relative shadow-md">
                  <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE 1</div>
    ```
    Replace with:
    ```tsx
            {/* Footprint Wrapper */}
            <div style={{
              width: `${contentW * (zoom/100) + 80}px`,
              height: `${contentH * (zoom/100) + 80}px`,
              minWidth: '100%',
              minHeight: '100%',
              position: 'relative'
            }}>
              {/* Scaled PDF Content */}
              <div style={{
                position: 'absolute',
                top: `max(40px, calc(50% - ${(contentH * (zoom / 100)) / 2}px))`,
                left: `max(40px, calc(50% - ${(contentW * (zoom / 100)) / 2}px))`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
                width: `${contentW}px`,
                height: `${contentH}px`,
                display: 'flex',
                flexDirection: viewMode === 'scroll' ? 'column' : 'row',
                gap: `${GAP}px`
              }}>
                {pagesToRender.map((pageNum, idx) => {
                  if (pageNum === null) return <div key={`empty-${idx}`} style={{ width: PAGE_W, height: PAGE_H }} className="shrink-0" />;
                  
                  return (
                    <div key={pageNum} className="script-paper bg-white p-12 font-mono text-[14px] leading-relaxed relative shadow-md shrink-0" style={{ width: PAGE_W, height: PAGE_H }}>
                      <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE {pageNum}</div>
    ```

    Locate the END of the `script-paper` rendering block:
    ```tsx
                  <div className="absolute right-6 top-64 bottom-48 w-4 border-r-2 border-y-2 border-secondary" />
                  <div className="absolute right-2 top-64 text-[10px] text-secondary font-bold">1A/2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```
    Replace with:
    ```tsx
                  <div className="absolute right-6 top-64 bottom-48 w-4 border-r-2 border-y-2 border-secondary" />
                  <div className="absolute right-2 top-64 text-[10px] text-secondary font-bold">1A/2</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacements.
    - Ensure all closing tags perfectly match the map loop.
  </constraints>
</system_prompt>
</file>

<file path="0502_1645_linescript-persistent-pagination.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to make the pagination controls (Previous/Next page) ALWAYS visible regardless of the view mode, and to synchronize the text format to exactly "{currentPage} / {totalPages}" across both Line Script modules.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Sync: Persistent and Formatted Pagination.

    **Step 1: Update `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Locate the pagination block in the topbar currently wrapped in `{viewMode !== 'scroll' && (`.
    - Remove the conditional wrapper so the pagination is always rendered.
    - Update the text span to display `{currentPage} / {totalPages}`.

    Locate this exact block:
    ```tsx
              {viewMode !== 'scroll' && (
                <>
                  <ToolbarDivider />
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                    <span className="text-label-sm font-medium text-on-surface-variant min-w-[4rem] text-center">Page {currentPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                  </div>
                </>
              )}
    ```

    Replace with:
    ```tsx
              <ToolbarDivider />
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                <span className="text-label-sm font-medium text-on-surface-variant min-w-[4rem] text-center">{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
              </div>
    ```

    **Step 2: Update `Line Script Export Page`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Find the exact same pagination block in the topbar (containing the `chevron_left` and `chevron_right` buttons).
    - Remove the `{viewMode !== 'scroll' && (...)}` condition if it exists there.
    - Update the middle span to EXACTLY match: `<span className="text-label-sm font-medium text-on-surface-variant min-w-[4rem] text-center">{currentPage} / {totalPages}</span>`.
  </task>

  <constraints>
    - Ensure both files now render the pagination controls permanently without any viewMode conditions.
    - Ensure the text format is identical in both files.
  </constraints>
</system_prompt>
</file>

<file path="0502_1656_linescript-center-tools.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to perfectly center the core tools (Zoom, View Mode, Pagination) in the Topbar of both the Line Script and Line Script Export modules, matching the established UI sequence.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Layout: Absolute Centering of Tool Clusters.

    **Step 1: Reorganize `LineScriptContainer.tsx`**
    - File: `components/linescript/LineScriptContainer.tsx`
    - Add `relative` to the main Topbar wrapper.
    - Group the Zoom block, View Mode block, and Pagination block into a single absolutely centered wrapper.
    - Ensure the order is strictly: [Zoom] -> [Divider] -> [View Mode] -> [Divider] -> [Pagination].
    - The Share/Export action container remains on the right using `ml-auto`.

    Locate the Topbar render block structure and replace it to match this exact DOM topology:
    ```tsx
          {/* ── Rich Text & Zoom Topbar ── */}
          <div className="h-14 shrink-0 flex items-center pl-6 pr-0 bg-white border-b border-[#E5E7EB] z-10 gap-1 relative">
            
            {/* Centered Tool Cluster */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              {/* 1. Zoom */}
              <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
                <button onClick={handleZoomOut} className={TOOLBAR_BTN}>
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
                <button onClick={handleZoomIn} className={TOOLBAR_BTN}>
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              <ToolbarDivider />

              {/* 2. View Mode */}
              <div className="flex items-center bg-[#f9f9ff] border border-[#E5E7EB] p-1 rounded-lg shrink-0">
                <button onClick={() => setViewMode('single')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'single' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Single Page</button>
                <button onClick={() => setViewMode('two')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'two' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Two Pages</button>
                <button onClick={() => setViewMode('scroll')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'scroll' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Scroll</button>
              </div>

              <ToolbarDivider />

              {/* 3. Pagination */}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
              </div>
            </div>

            {/* Right Actions (Share/Export) */}
            <div className="flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
              <button onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
            </div>
          </div>
    ```

    **Step 2: Reorganize `Line Script Export Page`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Add `relative` to the topbar container (`className="h-14 shrink-0 flex items-center justify-between px-8 bg-white border-b border-[#E5E7EB] relative"` or similar).
    - Move its respective Zoom, View Mode, and Pagination blocks into the EXACT same `absolute left-1/2 -translate-x-1/2 flex items-center gap-2` wrapper structure as shown in Step 1.
    - Keep the Export dropdown button on the right side.
  </task>

  <constraints>
    - You must manually locate all 3 disconnected tool blocks in each file and move them into the new absolute-centered wrapper.
    - Output the complete, refactored topbar `<div className="h-14...">...</div>` for both files to ensure no closing tags are missed.
  </constraints>
</system_prompt>
</file>

<file path="0502_1704_linescript-export-actions-ui.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to sync the UI styling of the Share and Export buttons in the Line Script Export page to perfectly match the main workspace design tokens (outline, uppercase, standard widths).
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute UI Standardization: Share & Export Actions.

    **Step 1: Standardize Actions in `Line Script Export Page`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Locate the right-side action buttons wrapper containing the Share button and Export dropdown trigger.
    - Update the wrapper to match the 320px grid alignment: `flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest`.
    - Update both the Share button and the Export trigger button to use the standard outline classes (`bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg`).
    - Remove the `expand_more` icon from the Export button and replace it with the `download` icon placed at the beginning of the text.

    Locate the action block structure (it is located at the end of the topbar rendering, just before the `{/* Dropdown Menu */}` or `{isExportMenuOpen && ...}` condition):
    ```tsx
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
              <div className="relative shrink-0">
                <button onClick={() => setIsExportMenuOpen((prev) => !prev)} className="bg-primary text-white text-[14px] font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer shadow-sm" >
                  Export
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
    ```
    *(Note: Your current Share button classes might differ slightly, focus on replacing the wrapper and the button elements up to the dropdown).*

    Replace with:
    ```tsx
            {/* Right Actions (Share/Export) */}
            <div className="flex items-center gap-2 ml-auto w-80 h-full px-4 border-l border-[#E5E7EB] shrink-0 bg-surface-container-lowest">
              <button onClick={() => setIsShareModalOpen(true)} className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
              </button>
              <div className="relative flex-1">
                <button onClick={() => setIsExportMenuOpen((prev) => !prev)} className="w-full flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer" >
                  <span className="material-symbols-outlined text-[18px]">download</span> Export
                </button>
    ```
  </task>

  <constraints>
    - Do NOT modify the dropdown menu logic (`{isExportMenuOpen && ...}`) below the replaced block.
    - Ensure the wrapper uses `ml-auto w-80 h-full` and both buttons/containers use `flex-1` to stretch symmetrically.
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0502_1735_linescript-export-helios-sync.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to safely replicate the exact "Absolute Footprint Zoom" logic from the main Line Script workspace into the Line Script Export page, resolving any phantom scroll space and preventing DOM breakage.
    CRITICAL: Use TARGETED REPLACEMENTS with exact context to ensure you do NOT delete the `<LineScriptExportSidebar>`.
  </role>

  <task>
    Execute Feature: Clone Helios Zoom Architecture to Export Page.

    **Step 1: Update Imports in `page.tsx`**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Add `useRef`, `useEffect`, and `useCallback` to the existing React imports.

    Locate this exact line:
    ```tsx
    import { useState, use } from 'react';
    ```
    Replace with:
    ```tsx
    import { useState, use, useRef, useEffect, useCallback } from 'react';
    ```

    **Step 2: Inject Zoom Math and Footprint Math**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Inject the zoom refs, calculation math, footprint dimensions, and wheel event listener just below the existing `totalPages` variable.

    Locate this exact block:
    ```tsx
      const [viewMode, setViewMode] = useState<'single' | 'two' | 'scroll'>('scroll');
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = 120;

      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    ```

    Replace with:
    ```tsx
      const [viewMode, setViewMode] = useState<'single' | 'two' | 'scroll'>('scroll');
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = 120;

      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const zoomRef = useRef(zoom);

      useEffect(() => {
        zoomRef.current = zoom;
      }, [zoom]);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        const newZoom = Math.round(newScale * 100);
        setZoom(newZoom);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();
          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);
          newScale = Math.min(Math.max(newScale, 0.5), 2.5);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const handleZoomIn = () => {
        const container = scrollContainerRef.current;
        if (!container) { setZoom(z => Math.min(z + 10, 250)); return; }
        const rect = container.getBoundingClientRect();
        adjustZoom(Math.min((zoom + 10) / 100, 2.5), rect.left + rect.width / 2, rect.top + rect.height / 2);
      };

      const handleZoomOut = () => {
        const container = scrollContainerRef.current;
        if (!container) { setZoom(z => Math.max(z - 10, 50)); return; }
        const rect = container.getBoundingClientRect();
        adjustZoom(Math.max((zoom - 10) / 100, 0.5), rect.left + rect.width / 2, rect.top + rect.height / 2);
      };

      // Footprint Matrix dimensions based on ViewMode
      const PAGE_W = 794;
      const PAGE_H = 1123;
      let contentW = PAGE_W;
      let contentH = PAGE_H;

      if (viewMode === 'single') {
        contentW = PAGE_W;
        contentH = PAGE_H;
      } else if (viewMode === 'two') {
        contentW = PAGE_W * 2 + 16;
        contentH = PAGE_H;
      } else if (viewMode === 'scroll') {
        contentW = PAGE_W;
        contentH = (PAGE_H * 5) + (32 * 4) + 64; 
      }

      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    ```

    **Step 3: Update Zoom Buttons in Topbar**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Bind the Zoom `+` and `-` buttons in the Topbar to `handleZoomIn` and `handleZoomOut`.
    
    Locate the zoom buttons block inside the Topbar (it might have inline `setZoom` calls) and replace them with the explicit handlers:
    ```tsx
                <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
                <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
    ```

    **Step 4: Safe Footprint DOM Replacement**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Wrap the `<LineScriptExportPreview>` inside the explicit absolute footprint without touching the sidebar.
    - Ensure you only replace the `div` immediately following the `<LineScriptExportSidebar>` component.

    Locate this EXACT block:
    ```tsx
          {/* ── Main Workspace Area ── */}
          <div className="flex-1 flex overflow-hidden relative">
            <LineScriptExportSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onJumpToPage={handleJumpToPage} />
            
            <div className="flex-1 overflow-auto bg-[#f9f9ff] flex justify-center py-8">
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                 <LineScriptExportPreview viewMode={viewMode} currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```

    Replace with:
    ```tsx
          {/* ── Main Workspace Area ── */}
          <div className="flex-1 flex overflow-hidden relative">
            <LineScriptExportSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onJumpToPage={handleJumpToPage} />
            
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
            >
              {/* Footprint Wrapper */}
              <div style={{
                width: `${contentW * (zoom/100) + 80}px`,
                height: `${contentH * (zoom/100) + 80}px`,
                minWidth: '100%',
                minHeight: '100%',
                position: 'relative'
              }}>
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
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```
    
    **Step 5: Clean up `pb-20` in Preview**
    - File: `components/linescript/LineScriptExportPreview.tsx`
    - Remove the hardcoded `pb-20` classes since the new footprint wrapper natively provides 80px symmetric padding.
    
    Locate:
    ```tsx
      if (viewMode === 'scroll') {
        return (
          <div className="flex flex-col gap-8 pb-20">
    ```
    Replace with:
    ```tsx
      if (viewMode === 'scroll') {
        return (
          <div className="flex flex-col gap-8">
    ```

    Locate:
    ```tsx
      if (viewMode === 'two') {
        const leftPage = currentPage;
        const rightPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;
        return (
          <div className="flex gap-4 pb-20">
    ```
    Replace with:
    ```tsx
      if (viewMode === 'two') {
        const leftPage = currentPage;
        const rightPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;
        return (
          <div className="flex gap-4">
    ```

    Locate:
    ```tsx
      return (
        <div className="pb-20">
          <MockScriptPage pageNum={currentPage} />
        </div>
      );
    ```
    Replace with:
    ```tsx
      return (
        <div>
          <MockScriptPage pageNum={currentPage} />
        </div>
      );
    ```
  </task>
</system_prompt>
</file>

<file path="0502_1800_breakdown-helios-zoom.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to apply the "Helios Protocol" Absolute Footprint Zoom architecture to the ScriptViewer in the Breakdown module.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Feature: Implement Helios Cursor-Anchored Zoom for Breakdown ScriptViewer.

    **Step 1: Update Imports in `ScriptViewer.tsx`**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Add React hooks for state, ref, effect, and callback.

    Locate this exact block:
    ```tsx
    import type { ScriptLine } from '@/types/breakdown';
    import { TAG_CONFIG } from '@/types/breakdown';
    ```
    Replace with:
    ```tsx
    import { useRef, useState, useEffect, useCallback } from 'react';
    import type { ScriptLine } from '@/types/breakdown';
    import { TAG_CONFIG } from '@/types/breakdown';
    ```

    **Step 2: Inject Helios Math & ResizeObserver**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Inject the zoom state, refs, dynamic height observer, and cursor-anchored scroll logic inside the component body.

    Locate the component signature:
    ```tsx
    export default function ScriptViewer({ scriptLines }: Props) {
      return (
    ```
    Replace with:
    ```tsx
    export default function ScriptViewer({ scriptLines }: Props) {
      const scrollContainerRef = useRef<HTMLElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);
      const [zoom, setZoom] = useState(100);
      const zoomRef = useRef(100);
      const [contentHeight, setContentHeight] = useState(1056);

      useEffect(() => {
        zoomRef.current = zoom;
      }, [zoom]);

      useEffect(() => {
        const content = contentRef.current;
        if (!content) return;
        const observer = new ResizeObserver(entries => {
          for (const entry of entries) {
            setContentHeight(entry.contentRect.height);
          }
        });
        observer.observe(content);
        return () => observer.disconnect();
      }, []);

      const adjustZoom = useCallback((newScale: number, clientX: number, clientY: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const { scrollLeft, scrollTop } = container;

        const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
        const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

        const newZoom = Math.round(newScale * 100);
        setZoom(newZoom);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;
          const newScrollLeft = contentX * newScale - mouseX;
          const newScrollTop = contentY * newScale - mouseY;
          scrollContainerRef.current.scrollLeft = newScrollLeft;
          scrollContainerRef.current.scrollTop = newScrollTop;
        });
      }, []);

      useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
          if (!e.ctrlKey) return;
          const container = scrollContainerRef.current;
          if (!container || !container.contains(e.target as Node)) return;

          e.preventDefault();

          const zoomSpeed = 0.005;
          const currentScale = zoomRef.current / 100;
          let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);
          newScale = Math.min(Math.max(newScale, 0.5), 2.5);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const handleZoomIn = () => {
        const container = scrollContainerRef.current;
        if (!container) { setZoom(z => Math.min(z + 10, 250)); return; }
        const rect = container.getBoundingClientRect();
        adjustZoom(Math.min((zoom + 10) / 100, 2.5), rect.left + rect.width / 2, rect.top + rect.height / 2);
      };

      const handleZoomOut = () => {
        const container = scrollContainerRef.current;
        if (!container) { setZoom(z => Math.max(z - 10, 50)); return; }
        const rect = container.getBoundingClientRect();
        adjustZoom(Math.max((zoom - 10) / 100, 0.5), rect.left + rect.width / 2, rect.top + rect.height / 2);
      };

      return (
    ```

    **Step 3: Implement Absolute Footprint DOM Structure**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Convert the root `<section>` to use the Absolute Footprint sizing model.
    - Inject the sticky zoom toolbar in the top-left corner.
    - Remove the hardcoded `mb-20` since the footprint math supplies its own symmetric padding.

    Locate the root DOM structure being returned:
    ```tsx
        <section className="flex-1 bg-background overflow-y-auto custom-scrollbar p-4 flex flex-col items-center">
          <div className="script-paper w-full max-w-[840px] bg-white min-h-[1056px] p-[40px] font-mono text-[14px] leading-relaxed relative mb-20">
            <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE 1</div>
    ```
    *(Note: background color class might be slightly different in your file, rely on structural matching).*
    
    Replace with:
    ```tsx
        <section 
          ref={scrollContainerRef}
          className="flex-1 bg-[#f9f9ff] overflow-auto custom-scrollbar relative touch-none"
        >
          {/* Floating Zoom Controls */}
          <div className="sticky top-4 left-4 z-50 w-0 h-0 overflow-visible">
            <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shadow-sm w-max">
              <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="font-mono text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
              <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>

          {/* Footprint Wrapper */}
          <div style={{
            width: `${840 * (zoom/100) + 80}px`,
            height: `${contentHeight * (zoom/100) + 80}px`,
            minWidth: '100%',
            minHeight: '100%',
            position: 'relative'
          }}>
            {/* Scaled PDF Content */}
            <div style={{
              position: 'absolute',
              top: `max(40px, calc(50% - ${(contentHeight * (zoom / 100)) / 2}px))`,
              left: `max(40px, calc(50% - ${(840 * (zoom / 100)) / 2}px))`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: '0 0',
              width: '840px'
            }}>
              <div ref={contentRef} className="script-paper w-full bg-white min-h-[1056px] p-[40px] font-mono text-[14px] leading-relaxed relative shadow-md">
                <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE 1</div>
    ```

    Locate the end of the `ScriptViewer` component where it closes the tags:
    ```tsx
              return <p key={line.id} className={className}>{line.text}</p>;
            })}
          </div>
        </section>
      );
    }
    ```
    Replace with:
    ```tsx
              return <p key={line.id} className={className}>{line.text}</p>;
            })}
                </div>
              </div>
            </div>
        </section>
      );
    }
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement blocks.
  </constraints>
</system_prompt>
</file>

</files>
</file>

</files>
