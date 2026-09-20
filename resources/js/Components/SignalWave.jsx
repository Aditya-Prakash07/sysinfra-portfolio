/**
 * High-precision RF telemetry waveform evoking carrier wave propagation.
 * Deliberate, calibrated motion reflecting wireless communications.
 */
export default function SignalWave({ className = '' }) {
    return (
        <svg
            viewBox="0 0 1200 240"
            className={className}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="rf-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                    <stop offset="30%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="sub-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.05" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.05" />
                </linearGradient>
            </defs>

            {/* Sub-harmonic Secondary Carrier */}
            <path
                d="M0,120 C150,120 150,60 300,60 C450,60 450,180 600,180 C750,180 750,60 900,60 C1050,60 1050,120 1200,120"
                fill="none"
                stroke="url(#sub-gradient)"
                strokeWidth="1.5"
                opacity="0.5"
            />

            {/* Primary Modulated RF Waveform */}
            <path
                d="M0,120 C100,120 100,40 200,40 C300,40 300,200 400,200 C500,200 500,20 600,20 C700,20 700,220 800,220 C900,220 900,60 1000,60 C1100,60 1100,120 1200,120"
                fill="none"
                stroke="url(#rf-gradient)"
                strokeWidth="2.5"
                strokeDasharray="10 6"
                className="animate-signal-sweep"
            />

            {/* Base Reference Axis */}
            <line 
                x1="0" 
                y1="120" 
                x2="1200" 
                y2="120" 
                stroke="#26374C" 
                strokeWidth="1" 
                strokeDasharray="4 8" 
                opacity="0.5" 
            />
        </svg>
    );
}

