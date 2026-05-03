'use client';

import { useState } from 'react';
import type { ActiveTool } from '@/types/linescript';

interface Props {
  activeTool: ActiveTool;
  onToolChange: (tool: ActiveTool) => void;
}

const LINING_OPTIONS: { id: 'line-straight' | 'line-zigzag'; label: string; icon: string }[] = [
  { id: 'line-straight', label: 'Straight', icon: 'horizontal_rule' },
  { id: 'line-zigzag', label: 'Zigzag', icon: 'drag_handle' },
];

const COLOR_DOTS = ['bg-blue-500', 'bg-red-500', 'bg-yellow-400', 'bg-green-500', 'bg-black'];

export default function LineScriptLeftSidebar({ activeTool, onToolChange }: Props) {
  const [showLiningMenu, setShowLiningMenu] = useState(false);

  const isLiningActive = activeTool === 'line-straight' || activeTool === 'line-zigzag';

  function handleToolClick(tool: NonNullable<ActiveTool>) {
    onToolChange(activeTool === tool ? null : tool);
  }

  function handleLiningSelect(type: 'line-straight' | 'line-zigzag') {
    onToolChange(type);
    setShowLiningMenu(false);
  }

  return (
    <aside className="bg-surface-container-lowest border-r border-outline-variant shrink-0 flex flex-col w-16">
      <>
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-3 items-center custom-scrollbar w-full">
              {/* Scene Break */}
              <button
                title="Scene Break"
                onClick={() => handleToolClick('scene-break')}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                  activeTool === 'scene-break'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-secondary hover:bg-surface-container hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg">horizontal_rule</span>
              </button>

              {/* Lining */}
              <div className="w-full flex flex-col items-center gap-1">
                <button
                  title="Lining"
                  onClick={() => setShowLiningMenu((v) => !v)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                    isLiningActive
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-secondary hover:bg-surface-container hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">linear_scale</span>
                </button>

                {showLiningMenu && (
                  <div className="w-full bg-surface-container border border-surface-variant rounded-lg p-1 flex flex-col gap-1">
                    {LINING_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleLiningSelect(opt.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-label-sm transition-colors text-left cursor-pointer w-full ${
                          activeTool === opt.id
                            ? 'bg-primary-container text-on-primary-container'
                            : 'text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Split */}
              <button
                title="Split"
                onClick={() => handleToolClick('split')}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                  activeTool === 'split'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-secondary hover:bg-surface-container hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg">align_vertical_center</span>
              </button>

              {/* Textbox (annotation) */}
              <button
                title="Textbox"
                onClick={() => handleToolClick('annotation')}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                  activeTool === 'annotation'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-secondary hover:bg-surface-container hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-lg">text_format</span>
              </button>

              {/* Shapes — Pure UI placeholder */}
              <button
                title="Shapes"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer text-secondary hover:bg-surface-container hover:text-primary"
              >
                <span className="material-symbols-outlined text-lg">category</span>
              </button>

              {/* Image — Pure UI placeholder */}
              <button
                title="Image"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer text-secondary hover:bg-surface-container hover:text-primary"
              >
                <span className="material-symbols-outlined text-lg">image</span>
              </button>

              {/* More — Pure UI placeholder */}
              <button
                title="More"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer text-secondary hover:bg-surface-container hover:text-primary"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
              </button>

              {/* Color Picker */}
              <div className="w-full h-px bg-outline-variant my-2" />
              <div className="flex flex-wrap gap-2 justify-center">
                {COLOR_DOTS.map((color) => (
                  <div key={color} className={`w-4 h-4 rounded-full cursor-pointer ${color}`} />
                ))}
              </div>

              <div className="w-full h-px bg-outline-variant my-2" />

              {/* Trash */}
              <button
                title="Clear / Trash"
                onClick={() => handleToolClick('trash')}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                  activeTool === 'trash'
                    ? 'bg-error-container text-on-error-container'
                    : 'text-error hover:bg-error-container'
                }`}
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
      </>
    </aside>
  );
}
