import { Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function ProductsShow({ category, subcategory, item, seo = {} }) {
    const [activeTab, setActiveTab] = useState('specs');
    const [rfqModalOpen, setRfqModalOpen] = useState(false);

    // Normalize specifications: [{label, value}]
    const specs = Array.isArray(item.specifications) ? item.specifications : [];

    return (
        <MainLayout>
            <Seo
                title={seo?.title || `${item.name} | System Infra Solutions`}
                description={seo?.description || item.short_description || `Technical specifications, input power ratings, telemetry interfaces, and features for ${item.name}.`}
                canonicalPath={`/products/${category.slug}/${subcategory.slug}/${item.slug}`}
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Products', url: '/products' },
                    { name: subcategory.name, url: `/products/${category.slug}/${subcategory.slug}` },
                    { name: item.name, url: `/products/${category.slug}/${subcategory.slug}/${item.slug}` },
                ]}
                product={item}
            />

            {/* Breadcrumb Header */}
            <div className="bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-paper pt-32 pb-8 transition-colors duration-300">
                <div className="container-content">
                    <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">HOME</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-slate-900 dark:hover:text-white transition-colors">PRODUCTS</Link>
                        <span>/</span>
                        <Link href={`/products/${category.slug}/${subcategory.slug}`} className="hover:text-slate-900 dark:hover:text-white transition-colors uppercase">
                            {subcategory.name}
                        </Link>
                        <span>/</span>
                        <span className="text-sysred dark:text-[#ff6b6b] font-bold truncate max-w-[200px] sm:max-w-none">{item.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Hero & Specifications */}
            <div className="py-16 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* Hardware Image Showcase */}
                        <div className="lg:col-span-5">
                            <div className="aspect-square flex items-center justify-center relative group overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50/40 to-slate-100/80 dark:bg-black dark:from-black dark:via-black dark:to-black border border-slate-200/90 dark:border-white/10 rounded-2xl shadow-xl">
                                {/* Radial Spotlight in light mode */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(221,60,52,0.10),transparent_70%)] dark:hidden pointer-events-none" />

                                <img
                                    src={`/${item.cover_image_path}`}
                                    alt={item.name}
                                    className="max-h-full max-w-full w-auto object-contain transition-all duration-500 group-hover:scale-108 drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] relative z-10"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/img/sys-products/2.jpg';
                                    }}
                                />

                                {item.model_number && (
                                    <span className="absolute top-4 right-4 z-20 text-xs font-mono px-3 py-1 rounded-full bg-slate-900/90 dark:bg-neutral-900/90 text-sysred dark:text-[#ff6b6b] border border-white/10 font-bold">
                                        MODEL: {item.model_number}
                                    </span>
                                )}
                            </div>

                            {/* Actions under image */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRfqModalOpen(true)}
                                    className="flex-1 btn-beacon !py-3 font-mono text-xs uppercase tracking-wider font-bold"
                                >
                                    Request Formal RFQ / Tender Quote
                                </button>
                                <a
                                    href={`/products/${item.slug}/datasheet?print=1`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline-dark !py-3 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                                    title="Open and print/save official technical specification datasheet"
                                >
                                    <svg className="w-4 h-4 text-sysred dark:text-[#ff6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Download Datasheet (PDF)</span>
                                </a>
                            </div>

                            {/* Compliance Badge Card */}
                            <div className="mt-6 panel p-5 space-y-2 text-xs font-mono">
                                <div className="text-slate-700 dark:text-paper font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    STANDARD COMPLIANCE VERIFICATION
                                </div>
                                <div className="text-slate-500 dark:text-steel leading-relaxed">
                                    ISO 9001:2015, ISO 14001:2015, IP55/IP65 tested, and GeM portal procurement compliant.
                                </div>
                            </div>
                        </div>

                        {/* Hardware Details & Spec Tables */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="badge-rf text-xs font-mono">
                                        {subcategory.name}
                                    </span>
                                    <span className="badge-navy text-xs font-mono">
                                        TIER-1 ARCHITECTURE
                                    </span>
                                </div>

                                <AnimatedHeading
                                    as="h1"
                                    immediate={true}
                                    stagger={40}
                                    highlight="last"
                                    highlightCount={1}
                                    className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-paper leading-tight"
                                >
                                    {item.name}
                                </AnimatedHeading>

                                {item.short_description && (
                                    <p className="mt-4 text-base text-slate-600 dark:text-steel leading-relaxed font-sans">
                                        {item.short_description}
                                    </p>
                                )}
                            </div>

                            {/* Tab Switcher */}
                            <div className="border-b border-slate-200 dark:border-navy-border flex gap-6 text-sm font-mono">
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`pb-3 border-b-2 font-bold transition-colors ${
                                        activeTab === 'specs'
                                            ? 'border-blue-500 dark:border-beacon text-sysred dark:text-[#ff6b6b]'
                                            : 'border-transparent text-slate-500 dark:text-steel hover:text-slate-900 dark:hover:text-paper'
                                    }`}
                                >
                                    TECHNICAL SPECIFICATIONS ({specs.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`pb-3 border-b-2 font-bold transition-colors ${
                                        activeTab === 'overview'
                                            ? 'border-blue-500 dark:border-beacon text-sysred dark:text-[#ff6b6b]'
                                            : 'border-transparent text-slate-500 dark:text-steel hover:text-slate-900 dark:hover:text-paper'
                                    }`}
                                >
                                    SYSTEM OVERVIEW
                                </button>
                            </div>

                            {/* Tab 1: Specifications Table */}
                            {activeTab === 'specs' && (
                                <div className="space-y-4">
                                    {specs.length === 0 ? (
                                        <div className="panel p-6 text-sm text-slate-500 dark:text-steel font-mono">
                                            Detailed parameters available upon formal technical tender request.
                                        </div>
                                    ) : (
                                        <div className="panel overflow-hidden">
                                            <div className="divide-y divide-slate-100 dark:divide-navy-border/50 text-xs sm:text-sm font-mono">
                                                {specs.map((spec, i) => (
                                                    <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                        <span className="font-semibold text-slate-700 dark:text-paper/90 sm:col-span-1">
                                                            {spec.label}
                                                        </span>
                                                        <span className="text-slate-600 dark:text-steel sm:col-span-2 mt-1 sm:mt-0 font-sans">
                                                            {spec.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Tab 2: System Overview */}
                            {activeTab === 'overview' && (
                                <div className="panel p-8 space-y-4 text-sm text-slate-700 dark:text-steel leading-relaxed">
                                    {item.description ? (
                                        <div 
                                            className="prose dark:prose-invert max-w-none text-sm"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    ) : (
                                        <p>
                                            The {item.name} is built for continuous, zero-failure operations in mission-critical radio environments. It supports open industry digital standards and integrates seamlessly into System Infra command and dispatch console topologies.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick RFQ Modal */}
            {rfqModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="card-dual w-full max-w-lg p-6 sm:p-8 space-y-5 relative shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setRfqModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            aria-label="Close Modal"
                        >
                            ✕
                        </button>

                        <div>
                            <span className="badge-rf text-[10px] mb-2 font-mono">
                                FORMAL QUOTATION &bull; RFP DESK
                            </span>
                            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-paper">
                                Request Quote: {item.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-steel mt-1">
                                Receive tender specifications, bulk pricing, and WPC compliance certificates within 24 hours.
                            </p>
                        </div>

                        <form 
                            action="/contact-us" 
                            method="POST"
                            className="space-y-4 pt-2"
                        >
                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1 font-semibold">Your Name *</label>
                                <input type="text" required name="name" className="input" placeholder="Rajesh Sharma" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1 font-semibold">Official Email *</label>
                                <input type="email" required name="email" className="input" placeholder="name@organization.gov.in" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1 font-semibold">Phone Number</label>
                                <input type="text" name="phone" className="input" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1 font-semibold">Quantity / Project Scope</label>
                                <textarea rows={3} name="message" defaultValue={`Requesting quotation and technical specification sheet for ${item.name} (${item.model_number || 'Standard Model'}).`} className="input" />
                            </div>
                            <input type="hidden" name="subject" value={`Quote Request: ${item.name}`} />
                            <input type="hidden" name="website" value="" />

                            <div className="pt-2 flex gap-3">
                                <Link
                                    href={`/contact-us?subject=Quote%20Request%20for%20${encodeURIComponent(item.name)}`}
                                    className="btn-beacon w-full text-center text-xs font-mono uppercase tracking-wider font-bold !py-3"
                                >
                                    Proceed to Full RFQ Form
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
