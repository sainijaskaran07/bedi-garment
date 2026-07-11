import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Phone, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { Link, useLocation } from 'react-router-dom'

const MOBILE_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Men', href: '/men' },
  { name: 'Women', href: '/women' },
  { name: 'Kids', href: '/kids' },
  { name: 'Uniforms', href: '/uniforms' },
  { name: 'Party Wear', href: '/party-wear' },
  { name: 'Ethnic Wear', href: '/ethnic-wear' },
  { name: 'Sale', href: '/sale', isSale: true }
]

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        onClick={handleToggle}
        className="p-2 -ml-2 text-brand-text hover:text-brand-accent transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
        aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
        aria-expanded={isOpen}
      >
        <Menu size={20} strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[999]"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-full max-w-[300px] bg-white border-r border-border-primary z-[1000] flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-border-primary/60">
                <Logo />
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-full text-brand-text hover:text-brand-accent hover:bg-bg-secondary transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              {/* Search Inside Drawer */}
              <div className="p-4 border-b border-border-primary/40 bg-bg-secondary/40">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clothing, uniforms..."
                    className="w-full h-8 pl-9 pr-8 text-xs font-heading font-medium tracking-wide bg-bg-secondary text-brand-text placeholder-brand-text-muted/50 rounded border border-border-primary/40 focus:outline-none focus:bg-white focus:border-brand-accent/60"
                  />
                  <Search size={12} className="absolute left-3 text-brand-text-muted/60" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 p-0.5 rounded-full text-brand-text-muted/80 hover:bg-slate-200"
                    >
                      <X size={8} />
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation Link List (Staggered Animation) */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <motion.ul
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.04 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {MOBILE_LINKS.map((link) => {
                    const isActive = location.pathname === link.href
                    return (
                      <motion.li
                        key={link.name}
                        variants={{
                          hidden: { opacity: 0, x: -15 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <Link
                          to={link.href}
                          onClick={handleToggle}
                          className={`block font-heading text-xs font-bold tracking-[0.2em] uppercase py-1 focus:outline-none transition-colors duration-200 ${
                            isActive 
                              ? 'text-brand-accent font-extrabold' 
                              : link.isSale 
                                ? 'text-red-600 hover:text-red-700' 
                                : 'text-brand-text hover:text-brand-accent'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </div>

              {/* Drawer Footer with Store Metadata */}
              <div className="p-4 bg-bg-secondary border-t border-border-primary/60 space-y-4 text-xs">
                <div className="flex items-start space-x-2">
                  <MapPin size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-extrabold tracking-wider text-brand-text uppercase text-[9px]">
                      Location
                    </p>
                    <p className="font-body text-[10px] text-brand-text-muted mt-0.5">
                      Anandpur Sahib, Punjab, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-extrabold tracking-wider text-brand-text uppercase text-[9px]">
                      Contact Us
                    </p>
                    <div className="space-y-0.5 mt-0.5 font-body text-[10px]">
                      <a href="tel:7466070001" className="block text-brand-text hover:text-brand-accent transition-colors">
                        +91 74660-70001
                      </a>
                      <a href="tel:7710160001" className="block text-brand-text hover:text-brand-accent transition-colors">
                        +91 77101-60001
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
