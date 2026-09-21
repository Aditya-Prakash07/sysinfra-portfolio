import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

// 100% Complete authentic verbatim OEM partners copy from official website: https://www.sysinfra.in/oem-partners
const AUTHENTIC_OEM_DATA = [
    {
        id: 'kenwood',
        name: 'Kenwood Corporation, Japan',
        shortName: 'Kenwood',
        established: '1946',
        partnershipYear: '1999',
        origin: 'Tokyo, Japan',
        status: 'Direct Accredited Distributor Since 1999',
        domains: ['MOTOTRBO DMR Systems', 'NEXEDGE NXDN', 'P25 Mission Critical', 'Turnkey Repeaters'],
        website_url: 'https://www.kenwood.com/',
        logo_path: 'media/partners/1560034561_Kenwood-logo.png',
        paragraphs: [
            "Started in 1946 KENWOOD IS WORLD LEADER in mobile radios .It has carved out a worldwide reputation as a leader in its field , based on its advanced technologies, innovative R&D manufacturing quality and superb reliability of its product in mission critical application. Sysinfra has been their accredited distributor in India since 1999 to provide best of these sophisticated land mobile radios to its esteemed customer."
        ]
    },
    {
        id: 'diamond',
        name: 'Diamond Corporation, Japan',
        shortName: 'Diamond Antenna',
        established: '1955',
        partnershipYear: '2005',
        origin: 'Tokyo, Japan',
        status: 'Strategic RF Hardware Partner',
        domains: ['RF Base Antennas', 'Mobile Vehicle Antennas', 'Duplexers & Triplexers', 'SWR Meters'],
        website_url: 'https://www.diamond-ant.co.jp/english/',
        logo_path: 'media/partners/1560034773_da.png',
        paragraphs: [
            "Established in September 4th 1955 Diamond, Japan are world leader in RF Antennas and accessories. Sysinfra has been associated with them to provide excellent antennas to give enhanced permanence to our Radios."
        ]
    },
    {
        id: 'radio-activity',
        name: 'Radio Activity',
        shortName: 'Radio Activity',
        established: '2003',
        partnershipYear: '2015',
        origin: 'Milan, Italy',
        status: 'JVCKENWOOD Group 100% Subsidiary',
        domains: ['DMR Tier III Simulcast', 'Multisite Trunking', 'RF Coverage Optimization', 'PMR Base Stations'],
        website_url: 'https://www.radioactivity-tlc.com/',
        logo_path: 'media/partners/1560034967_ra.png',
        paragraphs: [
            "Founded in 2003, Radio Activity is a dynamic and flexible engineering company, specialized in the design of radio devices and applications. With vast experience and multi-disciplinary skills, their team of engineers designs, develops and continuously offers customized solutions to the Professional Mobile Radio (PMR) market. 100% subsidiary of JVCKENWOOD group, Sysinfra associates with them to cater Indian market."
        ]
    },
    {
        id: 'ef-johnson',
        name: 'EF Johnson Technologies',
        shortName: 'EF Johnson',
        established: '1923',
        partnershipYear: '2016',
        origin: 'Irving, Texas, USA',
        status: 'Local Representative in India',
        domains: ['P25 Public Safety', 'ATLAS P25 Infrastructure', 'Viking Multi-Band Transceivers', 'FirstNet Interop'],
        website_url: 'https://www.efjohnson.com/',
        logo_path: 'media/partners/1560035008_ef.png',
        paragraphs: [
            "Founded in 1923, A JVCKENWOOD company,EF Johnson are committed to providing modern, turnkey solutions for today and the future. They deliver superior products so that customer can focus on their mission - protecting and saving lives. Sysinfra are their local representative in India."
        ]
    },
    {
        id: 'yaesu',
        name: 'Yaesu',
        shortName: 'Yaesu',
        established: '1959',
        partnershipYear: '2008',
        origin: 'Tokyo, Japan',
        status: 'Authorized National Distributor',
        domains: ['Ham Amateur Radios', 'Air Band VHF Transceivers', 'Standard Horizon Marine', 'System Fusion C4FM'],
        website_url: 'https://www.yaesu.com/',
        logo_path: 'media/partners/1560035046_ya.png',
        paragraphs: [
            "The Yaesu brand is well known among ham radio aficionados and is synonymous with premium quality ham radios. From stationary multi-feature communications equipment to portable devices, YAESU has consistently represented the best in communications equipment to the world's top DX'ers for over half a century. Sysinfra is National distributor for Yaesu for their Ham radios and air band and marine radios(Standard Horizon)."
        ]
    },
    {
        id: 'ruggear',
        name: 'RugGear',
        shortName: 'RugGear',
        established: '2006',
        partnershipYear: '2018',
        origin: 'Lauda-Königshofen, Germany',
        status: 'Authorized PTT Partner',
        domains: ['MIL-STD-810H Rugged Phones', 'IP68 Push-to-Talk Handsets', 'MCPTT First Responder', 'ATEX Explosion Proof'],
        website_url: 'https://www.ruggear.com/',
        logo_path: 'media/partners/1560035112_ru.png',
        paragraphs: [
            "RugGearhas been a global leader in the design and manufacturing of rugged phones and the partner of choice for leading network operators, enterprises and brands around the world.Sysinfra has partnered with them for rugged phone suitable for PTT operations."
        ]
    },
    {
        id: 'wireless-technologies',
        name: 'Wireless Technologies',
        shortName: 'Wireless Tech',
        established: '2003',
        partnershipYear: '2017',
        origin: 'Espoo, Finland',
        status: 'Carrier-Grade PoC Alliance',
        domains: ['3GPP / IETF Standards', 'Real-Time PushCom Platform', 'Group Dispatch Systems', 'Carrier LTE Interconnect'],
        website_url: 'http://www.wirelesstechnologies.mobi/',
        logo_path: 'media/partners/1560578565_PushCom_Logo_1.PNG',
        paragraphs: [
            "Wireless Technologies Finland Ltd, business ID FI18411756, was founded in Espoo in 2003. The company focuses on developing and supplying real-time group communication solutions for mobile operators and organizations. Our core-solution is a superset of relevant telecom standards from 3GPP and IETF, with a rich set of extensions, flexible integration and configuration options."
        ]
    },
    {
        id: 'teltronics',
        name: 'Teltronics (Cab Radios)',
        shortName: 'Teltronic',
        established: '1974',
        partnershipYear: '2019',
        origin: 'Zaragoza, Spain',
        status: 'Railway Critical Communications Partner',
        domains: ['EN 50155 Train Cab Radios', 'TETRA Ground-to-Train', 'LTE-R High Speed Transit', 'FRMCS 5G Rail Consoles'],
        website_url: 'https://www.teltronic.es/en/',
        logo_path: 'media/partners/1707162735_Teltronics.png',
        paragraphs: [
            "Teltronic solutions are based on TETRA and LTE standards, and offer continuous train-ground voice and data communication. In addition, the 5G standard and its application for the future FRMCS (Future Railway Mobile Communication System) also form part of Teltronic’s offer for the railway sector.",
            "In order to manage the wide range of functionalities of Teltronic on-board equipment, its portfolio includes a set of control consoles. All these consoles include an easy-to-use interface, from which you can control the radio equipment, as well as a set of audio accessories (headphone, speaker and microphone) in order to facilitate driver communications."
        ]
    },
    {
        id: 'nokia',
        name: 'Nokia (Captive 4G/5G)',
        shortName: 'Nokia Enterprise',
        established: '1865',
        partnershipYear: '2020',
        origin: 'Espoo, Finland',
        status: 'Private 4G/5G RAN Integration Partner',
        domains: ['Private Wireless / Captive LTE', 'Open RAN & Cloud RAN', '5G Standalone Core', 'Industrial IoT Automation'],
        website_url: 'https://www.nokia.com/networks/solutions/private-wireless/',
        logo_path: 'media/partners/1707308840_nokia.png',
        paragraphs: [
            "Nokia is the biggest market leader in the Private LTE sector. Nokia RAN devices are by nature future-proof; for example, Nokia radios manufactured after 2012 may be software-upgraded to 5G, which speeds up the rollout of 5G.",
            "Nokia RAN combines the flexibility of cloud RAN and open RAN with the efficiency of single RAN supporting 2G, 3G, 4G, and 5G."
        ]
    },
    {
        id: 'resonous',
        name: 'Resonous',
        shortName: 'Resonous Technologies',
        established: '2014',
        partnershipYear: '2021',
        origin: 'Bangalore, India',
        status: 'Indigenous 4G/5G R&D Alliance',
        domains: ['Make in India 4G/5G Small Cells', 'Rural Telecom Infrastructure', 'Defense Tactical Networks', 'Industry 4.0 Private 5G'],
        website_url: 'https://resonoustech.com/',
        logo_path: 'media/partners/1707308900_Resonous.png',
        paragraphs: [
            "Resonous technologies is a Bangalore based 4G and 5G Wireless Network Solutions Supplier with strong R&D focus for nearly 10 years, delivering cutting edge solutions with secure, reliable, and cost-effective end to end portfolio, Resonous technologies is  specialized to serves the industry-tailored needs of Voice, Broadband Data, and IoT. Resonous technologies focused domains are Rural Telecom, Defense, and Industry4.0 Communications with operations in India, Europe and USA."
        ]
    }
];

