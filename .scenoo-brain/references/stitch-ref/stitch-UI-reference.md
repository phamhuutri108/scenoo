This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
cinematic_utility/
  DESIGN.md
scenoo_18_column_shotlist_light/
  code.html
  screen.png
scenoo_line_script_light/
  code.html
  screen.png
scenoo_professional_marketing_landing_page/
  code.html
  screen.png
scenoo_projects_dashboard_light/
  code.html
  screen.png
scenoo_script_breakdown_light/
  code.html
  screen.png
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="cinematic_utility/DESIGN.md">
---
name: Cinematic Utility
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code:
    fontFamily: Monaco, Courier New
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  sidebar_width: 260px
  max_content_width: 1280px
---

## Brand & Style
The design system is anchored in the concept of "Cinematic Utility." It bridges the gap between high-end creative production and rigorous project management. The aesthetic is Minimalist and Corporate Modern, prioritizing clarity and focus to reduce cognitive load for film professionals managing complex data like call sheets, scripts, and schedules.

The visual language emphasizes breathability through generous white space and a restricted color palette. It evokes a sense of reliability and precision, ensuring that the interface feels like a high-performance tool rather than a generic administrative app.

## Colors
The palette is architectural, using neutrals to define structure and a singular accent to drive action. 

- **Primary (Azure):** Reserved for primary actions, active states, and focus indicators. It provides a clear path for the user’s eye.
- **Neutrals:** The background and surface colors create a subtle "layering" effect. The #F9FAFB background provides a soft canvas for the #FFFFFF surfaces, creating a natural hierarchy without the need for heavy shadows.
- **Typography:** Contrast is strictly managed. Text Primary is for high-readability content like script dialogue or scene titles, while Text Secondary and Muted are used for metadata and utility labels.

## Typography
Inter is the workhorse of this design system, chosen for its exceptional legibility in data-heavy environments. 

Headlines utilize tighter letter-spacing and semi-bold weights to appear authoritative and structured. Body text is set with standard tracking to ensure comfortable reading during long-form script reviews. Use the "Label" styles for metadata, button text, and sidebar navigation to maintain a professional, UI-centric feel. A monospaced font is suggested for scene numbers and timecode data to ensure vertical alignment in lists.

## Layout & Spacing
The layout follows a systematic 8px grid. The primary workspace uses a fixed-width sidebar for navigation, with a fluid content area that adapts to the viewport.

- **Sidebar:** A constant #FFFFFF surface with a subtle right border (#E5E7EB).
- **Margins:** Main content should maintain a 32px padding from the edges to preserve an airy, "Notion-like" feel.
- **Gutters:** Standardize on 16px between cards or data modules to ensure clear separation of concerns.

## Elevation & Depth
Depth is communicated through tonal layering rather than heavy shadows. 

1. **Level 0 (Background):** #F9FAFB. Used for the overall canvas.
2. **Level 1 (Surface):** #FFFFFF with a 1px solid border (#E5E7EB). Used for sidebars and header bars.
3. **Level 2 (Cards/Floating):** #FFFFFF with a very soft, diffused shadow (0px 4px 6px -1px rgba(0, 0, 0, 0.05)). This elevation is used for interactive elements like scene cards or task modules.
4. **Level 3 (Modals/Popovers):** #FFFFFF with a more pronounced shadow (0px 10px 15px -3px rgba(0, 0, 0, 0.1)) to indicate a break in the primary workflow.

## Shapes
The design system uses a dual-radius strategy to balance friendliness with professional rigor.

- **Large Components (Cards, Modals):** Use 12px (rounded-lg) to soften the layout and create a modern, approachable container for information.
- **Small Components (Buttons, Inputs, Chips):** Use 8px (rounded-md) to maintain a sense of precision and "tool-like" efficiency.
- **Status Indicators:** Use fully rounded (pill) shapes for badges to differentiate them from interactive elements.

