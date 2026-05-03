'use client';

import { useState } from 'react';
import type { TaggedElement, TagCategory } from '@/types/breakdown';
import { TAG_CONFIG } from '@/types/breakdown';

interface Props {
  category: TagCategory;
  elements: TaggedElement[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function CategoryGroup({ category, elements, onRemove, onUpdateQuantity }: Props) {
  const cfg = TAG_CONFIG[category];
  const [isOpen, setIsOpen] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('1');

  const totalQty = elements.reduce((sum, el) => sum + (el.quantity ?? 1), 0);

  function startEdit(el: TaggedElement) {
    setEditingId(el.id);
    setEditValue(String(el.quantity ?? 1));
  }

  function commitEdit(id: string) {
    const parsed = parseInt(editValue, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateQuantity(id, parsed);
    }
    setEditingId(null);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>, id: string) {
    if (e.key === 'Enter') commitEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  }

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ color: cfg.textColor, fontVariationSettings: "'FILL' 1" }}
          >
            {cfg.icon}
          </span>
          <span
            className="text-[11px] font-bold uppercase tracking-wider"
            style={{ color: cfg.textColor }}
          >
            {cfg.label}
            {elements.length > 0 && (
              <span className="ml-1.5 font-semibold opacity-70">({totalQty})</span>
            )}
          </span>
        </div>
        <span
          className="material-symbols-outlined text-[16px] text-[#9CA3AF] transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="border-t border-[#E5E7EB]">
          {elements.length === 0 ? (
            <p className="px-3 py-3 text-[11px] text-[#9CA3AF] text-center">No elements tagged</p>
          ) : (
            <ul>
              {elements.map((el, idx) => (
                <li
                  key={el.id}
                  className="flex items-center justify-between px-3 py-2 gap-2"
                  style={{
                    borderTop: idx > 0 ? '1px solid #F3F4F6' : undefined,
                  }}
                >
                  {/* Element name */}
                  <span className="text-[13px] text-[#191b23] flex-1 min-w-0 truncate">
                    {el.text}
                  </span>

                  {/* Quantity + edit */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {editingId === el.id ? (
                      <input
                        type="number"
                        min={1}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(el.id)}
                        onKeyDown={(e) => handleEditKeyDown(e, el.id)}
                        autoFocus
                        className="w-12 h-6 text-center text-[12px] border border-[#3B82F6] rounded-md outline-none"
                      />
                    ) : (
                      <span
                        className="min-w-[20px] h-6 px-1.5 flex items-center justify-center text-[11px] font-semibold rounded-md"
                        style={{ color: cfg.textColor, backgroundColor: cfg.bgColor }}
                      >
                        {el.quantity ?? 1}
                      </span>
                    )}
                    <button
                      onClick={() => startEdit(el)}
                      className="text-[#9CA3AF] hover:text-[#424754] transition-colors cursor-pointer"
                      aria-label={`Edit quantity for ${el.text}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                    <button
                      onClick={() => onRemove(el.id)}
                      className="text-[#9CA3AF] hover:text-red-500 transition-colors cursor-pointer"
                      aria-label={`Remove ${el.text}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
