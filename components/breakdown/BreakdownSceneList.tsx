import type { Scene } from '@/types/breakdown';

interface Props {
  scenes: Scene[];
  activeSceneId: string;
  onSceneSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function BreakdownSceneList({ scenes, activeSceneId, onSceneSelect, isOpen, onToggle }: Props) {
  return (
    <div className="relative h-full shrink-0 z-20">
      <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64 border-r' : 'w-16 border-r overflow-hidden'}`}>
        <div className={`h-14 flex items-center shrink-0 border-b border-outline-variant ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
          {isOpen && <span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Scene List</span>}
          <button onClick={onToggle} className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer shrink-0">
            <span className="material-symbols-outlined text-[20px]">{isOpen ? 'chevron_left' : 'menu'}</span>
          </button>
        </div>
        {isOpen && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {scenes.map((scene) => {
              const isActive = scene.id === activeSceneId;
              return (
                <button key={scene.id} onClick={() => onSceneSelect(scene.id)} className={`w-full text-left p-3 rounded-lg transition-colors border cursor-pointer ${ isActive ? 'bg-primary-fixed/10 border-primary/20' : 'border-transparent hover:bg-surface-container' }`} >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-label-sm font-bold ${ isActive ? 'text-primary' : 'text-secondary' }`} > SCENE {String(scene.number).padStart(2, '0')} </span>
                    <span className="text-[10px] uppercase font-bold text-outline"> {scene.intExt}. {scene.dayNight} </span>
                  </div>
                  <div className={`text-body-md truncate ${ isActive ? 'text-on-surface font-medium' : 'text-on-surface-variant' }`} > {scene.location} </div>
                </button>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
