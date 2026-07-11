import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { MOCK_PRODUCTS } from '../../data'

import { useShop } from '../../context'
import { Heart, SlidersHorizontal, ChevronRight, X } from 'lucide-react'
import { SEO } from '../../components/common'

interface CategoryProps {
  category?: string
}

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col relative w-full animate-pulse select-none">
      {/* Image Block placeholder */}
      <div className="relative overflow-hidden rounded-2xl bg-bg-secondary aspect-[2/3] border border-border-primary/20 bg-slate-200/50" />
      {/* Info details placeholder */}
      <div className="mt-4 pl-1 space-y-2">
        <div className="h-2.5 w-12 bg-slate-200 rounded" />
        <div className="h-3.5 w-3/4 bg-slate-200/60 rounded" />
        <div className="h-3 w-16 bg-slate-200/40 rounded" />
      </div>
    </div>
  )
}

export const CategoryPage: React.FC<CategoryProps> = ({ category: propCategory }) => {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const { toggleWishlist, isInWishlist } = useShop()

  // Resolve category name from route params, prop, or pathname
  const category = useMemo(() => {
    if (propCategory) return propCategory
    if (slug) return slug
    const path = location.pathname.replace(/^\//, '')
    if (['men', 'women', 'kids', 'uniforms', 'party-wear', 'ethnic-wear', 'winter-wear', 'sale'].includes(path)) {
      return path
    }
    return 'shop'
  }, [slug, propCategory, location.pathname])

  // States
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(() => {
    const searchParams = new URLSearchParams(location.search)
    const subcat = searchParams.get('subcategory')
    return subcat ? [subcat.toLowerCase()] : []
  })
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(15000)
  const [sortBy, setSortBy] = useState<string>('newest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  // Sync subcategory selection when URL query param changes
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const subcat = searchParams.get('subcategory')
    if (subcat) {
      setSelectedSubcategories([subcat.toLowerCase()])
    } else {
      setSelectedSubcategories([])
    }
  }, [location.search])

  const [isLoading, setIsLoading] = useState(true)

  // Trigger loading skeleton on filter modifications
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 450)
    return () => clearTimeout(timer)
  }, [category, selectedSubcategories, selectedSizes, selectedColors, selectedBrands, maxPrice, sortBy, currentPage])

  // Products filtered by category
  const categoryProducts = useMemo(() => {
    if (category === 'shop' || category === 'new-arrivals') return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter((p) => p.category === category)
  }, [category])

  // Get dynamic options from category products
  const filterOptions = useMemo(() => {
    const subcats = new Set<string>()
    const sizes = new Set<string>()
    const brands = new Set<string>()
    const colorsMap = new Map<string, string>()

    categoryProducts.forEach((p) => {
      subcats.add(p.subcategory)
      p.sizes.forEach((s) => sizes.add(s))
      brands.add(p.brand)
      p.colors.forEach((c) => colorsMap.set(c.name, c.hex))
    })

    return {
      subcategories: Array.from(subcats),
      sizes: Array.from(sizes),
      brands: Array.from(brands),
      colors: Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }))
    }
  }, [categoryProducts])

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts]

    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory))
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)))
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)))
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }
    result = result.filter((p) => p.price <= maxPrice)

    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviewCount - a.reviewCount)
    } else {
      // Default: newest (reverse by ID)
      result.sort((a, b) => b.id.localeCompare(a.id))
    }

    return result
  }, [categoryProducts, selectedSubcategories, selectedSizes, selectedColors, selectedBrands, maxPrice, sortBy])

  // Pagination logic
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage])

  // Reset filters helper
  const handleResetFilters = () => {
    setSelectedSubcategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedBrands([])
    setMaxPrice(15000)
    setCurrentPage(1)
  }

  // Formatting utility
  const formatCategoryName = (name: string) => {
    return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const categoryTitle = `${formatCategoryName(category)} Collection`
  const categoryDescription = `Explore high-quality, modern ${formatCategoryName(category)} clothing, suits, and bespoke uniforms at Bedi Garments. Stitched for elegance in Anandpur Sahib.`
  const canonicalPath = slug ? `/category/${slug}` : `/${category}`

  const categorySchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bedigarments.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": formatCategoryName(category),
          "item": `https://bedigarments.com${canonicalPath}`
        }
      ]
    }
  }, [category, canonicalPath])

  return (
    <div className="bg-white min-h-screen pb-20 select-none">
      <SEO 
        title={categoryTitle}
        description={categoryDescription}
        canonicalPath={canonicalPath}
        schema={categorySchema}
      />
      {/* 1. Category Hero Banner */}
      <div className="relative bg-bg-secondary py-16 md:py-24 text-center">
        <div className="absolute inset-0 bg-black/[0.02]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            {formatCategoryName(category)}
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-md mx-auto font-medium">
            Explore curated, premium clothing styled and tailored for modern comfort in Anandpur Sahib.
          </p>
        </div>
      </div>

      {/* 2. Breadcrumbs & Toolbar */}
      <div className="border-b border-border-primary/50 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
            <a href="/" className="hover:text-brand-accent">Home</a>
            <ChevronRight size={10} className="text-slate-400" />
            <a href="/shop" className="hover:text-brand-accent">Shop</a>
            <ChevronRight size={10} className="text-slate-400" />
            <span className="text-brand-text font-extrabold">{formatCategoryName(category)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center space-x-2 text-[10px] font-heading font-bold text-brand-text uppercase tracking-widest border border-border-primary px-3.5 py-1.5 rounded-sm hover:border-brand-accent transition-colors lg:hidden"
            >
              <SlidersHorizontal size={12} />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2 text-xs font-heading">
              <span className="text-brand-text-muted hidden md:inline tracking-wider font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                className="bg-transparent border border-border-primary text-brand-text font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-brand-accent cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace Grid */}
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-10 flex gap-10 lg:gap-14">
        
        {/* Sidebar Filter - Desktop only */}
        <aside className="w-[240px] flex-shrink-0 hidden lg:block space-y-8">
          <div className="flex items-center justify-between border-b border-border-primary/80 pb-3">
            <h2 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
              Filter Options
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-[9px] font-heading font-extrabold tracking-widest text-brand-accent hover:underline uppercase"
            >
              Clear All
            </button>
          </div>

          {/* Subcategories */}
          {filterOptions.subcategories.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                Category
              </h3>
              <div className="space-y-2">
                {filterOptions.subcategories.map((subcat) => (
                  <label key={subcat} className="flex items-center space-x-2.5 text-xs text-brand-text-muted font-body cursor-pointer hover:text-brand-text transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subcat)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedSubcategories, subcat]
                          : selectedSubcategories.filter((s) => s !== subcat)
                        setSelectedSubcategories(next)
                        setCurrentPage(1)
                      }}
                      className="rounded border-border-primary text-brand-accent focus:ring-brand-accent/50"
                    />
                    <span className="capitalize font-medium">{subcat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="space-y-3">
            <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
              Max Price (₹{maxPrice})
            </h3>
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="w-full accent-brand-accent cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-heading font-bold text-brand-text-muted">
              <span>₹500</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* Sizes */}
          {filterOptions.sizes.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.sizes.map((sz) => {
                  const isSel = selectedSizes.includes(sz)
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        const next = isSel ? selectedSizes.filter((s) => s !== sz) : [...selectedSizes, sz]
                        setSelectedSizes(next)
                        setCurrentPage(1)
                      }}
                      className={`min-w-[34px] h-[34px] text-[10px] font-heading font-bold border rounded-sm flex items-center justify-center transition-all ${
                        isSel 
                          ? 'border-brand-text bg-brand-text text-white shadow-sm' 
                          : 'border-border-primary text-brand-text-muted hover:border-brand-text'
                      }`}
                    >
                      {sz}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Colors */}
          {filterOptions.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                Color
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {filterOptions.colors.map((c) => {
                  const isSel = selectedColors.includes(c.name)
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        const next = isSel ? selectedColors.filter((cl) => cl !== c.name) : [...selectedColors, c.name]
                        setSelectedColors(next)
                        setCurrentPage(1)
                      }}
                      className={`w-6 h-6 rounded-full border border-border-primary/80 relative flex items-center justify-center p-0.5 transition-all ${
                        isSel ? 'ring-2 ring-brand-accent ring-offset-2' : ''
                      }`}
                      title={c.name}
                    >
                      <span className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Brands */}
          {filterOptions.brands.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                Brand
              </h3>
              <div className="space-y-2">
                {filterOptions.brands.map((br) => (
                  <label key={br} className="flex items-center space-x-2.5 text-xs text-brand-text-muted font-body cursor-pointer hover:text-brand-text transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(br)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedBrands, br]
                          : selectedBrands.filter((b) => b !== br)
                        setSelectedBrands(next)
                        setCurrentPage(1)
                      }}
                      className="rounded border-border-primary text-brand-accent focus:ring-brand-accent/50"
                    />
                    <span className="font-medium">{br}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {paginatedProducts.length > 0 ? (
            <div>
              {/* Promo offer banner for New Arrivals */}
              {(category === 'new-arrivals' || sortBy === 'newest') && (
                <div className="bg-[#FAF7F0] border border-[#EBE3D5] rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent bg-[#F0E5CF] px-2.5 py-1 rounded-sm uppercase">
                      New Arrivals 2026 Special
                    </span>
                    <h3 className="font-heading text-sm font-extrabold text-brand-text uppercase mt-2">
                      Introductory Launch Offer
                    </h3>
                    <p className="text-xs text-brand-text-muted font-medium leading-relaxed">
                      Use code <strong className="text-brand-text">BEDINEW26</strong> at checkout to claim an extra <strong className="text-brand-text">15% OFF</strong> on all 2026 autumn/winter new arrivals.
                    </p>
                  </div>
                  <div className="flex-shrink-0 bg-white border border-[#EBE3D5] px-4 py-2.5 rounded-xl text-center">
                    <span className="block text-[8px] font-heading font-bold text-slate-400 uppercase tracking-widest">Discount Code</span>
                    <span className="text-sm font-heading font-extrabold text-brand-accent tracking-wider">BEDINEW26</span>
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <ProductSkeleton key={idx} />
                  ))
                ) : (
                  paginatedProducts.map((prod) => {
                    const isFav = isInWishlist(prod.id)
                    return (
                    <Link
                      key={prod.id}
                      to={`/product/${prod.slug}`}
                      className="group flex flex-col relative"
                    >
                      {/* Image block */}
                      <div className="relative overflow-hidden rounded-2xl bg-bg-secondary aspect-[2/3] shadow-[0_6px_22px_rgba(0,0,0,0.03)] border border-border-primary/20">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
                          }}
                        />
                        {prod.images[1] && (
                          <img
                            src={prod.images[1]}
                            alt={`${prod.name} back`}
                            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 scale-102 group-hover:scale-100"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&h=800&q=80";
                            }}
                          />
                        )}

                        {/* Top corner tags */}
                        {prod.discount && (
                          <span className="absolute top-4 left-4 bg-red-600 text-white text-[8px] font-heading font-extrabold tracking-wider uppercase px-2 py-1 rounded-sm">
                            -{prod.discount}
                          </span>
                        )}

                        {/* Wishlist toggle */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleWishlist(prod)
                          }}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white text-brand-text shadow-md hover:bg-brand-accent hover:text-white transition-all duration-300 focus:outline-none"
                          aria-label="Add to Wishlist"
                        >
                          <Heart
                            size={12}
                            className={isFav ? 'fill-current text-red-500 scale-110' : 'text-brand-text'}
                          />
                        </button>
                      </div>

                      {/* Info details */}
                      <div className="mt-4 pl-1 space-y-1">
                        <span className="text-[9px] font-heading font-bold tracking-wider text-brand-text-muted uppercase">
                          {prod.brand}
                        </span>
                        <h3 className="font-heading text-xs md:text-sm font-bold text-brand-text group-hover:text-brand-accent transition-colors duration-300 truncate">
                          {prod.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="font-heading text-xs font-semibold text-brand-accent">
                            ₹{prod.price}
                          </span>
                          {prod.originalPrice && (
                            <span className="font-heading text-[10px] text-brand-text-muted line-through font-medium">
                              ₹{prod.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    )
                  })
                )}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-16 border-t border-border-primary/50 pt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 150, behavior: 'smooth' })
                      }}
                      className={`w-9 h-9 text-[10px] font-heading font-extrabold rounded-full flex items-center justify-center transition-all ${
                        currentPage === page
                          ? 'bg-brand-text text-white shadow-sm'
                          : 'bg-bg-secondary text-brand-text-muted hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-bg-secondary/35 rounded-2xl border border-dashed border-border-primary">
              <span className="text-3xl">🧺</span>
              <h3 className="font-heading text-sm font-extrabold text-brand-text uppercase tracking-widest mt-4">
                No Products Found
              </h3>
              <p className="text-xs text-brand-text-muted max-w-xs mx-auto mt-2 font-medium">
                Try widening your price range or clearing some filters to find what you are looking for.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 bg-brand-text text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded shadow hover:bg-brand-accent transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Panel */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[1001] lg:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          
          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-[280px] bg-white shadow-2xl p-6 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-primary/80 pb-3">
              <h2 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
                Filters
              </h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded hover:bg-bg-secondary">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1">
              {/* Add mobile versions of sidebar filter blocks */}
              {/* Categories */}
              {filterOptions.subcategories.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {filterOptions.subcategories.map((subcat) => (
                      <label key={subcat} className="flex items-center space-x-2.5 text-xs text-brand-text-muted font-body cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcat)}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...selectedSubcategories, subcat]
                              : selectedSubcategories.filter((s) => s !== subcat)
                            setSelectedSubcategories(next)
                            setCurrentPage(1)
                          }}
                          className="rounded border-border-primary text-brand-accent"
                        />
                        <span className="capitalize font-medium">{subcat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price range */}
              <div className="space-y-3">
                <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                  Max Price (₹{maxPrice})
                </h3>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="w-full accent-brand-accent"
                />
              </div>

              {/* Sizes */}
              {filterOptions.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.sizes.map((sz) => {
                      const isSel = selectedSizes.includes(sz)
                      return (
                        <button
                          key={sz}
                          onClick={() => {
                            const next = isSel ? selectedSizes.filter((s) => s !== sz) : [...selectedSizes, sz]
                            setSelectedSizes(next)
                            setCurrentPage(1)
                          }}
                          className={`min-w-[34px] h-[34px] text-[10px] font-heading font-bold border rounded-sm flex items-center justify-center ${
                            isSel ? 'border-brand-text bg-brand-text text-white' : 'border-border-primary text-brand-text-muted'
                          }`}
                        >
                          {sz}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border-primary/80 pt-4 flex gap-4">
              <button
                onClick={() => {
                  handleResetFilters()
                  setIsSidebarOpen(false)
                }}
                className="flex-1 py-2.5 border border-border-primary text-[9px] font-heading font-extrabold tracking-widest uppercase rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex-1 py-2.5 bg-brand-text text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
