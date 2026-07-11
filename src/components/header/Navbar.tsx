import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnnouncementBar } from './AnnouncementBar'
import { Logo } from './Logo'
import { SearchBar } from './SearchBar'
import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'
import { NavIcons } from './NavIcons'
import { useShop } from '../../context'

export const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [mobileQuery, setMobileQuery] = useState('')
  const { cartCount, wishlist } = useShop()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="contents">
      {/* Announcement Bar: Slides/fades away when scrolling down, reappears when at top */}
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={{ 
          height: isSticky ? 0 : 'auto', 
          opacity: isSticky ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden w-full relative z-[1000]"
      >
        <AnnouncementBar />
      </motion.div>

      {/* Top Navbar Row: Always sticky at the top-0 on all devices */}
      <div
        className={`w-full bg-white border-b border-border-primary/60 sticky top-0 z-[999] transition-all duration-300 ${
          isSticky 
            ? 'shadow-[0_4px_12px_rgba(0,0,0,0.03)] backdrop-blur-md bg-white/95' 
            : ''
        }`}
      >
        {/* Main Top Header Block */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between relative">
          {/* Mobile Hamburger menu */}
          <div className="flex items-center md:hidden">
            <MobileMenu />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex-1 md:flex md:justify-center">
            <Logo />
          </div>

          {/* Action Icons */}
          <div className="flex-1 flex justify-end">
            <NavIcons 
              onSearchToggle={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              cartItemCount={cartCount}
              wishlistItemCount={wishlist.length}
            />
          </div>
        </div>

        {/* Mobile Slide-down Search Input */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden w-full bg-white border-t border-border-primary/40 px-4 py-2.5 overflow-hidden"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  placeholder="Search shirts, suits, uniforms..."
                  className="w-full h-9 pl-9 pr-8 text-xs font-heading font-medium tracking-wide bg-bg-secondary text-brand-text placeholder-brand-text-muted/50 rounded border border-border-primary/20 focus:outline-none"
                  autoFocus
                />
                <Search size={14} className="absolute left-3 text-brand-text-muted/60" />
                {mobileQuery && (
                  <button
                    onClick={() => setMobileQuery('')}
                    className="absolute right-3 p-0.5 rounded-full text-brand-text-muted/85 hover:bg-slate-200"
                    aria-label="Clear mobile search"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navigation Links Row: Non-sticky (scrolls away naturally) */}
      <div className="hidden md:block w-full bg-white border-b border-border-primary/50 relative z-[998]">
        <DesktopMenu />
      </div>
    </header>
  )
}
