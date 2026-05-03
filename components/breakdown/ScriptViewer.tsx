import { useRef, useEffect, useCallback } from 'react';
import type { ScriptLine } from '@/types/breakdown';
import { TAG_CONFIG } from '@/types/breakdown';

const LINE_INDENT: Record<ScriptLine['type'], string> = {
  slug:      '',
  action:    'mx-[15%]',
  character: 'text-center',
  dialogue:  'mx-[25%]',
};

interface Props {
  scriptLines: ScriptLine[];
  zoom: number;
  onZoomChange: (z: number) => void;
  viewMode: 'single' | 'scroll';
  currentPage: number;
  totalPages: number;
  onCurrentPageChange: (page: number) => void;
}

export default function ScriptViewer({
  scriptLines, zoom, onZoomChange, viewMode, currentPage, totalPages, onCurrentPageChange
}: Props) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const zoomRef = useRef(zoom);

  const PAGE_W = 840;
  const PAGE_H = 1056;
  const GAP = 40;

  let contentW = PAGE_W;
  let contentH = PAGE_H;
  let pagesToRender: number[] = [];

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

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const syncPageFromScroll = useCallback(() => {
    if (viewMode !== 'scroll') return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollTop + container.clientHeight / 2;
    const pageElements = Array.from(container.querySelectorAll('[data-scroll-page="true"]'));

    let closestPage = currentPage;
    let minDistance = Infinity;

    pageElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const pageTop = htmlEl.offsetTop * (zoom / 100);
      const pageHeight = htmlEl.offsetHeight * (zoom / 100);
      const pageCenter = pageTop + pageHeight / 2;

      const distance = Math.abs(containerCenter - pageCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestPage = parseInt(htmlEl.getAttribute('data-page-num') || '1', 10);
      }
    });

    if (closestPage !== currentPage) {
      onCurrentPageChange(closestPage);
    }
  }, [currentPage, onCurrentPageChange, viewMode, zoom]);

  useEffect(() => {
    if (viewMode !== 'scroll') return;
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', syncPageFromScroll);
    return () => container.removeEventListener('scroll', syncPageFromScroll);
  }, [syncPageFromScroll, viewMode]);

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
    onZoomChange(newZoom);

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

  return (
    <section
      ref={scrollContainerRef}
      className="flex-1 bg-[#f9f9ff] overflow-auto custom-scrollbar relative touch-none"
    >
      <div style={{
        width: `${contentW * (zoom/100) + 80}px`,
        height: `${contentH * (zoom/100) + 80}px`,
        minWidth: '100%',
        minHeight: '100%',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: `max(40px, calc(50% - ${(contentH * (zoom / 100)) / 2}px))`,
          left: `max(40px, calc(50% - ${(contentW * (zoom / 100)) / 2}px))`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: '0 0',
          width: `${contentW}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${GAP}px`
        }}>
          {pagesToRender.map((pageNum) => (
            <div
              key={pageNum}
              data-scroll-page="true"
              data-page-num={pageNum}
              className="script-paper w-full bg-white relative shadow-md shrink-0"
              style={{ minHeight: `${PAGE_H}px`, padding: '40px' }}
            >
              <div className="absolute top-8 right-12 text-outline-variant select-none text-[12px] font-mono">PAGE {pageNum}</div>

              {pageNum === 1 ? (
                <div className="w-full font-mono text-[14px] leading-relaxed">
                  {scriptLines.map((line) => {
                    const indentClass = LINE_INDENT[line.type] || '';
                    const className = `${indentClass} mb-4`.trim();

                    return (
                      <p key={line.id} className={className}>
                        {line.segments.map((seg, index) => {
                          if (!seg.tag) {
                            return <span key={index}>{seg.text}</span>;
                          }

                          const cfg = TAG_CONFIG[seg.tag];
                          return (
                            <span
                              key={index}
                              className="cursor-pointer transition-colors"
                              style={{ color: cfg.textColor, backgroundColor: cfg.bgColor }}
                              title={`Tagged: ${cfg.label}`}
                            >
                              {seg.text}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[800px] text-outline-variant/50 font-mono text-sm border-2 border-dashed border-outline-variant/30 rounded-lg m-8">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-[48px] mb-4">description</span>
                    <p>Breakdown Content (Page {pageNum})</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
