import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import KeyStatsSection from '@/Components/KeyStatsSection';
import WelcomeVideoSection from '@/Components/WelcomeVideoSection';
import AnimatedHeading from '@/Components/AnimatedHeading';
import { useTheme } from '@/Context/ThemeContext';

import { SYSINFRA_SECTOR_DATA } from './HomeSectorData';
const SECTOR_DATA = SYSINFRA_SECTOR_DATA;

// Helper to format heading with dynamic dual-tone glowing gradient on the key phrase
const formatHeading = (text) => {
    if (!text) return null;
    const words = text.trim().split(' ');
    if (words.length <= 1) {
        return <span className="text-white drop-shadow-xl">{text}</span>;
    }
    const lastWord = words.pop();
    const leadWords = words.join(' ');
    return (
        <>
            <span className="text-white drop-shadow-xl">{leadWords} </span>
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(59,130,246,0.55)]">
                {lastWord}
            </span>
        </>
    );
};

const getSectorIcon = (idx) => {
    switch (idx) {
        case 0:
            return (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        case 1:
            return (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-6 4h4M6 3h12a2 2 0 012 2v11a3 3 0 01-3 3H7a3 3 0 01-3-3V5a2 2 0 012-2zm2 17l-2 2m12-2l2 2" />
                </svg>
            );
        case 2:
            return (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 012.344 5.657c0 2.122-.859 4.157-2.343 5.657z" />
                </svg>
            );
        case 3:
            return (
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            );
        default:
            return null;
    }
};

export default function Home({ banners = [], categories = [], featuredProducts = [], stats = [], testimonials = [], oemPartners = [], latestNews = [], seo = {} }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedSector, setSelectedSector] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        setIsMuted((prev) => {
            const next = !prev;
            if (videoRef.current) {
                videoRef.current.muted = next;
            }
            return next;
        });
    };

    // Default hero slides if none in database (5 Banners Total: Video + 4 Flagship Hardware)
    const rawSlides = banners.length > 0 ? banners : [
        {
            heading: 'Intelligent Telecom, Energy & Tactical Infrastructure',
            subheading: 'ISO-certified leader in automated AMF panels, SYS-AXS NOC telemetry, and mission-critical power systems powering over 70,000 sites across India.',
            image_path: '/img/slider/1-1.jpg',
            cta_label: 'Explore Products',
            cta_url: '/products',
        },
        {
            heading: '3,00,000+ Rectifier Modules Reconditioned',
            subheading: 'Over two decades of excellence with an 8,000 sq. ft. international-standard manufacturing and testing facility in Patparganj Industrial Area, New Delhi.',
            image_path: '/img/slider/1-2.jpg',
            cta_label: 'Our Manufacturing Facility',
            cta_url: '/about-us',
        },
        {
            heading: 'SYS-AXS NOC Surveillance & Remote Monitoring',
            subheading: 'Centralized IoT telemetry, fuel ultrasonic sensing, dual PIR intrusion alarms, and battery health intelligence deployed across 10,000+ towers.',
            image_path: '/img/slider/1-3.jpg',
            cta_label: 'Explore SYS-AXS Platform',
            cta_url: '/products',
        },
        {
            heading: 'Motorola Solutions Authorized Channel Partner',
            subheading: 'Encrypted tactical radios, Automatic Weather Stations, and mission-critical wireless gear engineered for defense forces and national utilities.',
            image_path: '/img/slider/1-4.jpg',
            cta_label: 'Discover Tactical Gear',
            cta_url: '/products',
        }
    ];

    // sysinfra.in uses static jpg images only — no video banners.
    // Images live at /img/slider/ — NOT /storage/. No _light/_dark variants.
    const slides = rawSlides.map((s) => ({
        ...s,
        isVideo: false,
        resolved_image_path: s.image_path?.startsWith('/')
            ? s.image_path                          // absolute path — use as-is
            : `/${s.image_path}`,                   // relative — prefix with /
    }));

    const scrollContainer = (ref, direction) => {
        if (!ref.current) return;
        const scrollDistance = 320;
        ref.current.scrollBy({
            left: direction === 'next' ? scrollDistance : -scrollDistance,
            behavior: 'smooth'
        });
    };

    const SLIDE_DURATION = 6500; // 6.5s comfortable reading pace for image banners

    // Continuous smooth auto-advance: gives the first video banner full 20s playback, 6.5s for images
    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;
        const currentIsVideo = Boolean(slides[currentSlide]?.isVideo);
        const duration = currentIsVideo ? 20200 : SLIDE_DURATION;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, duration);
        return () => clearInterval(timer);
    }, [currentSlide, slides.length, isPaused, slides]);

    // Synchronize video playback & reset currentTime when navigating between slides
    useEffect(() => {
        if (videoRef.current) {
            if (slides[currentSlide]?.isVideo) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentSlide, slides]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Featured Hardware single-row interactive shelf controls & telemetry
    const hardwareScrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateHardwareScrollState = () => {
        if (!hardwareScrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = hardwareScrollRef.current;
        setCanScrollLeft(scrollLeft > 15);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
    };

    useEffect(() => {
        const el = hardwareScrollRef.current;
        if (!el) return;
        updateHardwareScrollState();
        el.addEventListener('scroll', updateHardwareScrollState, { passive: true });
        window.addEventListener('resize', updateHardwareScrollState);
        return () => {
            el.removeEventListener('scroll', updateHardwareScrollState);
            window.removeEventListener('resize', updateHardwareScrollState);
        };
    }, [featuredProducts]);

    const scrollHardware = (direction) => {
        if (!hardwareScrollRef.current) return;
        const scrollDistance = 210;
        hardwareScrollRef.current.scrollBy({
            left: direction === 'next' ? scrollDistance : -scrollDistance,
            behavior: 'smooth'
        });
    };

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'System Infra Solutions — Telecom Power Automation & NOC Solutions'}
                description={seo?.description || 'System Infra Solutions (SISPL) — ISO-certified manufacturer of AMF controllers, SYS-AXS NOC telemetry, 5G smart enclosures, and Motorola Solutions tactical radios across India.'}
                canonicalPath="/"
            />

            {/* =========================================================================
                1. HERO SECTION WITH MOTOROLA SOLUTIONS-INSPIRED LIVE BANNERS (CINEMATIC FULL VIEWPORT)
            ========================================================================= */}
            <section 
                className="relative bg-white dark:bg-[#04060a] text-slate-900 dark:text-paper overflow-hidden h-[100dvh] min-h-[640px] max-h-[960px] flex flex-col justify-center transition-colors duration-300"
            >
                {/* Background Slider Imagery / Video — Smooth transitions */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {slides.map((s, idx) => (
                        <div
                            key={s.id || idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                            }`}
                        >
                            {s.isVideo ? (
                                <video
                                    ref={videoRef}
                                    key={`${s.resolved_video_path}-${isDark ? 'dark' : 'light'}`}
                                    src={`/storage/${s.resolved_video_path}`}
                                    autoPlay
                                    muted={isMuted}
                                    playsInline
                                    onEnded={nextSlide}
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <img
                                    src={s.resolved_image_path}
                                    alt={s.heading}
                                    className={`w-full h-full object-cover object-right transform transition-transform duration-[6000ms] ease-out will-change-transform ${
                                        currentSlide === idx ? 'scale-104' : 'scale-100'
                                    }`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/img/slider/1-1.jpg';
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    {/* Deep pitch-black cinematic vignette in dark mode; ultra-clean and subtle in light mode */}
                    <div className="absolute inset-0 hidden dark:block bg-gradient-to-r from-black via-black/80 sm:via-black/55 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 hidden dark:block bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-24 hidden dark:block bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

                    {/* Light mode gentle reading gradient to guarantee crisp text contrast */}
                    <div className="absolute inset-0 block dark:hidden bg-gradient-to-r from-white via-white/80 sm:via-white/40 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Left Large Motorola-Style Chevron Arrow */}
                <button
                    onClick={prevSlide}
                    className="flex absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-2 items-center justify-center text-slate-700/60 hover:text-slate-950 dark:text-white/40 dark:hover:text-white transition-all duration-200 hover:scale-125 active:scale-90 cursor-pointer pointer-events-auto"
                    aria-label="Previous Slide"
                >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Right Large Motorola-Style Chevron Arrow */}
                <button
                    onClick={nextSlide}
                    className="flex absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-2 items-center justify-center text-slate-700/60 hover:text-slate-950 dark:text-white/40 dark:hover:text-white transition-all duration-200 hover:scale-125 active:scale-90 cursor-pointer pointer-events-auto"
                    aria-label="Next Slide"
                >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Main Content Area — Firmly Aligned to the Left Edge */}
                <div className="relative z-20 my-auto w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 pointer-events-none">
                    <div className="max-w-xl xl:max-w-2xl w-full text-left py-10 sm:py-14 pointer-events-auto">
                        <div key={currentSlide} className="space-y-6">
                            {/* Headline: Motorola-style Bold Typography with Kinetic Letter Reveal Animation */}
                            <div className="py-1">
                                <AnimatedHeading
                                    key={currentSlide}
                                    as="h1"
                                    immediate={true}
                                    delay={20}
                                    letterStagger={14}
                                    highlight="last"
                                    highlightCount={1}
                                    className="text-4xl sm:text-5xl lg:text-[54px] font-sans font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] drop-shadow-xs dark:drop-shadow-2xl"
                                    gradientClass="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 dark:from-sky-300 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(37,99,235,0.3)]"
                                >
                                    {slides[currentSlide].heading}
                                </AnimatedHeading>
                            </div>

                            {/* Luminous Telemetry Tracer Line */}
                            <div className="relative h-1 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-white/15 my-1">
                                <div className="animate-hero-tracer h-full w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-transparent rounded-full shadow-sm" />
                            </div>

                            {/* Subheading: High Contrast & Crisp Readability */}
                            <p className="animate-hero-subtitle text-base sm:text-lg text-slate-800 dark:text-slate-300 max-w-lg leading-relaxed font-sans font-normal">
                                {slides[currentSlide].subheading}
                            </p>

                            {/* Motorola-Style Rounded Pill CTA Button with Interactive Hover & Click Effects */}
                            <div className="animate-hero-cta pt-2 flex items-center gap-4">
                                {slides[currentSlide].cta_url?.startsWith('#') ? (
                                    <a
                                        href={slides[currentSlide].cta_url}
                                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-sans font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer select-none"
                                    >
                                        <span>{slides[currentSlide].cta_label || 'View Release'}</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                ) : (
                                    <Link
                                        href={slides[currentSlide].cta_url || '/products'}
                                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-sans font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer select-none"
                                    >
                                        <span>{slides[currentSlide].cta_label || 'View Release'}</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motorola Bottom-Center Carousel Dot Pagination */}
                <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 flex items-center justify-center gap-2.5">
                    {slides.map((s, dotIdx) => (
                        <button
                            key={dotIdx}
                            onClick={() => setCurrentSlide(dotIdx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                currentSlide === dotIdx 
                                    ? 'w-8 h-2.5 bg-blue-600 dark:bg-sky-400 ring-2 ring-blue-500/30 dark:ring-sky-400/40 ring-offset-2 ring-offset-white dark:ring-offset-black' 
                                    : 'w-2.5 h-2.5 bg-slate-300 dark:bg-white/40 hover:bg-slate-500 dark:hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}: ${s.heading}`}
                            title={`Slide ${dotIdx + 1}: ${s.heading}`}
                        />
                    ))}
                </div>

                {/* Audio Mute/Unmute Toggle Button for Video Banner */}
                {slides[currentSlide]?.isVideo && (
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-5 sm:bottom-7 right-4 sm:right-8 lg:right-12 z-30 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/75 hover:bg-white dark:bg-black/60 dark:hover:bg-black/85 backdrop-blur-md border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-slate-100 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pointer-events-auto select-none group"
                        aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                        title={isMuted ? 'Click to unmute video audio' : 'Click to mute video audio'}
                    >
                        {isMuted ? (
                            <>
                                <svg className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-mono text-slate-700 dark:text-slate-300">Unmute</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-mono text-blue-600 dark:text-cyan-400">Mute</span>
                            </>
                        )}
                    </button>
                )}
            </section>



            {/* =========================================================================
                2. NATIONAL DEPLOYMENT PROOF BAR
            ========================================================================= */}
            <section className="bg-white dark:bg-[#000000] py-8 transition-colors duration-300">
                <div className="container-content">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="shrink-0 max-w-sm">
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1">
                                CRITICAL DEPLOYMENTS
                            </span>
                            <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-paper leading-snug">
                                Trusted by National Security & Key Infrastructure
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 items-center flex-1">
                            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-lg bg-white dark:bg-white/10 p-1.5 flex items-center justify-center border border-slate-200/60 dark:border-white/10 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <img 
                                        src="/img/brand/1.jpg" 
                                        alt="Parliament of India" 
                                        className="max-h-full max-w-full object-contain filter group-hover:filter-none transition-all"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors truncate">
                                        Parliament of India
                                    </span>
                                    <span className="block text-[10px] font-mono text-slate-500 dark:text-steel uppercase tracking-wider">
                                        New Delhi &bull; Security Grid
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-lg bg-white dark:bg-white/10 p-1.5 flex items-center justify-center border border-slate-200/60 dark:border-white/10 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <img 
                                        src="/img/brand/2.jpg" 
                                        alt="Delhi Police" 
                                        className="max-h-full max-w-full object-contain filter group-hover:filter-none transition-all"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors truncate">
                                        Delhi Police
                                    </span>
                                    <span className="block text-[10px] font-mono text-slate-500 dark:text-steel uppercase tracking-wider">
                                        2,500+ PoC Radios
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-navy-surface/50 hover:bg-white dark:hover:bg-navy-surface hover:border-blue-500/40 dark:hover:border-beacon/30 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-lg bg-white dark:bg-white/10 p-1.5 flex items-center justify-center border border-slate-200/60 dark:border-white/10 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <img 
                                        src="/img/brand/3.jpg" 
                                        alt="Surat Diamond Bourse" 
                                        className="max-h-full max-w-full object-contain filter group-hover:filter-none transition-all"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <span className="block text-xs font-bold text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors truncate">
                                        Surat Diamond Bourse
                                    </span>
                                    <span className="block text-[10px] font-mono text-slate-500 dark:text-steel uppercase tracking-wider">
                                        Private LTE Architecture
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================================
                2B. WELCOME & CORPORATE HD VIDEO SHOWCASE (FROM ORIGINAL WEBSITE)
            ========================================================================= */}
            <WelcomeVideoSection />


            {/* =========================================================================
                3. TAILORED INDUSTRY SECTORS (INTERACTIVE TABS)
            ========================================================================= */}
            <section id="sectors" className="py-12 sm:py-14 bg-slate-50 dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden">
                <div className="container-content relative z-10">
                    <div className="max-w-3xl mb-6 sm:mb-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1.5">
                            CROSS-INDUSTRY DOMAINS
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Industry Verticals"
                            className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                        >
                            Specialized Telecom for Critical Industry Verticals
                        </AnimatedHeading>
                        <p className="mt-2.5 text-slate-600 dark:text-steel max-w-2xl text-sm sm:text-base leading-relaxed">
                            SISPL delivers ISO-certified energy management and NOC automation solutions across telecom tower operators, defence establishments, 5G smart cities, and power utilities — including AMF panels, SYS-AXS telemetry, tactical radios, and Motorola Solutions partnerships.
                        </p>
                    </div>

                    {/* Interactive Icon-Enhanced Tab Controls */}
                    <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-navy-surface border border-slate-300/80 dark:border-navy-border max-w-full mb-6 shadow-xs">
                        {SECTOR_DATA.map((sec, idx) => (
                            <button
                                key={sec.title}
                                onClick={() => setSelectedSector(idx)}
                                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                    selectedSector === idx
                                        ? 'bg-white dark:bg-beacon text-slate-950 dark:text-white shadow-md shadow-blue-500/10 dark:shadow-beacon/20 scale-[1.02]'
                                        : 'text-slate-600 dark:text-steel hover:text-slate-950 dark:hover:text-paper hover:bg-white/60 dark:hover:bg-white/5'
                                }`}
                            >
                                <span className={selectedSector === idx ? 'text-blue-600 dark:text-white' : 'text-slate-400 dark:text-steel'}>
                                    {getSectorIcon(idx)}
                                </span>
                                <span>{sec.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Selected Sector Showcase Card with Telemetry Specs */}
                    <div className="panel p-5 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-black/30">
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <span className="badge-rf font-mono text-xs">
                                    {SECTOR_DATA[selectedSector].tag}
                                </span>

                                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-paper leading-snug">
                                    {SECTOR_DATA[selectedSector].headline}
                                </h3>

                                <p className="text-slate-600 dark:text-steel leading-relaxed">
                                    {SECTOR_DATA[selectedSector].description}
                                </p>

                                {/* Interactive Feature Checkmarks */}
                                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                    {SECTOR_DATA[selectedSector].features.map((feat) => (
                                        <div 
                                             key={feat} 
                                             className="flex items-start gap-2.5 text-sm font-medium text-slate-800 dark:text-paper p-2 rounded-lg hover:bg-blue-500/5 dark:hover:bg-beacon/5 hover:translate-x-1.5 transition-all duration-200 group cursor-default"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-blue-500/15 dark:bg-beacon/15 text-blue-600 dark:text-beacon flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="leading-snug">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Engineering Telemetry Specs */}
                                {SECTOR_DATA[selectedSector].specs && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-white/10 font-mono text-xs">
                                        {Object.entries(SECTOR_DATA[selectedSector].specs).map(([key, value]) => (
                                            <div key={key} className="p-3 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-beacon/40 hover:-translate-y-0.5 transition-all duration-200">
                                                <span className="block text-[10px] uppercase text-slate-500 dark:text-steel font-semibold tracking-wider">{key}</span>
                                                <span className="block text-xs font-bold text-slate-900 dark:text-paper truncate mt-0.5" title={value}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-3 flex items-center gap-4">
                                    <Link 
                                        href="/contact-us" 
                                        className="btn-shimmer !py-3.5 !px-7 text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2 group"
                                    >
                                        <span>Inquire About {SECTOR_DATA[selectedSector].title.split('&')[0]} Solutions</span>
                                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Sector Imagery with deep black pedestal in dark mode, Interactive Zoom & Verified Deployment Badge */}
                            <div className="lg:col-span-5 relative bg-gradient-to-b from-slate-100/80 via-slate-50/50 to-slate-100/90 dark:bg-black dark:from-black dark:via-black dark:to-black rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-6 border border-slate-200 dark:border-white/10 group shadow-xl">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] dark:hidden pointer-events-none" />
                                <img 
                                    src={SECTOR_DATA[selectedSector].image} 
                                    alt={SECTOR_DATA[selectedSector].title}
                                    className="max-h-full w-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] relative z-10"
                                />
                                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    <span>Field Proven</span>
                                </div>
                                {SECTOR_DATA[selectedSector].model && (
                                    <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-blue-600/90 dark:bg-beacon/90 text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow-md backdrop-blur-xs">
                                        Model: {SECTOR_DATA[selectedSector].model}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* =========================================================================
                4. FEATURED HARDWARE SHOWCASE — SINGLE ROW INTERACTIVE SHELF
            ========================================================================= */}
            <section id="hardware" className="py-12 sm:py-14 bg-white dark:bg-[#000000] transition-colors duration-300 relative overflow-hidden">
                <div className="container-content">
                    {/* Header with Title, Browse Catalog Link & Interactive Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-6">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1">
                                MISSION-READY TERMINALS & SYSTEMS
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="Wireless Hardware"
                                className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                            >
                                Featured Wireless Hardware
                            </AnimatedHeading>
                            <p className="mt-2 text-slate-600 dark:text-steel text-sm max-w-2xl">
                                High-durability handheld transceivers, dispatch consoles, and base stations in active deployment.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                            <Link 
                                href="/products" 
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-paper hover:text-blue-600 dark:hover:text-beacon transition-colors font-mono"
                            >
                                <span>Browse 120+ Products</span>
                                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            {/* Interactive Shelf Navigation Controls */}
                            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-4">
                                <button 
                                    onClick={() => scrollHardware('prev')}
                                    disabled={!canScrollLeft}
                                    className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all shadow-xs ${
                                        canScrollLeft
                                            ? 'border-slate-300 dark:border-white/20 bg-white dark:bg-navy-surface text-slate-800 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:border-beacon dark:hover:text-beacon active:scale-95 cursor-pointer shadow-sm'
                                            : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.03] text-slate-300 dark:text-white/20 cursor-not-allowed'
                                    }`}
                                    aria-label="Previous hardware"
                                    title="Previous"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button 
                                    onClick={() => scrollHardware('next')}
                                    disabled={!canScrollRight}
                                    className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all shadow-xs ${
                                        canScrollRight
                                            ? 'border-slate-300 dark:border-white/20 bg-white dark:bg-navy-surface text-slate-800 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:border-beacon dark:hover:text-beacon active:scale-95 cursor-pointer shadow-sm'
                                            : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.03] text-slate-300 dark:text-white/20 cursor-not-allowed'
                                    }`}
                                    aria-label="Next hardware"
                                    title="Next"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Hardware Showcase: Left Fixed Anchor Card (taller) + 4 Text-focused Overlapping Cards (Pipeline style) */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5 xl:gap-6 relative">
                        {/* 1. Left Fixed Anchor Card — Taller than animated cards (like About Us pipeline) */}
                        <div className="csstricks-anchor shrink-0 w-full lg:w-[250px] xl:w-[265px] h-auto lg:h-[370px] xl:h-[380px] rounded-2xl">
                            <div className="csstricks-anchor-inner h-full flex flex-col justify-between p-6 xl:p-7 rounded-2xl">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30 text-[10px] font-mono font-bold text-blue-700 dark:text-sky-300 uppercase tracking-widest shadow-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
                                        <span>Field Proven</span>
                                    </div>
                                    <div className="font-display font-black text-2xl sm:text-3xl xl:text-[28px] text-slate-900 dark:text-white tracking-tight leading-tight pt-1">
                                        ISO-Certified<br />Power<br />Automation<br />
                                        <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent dark:drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
                                            Pan-India
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                                        AMF panels, NOC telemetry, and 5G smart enclosures deployed across 70,000+ tower sites nationwide.</p>
                                </div>

                                <div className="pt-5 border-t border-slate-200 dark:border-white/10 space-y-3 mt-4">
                                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                                        <span>ISO 9001 &amp; ISO 14001 Certified</span>
                                    </div>
                                    <Link
                                        href="/products"
                                        className="group/cta inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-white transition-colors"
                                    >
                                        <span>Explore Our Products</span>
                                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. Overlapping Fanning Deck — text-focused cards matching About Us pipeline card style */}
                        <div className="relative flex-1 min-w-0 group/shelf overflow-hidden">
                            {canScrollLeft && (
                                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-40 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent transition-opacity duration-300" />
                            )}
                            {canScrollRight && (
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 z-40 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent transition-opacity duration-300" />
                            )}

                            <div
                                ref={hardwareScrollRef}
                                className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-8 pl-4 pr-12 csstricks-deck hardware-deck items-center"
                            >
                                {(featuredProducts || []).map((item, index) => (
                                    <div
                                        key={item.id}
                                        style={{ zIndex: index + 1 }}
                                        className="csstricks-card snap-start shrink-0 w-[310px] h-[310px] sm:h-[320px] group/card flex flex-col border border-slate-200/90 dark:border-white/10 bg-white dark:bg-navy-surface rounded-2xl overflow-hidden cursor-pointer"
                                    >
                                        {/* Product Image Strip */}
                                        <div className="h-[120px] shrink-0 w-full bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-[#111111] dark:to-[#0a0a0a] relative flex items-center justify-center border-b border-slate-100 dark:border-white/[0.06] overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
                                            <img
                                                src={`/${item.cover_image_path}`}
                                                alt={item.name}
                                                className="h-[90px] w-auto max-w-[120px] object-contain transition-all duration-500 group-hover/card:scale-110 group-hover/card:-translate-y-1 drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)] relative z-10"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/img/sys-products/2.jpg';
                                                }}
                                            />
                                            {/* WPC badge */}
                                            <div className="absolute bottom-1.5 left-2 z-20">
                                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider font-semibold bg-white/90 dark:bg-black/80 text-slate-600 dark:text-paper/70 border border-slate-200 dark:border-white/10 shadow-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    WPC
                                                </span>
                                            </div>
                                        </div>

                                        {/* Text Content */}
                                        <div className="p-3.5 flex-1 flex flex-col justify-between">
                                            <div>
                                                {/* Subcategory badge + index */}
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-mono text-[10px] tracking-wider text-blue-600 dark:text-beacon font-bold px-1.5 py-0.5 rounded bg-blue-500/10 dark:bg-beacon/10 border border-blue-500/20 dark:border-beacon/20">
                                                        {item.subcategory?.name?.toUpperCase() || 'RADIO SYSTEM'}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-steel tracking-wider">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>

                                                {/* Product name */}
                                                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-paper group-hover/card:text-blue-600 dark:group-hover/card:text-beacon transition-colors leading-snug mb-1">
                                                    {item.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-[11px] text-slate-500 dark:text-steel leading-relaxed line-clamp-2">
                                                    {item.short_description || 'High-reliability energy management and telecom automation equipment engineered for mission-critical infrastructure.'}
                                                </p>
                                            </div>

                                            {/* Footer */}
                                            <div className="pt-2 mt-1.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between font-mono">
                                                <span className="text-slate-500 dark:text-steel text-[10px] flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    WPC Approved
                                                </span>
                                                <Link
                                                    href={`/products/${item.subcategory?.category?.slug || 'professional-amateur-radio'}/${item.subcategory?.slug || 'dmr'}/${item.slug}`}
                                                    className="text-blue-600 dark:text-beacon group-hover/card:translate-x-1 transition-transform inline-block text-sm"
                                                    title={`View ${item.name} specifications`}
                                                >
                                                    &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* =========================================================================
                5. IMPACT METRICS (STATS) — ANIMATED SCROLL COUNTER & TIER-1 CSS EFFECTS
            ========================================================================= */}
            <KeyStatsSection stats={stats} />


            {/* =========================================================================
                6. OEM PARTNERS SHOWCASE — SINGLE ROW CONTINUOUS MARQUEE (LEFT TO RIGHT)
            ========================================================================= */}
            <section id="oem" className="py-12 sm:py-14 bg-white dark:bg-[#000000] transition-colors duration-300 overflow-hidden">
                <div className="container-content">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1">
                                GLOBAL TECHNOLOGY ALLIANCES
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="OEM Ecosystem"
                                className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                            >
                                Authorized OEM Ecosystem
                            </AnimatedHeading>
                            <p className="mt-2 text-slate-600 dark:text-steel text-sm">
                                Direct factory relationships bringing global component standards to the Indian subcontinent.
                            </p>
                        </div>
                        <Link 
                            href="/oem-partners" 
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-paper hover:text-blue-600 dark:hover:text-beacon font-mono shrink-0"
                        >
                            <span>View All Partners</span>
                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Single Continuous Row Marquee (Left to Right) with Edge Gradient Feathering */}
                <div className="relative w-full overflow-hidden py-3">
                    {/* Left and Right Edge Fade Gradients matching section bg */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent" />

                    <div className="animate-marquee-ltr flex items-center gap-5 sm:gap-6">
                        {/* Duplicate array for continuous seamless infinite loop */}
                        {[...(oemPartners || []), ...(oemPartners || [])].map((partner, pIdx) => (
                            <a
                                key={`${partner.name}-${pIdx}`}
                                href={partner.website_url || '#'}
                                target={partner.website_url && partner.website_url !== '#' ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="group shrink-0 min-w-[190px] sm:min-w-[210px] h-[104px] p-3.5 rounded-2xl bg-slate-50/80 dark:bg-navy-surface border border-slate-200/90 dark:border-white/10 flex flex-col items-center justify-between text-center hover:border-blue-500/50 dark:hover:border-beacon/50 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-beacon/5 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-full h-12 px-3 py-1.5 rounded-xl bg-white dark:bg-white/95 border border-slate-200/80 dark:border-slate-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={`/${partner.logo_path}`}
                                        alt={partner.name}
                                        className="max-h-8 max-w-[130px] w-auto object-contain"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/img/mobile-logo.png';
                                        }}
                                    />
                                </div>
                                <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-steel group-hover:text-slate-900 dark:group-hover:text-paper truncate w-full transition-colors">
                                    {partner.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>


            {/* =========================================================================
                7. LATEST NEWS & STRATEGIC DISPATCHES
            ========================================================================= */}
            {latestNews && latestNews.length > 0 && (
                <section id="news" className="py-14 sm:py-16 bg-slate-50 dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden">
                    <div className="container-content">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1">
                                    INDUSTRY INTELLIGENCE & ANNOUNCEMENTS
                                </span>
                                <AnimatedHeading 
                                    as="h2" 
                                    highlightPhrase="Strategic Updates"
                                    className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                                >
                                    Latest News & Strategic Updates
                                </AnimatedHeading>
                                <p className="mt-2 text-slate-600 dark:text-steel text-sm max-w-2xl">
                                    Statutory wireless clearances, technology milestones, and mission-critical telecommunications insights.
                                </p>
                            </div>

                            <Link 
                                href="/latest-news" 
                                className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-beacon hover:underline shrink-0 uppercase tracking-wider"
                            >
                                <span>Browse All Dispatches</span>
                                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {/* News Adaptive Layout: Full-width featured dispatch when 1 post; balanced grid when 2+ */}
                        {latestNews.length === 1 ? (
                            (() => {
                                const post = latestNews[0];
                                const plainExcerpt = (post.body || '').replace(/<[^>]+>/g, '').trim();
                                const excerpt = plainExcerpt.length > 260 ? plainExcerpt.substring(0, 260) + '...' : plainExcerpt;
                                const dateFormatted = post.published_at 
                                    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : 'Recent';

                                return (
                                    <Link
                                        key={post.id || post.slug}
                                        href={`/latest-news/${post.slug}`}
                                        className="card-symmetric group relative hover:border-blue-500/60 dark:hover:border-beacon/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden flex flex-col md:flex-row w-full"
                                    >
                                        {/* Top specular accent line on hover */}
                                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 dark:via-beacon/0 to-transparent group-hover:via-blue-500 dark:group-hover:via-beacon transition-all duration-500 z-20" />

                                        {/* Cover Image Pedestal */}
                                        <div className="w-full md:w-5/12 lg:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-slate-100 dark:bg-black overflow-hidden relative flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/10 shrink-0">
                                            <img
                                                src={post.cover_image_path ? `/${post.cover_image_path}` : '/img/slider/1-1.jpg'}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/img/slider/1-1.jpg';
                                                }}
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/85 dark:bg-neutral-900/90 text-xs font-mono text-sky-300 dark:text-beacon border border-white/10 backdrop-blur-sm shadow-md">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                    {dateFormatted}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold">
                                                        FEATURED STRATEGIC UPDATE
                                                    </span>
                                                    <span className="text-slate-300 dark:text-steel/40">•</span>
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-steel">
                                                        OFFICIAL DISPATCH
                                                    </span>
                                                </div>

                                                <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors leading-snug">
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed">
                                                    {excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 dark:border-navy-border/40 flex items-center justify-between text-xs sm:text-sm font-mono text-slate-500 dark:text-steel">
                                                <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-semibold inline-flex items-center gap-2">
                                                    Read Full Intelligence Dispatch
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-navy-surface flex items-center justify-center text-blue-600 dark:text-beacon group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-beacon dark:group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                                                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })()
                        ) : (
                            <div className={`grid gap-6 sm:gap-8 w-full ${
                                latestNews.length === 2
                                    ? 'grid-cols-1 md:grid-cols-2'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                                {latestNews.map((post) => {
                                    const plainExcerpt = (post.body || '').replace(/<[^>]+>/g, '').trim();
                                    const excerpt = plainExcerpt.length > 120 ? plainExcerpt.substring(0, 120) + '...' : plainExcerpt;
                                    const dateFormatted = post.published_at 
                                        ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : 'Recent';

                                    return (
                                        <Link
                                            key={post.id || post.slug}
                                            href={`/latest-news/${post.slug}`}
                                            className="card-symmetric group relative hover:border-blue-500/60 dark:hover:border-beacon/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden flex flex-col"
                                        >
                                            {/* Top specular accent line on hover */}
                                            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 dark:via-beacon/0 to-transparent group-hover:via-blue-500 dark:group-hover:via-beacon transition-all duration-500 z-20" />

                                            <div className="flex-1 flex flex-col">
                                                {/* Image Pedestal */}
                                                <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-black overflow-hidden relative flex items-center justify-center border-b border-slate-100 dark:border-white/10">
                                                    <img
                                                        src={post.cover_image_path ? `/${post.cover_image_path}` : '/img/slider/1-1.jpg'}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/img/slider/1-1.jpg';
                                                        }}
                                                    />

                                                    <div className="absolute top-3 right-3 z-20">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 dark:bg-neutral-900/90 text-[10px] font-mono text-sky-300 dark:text-beacon border border-white/10 backdrop-blur-xs">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                            {dateFormatted}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 space-y-2 flex-1 flex flex-col">
                                                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold">
                                                        PRESS DISPATCH
                                                    </div>

                                                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors line-clamp-2 leading-snug">
                                                        {post.title}
                                                    </h3>

                                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-steel line-clamp-3 leading-relaxed flex-1">
                                                        {excerpt}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-6 pt-4 border-t border-slate-100 dark:border-navy-border/40 mt-auto flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                                <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-medium">Read Full Story</span>
                                                <svg className="w-4 h-4 text-blue-600 dark:text-beacon transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* =========================================================================
                8. BOTTOM CALL TO ACTION
            ========================================================================= */}
            <section className="py-14 sm:py-16 bg-white dark:bg-[#000000] transition-colors duration-300 relative overflow-hidden">
                {/* Ambient Radial Backdrop Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 dark:bg-beacon/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container-content text-center max-w-3xl mx-auto space-y-6 relative z-10">
                    <span className="badge-rf text-xs">GOVERNMENT & ENTERPRISE PROCUREMENT</span>
                    <AnimatedHeading 
                        as="h2" 
                        highlightPhrase="Wireless Communication?"
                        className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-paper tracking-tight"
                    >
                        Ready to Upgrade Your Wireless Communication?
                    </AnimatedHeading>
                    <p className="text-slate-600 dark:text-steel text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        Get in touch with our New Delhi technical and sales team for expert product advice, turnkey system design, or Government e-Marketplace (GeM) procurement support.
                    </p>
                    <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact-us" className="btn-shimmer !py-3.5 !px-8 text-sm font-mono uppercase tracking-wider font-bold shadow-xl hover:shadow-blue-500/40">
                            Talk with Our Technical Team
                        </Link>
                        <a 
                            href="tel:+911146528894" 
                            className="btn-secondary !py-3.5 !px-6 text-sm font-mono inline-flex items-center gap-2 group"
                        >
                            <svg className="w-4 h-4 text-blue-600 dark:text-beacon transition-transform duration-200 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Call +91 (11) 3500 4142</span>
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
