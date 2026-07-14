import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useShop } from '../../context'
import type { Product } from '../../types'
import { MOCK_PRODUCTS } from '../../data'

export interface ProductCardProps {
  id: string | number
  name: string
  badge: string
  description: string
  imageUrl: string
  price: string
  link: string
  /** When provided, the wishlist heart toggles the real global wishlist. */
  product?: Product
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  badge,
  description,
  imageUrl,
  price,
  link,
  product
}) => {
  const { toggleWishlist, isInWishlist } = useShop()
  const resolvedProduct = product || MOCK_PRODUCTS.find(p => p.id === String(id) || p.slug === String(id) || p.name === name)

  const [localFavorite, setLocalFavorite] = useState(false)
  const isFavorite = resolvedProduct ? isInWishlist(resolvedProduct.id) : localFavorite

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (resolvedProduct) {
      toggleWishlist(resolvedProduct)
    } else {
      setLocalFavorite(!localFavorite)
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      data-id={id}
      className="w-[calc((100%-16px)/1.3)] md:w-[calc((100%-32px)/2.3)] lg:w-full min-w-[calc((100%-16px)/1.3)] md:min-w-[calc((100%-32px)/2.3)] lg:min-w-0 snap-start flex-shrink-0 relative overflow-hidden rounded-[24px] border border-border-primary/40 bg-bg-secondary group cursor-pointer aspect-[2/3] shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-shadow duration-500 flex flex-col justify-end"
    >
      <Link to={link} className="absolute inset-0 z-0">
        {/* Background Image with Zoom hover effect */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
          }}
        />

        {/* Dark gradient overlay that fades in slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* Top corner discount tag */}
      {resolvedProduct?.discount && (
        <span className="absolute top-5 left-5 z-10 bg-red-600 text-white text-[8px] font-heading font-extrabold tracking-wider uppercase px-2 py-1 rounded-sm shadow-md">
          -{resolvedProduct.discount}
        </span>
      )}

      {/* Wishlist Icon Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-5 right-5 z-10 p-3 rounded-full bg-white/95 text-brand-text shadow-md hover:bg-brand-accent hover:text-white transition-all duration-300 focus:outline-none transform active:scale-90 group-hover:scale-105"
        aria-label={`Save ${name} to wishlist`}
      >
        <Heart 
          size={14} 
          className={`transition-all duration-300 ${isFavorite ? 'fill-current text-red-500 scale-110' : 'text-brand-text'}`} 
        />
      </button>

      {/* Overlaid Card Info Box */}
      {/* Information moves upward slightly on card hover */}
      <div className="relative z-10 p-6 sm:p-8 text-white space-y-3.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {/* Badge & Rating Row */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-sm">
            {badge}
          </span>
          {resolvedProduct?.rating && (
            <span className="text-[9px] font-heading font-extrabold text-brand-accent flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-sm">
              <span>★</span>
              <span>{resolvedProduct.rating}</span>
            </span>
          )}
        </div>

        {/* Title & Desc */}
        <div className="space-y-1">
          <h3 className="font-heading text-lg sm:text-xl font-extrabold tracking-wide uppercase leading-tight">
            {name}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-300 font-body leading-relaxed max-w-xs font-medium font-medium">
            {description}
          </p>
        </div>

        {/* Price & Explore CTA Row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-xs font-heading font-extrabold text-brand-accent">
            {price}
          </span>
          <Link
            to={link}
            className="inline-flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase text-white hover:text-brand-accent transition-colors duration-300 group/link"
          >
            <span>Explore</span>
            <ArrowRight size={10} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
export default ProductCard
