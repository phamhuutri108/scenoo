'use client';

import { useState, use, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import LineScriptExportPreview from '@/components/linescript/LineScriptExportPreview';
import LineScriptExportSidebar from '@/components/linescript/LineScriptExportSidebar';
import ShareScriptModal from '@/components/projects/ShareScriptModal';
import ExportUpgradeModal from '@/components/linescript/ExportUpgradeModal';
import type { ScriptVersion } from '@/types/project';

const MIN_VISIBLE_ZOOM = 100;
const MAX_VISIBLE_ZOOM = 250;
const ZOOM_BASELINE_OFFSET = 37;
const MIN_EFFECTIVE_SCALE = (MIN_VISIBLE_ZOOM - ZOOM_BASELINE_OFFSET) / 100;
const MAX_EFFECTIVE_SCALE = (MAX_VISIBLE_ZOOM - ZOOM_BASELINE_OFFSET) / 100;

const toEffectiveScale = (visibleZoom: number) => (visibleZoom - ZOOM_BASELINE_OFFSET) / 100;
const toVisibleZoom = (effectiveScale: number) => Math.round(effectiveScale * 100 + ZOOM_BASELINE_OFFSET);

export default function LineScriptExportPage({ params }: { params: Promise<{ projectSlug: string; scriptId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const [zoom, setZoom] = useState(MIN_VISIBLE_ZOOM);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 120;
  const effectiveScale = toEffectiveScale(zoom);

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

    const currentScale = toEffectiveScale(zoomRef.current);
    const contentX = (scrollLeft + mouseX) / currentScale;
    const contentY = (scrollTop + mouseY) / currentScale;

    const boundedScale = Math.min(Math.max(newScale, MIN_EFFECTIVE_SCALE), MAX_EFFECTIVE_SCALE);
    const newZoom = Math.min(Math.max(toVisibleZoom(boundedScale), MIN_VISIBLE_ZOOM), MAX_VISIBLE_ZOOM);
    setZoom(newZoom);

    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      const newScrollLeft = contentX * boundedScale - mouseX;
      const newScrollTop = contentY * boundedScale - mouseY;
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
      const currentScale = toEffectiveScale(zoomRef.current);
      let newScale = currentScale * Math.exp(-e.deltaY * zoomSpeed);
      newScale = Math.min(Math.max(newScale, MIN_EFFECTIVE_SCALE), MAX_EFFECTIVE_SCALE);

      setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
    };

    document.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleGlobalWheel);
  }, [adjustZoom]);

  const syncPageFromScroll = useCallback(() => {
    if (viewMode !== 'scroll') return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const pageNodes = Array.from(container.querySelectorAll<HTMLElement>('[data-scroll-page="true"]'));
    if (pageNodes.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const viewportCenterY = containerRect.top + containerRect.height / 2;

    let closestPage = 1;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const node of pageNodes) {
      const pageNum = Number(node.dataset.pageNum ?? 0);
      if (!pageNum) continue;

      const rect = node.getBoundingClientRect();
      const pageCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(pageCenterY - viewportCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        closestPage = pageNum;
      }
    }

    setCurrentPage(prev => (prev === closestPage ? prev : closestPage));
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncPageFromScroll);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [syncPageFromScroll, viewMode, zoom]);

  const handleZoomIn = () => {
    const container = scrollContainerRef.current;
    if (!container) {
      setZoom(z => Math.min(z + 10, MAX_VISIBLE_ZOOM));
      return;
    }
    const rect = container.getBoundingClientRect();
    const nextVisibleZoom = Math.min(zoom + 10, MAX_VISIBLE_ZOOM);
    adjustZoom(toEffectiveScale(nextVisibleZoom), rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const handleZoomOut = () => {
    const container = scrollContainerRef.current;
    if (!container) {
      setZoom(z => Math.max(z - 10, MIN_VISIBLE_ZOOM));
      return;
    }
    const rect = container.getBoundingClientRect();
    const nextVisibleZoom = Math.max(zoom - 10, MIN_VISIBLE_ZOOM);
    adjustZoom(toEffectiveScale(nextVisibleZoom), rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  // Footprint Matrix dimensions based on ViewMode
  const PAGE_W = 794;
  const PAGE_H = 1123;
  let contentW = PAGE_W;
  let contentH = PAGE_H;

  if (viewMode === 'single') {
    contentW = PAGE_W;
    contentH = PAGE_H;
  } else if (viewMode === 'scroll') {
    contentW = PAGE_W;
    contentH = (PAGE_H * 5) + (32 * 4) + 64;
  }

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const MOCK_SCRIPT: ScriptVersion = {
    id: resolvedParams.scriptId || 'v1',
    label: 'Current Draft',
    description: 'Active script version.',
    modifiedDate: 'Today',
    pageCount: totalPages,
    status: 'Draft',
    author: { name: 'Tri Pham', avatar: 'https://i.pravatar.cc/100?u=member1' },
    generalAccess: 'Just Crew',
  };

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const disablePrev = currentPage <= 1;
  const disableNext = currentPage >= totalPages;
  const handleJumpToPage = (page: number) => {
    setCurrentPage(page);
    if (viewMode === 'scroll') setViewMode('single');
  };

  return (
    <div className="flex flex-col h-full bg-background text-on-background">
      <ShareScriptModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        script={MOCK_SCRIPT}
        canManage={true}
      />
      <ExportUpgradeModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

      {/* Topbar */}
      <div className="h-14 shrink-0 flex items-center px-4 bg-white border-b border-[#E5E7EB] z-30 relative">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3 w-80 shrink-0">
          <button
            onClick={() => router.back()}
            className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-[16px] font-semibold tracking-tight">Line Script Export</h1>
        </div>

        {/* Right: Share & Export Actions */}
        <div className="flex items-center justify-end gap-2 ml-auto w-80 shrink-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="h-10 px-4 flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[14px] font-medium rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
          </button>

          <button
            onClick={handleExportClick}
            className="h-10 px-4 flex items-center justify-center gap-1 bg-[#0058be] hover:bg-[#004ba0] border border-[#0058be] text-white text-[14px] font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Export
            <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="h-full overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
          >
            {/* Footprint Wrapper */}
            <div
              style={{
                height: `${contentH * effectiveScale + 80}px`,
                width: `${contentW * effectiveScale + 80}px`,
                minWidth: '100%',
                minHeight: '100%',
                position: 'relative',
              }}
            >
              {/* Scaled PDF Content */}
              <div
                style={{
                  position: 'absolute',
                  top: `max(40px, calc(50% - ${(contentH * effectiveScale) / 2}px))`,
                  left: `max(40px, calc(50% - ${(contentW * effectiveScale) / 2}px))`,
                  transform: `scale(${effectiveScale})`,
                  transformOrigin: '0 0',
                  width: `${contentW}px`,
                  height: `${contentH}px`,
                }}
              >
                <LineScriptExportPreview viewMode={viewMode} currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>

        <LineScriptExportSidebar onJumpToPage={handleJumpToPage} />
      </div>

      {/* Bottom Tool Bar */}
      <div className="h-14 shrink-0 flex items-center justify-center bg-white border-t border-[#E5E7EB] relative z-20">
        <div className="flex items-center gap-2">
          {/* 1. Zoom */}
          <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <div className="h-6 w-px bg-[#E5E7EB]" />

          {/* 2. View Mode */}
          <div className="flex items-center bg-[#f9f9ff] border border-[#E5E7EB] p-1 rounded-lg shrink-0">
            <button onClick={() => setViewMode('single')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'single' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Single Page</button>
            <button onClick={() => setViewMode('scroll')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'scroll' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Scroll</button>
          </div>

          <div className="h-6 w-px bg-[#E5E7EB]" />

          {/* 3. Pagination */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
