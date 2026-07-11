import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  badge: string
  title: string
  ctaText?: string
  ctaLink?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  badge, 
  title, 
  ctaText, 
  ctaLink 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
      <div className="text-left space-y-2.5">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
          {badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase leading-none">
          {title}
        </h2>
      </div>
      {ctaText && ctaLink && (
        <div className="flex items-center text-left pt-1 md:pt-0">
          <Link
            to={ctaLink}
            className="inline-flex items-center space-x-2 text-[11px] font-heading font-extrabold tracking-[0.2em] uppercase text-brand-text hover:text-brand-accent transition-colors duration-300 group border-b border-brand-text pb-1 hover:border-brand-accent"
          >
            <span>{ctaText}</span>
            <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default SectionHeader
