import React, { useState } from 'react'
import { ArrowLeft, ChevronRight, Mail, Phone, ShieldCheck, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

export const BulkOrdersPage: React.FC = () => {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    institution: '',
    contactPerson: '',
    email: '',
    phone: '',
    type: 'school',
    quantity: '50-100',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Bulk & Corporate Uniform Inquiries | Bedi Garments" 
        description="Submit bulk uniform orders and corporate blazers inquiries at Bedi Garments. Sizing sets, custom embroidery, and global shipping since 1990."
        canonicalPath="/bulk-orders"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">Bulk Inquiries</span>
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
            Institutional Fittings
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Bulk & Corporate Inquiries
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            Provide details of your school, college, or business. We coordinate tailored sizing sessions, custom monogramming, and door-to-door bulk shipping.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Specifications (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-xs font-extrabold tracking-widest uppercase text-brand-text">
              Uniform Supply Standards
            </h2>
            <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
              Over the last three decades, Bedi Garments has supplied high-durability school uniform shirts, skirts, trousers, and corporate jackets to organizations across Punjab, India, and globally.
            </p>
          </div>

          <div className="space-y-6">
            {/* Spec 1 */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-bg-secondary rounded-xl text-brand-accent mt-0.5">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">Crease & Shrinkage Proof</h3>
                <p className="text-xs text-brand-text-muted mt-1 leading-relaxed font-medium">
                  We use premium poly-viscous and pre-washed combed cotton blends that stand up to daily washes without losing color or texture.
                </p>
              </div>
            </div>

            {/* Spec 2 */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-bg-secondary rounded-xl text-brand-accent mt-0.5">
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-heading text-[10px] font-extrabold tracking-wider text-brand-text uppercase">Global Doorstep Delivery</h3>
                <p className="text-xs text-brand-text-muted mt-1 leading-relaxed font-medium">
                  Whether shipping to local school boards in Punjab or Punjabi academies in Canada, UK, and Australia, we deliver directly to your campus door.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border-primary/50 pt-8 space-y-2.5 text-xs text-brand-text-muted font-medium">
            <p className="flex items-center space-x-2">
              <Phone size={14} className="text-brand-accent" />
              <span>Bulk Liaison: +91 74660-70001</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail size={14} className="text-brand-accent" />
              <span>Email: support@bedigarments.com</span>
            </p>
          </div>
        </div>

        {/* Right Column: Intake Form (7 Columns) */}
        <div className="lg:col-span-7 bg-[#FAFAF8] border border-border-primary/60 rounded-[28px] p-6 md:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-4xl">📧</span>
              <h2 className="font-heading text-lg font-extrabold text-brand-text uppercase tracking-wider">
                Inquiry Submitted Successfully
              </h2>
              <p className="text-xs text-brand-text-muted max-w-sm mx-auto leading-relaxed font-medium">
                Thank you for contacting Bedi Garments. Our institutional representative will contact you with sample brochures and quotation sets within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Institution Name */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Institution / Company</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15"
                  />
                </div>

                {/* Phone Contact */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Phone Contact</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* uniform type */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Uniform Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15 cursor-pointer"
                  >
                    <option value="school">School Uniforms</option>
                    <option value="college">College / University Uniforms</option>
                    <option value="corporate">Corporate Blazers & Suits</option>
                    <option value="industrial">Industrial Safety Wear</option>
                  </select>
                </div>

                {/* Quantity Category */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Estimated Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full h-12 px-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15 cursor-pointer"
                  >
                    <option value="50-100">50 - 100 sets</option>
                    <option value="100-500">100 - 500 sets</option>
                    <option value="500-1000">500 - 1,000 sets</option>
                    <option value="1000+">1,000+ sets</option>
                  </select>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-heading font-extrabold text-brand-text uppercase tracking-widest">Details of Requirements</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your organization sizing schedules, emblem specifications, or customized layouts..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 text-xs font-heading font-medium tracking-wide bg-white border border-border-primary/50 rounded focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/15 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded hover:bg-brand-accent transition-colors duration-300 focus:outline-none shadow-md cursor-pointer"
              >
                Submit Bulk Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default BulkOrdersPage
