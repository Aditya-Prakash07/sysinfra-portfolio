import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';
import { Link } from '@inertiajs/react';

export default function Resources({ catalogues = [], seo = {} }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(catalogues.map((c) => c.category))];

    const filtered = catalogues.filter((cat) => {
        const matchesCat = selectedCategory === 'All' || cat.category === selectedCategory;
        const matchesSearch = 
            cat.title.toLowerCase().includes(search.toLowerCase()) ||
            cat.subtitle.toLowerCase().includes(search.toLowerCase()) ||
            cat.description.toLowerCase().includes(search.toLowerCase());
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
            <header className="relative bg-white dark:bg-[#0a0a0a] pt-36 pb-16 overflow-hidden transition-colors duration-300 border-b border-slate-100 dark:border-white/10">
                <div className="container-content relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
                        <span>OFFICIAL TECHNICAL ARCHIVES &bull; sysinfra.in/resource.php</span>
                    </div>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={35}
                        highlightPhrase="Product Catalogues"
                        className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                    >
                        Official Downloadable Product Catalogues & Specs
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-steel leading-relaxed font-sans max-w-3xl">
                        Official technical brochures, product data specification sheets, and corporate engineering portfolios directly from our Patparganj R&amp;D archives. Download one-click PDF documents below.
                    </p>

                    {/* Master Corporate Catalogue Featured Banner */}
                    <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-red-500/10 via-slate-50 to-white dark:from-red-950/20 dark:via-[#121212] dark:to-[#0f0f0f] border border-sysred/30 dark:border-[#ff6b6b]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sysred text-white">
                                    Primary Master Document
                                </span>
                                <span className="text-xs font-mono text-slate-500 dark:text-steel">
                                    2.26 MB &bull; PDF Format
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                                System Infra Solutions Complete Corporate Catalogue
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                                Includes comprehensive technical overviews of AMF power panels, DC smart energy meters, SYS-AXS NOC gateways, small cell enclosures, and 24/7 Pan-India field operations.
                            </p>
                        </div>
                        <a
                            href="/download-catalog"
                            download="SystemInfraSolutions_MasterCatalogue.pdf"
                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-sysred hover:bg-[#b82720] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 select-none cursor-pointer"
                        >
                            <svg className="w-4 h-4 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download Master Catalog (PDF)</span>
                        </a>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search catalogues (e.g. AMF, SIS-AXS, i-Protect, Smart Box)..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input !bg-slate-50 dark:!bg-navy-surface !border-slate-300 dark:!border-navy-border !text-slate-900 dark:!text-white placeholder:text-slate-400 focus:!border-sysred dark:focus:!border-[#ff6b6b] !pr-10 w-full"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setSelectedCategory(c)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer select-none ${
                                        selectedCategory === c
                                            ? 'bg-sysred text-white font-bold shadow-sm'
                                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-steel'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {filtered.map((cat, idx) => (
                            <div 
                                key={cat.id || idx}
                                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-white/10 hover:border-sysred/50 dark:hover:border-[#ff6b6b]/40 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.25)] transition-all duration-300 overflow-hidden"
                            >
                                {/* Top Edge Red Specular Glow */}
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred/0 dark:via-[#ff6b6b]/0 to-transparent group-hover:via-sysred dark:group-hover:via-[#ff6b6b] transition-all duration-500" />

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

                    {/* Support Notice */}
                    <div className="mt-14 p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
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
