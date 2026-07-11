import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ShowcaseItem {
  id: number
  category: string
  collection: string
  imageUrl: string
  href: string
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 1,
    category: 'Men',
    collection: 'Summer Collection',
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/men'
  },
  {
    id: 2,
    category: 'Women',
    collection: 'Luxe Linen Series',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/women'
  },
  {
    id: 3,
    category: 'Kids Wear',
    collection: 'Playtime Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1622295057295-654a9f992a54?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/kids'
  },
  {
    id: 4,
    category: 'Uniforms',
    collection: 'School Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/uniforms'
  },
  {
    id: 5,
    category: 'Party Wear',
    collection: 'Evening Elegance',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/party-wear'
  },
  {
    id: 6,
    category: 'Ethnic Wear',
    collection: 'Festive Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/ethnic-wear'
  },
  {
    id: 7,
    category: 'Casual Wear',
    collection: 'Urban Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/shop'
  }
]

// Duplicate items for a perfect infinite CSS marquee loop
const DOUBLE_ITEMS = [...SHOWCASE_ITEMS, ...SHOWCASE_ITEMS]

export const InfiniteFashionShowcase: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-10 md:py-14 border-b border-border-primary/50 overflow-hidden select-none"
      aria-label="Infinite Fashion Showcase"
    >
      {/* Title Header */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-16 md:mb-20 text-center">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
          Runway Showcase
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
          Infinite Fashion Showcase
        </h2>
        <div className="w-12 h-[1px] bg-brand-accent mx-auto mt-4" />
      </div>

      {/* Full Width Marquee Slider */}
      <div className="w-full overflow-hidden py-4 relative">
        {/* Soft edge gradients for a premium depth look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Sliding Track (Animate using CSS class + hardware acceleration) */}
        <div className="animate-marquee-track gap-8 md:gap-12 px-4 md:px-8">
          {DOUBLE_ITEMS.map((item, index) => (
            <Link 
              key={`${item.id}-${index}`}
              to={item.href}
              className="w-[280px] sm:w-[340px] md:w-[400px] flex-shrink-0 group block"
            >
              {/* Image Frame */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition-all duration-300 bg-bg-secondary aspect-[2/3]"
              >
                <img
                  src={item.imageUrl}
                  alt={`${item.category} - ${item.collection}`}
                  className="w-full h-full object-cover transition-all duration-500 ease-out hover:scale-103 hover:brightness-105"
                  loading="lazy"
                />
              </motion.div>

              {/* Text Metadata */}
              <div className="mt-5 pl-1 text-left">
                <span className="font-heading text-[10px] md:text-[11px] font-extrabold tracking-[0.2em] text-brand-accent uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-base md:text-lg font-extrabold text-brand-text mt-1 transition-colors duration-300 group-hover:text-brand-accent">
                  {item.collection}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfiniteFashionShowcase
