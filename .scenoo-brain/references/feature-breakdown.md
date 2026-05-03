<feature_reference name="script_breakdown">
  <core_concept>
    <definition>A tagging tool (inspired by StudioBinder) used to identify and categorize script elements (Cast, Props, Wardrobe, etc.) for pre-production scheduling and budgeting.</definition>
    <purpose>Highlights text with specific industry-standard colors. These tagged elements populate the Breakdown Sheet and aid the system's auto-detection logic in the Shotlist.</purpose>
  </core_concept>

  <ui_ux_flow>
    <tagging_action>
      1. User highlights a portion of the script text (using mouse drag or Apple Pencil).
      2. A pop-up menu (Tag Selection) immediately appears near the cursor.
      3. User selects a breakdown category from the menu.
      4. The selected text changes its text color to match the chosen category.
      5. Hovering over a tagged element displays a tooltip with its category and details.
      6. Clicking a tagged element allows the user to edit or remove the tag.
    </tagging_action>
    <layout_structure>
      - Left Sidebar: Scene List navigation.
      - Center: Script Viewer (where highlighting occurs).
      - Right Panel/Bottom Bar: Tag Selection toolbar and summarized list of tagged elements for the current scene.
    </layout_structure>
  </ui_ux_flow>

  <element_categories>
    <category name="Cast" text_color="#8B0000" background="#FFE5E5" border="#FF0000" />
    <category name="Stunts" text_color="#7A3900" background="#FFEAD0" border="#FF8C00" />
    <category name="Extras (Atmosphere)" text_color="#1A5C1A" background="#D6F0D6" border="#228B22" />
    <category name="Extras (Silent)" text_color="#665900" background="#FFFACC" border="#D4B800" />
    <category name="Special Effects (SFX)" text_color="#003D8F" background="#CCE5FF" border="#0066CC" />
    <category name="Props" text_color="#4B0080" background="#ECD6FF" border="#8B00FF" />
    <category name="Vehicles" text_color="#7A0040" background="#FFD6EC" border="#FF69B4" />
    <category name="Wardrobe" text_color="#003D5C" background="#D6F4FF" border="#00BFFF" />
    <category name="Makeup/Hair" text_color="#7A3000" background="#FFE8D6" border="#FF6600" />
    <category name="Sound" text_color="#4A1F00" background="#EDD8C8" border="#8B4513" />
    <category name="Equipment" text_color="#5C4000" background="#F5ECC8" border="#C8950A" />
    <category name="Notes" text_color="#333333" background="#ECECEC" border="#888888" />
    <rule>These colors MUST follow the international industry standards listed above and cannot be changed by the user.</rule>
  </element_categories>

  <breakdown_sheet_generation>
    <definition>A summary report generated based on the tagged elements. It MUST support two distinct view modes and flexible export options.</definition>
    
    <view_modes>
      <view_1 name="Single Scene View">
        <behavior>Displays the breakdown data for only one scene at a time.</behavior>
        <navigation>Must include 'Next' and 'Back' buttons to cycle through scenes, plus a dropdown/selector to jump directly to a specific scene.</navigation>
      </view_1>
      
      <view_2 name="All Scenes View (Master Table)">
        <behavior>An Excel-like spreadsheet view compiling all scenes into a single table.</behavior>
        <layout>
          - Rows: Individual scenes (one scene per row).
          - Columns (Horizontal): All breakdown fields and categories.
        </layout>
      </view_2>
    </view_modes>

    <data_fields>
      <global_fields>
        <rule>Global State Binding: These fields apply to the entire project. When a user fills them in any scene (Single Scene View), the data is persisted globally and auto-filled for all other scenes. Any edit to these fields updates all scenes simultaneously.</rule>
        - Project Title
        - Production Company
        - Date
      </global_fields>
      <scene_specific_fields>
        <auto_filled>
          - Scene #
          - Script Page
          - Location Name
          - Tagged Elements (sorted by category)
        </auto_filled>
        <manual>
          - Page Count (1/8s measurement)
          - Breakdown Sheet #
          - Scene Name
          - INT/EXT
          - Day/Night
          - Description
        </manual>
      </scene_specific_fields>
    </data_fields>

    <export_options>
      <single_scene_exports>
        - Export current individual scene.
        - Export a continuous range of scenes (e.g., from Scene 1 to Scene 5).
        - Export multiple specifically selected scenes at once (e.g., Scene 1, Scene 3, Scene 7).
      </single_scene_exports>
      <master_table_exports>
        - A single "Export All" option that outputs the entire Master Table containing every scene.
      </master_table_exports>
    </export_options>
  </breakdown_sheet_generation>
</feature_reference>