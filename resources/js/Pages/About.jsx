import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedNumber from '@/Components/AnimatedNumber';
import WhySysinfraDiagram from '@/Components/WhySysinfraDiagram';
import AnimatedHeading from '@/Components/AnimatedHeading';
import KeyStatsSection from '@/Components/KeyStatsSection';

const PROCESS = [
    {
        step: '01',
        title: 'Site Energy Audit & Load Profiling',
        description: 'Comprehensive analysis of EB grid reliability, DG kVA sizing, solar irradiance feasibility, battery bank health, and shelter thermal dissipation at telecom tower sites.',
    },
    {
        step: '02',
        title: 'Embedded Controller R&D & Firmware',
        description: 'Custom micro-controller engineering, multi-source switching algorithms, CAN Bus/Modbus ECU protocol translation, and secure GPRS/4G telemetry firmware developed in-house.',
    },
    {
        step: '03',
        title: 'ISO-Certified Manufacturing & 72h Burn-In',
        description: 'Precision fabrication of IP55 weatherproof AMF panels and 5G smart boxes at our Patparganj industrial facility with comprehensive electrical stress and high-temperature testing.',
    },
    {
        step: '04',
        title: 'Field Installation & Zero-Outage Cutover',
        description: 'Pan-India field deployment by certified electrical technicians, seamless automatic transfer switch (ATS) integration, and live verification with zero telecom load interruption.',
    },
    {
        step: '05',
        title: 'SYS-AXS NOC Telemetry & Sensor Integration',
        description: 'Onboarding sites into the SYS-AXS cloud platform, integrating ultrasonic fuel probes, dual PIR anti-theft sensors, and configuring real-time SMS/email alarm escalation trees.',
    },
    {
        step: '06',
        title: '24/7 SLA-Bound O&M & Module Reconditioning',
        description: 'Nationwide annual maintenance contracts with rapid-response field teams and our state-of-the-art rectifier module reconditioning facility supporting 3,00,000+ power modules.',
    },
];

const MILESTONES = [
    {
        metric: '300+',
        label: 'Solar AMF Controllers',
        detail: 'In operation for solar cell sites along with installation & commissioning for Bharti Infratel / Indus Towers.',
    },
    {
        metric: '50,000+',
        label: 'AMF Controllers Running',
        detail: 'Successfully operational across pan-India telecom tower networks providing uninterrupted ATS switching.',
    },
    {
        metric: '10,000+',
        label: 'Li-Ion Battery Sites',
        detail: 'Complete installation, commissioning & telemetry maintenance on 10,000+ sites for Reliance Jio.',
    },
    {
        metric: '3,00,000+',
        label: 'SMPS Modules Rectified',
        detail: 'Re-conditioned from our dedicated Patparganj service facility for major telecom OEMs and tower operators.',
    },
    {
        metric: '70,000+',
        label: 'Sites Automated',
        detail: 'Telecom sites engineered with intelligent AMF panels, fuel level telemetry, and remote monitoring.',
    },
    {
        metric: '10,000+',
        label: 'NOC Surveillance Sites',
        detail: 'Connected under real-time telemetry surveillance via the SYS-AXS cloud platform & mobile apps.',
    },
    {
        metric: '4,000 Sq.Ft.',
        label: 'Patparganj Factory',
        detail: 'International standard manufacturing plant with precision wiring, fabrication, and testing infrastructure.',
    },
    {
        metric: '24/7',
        label: 'Ambulance SLA Model',
        detail: 'Dedicated rapid-intervention mobile teams achieving under 2-hour MTTR emergency restorations.',
    }
];

