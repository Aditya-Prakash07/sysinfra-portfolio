import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function WelcomeVideoSection() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    // Synchronize mute state
    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const originalVideoSrc = '/storage/media/video/STL_Intro_2_720p.mp4';

    return (
        <section className="py-14 sm:py-18 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-blue-500/5 dark:bg-beacon/5 rounded-full blur-3xl pointer-events-none" />

            {/* =========================================================================
                1. CENTERED NARRATIVE HEADER (LIGHT/DARK THEME WITH SMOOTH SUBHEADING REVEAL)
            ========================================================================= */}
            <div className="container-content relative z-10 mb-6 sm:mb-8 text-center">
                {/* Tactical Corporate Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-beacon/10 border border-blue-500/25 dark:border-beacon/25 text-blue-700 dark:text-beacon font-mono text-xs tracking-wider uppercase font-semibold mb-3 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon animate-pulse" />
                    <span>CORPORATE OVERVIEW &bull; NEW DELHI HQ</span>
                </div>

                {/* Subheading Animated with earlier deployment word reveal */}
                <div className="max-w-4xl mx-auto">
                    <AnimatedHeading
                        as="h2"
                        delay={40}
                        highlightPhrase="Sanchar Telesystems"
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-paper tracking-tight text-center"
                        gradientClass="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-sky-400 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent"
                    >
                        Welcome to Sanchar Telesystems
                    </AnimatedHeading>
                </div>

                {/* Subtitle */}
                <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-steel max-w-3xl mx-auto leading-relaxed font-sans font-normal text-center">
                    We pioneer world-class wireless communication solutions, DMR, TETRA, and turnkey radio infrastructure engineered for India’s defense, homeland security, and critical enterprise sectors.
                </p>
            </div>

            {/* =========================================================================
                2. ORIGINAL DIMENSION VIDEO SHOWCASE (TOP/BOTTOM CROPPED, FULL WIDTH)
            ========================================================================= */}
            <div 
                className="relative w-full aspect-[1280/674] bg-white dark:bg-[#0a0a0a] my-4 sm:my-6 overflow-hidden"
            >
                {/* Video: 100% full width (zero left/right crop), top & bottom bars clipped cleanly */}
                <video
                    ref={videoRef}
                    className="w-full h-auto max-w-none absolute left-0"
                    style={{ top: '-2.8%', width: '100%' }}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                >
                    <source src={originalVideoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Floating Mute / Unmute Button (Only Control on Video) */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-8 z-20">
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="group/mute px-4 py-2 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white transition-all duration-200 flex items-center gap-2.5 shadow-xl active:scale-95 cursor-pointer select-none"
                        aria-label={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
                        title={isMuted ? 'Click to enable audio' : 'Click to mute audio'}
                    >
                        {isMuted ? (
                            <>
                                <svg className="w-4 h-4 text-slate-300 group-hover/mute:text-sky-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l4-4m0 4l-4-4" />
                                </svg>
                                <span className="text-xs font-mono tracking-wider uppercase font-semibold text-slate-200">
                                    Muted
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="relative flex items-center">
                                    <svg className="w-4 h-4 text-sky-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                </div>
                                <span className="text-xs font-mono tracking-wider uppercase font-semibold text-sky-400">
                                    Sound On
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* =========================================================================
                3. STRATEGIC ECOSYSTEM PILLARS (SYMMETRICAL 4-CARD BAR IN LIGHT/DARK MODE)
            ========================================================================= */}
            <div className="container-content relative z-10 pt-8 sm:pt-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {/* Pillar 1: Vision */}
                    <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/70 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-slate-900 dark:text-paper text-base uppercase tracking-wider mb-2 group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors">
                            Vision & Purpose
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-sans">
                            To be India's preeminent mission-critical communication provider offering quality, reliable, secure, and affordable voice and data ecosystems.
                        </p>
                    </div>

                    {/* Pillar 2: Mission */}
                    <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/70 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-slate-900 dark:text-paper text-base uppercase tracking-wider mb-2 group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors">
                            Turnkey EPC Mission
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-sans">
                            Delivering end-to-end solutions from RF system design and site surveys to nationwide project execution, commissioning, and continuous support.
                        </p>
                    </div>

                    {/* Pillar 3: Govt. Accreditations */}
                    <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/70 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-slate-900 dark:text-paper text-base uppercase tracking-wider mb-2 group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors">
                            Govt. Accreditations
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-sans">
                            WPC Type Approved, TEC Certified, GeM Registered OEM, and ISO 9001:2015 accredited compliance for defense and homeland security mandates.
                        </p>
                    </div>

                    {/* Pillar 4: Nationwide Scale */}
                    <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50/70 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-slate-900 dark:text-paper text-base uppercase tracking-wider mb-2 group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors">
                            Nationwide Footprint
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-steel leading-relaxed font-sans">
                            Active radio infrastructure across 28 Indian States and UTs trusted by Indian Railways, Delhi Police, Metro Rail networks, and heavy industry.
                        </p>
                    </div>
                </div>

                {/* Primary Corporate CTA */}
                <div className="mt-7 sm:mt-8 text-center">
                    <Link 
                        href="/about-us" 
                        className="btn-shimmer !py-3.5 !px-8 text-xs font-mono uppercase tracking-wider font-bold shadow-md hover:shadow-xl inline-flex items-center gap-2 group"
                    >
                        <span>Explore Sanchar Corporate Profile & History</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
