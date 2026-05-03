# scenoo_professional_marketing_landing_page-code
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