## Components
- **Buttons:** Primary buttons use the #3B82F6 background with white text. Secondary buttons use #FFFFFF with a #E5E7EB border and Text Primary. Focus states must always feature a 2px offset ring in the accent color.
- **Inputs:** Fields should be 36px or 40px in height, featuring a #FFFFFF background, #E5E7EB border, and 8px radius. On focus, the border transitions to #3B82F6.
- **Cards:** The container for film data. They should feature a 12px radius, a 1px border (#E5E7EB), and a subtle white-to-gray hover transition if interactive.
- **Lists:** Stripboards and schedule views should use "Body-md" typography with 12px vertical padding. Use alternating row tints or subtle borders to separate items.
- **Navigation:** Sidebar items use 8px radius for their "active" background state. Active items should use a subtle #F3F4F6 background and #111827 text to stay understated.
- **Specialized Components:** Include "Timecode Badges" (monospaced text in a gray pill) and "Role Labels" (small-caps or label-sm for positions like Director or DP).
</file>

<file path="scenoo_18_column_shotlist_light/code.html">
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .grid-header-sticky {
            position: sticky;
            top: 0;
            z-index: 20;
        }
        .grid-column-sticky {
            position: sticky;
            left: 0;
            z-index: 10;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-variant": "#e1e2ec",
                        "on-tertiary-container": "#fffbff",
                        "surface-dim": "#d8d9e3",
                        "on-secondary-fixed": "#141b2b",
                        "surface-container-highest": "#e1e2ec",
                        "secondary-container": "#d9dff5",
                        "tertiary-fixed-dim": "#ffb786",
                        "primary": "#3B82F6",
                        "error-container": "#ffdad6",
                        "surface-container-high": "#e6e7f2",
                        "on-primary-fixed-variant": "#004395",
                        "on-tertiary-fixed-variant": "#723600",
                        "outline-variant": "#c2c6d6",
                        "on-surface": "#191b23",
                        "on-primary-fixed": "#001a42",
                        "on-surface-variant": "#424754",
                        "surface-container-lowest": "#ffffff",
                        "surface-bright": "#f9f9ff",
                        "error": "#ba1a1a",
                        "primary-fixed": "#d8e2ff",
                        "primary-fixed-dim": "#adc6ff",
                        "tertiary-container": "#b75b00",
                        "on-primary": "#ffffff",
                        "tertiary-fixed": "#ffdcc6",
                        "on-secondary": "#ffffff",
                        "outline": "#727785",
                        "on-tertiary-fixed": "#311400",
                        "background": "#f9f9ff",
                        "surface-tint": "#005ac2",
                        "secondary-fixed": "#dce2f7",
                        "on-error": "#ffffff",
                        "tertiary": "#924700",
                        "on-background": "#191b23",
                        "on-error-container": "#93000a",
                        "surface": "#f9f9ff",
                        "primary-container": "#2170e4",
                        "inverse-on-surface": "#eff0fa",
                        "on-secondary-fixed-variant": "#404758",
                        "secondary-fixed-dim": "#c0c6db",
                        "inverse-primary": "#adc6ff",
                        "on-tertiary": "#ffffff",
                        "on-primary-container": "#fefcff",
                        "on-secondary-container": "#5c6274",
                        "surface-container": "#ecedf7",
                        "surface-container-low": "#f2f3fd",
                        "secondary": "#575e70",
                        "inverse-surface": "#2e3038"
                    },
                    "spacing": {
                        "md": "16px",
                        "2xl": "48px",
                        "xl": "32px",
                        "lg": "24px",
                        "sm": "8px",
                        "sidebar_width": "70px",
                        "xs": "4px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "body-md": ["Inter"],
                        "display": ["Inter"],
                        "h3": ["Inter"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "code": ["Monaco"]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-surface font-body-md antialiased overflow-hidden">
<!-- Sidebar Navigation -->
<!-- Content & Identity: SideNavBar from JSON -->
<aside class="fixed left-0 top-0 h-full w-[70px] flex flex-col items-center py-6 bg-white border-r border-gray-200 z-50">
<div class="mb-8">
<span class="material-symbols-outlined text-primary text-3xl">movie_edit</span>
</div>
<nav class="flex flex-col gap-y-4 flex-1">
<button class="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-900 group relative">
<span class="material-symbols-outlined">folder_open</span>
<span class="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Projects</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group relative">
<span class="material-symbols-outlined">video_library</span>
<span class="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Assets</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group relative">
<span class="material-symbols-outlined">groups</span>
<span class="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Crew</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group relative">
<span class="material-symbols-outlined">settings</span>
<span class="absolute left-16 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Settings</span>
</button>
</nav>
<div class="mt-auto">
<div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Close up professional headshot of a creative director in a studio with soft cinematic lighting and neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmw7eM-L1zf49OgfjPlpCRjEVrdeuWGZQvTfDvq5Nmr5LjYaQ1pLXIXsEidRot-LmhENAXLdjzR3SSH63PMadIaZBzWZjZizlp7vhJvL_en8AkvOIRbrUgsfn4hnDKO4ofWQLsSPA-KkZmHc65PZiT-JnDUvIbEAywjalMUEK9ntkk2Cx6b99y58lax_lKnU0aaDb7hOALPiMT9bB2Vuwxke35L7VUHR62LTq981NRwcn5aVKYZ3nwVviyTl16KNRnrgPXSL6emvjB"/>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-[70px] h-screen flex flex-col">
<!-- Header / Top Bar -->
<!-- Content & Identity: TopNavBar from JSON -->
<header class="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
<div class="flex items-center gap-8">
<h1 class="font-h2 text-h2 text-on-surface tracking-tight">Production Dashboard</h1>
<div class="flex items-end gap-x-6 h-16">
<button class="text-gray-500 font-label-md hover:text-primary transition-colors pb-5 mt-1 border-b-2 border-transparent">Breakdown</button>
<button class="text-gray-500 font-label-md hover:text-primary transition-colors pb-5 mt-1 border-b-2 border-transparent">Line Script</button>
<button class="text-primary font-label-md pb-5 mt-1 border-b-2 border-primary">Shotlist</button>
</div>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
<input class="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-body-md w-64 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" placeholder="Search shots, scenes, tags..." type="text"/>
</div>
<button class="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">
<span class="material-symbols-outlined">help_outline</span>
</button>
<button class="bg-primary text-white px-4 py-2 rounded-lg font-label-md flex items-center gap-2 hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-sm">add</span>
                    New Shot
                </button>
</div>
</header>
<!-- Spreadsheet Grid Container -->
<div class="flex-1 overflow-auto bg-background p-md">
<div class="min-w-[2000px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
<!-- Table Header -->
<div class="flex bg-gray-50 border-b border-gray-200 grid-header-sticky">
<div class="w-12 h-10 flex items-center justify-center border-r border-gray-200 grid-column-sticky bg-gray-50 font-label-sm text-gray-500">#</div>
<div class="w-16 h-10 flex items-center justify-center border-r border-gray-200 grid-column-sticky left-12 bg-gray-50 font-label-sm text-gray-500">SC#</div>
<div class="w-16 h-10 flex items-center justify-center border-r border-gray-200 grid-column-sticky left-[112px] bg-gray-50 font-label-sm text-gray-500">SH#</div>
<!-- Data Columns -->
<div class="w-48 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">DESCRIPTION</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">SIZE</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">ANGLE</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">MOVEMENT</div>
<div class="w-24 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">LENS</div>
<div class="w-24 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">FPS</div>
<div class="w-40 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">EQUIPMENT</div>
<div class="w-40 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">TALENT</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">STATUS</div>
<div class="w-24 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">DURATION</div>
<div class="w-48 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">DIRECTOR NOTES</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">AUDIO</div>
<div class="w-32 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">LIGHTING</div>
<div class="w-24 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">TC START</div>
<div class="w-24 h-10 flex items-center px-4 border-r border-gray-200 font-label-sm text-gray-500">TC END</div>
</div>
<!-- Table Body -->
<div class="flex flex-col">
<!-- Row 1 -->
<div class="flex border-b border-gray-100 hover:bg-blue-50/50 transition-colors group">
<div class="w-12 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky bg-white group-hover:bg-blue-50/50 font-code text-gray-400">01</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-12 bg-white group-hover:bg-blue-50/50 font-label-md">14A</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-[112px] bg-white group-hover:bg-blue-50/50 font-label-md">1</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">CU - Protagonist enters room</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100"><span class="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold">CLOSE UP</span></div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Eye Level</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Static</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">35mm</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">24</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Tripod</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">John Doe</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100">
<span class="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed
                            </span>
</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">00:04:12</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 text-gray-500 italic truncate">Watch for reflection in mirror</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Boom</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Day Int</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">01:00:00</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">01:00:04</div>
</div>
<!-- Row 2 (Alternating) -->
<div class="flex border-b border-gray-100 bg-gray-50/30 hover:bg-blue-50/50 transition-colors group">
<div class="w-12 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky bg-gray-50/30 group-hover:bg-blue-50/50 font-code text-gray-400">02</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-12 bg-gray-50/30 group-hover:bg-blue-50/50 font-label-md">14A</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-[112px] bg-gray-50/30 group-hover:bg-blue-50/50 font-label-md">2</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">OTS - Dialogue beat</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100"><span class="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold">MEDIUM CU</span></div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Low Angle</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Pan Right</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">50mm</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">24</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Slider</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">John D, Sarah K</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100">
<span class="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> In Progress
                            </span>
</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">00:08:20</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 text-gray-500 italic truncate">Focus pull to background on line 4</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Lavalier</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Key Warm</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">01:04:12</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">01:04:20</div>
</div>
<!-- Row 3 -->
<div class="flex border-b border-gray-100 hover:bg-blue-50/50 transition-colors group">
<div class="w-12 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky bg-white group-hover:bg-blue-50/50 font-code text-gray-400">03</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-12 bg-white group-hover:bg-blue-50/50 font-label-md">15</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-[112px] bg-white group-hover:bg-blue-50/50 font-label-md">1</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Wide - Living Room Establishing</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100"><span class="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold">WIDE SHOT</span></div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">High Angle</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Crane Down</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">18mm</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">48</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Jib / Crane</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Atmosphere</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100">
<span class="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Pending
                            </span>
</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">00:15:00</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 text-gray-500 italic truncate">Slow motion movement</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Muted</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Haze</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">02:00:00</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">02:00:15</div>
</div>
<!-- Row 4 (Alternating) -->
<div class="flex border-b border-gray-100 bg-gray-50/30 hover:bg-blue-50/50 transition-colors group">
<div class="w-12 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky bg-gray-50/30 group-hover:bg-blue-50/50 font-code text-gray-400">04</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-12 bg-gray-50/30 group-hover:bg-blue-50/50 font-label-md">15</div>
<div class="w-16 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky left-[112px] bg-gray-50/30 group-hover:bg-blue-50/50 font-label-md">2</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">MCU - Reveal of letter</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100"><span class="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold">MED CLOSE</span></div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Top Down</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Zoom In</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">85mm</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">24</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Handheld</div>
<div class="w-40 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Sarah K</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100">
<span class="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
<span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Pending
                            </span>
</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">00:03:00</div>
<div class="w-48 h-12 flex items-center px-4 border-r border-gray-100 text-gray-500 italic truncate">Texture of paper is important</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Wild Track</div>
<div class="w-32 h-12 flex items-center px-4 border-r border-gray-100 font-body-md">Spotlight</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">02:10:00</div>
<div class="w-24 h-12 flex items-center px-4 border-r border-gray-100 font-code text-xs">02:10:03</div>
</div>
<!-- Additional placeholder rows for effect -->
<div class="flex border-b border-gray-100 hover:bg-blue-50/50 transition-colors group h-12 items-center">
<div class="w-12 h-12 flex items-center justify-center border-r border-gray-100 grid-column-sticky bg-white group-hover:bg-blue-50/50 font-code text-gray-400 text-xs italic">add</div>
<div class="flex-1 px-4 text-gray-300 font-label-sm italic">Click to add new shot row...</div>
</div>
</div>
</div>
</div>
<!-- Sticky Footer Info Bar -->
<footer class="h-10 border-t border-gray-200 bg-white flex items-center justify-between px-8 text-[11px] text-gray-400 font-medium">
<div class="flex gap-4">
<span>TOTAL SHOTS: 142</span>
<span>ESTIMATED TIME: 14h 22m</span>
<span>COMPLETED: 14%</span>
</div>
<div class="flex gap-4 items-center">
<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> SYSTEM READY</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">cloud_done</span> CLOUD SYNCED</span>
</div>
</footer>
</main>
<!-- Contextual FAB -->
<button class="fixed bottom-12 right-12 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
<span class="material-symbols-outlined text-2xl">movie</span>
<div class="absolute -top-1 -right-1 bg-error text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">3</div>
</button>
</body></html>
</file>

<file path="scenoo_line_script_light/code.html">
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Line Script - FilmPro</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-low": "#f2f3fd",
                        "secondary": "#575e70",
                        "on-tertiary-fixed-variant": "#723600",
                        "on-secondary-fixed-variant": "#404758",
                        "on-primary-fixed-variant": "#004395",
                        "on-primary": "#ffffff",
                        "surface-container-lowest": "#ffffff",
                        "on-background": "#191b23",
                        "error-container": "#ffdad6",
                        "inverse-on-surface": "#eff0fa",
                        "surface-container": "#ecedf7",
                        "on-tertiary": "#ffffff",
                        "tertiary": "#924700",
                        "surface-container-high": "#e6e7f2",
                        "on-error-container": "#93000a",
                        "tertiary-fixed-dim": "#ffb786",
                        "secondary-fixed-dim": "#c0c6db",
                        "outline": "#727785",
                        "on-secondary-fixed": "#141b2b",
                        "primary-fixed-dim": "#adc6ff",
                        "surface-tint": "#005ac2",
                        "secondary-fixed": "#dce2f7",
                        "background": "#f9f9ff",
                        "on-error": "#ffffff",
                        "secondary-container": "#d9dff5",
                        "on-secondary": "#ffffff",
                        "on-primary-container": "#fefcff",
                        "on-tertiary-container": "#fffbff",
                        "primary-container": "#2170e4",
                        "inverse-surface": "#2e3038",
                        "on-primary-fixed": "#001a42",
                        "surface-variant": "#e1e2ec",
                        "on-secondary-container": "#5c6274",
                        "inverse-primary": "#adc6ff",
                        "surface-container-highest": "#e1e2ec",
                        "on-surface-variant": "#424754",
                        "surface": "#f9f9ff",
                        "tertiary-fixed": "#ffdcc6",
                        "primary-fixed": "#d8e2ff",
                        "error": "#ba1a1a",
                        "surface-bright": "#f9f9ff",
                        "primary": "#0058be",
                        "outline-variant": "#c2c6d6",
                        "on-tertiary-fixed": "#311400",
                        "on-surface": "#191b23",
                        "tertiary-container": "#b75b00",
                        "surface-dim": "#d8d9e3"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "sidebar_width": "260px",
                        "max_content_width": "1280px",
                        "sm": "8px",
                        "md": "16px",
                        "lg": "24px",
                        "2xl": "48px",
                        "xl": "32px",
                        "base": "4px",
                        "xs": "4px"
                    },
                    "fontFamily": {
                        "label-md": ["Inter"],
                        "body-md": ["Inter"],
                        "code": ["Monaco", "Courier New"],
                        "body-lg": ["Inter"],
                        "label-sm": ["Inter"],
                        "h1": ["Inter"],
                        "h3": ["Inter"],
                        "h2": ["Inter"],
                        "display": ["Inter"]
                    },
                    "fontSize": {
                        "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                        "code": ["13px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                        "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                        "h1": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "h3": ["16px", {"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "600"}],
                        "h2": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "display": ["30px", {"lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600"}]
                    }
                }
            }
        }
    </script>
