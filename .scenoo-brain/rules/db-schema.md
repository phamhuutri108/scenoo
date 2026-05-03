<database_architecture>
  <core_concept>
    Strict Local-First approach using IndexedDB for all heavy operations (Canvas rendering, 18-column Shotlist manipulation). 
    Implementation MUST use the Repository/Adapter Pattern to decouple React UI logic from direct database queries. This ensures seamless migration to Native SQLite for future iPadOS/macOS environments without rewriting UI components.
  </core_concept>

  <schema>
    <table name="line_scripts">
      <description>Stores drawn lines from the Canvas (Fabric.js) overlaying PDF pages.</description>
      <fields>
        <field name="id" type="string" description="Unique UUID for the line" />
        <field name="pageNumber" type="integer" description="PDF page number" />
        <field name="startY" type="float" description="Y coordinate for top bracket" />
        <field name="endY" type="float" description="Y coordinate for bottom bracket" />
        <field name="shotName" type="string" description="Format: Scene#/Shot# (e.g., 1A/1)" />
        <field name="shotSize" type="enum" description="EWS, WS, FS, MFS, MS, MCU, CU, ECU, Random, [Custom]" />
        <field name="color" type="string" description="Hex code of the line color" />
      </fields>
    </table>

    <table name="shotlist">
      <description>18-column tabular data mapped from line_scripts and auto-detected script text.</description>
      <fields>
        <field name="orderIndex" type="integer" description="#" />
        <field name="sceneNumber" type="string" description="SC#" />
        <field name="location" type="string" description="LOC" />
        <field name="shotNumber" type="string" description="SH#" />
        <field name="intExt" type="enum" description="INT/EXT" />
        <field name="dayNight" type="enum" description="D/N" />
        <field name="storyboard" type="string" description="Image URL/Blob" />
        <field name="description" type="text" description="DESC" />
        <field name="autoDetect" type="text" description="AUTO DETECT (content extracted from straight lines)" />
        <field name="dialogue" type="text" description="DIA" />
        <field name="subjects" type="text" description="SUBJ (Characters/Objects)" />
        <field name="scriptTime" type="string" description="MM:SS" />
        <field name="shotSize" type="enum" description="SIZE" />
        <field name="shotType" type="enum" description="TYPE" />
        <field name="side" type="enum" description="L/R" />
        <field name="angle" type="enum" description="ANG" />
        <field name="movement" type="enum" description="MOV" />
        <field name="lens" type="string" description="LENS" />
        <field name="note" type="text" description="NOTE" />
      </fields>
    </table>
  </schema>

  <cloudflare_sync>
    <role>Acts as the central authoritative backup and collaborative hub, along with Authentication and Payments.</role>
    <sync_flow>Local IndexedDB Queue -> Background Delta Sync -> Cloudflare D1/R2.</sync_flow>
    <constraint>Avoid heavy full-document syncs. Sync ONLY delta property changes via a background queue. Cloudflare D1 is the final arbiter for ordering.</constraint>
  </cloudflare_sync>

  <conflict_resolution>
    <strategy>Property-Level Last-Writer-Wins (LWW)</strategy>
    <rule>Do NOT use complex OT or pure CRDTs for design elements. Conflicts are resolved at the finest granularity (e.g., modifying "shot size" vs "lens"). If two users modify the exact same property simultaneously, the server's arrival timestamp determines the winner.</rule>
  </conflict_resolution>
</database_architecture>