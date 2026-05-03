'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function WorkspaceHeader() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.includes('/export')) return null;

  const projectSlug = (params.projectSlug as string) || 'default';
  const scriptId = (params.scriptId as string) || 'v1';
  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  const moduleFromPath = pathSegments[3] || 'breakdown';
  const currentModule = (params.module as string) || moduleFromPath;

  const baseUrl = `/workspace/${projectSlug}/${scriptId}`;

  const handleExportClick = () => {
    if (currentModule === 'shotlist') {
      window.dispatchEvent(new CustomEvent('openExportModal'));
    } else {
      router.push(`/workspace/${projectSlug}/${scriptId}/${currentModule}/export`);
    }
  };

  const handleShareClick = () => {
    window.dispatchEvent(new CustomEvent('openShareModal'));
  };

  const NAV_TABS = [
    { id: 'breakdown', label: 'Breakdown', href: `${baseUrl}/breakdown` },
    { id: 'linescript', label: 'Line Script', href: `${baseUrl}/linescript` },
    { id: 'shotlist', label: 'Shotlist', href: `${baseUrl}/shotlist` },
    { id: 'schedule', label: 'Shooting Schedule', href: '#', disabled: true },
    { id: 'callsheet', label: 'Call Sheet', href: '#', disabled: true },
  ];

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-4 bg-white border-b border-[#E5E7EB] z-30">
      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <Link href={`/projects/${projectSlug}`} className="p-1.5 -ml-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <span className="text-[#191b23] text-sm font-semibold tracking-tight">Scenoo Workspace</span>
      </div>

      {/* Center: Tabs */}
      <nav className="flex h-full gap-8">
        {NAV_TABS.map((tab) => {
          if (tab.disabled) {
            return (
              <div
                key={tab.id}
                title="Coming Soon"
                className="text-sm font-medium flex items-center gap-1.5 h-full border-b-2 border-transparent text-[#424754] opacity-60 cursor-not-allowed select-none"
              >
                {tab.label}
                <span className="material-symbols-outlined text-[14px]">lock</span>
              </div>
            );
          }
          const isActive = currentModule === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`text-sm font-medium flex items-center h-full border-b-2 transition-colors ${
                isActive
                  ? 'text-[#0058be] border-[#0058be]'
                  : 'text-[#424754] border-transparent hover:text-[#191b23]'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.push('/settings')} className="flex items-center justify-center bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] p-2 rounded-lg transition-colors cursor-pointer shrink-0">
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
        <button onClick={handleShareClick} className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
        </button>
        <button onClick={handleExportClick} className="flex items-center justify-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] border border-[#3B82F6] text-white text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">download</span> Export
        </button>
      </div>
    </header>
  );
}
