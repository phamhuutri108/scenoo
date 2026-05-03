'use client';

import { useEffect, useRef, useState } from 'react';
import type { TagCategory } from '@/types/breakdown';
import { TAG_CONFIG, TAG_CATEGORIES } from '@/types/breakdown';

const HOVER_BG: Record<TagCategory, string> = {
  cast:                'hover:bg-red-50',
  extras:              'hover:bg-yellow-50',
  props:               'hover:bg-violet-50',
  'set-dressing':      'hover:bg-orange-50',
  wardrobe:            'hover:bg-cyan-50',
  'makeup-hair':       'hover:bg-orange-50',
  'vehicle-animals':   'hover:bg-pink-50',
  'special-effects':   'hover:bg-blue-50',
  'sound-music':       'hover:bg-teal-50',
  'special-equipment': 'hover:bg-green-50',
  custom:              'hover:bg-gray-50',
};

const SHORT_LABEL: Record<TagCategory, string> = {
  cast:                'Cast',
  extras:              'Extras',
  props:               'Props',
  'set-dressing':      'Set Dec',
  wardrobe:            'Wardrobe',
  'makeup-hair':       'MU/Hair',
  'vehicle-animals':   'Vehicles',
  'special-effects':   'SFX',
  'sound-music':       'Sound',
  'special-equipment': 'S.Equip',
  custom:              '+ Add',
};

interface Props {
  onTagSelect: (category: TagCategory, quantity: number) => void;
}

export default function TagToolbar({ onTagSelect }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTagForQty, setSelectedTagForQty] = useState<TagCategory | null>(null);
  const [qty, setQty] = useState(1);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedTagForQty) return;
    function handleOutsideClick(e: MouseEvent) {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setSelectedTagForQty(null);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [selectedTagForQty]);

  function handleTagButtonClick(category: TagCategory) {
    if (selectedTagForQty === category) {
      setSelectedTagForQty(null);
    } else {
      setSelectedTagForQty(category);
      setQty(1);
    }
  }

  function handleApply(category: TagCategory) {
    onTagSelect(category, qty);
    setSelectedTagForQty(null);
    setQty(1);
  }

  return (
    <div className="absolute bottom-20 left-[280px] z-[1] flex flex-col items-start transition-all duration-300">
      {!isCollapsed && (
        <div ref={toolbarRef} className="flex flex-col items-start gap-2 mb-4 animate-in slide-in-from-bottom-2 relative">
          {selectedTagForQty && (
            <div className="absolute left-full ml-4 bg-white shadow-2xl border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-[#424754] shrink-0">Qty</span>
              <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 h-8 text-center text-[13px] font-semibold border border-[#E5E7EB] rounded-lg outline-none focus:border-[#3B82F6] transition-colors" autoFocus />
              <button onClick={() => handleApply(selectedTagForQty)} className="h-8 w-8 flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg transition-colors cursor-pointer shrink-0">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </button>
            </div>
          )}
            {/* UI Wrapper Box for Tags */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-[#E5E7EB] flex flex-col gap-1.5">
              {TAG_CATEGORIES.map((category) => {
                const cfg = TAG_CONFIG[category];
                const isSelected = selectedTagForQty === category;
                return (
                  <button key={category} onClick={() => handleTagButtonClick(category)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all cursor-pointer ${HOVER_BG[category]} ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}`} style={{ backgroundColor: cfg.bgColor, borderColor: cfg.borderColor }}>
                    <span className="material-symbols-outlined text-[16px]" style={{ color: cfg.textColor, fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cfg.textColor }}>{SHORT_LABEL[category]}</span>
                  </button>
                );
              })}
            </div>
        </div>
      )}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-14 h-14 bg-white border border-[#E5E7EB] shadow-2xl rounded-full flex items-center justify-center hover:bg-[#F9FAFB] transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-[24px] text-[#3B82F6]">
          {isCollapsed ? 'sell' : 'close'}
        </span>
      </button>
    </div>
  );
}
