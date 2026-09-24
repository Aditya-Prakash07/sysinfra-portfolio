import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function NewsShow({ post, recentPosts = [], seo = {} }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getExcerpt = (html = '', length = 100) => {
        if (!html) return '';
        const plain = html.replace(/<[^>]+>/g, '').trim();
        return plain.length > length ? plain.substring(0, length) + '...' : plain;
    };

    return (
        <MainLayout>
            <Seo
                title={seo?.title || `${post.title} — System Infra Solutions`}
                description={seo?.description}
                canonicalPath={`/latest-news/${post.slug}`}
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Latest News', url: '/latest-news' },
                    { name: post.title, url: `/latest-news/${post.slug}` },
                ]}
            />

            {/* Header / Article Top */}
            <article className="relative bg-white dark:bg-[#0a0a0a] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <header className="container-content max-w-4xl">
                    {/* Breadcrumb Nav */}
                    <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">HOME</Link>
                        <span>/</span>
                        <Link href="/latest-news" className="hover:text-slate-900 dark:hover:text-white transition-colors">LATEST NEWS</Link>
                        <span>/</span>
                        <span className="text-sysred dark:text-[#ff6b6b] uppercase font-bold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
                    </nav>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
                        <span className="badge-rf text-[10px]">
                            PRESS DISPATCH
                        </span>
                        <span className="text-slate-400 dark:text-steel">•</span>
                        <time className="text-slate-600 dark:text-steel font-medium">
                            {formatDate(post.published_at)}
                        </time>
                    </div>

                    <AnimatedHeading
                        as="h1"
                        immediate={true}
                        stagger={35}
                        className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                    >
                        {post.title}
                    </AnimatedHeading>
                </header>

                {/* Featured Hero Image */}
                {post.cover_image_path && (
                    <div className="container-content max-w-4xl mt-10">
                        <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-xl bg-slate-100 dark:bg-black aspect-[16/9] relative">
                            <img
                                src={`/${post.cover_image_path}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/img/slider/1-1.jpg';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Article Body Content */}
                <div className="container-content max-w-3xl mt-12">
                    <div 
                        className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed space-y-6 font-sans
                            prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                            prose-p:text-slate-700 dark:prose-p:text-slate-300
                            prose-a:text-sysred dark:prose-a:text-[#ff6b6b] prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />

                    {/* Back / Action row */}
                    <div className="mt-14 pt-8 border-t border-slate-200 dark:border-navy-border flex items-center justify-between">
                        <Link
                            href="/latest-news"
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sysred dark:text-[#ff6b6b] hover:underline uppercase tracking-wider"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to All News</span>
                        </Link>

                        <Link
                            href="/contact-us"
                            className="btn-shimmer !py-2 !px-4 text-xs font-mono uppercase font-bold"
                        >
                            Media Inquiries
                        </Link>
                    </div>
                </div>
            </article>

            {/* Recent / Related News Section */}
            {recentPosts.length > 0 && (
                <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                    <div className="container-content">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-paper">
                                More Press Dispatches
                            </h2>
                            <Link href="/latest-news" className="text-xs font-mono text-sysred dark:text-[#ff6b6b] hover:underline font-medium">
                                View Archive &rarr;
                            </Link>
                        </div>

                        <div className={`grid gap-6 w-full ${
                            recentPosts.length === 1
                                ? 'grid-cols-1'
                                : recentPosts.length === 2
                                ? 'grid-cols-1 sm:grid-cols-2'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {recentPosts.map((r) => (
                                <Link
                                    key={r.id || r.slug}
                                    href={`/latest-news/${r.slug}`}
                                    className="card-symmetric p-6 group hover:border-sysred/70 dark:hover:border-sysred/80 hover:shadow-xl dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] hover:-translate-y-1.5 transition-all duration-300"
                                >
                                    <div className="text-[10px] font-mono text-sysred dark:text-[#ff6b6b] font-bold mb-2">
                                        {formatDate(r.published_at)}
                                    </div>
                                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-paper group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors line-clamp-2 leading-snug mb-2">
                                        {r.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-steel line-clamp-2 leading-relaxed">
                                        {getExcerpt(r.body)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
