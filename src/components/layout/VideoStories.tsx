import React from 'react'
import { FaInstagram, FaPlay } from 'react-icons/fa'

interface Reel {
  id: number
  videoUrl: string
}

const REELS_DATA: Reel[] = [
  {
    id: 1,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-racks-of-clothes-in-a-fashion-store-41553-large.mp4'
  },
  {
    id: 2,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-choosing-clothes-in-a-boutique-41551-large.mp4'
  },
  {
    id: 3,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-in-casual-clothes-posing-41753-large.mp4'
  },
  {
    id: 4,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-hat-posing-4552-large.mp4'
  },
  {
    id: 5,
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022718d008c27944062fb6a18d17983&profile_id=139&oauth2_token_id=57447761'
  }
]

// Duplicate items for a perfect seamless infinite marquee scroll
const DOUBLE_REELS = [...REELS_DATA, ...REELS_DATA]

export const VideoStories: React.FC = () => {
  return (
    <section 
      className="w-full bg-[#FAFAF8] py-16 md:py-20 border-b border-border-primary/50 overflow-hidden select-none"
      aria-label="Instagram Reels Fashion Campaign Films"
    >
      {/* Self-contained marquee animation styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-reels {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-reels {
          animation: marquee-reels 45s linear infinite;
        }
      `}} />

      <div className="max-w-[1550px] mx-auto px-4 md:px-8">
        
        {/* Top Header with Instagram Handle on the Top Right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-border-primary/50 pb-6 mb-8 md:mb-12">
          <div>
            <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
              Campaign Films
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-brand-text uppercase mt-2">
              Video Stories
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 flex-shrink-0">
            <a
              href="https://www.instagram.com/bedigarments1984/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-heading font-extrabold tracking-wider text-brand-text hover:text-brand-accent transition-colors duration-300 relative pb-1 focus:outline-none"
            >
              <FaInstagram size={14} className="text-brand-accent" />
              <span>FOLLOW @bedigarments1984</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-text group-hover:bg-brand-accent transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Reels Showcase Infinite Marquee container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 md:gap-8 w-max animate-marquee-reels hover:[animation-play-state:paused] transition-[animation-play-state] duration-300">
            {DOUBLE_REELS.map((reel, idx) => (
              <div
                key={`${reel.id}-${idx}`}
                className="w-[300px] md:w-[320px] h-[530px] md:h-[570px] aspect-[9/16] relative overflow-hidden rounded-[20px] bg-brand-text group cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-end"
              >
                {/* Autoplay Muted Loop Reel Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-103 group-hover:brightness-105 transition-all duration-700 ease-out pointer-events-none"
                >
                  <source src={reel.videoUrl} type="video/mp4" />
                </video>

                {/* Dark Vignette Overlay screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Top Left Profile Overlay capsule */}
                <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 text-white pointer-events-none bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 transform translate-y-[-4px] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <FaInstagram size={13} className="text-brand-accent" />
                  <span className="text-[9px] font-heading font-extrabold tracking-[0.15em] uppercase text-white">
                    bedi_garments_1984
                  </span>
                  {/* Instagram-style Verified Badge */}
                  <svg className="w-3.5 h-3.5 text-[#0095f6] fill-current" viewBox="0 0 24 24" aria-label="Verified badge">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                {/* Centered Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="p-4 sm:p-5 rounded-full bg-white/25 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-out shadow-lg">
                    <FaPlay size={14} className="text-white fill-current translate-x-[1px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoStories
