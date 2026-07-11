import React from 'react'
import { useShop } from '../../context'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingBag, Eye } from 'lucide-react'

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop()

  const handleMoveToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Move to cart with default options (first size/color)
    const defaultSize = product.sizes[0] || 'One Size'
    const defaultColor = product.colors[0] || { name: 'Default', hex: '#666666' }
    addToCart(product, defaultSize, defaultColor, 1)
    
    // Remove from wishlist
    toggleWishlist(product)
    
    alert(`Moved ${product.name} to Cart.`)
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Header Block */}
        <div className="border-b border-border-primary/50 pb-6 mb-10">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Saved Items
          </span>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight uppercase mt-2">
            My Wishlist
          </h1>
        </div>

        {wishlist.length > 0 ? (
          /* Grid of Saved Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map((prod) => (
              <div 
                key={prod.id} 
                className="group flex flex-col relative bg-white border border-border-primary/20 p-4 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300"
              >
                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-xl bg-bg-secondary aspect-[2/3] shadow-sm">
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWishlist(prod)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white text-brand-text hover:text-red-500 shadow-md transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={12} />
                  </button>

                  {/* Overlay Quick View Link */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <Link
                      to={`/product/${prod.slug}`}
                      className="px-4 py-2 bg-white text-brand-text text-[9px] font-heading font-extrabold tracking-widest uppercase rounded shadow pointer-events-auto flex items-center space-x-1.5 hover:bg-brand-accent hover:text-white transition-colors"
                    >
                      <Eye size={10} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-1 pl-1 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-heading font-extrabold tracking-wider text-brand-accent uppercase">
                      {prod.brand}
                    </span>
                    <h3 className="font-heading text-xs font-bold truncate mt-0.5">
                      <Link to={`/product/${prod.slug}`} className="hover:text-brand-accent transition-colors">
                        {prod.name}
                      </Link>
                    </h3>
                    <p className="font-heading text-xs font-semibold text-brand-accent mt-0.5">
                      ₹{prod.price}
                    </p>
                  </div>

                  {/* CTA Action Buttons */}
                  <div className="pt-4 mt-auto">
                    <button
                      onClick={(e) => handleMoveToCart(prod, e)}
                      className="w-full py-2 bg-brand-text text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors duration-300 flex items-center justify-center space-x-1.5 focus:outline-none"
                    >
                      <ShoppingBag size={10} />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-24 bg-bg-secondary/20 rounded-2xl border border-dashed border-border-primary max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center text-brand-text-muted mb-4">
              <Heart size={22} className="stroke-[1.8]" />
            </div>
            <h2 className="font-heading text-base font-extrabold text-brand-text uppercase tracking-widest">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-brand-text-muted max-w-xs mt-3 leading-relaxed font-medium">
              Save your favorite blazers, ethnic wear, and collection garments to track their availability.
            </p>
            <a
              href="/shop"
              className="mt-8 px-8 py-3.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded shadow-md hover:bg-brand-accent transition-all duration-300"
            >
              Start Exploring
            </a>
          </div>
        )}

      </div>
    </div>
  )
}

export default WishlistPage
