import React, { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { MOCK_PRODUCTS } from '../../data'
import { useShop } from '../../context'
import { Heart, Search, ChevronRight } from 'lucide-react'

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { toggleWishlist, isInWishlist } = useShop()

  // Get search query from URL parameter
  const query = useMemo(() => {
    return searchParams.get('q') || ''
  }, [searchParams])

  // Filter products by matching query terms
  const searchResults = useMemo(() => {
    if (!query) return []
    const term = query.toLowerCase().trim()
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.collection.toLowerCase().includes(term) ||
        p.keywords.some((k) => k.toLowerCase().includes(term))
    )
  }, [query])

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Breadcrumb / Search Header */}
        <div className="border-b border-border-primary/50 pb-6 mb-10">
          <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider mb-3">
            <a href="/" className="hover:text-brand-accent">Home</a>
            <ChevronRight size={10} className="text-slate-400" />
            <span className="text-brand-text font-extrabold">Search Results</span>
          </div>

          <h1 className="text-3xl font-heading font-extrabold tracking-tight uppercase">
            {query ? `Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-brand-text-muted text-xs font-medium mt-1">
            Found {searchResults.length} matches in catalog.
          </p>
        </div>

        {/* Display results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {searchResults.map((prod) => {
              const isFav = isInWishlist(prod.id)
              return (
                <Link
                  key={prod.id}
                  to={`/product/${prod.slug}`}
                  className="group flex flex-col relative"
                >
                  {/* Image Block */}
                  <div className="relative overflow-hidden rounded-2xl bg-bg-secondary aspect-[2/3] shadow-[0_6px_22px_rgba(0,0,0,0.03)] border border-border-primary/20">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      loading="lazy"
                    />
                    {prod.images[1] && (
                      <img
                        src={prod.images[1]}
                        alt={`${prod.name} alternative`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-102 group-hover:scale-100"
                        loading="lazy"
                      />
                    )}

                    {/* Wishlist Trigger */}
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

                  {/* Details Block */}
                  <div className="mt-4 pl-1 space-y-1">
                    <span className="text-[9px] font-heading font-bold tracking-wider text-brand-text-muted uppercase">
                      {prod.brand}
                    </span>
                    <h3 className="font-heading text-xs md:text-sm font-bold text-brand-text group-hover:text-brand-accent transition-colors duration-300 truncate">
                      {prod.name}
                    </h3>
                    <p className="font-heading text-xs font-semibold text-brand-accent">
                      ₹{prod.price}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-bg-secondary/20 rounded-2xl border border-dashed border-border-primary max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center text-brand-text-muted mb-4">
              <Search size={22} className="stroke-[1.8]" />
            </div>
            <h2 className="font-heading text-base font-extrabold text-brand-text uppercase tracking-widest">
              No Matches Found
            </h2>
            <p className="text-xs text-brand-text-muted max-w-xs mt-3 leading-relaxed font-medium">
              We couldn't find any products matching your query. Check the spelling or try searching generic terms like "suit" or "uniform".
            </p>
            <a
              href="/shop"
              className="mt-8 px-8 py-3.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded shadow-md hover:bg-brand-accent transition-all duration-300"
            >
              Browse All Products
            </a>
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchPage
