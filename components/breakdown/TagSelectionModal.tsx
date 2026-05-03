'use client';

import { useState } from 'react';
import type { TagCategory } from '@/types/breakdown';
import { TAG_CONFIG, TAG_CATEGORIES } from '@/types/breakdown';

interface SubmitPayload {
  text: string;
  category: TagCategory;
  quantity: number;
  tagAllMentions: boolean;
}

interface Props {
  x?: number;
  y?: number;
  onClose: () => void;
  onSubmit: (payload: SubmitPayload) => void;
}

export default function TagSelectionModal({ x, y, onClose, onSubmit }: Props) {
  const [elementName, setElementName] = useState('');
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TagCategory | null>(null);
  const [tagAllMentions, setTagAllMentions] = useState(false);

  const filteredCategories = TAG_CATEGORIES.filter((cat) =>
    TAG_CONFIG[cat].label.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit() {
    if (!elementName.trim() || !selectedCategory) return;
    onSubmit({
      text: elementName.trim(),
      category: selectedCategory,
      quantity: qty,
      tagAllMentions,
    });
  }

  const positionStyle: React.CSSProperties =
    x !== undefined && y !== undefined
      ? { position: 'fixed', top: y, left: x, transform: 'translate(-50%, -110%)' }
      : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        style={positionStyle}
        className="z-[201] w-72 bg-white border border-[#E5E7EB] rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E5E7EB]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#191b23]">
            Tag Element
          </span>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#191b23] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Top: Name + Qty */}
        <div className="px-3 pt-3 pb-2 flex gap-2">
          <input
            type="text"
            value={elementName}
            onChange={(e) => setElementName(e.target.value)}
            placeholder="Element name…"
            className="flex-1 h-9 px-2.5 text-[13px] text-[#191b23] placeholder:text-[#9CA3AF] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#3B82F6] transition-colors"
            autoFocus
          />
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 h-9 text-center text-[13px] font-semibold text-[#191b23] bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#3B82F6] transition-colors"
            aria-label="Quantity"
          />
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 h-8 px-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
            <span className="material-symbols-outlined text-[14px] text-[#9CA3AF]">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category…"
              className="flex-1 bg-transparent text-[12px] text-[#191b23] placeholder:text-[#9CA3AF] outline-none"
            />
          </div>
        </div>

        {/* Category list */}
        <ul className="max-h-44 overflow-y-auto border-t border-[#E5E7EB]">
          {filteredCategories.map((cat) => {
            const cfg = TAG_CONFIG[cat];
            const isSelected = selectedCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#EFF6FF]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  {/* Color dot */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cfg.textColor }}
                  />
                  <span
                    className="text-[13px] font-medium flex-1"
                    style={{ color: isSelected ? cfg.textColor : '#191b23' }}
                  >
                    {cfg.label}
                  </span>
                  {isSelected && (
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ color: cfg.textColor }}
                    >
                      check
                    </span>
                  )}
                </button>
              </li>
            );
          })}
          {filteredCategories.length === 0 && (
            <li className="px-3 py-3 text-[12px] text-[#9CA3AF] text-center">No results</li>
          )}
        </ul>

        {/* Footer */}
        <div className="px-3 py-2.5 border-t border-[#E5E7EB] space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={tagAllMentions}
              onChange={(e) => setTagAllMentions(e.target.checked)}
              className="w-3.5 h-3.5 rounded accent-[#3B82F6] cursor-pointer"
            />
            <span className="text-[12px] text-[#424754]">Tag all mentions in script</span>
          </label>
          <button
            onClick={handleSubmit}
            disabled={!elementName.trim() || !selectedCategory}
            className="w-full h-8 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed text-white text-[12px] font-bold rounded-lg transition-colors cursor-pointer"
          >
            Add Element
          </button>
        </div>
      </div>
    </>
  );
}
