import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer 
      className="w-full bg-brand-text text-white py-16 md:py-24 select-none"
      role="contentinfo"
      aria-label="Editorial Footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Links Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-white/10 pb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex flex-col select-none focus:outline-none w-max">
              <span className="font-heading text-xl md:text-2xl font-extrabold tracking-[0.25em] text-white">
                BEDI
              </span>
              <span className="font-heading text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.35em] text-slate-400 mt-1">
                GARMENTS
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-body font-medium max-w-sm">
              Providing premium lifestyle clothing and customized academic/corporate uniforms since 1990. 
              Based in the holy city of Anandpur Sahib, Punjab, serving clients globally.
            </p>
            <div className="text-[11px] font-heading font-extrabold tracking-[0.1em] text-brand-accent uppercase">
              ੴ Entrepreneurship
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-4">
            <h3 className="font-heading text-[10px] font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-2">
              Collections
            </h3>
            <ul className="space-y-2 text-xs font-body font-medium text-slate-400">
              <li><Link to="/men" className="hover:text-brand-accent transition-colors duration-200">Men</Link></li>
              <li><Link to="/women" className="hover:text-brand-accent transition-colors duration-200">Women</Link></li>
              <li><Link to="/kids" className="hover:text-brand-accent transition-colors duration-200">Kids Wear</Link></li>
              <li><Link to="/uniforms" className="hover:text-brand-accent transition-colors duration-200">Uniforms</Link></li>
              <li><Link to="/sale" className="hover:text-red-500 transition-colors duration-200">Sale</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h3 className="font-heading text-[10px] font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-2">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs font-body font-medium text-slate-400">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-brand-accent transition-colors duration-200">Worldwide Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-brand-accent transition-colors duration-200">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="hover:text-brand-accent transition-colors duration-200">Uniform Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-brand-accent transition-colors duration-200">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Corporate */}
          <div className="space-y-4">
            <h3 className="font-heading text-[10px] font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-2">
              Corporate
            </h3>
            <ul className="space-y-2 text-xs font-body font-medium text-slate-400">
              <li><Link to="/bulk-orders" className="hover:text-brand-accent transition-colors duration-200">Bulk Inquiries</Link></li>
              <li><Link to="/about" className="hover:text-brand-accent transition-colors duration-200">Our Story</Link></li>
              <li><Link to="/art-of-tailoring" className="hover:text-brand-accent transition-colors duration-200">The Art of Tailoring</Link></li>
              <li><Link to="/stores" className="hover:text-brand-accent transition-colors duration-200">Store Directory</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Punjab Tag */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-heading font-medium tracking-widest text-slate-500 uppercase">
          <div>
            &copy; {new Date().getFullYear()} Bedi Garments. All Rights Reserved.
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-1.5 hover:text-white transition-colors duration-300">
            <span>Stitched in Anandpur Sahib, Punjab</span>
            <span className="text-brand-accent font-extrabold">ੴ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
