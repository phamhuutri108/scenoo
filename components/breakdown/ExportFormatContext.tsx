"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const getCellId = (r: number, c: number) => `row-${r}-col-${c}`;

interface ExportFormatContextValue {
  selectedCellIds: Set<string>;
  cellStyles: Record<string, React.CSSProperties>;
  isDragging: boolean;
  editingCell: string | null;
  setEditingCell: (id: string | null) => void;
  startSelection: (id: string) => void;
  addToSelection: (id: string) => void;
  endSelection: () => void;
  applyFormat: (styleKey: string, value: string) => void;
  startMatrixSelection: (row: number, col: number) => void;
  updateMatrixSelection: (row: number, col: number) => void;
  colWidths: Record<number, number>;
  setColWidths: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  rowHeights: Record<number, number>;
  setRowHeights: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

const ExportFormatContext = createContext<ExportFormatContextValue | null>(null);

export function useExportFormat() {
  const ctx = useContext(ExportFormatContext);
  if (!ctx) throw new Error("useExportFormat must be used within ExportFormatProvider");
  return ctx;
}

export function ExportFormatProvider({ children }: { children: React.ReactNode }) {
  const [selectedCellIds, setSelectedCellIds] = useState<Set<string>>(new Set());
  const [cellStyles, setCellStyles] = useState<Record<string, React.CSSProperties>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const selectionStart = useRef<{ row: number; col: number } | null>(null);

  const [colWidths, setColWidths] = useState<Record<number, number>>({});
  const [rowHeights, setRowHeights] = useState<Record<number, number>>({});

  // Hydrate from localStorage after mount to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      const savedCols = localStorage.getItem('scenoo_export_colWidths');
      if (savedCols) setColWidths(JSON.parse(savedCols));
      const savedRows = localStorage.getItem('scenoo_export_rowHeights');
      if (savedRows) setRowHeights(JSON.parse(savedRows));
    } catch {
      // Ignore malformed data
    }
  }, []);

  useEffect(() => {
    if (Object.keys(colWidths).length > 0)
      localStorage.setItem('scenoo_export_colWidths', JSON.stringify(colWidths));
  }, [colWidths]);

  useEffect(() => {
    if (Object.keys(rowHeights).length > 0)
      localStorage.setItem('scenoo_export_rowHeights', JSON.stringify(rowHeights));
  }, [rowHeights]);

  const startSelection = useCallback((id: string) => {
    setEditingCell(null);
    setSelectedCellIds(new Set([id]));
    setIsDragging(true);
  }, []);

  const addToSelection = useCallback((id: string) => {
    setSelectedCellIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const endSelection = useCallback(() => {
    setIsDragging(false);
    selectionStart.current = null;
  }, []);

  const startMatrixSelection = useCallback((row: number, col: number) => {
    setEditingCell(null);
    selectionStart.current = { row, col };
    setIsDragging(true);
    setSelectedCellIds(new Set([getCellId(row, col)]));
  }, []);

  const updateMatrixSelection = useCallback((row: number, col: number) => {
    if (!selectionStart.current) return;
    const { row: startRow, col: startCol } = selectionStart.current;
    const minRow = Math.min(startRow, row);
    const maxRow = Math.max(startRow, row);
    const minCol = Math.min(startCol, col);
    const maxCol = Math.max(startCol, col);
    const next = new Set<string>();
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        next.add(getCellId(r, c));
      }
    }
    setSelectedCellIds(next);
  }, []);

  const applyFormat = useCallback(
    (styleKey: string, value: string) => {
      setCellStyles((prev) => {
        const next = { ...prev };
        selectedCellIds.forEach((id) => {
          next[id] = { ...(next[id] ?? {}), [styleKey]: value } as React.CSSProperties;
        });
        return next;
      });
    },
    [selectedCellIds]
  );

  useEffect(() => {
    window.addEventListener("mouseup", endSelection);
    return () => window.removeEventListener("mouseup", endSelection);
  }, [endSelection]);

  return (
    <ExportFormatContext.Provider
      value={{
        selectedCellIds, cellStyles, isDragging,
        editingCell, setEditingCell,
        startSelection, addToSelection, endSelection, applyFormat,
        startMatrixSelection, updateMatrixSelection,
        colWidths, setColWidths,
        rowHeights, setRowHeights,
      }}
    >
      {children}
    </ExportFormatContext.Provider>
  );
}