<style>
        body { background-color: #F9F9FF; }
    </style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen flex">
<!-- SideNavBar (Collapsed Rail) -->
<nav class="fixed left-0 top-0 h-full w-[80px] border-r border-surface-variant bg-surface-container-lowest flex flex-col items-center py-lg z-40">
<div class="mb-2xl">
<span class="material-symbols-outlined text-primary text-display font-black" style="font-variation-settings: 'FILL' 1;">movie</span>
</div>
<div class="flex flex-col gap-lg flex-1">
<button aria-label="Projects" class="w-12 h-12 rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-all group relative">
<span class="material-symbols-outlined">folder_open</span>
<span class="absolute left-full ml-xs px-sm py-xs bg-inverse-surface text-inverse-on-surface rounded font-label-sm text-label-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Projects</span>
</button>
<button aria-label="Assets" class="w-12 h-12 rounded-lg bg-surface-container text-on-surface flex items-center justify-center transition-all group relative">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">movie_filter</span>
<span class="absolute left-full ml-xs px-sm py-xs bg-inverse-surface text-inverse-on-surface rounded font-label-sm text-label-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Assets</span>
</button>
<button aria-label="Crew" class="w-12 h-12 rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-all group relative">
<span class="material-symbols-outlined">group</span>
<span class="absolute left-full ml-xs px-sm py-xs bg-inverse-surface text-inverse-on-surface rounded font-label-sm text-label-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Crew</span>
</button>
<button aria-label="Settings" class="w-12 h-12 rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-all group relative">
<span class="material-symbols-outlined">settings</span>
<span class="absolute left-full ml-xs px-sm py-xs bg-inverse-surface text-inverse-on-surface rounded font-label-sm text-label-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Settings</span>
</button>
</div>
<div class="mt-auto">
<button aria-label="Profile" class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex items-center justify-center bg-surface-container-high">
<span class="material-symbols-outlined text-secondary">person</span>
</button>
</div>
</nav>
<!-- Main Workspace -->
<main class="ml-[80px] flex-1 flex flex-col h-screen overflow-hidden">
<!-- TopNavBar -->
<header class="h-16 px-xl w-full border-b border-surface-variant bg-surface-container-lowest flex justify-between items-center z-30 shrink-0">
<div class="flex items-center gap-xl h-full">
<div class="text-h3 font-h3 text-on-surface mr-md">SCENE 24</div>
<nav class="flex h-full gap-lg">
<button class="text-secondary font-label-md text-label-md hover:text-primary transition-colors flex items-center h-full border-b-2 border-transparent">Breakdown</button>
<button class="text-primary font-label-md text-label-md border-b-2 border-primary flex items-center h-full">Line Script</button>
<button class="text-secondary font-label-md text-label-md hover:text-primary transition-colors flex items-center h-full border-b-2 border-transparent">Shotlist</button>
</nav>
</div>
<div class="flex items-center gap-md">
<button class="text-secondary hover:text-on-surface p-xs rounded-full hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-secondary hover:text-on-surface p-xs rounded-full hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>
<!-- Content Area -->
<div class="flex-1 overflow-hidden relative p-xl flex justify-center bg-background">
<!-- PDF Script Viewer Card -->
<div class="w-full max-w-[850px] bg-surface-container-lowest border border-surface-variant rounded-lg shadow-sm flex flex-col h-full relative overflow-hidden">
<!-- Script Header/Controls -->
<div class="h-12 border-b border-surface-variant bg-surface-container-low flex items-center justify-between px-md shrink-0">
<div class="flex items-center gap-sm">
<button class="p-xs rounded text-secondary hover:bg-surface-container hover:text-on-surface"><span class="material-symbols-outlined text-sm">zoom_out</span></button>
<span class="text-label-sm font-label-sm text-on-surface-variant">100%</span>
<button class="p-xs rounded text-secondary hover:bg-surface-container hover:text-on-surface"><span class="material-symbols-outlined text-sm">zoom_in</span></button>
</div>
<div class="text-label-sm font-label-sm text-secondary">Page 24 of 120</div>
<div class="flex items-center gap-sm">
<button class="p-xs rounded text-secondary hover:bg-surface-container hover:text-on-surface"><span class="material-symbols-outlined text-sm">print</span></button>
<button class="p-xs rounded text-secondary hover:bg-surface-container hover:text-on-surface"><span class="material-symbols-outlined text-sm">download</span></button>
</div>
</div>
<!-- Script Content (Courier) -->
<div class="flex-1 overflow-y-auto p-2xl font-code text-code text-on-surface leading-loose bg-surface-container-lowest relative">
<!-- Drawn Line overlay mockup -->
<div class="absolute left-[150px] top-[100px] bottom-[200px] w-1 bg-primary opacity-50 rounded-full"></div>
<div class="absolute left-[140px] top-[100px] w-6 h-1 bg-primary opacity-50"></div>
<div class="absolute left-[140px] bottom-[200px] w-6 h-1 bg-primary opacity-50"></div>
<div class="absolute left-[100px] top-[250px] text-label-sm font-label-sm text-primary">SC24-A</div>
<div class="max-w-[600px] mx-auto">
<div class="text-center mb-8 font-bold">24 INT. COFFEE SHOP - DAY 24</div>
<p class="mb-4 text-justify">
                            The bell above the door CHIMES. RACHEL (30s, disheveled but focused) storms in. She scans the room, gripping a worn manila envelope tightly to her chest.
                        </p>
<p class="mb-4 text-justify">
                            She spots DAVID (40s, impeccably dressed) sitting at a corner booth, sipping an espresso. He doesn't look up from his newspaper.
                        </p>
<div class="w-3/4 mx-auto mb-4">
<div class="text-center font-bold mb-1">RACHEL</div>
<div class="text-left">
                                You said ten o'clock. It's ten-fifteen.
                            </div>
</div>
<div class="w-3/4 mx-auto mb-4">
<div class="text-center font-bold mb-1">DAVID</div>
<div class="text-center text-sm mb-1">(still reading)</div>
<div class="text-left">
                                Traffic on the 405. Unpredictable beast. Did you bring it?
                            </div>
</div>
<p class="mb-4 text-justify">
                            Rachel hesitates, then drops the envelope onto the table. It lands with a heavy THUD.
                        </p>
<div class="w-3/4 mx-auto mb-4">
<div class="text-center font-bold mb-1">RACHEL</div>
<div class="text-left">
                                It's all there. Every last detail. But if they trace this back to me...
                            </div>
</div>
<div class="w-3/4 mx-auto mb-4">
<div class="text-center font-bold mb-1">DAVID</div>
<div class="text-left">
                                Relax, Rachel. You're a ghost.
                            </div>
</div>
</div>
</div>
</div>
<!-- Annotation Tools Floating Toolbar -->
<div class="absolute top-xl bg-surface-container-lowest border border-surface-variant rounded-lg shadow-sm flex flex-col p-xs gap-xs left-xl">
<button class="w-10 h-10 rounded-md bg-primary-container text-on-primary-container flex items-center justify-center transition-colors" title="Draw Tool">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="w-10 h-10 rounded-md text-secondary hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-center" title="Add Note">
<span class="material-symbols-outlined text-lg">add_comment</span>
</button>
<button class="w-10 h-10 rounded-md text-secondary hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-center" title="Highlighter">
<span class="material-symbols-outlined text-lg">format_ink_highlighter</span>
</button>
<div class="w-full h-px bg-surface-variant my-xs"></div>
<button class="w-10 h-10 rounded-md text-secondary hover:bg-error-container hover:text-error transition-colors flex items-center justify-center" title="Clear/Trash">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</main>
</body></html>
</file>

<file path="scenoo_professional_marketing_landing_page/code.html">
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Scenoo - The Ultimate Script Workspace</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-container": "#fffbff",
                        "surface-tint": "#005ac2",
                        "primary-container": "#2170e4",
                        "surface-container-highest": "#e1e2ec",
                        "surface-container-high": "#e6e7f2",
                        "surface-bright": "#f9f9ff",
                        "on-surface": "#191b23",
                        "error-container": "#ffdad6",
                        "on-surface-variant": "#424754",
                        "on-secondary-fixed-variant": "#404758",
                        "inverse-on-surface": "#eff0fa",
                        "on-tertiary-fixed-variant": "#723600",
                        "on-primary-container": "#fefcff",
                        "surface-variant": "#e1e2ec",
                        "on-secondary": "#ffffff",
                        "tertiary-fixed": "#ffdcc6",
                        "outline-variant": "#c2c6d6",
                        "background": "#f9f9ff",
                        "error": "#ba1a1a",
                        "tertiary-container": "#b75b00",
                        "secondary-container": "#d9dff5",
                        "tertiary-fixed-dim": "#ffb786",
                        "secondary": "#575e70",
                        "on-primary-fixed-variant": "#004395",
                        "on-tertiary": "#ffffff",
                        "inverse-primary": "#adc6ff",
                        "on-primary": "#ffffff",
                        "on-error-container": "#93000a",
                        "on-background": "#191b23",
                        "inverse-surface": "#2e3038",
                        "on-tertiary-fixed": "#311400",
                        "surface-container-low": "#f2f3fd",
                        "primary-fixed": "#d8e2ff",
                        "secondary-fixed": "#dce2f7",
                        "surface": "#f9f9ff",
                        "on-primary-fixed": "#001a42",
                        "on-secondary-fixed": "#141b2b",
                        "tertiary": "#924700",
                        "primary": "#0058be",
                        "outline": "#727785",
                        "surface-container": "#ecedf7",
                        "surface-dim": "#d8d9e3",
                        "secondary-fixed-dim": "#c0c6db",
                        "primary-fixed-dim": "#adc6ff",
                        "on-error": "#ffffff",
                        "on-secondary-container": "#5c6274",
                        "brand-amber": "#F59E0B"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "lg": "24px",
                        "2xl": "48px",
                        "xs": "4px",
                        "sm": "8px",
                        "max_content_width": "1280px",
                        "md": "16px",
                        "xl": "32px",
                        "sidebar_width": "260px",
                        "base": "4px"
                    },
                    fontFamily: {
                        "h2": ["Inter"],
                        "h3": ["Inter"],
                        "label-sm": ["Inter"],
                        "code": ["Monaco, Courier New"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "h1": ["Inter"],
                        "body-md": ["Inter"],
                        "display": ["Inter"]
                    },
                    fontSize: {
                        "h2": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "h3": ["16px", { "lineHeight": "24px", "letterSpacing": "0", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500" }],
                        "code": ["13px", { "lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400" }],
                        "body-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "0", "fontWeight": "400" }],
                        "label-md": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "h1": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "body-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400" }],
                        "display": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600" }]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #f9f9ff; color: #191b23; }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col antialiased">
<!-- Header -->
<header class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm font-sans text-sm font-medium tracking-tight">
<div class="flex justify-between items-center h-16 px-8 max-w-[1280px] mx-auto">
<div class="flex items-center gap-8">
<a class="text-xl font-bold tracking-tighter text-gray-900 dark:text-white" href="#">Scenoo</a>
<nav class="hidden md:flex gap-6">
<a class="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors" href="#features">Features</a>
<a class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors" href="#faq">Q&amp;A</a>
<a class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors" href="#blog">Blog</a>
</nav>
</div>
<div class="flex items-center gap-4">
<a class="text-gray-600 hover:text-gray-900 font-label-md text-label-md" href="#">Log In</a>
<a class="bg-brand-amber text-white px-4 py-2 rounded font-label-md text-label-md hover:opacity-90 transition-opacity" href="#">Sign Up</a>
</div>
</div>
</header>
<main class="flex-grow pt-16">
<!-- Hero Section -->
<section class="py-24 px-8 max-w-[1280px] mx-auto text-center flex flex-col items-center">
<h1 class="font-display text-display max-w-3xl mb-6">The Ultimate Script Workspace for Filmmakers</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">Seamlessly connect Breakdown, Line Scripting, and your Shotlist in one intelligent, industry-standard environment.</p>
<div class="flex flex-wrap justify-center gap-4 mb-16">
<button class="flex items-center gap-2 bg-on-background text-background px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-on-surface-variant transition-colors shadow-sm">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">ios</span>
                    App Store (iPad)
                </button>
<button class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-background px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">android</span>
                    Google Play (Tablet)
                </button>
<button class="flex items-center gap-2 bg-transparent border border-outline-variant text-on-background px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined">laptop_mac</span>
                    macOS (.dmg)
                </button>
</div>
<div class="w-full max-w-5xl rounded-xl border border-outline-variant shadow-lg overflow-hidden bg-surface-container-lowest">
<img alt="Clean, bright software interface showing a film script with colorful highlighters and a detailed shotlist table next to it" class="w-full h-auto object-cover opacity-90 mix-blend-multiply" data-alt="Clean, bright software interface showing a film script with colorful highlighters and a detailed shotlist table next to it" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBVKwdg2-WHuV4BhMeHkvQNxzDWQMV9rmIC5K7pxi-OccQ7dyPZRE26j80N3fdUPlG1RnP3dg9Z5RHN-4kNip44sN8twnj1isa_FdGKcomYzZB-AoslLcmMVTvQbjis2MxKWFZ1W8pBS2mdQYbPFxFQhgug-EuKD4zCurc-n_KhMDFLFruZHazStDUYL6ZETpDh9hipi0XkZWAzNPAGNQPSygAcwFRDhMogerEITL_4GaEBns2bg9-i_1yYB3W-xKw9RVJfjq-wVew"/>
</div>
</section>
<!-- Features -->
<section class="py-24 bg-surface-container-lowest px-8" id="features">
<div class="max-w-[1280px] mx-auto">
<h2 class="font-h1 text-h1 text-center mb-16">Professional Tools for Every Department</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Feature 1 -->
<div class="p-8 rounded-xl border border-outline-variant bg-surface-bright shadow-sm flex flex-col">
<div class="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-on-primary-fixed-variant">draw</span>
</div>
<h3 class="font-h2 text-h2 mb-4">Smart Line Scripting</h3>
<p class="font-body-md text-body-md text-on-surface-variant flex-grow">Draw lines naturally. Scenoo intelligently snaps to character dialogues and action blocks, saving hours of manual formatting.</p>
</div>
<!-- Feature 2 -->
<div class="p-8 rounded-xl border border-outline-variant bg-surface-bright shadow-sm flex flex-col">
<div class="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-on-tertiary-fixed-variant">category</span>
</div>
<h3 class="font-h2 text-h2 mb-4">Industry-Standard Breakdown</h3>
<p class="font-body-md text-body-md text-on-surface-variant flex-grow mb-4">Tag elements directly on the script with standard color categories.</p>
<div class="flex flex-wrap gap-2 mt-auto">
<span class="px-2 py-1 rounded bg-red-100 text-red-800 font-label-sm text-label-sm">Cast</span>
<span class="px-2 py-1 rounded bg-blue-100 text-blue-800 font-label-sm text-label-sm">Props</span>
<span class="px-2 py-1 rounded bg-green-100 text-green-800 font-label-sm text-label-sm">Wardrobe</span>
</div>
</div>
<!-- Feature 3 -->
<div class="p-8 rounded-xl border border-outline-variant bg-surface-bright shadow-sm flex flex-col">
<div class="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-on-secondary-fixed-variant">view_list</span>
</div>
<h3 class="font-h2 text-h2 mb-4">Excel-like Shotlist</h3>
<p class="font-body-md text-body-md text-on-surface-variant flex-grow">Manage your coverage with an advanced spreadsheet view featuring 19 customizable fields tailored for cinematography.</p>
</div>
</div>
</div>
</section>
<!-- FAQ -->
<section class="py-24 px-8 max-w-3xl mx-auto" id="faq">
<h2 class="font-h1 text-h1 text-center mb-12">Frequently Asked Questions</h2>
<div class="space-y-4">
<details class="group bg-surface-container-lowest border border-outline-variant rounded-lg p-6 [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between cursor-pointer font-h3 text-h3">
                        Can I work offline on set?
                        <span class="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-body-md text-on-surface-variant mt-4 pt-4 border-t border-outline-variant">
                        Yes. Scenoo is designed for remote locations. All your work saves locally and syncs automatically when you reconnect to the internet.
                    </p>
</details>
<details class="group bg-surface-container-lowest border border-outline-variant rounded-lg p-6 [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between cursor-pointer font-h3 text-h3">
                        What script formats are supported?
                        <span class="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-body-md text-on-surface-variant mt-4 pt-4 border-t border-outline-variant">
                        We natively support importing standard PDF scripts, Final Draft (.fdx), and Fountain text files.
                    </p>
</details>
<details class="group bg-surface-container-lowest border border-outline-variant rounded-lg p-6 [&amp;_summary::-webkit-details-marker]:hidden">
<summary class="flex items-center justify-between cursor-pointer font-h3 text-h3">
                        How does collaboration work?
                        <span class="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
</summary>
<p class="font-body-md text-body-md text-on-surface-variant mt-4 pt-4 border-t border-outline-variant">
                        Share a secure link with your DP, Director, or AD. You control read/write permissions for specific modules like the shotlist or breakdown.
                    </p>
</details>
</div>
</section>
<!-- Blog / Learn -->
<section class="py-24 bg-surface-container-lowest px-8" id="blog">
<div class="max-w-[1280px] mx-auto">
<div class="flex justify-between items-end mb-12">
<div>
<h2 class="font-h1 text-h1 mb-2">Learn Scenoo</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Master your workflow with our quick guides.</p>
</div>
<a class="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline" href="#">View all <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Card 1 -->
<a class="group block rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-shadow" href="#">
<div class="h-48 bg-surface-container-high relative">
<img alt="Close up of a film script with handwritten notes and a pen" class="w-full h-full object-cover" data-alt="Close up of a film script with handwritten notes and a pen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBlFash7Y8vJxP2fdQl7d1djcp11fXLWVNqAtXubnuHJLG0ixW8hJatBZ78Yd-qfJ_YyqkDjXt1aeVjDr2ubMLcLS96g0Q0FVm7Amj0KIvjIt4ktQT6Ugpv0Es_CSTDbCOHTzbrNlILQ3cuZBykR3DXXI5iJND3MYPPK8-I1yu4Q49co4VvSZdCjEgCOPz93RH7w60vZu8s6bNwHFUnKLc6jSZWhFzStladNKFpn10UlS97AxEGY7sC2SAh-XYr3KvpRXGIWU_SJfP"/>
</div>
<div class="p-6">
<span class="text-primary font-label-sm text-label-sm uppercase tracking-wider mb-2 block">Tutorial</span>
<h3 class="font-h3 text-h3 mb-2 group-hover:text-primary transition-colors">Mastering Split Lines</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Learn how to easily manage overlapping dialogue and complex action sequences in your line script.</p>
</div>
</a>
<!-- Card 2 -->
<a class="group block rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-shadow" href="#">
<div class="h-48 bg-surface-container-high relative">
<img alt="Modern flat screen monitor displaying a complex spreadsheet on a clean desk" class="w-full h-full object-cover" data-alt="Modern flat screen monitor displaying a complex spreadsheet on a clean desk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAybhk138Q3SXltg5S0GZcuNLFd8ON28bRHXewc4slbf2IpzWKlNLnv8e_M9XJMIVoUFnJERLpmSGBNf70FCu94MPV5Ld17T5UmUx-2OSCwqREMr8OmrbYZKQt7nWdcm8Xspx4Ly_OE1CY3j-gXnQR2ne88JIa_hzdK4yIlYJn8aSBkoWWoxY1ENDUJrxeJTb8pPWxIc4YM7SkFkYH3drSW_DcSed9QB0pKoPhC6ruMmRaHY5UspZb61j9PBW6FX71iDswQ_o8pvAI-"/>
</div>
<div class="p-6">
<span class="text-tertiary font-label-sm text-label-sm uppercase tracking-wider mb-2 block">Workflow</span>
<h3 class="font-h3 text-h3 mb-2 group-hover:text-primary transition-colors">Auto-Sync Shotlist</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Discover how tying your shotlist directly to scene numbers keeps your entire production aligned automatically.</p>
</div>
</a>
<!-- Card 3 -->
<a class="group block rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-shadow" href="#">
<div class="h-48 bg-surface-container-high relative">
<img alt="Two people looking at an ipad on a film set with a clapperboard in the foreground" class="w-full h-full object-cover" data-alt="Two people looking at an ipad on a film set with a clapperboard in the foreground" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmxlBc6gHXJxcdHLKF7rCyum57u8ctqQRS5PPavQMmElNZCnB5KuvXiIXYjTo41OfQsRDGzy0Xt5oWdll30YyFvWPbkJLzWgU5LAFJzmXx9sbPltCXvpH2LleQCjNMHTBvVoy_uQKenedg0viHgm8cmxHEKdPYAhpmTUz2iKrdixqY6S3sWl4CLLgGaoCeQg-j3lQ7LulmOB0t7VAuIuCMwC4_4cRT7En0L9YbbGKXtHQrtXGKj_r3q6RimRMNvCoV1qOHGE6xFC8Y"/>
</div>
<div class="p-6">
<span class="text-brand-amber font-label-sm text-label-sm uppercase tracking-wider mb-2 block">Best Practices</span>
<h3 class="font-h3 text-h3 mb-2 group-hover:text-primary transition-colors">DP Collaboration</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Tips for sharing access and iterating on coverage plans with your Director of Photography.</p>
</div>
</a>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="py-24 px-8 max-w-4xl mx-auto text-center">
<h2 class="font-h1 text-h1 mb-6">Ready to streamline your prep?</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Join professionals organizing their shoots with Scenoo.</p>
<button class="bg-brand-amber text-white px-8 py-4 rounded-lg font-h3 text-h3 hover:opacity-90 transition-opacity shadow-sm">
                Start Your Free Trial
            </button>
</section>
</main>
<!-- Footer (Generated from JSON Anchor) -->
<footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 w-full py-12 flat no shadows">
<div class="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
<div class="text-lg font-bold text-gray-900 dark:text-white">Scenoo</div>
<nav class="flex flex-wrap justify-center gap-6 font-sans text-xs text-gray-500 dark:text-gray-400">
<a class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Privacy Policy</a>
<a class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Terms of Service</a>
<a class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Contact Support</a>
<a class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Press Kit</a>
</nav>
<div class="font-sans text-xs text-gray-500 dark:text-gray-400">
                © 2024 FilmPro Production Systems. All rights reserved.
            </div>
</div>
</footer>
</body></html>
</file>

<file path="scenoo_projects_dashboard_light/code.html">
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f9f9ff;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#e1e2ec",
                      "on-tertiary-container": "#fffbff",
                      "surface-dim": "#d8d9e3",
                      "on-secondary-fixed": "#141b2b",
                      "surface-container-highest": "#e1e2ec",
                      "secondary-container": "#d9dff5",
                      "tertiary-fixed-dim": "#ffb786",
                      "primary": "#0058be",
                      "error-container": "#ffdad6",
                      "surface-container-high": "#e6e7f2",
                      "on-primary-fixed-variant": "#004395",
                      "on-tertiary-fixed-variant": "#723600",
                      "outline-variant": "#c2c6d6",
                      "on-surface": "#191b23",
                      "on-primary-fixed": "#001a42",
                      "on-surface-variant": "#424754",
                      "surface-container-lowest": "#ffffff",
                      "surface-bright": "#f9f9ff",
                      "error": "#ba1a1a",
                      "primary-fixed": "#d8e2ff",
                      "primary-fixed-dim": "#adc6ff",
                      "tertiary-container": "#b75b00",
                      "on-primary": "#ffffff",
                      "tertiary-fixed": "#ffdcc6",
                      "on-secondary": "#ffffff",
                      "outline": "#727785",
                      "on-tertiary-fixed": "#311400",
                      "background": "#f9f9ff",
                      "surface-tint": "#005ac2",
                      "secondary-fixed": "#dce2f7",
                      "on-error": "#ffffff",
                      "tertiary": "#924700",
                      "on-background": "#191b23",
                      "on-error-container": "#93000a",
                      "surface": "#f9f9ff",
                      "primary-container": "#2170e4",
                      "inverse-on-surface": "#eff0fa",
                      "on-secondary-fixed-variant": "#404758",
                      "secondary-fixed-dim": "#c0c6db",
                      "inverse-primary": "#adc6ff",
                      "on-tertiary": "#ffffff",
                      "on-primary-container": "#fefcff",
                      "on-secondary-container": "#5c6274",
                      "surface-container": "#ecedf7",
                      "surface-container-low": "#f2f3fd",
                      "secondary": "#575e70",
                      "inverse-surface": "#2e3038"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "md": "16px",
                      "2xl": "48px",
                      "xl": "32px",
                      "max_content_width": "1280px",
                      "lg": "24px",
                      "sm": "8px",
                      "sidebar_width": "260px",
                      "xs": "4px",
                      "base": "4px"
              },
              "fontFamily": {
                      "code": ["Monaco, Courier New"],
                      "body-md": ["Inter"],
                      "display": ["Inter"],
                      "h3": ["Inter"],
                      "h2": ["Inter"],
                      "label-sm": ["Inter"],
                      "label-md": ["Inter"],
                      "body-lg": ["Inter"],
                      "h1": ["Inter"]
              },
              "fontSize": {
                      "code": ["13px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                      "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                      "display": ["30px", {"lineHeight": "38px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "h3": ["16px", {"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "600"}],
                      "h2": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                      "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                      "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "400"}],
                      "h1": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}]
              }
            }
          }
        }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen flex">
