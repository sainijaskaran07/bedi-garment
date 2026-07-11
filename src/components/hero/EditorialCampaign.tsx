import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

export const EditorialCampaign: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax Scroll Effect triggers using target container visibility states
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth translation offsets for parallax depth effect
  const leftParallax = useTransform(scrollYProgress, [0, 1], [-25, 25])
  const rightParallax = useTransform(scrollYProgress, [0, 1], [25, -25])

  return (
    <section 
      ref={containerRef}
      className="w-full bg-white py-8 md:py-12 border-b border-border-primary/50 overflow-hidden select-none"
      aria-label="Editorial Campaign Section"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        {/* Asymmetrical flex split layout - Made significantly taller */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-auto md:h-[750px] lg:h-[850px]">
          
          {/* Left Side: 55% width, card with image background & text overlay */}
          <motion.div 
            style={{ y: leftParallax }}
            className="w-full md:w-[55%] h-[450px] sm:h-[550px] md:h-full relative overflow-hidden rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-brand-text cursor-pointer group"
          >
            {/* Background Image 1 */}
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&h=1600&q=80"
              alt="Editorial clothing model shot"
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
              loading="lazy"
            />
            {/* Background Image 2 (similar - visible on hover) */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&h=1600&q=80"
              alt="Editorial clothing model shot alternative"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-60 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Elegant dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:opacity-95" />

            {/* Overlaid content */}
            <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-end text-white z-10 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center"
              >
                <span className="text-[9px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase bg-white/10 backdrop-blur-sm px-3 py-1 rounded-sm">
                  New Arrival
                </span>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight uppercase"
              >
                Premium Fashion<br />For Every Generation
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xs lg:text-sm text-slate-300 font-body leading-relaxed max-w-md font-medium"
              >
                Discover timeless clothing for men, women, kids, and uniforms crafted with quality and comfort.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-2"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 text-[10px] font-heading font-extrabold tracking-[0.2em] uppercase text-brand-accent hover:text-white transition-colors duration-300 border-b border-brand-accent pb-1 hover:border-white focus:outline-none"
                >
                  <span>Explore Collection</span>
                  <span>&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: 45% width, clean lifestyle image without text overlay */}
          <motion.div 
            style={{ y: rightParallax }}
            className="w-full md:w-[45%] h-[350px] sm:h-[450px] md:h-full overflow-hidden rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-bg-secondary cursor-pointer group relative"
          >
            <Link to="/shop" className="block w-full h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&h=1400&q=80"
                alt="Luxury fashion walk lifestyle"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&h=1400&q=80"
                alt="Luxury fashion walk lifestyle alternative"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
export default EditorialCampaign
