import React, { useState } from 'react'
import { ArrowLeft, ChevronRight, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/common'

interface FAQItem {
  question: string
  answer: string
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "Do you supply customized school and college uniforms?",
    answer: "Yes, uniform supply is our primary expertise. We manufacture premium quality school, college, corporate, and industrial uniforms with custom embroidery options. For bulk orders, we hold dedicated fitting sessions."
  },
  {
    question: "Can I book custom tailoring sessions online?",
    answer: "Absolutely. You can draft your style preference, fabric type, and fitting cut on our 'Art of Tailoring' page. After saving your design profile, you can visit our Gol Market Flagship or Agampur Chowk Outlet to complete physical measurements."
  },
  {
    question: "Do you ship garments internationally?",
    answer: "Yes, we ship globally to NRI families in Canada, USA, UK, Australia, and UAE. International orders take 5-8 business days for delivery and are shipped using DHL or FedEx. Tracking details are provided instantly."
  },
  {
    question: "What is your return and size exchange policy?",
    answer: "We offer a 7-day return/exchange window for standard retail garments. Custom-tailored sherwanis or uniforms with embroidered institutional logos cannot be returned or exchanged unless there is a material defect."
  },
  {
    question: "Where are your physical stores located?",
    answer: "We have two flagship locations in Anandpur Sahib, Punjab: the Gol Market Flagship Showroom and the Agampur Chowk Outlet. Both locations are open Monday through Saturday, from 10:00 AM to 9:00 PM."
  }
]

export const FAQPage: React.FC = () => {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="Frequently Asked Questions (FAQ) | Bedi Garments" 
        description="Find answers to common questions about school uniforms, custom tailoring, global NRI shipping, and showroom hours at Bedi Garments."
        canonicalPath="/faq"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-1.5 text-[10px] font-heading font-bold text-brand-text-muted uppercase tracking-wider">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <ChevronRight size={10} className="text-slate-400" />
          <span className="text-brand-text font-extrabold">FAQs</span>
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
            Customer Support
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-lg mx-auto font-medium leading-relaxed">
            Quick answers regarding custom styling orders, uniform dimensions, shipping speeds, and showroom location hours.
          </p>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 space-y-4">
        {FAQS_DATA.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div 
              key={index}
              className="border border-border-primary/60 rounded-2xl overflow-hidden bg-[#FAFAF8]"
            >
              {/* Question Trigger Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading text-xs sm:text-sm font-extrabold text-brand-text uppercase hover:text-brand-accent transition-colors focus:outline-none cursor-pointer"
              >
                <span className="flex items-center space-x-2.5">
                  <HelpCircle size={14} className="text-brand-accent flex-shrink-0" />
                  <span>{faq.question}</span>
                </span>
                {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
              </button>

              {/* Answer Content Panel */}
              {isOpen && (
                <div className="p-5 pt-0 border-t border-border-primary/20 text-xs sm:text-sm text-brand-text-muted leading-relaxed font-body font-medium bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default FAQPage
