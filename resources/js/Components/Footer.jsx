import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Footer() {
    return (
        <footer className="bg-black text-slate-300 dark:text-zinc-400 relative overflow-hidden transition-colors duration-300 border-t border-zinc-900">
            {/* Certifications & Compliance Strip */}
            <div className="bg-zinc-950 border-b border-zinc-900/80 relative z-10">
                <div className="container-content py-3.5 flex items-center justify-between gap-4 lg:gap-6 text-[11px] xl:text-xs font-mono text-zinc-400 whitespace-nowrap overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3.5 xl:gap-6 shrink-0">
                        <span className="flex items-center gap-2 text-sky-400 font-semibold shrink-0">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            IP-1 & DPL TELECOM LICENSED PROVIDER
                        </span>
                        <span className="text-zinc-700 shrink-0">•</span>
                        <span className="shrink-0">ISO 9001:2015 | ISO 14001:2015 | OHSAS 45001:2018</span>
                        <span className="text-zinc-700 shrink-0">•</span>
                        <span className="shrink-0">Motorola Solutions Authorized Channel Partner</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-300 shrink-0 ml-auto pl-4">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="shrink-0">24/7 Pan-India Field Operations</span>
                    </div>
                </div>
            </div>

            <div className="container-content py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center group shrink-0" aria-label="System Infra Solutions">
                        <ApplicationLogo variant="white" className="h-10" />
                    </Link>
                    <p className="text-sm leading-relaxed text-zinc-400">
                        System Infra Solutions Pvt. Ltd. (SISPL) is an ISO-certified engineering leader in telecom power automation, 
                        SYS-AXS NOC telemetry, 5G smart enclosures, and tactical wireless networks.
                    </p>
                    <div className="pt-2 flex items-center gap-3 text-zinc-400">
                        <div className="text-xs text-sky-400 font-mono">
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
                    title="Company"
                    links={[
                        { label: 'About SISPL & Factory', href: '/about-us' },
                        { label: 'Manufacturing Facilities (8,000 sq ft)', href: '/about-us' },
                        { label: 'Quality Accreditations (ISO)', href: '/about-us' },
                        { label: 'Operational Milestones', href: '/about-us' },
                        { label: 'Careers & Field Opportunities', href: '/careers' },
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
                                <a href="tel:+9101135004142" className="hover:text-sky-300 text-white transition-colors">
                                    +91-011-35004142 / 43 / 44 / 45
                                </a>
                                <br />
                                <a href="mailto:sales@sysinfra.in" className="hover:text-sky-300 text-zinc-300 transition-colors">
                                    sales@sysinfra.in
                                </a>
                            </div>
                            <div className="pt-1">
                                <span className="block text-zinc-400 uppercase text-[10px]">Helpline & Support:</span>
                                <a href="tel:+919899905475" className="hover:text-sky-300 text-white transition-colors">
                                    +91-9899905475 / +91-7668609810
                                </a>
                                <br />
                                <a href="mailto:hr@sysinfra.in" className="hover:text-sky-300 text-zinc-300 transition-colors">
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
                        <Link href={link.href} className="hover:text-sky-400 transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
