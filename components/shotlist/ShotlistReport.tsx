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
const MIN_VISIBLE_ZOOM = 100;
const MAX_VISIBLE_ZOOM = 250;
const REPORT_ZOOM_BASELINE_OFFSET = 1;

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
      if (parts.length !== 2) return acc;
      const mm = parseInt(parts[0], 10);
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

  const topInset = typeof window !== 'undefined' ? window.innerHeight * 0.02 : 0;
  // Keep bottom spacing visually close to the top heading-to-toolbar gap.
  const bottomInset = topInset + 8;
  const viewportInsetX = typeof window !== 'undefined' ? window.innerWidth * 0.02 : 0;

  // Keep report visual size at 100% equal to the previous 99% scale.
  const baseScale = containerHeight ? (containerHeight - topInset - bottomInset) / EXACT_HEIGHT : 1;
  const toScale = useCallback(
    (visibleZoom: number) => baseScale * ((visibleZoom - REPORT_ZOOM_BASELINE_OFFSET) / 100),
    [baseScale],
  );
  const actualScale = toScale(zoom);

  const zoomRef = useRef(zoom);

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

    const clampedZoom = Math.min(Math.max(newZoomVal, MIN_VISIBLE_ZOOM), MAX_VISIBLE_ZOOM);
    const prevScale = toScale(zoomRef.current);
    const newScale = toScale(clampedZoom);

    const contentX = (scrollLeft + mouseX) / prevScale;
    const contentY = (scrollTop + mouseY) / prevScale;

    const roundedZoom = Math.round(clampedZoom);
    zoomRef.current = roundedZoom;
    onZoomChange(roundedZoom);

    requestAnimationFrame(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollLeft = contentX * newScale - mouseX;
      scrollContainerRef.current.scrollTop = contentY * newScale - mouseY;
    });
  }, [onZoomChange, toScale]);

  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      const container = scrollContainerRef.current;
      if (!container || !container.contains(e.target as Node)) return;

      e.preventDefault();

      const zoomSpeed = 0.005;
      let newZoom = zoomRef.current * Math.exp(-e.deltaY * zoomSpeed);
      newZoom = Math.min(Math.max(newZoom, MIN_VISIBLE_ZOOM), MAX_VISIBLE_ZOOM);

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

  void containerWidth;

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
            height: `${EXACT_HEIGHT * actualScale + topInset + bottomInset}px`,
            minWidth: '100%',
            position: 'relative'
          }}
        >
          {/* Scaled Content Canvas */}
          <div
            style={{
              position: 'absolute',
              top: `max(${topInset}px, calc(50% - ${(EXACT_HEIGHT * actualScale) / 2}px))`,
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
