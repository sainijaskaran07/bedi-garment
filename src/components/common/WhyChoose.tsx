import React from 'react'
import { Award, Calendar, Globe, Layers, Ruler } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
interface Feature {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Best Quality',
    description: 'We source high-grade threads and fabrics ensuring structural longevity and dynamic fit.',
    icon: Award
  },
  {
    id: 2,
    title: 'Trusted Since 1990',
    description: 'Serving families and corporate organizations in Anandpur Sahib and worldwide for over 3 decades.',
    icon: Calendar
  },
  {
    id: 3,
    title: 'Worldwide Shipping',
    description: 'Seamless delivery channels bringing Punjabi textile heritage straight to your doorstep worldwide.',
    icon: Globe
  },
  {
    id: 4,
    title: 'Premium Fabric',
    description: 'Carefully curated linen, soft cotton, high-grade school/college uniform yarns, and designer silks.',
    icon: Layers
  },
  {
    id: 5,
    title: 'Expert Tailoring',
    description: 'Highly experienced master drapers ensuring custom tailoring structured to fit you flawlessly.',
    icon: Ruler
  }
]

export const WhyChoose: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-10 md:py-12 border-b border-border-primary/50 select-none"
      aria-label="Why Choose Bedi Garments Features"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        <SectionHeader 
          badge="Our Commitments"
          title="Why Choose Bedi Garments"
        />

        {/* Responsive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {FEATURES.map((feat) => {
            const Icon = feat.icon
            return (
              <div 
                key={feat.id} 
                className="flex flex-col items-center text-center p-6 bg-bg-secondary/40 border border-border-primary/20 rounded-2xl hover:bg-white hover:shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:border-brand-accent/20 transition-all duration-500 group"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-brand-text group-hover:bg-brand-accent group-hover:text-white shadow-sm transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                
                {/* Feature details */}
                <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase mt-5">
                  {feat.title}
                </h3>
                <p className="font-body text-[11px] text-brand-text-muted mt-3 leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
