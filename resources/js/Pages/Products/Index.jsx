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
    const [selectedCategory, setSelectedCategory] = useState('All');

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

    // Matching products when search is active or category filter is applied
    const matchingProducts = useMemo(() => {
        if (!search.trim()) return [];
        return allProducts.filter((item) => {
            const matchesCat = selectedCategory === 'All' || item.categorySlug === selectedCategory;
            const matchesQuery = matchesSearch(
                [
                    item.name,
                    item.model_number,
                    item.short_description,
                    item.slug,
                    item.subcategoryName,
                    item.categoryName,
                ],
                search
            );
            return matchesCat && matchesQuery;
        });
    }, [allProducts, search, selectedCategory]);

    // Filter categories & subcategories based on selected category & search query
    const filteredCategories = useMemo(() => {
        const baseCategories = selectedCategory === 'All'
            ? categories
            : categories.filter((c) => c.slug === selectedCategory);

        if (!search.trim()) return baseCategories;

        return baseCategories
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
    }, [categories, search, selectedCategory]);

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
            <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-slate-50 dark:bg-[#050505] border-b border-slate-200/80 dark:border-white/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15 pointer-events-none" />
                
                {/* Ambient Red Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dd3c34]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="container-content relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                        SYSTEM INFRA SOLUTIONS &bull; OFFICIAL PRODUCT CATALOG
                    </span>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={40}
                        highlightPhrase="Infrastructure Systems"
                        className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] to-[#f43f5e] dark:from-[#ff6b6b] dark:to-[#fb923c] bg-clip-text text-transparent"
                    >
                        Power Automation &amp; Infrastructure Systems
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
                        Engineered for telecom towers, defence establishments, smart cities, and power utilities.
                        Select a product vertical below to explore AMF panels, NOC telemetry, security automation, and turnkey engineering solutions.
                    </p>

                    {/* Big Prominent Search & Category Filter Hub (Directly after the last line) */}
                    <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
                        <div className="relative flex items-center w-full rounded-2xl bg-white dark:bg-[#111111] border-2 border-slate-300/80 dark:border-white/15 focus-within:border-sysred dark:focus-within:border-[#ff6b6b] shadow-[0_8px_30px_rgba(221,60,52,0.1)] dark:shadow-[0_8px_30px_rgba(221,60,52,0.25)] transition-all duration-300 group">
                            {/* Search Lens Icon */}
                            <div className="absolute left-4 sm:left-5 pointer-events-none text-sysred dark:text-[#ff6b6b] flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Search Input */}
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products by model, keyword (e.g. AMF Panel, SYS-AXS, i-Protect, Smart Box)..."
                                className="w-full h-14 sm:h-16 pl-12 sm:pl-14 pr-24 sm:pr-28 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-lg font-sans tracking-tight focus:outline-none border-0 ring-0 focus:ring-0"
                            />

                            {/* Clear button and live tag */}
                            <div className="absolute right-3 sm:right-4 flex items-center gap-2">
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                        title="Clear search query"
                                    >
                                        <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-sysred/10 dark:bg-sysred/20 text-sysred dark:text-[#ff6b6b] font-mono text-[11px] font-bold uppercase tracking-wider">
                                    Search
                                </span>
                            </div>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('All')}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                                    selectedCategory === 'All'
                                        ? 'bg-sysred text-white font-bold shadow-md shadow-red-500/25 scale-105'
                                        : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-steel border border-slate-200/90 dark:border-white/10'
                                }`}
                            >
                                <span>All Products</span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                    selectedCategory === 'All' ? 'bg-black/25 text-white' : 'bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-steel'
                                }`}>
                                    {allProducts.length}
                                </span>
                            </button>

                            {categories.map((cat) => {
                                const isSelected = selectedCategory === cat.slug;
                                const itemCount = (cat.subcategories || []).reduce((acc, sub) => acc + (sub.items?.length || 0), 0);
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(isSelected ? 'All' : cat.slug)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                                            isSelected
                                                ? 'bg-sysred text-white font-bold shadow-md shadow-red-500/25 scale-105'
                                                : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-steel border border-slate-200/90 dark:border-white/10'
                                        }`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            isSelected ? 'bg-black/25 text-white' : 'bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-steel'
                                        }`}>
                                            {itemCount}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live Filter Indicator */}
                        {(search || selectedCategory !== 'All') && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-steel">
                                <span>
                                    Found <strong className="text-slate-900 dark:text-white">
                                        {isSearching 
                                            ? matchingProducts.length 
                                            : (selectedCategory !== 'All' 
                                                ? allProducts.filter(p => p.categorySlug === selectedCategory).length 
                                                : allProducts.length)
                                        }
                                    </strong> products
                                </span>
                                {search && <span>matching &ldquo;{search}&rdquo;</span>}
                                {selectedCategory !== 'All' && (
                                    <span>in <strong className="text-sysred dark:text-[#ff6b6b]">{categories.find(c => c.slug === selectedCategory)?.name}</strong></span>
                                )}
                                <span>&bull;</span>
                                <button
                                    type="button"
                                    onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                                    className="text-sysred dark:text-[#ff6b6b] hover:underline font-bold cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {/* CTAs Quick Action Strip */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200/60 dark:border-white/10">
                            <a
                                href="/download-catalog"
                                download="SystemInfraSolutions_MasterCatalogue.pdf"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sysred hover:bg-[#b82720] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0 select-none cursor-pointer"
                                title="Download official corporate product catalogue (PDF)"
                            >
                                <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Download Full Catalog (PDF)</span>
                            </a>

                            <Link
                                href="/resources"
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 hover:border-sysred/50 dark:hover:border-[#ff6b6b]/40 text-slate-700 dark:text-steel hover:text-sysred dark:hover:text-[#ff6b6b] font-mono text-xs uppercase tracking-wider font-semibold transition-colors shrink-0 bg-white dark:bg-[#141414]"
                                title="View all 7 official technical catalogues"
                            >
                                <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>All 7 Technical Catalogues</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
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
                                        className="card-symmetric group relative hover:border-sysred/70 dark:hover:border-[#ff6b6b]/70 hover:shadow-[0_18px_45px_-8px_rgba(221,60,52,0.22),0_6px_20px_-3px_rgba(0,0,0,0.06)] hover:-translate-y-2 dark:hover:shadow-[0_0_45px_-4px_rgba(221,60,52,0.6),0_0_20px_-2px_rgba(221,60,52,0.35)] transition-all duration-300 ease-out overflow-hidden flex flex-col"
                                    >
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
                        <div className="py-16 px-6 text-center bg-white dark:bg-[#0d0d0d] rounded-2xl border border-slate-200 dark:border-white/10 max-w-xl mx-auto shadow-sm">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-sysred dark:text-[#ff6b6b] flex items-center justify-center mb-4 border border-red-500/20">
                                <svg className="w-8 h-8 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                                No Equipment or Categories Found
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                                No products matched your query &ldquo;<strong className="text-sysred dark:text-[#ff6b6b]">{search}</strong>&rdquo;
                                {selectedCategory !== 'All' ? ` in ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}` : ''}.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                <span className="text-xs font-mono text-slate-400">Popular searches:</span>
                                {['AMF Panel', 'SYS-AXS NOC', 'i-Protect', 'Smart Box', 'Dual DG', 'DC Meter'].map((kw) => (
                                    <button
                                        key={kw}
                                        type="button"
                                        onClick={() => { setSearch(kw); setSelectedCategory('All'); }}
                                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-white transition-colors cursor-pointer"
                                    >
                                        {kw}
                                    </button>
                                ))}
                            </div>
                            <button 
                                type="button"
                                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sysred hover:bg-[#b82720] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                            >
                                Reset Search &amp; Show All Products
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
                                                className="card-symmetric p-6 group relative hover:border-sysred/70 dark:hover:border-[#ff6b6b]/70 hover:shadow-[0_18px_45px_-8px_rgba(221,60,52,0.22),0_6px_20px_-3px_rgba(0,0,0,0.06)] hover:-translate-y-2 dark:hover:shadow-[0_0_45px_-4px_rgba(221,60,52,0.6),0_0_20px_-2px_rgba(221,60,52,0.35)] transition-all duration-300 ease-out overflow-hidden"
                                            >
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
