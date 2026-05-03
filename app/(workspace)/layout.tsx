import WorkspaceHeader from "@/components/layout/WorkspaceHeader";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <WorkspaceHeader />
        {children}
      </main>
    </div>
  );
}
