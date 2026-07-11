import React from 'react'

const ROW1_TEXTS = [
  "PUNJAB TO THE WORLD",
  "ESTD. 1984 IN PUNJAB",
  "CRAFTED WITH DESI ROOTS",
  "MODERN PUNJABI HERITAGE",
  "THE RUNWAY OF PUNJAB",
  "AUTHENTIC STREETWEAR BRAND",
  "DESIGNED IN PUNJAB",
  "MAJHA DOABA MALWA EDITS"
]

const ROW2_TEXTS = [
  "WORLDWIDE SHIPPING AVAILABLE",
  "SHIPPING TO USA, UK, CANADA & BEYOND",
  "EXPRESS GLOBAL DELIVERY",
  "TRACKED OVERSEAS DISPATCH",
  "SHIPPING GLOBALLY FROM PUNJAB",
  "FREE SHIPPING PAN INDIA",
  "FAST INTERNATIONAL CARRIER"
]

// Duplicate the items three times to ensure seamless infinite loop scrolling
const ROW1_ITEMS = [...ROW1_TEXTS, ...ROW1_TEXTS, ...ROW1_TEXTS]
const ROW2_ITEMS = [...ROW2_TEXTS, ...ROW2_TEXTS, ...ROW2_TEXTS]

export const ShippingMarquee: React.FC = () => {
  return (
    <section 
      className="w-full bg-[#111111] py-6 md:py-8 border-t border-b border-white/5 overflow-hidden select-none flex flex-col gap-4 md:gap-5"
      aria-label="Punjabi Heritage & Worldwide Shipping Ticker"
    >
      {/* Self-contained marquee animation styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left-scroll {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right-scroll {
          animation: marquee-right 40s linear infinite;
        }
      `}} />

      {/* Row 1: Punjabi Heritage (Moving Left) */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-16 md:gap-24 w-max animate-marquee-left-scroll hover:[animation-play-state:paused] transition-[animation-play-state] duration-300">
          {ROW1_ITEMS.map((text, idx) => (
            <div key={`row1-${idx}`} className="flex items-center gap-4 md:gap-6">
              <span className="text-[11px] md:text-xs font-heading font-extrabold tracking-[0.25em] text-white uppercase whitespace-nowrap">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Worldwide Shipping (Moving Right) */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-16 md:gap-24 w-max animate-marquee-right-scroll hover:[animation-play-state:paused] transition-[animation-play-state] duration-300 animate-[marquee-right_40s_linear_infinite]">
          {ROW2_ITEMS.map((text, idx) => (
            <div key={`row2-${idx}`} className="flex items-center gap-4 md:gap-6">
              <span className="text-[11px] md:text-xs font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase whitespace-nowrap">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShippingMarquee
