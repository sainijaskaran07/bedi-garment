import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

interface Store {
  id: number
  name: string
  city: string
  address: string
  phone: string
  imageUrl: string
  mapUrl: string
  hours: string
  slug: string
}

const STORES_DATA: Store[] = [
  {
    id: 1,
    name: "Gol Market Flagship",
    city: "Anandpur Sahib",
    address: "Main Bazaar, Gol Market, Anandpur Sahib, Punjab 140118",
    phone: "+91 74660-70001",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&h=1000&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Gol+Market+Anandpur+Sahib",
    hours: "Open Today 10:00 AM – 9:00 PM",
    slug: "gol-market-flagship"
  },
  {
    id: 2,
    name: "Agampur Chowk Outlet",
    city: "Anandpur Sahib",
    address: "Agampur Chowk, Bypass Road, Anandpur Sahib, Punjab 140118",
    phone: "+91 77101-60001",
    imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&h=1000&q=80",
    mapUrl: "https://maps.google.com/?q=Bedi+Garments+Agampur+Chowk+Anandpur+Sahib",
    hours: "Open Today 10:00 AM – 9:00 PM",
    slug: "agampur-chowk-outlet"
  }
]

export const StoreLocations: React.FC = () => {
  // GSAP-like Stagger Fade Up Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section 
      className="w-full bg-[#FAFAF8] py-20 md:py-28 select-none border-b border-border-primary/50 overflow-hidden"
      aria-label="Bedi Garments Store Locations"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-primary/50 pb-8 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase">
              OUR STORES
            </h2>
            <p className="text-xs sm:text-sm font-heading font-bold tracking-[0.3em] text-brand-accent uppercase mt-2">
              Visit Bedi Garments Across Punjab
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex-shrink-0">
            <Link
              to="/stores"
              className="group inline-flex items-center gap-2 text-sm md:text-base font-heading font-extrabold tracking-wider text-brand-text hover:text-brand-accent transition-colors duration-300 relative pb-1"
            >
              <span>VIEW ALL STORES</span>
              <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out font-mono font-bold">&rarr;</span>
              {/* Thin underline */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-text group-hover:bg-brand-accent transition-colors duration-300" />
            </Link>
          </div>
        </div>

        {/* ================= LAYOUT GRID ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {STORES_DATA.map((store) => (
            <motion.div
              key={store.id}
              variants={cardVariants}
              className="flex"
            >
              <Link
                to={`/store/${store.slug}`}
                className="group bg-white p-5 md:p-6 rounded-[24px] border border-border-primary/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between h-full max-w-[390px] mx-auto w-full cursor-pointer text-left"
              >
                {/* Card Top: Lifestyle/Store Image */}
                <div className="h-[280px] sm:h-[300px] w-full rounded-[16px] overflow-hidden mb-5 relative group/img">
                  <img
                    src={store.imageUrl}
                    alt={`${store.name} Showroom - ${store.city}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=1000&q=80";
                    }}
                  />
                </div>

                {/* Card Middle: Store details */}
                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Store Name & City */}
                    <div className="flex flex-col">
                      <span className="font-heading font-extrabold text-[26px] text-brand-text leading-tight uppercase tracking-tight">
                        {store.name}
                      </span>
                      <span className="font-heading font-bold text-lg text-brand-accent tracking-wide uppercase mt-1">
                        {store.city}
                      </span>
                    </div>

                    {/* Address */}
                    <p className="font-body text-sm text-brand-text-muted leading-relaxed mt-3">
                      {store.address}
                    </p>
                  </div>

                  {/* Phone Number */}
                  <a 
                    href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`} 
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block font-body text-[14px] text-[#A1A1AA] hover:underline hover:text-brand-text transition-colors duration-300 mt-2 w-max"
                  >
                    {store.phone}
                  </a>
                </div>

                {/* Card Bottom: Interaction Row */}
                <div className="flex items-center justify-between border-t border-border-primary/50 pt-4 mt-5">
                  {/* Get Directions Link */}
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex items-center gap-1 text-sm font-heading font-extrabold tracking-wide text-brand-text hover:text-brand-accent transition-colors duration-300"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight size={14} className="transform transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>

                  {/* Store Hours */}
                  <span className="text-[11px] font-heading font-bold text-[#71717A]">
                    {store.hours}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default StoreLocations
