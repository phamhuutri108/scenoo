'use client';

interface SceneNav {
  id: string;
  number: number;
  location: string;
  intExt: string;
  dayNight: string;
  pageStart: number;
}

const MOCK_SCENES_NAV: SceneNav[] = [
  { id: 'sc1', number: 1, location: 'COFFEE SHOP', intExt: 'INT', dayNight: 'DAY', pageStart: 1 },
  { id: 'sc2', number: 2, location: 'CITY STREET', intExt: 'EXT', dayNight: 'MORNING', pageStart: 3 },
  { id: 'sc3', number: 3, location: 'ROOFTOP', intExt: 'EXT', dayNight: 'DUSK', pageStart: 5 },
];

interface Props {
  onJumpToPage: (page: number) => void;
}

export default function LineScriptExportSidebar({ onJumpToPage }: Props) {
  return (
    <aside className="w-72 bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-outline-variant shrink-0">
          <h2 className="text-label-md font-bold text-on-surface uppercase tracking-wider">Navigate Scenes</h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {MOCK_SCENES_NAV.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onJumpToPage(scene.pageStart)}
              className="w-full text-left p-3 rounded-lg transition-colors border border-transparent hover:bg-surface-container cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-label-sm font-bold text-secondary">SCENE {scene.number}</span>
                <span className="text-[10px] uppercase font-bold text-outline">
                  {scene.intExt}. {scene.dayNight}
                </span>
              </div>
              <div className="text-body-md text-on-surface truncate">{scene.location}</div>
              <div className="text-[10px] text-on-surface-variant mt-1">Page {scene.pageStart}</div>
            </button>
          ))}
        </div>
      </aside>
  );
}
