# scenoo_script_breakdown_light-code
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