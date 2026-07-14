import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_PRODUCTS } from '../../data'
import { useShop } from '../../context'
import { Heart, Star, ShoppingBag, Plus, Minus, ArrowLeft, ChevronRight } from 'lucide-react'
import { SEO } from '../../components/common'
import { validatePincode, getDeliveryEstimate, DELIVERY_ZONES } from '../../utils'


export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, recentlyViewed } = useShop()

  // Find current product
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.slug === slug)
  }, [slug])

  // States
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'details' | 'shipping'>('details')
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' })
  const [pincode, setPincode] = useState('')
  const [pincodeError, setPincodeError] = useState('')
  const [pincodeResult, setPincodeResult] = useState('')

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault()
    setPincodeError('')
    setPincodeResult('')

    // Validate: numbers only, exactly 6 digits (rejects letters, symbols, spaces, emojis)
    const { valid, error } = validatePincode(pincode)
    if (!valid) {
      setPincodeError(error || 'Please enter a valid 6-digit pincode.')
      return
    }

    // Modular estimate (swappable for a backend serviceability/ETA API later)
    const estimate = getDeliveryEstimate(pincode)
    setPincodeResult(`📍 ${estimate.message}`)
  }

  // Triggered when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0])
      setSelectedSize(product.sizes[0] || '')
      setSelectedColor(product.colors[0] || null)
      setQuantity(1)
      addToRecentlyViewed(product)
    } else {
      // If product not found, redirect to 404
      navigate('/404')
    }
  }, [product, navigate, addToRecentlyViewed])

  // Get related products (same category, exclude current)
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  }, [product])

  // Get recently viewed (exclude current)
  const otherRecentlyViewed = useMemo(() => {
    if (!product) return []
    return recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4)
  }, [recentlyViewed, product])

  const productSchema = useMemo(() => {
    if (!product) return null
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.images,
      "description": product.description,
      "sku": `BG-${product.id}`,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "url": `https://bedigarments.com/product/${product.slug}`,
        "priceCurrency": "INR",
        "price": product.price,
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }
  }, [product])

  if (!product) return null

  const isFav = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (!selectedColor) return
    addToCart(product, selectedSize, selectedColor, quantity)
  }

  const handleCheckoutNow = () => {
    if (!selectedColor) return
    const isLoggedIn = !!localStorage.getItem('bg_current_user')
    if (!isLoggedIn) {
      // addToCart stores the pending item and redirects to login;
      // after successful login the user is returned to the cart.
      addToCart(product, selectedSize, selectedColor, quantity)
      return
    }
    addToCart(product, selectedSize, selectedColor, quantity)
    navigate('/cart')
  }

  // Hover Zoom effect math
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' })
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none font-body text-brand-text">
      {product && (
        <SEO
          title={product.name}
          description={`${product.description} - Shop premium clothing from ${product.brand} at Bedi Garments.`}
          image={product.images[0]}
          type="product"
          canonicalPath={`/product/${product.slug}`}
          schema={productSchema || undefined}
        />
      )}
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <a href={`/category/${product.category}`} className="hover:text-brand-accent">{product.category}</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold truncate max-w-[200px]">{product.name}</span>
        </div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase hover:text-brand-accent transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Main product configuration container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left: Product Images Gallery - 7 columns */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          {/* Large Primary Image Display */}
          <div 
            className="flex-1 relative overflow-hidden rounded-2xl bg-bg-secondary aspect-[3/4] shadow-[0_6px_25px_rgba(0,0,0,0.02)] border border-border-primary/30 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
              }}
            />
            {/* Hover Zoom overlay panel */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={zoomStyle}
            />
          </div>

          {/* Vertical Thumbnail Column */}
          <div className="flex md:flex-col gap-3 justify-center md:justify-start">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 rounded-xl overflow-hidden border bg-bg-secondary flex-shrink-0 transition-all ${
                  selectedImage === img 
                    ? 'border-brand-accent ring-2 ring-brand-accent/20' 
                    : 'border-border-primary hover:border-brand-text'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${index}`} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Purchase Config - 5 columns */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-start">
          <div>
            <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight leading-tight mt-1">
              {product.name}
            </h1>
            <p className="text-[10px] font-heading font-bold text-brand-text-muted tracking-wider uppercase mt-1">
              Collection: {product.collection}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 border-b border-border-primary/50 pb-4">
            <div className="flex items-center text-brand-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  className="stroke-[2.2]" 
                />
              ))}
            </div>
            <span className="text-[10px] font-heading font-bold tracking-wide text-brand-text-muted uppercase mt-0.5">
              {product.rating} / 5.0 &bull; {product.reviewCount} Reviews
            </span>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-heading font-extrabold text-brand-accent">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-heading font-medium text-brand-text-muted line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="inline-block text-[8px] font-heading font-extrabold tracking-wider bg-red-100 text-red-700 px-2 py-1 rounded-sm uppercase">
                Special Offer: Save {product.discount}
              </span>
            )}
          </div>

          {/* Colors selection */}
          {product.colors.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-[10px] font-heading font-extrabold tracking-wider text-brand-text uppercase">
                Color: {selectedColor?.name}
              </h3>
              <div className="flex items-center space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border border-border-primary/80 relative flex items-center justify-center p-0.5 transition-all ${
                      selectedColor?.name === c.name ? 'ring-2 ring-brand-accent ring-offset-2' : ''
                    }`}
                    title={c.name}
                  >
                    <span className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-heading font-extrabold tracking-wider text-brand-text uppercase">
                  Select Size
                </h3>
                <a href="/size-guide" className="text-[9px] font-heading font-extrabold tracking-widest text-brand-accent hover:underline uppercase">
                  Size Guide
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[38px] h-[38px] text-[10px] font-heading font-bold border rounded-sm flex items-center justify-center transition-all ${
                      selectedSize === sz
                        ? 'border-brand-text bg-brand-text text-white'
                        : 'border-border-primary text-brand-text-muted hover:border-brand-text'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Wishlist Link Row */}
          <div className="flex items-center space-x-4 pt-2">
            {/* Quantity */}
            <div className="flex items-center border border-border-primary/80 rounded-sm bg-bg-secondary/40">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-3 text-brand-text-muted hover:text-brand-text transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="font-heading text-xs font-bold w-8 text-center text-brand-text">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-3 text-brand-text-muted hover:text-brand-text transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Wishlist Button Toggle */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-sm border transition-all ${
                isFav
                  ? 'border-red-200 bg-red-50/50 text-red-500 hover:bg-red-100/50'
                  : 'border-border-primary/80 text-brand-text-muted hover:border-brand-text'
              }`}
              aria-label="Toggle Wishlist"
            >
              <Heart size={16} className={isFav ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Main Purchase CTA Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 h-12 border border-brand-text text-brand-text hover:bg-brand-text hover:text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 focus:outline-none"
            >
              <ShoppingBag size={14} />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>

            <button
              onClick={handleCheckoutNow}
              disabled={!product.inStock}
              className="flex-1 h-12 bg-[#111111] text-white hover:bg-brand-accent text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded transition-all duration-300 disabled:bg-slate-300 flex items-center justify-center space-x-2 focus:outline-none shadow-md"
            >
              <span>{product.inStock ? 'Buy It Now' : 'Out of Stock'}</span>
            </button>
          </div>

          {/* Description Tabs */}
          <div className="border-t border-border-primary/50 pt-6 space-y-4">
            <div className="flex space-x-4 border-b border-border-primary/30">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-[10px] font-heading font-extrabold tracking-wider uppercase border-b-2 transition-all ${
                  activeTab === 'details' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-text-muted'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 text-[10px] font-heading font-extrabold tracking-wider uppercase border-b-2 transition-all ${
                  activeTab === 'shipping' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-text-muted'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="font-body text-xs leading-relaxed text-brand-text-muted font-medium">
              {activeTab === 'details' ? (
                <p>{product.description}</p>
              ) : (
                <div className="space-y-4">
                  <p>
                    Free shipping on orders above ₹1,999. Stitched orders are shipped within 5-7 business days from our warehouse in Anandpur Sahib. Returns are accepted within 15 days in pristine condition.
                  </p>

                  {/* Estimated Delivery Timelines by region */}
                  <div className="border border-border-primary/60 rounded-xl overflow-hidden">
                    <div className="bg-bg-secondary/60 px-4 py-2.5 border-b border-border-primary/60">
                      <h4 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                        Estimated Delivery Timelines
                      </h4>
                    </div>
                    <ul className="divide-y divide-border-primary/40">
                      <li className="flex items-center justify-between gap-3 px-4 py-2.5">
                        <span className="font-medium text-brand-text">{DELIVERY_ZONES.north.zone}</span>
                        <span className="font-heading font-bold text-brand-text whitespace-nowrap">{DELIVERY_ZONES.north.days}</span>
                      </li>
                      <li className="flex items-center justify-between gap-3 px-4 py-2.5">
                        <span className="font-medium text-brand-text">{DELIVERY_ZONES.southWest.zone}</span>
                        <span className="font-heading font-bold text-brand-text whitespace-nowrap">{DELIVERY_ZONES.southWest.days}</span>
                      </li>
                      <li className="flex items-start justify-between gap-3 px-4 py-2.5">
                        <span className="font-medium text-brand-text">{DELIVERY_ZONES.international.zone}</span>
                        <span className="font-heading font-bold text-brand-text text-right">{DELIVERY_ZONES.international.days}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pincode Check Block */}
                  <div className="border border-border-primary/60 p-4 rounded-xl bg-bg-secondary/40 mt-4 space-y-3">
                    <h4 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                      Check Delivery by Pincode
                    </h4>
                    <form onSubmit={handlePincodeCheck} className="flex gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter Pincode (e.g. 140115)"
                        className="flex-1 min-w-0 h-9 px-3 text-xs font-heading font-medium tracking-wide bg-white text-brand-text placeholder-brand-text-muted/50 rounded border border-border-primary/80 focus:outline-none focus:border-brand-accent/60"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors duration-200 focus:outline-none cursor-pointer"
                      >
                        Check
                      </button>
                    </form>
                    {pincodeError && (
                      <p className="text-[10px] font-medium text-red-600 leading-tight">
                        ⚠️ {pincodeError}
                      </p>
                    )}
                    {pincodeResult && (
                      <p className="text-[10px] font-bold text-green-700 leading-tight">
                        {pincodeResult}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24 border-t border-border-primary/50 pt-16">
          <div className="mb-10 text-left">
            <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase">
              Curated For You
            </span>
            <h2 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight text-brand-text mt-1">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              const isF = isInWishlist(p.id)
              return (
                <a key={p.id} href={`/product/${p.slug}`} className="group flex flex-col relative">
                  <div className="relative overflow-hidden rounded-xl bg-bg-secondary aspect-[3/4] shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(p)
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white text-brand-text shadow-sm"
                    >
                      <Heart size={10} className={isF ? 'fill-current text-red-500' : ''} />
                    </button>
                  </div>
                  <div className="mt-3 text-xs">
                    <h3 className="font-heading font-bold text-brand-text group-hover:text-brand-accent transition-colors truncate">{p.name}</h3>
                    <p className="font-heading font-semibold text-brand-accent mt-0.5">₹{p.price}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* 5. Recently Viewed Section */}
      {otherRecentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 border-t border-border-primary/30 pt-16">
          <div className="mb-10 text-left">
            <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase">
              Your History
            </span>
            <h2 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight text-brand-text mt-1">
              Recently Viewed
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherRecentlyViewed.map((p) => (
              <a key={p.id} href={`/product/${p.slug}`} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-xl bg-bg-secondary aspect-[3/4]">
                  <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                    loading="lazy" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
                    }}
                  />
                </div>
                <div className="mt-3 text-xs">
                  <h3 className="font-heading font-bold text-brand-text group-hover:text-brand-accent transition-colors truncate">{p.name}</h3>
                  <p className="font-heading font-semibold text-brand-accent mt-0.5">₹{p.price}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductPage
