import React, { useState, useEffect, useRef } from 'react';
import AnimatedHeading from '@/Components/AnimatedHeading';

// Crisp SVGs matching original stylish iconography
function BriefcaseIcon({ className = "w-6 h-6 sm:w-7 sm:h-7" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 6h-3.5V4.5C16.5 3.12 15.38 2 14 2h-4C8.62 2 7.5 3.12 7.5 4.5V6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 4.5c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5V6h-5V4.5zm10.5 14.5H4V13.5h5.5c.28 0 .5.22.5.5v1h4v-1c0-.28.22-.5.5-.5H20V19zm0-7.5h-5v-.5c0-.83-.67-1.5-1.5-1.5h-3c-.83 0-1.5.67-1.5 1.5v.5H4V8h16v3.5z" />
        </svg>
    );
}

function ClipboardGearIcon({ className = "w-6 h-6 sm:w-7 sm:h-7" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6.5v-2H5V5h14v6.5h2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
            <path d="M7 7h10v2H7zm0 4h6v2H7zm0 4h4v2H7z" />
            <path d="M19.5 13.5l-.3.8-.8.3-.3.8.8.8-.4.7-.9-.1-.6.6.1.9-.8.4-.7-.5-.8.5-.8-.4.1-.9-.6-.6-.9.1-.4-.7.8-.8-.3-.8-.8-.3.3-.8.8-.2.2-.8-.7-.6.5-.7.9.1.7-.5.2-.9.8-.1.5.8.8.1.7-.5.6.7-.6.7.2.8.9.2zM17 18c.83 0 1.5-.67 1.5-1.5S17.83 15 17 15s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
        </svg>
    );
}

function GearBadgeIcon({ className = "w-6 h-6 sm:w-7 sm:h-7" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
            <path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        </svg>
    );
}

function NetworkMonitorIcon({ className = "w-6 h-6 sm:w-7 sm:h-7" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 1h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-7v2h3c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1h3v-2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 12h16V3H4v10zm8-1c.83 0 1.5-.67 1.5-1.5S12.83 9 12 9s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
        </svg>
    );
}

