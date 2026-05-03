'use client';

import { useEffect, useRef, useState } from 'react';
import type { Scene } from '@/types/breakdown';

interface Props {
  scenes: Scene[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  activeSceneId: string;
  onActiveChange: (id: string) => void;
}

function parseRangeString(input: string, scenes: Scene[]): Set<string> {
  const numbers = new Set<number>();
  const segments = input.split(',');

  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;

    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const a = parseInt(rangeMatch[1]);
      const b = parseInt(rangeMatch[2]);
      const [start, end] = a <= b ? [a, b] : [b, a];
      for (let n = start; n <= end; n++) numbers.add(n);
    } else {
      const single = parseInt(trimmed);
      if (!isNaN(single)) numbers.add(single);
    }
  }

  const result = new Set<string>();
  for (const scene of scenes) {
    if (numbers.has(scene.number)) result.add(scene.id);
  }
  return result;
}

export default function ExportSceneSidebar({
  scenes,
  selectedIds,
  onSelectionChange,
  activeSceneId,
  onActiveChange,
}: Props) {
  const [rangeInput, setRangeInput] = useState('');
  const selectAllRef = useRef<HTMLInputElement>(null);

  const allSelected = scenes.length > 0 && selectedIds.size === scenes.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  useEffect(() => {
    if (!rangeInput.trim()) return;
    const resolved = parseRangeString(rangeInput, scenes);
    if (resolved.size > 0) onSelectionChange(resolved);
  }, [rangeInput]);

  function handleSelectAll(checked: boolean) {
    onSelectionChange(checked ? new Set(scenes.map((s) => s.id)) : new Set());
  }

  function handleToggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectionChange(next);
  }

  return (
    <aside className="w-80 h-full bg-surface-container-lowest border-l border-outline-variant flex flex-col shrink-0">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-outline-variant shrink-0">
        <span className="text-[13px] font-semibold text-on-surface">Export Scenes</span>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            ref={selectAllRef}
            type="checkbox"
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="accent-primary cursor-pointer"
          />
          <span className="text-[12px] text-on-surface-variant">All</span>
        </label>
      </div>

      {/* Range Input */}
      <div className="px-4 py-3 border-b border-outline-variant shrink-0">
        <label className="block text-[11px] text-on-surface-variant mb-1.5">
          Range (e.g. 1-3, 5)
        </label>
        <input
          type="text"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          placeholder="1-3, 5, 7"
          className="w-full border border-outline-variant rounded-md px-3 py-1.5 text-[12px] text-on-surface bg-surface outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Scene List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {scenes.map((scene) => {
          const isActive = scene.id === activeSceneId;
          return (
            <div
              key={scene.id}
              className={`flex items-start gap-3 p-3 border-b border-outline-variant transition-colors ${
                isActive ? 'bg-primary-fixed/10' : 'hover:bg-surface-container'
              }`}
            >
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={selectedIds.has(scene.id)}
                  onChange={() => handleToggle(scene.id)}
                  className="accent-primary cursor-pointer"
                />
              </div>
              <button
                onClick={() => onActiveChange(scene.id)}
                className="flex-1 text-left cursor-pointer min-w-0"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-label-sm font-bold ${isActive ? 'text-primary' : 'text-secondary'}`}>
                    SCENE {String(scene.number).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-outline">
                    {scene.intExt}. {scene.dayNight}
                  </span>
                </div>
                <div className={`text-body-md truncate ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {scene.location}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
