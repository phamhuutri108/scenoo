'use client';

import type { ShotRow } from '@/types/shotlist';
import { useMemo, useState, useRef, useEffect, useCallback } from 'react';

interface ShotlistTableProps {
  rows: ShotRow[];
  visibleCols?: string[];
  zoom: number;
  onZoomChange: (z: number) => void;
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

export default function ShotlistTable({ rows, visibleCols, zoom, onZoomChange }: ShotlistTableProps) {
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

  const zoomRef = useRef(zoom);
  const prevZoomRef = useRef(zoom);

  // Sync external toolbar zoom changes (Top-Left anchored to prevent jumps)
  useEffect(() => {
    if (zoom === prevZoomRef.current) return;

    const container = scrollContainerRef.current;
    if (container) {
      const prevScale = prevZoomRef.current / 100;
      const nextScale = zoom / 100;
      const { scrollLeft, scrollTop } = container;
      const contentX = scrollLeft / prevScale;
      const contentY = scrollTop / prevScale;

      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollLeft = contentX * nextScale;
        scrollContainerRef.current.scrollTop = contentY * nextScale;
      });
    }

    prevZoomRef.current = zoom;
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
    zoomRef.current = newZoom;
    prevZoomRef.current = newZoom;
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

      // Effective clamp from 70% to 220% (mapped to visible 100% to 250%)
      newScale = Math.min(Math.max(newScale, 0.7), 2.2);

      setTimeout(() => adjustZoom(newScale, e.clientX, e.clientY), 0);
    };

    document.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleGlobalWheel);
  }, [adjustZoom]);

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
      if (parts.length === 2) return acc + parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      return acc;
    }, 0);
    const timeFormatted = `${Math.floor(totalSecs / 60).toString().padStart(2, '0')}:${(totalSecs % 60).toString().padStart(2, '0')}`;

    return {
      totalShots: rows.length,
      totalScenes: new Set(rows.map(r => r.sceneNumber)).size,
      locStats, ieStats, dnStats, sizeStats, typeStats, angleStats, movStats, lensStats,
      subjStats, uniqueSubj: new Set(allSubjects).size,
      dialogueCount, charStats, timeFormatted
    };
  }, [rows]);

  const renderStat = (colKey: string) => {
    let value: React.ReactNode = '';
    let title = '';
    let list: [string, number][] | undefined = undefined;

    switch (colKey) {
      case 'orderIndex': value = stats.totalShots; title = 'Total Shots'; break;
      case 'sceneNumber': value = stats.totalScenes; title = 'Total Scenes'; break;
      case 'shotNumber': value = stats.totalShots; title = 'Total Shots'; break;
      case 'location': value = stats.locStats.length; title = 'Locations'; list = stats.locStats; break;
      case 'intExt': value = stats.ieStats.length; title = 'INT/EXT'; list = stats.ieStats; break;
      case 'dayNight': value = stats.dnStats.length; title = 'Day/Night'; list = stats.dnStats; break;
      case 'dialogue': value = stats.dialogueCount; title = 'Dialogue Mentions'; list = stats.charStats; break;
      case 'subjects': value = stats.uniqueSubj; title = 'Unique Subjects'; list = stats.subjStats; break;
      case 'scriptTime': value = stats.timeFormatted; title = 'Total Time'; break;
      case 'shotSize': value = stats.sizeStats.length; title = 'Shot Sizes'; list = stats.sizeStats; break;
      case 'shotType': value = stats.typeStats.length; title = 'Shot Types'; list = stats.typeStats; break;
      case 'angle': value = stats.angleStats.length; title = 'Angles'; list = stats.angleStats; break;
      case 'movement': value = stats.movStats.length; title = 'Movements'; list = stats.movStats; break;
      case 'lens': value = stats.lensStats.length; title = 'Lenses'; list = stats.lensStats; break;
      default: return <td key={colKey} className="border border-outline-variant bg-surface-container-low"></td>;
    }

    const hasList = list && list.length > 0;

    return (
      <td
        key={colKey}
        className={`border border-outline-variant p-2 text-center align-middle font-bold bg-surface-container-low relative ${hasList ? 'group cursor-help hover:bg-surface-container transition-colors' : ''}`}
      >
        <span className="text-primary">{value}</span>
        {hasList && list && (
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
          {positionedCols.map((c) => (
            <col key={c.key} style={{ width: c.width, minWidth: c.width }} />
          ))}
        </colgroup>
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
        <tbody>
          {items.map((item) => {
            if (item.type === 'spacer') {
              return (
                <tr key={item.id} className="bg-surface-container h-8">
                  {positionedCols.map((c) => (
                    <td key={c.key} className="bg-surface-container border border-outline-variant p-0"></td>
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
                  const tdBase = 'border border-outline-variant p-2 align-middle text-body-md whitespace-pre-wrap bg-white group-hover:bg-surface-container-low transition-colors';

                  if (c.key === 'sceneNumber' || c.key === 'location') {
                    if (!showGroupCells) return null;
                    return <td key={c.key} rowSpan={rowSpan} className={`${tdBase} text-center font-bold`}>{row[c.key as keyof ShotRow]}</td>;
                  }

                  if (c.key === 'orderIndex' || c.key === 'shotNumber' || c.key === 'intExt' || c.key === 'dayNight' || c.key === 'scriptTime' || c.key === 'shotSize' || c.key === 'shotType' || c.key === 'side' || c.key === 'angle' || c.key === 'movement' || c.key === 'lens' || c.key === 'subjects') {
                    return <td key={c.key} className={`${tdBase} text-center ${c.key === 'orderIndex' ? 'font-medium text-secondary' : ''} ${c.key === 'shotNumber' ? 'font-medium' : ''} ${c.key === 'scriptTime' ? 'font-mono text-[12px]' : ''}`}>{row[c.key as keyof ShotRow]}</td>;
                  }

                  if (c.key === 'storyboard') {
                    return (
                      <td key={c.key} className={`${tdBase} p-1 align-middle`}>
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
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => console.log('Upload image', e.target.files?.[0])} />
                        </label>
                      </td>
                    );
                  }

                  // Description, Dialogue, Note
                  return <td key={c.key} className={`${tdBase} text-left`}>{row[c.key as keyof ShotRow]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>

        <tfoot className="bg-surface-container-low shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-10">
          <tr>
            {positionedCols.map(c => renderStat(c.key))}
          </tr>
          </tfoot>
          </table>
            </div>
          </div>
        </div>
      );
}