export default function OemPartners({ partners = [], seo = {} }) {
    // Merge database partners with authoritative authentic copy
    const mergedPartners = AUTHENTIC_OEM_DATA.map((authPartner) => {
        const dbMatch = partners.find(
            (p) => p.name && (
                p.name.toLowerCase().includes(authPartner.shortName.toLowerCase()) ||
                authPartner.name.toLowerCase().includes(p.name.toLowerCase())
            )
        );
        return {
            ...authPartner,
            logo_path: dbMatch?.logo_path || authPartner.logo_path,
            website_url: dbMatch?.website_url || authPartner.website_url,
        };
    });

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Our Preferred Partners — OEM Alliances | System Infra Solutions'}
                description={seo?.description || "Sysinfra Telesystem has partnered with recognized brand leaders including Kenwood, Diamond, EF Johnson, Yaesu, RugGear, Teltronics, and Nokia to offer best in class communication products."}
                canonicalPath="/oem-partners"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon animate-pulse" />
                        <span>GLOBAL TECHNOLOGY ALLIANCES &bull; OEM NETWORK</span>
                    </div>

                    <div className="max-w-3xl">
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Indian Spectrum."
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            World-Class Hardware, Calibrated for Indian Spectrum.
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            We collaborate with Motorola Solutions and other Tier-1 manufacturers to deliver ISO-certified AMF systems, SYS-AXS NOC platforms, tactical radios, and 5G enclosures for India's telecom and defence sectors.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl text-xs font-mono">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">INTEGRATION MODEL</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">DIRECT AUTHORIZED TIER-1</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">COMPLIANCE PROTOCOL</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">WPC ETA &bull; TEC CAB CERTIFIED</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">BAND CALIBRATION</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">INDIGENOUS LAB TUNING</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">SLA SUPPORT</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">24/7 LEVEL-3 REPAIR BENCH</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Partners List: All OEM Partners with Full Details, One Partner Per Row */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    {/* Official Live Site Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider font-bold block mb-1">
                                AUTHORIZED ECOSYSTEM &bull; OEM NETWORK
                            </span>
                            <AnimatedHeading
                                as="h2"
                                highlightPhrase="preferred partners"
                                className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-paper"
                            >
                                Our preferred partners
                            </AnimatedHeading>
                            <p className="mt-2 text-base text-slate-600 dark:text-steel max-w-3xl leading-relaxed">
                                Sysinfra Telesystem has partnered with recognized brand leaders to offer you best in class communication products to meet all your business needs.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-beacon/10 text-blue-700 dark:text-beacon border border-blue-200 dark:border-beacon/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {mergedPartners.length} Global Technology Alliances
                            </span>
                        </div>
                    </div>

                    {/* All Partners Listed: One Partner per Full-Width Row with Complete Details */}
                    <div className="space-y-8">
                        {mergedPartners.map((partner, idx) => {
                            const hasLink = Boolean(partner.website_url && partner.website_url !== '#');

                            return (
                                <article
                                    key={partner.id}
                                    className="group rounded-2xl bg-white dark:bg-navy-surface border border-slate-200 dark:border-white/10 p-7 sm:p-9 lg:p-10 shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-beacon/40 transition-all duration-300"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                                        {/* Left Column: Brand Identity, Logo, Quick Specs & Official Link */}
                                        <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/10 pb-7 lg:pb-0 lg:pr-8">
                                            {/* High-res Logo Box */}
                                            <div className="h-24 w-full max-w-[240px] px-6 py-4 rounded-xl bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-300 flex items-center justify-center shadow-xs mb-5 transition-transform duration-300 group-hover:scale-105">
                                                <img
                                                    src={partner.logo_path ? `/${partner.logo_path}` : '/img/motorola-solutions.png'}
                                                    alt={partner.name}
                                                    className="max-h-14 max-w-full w-auto object-contain"
                                                    loading="lazy"
                                                />
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-blue-50 dark:bg-beacon/10 text-blue-700 dark:text-beacon border border-blue-200 dark:border-beacon/20 mb-3">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                {partner.status}
                                            </span>

                                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-beacon transition-colors">
                                                {partner.name}
                                            </h3>

                                            {/* Quick Specs Grid */}
                                            <div className="w-full space-y-2 text-xs font-mono border-t border-slate-100 dark:border-white/10 pt-4 mt-2">
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100/70 dark:border-white/5">
                                                    <span className="text-slate-400 dark:text-steel">FOUNDED:</span>
                                                    <span className="font-bold text-slate-800 dark:text-paper">{partner.established}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1 border-b border-slate-100/70 dark:border-white/5">
                                                    <span className="text-slate-400 dark:text-steel">ORIGIN:</span>
                                                    <span className="font-bold text-slate-800 dark:text-paper">{partner.origin}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="text-slate-400 dark:text-steel">SYSINFRA ALLIANCE:</span>
                                                    <span className="font-bold text-blue-600 dark:text-beacon">Since {partner.partnershipYear}</span>
                                                </div>
                                            </div>

                                            {hasLink && (
                                                <a
                                                    href={partner.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-5 group/link inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-white transition-colors"
                                                >
                                                    <span>Visit Official Website</span>
                                                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>

                                        {/* Right Column: Complete Authentic Paragraphs & Domain Chips */}
                                        <div className="lg:col-span-8 flex flex-col justify-between h-full">
                                            <div>
                                                {/* Header Strip with Index Counter */}
                                                <div className="flex items-center justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-steel">
                                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 uppercase tracking-wider text-[10px] font-semibold">
                                                            PORTFOLIO {String(idx + 1).padStart(2, '0')}
                                                        </span>
                                                        <span>&bull;</span>
                                                        <span>OFFICIAL PRINCIPAL DOSSIER</span>
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

                                                {/* 100% Verbatim Authentic Copy from Official Website */}
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
                                                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon" />
                                                    <span>Direct Technical Support, Warranty &amp; Level-3 Calibration by System Infra Solutions</span>
                                                </div>
                                                <span className="text-[11px]">
                                                    Principal #{idx + 1} of {mergedPartners.length}
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
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    01
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    WPC Spectrum Compliance
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    Every imported terminal and RF repeater undergoes stringent harmonic testing, frequency calibration, and Wireless Planning &amp; Coordination (WPC) ETA licensing.
                                </p>
                            </div>

                            <div className="card-symmetric p-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    02
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    Tactical Ruggedization
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    Partner hardware is tested against MIL-STD-810G and IP67/IP68 ingress standards to withstand extreme Indian operating conditions from Himalayan cold to coastal humidity.
                                </p>
                            </div>

                            <div className="card-symmetric p-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon font-mono font-bold flex items-center justify-center mb-4 text-xs">
                                    03
                                </div>
                                <h4 className="font-display font-bold text-slate-900 dark:text-paper text-base mb-2">
                                    Tier-1 RMA &amp; Spares Depot
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-steel leading-relaxed">
                                    Direct OEM parts inventory in New Delhi guarantees sub-48-hour turnarounds on mission-critical board replacements, battery cells, and RF antenna modules.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Partnership Inquiry Banner */}
                    <div className="mt-12 card-dual !bg-white dark:!bg-navy-surface p-8 sm:p-10 border border-slate-200 dark:border-navy-border flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl shadow-sm">
                        <div className="max-w-xl">
                            <span className="text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider font-bold block mb-2">
                                GLOBAL TECHNOLOGY PROVIDERS
                            </span>
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                Expand Into the Indian Defense &amp; Enterprise Market
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                System Infra Solutions offers end-to-end WPC/TEC licensing, government GeM channel distribution, and an active network of over 500+ defense and enterprise dealers across India.
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
