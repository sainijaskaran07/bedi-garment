import React from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  location: string
  flag: string
  avatar: string
  review: string
  purchasedAgo: string
}

// 24 custom curated high-fashion customer testimonials
const ROW1_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Harpreet Singh",
    location: "Ludhiana • Punjab",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Excellent stitching and premium fabric. The fitting was perfect and delivery was quick.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 2,
    name: "Simran Kaur",
    location: "Mohali • Punjab",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Quality exceeded expectations. Looks even better than the pictures. Fits my daughter beautifully.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 3,
    name: "Jasleen Gill",
    location: "Toronto • Canada",
    flag: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Wore their designer blazer for a wedding in Canada. Everyone asked where I bought it.\"",
    purchasedAgo: "Purchased 3 weeks ago"
  },
  {
    id: 4,
    name: "Gurpreet Singh",
    location: "Amritsar • Punjab",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Ordered uniforms for our school. Professional service, excellent stitch quality, and timely delivery.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 5,
    name: "Arjun Sharma",
    location: "New Delhi • Delhi",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Perfect fitting even after ordering online from another state. Highly recommended!\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 6,
    name: "Harnoor Kaur",
    location: "London • UK",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"The winter jackets are amazing. Very warm without feeling heavy. Perfect for London winters.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 7,
    name: "Amandeep Singh",
    location: "Melbourne • Australia",
    flag: "🇦🇺",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Fast delivery to Australia and beautiful luxury packaging. Highly impressed with fabric quality.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 8,
    name: "Priya Verma",
    location: "Mumbai • Maharashtra",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"The ethnic collection is elegant and beautifully finished. Color tones are very rich and timeless.\"",
    purchasedAgo: "Purchased 3 months ago"
  },
  {
    id: 9,
    name: "Raman Singh",
    location: "California • USA",
    flag: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"My entire family shops here now. High quality premium apparel delivered directly to California.\"",
    purchasedAgo: "Purchased 2 weeks ago"
  },
  {
    id: 10,
    name: "Jaskirat Singh",
    location: "Dubai • UAE",
    flag: "🇦🇪",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Excellent quality fabrics. Perfect tailoring. Reached Dubai in just 4 days. Unmatched service.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 11,
    name: "Navneet Kaur",
    location: "Chandigarh",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Always my first choice for wedding wear. Elegant, contemporary styling and high-end embroidery.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 12,
    name: "Baljit Singh",
    location: "Auckland • NZ",
    flag: "🇳🇿",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Amazing shipping speed to New Zealand. The clothes are extremely comfortable and fitting is perfect.\"",
    purchasedAgo: "Purchased 1 month ago"
  }
]

const ROW2_TESTIMONIALS: Testimonial[] = [
  {
    id: 13,
    name: "Karan Patel",
    location: "Ahmedabad • Gujarat",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Exquisite styling and craftsmanship. Bedi Garments collections never fail to impress me.\"",
    purchasedAgo: "Purchased 3 months ago"
  },
  {
    id: 14,
    name: "Manpreet Singh",
    location: "Vancouver • Canada",
    flag: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"The support team was helpful with my custom sizing parameters. Recommended to all NRI friends.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 15,
    name: "Rajat Gupta",
    location: "Jaipur • Rajasthan",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Amazing winter jackets collection. Cozy yet lightweight. The fabric detailing is top notch.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 16,
    name: "Neha Sharma",
    location: "Shimla • HP",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Highly impressed by the heavy-duty fleece hoodies. Very warm and fits well in freezing Shimla.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 17,
    name: "Sandeep Kumar",
    location: "Gurugram • Haryana",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Ordered formal blazers and trousers for our corporate delegation. Exquisite tailoring.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 18,
    name: "Sukhwinder Singh",
    location: "Jalandhar • Punjab",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"The traditional sherwani and ethnic wear fitting was top tier. Perfect wedding outfit.\"",
    purchasedAgo: "Purchased 3 weeks ago"
  },
  {
    id: 19,
    name: "Avtar Singh",
    location: "Calgary • Canada",
    flag: "🇨🇦",
    avatar: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Very quick international shipping and premium fabric feel. Durable even after multiple washes.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 20,
    name: "Kiranpreet Kaur",
    location: "Sydney • Australia",
    flag: "🇦🇺",
    avatar: "https://images.unsplash.com/photo-1558203728-00f45181dd84?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Beautiful pattern design and premium textures. Definitely ordering next collection set soon!\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 21,
    name: "Devendra Shah",
    location: "Surat • Gujarat",
    flag: "🇮🇳",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Excellent quality. The sizing was highly precise and the texture feels extremely luxurious.\"",
    purchasedAgo: "Purchased 3 months ago"
  },
  {
    id: 22,
    name: "Hardeep Gill",
    location: "Coventry • UK",
    flag: "🇬🇧",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Brilliant winter clothing. Keep very warm and looks highly elegant. Super fast dispatch.\"",
    purchasedAgo: "Purchased 2 months ago"
  },
  {
    id: 23,
    name: "Dilpreet Kaur",
    location: "New York • USA",
    flag: "🇺🇸",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Extremely satisfied with the shipping speed to NY and fabric texture. Bedi Garments is amazing.\"",
    purchasedAgo: "Purchased 1 month ago"
  },
  {
    id: 24,
    name: "Sarabjit Singh",
    location: "Dubai • UAE",
    flag: "🇦🇪",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=150&h=150&q=80",
    review: "\"Excellent collection of premium fabrics. Customer service team was super responsive to my inputs.\"",
    purchasedAgo: "Purchased 2 months ago"
  }
]

