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
0501_1545_linescript-export-page.md
0501_1600_linescript-export-pdf-viewer.md
0501_1608_linescript-export-upgrade-modal.md
0501_1614_report-helios-export-layer-audit.md
0501_1617_hotfix-linescript-modal-zindex.md
0501_1620_hotfix-export-modal-ui.md
0501_1635_shotlist-rich-topbar.md
0501_1638_shotlist-export-modal-options.md
0501_1644_remove-rulers-freeze.md
0501_2305_shotlist-table-refactor.md
0501_2315_shotlist-table-phase2.md
0501_2316_shotlist-phase3-report-visibility.md
0501_2324_hotfix-shotlist-toolbar-layer.md
0501_2330_shotlist-safe-zone-zoom.md
0501_2341_remove-shotlist-freeze.md
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="0501_1545_linescript-export-page.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to build the Export Preview route for the Line Script module, mirroring the A4 printable UI architecture used in Breakdown.
  </role>

  <task>
    **Step 1: Create the A4 Preview Component**
    - File: `components/linescript/LineScriptExportPreview.tsx`
    - Create a new Client Component.
    - Mimic the CSS architecture of `ExportPreviewSingle.tsx` (strict A4 size `w-[794px] min-h-[1123px]`, `shadow-[4px_4px_0_#bbb]`, strict border-driven layout with `1px solid #E5E7EB`).
    - The layout should have:
      - Header: 3-column grid (LINE SCRIPT | PROJECT TITLE | BRANDING LOGO).
      - Body: A strict grid containing the 8 Shotlist fields.
        - Row 1 (4 cols): Shot # | Shot Size | Shot Type | Angle
        - Row 2 (2 cols): Movement | Lens
        - Row 3 (1 col, large): Description
        - Row 4 (1 col, large): Note
    - Use `<input>` and `<textarea>` elements without borders for editable fields, just like Breakdown's single export.

    ```tsx
    'use client';

    const BORDER = "1px solid #E5E7EB";
    const sharedInputStyle = { width: "100%", outline: "none", backgroundColor: "transparent", fontSize: "12px", color: "#191b23" };
    const labelStyle = { fontFamily: "monospace", fontSize: "10px", fontWeight: "bold", color: "#424754", paddingBottom: "4px", display: "block", textTransform: "uppercase" as const };

    export default function LineScriptExportPreview() {
      return (
        <div className="flex-1 overflow-y-auto bg-[#f9f9ff] flex justify-center py-8">
          <div className="border border-outline-variant shadow-[4px_4px_0_#bbb] shrink-0 bg-white flex flex-col font-sans" style={{ width: "794px", minHeight: "1123px" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", borderBottom: BORDER }}>
              <div style={{ padding: "10px 12px", borderRight: BORDER, display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "bold" }}>LINE SCRIPT</span>
              </div>
              <div style={{ padding: "10px 12px", borderRight: BORDER }}>
                <input type="text" placeholder="PROJECT TITLE" style={{ ...sharedInputStyle, textAlign: "center", fontWeight: "bold", fontSize: "14px" }} />
              </div>
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#9ca3af" }}>BRANDING LOGO</span>
              </div>
            </div>

            {/* Shot Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: BORDER }}>
              <div style={{ padding: "8px 12px", borderRight: BORDER }}>
                <span style={labelStyle}>Shot #</span>
                <input type="text" style={sharedInputStyle} defaultValue="1A/1" />
              </div>
              <div style={{ padding: "8px 12px", borderRight: BORDER }}>
                <span style={labelStyle}>Shot Size</span>
                <input type="text" style={sharedInputStyle} defaultValue="WS" />
              </div>
              <div style={{ padding: "8px 12px", borderRight: BORDER }}>
                <span style={labelStyle}>Shot Type</span>
                <input type="text" style={sharedInputStyle} defaultValue="Single" />
              </div>
              <div style={{ padding: "8px 12px" }}>
                <span style={labelStyle}>Angle</span>
                <input type="text" style={sharedInputStyle} defaultValue="Eye Level" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: BORDER }}>
              <div style={{ padding: "8px 12px", borderRight: BORDER }}>
                <span style={labelStyle}>Movement</span>
                <input type="text" style={sharedInputStyle} defaultValue="Static" />
              </div>
              <div style={{ padding: "8px 12px" }}>
                <span style={labelStyle}>Lens</span>
                <input type="text" style={sharedInputStyle} placeholder="e.g. 35mm" />
              </div>
            </div>

            <div style={{ borderBottom: BORDER, padding: "8px 12px", minHeight: "150px" }}>
              <span style={labelStyle}>Description</span>
              <textarea style={{ ...sharedInputStyle, resize: "none", height: "120px" }} placeholder="Shot description..." />
            </div>

            <div style={{ padding: "8px 12px", minHeight: "150px" }}>
              <span style={labelStyle}>Note</span>
              <textarea style={{ ...sharedInputStyle, resize: "none", height: "120px" }} placeholder="Additional notes..." />
            </div>
            
            {/* Fill remaining A4 space */}
            <div style={{ flex: 1, backgroundColor: "#f9fafb", borderTop: BORDER }}></div>
          </div>
        </div>
      );
    }
    ```

    **Step 2: Create the Export Route Page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Create a new Client Component that hosts the Topbar (with zoom controls) and the zoom wrapper around the A4 preview.
    
    ```tsx
    'use client';

    import { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import LineScriptExportPreview from '@/components/linescript/LineScriptExportPreview';

    export default function LineScriptExportPage() {
      const router = useRouter();
      const [zoom, setZoom] = useState(100);

      return (
        <div className="flex flex-col h-full bg-background text-on-background">
          <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-outline-variant shrink-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <h1 className="text-[16px] font-semibold tracking-tight">Export Line Script</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="text-[13px] font-medium w-12 text-center select-none">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
              <button className="flex items-center justify-center gap-1.5 bg-primary text-white hover:bg-primary/90 text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">print</span>
                Print PDF
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <div 
              className="w-full flex justify-center origin-top transition-transform duration-200" 
              style={{ transform: `scale(${zoom / 100})`, paddingBottom: '100px' }}
            >
              <LineScriptExportPreview />
            </div>
          </div>
        </div>
      );
    }
    ```

    **Step 3: Wire Export Button in Right Sidebar**
    - File: `components/linescript/LineScriptRightSidebar.tsx`
    - Update the imports to include `useRouter` and `useParams` from `next/navigation`.
    - Apply a targeted replacement to wire the "Export" button.

    Replace the current imports and component definition:
    ```tsx
    'use client';

    import { useState } from 'react';
    import { useParams } from 'next/navigation';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';

    interface Props {
      isOpen: boolean;
      onToggle: () => void;
    }

    export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
      const params = useParams();
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    ```

    With:
    ```tsx
    'use client';

    import { useState } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';

    interface Props {
      isOpen: boolean;
      onToggle: () => void;
    }

    export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
      const params = useParams();
      const router = useRouter();
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    ```

    Locate the Export button inside `LineScriptRightSidebar.tsx`:
    ```tsx
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                  </button>
    ```

    Replace with:
    ```tsx
                  <button 
                    onClick={() => router.push(`/workspace/${params.projectSlug as string}/${params.scriptId as string}/linescript/export`)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                  </button>
    ```
  </task>

  <constraints>
    - Ensure strict adherence to the provided CSS layout for the A4 document.
    - Only output the specified code blocks/files.
  </constraints>
</system_prompt>
</file>

