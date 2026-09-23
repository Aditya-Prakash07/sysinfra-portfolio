<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>
            (function() {
                var theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                }
            })();
        </script>
        <meta name="theme-color" content="#ffffff">

        <!-- Localized Search Engine Geo Metadata -->
        <meta name="geo.region" content="IN-DL">
        <meta name="geo.placename" content="New Delhi">
        <meta name="geo.position" content="28.5355;77.2711">
        <meta name="ICBM" content="28.5355, 77.2711">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

        <title inertia>{{ config('app.name', 'System Infra Solutions') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="icon" type="image/png" href="/img/mobile-logo.png">
        <link rel="apple-touch-icon" href="/img/mobile-logo.png">

        <!-- Pre-rendered JSON-LD Organization Schema for Google Search -->
        @verbatim
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "System Infra Solutions Pvt. Ltd.",
            "alternateName": "SISPL",
            "url": "https://www.sysinfra.in",
            "logo": "https://www.sysinfra.in/img/logo.png",
            "description": "ISO-certified manufacturer of AMF controllers, SYS-AXS NOC telemetry platforms, 5G smart enclosures, and tactical Motorola Solutions communications across India.",
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": "+91-011-35004142",
                    "contactType": "sales",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                },
                {
                    "@type": "ContactPoint",
                    "telephone": "+91-011-35004143",
                    "contactType": "customer support",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                }
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plot No. 382, Third Floor, F.I.E., Patparganj Industrial Area",
                "addressLocality": "New Delhi",
                "postalCode": "110092",
                "addressCountry": "IN"
            },
            "sameAs": [
                "https://www.linkedin.com/company/system-infra-solutions"
            ]
        }
        </script>
        @endverbatim

        <!-- Theme Flash Prevention -->
        <script>
            try {
                var saved = localStorage.getItem('theme');
                if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                } else if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                }
            } catch (e) {}
        </script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-slate-50 dark:bg-[#000000] text-slate-900 dark:text-paper">
        @inertia
    </body>
</html>
