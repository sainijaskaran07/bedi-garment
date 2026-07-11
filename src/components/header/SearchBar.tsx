import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { MOCK_PRODUCTS } from '../../data'

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        const active = document.activeElement
        const isInput = active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.getAttribute('contenteditable') === 'true'
        
        if (!isInput) {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Filter products for suggestions dropdown (limit to 5)
  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const term = query.toLowerCase().trim()
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.collection.toLowerCase().includes(term) ||
        p.keywords.some((k) => k.toLowerCase().includes(term))
    ).slice(0, 5)
  }, [query])

  const handleClear = () => {
    setQuery('')
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    // Go to search results page
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setShowDropdown(false)
    inputRef.current?.blur()
  }

  const handleSuggestionClick = (slug: string) => {
    navigate(`/product/${slug}`)
    setQuery('')
    setShowDropdown(false)
  }

  return (
    <div className="relative w-full max-w-[240px] lg:max-w-[320px] xl:max-w-[360px] z-50">
      <form 
        onSubmit={handleSubmit}
        role="search"
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowDropdown(true)
            }}
            placeholder="Search shirts, suits, uniforms..."
            className="w-full h-9 pl-10 pr-9 text-xs font-heading font-medium tracking-wider bg-bg-secondary text-brand-text placeholder-brand-text-muted/50 rounded-full border border-border-primary/20 transition-all duration-300 focus:outline-none focus:bg-white focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30"
            aria-label="Search products"
          />
          
          {/* Search Icon */}
          <div className="absolute left-3.5 text-brand-text-muted/70 pointer-events-none">
            <Search size={14} strokeWidth={2.2} />
          </div>

          {/* Clear Button / Shortcut Badge */}
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 p-1 rounded-full text-brand-text-muted/80 hover:text-brand-text hover:bg-slate-200/50 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-accent/50"
              aria-label="Clear search field"
            >
              <X size={12} />
            </button>
          ) : (
            <kbd 
              className="absolute right-3.5 text-[9px] font-sans font-bold text-brand-text-muted/30 border border-border-primary/80 px-1.5 py-0.5 rounded pointer-events-none hidden lg:inline-block"
              title="Press '/' to focus search"
            >
              /
            </kbd>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-primary/60 rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto"
        >
          <div className="p-2 border-b border-border-primary/40 bg-bg-secondary/35 text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase">
            Suggestions
          </div>
          <ul className="divide-y divide-border-primary/40">
            {suggestions.map((prod) => (
              <li key={prod.id}>
                <button
                  onClick={() => handleSuggestionClick(prod.slug)}
                  className="w-full p-2.5 flex items-center space-x-3 text-left hover:bg-bg-secondary/40 transition-colors focus:outline-none"
                >
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-9 h-11 object-cover rounded bg-bg-secondary flex-shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-heading font-extrabold text-brand-accent uppercase tracking-wider leading-none">
                      {prod.brand}
                    </p>
                    <p className="text-xs font-heading font-bold text-brand-text truncate mt-1 leading-tight">
                      {prod.name}
                    </p>
                    <p className="text-[10px] font-body font-semibold text-brand-text-muted mt-0.5">
                      ₹{prod.price}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