function StatCard({ stat, isVisible, index }) {
    const [count, setCount] = useState(0);
    const target = Number(stat.value) || 0;
    const duration = 2200; // Crisp, responsive counter

    useEffect(() => {
        if (!isVisible || target === 0) return;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutExpo for dramatic fast start and smooth organic deceleration
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(ease * target);

            setCount(current);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        const delayTimeout = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, index * 90);

        return () => {
            clearTimeout(delayTimeout);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, target, duration, index]);

    // Choose appropriate icon
    const getIcon = () => {
        const iconKey = (stat.icon || '').toLowerCase();
        const label = (stat.label || '').toUpperCase();

        if (iconKey === 'noc' || label.includes('NOC') || label.includes('SYS-AXS')) {
            return <NetworkMonitorIcon className="w-6 h-6 sm:w-7 sm:h-7" />;
        }
        if (iconKey === 'telecom' || iconKey === 'clipboard' || label.includes('SITE') || label.includes('AUTOMATION') || label.includes('PROJECT')) {
            return <ClipboardGearIcon className="w-6 h-6 sm:w-7 sm:h-7" />;
        }
        if (iconKey === 'controller' || iconKey === 'network' || label.includes('CONTROLLER') || label.includes('AMF') || label.includes('DEALER')) {
            return <GearBadgeIcon className="w-6 h-6 sm:w-7 sm:h-7" />;
        }
        return <BriefcaseIcon className="w-6 h-6 sm:w-7 sm:h-7" />;
    };

    const suffix = stat.suffix ? stat.suffix.trim() : '+';

    return (
        <div 
            className="group relative flex flex-col items-center justify-between p-7 sm:p-8 lg:p-8 xl:p-9 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 hover:bg-white dark:hover:bg-[#121212] transition-all duration-300 ease-out hover:-translate-y-2 shadow-lg shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/50 hover:shadow-2xl dark:hover:shadow-[0_0_35px_-5px_rgba(221,60,52,0.45)] overflow-hidden cursor-pointer"
        >
            {/* Top illuminated line on hover */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#dd3c34] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none" />

            {/* Ambient Backlight Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#dd3c34]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon Pedestal with Hover Spring */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/30 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#dd3c34] group-hover:text-white dark:group-hover:bg-[#dd3c34] dark:group-hover:text-white group-hover:border-[#dd3c34] group-hover:shadow-[0_0_24px_rgba(221,60,52,0.35)] transition-all duration-500 shadow-inner">
                {getIcon()}
            </div>

            {/* Gradually Increasing Counter with Glow */}
            <div className="relative z-10 font-display text-4xl sm:text-[42px] lg:text-[44px] font-extrabold text-[#dd3c34] dark:text-[#ff5c54] tracking-tight tabular-nums dark:drop-shadow-[0_4px_16px_rgba(221,60,52,0.35)] flex items-baseline justify-center transition-transform duration-300 group-hover:scale-105">
                <span>{count.toLocaleString('en-US')}</span>
                <span className="ml-1.5 text-2xl sm:text-3xl text-[#dd3c34]/90 dark:text-[#ff5c54]/90 font-light">{suffix}</span>
            </div>

            {/* Stat Label */}
            <div className="relative z-10 mt-3.5 text-xs sm:text-[13px] font-mono tracking-wider font-semibold text-slate-800 dark:text-slate-200 uppercase text-center leading-snug min-h-[2.5rem] flex items-center justify-center">
                {stat.label}
            </div>

            {/* Bottom Glow Indicator */}
            <div className="relative z-10 mt-6 h-0.5 w-10 group-hover:w-16 group-hover:bg-[#dd3c34] dark:group-hover:bg-[#ff5c54] bg-slate-200 dark:bg-white/10 transition-all duration-500 rounded-full" />
        </div>
    );
}

export default function KeyStatsSection({ stats = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Exact 4 impact statistics from sysinfra.in
    const defaultStats = [
        { label: 'RECTIFIER MODULE RE-CONDITIONED', value: 300000, suffix: ' +', icon: 'rectifier' },
        { label: 'TELECOM SITE AUTOMATION', value: 70000, suffix: ' +', icon: 'telecom' },
        { label: 'AMF CONTROLLER INSTALLED', value: 50000, suffix: ' +', icon: 'controller' },
        { label: 'FLAGSHIP SYS-AXS NOC SITES', value: 10000, suffix: ' +', icon: 'noc' },
    ];

    const displayStats = stats && stats.length > 0 ? stats : defaultStats;

    return (
        <section 
            ref={sectionRef}
            className="py-20 sm:py-24 lg:py-28 bg-slate-50 dark:bg-[#000000] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300"
        >
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15 pointer-events-none" />

            {/* Watermark "Data Facts" + Foreground "Key Stats" Header */}
            <div className="container-content relative z-10">
                <div className="relative text-center mb-12 sm:mb-16">
                    {/* Atmospheric Watermark behind Title */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-slate-900/[0.12] dark:text-white/[0.14] text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-300"
                        aria-hidden="true"
                    >
                        Data Facts
                    </div>

                    {/* Exact Title "Key Stats" with Red Kinetic Typography */}
                    <AnimatedHeading
                        as="h2"
                        highlight="last"
                        highlightCount={1}
                        className="relative z-10 text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-white tracking-tight"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] to-[#f43f5e] dark:from-[#ff6b6b] dark:to-[#fb923c] bg-clip-text text-transparent font-extrabold"
                    >
                        Key Stats
                    </AnimatedHeading>

                    <div className="relative z-10 mt-2.5 flex items-center justify-center gap-2">
                        <span className="h-0.5 w-10 bg-[#dd3c34]/25 dark:bg-[#dd3c34]/35 rounded-full" />
                        <span className="h-1.5 w-1.5 bg-[#dd3c34] dark:bg-[#ff6b6b] rounded-full animate-ping" />
                        <span className="h-0.5 w-10 bg-[#dd3c34]/25 dark:bg-[#dd3c34]/35 rounded-full" />
                    </div>
                </div>

                {/* Symmetrical 4-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {displayStats.map((stat, idx) => (
                        <StatCard 
                            key={stat.label || idx}
                            stat={stat}
                            isVisible={isVisible}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
