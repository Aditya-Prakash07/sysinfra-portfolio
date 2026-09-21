import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Seo from '@/Components/Seo';
import AnimatedHeading from '@/Components/AnimatedHeading';

export default function Careers({ openings = [], seo = {} }) {
    return (
        <MainLayout>
            <Seo
                title={seo?.title || 'Careers in Wireless & RF Engineering | System Infra Solutions'}
                description={seo?.description || "Join System Infra Solutions. Build the power automation and NOC telemetry infrastructure that keeps India's telecom towers, defence sites, and utilities running 24/7."}
                canonicalPath="/careers"
            />

            {/* Header */}
            <header className="relative bg-white dark:bg-[#000000] pt-36 pb-20 overflow-hidden transition-colors duration-300">
                <div className="container-content relative z-10">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider mb-4 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-beacon animate-pulse" />
                        <span>CAREERS &bull; FIELD ENGINEERING &bull; RF RESEARCH</span>
                    </div>

                    <div className="max-w-3xl">
                        <AnimatedHeading
                            as="h1"
                            immediate={true}
                            stagger={40}
                            highlightPhrase="Failure is Not an Option."
                            className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight"
                        >
                            Engineer Systems Where Failure is Not an Option.
                        </AnimatedHeading>
                        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                            Join our team of RF propagation specialists, embedded systems developers, and mission-critical network engineers building wireless networks for Parliament, Delhi Police, and India's vital infrastructure.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl text-xs font-mono">
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">PRIMARY LOCATION</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">NEW DELHI (HQ & LAB)</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">DOMAINS</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">AMF &bull; NOC &bull; 5G &bull; Defence</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">INITIATIVE</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">MAKE IN INDIA / ATMANIRBHAR</span>
                        </div>
                        <div>
                            <span className="text-slate-500 dark:text-slate-400 block">BENCH CULTURE</span>
                            <span className="text-slate-900 dark:text-white font-bold mt-1 block">HANDS-ON SPECTRUM WORK</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Why Sysinfra Pillars */}
            <section className="py-20 bg-slate-50 dark:bg-[#111111] transition-colors duration-300">
                <div className="container-content">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-beacon block mb-2">
                            ENGINEERING PHILOSOPHY
                        </span>
                        <AnimatedHeading 
                            as="h2" 
                            highlightPhrase="Career at Sysinfra?"
                            className="text-3xl font-display font-bold text-slate-900 dark:text-paper"
                        >
                            Why Build Your Career at Sysinfra?
                        </AnimatedHeading>
                        <p className="text-slate-600 dark:text-steel text-sm mt-3">
                            We design and deploy high-reliability hardware and RF systems that protect critical national infrastructure during emergencies.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card-symmetric p-8 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center font-mono font-bold text-xl mb-5">
                                    01
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    National Critical Infrastructure
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Experience direct deployment impact at landmark sites including the Parliament of India, Delhi Police tactical units, state emergency dispatchers, and metro networks.
                                </p>
                            </div>
                        </div>

                        <div className="card-symmetric p-8 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center font-mono font-bold text-xl mb-5">
                                    02
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    Indigenous R&D and Make in India
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Participate in the design of next-generation AMF controllers, SYS-AXS NOC platforms, and tactical Motorola Solutions radios — designed and manufactured in our Patparganj facility.
                                </p>
                            </div>
                        </div>

                        <div className="card-symmetric p-8 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-beacon/10 text-blue-600 dark:text-beacon flex items-center justify-center font-mono font-bold text-xl mb-5">
                                    03
                                </div>
                                <h3 className="font-display font-bold text-slate-900 dark:text-paper text-lg mb-3">
                                    Deep Spectrum Mastery
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-steel leading-relaxed">
                                    Work with spectrum analyzers, duplexer tuning benches, antenna modeling software, and carrier-grade Push-to-Talk over Cellular (PoC) cloud architectures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Openings Section */}
            <section className="py-20 bg-white dark:bg-[#000000] transition-colors duration-300">
                <div className="container-content max-w-4xl">
                    <div className="flex items-center justify-between mb-10 pb-2">
                        <div>
                            <span className="text-xs font-mono text-blue-600 dark:text-beacon uppercase tracking-wider font-bold block mb-1">
                                CAREER OPPORTUNITIES
                            </span>
                            <AnimatedHeading 
                                as="h2" 
                                highlightPhrase="Current Positions"
                                className="text-2xl font-display font-bold text-slate-900 dark:text-paper"
                            >
                                Current Positions
                            </AnimatedHeading>
                        </div>
                        <span className="badge-navy text-xs font-mono">
                            {openings.length} {openings.length === 1 ? 'Position' : 'Positions'} Open
                        </span>
                    </div>

                    {openings.length === 0 ? (
                        <div className="panel p-10 text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#000000] text-slate-600 dark:text-paper flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-paper">No Active Public Openings</h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-steel max-w-md mx-auto leading-relaxed">
                                We are always on the lookout for talented RF engineers, field technicians, and telecom sales leaders. Send your resume directly to our engineering desk.
                            </p>
                            <div className="mt-6">
                                <a
                                    href="mailto:info@sysinfra.in?subject=Job%20Application%20-%20Sysinfra%20Telesystems"
                                    className="btn-beacon !py-2.5 !px-6 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 font-bold"
                                >
                                    <span>Email Resume (info@sysinfra.in)</span>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {openings.map((job) => (
                                <div
                                    key={job.id}
                                    className="panel p-6 sm:p-8"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                {job.department && (
                                                    <span className="badge-rf text-xs font-mono">
                                                        {job.department}
                                                    </span>
                                                )}
                                                {job.employment_type && (
                                                    <span className="badge-steel text-xs font-mono">
                                                        {job.employment_type}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-display font-bold text-slate-900 dark:text-paper text-xl">
                                                {job.title}
                                            </h3>
                                            {job.location && (
                                                <p className="text-xs font-mono text-slate-500 dark:text-steel mt-1 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 text-blue-600 dark:text-beacon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{job.location}</span>
                                                </p>
                                            )}
                                        </div>

                                        <Link
                                            href={`/contact-us?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                                            className="shrink-0 btn-beacon !py-2.5 !px-5 text-xs font-mono uppercase tracking-wider font-bold text-center"
                                        >
                                            Apply for Role
                                        </Link>
                                    </div>

                                    {job.description && (
                                        <div
                                            className="mt-5 pt-5 border-t border-slate-100 dark:border-navy-border/40 text-sm text-slate-600 dark:text-steel leading-relaxed prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: job.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Spontaneous Application Card */}
                    <div className="mt-12 card-dual !bg-white dark:!bg-navy-surface p-8 border border-slate-200/80 dark:border-navy-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">Don't see your specific specialization?</h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel mt-1">
                                We regularly recruit RF circuit designers, FPGA developers, and defense liaison specialists.
                            </p>
                        </div>
                        <a
                            href="mailto:info@sysinfra.in?subject=Spontaneous%20Application%20-%20RF%20Engineering"
                            className="shrink-0 btn-beacon !py-2.5 !px-5 text-xs font-mono uppercase tracking-wider font-bold"
                        >
                            Drop CV to HR
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
