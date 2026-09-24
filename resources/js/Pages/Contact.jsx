import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';
import { SOCIAL_LINKS } from '@/Components/SocialBar';

const REQUIREMENT_TYPES = [
    { id: 'system_architecture', label: 'System Architecture & Design' },
    { id: 'hardware_procurement', label: 'Hardware Procurement & Tender RFQ' },
    { id: 'amc_support', label: 'Annual Maintenance & Repair (AMC)' },
    { id: 'oem_partnership', label: 'OEM & Channel Partnership' },
];

export default function Contact({ seo = {}, flash = {} }) {
    const [selectedType, setSelectedType] = useState('system_architecture');
    const [submittedSuccess, setSubmittedSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful, transform } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '', // Honeypot
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((curr) => ({
            ...curr,
            subject: curr.subject 
                ? `[${selectedType.toUpperCase()}] ${curr.subject}` 
                : `[${selectedType.toUpperCase()}] General Technical Inquiry`,
        }));
        post('/contact-us', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmittedSuccess(true);
            },
        });
    };

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Contact Us — System Infra Solutions Pvt. Ltd.'}
                description={seo?.description || 'Reach System Infra Solutions headquarters in Patparganj Industrial Area, New Delhi. Direct sales, technical support, and turnkey power infrastructure assistance.'}
                canonicalPath="/contact-us"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-16 overflow-hidden transition-colors duration-300 border-b border-slate-200/80 dark:border-zinc-900">
                <div className="container-content relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
                            <span>DIRECT ENGINEERING DESK &bull; PATPARGANJ NEW DELHI</span>
                        </div>
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Operations & Procurement"
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Contact Technical Operations & Procurement
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-steel leading-relaxed font-sans">
                            Consult with our power automation and NOC telemetry engineering team, request formal quotations, or schedule an onsite technical survey.
                        </p>
                    </div>
                </div>
            </header>

            <div className="py-16 sm:py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <div className="panel p-8 sm:p-10">
                                {/* Success Alert matching sysinfra.in */}
                                {(submittedSuccess || recentlySuccessful || flash?.success) && (
                                    <div className="mb-6 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-600/50 text-emerald-950 dark:text-emerald-100 shadow-md space-y-2">
                                        <div className="flex items-center gap-3 font-display font-bold text-lg text-emerald-700 dark:text-emerald-300">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white shadow-xs shrink-0">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span>Message has been sent successfully.</span>
                                        </div>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300 pl-11 leading-relaxed">
                                            Thank you for reaching out to System Infra Solutions. Your message has been received by our technical desk at Patparganj HQ. Our team will review your specifications and follow up within one business day.
                                        </p>
                                        <div className="pl-11 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setSubmittedSuccess(false)}
                                                className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:underline"
                                            >
                                                &larr; Submit Another Inquiry
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-navy-border/60 pb-3">
                                        Please fill the form for any inquiry
                                    </h2>

                                    {/* Requirement Type Selector */}
                                    <div className="space-y-2">
                                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
                                            Select Requirement Category
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {REQUIREMENT_TYPES.map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setSelectedType(type.id)}
                                                    className={`p-3 rounded-lg border text-left text-xs font-mono transition-all duration-200 ${
                                                        selectedType === type.id
                                                            ? 'border-sysred dark:border-sysred bg-red-50 dark:bg-red-500/10 text-sysred dark:text-[#ff6b6b] font-bold shadow-xs'
                                                            : 'border-slate-200 dark:border-navy-border/80 text-slate-700 dark:text-paper/80 hover:bg-slate-50 dark:hover:bg-white/5'
                                                    }`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Name & Email */}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="input"
                                                placeholder="e.g. Commander Sharma / Procurement Officer"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                                Official Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="input"
                                                placeholder="name@organization.gov.in"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Phone & Subject */}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                                Mobile / Phone Number *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="input"
                                                placeholder="+91 98999 05475"
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1 font-mono">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                                Subject Line
                                            </label>
                                            <input
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="input"
                                                placeholder="e.g. AMF Controller / SYS-AXS NOC Deployment Inquiry"
                                            />
                                            {errors.subject && <p className="text-red-500 text-xs mt-1 font-mono">{errors.subject}</p>}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                            Detailed Message / Project Specifications *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="input"
                                            placeholder="Provide technical requirements, site count, power controller specs, or project timelines..."
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1 font-mono">{errors.message}</p>}
                                    </div>

                                    {/* Honeypot field (hidden) */}
                                    <input
                                        type="text"
                                        name="website"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-beacon w-full !py-3.5 text-sm uppercase font-mono tracking-wider font-bold"
                                    >
                                        {processing ? 'Submitting to Engineering...' : 'Submit Inquiry'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Office Details & Official Channels */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Headquarters Card */}
                            <div className="card-dual !bg-white dark:!bg-navy-surface p-8 space-y-5 border border-slate-200/80 dark:border-navy-border shadow-md">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-border/60 pb-3">
                                    <span className="text-xs font-mono uppercase tracking-wider text-sysred dark:text-[#ff6b6b] font-bold">
                                        NATIONAL HEADQUARTERS
                                    </span>
                                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">OPEN 09:30 - 18:00 IST</span>
                                </div>

                                <div className="space-y-2 text-sm font-sans text-slate-600 dark:text-steel">
                                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                                        System Infra Solutions Pvt. Ltd.
                                    </h3>
                                    <p className="leading-relaxed">
                                        Plot No. 382, Third Floor, F.I.E., Patparganj Industrial Area<br />
                                        New Delhi – 110092, India
                                    </p>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-navy-border/60 text-xs font-mono">
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 block mb-0.5">DIRECT BOARD LINES:</span>
                                        <a href="tel:+9101135004142" className="text-sysred dark:text-[#ff6b6b] hover:underline text-sm font-bold">
                                            +91-011-35004142 / 43 / 44 / 45
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 block mb-0.5">DIRECT MOBILE / HELPLINE:</span>
                                        <a href="tel:+919899905475" className="text-slate-800 dark:text-white hover:text-sysred dark:hover:text-[#ff6b6b] transition-colors text-sm font-bold">
                                            +91-9899905475 / +91-7668609810
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 block mb-0.5">DEPARTMENT MAILBOXES:</span>
                                        <div className="space-y-0.5">
                                            <a href="mailto:sales@sysinfra.in" className="text-slate-800 dark:text-white hover:text-sysred dark:hover:text-[#ff6b6b] transition-colors block text-sm">
                                                sales@sysinfra.in &bull; info@sysinfra.in
                                            </a>
                                            <a href="mailto:hr@sysinfra.in" className="text-slate-600 dark:text-slate-300 hover:text-sysred dark:hover:text-[#ff6b6b] transition-colors block text-xs">
                                                Careers & Recruitment: hr@sysinfra.in
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 block mb-0.5">REGIONAL BRANCHES IN INDIA:</span>
                                        <p className="text-slate-700 dark:text-slate-300 text-xs font-sans">
                                            Patna, Uttar Pradesh, Madhya Pradesh (Offices &amp; Warehouses)
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 dark:text-slate-400 block mb-0.5">OFFICIAL PORTAL:</span>
                                        <a href="https://sysinfra.in/" target="_blank" rel="noopener noreferrer" className="text-sysred dark:text-[#ff6b6b] hover:underline font-bold text-xs">
                                            www.sysinfra.in
                                        </a>
                                    </div>
                                </div>

                                {/* Follow Us Social Channels */}
                                <div className="pt-4 border-t border-slate-100 dark:border-navy-border/60">
                                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 font-semibold">
                                        Follow Us on Social Media
                                    </span>
                                    <div className="grid grid-cols-3 gap-2.5">
                                        {SOCIAL_LINKS.map((item) => {
                                            const IconComp = item.icon;
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={item.label}
                                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-slate-50/70 dark:bg-zinc-900/60 hover:shadow-md transition-all duration-200 group text-center"
                                                >
                                                    <div className={`w-8 h-8 rounded-lg ${item.bgColor} text-white flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-110 shadow-xs`}>
                                                        <IconComp className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                                                        {item.name}
                                                    </span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <a 
                                        href="https://goo.gl/maps/LapVX9zFcWn4Etjt8" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn-beacon w-full justify-center text-xs font-mono !py-3 font-bold"
                                    >
                                        Open Location in Google Maps
                                    </a>
                                </div>
                            </div>

                            {/* Procurement Assurance Card */}
                            <div className="panel p-6 space-y-3">
                                <span className="badge-rf text-[10px]">GOVERNMENT & DEFENSE</span>
                                <h4 className="font-display font-bold text-base text-slate-900 dark:text-paper">
                                    Government e-Marketplace (GeM) Assurance
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    System Infra Solutions products, including AMF controllers and SYS-AXS NOC platforms, are available through the GeM portal. For tender compliance authorizations or OEM letters, include your RFP number.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps Embed matching sysinfra.in */}
                    <div className="mt-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-xl">
                        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between text-xs font-mono">
                            <span className="font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                SYSTEM INFRA SOLUTIONS PVT. LTD. &mdash; PATPARGANJ INDUSTRIAL AREA HQ
                            </span>
                            <span className="hidden sm:inline text-zinc-400">28.813379° N, 76.797287° E</span>
                        </div>
                        <iframe
                            title="System Infra Solutions Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d532133.9197566778!2d76.79728722612579!3d28.813379345027453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb4834bc8df9%3A0x96b2ef91963d1fb!2sSystem%20Infra%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1611221383318!5m2!1sen!2sin"
                            width="100%"
                            height="420"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