const CORE_VALUES = [
    {
        id: '01',
        title: 'Always Customer First',
        desc: 'Our customer is the reason for our existence. We continuously tailor power and telemetry solutions to solve their specific operational bottlenecks.',
        badge: 'Priority'
    },
    {
        id: '02',
        title: 'Dedication',
        desc: 'Uncompromising commitment to mission-critical infrastructure reliability, maintaining continuous uptime even under extreme grid conditions.',
        badge: 'Execution'
    },
    {
        id: '03',
        title: 'Continuous Improvement',
        desc: 'Relentless refinement of micro-controller algorithms, edge compute firmware, and manufacturing processes to stay ahead of technology evolution.',
        badge: 'R&D'
    },
    {
        id: '04',
        title: 'Openness & Initiative',
        desc: 'Proactive engineering culture embracing challenges, transparent communication with clients, and rapid prototyping of custom hardware.',
        badge: 'Culture'
    },
    {
        id: '05',
        title: 'Integrity',
        desc: 'Highest ethical standards in component sourcing, audited telecom SLA compliance, transparent billing meters, and customer data security.',
        badge: 'Ethics'
    },
    {
        id: '06',
        title: 'Teamwork',
        desc: 'Synergistic collaboration between embedded R&D engineers, Patparganj plant technicians, and 24/7 field service teams across India.',
        badge: 'Unity'
    },
];

// Authentic prototype & controller cards from sysinfra.in/cardsImg/
const RD_CARDS = [
    {
        name: 'SVR Card (Static Voltage Regulator)',
        img: 'img/cardsImg/svrCard.webp',
        desc: 'Microprocessor card for precision voltage regulation and phase correction in high-fluctuation circles.',
        tag: 'Power Conditioning'
    },
    {
        name: 'AC/DC High-Precision Measurement Card',
        img: 'img/cardsImg/measurmentCard.webp',
        desc: 'Multi-channel isolated voltage, current, and energy measurement card for multi-tenant tower billing.',
        tag: 'Telemetry Shunts'
    },
    {
        name: 'Z-Brainer Intelligent Display & Control Card',
        img: 'img/cardsImg/Z-brainerDisplay&ControlCard.webp',
        desc: 'ARM Cortex edge controller board with tactile membrane keypad and multi-line alphanumeric LCD.',
        tag: 'Edge Analytics'
    },
    {
        name: 'Z-Brainer 32-Channel Alarm Relay Board',
        img: 'img/cardsImg/Z-brainerAlarmRelayCard.webp',
        desc: 'Optically isolated dry-contact concentration card aggregating fire, BTS, battery, and door intrusion signals.',
        tag: 'Alarm Multiplexer'
    },
    {
        name: 'Industrial 4G/LTE GPRS Telemetry Gateway',
        img: 'img/cardsImg/gprsModemtop.webp',
        desc: 'Multi-band cellular communication board with RS485 Modbus pass-through and hardware watchdog.',
        tag: 'Cellular Uplink'
    },
    {
        name: 'Heavy-Duty Railway Power Supply Unit',
        img: 'img/cardsImg/railwayTestbenchPowerSupply.webp',
        desc: 'Ruggedized power converter tested for railway signaling testbenches and high-voltage substations.',
        tag: 'Specialized Power'
    },
    {
        name: 'Galvanic Isolated DC-to-DC Converter Card',
        img: 'img/cardsImg/dctodcConverter.webp',
        desc: 'Converts -48V DC telecom bus into isolated +12V/+24V DC for auxiliary micro-controllers and sensors.',
        tag: 'DC Conversion'
    },
    {
        name: 'Dual DG Alternation & Cycling Relay Card',
        img: 'img/cardsImg/dgRelayCard.webp',
        desc: 'Pluto alternator cycle logic board ensuring symmetrical engine run-hours in off-grid sites.',
        tag: 'DG Automation'
    }
];

