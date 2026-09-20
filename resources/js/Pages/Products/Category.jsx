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
                title={seo?.title || `${subcategory.name} — Sanchar Telesystems`}
                description={seo?.description || `Explore ${subcategory.name} wireless communication equipment from Sanchar Telesystems.`}
                canonicalPath={`/products/${category.slug}/${subcategory.slug}`}
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' },
                    { name: subcategory.name, url: `/products/${category.slug}/${subcategory.slug}` },
                ]}
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#0a0a0a] pt-36 pb-16 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">HOME</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-slate-900 dark:hover:text-white transition-colors">PRODUCTS</Link>
                        <span>/</span>
                        <span className="text-blue-600 dark:text-beacon uppercase font-bold">{subcategory.name}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <span className="badge-rf text-xs mb-3">
                            {category.name}
                        </span>
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlight="last"
                            highlightCount={1}
                            className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            {subcategory.name}
                        </AnimatedHeading>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-steel leading-relaxed font-sans">
                            {subcategory.description || `Browse high-durability ${subcategory.name} equipment and systems engineered for mission-critical deployments across India.`}
                        </p>

                        {/* Subcategory Search filter input */}
                        {items.length > 0 && (
                            <div className="mt-8 max-w-lg relative">
                                <input 
                                    type="text"
                                    placeholder={`Search in ${subcategory.name} (e.g. ST-200R, NX-3220)...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input !bg-slate-50 dark:!bg-navy-surface !border-slate-300 dark:!border-navy-border !text-slate-900 dark:!text-white placeholder:text-slate-400 focus:!border-blue-500 dark:focus:!border-beacon !pr-16"
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
                        )}
                    </div>
                </div>
            </header>

            {/* Items Grid */}
            <div className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-10 gap-3">
                        <span className="text-xs font-mono uppercase text-slate-500 dark:text-steel font-bold">
                            HARDWARE CATALOG &bull; {filteredItems.length} OF {items.length} {items.length === 1 ? 'UNIT' : 'UNITS'}
                            {search && <span className="text-blue-600 dark:text-beacon ml-2 font-semibold">(FILTERED)</span>}
                        </span>
                        <Link href="/products" className="text-xs font-mono text-blue-600 dark:text-beacon hover:underline inline-flex items-center gap-1.5 font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Return to All Categories</span>
                        </Link>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="panel p-16 text-center space-y-4">
                            {search ? (
                                <>
                                    <p className="font-mono text-sm text-slate-700 dark:text-paper font-semibold">
                                        No products matched &ldquo;{search}&rdquo; in {subcategory.name}.
                                    </p>
                                    <p className="text-xs font-mono text-slate-500 dark:text-steel">
                                        Try searching across all categories or check for alternative model numbers.
                                    </p>
                                    <div className="pt-2 flex items-center justify-center gap-4">
                                        <button 
                                            onClick={() => setSearch('')}
                                            className="btn-beacon !py-2 !px-5 text-xs font-mono uppercase tracking-wider font-bold"
                                        >
                                            Reset Filter
                                        </button>
                                        <Link 
                                            href="/products" 
                                            className="text-xs font-mono text-blue-600 dark:text-beacon hover:underline"
                                        >
                                            Search All Categories
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="font-mono text-sm text-slate-600 dark:text-steel">
                                        Direct supply models available via custom RFP quotation.
                                    </p>
                                    <Link href="/contact-us" className="btn-beacon !py-2.5 !px-6 text-xs font-mono uppercase tracking-wider font-bold">
                                        Request Custom Hardware Specs
                                    </Link>
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
                                    className="card-symmetric group relative hover:border-blue-500/60 dark:hover:border-beacon/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden"
                                >
                                    {/* Top specular accent line on hover */}
                                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 dark:via-beacon/0 to-transparent group-hover:via-blue-500 dark:group-hover:via-beacon transition-all duration-500 z-20" />

                                    <div className="flex-1 flex flex-col">
                                        {/* Image Pedestal with deep black in dark mode */}
                                        <div className="aspect-[4/3] w-full bg-gradient-to-b from-slate-100/70 via-slate-50/40 to-slate-100/80 dark:bg-black dark:from-black dark:via-black dark:to-black overflow-hidden relative flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/10">
                                            {/* Subtle radial spotlight in light mode */}
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] dark:hidden pointer-events-none" />

                                            <img
                                                src={`/storage/${item.cover_image_path}`}
                                                alt={item.name}
                                                className="max-h-full w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1.5 drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.9)] relative z-10"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/storage/media/products/1559989450_nx3220_ht.jpg';
                                                }}
                                            />

                                            {item.model_number && (
                                                <span className="absolute top-3 right-3 z-20 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 dark:bg-neutral-900/90 text-sky-300 dark:text-beacon border border-white/10">
                                                    {item.model_number}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-6 space-y-2 flex-1 flex flex-col">
                                            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors min-h-[3.25rem] line-clamp-2 leading-snug">
                                                {item.name}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel min-h-[2.5rem] line-clamp-2 leading-relaxed flex-1">
                                                {item.short_description || 'High-reliability wireless communication equipment engineered for critical operations.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-4 border-t border-slate-100 dark:border-navy-border/40 mt-auto flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                        <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-medium">Technical Specifications</span>
                                        <svg className="w-4 h-4 text-blue-600 dark:text-beacon transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
