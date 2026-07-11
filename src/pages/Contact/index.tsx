import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SEO } from '../../components/common'

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Contact Us | Bedi Garments" 
        description="Get in touch with the Bedi Garments team for inquiries regarding customized school/college uniforms, bulk corporate orders, or store showrooms in Punjab."
        canonicalPath="/contact"
      />
      {/* Editorial Header Banner */}
      <div className="bg-bg-secondary py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Contact Us
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-md mx-auto font-medium leading-relaxed">
            Have a bulk inquiry for uniforms or want to consult on wedding wear? Send us a message or call.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Contact Details & Locations (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-sm md:text-base font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
                Store Offices
              </h2>
              
              <div className="space-y-6 text-xs md:text-sm font-medium text-brand-text-muted">
                {/* Store 1 */}
                <div className="space-y-2 border border-border-primary/30 p-5 rounded-2xl bg-bg-secondary/20">
                  <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
                    Gol Market Flagship
                  </h3>
                  <p className="flex items-start space-x-2 text-[11px] leading-relaxed">
                    <MapPin size={14} className="text-brand-accent flex-shrink-0 mt-0.5" />
                    <span>Main Bazaar, Gol Market, Anandpur Sahib, Punjab, 140118</span>
                  </p>
                  <p className="flex items-center space-x-2 text-[11px]">
                    <Phone size={14} className="text-brand-accent flex-shrink-0" />
                    <a href="tel:7466070001" className="hover:underline text-brand-text">+91 74660-70001</a>
                  </p>
                </div>

                {/* Store 2 */}
                <div className="space-y-2 border border-border-primary/30 p-5 rounded-2xl bg-bg-secondary/20">
                  <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
                    Agampur Chowk Outlet
                  </h3>
                  <p className="flex items-start space-x-2 text-[11px] leading-relaxed">
                    <MapPin size={14} className="text-brand-accent flex-shrink-0 mt-0.5" />
                    <span>Near Agampur Chowk, Court Road, Anandpur Sahib, Punjab, 140118</span>
                  </p>
                  <p className="flex items-center space-x-2 text-[11px]">
                    <Phone size={14} className="text-brand-accent flex-shrink-0" />
                    <a href="tel:7710160001" className="hover:underline text-brand-text">+91 77101-60001</a>
                  </p>
                </div>

                {/* Direct support emails */}
                <div className="space-y-2.5 px-1 pt-2">
                  <div className="flex items-center space-x-3 text-[11px]">
                    <Mail size={14} className="text-brand-accent" />
                    <span>support@bedigarments.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <Clock size={14} className="text-brand-accent" />
                    <span>Open Daily: 09:30 AM - 08:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Contact Form (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-border-primary/40 p-6 md:p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
            <h2 className="font-heading text-sm md:text-base font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/50 pb-3 mb-6">
              Send Message
            </h2>

            {status === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <span className="text-4xl">✉️</span>
                <h3 className="font-heading text-base font-extrabold text-brand-text uppercase tracking-widest">
                  Message Sent
                </h3>
                <p className="text-xs text-brand-text-muted max-w-sm mx-auto leading-relaxed font-medium">
                  Thank you for reaching out. A client support representative from our Anandpur Sahib office will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 bg-brand-text text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Name */}
                <div>
                  <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary border rounded focus:outline-none ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-border-primary/60 focus:border-brand-accent'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary border rounded focus:outline-none ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-border-primary/60 focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary border rounded focus:outline-none ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-border-primary/60 focus:border-brand-accent'
                    }`}
                  />
                  {errors.subject && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-4 text-xs font-heading font-medium bg-bg-secondary border rounded focus:outline-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-border-primary/60 focus:border-brand-accent'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-12 bg-brand-text text-white text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase rounded hover:bg-brand-accent transition-colors duration-300 disabled:bg-slate-300"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage
