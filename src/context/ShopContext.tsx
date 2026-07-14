/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product, CartItem, Color } from '../types'

interface ShopContextType {
  cart: CartItem[]
  wishlist: Product[]
  recentlyViewed: Product[]
  addToCart: (product: Product, size: string, color: Color, quantity?: number) => void
  removeFromCart: (productId: string, size: string, colorName: string) => void
  updateCartQuantity: (productId: string, size: string, colorName: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  addToRecentlyViewed: (product: Product) => void
  cartCount: number
  cartSubtotal: number
  cartTotal: number
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bg_cart')
    return saved ? JSON.parse(saved) : []
  })

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bg_wishlist')
    return saved ? JSON.parse(saved) : []
  })

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bg_recently_viewed')
    return saved ? JSON.parse(saved) : []
  })

  // Synchronize with localStorage
  useEffect(() => {
    localStorage.setItem('bg_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('bg_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('bg_recently_viewed', JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  // Cart operations
  const addToCart = (product: Product, size: string, color: Color, quantity = 1) => {
    const isLoggedIn = !!localStorage.getItem('bg_current_user')
    if (!isLoggedIn) {
      localStorage.setItem('bg_pending_cart_item', JSON.stringify({ product, size, color, quantity }))
      navigate('/profile')
      return
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      )

      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += quantity
        return updated
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    )
  }

  const updateCartQuantity = (productId: string, size: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId)
  }

  // Recently Viewed operations
  // useCallback keeps the reference stable so effects that depend on it
  // (e.g. the product page's "recently viewed" tracker) don't re-run every render.
  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id)
      return [product, ...filtered].slice(0, 8) // Limit to 8 items
    })
  }, [])

  // Computed state values
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartTotal = cartSubtotal // No taxes/shipping implemented on frontend yet

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,
        cartCount,
        cartSubtotal,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}
