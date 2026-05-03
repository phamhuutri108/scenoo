# scenoo_projects_dashboard_light-code
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