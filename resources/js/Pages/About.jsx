import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedNumber from '@/Components/AnimatedNumber';
import WhySysinfraDiagram from '@/Components/WhySysinfraDiagram';
import AnimatedHeading from '@/Components/AnimatedHeading';

const PROCESS = [
    {
        step: '01',
        title: 'RF Propagation Survey & Spectrum Modeling',
        description: 'Comprehensive topographic and RF propagation analysis using calibrated spectrum analyzers to map terrain obstacles, Fresnel zone clearance, and signal attenuation.',
    },
    {
        step: '02',
        title: 'WPC & Government Frequency Clearances',
        description: 'End-to-end statutory assistance with the Wireless Planning & Coordination (WPC) Wing of the Ministry of Communications for frequency allocation and ETA approvals.',
    },
    {
        step: '03',
        title: 'Custom Hardware Calibration & R&D',
        description: 'Frequency retuning, duplexer cavity filter alignment, and MIL-STD compliance validation performed at our New Delhi laboratory before equipment deployment.',
    },
    {
        step: '04',
        title: 'Tower, Mast & Repeater Infrastructure',
        description: 'Civil and structural engineering for repeater base masts, high-gain Diamond antenna arrays, lightning arrestors, and uninterrupted solar/battery power backups.',
    },
    {
        step: '05',
        title: 'Factory Acceptance & Commissioning (FAT/SAT)',
        description: 'Full-duplex stress testing, voice logging verification, and formal handover to client technical commanders with operational field training.',
    },
    {
        step: '06',
        title: '24/7 Level-3 AMC & Spares Inventory',
        description: 'Dedicated nationwide annual maintenance contracts with a New Delhi spares depot guaranteeing rapid board-level turnaround and firmware lifecycle support.',
    },
];

