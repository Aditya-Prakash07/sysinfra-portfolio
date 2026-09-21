/**
 * ApplicationLogo — Official sysinfra.in logo renderer
 *
 * Dark mode  → /img/logo.png with CSS brightness-0 invert (white)
 * Light mode → /img/logo.png as-is (coloured)
 * Over hero  → In dark mode: white logo; in light mode: coloured logo (always visible)
 * Footer     → /img/logo-footer.png (already white, footer is always dark)
 * compact    → /img/mobile-logo.png (93×93 square icon)
 *
 * The `isOverBanner` flag alone does NOT trigger white filter in light mode —
 * only dark mode gets the inverted white version so the logo stays visible.
 */
export default function ApplicationLogo({
    className = '',
    isOverBanner = false,
    theme = 'light',
    variant = 'auto',   // 'auto' | 'white' | 'dark' | 'footer' | 'color'
    compact = false,
    ...props
}) {
    const isFooter = variant === 'footer';

    // Only force white in explicitly dark contexts or actual dark mode.
    // NEVER invert in light mode — the hero background is white so the logo
    // would be invisible. When over the banner in light mode, keep the coloured logo.
    const applyWhiteFilter =
        !isFooter && (
            variant === 'white' ||
            variant === 'dark' ||
            (variant === 'auto' && theme === 'dark')
        );

    const src = isFooter
        ? '/img/logo-footer.png'
        : compact
            ? '/img/mobile-logo.png'
            : '/img/logo.png';

    return (
        <img
            src={src}
            alt="System Infra Solutions Pvt. Ltd."
            draggable={false}
            className={[
                'object-contain select-none shrink-0 w-auto',
                applyWhiteFilter ? 'brightness-0 invert' : '',
                className,
            ].filter(Boolean).join(' ')}
            {...props}
        />
    );
}
