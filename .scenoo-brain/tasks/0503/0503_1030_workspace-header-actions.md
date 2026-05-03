<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to hoist the Export and Share actions into the global WorkspaceHeader, replacing the notifications/help icons, and clean up redundant buttons from the Breakdown, Shotlist, and Line Script components via a global CustomEvent bus.
  </role>

  <task>
    **Step 1: Refactor `WorkspaceHeader.tsx`**
    - File: `components/layout/WorkspaceHeader.tsx`
    - Import `useRouter` and `useParams` from `next/navigation`.
    - Extract route params inside the component:
      ```tsx
      const params = useParams();
      const router = useRouter();
      const projectSlug = params.projectSlug as string;
      const scriptId = params.scriptId as string;
      const currentModule = params.module as string;
      ```
    - Create the event dispatch handlers:
      ```tsx
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
      ```
    - Locate the right-side controls containing the `notifications` and `help` icon buttons.
    - Delete those two icon buttons and replace them with the standardized outline buttons:
      ```tsx
      <button onClick={handleExportClick} className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">download</span> Export
      </button>
      <button onClick={handleShareClick} className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#191b23] text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
      </button>
      ```

    **Step 2: Clean up Breakdown Module**
    - Search for the inline Export and Share buttons in the Breakdown module (likely inside `components/breakdown/BreakdownSidebar.tsx`).
    - Delete the buttons and their wrapper div completely.
    - In the component that owns the `isShareModalOpen` state (likely `BreakdownSidebar.tsx`), import `useEffect` and add an event listener to open the modal:
      ```tsx
      useEffect(() => {
        const handler = () => setIsShareModalOpen(true);
        window.addEventListener('openShareModal', handler);
        return () => window.removeEventListener('openShareModal', handler);
      }, []);
      ```

    **Step 3: Clean up Line Script Module**
    - Search for the inline Export and Share buttons in the Line Script module (likely in `components/linescript/LineScriptContainer.tsx` at the end of the topbar, or in `LineScriptRightSidebar.tsx`).
    - Delete the buttons and their `w-80` wrapper completely.
    - In the component that owns the `isShareModalOpen` state, add the identical `useEffect` listener for `openShareModal` to trigger `setIsShareModalOpen(true)`.

    **Step 4: Clean up Shotlist Module**
    - File: `components/shotlist/ShotlistContainer.tsx`
    - Find and remove any inline Export or Share buttons in the Toolbar.
    - Add a `useEffect` that listens to BOTH events:
      ```tsx
      useEffect(() => {
        const handleShare = () => setIsShareModalOpen(true);
        const handleExport = () => setIsExportMenuOpen(true);
        window.addEventListener('openShareModal', handleShare);
        window.addEventListener('openExportModal', handleExport);
        return () => {
          window.removeEventListener('openShareModal', handleShare);
          window.removeEventListener('openExportModal', handleExport);
        };
      }, []);
      ```
  </task>

  <constraints>
    - Ensure you strictly remove the old visual buttons so they don't appear duplicated on the screen.
    - Keep the existing `<ShareScriptModal>` and `<ExportUpgradeModal>` components intact where they are currently mounted.
  </constraints>
</system_prompt>