import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const CAMPAIGN_IMAGES = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&h=900&q=80'
]

export const FeaturedCampaign: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-brand-text select-none flex items-center justify-center"
      aria-label="Autumn Campaign Image Slideshow"
    >
      {/* Background Images Crossfade Slideshow changing auto after 3 sec infinite */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIdx}
            src={CAMPAIGN_IMAGES[currentIdx]}
            alt="Autumn Campaign Slideshow"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* High-end vignette shade */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-text/45 via-transparent to-brand-text/60 pointer-events-none" />

      {/* Centered Editorial Text Overlay */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0 }}
          className="text-[9px] md:text-[10px] font-heading font-extrabold tracking-[0.35em] text-brand-accent uppercase mb-4"
        >
          Autumn Campaign
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight uppercase leading-none"
        >
          The Art of Tailoring
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs md:text-sm text-slate-300 font-body max-w-lg mt-6 leading-relaxed font-medium font-medium"
        >
          Celebrating premium threads, heritage structures, and modern fits. 
          Stitched with precision for school, corporate offices, and grand wedding events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/collections/editorial"
            className="inline-flex items-center space-x-2 text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase text-brand-accent hover:text-white transition-colors duration-300 border-b border-brand-accent pb-1 hover:border-white focus:outline-none"
          >
            <span>Explore Campaign</span>
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCampaign
