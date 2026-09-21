<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $item->name }} — Technical Specification Datasheet | System Infra Solutions</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        navy: {
                            DEFAULT: '#12151b',
                            dark: '#0a0d14',
                            surface: '#161a23',
                            border: '#282f3e',
                        },
                        beacon: {
                            DEFAULT: '#f59e0b',
                            dim: '#d97706',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                background-color: #ffffff !important;
                color: #0f172a !important;
                font-size: 11pt;
            }
            .page-break {
                page-break-after: always;
            }
            .avoid-break {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            @page {
                size: A4 portrait;
                margin: 12mm 14mm;
            }
            a {
                text-decoration: none !important;
                color: inherit !important;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    </style>
</head>
<body class="bg-slate-100 text-slate-800 antialiased min-h-screen">

    <!-- Top Action Toolbar (Hidden during printing / PDF generation) -->
    <aside aria-label="Datasheet Actions" class="no-print sticky top-0 z-50 bg-[#12151b] text-white border-b border-white/10 shadow-xl px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
            <a href="javascript:window.close();" class="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
                <span>&larr;</span> Close / Back
            </a>
            <span class="text-slate-600">|</span>
            <span class="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Technical Datasheet &bull; {{ $item->name }}
            </span>
        </div>

        <div class="flex items-center gap-3">
            <span class="hidden md:inline-block text-xs font-mono text-slate-400">
                To save PDF: Select "Save as PDF" in print dialog
            </span>
            <button 
                onclick="window.print()" 
                class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-mono font-bold text-xs uppercase tracking-wider px-4 py-2 rounded shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print / Save as PDF
            </button>
        </div>
    </aside>

    <!-- Main Printable Datasheet Canvas (A4 Dimensions on Paper) -->
    <main class="max-w-[850px] mx-auto my-6 sm:my-10 bg-white border border-slate-300 shadow-2xl p-8 sm:p-12 print:my-0 print:border-none print:shadow-none print:p-0">
        
        <!-- Header: Corporate Identity & Compliance Watermark -->
        <header class="border-b-2 border-slate-900 pb-6 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3.5">
                    <img 
                        src="/storage/media/branding/logo-emblem.svg" 
                        alt="System Infra Solutions" 
                        class="h-12 w-auto object-contain"
                        onerror="this.onerror=null; this.src='/storage/media/branding/logo0.png';"
                    >
                    <div>
                        <h1 class="text-lg font-black tracking-tight text-slate-900 font-sans uppercase">SYSINFRA TELESYSTEMS LIMITED</h1>
                        <p class="text-[10px] font-mono tracking-widest text-slate-600 uppercase font-semibold">Mission-Critical Wireless Communications &bull; Estd. 2002</p>
                    </div>
                </div>

                <div class="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <span class="inline-block bg-slate-900 text-sky-400 text-[9px] font-mono uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                        TECHNICAL SPECIFICATION SHEET
                    </span>
                    <div class="text-[10px] font-mono text-slate-600 mt-1">
                        DOC-REF: STS-SPEC-{{ strtoupper(substr(md5($item->slug), 0, 8)) }}
                    </div>
                    <div class="text-[10px] font-mono text-slate-600">
                        Date: {{ date('F Y') }} | Rev 2.4
                    </div>
                </div>
            </div>

            <!-- Regulatory Credentials Bar -->
            <div class="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-600 gap-2">
                <span class="flex items-center gap-1.5 font-semibold text-slate-800">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Govt. of India WPC & TEC Approved Supplier
                </span>
                <span>ISO 9001:2015 Certified</span>
                <span>GeM Registered OEM</span>
                <span>MIL-STD-810 Ruggedization</span>
            </div>
        </header>

        <!-- Product Identity Hero Banner -->
        <section class="grid sm:grid-cols-12 gap-6 items-start pb-8 border-b border-slate-200">
            <!-- Product Information -->
            <div class="sm:col-span-8 space-y-3">
                <div class="flex items-center gap-2">
                    @if($category)
                        <span class="text-[11px] font-mono uppercase tracking-wider font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                            {{ $category->name }}
                        </span>
                    @endif
                    @if($subcategory)
                        <span class="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            {{ $subcategory->name }}
                        </span>
                    @endif
                </div>

                <h2 class="text-3xl font-black text-slate-900 tracking-tight font-sans">
                    {{ $item->name }}
                </h2>

                @if($item->model_number)
                    <div class="inline-block text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded border border-slate-300">
                        MODEL NUMBER: {{ $item->model_number }}
                    </div>
                @endif

                <p class="text-xs text-slate-700 leading-relaxed font-sans pt-1">
                    {{ $item->short_description ?: 'Engineered for extreme mission-critical reliability, demanding tactical duty cycles, and seamless voice/data interoperability across enterprise, public safety, and defense applications.' }}
                </p>

                <!-- Core Telemetry Highlights -->
                <div class="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-slate-600 block text-[10px]">OPERATIONAL FREQUENCY</span>
                        <span class="font-bold text-slate-900">VHF / UHF / Broadband PoC</span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-slate-600 block text-[10px]">INGRESS & DURABILITY</span>
                        <span class="font-bold text-slate-900">IP67 Submersible / MIL-810G</span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-slate-600 block text-[10px]">STANDARDS COMPLIANCE</span>
                        <span class="font-bold text-slate-900">WPC ETA & GeM Certified</span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-slate-600 block text-[10px]">WARRANTY & SUPPORT</span>
                        <span class="font-bold text-slate-900">24 Mo OEM Comprehensive</span>
                    </div>
                </div>
            </div>

            <!-- Product High-Res Photo -->
            <div class="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                <img 
                    src="/storage/{{ $item->cover_image_path }}" 
                    alt="{{ $item->name }}"
                    class="max-h-52 w-auto object-contain mx-auto mix-blend-multiply"
                    onerror="this.onerror=null; this.src='/storage/media/branding/logo0.png';"
                >
                <span class="text-[9px] font-mono text-slate-600 mt-2 uppercase tracking-wider text-center">
                    Authorized Industrial Unit
                </span>
            </div>
        </section>

        <!-- Technical Specification Matrix Table -->
        <section class="mt-6">
            <div class="flex items-center justify-between mb-3 border-b border-slate-900 pb-1.5">
                <h3 class="text-sm font-black font-mono uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                    TECHNICAL SPECIFICATIONS & PARAMETERS
                </h3>
                <span class="text-[10px] font-mono text-slate-600">
                    Standard Test Conditions: 25°C @ 50Ω RF Load
                </span>
            </div>

            <div class="border border-slate-300 rounded-lg overflow-hidden text-xs">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider">
                            <th class="py-2 px-3 w-2/5 border-r border-slate-800">Parameter / Technical Attribute</th>
                            <th class="py-2 px-3 w-3/5">Verified Hardware Specification</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        @if(!empty($item->specifications) && is_array($item->specifications))
                            @foreach($item->specifications as $index => $spec)
                                <tr class="{{ $index % 2 === 0 ? 'bg-white' : 'bg-slate-50' }}">
                                    <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200 align-top">
                                        {{ $spec['label'] ?? 'Parameter' }}
                                    </td>
                                    <td class="py-2 px-3 text-slate-700 font-sans text-[11px] leading-relaxed align-top">
                                        {{ $spec['value'] ?? 'Verified Factory Spec' }}
                                    </td>
                                </tr>
                            @endforeach
                        @else
                            <tr class="bg-white">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Operating Frequency Range</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">VHF: 136–174 MHz / UHF: 400–470 MHz / Broadband LTE</td>
                            </tr>
                            <tr class="bg-slate-50">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Channel Capacity / Spacing</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">1024 Channels / 12.5 kHz &bull; 20 kHz &bull; 25 kHz Selectable</td>
                            </tr>
                            <tr class="bg-white">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">RF Output Power</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">High: 5W / Mid: 2.5W / Low: 1W (Software Programmable)</td>
                            </tr>
                            <tr class="bg-slate-50">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Ingress Protection Rating</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">IP67 Dust-tight and Submersible in water up to 1 meter (30 min)</td>
                            </tr>
                            <tr class="bg-white">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Environmental Ruggedization</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">MIL-STD-810 C, D, E, F, G (Vibration, Mechanical Shock, Thermal Shock, Dust, Rain)</td>
                            </tr>
                            <tr class="bg-slate-50">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Audio Output & Noise Cancellation</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">1000 mW Loud Speaker with Active DSP Ambient Noise Reduction (ANR)</td>
                            </tr>
                            <tr class="bg-white">
                                <td class="py-2 px-3 font-semibold text-slate-900 font-mono text-[11px] border-r border-slate-200">Battery Operating Life</td>
                                <td class="py-2 px-3 text-slate-700 text-[11px]">≥ 18 Hours (5-5-90 Duty Cycle with Standard 2600 mAh Li-ion Pack)</td>
                            </tr>
                        @endif
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Compliance, Quality & Standard Package Grid -->
        <section class="mt-6 grid sm:grid-cols-2 gap-4 avoid-break">
            <!-- Box 1: Compliance & Regulatory -->
            <div class="p-4 rounded-lg border border-slate-300 bg-slate-50 space-y-2">
                <h4 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    REGULATORY & STATUTORY COMPLIANCE
                </h4>
                <ul class="text-[11px] text-slate-700 space-y-1 font-sans">
                    <li>&bull; <strong>WPC Approval:</strong> Type approved by WPC Wing, Ministry of Communications, Govt. of India.</li>
                    <li>&bull; <strong>GeM Registry:</strong> Eligible for direct procurement via Government e-Marketplace.</li>
                    <li>&bull; <strong>Security & Encryption:</strong> Built-in AES-256 / DES voice & data cryptographic options.</li>
                    <li>&bull; <strong>Tactical Telemetry:</strong> Integrated GPS / GLONASS positioning and emergency lone worker / man-down sensor.</li>
                </ul>
            </div>

            <!-- Box 2: Standard Box Inclusions -->
            <div class="p-4 rounded-lg border border-slate-300 bg-slate-50 space-y-2">
                <h4 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    STANDARD SHIPMENT PACKAGE INCLUSIONS
                </h4>
                <ul class="text-[11px] text-slate-700 space-y-1 font-sans">
                    <li>&bull; Main Transceiver / Industrial Radio Terminal</li>
                    <li>&bull; High-Gain Helical Tuned RF Antenna</li>
                    <li>&bull; Heavy-Duty Li-Ion High-Capacity Rechargeable Battery</li>
                    <li>&bull; Microprocessor-Controlled Rapid Desktop Charging Cradle</li>
                    <li>&bull; Heavy-Duty Spring Loaded Swivel Belt Clip & Lanyard</li>
                    <li>&bull; Factory Calibration Certificate & Comprehensive User Manual</li>
                </ul>
            </div>
        </section>

        <!-- Official Sign-off & Corporate Footer -->
        <footer class="mt-8 pt-6 border-t-2 border-slate-900 avoid-break text-xs font-mono">
            <div class="grid sm:grid-cols-3 gap-4 text-slate-700">
                <div>
                    <strong class="block text-slate-900 uppercase font-sans text-xs">HEADQUARTERS & DESK:</strong>
                    <p class="text-[10px] leading-relaxed mt-1">
                        System Infra Solutions Pvt. Ltd.<br>
                        204, Ansal Bhawan, 16 K.G. Marg<br>
                        Connaught Place, New Delhi - 110001, India
                    </p>
                </div>
                <div>
                    <strong class="block text-slate-900 uppercase font-sans text-xs">DIRECT CONTACT:</strong>
                    <p class="text-[10px] leading-relaxed mt-1">
                        Phone: +91 (11) 2331-5000 / 2331-5001<br>
                        Tenders: sales@sysinfra.in<br>
                        Support: support@sysinfra.in
                    </p>
                </div>
                <div>
                    <strong class="block text-slate-900 uppercase font-sans text-xs">AUTHENTICATION:</strong>
                    <p class="text-[10px] leading-relaxed mt-1">
                        Portal: www.sysinfra.in<br>
                        Authorized OEM Supplier & Integrator<br>
                        Document Generated: {{ date('d-m-Y H:i') }} IST
                    </p>
                </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-200 text-[9px] text-slate-600 text-center leading-relaxed">
                &copy; {{ date('Y') }} System Infra Solutions Pvt. Ltd.. All rights reserved. System Infra and its logo are registered trademarks. Product specifications and features are subject to continuous technical enhancement without prior notice.
            </div>
        </footer>

    </main>

    <!-- Auto-Print Trigger Script when ?print=1 is requested -->
    <script>
        if (new URLSearchParams(window.location.search).get('print') === '1') {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    window.print();
                }, 400);
            });
        }
    </script>
</body>
</html>