<!-- SIDEBAR -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-4 bg-white dark:bg-gray-950 h-full w-64 border-r border-gray-200 dark:border-gray-800 z-50">
<div class="mb-8 px-2">
<h1 class="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Cinematic Utility</h1>
<p class="font-inter text-sm font-medium text-gray-500 dark:text-gray-400">Production Hub</p>
</div>
<nav class="flex-1 space-y-1">
<!-- Active Tab: Projects -->
<a class="flex items-center gap-3 p-3 font-inter text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="folder_open">folder_open</span>
                Projects
            </a>
<a class="flex items-center gap-3 p-3 font-inter text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="video_library">video_library</span>
                Assets
            </a>
<a class="flex items-center gap-3 p-3 font-inter text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
                Crew
            </a>
<a class="flex items-center gap-3 p-3 font-inter text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
                Settings
            </a>
</nav>
<div class="mt-auto flex items-center gap-3 p-2 border-t border-gray-100 dark:border-gray-800 pt-4">
<img alt="User Profile" class="w-10 h-10 rounded-full border border-gray-200" data-alt="professional headshot of a middle-aged creative director in a minimalist studio environment with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7-KT1xsMYfUNFSbzkiQWrkL4ZMNnJ6TRYCEauPfSyvEREMQigKDGFh_mkapi8MLFUL5sHF4PA5wD_6URGObWIpJ-SiHYOspW8sb8BzgVp5SFoL_YRffdeL4YOCo_Y9vwFwRsQl0CW32OTvO_OEFZHAnIxsBveeIYP4nYMZNybn6aHHgwVNR1OXlWYm3tL_F9R5801rTb9b2YqVXe7CUghetI4M7xJ2IPzAuYAltBTGFs2LJxvyu8iXlcW9AlnpOszTLhg4dskwwqf"/>
<div>
<p class="font-inter text-sm font-semibold text-gray-900 dark:text-white">Alex Rivera</p>
<p class="font-inter text-[11px] text-gray-500">Executive Producer</p>
</div>
</div>
</aside>
<!-- MAIN CONTENT -->
<main class="flex-1 ml-64 min-h-screen">
<!-- TOP NAV -->
<header class="flex items-center justify-between w-full h-16 px-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
<div class="flex items-center flex-1 max-w-md">
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" data-icon="search">search</span>
<input class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Search projects..." type="text"/>
</div>
</div>
<nav class="flex items-center gap-8 px-8">
<a class="font-inter text-sm font-semibold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-4 mt-1 transition-all duration-200" href="#">Breakdown</a>
<a class="font-inter text-sm font-semibold text-gray-500 dark:text-gray-400 pb-4 mt-1 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Line Script</a>
<a class="font-inter text-sm font-semibold text-gray-500 dark:text-gray-400 pb-4 mt-1 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Shotlist</a>
</nav>
<div class="flex items-center gap-4">
<button class="p-2 text-gray-500 hover:text-gray-900 transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 text-gray-500 hover:text-gray-900 transition-colors">
<span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
</button>
</div>
</header>
<!-- DASHBOARD CANVAS -->
<div class="p-xl max-w-[1280px] mx-auto">
<div class="flex items-center justify-between mb-lg">
<div>
<h2 class="font-display text-display text-on-surface">Recent Projects</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Managing 12 active productions</p>
</div>
<div class="flex gap-sm">
<button class="px-md py-sm bg-white border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
<button class="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                        New Project
                    </button>
