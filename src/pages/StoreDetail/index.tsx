import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MapPin, Clock, Compass, ChevronRight } from 'lucide-react'
import { SEO } from '../../components/common'

interface StoreDetailData {
  name: string
  city: string
  slug: string
  address: string
  phone: string
  phoneUrl: string
  imageUrl: string
  mapUrl: string
  hours: { days: string; time: string }[]
  landmark: string
  gallery: string[]
}

const STORES_DETAILS: Record<string, StoreDetailData> = {
  "gol-market-flagship": {
    name: "BEDI GARMENTS",
    city: "Gol Market Flagship",
    slug: "gol-market-flagship",
    address: "Main Bazaar, Gol Market, Anandpur Sahib, Punjab 140118",
    phone: "+91 74660-70001",
    phoneUrl: "+917466070001",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&h=600&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Gol+Market+Anandpur+Sahib",
    hours: [
      { days: "Monday - Saturday", time: "10:00 AM – 9:00 PM" },
      { days: "Sunday", time: "Closed / On Appointment" }
    ],
    landmark: "Opposite Gurudwara Sis Ganj Sahib Road",
    gallery: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&h=800&q=80"
    ]
  },
  "agampur-chowk-outlet": {
    name: "BEDI GARMENTS",
    city: "Agampur Chowk Outlet",
    slug: "agampur-chowk-outlet",
    address: "Agampur Chowk, Bypass Road, Anandpur Sahib, Punjab 140118",
    phone: "+91 77101-60001",
    phoneUrl: "+917710160001",
    imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=1200&h=600&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Agampur+Chowk+Anandpur+Sahib",
    hours: [
      { days: "Monday - Saturday", time: "10:00 AM – 9:00 PM" },
      { days: "Sunday", time: "Closed" }
    ],
    landmark: "Near Agampur Bypass Chowk",
    gallery: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&h=800&q=80"
    ]
  },
  "nangal-showroom": {
    name: "BEDI GARMENTS",
    city: "Nangal Showroom",
    slug: "nangal-showroom",
    address: "Railway Road, Near Nangal Dam, Nangal, Punjab 140124",
    phone: "+91 98765 43211",
    phoneUrl: "+919876543211",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&h=600&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Railway+Road+Nangal",
    hours: [
      { days: "Monday - Saturday", time: "10:00 AM – 9:00 PM" },
      { days: "Sunday", time: "Closed" }
    ],
    landmark: "Near Nangal Railway Station & Nangal Dam",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&h=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&h=800&q=80"
    ]
  }
}

export const StoreDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const store = useMemo(() => {
    if (!slug) return null
    return STORES_DETAILS[slug.toLowerCase()] || null
  }, [slug])

  if (!store) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4">
        <span className="text-4xl">📍</span>
        <h1 className="text-lg font-heading font-extrabold uppercase tracking-widest text-brand-text mt-4">
          Store Location Not Found
        </h1>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-2.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors"
        >
          Return to Home
        </button>
      </div>
    )
  }

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": `Bedi Garments - ${store.city}`,
    "image": store.imageUrl,
    "url": `https://bedigarments.com/store/${store.slug}`,
    "telephone": store.phone,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": store.address.split(',')[0],
      "addressLocality": store.city,
      "addressRegion": "Punjab",
      "addressCountry": "IN"
    }
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title={`${store.name} Showroom - ${store.city}, Punjab`}
        description={`Visit Bedi Garments showroom in ${store.city}, Punjab. Get addresses, contact numbers, map directions, landmarks, and showroom hours.`}
        canonicalPath={`/store/${store.slug}`}
        schema={storeSchema}
      />

      {/* Breadcrumbs Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <a href="/" className="hover:text-brand-accent">Our Stores</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">{store.city} Showroom</span>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase hover:text-brand-accent transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Editorial Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="h-[280px] sm:h-[350px] md:h-[450px] w-full rounded-[24px] overflow-hidden relative shadow-sm">
          <img 
            src={store.imageUrl} 
            alt={`${store.name} Showroom ${store.city}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
            <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-sm">
              Showroom Directory
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mt-3 uppercase">
              {store.name} — {store.city}
            </h1>
          </div>
        </div>
      </div>

      {/* Store Information Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Details (7 Columns) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Section: Showroom Overview */}
          <div className="space-y-4">
            <h2 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
              Showroom Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address info block */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-accent">
                  <MapPin size={14} />
                  <span className="text-[10px] font-heading font-extrabold tracking-wider uppercase">Location Address</span>
                </div>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-medium">
                  {store.address}
                </p>
              </div>

              {/* Landmark */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-accent">
                  <Compass size={14} />
                  <span className="text-[10px] font-heading font-extrabold tracking-wider uppercase">Nearby Landmark</span>
                </div>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-medium">
                  {store.landmark}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Showroom Hours & Contacts */}
          <div className="space-y-4">
            <h2 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
              Contact & Working Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hours */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-brand-accent">
                  <Clock size={14} />
                  <span className="text-[10px] font-heading font-extrabold tracking-wider uppercase">Open Hours</span>
                </div>
                <div className="space-y-2 text-xs font-medium text-brand-text-muted">
                  {store.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-border-primary/30 pb-1.5">
                      <span>{h.days}</span>
                      <span className="text-brand-text font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-brand-accent">
                  <Phone size={14} />
                  <span className="text-[10px] font-heading font-extrabold tracking-wider uppercase">Phone Contacts</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-brand-text-muted font-medium">
                    Call our {store.city} representative for customized school uniforms or sizing reservations:
                  </p>
                  <a 
                    href={`tel:${store.phoneUrl}`}
                    className="inline-flex items-center space-x-2 text-xs font-heading font-bold text-brand-text hover:text-brand-accent transition-colors border border-border-primary px-4 py-2 rounded-sm"
                  >
                    <Phone size={12} />
                    <span>{store.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Google Maps (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border-primary/80 rounded-[20px] p-6 bg-[#FAFAF8] space-y-4">
            <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase pb-2">
              Route Planner
            </h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Find the fastest path to our {store.city} store location using Google Maps routing details.
            </p>
            <a 
              href={store.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full h-12 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded hover:bg-brand-accent transition-colors duration-300 flex items-center justify-center space-x-2 focus:outline-none"
            >
              <Compass size={14} />
              <span>Get Maps Directions</span>
            </a>
          </div>
        </div>

      </div>

      {/* Showroom Editorial Gallery */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20 border-t border-border-primary/30 pt-16">
        <div className="mb-10 text-left">
          <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase">
            Showcase
          </span>
          <h2 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight text-brand-text mt-1">
            Showroom Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {store.gallery.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl aspect-[4/3] bg-bg-secondary border border-border-primary/30">
              <img 
                src={img} 
                alt={`${store.name} Showroom Interior ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default StoreDetailPage
