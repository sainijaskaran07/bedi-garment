import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MOCK_PRODUCTS } from '../../data'
import { useShop } from '../../context'

export const FeaturedProducts: React.FC = () => {
  const { toggleWishlist, isInWishlist } = useShop()

  // Select 3 representative products to show on the landing page in a very large format
  const featuredList = MOCK_PRODUCTS.slice(0, 3)

  return (
    <section 
      className="w-full bg-white py-10 md:py-14 border-b border-border-primary/50 select-none"
      aria-label="Featured Products Collection"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Runway Essentials
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Featured Products
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent mx-auto mt-4" />
        </div>

        {/* Product Cards Grid - 3 Columns for larger card sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {featuredList.map((prod, idx) => {
            const isLiked = isInWishlist(prod.id)

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                className="group flex flex-col relative"
              >
                {/* Image Frame with taller aspect-[2/3] ratio */}
                <div className="relative overflow-hidden rounded-2xl bg-bg-secondary aspect-[2/3] shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-border-primary/20">
                  {/* Link wrapper around the image for smooth SPA transitions */}
                  <Link to={`/product/${prod.slug}`} className="absolute inset-0">
                    {/* Front Image */}
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                      loading="lazy"
                    />
                    {/* Alternate/Back Image (visible on hover) */}
                    {prod.images[1] && (
                      <img
                        src={prod.images[1]}
                        alt={`${prod.name} alternative`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 scale-102 group-hover:scale-100"
                        loading="lazy"
                      />
                    )}
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleWishlist(prod)
                    }}
                    className="absolute top-5 right-5 p-3 rounded-full bg-white text-brand-text shadow-md hover:bg-brand-accent hover:text-white transition-all duration-300 focus:outline-none"
                    aria-label="Add to Wishlist"
                  >
                    <Heart 
                      size={16} 
                      className={`transition-transform duration-300 ${isLiked ? 'fill-current scale-110 text-red-500' : 'text-brand-text'}`} 
                    />
                  </button>

                  {/* Quick View Link overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/60 to-transparent">
                    <Link
                      to={`/product/${prod.slug}`}
                      className="w-full h-11 bg-white text-brand-text text-[10px] font-heading font-extrabold tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 rounded shadow-md flex items-center justify-center focus:outline-none"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                {/* Product Info Block */}
                <div className="mt-5 pl-1 space-y-1">
                  <span className="text-[10px] font-heading font-bold tracking-wider text-brand-text-muted uppercase">
                    {prod.subcategory} &bull; {prod.brand}
                  </span>
                  <h3 className="font-heading text-sm md:text-base font-extrabold text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-300 truncate">
                    <Link to={`/product/${prod.slug}`}>
                      {prod.name}
                    </Link>
                  </h3>
                  <p className="font-heading text-sm md:text-base font-semibold text-brand-accent mt-0.5">
                    ₹{prod.price}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default FeaturedProducts
