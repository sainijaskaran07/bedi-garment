export interface Color {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: 'men' | 'women' | 'kids' | 'uniforms' | 'party-wear' | 'ethnic-wear' | 'winter-wear' | 'sale'
  subcategory: string
  brand: string
  collection: string
  price: number
  originalPrice?: number
  discount?: string
  rating: number
  reviewCount: number
  images: string[]
  description: string
  sizes: string[]
  colors: Color[]
  inStock: boolean
  qtyAvailable: number
  keywords: string[]
}

export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface CartItem {
  product: Product
  selectedSize: string
  selectedColor: Color
  quantity: number
}

export interface WishlistItem {
  product: Product
}

export interface Address {
  id: string
  label: string // e.g. "Home", "Office"
  name: string
  addressLine: string
  city: string
  state: string
  zip: string
  phone: string
}

export interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: {
    productId: string
    name: string
    image: string
    price: number
    quantity: number
    size: string
    color: string
  }[]
  total: number
}
