<feature_reference name="line_script">
  <core_concept>
    <tech_stack>PDF.js (bottom layer for script rendering) + Fabric.js (transparent top canvas layer for drawing).</tech_stack>
    <definition>
      - `line-straight`: Represents the portion of the script that WILL be shot.
      - `line-zigzag`: Represents the portion of the script that WILL NOT be shot.
    </definition>
  </core_concept>

  <toolbar_layout>
    <order>
      1. Scene Break
      2. Lining (Dropdown with 2 options: `line-straight` and `line-zigzag`)
      3. Split
      4. Annotation
      5. Trash
    </order>
  </toolbar_layout>

  <ui_ux_flow>
    <lining_mode>
      1. User clicks the "Lining" tool. A dropdown MUST appear requiring the user to select either `line-straight` or `line-zigzag`.
      2. User selects color.
      3. User drags vertically on the canvas. The stroke automatically snaps to a perfect vertical line based on the selected type, with brackets at both ends.
      4. Upon release, a "Box Label" appears above the starting bracket.
      5. Box Label format: `Scene#/Shot#` (e.g., `1A/1`). `Shot#` auto-increments for each new line drawn.
      6. Next to the Box Label: Text field containing Shot Size and Movement.
    </lining_mode>
    <customization>
      - Box Label is clickable and editable.
      - Shot Size options (Dropdown): EWS, WS, FS, MFS, MS, MCU, CU, ECU, Random, [Custom].
      - Shot Type options (Dropdown): Observe, Single, Two, Three, Four, Group, OTS, POV, Insert, B-roll, [Custom].
    </customization>
  </ui_ux_flow>

  <split_and_merge_logic>
    <split_mode>
      - Used to exclude parts of a shot.
      - User clicks "Split", then clicks on an existing line.
      - A new bracket is added at the click point. The line splits into two segments: top remains `line-straight`, bottom becomes `line-zigzag`.
      - Clicking again on the bottom segment splits it further (e.g., straight-zigzag-straight).
    </split_mode>
    <merge_logic>
      - If a middle bracket is deleted, the segments merge based on the ending bracket.
      - Rule: If two identical line types become adjacent after deleting a bracket, they auto-merge into a single continuous line.
    </merge_logic>
  </split_and_merge_logic>

  <interaction_logic>
    <brackets>
      - Active state: Dashed circle appears around the bracket.
      - Dragging a bracket vertically resizes ONLY the segments immediately attached to it.
      - Deleting a bracket triggers the merge logic.
    </brackets>
    <lines>
      - Active state: The entire line highlights.
      - Dragging an active line horizontally moves it across the page. It MUST NOT overlap existing lines; it automatically offsets to the side if dragged over another line.
    </lines>
  </interaction_logic>

  <break_scene_tool>
    <definition>A horizontal line extending the full width of the page to define scene boundaries.</definition>
    <behavior>
      - Contains a Box Label with ONLY the `Scene#`.
      - Automatically generated above detected scene headings.
      - Can be moved vertically or deleted. Changing the Scene# here updates the global Scene#.
    </behavior>
  </break_scene_tool>

  <annotation_tools>
    <definition>Free-form annotation tools that operate independently on the canvas.</definition>
    <behavior>Can be drawn, moved, or resized anywhere; unrestricted by line-scripts or scene breaks.</behavior>
    <tool_types>
      - Text Notes (No Box): Customizable text color, font, size, weight, italic, bold.
      - Text Notes (With Box): Box is resizable, croppable, rotatable, and deletable. Customizable background color and text formatting.
      - Image Import: Upload from device or capture. Can be cropped, rotated, moved, resized, and deleted.
      - Shapes (Arrow, Rectangle, Circle, Square, Triangle): Can contain text. Customizable colors, borders, thickness, sizes, and font styles.
      - Highlighter: Freehand highlighting with customizable colors.
    </tool_types>
  </annotation_tools>

  <data_structure>
    <object_schema>
      { id, pageNumber, startY, endY, shotName, shotSize, color }
    </object_schema>
    <note>Every line is saved locally via IndexedDB immediately upon creation or modification.</note>
  </data_structure>
</feature_reference>