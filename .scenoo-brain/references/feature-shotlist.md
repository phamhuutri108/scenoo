<feature_reference name="shotlist_table">
  <core_concept>
    <definition>A spreadsheet-like interface that automatically maps drawn line_scripts and detected script text into a tabular format.</definition>
    <sync_logic>Strict two-way binding between the Canvas line scripts and the Shotlist table. Updating a cell in the table (e.g., Shot#) instantly updates the corresponding Box Label on the Canvas, and vice versa.</sync_logic>
  </core_concept>

  <table_structure>
    <frozen_elements>
      - 4 top rows frozen (metadata, project title, 2-tier headers).
      - First column (row index) frozen for horizontal scrolling.
    </frozen_elements>
    <columns>
      1. # (Order Index, Auto-increments from 1)
      2. SCENE # (Auto-detected from scene heading)
      3. LOCATION (Auto-detected from scene heading)
      4. SHOT # (Auto-increments within scene, editable: 1.1, 1.2a, etc.)
      5. INT/EXT (Auto-detected)
      6. D/N (Auto-detected: Day/Night/Morning/etc.)
      7. Storyboard (Image URL/Blob)
      8. DESCRIPTION (Manual text)
      9. DIALOGUE (Auto-detected format: CHARACTER (emotion) Text)
      10. SUBJECTS (Manual text: Characters/Objects)
      11. SCRIPT TIME (Manual: MM:SS)
      12. SHOT SIZE (Enum / Custom)
      13. SHOT TYPE (Enum / Custom)
      14. SIDE (Enum / L/R)
      15. ANGLE (Enum / Custom)
      16. MOVEMENT (Enum / Custom)
      17. LENS (Manual number/text)
      18. NOTE (Manual text)
    </columns>
  </table_structure>

  <auto_detect_rules>
    <scene_heading>
      Format: `[Scene#]. [INT/EXT]. [LOCATION] - [D/N]`
      Example: `1A. INT. COFFEE SHOP - DAY` -> SC#=1A, INT/EXT=INT, LOC=COFFEE SHOP, D/N=DAY.
    </scene_heading>
    <dialogue_extraction>
      Identifies character names (uppercase) and dialogue text within the shot. Handles dual dialogue scenarios (two characters speaking simultaneously side-by-side).
    </dialogue_extraction>
  </auto_detect_rules>

  <interaction_logic>
    - Navigation: Clicking a row or shot in the Shotlist automatically scrolls the PDF Canvas to the exact location of that line script.
    - Lifecycle: Deleting a row deletes the line on the Canvas. Deleting the line deletes the row in the table.
  </interaction_logic>
</feature_reference>