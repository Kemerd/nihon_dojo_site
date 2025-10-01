import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Nihon Dojo - Master Japanese in 2 Years Guaranteed",
  description = "Japanese learning for adults who want results, not games. AI-powered sentence generation, FSRS spaced repetition, and formality switching. Two-year fluency guarantee or full refund. Available on iOS and Android.",
  keywords = "Japanese learning app, JLPT preparation, Japanese fluency, FSRS spaced repetition, AI Japanese tutor, learn Japanese, Japanese grammar, Japanese vocabulary, formality switching, keigo practice",
  image = "https://nihondojo.ai/site_preview.png",
  url = "https://nihondojo.ai"
}) => {
  // Construct the full title with branding
  const fullTitle = title.includes('Nihon Dojo') ? title : `${title} | Nihon Dojo`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 