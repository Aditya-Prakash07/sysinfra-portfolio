import React from 'react';

/**
 * ApplicationLogo — Authentic Original sysinfra.in Brand Logo
 * 
 * Uses the authentic official System Infra Solutions artwork:
 * - Light Mode: /img/logo.png (Original navy/purple text + vibrant red 'S')
 * - Dark Mode: /img/logo-dark.png (Original artwork with bright white text + vibrant red 'S')
 * - Compact: /img/mobile-logo.png (Original circular emblem)
 * 
 * No CSS filters applied. 100% visible on light and dark backgrounds.
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
            ? '/img/logo-dark.png?v=2'
            : '/img/logo.png?v=2';

    return (
        <img
            src={src}
            alt="System Infra Solutions Pvt. Ltd."
            draggable={false}
            className={`object-contain select-none shrink-0 ${className}`}
            {...props}
        />
    );
}
