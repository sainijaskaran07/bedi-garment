import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Phone, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const BASE_MOBILE_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Men', href: '/men' },
  { name: 'Women', href: '/women' },
  { name: 'Kids', href: '/kids' },
  { name: 'Uniforms', href: '/uniforms' },
  { name: 'Party Wear', href: '/party-wear' },
  { name: 'Ethnic Wear', href: '/ethnic-wear' },
  { name: 'Sale', href: '/sale', isSale: true }
]

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    setIsOpen(false)
  }

  // Show Sign Up for logged-out visitors. Profile & Logout live in the navbar /
  // profile page, so they are intentionally kept out of the menu.
  const isLoggedIn = !!localStorage.getItem('bg_current_user')

  const menuLinks = [
    ...BASE_MOBILE_LINKS,
    ...(!isLoggedIn ? [{ name: 'Sign Up', href: '/profile?view=signup' }] : [])
  ]

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
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[99998]"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-full max-w-[300px] bg-white border-r border-border-primary z-[99999] flex flex-col h-[100dvh] shadow-2xl overflow-hidden"
            >
              {/* Drawer Header - Proper top padding to prevent touching top edge/notch */}
              <div className="flex items-center justify-between pt-12 pb-4 px-4 border-b border-border-primary/60 flex-shrink-0">
                <Logo />
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-full text-brand-text hover:text-brand-accent hover:bg-bg-secondary transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              {/* Search Inside Drawer Only */}
              <form onSubmit={handleSearchSubmit} className="p-4 border-b border-border-primary/40 bg-bg-secondary/40 flex-shrink-0">
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
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 p-0.5 rounded-full text-brand-text-muted/80 hover:bg-slate-200"
                    >
                      <X size={8} />
                    </button>
                  )}
                </div>
              </form>

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
                  {menuLinks.map((link) => {
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
                          onClick={() => setIsOpen(false)}
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
              <div className="p-4 bg-bg-secondary border-t border-border-primary/60 space-y-4 text-xs flex-shrink-0">
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
