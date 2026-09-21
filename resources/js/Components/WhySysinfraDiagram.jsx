import React, { useState } from 'react';

const PILLARS = [
    {
        id: 'quality',
        title: 'High Quality',
        color: '#8e0c1f', // Deep Maroon Red
        angle: -90, // Top (12 o'clock)
        x: 270,
        y: 85,
        description: 'ISO 9001:2015 certified assembly, MIL-STD-810G ruggedization, and IP67/68 waterproof compliance across all mission-critical hardware.',
        icon: '✓'
    },
    {
        id: 'professional',
        title: 'Highly Professional',
        color: '#dd4411', // Red-Orange (2 o'clock)
        angle: -30,
        x: 430,
        y: 177,
        description: 'Certified RF engineering leadership, government liaison capabilities, and precision frequency alignment expertise.',
        icon: '★'
    },
    {
        id: 'support',
        title: 'Unmatched Support',
        color: '#ea6f04', // Warm Vibrant Orange (4 o'clock)
        angle: 30,
        x: 430,
        y: 363,
        description: '24/7 emergency telemetry monitoring, dedicated New Delhi RMA spares depot, and rapid nationwide field engineer deployment.',
        icon: '🛡'
    },
    {
        id: 'security',
        title: 'Secure Solutions',
        color: '#2563eb', // Royal/Electric Blue (6 o'clock)
        angle: 90,
        x: 270,
        y: 455,
        description: 'AES-256 encrypted communication complying with defence and strategic communication protocols for mission-critical deployments.',
        icon: '🔒'
    },
    {
        id: 'technology',
        title: 'Latest Technology',
        color: '#3e768e', // Steel Teal / Cyan (8 o'clock)
        angle: 150,
        x: 110,
        y: 363,
        description: 'MOTOTRBO DMR trunking, Motorola APX tactical radios, SYS-AXS NOC telemetry, and 5G smart enclosures for mission-critical sites.',
        icon: '⚡'
    },
    {
        id: 'cost',
        title: 'Cost Effective',
        color: '#990d1c', // Rich Burgundy (10 o'clock)
        angle: 210,
        x: 110,
        y: 177,
        description: 'Direct tier-1 global OEM distribution and lifecycle engineering eliminating intermediary markups and minimizing TCO.',
        icon: '₹'
    },
];