export default function About({ team = [], seo = {} }) {
    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'About System Infra Solutions — Mission-Critical Telecommunications Leader'}
                description={seo?.description || 'Learn about System Infra Solutions, executive leadership, engineering standards, and turnkey wireless network delivery across India.'}
                canonicalPath="/about-us"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider mb-4 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon animate-pulse" />
                            <span>GOVT. OF INDIA WPC & TEC APPROVED SUPPLIER &bull; NEW DELHI HQ</span>
                        </div>
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Wireless Communications."
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Mobility, Efficiency & Reliability in Wireless Communications.
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            System Infra Solutions is a market leader in mission-critical wireless communications in India. We pioneer in offering world-class wireless communication solutions to customers around the country.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl text-xs font-mono">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">UNITS DEPLOYED</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">300,000+ UNITS SOLD</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">STANDARDS</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">DMR &bull; TETRA &bull; PoC &bull; LTE-R</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">PROJECTS</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">500+ DELIVERED</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">NETWORK</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">50+ DISTRIBUTORS</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Corporate Narrative & Impact Metrics */}
            <section className="py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-5 text-slate-700 dark:text-steel leading-relaxed text-sm sm:text-base">
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block">
                                OUR PURPOSE & HERITAGE
                            </span>
                            <AnimatedHeading
                                as="h2"
                                highlightPhrase="Failure is Not an Option"
                                className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-paper"
                            >
                                Engineering Turnkey Networks Where Failure is Not an Option
                            </AnimatedHeading>
                            <p>
                                Mobility, Efficiency, and Reliability are the three core principles that System Infra Solutions products and solutions are designed to meet. Cutting-edge technologies and open standards are supported across all of our systems.
                            </p>
                            <p>
                                Sysinfra has been investing continuously in product and solution research and development because it understands the need to provide customized solutions for users in critical industries. Additionally, devices are an essential component of any solution, and Sysinfra collaborates with reputable global OEMs to supply equipment optimized for Indian spectrum conditions.
                            </p>

                            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                                <span className="px-3 py-1.5 bg-white dark:bg-navy-surface border border-slate-200 dark:border-navy-border rounded-lg font-semibold text-slate-800 dark:text-paper">
                                    ✓ Make in India Partner
                                </span>
                                <span className="px-3 py-1.5 bg-white dark:bg-navy-surface border border-slate-200 dark:border-navy-border rounded-lg font-semibold text-slate-800 dark:text-paper">
                                    ✓ ISO 9001:2015 Quality Management
                                </span>
                                <span className="px-3 py-1.5 bg-white dark:bg-navy-surface border border-slate-200 dark:border-navy-border rounded-lg font-semibold text-slate-800 dark:text-paper">
                                    ✓ 100% WPC & TEC Approved
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="card-symmetric p-6 space-y-2 hover:border-blue-500/50 dark:hover:border-beacon/40 hover:shadow-xl transition-all duration-300">
                                    <div className="font-display text-3xl font-bold text-blue-600 dark:text-beacon">
                                        <AnimatedNumber value="300,000" suffix="+" duration={1800} />
                                    </div>
                                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-paper">Units Sold</h3>
                                    <p className="text-xs text-slate-500 dark:text-steel">Wireless communication units, terminals, and radio systems deployed nationwide.</p>
                                </div>
                                <div className="card-symmetric p-6 space-y-2 hover:border-blue-500/50 dark:hover:border-beacon/40 hover:shadow-xl transition-all duration-300">
                                    <div className="font-display text-3xl font-bold text-blue-600 dark:text-beacon">
                                        <AnimatedNumber value={500} suffix="+" duration={2000} />
                                    </div>
                                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-paper">Projects Delivered</h3>
                                    <p className="text-xs text-slate-500 dark:text-steel">Turnkey communication systems delivered for public safety, transit, and heavy industry.</p>
                                </div>
                                <div className="card-symmetric p-6 space-y-2 hover:border-blue-500/50 dark:hover:border-beacon/40 hover:shadow-xl transition-all duration-300">
                                    <div className="font-display text-3xl font-bold text-blue-600 dark:text-beacon">
                                        <AnimatedNumber value={50} suffix="+" duration={1600} />
                                    </div>
                                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-paper">Distributor Network</h3>
                                    <p className="text-xs text-slate-500 dark:text-steel">Nationwide network of authorized channel partners providing sales and engineering support.</p>
                                </div>
                                <div className="card-symmetric p-6 space-y-2 hover:border-blue-500/50 dark:hover:border-beacon/40 hover:shadow-xl transition-all duration-300">
                                    <div className="font-display text-3xl font-bold text-blue-600 dark:text-beacon">
                                        <span>100%</span>
                                    </div>
                                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-paper">WPC & TEC Approved</h3>
                                    <p className="text-xs text-slate-500 dark:text-steel">All hardware systems fully certified under Government of India wireless regulatory standards.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OEM Alliances & GeM Procurement */}
            <section className="py-20 sm:py-24 bg-white dark:bg-[#000000] transition-colors duration-300">
                <div className="container-content">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-5 text-slate-700 dark:text-steel leading-relaxed text-sm sm:text-base">
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block">
                                OEM ALLIANCES & GeM PROCUREMENT
                            </span>
                            <AnimatedHeading
                                as="h2"
                                highlightPhrase="Make In India Manufacturing"
                                className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-paper leading-snug"
                            >
                                World-Class Technology Alliances & Make In India Manufacturing
                            </AnimatedHeading>
                            <p>
                                We collaborate with the world&rsquo;s leading Original Equipment Manufacturers (OEMs) and technology providers to bring best-in-class communication solutions to India. We are a leading manufacturer of LTE MCX, LTE PoC, and DMR radios in India.
                            </p>
                            <p>
                                We specialize in offering best communication solutions which are right for your business — configured for zero downtime across government, enterprise, and industrial deployments.
                            </p>
                            <p className="p-4 rounded-xl bg-blue-500/10 dark:bg-beacon/10 border border-blue-500/20 dark:border-beacon/20 text-slate-800 dark:text-slate-200">
                                <strong>Government Procurement:</strong> Sysinfra offers genuine Kenwood communication products on the <strong>GeM (Government e-Marketplace)</strong> portal for seamless public, defense, and paramilitary procurement.
                            </p>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-100/70 dark:bg-[#000000]/80 shadow-2xl group p-6 flex items-center justify-center">
                                <img
                                    src="/storage/media/about/as03.png"
                                    alt="Sysinfra OEM Manufacturing & GeM Delivery"
                                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)]"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>OEM Manufacturing &bull; GeM Registered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Official RF Testing Lab & Service Infrastructure ("Service is our Motto") */}
            <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#111111] transition-colors duration-300 relative overflow-hidden">
                <div className="container-content relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left: Sysinfra Lab Photo (From Official Website) */}
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-950 shadow-2xl group">
                                <img
                                    src="/storage/media/about/sancharlab.png"
                                    alt="System Infra Solutions RF Engineering & Testing Lab"
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                    <span>SANCHAR RF TESTING LAB &bull; NEW DELHI</span>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                                    <p className="text-xs font-mono text-white/90">
                                        In-House Calibration, Component-Level Repair & Pre-Dispatch Testing Rig
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: "Service is our Motto" Narrative from Official Website */}
                        <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-slate-700 dark:text-steel leading-relaxed text-sm sm:text-base">
                            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block">
                                IN-HOUSE TESTING & LEVEL-3 SERVICE DEPOT
                            </span>
                            <AnimatedHeading
                                as="h2"
                                highlightPhrase="Service is our Motto"
                                className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-paper leading-snug"
                            >
                                “Service is our Motto” — Telecom Experts & Advanced Lab Infrastructure
                            </AnimatedHeading>
                            <p>
                                Sysinfra excels in offering mission-critical communication solutions to diverse sectors such as public safety, railways, utility companies, and industrial houses with DMR, TETRA, analog radio, and LTE technologies.
                            </p>
                            <p>
                                Sysinfra is geographically spread across the country through our excellent and dedicated channel partners who excel in providing communication solutions right at your doorstep.
                            </p>
                            <p className="font-semibold text-slate-900 dark:text-paper border-l-4 border-blue-600 dark:border-beacon pl-4 italic">
                                &ldquo;Service is our Motto&rdquo; &mdash; Sysinfra&rsquo;s team of highly skilled telecom experts and best-in-class infrastructure ensures the right solution for each customer.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-paper">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beacon" />
                                    <span>RF Spectrum Calibration</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-paper">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beacon" />
                                    <span>Level-3 Board Repair Depot</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-paper">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beacon" />
                                    <span>Pre-Commissioning Burn-In</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-paper">
                                    <span className="w-1.5 h-1.5 rounded-full bg-beacon" />
                                    <span>Spares Inventory Management</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link 
                                    href="/contact-us" 
                                    className="btn-shimmer !py-3 !px-7 text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2 group"
                                >
                                    <span>Consult Lab Technical Desk</span>
                                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Value Pillars Diagram (Why Choose System Infra Solutions) */}
            <WhySysinfraDiagram />

            {/* Turnkey 6-Step Execution Methodology */}
            <section className="py-12 sm:py-14 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    {/* Header */}
                    <div className="max-w-2xl mb-6 sm:mb-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1.5">
                            TURNKEY PROJECT PIPELINE
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Turnkey Wireless Projects"
                            className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                        >
                            How We Deliver Turnkey Wireless Projects
                        </AnimatedHeading>
                        <p className="mt-2 text-slate-600 dark:text-steel leading-relaxed text-sm">
                            From initial RF site propagation surveys and government frequency clearances to final commissioning and 24/7 maintenance, our engineers manage the complete lifecycle.
                        </p>
                    </div>

                    {/* CSS-Tricks Style Turnkey Pipeline: Left Fixed Animated Anchor Card + All 6 Phases Visible Deck */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5 xl:gap-6">
                        {/* 1. Left Fixed Anchor Card (Visibly larger, taller framing anchor, flowing gradient animation) */}
                        <div className="csstricks-anchor shrink-0 w-full lg:w-[250px] xl:w-[265px] h-auto lg:h-[370px] xl:h-[380px]">
                            <div className="csstricks-anchor-inner h-full flex flex-col justify-between p-6 xl:p-7">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30 text-[10px] font-mono font-bold text-blue-700 dark:text-sky-300 uppercase tracking-widest shadow-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
                                        <span>Full Lifecycle</span>
                                    </div>
                                    <div className="font-display font-black text-2xl sm:text-3xl xl:text-[28px] text-slate-900 dark:text-white tracking-tight leading-tight pt-1">
                                        Turnkey<br />Pipeline<br />
                                        <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent dark:drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
                                            Execution
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                                        6-phase systematic engineering pipeline guaranteeing zero downtime and complete statutory compliance.
                                    </p>
                                </div>

                                <div className="pt-5 border-t border-slate-200 dark:border-white/10 space-y-3 mt-4">
                                    <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                        <span className="text-blue-600 dark:text-sky-400 font-bold">01 &rarr; 06</span>
                                        <span>Phased Handover</span>
                                    </div>
                                    <Link
                                        href="/contact-us?subject=Turnkey%20Project%20Consultation"
                                        className="group/cta inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-white transition-colors"
                                    >
                                        <span>Consult Project Desk</span>
                                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. Overlapping Phase Deck: All 6 cards visible simultaneously on the viewport */}
                        <div className="relative flex-1 min-w-0 group/pipeline overflow-x-auto lg:overflow-x-visible no-scrollbar pb-6 lg:pb-0">
                            <div className="flex items-center csstricks-deck pipeline-deck py-8 px-1">
                                {PROCESS.map((p, index) => (
                                    <div 
                                        key={p.step}
                                        style={{ zIndex: index + 1 }}
                                        className="csstricks-card snap-start shrink-0 h-[260px] sm:h-[270px] group/phase flex flex-col justify-between border border-slate-200/90 dark:border-white/10 bg-white dark:bg-navy-surface rounded-2xl overflow-hidden cursor-pointer"
                                    >
                                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-blue-600 dark:text-beacon font-bold px-1.5 py-0.5 rounded bg-blue-500/10 dark:bg-beacon/10 border border-blue-500/20 dark:border-beacon/20">
                                                        PHASE {p.step}
                                                    </span>
                                                    <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-steel tracking-wider">
                                                        {index + 1}/6
                                                    </span>
                                                </div>

                                                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-paper mb-1.5 group-hover/phase:text-blue-600 dark:group-hover/phase:text-beacon transition-colors leading-snug">
                                                    {p.title}
                                                </h3>

                                                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-steel leading-relaxed">
                                                    {p.description}
                                                </p>
                                            </div>

                                            <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                                                <span className="text-slate-500 dark:text-steel text-[10px] flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    Milestone
                                                </span>
                                                <span className="text-blue-600 dark:text-beacon group-hover/phase:translate-x-1 transition-transform">
                                                    &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Executive Leadership Gallery */}
            <section className="py-12 sm:py-14 bg-white dark:bg-[#000000] transition-colors duration-300">
                <div className="container-content">
                    <div className="max-w-2xl mb-8 sm:mb-10 text-center md:text-left">
                        <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-1.5">
                            LEADERSHIP TEAM
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Telecom Industry Veterans"
                            className="text-2xl sm:text-3xl lg:text-[34px] font-display font-bold text-slate-900 dark:text-paper"
                        >
                            Guided by Telecom Industry Veterans
                        </AnimatedHeading>
                        <p className="mt-2 text-slate-600 dark:text-steel text-sm">
                            Meet the executive directors and technical leadership steering corporate strategy and customer success.
                        </p>
                    </div>

                    {/* Single Line 5-Column Interactive Executive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-5 items-stretch">
                        {(team.length > 0 ? team : [
                            {
                                name: 'Mr. Suresh Gupta',
                                title: 'Founder & Director',
                                exp: '30+ Yrs Exp',
                                bio: 'Founder director bringing in more than 30 years of technology industry leadership. Pivotal in managing corporate direction and strategy with deep technical knowledge.',
                                photo_path: 'media/team/MrSureshGupta_1.jpg'
                            },
                            {
                                name: 'Ms. Priyanka Gupta',
                                title: 'Director',
                                exp: '10+ Yrs Exp',
                                bio: 'Holds a bachelor degree in engineering and MBA with over a decade of experience spearheading marketing, OEM alliances, and channel distribution.',
                                photo_path: 'media/team/PriyankaGupta.jpg'
                            },
                            {
                                name: 'Mr. Amit Goyal',
                                title: 'Vice President',
                                exp: '20+ Yrs Exp',
                                bio: 'Holds a bachelor degree in engineering and MBA with over two decades of experience in software development, partnership development, and project management.',
                                photo_path: 'media/team/Amit_goyal.jpeg'
                            },
                            {
                                name: 'Ms. Ritu Goel',
                                title: 'General Manager – Technical',
                                exp: '20+ Yrs Exp',
                                bio: 'Core technical expertise providing technical direction to the company with over two decades of RF experience.',
                                photo_path: 'media/team/ritugoel.jpg'
                            },
                            {
                                name: 'Mr. Amit Bhardwaj',
                                title: 'General Manager – Finance & Imports',
                                exp: '17+ Yrs Exp',
                                bio: 'Veteran in finance and EXIM heading corporate finance and strategic fiscal planning with over 17 years of hands-on experience.',
                                photo_path: 'media/team/AmitBhardwaj.jpg'
                            }
                        ]).map((member, idx) => {
                            const expBadges = ['30+ Yrs Exp', '10+ Yrs Exp', '20+ Yrs Exp', '20+ Yrs Exp', '17+ Yrs Exp'];
                            const exp = member.exp || expBadges[idx % expBadges.length];

                            return (
                                <div 
                                    key={member.name} 
                                    className="group/member relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-surface border border-slate-200/90 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-beacon/50 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-beacon/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top specular neon illuminated line on hover */}
                                    <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-beacon opacity-0 group-hover/member:opacity-100 transition-opacity duration-500 rounded-t-2xl pointer-events-none" />

                                    {/* Ambient Backlight Hover Glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/[0.04] dark:from-beacon/[0.04] via-transparent to-transparent opacity-0 group-hover/member:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div>
                                        {/* 1:1 Complete Square Photo (Zero Cropping of Faces) */}
                                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-black/60 relative mb-3.5 border border-slate-200/80 dark:border-white/10 group-hover/member:border-blue-500/40 dark:group-hover/member:border-beacon/40 transition-colors duration-500 shadow-xs">
                                            <img
                                                src={`/storage/${member.photo_path}`}
                                                alt={member.name}
                                                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/member:scale-105"
                                                loading="lazy"
                                            />

                                            {/* Executive Experience Chip */}
                                            <div className="absolute top-2 right-2 z-10">
                                                <span className="px-1.5 py-0.5 rounded-md bg-slate-950/85 dark:bg-black/90 backdrop-blur-md border border-white/15 text-[8.5px] font-mono font-bold text-sky-300 dark:text-beacon uppercase tracking-wider shadow-xs">
                                                    {exp}
                                                </span>
                                            </div>

                                            {/* Subtle Vignette Gradient on Lower Image Edge */}
                                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                        </div>

                                        {/* Name & Title */}
                                        <h3 className="font-display font-bold text-sm sm:text-[15px] text-slate-900 dark:text-paper group-hover/member:text-blue-600 dark:group-hover/member:text-beacon transition-colors leading-snug">
                                            {member.name}
                                        </h3>
                                        <p className="text-[10px] sm:text-[11px] font-mono text-blue-600 dark:text-beacon font-semibold tracking-tight uppercase mt-0.5 mb-2 leading-tight">
                                            {member.title}
                                        </p>

                                        {/* Dynamic Accent Divider */}
                                        <div className="h-0.5 w-6 bg-slate-200 dark:bg-white/10 group-hover/member:w-10 group-hover/member:bg-blue-500 dark:group-hover/member:bg-beacon transition-all duration-300 rounded-full mb-2.5" />

                                        {/* Complete Bio (100% Visible, Zero Truncation) */}
                                        <p className="text-[11px] text-slate-600 dark:text-steel leading-relaxed font-normal">
                                            {member.bio}
                                        </p>
                                    </div>

                                    {/* Bottom Verification Footer */}
                                    <div className="pt-2.5 mt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-steel">
                                        <span className="flex items-center gap-1 text-[9.5px]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            Leadership
                                        </span>
                                        <span className="text-blue-600 dark:text-beacon opacity-0 group-hover/member:opacity-100 group-hover/member:translate-x-0.5 transition-all font-semibold text-[9.5px]">
                                            Verified &rarr;
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom Contact CTA */}
            <section className="py-12 sm:py-14 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content text-center max-w-2xl mx-auto space-y-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-paper">Partner with System Infra Solutions</h2>
                    <p className="text-slate-600 dark:text-steel text-sm sm:text-base leading-relaxed">
                        Discover how our technical team can help design, upgrade, or maintain your mission-critical communications infrastructure.
                    </p>
                    <div>
                        <Link href="/contact-us" className="btn-beacon !py-3.5 !px-8 text-sm font-mono uppercase tracking-wider">
                            Connect with Our Technical Team
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
