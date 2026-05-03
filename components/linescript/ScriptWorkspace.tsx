import { useRef, useEffect, useCallback } from 'react';
import type { ActiveTool, MockScriptLine } from '@/types/linescript';

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

const EFFECTIVE_ZOOM_MIN = 60;
const EFFECTIVE_ZOOM_MAX = 210;

const MOCK_SCRIPT: MockScriptLine[] = [
  { id: 's1', type: 'scene_heading', text: '24  INT. COFFEE SHOP - DAY  24' },
  { id: 'a1', type: 'action', text: 'The bell above the door CHIMES. RACHEL (30s, disheveled but focused) storms in. She scans the room, gripping a worn manila envelope tightly to her chest.' },
  { id: 'a2', type: 'action', text: "She spots DAVID (40s, impeccably dressed) sitting at a corner booth, sipping an espresso. He doesn't look up from his newspaper." },
  { id: 'c1', type: 'character', text: 'RACHEL' },
  { id: 'd1', type: 'dialogue', text: "You said ten o'clock. It's ten-fifteen." },
  { id: 'c2', type: 'character', text: 'DAVID' },
  { id: 'p1', type: 'parenthetical', text: '(still reading)' },
  { id: 'd2', type: 'dialogue', text: 'Traffic on the 405. Unpredictable beast. Did you bring it?' },
  { id: 'a3', type: 'action', text: 'Rachel hesitates, then drops the envelope onto the table. It lands with a heavy THUD.' },
  { id: 'c3', type: 'character', text: 'RACHEL' },
  { id: 'd3', type: 'dialogue', text: "It's all there. Every last detail. But if they trace this back to me..." },
  { id: 'c4', type: 'character', text: 'DAVID' },
  { id: 'd4', type: 'dialogue', text: "Relax, Rachel. You're a ghost." },
];

function ScriptLine({ type, text }: { type: string; text: string }) {
  const base = 'font-mono text-[13px] leading-relaxed';
  if (type === 'scene_heading') {
    return <div className={`${base} text-center font-bold mb-8 text-on-surface`}>{text}</div>;
  }
  if (type === 'character') {
    return <div className={`${base} text-center font-bold mt-4 mb-1 text-on-surface`}>{text}</div>;
  }
  if (type === 'parenthetical') {
    return <div className={`${base} text-center text-on-surface-variant mb-1`}>{text}</div>;
  }
  if (type === 'dialogue') {
    return <div className={`${base} w-3/4 mx-auto mb-4 text-on-surface`}>{text}</div>;
  }
  return <p className={`${base} mb-4 text-on-surface-variant`}>{text}</p>;
}

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
  const PAGE_W = 700;
  const PAGE_H = 1056;
  const GAP = 40;
  const disablePrev = currentPage <= 1;
  const disableNext = currentPage >= totalPages;

  let contentW = PAGE_W;
  let contentH = PAGE_H;
  let pagesToRender: (number | null)[] = [];

  if (viewMode === 'single') {
    contentW = PAGE_W;
    contentH = PAGE_H;
    pagesToRender = [currentPage];
  } else if (viewMode === 'scroll') {
    contentW = PAGE_W;
    const scrollPages = 5;
    contentH = PAGE_H * scrollPages + GAP * (scrollPages - 1);
    pagesToRender = Array.from({ length: scrollPages }).map((_, i) => i + 1);
  }
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);

  // Keep scroll anchored to top-left when zoom updates from toolbar buttons.
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

    const clampedScale = Math.min(Math.max(newScale, EFFECTIVE_ZOOM_MIN / 100), EFFECTIVE_ZOOM_MAX / 100);

    const rect = container.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const { scrollLeft, scrollTop } = container;

    const contentX = (scrollLeft + mouseX) / (zoomRef.current / 100);
    const contentY = (scrollTop + mouseY) / (zoomRef.current / 100);

    const newZoom = Math.round(clampedScale * 100);
    zoomRef.current = newZoom;
    onZoomChange(newZoom);

    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;

      const newScrollLeft = contentX * clampedScale - mouseX;
      const newScrollTop = contentY * clampedScale - mouseY;
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

      // Effective clamp mapped from visible range 100%..250%
      newScale = Math.min(Math.max(newScale, EFFECTIVE_ZOOM_MIN / 100), EFFECTIVE_ZOOM_MAX / 100);

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

    onCurrentPageChange(closestPage);
  }, [onCurrentPageChange, viewMode]);

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

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto custom-scrollbar relative bg-[#f9f9ff] touch-none"
      >
        <div
          style={{
            width: `${contentW * (zoom / 100) + 80}px`,
            height: `${contentH * (zoom / 100) + 80}px`,
            minWidth: '100%',
            minHeight: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: `max(40px, calc(50% - ${(contentH * (zoom / 100)) / 2}px))`,
              left: `max(40px, calc(50% - ${(contentW * (zoom / 100)) / 2}px))`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: '0 0',
              width: `${contentW}px`,
              height: `${contentH}px`,
              display: 'flex',
              flexDirection: viewMode === 'scroll' ? 'column' : 'row',
              gap: `${GAP}px`,
            }}
          >
            {pagesToRender.map((pageNum, idx) => {
              if (pageNum === null) return <div key={`empty-${idx}`} style={{ width: PAGE_W, height: PAGE_H }} className="shrink-0" />;

              return (
                <div
                  key={pageNum}
                  data-scroll-page="true"
                  data-page-num={pageNum}
                  className="script-paper bg-white p-12 font-mono text-[14px] leading-relaxed relative shadow-md shrink-0"
                  style={{ width: PAGE_W, height: PAGE_H }}
                >
                  <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px]">PAGE {pageNum}</div>

                  <div className="absolute left-[150px] top-[100px] bottom-[200px] w-0.5 bg-primary opacity-50 rounded-full pointer-events-none" />
                  <div className="absolute left-[140px] top-[100px] w-6 h-0.5 bg-primary opacity-50 pointer-events-none" />
                  <div className="absolute left-[140px] bottom-[200px] w-6 h-0.5 bg-primary opacity-50 pointer-events-none" />
                  <div className="absolute left-[100px] top-[248px] text-label-sm text-primary pointer-events-none">SC{pageNum}-A</div>

                  <div className="max-w-[600px] mx-auto">
                    {MOCK_SCRIPT.map((line) => (
                      <ScriptLine key={`${pageNum}-${line.id}`} type={line.type} text={line.text} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