<file path="0501_1600_linescript-export-pdf-viewer.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to refactor the Line Script Export route into a PDF Viewer interface, mirroring the functionality of a document previewer with pagination, view modes, and navigation sidebars.
  </role>

  <task>
    **Step 1: Create the Navigation Sidebar**
    - File: `components/linescript/LineScriptExportSidebar.tsx`
    - Create a new Client Component for the Right Sidebar.
    - It must display a list of scenes. Clicking a scene calls `onJumpToPage(pageNumber)`.
    
    ```tsx
    'use client';

    interface SceneNav { id: string; number: number; location: string; intExt: string; dayNight: string; pageStart: number; }
    const MOCK_SCENES_NAV: SceneNav[] = [
      { id: 'sc1', number: 1, location: 'COFFEE SHOP', intExt: 'INT', dayNight: 'DAY', pageStart: 1 },
      { id: 'sc2', number: 2, location: 'CITY STREET', intExt: 'EXT', dayNight: 'MORNING', pageStart: 3 },
      { id: 'sc3', number: 3, location: 'ROOFTOP', intExt: 'EXT', dayNight: 'DUSK', pageStart: 5 },
    ];

    interface Props { isOpen: boolean; onToggle: () => void; onJumpToPage: (page: number) => void; }

    export default function LineScriptExportSidebar({ isOpen, onToggle, onJumpToPage }: Props) {
      return (
        <div className="relative h-full shrink-0 z-20">
          <button onClick={onToggle} className="absolute right-full top-4 z-10 flex items-center justify-center w-7 h-7 bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l-md hover:bg-surface-container transition-colors cursor-pointer shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              {isOpen ? 'right_panel_close' : 'right_panel_open'}
            </span>
          </button>
          <aside className={`bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-72' : 'w-0 border-l-0 overflow-hidden'}`}>
            <div className="p-4 border-b border-outline-variant shrink-0">
              <h2 className="text-label-md font-bold text-on-surface uppercase tracking-wider">Navigate Scenes</h2>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {MOCK_SCENES_NAV.map((scene) => (
                <button key={scene.id} onClick={() => onJumpToPage(scene.pageStart)} className="w-full text-left p-3 rounded-lg transition-colors border border-transparent hover:bg-surface-container cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-label-sm font-bold text-secondary">SCENE {scene.number}</span>
                    <span className="text-[10px] uppercase font-bold text-outline">{scene.intExt}. {scene.dayNight}</span>
                  </div>
                  <div className="text-body-md text-on-surface truncate">{scene.location}</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">Page {scene.pageStart}</div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      );
    }
    ```

    **Step 2: Rewrite the PDF Preview Component**
    - File: `components/linescript/LineScriptExportPreview.tsx`
    - Replace the previous A4 grid with a component that renders mock PDF pages based on `viewMode`.
    
    ```tsx
    'use client';

    interface Props { viewMode: 'single' | 'two' | 'scroll'; currentPage: number; totalPages: number; }

    function MockScriptPage({ pageNum }: { pageNum: number }) {
      return (
        <div className="bg-white border border-outline-variant shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col relative shrink-0" style={{ width: "794px", height: "1123px" }}>
          <div className="absolute top-8 right-12 text-outline-variant font-mono text-[12px]">PAGE {pageNum}</div>
          <div className="p-16 flex-1 flex flex-col items-center justify-center text-outline-variant border-2 border-dashed border-outline-variant/30 m-8 rounded-lg">
            <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">description</span>
            <p className="font-mono text-sm">Line Script Content (Page {pageNum})</p>
          </div>
        </div>
      );
    }

    export default function LineScriptExportPreview({ viewMode, currentPage, totalPages }: Props) {
      if (viewMode === 'scroll') {
        return (
          <div className="flex flex-col gap-8 pb-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <MockScriptPage key={i} pageNum={i + 1} />
            ))}
            <div className="text-center text-on-surface-variant py-8 font-mono text-sm">... {totalPages - 5} more pages ...</div>
          </div>
        );
      }

      if (viewMode === 'two') {
        const leftPage = currentPage;
        const rightPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;
        return (
          <div className="flex gap-4 pb-20">
            <MockScriptPage pageNum={leftPage} />
            {rightPage ? <MockScriptPage pageNum={rightPage} /> : <div style={{ width: "794px" }} />}
          </div>
        );
      }

      return (
        <div className="pb-20">
          <MockScriptPage pageNum={currentPage} />
        </div>
      );
    }
    ```

    **Step 3: Rewrite the Main Export Page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Overwrite entirely to host the complex Topbar, pagination controls, Share Modal, and Layout.
    
    ```tsx
    'use client';

    import { useState, use } from 'react';
    import { useRouter } from 'next/navigation';
    import LineScriptExportPreview from '@/components/linescript/LineScriptExportPreview';
    import LineScriptExportSidebar from '@/components/linescript/LineScriptExportSidebar';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';

    export default function LineScriptExportPage({ params }: { params: Promise<{ projectSlug: string, scriptId: string }> }) {
      const router = useRouter();
      const resolvedParams = use(params);
      
      const [zoom, setZoom] = useState(100);
      const [viewMode, setViewMode] = useState<'single' | 'two' | 'scroll'>('scroll');
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = 120;
      
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);

      const MOCK_SCRIPT: ScriptVersion = {
        id: resolvedParams.scriptId || "v1",
        label: "Current Draft",
        description: "Active script version.",
        modifiedDate: "Today",
        pageCount: totalPages,
        status: "Draft",
        author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" },
        generalAccess: "Just Crew"
      };

      const handleExportClick = () => {
        alert("Premium Feature: Please upgrade your plan to export without watermark, or proceed to export with watermark.");
      };

      const handlePrevPage = () => setCurrentPage(p => Math.max(1, viewMode === 'two' ? p - 2 : p - 1));
      const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, viewMode === 'two' ? p + 2 : p + 1));
      const handleJumpToPage = (page: number) => {
        setCurrentPage(page);
        if (viewMode === 'scroll') setViewMode('single');
      };

      return (
        <div className="flex flex-col h-full bg-background text-on-background">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          
          <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-outline-variant shrink-0 z-30">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-3 w-1/3">
              <button onClick={() => router.back()} className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <h1 className="text-[16px] font-semibold tracking-tight">Export Line Script</h1>
            </div>
            
            {/* Center: View Modes & Pagination */}
            <div className="flex flex-col items-center justify-center w-1/3 gap-1">
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                <button onClick={() => setViewMode('single')} className={`w-8 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${viewMode === 'single' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`} title="Single Page">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                </button>
                <button onClick={() => setViewMode('two')} className={`w-8 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${viewMode === 'two' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`} title="Two Pages">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                </button>
                <button onClick={() => setViewMode('scroll')} className={`w-8 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${viewMode === 'scroll' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`} title="Scroll Pages">
                  <span className="material-symbols-outlined text-[16px]">view_stream</span>
                </button>
              </div>
            </div>
            
            {/* Right: Zoom, Share, Export */}
            <div className="flex items-center justify-end gap-3 w-1/3">
              {(viewMode === 'single' || viewMode === 'two') && (
                <div className="flex items-center gap-2 mr-2">
                  <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <span className="text-label-sm font-mono w-16 text-center">{currentPage} / {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              )}
              <div className="h-6 w-px bg-outline-variant mx-1" />
              <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="text-[12px] font-medium w-10 text-center select-none">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="w-7 h-7 flex items-center justify-center rounded hover:bg-white text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
              
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">ios_share</span>
                Share
              </button>
              
              <button onClick={handleExportClick} className="flex items-center justify-center gap-1 bg-primary text-white hover:bg-primary/90 text-[12px] font-bold uppercase tracking-wider pl-3 pr-2 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm">
                Export
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden relative">
            <div className="flex-1 overflow-auto custom-scrollbar flex justify-center bg-[#f9f9ff] pt-8">
              <div className="origin-top transition-transform duration-200 w-max" style={{ transform: `scale(${zoom / 100})` }}>
                <LineScriptExportPreview viewMode={viewMode} currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
            <LineScriptExportSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onJumpToPage={handleJumpToPage} />
          </div>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output the fully replaced code for all 3 files.
    - Ensure pagination arrow math correctly handles the "two pages" mode (jumps by 2).
  </constraints>
</system_prompt>
</file>

<file path="0501_1608_linescript-export-upgrade-modal.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to replace the browser alert with a custom Export Upgrade Modal in the Line Script Export page, matching the established Scenoo modal design system.
    CRITICAL: Use TARGETED REPLACEMENTS for the page.tsx updates.
  </role>

  <task>
    **Step 1: Create the Export Upgrade Modal Component**
    - File: `components/linescript/ExportUpgradeModal.tsx`
    - Create a new Client Component using standard Scenoo modal design tokens.
    - Ensure the overlay uses `z-[1]` to render above all sticky headers.

    ```tsx
    'use client';

    import { useRouter } from 'next/navigation';

    interface Props {
      isOpen: boolean;
      onClose: () => void;
    }

    export default function ExportUpgradeModal({ isOpen, onClose }: Props) {
      const router = useRouter();

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-md w-full flex flex-col p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">workspace_premium</span>
                Premium Feature
              </h2>
              <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-body-md text-on-surface-variant mb-6">
              Your current plan includes PDF exports with a Scenoo watermark. Upgrade to a Pro or Max plan to remove watermarks and unlock high-resolution exports.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/settings/plans')}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                Upgrade Plan
              </button>
              <button
                onClick={() => {
                  alert("Mock: Generating PDF with watermark...");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export with Watermark
              </button>
            </div>
          </div>
        </div>
      );
    }
    ```

    **Step 2: Update the Line Script Export Page**
    - File: `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`
    - Inject the new modal.

    Locate the imports:
    ```tsx
    import { useState, use } from 'react';
    import { useRouter } from 'next/navigation';
    import LineScriptExportPreview from '@/components/linescript/LineScriptExportPreview';
    import LineScriptExportSidebar from '@/components/linescript/LineScriptExportSidebar';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import type { ScriptVersion } from '@/types/project';
    ```
    Replace with:
    ```tsx
    import { useState, use } from 'react';
    import { useRouter } from 'next/navigation';
    import LineScriptExportPreview from '@/components/linescript/LineScriptExportPreview';
    import LineScriptExportSidebar from '@/components/linescript/LineScriptExportSidebar';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import ExportUpgradeModal from '@/components/linescript/ExportUpgradeModal';
    import type { ScriptVersion } from '@/types/project';
    ```

    Locate the state definitions:
    ```tsx
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    ```
    Replace with:
    ```tsx
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
      const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    ```

    Locate `handleExportClick`:
    ```tsx
      const handleExportClick = () => {
        alert("Premium Feature: Please upgrade your plan to export without watermark, or proceed to export with watermark.");
      };
    ```
    Replace with:
    ```tsx
      const handleExportClick = () => {
        setIsExportModalOpen(true);
      };
    ```

    Locate the root return block:
    ```tsx
      return (
        <div className="flex flex-col h-full bg-background text-on-background">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
    ```
    Replace with:
    ```tsx
      return (
        <div className="flex flex-col h-full bg-background text-on-background">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          <ExportUpgradeModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    ```
  </task>

  <constraints>
    - Ensure exactly these code snippets are replaced.
    - Do not modify the PDF viewer math or sidebar logic.
  </constraints>
</system_prompt>
</file>

<file path="0501_1614_report-helios-export-layer-audit.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect executing the "Helios Protocol". The ExportUpgradeModal is currently being overlapped by the right sidebar in the Line Script Export page. Your task is to analyze this z-index/stacking context failure and output a highly technical diagnostic report.
  </role>

  <helios_directive>
    Do NOT modify any source code. Write a markdown report identifying exactly WHY the modal is being overlapped and define the absolute architectural solutions.
  </helios_directive>

  <task>
    Create a detailed report at exactly: `.scenoo-brain/reports/0501/0501_2312_report-helios-export-layer-audit.md`

    The report MUST address:
    1. Inspect the DOM tree in `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`. Check where `<ExportUpgradeModal />` and `<LineScriptExportSidebar />` are mounted.
    2. Inspect `components/linescript/ExportUpgradeModal.tsx`. Is there a syntax error in the Tailwind class (e.g., `z-` instead of a valid value like `z-[1]`)?
    3. Inspect `components/linescript/LineScriptExportSidebar.tsx`. What is the z-index of its `aside` or its wrapper?
    4. Propose the exact Targeted Replacement code blocks needed to definitively fix the layering, ensuring the modal sits on the highest z-index across the entire application (matching `z-[2]` standard from `.scenoo-brain/reports/done/0426-report-repomix.md`).
  </task>

  <constraints>
    - Output ONLY the markdown content for the report.
    - Do not execute any code modifications yet.
  </constraints>
</system_prompt>
</file>

<file path="0501_1617_hotfix-linescript-modal-zindex.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to fix a critical z-index layering bug in the Line Script Export Upgrade Modal.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Elevate ExportUpgradeModal z-index to system modal standard (z-[1]).

    **Step 1: Fix Z-Index in Modal Overlay**
    - File: `components/linescript/ExportUpgradeModal.tsx`
    - Locate the root wrapper div of the modal which currently has the incomplete `z-` class.
    - Replace it with `z-[1]` to ensure it sits above the `z-20` right sidebar, `z-30` topbar, and any dropdowns.

    Locate this exact line:
    ```tsx
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z- flex items-center justify-center p-4">
    ```

    Replace with:
    ```tsx
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet. Do not output the entire file.
  </constraints>
</system_prompt>
</file>

<file path="0501_1620_hotfix-export-modal-ui.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect fixing layering and UX issues in the Export module.
    CRITICAL: Use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute Hotfix: Apply correct z-index and remove native browser alert.

    **Step 1: Fix Z-Index in Modal Overlay**
    - File: `components/linescript/ExportUpgradeModal.tsx`
    - Locate the root wrapper div with the incomplete `z-` class.
    - Replace it with `z-[1]` to ensure it covers the `z-20` sidebar and `z-30` topbar.

    Replace this exact line:
    ```tsx
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z- flex items-center justify-center p-4">
    ```
    With:
    ```tsx
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">
    ```

    **Step 2: Remove Native Browser Alert**
    - File: `components/linescript/ExportUpgradeModal.tsx`
    - Locate the "Export with Watermark" button's onClick handler.
    - Remove the `alert()` and replace it with a silent `console.log()` to unblock the UI.

    Replace this exact block:
    ```tsx
              <button
                onClick={() => {
                  alert("Mock: Generating PDF with watermark...");
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
              >
    ```
    With:
    ```tsx
              <button
                onClick={() => {
                  console.log("Generating PDF with watermark...");
                  onClose();
                  // TODO: Wire up actual PDF generation logic here
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
              >
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0501_1635_shotlist-rich-topbar.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to update the Shotlist top toolbar by injecting rich-text editing tools, a Share button, and an Export dropdown with an upgrade modal, mirroring the Breakdown module's capabilities.
    CRITICAL: You must use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute UI Update: Enhance ShotlistContainer toolbar with editing and action buttons.

    **Step 1: Update Imports & Add Toolbar Constants**
    - File: `components/shotlist/ShotlistContainer.tsx`
    - Update the imports to include `useParams`, `ShareScriptModal`, `ExportUpgradeModal`, and `ScriptVersion`.
    - Add the `TOOLBAR_BTN` and `ToolbarDivider` constants above the component to style the rich text tools.

    Locate this exact block at the top:
    ```tsx
    'use client';

    import { useState } from 'react';
    import type { ShotRow } from '@/types/shotlist';
    import ShotlistTable from './ShotlistTable';
    ```
    Replace it with:
    ```tsx
    'use client';

    import { useState } from 'react';
    import { useParams } from 'next/navigation';
    import type { ShotRow } from '@/types/shotlist';
    import ShotlistTable from './ShotlistTable';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import ExportUpgradeModal from '@/components/linescript/ExportUpgradeModal';
    import type { ScriptVersion } from '@/types/project';

    const TOOLBAR_BTN = 'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
    
    function ToolbarDivider() {
      return <div className="w-px h-6 bg-outline-variant mx-1 shrink-0" />;
    }
    ```

    **Step 2: Inject Modal State and Mock Data**
    - Locate the component declaration and its initial state:
    ```tsx
    export default function ShotlistContainer() {
      const [shots] = useState<ShotRow[]>(MOCK_SHOTS);
      const [searchQuery, setSearchQuery] = useState('');
    ```
    Replace it with:
    ```tsx
    export default function ShotlistContainer() {
      const params = useParams();
      const [shots] = useState<ShotRow[]>(MOCK_SHOTS);
      const [searchQuery, setSearchQuery] = useState('');
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
      const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
      const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);

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
    ```

    **Step 3: Replace the Main Render Block**
    - We will replace the entire `return (` block to inject the Modals and the fully revamped topbar containing the rich-text formatting tools on the left, and the actions (Search, New Shot, Share, Export) on the right.
    
    Locate the `return (` statement and replace EVERYTHING from `return (` to the end of the file `}`:
    ```tsx
      return (
        <div className="flex flex-col h-full relative">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          <ExportUpgradeModal isOpen={!!exportType} onClose={() => setExportType(null)} exportType={exportType} />
          
          {/* ── Toolbar ── */}
          <div className="h-14 shrink-0 flex items-center justify-between px-4 bg-white border-b border-outline-variant z-30">
            {/* Left: Rich Text Tools */}
            <div className="flex items-center gap-1">
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
              <div className="relative flex items-center">
                <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_color_text</span></button>
              </div>
              <ToolbarDivider />
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_left</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_center</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_right</span></button>
              <ToolbarDivider />
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">link</span></button>
            </div>

            {/* Right: Search, Share, Export */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search shots..." 
                  className="pl-9 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm w-48 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                />
              </div>
              <ToolbarDivider />
              <button className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Shot
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                Share
              </button>
              <div className="relative shrink-0">
                <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} className="flex items-center justify-center gap-1 bg-primary text-white hover:bg-primary/90 text-[12px] font-bold uppercase tracking-wider pl-3 pr-2 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm">
                  Export
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                {isExportMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg py-2 w-48 z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                      <button onClick={() => { setExportType('pdf'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">picture_as_pdf</span>
                        <span className="text-label-md text-on-surface">PDF Document</span>
                      </button>
                      <button onClick={() => { setExportType('csv'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                        <span className="text-label-md text-on-surface-variant">CSV File</span>
                      </button>
                      <button onClick={() => { setExportType('sheets'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                        <span className="text-label-md text-on-surface-variant">Google Sheets</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* ── Table ── */}
          <div className="flex-1 overflow-hidden relative">
            <ShotlistTable rows={filteredShots} />
          </div>
          
          {/* ── Footer ── */}
          <div className="h-10 shrink-0 bg-white border-t border-outline-variant flex items-center justify-between px-6 z-30">
            <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
              {filteredShots.length} Shots
            </span>
            <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
              Est. Time: {totalMin}:{totalSec.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippets.
    - Ensure the imports paths are correct.
  </constraints>
</system_prompt>
</file>

<file path="0501_1638_shotlist-export-modal-options.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to update the ExportUpgradeModal to dynamically handle PDF, CSV, and Google Sheets modes, ensuring CSV and Sheets only show "Cancel" instead of "Export with Watermark".
  </role>

  <task>
    Execute Hotfix: Update ExportUpgradeModal to handle dynamic exportTypes.

    **Step 1: Rewrite `ExportUpgradeModal.tsx`**
    - File: `components/linescript/ExportUpgradeModal.tsx`
    - The modal currently hardcodes the PDF warning. We need it to support `exportType?: 'pdf' | 'csv' | 'sheets' | null`.
    - When `exportType` is `csv` or `sheets`, it should show the premium locked message and provide "Upgrade Plan" and "Cancel" buttons.
    - When `exportType` is `pdf` (or undefined, to support backwards compatibility with Line Script), it should show the PDF watermark message and provide "Upgrade Plan" and "Export with Watermark" buttons.
    - Use full replacement for this file to ensure all dynamic mapping is correctly included.

    File content to use:
    ```tsx
    'use client';

    import { useRouter } from 'next/navigation';

    interface Props {
      isOpen: boolean;
      onClose: () => void;
      exportType?: 'pdf' | 'csv' | 'sheets' | null;
    }

    const CONTENT = {
      pdf: {
        title: "Export PDF",
        message: "Your current plan includes PDF exports with a Scenoo watermark. Upgrade to a Pro or Max plan to remove watermarks and unlock high-resolution exports.",
        icon: "workspace_premium",
        secondaryLabel: "Export with Watermark",
        secondaryIcon: "download"
      },
      csv: {
        title: "Export CSV",
        message: "Exporting to local CSV is a premium feature. Upgrade your plan to unlock full data portability.",
        icon: "lock",
        secondaryLabel: "Cancel",
        secondaryIcon: "close"
      },
      sheets: {
        title: "Sync to Google Sheets",
        message: "Real-time 1-way sync to your Google Drive account is available on premium plans. Upgrade to seamlessly edit your shotlist in Google Sheets.",
        icon: "lock",
        secondaryLabel: "Cancel",
        secondaryIcon: "close"
      }
    };

    export default function ExportUpgradeModal({ isOpen, onClose, exportType = 'pdf' }: Props) {
      const router = useRouter();

      if (!isOpen) return null;

      const type = exportType || 'pdf';
      const config = CONTENT[type];

      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-md w-full flex flex-col p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">{config.icon}</span>
                {config.title}
              </h2>
              <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-body-md text-on-surface-variant mb-6">
              {config.message}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/settings/plans')}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                Upgrade Plan
              </button>
              <button
                onClick={() => {
                  if (type === 'pdf') {
                    console.log("Generating PDF with watermark...");
                    // TODO: Wire up actual PDF generation logic here
                  }
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">{config.secondaryIcon}</span>
                {config.secondaryLabel}
              </button>
            </div>
          </div>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output the fully updated code for `ExportUpgradeModal.tsx`.
    - Do not modify other files.
  </constraints>
</system_prompt>
</file>

<file path="0501_1644_remove-rulers-freeze.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to rip out the decoupled rulers, resizing logic, and freeze pane features from the Breakdown Export "All Scenes" view. The user wants a clean, safe-zoned table focused ONLY on cursor-anchored zoom and virtual pop-out editing.
  </role>

  <task>
    **Step 1: Fully Rewrite `components/breakdown/ExportPreviewTable.tsx`**
    - Remove `freezeCols` and `freezeRows` from `Props`.
    - Remove `getColLeft` or any sticky/translate coordinate logic.
    - Ensure the outermost `<div>` enforces the safe zone: `className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]"`
    - Render standard `<th>` and `<td>` cells with `position: relative`. Do NOT use `position: sticky`, `zIndex: 40/50`, or `transform: translate`.
    - Keep the virtual pop-out editor (`isEditing` wrapper), double-click to edit, and `colWidths`/`rowHeights` applications via inline styles (but without any `transform` manipulation).

    File content to use:
    ```tsx
    "use client";

    import { useState } from "react";
    import { getCellId, useExportFormat } from "@/components/breakdown/ExportFormatContext";

    const TAG_COLORS: Record<string, { bg: string; text: string }> = {
      'CAST':                          { bg: '#FF0000', text: '#ffffff' },
      'EXTRA':                         { bg: '#00AA00', text: '#ffffff' },
      'PROPS':                         { bg: '#8800CC', text: '#ffffff' },
      'SET DRESSING':                  { bg: '#33BB33', text: '#ffffff' },
      'WARDROBE':                      { bg: '#00AADD', text: '#ffffff' },
      'MAKEUP/HAIR':                   { bg: '#FF6600', text: '#ffffff' },
      'VEHICLE / ANIMALS':             { bg: '#FF55AA', text: '#ffffff' },
      'SPECIAL EFFECTS':               { bg: '#0055BB', text: '#ffffff' },
      'SOUND EFFECTS & MUSIC':         { bg: '#FFCC00', text: '#000000' },
      'SPECIAL EQUIPMENT':             { bg: '#888888', text: '#ffffff' },
      'PRODUCTION NOTE (Underline)':   { bg: '#DDDDDD', text: '#000000' },
    };

    const COLUMNS = [
      'SCENE', 'I/E', 'D/N', 'Script Page', 'LOCATION NAME', 'DESCRIPTION', 
      'CAST', 'EXTRA', 'PROPS', 'SET DRESSING', 'WARDROBE', 'MAKEUP/HAIR', 
      'VEHICLE / ANIMALS', 'SPECIAL EFFECTS', 'SOUND EFFECTS & MUSIC', 
      'SPECIAL EQUIPMENT', 'PRODUCTION NOTE (Underline)',
    ];

    const MOCK_DATA: Record<string, string>[] = Array.from({ length: 12 }, (_, i) => ({
      'SCENE': `${i + 1}`,
      'I/E': i % 2 === 0 ? 'INT' : 'EXT',
      'D/N': i % 3 === 0 ? 'NIGHT' : 'DAY',
      'Script Page': `${i + 1}`,
      'LOCATION NAME': '',
      'DESCRIPTION': '',
      'CAST': '',
      'EXTRA': '',
      'PROPS': '',
      'SET DRESSING': '',
      'WARDROBE': '',
      'MAKEUP/HAIR': '',
      'VEHICLE / ANIMALS': '',
      'SPECIAL EFFECTS': '',
      'SOUND EFFECTS & MUSIC': '',
      'SPECIAL EQUIPMENT': '',
      'PRODUCTION NOTE (Underline)': '',
    }));

    function initCellValues(): Record<string, string> {
      const values: Record<string, string> = {};
      MOCK_DATA.forEach((row, rowIndex) => {
        COLUMNS.forEach((col, colIndex) => {
          values[getCellId(rowIndex, colIndex)] = row[col] ?? '';
        });
      });
      return values;
    }

    interface Props {
      fontFamily?: string;
    }

    export default function ExportPreviewTable({ fontFamily = "font-sans" }: Props) {
      const { selectedCellIds, cellStyles, isDragging, editingCell, setEditingCell, startMatrixSelection, updateMatrixSelection, colWidths, rowHeights } = useExportFormat();
      const [cellValues, setCellValues] = useState<Record<string, string>>(initCellValues);

      return (
        <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
          <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
            <colgroup>
              {COLUMNS.map((_, i) => (
                <col key={i} style={{ width: colWidths[i] || 120, minWidth: colWidths[i] || 120 }} />
              ))}
            </colgroup>
            <thead className="z-30">
              {/* Document Header */}
              <tr style={{ height: rowHeights[1] || 41 }}>
                <th 
                  colSpan={COLUMNS.length} 
                  className="bg-surface-container-lowest border border-outline-variant p-0"
                  style={{ position: 'relative' }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "360px 720px 360px 360px 240px" }}>
                    <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB", display: "flex", alignItems: "center" }}>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-outline">
                        SCRIPT BREAKDOWN
                      </span>
                    </div>
                    <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                      <input type="text" placeholder="PROJECT TITLE" className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
                    </div>
                    <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                      <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
                    </div>
                    <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                      <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase ${fontFamily || 'font-sans'}`} />
                    </div>
                    <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <span className="font-mono text-[10px] uppercase text-outline">BRANDING</span>
                      <span className="font-mono text-[10px] uppercase text-outline">LOGO</span>
                    </div>
                  </div>
                </th>
              </tr>
              {/* Data Headers */}
              <tr style={{ height: rowHeights[2] || 41 }}>
                {COLUMNS.map((col, i) => {
                  const colorConfig = TAG_COLORS[col];
                  return (
                    <th
                      key={col}
                      className={`border border-outline-variant text-[10px] font-normal text-center whitespace-normal break-words p-1 ${colorConfig ? 'font-bold' : 'bg-surface-container-low text-on-surface-variant'}`}
                      style={{
                        backgroundColor: colorConfig?.bg,
                        color: colorConfig?.text,
                        position: 'relative',
                      }}
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.map((_, rowIndex) => {
                return (
                  <tr key={rowIndex} style={{ height: rowHeights[rowIndex + 3] || 41 }}>
                    {COLUMNS.map((col, colIndex) => {
                      const cellId = getCellId(rowIndex, colIndex);
                      const isSelected = selectedCellIds.has(cellId);
                      const isEditing = editingCell === cellId;
                      const value = cellValues[cellId] ?? '';
                      const appliedStyle = cellStyles[cellId] || {};

                      return (
                        <td
                          key={col}
                          className={`border border-outline-variant text-body-md bg-white p-0 align-top ${isSelected ? 'border-primary bg-primary/10' : ''}`}
                          style={{ position: 'relative' }}
                        >
                          <div
                            className="absolute inset-0 overflow-hidden px-3 py-2 whitespace-normal break-words text-on-surface select-none cursor-cell"
                            style={appliedStyle}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              startMatrixSelection(rowIndex, colIndex);
                            }}
                            onMouseEnter={() => {
                              if (isDragging) updateMatrixSelection(rowIndex, colIndex);
                            }}
                            onDoubleClick={() => setEditingCell(cellId)}
                          >
                            {value}
                          </div>

                          {isEditing && (
                            <div
                              className="absolute top-[-2px] left-[-2px] z-[3] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm max-w-[600px] max-h-[450px]"
                              style={{ 
                                minWidth: Math.max(280, colWidths[colIndex] || 120),
                                minHeight: Math.max(124, rowHeights[rowIndex + 3] || 41)
                              }}
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
                            >
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setEditingCell(null)}
                                className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md z-[4] cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[14px]">check</span>
                              </button>
                              <textarea
                                autoFocus
                                value={value}
                                onChange={(e) => setCellValues({ ...cellValues, [cellId]: e.target.value })}
                                onFocus={(e) => {
                                  const len = e.currentTarget.value.length;
                                  e.currentTarget.setSelectionRange(len, len);
                                  e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                                    e.preventDefault();
                                    setEditingCell(null);
                                  }
                                }}
                                onBlur={() => setEditingCell(null)}
                                className="w-full h-full p-3 outline-none resize-y overflow-auto custom-scrollbar bg-transparent whitespace-normal break-words"
                                style={appliedStyle}
                              />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    ```

    **Step 2: Clean Up `app/(workspace)/workspace/[projectSlug]/[scriptId]/breakdown/export/page.tsx`**
    - Apply TARGETED REPLACEMENTS to completely remove the ruler state, freeze state, resizing state, and corresponding JSX.

    Target 1: Remove unneeded state and hooks.
    Locate:
    ```tsx
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat, colWidths, setColWidths, rowHeights, setRowHeights } = useExportFormat();

      const [resizing, setResizing] = useState<{ type: 'col' | 'row'; index: number; startPos: number; startSize: number } | null>(null);
      const [freezeCols, setFreezeCols] = useState(1);
      const [freezeRows, setFreezeRows] = useState(1);
    ```
    Replace with:
    ```tsx
      const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
      const [fontFamily, setFontFamily] = useState('font-sans');
      const { selectedCellIds, cellStyles, applyFormat } = useExportFormat();
    ```

    Target 2: Remove ruler/resize effect blocks.
    Locate the `startResize`, the `useEffect` for `resizing`, and the `syncRulers` function. Delete them entirely. Replace this entire block ending before `adjustZoom`:
    ```tsx
      const startResize = (e: React.MouseEvent, type: 'col' | 'row', index: number) => {
      // ... (all resize logic)
      // ...
      const syncRulers = () => {
        // ... (all sync logic)
      };
    ```
    Replace with:
    ```tsx
      // Decoupled rulers and resizing stripped per spec
    ```

    Target 3: Clean up the Top Action Bar (remove Freeze button).
    Locate:
    ```tsx
              <div className="flex items-center gap-1">
                <div className="relative z-50 shrink-0">
                  <button
                    onClick={() => setIsFreezeMenuOpen(!isFreezeMenuOpen)}
                    className="h-8 px-3 flex items-center justify-center gap-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  >
    ```
    (And delete the associated dropdown). Replace the entire Freeze block up to the Font Family `<select>` with just the Font Family block:
    ```tsx
              <div className="flex items-center gap-1">
                {/* Font Family */}
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
    ```

    Target 4: Rip out the Rulers from the Main Content area.
    Locate the root of the main content:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex flex-col overflow-hidden w-full relative">
            {/* Top Ruler Row */}
            {viewMode === 'all' && (
              // ...
            )}

            {/* Content Row */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Ruler */}
              {viewMode === 'all' && (
                 // ...
              )}

              {/* Scroll Container */}
              <div 
                ref={scrollContainerRef} 
                className="flex-1 overflow-auto touch-none custom-scrollbar" 
                onScroll={syncRulers}
                style={{ '--zoom-factor': zoom / 100 } as React.CSSProperties}
              >
    ```
    Replace with:
    ```tsx
          {/* ── Main Content ── */}
          <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef} 
              className="flex-1 overflow-auto touch-none custom-scrollbar" 
            >
    ```

    (Note: ensure the inner scale wrapper remains intact, e.g., `<div className="w-max origin-top-left"...`)
  </task>

  <constraints>
    - Ensure targeted replacements properly clear out the unneeded hooks without breaking the file.
    - Remove the `isFreezeMenuOpen` state as well.
  </constraints>
</system_prompt>
</file>

<file path="0501_2305_shotlist-table-refactor.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to completely rewrite `ShotlistTable.tsx` to use a native HTML `<table>` element, implementing algorithmic `rowSpan` grouping for Scene# and Location, and injecting gray spacer rows between scene breaks.
  </role>

  <task>
    Execute Phase 1: Native HTML Table Refactor & Row Grouping Algorithm.

    **Step 1: Completely Overwrite `components/shotlist/ShotlistTable.tsx`**
    - Discard the old `div flex` logic. Do not import `ShotlistTableHeader` or `ShotlistTableRow` anymore.
    - Implement a `spanMap` algorithm to group consecutive rows that share both `sceneNumber` and `location`.
    - Inject spacer rows (`isSpacer: true`) whenever `sceneNumber` changes.
    - Use `table-layout: fixed`, `border-collapse: collapse`, and `<colgroup>` to enforce exact column widths.
    - Apply `align-middle whitespace-pre-wrap` to all `<td>` elements. Header `<th>` elements must be bold and centered.
    - Use Tailwind `group` on `<tr>` and `group-hover:bg-surface-container-low` on `<td>` to properly highlight sticky cells on hover.

    File content to use:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';

    interface ShotlistTableProps {
      rows: ShotRow[];
    }

    const COLUMNS = [
      { key: 'orderIndex', label: '#', width: 48, frozen: true, left: 0 },
      { key: 'sceneNumber', label: 'SC#', width: 64, frozen: true, left: 48 },
      { key: 'shotNumber', label: 'SH#', width: 64, frozen: true, left: 112 },
      { key: 'location', label: 'LOCATION', width: 144 },
      { key: 'intExt', label: 'INT/EXT', width: 80 },
      { key: 'dayNight', label: 'D/N', width: 80 },
      { key: 'storyboard', label: 'STORYBOARD', width: 96 },
      { key: 'description', label: 'DESCRIPTION', width: 220 },
      { key: 'dialogue', label: 'DIALOGUE', width: 220 },
      { key: 'subjects', label: 'SUBJECTS', width: 128 },
      { key: 'scriptTime', label: 'SCRIPT TIME', width: 96 },
      { key: 'shotSize', label: 'SHOT SIZE', width: 128 },
      { key: 'shotType', label: 'SHOT TYPE', width: 128 },
      { key: 'side', label: 'SIDE', width: 64 },
      { key: 'angle', label: 'ANGLE', width: 112 },
      { key: 'movement', label: 'MOVEMENT', width: 112 },
      { key: 'lens', label: 'LENS', width: 80 },
      { key: 'note', label: 'NOTE', width: 192 },
    ];

    type ProcessedItem = { type: 'shot'; id: string; shot: ShotRow } | { type: 'spacer'; id: string };

    export default function ShotlistTable({ rows }: ShotlistTableProps) {
      const items: ProcessedItem[] = [];
      const spanMap = new Map<string, number>(); 
      let currentGroupRoot: ShotRow | null = null;
      let lastScene: string | null = null;

      rows.forEach((row, i) => {
        if (lastScene !== null && row.sceneNumber !== lastScene) {
          items.push({ type: 'spacer', id: `spacer-${row.id}` });
          currentGroupRoot = null;
        }

        if (!currentGroupRoot || currentGroupRoot.sceneNumber !== row.sceneNumber || currentGroupRoot.location !== row.location) {
          currentGroupRoot = row;
          spanMap.set(row.id, 1);
        } else {
          spanMap.set(currentGroupRoot.id, spanMap.get(currentGroupRoot.id)! + 1);
          spanMap.set(row.id, 0);
        }

        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      return (
        <div className="w-full h-full overflow-auto custom-scrollbar bg-surface-container-lowest">
          <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              {COLUMNS.map((c) => (
                <col key={c.key} style={{ width: c.width, minWidth: c.width }} />
              ))}
            </colgroup>
            <thead className="sticky top-0 z-30 bg-surface-container-low shadow-sm">
              <tr>
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    className="border border-outline-variant p-2 text-label-sm font-bold text-center align-middle uppercase text-on-surface-variant bg-surface-container-low"
                    style={c.frozen ? { position: 'sticky', left: c.left, zIndex: 40 } : undefined}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                if (item.type === 'spacer') {
                  return (
                    <tr key={item.id} className="bg-surface-container h-8">
                      <td className="sticky left-0 z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td className="sticky left-[48px] z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td className="sticky left-[112px] z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td colSpan={15} className="bg-surface-container border border-outline-variant p-0"></td>
                    </tr>
                  );
                }

                const row = item.shot;
                const rowSpan = spanMap.get(row.id) || 0;
                const showGroupCells = rowSpan > 0;
                const tdBase = "border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                const tdFrozenBase = "sticky z-20 border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";

                return (
                  <tr key={row.id} className="group">
                    {/* 1. # */}
                    <td className={`${tdFrozenBase} left-0 text-center font-medium text-secondary`}>{row.orderIndex}</td>
                    
                    {/* 2. SC# */}
                    {showGroupCells && (
                      <td rowSpan={rowSpan} className={`${tdFrozenBase} left-[48px] text-center font-bold`}>
                        {row.sceneNumber}
                      </td>
                    )}
                    
                    {/* 3. SH# */}
                    <td className={`${tdFrozenBase} left-[112px] text-center font-medium`}>{row.shotNumber}</td>
                    
                    {/* 4. LOCATION */}
                    {showGroupCells && (
                      <td rowSpan={rowSpan} className={`${tdBase} text-center font-bold`}>
                        {row.location}
                      </td>
                    )}
                    
                    {/* 5-18. Other Fields */}
                    <td className={`${tdBase} text-center`}>{row.intExt}</td>
                    <td className={`${tdBase} text-center`}>{row.dayNight}</td>
                    <td className={`${tdBase} text-center`}>{row.storyboardUrl ? 'Image' : ''}</td>
                    <td className={`${tdBase} text-left`}>{row.description}</td>
                    <td className={`${tdBase} text-left`}>{row.dialogue}</td>
                    <td className={`${tdBase} text-center`}>{row.subjects}</td>
                    <td className={`${tdBase} text-center`}>{row.scriptTime}</td>
                    <td className={`${tdBase} text-center`}>{row.shotSize}</td>
                    <td className={`${tdBase} text-center`}>{row.shotType}</td>
                    <td className={`${tdBase} text-center`}>{row.side}</td>
                    <td className={`${tdBase} text-center`}>{row.angle}</td>
                    <td className={`${tdBase} text-center`}>{row.movement}</td>
                    <td className={`${tdBase} text-center`}>{row.lens}</td>
                    <td className={`${tdBase} text-left`}>{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Ensure exactly this code replaces `ShotlistTable.tsx`.
    - Do not output unchanged files or old components.
  </constraints>
</system_prompt>
</file>

<file path="0501_2315_shotlist-table-phase2.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to execute Phase 2 of the Shotlist refactor: Implement the aggregation footer (<tfoot>) with hover-detail popovers, and convert the Storyboard column into an image upload dropzone.
  </role>

  <task>
    Execute Phase 2: Summary Footer & Storyboard Upload UI.

    **Step 1: Overwrite `components/shotlist/ShotlistTable.tsx`**
    - Retain the Phase 1 native `<table>`, `colgroup`, and `spanMap` algorithm.
    - Add a `useMemo` block to calculate aggregations for the footer (total shots, unique scenes, total script time, and frequency maps for location, int/ext, day/night, characters in dialogue, subjects, shot size, type, angle, movement, lens).
    - Add a `<tfoot>` stuck to the bottom (`sticky bottom-0 z-30`) to display these summaries.
    - Create an internal helper `renderStat()` that returns a `<td>` containing the aggregated number and a hover-activated absolute popover displaying the detailed breakdown.
    - Update the `STORYBOARD` `<td>` in the `<tbody>` to use a hidden `<input type="file">` wrapped in a stylized `<label>` with a hover overlay.

    File content to use:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo } from 'react';

    interface ShotlistTableProps {
      rows: ShotRow[];
    }

    const COLUMNS = [
      { key: 'orderIndex', label: '#', width: 48, frozen: true, left: 0 },
      { key: 'sceneNumber', label: 'SC#', width: 64, frozen: true, left: 48 },
      { key: 'shotNumber', label: 'SH#', width: 64, frozen: true, left: 112 },
      { key: 'location', label: 'LOCATION', width: 144 },
      { key: 'intExt', label: 'INT/EXT', width: 80 },
      { key: 'dayNight', label: 'D/N', width: 80 },
      { key: 'storyboard', label: 'STORYBOARD', width: 96 },
      { key: 'description', label: 'DESCRIPTION', width: 220 },
      { key: 'dialogue', label: 'DIALOGUE', width: 220 },
      { key: 'subjects', label: 'SUBJECTS', width: 128 },
      { key: 'scriptTime', label: 'SCRIPT TIME', width: 96 },
      { key: 'shotSize', label: 'SHOT SIZE', width: 128 },
      { key: 'shotType', label: 'SHOT TYPE', width: 128 },
      { key: 'side', label: 'SIDE', width: 64 },
      { key: 'angle', label: 'ANGLE', width: 112 },
      { key: 'movement', label: 'MOVEMENT', width: 112 },
      { key: 'lens', label: 'LENS', width: 80 },
      { key: 'note', label: 'NOTE', width: 192 },
    ];

    type ProcessedItem = { type: 'shot'; id: string; shot: ShotRow } | { type: 'spacer'; id: string };

    export default function ShotlistTable({ rows }: ShotlistTableProps) {
      const items: ProcessedItem[] = [];
      const spanMap = new Map<string, number>(); 
      let currentGroupRoot: ShotRow | null = null;
      let lastScene: string | null = null;

      // Grouping Algorithm
      rows.forEach((row) => {
        if (lastScene !== null && row.sceneNumber !== lastScene) {
          items.push({ type: 'spacer', id: `spacer-${row.id}` });
          currentGroupRoot = null;
        }

        if (!currentGroupRoot || currentGroupRoot.sceneNumber !== row.sceneNumber || currentGroupRoot.location !== row.location) {
          currentGroupRoot = row;
          spanMap.set(row.id, 1);
        } else {
          spanMap.set(currentGroupRoot.id, spanMap.get(currentGroupRoot.id)! + 1);
          spanMap.set(row.id, 0);
        }

        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      // Aggregation Logic (Phase 2)
      const stats = useMemo(() => {
        const countFreq = (arr: string[]) => {
          const counts: Record<string, number> = {};
          arr.forEach(a => {
            if (!a) return;
            const key = a.trim();
            if (key) counts[key] = (counts[key] || 0) + 1;
          });
          return Object.entries(counts).sort((a,b) => b[1] - a[1]);
        };

        const locStats = countFreq(rows.map(r => r.location));
        const ieStats = countFreq(rows.map(r => r.intExt));
        const dnStats = countFreq(rows.map(r => r.dayNight));
        const sizeStats = countFreq(rows.map(r => r.shotSize));
        const typeStats = countFreq(rows.map(r => r.shotType));
        const angleStats = countFreq(rows.map(r => r.angle));
        const movStats = countFreq(rows.map(r => r.movement));
        const lensStats = countFreq(rows.map(r => r.lens));

        const allSubjects = rows.flatMap(r => r.subjects.split(',').map(s => s.trim()).filter(Boolean));
        const subjStats = countFreq(allSubjects);

        let dialogueCount = 0;
        const charLines: string[] = [];
        rows.forEach(r => {
          if (r.dialogue && r.dialogue.trim()) {
            dialogueCount++;
            const lines = r.dialogue.split('\n');
            lines.forEach(l => {
              const match = l.match(/^([A-Z0-9\s]+)/);
              if (match && match[1].trim()) charLines.push(match[1].trim());
            });
          }
        });
        const charStats = countFreq(charLines);

        const totalSecs = rows.reduce((acc, r) => {
          if (!r.scriptTime) return acc;
          const parts = r.scriptTime.split(':');
          if (parts.length === 2) return acc + parseInt(parts, 10) * 60 + parseInt(parts[1], 10);
          return acc;
        }, 0);
        const timeFormatted = `${Math.floor(totalSecs / 60).toString().padStart(2,'0')}:${(totalSecs % 60).toString().padStart(2,'0')}`;

        return {
          totalShots: rows.length,
          totalScenes: new Set(rows.map(r => r.sceneNumber)).size,
          locStats, ieStats, dnStats, sizeStats, typeStats, angleStats, movStats, lensStats,
          subjStats, uniqueSubj: new Set(allSubjects).size,
          dialogueCount, charStats, timeFormatted
        };
      }, [rows]);

      const renderStat = (value: React.ReactNode, title: string, list?: [string, number][], stickyLeft?: number) => {
        const isSticky = stickyLeft !== undefined;
        const hasList = list && list.length > 0;
        return (
          <td
            className={`border border-outline-variant p-2 text-center align-middle font-bold bg-surface-container-low relative ${hasList ? 'group cursor-help hover:bg-surface-container transition-colors' : ''} ${isSticky ? 'sticky z-40' : ''}`}
            style={isSticky ? { left: stickyLeft } : undefined}
          >
            <span className="text-primary">{value}</span>
            {hasList && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] bg-inverse-surface text-inverse-on-surface text-label-sm p-3 rounded-lg shadow-xl hidden group-hover:block z-50 text-left">
                <div className="font-bold mb-2 pb-2 border-b border-outline-variant/30 text-white uppercase tracking-wider">{title}</div>
                <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  {list.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6"><span className="text-inverse-on-surface/80">{k}</span><span className="font-mono text-white">{v}</span></div>
                  ))}
                </div>
              </div>
            )}
          </td>
        );
      };

      return (
        <div className="w-full h-full overflow-auto custom-scrollbar bg-surface-container-lowest relative">
          <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              {COLUMNS.map((c) => (
                <col key={c.key} style={{ width: c.width, minWidth: c.width }} />
              ))}
            </colgroup>
            <thead className="sticky top-0 z-30 bg-surface-container-low shadow-sm">
              <tr>
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    className="border border-outline-variant p-2 text-label-sm font-bold text-center align-middle uppercase text-on-surface-variant bg-surface-container-low"
                    style={c.frozen ? { position: 'sticky', left: c.left, zIndex: 40 } : undefined}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                if (item.type === 'spacer') {
                  return (
                    <tr key={item.id} className="bg-surface-container h-8">
                      <td className="sticky left-0 z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td className="sticky left-[48px] z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td className="sticky left-[112px] z-20 bg-surface-container border border-outline-variant p-0"></td>
                      <td colSpan={15} className="bg-surface-container border border-outline-variant p-0"></td>
                    </tr>
                  );
                }

                const row = item.shot;
                const rowSpan = spanMap.get(row.id) || 0;
                const showGroupCells = rowSpan > 0;
                const tdBase = "border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                const tdFrozenBase = "sticky z-20 border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";

                return (
                  <tr key={row.id} className="group">
                    {/* 1. # */}
                    <td className={`${tdFrozenBase} left-0 text-center font-medium text-secondary`}>{row.orderIndex}</td>
                    
                    {/* 2. SC# */}
                    {showGroupCells && (
                      <td rowSpan={rowSpan} className={`${tdFrozenBase} left-[48px] text-center font-bold`}>
                        {row.sceneNumber}
                      </td>
                    )}
                    
                    {/* 3. SH# */}
                    <td className={`${tdFrozenBase} left-[112px] text-center font-medium`}>{row.shotNumber}</td>
                    
                    {/* 4. LOCATION */}
                    {showGroupCells && (
                      <td rowSpan={rowSpan} className={`${tdBase} text-center font-bold`}>
                        {row.location}
                      </td>
                    )}
                    
                    {/* 5, 6. INT/EXT, D/N */}
                    <td className={`${tdBase} text-center`}>{row.intExt}</td>
                    <td className={`${tdBase} text-center`}>{row.dayNight}</td>
                    
                    {/* 7. STORYBOARD (Dropzone UI) */}
                    <td className={`${tdBase} p-1 align-middle`}>
                      <label className="block w-full h-14 border-2 border-dashed border-outline-variant rounded flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors relative overflow-hidden group/sb bg-[#f9f9ff]">
                        {row.storyboardUrl ? (
                          <>
                            <img src={row.storyboardUrl} alt="Storyboard" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 hidden group-hover/sb:flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-[18px]">edit</span>
                            </div>
                          </>
                        ) : (
                          <span className="material-symbols-outlined text-outline-variant group-hover/sb:text-primary text-[20px]">add_a_photo</span>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => console.log('Upload image for row', row.id, e.target.files?.)} />
                      </label>
                    </td>

                    {/* 8-18. Other Fields */}
                    <td className={`${tdBase} text-left`}>{row.description}</td>
                    <td className={`${tdBase} text-left`}>{row.dialogue}</td>
                    <td className={`${tdBase} text-center`}>{row.subjects}</td>
                    <td className={`${tdBase} text-center font-mono text-[12px]`}>{row.scriptTime}</td>
                    <td className={`${tdBase} text-center`}>{row.shotSize}</td>
                    <td className={`${tdBase} text-center`}>{row.shotType}</td>
                    <td className={`${tdBase} text-center`}>{row.side}</td>
                    <td className={`${tdBase} text-center`}>{row.angle}</td>
                    <td className={`${tdBase} text-center`}>{row.movement}</td>
                    <td className={`${tdBase} text-center`}>{row.lens}</td>
                    <td className={`${tdBase} text-left`}>{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
            
            {/* Phase 2: Aggregation Footer */}
            <tfoot className="sticky bottom-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <tr className="h-10">
                {renderStat(stats.totalShots, "Total Shots", undefined, 0)}
                {renderStat(stats.totalScenes, "Total Scenes", undefined, 48)}
                {renderStat(stats.totalShots, "Total Shots", undefined, 112)}
                {renderStat(stats.locStats.length, "Locations", stats.locStats)}
                {renderStat(stats.ieStats.length, "INT/EXT", stats.ieStats)}
                {renderStat(stats.dnStats.length, "Day/Night", stats.dnStats)}
                <td className="border border-outline-variant bg-surface-container-low"></td>
                <td className="border border-outline-variant bg-surface-container-low"></td>
                {renderStat(stats.dialogueCount, "Dialogue Mentions", stats.charStats)}
                {renderStat(stats.uniqueSubj, "Unique Subjects", stats.subjStats)}
                {renderStat(stats.timeFormatted, "Total Time", undefined)}
                {renderStat(stats.sizeStats.length, "Shot Sizes", stats.sizeStats)}
                {renderStat(stats.typeStats.length, "Shot Types", stats.typeStats)}
                <td className="border border-outline-variant bg-surface-container-low"></td>
                {renderStat(stats.angleStats.length, "Angles", stats.angleStats)}
                {renderStat(stats.movStats.length, "Movements", stats.movStats)}
                {renderStat(stats.lensStats.length, "Lenses", stats.lensStats)}
                <td className="border border-outline-variant bg-surface-container-low"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Output the fully updated code for `ShotlistTable.tsx`.
    - Do not modify other files in this task.
  </constraints>
</system_prompt>
</file>

<file path="0501_2316_shotlist-phase3-report-visibility.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to execute Phase 3 of the Shotlist refactor: Implement dynamic column visibility, field filters UI, and a new Report Dashboard.
  </role>

  <task>
    Execute Phase 3: Column Visibility, Filters & Report Dashboard.

    **Step 1: Create `components/shotlist/ShotlistReport.tsx`**
    - Create a minimal dashboard displaying statistics for LOCATION, INT/EXT, D/N, SUBJECTS, SHOT SIZE, SHOT TYPE, ANGLE, MOVEMENT, LENS, and SCRIPT TIME.
    
    File content to use:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo } from 'react';

    export default function ShotlistReport({ rows }: { rows: ShotRow[] }) {
      const stats = useMemo(() => {
        const countFreq = (arr: string[]) => {
          const counts: Record<string, number> = {};
          arr.forEach(a => {
            const key = a?.trim();
            if (key) counts[key] = (counts[key] || 0) + 1;
          });
          return Object.entries(counts).sort((a, b) => b[1] - a[1]);
        };

        const locStats = countFreq(rows.map(r => r.location));
        const ieStats = countFreq(rows.map(r => r.intExt));
        const dnStats = countFreq(rows.map(r => r.dayNight));
        const sizeStats = countFreq(rows.map(r => r.shotSize));
        const typeStats = countFreq(rows.map(r => r.shotType));
        const angleStats = countFreq(rows.map(r => r.angle));
        const movStats = countFreq(rows.map(r => r.movement));
        const lensStats = countFreq(rows.map(r => r.lens));
        
        const allSubjects = rows.flatMap(r => r.subjects.split(',').map(s => s.trim()).filter(Boolean));
        const subjStats = countFreq(allSubjects);

        const totalSecs = rows.reduce((acc, r) => {
          if (!r.scriptTime) return acc;
          const parts = r.scriptTime.split(':');
          if (parts.length === 2) return acc + parseInt(parts, 10) * 60 + parseInt(parts[1], 10);
          return acc;
        }, 0);
        const timeFormatted = `${Math.floor(totalSecs / 60).toString().padStart(2,'0')}:${(totalSecs % 60).toString().padStart(2,'0')}`;

        return { locStats, ieStats, dnStats, sizeStats, typeStats, angleStats, movStats, lensStats, subjStats, timeFormatted, totalShots: rows.length };
      }, [rows]);

      const renderCard = (title: string, data: [string, number][]) => (
        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm flex flex-col h-64">
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
        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#f9f9ff] p-8">
          <div className="max-w-[1200px] mx-auto">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {renderCard('Locations', stats.locStats)}
              {renderCard('Int/Ext', stats.ieStats)}
              {renderCard('Day/Night', stats.dnStats)}
              {renderCard('Subjects', stats.subjStats)}
              {renderCard('Shot Sizes', stats.sizeStats)}
              {renderCard('Shot Types', stats.typeStats)}
              {renderCard('Angles', stats.angleStats)}
              {renderCard('Movements', stats.movStats)}
              {renderCard('Lenses', stats.lensStats)}
            </div>
          </div>
        </div>
      );
    }
    ```

    **Step 2: Overwrite `components/shotlist/ShotlistTable.tsx` for Dynamic Columns**
    - Apply full overwrite to handle `visibleCols` dynamically. Calculate actual `left` positions for frozen columns so gaps do not appear when a frozen column is hidden.
    
    File content to use:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo } from 'react';

    interface ShotlistTableProps {
      rows: ShotRow[];
      visibleCols?: string[];
    }

    const ALL_COLUMNS = [
      { key: 'orderIndex', label: '#', width: 48, frozen: true },
      { key: 'sceneNumber', label: 'SC#', width: 64, frozen: true },
      { key: 'shotNumber', label: 'SH#', width: 64, frozen: true },
      { key: 'location', label: 'LOCATION', width: 144 },
      { key: 'intExt', label: 'INT/EXT', width: 80 },
      { key: 'dayNight', label: 'D/N', width: 80 },
      { key: 'storyboard', label: 'STORYBOARD', width: 96 },
      { key: 'description', label: 'DESCRIPTION', width: 220 },
      { key: 'dialogue', label: 'DIALOGUE', width: 220 },
      { key: 'subjects', label: 'SUBJECTS', width: 128 },
      { key: 'scriptTime', label: 'SCRIPT TIME', width: 96 },
      { key: 'shotSize', label: 'SHOT SIZE', width: 128 },
      { key: 'shotType', label: 'SHOT TYPE', width: 128 },
      { key: 'side', label: 'SIDE', width: 64 },
      { key: 'angle', label: 'ANGLE', width: 112 },
      { key: 'movement', label: 'MOVEMENT', width: 112 },
      { key: 'lens', label: 'LENS', width: 80 },
      { key: 'note', label: 'NOTE', width: 192 },
    ];

    type ProcessedItem = { type: 'shot'; id: string; shot: ShotRow } | { type: 'spacer'; id: string };

    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const items: ProcessedItem[] = [];
      const spanMap = new Map<string, number>(); 
      let currentGroupRoot: ShotRow | null = null;
      let lastScene: string | null = null;

      rows.forEach((row) => {
        if (lastScene !== null && row.sceneNumber !== lastScene) {
          items.push({ type: 'spacer', id: `spacer-${row.id}` });
          currentGroupRoot = null;
        }

        if (!currentGroupRoot || currentGroupRoot.sceneNumber !== row.sceneNumber || currentGroupRoot.location !== row.location) {
          currentGroupRoot = row;
          spanMap.set(row.id, 1);
        } else {
          spanMap.set(currentGroupRoot.id, spanMap.get(currentGroupRoot.id)! + 1);
          spanMap.set(row.id, 0);
        }

        items.push({ type: 'shot', id: row.id, shot: row });
        lastScene = row.sceneNumber;
      });

      const activeCols = visibleCols ? ALL_COLUMNS.filter(c => visibleCols.includes(c.key)) : ALL_COLUMNS;
      let currentLeft = 0;
      const positionedCols = activeCols.map(c => {
        const col = { ...c, left: currentLeft };
        if (c.frozen) currentLeft += c.width;
        return col;
      });

      const stats = useMemo(() => {
        const countFreq = (arr: string[]) => {
          const counts: Record<string, number> = {};
          arr.forEach(a => {
            const key = a?.trim();
            if (key) counts[key] = (counts[key] || 0) + 1;
          });
          return Object.entries(counts).sort((a,b) => b[1] - a[1]);
        };

        const locStats = countFreq(rows.map(r => r.location));
        const ieStats = countFreq(rows.map(r => r.intExt));
        const dnStats = countFreq(rows.map(r => r.dayNight));
        const sizeStats = countFreq(rows.map(r => r.shotSize));
        const typeStats = countFreq(rows.map(r => r.shotType));
        const angleStats = countFreq(rows.map(r => r.angle));
        const movStats = countFreq(rows.map(r => r.movement));
        const lensStats = countFreq(rows.map(r => r.lens));

        const allSubjects = rows.flatMap(r => r.subjects.split(',').map(s => s.trim()).filter(Boolean));
        const subjStats = countFreq(allSubjects);

        let dialogueCount = 0;
        const charLines: string[] = [];
        rows.forEach(r => {
          if (r.dialogue && r.dialogue.trim()) {
            dialogueCount++;
            const lines = r.dialogue.split('\n');
            lines.forEach(l => {
              const match = l.match(/^([A-Z0-9\s]+)/);
              if (match && match.trim()) charLines.push(match.trim());
            });
          }
        });
        const charStats = countFreq(charLines);

        const totalSecs = rows.reduce((acc, r) => {
          if (!r.scriptTime) return acc;
          const parts = r.scriptTime.split(':');
          if (parts.length === 2) return acc + parseInt(parts, 10) * 60 + parseInt(parts[1], 10);
          return acc;
        }, 0);
        const timeFormatted = `${Math.floor(totalSecs / 60).toString().padStart(2,'0')}:${(totalSecs % 60).toString().padStart(2,'0')}`;

        return {
          totalShots: rows.length,
          totalScenes: new Set(rows.map(r => r.sceneNumber)).size,
          locStats, ieStats, dnStats, sizeStats, typeStats, angleStats, movStats, lensStats,
          subjStats, uniqueSubj: new Set(allSubjects).size,
          dialogueCount, charStats, timeFormatted
        };
      }, [rows]);

      const renderStat = (colKey: string) => {
        let value: React.ReactNode = "";
        let title = "";
        let list: [string, number][] | undefined = undefined;

        switch (colKey) {
          case 'orderIndex': value = stats.totalShots; title = "Total Shots"; break;
          case 'sceneNumber': value = stats.totalScenes; title = "Total Scenes"; break;
          case 'shotNumber': value = stats.totalShots; title = "Total Shots"; break;
          case 'location': value = stats.locStats.length; title = "Locations"; list = stats.locStats; break;
          case 'intExt': value = stats.ieStats.length; title = "INT/EXT"; list = stats.ieStats; break;
          case 'dayNight': value = stats.dnStats.length; title = "Day/Night"; list = stats.dnStats; break;
          case 'dialogue': value = stats.dialogueCount; title = "Dialogue Mentions"; list = stats.charStats; break;
          case 'subjects': value = stats.uniqueSubj; title = "Unique Subjects"; list = stats.subjStats; break;
          case 'scriptTime': value = stats.timeFormatted; title = "Total Time"; break;
          case 'shotSize': value = stats.sizeStats.length; title = "Shot Sizes"; list = stats.sizeStats; break;
          case 'shotType': value = stats.typeStats.length; title = "Shot Types"; list = stats.typeStats; break;
          case 'angle': value = stats.angleStats.length; title = "Angles"; list = stats.angleStats; break;
          case 'movement': value = stats.movStats.length; title = "Movements"; list = stats.movStats; break;
          case 'lens': value = stats.lensStats.length; title = "Lenses"; list = stats.lensStats; break;
          default: return <td key={colKey} className="border border-outline-variant bg-surface-container-low"></td>;
        }

        const hasList = list && list.length > 0;
        const c = positionedCols.find(x => x.key === colKey);
        const isSticky = c?.frozen;

        return (
          <td
            key={colKey}
            className={`border border-outline-variant p-2 text-center align-middle font-bold bg-surface-container-low relative ${hasList ? 'group cursor-help hover:bg-surface-container transition-colors' : ''} ${isSticky ? 'sticky z-40' : ''}`}
            style={isSticky ? { left: c?.left } : undefined}
          >
            <span className="text-primary">{value}</span>
            {hasList && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] bg-inverse-surface text-inverse-on-surface text-label-sm p-3 rounded-lg shadow-xl hidden group-hover:block z-50 text-left">
                <div className="font-bold mb-2 pb-2 border-b border-outline-variant/30 text-white uppercase tracking-wider">{title}</div>
                <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                  {list.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6"><span className="text-inverse-on-surface/80">{k}</span><span className="font-mono text-white">{v}</span></div>
                  ))}
                </div>
              </div>
            )}
          </td>
        );
      };

      return (
        <div className="w-full h-full overflow-auto custom-scrollbar bg-surface-container-lowest relative">
          <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              {positionedCols.map((c) => (
                <col key={c.key} style={{ width: c.width, minWidth: c.width }} />
              ))}
            </colgroup>
            <thead className="sticky top-0 z-30 bg-surface-container-low shadow-sm">
              <tr>
                {positionedCols.map((c) => (
                  <th
                    key={c.key}
                    className="border border-outline-variant p-2 text-label-sm font-bold text-center align-middle uppercase text-on-surface-variant bg-surface-container-low"
                    style={c.frozen ? { position: 'sticky', left: c.left, zIndex: 40 } : undefined}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                if (item.type === 'spacer') {
                  return (
                    <tr key={item.id} className="bg-surface-container h-8">
                      {positionedCols.map((c) => (
                        <td key={c.key} className={`bg-surface-container border border-outline-variant p-0 ${c.frozen ? 'sticky z-20' : ''}`} style={c.frozen ? { left: c.left } : undefined}></td>
                      ))}
                    </tr>
                  );
                }

                const row = item.shot;
                const rowSpan = spanMap.get(row.id) || 0;
                const showGroupCells = rowSpan > 0;

                return (
                  <tr key={row.id} className="group">
                    {positionedCols.map(c => {
                      const tdBase = "border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                      const tdFrozenBase = "sticky z-20 border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                      const baseClass = c.frozen ? tdFrozenBase : tdBase;
                      const style = c.frozen ? { left: c.left } : undefined;

                      if (c.key === 'sceneNumber' || c.key === 'location') {
                        if (!showGroupCells) return null;
                        return <td key={c.key} rowSpan={rowSpan} className={`${baseClass} text-center font-bold`} style={style}>{row[c.key as keyof ShotRow]}</td>;
                      }
                      
                      if (c.key === 'orderIndex' || c.key === 'shotNumber' || c.key === 'intExt' || c.key === 'dayNight' || c.key === 'scriptTime' || c.key === 'shotSize' || c.key === 'shotType' || c.key === 'side' || c.key === 'angle' || c.key === 'movement' || c.key === 'lens' || c.key === 'subjects') {
                        return <td key={c.key} className={`${baseClass} text-center ${c.key==='orderIndex'?'font-medium text-secondary':''} ${c.key==='shotNumber'?'font-medium':''} ${c.key==='scriptTime'?'font-mono text-[12px]':''}`} style={style}>{row[c.key as keyof ShotRow]}</td>;
                      }

                      if (c.key === 'storyboard') {
                        return (
                          <td key={c.key} className={`${baseClass} p-1 align-middle`} style={style}>
                            <label className="block w-full h-14 border-2 border-dashed border-outline-variant rounded flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors relative overflow-hidden group/sb bg-[#f9f9ff]">
                              {row.storyboardUrl ? (
                                <>
                                  <img src={row.storyboardUrl} alt="Storyboard" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 hidden group-hover/sb:flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-[18px]">edit</span>
                                  </div>
                                </>
                              ) : (
                                <span className="material-symbols-outlined text-outline-variant group-hover/sb:text-primary text-[20px]">add_a_photo</span>
                              )}
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => console.log('Upload image', e.target.files?.)} />
                            </label>
                          </td>
                        );
                      }

                      // Description, Dialogue, Note
                      return <td key={c.key} className={`${baseClass} text-left`} style={style}>{row[c.key as keyof ShotRow]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
            
            <tfoot className="sticky bottom-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-10">
              <tr>
                {positionedCols.map(c => renderStat(c.key))}
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    ```

    **Step 3: Wire Toggles & Dashboard into `components/shotlist/ShotlistContainer.tsx`**
    - Add `viewMode`, `visibleCols`, and menus. Connect everything. Use TARGETED REPLACEMENTS.
    
    Replace imports and top constants:
    ```tsx
    'use client';

    import { useState } from 'react';
    import { useParams } from 'next/navigation';
    import type { ShotRow } from '@/types/shotlist';
    import ShotlistTable from './ShotlistTable';
    import ShotlistReport from './ShotlistReport';
    import ShareScriptModal from '@/components/projects/ShareScriptModal';
    import ExportUpgradeModal from '@/components/linescript/ExportUpgradeModal';
    import type { ScriptVersion } from '@/types/project';

    const TOOLBAR_BTN = 'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';

    function ToolbarDivider() {
      return <div className="w-px h-6 bg-outline-variant mx-1 shrink-0" />;
    }

    const ALL_COLUMN_KEYS = [
      { key: 'orderIndex', label: '#' }, { key: 'sceneNumber', label: 'SC#' }, { key: 'shotNumber', label: 'SH#' },
      { key: 'location', label: 'LOCATION' }, { key: 'intExt', label: 'INT/EXT' }, { key: 'dayNight', label: 'D/N' },
      { key: 'storyboard', label: 'STORYBOARD' }, { key: 'description', label: 'DESCRIPTION' }, { key: 'dialogue', label: 'DIALOGUE' },
      { key: 'subjects', label: 'SUBJECTS' }, { key: 'scriptTime', label: 'SCRIPT TIME' }, { key: 'shotSize', label: 'SHOT SIZE' },
      { key: 'shotType', label: 'SHOT TYPE' }, { key: 'side', label: 'SIDE' }, { key: 'angle', label: 'ANGLE' },
      { key: 'movement', label: 'MOVEMENT' }, { key: 'lens', label: 'LENS' }, { key: 'note', label: 'NOTE' }
    ];
    ```

    Replace state initializations exactly as follows:
    ```tsx
    export default function ShotlistContainer() {
      const params = useParams();
      const [shots] = useState<ShotRow[]>(MOCK_SHOTS);
      const [searchQuery, setSearchQuery] = useState('');
      const [isShareModalOpen, setIsShareModalOpen] = useState(false);
      const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
      const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);

      // Phase 3 States
      const [viewMode, setViewMode] = useState<'table' | 'report'>('table');
      const [visibleCols, setVisibleCols] = useState<string[]>(ALL_COLUMN_KEYS.map(c => c.key));
      const [isColMenuOpen, setIsColMenuOpen] = useState(false);
      const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

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

      const filteredShots = searchQuery.trim() ? shots.filter(
        (s) =>
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.sceneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.subjects.toLowerCase().includes(searchQuery.toLowerCase()),
      ) : shots;

      const totalScriptTime = filteredShots.reduce((acc, s) => {
        const [mm, ss] = s.scriptTime.split(':').map(Number);
        return acc + (mm || 0) * 60 + (ss || 0);
      }, 0);

      const totalMin = Math.floor(totalScriptTime / 60);
      const totalSec = totalScriptTime % 60;

      const toggleColumn = (key: string) => {
        setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
      };
    ```

    Locate the `return (` statement and replace EVERYTHING from `return (` to the end of the file `}`:
    ```tsx
      return (
        <div className="flex flex-col h-full relative">
          <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
          <ExportUpgradeModal isOpen={!!exportType} onClose={() => setExportType(null)} exportType={exportType} />
          
          {/* ── Toolbar ── */}
          <div className="h-14 shrink-0 flex items-center justify-between px-4 bg-white border-b border-outline-variant z-30">
            {/* Left: Rich Text Tools & View Toggle */}
            <div className="flex items-center gap-1">
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
              <div className="relative flex items-center">
                <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_color_text</span></button>
              </div>
              <ToolbarDivider />
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_left</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_center</span></button>
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_right</span></button>
              <ToolbarDivider />
              <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">link</span></button>
              
              <ToolbarDivider />
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                <button onClick={() => setViewMode('table')} className={`px-3 py-1 text-label-sm font-bold rounded cursor-pointer transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Table</button>
                <button onClick={() => setViewMode('report')} className={`px-3 py-1 text-label-sm font-bold rounded cursor-pointer transition-colors ${viewMode === 'report' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Report</button>
              </div>
            </div>

            {/* Right: Search, Filter, Cols, New, Share, Export */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search shots..." 
                  className="pl-9 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm w-48 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
                />
              </div>

              {/* Columns Visibility */}
              <div className="relative">
                <button onClick={() => setIsColMenuOpen(!isColMenuOpen)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">view_column</span>
                  Cols
                </button>
                {isColMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsColMenuOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg py-2 w-48 z-50 max-h-80 overflow-y-auto custom-scrollbar flex flex-col">
                      <div className="px-4 py-2 border-b border-outline-variant mb-1 flex justify-between items-center shrink-0">
                        <span className="text-label-sm font-bold">Columns</span>
                        <button onClick={() => setVisibleCols(ALL_COLUMN_KEYS.map(c => c.key))} className="text-[10px] text-primary hover:underline cursor-pointer">Reset</button>
                      </div>
                      {ALL_COLUMN_KEYS.map(c => (
                        <label key={c.key} className="flex items-center gap-3 px-4 py-1.5 hover:bg-surface-container-low cursor-pointer shrink-0">
                          <input type="checkbox" checked={visibleCols.includes(c.key)} onChange={() => toggleColumn(c.key)} className="accent-primary cursor-pointer" />
                          <span className="text-body-md text-on-surface select-none">{c.label}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Filter Placeholder */}
              <div className="relative">
                <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
                {isFilterMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterMenuOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg p-4 w-64 z-50">
                      <div className="text-label-sm font-bold mb-2">Filters</div>
                      <p className="text-body-md text-outline italic">Advanced filtering logic coming soon.</p>
                    </div>
                  </>
                )}
              </div>
              
              <ToolbarDivider />

              <button className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Shot
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                Share
              </button>
              <div className="relative shrink-0">
                <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} className="flex items-center justify-center gap-1 bg-primary text-white hover:bg-primary/90 text-[12px] font-bold uppercase tracking-wider pl-3 pr-2 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm">
                  Export
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                {isExportMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg py-2 w-48 z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                      <button onClick={() => { setExportType('pdf'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface">picture_as_pdf</span>
                        <span className="text-label-md text-on-surface">PDF Document</span>
                      </button>
                      <button onClick={() => { setExportType('csv'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                        <span className="text-label-md text-on-surface-variant">CSV File</span>
                      </button>
                      <button onClick={() => { setExportType('sheets'); setIsExportMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-left w-full transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
                        <span className="text-label-md text-on-surface-variant">Google Sheets</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* ── Main View ── */}
          <div className="flex-1 overflow-hidden relative">
            {viewMode === 'table' ? (
              <ShotlistTable rows={filteredShots} visibleCols={visibleCols} />
            ) : (
              <ShotlistReport rows={filteredShots} />
            )}
          </div>
          
          {/* ── Footer ── */}
          {viewMode === 'table' && (
            <div className="h-10 shrink-0 bg-white border-t border-outline-variant flex items-center justify-between px-6 z-30">
              <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
                {filteredShots.length} Shots
              </span>
              <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
                Est. Time: {totalMin}:{totalSec.toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - Provide ONLY the specific code snippets required for replacement.
  </constraints>
</system_prompt>
</file>

<file path="0501_2324_hotfix-shotlist-toolbar-layer.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to fix a z-index layering issue in the Shotlist module where the table header overlaps the toolbar dropdown menus.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Hotfix: Elevate the Shotlist Toolbar's stacking context.

    **Step 1: Fix Z-Index on Toolbar Wrapper**
    - File: `components/shotlist/ShotlistContainer.tsx`
    - Locate the Toolbar wrapper which currently has `z-30` without explicit positioning.
    - Change it to `relative z-50` to establish a new stacking context that safely sits above the table's `z-30` header and `z-40` frozen columns.

    Locate this exact line:
    ```tsx
          {/* ── Toolbar ── */}
          <div className="h-14 shrink-0 flex items-center justify-between px-4 bg-white border-b border-outline-variant z-30">
    ```

    Replace with:
    ```tsx
          {/* ── Toolbar ── */}
          <div className="h-14 shrink-0 flex items-center justify-between px-4 bg-white border-b border-outline-variant relative z-50">
    ```
  </task>

  <constraints>
    - Output ONLY the targeted replacement snippet.
  </constraints>
</system_prompt>
</file>

<file path="0501_2330_shotlist-safe-zone-zoom.md">
<system_prompt>
  <role>
    you are a senior frontend architect. your task is to inject a safe zone and the helios cursor-anchored zoom logic into the shotlisttable component.
    critical: use targeted replacements. do not output the entire file.
  </role>

  <task>
    execute sub-task: add safe zone & helios zoom to shotlist.

    **step 1: update imports**
    - file: `components/shotlist/ShotlistTable.tsx`
    - add `useState`, `useRef`, `useEffect`, `useCallback` to the imports.
    
    locate:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo } from 'react';
    ```
    replace with:
    ```tsx
    'use client';

    import type { ShotRow } from '@/types/shotlist';
    import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
    ```

    **step 2: inject helios zoom logic**
    locate the component initialization:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const items: ProcessedItem[] = [];
    ```
    replace with:
    ```tsx
    export default function ShotlistTable({ rows, visibleCols }: ShotlistTableProps) {
      const [zoom, setZoom] = useState(100);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const zoomRef = useRef(100);
      zoomRef.current = zoom;

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
          newScale = Math.min(Math.max(newScale, 0.5), 2.0);

          setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
        };

        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleGlobalWheel);
      }, [adjustZoom]);

      const items: ProcessedItem[] = [];
    ```

    **step 3: add safe zone and scale wrapper**
    locate the `return` statement:
    ```tsx
      return (
        <div className="w-full h-full overflow-auto custom-scrollbar bg-surface-container-lowest relative">
          <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
    ```
    replace with:
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
            <div className="w-max bg-surface-container-lowest pb-[50vh] pr-[30vw]">
              <table className="w-max bg-white" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
    ```

    **step 4: close wrappers**
    locate the end of the file:
    ```tsx
            </tfoot>
          </table>
        </div>
      );
    }
    ```
    replace with:
    ```tsx
            </tfoot>
          </table>
            </div>
          </div>
        </div>
      );
    }
    ```
  </task>

  <constraints>
    - output only the targeted replacement snippets.
  </constraints>
</system_prompt>
</file>

<file path="0501_2341_remove-shotlist-freeze.md">
<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to strip out all `position: sticky` and frozen column/row logic from the `ShotlistTable` to ensure it scales perfectly with the Helios transform-based zoom system.
    CRITICAL: Use TARGETED REPLACEMENTS. Do NOT output the entire file.
  </role>

  <task>
    Execute Hotfix: Remove freeze/sticky mechanics from ShotlistTable.

    **Step 1: Unfreeze the `renderStat` footer cells**
    - File: `components/shotlist/ShotlistTable.tsx`
    - Locate the `renderStat` helper function and remove the `isSticky` logic.

    Locate this exact block:
    ```tsx
        const hasList = list && list.length > 0;
        const c = positionedCols.find(x => x.key === colKey);
        const isSticky = c?.frozen;

        return (
          <td
            key={colKey}
            className={`border border-outline-variant p-2 text-center align-middle font-bold bg-surface-container-low relative ${hasList ? 'group cursor-help hover:bg-surface-container transition-colors' : ''} ${isSticky ? 'sticky z-40' : ''}`}
            style={isSticky ? { left: c?.left } : undefined}
          >
    ```
    Replace with:
    ```tsx
        const hasList = list && list.length > 0;

        return (
          <td
            key={colKey}
            className={`border border-outline-variant p-2 text-center align-middle font-bold bg-surface-container-low relative ${hasList ? 'group cursor-help hover:bg-surface-container transition-colors' : ''}`}
          >
    ```

    **Step 2: Unfreeze the `<thead>` and `<th>` elements**
    - Locate the `<thead>` block in the return statement. Remove `sticky top-0 z-30` and the frozen style logic from the `<th>` cells.

    Locate this exact block:
    ```tsx
            <thead className="sticky top-0 z-30 bg-surface-container-low shadow-sm">
              <tr>
                {positionedCols.map((c) => (
                  <th
                    key={c.key}
                    className="border border-outline-variant p-2 text-label-sm font-bold text-center align-middle uppercase text-on-surface-variant bg-surface-container-low"
                    style={c.frozen ? { position: 'sticky', left: c.left, zIndex: 40 } : undefined}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
    ```
    Replace with:
    ```tsx
            <thead className="bg-surface-container-low">
              <tr>
                {positionedCols.map((c) => (
                  <th
                    key={c.key}
                    className="border border-outline-variant p-2 text-label-sm font-bold text-center align-middle uppercase text-on-surface-variant bg-surface-container-low"
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
    ```

    **Step 3: Unfreeze the `spacer` rows**
    - Locate the spacer `<tr>` mapping block.

    Locate this exact block:
    ```tsx
                if (item.type === 'spacer') {
                  return (
                    <tr key={item.id} className="bg-surface-container h-8">
                      {positionedCols.map((c) => (
                        <td key={c.key} className={`bg-surface-container border border-outline-variant p-0 ${c.frozen ? 'sticky z-20' : ''}`} style={c.frozen ? { left: c.left } : undefined}></td>
                      ))}
                    </tr>
                  );
                }
    ```
    Replace with:
    ```tsx
                if (item.type === 'spacer') {
                  return (
                    <tr key={item.id} className="bg-surface-container h-8">
                      {positionedCols.map((c) => (
                        <td key={c.key} className="bg-surface-container border border-outline-variant p-0"></td>
                      ))}
                    </tr>
                  );
                }
    ```

    **Step 4: Unfreeze the data `<td>` elements**
    - Locate the mapping logic for data rows where `tdBase` and `tdFrozenBase` are defined.

    Locate this exact block:
    ```tsx
                    {positionedCols.map(c => {
                      const tdBase = "border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                      const tdFrozenBase = "sticky z-20 border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";
                      const baseClass = c.frozen ? tdFrozenBase : tdBase;
                      const style = c.frozen ? { left: c.left } : undefined;

                      if (c.key === 'sceneNumber' || c.key === 'location') {
                        if (!showGroupCells) return null;
                        return <td key={c.key} rowSpan={rowSpan} className={`${baseClass} text-center font-bold`} style={style}>{row[c.key as keyof ShotRow]}</td>;
                      }
                      
                      if (c.key === 'orderIndex' || c.key === 'shotNumber' || c.key === 'intExt' || c.key === 'dayNight' || c.key === 'scriptTime' || c.key === 'shotSize' || c.key === 'shotType' || c.key === 'side' || c.key === 'angle' || c.key === 'movement' || c.key === 'lens' || c.key === 'subjects') {
                        return <td key={c.key} className={`${baseClass} text-center ${c.key==='orderIndex'?'font-medium text-secondary':''} ${c.key==='shotNumber'?'font-medium':''} ${c.key==='scriptTime'?'font-mono text-[12px]':''}`} style={style}>{row[c.key as keyof ShotRow]}</td>;
                      }

                      if (c.key === 'storyboard') {
                        return (
                          <td key={c.key} className={`${baseClass} p-1 align-middle`} style={style}>
    ```
    Replace with:
    ```tsx
                    {positionedCols.map(c => {
                      const tdBase = "border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors";

                      if (c.key === 'sceneNumber' || c.key === 'location') {
                        if (!showGroupCells) return null;
                        return <td key={c.key} rowSpan={rowSpan} className={`${tdBase} text-center font-bold`}>{row[c.key as keyof ShotRow]}</td>;
                      }
                      
                      if (c.key === 'orderIndex' || c.key === 'shotNumber' || c.key === 'intExt' || c.key === 'dayNight' || c.key === 'scriptTime' || c.key === 'shotSize' || c.key === 'shotType' || c.key === 'side' || c.key === 'angle' || c.key === 'movement' || c.key === 'lens' || c.key === 'subjects') {
                        return <td key={c.key} className={`${tdBase} text-center ${c.key==='orderIndex'?'font-medium text-secondary':''} ${c.key==='shotNumber'?'font-medium':''} ${c.key==='scriptTime'?'font-mono text-[12px]':''}`}>{row[c.key as keyof ShotRow]}</td>;
                      }

                      if (c.key === 'storyboard') {
                        return (
                          <td key={c.key} className={`${tdBase} p-1 align-middle`}>
    ```

    **Step 5: Unfreeze the `<tfoot>`**
    - Locate the tfoot element at the end of the table.

    Locate this exact block:
    ```tsx
            <tfoot className="sticky bottom-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-10">
              <tr>
                {positionedCols.map(c => renderStat(c.key))}
              </tr>
            </tfoot>
    ```
    Replace with:
    ```tsx
            <tfoot className="bg-surface-container-low shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-10">
              <tr>
                {positionedCols.map(c => renderStat(c.key))}
              </tr>
            </tfoot>
    ```
  </task>

  <constraints>
    - Ensure exact block matches for targeted replacements.
  </constraints>
</system_prompt>
</file>

</files>
