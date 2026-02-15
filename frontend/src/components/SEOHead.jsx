import { Helmet } from 'react-helmet-async';

export default function SEOHead({
    title = 'RecruitHub - Connect Top Talent with Leading Companies',
    description = 'RecruitHub is a modern recruitment platform connecting talented professionals with top companies. Find your dream job or hire exceptional talent today.',
    keywords = 'recruitment, jobs, hiring, talent, careers, employment, job search, recruiters',
    ogImage = '/og-image.png',
    canonical
}) {
    const fullTitle = title.includes('RecruitHub') ? title : `${title} | RecruitHub`;
    const currentUrl = canonical || window.location.href;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="RecruitHub" />

            {/* Mobile Optimization */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta name="theme-color" content="#4F46E5" />

            {/* Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Helmet>
    );
}
