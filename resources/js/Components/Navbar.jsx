import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/Context/ThemeContext';
import ApplicationLogo from '@/Components/ApplicationLogo';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'OEM Partners', href: '/oem-partners' },
    { label: 'News', href: '/latest-news' },
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseEnter = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setProductsDropdown(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setProductsDropdown(false);
        }, 180);
    };

    return (
        <header ref={navRef} className="fixed inset-x-0 top-0 z-50 transition-all duration-200">
            {/* Main Navigation Bar (100% Solid Opaque when scrolled) */}
            <div className={`transition-all duration-300 ${
                scrolled
                    ? 'bg-white dark:bg-navy shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] py-3'
                    : 'bg-transparent py-4'
            }`}>
                <nav className="container-content flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center group shrink-0" aria-label="Sanchar Telesystems">
                        <ApplicationLogo 
                            className="h-9 sm:h-10" 
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
                                            className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-2 whitespace-nowrap ${
                                                isOverBanner && theme === 'light'
                                                    ? (isActive ? 'text-blue-600 font-bold' : 'text-slate-800 hover:text-blue-600 font-medium')
                                                    : (isActive ? 'text-blue-600 dark:text-beacon font-semibold' : 'text-slate-700 dark:text-paper/85 hover:text-blue-600 dark:hover:text-beacon')
                                            }`}
                                        >
                                            <span className="whitespace-nowrap">{link.label}</span>
                                            <svg 
                                                className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                                                    productsDropdown 
                                                        ? (isOverBanner && theme === 'light' ? 'rotate-180 text-blue-600' : 'rotate-180 text-blue-600 dark:text-beacon') 
                                                        : (isOverBanner && theme === 'light' ? 'text-slate-600' : 'opacity-60')
                                                }`} 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Link>

                                        {/* Products Mega Dropdown */}
                                        {productsDropdown && (() => {
                                            const radioCat = categoriesNav.find(c => c.slug === 'professional-amateur-radio') || categoriesNav[0];
                                            const pocCat = categoriesNav.find(c => c.slug === 'ptt-over-cellular-poc');
                                            const lteRCat = categoriesNav.find(c => c.slug === 'lte-r');
                                            const captiveCat = categoriesNav.find(c => c.slug === 'captive-lte');
                                            const accessoriesCat = categoriesNav.find(c => c.slug === 'accessories') || categoriesNav[categoriesNav.length - 1];

                                            const broadbandItems = [
                                                ...(pocCat?.subcategories || []).map(s => ({ ...s, catSlug: pocCat.slug })),
                                                ...(lteRCat?.subcategories || []).map(s => ({ ...s, catSlug: lteRCat.slug })),
                                                ...(captiveCat?.subcategories || []).map(s => ({ ...s, catSlug: captiveCat.slug })),
                                            ];

                                            const broadbandCount = (pocCat?.items_count || 0) + (lteRCat?.items_count || 0) + (captiveCat?.items_count || 0);

                                            return (
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[980px] max-w-[95vw] xl:w-[1060px] z-50">
                                                    <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 shadow-2xl rounded-2xl p-6 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                                                        
                                                        {/* Top Telemetry Header */}
                                                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3.5 mb-5">
                                                            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-beacon font-bold">
                                                                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon animate-pulse" />
                                                                <span>SANCHAR WIRELESS ECOSYSTEM &bull; 121 MISSION-CRITICAL HARDWARE SYSTEMS</span>
                                                            </div>
                                                            <Link 
                                                                href="/products" 
                                                                onClick={() => setProductsDropdown(false)}
                                                                className="text-xs font-mono text-slate-500 dark:text-steel hover:text-blue-600 dark:hover:text-beacon transition-colors font-semibold"
                                                            >
                                                                Browse All 121 Products
                                                            </Link>
                                                        </div>

                                                        {/* 3 Symmetrical Architectural Pillars */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                            
                                                            {/* Pillar 1: Land Mobile Radio (LMR) */}
                                                            <div className="group/col flex flex-col justify-between p-4 rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#111111] hover:border-blue-500/40 dark:hover:border-beacon/40 hover:bg-white dark:hover:bg-[#161616] transition-all duration-200">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center shrink-0 group-hover/col:bg-blue-600 group-hover/col:text-white transition-all duration-200">
                                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <Link 
                                                                                href={`/products`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="text-sm font-bold text-slate-900 dark:text-paper group-hover/col:text-blue-600 dark:group-hover/col:text-beacon transition-colors flex items-center gap-1.5"
                                                                            >
                                                                                <span>Radio Communications</span>
                                                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-beacon/20 text-blue-700 dark:text-beacon font-bold">
                                                                                    {radioCat?.items_count ?? 41}
                                                                                </span>
                                                                            </Link>
                                                                            <p className="text-[11px] text-slate-500 dark:text-steel font-mono">
                                                                                DMR &bull; TETRA &bull; P25 &bull; Marine
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-1 mt-3">
                                                                        {(radioCat?.subcategories || []).map((sub) => (
                                                                            <Link
                                                                                key={sub.slug}
                                                                                href={`/products/${radioCat.slug}/${sub.slug}`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="group/item flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-steel hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:translate-x-0.5 active:scale-[0.98] transition-all duration-150"
                                                                            >
                                                                                <div className="flex items-center gap-2 truncate">
                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-blue-600 dark:group-hover/item:bg-beacon transition-colors shrink-0" />
                                                                                    <span className="truncate">{sub.name}</span>
                                                                                </div>
                                                                                {sub.items_count !== undefined && (
                                                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-steel group-hover/item:bg-blue-500/15 group-hover/item:text-blue-700 dark:group-hover/item:text-beacon transition-colors shrink-0">
                                                                                        {sub.items_count}
                                                                                    </span>
                                                                                )}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                                                                    <Link
                                                                        href="/products"
                                                                        onClick={() => setProductsDropdown(false)}
                                                                        className="text-[11px] font-mono font-semibold text-blue-600 dark:text-beacon hover:underline"
                                                                    >
                                                                        Explore all {radioCat?.items_count ?? 41} Radio terminals
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            {/* Pillar 2: Broadband PoC, LTE-R & Captive LTE */}
                                                            <div className="group/col flex flex-col justify-between p-4 rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#111111] hover:border-blue-500/40 dark:hover:border-beacon/40 hover:bg-white dark:hover:bg-[#161616] transition-all duration-200">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center shrink-0 group-hover/col:bg-blue-600 group-hover/col:text-white transition-all duration-200">
                                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <Link 
                                                                                href={`/products`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="text-sm font-bold text-slate-900 dark:text-paper group-hover/col:text-blue-600 dark:group-hover/col:text-beacon transition-colors flex items-center gap-1.5"
                                                                            >
                                                                                <span>PoC & Dedicated LTE</span>
                                                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-beacon/20 text-blue-700 dark:text-beacon font-bold">
                                                                                    {broadbandCount || 12}
                                                                                </span>
                                                                            </Link>
                                                                            <p className="text-[11px] text-slate-500 dark:text-steel font-mono">
                                                                                4G/LTE &bull; Rail LTE-R &bull; Captive
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-1 mt-3">
                                                                        {broadbandItems.map((sub) => (
                                                                            <Link
                                                                                key={sub.slug}
                                                                                href={`/products/${sub.catSlug}/${sub.slug}`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="group/item flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-steel hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:translate-x-0.5 active:scale-[0.98] transition-all duration-150"
                                                                            >
                                                                                <div className="flex items-center gap-2 truncate">
                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-blue-600 dark:group-hover/item:bg-beacon transition-colors shrink-0" />
                                                                                    <span className="truncate">{sub.name}</span>
                                                                                </div>
                                                                                {sub.items_count !== undefined && (
                                                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-steel group-hover/item:bg-blue-500/15 group-hover/item:text-blue-700 dark:group-hover/item:text-beacon transition-colors shrink-0">
                                                                                        {sub.items_count}
                                                                                    </span>
                                                                                )}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                                                                    <Link
                                                                        href="/products"
                                                                        onClick={() => setProductsDropdown(false)}
                                                                        className="text-[11px] font-mono font-semibold text-blue-600 dark:text-beacon hover:underline"
                                                                    >
                                                                        Explore all {broadbandCount || 12} Cellular / LTE systems
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            {/* Pillar 3: OEM RF Accessories & Antennas */}
                                                            <div className="group/col flex flex-col justify-between p-4 rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-[#111111] hover:border-blue-500/40 dark:hover:border-beacon/40 hover:bg-white dark:hover:bg-[#161616] transition-all duration-200">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center shrink-0 group-hover/col:bg-blue-600 group-hover/col:text-white transition-all duration-200">
                                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <Link 
                                                                                href={`/products`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="text-sm font-bold text-slate-900 dark:text-paper group-hover/col:text-blue-600 dark:group-hover/col:text-beacon transition-colors flex items-center gap-1.5"
                                                                            >
                                                                                <span>OEM Accessories</span>
                                                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-beacon/20 text-blue-700 dark:text-beacon font-bold">
                                                                                    {accessoriesCat?.items_count ?? 68}
                                                                                </span>
                                                                            </Link>
                                                                            <p className="text-[11px] text-slate-500 dark:text-steel font-mono">
                                                                                Diamond Japan &bull; Kenwood &bull; RF
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-1 mt-3">
                                                                        {(accessoriesCat?.subcategories || []).map((sub) => (
                                                                            <Link
                                                                                key={sub.slug}
                                                                                href={`/products/${accessoriesCat.slug}/${sub.slug}`}
                                                                                onClick={() => setProductsDropdown(false)}
                                                                                className="group/item flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-steel hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:translate-x-0.5 active:scale-[0.98] transition-all duration-150"
                                                                            >
                                                                                <div className="flex items-center gap-2 truncate">
                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover/item:bg-blue-600 dark:group-hover/item:bg-beacon transition-colors shrink-0" />
                                                                                    <span className="truncate">{sub.name}</span>
                                                                                </div>
                                                                                {sub.items_count !== undefined && (
                                                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-steel group-hover/item:bg-blue-500/15 group-hover/item:text-blue-700 dark:group-hover/item:text-beacon transition-colors shrink-0">
                                                                                        {sub.items_count}
                                                                                    </span>
                                                                                )}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                                                                    <Link
                                                                        href="/products"
                                                                        onClick={() => setProductsDropdown(false)}
                                                                        className="text-[11px] font-mono font-semibold text-blue-600 dark:text-beacon hover:underline"
                                                                    >
                                                                        Explore all {accessoriesCat?.items_count ?? 68} OEM Accessories
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        {/* Bottom Executive Utility Strip */}
                                                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#0d0d0d] -mx-6 -mb-6 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
                                                            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-steel">
                                                                <span className="flex items-center gap-1.5">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                    Govt. of India WPC & TEC Approved
                                                                </span>
                                                                <span>&bull;</span>
                                                                <span>GeM Registered OEM</span>
                                                                <span>&bull;</span>
                                                                <span>MIL-STD-810 Tested</span>
                                                                <span>&bull;</span>
                                                                <span>Authorized Kenwood & Diamond Partner</span>
                                                            </div>
                                                            <Link 
                                                                href="/contact-us" 
                                                                onClick={() => setProductsDropdown(false)}
                                                                className="text-blue-600 dark:text-beacon font-bold hover:underline font-mono text-xs"
                                                            >
                                                                Direct RFQ & Frequency Tuning Desk
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </li>
                                );
                            }

                            return (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors py-2 whitespace-nowrap ${
                                            isOverBanner && theme === 'light'
                                                ? (isActive ? 'text-blue-600 font-bold' : 'text-slate-800 hover:text-blue-600 font-medium')
                                                : (isActive ? 'text-blue-600 dark:text-beacon font-semibold' : 'text-slate-700 dark:text-paper/85 hover:text-blue-600 dark:hover:text-beacon')
                                        }`}
                                    >
                                        <span className="whitespace-nowrap">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Controls: Theme Toggle & Request Architecture CTA */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Dual-Tone Theme Toggle Switch */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-lg border border-slate-200 dark:border-navy-border text-slate-700 dark:text-paper/80 hover:text-blue-600 dark:hover:text-beacon hover:border-blue-500/40 dark:hover:border-beacon/40 transition-all duration-200 active:scale-95 bg-white/60 dark:bg-transparent backdrop-blur-sm shadow-sm"
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
                                    className="w-5 h-5 text-slate-700 hover:text-blue-600 transition-colors" 
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
                        <span className="text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider font-semibold">
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
                                        ? 'bg-blue-50 dark:bg-beacon/10 text-blue-600 dark:text-beacon font-semibold'
                                        : 'text-slate-800 dark:text-paper hover:bg-slate-100 dark:hover:bg-white/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                        <div className="text-xs font-mono text-slate-500 dark:text-steel space-y-1">
                            <div>Direct Tel: +91 (11) 4652 8894</div>
                            <div>Email: info@sanchartelesystems.com</div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
