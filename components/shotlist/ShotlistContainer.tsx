'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import type { ShotRow } from '@/types/shotlist';
import ShotlistTable from './ShotlistTable';
import ShotlistReport from './ShotlistReport';
import ShareScriptModal from '@/components/projects/ShareScriptModal';
import ExportUpgradeModal from '@/components/linescript/ExportUpgradeModal';
import type { ScriptVersion } from '@/types/project';

type ShotlistViewMode = 'table' | 'report';

const TOOLBAR_BTN = 'w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer';

function ToolbarDivider() {
  return <div className="w-px h-6 bg-outline-variant mx-1 shrink-0" />;
}

const ALL_COLUMN_KEYS = [
  { key: 'orderIndex', label: '#' }, { key: 'sceneNumber', label: 'SC#' }, { key: 'shotNumber', label: 'SH#' },
  { key: 'location', label: 'LOCATION' }, { key: 'intExt', label: 'INT/EXT' }, { key: 'dayNight', label: 'D/N' },
  { key: 'storyboard', label: 'STORYBOARD' }, { key: 'description', label: 'DESCRIPTION' }, { key: 'dialogue', label: 'DIALOGUE' },
  { key: 'subjects', label: 'SUBJECTS' }, { key: 'scriptTime', label: 'SCRIPT TIME' }, { key: 'shotSize', label: 'SHOT SIZE' },
  { key: 'shotType', label: 'SHOT TYPE' }, { key: 'side', label: 'SIDE' }, { key: 'angle', label: 'ANGLE' },
  { key: 'movement', label: 'MOVEMENT' }, { key: 'lens', label: 'LENS' }, { key: 'note', label: 'NOTE' }
];

// ─── Mock Data ───────────────────────────────────────────────────────────────
// Phase 2: Pure UI. No IndexedDB calls. Replace with DatabaseAdapter in Phase 3.

const MOCK_SHOTS: ShotRow[] = [
  {
    id: 'shot-001',
    orderIndex: 1,
    sceneNumber: '1A',
    location: 'COFFEE SHOP',
    shotNumber: '1',
    intExt: 'INT',
    dayNight: 'DAY',
    description: 'CU - Protagonist enters and scans the room',
    dialogue: 'ALEX (nervous): "Is anyone sitting here?"',
    subjects: 'Alex, Barista',
    scriptTime: '00:45',
    shotSize: 'CLOSE UP',
    shotType: 'Single',
    side: 'L',
    angle: 'Eye Level',
    movement: 'Static',
    lens: '35mm',
    note: 'Watch for reflection in mirror glass',
  },
  {
    id: 'shot-002',
    orderIndex: 2,
    sceneNumber: '1A',
    location: 'COFFEE SHOP',
    shotNumber: '2',
    intExt: 'INT',
    dayNight: 'DAY',
    description: 'OTS - Barista reacts with a smirk',
    dialogue: 'BARISTA: "Nope, go ahead."',
    subjects: 'Barista',
    scriptTime: '00:10',
    shotSize: 'MEDIUM CU',
    shotType: 'OTS',
    side: 'R',
    angle: 'Slightly Low',
    movement: 'Pan Left',
    lens: '50mm',
    note: 'Focus pull to Alex in background',
  },
  {
    id: 'shot-003',
    orderIndex: 3,
    sceneNumber: '1A',
    location: 'COFFEE SHOP',
    shotNumber: '3',
    intExt: 'INT',
    dayNight: 'DAY',
    description: 'Wide - Establishing coffee shop bustle',
    dialogue: '',
    subjects: 'Extras, Alex',
    scriptTime: '00:20',
    shotSize: 'WIDE SHOT',
    shotType: 'Master',
    side: '',
    angle: 'High Angle',
    movement: 'Crane Down',
    lens: '18mm',
    note: 'Shoot before lunch — natural light peaks at noon',
  },
  {
    id: 'shot-004',
    orderIndex: 4,
    sceneNumber: '2',
    location: 'CITY STREET',
    shotNumber: '1',
    intExt: 'EXT',
    dayNight: 'MORNING',
    description: 'Wide - Alex exits the coffee shop',
    dialogue: '',
    subjects: 'Alex',
    scriptTime: '00:08',
    shotSize: 'WIDE SHOT',
    shotType: 'Master',
    side: '',
    angle: 'Eye Level',
    movement: 'Track Right',
    lens: '24mm',
    note: 'Slow motion — 120fps. Clear BG of cars.',
  },
  {
    id: 'shot-005',
    orderIndex: 5,
    sceneNumber: '2',
    location: 'CITY STREET',
    shotNumber: '2',
    intExt: 'EXT',
    dayNight: 'MORNING',
    description: 'MCU - Alex reading a crumpled note',
    dialogue: '',
    subjects: 'Alex, Note (prop)',
    scriptTime: '00:30',
    shotSize: 'MED CLOSE',
    shotType: 'Insert',
    side: 'C',
    angle: 'Top Down',
    movement: 'Zoom In',
    lens: '85mm',
    note: 'Texture of paper is critical — use macro lens if needed',
  },
  {
    id: 'shot-006',
    orderIndex: 6,
    sceneNumber: '3',
    location: 'ROOFTOP',
    shotNumber: '1',
    intExt: 'EXT',
    dayNight: 'DUSK',
    description: 'Extreme Wide - City skyline reveal',
    dialogue: '',
    subjects: 'Alex (silhouette)',
    scriptTime: '00:12',
    shotSize: 'EXTREME WIDE',
    shotType: 'Establishing',
    side: '',
    angle: 'Eye Level',
    movement: 'Dolly Back',
    lens: '14mm',
    note: 'Golden hour. Confirm location permit.',
  },
  {
    id: 'shot-007',
    orderIndex: 7,
    sceneNumber: '3',
    location: 'ROOFTOP',
    shotNumber: '2',
    intExt: 'EXT',
    dayNight: 'DUSK',
    description: 'ECU - Alex\'s eyes scanning horizon',
    dialogue: 'ALEX (V.O.): "It was always going to end here."',
    subjects: 'Alex',
    scriptTime: '00:18',
    shotSize: 'EXTREME CU',
    shotType: 'Single',
    side: 'L',
    angle: 'Eye Level',
    movement: 'Handheld Push',
    lens: '135mm',
    note: 'VO recorded in post. Sync on edit.',
  },
];

