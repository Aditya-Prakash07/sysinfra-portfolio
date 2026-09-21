import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

const REQUIREMENT_TYPES = [
    { id: 'system_architecture', label: 'System Architecture & Design' },
    { id: 'hardware_procurement', label: 'Hardware Procurement & Tender RFQ' },
    { id: 'amc_support', label: 'Annual Maintenance & Repair (AMC)' },
    { id: 'oem_partnership', label: 'OEM & Channel Partnership' },
];

export default function Contact({ seo = {}, flash = {} }) {
    const [selectedType, setSelectedType] = useState('system_architecture');

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '', // Honeypot
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            subject: data.subject ? `[${selectedType.toUpperCase()}] ${data.subject}` : `[${selectedType.toUpperCase()}] General Inquiry`,
        };
        post('/contact-us', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Contact Us — System Infra Solutions Pvt. Ltd.'}
                description={seo?.description || 'Reach System Infra Solutions headquarters in Okhla, New Delhi. Direct sales, technical support, and government procurement assistance.'}
                canonicalPath="/contact-us"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-16 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider mb-4 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
                            <span>DIRECT ENGINEERING DESK &bull; NEW DELHI HQ</span>
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
                            Consult with our RF design team, request formal government tender authorizations, or schedule an onsite propagation survey.
                        </p>
                    </div>
                </div>
            </header>

            <div className="py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <div className="panel p-8 sm:p-10">
                                {recentlySuccessful || flash?.success ? (
                                    <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2">
                                        <div className="flex items-center gap-2 font-display font-bold text-lg">
                                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Request Received</span>
                                        </div>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                            Thank you. Our technical operations desk has received your request and will follow up within one business day.
                                        </p>
                                    </div>
                                ) : null}

                                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
                                                            ? 'border-blue-500 dark:border-beacon bg-blue-50 dark:bg-beacon/10 text-blue-900 dark:text-beacon font-bold'
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
                                                placeholder="e.g. Commander Sharma"
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
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="input"
                                                placeholder="+91 98765 43210"
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
                                                placeholder="e.g. VHF Base Station Tender Inquiry"
                                            />
                                            {errors.subject && <p className="text-red-500 text-xs mt-1 font-mono">{errors.subject}</p>}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                                            Detailed Requirement / RF Specifications *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="input"
                                            placeholder="Provide technical details, frequency band requirements, quantities, or project timelines..."
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
                                         {processing ? 'Submitting to Engineering...' : 'Dispatch Request to Engineering Desk'}
                                     </button>
                                 </form>
                             </div>
                         </div>

                         {/* Telemetry & Office Details */}
                         <div className="lg:col-span-5 space-y-6">
                             {/* Headquarters Card */}
                             <div className="card-dual !bg-white dark:!bg-navy-surface p-8 space-y-5 border border-slate-200/80 dark:border-navy-border shadow-md">
                                 <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-border/60 pb-3">
                                     <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-beacon font-bold">
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
                                         New Delhi – 110020, India
                                     </p>
                                 </div>

                                 <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-navy-border/60 text-xs font-mono">
                                     <div>
                                         <span className="text-slate-500 dark:text-slate-400 block mb-0.5">DIRECT SALES & MARKETING:</span>
                                         <a href="tel:+911146528894" className="text-blue-600 dark:text-beacon hover:underline text-sm font-bold">
                                             +91 (11) 3500 4142–97
                                         </a>
                                     </div>
                                     <div>
                                         <span className="text-slate-500 dark:text-slate-400 block mb-0.5">TECHNICAL SUPPORT & AMC:</span>
                                         <a href="tel:+911146528892" className="text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-beacon transition-colors text-sm font-bold">
                                             +91 (11) 4652 8892–93
                                         </a>
                                     </div>
                                     <div>
                                         <span className="text-slate-500 dark:text-slate-400 block mb-0.5">PRIMARY INQUIRIES:</span>
                                         <a href="mailto:info@sysinfra.in" className="text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-beacon transition-colors text-sm">
                                             info@sysinfra.in
                                         </a>
                                     </div>
                                 </div>

                                 <div className="pt-2">
                                     <a 
                                         href="https://maps.google.com/?q=Sysinfra+Telesystems+Limited+Okhla+Industrial+Area+Phase+II+New+Delhi" 
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
                </div>
            </div>
        </MainLayout>
    );
}
