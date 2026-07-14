import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '../cards'
import { MOCK_PRODUCTS } from '../../data'

// Import generated editorial assets
import ethnicBanner from '@/assets/banners/women_ethnic_banner.jpg'
import modernBanner from '@/assets/banners/women_modern_banner.jpg'

interface Category {
  name: string
  description: string
  imageUrl: string
  link: string
}

// Curated Unsplash women fashion URLs matching premium editorial aesthetics
const WOMEN_CATEGORIES: Category[] = [
  {
    name: 'New Arrivals',
    description: 'Dresses, Tops & Everyday Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/royal-silk-anarkali-suit-set'
  },
  {
    name: 'Western Wear',
    description: 'Modern Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/handblock-print-kurti'
  },
  {
    name: 'Ethnic Wear',
    description: 'Elegant Indian Wear',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/heritage-banarasi-silk-saree'
  },
  {
    name: 'Party Wear',
    description: 'Premium Party Collection',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/elegant-silk-party-gown'
  },
  {
    name: 'Dresses',
    description: 'Dresses, Tops & Everyday Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/royal-silk-anarkali-suit-set'
  },
  {
    name: 'Co-ord Sets',
    description: 'Modern Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/royal-silk-anarkali-suit-set'
  },
  {
    name: 'Office Wear',
    description: 'Office Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/traditional-punjabi-salwar-kameez'
  },
  {
    name: 'Winter Collection',
    description: 'Premium Party Collection',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/premium-wool-trench-coat'
  }
]

export const WomenCollection: React.FC = () => {
  // Staggered Fade Up animation variants (mimicking GSAP viewport triggers)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }
  return (
    <section 
      className="w-full bg-[#FAFAF8] select-none overflow-hidden" 
      aria-label="Women Fashion Collection Section"
    >
      {/* ================= SECTION 01 — SHOP BY CATEGORY ================= */}
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Left-Aligned Header Block with generous spacing */}
        <div className="mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase"
          >
            WOMEN COLLECTION
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-heading font-bold tracking-[0.3em] text-brand-accent uppercase mt-2"
          >
            Modern Styles for Every Occasion
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="flex lg:grid overflow-x-auto lg:overflow-x-visible overflow-y-hidden snap-x snap-mandatory lg:snap-none gap-4 md:gap-8 pb-6 lg:pb-0 scrollbar-none lg:grid-cols-4 w-full after:content-[''] after:w-4 md:after:w-8 after:flex-shrink-0"
        >
          {WOMEN_CATEGORIES.map((cat, idx) => {
            const productSlug = cat.link.split('/').pop()
            const prod = MOCK_PRODUCTS.find((p) => p.slug === productSlug)
            return (
              <ProductCard
                key={idx}
                id={`women-cat-${idx}`}
                name={cat.name}
                badge="WOMEN"
                description={cat.description}
                imageUrl={cat.imageUrl}
                price="Starts ₹999"
                link={cat.link}
                product={prod}
              />
            )
          })}
        </motion.div>
      </div>

      {/* ================= SECTION 02 — FEATURED WOMEN COLLECTIONS ================= */}
      <div className="w-full bg-white py-12 md:py-16 border-t border-border-primary/50">
        <div className="max-w-[1550px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            
            {/* LEFT BANNER: ETHNIC COLLECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-[20px] md:rounded-[24px] bg-brand-text group cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              {/* Background Image with Zoom animation */}
              <motion.div 
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={ethnicBanner}
                  alt="Women Ethnic Collection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Luxury Palette Overlay: Ivory, champagne, gold, beige, maroon */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1414]/90 via-black/25 to-black/10 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

              {/* Editorial Left-Aligned Content */}
              <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-end text-white z-10 space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.35em] text-brand-accent uppercase">
                    ETHNIC
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[0.08em] leading-tight text-white uppercase mt-1">
                    COLLECTION
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-body tracking-wide font-medium">
                  Elegance Woven Into Every Thread
                </p>

                <div className="pt-2">
                  <Link
                    to="/shop?category=women&subcategory=ethnic"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.25em] text-brand-accent hover:text-white transition-colors duration-300 group/link"
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight size={12} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* RIGHT BANNER: MODERN COLLECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-[20px] md:rounded-[24px] bg-brand-text group cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              {/* Background Image with Zoom animation */}
              <motion.div 
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={modernBanner}
                  alt="Women Modern Collection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Minimal Palette Overlay: Black, charcoal, cream, taupe, camel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1D]/95 via-black/25 to-black/10 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

              {/* Editorial Left-Aligned Content */}
              <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-end text-white z-10 space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.35em] text-slate-300 uppercase">
                    MODERN
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[0.08em] leading-tight text-white uppercase mt-1">
                    COLLECTION
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-body tracking-wide font-medium">
                  Designed for Everyday Confidence
                </p>

                <div className="pt-2">
                  <Link
                    to="/shop?category=women&subcategory=modern"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.25em] text-slate-200 hover:text-brand-accent transition-colors duration-300 group/link"
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight size={12} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default WomenCollection