// Authentic Sysinfra Leadership & Technical Divisions
const SYSINFRA_LEADERSHIP = [
    {
        name: 'Executive Directorate',
        title: 'Managing Director & Infrastructure Board',
        division: 'Corporate Strategy & Pan-India Operator Alliances',
        bio: 'Steering nationwide telecom tower automation across 70,000+ sites, long-term capital allocation, and strategic turnkey partnerships with Indus Towers, Bharti Airtel, BSNL, and Reliance Jio.',
        icon: 'img/productIconImg/overview.png',
        badge: 'Governance'
    },
    {
        name: 'In-House Retro R&D Division',
        title: 'Chief Technology Officer & Embedded Lead',
        division: 'Microprocessor Firmware & CANBus Architecture',
        bio: 'Directing in-house hardware and software engineering teams. Specializing in rapid-turnaround retro development of AMF controllers, RMS telemetry, ARM Cortex edge computing, and energy optimization algorithms.',
        icon: 'img/productIconImg/research&Development.png',
        badge: 'Embedded R&D'
    },
    {
        name: 'Manufacturing & Plant Operations',
        title: 'Head of Factory Engineering & Quality Assurance',
        division: '4,000 Sq. Ft. Patparganj Plant & QC Testing',
        bio: 'Overseeing international-standard manufacturing of IP55 AMF outdoor panels, 5G smart enclosures, precision sheet metal fabrication, and rigorous 72-hour burn-in electrical stress testing.',
        icon: 'img/productIconImg/manufacturingFacility.png',
        badge: 'Manufacturing'
    },
    {
        name: 'SYS-AXS NOC & IoT Cloud',
        title: 'Principal Architect – Cloud & Enterprise IoT',
        division: 'SYS-AXS NOC Platform & Big Data Analytics',
        bio: 'Managing the high-throughput 24/7 cloud NOC gateway orchestrating 10,000+ active sites with predictive fuel theft analytics, environmental sensors, automated SLA escalations, and mobile app connectivity.',
        icon: 'img/productIconImg/sis-axs.png',
        badge: 'Cloud Telemetry'
    },
    {
        name: 'Field Operations & Power Logistics',
        title: 'Director – 24/7 Field Maintenance & O&M',
        division: '24/7 Ambulance Emergency Model & 300K+ Rectifiers',
        bio: 'Leading a nationwide technical fleet with our 24/7 ambulance emergency rapid-intervention model and India\'s premier facility reconditioning over 3,00,000 SMPS rectifier modules.',
        icon: 'img/productIconImg/siteMaintanance.png',
        badge: 'Field Ops'
    }
];

