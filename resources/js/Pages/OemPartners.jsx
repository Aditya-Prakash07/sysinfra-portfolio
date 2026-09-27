import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

// Authentic System Infra Solutions OEM & Technology Partnerships
const DEFAULT_SYSINFRA_OEM_PARTNERS = [
    {
        id: 'motorola-solutions',
        name: 'Motorola Solutions',
        shortName: 'Motorola Solutions',
        established: '1928',
        origin: 'Chicago, Illinois, USA',
        status: 'Authorised Channel Partner',
        badge: 'TACTICAL & MISSION-CRITICAL',
        domains: ['MOTOTRBO Digital Two-Way Radios', 'ASTRO 25 P25 Trunking', 'VB400 Body-Worn Cameras', 'TLK LTE Push-to-Talk', 'HALO Smart Sensors'],
        website_url: 'https://www.motorolasolutions.com/',
        logo_path: 'img/motorola-solutions.png',
        paragraphs: [
            "System Infra Solutions is an Authorised Channel Partner for Motorola Solutions in India, supplying mission-critical communications equipment to defense, homeland security, public safety, and enterprise customers nationwide.",
            "Our offerings include next-generation MOTOTRBO R7, R5, and R2 digital two-way radios, VB400 body-worn cameras for security personnel, TLK 110 LTE push-to-talk radios for nationwide fleet operations, and HALO smart environmental sensors."
        ]
    },
    {
        id: 'vertiv',
        name: 'Vertiv / Emerson Network Power',
        shortName: 'Vertiv',
        established: '1965',
        origin: 'Columbus, Ohio, USA',
        status: 'Strategic DC Power Partner',
        badge: 'TELECOM POWER SYSTEMS',
        domains: ['NetSure DC Power Systems', 'Telecom Rectifier Modules', 'Static Inverters', 'Power Plant Refurbishment'],
        website_url: 'https://www.vertiv.com/',
        logo_path: 'img/partners/vertiv.svg',
        paragraphs: [
            "Vertiv (formerly Emerson Network Power) is the global benchmark for critical digital infrastructure and continuity solutions. System Infra Solutions collaborates on telecom DC power systems, modular rectifiers, and power conditioning systems across India.",
            "With over 300,000 power modules serviced at our state-of-the-art Patparganj facility, Sysinfra provides Tier-3 component-level repair, recalibration, and preventive life-extension for Vertiv power plants."
        ]
    },
    {
        id: 'delta-power',
        name: 'Delta Power Solutions',
        shortName: 'Delta Power',
        established: '1971',
        origin: 'Taipei, Taiwan',
        status: 'Power Conversion Alliance',
        badge: 'HIGH-EFFICIENCY DC SYSTEMS',
        domains: ['High-Efficiency Rectifiers', 'DC-DC Power Converters', 'Telecom Power Plant Controllers', 'Green Hybrid Power'],
        website_url: 'https://www.deltaww.com/',
        logo_path: 'img/partners/delta.svg',
        paragraphs: [
            "Delta Power Solutions is a world-class provider of power and thermal management solutions. Sysinfra partners with Delta for cellular telecom tower power conversion, rectifiers, and high-efficiency switch-mode power supplies (SMPS).",
            "Our dedicated engineering benches perform complete testing, firmware re-flashing, and load calibration to ensure zero-downtime operations for telecom operator cell sites."
        ]
    },
    {
        id: 'eltek',
        name: 'Eltek Power Systems',
        shortName: 'Eltek',
        established: '1971',
        origin: 'Drammen, Norway',
        status: 'Modular Rectifier Engineering Partner',
        badge: 'CRITICAL TELECOM POWER',
        domains: ['Flatpack Modular Rectifiers', 'Smartpack Site Controllers', 'DC Power Distribution', 'Extreme-Climate Solutions'],
        website_url: 'https://www.eltek.com/',
        logo_path: 'img/partners/eltek.svg',
        paragraphs: [
            "Eltek is a strategic technology partner in high-efficiency DC power technology, renowned for Flatpack2 modular rectifiers and Smartpack controllers operating in harsh environmental conditions.",
            "System Infra Solutions provides Level-3 repair, reconditioning, and multi-tenant telecom tower site integration for Eltek DC power systems deployed across major Indian telecom networks."
        ]
    },
    {
        id: 'nokia',
        name: 'Nokia Solutions and Networks',
        shortName: 'Nokia',
        established: '1865',
        origin: 'Espoo, Finland',
        status: 'Telecom Infrastructure Alliance',
        badge: 'CELL SITE INFRASTRUCTURE',
        domains: ['Base Station Power Conditioning', 'Telecom Power Supply Units', 'Site Energy Optimization', 'Lab Component Validation'],
        website_url: 'https://www.nokia.com/',
        logo_path: 'img/partners/nokia.svg',
        paragraphs: [
            "Nokia is a global leader in telecommunications network infrastructure. System Infra Solutions collaborates with Nokia ecosystem hardware for cellular base station power conditioning and specialized site support.",
            "Sysinfra engineering teams conduct rigorous laboratory validation and component-level servicing for Nokia telecom site power conversion units."
        ]
    },
    {
        id: 'ericsson',
        name: 'Ericsson Telecommunications',
        shortName: 'Ericsson',
        established: '1876',
        origin: 'Stockholm, Sweden',
        status: 'Cellular Site Power Partner',
        badge: 'NETWORK POWER UNITS',
        domains: ['Telecom Site Power Systems', 'SMPS Power Conversion', 'BTS Enclosure Telemetry', 'Power Plant Upgrades'],
        website_url: 'https://www.ericsson.com/',
        logo_path: 'img/partners/ericsson.svg',
        paragraphs: [
            "Ericsson is one of the world's leading providers of Information and Communication Technology (ICT) to service providers. Sysinfra collaborates on cellular site power conversion modules, SMPS units, and telecom plant power infrastructure.",
            "Our specialized repair facilities ensure rapid turnaround and component-level restoration for Ericsson power modules serving national telecom corridors."
        ]
    }
];

