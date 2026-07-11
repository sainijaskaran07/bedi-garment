import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import bannerImg from '@/assets/banners/editorial_campaign_banner.jpg'

export const LuxuryEditorialBanner: React.FC = () => {
  return (
    <section
      className="relative w-full aspect-[21/9] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[750px] overflow-hidden bg-brand-text select-none flex items-end justify-center"
      aria-label="Luxury Campaign Editorial Banner"
    >
      {/* Background Image with Slow Zoom-In and Entry animation */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1.0, opacity: 0.95 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={bannerImg}
          alt="Bedi Garments Editorial Fashion Campaign Wall"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>

      {/* Cinematic dark gradients to blend into the site design and enhance text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Center overlay typography (positioned near the bottom with no text box) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pb-8 sm:pb-12 md:pb-16 lg:pb-20 flex flex-col items-center">
        {/* Subtle, elegant campaign label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.45em] text-white/80 uppercase mb-2 sm:mb-3"
        >
          NEW ARRIVALS 2026
        </motion.span>

        {/* Minimal editorial heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-[0.12em] text-white uppercase mb-6 sm:mb-8"
        >
          Discover the Collection
        </motion.h2>

        {/* Minimal elegant CTA with custom double underline animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/category/new-arrivals"
            className="group relative inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-heading font-extrabold tracking-[0.3em] text-white uppercase hover:text-brand-accent transition-colors duration-300 py-1"
          >
            <span>SHOP NOW</span>
            <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out font-mono font-bold">&rarr;</span>
            {/* Smooth visual link underline animation */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-100 group-hover:scale-x-0 group-hover:bg-brand-accent transition-transform duration-300 origin-left" />
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left delay-75" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default LuxuryEditorialBanner