</div>
</div>
<!-- BENTO GRID OF PROJECT CARDS -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
<!-- Card 1 -->
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
<div class="aspect-[16/9] relative overflow-hidden">
<img alt="Neon Nights Production" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="cinematic wide shot of a futuristic neon-lit city street at night with reflections in rain puddles and anamorphic lens flare" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIkeNIQEp_Q5Whama7gV9iEwWJPbpsYxNaNqfAbhPJuj3GtOF7AnZKhGTNvD-zOrHmRZJXoJfpLzuI7NdZG_JJUJ3uKTw7ElTrFco88vn4O4qmjp1DkykNbW8tnWswu61QZXUUhFvZHxlLheuotfWaGPxBwd_QIgGMMrkzlHPotTguWgLGPrVYMRxLgpd-sKcpUVuMn_BJt5ve0liH0Z1pIYsium2Cp76W1_1HUlMr8JZ-jJrBxxsWA01covlTZpgPulNKtHUadJNT"/>
<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
                            01:24:32:00
                        </div>
</div>
<div class="p-4">
<div class="flex items-start justify-between">
<div>
<h3 class="font-h3 text-h3 text-on-surface mb-1">Neon Nights</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Modified Sep 14, 2023</p>
</div>
<span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-on-surface" data-icon="more_vert">more_vert</span>
</div>
<div class="mt-4 flex items-center gap-2">
<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">In Post</span>
<div class="flex -space-x-2 ml-auto">
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="portrait of a young woman with a friendly smile in bright studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACYb_H0ukppjpuT8MgTgrXiMtG4lbslyAYEASjucGWaZrsWfmWtTHEvzRaRJGufETcQ4GZhs6F4o73z0ef4Qc_vt7ENiM20u2_V5hpgcJv814o8OrxzL0PoKf1iavK4pPMbZE22CQkF_jamA9oBpC9hce1zZic-6j9fpmuF84C-qyzBtR6C6c9DHkKoFoYOOY6yjuw32HuLKwoRgF3hTh-9WrhhkxVjLuIL9FTUEEyORZfaaZOWaZilNyrIgEXBgEk6uzrB-fFROL3"/>
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="portrait of a professional man with glasses in soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeBaooUMBPqHCbHm6YdNPYQr1JrOckc1dgwHEYFxHeMFHmwF8iK_oTbMcGJrcbEmbDqujbZqdaqimkWKfcgtRTNmRd38zzxsqtjS2-M2B1w-57vunaF1RwRyzNDSbKuVvX85JQFmWz8W9Fh9fCPhY0_lWUNTo6z8y-1NAumw13l3zyCRfHS9VfqV2-NK5eIfuE680eKCRme1e8BSKW5vAv_DQOcpfbaFnewhqqkuphlW-S5jIeMzlcI8wWIhEnMqEYIcDrWzoh87VX"/>
<div class="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">+3</div>
</div>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
<div class="aspect-[16/9] relative overflow-hidden">
<img alt="Dust &amp; Glory Production" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="wide cinematic desert landscape with rugged mountains and a single dusty trail under a harsh midday sun" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvKDkrRNi2uM5e8r8EthESffzTg4CsFtDfWU6whZ9M6Cx4tzNyJg_voS01zqo0aCN6Nb8dHHPsvV-Y2wafOsFK4V0a8UoDl0NaeobR9bQLafISbl9Sm1g6Ws0r1juDDZZaYm3UZVkIWTODmKmOXFyByyLlT1xBWDm3JeygC8JRWbyd3p4aiYnQgNqGFH9u-yOd2xKCiI8ptJ8MTdNTl8KF65pPSGfMVAlJUmffEHltFMlpa-ecYoLiwqMQ3LoLT17zHv8yvLLZDm4c"/>
<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
                            00:15:08:12
                        </div>
