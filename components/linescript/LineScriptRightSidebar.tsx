'use client';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const SHOT_SIZE_OPTIONS = ['EWS', 'WS', 'FS', 'MFS', 'MS', 'MCU', 'CU', 'ECU', 'Random', 'Custom'];
const SHOT_TYPE_OPTIONS = ['Observe', 'Single', 'Two', 'Three', 'Four', 'Group', 'OTS', 'POV', 'Insert', 'B-roll', 'Custom'];
const ANGLE_OPTIONS = ['Eye Level', 'Low Angle', 'High Angle', 'Bird Eye', 'Custom'];
const MOVEMENT_OPTIONS = ['Static', 'Pan', 'Tilt', 'Dolly', 'Handheld', 'Custom'];

export default function LineScriptRightSidebar({ isOpen, onToggle }: Props) {
  return (
    <div className="relative h-full shrink-0 z-20">
      <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-16 border-l overflow-hidden'}`}>
        <div className={`h-14 flex items-center shrink-0 border-b border-outline-variant ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
          {isOpen && <span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Shot Details</span>}
          <button onClick={onToggle} className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer shrink-0">
            <span className="material-symbols-outlined text-[20px]">{isOpen ? 'chevron_right' : 'menu'}</span>
          </button>
        </div>

        {isOpen && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot #</label>
              <input type="text" defaultValue="1" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Size</label>
              <div className="relative">
                <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  {SHOT_SIZE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Type</label>
              <div className="relative">
                <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  {SHOT_TYPE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Angle</label>
              <div className="relative">
                <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  {ANGLE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Movement</label>
              <div className="relative">
                <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  {MOVEMENT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Lens</label>
              <input type="text" placeholder="e.g. 35mm" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Description</label>
              <textarea rows={3} placeholder="Describe the action..." className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Note</label>
              <textarea rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 bg-[#F9FAFB] border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
