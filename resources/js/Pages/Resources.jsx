import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';
import { Link } from '@inertiajs/react';

export default function Resources({ catalogues = [], masterCatalogue = null, seo = {} }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(catalogues.map((c) => c.category))];

    const filtered = catalogues.filter((cat) => {
        const matchesCat = selectedCategory === 'All' || cat.category === selectedCategory;
        if (!search.trim()) return matchesCat;

        const q = search.toLowerCase().trim();
        const searchTerms = q.split(/\s+/).filter(Boolean);

        const corpus = [
            cat.title,
            cat.subtitle,
            cat.description,
            cat.category,
            cat.badge,
            cat.filename,
            (cat.title || '').replace(/[-_]/g, ' '),
            (cat.subtitle || '').replace(/[-_]/g, ' '),
            (cat.filename || '').replace(/[-_]/g, ' ')
        ].filter(Boolean).join(' ').toLowerCase();

        const matchesSearch = searchTerms.every(term => corpus.includes(term));
        return matchesCat && matchesSearch;
    });

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Official Product Catalogues & Documentation — System Infra Solutions'}
                description={seo?.description || 'Download official PDF catalogues for System Infra Solutions products including AMF panels, SYS-AXS NOC telemetry, i-Protect tower security, and 5G smart enclosures.'}
                canonicalPath="/resources"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Documentation & Catalogues', url: '/resources' },
                ]}
            />

            {/* Header Section */}
            <header className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-slate-50 dark:bg-[#050505] border-b border-slate-200/80 dark:border-white/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15 pointer-events-none" />
                
                {/* Ambient Red Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dd3c34]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="container-content relative z-10 text-center max-w-5xl mx-auto">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                        OFFICIAL TECHNICAL ARCHIVES &bull; SPECIFICATIONS &amp; BROCHURES
                    </span>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={35}
                        highlightPhrase="Product Catalogues"
                        className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] to-[#f43f5e] dark:from-[#ff6b6b] dark:to-[#fb923c] bg-clip-text text-transparent"
                    >
                        Official Downloadable Product Catalogues &amp; Specs
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
                        Official technical brochures, product data specification sheets, and corporate engineering portfolios directly from our Patparganj R&amp;D archives. Download one-click PDF documents below.
                    </p>

                    {/* Prominent Large Search Area (Directly after the last line) */}
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
                                placeholder="Search by model, keyword (e.g. AMF, SYS-AXS, i-Protect, Smart Box, Dual DG)..."
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
                            {categories.map((c) => {
                                const isSelected = selectedCategory === c;
                                const count = c === 'All' 
                                    ? catalogues.length 
                                    : catalogues.filter(cat => cat.category === c).length;
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setSelectedCategory(c)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                                            isSelected
                                                ? 'bg-sysred text-white font-bold shadow-md shadow-red-500/25 scale-105'
                                                : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-steel border border-slate-200/90 dark:border-white/10'
                                        }`}
                                    >
                                        <span>{c}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            isSelected ? 'bg-black/25 text-white' : 'bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-steel'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live Filter Indicator */}
                        {(search || selectedCategory !== 'All') && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-steel">
                                <span>Found <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> {filtered.length === 1 ? 'catalogue' : 'catalogues'}</span>
                                {search && <span>for &ldquo;{search}&rdquo;</span>}
                                {selectedCategory !== 'All' && <span>in <strong className="text-sysred dark:text-[#ff6b6b]">{selectedCategory}</strong></span>}
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
                    </div>

                    {/* Master Corporate Catalogue Featured Banner */}
                    <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-[#ff5c54]/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_8px_30px_rgba(221,60,52,0.1)] dark:shadow-[0_8px_30px_rgba(221,60,52,0.25)] hover:shadow-[0_20px_45px_-8px_rgba(221,60,52,0.35),0_0_25px_-2px_rgba(221,60,52,0.2)] dark:hover:shadow-[0_0_50px_-4px_rgba(221,60,52,0.65),0_0_25px_-2px_rgba(221,60,52,0.4)] hover:-translate-y-1.5 transition-all duration-300 ease-out text-left relative overflow-hidden group">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sysred text-white">
                                    Primary Master Document
                                </span>
                                <span className="text-xs font-mono text-slate-500 dark:text-steel">
                                    {masterCatalogue?.size || '2.26 MB'} &bull; PDF Format
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                                {masterCatalogue?.title || 'System Infra Solutions Complete Corporate Catalogue'}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                                {masterCatalogue?.description || 'Includes comprehensive technical overviews of AMF power panels, DC smart energy meters, SYS-AXS NOC gateways, small cell enclosures, and 24/7 Pan-India field operations.'}
                            </p>
                        </div>
                        <a
                            href={masterCatalogue?.path || '/download-catalog'}
                            download={masterCatalogue?.filename || 'SystemInfraSolutions_MasterCatalogue.pdf'}
                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-sysred hover:bg-[#b82720] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 select-none cursor-pointer"
                        >
                            <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download Master Catalog (PDF)</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Catalogues Grid Section */}
            <section className="py-14 sm:py-18 bg-slate-50 dark:bg-[#000000] transition-colors duration-300">
                <div className="container-content">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-steel font-bold">
                            Showing {filtered.length} of {catalogues.length} Official Publications
                        </div>
                        <Link 
                            href="/products"
                            className="text-xs font-mono font-bold text-sysred dark:text-[#ff6b6b] hover:underline flex items-center gap-1"
                        >
                            <span>Browse Interactive Web Catalog</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="py-16 px-6 text-center bg-white dark:bg-[#0d0d0d] rounded-2xl border border-slate-200 dark:border-white/10 max-w-xl mx-auto shadow-sm">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-sysred dark:text-[#ff6b6b] flex items-center justify-center mb-4 border border-red-500/20">
                                <svg className="w-8 h-8 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                                No Technical Catalogues Found
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                                No official documents match your search &ldquo;<strong className="text-sysred dark:text-[#ff6b6b]">{search}</strong>&rdquo;{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                <span className="text-xs font-mono text-slate-400">Popular searches:</span>
                                {['AMF Panel', 'SYS-AXS', 'i-Protect', 'Smart Box', 'Dual DG'].map((kw) => (
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
                                Reset Search &amp; Show All Catalogues
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-7">
                            {filtered.map((cat, idx) => (
                            <div 
                                key={cat.id || idx}
                                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-white/10 hover:border-sysred/70 dark:hover:border-[#ff5c54]/80 shadow-[0_8px_30px_rgba(221,60,52,0.1)] dark:shadow-[0_8px_30px_rgba(221,60,52,0.25)] hover:shadow-[0_20px_45px_-8px_rgba(221,60,52,0.35),0_0_25px_-2px_rgba(221,60,52,0.2)] hover:-translate-y-2 dark:hover:shadow-[0_0_50px_-4px_rgba(221,60,52,0.65),0_0_25px_-2px_rgba(221,60,52,0.4)] transition-all duration-300 ease-out overflow-hidden cursor-pointer"
                            >

                                <div>
                                    {/* Badges & File Specs */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/40 text-sysred dark:text-[#ff6b6b] font-bold">
                                            {cat.badge}
                                        </span>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-steel">
                                            <span>{cat.size}</span>
                                            <span>&bull;</span>
                                            <span>PDF</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors leading-snug">
                                        {cat.title}
                                    </h3>

                                    {/* Subtitle */}
                                    {cat.subtitle && (
                                        <p className="text-xs font-mono text-slate-500 dark:text-steel mt-1 font-semibold">
                                            {cat.subtitle}
                                        </p>
                                    )}

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-sans">
                                        {cat.description}
                                    </p>
                                </div>

                                {/* Bottom Action Buttons */}
                                <div className="pt-5 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center gap-2.5">
                                    {/* Direct Download Button */}
                                    <a
                                        href={cat.path}
                                        download={cat.filename}
                                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sysred hover:bg-[#b82720] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer select-none"
                                        title={`Download ${cat.filename} directly`}
                                    >
                                        <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>Download PDF</span>
                                    </a>

                                    {/* Preview in New Tab Button */}
                                    <a
                                        href={cat.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-slate-600 dark:text-steel hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                        title="View PDF in browser"
                                        aria-label="View PDF"
                                    >
                                        <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}

                    {/* Support Notice */}
                    <div className="mt-14 p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 hover:border-sysred/50 dark:hover:border-[#ff5c54]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono shadow-[0_8px_30px_rgba(221,60,52,0.1)] dark:shadow-[0_8px_30px_rgba(221,60,52,0.25)] hover:shadow-[0_20px_45px_-8px_rgba(221,60,52,0.35),0_0_25px_-2px_rgba(221,60,52,0.2)] hover:-translate-y-1 transition-all duration-300 ease-out">
                        <div className="space-y-1">
                            <span className="text-slate-900 dark:text-white font-bold block">
                                Need custom tender technical compliance or WPC type approvals?
                            </span>
                            <span className="text-slate-500 dark:text-steel">
                                Our engineering team can provide signed technical drawings, factory acceptance test (FAT) templates, and GeM specifications.
                            </span>
                        </div>
                        <Link 
                            href="/contact-us"
                            className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold uppercase tracking-wider shrink-0 transition-colors"
                        >
                            Contact Engineering Desk &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
