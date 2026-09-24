import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function Careers({ openings = [], seo = {} }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeJobForModal, setActiveJobForModal] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Form state matching sysinfra.in/applyForJob.php
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        qualification: '',
        address: '',
        postalCode: '',
        referralSource: 'Company Website',
        position: '',
        startDate: '',
        coverLetter: '',
    });

    const openApplyModal = (jobTitle = '') => {
        setFormData(prev => ({ ...prev, position: jobTitle || 'Field Service Engineers – PAN India' }));
        setActiveJobForModal(jobTitle || 'General Application');
        setSubmitted(false);
    };

    const closeApplyModal = () => {
        setActiveJobForModal(null);
        setSubmitted(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Application for ${formData.position} - ${formData.fullName}`);
        const body = encodeURIComponent(
            `Applicant Name: ${formData.fullName}
` +
            `Mobile: ${formData.mobile}
` +
            `Email: ${formData.email}
` +
            `Qualification: ${formData.qualification}
` +
            `Address: ${formData.address}, Zip: ${formData.postalCode}
` +
            `Position Applied: ${formData.position}
` +
            `Earliest Start Date: ${formData.startDate}
` +
            `Referred By: ${formData.referralSource}

` +
            `Cover Letter / Note:
${formData.coverLetter}`
        );
        window.location.href = `mailto:hr@sysinfra.in?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    const categories = ['All', 'Field Operations', 'Software & R&D', 'Projects & Operations', 'Finance & Administration'];

    const getCategoryForJob = (title) => {
        const t = (title || '').toLowerCase();
        if (t.includes('field service')) return 'Field Operations';
        if (t.includes('developer') || t.includes('programmer') || t.includes('embeded') || t.includes('embedded')) return 'Software & R&D';
        if (t.includes('project') || t.includes('technical support') || t.includes('noc')) return 'Projects & Operations';
        if (t.includes('accounts') || t.includes('finance') || t.includes('executive assistant') || t.includes('warehouse')) return 'Finance & Administration';
        return 'Field Operations';
    };

    const filteredOpenings = selectedCategory === 'All' 
        ? openings 
        : openings.filter(job => getCategoryForJob(job.title) === selectedCategory);

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Careers — Join System Infra Solutions'}
                description={seo?.description || "Explore career openings at System Infra Solutions Pvt. Ltd. Build high-reliability AMF controllers, SYS-AXS NOC telemetry, and telecom power infrastructure across India."}
                canonicalPath="/careers"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-xs font-mono text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                        <span>CAREERS &bull; LIFE AT SYSTEM INFRA &bull; PAN-INDIA OPPORTUNITIES</span>
                    </div>

                    <div className="max-w-3xl">
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Powering India's Telecom"
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Build Systems Powering India's Telecom &amp; Industrial Future
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            Join our team of embedded hardware developers, power electronics specialists, and NOC automation engineers building high-reliability systems powering over 70,000 telecom tower sites across India.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl text-xs font-mono">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-surface border border-slate-200/80 dark:border-white/10">
                            <span className="text-slate-500 dark:text-slate-400 block uppercase text-[10px]">Primary HQ &amp; Plant</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">Patparganj, New Delhi</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-surface border border-slate-200/80 dark:border-white/10">
                            <span className="text-slate-500 dark:text-slate-400 block uppercase text-[10px]">Open Positions</span>
                            <span className="text-[#dd3c34] dark:text-[#ff6b6b] font-bold mt-1 block">{openings.length} Verified Roles</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-surface border border-slate-200/80 dark:border-white/10">
                            <span className="text-slate-500 dark:text-slate-400 block uppercase text-[10px]">Initiative</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">Make in India OEM</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-surface border border-slate-200/80 dark:border-white/10">
                            <span className="text-slate-500 dark:text-slate-400 block uppercase text-[10px]">Field Reach</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">22 Telecom Circles</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Life at Sysinfra Pillars (from sysinfra.in/whySysteminfra.php) */}
            <section className="py-20 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
                <div className="container-content">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#dd3c34] dark:text-[#ff6b6b] block mb-2">
                            LIFE AT SYSTEM INFRA &bull; CORE PILLARS
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Why Join Sysinfra?"
                            className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-paper"
                        >
                            Why Join Sysinfra?
                        </AnimatedHeading>
                        <p className="text-slate-600 dark:text-steel text-sm sm:text-base mt-3 leading-relaxed">
                            Our unique engineering culture combines agile in-house R&amp;D with nationwide field operations, allowing each team member to make an immediate, tangible impact on mission-critical national infrastructure.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Pillar 1 */}
                        <div className="card-symmetric p-8 flex flex-col justify-between group hover:border-red-500/40">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center font-mono font-bold text-xl mb-5 group-hover:scale-110 transition-transform">
                                    01
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    In-House Retro R&amp;D
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    In-House hardware and software development team giving flexibility to turn around any retro-development for existing products facing support issues or supply chain bottlenecks.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                Rapid Prototyping Lab &rarr;
                            </div>
                        </div>

                        {/* Pillar 2 */}
                        <div className="card-symmetric p-8 flex flex-col justify-between group hover:border-red-500/40">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center font-mono font-bold text-xl mb-5 group-hover:scale-110 transition-transform">
                                    02
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    Simplified Deployment
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Engineered for rapid field commissioning: intuitive hardware interfaces and plug-and-play telemetry modules allowing swift rollout across rugged circle terrains.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                Field-First Architecture &rarr;
                            </div>
                        </div>

                        {/* Pillar 3 */}
                        <div className="card-symmetric p-8 flex flex-col justify-between group hover:border-red-500/40">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center font-mono font-bold text-xl mb-5 group-hover:scale-110 transition-transform">
                                    03
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    “Ambulance” Emergency Model
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Available on demand for all emergency support like an ambulance: rapid response dispatch teams and 24/7 technical hotline ensuring uninterrupted tower uptime.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                24/7 SLA Guarantee &rarr;
                            </div>
                        </div>

                        {/* Pillar 4 */}
                        <div className="card-symmetric p-8 flex flex-col justify-between group hover:border-red-500/40 md:col-span-2">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center font-mono font-bold text-xl mb-5 group-hover:scale-110 transition-transform">
                                    04
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    eBOT Telecom ERP &amp; Digitized Workflow
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Our proprietary eBOT telecom enterprise platform digitizes operations, CRM, equipment service logs, tower maintenance schedules, and DC power tracking. It increases business productivity, minimizes people dependency, and eliminates manual paperwork.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                End-to-End Enterprise Digitization &rarr;
                            </div>
                        </div>

                        {/* Pillar 5 */}
                        <div className="card-symmetric p-8 flex flex-col justify-between group hover:border-red-500/40">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] flex items-center justify-center font-mono font-bold text-xl mb-5 group-hover:scale-110 transition-transform">
                                    05
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    Continuous Skill Elevation
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Extensive mentorship in embedded firmware, automated testing rigs, CAN Bus/Modbus protocols, and high-voltage ATS switchgear calibration.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                Professional Certification &rarr;
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Openings Section (from sysinfra.in/jobOpening.php) */}
            <section id="openings" className="py-20 bg-white dark:bg-[#000000] transition-colors duration-300">
                <div className="container-content max-w-5xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-100 dark:border-white/10 gap-4">
                        <div>
                            <span className="text-xs font-mono text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider font-bold block mb-1">
                                CURRENT CAREER OPENINGS
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="Open Positions"
                                className="text-3xl font-display font-bold text-slate-900 dark:text-paper"
                            >
                                All Active Open Positions
                            </AnimatedHeading>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-steel mt-1">
                                Sourced directly from our corporate hiring portal. Join our team in New Delhi HQ or nationwide circles.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-bold">
                                {openings.length} Roles Open
                            </span>
                        </div>
                    </div>

                    {/* Department Filtering Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#dd3c34] text-white shadow-md shadow-red-500/30'
                                        : 'bg-slate-100 dark:bg-navy-surface text-slate-600 dark:text-steel hover:bg-slate-200 dark:hover:bg-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Openings Grid */}
                    <div className="space-y-4">
                        {filteredOpenings.map((job) => {
                            const dept = getCategoryForJob(job.title);
                            return (
                                <div 
                                    key={job.id || job.title} 
                                    className="group relative panel-hover p-6 sm:p-7 hover:border-sysred/70 dark:hover:border-sysred/80 hover:shadow-2xl hover:-translate-y-1.5 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#dd3c34] dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                                        <div className="space-y-2 max-w-2xl">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="badge-rf text-[11px] font-mono">{dept}</span>
                                                <span className="text-xs font-mono text-slate-500 dark:text-steel flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5 text-[#dd3c34] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {job.location}
                                                </span>
                                                <span className="text-xs font-mono text-slate-400 dark:text-steel/70">
                                                    &bull; {job.employment_type || 'Full-Time'}
                                                </span>
                                            </div>

                                            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-paper">
                                                {job.title}
                                            </h3>

                                            <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                                {job.description}
                                            </p>
                                        </div>

                                        <div className="shrink-0 flex items-center gap-3">
                                            <button
                                                onClick={() => openApplyModal(job.title)}
                                                className="btn-beacon !py-2.5 !px-6 text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2 cursor-pointer"
                                            >
                                                <span>Apply for Role</span>
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Spontaneous Application Callout */}
                    <div className="mt-12 panel p-8 text-center bg-slate-50 dark:bg-navy-surface border border-slate-200/90 dark:border-white/10">
                        <h4 className="font-display font-bold text-lg text-slate-900 dark:text-paper">
                            Don't See Your Specific Specialization?
                        </h4>
                        <p className="mt-2 text-sm text-slate-600 dark:text-steel max-w-lg mx-auto">
                            We are always seeking passionate engineers, embedded firmware developers, and sales professionals. Send your profile directly to our talent acquisition team.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => openApplyModal('General Engineering & Corporate Application')}
                                className="btn-shimmer !py-2.5 !px-6 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 font-bold cursor-pointer"
                            >
                                <span>Submit Spontaneous Application</span>
                            </button>
                            <a
                                href="mailto:hr@sysinfra.in?subject=Spontaneous%20Application%20-%20System%20Infra%20Solutions"
                                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/15 text-xs font-mono font-bold text-slate-700 dark:text-paper hover:border-red-500 hover:text-[#dd3c34] transition-colors"
                            >
                                Email: hr@sysinfra.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Apply Now Modal (faithful to sysinfra.in/applyForJob.php) */}
            {activeJobForModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-6">
                            <div>
                                <span className="text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider font-bold">
                                    APPLICATION FORM &bull; HR DESK
                                </span>
                                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mt-0.5">
                                    Apply for: {activeJobForModal}
                                </h3>
                            </div>
                            <button
                                onClick={closeApplyModal}
                                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer text-lg"
                            >
                                &times;
                            </button>
                        </div>

                        {submitted ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center text-3xl font-bold">
                                    ✓
                                </div>
                                <h4 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                                    Application Prepared!
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-steel max-w-md mx-auto">
                                    Your email client has opened with all details pre-formatted for <strong>hr@sysinfra.in</strong>. Attach your resume PDF and press send to complete your application.
                                </p>
                                <button
                                    onClick={closeApplyModal}
                                    className="btn-beacon !py-2.5 !px-6 text-xs font-mono uppercase tracking-wider font-bold"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.mobile}
                                            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                            placeholder="+91-XXXXXXXXXX"
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="you@domain.com"
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Highest Qualification *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.qualification}
                                            onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                                            placeholder="B.Tech / Diploma / MBA / B.Sc"
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Current City &amp; Address *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="City, State"
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Postal / Zip Code</label>
                                        <input
                                            type="text"
                                            value={formData.postalCode}
                                            onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                                            placeholder="PIN Code"
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Position Applied For</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={formData.position}
                                            className="input bg-slate-100 dark:bg-white/5 opacity-90 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Earliest Available Start Date</label>
                                        <input
                                            type="text"
                                            value={formData.startDate}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                            placeholder="Immediate / 15 Days / 1 Month"
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-700 dark:text-paper font-semibold mb-1">How Did You Hear About Us?</label>
                                    <select
                                        value={formData.referralSource}
                                        onChange={e => setFormData({ ...formData, referralSource: e.target.value })}
                                        className="input"
                                    >
                                        <option value="Company Website">Company Website</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Event / Expo">Event / Expo (e.g. IMC)</option>
                                        <option value="Colleague / Friend">Colleague / Friend Referral</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-700 dark:text-paper font-semibold mb-1">Cover Note / Experience Summary</label>
                                    <textarea
                                        rows={3}
                                        value={formData.coverLetter}
                                        onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                                        placeholder="Briefly describe your relevant telecom power, AMF, or software engineering experience..."
                                        className="input resize-none"
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeApplyModal}
                                        className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/10 text-slate-700 dark:text-paper text-xs uppercase tracking-wider font-bold hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-beacon !py-2.5 !px-6 text-xs uppercase tracking-wider font-bold cursor-pointer"
                                    >
                                        Submit to hr@sysinfra.in
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
