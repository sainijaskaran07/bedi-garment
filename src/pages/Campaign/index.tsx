import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

const CAMPAIGN_IMAGES = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&h=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&h=900&q=80'
]

export const CampaignPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-hidden bg-bg-secondary select-none text-brand-text font-body flex items-center justify-center">
      {/* Background Images Crossfade Slideshow changing auto after 3 sec infinite */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIdx}
            src={CAMPAIGN_IMAGES[currentIdx]}
            alt="Autumn Campaign Slideshow Background"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Elegant semi-transparent overlay card for premium contrast and readability */}
      <div className="relative z-10 text-center px-8 py-12 md:py-16 mx-4 max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white/50 flex flex-col items-center">
        
        {/* Back navigation button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-extrabold tracking-widest uppercase text-brand-text-muted hover:text-brand-accent transition-colors duration-200 focus:outline-none mb-6"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>

        <span className="text-[10px] md:text-[11px] font-heading font-extrabold tracking-[0.35em] text-brand-accent uppercase mb-3">
          Autumn Campaign
        </span>
        
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight uppercase leading-none text-brand-text">
          The Art of Tailoring
        </h1>

        <p className="text-xs md:text-sm text-brand-text-muted font-body leading-relaxed max-w-md mt-5 font-medium">
          Crafting premium silhouettes, structural lines, and custom fits for the modern generation. Our autumn campaign showcases hand-tailored uniforms, wedding suits, and premium linen wear stitched in Anandpur Sahib.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-7 py-3 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded border border-brand-text hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 shadow-md text-center focus:outline-none flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={12} />
            <span>Shop The Campaign</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-7 py-3 bg-transparent text-brand-text text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded border border-border-primary hover:bg-bg-secondary transition-all duration-300 text-center focus:outline-none"
          >
            Explore Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CampaignPage
