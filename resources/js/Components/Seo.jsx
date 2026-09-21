import { Head } from '@inertiajs/react';

export default function Seo({
    title,
    description,
    keywords,
    image,
    canonicalPath,
    breadcrumbs,
    product,
}) {
    const siteName = 'System Infra Solutions';
    const fullTitle = title?.includes(siteName) ? title : `${title} | ${siteName}`;
    const defaultDesc = 'System Infra Solutions (SISPL) — ISO-certified manufacturer of AMF power controllers, SYS-AXS NOC telemetry, 5G smart enclosures, and Motorola Solutions tactical radios across India.';
    const metaDesc = description || defaultDesc;
    const defaultKeywords = 'AMF controller India, telecom power automation, SYS-AXS NOC platform, 5G smart box, solar hybrid AMF, Motorola Solutions India, SISPL energy management, tower automation';
    const metaKeywords = keywords || defaultKeywords;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.sysinfra.in';
    const canonical = canonicalPath
        ? `${origin}${canonicalPath}`
        : typeof window !== 'undefined'
        ? window.location.href
        : 'https://www.sysinfra.in';

    const defaultImage = `${origin}/img/slider/1-1.jpg`;
    const ogImage = image ? (image.startsWith('http') ? image : `${origin}/${image}`) : defaultImage;

    // Generate JSON-LD Breadcrumbs if provided
    const breadcrumbsLd = breadcrumbs && breadcrumbs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': b.name,
            'item': b.url?.startsWith('http') ? b.url : `${origin}${b.url}`
        }))
    } : null;

    // Generate JSON-LD Product if provided
    const productLd = product ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': product.cover_image_path ? `${origin}/${product.cover_image_path}` : ogImage,
        'description': product.short_description || metaDesc,
        'sku': product.model_number || product.slug,
        'mpn': product.model_number || product.slug,
        'brand': {
            '@type': 'Brand',
            'name': product.name?.toLowerCase().includes('kenwood') ? 'Kenwood' : 
                    product.name?.toLowerCase().includes('diamond') ? 'Diamond' : 'System Infra'
        },
        'offers': {
            '@type': 'Offer',
            'url': canonical,
            'priceCurrency': 'INR',
            'availability': 'https://schema.org/InStock',
            'seller': {
                '@type': 'Organization',
                'name': 'System Infra Solutions Pvt. Ltd.'
            }
        }
    } : null;

    return (
        <Head title={title}>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKeywords} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:type" content={product ? 'product' : 'website'} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={ogImage} />

            {/* Dynamic Schema.org JSON-LD */}
            {breadcrumbsLd && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbsLd)}
                </script>
            )}
            {productLd && (
                <script type="application/ld+json">
                    {JSON.stringify(productLd)}
                </script>
            )}
        </Head>
    );
}
