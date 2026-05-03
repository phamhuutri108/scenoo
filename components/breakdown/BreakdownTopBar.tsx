const TABS = [
  { id: 'breakdown',  label: 'Breakdown',  href: '/breakdown' },
  { id: 'linescript', label: 'Line Script', href: '/linescript' },
  { id: 'shotlist',   label: 'Shotlist',    href: '/shotlist' },
] as const;

export default function BreakdownTopBar() {
  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-8 shrink-0 z-30">
      <div className="flex items-center gap-8 h-full">
        <h1 className="text-h2 text-on-surface">Production Dashboard</h1>
        <nav className="flex gap-6 h-full">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              className={`text-label-md flex items-center h-full border-b-2 transition-colors ${
                tab.id === 'breakdown'
                  ? 'text-primary border-primary'
                  : 'text-secondary border-transparent hover:text-on-surface'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search scenes..."
            className="bg-surface-container-low border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-56"
          />
        </div>
        <button
          aria-label="Notifications"
          className="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          aria-label="Help"
          className="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
  );
}
