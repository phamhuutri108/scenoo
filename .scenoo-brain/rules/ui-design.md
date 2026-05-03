<design_system>
  <concept>
  Cinematic Utility: Minimalist and Corporate Modern. Prioritizes clarity and focus to reduce cognitive load. Uses generous white space and a restricted color palette.
  </concept>

  <design_tokens>
    <colors>
      <background>#f9f9ff</background>
      <surface>#ffffff</surface>
      <border>#E5E7EB</border>
      <primary>#0058be</primary>
      <action_blue>#3B82F6</action_blue>
      <text_primary>#191b23</text_primary>
      <text_secondary>#424754</text_secondary>
    </colors>

    <typography>
      <font_family_primary>Inter, sans-serif</font_family_primary>
      <font_family_mono>Monaco, Courier New, monospace</font_family_mono>
      <h1 font-size="24px" font-weight="600" letter-spacing="-0.01em" />
      <h2 font-size="20px" font-weight="600" letter-spacing="-0.01em" />
      <body_md font-size="14px" font-weight="400" />
      <label_sm font-size="12px" font-weight="500" letter-spacing="0.02em" />
    </typography>

    <spacing>
      <base_grid>8px</base_grid>
      <gutters>16px</gutters>
      <margins>32px</margins>
      <sidebar_width>260px</sidebar_width>
    </spacing>

    <radius strategy="dual-radius">
      <small use_for="buttons, inputs, chips, active_nav">8px</small>
      <large use_for="cards, modals">12px</large>
      <pill use_for="badges, status_indicators">9999px</pill>
    </radius>

    <elevation>
      <level_0 use_for="background">#f9f9ff</level_0>
      <level_1 use_for="surface, sidebar, header">#ffffff with 1px solid #E5E7EB</level_1>
      <level_2 use_for="interactive_cards">shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.05)</level_2>
      <level_3 use_for="modals, popovers">shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1)</level_3>
    </elevation>
  </design_tokens>

  <component_rules>
    <buttons>
      Primary: background #3B82F6, text #ffffff. 
      Secondary: background #ffffff, border #E5E7EB, text #191b23. 
      Focus state MUST include a 2px offset ring in accent color.
    </buttons>
    <inputs>
      Height 36px or 40px, background #ffffff, border #E5E7EB, radius 8px. 
      Focus state MUST transition border to #3B82F6.
    </inputs>
    <cards>
      Radius 12px, border 1px solid #E5E7EB. 
      Interactive hover: subtle white-to-gray transition.
    </cards>
    <sidebar>
      Constant #ffffff surface with right border #E5E7EB. 
      Active items: subtle #F3F4F6 background, radius 8px, text #111827.
    </sidebar>
    <lists>
      Typography: body-md. Vertical padding: 12px. Use alternating row tints or subtle borders.
    </lists>
  </component_rules>
</design_system>