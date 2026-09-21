import { Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function NewsIndex({ posts = [], seo = {} }) {
    const [search, setSearch] = useState('');

    const filteredPosts = useMemo(() => {
        if (!search.trim()) return posts;
        const q = search.toLowerCase().trim();
        return posts.filter((post) => {
            const titleMatch = post.title?.toLowerCase().includes(q);
            const bodyMatch = post.body?.toLowerCase().includes(q);
            return titleMatch || bodyMatch;
        });
    }, [posts, search]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getExcerpt = (html = '', length = 130) => {
        if (!html) return '';
        const plain = html.replace(/<[^>]+>/g, '').trim();
        return plain.length > length ? plain.substring(0, length) + '...' : plain;
    };

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Latest News & Strategic Updates — System Infra Solutions'}
                description={seo?.description || 'Official dispatches, statutory wireless updates, technology breakthroughs, and company milestones from System Infra Solutions.'}
                canonicalPath="/latest-news"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Latest News', url: '/latest-news' },
                ]}
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#0a0a0a] pt-36 pb-16 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
                        <span>INDUSTRY INTELLIGENCE & DISPATCHES</span>
                    </div>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={40}
                        highlight="last"
                        highlightCount={1}
                        className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                    >
                        Latest News & Updates
                    </AnimatedHeading>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-steel leading-relaxed font-sans">
                        Official company dispatches, telecom policy changes, WPC/TEC statutory updates, and mission-critical milestones.
                    </p>

                    {/* Search Input */}
                    <div className="mt-8 max-w-lg relative">
                        <input
                            type="text"
                            placeholder="Search news and announcements..."
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
                </div>
            </header>

            {/* News Grid */}
            <div className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-10 gap-3">
                        <span className="text-xs font-mono uppercase text-slate-500 dark:text-steel font-bold">
                            PRESS ARCHIVE &bull; {filteredPosts.length} {filteredPosts.length === 1 ? 'DISPATCH' : 'DISPATCHES'}
                            {search && <span className="text-blue-600 dark:text-beacon ml-2 font-semibold">(FILTERED)</span>}
                        </span>
                        <Link href="/" className="text-xs font-mono text-blue-600 dark:text-beacon hover:underline inline-flex items-center gap-1.5 font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Return to Home</span>
                        </Link>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="panel p-16 text-center space-y-4">
                            <p className="font-mono text-sm text-slate-700 dark:text-paper font-semibold">
                                {search
                                    ? `No announcements matched "${search}".`
                                    : 'No news articles currently published.'}
                            </p>
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="btn-beacon !py-2 !px-5 text-xs font-mono uppercase tracking-wider font-bold"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    ) : filteredPosts.length === 1 ? (
                        (() => {
                            const post = filteredPosts[0];
                            return (
                                <Link
                                    href={`/latest-news/${post.slug}`}
                                    className="card-symmetric group relative hover:border-blue-500/60 dark:hover:border-beacon/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden flex flex-col md:flex-row w-full"
                                >
                                    {/* Top specular accent line on hover */}
                                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 dark:via-beacon/0 to-transparent group-hover:via-blue-500 dark:group-hover:via-beacon transition-all duration-500 z-20" />

                                    {/* Cover Image Pedestal */}
                                    <div className="w-full md:w-5/12 lg:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[340px] bg-slate-100 dark:bg-black overflow-hidden relative flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/10 shrink-0">
                                        <img
                                            src={post.cover_image_path ? `/${post.cover_image_path}` : '/img/slider/1-1.jpg'}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/img/slider/1-1.jpg';
                                            }}
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/85 dark:bg-neutral-900/90 text-xs font-mono text-sky-300 dark:text-beacon border border-white/10 backdrop-blur-sm shadow-md">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                {formatDate(post.published_at)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold">
                                                    FEATURED DISPATCH
                                                </span>
                                                <span className="text-slate-300 dark:text-steel/40">•</span>
                                                <span className="text-[10px] font-mono text-slate-400 dark:text-steel">
                                                    OFFICIAL ANNOUNCEMENT
                                                </span>
                                            </div>

                                            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors leading-snug">
                                                {post.title}
                                            </h2>

                                            <p className="text-sm sm:text-base text-slate-600 dark:text-steel leading-relaxed">
                                                {getExcerpt(post.body, 280)}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 dark:border-navy-border/40 flex items-center justify-between text-xs sm:text-sm font-mono text-slate-500 dark:text-steel">
                                            <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-semibold inline-flex items-center gap-2">
                                                Read Full Story & Specifications
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-navy-surface flex items-center justify-center text-blue-600 dark:text-beacon group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-beacon dark:group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                                                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()
                    ) : (
                        <div className={`grid gap-8 w-full ${
                            filteredPosts.length === 2
                                ? 'grid-cols-1 md:grid-cols-2'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.id || post.slug}
                                    href={`/latest-news/${post.slug}`}
                                    className="card-symmetric group relative hover:border-blue-500/60 dark:hover:border-beacon/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden flex flex-col"
                                >
                                    {/* Top specular accent line on hover */}
                                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/0 dark:via-beacon/0 to-transparent group-hover:via-blue-500 dark:group-hover:via-beacon transition-all duration-500 z-20" />

                                    <div className="flex-1 flex flex-col">
                                        {/* Cover Image Pedestal */}
                                        <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-black overflow-hidden relative flex items-center justify-center border-b border-slate-100 dark:border-white/10">
                                            <img
                                                src={post.cover_image_path ? `/${post.cover_image_path}` : '/img/slider/1-1.jpg'}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/img/slider/1-1.jpg';
                                                }}
                                            />

                                            <div className="absolute top-3 right-3 z-20">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 dark:bg-neutral-900/90 text-[10px] font-mono text-sky-300 dark:text-beacon border border-white/10 backdrop-blur-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                    {formatDate(post.published_at)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Article Details */}
                                        <div className="p-6 space-y-2.5 flex-1 flex flex-col">
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold">
                                                PRESS DISPATCH
                                            </div>

                                            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-paper group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h2>

                                            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel line-clamp-3 leading-relaxed flex-1">
                                                {getExcerpt(post.body)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="p-6 pt-4 border-t border-slate-100 dark:border-navy-border/40 mt-auto flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                        <span className="group-hover:text-slate-900 dark:group-hover:text-paper font-medium">Read Full Story</span>
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
