'use client';

import { useState } from 'react';
import BreakdownSceneList from './BreakdownSceneList';
import ScriptViewer from './ScriptViewer';
import BreakdownSidebar from './BreakdownSidebar';
import TagToolbar from './TagToolbar';
import type { Scene, TaggedElement, ScriptLine, TagCategory } from '@/types/breakdown';

const MOCK_SCENES: Scene[] = [
  {
    id: 'scene-01',
    number: 1,
    location: 'Apartment - Living Room',
    intExt: 'INT',
    dayNight: 'DAY',
    tagCounts: [
      { category: 'cast', count: 3 },
      { category: 'props', count: 2 },
    ],
  },
  {
    id: 'scene-02',
    number: 2,
    location: 'Subway Platform - Rain',
    intExt: 'EXT',
    dayNight: 'NIGHT',
  },
  {
    id: 'scene-03',
    number: 3,
    location: 'Underground Lab',
    intExt: 'INT',
    dayNight: 'NIGHT',
  },
];

const MOCK_SCRIPT_LINES: ScriptLine[] = [
  {
    id: 'line-1',
    type: 'slug',
    segments: [{ id: 's1', text: 'INT. APARTMENT - DAY' }],
  },
  {
    id: 'line-2',
    type: 'action',
    segments: [
      { id: 's2', text: 'The room is cluttered with film equipment. Sun streaks through the blinds, illuminating dust motes dancing in the air.' },
    ],
  },
  {
    id: 'line-3',
    type: 'character',
    segments: [{ id: 's3', text: 'MARK' }],
  },
  {
    id: 'line-4',
    type: 'dialogue',
    segments: [
      { id: 's4a', text: "We don't have enough time. The " },
      { id: 's4b', text: 'ANCIENT COMPASS', tag: 'props' },
      { id: 's4c', text: ' is missing, and the ' },
      { id: 's4d', text: 'DIRECTOR', tag: 'cast' },
      { id: 's4e', text: ' is going to kill us.' },
    ],
  },
  {
    id: 'line-5',
    type: 'character',
    segments: [{ id: 's5', text: 'SARAH' }],
  },
  {
    id: 'line-6',
    type: 'dialogue',
    segments: [
      { id: 's6a', text: 'Check the equipment locker. I heard a ' },
      { id: 's6b', text: 'LOUD METALLIC CLANG', tag: 'special-effects' },
      { id: 's6c', text: ' coming from there earlier.' },
    ],
  },
  {
    id: 'line-7',
    type: 'action',
    segments: [
      { id: 's7a', text: 'Sarah picks up a ' },
      { id: 's7b', text: 'POLAROID CAMERA', tag: 'props' },
      { id: 's7c', text: ' and snaps a photo of the empty desk.' },
    ],
  },
];

const MOCK_TAGGED_ELEMENTS: TaggedElement[] = [
  { id: 'tag-1', text: 'MARK',            category: 'cast',            sceneId: 'scene-01', quantity: 1 },
  { id: 'tag-2', text: 'SARAH',           category: 'cast',            sceneId: 'scene-01', quantity: 1 },
  { id: 'tag-3', text: 'DIRECTOR',        category: 'cast',            sceneId: 'scene-01', quantity: 1 },
  { id: 'tag-4', text: 'Ancient Compass', category: 'props',           sceneId: 'scene-01', quantity: 1 },
  { id: 'tag-5', text: 'Polaroid Camera', category: 'props',           sceneId: 'scene-01', quantity: 2 },
  { id: 'tag-6', text: 'Metallic Clang',  category: 'special-effects', sceneId: 'scene-01', quantity: 1 },
];

export default function BreakdownContainer() {
  const [activeSceneId, setActiveSceneId] = useState('scene-01');
  const [taggedElements, setTaggedElements] = useState<TaggedElement[]>(MOCK_TAGGED_ELEMENTS);
  const [productionNote, setProductionNote] = useState('');
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('single');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 120;
  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 250));
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));

  function handleRemoveTag(tagId: string) {
    setTaggedElements((prev) => prev.filter((t) => t.id !== tagId));
  }

  function handleUpdateQuantity(id: string, quantity: number) {
    setTaggedElements((prev) =>
      prev.map((t) => (t.id === id ? { ...t, quantity } : t))
    );
  }

  function handleTagSelect(category: TagCategory, quantity: number) {
    // Phase 5: wire up text selection → tag creation
    console.log('Tag selected:', category, 'qty:', quantity);
  }

  const activeSceneElements = taggedElements.filter((t) => t.sceneId === activeSceneId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f9f9ff] relative">
      <div className="flex-1 flex overflow-hidden">
        <BreakdownSceneList
          scenes={MOCK_SCENES}
          activeSceneId={activeSceneId}
          onSceneSelect={setActiveSceneId}
          isOpen={isLeftOpen}
          onToggle={() => setIsLeftOpen(!isLeftOpen)}
        />
        <ScriptViewer
          scriptLines={MOCK_SCRIPT_LINES}
          zoom={zoom}
          onZoomChange={setZoom}
          viewMode={viewMode}
          currentPage={currentPage}
          totalPages={totalPages}
          onCurrentPageChange={setCurrentPage}
        />
        <BreakdownSidebar
          activeSceneId={activeSceneId}
          taggedElements={activeSceneElements}
          onRemoveTag={handleRemoveTag}
          onUpdateQuantity={handleUpdateQuantity}
          productionNote={productionNote}
          onProductionNoteChange={setProductionNote}
          isOpen={isRightOpen}
          onToggle={() => setIsRightOpen(!isRightOpen)}
        />
        <TagToolbar onTagSelect={handleTagSelect} />
      </div>

      {/* ── Zoom & Pagination Bottombar ── */}
      <div className="h-14 shrink-0 flex items-center pl-6 pr-0 bg-white border-t border-[#E5E7EB] z-10 gap-1 relative">
        {/* Centered Tool Cluster */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          {/* 1. Zoom */}
          <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
            <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
            <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <div className="h-6 w-px bg-[#E5E7EB]" />

          {/* 2. View Mode */}
          <div className="flex items-center bg-[#f9f9ff] border border-[#E5E7EB] p-1 rounded-lg shrink-0">
            <button onClick={() => setViewMode('single')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'single' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Single Page</button>
            <button onClick={() => setViewMode('scroll')} className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${viewMode === 'scroll' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'} cursor-pointer`}>Scroll</button>
          </div>

          <div className="h-6 w-px bg-[#E5E7EB]" />

          {/* 3. Pagination */}
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
            <span className="font-inter text-label-sm font-medium text-on-surface-variant min-w-[5rem] text-center">{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
