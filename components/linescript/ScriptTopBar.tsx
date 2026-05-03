type Tab = 'breakdown' | 'linescript' | 'shotlist';

interface Props {
  sceneNumber: string;
  activeTab: Tab;
}

const TABS: { id: Tab; label: string; href: string }[] = [
  { id: 'breakdown', label: 'Breakdown', href: '/breakdown' },
  { id: 'linescript', label: 'Line Script', href: '/linescript' },
  { id: 'shotlist', label: 'Shotlist', href: '/shotlist' },
];

export default function ScriptTopBar({ sceneNumber, activeTab }: Props) {
  return (
    <header className="h-16 px-8 w-full border-b border-surface-variant bg-surface-container-lowest flex justify-between items-center z-30 shrink-0">
      <div className="flex items-center gap-8 h-full">
        <div className="text-h3 text-on-surface mr-4">SCENE {sceneNumber}</div>
        <nav className="flex h-full gap-6">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              className={`text-label-md flex items-center h-full border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-secondary border-transparent hover:text-primary'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
