export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-40">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424754] text-[20px]">
            search
          </span>
          <input
            className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent outline-none transition-all"
            placeholder="Search projects..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-[#424754] hover:text-[#191b23] transition-colors cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-[#424754] hover:text-[#191b23] transition-colors cursor-pointer">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
  );
}
