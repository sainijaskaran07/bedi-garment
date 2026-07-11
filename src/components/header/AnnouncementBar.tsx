import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const AnnouncementBar: React.FC = () => {
  const phoneNumbers = ['📞 74660-70001', '📞 77101-60001']
  const [phoneIndex, setPhoneIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhoneIndex((prev) => (prev + 1) % phoneNumbers.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [phoneNumbers.length])

  return (
    <div 
      className="h-10 bg-brand-text text-white text-[11px] font-heading px-4 md:px-8 flex items-center justify-between overflow-hidden select-none border-b border-brand-text-muted/15"
      role="complementary"
      aria-label="Announcements & Contact Info"
    >
      {/* Left: ੴ Entrepreneur */}
      <div className="flex items-center space-x-1.5 hover:text-brand-accent transition-colors duration-300">
        <span className="font-semibold text-brand-accent text-sm" aria-hidden="true">ੴ</span>
        <span className="tracking-[0.15em] uppercase font-semibold text-[10px] md:text-[11px]">
          Entrepreneur
        </span>
      </div>

      {/* Center: Worldwide Shipping */}
      <div className="hidden sm:flex items-center justify-center tracking-[0.15em] uppercase text-[10px] md:text-[11px] font-medium text-slate-200">
        Worldwide Shipping Available 🌍
      </div>

      {/* Right: Contact Numbers */}
      <div className="flex items-center text-[10px] md:text-[11px] tracking-[0.1em] font-medium justify-end">
        <span className="text-white/40 mr-1.5 uppercase hidden lg:inline">Support:</span>
        <div className="h-6 flex items-center justify-end relative w-28 md:w-32 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.a
              key={phoneIndex}
              href={`tel:${phoneNumbers[phoneIndex].replace(/[^0-9]/g, '')}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute right-0 text-brand-accent hover:underline focus:outline-none focus:ring-1 focus:ring-brand-accent/50 rounded px-1"
            >
              {phoneNumbers[phoneIndex]}
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
