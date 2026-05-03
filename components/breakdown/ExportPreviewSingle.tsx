"use client";

import { useState } from "react";
import { getCellId, useExportFormat } from "@/components/breakdown/ExportFormatContext";

const BORDER = "1px solid #E5E7EB";
const SELECTION_OUTLINE = "2px solid #6750A4";
const SELECTION_BG = "rgba(103, 80, 164, 0.08)";

const CELL_COLORS: Record<string, { bg: string; text: string }> = {
  "CAST":                         { bg: "#FF0000", text: "#ffffff" },
  "PROPS":                        { bg: "#8800CC", text: "#ffffff" },
  "EXTRAS":                       { bg: "#00AA00", text: "#ffffff" },
  "MAKEUP/HAIR":                  { bg: "#FF6600", text: "#ffffff" },
  "SET DRESSING":                 { bg: "#33BB33", text: "#ffffff" },
  "WARDROBE":                     { bg: "#00AADD", text: "#ffffff" },
  "VEHICLE / ANIMALS":            { bg: "#FF55AA", text: "#ffffff" },
  "SPECIAL EFFECTS":              { bg: "#0055BB", text: "#ffffff" },
  "SOUND EFFECTS & MUSIC":        { bg: "#FFCC00", text: "#000000" },
  "SPECIAL EQUIPMENT":            { bg: "#888888", text: "#ffffff" },
  "PRODUCTION NOTES (Underline)": { bg: "#DDDDDD", text: "#000000" },
};

function MetaField({
  label,
  multiLine = false,
  borderLeft = true,
  virtualRow,
  virtualCol,
  defaultValue,
}: {
  label: string;
  multiLine?: boolean;
  borderLeft?: boolean;
  virtualRow: number;
  virtualCol: number;
  defaultValue?: string;
}) {
  const { selectedCellIds, cellStyles, isDragging, editingCell, setEditingCell, startMatrixSelection, updateMatrixSelection } = useExportFormat();
  const [value, setValue] = useState(defaultValue ?? '');

  const id = getCellId(virtualRow, virtualCol);
  const isSelected = selectedCellIds.has(id);
  const isEditing = editingCell === id;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    padding: "5px 10px",
    display: "flex",
    alignItems: multiLine ? "flex-start" : "center",
    gap: "8px",
    borderLeft: borderLeft ? BORDER : undefined,
    outline: isSelected ? SELECTION_OUTLINE : undefined,
    outlineOffset: isSelected ? '-2px' : undefined,
    backgroundColor: isSelected ? SELECTION_BG : undefined,
  };

  const sharedTextStyle: React.CSSProperties = {
    flex: 1,
    fontSize: "11px",
    fontFamily: "inherit",
    color: "#191b23",
    ...cellStyles[id],
  };

  return (
    <div style={containerStyle}>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: "10px",
          fontWeight: "bold",
          color: "#424754",
          whiteSpace: "nowrap",
          textAlign: "center",
          paddingTop: multiLine ? "2px" : undefined,
        }}
      >
        {label}
      </span>
      <div
        style={{
          ...sharedTextStyle,
          minHeight: multiLine ? "36px" : "20px",
          cursor: "cell",
          color: value ? "#191b23" : "#9CA3AF",
          userSelect: "none",
        }}
        onMouseDown={(e) => { e.preventDefault(); startMatrixSelection(virtualRow, virtualCol); }}
        onMouseEnter={() => isDragging && updateMatrixSelection(virtualRow, virtualCol)}
        onDoubleClick={() => setEditingCell(id)}
      >
        {value || ' '}
      </div>
      {isEditing && (
        <div
          className="absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm max-w-[90vw] max-h-[80vh]"
          style={{ minWidth: 'calc(100% + 4px)', minHeight: 'calc(100% + 4px)' }}
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
            className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md z-[2] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">check</span>
          </button>
          <textarea
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            className="w-full h-full min-w-max min-h-max p-2 outline-none resize-none custom-scrollbar bg-transparent whitespace-pre-wrap break-words"
            style={sharedTextStyle}
          />
        </div>
      )}
    </div>
  );
}

