# Helios Protocol — Export Layer Audit Report

**Date:** 2026-05-01 23:12 ICT (UTC+7)  
**Analyst:** Claude Sonnet 4.6  
**Directive:** Diagnostic only — NO source code modifications in this document.

---

## 1. DOM Tree Analysis — Component Mount Order

**File:** `app/(workspace)/workspace/[projectSlug]/[scriptId]/linescript/export/page.tsx`

```
<div className="flex flex-col h-full bg-background text-on-background">   ← Root (no stacking context)
  <ShareScriptModal ... />                                                  ← fixed, z-? (not audited here)
  <ExportUpgradeModal isOpen={...} onClose={...} />                        ← fixed, z-[1]  ← SUBJECT
  <div className="h-14 ... z-30">                                          ← Topbar, z-30
  <div className="flex-1 flex overflow-hidden relative">                    ← Body (relative, NO z-index → no stacking context)
    <div className="flex-1 overflow-auto ...">                             ← Preview scroller
      <LineScriptExportPreview ... />
    </div>
    <LineScriptExportSidebar ... />                                         ← Root: relative z-20  ← OVERLAPPER
  </div>
</div>
```

**Critical observation:** `ExportUpgradeModal` is mounted as a direct child of the root `div` — correct placement for a `fixed`-overlay modal. However, the z-index assigned to its root element is the source of the failure.

---

## 2. ExportUpgradeModal — Z-Index Defect

**File:** `components/linescript/ExportUpgradeModal.tsx`  
**Line 16:**

```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">
```

**Finding:** `z-[1]` compiles to `z-index: 1`. This is **not a syntax error** — it is a valid Tailwind arbitrary value. However, `z-index: 1` is the lowest non-zero integer and sits far below every other stacking layer in this application.

The `position: fixed` on this element does NOT save it from being painted beneath elements with higher z-indexes in the same stacking context, because:

- The root `<div className="flex flex-col h-full ...">` has no `transform`, `opacity`, `filter`, `isolation`, or `position + integer z-index` — it does **not** create a stacking context.
- Therefore all child stacking contexts (modal, topbar, sidebar) compete in the **same root stacking context** (the document root).
- With no isolation boundary, `z-[1]` (1) loses to `z-20` (20) and `z-30` (30).

---

## 3. LineScriptExportSidebar — Z-Index Audit

**File:** `components/linescript/LineScriptExportSidebar.tsx`

```tsx
// Line 26 — Root wrapper
<div className="relative h-full shrink-0 z-20">

  // Line 27-34 — Toggle button
  <button className="absolute right-full top-4 z-10 ...">

  // Line 35-61 — Aside panel (no explicit z-index)
  <aside className={`bg-surface-container-lowest border-l ... `}>
```

**Finding:**

| Element | CSS class | Computed z-index | Stacking context? |
|---|---|---|---|
| Root `<div>` | `relative z-20` | **20** | ✅ Yes — `position: relative` + `z-index: 20` |
| Toggle `<button>` | `absolute z-10` | 10 (within sidebar ctx) | — |
| `<aside>` | *(none)* | inherits from sidebar ctx | — |

The sidebar's root `div` creates its own stacking context at z-index **20**. This is 20x higher than the modal's z-index of **1**. The sidebar — including its toggle button that protrudes into the preview area — fully paints on top of the modal overlay and modal card.

---

## 4. Root Cause Summary

```
Stacking Order (highest wins, same root stacking context):

z-30  ←  Topbar div
z-20  ←  LineScriptExportSidebar root div  ← PAINTS ON TOP OF MODAL
z-[1] ←  ExportUpgradeModal fixed overlay  ← BURIED UNDER SIDEBAR
```

The bug is **not** a stacking context isolation failure. It is a straightforward integer comparison:

> `z-index: 1` < `z-index: 20` → sidebar paints over modal.

The fix requires only one targeted change: raise `ExportUpgradeModal`'s overlay z-index above all competitors in the document.

---

## 5. Established Z-Index Hierarchy (Project Standard)

From audit of `reports/done/0426-report-repomix.md` session history:

| Layer | Token / Class | z-index |
|---|---|---|
| Sticky / Topbar | `z-30` | 30 |
| Dropdown backdrop | `z-40` | 40 |
| Dropdown menu / card buttons | `z-50` | 50 |
| Share modals (project-level) | `z-[200]` | 200 |
| Import Script modal | `z-[100]` (then raised) | 100 → 200 |

**Standard:** All full-screen dimmer modals use `z-[200]` per `0426_2152_report_fix-modal-zindex.md` (the definitive z-index fix session). The task spec cites `z-[2]` as the original spec value, but project history shows this was an error that caused the same overlap bug in `ShareScriptModal` and `ShareProjectModal` — both were subsequently raised to `z-[200]`.

---

## 6. Targeted Replacement Blocks

### Fix A — ExportUpgradeModal overlay (REQUIRED)

**File:** `components/linescript/ExportUpgradeModal.tsx`  
**Line 16**

```tsx
// BEFORE (broken)
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1] flex items-center justify-center p-4">

// AFTER (fixed)
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
```

**Rationale:** `z-[200]` matches the established project-wide modal standard and sits above the topbar (`z-30`), dropdown backdrop (`z-40`), dropdown menus (`z-50`), and the sidebar root (`z-20`). No other component in the application currently exceeds `z-[200]`.

---

### Fix B — ShareScriptModal audit (DEFENSIVE)

The export page also mounts `<ShareScriptModal>`. Confirm its overlay uses `z-[200]` by checking `components/projects/ShareScriptModal.tsx` line 45. If it still uses `z-[1]` or `z-50`, apply the same fix. (Per `0426_2152` this should already be `z-[200]`.)

---

### Optional — Sidebar z-index verification

The sidebar's `z-20` is correct for its role (it must sit above the scrollable preview content). No change needed. The fix is exclusively on the modal side.

---

## 7. Verification Checklist (Post-Fix)

After applying Fix A:

- [ ] Click "Export" button in topbar → modal overlay covers full viewport including sidebar
- [ ] Sidebar toggle button (protrudes left of sidebar) is NOT visible through the overlay
- [ ] "Upgrade Plan" and "Export with Watermark" buttons are fully clickable — not blocked by sidebar
- [ ] Clicking the overlay background (outside modal card) closes the modal
- [ ] Topbar is covered by the overlay (topbar is `z-30`, modal is now `z-[200]`)
- [ ] No visual regressions on pages that do not use `ExportUpgradeModal`

---

## 8. Recommendation

Apply **Fix A only**. One-line change. No architectural restructuring needed. The stacking context hierarchy is otherwise sound — the sidebar at `z-20` and topbar at `z-30` are appropriate values for their roles. Only the modal's `z-[1]` is misassigned.