export default function OemPartners({ partners = [], seo = {} }) {
    // Map database records, matching against Sysinfra default meta or dynamically rendering
    const displayPartners = (partners && partners.length > 0)
        ? partners.map((p, idx) => {
            const defMatch = DEFAULT_SYSINFRA_OEM_PARTNERS.find(
                (d) => d.name.toLowerCase().includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(d.shortName.toLowerCase())
            );
            return {
                id: p.id || defMatch?.id || ('partner-' + idx),
                name: p.name,
                shortName: defMatch?.shortName || p.name,
                status: defMatch?.status || 'Authorized Technology Partner',
                badge: defMatch?.badge || 'ENTERPRISE INFRASTRUCTURE',
                established: defMatch?.established || 'Global Tier-1',
                origin: defMatch?.origin || 'International',
                domains: defMatch?.domains || ['Telecom Power Systems', 'Mission-Critical Engineering', 'Level-3 Maintenance'],
                website_url: p.website_url || defMatch?.website_url || '#',
                logo_path: p.logo_path || defMatch?.logo_path || 'img/motorola-solutions.png',
                paragraphs: p.description ? [p.description] : (defMatch?.paragraphs || [])
            };
        })
        : DEFAULT_SYSINFRA_OEM_PARTNERS;

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'OEM & Technology Partners — System Infra Solutions'}
                description={seo?.description || "System Infra Solutions is an Authorised Channel Partner for Motorola Solutions and collaborates with premier power and telecom equipment OEMs to deliver mission-critical infrastructure across India."}
                canonicalPath="/oem-partners"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-sysred animate-pulse" />
                        <span>GLOBAL TECHNOLOGY ALLIANCES &bull; OEM NETWORK</span>
                    </div>

                    <div className="max-w-3xl">
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Mission-Critical Hardware."
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            World-Class Partnerships, Mission-Critical Hardware.
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            System Infra Solutions collaborates with Motorola Solutions as an Authorised Channel Partner, along with Tier-1 telecom and DC power equipment manufacturers, to deliver robust, high-availability infrastructure across India.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl text-xs font-mono">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">INTEGRATION MODEL</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">AUTHORISED CHANNEL PARTNER</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">COMPLIANCE PROTOCOL</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">ISO 9001 &bull; ISO 14001 &bull; ISO 45001</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">FACILITY CAPACITY</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">300,000+ MODULES SERVICED</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">SERVICE LAB</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">PATPARGANJ, NEW DELHI</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Partners List: All OEM Partners with Full Details */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider font-bold block mb-1">
                                AUTHORIZED ECOSYSTEM &bull; OEM NETWORK
                            </span>
                            <AnimatedHeading
                                as="h2"
                                highlightPhrase="Technology Partners"
                                className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-paper"
                            >
                                OEM &amp; Technology Partners
                            </AnimatedHeading>
                            <p className="mt-2 text-base text-slate-600 dark:text-steel max-w-3xl leading-relaxed">
                                System Infra Solutions collaborates with recognized global brand leaders and equipment manufacturers to provide best-in-class power systems, tactical communications, and telecom infrastructure.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-red-50 dark:bg-red-500/10 text-sysred dark:text-[#ff6b6b] border border-red-200 dark:border-red-500/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {displayPartners.length} Technology Alliances
                            </span>
                        </div>
                    </div>

                    {/* All Partners Listed: One Partner per Full-Width Row */}
                    <div className="space-y-8">
                        {displayPartners.map((partner, idx) => {
                            const hasLink = Boolean(partner.website_url && partner.website_url !== '#');

                            return (
                                <article
                                    key={partner.id || idx}
                                    className="group relative rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 p-7 sm:p-9 lg:p-10 shadow-sm hover:shadow-2xl hover:border-sysred/70 dark:hover:border-sysred/80 hover:-translate-y-1.5 dark:hover:shadow-[0_0_35px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                        {/* Left Column: Brand Identity, Logo, Quick Specs & Official Link */}
                                        <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/10 pb-7 lg:pb-0 lg:pr-8">
                                            {/* High-res Logo Box */}
                                            <div className="h-24 w-full max-w-[240px] px-6 py-4 rounded-xl bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-300 flex items-center justify-center shadow-xs mb-5 transition-transform duration-300 group-hover:scale-105">
                                                <img
                                                    src={partner.logo_path ? ('/' + partner.logo_path.replace(/^\//, '')) : '/img/motorola-solutions.png'}
                                                    alt={partner.name}
                                                    className="max-h-14 max-w-full w-auto object-contain"
                                                    loading="lazy"
                                                />
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-red-50 dark:bg-red-500/10 text-sysred dark:text-[#ff6b6b] border border-red-200 dark:border-red-500/20 mb-3">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                {partner.status}
                                            </span>

                                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sysred dark:group-hover:text-[#ff6b6b] transition-colors">
                                                {partner.name}
                                            </h3>

                                            {/* Quick Specs Grid */}
                                            <div className="w-full space-y-2 text-xs font-mono border-t border-slate-100 dark:border-white/10 pt-4 mt-2">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100/70 dark:border-white/5">
                                                    <span className="text-slate-400 dark:text-steel">ESTABLISHED:</span>
                                                    <span className="font-bold text-slate-800 dark:text-paper">{partner.established}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100/70 dark:border-white/5">
                                                    <span className="text-slate-400 dark:text-steel">HEADQUARTERS:</span>
                                                    <span className="font-bold text-slate-800 dark:text-paper">{partner.origin}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="text-slate-400 dark:text-steel">SYSINFRA FACILITY:</span>
                                                    <span className="font-bold text-sysred dark:text-[#ff6b6b]">Patparganj Lab</span>
                                                </div>
                                            </div>

                                            {hasLink && (
                                                <a
                                                    href={partner.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-5 group/link inline-flex items-center gap-2 text-xs font-mono font-bold text-sysred hover:text-red-700 dark:text-[#ff6b6b] dark:hover:text-white transition-colors"
                                                >
                                                    <span>Visit Official Website</span>
                                                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>

                                        {/* Right Column: Complete Paragraphs & Domain Chips */}
                                        <div className="lg:col-span-8 flex flex-col justify-between h-full">
                                            <div>
                                                {/* Header Strip with Index Counter */}
                                                <div className="flex items-center justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-steel">
                                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 uppercase tracking-wider text-[10px] font-semibold text-sysred dark:text-[#ff6b6b]">
                                                            {partner.badge}
                                                        </span>
                                                        <span>&bull;</span>
                                                        <span>TECHNOLOGY ALLIANCE #{String(idx + 1).padStart(2, '0')}</span>
                                                    </div>
                                                </div>

                                                {/* Partner Focus Domains */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {partner.domains.map((dom, dIdx) => (
                                                        <span
                                                            key={dIdx}
                                                            className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                                                        >
                                                            {dom}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Paragraphs */}
                                                <div className="space-y-4 text-slate-700 dark:text-slate-200 text-base leading-relaxed font-sans">
                                                    {partner.paragraphs.map((paragraph, pIdx) => (
                                                        <p key={pIdx} className="leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Card Bottom Meta */}
                                            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 dark:text-steel">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-sysred animate-pulse" />
                                                    <span>Direct Technical Support &amp; Component-Level Service by System Infra Solutions</span>
                                                </div>
                                                <span className="text-[11px]">
                                                    Partner #{idx + 1} of {displayPartners.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Technical Standards */}
                    <div className="mt-20 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card-symmetric p-6">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 dark:bg-red-500/15 text-sysred dark:text-[#ff6b6b] font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    01
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    Authorised Channel Compliance
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    As Motorola Solutions Authorised Channel Partner, all tactical radio equipment, MOTOTRBO systems, and body-worn cameras come with genuine OEM certifications, WPC clearances, and factory warranty.
                                </p>
                            </div>

                            <div className="card-symmetric p-6">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 dark:bg-red-500/15 text-sysred dark:text-[#ff6b6b] font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    02
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    Level-3 Reconditioning Facility
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    Our dedicated 20,000+ sq. ft. facility in Patparganj Industrial Area has serviced over 300,000 power modules, rectifiers, and controllers with specialized burn-in racks and automatic testing setups.
                                </p>
                            </div>

                            <div className="card-symmetric p-6">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 dark:bg-red-500/15 text-sysred dark:text-[#ff6b6b] font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    03
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    PAN-India Support Network
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    With over 25+ regional service depots and 500+ field service engineers, we guarantee rapid turnaround times for telecom operators, towercos, and public sector enterprises.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Partnership Inquiry Banner */}
                    <div className="mt-12 card-dual !bg-white dark:!bg-navy-surface p-8 sm:p-10 border border-slate-200 dark:border-navy-border flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl shadow-sm">
                        <div className="max-w-xl">
                            <span className="text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider font-bold block mb-2">
                                TECHNOLOGY COLLABORATION
                            </span>
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                Partner with System Infra Solutions
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                System Infra Solutions offers nationwide deployment reach, ISO-certified repair and reconditioning facilities, and trusted relationships across India's telecom, power, and enterprise sectors.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/contact-us" className="btn-beacon !py-3 !px-6 font-semibold font-mono text-xs uppercase tracking-wider">
                                Initiate OEM Partnership
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
