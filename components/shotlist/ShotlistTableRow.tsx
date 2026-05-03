'use client';

import type { ShotRow } from '@/types/shotlist';

interface ShotlistTableRowProps {
  row: ShotRow;
  isAlternate: boolean;
}

const INT_EXT_COLORS: Record<string, string> = {
  INT:     'bg-blue-50 text-blue-700',
  EXT:     'bg-green-50 text-green-700',
  'INT/EXT': 'bg-purple-50 text-purple-700',
};

const DN_COLORS: Record<string, string> = {
  DAY:     'bg-yellow-50 text-yellow-700',
  NIGHT:   'bg-slate-100 text-slate-600',
  MORNING: 'bg-orange-50 text-orange-700',
  DUSK:    'bg-orange-100 text-orange-800',
  DAWN:    'bg-pink-50 text-pink-700',
};

/**
 * ShotlistTableRow — Presentational
 * Renders a single data row for the 18-column shotlist.
 * Width classes must match ShotlistTableHeader exactly.
 */
export default function ShotlistTableRow({ row, isAlternate }: ShotlistTableRowProps) {
  const rowBg = isAlternate ? 'bg-gray-50/40' : 'bg-white';

  return (
    <div className={`flex h-12 border-b border-gray-100 hover:bg-blue-50/50 transition-colors group ${rowBg}`}>

      {/* ── Frozen Column 1: # ── */}
      <div
        className={`w-12 h-12 shrink-0 flex items-center justify-center border-r border-gray-100 sticky left-0 z-10 ${rowBg} group-hover:bg-blue-50/50 font-mono text-xs text-[#424754]`}
      >
        {String(row.orderIndex).padStart(2, '0')}
      </div>

      {/* ── Frozen Column 2: SC# ── */}
      <div
        className={`w-16 h-12 shrink-0 flex items-center justify-center border-r border-gray-100 sticky left-12 z-10 ${rowBg} group-hover:bg-blue-50/50 text-sm font-medium text-[#191b23]`}
      >
        {row.sceneNumber}
      </div>

      {/* ── Frozen Column 3: SH# ── */}
      <div
        className={`w-16 h-12 shrink-0 flex items-center justify-center border-r border-gray-100 sticky left-[112px] z-10 ${rowBg} group-hover:bg-blue-50/50 text-sm font-medium text-[#191b23]`}
      >
        {row.shotNumber}
      </div>

      {/* ── Scrollable Column 4: LOCATION ── */}
      <div className="w-36 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23] truncate">
        {row.location}
      </div>

      {/* ── Scrollable Column 5: INT/EXT ── */}
      <div className="w-20 h-12 shrink-0 flex items-center px-3 border-r border-gray-100">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${INT_EXT_COLORS[row.intExt] ?? 'bg-gray-100 text-gray-600'}`}>
          {row.intExt}
        </span>
      </div>

      {/* ── Scrollable Column 6: D/N ── */}
      <div className="w-20 h-12 shrink-0 flex items-center px-3 border-r border-gray-100">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${DN_COLORS[row.dayNight] ?? 'bg-gray-100 text-gray-600'}`}>
          {row.dayNight}
        </span>
      </div>

      {/* ── Scrollable Column 7: STORYBOARD ── */}
      <div className="w-24 h-12 shrink-0 flex items-center px-3 border-r border-gray-100">
        {row.storyboardUrl ? (
          <img
            src={row.storyboardUrl}
            alt={`Storyboard for shot ${row.shotNumber}`}
            className="h-9 w-16 object-cover rounded"
          />
        ) : (
          <div className="h-9 w-16 rounded border border-dashed border-gray-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 text-base">image</span>
          </div>
        )}
      </div>

      {/* ── Scrollable Column 8: DESCRIPTION ── */}
      <div className="w-48 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23] truncate">
        {row.description}
      </div>

      {/* ── Scrollable Column 9: DIALOGUE ── */}
      <div className="w-48 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-xs text-[#424754] italic truncate">
        {row.dialogue || <span className="text-gray-300 not-italic">—</span>}
      </div>

      {/* ── Scrollable Column 10: SUBJECTS ── */}
      <div className="w-32 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23] truncate">
        {row.subjects}
      </div>

      {/* ── Scrollable Column 11: SCRIPT TIME ── */}
      <div className="w-24 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 font-mono text-xs text-[#424754]">
        {row.scriptTime}
      </div>

      {/* ── Scrollable Column 12: SHOT SIZE ── */}
      <div className="w-32 h-12 shrink-0 flex items-center px-3 border-r border-gray-100">
        {row.shotSize && (
          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            {row.shotSize}
          </span>
        )}
      </div>

      {/* ── Scrollable Column 13: SHOT TYPE ── */}
      <div className="w-32 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23]">
        {row.shotType}
      </div>

      {/* ── Scrollable Column 14: SIDE ── */}
      <div className="w-16 h-12 shrink-0 flex items-center justify-center border-r border-gray-100 text-sm text-[#191b23]">
        {row.side || <span className="text-gray-300">—</span>}
      </div>

      {/* ── Scrollable Column 15: ANGLE ── */}
      <div className="w-28 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23]">
        {row.angle}
      </div>

      {/* ── Scrollable Column 16: MOVEMENT ── */}
      <div className="w-28 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-sm text-[#191b23]">
        {row.movement}
      </div>

      {/* ── Scrollable Column 17: LENS ── */}
      <div className="w-20 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 font-mono text-xs text-[#424754]">
        {row.lens}
      </div>

      {/* ── Scrollable Column 18: NOTE ── */}
      <div className="w-48 h-12 shrink-0 flex items-center px-3 border-r border-gray-100 text-xs text-[#424754] italic truncate">
        {row.note || <span className="text-gray-300 not-italic">—</span>}
      </div>
    </div>
  );
}
