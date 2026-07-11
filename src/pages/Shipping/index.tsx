import React from 'react'
import { ArrowLeft, ChevronRight, Truck, Globe, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

export const ShippingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Worldwide Shipping & Delivery Information | Bedi Garments" 
        description="Learn about delivery rates, courier tracking timelines, and custom international shipping to USA, UK, Canada, and Australia from Bedi Garments."
        canonicalPath="/shipping"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">Worldwide Shipping</span>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[10px] font-heading font-bold tracking-widest uppercase hover:text-brand-accent transition-colors duration-200 mt-4 focus:outline-none"
        >
          <ArrowLeft size={12} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-[#FAFAF8] border-b border-border-primary/50 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Global Logistics
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Worldwide Shipping
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            We deliver our bespoke tailoring and uniform catalogs safely to local addresses in Punjab, cities across India, and international NRI destinations.
          </p>
        </div>
      </div>

      {/* Shipping Grid Details */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Local */}
          <div className="border border-border-primary rounded-[20px] p-6 bg-[#FAFAF8] space-y-3">
            <div className="text-brand-accent">
              <MapPin size={22} />
            </div>
            <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-brand-text">Local Punjab</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Delivery within Anandpur Sahib, Nangal, Ropar, and Ludhiana occurs in <strong>1 to 2 business days</strong>. Free pickup is available at our showrooms.
            </p>
          </div>

          {/* Card 2: Domestic */}
          <div className="border border-border-primary rounded-[20px] p-6 bg-[#FAFAF8] space-y-3">
            <div className="text-brand-accent">
              <Truck size={22} />
            </div>
            <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-brand-text">Rest of India</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Orders dispatched to Delhi, Haryana, and cities nationwide arrive within <strong>3 to 5 business days</strong> via premium air courier partners.
            </p>
          </div>

          {/* Card 3: International */}
          <div className="border border-border-primary rounded-[20px] p-6 bg-[#FAFAF8] space-y-3">
            <div className="text-brand-accent">
              <Globe size={22} />
            </div>
            <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-brand-text">International NRI</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Global shipping to Canada, UK, USA, Australia, and UAE takes <strong>5 to 8 business days</strong> via DHL or FedEx with full tracking support.
            </p>
          </div>

        </div>

        {/* Shipping Rates Policy */}
        <div className="bg-[#FAFAF8] border border-border-primary/60 rounded-[24px] p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-sm font-extrabold text-brand-text uppercase border-b border-border-primary pb-3">
            Shipping Rates & Thresholds
          </h2>
          <div className="space-y-3 text-xs text-brand-text-muted font-medium leading-relaxed">
            <p className="flex justify-between border-b border-border-primary/30 pb-2">
              <span>Domestic Shipping (Within India)</span>
              <strong className="text-brand-text">Free on orders above ₹1,999 (Otherwise ₹100 Flat Rate)</strong>
            </p>
            <p className="flex justify-between border-b border-border-primary/30 pb-2">
              <span>International Shipping (USA, Canada, Europe, Australia)</span>
              <strong className="text-brand-text">Calculated at checkout based on weight (Free above ₹25,000)</strong>
            </p>
            <p className="flex justify-between border-b border-border-primary/30 pb-2">
              <span>Order Dispatch Schedule</span>
              <strong className="text-brand-text">Within 24-48 hours (excluding custom uniforms or tailoring)</strong>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShippingPage
