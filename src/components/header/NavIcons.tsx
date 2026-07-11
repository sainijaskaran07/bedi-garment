import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, User, ShoppingBag, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavIconsProps {
  onSearchToggle?: () => void
  cartItemCount?: number
  wishlistItemCount?: number
}

export const NavIcons: React.FC<NavIconsProps> = ({
  onSearchToggle,
  cartItemCount = 0,
  wishlistItemCount = 0
}) => {
  return (
    <div className="flex items-center space-x-1.5 md:space-x-2 text-brand-text select-none">
      {/* Mobile/Tablet Search Toggle (Visible below md) */}
      <button
        onClick={onSearchToggle}
        className="p-2 rounded-full hover:bg-bg-secondary transition-colors duration-300 md:hidden focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
        aria-label="Toggle mobile search"
      >
        <Search size={18} strokeWidth={2.2} />
      </button>

      {/* Account Icon (Desktop only) */}
      <Link
        to="/profile"
        className="p-2 rounded-full hover:bg-bg-secondary transition-colors duration-300 hidden md:inline-flex focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
        aria-label="Go to Profile"
      >
        <motion.div 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center"
        >
          <User size={18} strokeWidth={2.2} className="hover:text-brand-accent transition-colors duration-300" />
        </motion.div>
      </Link>

      {/* Wishlist Icon */}
      <Link
        to="/wishlist"
        className="p-2 rounded-full hover:bg-bg-secondary transition-colors duration-300 relative focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
        aria-label={`View Wishlist with ${wishlistItemCount} items`}
      >
        <motion.div 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center"
        >
          <Heart size={18} strokeWidth={2.2} className="hover:text-brand-accent transition-colors duration-300" />
        </motion.div>
        
        {wishlistItemCount > 0 && (
          <span 
            className="absolute top-1 right-1 min-w-[14px] h-[14px] px-1 flex items-center justify-center rounded-full bg-brand-accent text-[8px] font-heading font-extrabold text-white leading-none shadow-sm"
            aria-hidden="true"
          >
            {wishlistItemCount}
          </span>
        )}
      </Link>

      {/* Cart Icon */}
      <Link
        to="/cart"
        className="p-2 rounded-full hover:bg-bg-secondary transition-colors duration-300 relative focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
        aria-label={`View Cart with ${cartItemCount} items`}
      >
        <motion.div 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center"
        >
          <ShoppingBag size={18} strokeWidth={2.2} className="hover:text-brand-accent transition-colors duration-300" />
        </motion.div>
        
        {cartItemCount > 0 && (
          <span 
            className="absolute top-1 right-1 min-w-[14px] h-[14px] px-1 flex items-center justify-center rounded-full bg-brand-text text-[8px] font-heading font-extrabold text-white leading-none shadow-sm"
            aria-hidden="true"
          >
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  )
}
