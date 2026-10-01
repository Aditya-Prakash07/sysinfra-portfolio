import React from 'react';
import { usePage } from '@inertiajs/react';

const resolveLogoUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/')) return path;
    if (path.startsWith('storage/')) return '/' + path;
    if (path.startsWith('img/')) return '/' + path;
    return `/storage/${path}`;
};

/**
 * ApplicationLogo
 * 
 * Uses custom uploaded logos from Admin Panel (SiteSettings) if available,
 * falling back to default brand SVG artwork:
 * - Light Mode: /storage/logo/system_infra_solutions_logo_exact.svg
 * - Dark Mode: /storage/logo/system_infra_solutions_logo_dark.svg
 * - Compact: /img/mobile-logo.png
 */
export default function ApplicationLogo({
    className = '',
    isOverBanner = false,
    theme = 'light',
    variant = 'auto', // 'auto' | 'light' | 'dark' | 'footer' | 'white' | 'color'
    compact = false,
    ...props
}) {
    const { props: pageProps } = usePage();
    const siteBranding = pageProps?.siteBranding || {};

    const isDark = 
        variant === 'dark' || 
        variant === 'white' || 
        variant === 'footer' || 
        (variant === 'auto' && theme === 'dark');

    const customLogo = isDark 
        ? resolveLogoUrl(siteBranding.logo_dark) 
        : resolveLogoUrl(siteBranding.logo_light);

    const defaultSrc = compact
        ? '/img/mobile-logo.png?v=2'
        : isDark
            ? '/img/system_infra_solutions_logo_dark.svg'
            : '/img/system_infra_solutions_logo_exact.svg';

    const src = (!compact && customLogo) ? customLogo : defaultSrc;

    return (
        <img
            src={src}
            alt={siteBranding.name || "System Infra Solutions Pvt. Ltd."}
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
