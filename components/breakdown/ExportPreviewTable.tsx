"use client";

import { useState } from "react";
import { getCellId, useExportFormat } from "@/components/breakdown/ExportFormatContext";

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'CAST':                          { bg: '#FF0000', text: '#ffffff' },
  'EXTRA':                         { bg: '#00AA00', text: '#ffffff' },
  'PROPS':                         { bg: '#8800CC', text: '#ffffff' },
  'SET DRESSING':                  { bg: '#33BB33', text: '#ffffff' },
  'WARDROBE':                      { bg: '#00AADD', text: '#ffffff' },
  'MAKEUP/HAIR':                   { bg: '#FF6600', text: '#ffffff' },
  'VEHICLE / ANIMALS':             { bg: '#FF55AA', text: '#ffffff' },
  'SPECIAL EFFECTS':               { bg: '#0055BB', text: '#ffffff' },
  'SOUND EFFECTS & MUSIC':         { bg: '#FFCC00', text: '#000000' },
  'SPECIAL EQUIPMENT':             { bg: '#888888', text: '#ffffff' },
  'PRODUCTION NOTE (Underline)':   { bg: '#DDDDDD', text: '#000000' },
};

const COLUMNS = [
  'SCENE', 'I/E', 'D/N', 'Script Page', 'LOCATION NAME', 'DESCRIPTION',
  'CAST', 'EXTRA', 'PROPS', 'SET DRESSING', 'WARDROBE', 'MAKEUP/HAIR',
  'VEHICLE / ANIMALS', 'SPECIAL EFFECTS', 'SOUND EFFECTS & MUSIC',
  'SPECIAL EQUIPMENT', 'PRODUCTION NOTE (Underline)',
];

export const MOCK_DATA: Record<string, string>[] = Array.from({ length: 12 }, (_, i) => ({
  'SCENE': `${i + 1}`,
  'I/E': i % 2 === 0 ? 'INT' : 'EXT',
  'D/N': i % 3 === 0 ? 'NIGHT' : 'DAY',
  'Script Page': `${i + 1}`,
  'LOCATION NAME': '',
  'DESCRIPTION': '',
  'CAST': '',
  'EXTRA': '',
  'PROPS': '',
  'SET DRESSING': '',
  'WARDROBE': '',
  'MAKEUP/HAIR': '',
  'VEHICLE / ANIMALS': '',
  'SPECIAL EFFECTS': '',
  'SOUND EFFECTS & MUSIC': '',
  'SPECIAL EQUIPMENT': '',
  'PRODUCTION NOTE (Underline)': '',
  'export': 'pdf',
}));

function initCellValues(): Record<string, string> {
  const values: Record<string, string> = {};
  MOCK_DATA.forEach((row, rowIndex) => {
    COLUMNS.forEach((col, colIndex) => {
      values[getCellId(rowIndex, colIndex)] = row[col] ?? '';
    });
  });
  return values;
}

interface Props {}

