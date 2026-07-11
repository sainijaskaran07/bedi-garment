import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PickItem {
  id: number
  collection: string
  description: string
  imageUrl: string
  link: string
}

const PICKS: PickItem[] = [
  {
    id: 1,
    collection: 'The Suit Edit',
    description: 'Timeless double-breasted blazers, trousers, and custom-tailored uniforms for everyday leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&h=1000&q=80',
    link: '/uniforms'
  },
  {
    id: 2,
    collection: 'Heritage Silk',
    description: 'Handcrafted drapes, designer sarees, and premium kurtas celebrating textile heritage and wedding wear.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&h=1000&q=80',
    link: '/ethnic-wear'
  }
]

export const EditorsPicks: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-10 md:py-14 border-b border-border-primary/50 select-none"
      aria-label="Editor's Picks Collection"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Curated For You
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-brand-text mt-3">
            Editor's Picks
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent mx-auto mt-4" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {PICKS.map((pick) => (
            <motion.div 
              key={pick.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Box */}
              <Link to={pick.link} className="relative overflow-hidden rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.03)] bg-bg-secondary aspect-[4/5]">
                <img
                  src={pick.imageUrl}
                  alt={pick.collection}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-transparent group-hover:border-brand-accent/20 transition-all duration-500 rounded-2xl pointer-events-none" />
              </Link>

              {/* Text Description */}
              <div className="mt-6 md:mt-8 space-y-3 pl-1">
                <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-brand-accent uppercase">
                  Seasonal Focus
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight text-brand-text">
                  <Link to={pick.link} className="hover:text-brand-accent transition-colors duration-200">
                    {pick.collection}
                  </Link>
                </h3>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-body max-w-md font-medium font-medium">
                  {pick.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={pick.link}
                    className="inline-flex items-center space-x-1.5 text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase text-brand-text group-hover:text-brand-accent transition-colors duration-300 pb-1 border-b border-brand-text/30 group-hover:border-brand-accent/50 focus:outline-none"
                  >
                    <span>Explore Collection</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default EditorsPicks
