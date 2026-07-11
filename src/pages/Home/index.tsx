import React from 'react'
import { useLenis } from '../../hooks'
import { Hero, FeaturedCampaign, EditorialCampaign, LuxuryEditorialBanner } from '../../components/hero'

import { CuratedCollections, KidsCollection, WomenCollection } from '../../components/category'
import { VideoStories, StoreLocations, ShippingMarquee, Testimonials } from '../../components/layout'
import { Newsletter } from '../../components/forms'
import { SEO } from '../../components/common'

export const Home: React.FC = () => {
  // Initialize Lenis smooth scroll for the editorial runway scroll experience
  useLenis()

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Bedi Garments",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=630&q=80",
    "@id": "https://bedigarments.com/#organization",
    "url": "https://bedigarments.com",
    "telephone": "+91-74660-70001",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Bazaar",
      "addressLocality": "Anandpur Sahib",
      "addressRegion": "Punjab",
      "postalCode": "140115",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.2333,
      "longitude": 76.5000
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  }

  return (
    <div className="w-full bg-white text-brand-text font-body antialiased selection:bg-brand-accent selection:text-white">
      <SEO 
        title="Bedi Garments | Premium Clothing & School Uniforms Punjab" 
        description="Discover luxury lifestyle clothing, Punjabi ethnic wear, and professional school/corporate uniforms at Bedi Garments. Serving Anandpur Sahib and worldwide customers since 1990."
        canonicalPath="/"
        schema={homepageSchema}
      />
      {/* 1. Full Screen Hero Banner */}
      <Hero />

      {/* Editorial Campaign Split Section */}
      <EditorialCampaign />

      {/* 2. Featured Campaign Video */}
      <FeaturedCampaign />

      {/* Curated Collections Showcase */}
      <CuratedCollections />


      {/* 8. Video Stories Horizontal Slider */}
      <VideoStories />

      {/* Campaign Brand Wall Banner */}
      <LuxuryEditorialBanner />

      {/* Premium Women Collection Section */}
      <WomenCollection />

      {/* Premium Kids Collection Section */}
      <KidsCollection />

      {/* Interactive Ticker: Punjabi Heritage & Worldwide Shipping */}
      <ShippingMarquee />

      {/* Premium Testimonials Section */}
      <Testimonials />

      {/* 10. Minimal Address & Stylized Map Grid */}
      <StoreLocations />

      {/* 11. Large Typography Newsletter Capture */}
      <Newsletter />
    </div>
  )
}

export default Home
