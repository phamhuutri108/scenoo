import AppSidebar from "@/components/dashboard/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export const metadata = { title: 'Assets | Scenoo' };

export default function AssetsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} />
      <main className="flex-1 overflow-auto flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[32px] text-primary">video_library</span>
          </div>
          <h1 className="text-display text-on-surface mb-2">Assets Module</h1>
          <p className="text-body-lg text-on-surface-variant max-w-md">
            Manage your production files, moodboards, and reference materials here. Coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
