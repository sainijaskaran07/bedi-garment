import React, { useState } from 'react'
import { useShop } from '../../context'
import { useNavigate } from 'react-router-dom'
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, cartTotal } = useShop()
  const navigate = useNavigate()
  
  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoMessage('')
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a coupon code.')
      return
    }
    const code = promoCode.trim().toUpperCase()
    if (code === 'BEDINEW26') {
      setAppliedDiscount(Math.round(cartSubtotal * 0.15))
      setPromoMessage('Promo code BEDINEW26 (15% OFF) applied successfully!')
    } else if (code === 'WELCOME10') {
      setAppliedDiscount(Math.round(cartSubtotal * 0.10))
      setPromoMessage('Promo code WELCOME10 (10% OFF) applied successfully!')
    } else {
      setPromoMessage('Invalid coupon code. Please try again.')
      setAppliedDiscount(0)
    }
  }

  const finalTotal = Math.max(cartTotal - appliedDiscount, 0)

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const isLoggedIn = !!localStorage.getItem('bg_current_user')
    if (!isLoggedIn) {
      // Preserve intended destination so the user returns here after login
      localStorage.setItem('bg_redirect_after_login', '/cart')
      navigate('/profile')
      return
    }
    alert('Checkout feature is ready for backend integration! Payment gateway details (Razorpay/Stripe) are loaded from env variables.')
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Header Block */}
        <div className="border-b border-border-primary/50 pb-6 mb-10">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Your Selection
          </span>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight uppercase mt-2">
            Shopping Cart
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Cart Items List (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="flex flex-wrap sm:flex-nowrap items-center gap-4 gap-y-4 p-4 md:p-6 bg-bg-secondary/30 border border-border-primary/40 rounded-2xl group relative"
                >
                  {/* Thumbnail Image */}
                  <a 
                    href={`/product/${item.product.slug}`}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-bg-secondary border border-border-primary/30 flex-shrink-0"
                  >
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </a>

                  {/* Item Description */}
                  <div className="flex-1 min-w-0 basis-[calc(100%-6rem)] sm:basis-auto space-y-1">
                    <span className="text-[8px] font-heading font-extrabold tracking-wider text-brand-accent uppercase">
                      {item.product.brand}
                    </span>
                    <h3 className="font-heading text-xs md:text-sm font-bold truncate max-w-sm md:max-w-md">
                      <a href={`/product/${item.product.slug}`} className="hover:text-brand-accent transition-colors duration-200">
                        {item.product.name}
                      </a>
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-heading font-bold text-brand-text-muted">
                      <span className="uppercase">Size: {item.selectedSize}</span>
                      <span className="text-border-primary/80">|</span>
                      <div className="flex items-center space-x-1">
                        <span>Color:</span>
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                        <span className="capitalize">{item.selectedColor.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Config */}
                  <div className="flex items-center border border-border-primary/80 rounded bg-white">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                      className="p-2 text-brand-text-muted hover:text-brand-text"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="font-heading text-[11px] font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                      className="p-2 text-brand-text-muted hover:text-brand-text"
                      aria-label="Increase quantity"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  {/* Pricing Details */}
                  <div className="text-right pl-4">
                    <p className="font-heading text-xs md:text-sm font-extrabold text-brand-text">
                      ₹{item.product.price * item.quantity}
                    </p>
                    <p className="font-heading text-[9px] text-brand-text-muted font-semibold mt-0.5">
                      ₹{item.product.price} each
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                    className="absolute top-2 right-2 p-1.5 rounded-full text-brand-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Cart Summary Box (4 Columns) */}
            <div className="lg:col-span-4 bg-bg-secondary/40 p-6 md:p-8 rounded-2xl border border-border-primary/50 space-y-6">
              <h2 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
                Order Summary
              </h2>

              <div className="space-y-4 text-xs font-medium text-brand-text-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-text font-bold">₹{cartSubtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Free</span>
                </div>
                <div className="flex justify-between border-t border-border-primary/60 pt-4 text-sm">
                  <span className="text-brand-text font-extrabold uppercase tracking-wide">Total Estimate</span>
                  <span className="text-brand-accent font-extrabold text-base">₹{finalTotal}</span>
                </div>
              </div>

              {/* Coupon Form Input Block */}
              <form onSubmit={handleApplyPromo} className="border-t border-b border-border-primary/60 py-4 my-2 space-y-2">
                <label className="block text-[10px] font-heading font-extrabold tracking-wider text-brand-text uppercase">
                  Promo / Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. BEDINEW26)"
                    className="flex-1 h-9 px-3 text-xs font-heading font-medium tracking-wide bg-white text-brand-text placeholder-brand-text-muted/50 rounded border border-border-primary/80 focus:outline-none focus:border-brand-accent/60"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors duration-300 focus:outline-none cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[10px] font-semibold leading-tight ${appliedDiscount > 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {appliedDiscount > 0 ? '✓' : '⚠️'} {promoMessage}
                  </p>
                )}
              </form>

              {/* Checkout Form Action Button */}
              <form onSubmit={handleCheckout}>
                <button
                  type="submit"
                  className="w-full h-12 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded hover:bg-brand-accent transition-colors duration-300 flex items-center justify-center space-x-2 focus:outline-none"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={12} />
                </button>
              </form>

              {/* Extra Security Trust Badge */}
              <div className="text-center pt-2 text-[9px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
                🔒 Safe & Secure Checkout Guaranteed
              </div>
            </div>

          </div>
        ) : (
          /* Empty Cart State UI */
          <div className="text-center py-24 bg-bg-secondary/20 rounded-2xl border border-dashed border-border-primary max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center text-brand-text-muted mb-4">
              <ShoppingBag size={24} />
            </div>
            <h2 className="font-heading text-base font-extrabold text-brand-text uppercase tracking-widest">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-brand-text-muted max-w-xs mt-3 leading-relaxed font-medium">
              Explore our latest curated catalogs and school uniforms to find your perfect fit.
            </p>
            <a
              href="/shop"
              className="mt-8 px-8 py-3.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded shadow-md hover:bg-brand-accent transition-all duration-300"
            >
              Continue Shopping
            </a>
          </div>
        )}

      </div>
    </div>
  )
}

export default CartPage
