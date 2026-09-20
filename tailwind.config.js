import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                // Pure Black shades for Dark Mode as requested
                navy: {
                    dark: '#000000',    // true pure black
                    DEFAULT: '#050505', // jet black
                    surface: '#0d0d0d', // dark charcoal surface
                    light: '#141414',   // elevated black card
                    border: '#222222',  // subtle hairline border
                },
                paper: '#F8FAFC',       // clean bright corporate light bg
                ink: '#0F172A',         // primary text
                steel: {
                    DEFAULT: '#64748B',
                    light: '#94A3B8',
                    dark: '#334155',
                },
                beacon: {
                    light: '#7dd3fc',
                    DEFAULT: '#0284c7', // sysinfra telecom cyan/blue
                    royal: '#0369a1',
                    electric: '#38bdf8',
                    dim: '#075985',
                    glow: 'rgba(2, 132, 199, 0.25)',
                },
            },
            fontFamily: {
                display: ['"CleanAmpersand"', '"Space Grotesk"', ...defaultTheme.fontFamily.sans],
                sans: ['"IBM Plex Sans"', ...defaultTheme.fontFamily.sans],
                mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
            },
            maxWidth: {
                content: '1240px',
            },
            animation: {
                'signal-sweep': 'signal-sweep 3.2s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'radar-spin': 'spin 8s linear infinite',
            },
            keyframes: {
                'signal-sweep': {
                    '0%, 100%': { strokeDashoffset: '0' },
                    '50%': { strokeDashoffset: '120' },
                },
            },
        },
    },

    plugins: [],
};
