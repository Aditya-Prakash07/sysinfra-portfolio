import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/Context/ThemeContext';
import ApplicationLogo from '@/Components/ApplicationLogo';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'Resources', href: '/resources' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Media', href: '/media' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '/contact-us' },
];

export default function Navbar() {
    const { url, props } = usePage();
    const categoriesNav = props.categoriesNav || [];
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [productsDropdown, setProductsDropdown] = useState(false);
    const dropdownTimeoutRef = useRef(null);
    const navRef = useRef(null);
    const productSliderRef = useRef(null);
    const autoSlideTimerRef = useRef(null);
    const [isSliderHovered, setIsSliderHovered] = useState(false);

    const slideProducts = (direction = 'next') => {
        if (!productSliderRef.current) return;
        const container = productSliderRef.current;
        const firstCard = container.firstElementChild;
        const cardWidth = firstCard ? firstCard.offsetWidth : 350;
        const gap = 24;
        const scrollDistance = cardWidth + gap;
        const { scrollLeft, scrollWidth, clientWidth } = container;

        if (direction === 'next') {
            if (scrollLeft + clientWidth >= scrollWidth - 25) {
                // Loop back to start smoothly
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
            }
        } else {
            if (scrollLeft <= 25) {
                // Loop to end smoothly
                container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
            }
        }
    };

    const handleManualSlide = (direction) => {
        slideProducts(direction);
        if (autoSlideTimerRef.current) {
            clearInterval(autoSlideTimerRef.current);
            if (!isSliderHovered && productsDropdown) {
                autoSlideTimerRef.current = setInterval(() => {
                    slideProducts('next');
                }, 3500);
            }
        }
    };

    // Auto-advance product cards like banners every 3.5 seconds, paused on hover
    useEffect(() => {
        if (!productsDropdown || isSliderHovered) {
            if (autoSlideTimerRef.current) {
                clearInterval(autoSlideTimerRef.current);
                autoSlideTimerRef.current = null;
            }
            return;
        }

        autoSlideTimerRef.current = setInterval(() => {
            slideProducts('next');
        }, 3500);

        return () => {
            if (autoSlideTimerRef.current) {
                clearInterval(autoSlideTimerRef.current);
                autoSlideTimerRef.current = null;
            }
        };
    }, [productsDropdown, isSliderHovered]);

    // Banners background detection: On the home page and not scrolled past hero
    const isHome = url === '/' || url === '' || url.startsWith('/#') || url.startsWith('/?');
    const isOverBanner = isHome && !scrolled;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            // Auto-close dropdown on scroll to prevent any overlap with scrolling content
            setProductsDropdown(false);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [url]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setProductsDropdown(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setProductsDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleMouseEnter = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setProductsDropdown(true);
    };

    const handleMouseLeave = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = setTimeout(() => {
            setProductsDropdown(false);
        }, 220);
    };

    return (
        <header ref={navRef} className="fixed inset-x-0 top-0 z-50 transition-all duration-200">
            {/* Main Navigation Bar (100% Transparent at top, Solid Opaque when scrolled) */}
            <div className={`transition-all duration-300 ${
                scrolled
                    ? 'bg-white dark:bg-[#050505] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] py-3'
                    : 'bg-transparent py-4'
            }`}>
                <nav className="container-content flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center group shrink-0" aria-label="System Infra Solutions">
                        <ApplicationLogo 
                            className="h-8 sm:h-9 w-auto" 
                            isOverBanner={isOverBanner} 
                            theme={theme} 
                        />
                    </Link>

                    {/* Desktop Menu Links (Guaranteed Single-Line No Wrapping) */}
                    <ul className="hidden lg:flex items-center gap-5 xl:gap-7 whitespace-nowrap shrink-0">
                        {NAV_LINKS.map((link) => {
                            const isProducts = link.hasDropdown;
                            const isActive = url === link.href || (isProducts && url.startsWith('/products'));

                            if (isProducts) {
                                return (
                                    <li 
                                        key={link.label}
                                        className="relative"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setProductsDropdown(false)}
                                            className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-2 whitespace-nowrap cursor-pointer ${
                                                isOverBanner && theme === 'light'
                                                    ? (isActive ? 'text-sysred font-bold' : 'text-slate-800 hover:text-sysred font-semibold')
                                                    : (isActive ? 'text-sysred dark:text-[#ff6b6b] font-bold' : 'text-slate-700 dark:text-paper/85 hover:text-sysred dark:hover:text-[#ff6b6b]')
                                            }`}
                                        >
                                            <span className="whitespace-nowrap">{link.label}</span>
                                            <svg 
                                                className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                                                    productsDropdown 
                                                        ? 'rotate-180 text-sysred dark:text-[#ff6b6b]' 
                                                        : 'opacity-60'
                                                }`} 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Link>
                                    </li>
                                );
                            }

                            return (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors py-2 whitespace-nowrap ${
                                            isOverBanner && theme === 'light'
                                                ? (isActive ? 'text-sysred font-bold' : 'text-slate-800 hover:text-sysred font-medium')
                                                : (isActive ? 'text-sysred dark:text-[#ff6b6b] font-semibold' : 'text-slate-700 dark:text-paper/85 hover:text-sysred dark:hover:text-[#ff6b6b]')
                                        }`}
                                    >
                                        <span className="whitespace-nowrap">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Products Mega Dropdown (Horizontally Centered in Viewport, positioned directly beneath navbar) */}
                    {productsDropdown && (
                        <div 
                            className="fixed inset-x-0 top-[56px] sm:top-[64px] z-50 flex justify-center px-3 sm:px-6 pt-2 pointer-events-none"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Dropdown Container (Centered Horizontally across viewport, auto-disappears when not hovered) */}
                            <div className="relative pointer-events-auto w-full max-w-[1240px] xl:max-w-[1360px] flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] rounded-2xl p-6 sm:p-7 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                                
                                {/* Top Telemetry Header with Close Button */}
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3.5 mb-5 gap-3 shrink-0">
                                    <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-sysred dark:text-[#ff6b6b] font-bold">
                                        <span className="w-2.5 h-2.5 rounded-full bg-sysred animate-pulse shadow-[0_0_8px_rgba(221,60,52,0.8)]" />
                                        <span>SYSINFRA PRODUCT ECOSYSTEM &bull; ENERGY &bull; NOC &bull; DEFENCE &bull; SECURITY &bull; SERVICES</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <a 
                                            href="/download-catalog" 
                                            download="SystemInfraSolutions_MasterCatalogue.pdf"
                                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sysred hover:bg-[#b82720] text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 shadow-sm"
                                            title="Download Master Product Catalog (PDF)"
                                        >
                                            <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span>Download Catalog</span>
                                        </a>

                                        <Link 
                                            href="/products" 
                                            onClick={() => setProductsDropdown(false)}
                                            className="text-xs font-mono text-slate-500 dark:text-steel hover:text-sysred dark:hover:text-[#ff6b6b] transition-colors font-semibold flex items-center gap-1.5"
                                        >
                                            <span>Browse All</span>
                                            <span>&rarr;</span>
                                        </Link>

                                        {/* Close Button */}
                                        <button
                                            type="button"
                                            onClick={() => setProductsDropdown(false)}
                                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-900 dark:text-steel dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer select-none"
                                            aria-label="Close Products Modal"
                                            title="Close Modal (Esc)"
                                        >
                                            <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Single Row Slider with Horizontal Smooth Scroll & Side Arrows */}
                                <div 
                                    className="relative group/slider"
                                    onMouseEnter={() => setIsSliderHovered(true)}
                                    onMouseLeave={() => setIsSliderHovered(false)}
                                >
                                    {/* Left Side Quick Chevron Arrow (Moveable to both sides with circular looping) */}
                                    <button
                                        type="button"
                                        onClick={() => handleManualSlide('prev')}
                                        className="flex absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 dark:bg-[#141414]/95 shadow-[0_4px_20px_rgba(0,0,0,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.7)] border border-slate-200 dark:border-white/20 items-center justify-center text-slate-700 dark:text-white hover:text-sysred dark:hover:text-[#ff6b6b] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer pointer-events-auto backdrop-blur-md"
                                        aria-label="Previous Slide"
                                        title="Previous Products"
                                    >
                                        <svg className="w-5 h-5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div 
                                        ref={productSliderRef}
                                        className="flex gap-5 xl:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-3 sm:px-4"
                                    >
                                        {categoriesNav.map((cat, idx) => (
                                            <div 
                                                key={cat.id || idx}
                                                className="snap-start shrink-0 w-[290px] sm:w-[330px] lg:w-[350px] h-[385px] group/col flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-[#121212] hover:border-sysred/50 dark:hover:border-[#ff6b6b]/40 hover:bg-white dark:hover:bg-[#161616] hover:shadow-xl dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.35)] transition-all duration-300 relative overflow-hidden select-none"
                                            >
                                                {/* Top specular accent line on hover */}
                                                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sysred/0 dark:via-[#ff6b6b]/0 to-transparent group-hover/col:via-sysred dark:group-hover/col:via-[#ff6b6b] transition-all duration-500 rounded-t-2xl" />

                                                {/* Header */}
                                                <div className="flex items-start gap-3 pb-3 mb-3 border-b border-slate-200/70 dark:border-white/10 shrink-0">
                                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 dark:bg-red-500/15 text-sysred dark:text-[#ff6b6b] flex items-center justify-center shrink-0 group-hover/col:bg-sysred group-hover/col:text-white transition-all duration-300 text-xs font-bold font-mono">
                                                        0{idx + 1}
                                                    </div>
                                                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                                                        <Link 
                                                            href={`/products#category-${cat.slug}`}
                                                            onClick={() => setProductsDropdown(false)}
                                                            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-paper group-hover/col:text-sysred dark:group-hover/col:text-[#ff6b6b] transition-colors leading-snug break-words line-clamp-2 block"
                                                            title={cat.name}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/40 text-sysred dark:text-[#ff6b6b] font-bold shrink-0">
                                                                {cat.items_count ?? cat.subcategories?.length ?? 0} Systems
                                                            </span>
                                                            <span className="text-[10px] font-mono text-slate-400 dark:text-steel truncate">
                                                                {cat.subcategories?.length || 0} Subs
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Subcategory List with Full Untruncated Product Names & Internal Smooth Scroll */}
                                                <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 min-h-0 py-1 pr-1">
                                                    {(cat.subcategories || []).map((sub) => (
                                                        <Link
                                                            key={sub.slug}
                                                            href={`/products/${cat.slug}/${sub.slug}`}
                                                            onClick={() => setProductsDropdown(false)}
                                                            className="group/item flex items-start justify-between py-1.5 px-2 rounded-lg text-xs font-medium text-slate-700 dark:text-steel hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:translate-x-1 active:scale-[0.99] transition-all duration-150 gap-2"
                                                        >
                                                            <div className="flex items-start gap-2 min-w-0 flex-1">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-sysred dark:group-hover/item:bg-[#ff6b6b] transition-colors shrink-0 mt-1.5" />
                                                                <span className="text-[11px] sm:text-[12px] leading-snug font-medium text-slate-700 dark:text-steel group-hover/item:text-slate-950 dark:group-hover/item:text-white break-words">
                                                                    {sub.name}
                                                                </span>
                                                            </div>
                                                            {sub.items_count !== undefined && sub.items_count > 0 && (
                                                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-steel group-hover/item:bg-red-500/15 group-hover/item:text-sysred dark:group-hover/item:text-[#ff6b6b] transition-colors shrink-0 mt-0.5">
                                                                    {sub.items_count}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Symmetrical Card Footer */}
                                                <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between mt-auto shrink-0">
                                                    <Link
                                                        href={`/products#category-${cat.slug}`}
                                                        onClick={() => setProductsDropdown(false)}
                                                        className="text-[10px] sm:text-[11px] font-mono font-semibold text-sysred dark:text-[#ff6b6b] hover:underline flex items-center gap-1 group-hover/col:translate-x-1 transition-transform"
                                                    >
                                                        <span>Explore Category</span>
                                                        <span>&rarr;</span>
                                                    </Link>
                                                    <span className="text-[10px] font-mono text-slate-400 dark:text-steel">
                                                        SISPL Spec
                                                    </span>
                                                </div>
                                            </div>
                                         ))}
                                    </div>

                                    {/* Right Side Quick Chevron Arrow (Moveable to both sides with circular looping) */}
                                    <button
                                        type="button"
                                        onClick={() => handleManualSlide('next')}
                                        className="flex absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 dark:bg-[#141414]/95 shadow-[0_4px_20px_rgba(0,0,0,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.7)] border border-slate-200 dark:border-white/20 items-center justify-center text-slate-700 dark:text-white hover:text-sysred dark:hover:text-[#ff6b6b] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer pointer-events-auto backdrop-blur-md"
                                        aria-label="Next Slide"
                                        title="Next Products"
                                    >
                                        <svg className="w-5 h-5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Bottom Executive Utility Strip */}
                                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#0d0d0d] -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-3.5 px-6 sm:px-7 flex items-center justify-between gap-4 text-xs shrink-0">
                                    {/* Left Credentials Info */}
                                    <div className="hidden md:flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-steel">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            ISO 9001:2015 &amp; ISO 14001:2015 Certified
                                        </span>
                                        <span>&bull;</span>
                                        <span>GeM OEM</span>
                                        <span>&bull;</span>
                                        <span>Motorola Solutions Partner</span>
                                    </div>

                                    {/* Right CTA */}
                                    <div className="flex items-center gap-4 ml-auto">
                                        <Link 
                                            href="/resources" 
                                            onClick={() => setProductsDropdown(false)}
                                            className="text-slate-600 dark:text-steel hover:text-sysred dark:hover:text-[#ff6b6b] font-mono hover:underline flex items-center gap-1 text-[11px] whitespace-nowrap"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>All 7 Catalogues (PDF)</span>
                                        </Link>

                                        <Link 
                                            href="/products" 
                                            onClick={() => setProductsDropdown(false)}
                                            className="text-sysred dark:text-[#ff6b6b] font-bold font-mono hover:underline flex items-center gap-1 text-[11px] whitespace-nowrap"
                                        >
                                            <span>All Products</span>
                                            <span>&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Controls: Theme Toggle & Request Architecture CTA */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Dual-Tone Theme Toggle Switch */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-lg border border-slate-200 dark:border-navy-border text-slate-700 dark:text-paper/80 hover:text-sysred dark:hover:text-[#ff6b6b] hover:border-sysred/40 dark:hover:border-[#ff6b6b]/40 transition-all duration-200 active:scale-95 bg-white/60 dark:bg-transparent backdrop-blur-sm shadow-sm"
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                /* Sun Icon (to switch to light) */
                                <svg className="w-5 h-5 text-beacon animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                /* Moon Icon (to switch to dark) */
                                <svg 
                                    className="w-5 h-5 text-slate-700 hover:text-sysred transition-colors" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-lg transition-colors text-slate-700 dark:text-paper hover:bg-slate-100 dark:hover:bg-white/5"
                            aria-label="Toggle Navigation"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden bg-white dark:bg-navy border-b border-slate-200 dark:border-navy-border shadow-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                        <span className="text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider font-semibold">
                            NAVIGATION MENU
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 dark:text-steel font-mono">Theme:</span>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="px-2.5 py-1 text-xs rounded border border-slate-200 dark:border-navy-border font-mono text-slate-700 dark:text-paper"
                            >
                                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-2.5 text-base font-medium rounded-lg px-3 transition-colors ${
                                    url === link.href
                                        ? 'bg-red-50 dark:bg-red-500/10 text-sysred dark:text-[#ff6b6b] font-semibold'
                                        : 'text-slate-800 dark:text-paper hover:bg-slate-100 dark:hover:bg-white/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                        <div className="text-xs font-mono text-slate-500 dark:text-steel space-y-1">
                            <div>Direct Tel: +91-011-35004142 / 43 / 44 / 45</div>
                            <div>Email: info@sysinfra.in</div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
