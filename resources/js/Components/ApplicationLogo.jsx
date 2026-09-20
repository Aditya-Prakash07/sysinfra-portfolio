export default function ApplicationLogo({
    className = 'h-10',
    isOverBanner = false,
    theme = 'light',
    showText = true,
    variant = 'auto',
    ...props
}) {
    const isDarkContext = 
        variant === 'white' || 
        variant === 'dark' || 
        (variant === 'auto' && theme === 'dark');

    return (
        <div className={`flex items-center gap-3 shrink-0 select-none ${className}`} {...props}>
            <div className="relative flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9">
                <svg 
                    viewBox="0 0 60 60" 
                    className="w-full h-full object-contain shrink-0 relative z-10"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="System Infra Emblem"
                >
                    <defs>
                        <linearGradient id="sysGlobeGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={isDarkContext ? '#38bdf8' : '#0070ba'} />
                            <stop offset="100%" stopColor={isDarkContext ? '#0284c7' : '#0b2545'} />
                        </linearGradient>
                        <linearGradient id="sysOrbitGradLogo" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                    </defs>
                    <circle cx="30" cy="30" r="24" stroke="url(#sysGlobeGradLogo)" strokeWidth="2.5" fill="none" opacity="0.4"/>
                    <path d="M 8 38 C 16 12, 44 14, 52 26 C 46 48, 18 50, 12 34" stroke="url(#sysOrbitGradLogo)" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    <circle cx="30" cy="30" r="7" fill="url(#sysGlobeGradLogo)"/>
                    <circle cx="30" cy="30" r="3" fill="#ffffff"/>
                    <circle cx="50" cy="22" r="3.5" fill="#f59e0b"/>
                    <path d="M 30 10 L 30 16 M 44 16 L 40 20 M 16 16 L 20 20" stroke="url(#sysGlobeGradLogo)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col justify-center leading-none select-none">
                    <div className="flex items-center text-[18px] sm:text-[20px] font-display font-extrabold tracking-tight">
                        <span className={isDarkContext ? 'text-white' : 'text-slate-900'}>SYS</span>
                        <span className="text-sky-500 font-black">INFRA</span>
                    </div>
                    <div className={`text-[8px] sm:text-[8.5px] font-sans font-bold tracking-[0.18em] uppercase whitespace-nowrap leading-none mt-0.5 ${
                        isDarkContext ? 'text-zinc-400' : 'text-slate-500'
                    }`}>
                        SOLUTIONS PRIVATE LIMITED
                    </div>
                </div>
            )}
        </div>
    );
}
