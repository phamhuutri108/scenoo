# scenoo_18_column_shotlist_light-code
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