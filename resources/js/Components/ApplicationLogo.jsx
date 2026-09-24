import React from 'react';

/**
 * ApplicationLogo — Authentic Original sysinfra.in Brand Logo
 * 
 * Uses the authentic high-quality SVG official System Infra Solutions artwork:
 * - Light Mode: /storage/logo/system_infra_solutions_logo_exact.svg (Original royal navy text + vibrant red 'S')
 * - Dark Mode: /storage/logo/system_infra_solutions_logo_dark.svg (Luminous light sky blue text and emblem + vibrant red 'S')
 * - Compact: /img/mobile-logo.png (Original circular emblem)
 */
export default function ApplicationLogo({
    className = '',
    isOverBanner = false,
    theme = 'light',
    variant = 'auto', // 'auto' | 'light' | 'dark' | 'footer' | 'white' | 'color'
    compact = false,
    ...props
}) {
    const isDark = 
        variant === 'dark' || 
        variant === 'white' || 
        variant === 'footer' || 
        (variant === 'auto' && theme === 'dark');

    const src = compact
        ? '/img/mobile-logo.png?v=2'
        : isDark
            ? '/img/system_infra_solutions_logo_dark.svg'
            : '/img/system_infra_solutions_logo_exact.svg';

    return (
        <img
            src={src}
            alt="System Infra Solutions Pvt. Ltd."
            draggable={false}
            className={`object-contain select-none shrink-0 ${className}`}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = isDark 
                    ? '/storage/logo/system_infra_solutions_logo_dark.svg' 
                    : '/storage/logo/system_infra_solutions_logo_exact.svg';
            }}
            {...props}
        />
    );
}
