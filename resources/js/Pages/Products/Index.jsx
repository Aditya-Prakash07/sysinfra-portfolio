import { Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export function toSpacedWords(text = '') {
    return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function toAlphanumericOnly(text = '') {
    return (text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchesSearch(fields = [], query = '') {
    if (!query || !query.trim()) return true;

    const rawQuery = query.toLowerCase().trim();
    const spacedQuery = toSpacedWords(query);
    const alphaQuery = toAlphanumericOnly(query);
    const queryTokens = spacedQuery.split(/\s+/).filter(Boolean);

    // Combine all fields into searchable targets
    const combinedRaw = fields.filter(Boolean).join(' ').toLowerCase();
    const combinedSpaced = toSpacedWords(combinedRaw);
    const combinedAlpha = toAlphanumericOnly(combinedRaw);

    // 1. Direct contains check (raw lowercase)
    if (combinedRaw.includes(rawQuery)) return true;

    // 2. Normalized spaced check (handles dashes, slashes, spaces like "st 200r" vs "st-200r")
    if (spacedQuery && combinedSpaced.includes(spacedQuery)) return true;

    // 3. Compact alphanumeric check (handles "st200r" vs "st-200r" or "pocmcx" vs "poc / mcx")
    if (alphaQuery && combinedAlpha.includes(alphaQuery)) return true;

    // 4. Multi-token check: every word in query must match
    if (queryTokens.length > 0) {
        const allTokensMatch = queryTokens.every((token) => {
            const tokenAlpha = toAlphanumericOnly(token);
            return combinedSpaced.includes(token) || (tokenAlpha && combinedAlpha.includes(tokenAlpha));
        });
        if (allTokensMatch) return true;
    }

    return false;
}

export default function ProductsIndex({ categories = [], seo = {} }) {
    const [search, setSearch] = useState('');

    // Flatten all products across all categories and subcategories with parent hierarchy info
    const allProducts = useMemo(() => {
        const list = [];
        categories.forEach((cat) => {
            cat.subcategories?.forEach((sub) => {
                sub.items?.forEach((item) => {
                    list.push({
                        ...item,
                        categoryName: cat.name,
                        categorySlug: cat.slug,
                        subcategoryName: sub.name,
                        subcategorySlug: sub.slug,
                    });
                });
            });
        });
        return list;
    }, [categories]);

    // Matching products when search is active
    const matchingProducts = useMemo(() => {
        if (!search.trim()) return [];
        return allProducts.filter((item) =>
            matchesSearch(
                [
                    item.name,
                    item.model_number,
                    item.short_description,
                    item.slug,
                    item.subcategoryName,
                    item.categoryName,
                ],
                search
            )
        );
    }, [allProducts, search]);

    // Filter categories & subcategories:
    // Subcategories match if their name/desc matches OR if they contain a matching product.
    const filteredCategories = useMemo(() => {
        if (!search.trim()) return categories;

        return categories
            .map((cat) => {
                const catMatches = matchesSearch([cat.name, cat.description, cat.slug], search);

                const matchingSubs = (cat.subcategories || []).filter((sub) => {
                    const subMatches = matchesSearch([sub.name, sub.description, sub.slug], search);
                    const hasMatchingItem = (sub.items || []).some((item) =>
                        matchesSearch([item.name, item.model_number, item.short_description, item.slug], search)
                    );
                    return subMatches || hasMatchingItem;
                });

                if (catMatches) {
                    return cat;
                }

                if (matchingSubs.length > 0) {
                    return {
                        ...cat,
                        subcategories: matchingSubs,
                    };
                }

                return null;
            })
            .filter(Boolean);
    }, [categories, search]);

    const isSearching = Boolean(search.trim());

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Power Automation, NOC & Infrastructure Products — System Infra Solutions'}
                description={seo?.description || 'Browse AMF controllers, SYS-AXS NOC platforms, 5G smart enclosures, security automation systems, and turnkey site services from System Infra Solutions.'}
                canonicalPath="/products"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' },
                ]}
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#0a0a0a] pt-36 pb-16 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
                        <span>SYSTEM INFRA SOLUTIONS &bull; OFFICIAL PRODUCT CATALOG</span>
                    </div>
                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={40}
                        highlightPhrase="Infrastructure Systems"
                        className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                    >
                        Power Automation & Infrastructure Systems
                    </AnimatedHeading>
                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-steel leading-relaxed font-sans">
                        Engineered for telecom towers, defence establishments, smart cities, and power utilities.
                        Select a product vertical below to explore AMF panels, NOC telemetry, security automation, and turnkey engineering solutions.
                    </p>

                    {/* Search filter input */}
                    <div className="mt-8 max-w-lg relative">
                        <input 
                            type="text"
                            placeholder="Search products (e.g. AMF panel, SYS-AXS, i-Protect, Motorola)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input !bg-slate-50 dark:!bg-navy-surface !border-slate-300 dark:!border-navy-border !text-slate-900 dark:!text-white placeholder:text-slate-400 focus:!border-sysred dark:focus:!border-[#ff6b6b] !pr-16"
                        />
                        {search && (
                            <button 
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-200/60 dark:bg-navy-border/80 transition-colors"
                            >
                                CLEAR
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Catalog & Search Results Grid */}
            <div className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content space-y-16">
                    {/* 1. Direct Matching Products (When search query is active) */}
                    {isSearching && matchingProducts.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-sysred dark:text-[#ff6b6b] font-bold block mb-1">
                                        HARDWARE RESULTS
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-paper flex items-center gap-3">
                                        <span>Matching Products</span>
                                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-sysred dark:text-[#ff6b6b] border border-red-200 dark:border-red-900/60 font-semibold">
                                            {matchingProducts.length} Found
                                        </span>
                                    </h2>
                                </div>
                                <span className="text-xs font-mono text-slate-500 dark:text-steel">
                                    Direct matches across all subcategories
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {matchingProducts.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/products/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`}
                                        className="card-symmetric group relative hover:border-sysred/60 dark:hover:border-[#ff6b6b]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden flex flex-col"
                                    >
                                        {/* Top specular accent line on hover */}
                                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sysred/0 dark:via-[#ff6b6b]/0 to-transparent group-hover:via-sysred dark:group-hover:via-[#ff6b6b] transition-all duration-500 z-20" />

                                        <div className="flex-1 flex flex-col">
                                            {/* Image Pedestal */}
                                            <div className="aspect-[4/3] w-full bg-gradient-to-b from-slate-100/70 via-slate-50/40 to-slate-100/80 dark:bg-black dark:from-black dark:via-black dark:to-black overflow-hidden relative flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/10">
                                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(221,60,52,0.10),transparent_70%)] dark:hidden pointer-events-none" />

                                                <img
                                                    src={`/${item.cover_image_path}`}
                                                    alt={item.name}
                                                    className="max-h-full w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1.5 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.9)] relative z-10"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/img/sys-products/2.jpg';
                                                    }}
                                                />

                                                {item.model_number && (
                                                    <span className="absolute top-3 right-3 z-20 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 dark:bg-neutral-900/90 text-sysred dark:text-[#ff6b6b] border border-white/10">
                                                        {item.model_number}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="p-6 space-y-2 flex-1 flex flex-col">
                                                <div className="text-[11px] font-mono text-sysred dark:text-[#ff6b6b] font-semibold tracking-wide uppercase">
                                                    {item.categoryName} &bull; {item.subcategoryName}
                                                </div>

                                                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors min-h-[3rem] line-clamp-2 leading-snug">
                                                    {item.name}
                                                </h3>

                                                <p className="text-xs sm:text-sm text-slate-600 dark:text-steel min-h-[2.5rem] line-clamp-2 leading-relaxed flex-1">
                                                    {item.short_description || 'High-reliability telecom power and automation equipment engineered for mission-critical operations.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 pt-4 border-t border-slate-100 dark:border-navy-border/40 mt-auto flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                            <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-medium">Technical Specifications</span>
                                            <svg className="w-4 h-4 text-sysred dark:text-[#ff6b6b] transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 2. No Results State */}
                    {isSearching && matchingProducts.length === 0 && filteredCategories.length === 0 && (
                        <div className="panel p-16 text-center text-slate-500 dark:text-steel">
                            <p className="font-mono text-base text-slate-800 dark:text-paper font-semibold">
                                No products or categories matched &ldquo;{search}&rdquo;
                            </p>
                            <p className="mt-2 text-xs font-mono text-slate-500 dark:text-steel max-w-md mx-auto">
                                Tip: Try searching by product name (e.g. AMF panel, SYS-AXS), category (Energy, NOC, Defence), or brand (Motorola).
                            </p>
                            <button 
                                onClick={() => setSearch('')}
                                className="mt-5 btn-beacon !py-2 !px-5 text-xs font-mono uppercase tracking-wider font-bold"
                            >
                                Clear Search Filter
                            </button>
                        </div>
                    )}

                    {/* 3. Categories & Subcategories Tree */}
                    {filteredCategories.length > 0 && (
                        <div className="space-y-16">
                            {isSearching && matchingProducts.length > 0 && (
                                <div className="pt-6">
                                    <span className="text-xs font-mono uppercase tracking-widest text-sysred dark:text-[#ff6b6b] font-bold block mb-1">
                                        BROWSE BY CATEGORY
                                    </span>
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-paper">
                                        Related Categories & Subcategories
                                    </h3>
                                </div>
                            )}

                            {filteredCategories.map((cat) => (
                                <div key={cat.id} id={`category-${cat.slug}`} className="space-y-6 scroll-mt-32">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                                        <div>
                                            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-paper">
                                                {cat.name}
                                            </h2>
                                            {cat.description && (
                                                <p className="text-xs sm:text-sm text-slate-600 dark:text-steel mt-1 max-w-2xl">
                                                    {cat.description}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-xs font-mono text-slate-500 dark:text-steel shrink-0">
                                            {cat.subcategories?.length || 0} Subcategories
                                        </span>
                                    </div>

                                    <div className={`grid gap-6 ${
                                        cat.subcategories?.length === 1 
                                            ? 'grid-cols-1 max-w-md' 
                                            : cat.subcategories?.length === 2 
                                            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl' 
                                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    }`}>
                                        {cat.subcategories?.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/products/${cat.slug}/${sub.slug}`}
                                                className="card-symmetric p-6 group relative hover:border-sysred/60 dark:hover:border-[#ff6b6b]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
                                            >
                                                {/* Top specular accent line on hover */}
                                                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sysred/0 dark:via-[#ff6b6b]/0 to-transparent group-hover:via-sysred dark:group-hover:via-[#ff6b6b] transition-all duration-500 z-20" />

                                                <div className="flex-1 flex flex-col space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="badge-rf text-[10px]">
                                                            ISO 9001 CERTIFIED
                                                        </span>
                                                        <svg className="w-4 h-4 text-slate-400 group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>

                                                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors min-h-[1.75rem]">
                                                        {sub.name}
                                                    </h3>

                                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-steel min-h-[2.5rem] line-clamp-2 leading-relaxed flex-1">
                                                        {sub.description || `High-reliability ${sub.name} equipment and turnkey accessories.`}
                                                    </p>
                                                </div>

                                                <div className="pt-4 mt-auto border-t border-slate-100 dark:border-navy-border/40 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                                    <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-medium">Browse Products</span>
                                                    <svg className="w-4 h-4 text-sysred dark:text-[#ff6b6b] transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom Custom RFQ Banner */}
                    <div className="card-dual !bg-white dark:!bg-navy-surface p-8 sm:p-12 border border-slate-200/80 dark:border-navy-border shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <span className="text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider font-bold block mb-2">
                                CUSTOM TELECOM POWER &amp; NOC AUTOMATION SOLUTIONS
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                Require Custom AMF Controllers, DC Power Systems, or IoT Integration?
                            </h3>
                            <p className="mt-3 text-sm text-slate-600 dark:text-steel leading-relaxed">
                                Our manufacturing and engineering facilities in Patparganj Industrial Area, New Delhi develop custom AMF panels, DC energy systems, ultrasonic fuel sensors, and SYS-AXS telemetry solutions tailored to your operational specifications.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/contact-us" className="btn-beacon !py-3.5 !px-7 font-semibold font-mono text-sm uppercase tracking-wider">
                                Contact Engineering Team
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
