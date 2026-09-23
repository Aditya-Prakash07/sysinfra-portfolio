import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import AnimatedHeading from '@/Components/AnimatedHeading';
import Seo from '@/Components/Seo';

export default function Events({ events = [], seo = {} }) {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [activeModalImage, setActiveModalImage] = useState(null);

    const categories = ['ALL', 'Festival Celebration', 'New Year Celebration', 'Technology & Industry Expos'];

    const filteredEvents = selectedCategory === 'ALL'
        ? events
        : events.filter(e => e.category === selectedCategory);

    // Collect all individual gallery images with their parent context for a rich visual mosaic
    const allGalleryItems = [];
    events.forEach(evt => {
        (evt.images || []).forEach(img => {
            allGalleryItems.push({
                src: img,
                category: evt.category,
                title: evt.title,
                date: evt.date
            });
        });
    });

    const filteredGalleryItems = selectedCategory === 'ALL'
        ? allGalleryItems
        : allGalleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-paper dark:bg-[#000000] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
            <Seo seo={seo} />
            <Navbar />

            {/* =========================================================================
                1. HERO SECTION — MEDIA & EVENT GALLERY
            ========================================================================= */}
            <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-slate-50 dark:bg-[#050505] border-b border-slate-200/80 dark:border-white/10">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-15 pointer-events-none" />
                
                {/* Ambient Red Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dd3c34]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="container-content relative z-10 text-center max-w-4xl mx-auto">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                        MEDIA CENTER &amp; EVENT GALLERY
                    </span>

                    <AnimatedHeading
                        as="h1"
                        highlight="last"
                        highlightCount={1}
                        className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
                        gradientClass="bg-gradient-to-r from-[#dd3c34] to-[#f43f5e] dark:from-[#ff6b6b] dark:to-[#fb923c] bg-clip-text text-transparent"
                    >
                        Celebrations &amp; Milestones
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
                        Experience the vibrant culture, team celebrations, festival joy, and technology expos from the authentic archives of System Infra Solutions.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-medium transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? 'bg-[#dd3c34] text-white shadow-lg shadow-red-500/25 scale-105'
                                        : 'bg-white dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#dd3c34]/40 hover:text-[#dd3c34]'
                                }`}
                            >
                                {cat === 'ALL' ? 'All Highlights' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                2. EVENT STORY CARDS (FESTIVALS, NEW YEAR, IMC)
            ========================================================================= */}
            <section className="py-12 sm:py-16 bg-white dark:bg-[#000000]">
                <div className="container-content">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {filteredEvents.map((evt, idx) => (
                            <div 
                                key={evt.title}
                                className="group rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 overflow-hidden hover:border-[#dd3c34]/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveModalImage(`/${evt.cover}`)}>
                                    <img 
                                        src={`/${evt.cover}`} 
                                        alt={evt.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#dd3c34] text-white uppercase tracking-wider">
                                            {evt.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                                        {evt.date} • {evt.images.length} Photos
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-[#dd3c34] transition-colors">
                                            {evt.title}
                                        </h3>
                                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                            {evt.description}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                                        <span>System Infra Solutions Delhi HQ</span>
                                        <button 
                                            type="button" 
                                            onClick={() => setActiveModalImage(`/${evt.cover}`)}
                                            className="text-[#dd3c34] dark:text-[#ff6b6b] font-semibold hover:underline flex items-center gap-1"
                                        >
                                            View Photo &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* =========================================================================
                        3. HIGH-DENSITY PHOTO MOSAIC GRID (ALL AUTHENTIC ASSETS)
                    ========================================================================= */}
                    <div className="border-t border-slate-200 dark:border-white/10 pt-12">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                    LIVE ARCHIVE GALLERY
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                                    Photo Mosaic ({filteredGalleryItems.length} Images)
                                </h2>
                            </div>
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                Click any photograph to expand in high definition
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                            {filteredGalleryItems.map((item, idx) => (
                                <div
                                    key={`${item.src}-${idx}`}
                                    onClick={() => setActiveModalImage(`/${item.src}`)}
                                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-[#dd3c34] hover:shadow-xl hover:shadow-red-500/15 cursor-pointer transition-all duration-300"
                                >
                                    <img
                                        src={`/${item.src}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                                        <p className="text-[10px] sm:text-[11px] font-mono font-medium text-white truncate">
                                            {item.title}
                                        </p>
                                        <span className="text-[9px] font-mono text-[#ff6b6b]">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {activeModalImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setActiveModalImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => setActiveModalImage(null)}
                            className="absolute -top-12 right-0 text-white/80 hover:text-white font-mono text-sm flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20"
                        >
                            <span>Close [ESC]</span>
                            &times;
                        </button>
                        <img
                            src={activeModalImage}
                            alt="Celebration view"
                            className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/20"
                        />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
