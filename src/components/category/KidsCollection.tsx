import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '../cards'
import { MOCK_PRODUCTS } from '../../data'

// Import generated editorial assets
import ethnicBanner from '@/assets/banners/kids_ethnic_banner.jpg'
import partyBanner from '@/assets/banners/kids_party_banner.jpg'

interface Category {
  name: string
  description: string
  imageUrl: string
  link: string
}

// Curated Unsplash kid fashion URLs matching premium editorial aesthetics
const KIDS_CATEGORIES: Category[] = [
  {
    name: 'Everyday Wear',
    description: 'Everyday Comfort',
    imageUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/kids-cotton-floral-dress'
  },
  {
    name: 'Party Wear',
    description: 'Premium Kids Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/girls-floral-frock-dress'
  },
  {
    name: 'Ethnic Wear',
    description: 'Festive Styles for Kids',
    imageUrl: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/girls-floral-frock-dress'
  },
  {
    name: 'Winter Wear',
    description: 'Warm Winter Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1540815601364-77f05251a37c?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/premium-woolen-winter-trench-coat'
  },
  {
    name: 'School Uniforms',
    description: 'School Ready Collection',
    imageUrl: 'https://images.unsplash.com/photo-1603138461766-e5a9ee083161?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/kids-school-uniform-skirt-trouser'
  },
  {
    name: 'Baby Essentials',
    description: 'Comfortable Clothing for Every Age',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/kids-cotton-floral-dress'
  },
  {
    name: 'New Arrivals',
    description: 'Premium Kids Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/girls-floral-frock-dress'
  },
  {
    name: 'Accessories',
    description: 'Everyday Comfort',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&h=800&q=80',
    link: '/product/kids-cotton-floral-dress'
  }
]

export const KidsCollection: React.FC = () => {
  // Motion Animation Settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  return (
    <section 
      className="w-full bg-white select-none overflow-hidden" 
      aria-label="Kids Fashion Collection Section"
    >
      {/* ================= SECTION 01 — SHOP BY CATEGORY ================= */}
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Left-Aligned Header Block */}
        <div className="mb-10 md:mb-14">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase"
          >
            KIDS COLLECTION
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-heading font-bold tracking-[0.3em] text-brand-accent uppercase mt-2"
          >
            Explore Every Style
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
          {KIDS_CATEGORIES.map((cat, idx) => {
            const productSlug = cat.link.split('/').pop()
            const prod = MOCK_PRODUCTS.find((p) => p.slug === productSlug)
            return (
              <ProductCard
                key={idx}
                id={`kids-cat-${idx}`}
                name={cat.name}
                badge="KIDS"
                description={cat.description}
                imageUrl={cat.imageUrl}
                price="Starts ₹499"
                link={cat.link}
                product={prod}
              />
            )
          })}
        </motion.div>
      </div>

      {/* ================= SECTION 02 — FEATURED KIDS COLLECTIONS ================= */}
      <div className="w-full bg-bg-secondary py-12 md:py-16 border-t border-border-primary/50">
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
                  alt="Kids Ethnic Festive Collection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Warm beige / dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

              {/* Warm gold / beige aligned content */}
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
                  Celebrate Every Festival
                </p>

                <div className="pt-2">
                  <Link
                    to="/shop?category=kids&subcategory=ethnic"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.25em] text-brand-accent hover:text-white transition-colors duration-300 group/link"
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight size={12} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* RIGHT BANNER: PARTY COLLECTION */}
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
                  src={partyBanner}
                  alt="Kids Party Collection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Purple/Burgundy dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

              {/* Purple / lavender aligned content */}
              <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-end text-white z-10 space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.35em] text-[#D8B4FE] uppercase">
                    PARTY
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[0.08em] leading-tight text-white uppercase mt-1">
                    COLLECTION
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-body tracking-wide font-medium">
                  Made for Every Celebration
                </p>

                <div className="pt-2">
                  <Link
                    to="/shop?category=kids&subcategory=party"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.25em] text-[#D8B4FE] hover:text-white transition-colors duration-300 group/link"
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

export default KidsCollection
