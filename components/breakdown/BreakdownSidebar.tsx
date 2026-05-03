"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { TaggedElement } from '@/types/breakdown';
import { TAG_CATEGORIES } from '@/types/breakdown';
import CategoryGroup from './CategoryGroup';
import ShareScriptModal from '@/components/projects/ShareScriptModal';
import type { ScriptVersion } from '@/types/project';

interface Props {
  activeSceneId: string;
  taggedElements: TaggedElement[];
  onRemoveTag: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  productionNote: string;
  onProductionNoteChange: (note: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function BreakdownSidebar({
  activeSceneId,
  taggedElements,
  onRemoveTag,
  onUpdateQuantity,
  productionNote,
  onProductionNoteChange,
  isOpen,
  onToggle,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsShareModalOpen(true);
    window.addEventListener('openShareModal', handler);
    return () => window.removeEventListener('openShareModal', handler);
  }, []);

  // Mock script for UI phase
  const MOCK_SCRIPT: ScriptVersion = {
    id: (params.scriptId as string) || "v1",
    label: "Current Draft",
    description: "Active script version in workspace.",
    modifiedDate: "Today",
    pageCount: 120,
    status: "Draft",
    author: { name: "Tri Pham", avatar: "https://i.pravatar.cc/100?u=member1" },
    generalAccess: "Just Crew"
  };

  return (
    <div className="relative h-full shrink-0 z-20">
      <ShareScriptModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} script={MOCK_SCRIPT} canManage={true} />

      <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-16 border-l overflow-hidden'}`}>
        <div className={`h-14 flex items-center shrink-0 border-b border-outline-variant ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
          {isOpen && <span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Breakdown</span>}
          <button onClick={onToggle} className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer shrink-0">
            <span className="material-symbols-outlined text-[20px]">{isOpen ? 'chevron_right' : 'menu'}</span>
          </button>
        </div>

        {isOpen && (
          <>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {TAG_CATEGORIES.map((category) => (
                <CategoryGroup key={category} category={category} elements={taggedElements.filter((el) => el.category === category)} onRemove={onRemoveTag} onUpdateQuantity={onUpdateQuantity} />
              ))}
            </div>

            <div className="p-5 bg-primary/5 border-t border-primary/20 shrink-0">
              <label className="flex items-center gap-2 text-label-sm font-bold text-primary uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                Production Note
              </label>
              <textarea value={productionNote} onChange={(e) => onProductionNoteChange(e.target.value)} placeholder="Add any scene-level notes here..." className="w-full bg-white border border-outline-variant rounded-lg p-3 text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" rows={5} />
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
