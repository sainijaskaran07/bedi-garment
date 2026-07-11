import React from 'react'
import { SEO } from '../../components/common'

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body">
      <SEO 
        title="About Our Heritage | Bedi Garments" 
        description="Learn about our heritage, craftsmanship, and commitment to stitching premium lifestyle clothing and customized academic/corporate uniforms since 1990 in Anandpur Sahib, Punjab."
        canonicalPath="/about"
      />
      {/* Editorial Header Banner */}
      <div className="bg-bg-secondary py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            Our Heritage
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text mt-3 uppercase">
            About Bedi Garments
          </h1>
          <p className="text-brand-text-muted text-xs md:text-sm mt-4 max-w-md mx-auto font-medium leading-relaxed">
            Stitching quality threads and building trusted textile bonds in Anandpur Sahib, Punjab since 1990.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 leading-relaxed text-xs md:text-sm font-medium text-brand-text-muted">
        
        {/* Brand Story */}
        <section className="space-y-4">
          <h2 className="font-heading text-sm md:text-base font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
            Our Brand Story
          </h2>
          <p>
            Established in 1990 in the historical city of Anandpur Sahib, Bedi Garments began with a single vision: to deliver premium-quality, custom-tailored apparel that perfectly blends traditional Punjabi craftsmanship with modern cuts.
          </p>
          <p>
            Over the last three decades, we have grown from a local tailoring boutique into a highly respected fashion and clothing retail destination. Today, we are trusted by thousands of families for their festive wedding wear, corporate offices for their custom blazers, and premier academic institutions for their durable uniforms.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3 bg-bg-secondary/40 p-6 rounded-2xl border border-border-primary/30">
            <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
              Our Mission
            </h3>
            <p className="text-[11px] leading-relaxed">
              To provide our clients with exceptionally designed apparel constructed from high-grade fabrics. We aim to ensure comfort, structural longevity, and styling confidence for every generation.
            </p>
          </div>
          <div className="space-y-3 bg-bg-secondary/40 p-6 rounded-2xl border border-border-primary/30">
            <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-text uppercase">
              Our Vision
            </h3>
            <p className="text-[11px] leading-relaxed">
              To become a global ambassador of Punjab’s rich textile expertise and custom tailoring heritage, bridging local craft with top-tier international digital ecommerce.
            </p>
          </div>
        </section>

        {/* Fabric & Design Quality */}
        <section className="space-y-4 pt-4">
          <h2 className="font-heading text-sm md:text-base font-extrabold tracking-widest text-brand-text uppercase border-b border-border-primary/80 pb-3">
            The Bedi standard
          </h2>
          <p>
            We take pride in our rigorous fabrication processes. Every roll of linen, combed cotton, or school uniform viscous is pre-tested for shrinkage and color-fastness. Our master drapers carry decades of collective tailoring experience, ensuring every cut, pocket, and buttonhole adheres to our premium benchmark.
          </p>
        </section>

      </div>
    </div>
  )
}

export default AboutPage