// Duplicate rows three times to ensure infinite scrolling
const ROW1_ITEMS = [...ROW1_TESTIMONIALS, ...ROW1_TESTIMONIALS, ...ROW1_TESTIMONIALS]
const ROW2_ITEMS = [...ROW2_TESTIMONIALS, ...ROW2_TESTIMONIALS, ...ROW2_TESTIMONIALS]

export const Testimonials: React.FC = () => {
  return (
    <section 
      className="w-full bg-[#FAFAF8] py-20 md:py-28 select-none overflow-hidden" 
      aria-label="Customer Testimonials"
    >
      {/* Self-contained CSS Marquee Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }
      `}} />

      <div className="max-w-[1550px] mx-auto px-4 md:px-8 mb-14 md:mb-18">
        {/* Left-Aligned Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-xs sm:text-sm font-heading font-bold tracking-[0.3em] text-brand-accent uppercase mt-2">
            Trusted by families across Punjab, India & Worldwide
          </p>
        </motion.div>
      </div>

      {/* Testimonials Ticker Blocks */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-6 md:gap-8 w-full"
      >
        {/* ROW 1: RIGHT to LEFT */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex gap-6 md:gap-8 w-max animate-scroll-left hover:[animation-play-state:paused] transition-[animation-play-state] duration-300">
            {ROW1_ITEMS.map((t, idx) => (
              <div
                key={`row1-${t.id}-${idx}`}
                className="w-[420px] h-[220px] p-8 rounded-[24px] bg-white border border-border-primary/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 cursor-pointer flex flex-col justify-between flex-shrink-0"
              >
                {/* Top header row */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    {/* Rating stars */}
                    <div className="flex text-amber-400 gap-0.5 select-none">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    {/* Customer Name */}
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-brand-text tracking-wide uppercase">
                      {t.name}
                    </h4>
                    {/* Location pin & city */}
                    <div className="flex items-center gap-1 text-[10px] text-brand-text-muted font-heading font-bold uppercase tracking-wider">
                      <svg className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{t.location}</span>
                    </div>
                  </div>

                </div>

                {/* Review body */}
                <p className="text-xs text-brand-text-muted font-body leading-relaxed line-clamp-3 italic">
                  {t.review}
                </p>

                {/* Footer validation row */}
                <div className="flex items-center justify-between border-t border-border-primary/40 pt-2">
                  <div className="flex items-center gap-2">
                    {/* Verified badge */}
                    <span className="flex items-center gap-1 text-[9px] font-heading font-extrabold tracking-wider text-emerald-600 uppercase">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>Verified Customer</span>
                    </span>
                    {/* Emojis Country flags */}
                    <span className="text-sm select-none" role="img" aria-label="country flag">
                      {t.flag}
                    </span>
                  </div>
                  {/* Time ago */}
                  <span className="text-[10px] text-slate-400 font-heading font-medium tracking-wide">
                    {t.purchasedAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: LEFT to RIGHT */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex gap-6 md:gap-8 w-max animate-scroll-right hover:[animation-play-state:paused] transition-[animation-play-state] duration-300">
            {ROW2_ITEMS.map((t, idx) => (
              <div
                key={`row2-${t.id}-${idx}`}
                className="w-[420px] h-[220px] p-8 rounded-[24px] bg-white border border-border-primary/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-500 cursor-pointer flex flex-col justify-between flex-shrink-0"
              >
                {/* Top header row */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    {/* Rating stars */}
                    <div className="flex text-amber-400 gap-0.5 select-none">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    {/* Customer Name */}
                    <h4 className="font-heading font-extrabold text-xs sm:text-sm text-brand-text tracking-wide uppercase">
                      {t.name}
                    </h4>
                    {/* Location pin & city */}
                    <div className="flex items-center gap-1 text-[10px] text-brand-text-muted font-heading font-bold uppercase tracking-wider">
                      <svg className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{t.location}</span>
                    </div>
                  </div>

                </div>

                {/* Review body */}
                <p className="text-xs text-brand-text-muted font-body leading-relaxed line-clamp-3 italic">
                  {t.review}
                </p>

                {/* Footer validation row */}
                <div className="flex items-center justify-between border-t border-border-primary/40 pt-2">
                  <div className="flex items-center gap-2">
                    {/* Verified badge */}
                    <span className="flex items-center gap-1 text-[9px] font-heading font-extrabold tracking-wider text-emerald-600 uppercase">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>Verified Customer</span>
                    </span>
                    {/* Emojis Country flags */}
                    <span className="text-sm select-none" role="img" aria-label="country flag">
                      {t.flag}
                    </span>
                  </div>
                  {/* Time ago */}
                  <span className="text-[10px] text-slate-400 font-heading font-medium tracking-wide">
                    {t.purchasedAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials
