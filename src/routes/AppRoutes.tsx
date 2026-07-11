import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Lazy load pages for performance optimization
const Home = lazy(() => import('../pages/Home'))
const Shop = lazy(() => import('../pages/Shop'))
const Category = lazy(() => import('../pages/Category'))
const Product = lazy(() => import('../pages/Product'))
const Cart = lazy(() => import('../pages/Cart'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const Profile = lazy(() => import('../pages/Profile'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Search = lazy(() => import('../pages/Search'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Campaign = lazy(() => import('../pages/Campaign'))
const StoreDetail = lazy(() => import('../pages/StoreDetail'))
const SizeGuide = lazy(() => import('../pages/SizeGuide'))
const ArtOfTailoring = lazy(() => import('../pages/ArtOfTailoring'))
const BulkOrders = lazy(() => import('../pages/BulkOrders'))
const Stores = lazy(() => import('../pages/Stores'))
const Shipping = lazy(() => import('../pages/Shipping'))
const Returns = lazy(() => import('../pages/Returns'))
const FAQ = lazy(() => import('../pages/FAQ'))

export const AppRoutes: React.FC = () => {
  return (
    <Suspense 
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center bg-white text-[10px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase select-none">
          Loading Bedi Garments...
        </div>
      }
    >
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections/editorial" element={<Campaign />} />
        <Route path="/autumn-campaign" element={<Campaign />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/art-of-tailoring" element={<ArtOfTailoring />} />
        <Route path="/bulk-orders" element={<BulkOrders />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Dynamic Category Slugs */}
        <Route path="/category/:slug" element={<Category />} />
        
        {/* Shorthand Main Category Direct Routes */}
        <Route path="/men" element={<Category category="men" />} />
        <Route path="/women" element={<Category category="women" />} />
        <Route path="/kids" element={<Category category="kids" />} />
        <Route path="/uniforms" element={<Category category="uniforms" />} />
        <Route path="/party-wear" element={<Category category="party-wear" />} />
        <Route path="/ethnic-wear" element={<Category category="ethnic-wear" />} />
        <Route path="/sale" element={<Category category="sale" />} />
        <Route path="/winter-wear" element={<Category category="winter-wear" />} />

        {/* Dynamic Product Detail Slug */}
        <Route path="/product/:slug" element={<Product />} />

        {/* Dynamic Store Detail Slug */}
        <Route path="/store/:slug" element={<StoreDetail />} />

        {/* Redirects & Unknown Route Handling */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
