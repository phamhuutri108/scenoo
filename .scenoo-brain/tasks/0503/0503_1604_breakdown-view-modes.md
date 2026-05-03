<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to apply the "Single Page" and "Scroll Pages" pagination logic to the Breakdown ScriptViewer, replacing its infinite-scroll canvas with a strictly paginated A4 layout.
    CRITICAL: Do NOT add floating navigation arrows to the canvas. Rely purely on the parent container's bottom bar for navigation.
  </role>

  <task>
    Execute Feature: Implement View Modes and Pagination into Breakdown.

    **Step 1: Pass Props in BreakdownContainer**
    - File: `components/breakdown/BreakdownContainer.tsx`
    - Inject the pagination and viewMode states into the ScriptViewer component.

    Locate this exact line inside the return block:
    ```tsx
          <ScriptViewer scriptLines={MOCK_SCRIPT_LINES} zoom={zoom} onZoomChange={setZoom} />
    ```
    Replace with:
    ```tsx
          <ScriptViewer 
            scriptLines={MOCK_SCRIPT_LINES} 
            zoom={zoom} 
            onZoomChange={setZoom}
            viewMode={viewMode}
            currentPage={currentPage}
            totalPages={totalPages}
            onCurrentPageChange={setCurrentPage}
          />
    ```

    **Step 2: Update ScriptViewer Props & Core Logic**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Expand `Props` interface.
    - Remove the dynamic `contentHeight` state and `ResizeObserver`.
    - Add fixed page dimensions (`PAGE_W`, `PAGE_H`), scroll-sync logic, and a dynamic `pagesToRender` array.

    Locate the `Props` interface and initial component setup block:
    ```tsx
    interface Props {
      scriptLines: ScriptLine[];
      zoom: number;
      onZoomChange: (z: number) => void;
    }

    export default function ScriptViewer({ scriptLines, zoom, onZoomChange }: Props) {
      const scrollContainerRef = useRef<HTMLElement>(null);
      const contentRef = useRef<HTMLDivElement>(null);
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
    ```

    Replace with:
    ```tsx
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
        const scrollPages = 5; // Render 5 mock pages for scroll mode
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
    ```

    **Step 3: Update ScriptViewer.tsx DOM Rendering**
    - File: `components/breakdown/ScriptViewer.tsx`
    - Replace the entire `return` block.
    - Loop through `pagesToRender` inside the footprint wrapper.
    - Render the `scriptLines` loop ONLY on `pageNum === 1`, to preserve formatting while mocking other pages.

    Locate the entire `return` block from `<section>` down to the end of the component, and replace it exactly with this:
    ```tsx
      return (
        <section 
          ref={scrollContainerRef}
          className="flex-1 bg-[#f9f9ff] overflow-auto custom-scrollbar relative touch-none"
        >
          {/* Footprint Wrapper */}
          <div style={{
            width: `${contentW * (zoom/100) + 80}px`,
            height: `${contentH * (zoom/100) + 80}px`,
            minWidth: '100%',
            minHeight: '100%',
            position: 'relative'
          }}>
            {/* Scaled Content Container */}
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
    ```
  </task>
</system_prompt>