export default function ExportPreviewTable({}: Props) {
  const { selectedCellIds, cellStyles, isDragging, editingCell, setEditingCell, startMatrixSelection, updateMatrixSelection, colWidths, rowHeights } = useExportFormat();
  const [cellValues, setCellValues] = useState<Record<string, string>>(initCellValues);

  return (
    <div className="w-max bg-white shadow-sm">
      <table className="bg-white" style={{ tableLayout: 'fixed', borderCollapse: 'collapse', width: 'max-content' }}>
        <colgroup>
          {COLUMNS.map((_, i) => (
            <col key={i} style={{ width: colWidths[i] || 120, minWidth: colWidths[i] || 120 }} />
          ))}
        </colgroup>
        <thead className="z-30">
          {/* Document Header */}
          <tr style={{ height: rowHeights[1] || 41 }}>
            <th
              colSpan={COLUMNS.length}
              className="bg-surface-container-lowest border border-outline-variant p-0"
              style={{ position: 'relative' }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "360px 720px 360px 360px 240px" }}>
                <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB", display: "flex", alignItems: "center" }}>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-outline">
                    SCRIPT BREAKDOWN
                  </span>
                </div>
                <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                  <input type="text" placeholder="PROJECT TITLE" className={`text-center text-[14px] font-bold text-on-surface bg-transparent outline-none w-full uppercase font-sans`} />
                </div>
                <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                  <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase font-sans`} />
                </div>
                <div style={{ padding: "10px 12px", borderRight: "1px solid #E5E7EB" }}>
                  <input type="text" placeholder="OPTIONAL TEXT" className={`text-center text-label-sm text-on-surface bg-transparent outline-none w-full uppercase font-sans`} />
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono text-[10px] uppercase text-outline">BRANDING</span>
                  <span className="font-mono text-[10px] uppercase text-outline">LOGO</span>
                </div>
              </div>
            </th>
          </tr>
          {/* Data Headers */}
          <tr style={{ height: rowHeights[2] || 41 }}>
            {COLUMNS.map((col, i) => {
              const colorConfig = TAG_COLORS[col];
              return (
                <th
                  key={col}
                  className={`border border-outline-variant text-[10px] font-normal text-center whitespace-normal break-words p-1 ${colorConfig ? 'font-bold' : 'bg-surface-container-low text-on-surface-variant'}`}
                  style={{
                    backgroundColor: colorConfig?.bg,
                    color: colorConfig?.text,
                    position: 'relative',
                  }}
                >
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.map((_, rowIndex) => {
            return (
              <tr key={rowIndex} style={{ height: rowHeights[rowIndex + 3] || 41 }}>
                {COLUMNS.map((col, colIndex) => {
                  const cellId = getCellId(rowIndex, colIndex);
                  const isSelected = selectedCellIds.has(cellId);
                  const isEditing = editingCell === cellId;
                  const value = cellValues[cellId] ?? '';
                  const appliedStyle = cellStyles[cellId] || {};

                  return (
                    <td
                      key={col}
                      className={`border border-outline-variant text-body-md bg-white p-0 align-top ${isSelected ? 'border-primary bg-primary/10' : ''}`}
                      style={{ position: 'relative' }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden px-3 py-2 whitespace-normal break-words text-on-surface select-none cursor-cell"
                        style={appliedStyle}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          startMatrixSelection(rowIndex, colIndex);
                        }}
                        onMouseEnter={() => {
                          if (isDragging) updateMatrixSelection(rowIndex, colIndex);
                        }}
                        onDoubleClick={() => setEditingCell(cellId)}
                      >
                        {value}
                      </div>

                      {isEditing && (
                        <div
                          className="absolute top-[-2px] left-[-2px] z-[3] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm max-w-[600px] max-h-[450px]"
                          style={{
                            minWidth: Math.max(280, colWidths[colIndex] || 120),
                            minHeight: Math.max(124, rowHeights[rowIndex + 3] || 41)
                          }}
                          ref={(node) => {
                            if (node && !node.dataset.positioned) {
                              const rect = node.getBoundingClientRect();
                              if (rect.right > window.innerWidth) {
                                node.style.left = 'auto';
                                node.style.right = '-2px';
                              }
                              if (rect.bottom > window.innerHeight) {
                                node.style.top = 'auto';
                                node.style.bottom = '-2px';
                              }
                              node.dataset.positioned = 'true';
                            }
                          }}
                        >
                          <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setEditingCell(null)}
                            className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md z-[4] cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </button>
                          <textarea
                            autoFocus
                            value={value}
                            onChange={(e) => setCellValues({ ...cellValues, [cellId]: e.target.value })}
                            onFocus={(e) => {
                              const len = e.currentTarget.value.length;
                              e.currentTarget.setSelectionRange(len, len);
                              e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                                e.preventDefault();
                                setEditingCell(null);
                              }
                            }}
                            onBlur={() => setEditingCell(null)}
                            className="w-full h-full p-3 outline-none resize-y overflow-auto custom-scrollbar bg-transparent whitespace-normal break-words"
                            style={appliedStyle}
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
