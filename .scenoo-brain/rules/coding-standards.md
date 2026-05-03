<coding_standards>
  <architecture_pattern>
    <concept>Repository / Adapter Pattern</concept>
    <rule>
      UI components MUST NOT directly call browser APIs like `window.indexedDB` or `localStorage`. 
      All database interactions must be routed through a dedicated `DatabaseAdapter` interface. 
      Currently, implement `IndexedDBAdapter`. This ensures that when migrating to a Native App (iPadOS/macOS), we only need to write a `SQLiteAdapter` without changing a single line of React UI code.
    </rule>
  </architecture_pattern>

  <component_structure>
    <rule>Separate Container components (handling logic, state, and Adapter calls) from Presentational components (rendering UI based on Design Tokens).</rule>
    <rule>Keep files under 300 lines. If a component grows larger, extract sub-components.</rule>
  </component_structure>

  <canvas_and_gesture_handling>
    <target>Fabric.js Canvas Overlay for Line Scripting</target>
    <rule>
      To prevent gesture conflicts on iPadOS/Android (e.g., swipe to go back, scroll to refresh), the Canvas container MUST implement strict CSS and Event constraints:
      - CSS: `touch-action: none; overscroll-behavior: none;`
      - JS: Call `e.preventDefault()` on native touch events (`touchstart`, `touchmove`) when the user is interacting with Fabric.js elements.
    </rule>
    <rule>
      Differentiate between touch (canvas navigation/panning) and Apple Pencil (drawing lines). Use pointer events (`pointerdown`) and check `e.pointerType === 'pen'` to trigger drawing modes if applicable.
    </rule>
  </canvas_and_gesture_handling>

  <data_sync_flow>
    <rule>On every user action, immediately update the local React state (Optimistic UI) and persist the data to IndexedDB for zero latency.</rule>
    <rule>Every mutation MUST generate a delta update and be pushed to a local Sync Queue. A background process automatically syncs this queue to Cloudflare D1/R2 when online.</rule>
    <rule>DO NOT require users to click a manual "Save" or "Sync" button. If offline, deltas remain safely queued in IndexedDB until connection is restored.</rule>
  </data_sync_flow>
</coding_standards>