# scenoo_line_script_light-code
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