function CategoryCell({
  label,
  colSpan = 1,
  virtualRow,
  virtualCol,
}: {
  label: string;
  colSpan?: number;
  virtualRow: number;
  virtualCol: number;
}) {
  const { selectedCellIds, cellStyles, isDragging, editingCell, setEditingCell, startMatrixSelection, updateMatrixSelection } = useExportFormat();
  const [value, setValue] = useState('');

  const id = getCellId(virtualRow, virtualCol);
  const isSelected = selectedCellIds.has(id);
  const isEditing = editingCell === id;
  const { bg, text } = CELL_COLORS[label] ?? { bg: "#cccccc", text: "#000000" };

  const sharedTextStyle: React.CSSProperties = {
    flex: 1,
    width: "100%",
    padding: "4px 8px",
    fontSize: "11px",
    fontFamily: "inherit",
    ...cellStyles[id],
  };

  return (
    <div
      style={{
        position: "relative",
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
        display: "flex",
        flexDirection: "column",
        borderRight: BORDER,
        borderBottom: BORDER,
        minHeight: "120px",
        outline: isSelected ? SELECTION_OUTLINE : undefined,
        outlineOffset: isSelected ? '-2px' : undefined,
        backgroundColor: isSelected ? SELECTION_BG : undefined,
      }}
    >
      <span
        style={{
          backgroundColor: bg,
          color: text,
          fontSize: "9px",
          fontWeight: "bold",
          fontFamily: "monospace",
          padding: "2px 8px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "block",
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <div
        style={{
          ...sharedTextStyle,
          cursor: "cell",
          color: value ? "#191b23" : "#9CA3AF",
          userSelect: "none",
        }}
        onMouseDown={(e) => { e.preventDefault(); startMatrixSelection(virtualRow, virtualCol); }}
        onMouseEnter={() => isDragging && updateMatrixSelection(virtualRow, virtualCol)}
        onDoubleClick={() => setEditingCell(id)}
      >
        {value || ' '}
      </div>
      {isEditing && (
        <div
          className="absolute top-[-2px] left-[-2px] z-[1] bg-white border-2 border-primary shadow-2xl overflow-auto rounded-sm max-w-[90vw] max-h-[80vh]"
          style={{ minWidth: 'calc(100% + 4px)', minHeight: 'calc(100% + 4px)' }}
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
            className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md z-[2] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">check</span>
          </button>
          <textarea
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            className="w-full h-full min-w-max min-h-max p-2 outline-none resize-none custom-scrollbar bg-transparent whitespace-pre-wrap break-words"
            style={{ ...sharedTextStyle, color: "#191b23" }}
          />
        </div>
      )}
    </div>
  );
}

interface Props {
  activeSceneId?: string;
}

export default function ExportPreviewSingle({ activeSceneId }: Props) {
  const sceneNumber = activeSceneId ? activeSceneId.replace(/\D/g, '') || '1' : '1';
  return (
    <div
      className={`border border-outline-variant shadow-[4px_4px_0_#bbb] font-sans`}
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* === HEADER === */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gridTemplateRows: "auto auto", borderBottom: BORDER }}>
        <div style={{ padding: "10px 12px", borderRight: BORDER, display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "#424754" }}>
            SCRIPT BREAKDOWN
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 16px" }}>
          <input
            type="text"
            placeholder="PROJECT TITLE"
            className="font-sans"
            style={{ textAlign: "center", fontSize: "13px", fontWeight: "bold", background: "transparent", outline: "none", border: "none", width: "100%", color: "#191b23" }}
          />
        </div>

        <div style={{ borderLeft: BORDER, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "9px", textAlign: "center", color: "#9CA3AF" }}>
            BRANDING LOGO
          </span>
        </div>

        <div style={{ borderRight: BORDER, borderTop: BORDER }} />

        <div style={{ borderTop: BORDER, display: "flex", alignItems: "center", padding: "4px 16px" }}>
          <input
            type="text"
            placeholder="OPTIONAL TEXT"
            className="font-sans"
            style={{ textAlign: "center", fontSize: "10px", background: "transparent", outline: "none", border: "none", width: "100%", color: "#424754" }}
          />
        </div>

        <div style={{ borderTop: BORDER, borderLeft: BORDER, display: "flex", alignItems: "center", padding: "4px 12px" }}>
          <input
            type="text"
            placeholder="OPTIONAL TEXT"
            className="font-sans"
            style={{ textAlign: "center", fontSize: "10px", background: "transparent", outline: "none", border: "none", width: "100%", color: "#424754" }}
          />
        </div>
      </div>

      {/* === META ROW 0: Scene #(0,0) | INT/EXT(0,1) | D/N(0,2) === */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: BORDER }}>
        <MetaField key={activeSceneId} label="Scene #:" borderLeft={false} virtualRow={0} virtualCol={0} defaultValue={sceneNumber} />
        <MetaField label="INT/EXT:"                    virtualRow={0} virtualCol={1} />
        <MetaField label="D / N:"                      virtualRow={0} virtualCol={2} />
      </div>

      {/* === META ROW 1: Script Page(1,0) | Location Name(1,1) === */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", borderBottom: BORDER }}>
        <MetaField label="Script Page:"    borderLeft={false} virtualRow={1} virtualCol={0} />
        <MetaField label="Location Name:"              virtualRow={1} virtualCol={1} />
      </div>

      {/* === META ROW 1 cont: Description(1,2) === */}
      <div style={{ borderBottom: BORDER }}>
        <MetaField label="Description:" multiLine borderLeft={false} virtualRow={1} virtualCol={2} />
      </div>

      {/* === CATEGORY GRID (virtual rows 2–5) === */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <CategoryCell label="CAST"                         virtualRow={2} virtualCol={0} />
        <CategoryCell label="PROPS"                        virtualRow={2} virtualCol={1} />
        <CategoryCell label="EXTRAS"                       virtualRow={2} virtualCol={2} />
        <CategoryCell label="MAKEUP/HAIR"                  virtualRow={3} virtualCol={0} />
        <CategoryCell label="SET DRESSING"                 virtualRow={3} virtualCol={1} />
        <CategoryCell label="WARDROBE"                     virtualRow={3} virtualCol={2} />
        <CategoryCell label="VEHICLE / ANIMALS"            virtualRow={4} virtualCol={0} />
        <CategoryCell label="SPECIAL EFFECTS"              virtualRow={4} virtualCol={1} />
        <CategoryCell label="SOUND EFFECTS & MUSIC"        virtualRow={4} virtualCol={2} />
        <CategoryCell label="SPECIAL EQUIPMENT"            virtualRow={5} virtualCol={0} />
        <CategoryCell label="PRODUCTION NOTES (Underline)" virtualRow={5} virtualCol={1} colSpan={2} />
      </div>
    </div>
  );
}
