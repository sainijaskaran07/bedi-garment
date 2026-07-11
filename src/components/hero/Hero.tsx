import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const Hero: React.FC = () => {
  return (
    <section 
      className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-134px)] overflow-hidden bg-brand-text select-none flex items-center justify-center"
      aria-label="Fashion Campaign Hero Banner"
    >
      {/* Background Image Zooming in slowly on load */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 0.35 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1920&h=1080&q=90')`
        }}
      />

      {/* Subtle overlay vignette for a theatrical feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-text via-transparent to-brand-text/30" />

      {/* Content Center */}
      <div className="relative max-w-4xl mx-auto px-4 text-center text-white z-10 flex flex-col items-center">
        {/* Animated Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs font-heading font-extrabold tracking-[0.35em] text-brand-accent uppercase mb-4"
        >
          Bedi Garments &bull; Est. Punjab
        </motion.span>

        {/* Animated Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] max-w-3xl"
        >
          Premium clothing <br className="hidden sm:inline" />
          for every generation.
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-sm font-heading font-semibold tracking-[0.25em] text-slate-300 mt-6 uppercase flex flex-wrap justify-center gap-x-3 gap-y-1.5"
        >
          <span>Men</span> <span className="text-brand-accent font-normal">&bull;</span>
          <span>Women</span> <span className="text-brand-accent font-normal">&bull;</span>
          <span>Kids</span> <span className="text-brand-accent font-normal">&bull;</span>
          <span>Uniforms</span>
        </motion.p>

        {/* Animated CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-text text-[11px] font-heading font-extrabold tracking-[0.2em] uppercase rounded-sm border border-white hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 shadow-md text-center focus:outline-none"
          >
            Shop Collection
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white text-[11px] font-heading font-extrabold tracking-[0.2em] uppercase rounded-sm border border-white/40 hover:border-white hover:bg-white/5 transition-all duration-300 text-center focus:outline-none"
          >
            Explore
          </Link>
        </motion.div>
      </div>

      {/* Elegant scroll indicator badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[8px] font-heading font-bold tracking-[0.3em] text-white/50 uppercase mb-2">
          Scroll Down
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  )
}
export default Hero