</div>
<div class="p-4">
<div class="flex items-start justify-between">
<div>
<h3 class="font-h3 text-h3 text-on-surface mb-1">Dust &amp; Glory</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Modified Oct 02, 2023</p>
</div>
<span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-on-surface" data-icon="more_vert">more_vert</span>
</div>
<div class="mt-4 flex items-center gap-2">
<span class="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Shooting</span>
<div class="flex -space-x-2 ml-auto">
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="close up of a cheerful man in professional business attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUllMfEVDjT6bfcErH4YbO54PZLYoJRnRiE0hpaPc1ElUZ5fRw7RJ2LWuVEZQ0vl6e5twLemQoQyTBCRMJVL_mGb00SeuFNDQjcvEfOCLK_PNVeWwLS7F2EqdqOBnD3TXpWayvimPmxzfOU2DrsW6K4TdH69vzynMNLAReAwk5pGEGzu-e_x0j8pZKt_w_8fX86OAVMr6YPHZNeSrJFPRaCAehicz_5X9psF5dcqKv_kmEpiliixDXnh4ECsxF5LjL7UQGuJHMZ3_5"/>
<div class="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">+8</div>
</div>
</div>
</div>
</div>
<!-- Card 3 -->
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
<div class="aspect-[16/9] relative overflow-hidden">
<img alt="Shadow Protocol Production" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="moody noir style interior of a dark office with smoke and light streaming through Venetian blinds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSbpC7CkVjJx7wTUQCU03KrIBt-Nb0bhC_D4zmmqISORVV6ypZWPEP_6a_WX9l7syYf4HsMCYUca-FBToWE4j7CHYBlp5vPs6miianZS99oGNd7_ml_sRAe1H0JehiVauYcDS_uoZqZgoRT0wL8j4osXfiDryoJZAjv8GltvuUH4RLiE2jAuVxwFbKWdtZiJOQtENiAiSecKpnNnJcBSWIYjuFrzGOJC3Q5nb8EjFkVGmVw9RTW2g_A-iyypUTtJZvK268WEmnnGv3"/>
<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
                            02:44:11:00
                        </div>
</div>
<div class="p-4">
<div class="flex items-start justify-between">
<div>
<h3 class="font-h3 text-h3 text-on-surface mb-1">Shadow Protocol</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Modified Nov 18, 2023</p>
</div>
<span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-on-surface" data-icon="more_vert">more_vert</span>
</div>
<div class="mt-4 flex items-center gap-2">
<span class="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Ready</span>
<div class="flex -space-x-2 ml-auto">
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="portrait of a focused professional woman in a modern office space" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQRkEi7rHB7jaok0ZtaoBp3q3nJd2Ky9A5r1U-OWakj4ylvLjcjPUaaKX2tYujreVxdPtp3DFw3Wf6xn12FTKnplYu2iOPTwhra8fShucyAJnaK4GiBM1sEJWsnFvDigqBfyLOdXchPKYZde5JT5K8GcF6VGGcdtaE7-nQ0qDLpUM2dnPqYMg2_kZ7Es47YSezI17DF1RVaJCKzMvAfH5U7SgQgoQhnWRCRPThonVLoEYtdt3bWzntglSZ5L7esen--1C-xKkLwiKE"/>
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="portrait of a creative professional with a thoughtful expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmGqxedaHjns2Mg0N-_vzN4EwheJh5cvVKfm15DR_TxQAdTRUG_TAKu15Lh3oZWYCmQu_ul1PQdvYOZQ6GIp7RRa6WS2rTyBSyzI-UZQgVEfbwC-i2YvWgFgNHKu9bXUuAZdIchmF96Ep7LELOG126MXUgdmy9MNkP9o60L80iBDThvXplaUJn48XR1CgptRnarp5-JzT5J5nOl5X1hnDCCD1Am4pZQs73TH82sH1HT0DGXghIcQYTl_L1uGGyaWNFXhF8abdkccyQ"/>
</div>
</div>
</div>
</div>
<!-- Card 4 -->
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
<div class="aspect-[16/9] relative overflow-hidden">
<img alt="The Archive Production" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="minimalist modern architectural space with clean lines, white walls, and soft overhead lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkt7MaN5vJ57elxCgwXTfIE5fLsh2nraPDqQDDNeHT_EIHUfsNbXD3xzrRgCbna8kuxXW_KAjRRdVGMzcOuvngZoF1xi1r6Zm1KKhlJcZ12pa46aL8tlXc-I18y2ltriEtuplAGxMgenwR0LYNE-nikEIaDLaau7Ni-VnvTb7gxE8cY7AkPJedDN1LnIZx3efguKL9FHDKON4wecbQulXpkSBSo8-78jLvU-QbiXGoWyw0U5qsD8of2rE41gt2B7r2DjarEa4KxOah"/>
<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
                            00:45:00:00
                        </div>
