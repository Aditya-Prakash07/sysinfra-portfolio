import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function Clients({ clients = [], seo = {} }) {
    const [selectedSector, setSelectedSector] = useState('ALL');

    const sectors = ['ALL', ...new Set(clients.map(c => c.sector))];

    const filteredClients = selectedSector === 'ALL'
        ? clients
        : clients.filter(c => c.sector === selectedSector);

    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Our Clients & Partners — System Infra Solutions'}
                description={seo?.description || "Trusted by India's largest telecom tower companies, network operators, power utilities, and defence establishments."}
                canonicalPath="/clients"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-sysred dark:text-[#ff6b6b] uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-sysred animate-pulse" />
                        <span>ENTERPRISE CLIENTS &bull; 70,000+ SITES NATIONWIDE</span>
                    </div>

                    <div className="max-w-3xl">
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Trusted Across India's"
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Trusted Across India's Critical Infrastructure
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            System Infra Solutions (SISPL) powers, monitors, and protects critical infrastructure for India's foremost telecom operators, tower companies, national utilities, and tactical defence forces.
                        </p>
                    </div>

                    {/* Stats strip */}
                    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-200/80 dark:border-white/10 max-w-4xl text-xs font-mono">
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">70,000+</span>
                            <span className="text-slate-500 dark:text-steel mt-1 block">TOWER SITES AUTOMATED</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">3,00,000+</span>
                            <span className="text-slate-500 dark:text-steel mt-1 block">MODULES RECONDITIONED</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">10,000+</span>
                            <span className="text-slate-500 dark:text-steel mt-1 block">SITES IN SYS-AXS NOC</span>
                        </div>
                        <div>
                            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white block">20+ Years</span>
                            <span className="text-slate-500 dark:text-steel mt-1 block">ENGINEERING EXCELLENCE</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Client Grid Section */}
            <section className="py-20 bg-slate-50 dark:bg-[#0d0d0d] transition-colors duration-300 min-h-[600px]">
                <div className="container-content">
                    {/* Sector Filters */}
                    <div className="flex flex-wrap items-center gap-2 mb-12">
                        {sectors.map((sec) => (
                            <button
                                key={sec}
                                onClick={() => setSelectedSector(sec)}
                                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                                    selectedSector === sec
                                        ? 'bg-sysred text-white dark:text-slate-950 shadow-md shadow-blue-500/20'
                                        : 'bg-white dark:bg-[#161616] text-slate-700 dark:text-steel hover:bg-slate-100 dark:hover:bg-[#202020] border border-slate-200 dark:border-white/10'
                                }`}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>

                    {/* Logo & Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredClients.map((client, idx) => (
                            <div
                                key={idx}
                                className="group p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-white/10 hover:border-sysred/50 dark:hover:border-[#ff6b6b]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Client Logo with White Background for Clarity */}
                                    <div className="h-28 w-full rounded-xl bg-white p-4 flex items-center justify-center border border-slate-100 dark:border-white/5 mb-5 shadow-xs group-hover:scale-102 transition-transform duration-200">
                                        <img
                                            src={`/${client.logo}`}
                                            alt={client.name}
                                            className="max-h-full max-w-full object-contain filter group-hover:brightness-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/img/brand/1.jpg';
                                            }}
                                        />
                                    </div>

                                    <span className="text-[10px] font-mono uppercase tracking-wider text-sysred dark:text-[#ff6b6b] font-bold block mb-1">
                                        {client.sector}
                                    </span>
                                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">
                                        {client.name}
                                    </h3>
                                    <p className="mt-2 text-xs text-slate-600 dark:text-steel leading-relaxed font-sans">
                                        {client.highlight}
                                    </p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-steel">
                                    <span>Verified Client</span>
                                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Active Site SLA
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-20 p-10 sm:p-12 rounded-3xl bg-gradient-to-br from-[#881337] via-[#141414] to-black text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 max-w-2xl space-y-4">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#ff8f8f] font-bold block">
                                PARTNER WITH SYSINFRA
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
                                Ready to Automate Your Power &amp; Tower Assets?
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Join India's top telecom operators and utilities. Speak directly with our technical leadership in Patparganj Industrial Area to tailor AMF panels, NOC telemetry, or rectifier reconditioning contracts.
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <Link
                                    href="/contact-us"
                                    className="btn-beacon !py-3 !px-7 text-xs font-mono uppercase tracking-wider font-bold"
                                >
                                    Consult Technical Team &rarr;
                                </Link>
                                <a
                                    href="tel:+9101135004142"
                                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase font-bold text-white transition-colors flex items-center gap-2"
                                >
                                    Call +91-011-35004142
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
