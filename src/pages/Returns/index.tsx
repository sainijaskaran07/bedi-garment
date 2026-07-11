import React from 'react'
import { ArrowLeft, ChevronRight, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

export const ReturnsPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Returns & Exchanges Policy | Bedi Garments" 
        description="Read about our 7-day returns, size exchanges, and refund guidelines for school uniforms, festive ethnic wear, and corporate blazers."
        canonicalPath="/returns"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">Returns & Exchanges</span>
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
            Hassle-Free Returns
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Returns & Exchanges
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            We want you to love your purchases. Review our size exchange rules and return guidelines below.
          </p>
        </div>
      </div>

      {/* Returns Policy Details */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Policy overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-accent">
              <RotateCcw size={18} />
              <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-brand-text">7-Day Return Window</h2>
            </div>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              We offer a <strong>7-day return and exchange policy</strong> for all unused, unwashed garments with original tags intact. If you need a different uniform size, we arrange exchanges.
            </p>
          </div>

          {/* Exceptions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-accent">
              <AlertCircle size={18} />
              <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-brand-text">Policy Exceptions</h2>
            </div>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Custom-tailored wedding sherwanis, bespoke corporate suits, and uniforms featuring custom institutional logos/embroideries are <strong>non-returnable and non-exchangeable</strong> unless they contain fabrication defects.
            </p>
          </div>
        </div>

        {/* Exchange Steps */}
        <div className="bg-[#FAFAF8] border border-border-primary/60 rounded-[24px] p-6 md:p-8 space-y-4">
          <div className="flex items-center space-x-2.5 text-brand-text border-b border-border-primary pb-3">
            <HelpCircle size={16} className="text-brand-accent" />
            <h3 className="font-heading text-xs font-extrabold tracking-widest uppercase">
              How to Process an Exchange
            </h3>
          </div>
          <div className="space-y-3 text-xs text-brand-text-muted font-medium leading-relaxed">
            <p><strong>Step 1:</strong> Email us at <em>support@bedigarments.com</em> with your Order ID and size replacement request.</p>
            <p><strong>Step 2:</strong> Pack the garments securely in their original packaging. We will schedule a courier pickup (for India addresses).</p>
            <p><strong>Step 3:</strong> Once our showroom team inspects the returned product, your replacement size is dispatched within 24 hours.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ReturnsPage