</div>
<div class="p-4">
<div class="flex items-start justify-between">
<div>
<h3 class="font-h3 text-h3 text-on-surface mb-1">The Archive</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Modified Dec 01, 2023</p>
</div>
<span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-on-surface" data-icon="more_vert">more_vert</span>
</div>
<div class="mt-4 flex items-center gap-2">
<span class="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pre-Prod</span>
<div class="flex -space-x-2 ml-auto">
<div class="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">JD</div>
</div>
</div>
</div>
</div>
<!-- Card 5 -->
<div class="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300">
<div class="aspect-[16/9] relative overflow-hidden">
<img alt="Urban Pulse Production" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="vibrant urban city square with people blurred in motion and colorful digital billboards in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALozdRGCJd2PtDvpSUJU6uXV6M4h1bAIgFDkgyXbccgh6vw46GVHnI_OgpmPkXTSuXPvkzG6BZFSigBtVGbNpPoWygP6t_9r5Ln9aHRHhfqegXUw10JitqDVQKloRDsI00lDWPHs7ittL9ZgtWIDD9Hw_BvWRDdUImlMYqOiRYyEdUKBAQrXzVuwzfOVNAIps2OFoEIPdRvpk8H1zfdva8s48lKLtPphOOnyVeqaq8JE88vE_Y8_Y5fPSqD62FD5stQ_EAYpxlq0-G"/>
<div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-mono tracking-wider">
                            00:12:15:05
                        </div>
</div>
<div class="p-4">
<div class="flex items-start justify-between">
<div>
<h3 class="font-h3 text-h3 text-on-surface mb-1">Urban Pulse</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Modified Dec 05, 2023</p>
</div>
<span class="material-symbols-outlined text-gray-400 cursor-pointer hover:text-on-surface" data-icon="more_vert">more_vert</span>
</div>
<div class="mt-4 flex items-center gap-2">
<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">In Post</span>
<div class="flex -space-x-2 ml-auto">
<img alt="Team member" class="w-6 h-6 rounded-full border-2 border-white" data-alt="professional portrait of a man in casual attire with a blurred urban backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD834ABduOIrRU0YAQ_m8oWYBhfxrKAKo7EIhfnHXWD4rPRro1hH-rEBrxOcgzyV8ULu_tp-ARLkwK0ROOzHSfSN2aTTNdYYWrTSHcNPkG_ezSa6TOqakvA8gbkNe90L0srJFOE2IT8YnIke4jwqajlAjE1CKRShAism6DY5k98UfSnZ9ELitp0zttEiKjB7iVL_Q6YnTsA-iGFPn7BS_mYwsGCGwxfAwa8jgj-5apdIh-OWrUJPvzoPPHipTZJaLfOSu16iQ1WdjJY"/>
</div>
</div>
</div>
</div>
<!-- New Project Placeholder -->
<div class="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-gray-50 hover:border-blue-300 transition-all cursor-pointer group">
<div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
<span class="material-symbols-outlined text-gray-400 group-hover:text-blue-500 transition-colors" data-icon="add_circle">add_circle</span>
</div>
<p class="font-h3 text-h3 text-gray-500 group-hover:text-blue-600">Start New Production</p>
<p class="font-body-md text-body-md text-gray-400 mt-1">Upload script or assets to begin</p>
</div>
</div>
</div>
</main>
<!-- FLOATING ACTION BUTTON -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-[28px]" data-icon="movie">movie</span>
</button>
</body></html>
</file>