export default function WhySysinfraDiagram() {
    const [activePillar, setActivePillar] = useState(null);

    const centerX = 270;
    const centerY = 270;
    const centerRadius = 72;
    const spokeRadius = 54;

    return (
        <section className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 relative overflow-hidden">
            {/* Soft Ambient Radial Background Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-beacon/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-content relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-beacon font-bold block mb-2">
                        OUR CORE VALUE PROPOSITION
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-paper tracking-tight">
                        Why Choose System Infra Solutions
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-steel text-sm leading-relaxed">
                        Six foundational engineering pillars delivering mission-critical reliability across India’s most demanding security and industrial environments.
                    </p>
                </div>

                {/* Main Interactive Diagram & Info Showcase */}
                <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: The Symmetrical Radial Hub & Spoke SVG Diagram */}
                    <div className="lg:col-span-7 flex justify-center items-center">
                        <div className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-square">
                            <svg 
                                viewBox="0 0 540 540" 
                                className="w-full h-full filter drop-shadow-xl select-none"
                                aria-label="System Infra Solutions Six Core Value Pillars"
                            >
                                <defs>
                                    {/* Ambient Glow Filter */}
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>

                                    {/* Radial Gradients for Center Hub */}
                                    <radialGradient id="centerGrad" cx="40%" cy="40%" r="65%">
                                        <stop offset="0%" stopColor="#e51837" />
                                        <stop offset="100%" stopColor="#b30922" />
                                    </radialGradient>
                                </defs>

                                {/* Spoke Connecting Lines (Behind Circles) */}
                                {PILLARS.map((p) => (
                                    <line
                                        key={`line-${p.id}`}
                                        x1={centerX}
                                        y1={centerY}
                                        x2={p.x}
                                        y2={p.y}
                                        stroke={activePillar?.id === p.id ? p.color : '#b30922'}
                                        strokeWidth={activePillar?.id === p.id ? "3.5" : "2"}
                                        strokeDasharray={activePillar?.id === p.id ? "none" : "none"}
                                        className="transition-all duration-300 opacity-70"
                                    />
                                ))}

                                {/* Center Hub Circle (System Infra Solutions) */}
                                <g className="cursor-pointer">
                                    <circle
                                        cx={centerX}
                                        cy={centerY}
                                        r={centerRadius}
                                        fill="url(#centerGrad)"
                                        className="transition-transform duration-300"
                                    />
                                    <circle
                                        cx={centerX}
                                        cy={centerY}
                                        r={centerRadius}
                                        fill="none"
                                        stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={centerX}
                                        y={centerY - 10}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="#ffffff"
                                        className="font-display font-bold text-base sm:text-lg tracking-tight pointer-events-none"
                                    >
                                        System Infra
                                    </text>
                                    <text
                                        x={centerX}
                                        y={centerY + 14}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="#ffffff"
                                        className="font-display font-bold text-base sm:text-lg tracking-tight pointer-events-none"
                                    >
                                        Telesystems
                                    </text>
                                </g>

                                {/* 6 Outer Spoke Circles */}
                                {PILLARS.map((p) => {
                                    const isHovered = activePillar?.id === p.id;
                                    const [word1, word2] = p.title.split(' ');

                                    return (
                                        <g 
                                            key={p.id}
                                            onMouseEnter={() => setActivePillar(p)}
                                            onMouseLeave={() => setActivePillar(null)}
                                            onClick={() => setActivePillar(p)}
                                            className="cursor-pointer transition-transform duration-300"
                                            style={{
                                                transformOrigin: `${p.x}px ${p.y}px`,
                                                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                                            }}
                                        >
                                            {/* Hover Glow Ring */}
                                            {isHovered && (
                                                <circle
                                                    cx={p.x}
                                                    cy={p.y}
                                                    r={spokeRadius + 7}
                                                    fill="none"
                                                    stroke={p.color}
                                                    strokeWidth="2"
                                                    strokeDasharray="4 3"
                                                    className="animate-spin-slow"
                                                    style={{ animationDuration: '8s' }}
                                                />
                                            )}

                                            {/* Main Solid Circle */}
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r={spokeRadius}
                                                fill={p.color}
                                                stroke="rgba(255, 255, 255, 0.3)"
                                                strokeWidth="1.5"
                                                className="transition-all duration-300"
                                            />

                                            {/* Pillar Typography */}
                                            <text
                                                x={p.x}
                                                y={p.y - 8}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fill="#ffffff"
                                                className="font-display font-bold text-[13px] sm:text-[14px] tracking-tight pointer-events-none"
                                            >
                                                {word1}
                                            </text>
                                            <text
                                                x={p.x}
                                                y={p.y + 11}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fill="#ffffff"
                                                className="font-display font-bold text-[13px] sm:text-[14px] tracking-tight pointer-events-none"
                                            >
                                                {word2}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Right: Interactive Pillar Breakdown & Highlighting */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="panel p-6 sm:p-8 relative overflow-hidden border border-slate-200/90 dark:border-navy-border shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <span 
                                    className="w-4 h-4 rounded-full transition-colors duration-300"
                                    style={{ backgroundColor: activePillar ? activePillar.color : '#b30922' }}
                                />
                                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-paper">
                                    {activePillar ? activePillar.title : 'Architected for Critical Telecom'}
                                </h3>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                {activePillar 
                                    ? activePillar.description 
                                    : 'Hover or tap any of the six pillars on the diagram to inspect our specialized engineering, statutory WPC approvals, and post-commissioning support standards.'
                                }
                            </p>

                            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-navy-border/60 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-steel">
                                <span>INTERACTIVE VALUE MATRIX</span>
                                <span className="text-blue-600 dark:text-beacon font-semibold">
                                    {activePillar ? 'ACTIVE PILLAR' : '6 VALUE DRIVERS'}
                                </span>
                            </div>
                        </div>

                        {/* Quick 3x2 Mini Grid for Mobile & Fast Scanning */}
                        <div className="grid grid-cols-2 gap-3">
                            {PILLARS.map((p) => {
                                const isSelected = activePillar?.id === p.id;
                                return (
                                    <button
                                        key={`btn-${p.id}`}
                                        onClick={() => setActivePillar(p)}
                                        onMouseEnter={() => setActivePillar(p)}
                                        className={`p-3 rounded-xl border text-left transition-all text-xs font-medium flex items-center gap-2.5 ${
                                            isSelected 
                                                ? 'border-blue-500/80 bg-white dark:bg-navy-surface shadow-md scale-[1.02]' 
                                                : 'border-slate-200 dark:border-navy-border/80 bg-white dark:bg-navy-surface/80 hover:border-slate-300 dark:hover:border-navy-border'
                                        }`}
                                    >
                                        <span 
                                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                                            style={{ backgroundColor: p.color }} 
                                        />
                                        <span className="truncate text-slate-900 dark:text-paper font-semibold">
                                            {p.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
