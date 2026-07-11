import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface CollectionCard {
  id: number
  name: string
  imageUrl: string
  href: string
}

const COLLECTIONS: CollectionCard[] = [
  {
    id: 1,
    name: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/men'
  },
  {
    id: 2,
    name: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/women'
  },
  {
    id: 3,
    name: 'Kids',
    imageUrl: 'https://images.unsplash.com/photo-1622295057295-654a9f992a54?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/kids'
  },
  {
    id: 4,
    name: 'Uniforms',
    imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/uniforms'
  },
  {
    id: 5,
    name: 'Party Wear',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80',
    href: '/party-wear'
  }
]

export const TrendingCollections: React.FC = () => {
  return (
    <section 
      className="w-full bg-bg-secondary py-10 md:py-14 border-b border-border-primary/50 select-none"
      aria-label="Trending Collections Grid"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Curated Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-brand-text mt-3">
            Trending Collections
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent mx-auto mt-4" />
        </div>

        {/* 5-Column High-End Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.id}
              to={col.href}
              className="relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] group flex flex-col cursor-pointer bg-white aspect-[2/3] focus:outline-none focus:ring-1 focus:ring-brand-accent/50"
            >
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                className="w-full h-full relative"
              >
                {/* Image Frame with zoom hover effect */}
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={col.imageUrl}
                    alt={`${col.name} Category`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
                    loading="lazy"
                  />
                  
                  {/* Elegant overlay screen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                  
                  {/* Bottom Center Text Overlay */}
                  <div className="absolute bottom-6 left-0 right-0 text-center px-4 flex flex-col items-center">
                    <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase mb-1">
                      Discover
                    </span>
                    <h3 className="font-heading text-sm md:text-base font-extrabold tracking-widest text-white uppercase group-hover:text-brand-accent transition-colors duration-300">
                      {col.name}
                    </h3>
                    <div className="w-6 h-[1.5px] bg-white mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export default TrendingCollections