// ─── Container ────────────────────────────────────────────────────────────────

/**
 * ShotlistContainer — Container Component
 * Owns the shot list state. Calls DatabaseAdapter (Phase 3) from here.
 * Passes derived props down to ShotlistTable.
 */
export default function ShotlistContainer() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const projectSlug = (params.projectSlug as string) || 'default';
  const scriptId = (params.scriptId as string) || 'v1';
  const paramView = params.view as string | undefined;
  const viewMode: ShotlistViewMode = paramView === 'report' ? 'report' : 'table';

  const [shots] = useState<ShotRow[]>(MOCK_SHOTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'csv' | 'sheets' | null>(null);

  useEffect(() => {
    const handleShare = () => setIsShareModalOpen(true);
    const handleExport = () => setIsExportMenuOpen(true);
    window.addEventListener('openShareModal', handleShare);
    window.addEventListener('openExportModal', handleExport);
    return () => {
      window.removeEventListener('openShareModal', handleShare);
      window.removeEventListener('openExportModal', handleExport);
    };
  }, []);

  // Phase 3 States
  const [visibleCols, setVisibleCols] = useState<string[]>(ALL_COLUMN_KEYS.map(c => c.key));
  const [isColMenuOpen, setIsColMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const handleViewModeChange = (nextViewMode: ShotlistViewMode) => {
    const targetPath = nextViewMode === 'report'
      ? `/workspace/${projectSlug}/${scriptId}/shotlist/report`
      : `/workspace/${projectSlug}/${scriptId}/shotlist`;
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  const [zoom, setZoom] = useState(100);
  const handleZoomOut = () => setZoom(z => Math.max(100, z - 10));
  const handleZoomIn = () => setZoom(z => Math.min(250, z + 10));
  const tableZoom = Math.max(70, Math.min(220, zoom - 30));
  const handleTableZoomChange = (newTableZoom: number) => {
    const visibleZoom = Math.round(newTableZoom + 30);
    setZoom(Math.max(100, Math.min(250, visibleZoom)));
  };

  const MOCK_SCRIPT: ScriptVersion = {
    id: scriptId,
    label: "Current Draft",
    description: "Active script version in workspace.",
    modifiedDate: "Today",
    pageCount: 120,
    status: "Draft",
    author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" },
    generalAccess: "Just Crew"
  };

  const filteredShots = searchQuery.trim() ? shots.filter(
    (s) =>
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sceneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjects.toLowerCase().includes(searchQuery.toLowerCase()),
  ) : shots;

  const totalScriptTime = filteredShots.reduce((acc, s) => {
    const [mm, ss] = s.scriptTime.split(':').map(Number);
    return acc + (mm || 0) * 60 + (ss || 0);
  }, 0);

  const totalMin = Math.floor(totalScriptTime / 60);
  const totalSec = totalScriptTime % 60;

  const toggleColumn = (key: string) => {
    setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  return (
    <div className="flex flex-col h-full relative">
      <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />
      <ExportUpgradeModal isOpen={!!exportType} onClose={() => setExportType(null)} exportType={exportType} />

      {/* ── Toolbar ── */}
      <div className="h-14 shrink-0 flex items-center justify-between px-4 bg-white border-b border-outline-variant relative z-50">
        {/* Left: Rich Text Tools & View Toggle */}
        <div className="flex items-center gap-1">
          {/* Zoom Controller */}
          <div className="flex items-center gap-1 bg-[#f9f9ff] border border-[#E5E7EB] rounded-lg p-1 shrink-0">
            <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="text-label-sm font-medium text-on-surface-variant min-w-[3rem] text-center">{Math.round(zoom)}%</span>
            <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
          <ToolbarDivider />

          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
          <div className="relative flex items-center">
            <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_color_text</span></button>
          </div>
          <ToolbarDivider />
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_left</span></button>
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_center</span></button>
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">format_align_right</span></button>
          <ToolbarDivider />
          <button className={TOOLBAR_BTN}><span className="material-symbols-outlined text-[18px]">link</span></button>

          <ToolbarDivider />

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
            <button onClick={() => handleViewModeChange('table')} className={`px-3 py-1 text-label-sm font-bold rounded cursor-pointer transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Table</button>
            <button onClick={() => handleViewModeChange('report')} className={`px-3 py-1 text-label-sm font-bold rounded cursor-pointer transition-colors ${viewMode === 'report' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>Report</button>
          </div>
        </div>

        {/* Right: Search, Filter, Cols, New */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shots..."
              className="pl-9 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm w-48 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>

          {/* Columns Visibility */}
          <div className="relative">
            <button onClick={() => setIsColMenuOpen(!isColMenuOpen)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">view_column</span>
              Cols
            </button>
            {isColMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsColMenuOpen(false)} />
                <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg py-2 w-48 z-50 max-h-80 overflow-y-auto custom-scrollbar flex flex-col">
                  <div className="px-4 py-2 border-b border-outline-variant mb-1 flex justify-between items-center shrink-0">
                    <span className="text-label-sm font-bold">Columns</span>
                    <button onClick={() => setVisibleCols(ALL_COLUMN_KEYS.map(c => c.key))} className="text-[10px] text-primary hover:underline cursor-pointer">Reset</button>
                  </div>
                  {ALL_COLUMN_KEYS.map(c => (
                    <label key={c.key} className="flex items-center gap-3 px-4 py-1.5 hover:bg-surface-container-low cursor-pointer shrink-0">
                      <input type="checkbox" checked={visibleCols.includes(c.key)} onChange={() => toggleColumn(c.key)} className="accent-primary cursor-pointer" />
                      <span className="text-body-md text-on-surface select-none">{c.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Filter Placeholder */}
          <div className="relative">
            <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="flex items-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            {isFilterMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterMenuOpen(false)} />
                <div className="absolute top-full right-0 mt-2 bg-white border border-outline-variant shadow-lg rounded-lg p-4 w-64 z-50">
                  <div className="text-label-sm font-bold mb-2">Filters</div>
                  <p className="text-body-md text-outline italic">Advanced filtering logic coming soon.</p>
                </div>
              </>
            )}
          </div>

          <ToolbarDivider />

          <button className="flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Shot
          </button>
        </div>
      </div>

      {/* ── Main View ── */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'table' ? (
          <ShotlistTable rows={filteredShots} visibleCols={visibleCols} zoom={tableZoom} onZoomChange={handleTableZoomChange} />
        ) : (
          <ShotlistReport rows={filteredShots} zoom={zoom} onZoomChange={setZoom} />
        )}
      </div>

      {/* ── Footer ── */}
      {viewMode === 'table' && (
        <div className="h-10 shrink-0 bg-white border-t border-outline-variant flex items-center justify-between px-6 z-30">
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            {filteredShots.length} Shots
          </span>
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">
            Est. Time: {totalMin}:{totalSec.toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
