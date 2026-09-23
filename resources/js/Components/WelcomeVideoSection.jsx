import React from 'react';
import { Link } from '@inertiajs/react';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function WelcomeVideoSection() {
    return (
        <section className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden border-b border-slate-200/80 dark:border-zinc-900">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#dd3c34]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-content relative z-10 mb-8 sm:mb-12 text-center">
                {/* Corporate Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dd3c34]/10 border border-[#dd3c34]/25 text-[#dd3c34] dark:text-[#ff6b6b] font-mono text-xs tracking-wider uppercase font-semibold mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                    <span>8,000 SQ. FT. ADVANCED MANUFACTURING FACILITY &bull; PATPARGANJ NEW DELHI</span>
                </div>

                <div className="max-w-4xl mx-auto">
                    <AnimatedHeading
                        as="h2"
                        delay={40}
                        highlightPhrase="System Infra Solutions"
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight text-center"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] via-[#f43f5e] to-[#ea580c] dark:from-[#ff6b6b] dark:via-[#f43f5e] dark:to-[#fb923c] bg-clip-text text-transparent animate-text-sheen font-extrabold"
                    >
                        Welcome to System Infra Solutions
                    </AnimatedHeading>
                </div>

                <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-sans text-center">
                    Empowering India’s premier telecom towers, power grids, and tactical defence corridors with automated AMF panels, SYS-AXS centralized NOC telemetry, and rugged 5G edge enclosures.
                </p>
            </div>

            {/* Showcase Grid of Delhi Manufacturing Facility & R&D Labs */}
            <div className="container-content relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 shadow-md hover:border-[#dd3c34]/50 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                        <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                            <img 
                                src="/img/slider/1-2.jpg" 
                                alt="SYSINFRA Manufacturing Facility Delhi" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-mono font-semibold text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider">Delhi Manufacturing Plant</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">8,000 Sq. Ft. International Facility</h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">Equipped with component mounting, thermal testing benches, and automated QA laboratories in Patparganj Industrial Area.</p>
                        </div>
                    </div>

                    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 shadow-md hover:border-[#dd3c34]/50 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                        <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                            <img 
                                src="/img/slider/1-3.jpg" 
                                alt="SYS-AXS NOC Automation" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-mono font-semibold text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider">NOC & IoT Automation</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">SYS-AXS Centralized Telemetry</h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">Real-time tower telemetry, fuel tank ultrasonic monitoring, and anti-theft sensors active on 10,000+ sites nationwide.</p>
                        </div>
                    </div>

                    <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 shadow-md hover:border-[#dd3c34]/50 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
                        <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                            <img 
                                src="/img/slider/1-1.jpg" 
                                alt="AMF Panels & Power Conditioning" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-mono font-semibold text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider">Power Engineering</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">3,00,000+ Modules Reconditioned</h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">Over 70,000 telecom sites automated with high-efficiency AMF controllers, saving millions in diesel fuel run-hours.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/about-us"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#dd3c34] hover:bg-[#c9322b] text-white font-semibold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 hover:-translate-y-0.5 transition-all duration-300 font-mono"
                    >
                        <span>Learn More About Our Infrastructure</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
