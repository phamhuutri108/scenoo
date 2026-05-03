<system_prompt>
  <role>
    You are a Senior Frontend Architect. Your task is to update the core database and coding standard rules in `.scenoo-brain` to adopt a Figma-style Local-First architecture, replacing manual sync with background queue sync and Property-level LWW.
    CRITICAL: Use TARGETED REPLACEMENTS.
  </role>

  <task>
    Execute Documentation Update: Modernize Sync Architecture.

    **Step 1: Update `coding-standards.md`**
    - File: `.scenoo-brain/rules/coding-standards.md`
    - Replace the existing `<data_sync_flow>` block with the new automatic background sync approach.

    Locate this exact block:
    ```xml
    <data_sync_flow> <rule>On every successful user action (e.g., drawing a line, updating a Shotlist cell), immediately update the local React state (for zero latency) AND fire an async call to the DatabaseAdapter to persist the data locally.</rule> <rule>DO NOT fire API calls to Cloudflare D1/R2 during active editing. Cloudflare sync is strictly a manual "Backup" action triggered by the user.</rule> </data_sync_flow>
    ```

    Replace with:
    ```xml
    <data_sync_flow> <rule>On every user action, immediately update the local React state (Optimistic UI) and persist the data to IndexedDB for zero latency.</rule> <rule>Every mutation MUST generate a delta update and be pushed to a local Sync Queue. A background process automatically syncs this queue to Cloudflare D1/R2 when online.</rule> <rule>DO NOT require users to click a manual "Save" or "Sync" button. If offline, deltas remain safely queued in IndexedDB until connection is restored.</rule> </data_sync_flow>
    ```

    **Step 2: Update `db-schema.md`**
    - File: `.scenoo-brain/rules/db-schema.md`
    - Update the `<cloudflare_sync>` block and inject a new `<conflict_resolution>` block.

    Locate this exact block:
    ```xml
    <cloudflare_sync> <role>Strictly for manual one-way backup, Authentication, and Payments.</role> <sync_flow>IndexedDB (Local) -> Cloudflare D1/R2 (Remote).</sync_flow> <constraint>DO NOT implement real-time WebSockets. DO NOT execute read queries from Cloudflare on every React render.</constraint> </cloudflare_sync>
    ```

    Replace with:
    ```xml
    <cloudflare_sync> <role>Acts as the central authoritative backup and collaborative hub, along with Authentication and Payments.</role> <sync_flow>Local IndexedDB Queue -> Background Delta Sync -> Cloudflare D1/R2.</sync_flow> <constraint>Avoid heavy full-document syncs. Sync ONLY delta property changes via a background queue. Cloudflare D1 is the final arbiter for ordering.</constraint> </cloudflare_sync> <conflict_resolution> <strategy>Property-Level Last-Writer-Wins (LWW)</strategy> <rule>Do NOT use complex OT or pure CRDTs for design elements. Conflicts are resolved at the finest granularity (e.g., modifying "shot size" vs "lens"). If two users modify the exact same property simultaneously, the server's arrival timestamp determines the winner.</rule> </conflict_resolution>
    ```
  </task>
</system_prompt>