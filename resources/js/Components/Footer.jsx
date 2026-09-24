import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Footer() {
    return (
        <footer className="bg-black text-slate-300 dark:text-zinc-400 relative overflow-hidden transition-colors duration-300 border-t border-zinc-900">
            {/* Certifications & Compliance Strip — Smooth Horizontal Moving Marquee */}
            <div className="bg-zinc-950 border-b border-zinc-900/80 relative z-10 overflow-hidden py-3.5 select-none">
                {/* Side gradient fade masks */}
                <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-zinc-950 to-transparent" />
                <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-zinc-950 to-transparent" />

                <div className="flex animate-marquee-footer">
                    {[0, 1, 2, 3].map((loopIdx) => (
                        <div key={loopIdx} className="flex items-center gap-6 xl:gap-8 text-xs font-mono text-zinc-400 shrink-0 pr-6 xl:pr-8 whitespace-nowrap">
                            <span className="flex items-center gap-2 text-[#ff6b6b] font-bold">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>IP-1 &amp; DPL TELECOM LICENSED PROVIDER</span>
                            </span>
                            <span className="text-zinc-600 font-bold">•</span>
                            <span className="text-zinc-300 font-medium">ISO 9001:2015 | ISO 14001:2015 | OHSAS 45001:2018</span>
                            <span className="text-zinc-600 font-bold">•</span>
                            <span className="flex items-center gap-2 text-white font-semibold">
                                <img 
                                    src="/img/motorola-solutions.png" 
                                    alt="Motorola Solutions" 
                                    className="h-4 w-auto object-contain inline-block"
                                />
                                <span>Motorola Solutions Authorized Channel Partner</span>
                            </span>
                            <span className="text-zinc-600 font-bold">•</span>
                            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                <span>24/7 Pan-India Field Operations</span>
                            </span>
                            <span className="text-zinc-600 font-bold">•</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-content py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center group shrink-0" aria-label="System Infra Solutions">
                        <ApplicationLogo variant="footer" className="h-9 sm:h-10 w-auto max-w-[210px]" />
                    </Link>
                    <p className="text-sm leading-relaxed text-zinc-400">
                        System Infra Solutions Pvt. Ltd. (SISPL) is an ISO-certified engineering leader in telecom power automation, 
                        SYS-AXS NOC telemetry, 5G smart enclosures, and tactical wireless networks.
                    </p>
                    <div className="pt-2 flex items-center gap-3 text-zinc-400">
                        <div className="text-xs text-[#ff6b6b] font-mono">
                            Delivering Over 3,00,000+ Power Modules Across India
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="pt-3">
                        <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5 font-semibold">
                            Connect & Follow Us:
                        </span>
                        <div className="flex items-center gap-2.5">
                            <a
                                href="https://www.facebook.com/System-Infra-Solutions-Pvt-Ltd-109200568183891/?ref=pages_you_manage"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow System Infra Solutions on Facebook"
                                title="System Infra Solutions on Facebook"
                                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 group"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/SystemInfra1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow System Infra Solutions on Twitter / X"
                                title="System Infra Solutions on Twitter / X (@SystemInfra1)"
                                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-black hover:border-zinc-700 flex items-center justify-center transition-all duration-200 group"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/system-infra-32a456231/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow System Infra Solutions on LinkedIn"
                                title="System Infra Solutions on LinkedIn"
                                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] flex items-center justify-center transition-all duration-200 group"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <FooterColumn
                    title="Hardware & Systems"
                    links={[
                        { label: 'AMF Panels (Indoor & Outdoor)', href: '/products' },
                        { label: 'SYS-AXS Centralized NOC Gateway', href: '/products' },
                        { label: '5G Small Cell Smart Box', href: '/products' },
                        { label: 'I-Protect Security Telemetry', href: '/products' },
                        { label: 'Class 1 DC Energy Meters', href: '/products' },
                        { label: 'Tactical Motorola DMR Radios', href: '/products' },
                    ]}
                />

                <FooterColumn
                    title="Company & Resources"
                    links={[
                        { label: 'About SISPL & Factory', href: '/about-us' },
                        { label: 'Technical Catalogues (PDF)', href: '/resources' },
                        { label: 'Download Master Catalog', href: '/download-catalog' },
                        { label: 'Our Clients & Enterprise Partners', href: '/clients' },
                        { label: 'Media & Event Gallery', href: '/media' },
                        { label: 'Careers & Opportunities', href: '/careers' },
                        { label: 'RFP & Contact Desk', href: '/contact-us' },
                    ]}
                />

                <div>
                    <h3 className="text-sm font-semibold text-white mb-4 font-mono uppercase tracking-wider">
                        Corporate Headquarters
                    </h3>
                    <address className="not-italic text-sm text-zinc-400 leading-relaxed space-y-3 font-sans">
                        <p>
                            <strong className="text-white font-medium">System Infra Solutions Pvt. Ltd.</strong>
                            <br />
                            Plot No. 382, Third Floor, F.I.E., Patparganj Industrial Area
                            <br />
                            New Delhi - 110092, India
                        </p>
                        <div className="space-y-2 pt-1 text-xs font-mono">
                            <div>
                                <span className="block text-zinc-400 uppercase text-[10px]">Board Line Telephones:</span>
                                <a href="tel:+9101135004142" className="hover:text-[#ff6b6b] text-white transition-colors">
                                    +91-011-35004142 / 43 / 44 / 45
                                </a>
                                <br />
                                <a href="mailto:sales@sysinfra.in" className="hover:text-[#ff6b6b] text-zinc-300 transition-colors">
                                    sales@sysinfra.in
                                </a>
                            </div>
                            <div className="pt-1">
                                <span className="block text-zinc-400 uppercase text-[10px]">Helpline & Support:</span>
                                <a href="tel:+919899905475" className="hover:text-[#ff6b6b] text-white transition-colors">
                                    +91-9899905475 / +91-7668609810
                                </a>
                                <br />
                                <a href="mailto:hr@sysinfra.in" className="hover:text-[#ff6b6b] text-zinc-300 transition-colors">
                                    hr@sysinfra.in
                                </a>
                            </div>
                        </div>
                    </address>
                </div>
            </div>

            <div className="border-t border-zinc-900 bg-black py-6 relative z-10 text-xs text-zinc-500 font-mono">
                <div className="container-content flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} System Infra Solutions Pvt. Ltd. All Rights Reserved.</p>
                    <div className="flex items-center gap-5 text-zinc-400">
                        <span className="text-[11px] uppercase tracking-wider text-zinc-500">Social:</span>
                        <a
                            href="https://www.facebook.com/System-Infra-Solutions-Pvt-Ltd-109200568183891/?ref=pages_you_manage"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-[#1877F2] transition-colors"
                        >
                            Facebook
                        </a>
                        <span>•</span>
                        <a
                            href="https://twitter.com/SystemInfra1"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter / X"
                            className="hover:text-white transition-colors"
                        >
                            Twitter (X)
                        </a>
                        <span>•</span>
                        <a
                            href="https://www.linkedin.com/in/system-infra-32a456231/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-[#0A66C2] transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/about-us" className="hover:text-white transition-colors">About</Link>
                        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                        <Link href="/clients" className="hover:text-white transition-colors">Clients</Link>
                        <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                        <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-mono uppercase tracking-wider">
                {title}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-sans">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="hover:text-[#ff6b6b] transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
