import React from 'react'
import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'

interface GalleryItem {
  id: number
  imageUrl: string
  hoverImageUrl: string
  aspectClass: string
  tag: string
}

const ITEMS: GalleryItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80',
    aspectClass: 'md:row-span-2 aspect-[3/4] md:aspect-auto',
    tag: '#BediLuxe'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&h=500&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&h=500&q=80',
    aspectClass: 'aspect-[4/3.1]',
    tag: '#BediStories'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&h=500&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&h=500&q=80',
    aspectClass: 'aspect-[4/3.1]',
    tag: '#BediMan'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&h=800&q=80',
    aspectClass: 'md:row-span-2 aspect-[3/4] md:aspect-auto',
    tag: '#BediSartorial'
  }
]

export const LifestyleGallery: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-10 md:py-14 border-b border-border-primary/50 select-none"
      aria-label="Instagram Lifestyle Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase flex items-center justify-center space-x-1.5">
            <FaInstagram size={12} className="text-brand-accent" />
            <span>Lifestyle Gallery</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-brand-text mt-3">
            Sartorial Stories
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent mx-auto mt-4" />
        </div>

        {/* Asymmetrical Editorial Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[250px] md:auto-rows-[300px] lg:auto-rows-[340px]">
          {ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-2xl bg-bg-secondary group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)] ${item.aspectClass}`}
            >
              {/* Default Image */}
              <img
                src={item.imageUrl}
                alt={`Lifestyle post ${item.tag}`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover Image */}
              <img
                src={item.hoverImageUrl}
                alt={`Lifestyle post ${item.tag} hover`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle hover overlay with Instagram handle */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <div className="text-center text-white scale-95 group-hover:scale-100 transition-transform duration-300">
                  <FaInstagram size={20} className="mx-auto text-brand-accent" />
                  <span className="block mt-2 text-[10px] font-heading font-bold tracking-[0.2em] uppercase">
                    {item.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LifestyleGallery
