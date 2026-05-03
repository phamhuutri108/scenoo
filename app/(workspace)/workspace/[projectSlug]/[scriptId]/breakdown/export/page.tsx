"use client";

import { useRef, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import ExportPreviewTable, { MOCK_DATA } from '@/components/breakdown/ExportPreviewTable';
import ExportPreviewSingle from '@/components/breakdown/ExportPreviewSingle';
import ExportSceneSidebar from '@/components/breakdown/ExportSceneSidebar';
import ExportUpgradeModal from '@/components/breakdown/ExportUpgradeModal';
import ShareExportModal from '@/components/breakdown/ShareExportModal';
import BreakdownExportReport from '@/components/breakdown/BreakdownExportReport';
import { ExportFormatProvider, useExportFormat } from '@/components/breakdown/ExportFormatContext';

const MOCK_SCENES = [
  { id: 's1', number: 1,  location: 'Apartment - Living Room',   intExt: 'INT' as const, dayNight: 'DAY'   as const },
  { id: 's2', number: 2,  location: 'City Street - Alley',       intExt: 'EXT' as const, dayNight: 'NIGHT' as const },
  { id: 's3', number: 3,  location: 'Police Station - Lobby',    intExt: 'INT' as const, dayNight: 'DAY'   as const },
  { id: 's4', number: 4,  location: 'Rooftop - Downtown',        intExt: 'EXT' as const, dayNight: 'NIGHT' as const },
  { id: 's5', number: 5,  location: 'Coffee Shop - Corner Seat', intExt: 'INT' as const, dayNight: 'DAY'   as const },
  { id: 's6', number: 6,  location: 'Highway - Overpass',        intExt: 'EXT' as const, dayNight: 'DAY'   as const },
  { id: 's7', number: 7,  location: 'Warehouse - Loading Dock',  intExt: 'INT' as const, dayNight: 'NIGHT' as const },
  { id: 's8', number: 8,  location: 'Park - Fountain',           intExt: 'EXT' as const, dayNight: 'DAY'   as const },
  { id: 's9', number: 9,  location: 'Hospital - Emergency Room', intExt: 'INT' as const, dayNight: 'NIGHT' as const },
  { id: 's10', number: 10, location: 'Airport - Departure Gate', intExt: 'INT' as const, dayNight: 'DAY'   as const },
];

const TOOLBAR_BTN =
  'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';
const TOOLBAR_BTN_ACTIVE =
  'w-8 h-8 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer';

function ToolbarDivider() {
  return <div className="w-px h-6 bg-outline-variant mx-1 shrink-0" />;
}

function ExportPageInner() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'all' | 'single' | 'report'>('all');
  const { selectedCellIds, cellStyles, applyFormat, colWidths } = useExportFormat();

  const allScenesBaseWidth = Array.from({ length: 17 }).reduce<number>((sum, _, i) => sum + (colWidths[i] || 120), 0);
  const [measuredAllScenesWidth, setMeasuredAllScenesWidth] = useState(0);
  const exactContentWidth = viewMode === 'all'
    ? Math.max(allScenesBaseWidth, measuredAllScenesWidth)
    : viewMode === 'single' ? 794 : 1200; // Force 1200px width for report slide

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportInsetX, setViewportInsetX] = useState(0);
  const [viewportInsetY, setViewportInsetY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViewportInset = () => {
      setViewportInsetX(window.innerWidth * 0.02);
      setViewportInsetY(window.innerHeight * 0.02);
    };

    updateViewportInset();
    window.addEventListener('resize', updateViewportInset);
    return () => window.removeEventListener('resize', updateViewportInset);
  }, []);

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
        if (entry.target === content) {
          setContentHeight(entry.contentRect.height);
          if (viewMode === 'all') {
            const domWidth = Math.ceil(content.scrollWidth);
            setMeasuredAllScenesWidth((prev) => (Math.abs(prev - domWidth) > 0.5 ? domWidth : prev));
          }
        }
      }
    });
    observer.observe(container);
    observer.observe(content);
    return () => observer.disconnect();
  }, [viewMode]);

  const horizontalSafeZone = viewportInsetX * 2;
  const verticalSafeZone = viewportInsetY * 2;

  let fitZoom = 100;
  if (viewMode === 'all' && containerWidth && exactContentWidth) {
    fitZoom = ((containerWidth - horizontalSafeZone) / exactContentWidth) * 100;
  } else if (viewMode === 'single' && containerHeight) {
    fitZoom = ((containerHeight - verticalSafeZone) / 1187) * 100; // A4 height (1123px) + vertical padding buffer (64px)
  } else if (viewMode === 'report' && containerHeight) {
    fitZoom = ((containerHeight - verticalSafeZone) / 800) * 100; // 800px fixed height for report
  }

  const fitZoomRef = useRef(fitZoom);
  fitZoomRef.current = fitZoom;

  const [zoom, setZoom] = useState(100);
  const zoomRef = useRef(100);
  zoomRef.current = zoom;

  const prevViewMode = useRef<string | null>(null);
  useEffect(() => {
    if (containerWidth === 0) return;
    if (prevViewMode.current === null || prevViewMode.current !== viewMode) {
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
      const maxScale = (fitZoomRef.current * 2.5) / 100;
      newScale = Math.min(Math.max(newScale, minScale), maxScale);

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

  const colorInputRef = useRef<HTMLInputElement>(null);

  const allBold = selectedCellIds.size > 0 && [...selectedCellIds].every(
    (id) => cellStyles[id]?.fontWeight === 'bold'
  );
  const allItalic = selectedCellIds.size > 0 && [...selectedCellIds].every(
    (id) => cellStyles[id]?.fontStyle === 'italic'
  );
  const allUnderline = selectedCellIds.size > 0 && [...selectedCellIds].every(
    (id) => (cellStyles[id]?.textDecoration as string | undefined)?.includes('underline')
  );

  return (
    <div className="flex flex-col h-full">
      <ExportUpgradeModal
        isOpen={!!exportType}
        onClose={() => setExportType(null)}
        exportType={exportType}
      />
      <ShareExportModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      {/* Top Action Bar */}
      <div className="h-14 border-b border-outline-variant bg-surface-container-lowest px-4 flex items-center gap-1 shrink-0 relative z-50">
        {/* Left: Back + Title */}
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] transition-colors cursor-pointer shrink-0"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <h1 className="text-[16px] font-semibold text-[#191b23] tracking-tight shrink-0 mr-2">
          Breakdown Export
        </h1>

        <ToolbarDivider />

        {/* Relative Zoom Controller */}
        <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-md px-1 py-1 shrink-0">
          <button
            onClick={() => {
              const step = fitZoomRef.current * 0.1;
              const newZoom = Math.max(fitZoomRef.current / 100, (zoom - step) / 100);
              handleToolbarZoom(newZoom * 100);
            }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={zoom <= fitZoomRef.current}
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <div className="flex items-center gap-1 px-2">
            <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">
              {Math.round((zoom / fitZoomRef.current) * 100) || 100}%
            </span>
          </div>
          <button
            onClick={() => {
              const step = fitZoomRef.current * 0.1;
              const maxZoom = (fitZoomRef.current * 2.5) / 100;
              const newZoom = Math.min(maxZoom, (zoom + step) / 100);
              handleToolbarZoom(newZoom * 100);
            }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={zoom >= fitZoomRef.current * 2.5}
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>

        <ToolbarDivider />

        {/* Text Format Group */}
        <button
          className={allBold ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
          aria-label="Bold"
          onClick={() => applyFormat('fontWeight', allBold ? 'normal' : 'bold')}
        >
          <span className="material-symbols-outlined text-[18px]">format_bold</span>
        </button>
        <button
          className={allItalic ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
          aria-label="Italic"
          onClick={() => applyFormat('fontStyle', allItalic ? 'normal' : 'italic')}
        >
          <span className="material-symbols-outlined text-[18px]">format_italic</span>
        </button>
        <button
          className={allUnderline ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
          aria-label="Underline"
          onClick={() => applyFormat('textDecoration', allUnderline ? 'none' : 'underline')}
        >
          <span className="material-symbols-outlined text-[18px]">format_underlined</span>
        </button>
        <button
          className={TOOLBAR_BTN}
          aria-label="Text Color"
          onClick={() => colorInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-[18px]">format_color_text</span>
        </button>
        <input
          ref={colorInputRef}
          type="color"
          className="sr-only"
          onChange={(e) => applyFormat('color', e.target.value)}
        />

        <ToolbarDivider />

        {/* Align Group */}
        <button
          className={TOOLBAR_BTN}
          aria-label="Align Left"
          onClick={() => applyFormat('textAlign', 'left')}
        >
          <span className="material-symbols-outlined text-[18px]">format_align_left</span>
        </button>
        <button
          className={TOOLBAR_BTN}
          aria-label="Align Center"
          onClick={() => applyFormat('textAlign', 'center')}
        >
          <span className="material-symbols-outlined text-[18px]">format_align_center</span>
        </button>
        <button
          className={TOOLBAR_BTN}
          aria-label="Align Right"
          onClick={() => applyFormat('textAlign', 'right')}
        >
          <span className="material-symbols-outlined text-[18px]">format_align_right</span>
        </button>

        <ToolbarDivider />

        {/* Link Button */}
        <button className={TOOLBAR_BTN} aria-label="Link">
          <span className="material-symbols-outlined text-[18px]">link</span>
        </button>

        {/* View Mode Toggle */}
        <div className="flex bg-surface-container-low p-1 rounded-lg ml-auto shrink-0">
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
              viewMode === 'all'
                ? 'bg-white shadow-sm text-on-surface font-medium'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Scenes
          </button>
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
              viewMode === 'single'
                ? 'bg-white shadow-sm text-on-surface font-medium'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Single Scene
          </button>
          <button
            onClick={() => setViewMode('report')}
            className={`px-3 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
              viewMode === 'report'
                ? 'bg-white shadow-sm text-on-surface font-medium'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Report
          </button>
        </div>

        {/* Share + Export Button Group */}
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="bg-white text-on-surface border border-outline-variant px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            Share
          </button>

        {/* Export Button & Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setIsExportMenuOpen((prev) => !prev)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Export
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>

          {isExportMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-outline-variant shadow-2xl rounded-xl py-2 z-50 flex flex-col">
              <button
                onClick={() => {
                  // ARCHITECTURE RULE: For PDF, map selectedExportIds to multiple A4 pages.
                  setExportType('pdf');
                  setIsExportMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                PDF
              </button>
              <button
                onClick={() => {
                  // ARCHITECTURE RULE: For CSV and Google Sheets, map selectedExportIds to SEPARATE TABS (Worksheets) inside the document.
                  setExportType('csv');
                  setIsExportMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                CSV
              </button>
              <button
                onClick={() => {
                  // ARCHITECTURE RULE: For CSV and Google Sheets, map selectedExportIds to SEPARATE TABS (Worksheets) inside the document.
                  setExportType('sheets');
                  setIsExportMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Google Sheets
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden w-full relative bg-[#f9f9ff]">
        {/* Canvas Area Wrapper - Constrains absolute overlays from covering the sidebar */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* Navigation Overlay - Immune to scroll/zoom */}
          {viewMode === 'single' && (
            <div className="absolute inset-0 pointer-events-none z-50">
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
            className="flex-1 overflow-auto touch-none custom-scrollbar relative"
          >
          {/* Explicit layout footprint wrapper per Helios Protocol */}
          <div
            style={{
              width: `${exactContentWidth * (zoom / 100) + horizontalSafeZone}px`,
              height: `calc(${contentHeight * (zoom / 100)}px + 52vh)`,
              position: 'relative',
              minWidth: '100%'
            }}
          >
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
                <div className="w-[1200px] h-[800px] shrink-0 mx-auto">
                  <BreakdownExportReport data={MOCK_DATA} />
                </div>
              )}
            </div>
          </div>
          </div> {/* End Scroll Container */}
        </div> {/* End Canvas Area Wrapper */}

        {viewMode === 'single' && (
          <ExportSceneSidebar
            scenes={MOCK_SCENES}
            selectedIds={selectedExportIds}
            onSelectionChange={setSelectedExportIds}
            activeSceneId={activeSceneId}
            onActiveChange={setActiveSceneId}
          />
        )}
      </div>
    </div>
  );
}

export default function BreakdownExportPage() {
  return (
    <ExportFormatProvider>
      <ExportPageInner />
    </ExportFormatProvider>
  );
}
