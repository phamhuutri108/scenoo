'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ScriptWorkspace from './ScriptWorkspace';
import LineScriptLeftSidebar from './LineScriptLeftSidebar';
import LineScriptRightSidebar from './LineScriptRightSidebar';
import ShareScriptModal from '@/components/projects/ShareScriptModal';
import type { ActiveTool } from '@/types/linescript';
import type { ScriptVersion } from '@/types/project';

const ZOOM_STEP = 10;
const VISIBLE_ZOOM_MIN = 100;
const VISIBLE_ZOOM_MAX = 250;
const VISIBLE_TO_EFFECTIVE_OFFSET = 40;
const EFFECTIVE_ZOOM_MIN = VISIBLE_ZOOM_MIN - VISIBLE_TO_EFFECTIVE_OFFSET;
const EFFECTIVE_ZOOM_MAX = VISIBLE_ZOOM_MAX - VISIBLE_TO_EFFECTIVE_OFFSET;

function toEffectiveZoom(visibleZoom: number) {
  return Math.min(Math.max(visibleZoom - VISIBLE_TO_EFFECTIVE_OFFSET, EFFECTIVE_ZOOM_MIN), EFFECTIVE_ZOOM_MAX);
}

function toVisibleZoom(effectiveZoom: number) {
  return Math.min(Math.max(effectiveZoom + VISIBLE_TO_EFFECTIVE_OFFSET, VISIBLE_ZOOM_MIN), VISIBLE_ZOOM_MAX);
}

const TOOLBAR_BTN = 'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';

export default function LineScriptContainer() {
  const params = useParams();
  const router = useRouter();
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const totalPages = 120;
  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  useEffect(() => {
    const handler = () => setIsShareModalOpen(true);
    window.addEventListener('openShareModal', handler);
    return () => window.removeEventListener('openShareModal', handler);
  }, []);

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

  function handleZoomIn() {
    setZoom((z) => Math.min(z + ZOOM_STEP, VISIBLE_ZOOM_MAX));
  }

  function handleZoomOut() {
    setZoom((z) => Math.max(z - ZOOM_STEP, VISIBLE_ZOOM_MIN));
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
      <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 flex overflow-hidden relative">
        <LineScriptLeftSidebar activeTool={activeTool} onToolChange={setActiveTool} />
        <div className="flex-1 overflow-hidden relative flex bg-[#f9f9ff]">
          <ScriptWorkspace
            activeTool={activeTool}
            onToolChange={setActiveTool}
            currentPage={currentPage}
            totalPages={totalPages}
            onCurrentPageChange={setCurrentPage}
            zoom={toEffectiveZoom(zoom)}
            onZoomChange={(effectiveZoom) => setZoom(toVisibleZoom(effectiveZoom))}
            viewMode={viewMode}
          />
        </div>
        <LineScriptRightSidebar isOpen={isRightOpen} onToggle={() => setIsRightOpen((v) => !v)} />
      </div>

      {/* ── Rich Text & Zoom Bottombar ── */}
      <div className="h-14 shrink-0 flex items-center pl-6 pr-0 bg-white border-t border-[#E5E7EB] z-10 gap-1 relative">
        {/* Centered Tool Cluster */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          {/* 1. Zoom */}
          <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
            <button onClick={handleZoomOut} className={TOOLBAR_BTN}>
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
            <button onClick={handleZoomIn} className={TOOLBAR_BTN}>
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
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
