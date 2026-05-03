<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to refine the Sidebar toggle UI to match the AppSidebar behavior, restore the wrapper box for the vertical TagToolbar, and reorder the WorkspaceHeader actions.
    CRITICAL: Use TARGETED REPLACEMENTS. Pay extreme attention to the w-16 collapsed states and conditional rendering.
  </role>

  <task>
    **Step 1: WorkspaceHeader Reorder**
    - File: `components/layout/WorkspaceHeader.tsx`
    - Reorder the right-side actions to exactly: [Settings] -> [Share] -> [Export].
    
    Locate the `div` containing the right-side actions and replace it with:
    ```tsx
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
    ```

    **Step 2: TagToolbar Wrapper Fix**
    - File: `components/breakdown/TagToolbar.tsx`
    - The vertical tag buttons list is currently missing its background wrapper box.

    Locate the expanded state return block and wrap the mapped buttons inside a styling box:
    ```tsx
        {!isCollapsed && (
          <div ref={toolbarRef} className="flex flex-col items-end gap-2 mb-4 animate-in slide-in-from-bottom-2 relative">
            {selectedTagForQty && (
              <div className="absolute right-full mr-4 bg-white shadow-2xl border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-2">
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
    ```

    **Step 3: Breakdown Left Sidebar (BreakdownSceneList) Toggle UI**
    - File: `components/breakdown/BreakdownSceneList.tsx`
    - Remove any floating absolute toggle buttons.
    - Rewrite the `<aside>` to match AppSidebar behavior.

    Replace the entire return block with:
    ```tsx
      return (
        <div className="relative h-full shrink-0 z-20">
          <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64 border-r' : 'w-16 border-r overflow-hidden'}`}>
            <div className={`h-14 flex items-center shrink-0 border-b border-outline-variant ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
              {isOpen && <span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Scene List</span>}
              <button onClick={onToggle} className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer shrink-0">
                <span className="material-symbols-outlined text-[20px]">{isOpen ? 'chevron_left' : 'menu'}</span>
              </button>
            </div>
            {isOpen && (
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {scenes.map((scene) => {
                  const isActive = scene.id === activeSceneId;
                  return (
                    <button key={scene.id} onClick={() => onSceneSelect(scene.id)} className={`w-full text-left p-3 rounded-lg transition-colors border cursor-pointer ${ isActive ? 'bg-primary-fixed/10 border-primary/20' : 'border-transparent hover:bg-surface-container' }`} >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-label-sm font-bold ${ isActive ? 'text-primary' : 'text-secondary' }`} > SCENE {String(scene.number).padStart(2, '0')} </span>
                        <span className="text-[10px] uppercase font-bold text-outline"> {scene.intExt}. {scene.dayNight} </span>
                      </div>
                      <div className={`text-body-md truncate ${ isActive ? 'text-on-surface font-medium' : 'text-on-surface-variant' }`} > {scene.location} </div>
                    </button>
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      );
    ```

    **Step 4: Breakdown Right Sidebar (BreakdownSidebar) Toggle UI**
    - File: `components/breakdown/BreakdownSidebar.tsx`
    - Rewrite the `<aside>` to match AppSidebar behavior.

    Replace the entire return block with:
    ```tsx
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
    ```

    **Step 5: Line Script Right Sidebar Toggle UI**
    - File: `components/linescript/LineScriptRightSidebar.tsx`
    - Rewrite the `<aside>` to match AppSidebar behavior.

    Replace the entire return block with:
    ```tsx
      return (
        <div className="relative h-full shrink-0 z-20">
          <aside className={`bg-surface-container-lowest border-outline-variant flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-80 border-l' : 'w-16 border-l overflow-hidden'}`}>
            <div className={`h-14 flex items-center shrink-0 border-b border-outline-variant ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
              {isOpen && <span className="text-label-md font-bold text-on-surface uppercase tracking-wider">Shot Details</span>}
              <button onClick={onToggle} className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer shrink-0">
                <span className="material-symbols-outlined text-[20px]">{isOpen ? 'chevron_right' : 'menu'}</span>
              </button>
            </div>

            {isOpen && (
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot #</label>
                  <input type="text" defaultValue="1" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Size</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {SHOT_SIZE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Shot Type</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {SHOT_TYPE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Angle</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {ANGLE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Movement</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                      {MOVEMENT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Lens</label>
                  <input type="text" placeholder="e.g. 35mm" className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Description</label>
                  <textarea rows={3} placeholder="Describe the action..." className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
                </div>

                <div>
                  <label className="block text-label-sm text-on-surface-variant mb-1.5 uppercase tracking-wider font-bold">Note</label>
                  <textarea rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 bg-[#F9FAFB] border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none custom-scrollbar" />
                </div>
              </div>
            )}
          </aside>
        </div>
      );
    ```
  </task>
</system_prompt>