export default function About({ seo = {} }) {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'About Us — System Infra Solutions Pvt. Ltd.'}
                description={seo?.description || "Explore System Infra Solutions' history, 4,000 sq.ft. Patparganj manufacturing plant, in-house R&D, ISO certifications, and nationwide telecom infrastructure automation."}
                canonicalPath="/about-us"
            />

            {/* Hero Section */}
            <header className="relative bg-white dark:bg-[#000000] pt-32 pb-16 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#dd3c34] dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#dd3c34] animate-pulse" />
                            <span>ABOUT SYSTEM INFRA SOLUTIONS &bull; EST. 2016</span>
                        </div>
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Telecom & Power Infrastructure"
                            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Engineering Telecom &amp; Power Infrastructure
                        </AnimatedHeading>
                        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            System Infra Solutions Pvt. Ltd. (SISPL) is an ISO 9001:2015, ISO 14001:2015, and OHSAS 45001:2018 certified technology powerhouse delivering automated AMF panels, SYS-AXS NOC telemetry platforms, 5G smart boxes, and turnkey site operations across 70,000+ telecom sites nationwide.
                        </p>
                    </div>

                    {/* Quick Highlights Strip from sysinfra.in/aboutus.php */}
                    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-200/80 dark:border-white/10 text-xs font-mono">
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">70,000+</span>
                            <span className="text-slate-500 dark:text-slate-400 mt-1 block">TOWER SITES AUTOMATED</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">3,00,000+</span>
                            <span className="text-slate-500 dark:text-slate-400 mt-1 block">MODULES RECONDITIONED</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">10,000+</span>
                            <span className="text-slate-500 dark:text-slate-400 mt-1 block">SITES IN SYS-AXS NOC</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">4,000 Sq.Ft.</span>
                            <span className="text-slate-500 dark:text-slate-400 mt-1 block">PATPARGANJ PLANT</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* KEY STATS SECTION — EXACT DESIGN & DETAILS FROM sysinfra.in (From User Screenshot) */}
            <KeyStatsSection />

            {/* Vision & Mission Section (From sysinfra.in/visionMission.php) */}
            <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-6">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block">
                                OUR PURPOSE &bull; sysinfra.in/visionMission.php
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                                Vision Without Action Is A Daydream. Action Without Vision Is A Nightmare.
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                Keeping this founding creed at the center of our engineering, System Infra Solutions delivers precision telecom automation, green energy integration, and 24/7 remote monitoring that bridges ground infrastructure to centralized cloud control.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                <div className="p-5 rounded-2xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-xs">
                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#dd3c34] flex items-center justify-center font-bold mb-3 font-mono text-sm">
                                        V
                                    </div>
                                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">
                                        Our Vision
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        To establish SISPL as the most trusted indigenous provider of automated telecom power conditioning, IoT telemetry, and renewable energy systems across South Asia.
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 shadow-xs">
                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#dd3c34] flex items-center justify-center font-bold mb-3 font-mono text-sm">
                                        M
                                    </div>
                                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">
                                        Our Mission
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        To empower network operators and tower companies with resilient hardware, rapid-turnaround retro R&D, and SLA-guaranteed emergency intervention that eliminates diesel wastage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Vision & Mission Banner Photo from sysinfra.in */}
                        <div className="lg:col-span-6">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 group">
                                <img 
                                    src="/img/banner/vision-mission.jpg" 
                                    alt="System Infra Solutions Vision and Mission" 
                                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/img/sysinfraPhase/product_banner.png';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <div className="text-white">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff6b6b] font-bold block">
                                            HEADQUARTERS &bull; NEW DELHI
                                        </span>
                                        <h4 className="text-lg font-display font-bold mt-0.5">
                                            Plot No. 382, F.I.E., Patparganj Industrial Area
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section (sysinfra.in/ourCoreValues.php) */}
            <section className="py-16 sm:py-20 bg-white dark:bg-[#000000] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                            OUR PRINCIPLES &bull; sysinfra.in/ourCoreValues.php
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Core Values & Principles"
                            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                        >
                            The Six Core Values &amp; Principles
                        </AnimatedHeading>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            These core principles guide our engineering decisions, client SLA deliverables, and continuous improvement across our manufacturing facilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CORE_VALUES.map((val) => (
                            <div 
                                key={val.id} 
                                className="p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 hover:border-[#dd3c34]/50 dark:hover:border-[#dd3c34]/50 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-mono font-bold text-slate-300 dark:text-white/20 group-hover:text-[#dd3c34] transition-colors">
                                            {val.id}
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] font-bold border border-red-500/20">
                                            {val.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-[#dd3c34] dark:group-hover:text-[#ff6b6b] transition-colors">
                                        {val.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                        {val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* In-House R&D Showcase & Prototype Boards (sysinfra.in/researchDevelopment.php) */}
            <section id="research" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-10 items-center mb-12">
                        <div className="lg:col-span-7">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                                RESEARCH &amp; DEVELOPMENT &bull; sysinfra.in/researchDevelopment.php
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="Proprietary Hardware & Firmware"
                                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                            >
                                In-House Proprietary Hardware &amp; Firmware
                            </AnimatedHeading>
                            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                We at System Infra are dedicated to constantly developing cutting-edge technology. Our in-house hardware and software engineering teams give us the flexibility to turn around any retro development in a fraction of standard industry timelines.
                            </p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-lg">
                                <img 
                                    src="/img/banner/research&development.jpg" 
                                    alt="Sysinfra Research & Development Facility" 
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/img/sysinfraPhase/product_banner.png';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* R&D Prototype Hardware Gallery (Downloaded Cards from sysinfra.in/cardsImg/) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
                                AUTHENTIC PROTOTYPES &amp; CONTROLLER BOARDS ENGINEERED IN PATPARGANJ LAB
                            </span>
                            <span className="text-xs font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-semibold">
                                8 Engineered Sub-Systems
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {RD_CARDS.map((card, idx) => (
                                <div 
                                    key={idx}
                                    className="group relative p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-pointer"
                                >
                                    {/* Specular top red laser line on hover */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div>
                                        <div className="aspect-[4/3] w-full rounded-xl bg-slate-100 dark:bg-white/[0.02] p-3 flex items-center justify-center overflow-hidden mb-3 border border-slate-100 dark:border-white/5">
                                            <img 
                                                src={`/${card.img}`} 
                                                alt={card.name} 
                                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/img/cardsImg/svrCard.webp';
                                                }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] font-bold block w-fit mb-1.5">
                                            {card.tag}
                                        </span>
                                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">
                                            {card.name}
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Growth Story & Milestones (sysinfra.in/growthStory.php) */}
            <section id="growth" className="py-16 sm:py-20 bg-white dark:bg-[#000000] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                            GROWTH STORY &bull; sysinfra.in/growthStory.php
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Notable Milestones & Achievements"
                            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                        >
                            Notable Milestones &amp; Achievements
                        </AnimatedHeading>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            From pioneering solar hybrid AMF panels to deploying 50,000+ controllers across India's largest telecom networks.
                        </p>
                    </div>

                    {/* Milestone Chart Banner from sysinfra.in */}
                    <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl mb-12 bg-slate-50 dark:bg-white/[0.02]">
                        <img 
                            src="/img/banner/history-milestone1-1536x671.png" 
                            alt="Sysinfra Growth Story & Milestones" 
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/img/sysinfraPhase/milestoneimage.jpg';
                            }}
                        />
                    </div>

                    {/* 8 Audited Growth Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MILESTONES.map((m, idx) => (
                            <div 
                                key={idx} 
                                className="group relative p-6 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out overflow-hidden"
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <div className="text-3xl font-display font-extrabold text-[#dd3c34] dark:text-[#ff5c54] mb-1">
                                    {m.metric}
                                </div>
                                <div className="h-0.5 w-8 bg-[#dd3c34] rounded-full my-2 group-hover:w-12 transition-all duration-300" />
                                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
                                    {m.label}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                    {m.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Manufacturing Facility & Quality Assurance (sysinfra.in/manufacturingFacility.php) */}
            <section id="manufacturing" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-10 items-center mb-12">
                        <div className="lg:col-span-6 space-y-4">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block">
                                PRODUCTION FACILITY &bull; sysinfra.in/manufacturingFacility.php
                            </span>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                                4,000 Sq. Ft. International Standard Manufacturing Plant
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                System Infra Solutions Private Limited (SISPL) operates an international quality standard manufacturing facility of 4,000 square feet for complete assembly, wiring, and testing of AMF panels, power controllers, and IoT telemetry products at Patparganj Industrial Area, New Delhi.
                            </p>
                            <div className="space-y-2 pt-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd3c34]" />
                                    <span>Precision sheet metal fabrication &amp; IP55 powder coating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd3c34]" />
                                    <span>Automated PCB assembly &amp; selective soldering lines</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd3c34]" />
                                    <span>72-hour full electrical load &amp; thermal burn-in chambers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#dd3c34]" />
                                    <span>High-voltage dielectric insulation &amp; surge surge testing</span>
                                </div>
                            </div>
                        </div>

                        {/* Facility Warehouse & Maps Photos from sysinfra.in */}
                        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-md">
                                <img 
                                    src="/img/Certificate/Wherehouse.png" 
                                    alt="Sysinfra Warehouse & Assembly" 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-md">
                                <img 
                                    src="/img/Certificate/maps.png" 
                                    alt="Sysinfra Pan-India Coverage Map" 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Turnkey 6-Step Project Execution Pipeline */}
                    <div className="mt-16 pt-12 border-t border-slate-200/80 dark:border-white/10">
                        <div className="max-w-2xl mb-8">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                WORKFLOW PIPELINE
                            </span>
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                                Six-Phase Turnkey Execution Pipeline
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PROCESS.map((p) => (
                                <div 
                                    key={p.step}
                                    className="group relative p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <span className="text-2xl font-mono font-black text-[#dd3c34] dark:text-[#ff6b6b] block mb-2">
                                        {p.step}
                                    </span>
                                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                                        {p.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications & Quality Accreditations (sysinfra.in/certifications.php) */}
            <section id="certifications" className="py-16 sm:py-20 bg-white dark:bg-[#000000] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                            QUALITY ASSURANCE &bull; sysinfra.in/certifications.php
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Certified Quality Standards"
                            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                        >
                            Audited ISO &amp; Telecom Accreditations
                        </AnimatedHeading>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            Every AMF panel, DC energy meter, and IoT gateway manufactured by System Infra Solutions is governed by audited quality management systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group relative p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out text-center flex flex-col justify-between overflow-hidden cursor-pointer">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white dark:bg-black/40 p-2 border border-slate-200/60 dark:border-white/10 mb-3 shadow-xs">
                                <img 
                                    src="/img/Certificate/Certificate1.jpg" 
                                    alt="ISO 9001:2015 Certificate" 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                                ISO 9001:2015
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                                Quality Management System
                            </span>
                        </div>

                        <div className="group relative p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out text-center flex flex-col justify-between overflow-hidden cursor-pointer">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white dark:bg-black/40 p-2 border border-slate-200/60 dark:border-white/10 mb-3 shadow-xs">
                                <img 
                                    src="/img/Certificate/Certificate2.jpg" 
                                    alt="ISO 14001:2015 Certificate" 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                                ISO 14001:2015
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                                Environmental Management
                            </span>
                        </div>

                        <div className="group relative p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out text-center flex flex-col justify-between overflow-hidden cursor-pointer">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white dark:bg-black/40 p-2 border border-slate-200/60 dark:border-white/10 mb-3 shadow-xs">
                                <img 
                                    src="/img/Certificate/Certificate3.jpg" 
                                    alt="OHSAS 45001:2018 Certificate" 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                                OHSAS 45001:2018
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                                Occupational Health &amp; Safety
                            </span>
                        </div>

                        <div className="group relative p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out text-center flex flex-col justify-between overflow-hidden cursor-pointer">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white dark:bg-black/40 p-2 border border-slate-200/60 dark:border-white/10 mb-3 shadow-xs">
                                <img 
                                    src="/img/Certificate/Certificate4.jpg" 
                                    alt="IP-1 Telecom Registration" 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                                IP-1 Telecom License
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                                Infrastructure Provider Category-I
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL LEADERSHIP & ENGINEERING DIRECTORATE */}
            <section id="leadership" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                            TECHNICAL LEADERSHIP &bull; sysinfra.in
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Telecom Industry Leadership"
                            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                        >
                            Telecom Industry Engineering Leadership
                        </AnimatedHeading>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            Meet the core engineering divisions and executive directorate steering technology innovation, Patparganj manufacturing, and nationwide 24/7 SLA deliverables.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SYSINFRA_LEADERSHIP.map((div, idx) => (
                            <div 
                                key={idx}
                                className="group relative p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/70 dark:hover:border-sysred/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-[0_0_30px_-5px_rgba(221,60,52,0.45)] transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-pointer"
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sysred dark:via-[#ff5c54] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.04] p-2 flex items-center justify-center border border-slate-200/60 dark:border-white/10 group-hover:scale-105 transition-transform">
                                            <img 
                                                src={`/${div.icon}`} 
                                                alt={div.name} 
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-[#dd3c34] dark:text-[#ff6b6b] font-bold border border-red-500/20">
                                            {div.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-[#dd3c34] dark:group-hover:text-[#ff6b6b] transition-colors">
                                        {div.name}
                                    </h3>
                                    <span className="text-[11px] font-mono text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                        {div.title}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-3">
                                        {div.division}
                                    </span>
                                    <div className="h-0.5 w-8 bg-slate-200 dark:bg-white/10 group-hover:w-12 group-hover:bg-[#dd3c34] transition-all duration-300 rounded-full mb-3" />
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                        {div.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIFE, CULTURE & FESTIVAL CELEBRATIONS (sysinfra.in/events.php) */}
            <section id="celebrations" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#050505] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="max-w-2xl">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                                CULTURE &amp; CELEBRATIONS &bull; sysinfra.in/events.php
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="Festival &amp; Team Celebrations"
                                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                            >
                                Festival &amp; Team Celebrations
                            </AnimatedHeading>
                            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                Behind every automated telecom site and precision power module is our dedicated engineering family celebrating milestones, festivals, and new beginnings.
                            </p>
                        </div>
                        <Link 
                            href="/media" 
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#dd3c34] dark:text-[#ff6b6b] hover:underline font-mono shrink-0"
                        >
                            <span>Explore Full Media Archive &rarr;</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* 1. Holi Celebration */}
                        <div className="group rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#dd3c34]/50 transition-all flex flex-col">
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                <img 
                                    src="/img/eventGallery/festivalImg/FestivalCelebration.webp" 
                                    alt="Holi Celebration @ SIS Office Team Delhi" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#dd3c34] text-white uppercase">
                                    FESTIVAL CELEBRATION
                                </div>
                                <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                                    Holi Celebration @ SIS Delhi HQ
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                    Colorful festivities, cultural unity, and energetic celebrations with the System Infra Solutions Delhi headquarters team.
                                </p>
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                                    <span>12 Authentic Photos</span>
                                    <Link href="/media" className="text-[#dd3c34] dark:text-[#ff6b6b] font-semibold hover:underline">
                                        View &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. New Year Celebration */}
                        <div className="group rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#dd3c34]/50 transition-all flex flex-col">
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                <img 
                                    src="/img/eventGallery/newYearCelebration/birthDayBanner.webp" 
                                    alt="New Year Celebration & Employee Milestones" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#dd3c34] text-white uppercase">
                                    NEW YEAR &amp; MILESTONES
                                </div>
                                <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                                    Annual Gathering &amp; Milestones
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                    Welcoming the year ahead, honoring employee milestones, and aligning nationwide engineering teams for continuous 24/7 uptime.
                                </p>
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                                    <span>Team Gala</span>
                                    <Link href="/media" className="text-[#dd3c34] dark:text-[#ff6b6b] font-semibold hover:underline">
                                        View &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 3. India Mobile Congress */}
                        <div className="group rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#dd3c34]/50 transition-all flex flex-col">
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                <img 
                                    src="/img/eventGallery/imcImg/imcBanner.webp" 
                                    alt="India Mobile Congress 5G Launch" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#dd3c34] text-white uppercase">
                                    EXPOS &amp; 5G LAUNCH
                                </div>
                                <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                                    India Mobile Congress (IMC Expo)
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                    Presenting indigenous Smart Box 5G micro-enclosures and IoT power telemetry before industry leaders and telecom operators.
                                </p>
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                                    <span>12 Expo Photos</span>
                                    <Link href="/media" className="text-[#dd3c34] dark:text-[#ff6b6b] font-semibold hover:underline">
                                        View &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Official Catalogues Section (sysinfra.in/resource.php) */}
            <section id="catalogues" className="py-16 sm:py-20 bg-white dark:bg-[#000000] transition-colors duration-300 border-t border-slate-100 dark:border-white/10">
                <div className="container-content">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1.5">
                            DOCUMENTATION &amp; RESOURCES &bull; sysinfra.in/resource.php
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Download Product Catalogues"
                            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white"
                        >
                            Official Downloadable Technical Catalogues
                        </AnimatedHeading>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            Official technical brochures and product data specification sheets directly from our engineering archives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:border-[#dd3c34]/50 transition-all">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                    CORPORATE BROCHURE
                                </span>
                                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                                    System Infra Solutions Corporate Catalogue
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Overview of AMF systems, DC energy meters, Patparganj facility, and nationwide deployment capabilities.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2">
                                <a 
                                    href="/download-catalog"
                                    download="SystemInfraSolutions_MasterCatalogue.pdf"
                                    className="btn-beacon flex-1 !py-2.5 text-xs font-mono font-bold uppercase tracking-wider justify-center flex items-center gap-1.5"
                                    title="Download Master Corporate Catalogue"
                                >
                                    <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download PDF</span>
                                </a>
                                <a
                                    href="/storage/catalogue/SystemInfraSolutionsCatalogue.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    title="Preview in browser"
                                >
                                    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:border-[#dd3c34]/50 transition-all">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                    TELECOM SECURITY
                                </span>
                                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                                    I-Protect Tower Security &amp; Anti-Theft
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    RFID electronic locking, dual PIR movement detection, and diesel tank ultrasonic siphon deterrent specifications.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2">
                                <a 
                                    href="/storage/catalogue/IProtectCatalouge.pdf"
                                    download="IProtectCatalouge.pdf"
                                    className="btn-beacon flex-1 !py-2.5 text-xs font-mono font-bold uppercase tracking-wider justify-center flex items-center gap-1.5"
                                    title="Download I-Protect Catalogue"
                                >
                                    <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download PDF</span>
                                </a>
                                <a
                                    href="/storage/catalogue/IProtectCatalouge.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    title="Preview in browser"
                                >
                                    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:border-[#dd3c34]/50 transition-all">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                    NOC TELEMETRY
                                </span>
                                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                                    SYS-AXS Enterprise Cloud NOC Platform
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Scalable microservices architecture, real-time map visualization, fuel fraud detection, and mobile alerting trees.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2">
                                <a 
                                    href="/storage/catalogue/SIS-AXSCatalouge.pdf"
                                    download="SIS-AXSCatalouge.pdf"
                                    className="btn-beacon flex-1 !py-2.5 text-xs font-mono font-bold uppercase tracking-wider justify-center flex items-center gap-1.5"
                                    title="Download SIS-AXS Catalogue"
                                >
                                    <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download PDF</span>
                                </a>
                                <a
                                    href="/storage/catalogue/SIS-AXSCatalouge.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    title="Preview in browser"
                                >
                                    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:border-[#dd3c34]/50 transition-all">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dd3c34] dark:text-[#ff6b6b] font-bold block mb-1">
                                    5G / SMALL CELL
                                </span>
                                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                                    Smart Box Integrated Outdoor Node
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Pole-mountable IP65 enclosure specifications for 5G micro-sites, CCTV edge aggregation, and power conversion.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2">
                                <a 
                                    href="/storage/catalogue/SmartBoxCatalog.pdf"
                                    download="SmartBoxCatalog.pdf"
                                    className="btn-beacon flex-1 !py-2.5 text-xs font-mono font-bold uppercase tracking-wider justify-center flex items-center gap-1.5"
                                    title="Download Smart Box Catalogue"
                                >
                                    <svg className="w-3.5 h-3.5 stroke-[2.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download PDF</span>
                                </a>
                                <a
                                    href="/storage/catalogue/SmartBoxCatalog.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    title="Preview in browser"
                                >
                                    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA to All Catalogues */}
                    <div className="mt-10 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <span className="font-display font-bold text-base text-slate-900 dark:text-white block">
                                Need technical sheets for AMF Panels, Dual DG Controllers or Security Systems?
                            </span>
                            <span className="text-xs text-slate-500 dark:text-steel mt-0.5 block">
                                Access our complete official documentation repository matching sysinfra.in/resource.php.
                            </span>
                        </div>
                        <Link
                            href="/resources"
                            className="btn-outline-dark !py-2.5 !px-5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shrink-0"
                        >
                            <span>Browse All 7 Technical Catalogues</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