<file path="scenoo_script_breakdown_light/code.html">
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                "surface-variant": "#e1e2ec",
                "on-tertiary-container": "#fffbff",
                "surface-dim": "#d8d9e3",
                "on-secondary-fixed": "#141b2b",
                "surface-container-highest": "#e1e2ec",
                "secondary-container": "#d9dff5",
                "tertiary-fixed-dim": "#ffb786",
                "primary": "#0058be",
                "error-container": "#ffdad6",
                "surface-container-high": "#e6e7f2",
                "on-primary-fixed-variant": "#004395",
                "on-tertiary-fixed-variant": "#723600",
                "outline-variant": "#c2c6d6",
                "on-surface": "#191b23",
                "on-primary-fixed": "#001a42",
                "on-surface-variant": "#424754",
                "surface-container-lowest": "#ffffff",
                "surface-bright": "#f9f9ff",
                "error": "#ba1a1a",
                "primary-fixed": "#d8e2ff",
                "primary-fixed-dim": "#adc6ff",
                "tertiary-container": "#b75b00",
                "on-primary": "#ffffff",
                "tertiary-fixed": "#ffdcc6",
                "on-secondary": "#ffffff",
                "outline": "#727785",
                "on-tertiary-fixed": "#311400",
                "background": "#f9f9ff",
                "surface-tint": "#005ac2",
                "secondary-fixed": "#dce2f7",
                "on-error": "#ffffff",
                "tertiary": "#924700",
                "on-background": "#191b23",
                "on-error-container": "#93000a",
                "surface": "#f9f9ff",
                "primary-container": "#2170e4",
                "inverse-on-surface": "#eff0fa",
                "on-secondary-fixed-variant": "#404758",
                "secondary-fixed-dim": "#c0c6db",
                "inverse-primary": "#adc6ff",
                "on-tertiary": "#ffffff",
                "on-primary-container": "#fefcff",
                "on-secondary-container": "#5c6274",
                "surface-container": "#ecedf7",
                "surface-container-low": "#f2f3fd",
                "secondary": "#575e70",
                "inverse-surface": "#2e3038",
                "tag-cast": "#FF0000",
                "tag-props": "#8B00FF",
                "tag-wardrobe": "#00BFFF",
                "tag-sfx": "#0066CC",
                "tag-makeup": "#FF6600",
                "tag-sound": "#8B4513",
                "tag-stunts": "#FF8C00",
                "tag-extras-atm": "#228B22",
                "tag-extras-sil": "#FFD700",
                "tag-vehicles": "#FF69B4",
                "tag-equipment": "#C8950A",
                "tag-notes": "#555555"
            },
            "fontFamily": {
                "code": ["Monaco", "Courier New", "monospace"],
                "body-md": ["Inter", "sans-serif"],
                "display": ["Inter", "sans-serif"],
                "h3": ["Inter", "sans-serif"],
                "h2": ["Inter", "sans-serif"],
                "label-sm": ["Inter", "sans-serif"],
                "label-md": ["Inter", "sans-serif"],
                "body-lg": ["Inter", "sans-serif"],
                "h1": ["Inter", "sans-serif"]
            }
          }
        }
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .script-paper {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-background font-body-md text-on-background antialiased flex h-screen overflow-hidden">
<!-- Sidebar: 70px Fixed Width -->
<aside class="w-[70px] bg-surface border-r border-outline-variant flex flex-col items-center py-6 gap-8 z-50">
<div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">movie_edit</span>
</div>
<nav class="flex flex-col gap-4">
<button class="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-fixed text-primary" title="Projects">
<span class="material-symbols-outlined">folder_open</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container transition-colors" title="Assets">
<span class="material-symbols-outlined">video_library</span>
</button>
<button class="w-12 h-12 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container transition-colors" title="Crew">
<span class="material-symbols-outlined">groups</span>
</button>
<div class="h-px w-8 bg-outline-variant my-2"></div>
<button class="w-12 h-12 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container transition-colors" title="Settings">
<span class="material-symbols-outlined">settings</span>
</button>
</nav>
<div class="mt-auto">
<img alt="User Profile" class="w-10 h-10 rounded-full border-2 border-surface-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoMRE8k1bKq8AsW_kwGR-P-TuW1GxWuqcW0-lfTWbXRUx97E5jG4sP4mNUpS1NBFBWjpKkLMvLy274iLfMrotw1z7zIIf89PEmwf1eiib4-yPnfhctDhUyeFtNKEiy8ED8kW8BfBHgeyF7scXpd2nYf35d-2iEOO0zcR3FPOYowCMT9epqBXO0Ab5_1oMytd3HWAAVRqls2tWBH6w_G1ru7EJnlgvo0NjAVD7vc5EGE1-vtOX6-GhEH4pl-pfBVpo4aZ0Ijw0ItWaz"/>
</div>
</aside>
<div class="flex-1 flex flex-col overflow-hidden">
<!-- TopNavBar -->
<header class="h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-8 shrink-0">
<div class="flex items-center gap-8">
<h1 class="font-h2 text-h2 tracking-tight text-on-surface">Production Dashboard</h1>
<nav class="flex gap-6 h-full items-center pt-1">
<a class="font-label-md text-label-md text-primary border-b-2 border-primary h-16 flex items-center mt-1" href="#">Breakdown</a>
<a class="font-label-md text-label-md text-secondary hover:text-on-surface h-16 flex items-center mt-1" href="#">Line Script</a>
<a class="font-label-md text-label-md text-secondary hover:text-on-surface h-16 flex items-center mt-1" href="#">Shotlist</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<span class="absolute left-3 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[20px]">search</span>
<input class="bg-surface-container-low border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64" placeholder="Search scenes..." type="text"/>
</div>
<button class="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-2 text-secondary hover:bg-surface-container rounded-full transition-colors">
<span class="material-symbols-outlined">help_outline</span>
</button>
</div>
</header>
<!-- Main Workspace Area -->
<main class="flex-1 flex overflow-hidden">
<!-- Left Scene List Panel -->
<aside class="w-72 bg-surface border-r border-outline-variant flex flex-col shrink-0">
<div class="p-4 border-b border-outline-variant flex justify-between items-center">
<span class="font-h3 text-h3">Scene List</span>
<span class="text-label-sm px-2 py-0.5 bg-surface-container-highest rounded text-on-surface-variant">42 Scenes</span>
</div>
<div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
<div class="p-3 rounded-lg bg-primary-container/10 border border-primary/20">
<div class="flex justify-between items-start mb-1">
<span class="text-label-sm text-primary font-bold">SCENE 01</span>
<span class="text-[10px] uppercase font-bold text-outline">INT. DAY</span>
</div>
<p class="font-body-md text-on-surface leading-snug">Apartment - Living Room</p>
<div class="mt-2 flex gap-2">
<span class="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded">3 Cast</span>
<span class="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">2 Props</span>
</div>
</div>
<div class="p-3 rounded-lg hover:bg-surface-container transition-colors border border-transparent">
<div class="flex justify-between items-start mb-1">
<span class="text-label-sm text-secondary font-bold">SCENE 02</span>
<span class="text-[10px] uppercase font-bold text-outline">EXT. NIGHT</span>
</div>
<p class="font-body-md text-secondary leading-snug">Subway Platform - Rain</p>
</div>
<div class="p-3 rounded-lg hover:bg-surface-container transition-colors border border-transparent">
<div class="flex justify-between items-start mb-1">
<span class="text-label-sm text-secondary font-bold">SCENE 03</span>
<span class="text-[10px] uppercase font-bold text-outline">INT. NIGHT</span>
</div>
<p class="font-body-md text-secondary leading-snug">Underground Lab</p>
</div>
</div>
</aside>
<!-- Script Content Area -->
<section class="flex-1 bg-background overflow-y-auto p-12 custom-scrollbar flex flex-col items-center">
<div class="script-paper w-full max-w-[800px] bg-white min-h-[1056px] p-[80px] font-code text-[14px] leading-relaxed relative mb-20">
<div class="absolute top-8 right-12 text-outline-variant select-none">PAGE 1</div>
<div class="mb-8">
<p class="uppercase font-bold">INT. APARTMENT - DAY</p>
</div>
<div class="mb-6 ml-[15%] mr-[15%]">
                        The room is cluttered with film equipment. Sun streaks through the blinds, illuminating dust motes dancing in the air.
                    </div>
<div class="mb-4 text-center">
<p class="uppercase">MARK</p>
</div>
<div class="mb-6 ml-[25%] mr-[25%]">
                        We don't have enough time. The <span class="bg-purple-100 text-[#8B00FF] px-1 border-b-2 border-[#8B00FF]">ANCIENT COMPASS</span> is missing, and the <span class="bg-red-100 text-[#FF0000] px-1 border-b-2 border-[#FF0000]">DIRECTOR</span> is going to kill us.
                    </div>
<div class="mb-4 text-center">
<p class="uppercase">SARAH</p>
</div>
<div class="mb-6 ml-[25%] mr-[25%]">
                        Check the equipment locker. I heard a <span class="bg-blue-100 text-[#0066CC] px-1 border-b-2 border-[#0066CC]">LOUD METALLIC CLANG</span> coming from there earlier.
                    </div>
<div class="mb-6 ml-[15%] mr-[15%]">
                        Sarah picks up a <span class="bg-purple-100 text-[#8B00FF] px-1 border-b-2 border-[#8B00FF]">POLAROID CAMERA</span> and snaps a photo of the empty desk.
                    </div>
<div class="mt-12 border-t border-dashed border-outline-variant pt-8 flex justify-center">
<button class="flex items-center gap-2 text-primary font-label-md hover:underline">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
                            Add Scene Break
                        </button>
</div>
</div>
</section>
<!-- Right Sidebar: Comprehensive Scene Breakdown -->
<aside class="w-80 bg-surface border-l border-outline-variant flex flex-col shrink-0">
<div class="p-6 border-b border-outline-variant shrink-0">
<h2 class="font-h3 text-h3 mb-1">Scene Breakdown</h2>
<p class="text-label-sm text-outline">Editing Scene 01 Elements</p>
</div>
<div class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
<!-- Cast Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-cast flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">person</span>
                                Cast
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 flex flex-wrap gap-2">
<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-tag-cast border border-red-100 rounded-full text-[11px] font-medium">
                                MARK <button class="material-symbols-outlined text-[12px]">close</button>
</span>
<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-tag-cast border border-red-100 rounded-full text-[11px] font-medium">
                                SARAH <button class="material-symbols-outlined text-[12px]">close</button>
</span>
<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-tag-cast border border-red-100 rounded-full text-[11px] font-medium">
                                DIRECTOR <button class="material-symbols-outlined text-[12px]">close</button>
</span>
</div>
</div>
<!-- Props Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-props flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">inventory_2</span>
                                Props
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 space-y-2">
<div class="flex items-center justify-between p-2 bg-purple-50/50 rounded-lg border border-purple-100">
<span class="text-label-sm text-tag-props font-medium">Ancient Compass</span>
<span class="text-[9px] px-1.5 bg-tag-props/10 text-tag-props rounded font-bold">HERO</span>
</div>
<div class="flex items-center justify-between p-2 bg-purple-50/50 rounded-lg border border-purple-100">
<span class="text-label-sm text-tag-props font-medium">Polaroid Camera</span>
<span class="text-[9px] px-1.5 bg-tag-props/10 text-tag-props rounded font-bold">WORKING</span>
</div>
</div>
</div>
<!-- Wardrobe Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-wardrobe flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">checkroom</span>
                                Wardrobe
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- SFX Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-sfx flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">volume_up</span>
                                SFX
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3">
<div class="p-2 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
<span class="text-label-sm text-tag-sfx font-medium">Metallic Clang</span>
<span class="material-symbols-outlined text-[16px] text-tag-sfx/50">edit</span>
</div>
</div>
</div>
<!-- Makeup Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-makeup flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">face</span>
                                Makeup
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Sound Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-sound flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">mic</span>
                                Sound
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Stunts Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-stunts flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">directions_run</span>
                                Stunts
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Extras Atmosphere Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-extras-atm flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">groups</span>
                                Extras Atmosphere
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Extras Silent Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-extras-sil flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">person_off</span>
                                Extras Silent
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Vehicles Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-vehicles flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">directions_car</span>
                                Vehicles
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Equipment Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-equipment flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">videocam</span>
                                Equipment
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
<!-- Notes Group -->
<div class="border border-outline-variant rounded-lg overflow-hidden">
<div class="flex items-center justify-between p-3 bg-surface-container-low border-b border-outline-variant">
<h3 class="font-label-md text-tag-notes flex items-center gap-2 uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-[18px]">sticky_note_2</span>
                                Notes
                            </h3>
<button class="text-outline hover:text-primary"><span class="material-symbols-outlined text-[18px]">add</span></button>
</div>
<div class="p-3 text-center text-outline text-label-sm py-4">No tags</div>
</div>
</div>
<div class="p-6 bg-surface border-t border-outline-variant space-y-3 shrink-0">
<button class="w-full bg-primary text-white font-label-md py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[20px]">save</span>
                        Save Breakdown
                    </button>
<button class="w-full bg-white border border-outline-variant text-on-surface font-label-md py-3 rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[20px]">ios_share</span>
                        Export Scene
                    </button>
</div>
</aside>
</main>
</div>
<!-- Floating Tool: Updated Element Tagging Menu -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md border border-outline-variant shadow-2xl rounded-2xl flex p-2 gap-0.5 items-center z-[100] max-w-[95vw] overflow-x-auto no-scrollbar">
<div class="px-3 border-r border-outline-variant mr-1 shrink-0">
<span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Tag Selection</span>
</div>
<div class="flex items-center gap-0.5">
<!-- Cast -->
<button class="px-2 py-1.5 hover:bg-red-50 text-tag-cast rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="text-[8px] uppercase font-bold">Cast</span>
</button>
<!-- Props -->
<button class="px-2 py-1.5 hover:bg-purple-50 text-tag-props rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="text-[8px] uppercase font-bold">Prop</span>
</button>
<!-- Wardrobe -->
<button class="px-2 py-1.5 hover:bg-cyan-50 text-tag-wardrobe rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">checkroom</span>
<span class="text-[8px] uppercase font-bold">Wardrobe</span>
</button>
<!-- SFX -->
<button class="px-2 py-1.5 hover:bg-blue-50 text-tag-sfx rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">volume_up</span>
<span class="text-[8px] uppercase font-bold">SFX</span>
</button>
<!-- Makeup -->
<button class="px-2 py-1.5 hover:bg-orange-50 text-tag-makeup rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">face</span>
<span class="text-[8px] uppercase font-bold">Makeup</span>
</button>
<!-- Sound -->
<button class="px-2 py-1.5 hover:bg-[rgba(139,69,19,0.1)] text-tag-sound rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">mic</span>
<span class="text-[8px] uppercase font-bold">Sound</span>
</button>
<!-- Stunts -->
<button class="px-2 py-1.5 hover:bg-orange-50 text-tag-stunts rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">directions_run</span>
<span class="text-[8px] uppercase font-bold">Stunts</span>
</button>
<!-- Extras Atm -->
<button class="px-2 py-1.5 hover:bg-green-50 text-tag-extras-atm rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">groups</span>
<span class="text-[8px] uppercase font-bold">Atm</span>
</button>
<!-- Extras Sil -->
<button class="px-2 py-1.5 hover:bg-yellow-50 text-tag-extras-sil rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">person_off</span>
<span class="text-[8px] uppercase font-bold">Silent</span>
</button>
<!-- Vehicles -->
<button class="px-2 py-1.5 hover:bg-pink-50 text-tag-vehicles rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">directions_car</span>
<span class="text-[8px] uppercase font-bold">Vehic</span>
</button>
<!-- Equipment -->
<button class="px-2 py-1.5 hover:bg-[rgba(200,149,10,0.1)] text-tag-equipment rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">videocam</span>
<span class="text-[8px] uppercase font-bold">Equip</span>
</button>
<!-- Notes -->
<button class="px-2 py-1.5 hover:bg-gray-50 text-tag-notes rounded-lg flex flex-col items-center transition-colors group shrink-0">
<span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">sticky_note_2</span>
<span class="text-[8px] uppercase font-bold">Note</span>
</button>
</div>
<div class="h-8 w-px bg-outline-variant mx-1 shrink-0"></div>
<button class="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface shrink-0">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</body></html>
</file>

</files>
