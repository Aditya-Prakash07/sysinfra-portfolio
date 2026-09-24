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
                <div className="container-content flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} System Infra Solutions Pvt. Ltd. All Rights Reserved.</p>
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
