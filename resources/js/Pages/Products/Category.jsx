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

    const combinedRaw = fields.filter(Boolean).join(' ').toLowerCase();
    const combinedSpaced = toSpacedWords(combinedRaw);
    const combinedAlpha = toAlphanumericOnly(combinedRaw);

    if (combinedRaw.includes(rawQuery)) return true;
    if (spacedQuery && combinedSpaced.includes(spacedQuery)) return true;
    if (alphaQuery && combinedAlpha.includes(alphaQuery)) return true;

    if (queryTokens.length > 0) {
        const allTokensMatch = queryTokens.every((token) => {
            const tokenAlpha = toAlphanumericOnly(token);
            return combinedSpaced.includes(token) || (tokenAlpha && combinedAlpha.includes(tokenAlpha));
        });
        if (allTokensMatch) return true;
    }

    return false;
}

export default function ProductsCategory({ category, subcategory, items = [], seo = {} }) {
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => {
        if (!search.trim()) return items;
        return items.filter((item) =>
            matchesSearch([item.name, item.model_number, item.short_description, item.slug], search)
        );
    }, [items, search]);

    return (
        <MainLayout>
            <Seo
                title={seo?.title || `${subcategory.name} — System Infra Solutions`}
                description={seo?.description || `Explore ${subcategory.name} infrastructure solutions from System Infra Solutions.`}
                canonicalPath={`/products/${category.slug}/${subcategory.slug}`}
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' },
                    { name: subcategory.name, url: `/products/${category.slug}/${subcategory.slug}` },
                ]}
            />

            {/* Header */}
            <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-slate-50 dark:bg-[#050505] border-b border-slate-200/80 dark:border-white/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15 pointer-events-none" />
                
                {/* Ambient Red Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dd3c34]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="container-content relative z-10 text-center max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">HOME</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-slate-900 dark:hover:text-white transition-colors">PRODUCTS</Link>
                        <span>/</span>
                        <span className="text-sysred dark:text-[#ff6b6b] uppercase font-bold">{subcategory.name}</span>
                    </nav>

                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                        {category.name}
                    </span>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={40}
                        highlight="last"
                        highlightCount={1}
                        className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] to-[#f43f5e] dark:from-[#ff6b6b] dark:to-[#fb923c] bg-clip-text text-transparent"
                    >
                        {subcategory.name}
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
                        {subcategory.description || `Browse high-durability ${subcategory.name} equipment and systems engineered for mission-critical deployments across India.`}
                    </p>

                    {/* Subcategory Search filter input */}
                    {items.length > 0 && (
                        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
                            <div className="relative flex items-center w-full rounded-2xl bg-white dark:bg-[#111111] border-2 border-slate-300/80 dark:border-white/15 focus-within:border-sysred dark:focus-within:border-[#ff6b6b] shadow-lg shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/50 transition-all duration-300 group">
                                <div className="absolute left-4 sm:left-5 pointer-events-none text-sysred dark:text-[#ff6b6b] flex items-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={`Search within ${subcategory.name} (e.g. model, specs)...`}
                                    className="w-full h-14 sm:h-15 pl-12 sm:pl-14 pr-24 sm:pr-28 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-lg font-sans tracking-tight focus:outline-none border-0 ring-0 focus:ring-0"
                                />
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
                                        Filter
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Items Grid */}
            <div className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-10 gap-3 border-b border-slate-200 dark:border-white/10">
                        <span className="text-xs font-mono uppercase text-slate-500 dark:text-steel font-bold">
                            HARDWARE CATALOG &bull; {filteredItems.length} OF {items.length} {items.length === 1 ? 'UNIT' : 'UNITS'}
                            {search && <span className="text-sysred dark:text-[#ff6b6b] ml-2 font-semibold">(FILTERED)</span>}
                        </span>
                        <Link href="/products" className="text-xs font-mono text-sysred dark:text-[#ff6b6b] hover:underline inline-flex items-center gap-1.5 font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Return to All Categories</span>
                        </Link>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="py-16 px-6 text-center bg-white dark:bg-[#0d0d0d] rounded-2xl border border-slate-200 dark:border-white/10 max-w-xl mx-auto shadow-sm">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-sysred dark:text-[#ff6b6b] flex items-center justify-center mb-4 border border-red-500/20">
                                <svg className="w-8 h-8 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {search ? (
                                <>
                                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                                        No Matching Equipment
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                                        No items matched &ldquo;<strong className="text-sysred dark:text-[#ff6b6b]">{search}</strong>&rdquo; in {subcategory.name}.
                                    </p>
                                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setSearch('')}
                                            className="px-5 py-2.5 rounded-full bg-sysred hover:bg-[#b82720] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer"
                                        >
                                            Reset Filter
                                        </button>
                                        <Link 
                                            href="/products" 
                                            className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/15 hover:border-sysred/50 text-slate-700 dark:text-steel hover:text-sysred dark:hover:text-[#ff6b6b] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                                        >
                                            Search All Categories &rarr;
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                                        Direct Supply &amp; Custom RFP
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-steel mt-2 max-w-md mx-auto">
                                        Direct supply models available via custom RFP quotation from our Patparganj facility.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sysred hover:bg-[#b82720] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all">
                                            Request Custom Hardware Specs
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className={`grid gap-8 ${
                            filteredItems.length === 1 
                                ? 'grid-cols-1 max-w-md' 
                                : filteredItems.length === 2 
                                ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl' 
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {filteredItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/products/${category.slug}/${subcategory.slug}/${item.slug}`}
                                    className="card-symmetric group relative hover:border-sysred/60 dark:hover:border-[#ff6b6b]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
                                >
                                    {/* Top specular accent line on hover */}
                                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sysred/0 dark:via-[#ff6b6b]/0 to-transparent group-hover:via-sysred dark:group-hover:via-[#ff6b6b] transition-all duration-500 z-20" />

                                    <div className="flex-1 flex flex-col">
                                        {/* Image Pedestal with deep black in dark mode */}
                                        <div className="aspect-[4/3] w-full bg-gradient-to-b from-slate-100/70 via-slate-50/40 to-slate-100/80 dark:bg-black dark:from-black dark:via-black dark:to-black overflow-hidden relative flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/10">
                                            {/* Subtle radial spotlight in light mode */}
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

                                        <div className="p-6 space-y-2 flex-1 flex flex-col">
                                            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors min-h-[3.25rem] line-clamp-2 leading-snug">
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
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
