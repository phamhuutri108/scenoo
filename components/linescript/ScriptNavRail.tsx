const NAV_ITEMS = [
  { icon: 'folder_open', label: 'Projects', href: '/dashboard', active: false, filled: false },
  { icon: 'movie_filter', label: 'Assets', href: '#', active: true, filled: true },
  { icon: 'group', label: 'Crew', href: '#', active: false, filled: false },
  { icon: 'settings', label: 'Settings', href: '#', active: false, filled: false },
];

export default function ScriptNavRail() {
  return (
    <nav className="fixed left-0 top-0 h-full w-[80px] border-r border-surface-variant bg-surface-container-lowest flex flex-col items-center py-6 z-40">
      <div className="mb-12">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontSize: 30, fontVariationSettings: "'FILL' 1" }}
        >
          movie
        </span>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all group relative ${
              item.active
                ? 'bg-surface-container text-on-surface'
                : 'text-secondary hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={item.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="absolute left-full ml-1 px-2 py-1 bg-inverse-surface text-inverse-on-surface rounded text-label-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-auto">
        <button
          aria-label="Profile"
          className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container-high cursor-pointer"
        >
          <span className="material-symbols-outlined text-secondary">person</span>
        </button>
      </div>
    </nav>
  );
}
