import AppSidebar from "@/components/dashboard/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export const metadata = { title: "Settings | Scenoo" };

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <AppSidebar defaultExpanded={true} persistKey="sidebar-settings" />
      <main className="flex-1 overflow-hidden flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex overflow-hidden">
          <SettingsSidebar />
          <div className="flex-1 overflow-y-auto p-12 bg-background flex justify-center">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
