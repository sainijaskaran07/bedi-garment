import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image?: string
  type?: 'website' | 'product'
  canonicalPath?: string
  schema?: Record<string, any>
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=80',
  type = 'website',
  canonicalPath,
  schema
}) => {
  const siteUrl = 'https://bedigarments.com'
  const fullTitle = `${title} | Bedi Garments`
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : `${siteUrl}${window.location.pathname}`

  return (
    <Helmet>
      {/* Dynamic Document Title & Canonical */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Dynamic Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Bedi Garments" />

      {/* Dynamic Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Schema Insertion */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
