interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SHOT_SIZE_OPTIONS = ['EWS', 'WS', 'FS', 'MFS', 'MS', 'MCU', 'CU', 'ECU', 'Random', 'Custom'];
const MOVEMENT_OPTIONS = ['Static', 'Pan', 'Tilt', 'Dolly', 'Handheld', 'Custom'];

export default function ShotDetailSidebar({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="w-72 shrink-0 bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full">
      <div className="h-12 flex items-center justify-between px-4 border-b border-outline-variant shrink-0">
        <span className="text-label-lg text-on-surface">Shot Details</span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-label-sm text-on-surface-variant">Shot #</label>
          <input
            type="text"
            placeholder="e.g. 1A/1"
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:border-primary outline-none text-on-surface"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-label-sm text-on-surface-variant">Shot Size</label>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:border-primary outline-none text-on-surface cursor-pointer">
            {SHOT_SIZE_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-label-sm text-on-surface-variant">Movement</label>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:border-primary outline-none text-on-surface cursor-pointer">
            {MOVEMENT_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
